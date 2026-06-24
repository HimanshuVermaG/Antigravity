# DOM Surgeon: Persistent Storage & Serialization

The Storage System (`lib/storage.js`) is responsible for permanently saving user modifications to the browser's local storage so that changes persist across page reloads and browser restarts.

## 1. Data Partitioning Structure
To maintain high performance and avoid loading massive JSON objects into memory on every page load, DOM Surgeon partitions data strictly by hostname.

- **Storage Keys:** Data is stored in `chrome.storage.local` under keys formatted as `ds_site_<hostname>` (e.g., `ds_site_www.example.com`).
- **Data Object Structure:** Each key maps to an object containing all rules for that specific site.
  ```json
  {
    "www.example.com": {
      "rules": [
        { "selector": "div.header > h1", "action": "hide", "lastModified": 1718223000 }
      ],
      "deletedAt": null
    }
  }
  ```

## 2. Serialization (Generating Robust Selectors)
Because the extension cannot store the physical DOM Node itself, it must generate a string "fingerprint" (a CSS selector) that uniquely identifies the exact element the user clicked.

### Implementation:
- **ID Fallback:** If the element has a unique `id`, the serialization is incredibly fast and simple (e.g., `#main-nav`).
- **Class Chains:** If there is no ID, the script traverses up the DOM tree, combining tags and class names, using `:nth-child()` pseudo-selectors to guarantee exact pinpoint accuracy (e.g., `body > div.container > ul > li:nth-child(3)`).
- **Applying the Selector:** When the page reloads, the extension simply runs `document.querySelectorAll(selector)` to find the exact elements and re-apply the mutations.

## 3. Tombstone Soft Deletions
DOM Surgeon uses a "soft deletion" model. When a user deletes a rule from the Dashboard, the rule is not erased from the hard drive immediately.

### Why Soft Deletion?
Because we sync data to the Cloud (via GitHub Gists), simply erasing data locally would create a conflict: The cloud would say "Hey, I have a rule for `example.com` that you don't have, let me download it to your browser!" 
To prevent deleted rules from constantly respawning, we use **Tombstones**.

### Implementation:
- Instead of removing the rule array, the site object is updated with `deletedAt: <timestamp>`.
- The local browser ignores rules that have a `deletedAt` flag.
- When `SyncManager` merges data, if it sees a `deletedAt` timestamp locally that is newer than the Cloud's timestamp, it forces the Cloud to also delete the rule.

## 4. Size Limits & Integration
The local storage acts as the single source of truth for the entire extension. 
1. **Content Scripts:** Query `storage.js` to see what to hide on the page.
2. **Dashboard UI:** Queries `storage.js` to list all modified websites.
3. **Background Sync:** Listens to `chrome.storage.local.onChanged` to know exactly when to push backups to the Cloud. 
By keeping all logic rooted in the native Chrome Storage API, the extension remains fully decoupled and highly reactive.
