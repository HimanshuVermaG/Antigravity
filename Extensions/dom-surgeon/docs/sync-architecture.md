# DOM Surgeon: Automatic Syncing Architecture

This document breaks down how the automatic syncing architecture is implemented, including all of its functions, gatekeepers, and API restrictions.

## 1. The Triggers (When does it start?)
Automatic syncing is completely hidden in the background and is triggered by three native Chrome events:
* `chrome.storage.local.onChanged`: Fires the millisecond you make any DOM change (like hiding an element) on any webpage.
* `chrome.runtime.onStartup`: Fires every time you launch the Chrome browser.
* `chrome.runtime.onInstalled`: Fires when the extension updates or reloads.

## 2. The 1-Minute Debounce System
If you delete 10 elements in 5 seconds, syncing to the cloud 10 times would instantly hit API rate limits. Instead, DOM Surgeon uses a sophisticated **1-Minute Debounce Timer**:

### GitHub Gist Sync
* **Function:** When you make a change, a `chrome.alarms` timer starts counting to 1 minute. If you make *another* change before the 1 minute is up, the alarm is completely cleared and reset to 1 minute. Once you stop modifying the page for a full 60 seconds, it pushes your batched changes silently to your GitHub Gist.
* **Restrictions:** GitHub limits Personal Access Tokens to 5,000 requests per hour. By debouncing to 1 minute, the absolute maximum number of writes the extension can ever perform in one hour is 60 (which is barely 1% of the limit). This guarantees unlimited storage without angering rate limiters.

## 3. Stranded Data Protection
What happens if you make a change, but close your laptop 30 seconds later (before the 1-minute GitHub backup fires)?
Because we use `chrome.alarms`, the timer safely persists. The very next time you open your Chrome browser, the `onStartup` event kicks in, realizes there is stranded data, and instantly forces a full GitHub sync before you even open a webpage. 

## 4. The SyncManager Engine (Functions & Gatekeepers)
When the timers actually fire, they hand the task off to the `SyncManager` class, which applies several strict rules:

* **The Pause Gatekeeper:** It checks the `ds_sync_paused` flag. If the user toggled "Pause Sync" in the dashboard, the background script immediately aborts all automatic network activity. However, the user can still bypass this lock for a one-off backup by manually clicking "Sync Now" or the context menu, which sends a `force: true` override to the `SyncManager`.
* **The Concurrency Lock:** It checks an `_isSyncing` variable. If a sync is already running, it drops the new request to prevent two network calls from colliding and corrupting data.
* **Payload Stripping:** Before pushing to the GitHub API, the manager automatically strips out all of the `history` (Undo/Redo) arrays. History data is massive, and stripping it ensures the JSON payload remains clean.
* **Two-Way Tombstone Merging:** It never blindly overwrites the cloud. It first pulls the cloud data down, compares the `lastModified` timestamps against the local data, resolves conflicts (using `deletedAt` tombstones to track deletions properly), updates the local browser, and *then* pushes the final merged JSON back to the cloud.
