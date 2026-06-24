# DOM Surgeon: Dashboard & Options UI

The Dashboard (`options.html` and `options.js`) serves as the central control panel for the user. It allows them to view all modified sites, manage individual rules, execute garbage collection, and configure Cloud Sync parameters.

## 1. Rule Management & Rendering
The dashboard dynamically reads all `ds_site_*` keys from `chrome.storage.local`.

### The Accordion Interface
- Rules are grouped by hostname and rendered inside an interactive accordion interface.
- Users can clearly see the exact CSS selector modified and what action was taken (e.g., `<span class="badge badge-hide">hide</span>`).
- **Restoration:** Users can individually delete a rule from the dashboard. Doing so applies a `deletedAt` tombstone rather than wiping the data, ensuring the cloud sync properly registers the deletion.

## 2. Garbage Collection (Clear All Trash)
Because DOM Surgeon uses "Soft Deletions" (`deletedAt` tombstones) to prevent the cloud from accidentally resurrecting deleted rules, a website's storage object might grow over time with trashed data.
- **The "Clear All Trash" Function:** To keep local storage clean and fast, the Dashboard provides a master "Clear All Trash" button. When clicked, it sweeps through all `ds_site_*` entries and permanently deletes ("Hard Deletes") any objects or arrays that contain `deletedAt` timestamps.

## 3. Sync Settings & Reactivity
The Cloud Sync input fields (GitHub PAT, Gist ID, Chrome Sync Checkbox) are extremely reactive to prevent data loss.

### Real-time Event Listeners
- Instead of using a traditional 'Save' button or listening to the `'change'` event (which only fires when an input loses focus), the script uses the `'input'` event listener.
- **Why?** If a user pastes their GitHub PAT and immediately clicks the browser's "Reload" button before clicking away, standard inputs would wipe the pasted text. By using the `'input'` event, the string is injected into `chrome.storage.local` the precise millisecond a keystroke or paste event occurs.

### Context Menu Integration
The Dashboard is heavily integrated into the extension's icon. The user can Right-Click the DOM Surgeon extension icon to reveal a custom context menu. Because we suppressed the native Chrome "Options" button via `manifest.json`, the user is presented with a sleek custom "Dashboard" shortcut button right below "Sync Cloud Now".
