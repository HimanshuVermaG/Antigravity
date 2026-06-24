# DOM Surgeon: Automatic Syncing Architecture

This document breaks down how the automatic syncing architecture is implemented, including all of its functions, gatekeepers, and API restrictions.

## 1. The Triggers (When does it start?)
Automatic syncing is completely hidden in the background and is triggered by three native Chrome events:
* `chrome.storage.local.onChanged`: Fires the millisecond you make any DOM change (like hiding an element) on any webpage.
* `chrome.runtime.onStartup`: Fires every time you launch the Chrome browser.
* `chrome.runtime.onInstalled`: Fires when the extension updates or reloads.

## 2. The Tiered Timers (The Debounce System)
If you delete 10 elements in 5 seconds, syncing to the cloud 10 times would instantly hit API rate limits. Instead, DOM Surgeon uses a sophisticated **Tiered Debounce System**:

### Tier 1 (Fast Sync) — Chrome Sync API
* **Function:** When you make a change, a `setTimeout` timer starts counting to 3 seconds. If you make *another* change before 3 seconds is up, the timer resets. Once you stop modifying the page for exactly 3 seconds, it pushes your changes silently to your Google Account.
* **Restrictions:** Chrome Sync limits you to exactly `MAX_WRITE_OPERATIONS_PER_MINUTE` (120 writes) and restricts your total storage to a strict **100KB**. Our 3-second debounce guarantees you never hit the write limit.

### Tier 2 (Heavy Backup) — GitHub API
* **Function:** The moment you make a change, a persistent `chrome.alarms` timer schedules a background GitHub backup for exactly **5 minutes** in the future. 
* **Restrictions:** GitHub limits Personal Access Tokens to 5,000 requests per hour. Pushing every 3 seconds would burn through this. A 5-minute batched timer guarantees your heavy JSON payload is safely backed up without angering GitHub's rate limiters.

## 3. Stranded Data Protection
What happens if you make a change, but close your laptop 2 minutes later (before the 5-minute GitHub backup fires)?
Because we use `chrome.alarms`, the timer safely persists. The very next time you open your Chrome browser, the `onStartup` event kicks in, realizes there is stranded data, and instantly forces a full Chrome + GitHub sync before you even open a webpage. 

## 4. The SyncManager Engine (Functions & Gatekeepers)
When the timers actually fire, they hand the task off to the `SyncManager` class, which applies several strict rules:

* **The Pause Gatekeeper:** It checks the `ds_sync_paused` flag. If the user toggled "Pause Sync" in the dashboard, the background script immediately aborts all automatic network activity. However, the user can still bypass this lock for a one-off backup by manually clicking "Sync Now" or the context menu, which sends a `force: true` override to the `SyncManager`.
* **The Concurrency Lock:** It checks an `_isSyncing` variable. If a sync is already running, it drops the new request to prevent two network calls from colliding and corrupting data.
* **Payload Stripping:** Before pushing to the Chrome Sync API, the manager automatically strips out all of the `history` (Undo/Redo) arrays. History data is massive, and stripping it ensures the core DOM rules easily fit inside Chrome's tiny 100KB limit.
* **Two-Way Tombstone Merging:** It never blindly overwrites the cloud. It first pulls the cloud data down, compares the `lastModified` timestamps against the local data, resolves conflicts (using `deletedAt` tombstones to track deletions properly), updates the local browser, and *then* pushes the final merged JSON back to the cloud.
