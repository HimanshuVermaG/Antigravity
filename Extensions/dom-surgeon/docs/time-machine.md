# DOM Surgeon: Cloud Time Machine

The Cloud Time Machine is an advanced disaster-recovery feature. It leverages the native Git version control built directly into GitHub Gists to allow users to roll back their entire extension state to a previous snapshot.

## 1. How it Works (The Git Foundation)
Because the Heavy Sync Tier pushes data to a GitHub Gist, every single push automatically creates a standard `git commit` under the hood. GitHub Gists are simply Git repositories containing one or more files. 
The Time Machine UI simply queries the GitHub REST API to fetch this commit history.

## 2. Implementation: Fetching History
When the user clicks the "Time Machine" button in the Dashboard:
1. **API Call:** The script makes a `GET` request to `https://api.github.com/gists/{gist_id}/commits`, authenticated via the user's saved Personal Access Token (PAT).
2. **Parsing Revisions:** The API returns an array of commits. The script maps each commit's `version` ID, creation date, and total insertions/deletions.
3. **UI Rendering:** A clean, scrollable list of historical snapshots is rendered in a native `<dialog>` modal, showing exactly when the backup occurred and how many lines of data changed.

## 3. The Restoration Protocol (Overwriting)
When a user clicks "Restore" on a specific historical snapshot:
1. **Fetching Raw Data:** The extension uses `chrome.runtime.sendMessage` to instruct the background `SyncManager` to fetch the specific raw file content from that exact `commit` hash using the `raw_url` provided by GitHub.
2. **The Destructive Wipe:** The background script executes a complete local wipe (`chrome.storage.local.clear()`), instantly wiping all current rules, settings, and tombstones.
3. **Data Injection:** The fetched JSON payload from the historical snapshot is parsed and injected directly into `chrome.storage.local.set()`.
4. **Resyncing:** The background script then forces an immediate Cloud Sync (`force: true`). This takes the newly restored historical data and forcefully pushes it to Chrome Sync and GitHub, essentially making the historical snapshot the "newest" truth across all connected browsers.

## 4. Integration
The Time Machine is fully integrated into the Dashboard (`options.html`) and routes all complex API fetches through the secure Background Service Worker (`SyncManager`). Because it leverages GitHub's infrastructure, the extension itself requires zero backend servers to maintain unlimited version history.
