/**
 * DOM Surgeon - Sync Manager
 * Handles syncing rules to Chrome Sync and GitHub Gists.
 */
class SyncManager {
  static async syncAll(options = { chrome: true, github: true, force: false }) {
    if (this._isSyncing) {
      console.log('[SyncManager] Sync already in progress, skipping...');
      return { ok: false, error: 'Sync in progress' };
    }
    this._isSyncing = true;

    try {
      console.log(`[SyncManager] Starting sync... (Chrome: ${options.chrome}, GitHub: ${options.github}, Force: ${options.force})`);
      const data = await chrome.storage.local.get(null);

      if (data.ds_sync_paused && !options.force) {
        console.log('[SyncManager] Sync is PAUSED by user. Skipping auto-sync.');
        return { ok: false, error: 'Sync is paused' };
      }
      
      // Extract rule data only
      let rulesData = {};
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith('ds_site_') || key.startsWith('ds_domain_')) {
          rulesData[key] = value;
        }
      }

      let gistId = data.ds_sync_github_gist;
      let localNeedsUpdate = false;

      // Pull and Merge from Chrome Sync
      if (options.chrome && data.ds_sync_chrome) {
        const remoteChrome = await this.pullFromChrome();
        const { merged, hasChanges } = this._mergeData(rulesData, remoteChrome);
        if (hasChanges) {
          rulesData = merged;
          localNeedsUpdate = true;
        }
      }

      // Pull and Merge from GitHub
      if (options.github && data.ds_sync_github_pat && gistId) {
        const remoteGithub = await this.pullFromGitHub(data.ds_sync_github_pat, gistId);
        const { merged, hasChanges } = this._mergeData(rulesData, remoteGithub);
        if (hasChanges) {
          rulesData = merged;
          localNeedsUpdate = true;
        }
      }

      // Save merged data back to local storage if remote was newer
      if (localNeedsUpdate) {
        SyncManager._ignoreNextLocalChange = true;
        await chrome.storage.local.set(rulesData);
        console.log('[SyncManager] Local storage updated with merged remote data.');
        setTimeout(() => { SyncManager._ignoreNextLocalChange = false; }, 1000);
      }

      // Push merged data back to clouds
      if (options.chrome && data.ds_sync_chrome) {
        await this.syncToChrome(rulesData);
      }

      if (options.github && data.ds_sync_github_pat) {
        gistId = await this.syncToGitHub(rulesData, data.ds_sync_github_pat, gistId);
        if (gistId && gistId !== data.ds_sync_github_gist) {
          await chrome.storage.local.set({ ds_sync_github_gist: gistId });
        }
      }
      
      console.log('[SyncManager] Sync completed.');
      return { ok: true, gistId };
    } finally {
      this._isSyncing = false;
    }
  }

  // ── Merging Logic ────────────────────────────────────────────────────────

  static _mergeData(localData, remoteData) {
    if (!remoteData) return { merged: localData, hasChanges: false };
    const merged = { ...localData };
    let hasChanges = false;

    for (const [key, remoteSite] of Object.entries(remoteData)) {
      const localSite = merged[key];
      if (!localSite) {
        merged[key] = remoteSite;
        hasChanges = true;
      } else {
        // Compare by latest change timestamp (or tombstone deletedAt timestamp)
        const getLatest = (site) => {
          if (site.deletedAt) return site.deletedAt;
          if (site.lastModified) return site.lastModified;
          return Math.max(...(site.changes || []).map(c => c.timestamp), 0);
        };
        
        const localLatest = getLatest(localSite);
        const remoteLatest = getLatest(remoteSite);

        if (remoteLatest > localLatest) {
          merged[key] = remoteSite;
          hasChanges = true;
        }
      }
    }
    return { merged, hasChanges };
  }

  // ── Pulling Logic ────────────────────────────────────────────────────────

  static async pullFromChrome() {
    try {
      const data = await chrome.storage.sync.get(null);
      if (data.ds_chunk_count === undefined) return null;
      let payloadStr = '';
      for (let i = 0; i <= data.ds_chunk_count; i++) {
        payloadStr += data[`ds_chunk_${i}`] || '';
      }
      return JSON.parse(payloadStr);
    } catch (e) {
      console.warn('[SyncManager] Failed to pull from Chrome Sync:', e);
      return null;
    }
  }

  static async pullFromGitHub(pat, gistId) {
    if (!gistId) return null;
    try {
      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: { 'Authorization': `token ${pat}` }
      });
      if (!response.ok) return null;
      const data = await response.json();
      const file = data.files['dom-surgeon-rules.json'];
      if (file && file.content) {
        return JSON.parse(file.content);
      }
    } catch (e) {
      console.warn('[SyncManager] Failed to pull from GitHub:', e);
    }
    return null;
  }

  // ── Chrome Sync ──────────────────────────────────────────────────────────

  static async syncToChrome(rulesData) {
    console.log('[SyncManager] Syncing to Chrome Sync...');
    
    // Deep clone and strip 'history' from the payload. History is only useful 
    // for local undo/redo in the active tab, and wastes massive amounts of Cloud quota!
    const payloadData = {};
    for (const [k, v] of Object.entries(rulesData)) {
      payloadData[k] = { ...v };
      delete payloadData[k].history;
    }

    const payloadStr = JSON.stringify(payloadData);
    
    if (payloadStr.length > 90000) {
      throw new Error('Your DOM Surgeon rules have exceeded Chrome Sync\'s 100KB limit! Please disable Chrome Sync in the Options Dashboard and use GitHub Gist Sync for unlimited storage.');
    }
    
    // Decrease chunk size to 3000 characters. 
    // Chrome Sync has a hard limit of 8192 bytes per item (including the key).
    // Because some characters (like emojis or foreign languages) can be 2-4 bytes,
    // 3000 characters gives us a very safe buffer below the 8KB limit.
    const CHUNK_SIZE = 3000;
    const chunks = {};
    for (let i = 0; i < payloadStr.length; i += CHUNK_SIZE) {
      chunks[`ds_chunk_${i / CHUNK_SIZE}`] = payloadStr.slice(i, i + CHUNK_SIZE);
    }
    chunks['ds_chunk_count'] = Object.keys(chunks).length - 1; // Store how many chunks

    try {
      // Clear old chunks first
      const existing = await chrome.storage.sync.get(null);
      const keysToRemove = Object.keys(existing).filter(k => k.startsWith('ds_chunk_'));
      await chrome.storage.sync.remove(keysToRemove);
      
      await chrome.storage.sync.set(chunks);
      console.log('[SyncManager] Chrome Sync successful.', Object.keys(chunks).length, 'chunks written.');
    } catch (e) {
      console.error('[SyncManager] Chrome Sync failed:', e);
      throw e;
    }
  }

  // ── GitHub Gist Sync ─────────────────────────────────────────────────────

  static async syncToGitHub(rulesData, pat, gistId) {
    console.log(`[SyncManager] Syncing to GitHub Gist... (Gist ID: ${gistId || 'New'})`);
    
    // Deep clone and strip 'history' from the payload to prevent Gist bloat
    const payloadData = {};
    for (const [k, v] of Object.entries(rulesData)) {
      payloadData[k] = { ...v };
      delete payloadData[k].history;
    }

    const fileName = 'dom-surgeon-rules.json';
    const content = JSON.stringify(payloadData, null, 2);

    const headers = {
      'Authorization': `token ${pat}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };

    try {
      if (gistId) {
        // Update existing Gist
        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            files: {
              [fileName]: { content }
            }
          })
        });
        
        if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);
        console.log('[SyncManager] GitHub Gist updated successfully.');
        return gistId;
      } else {
        // Create new Gist
        const response = await fetch('https://api.github.com/gists', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            description: 'DOM Surgeon Rules Backup',
            public: false,
            files: {
              [fileName]: { content }
            }
          })
        });
        
        if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);
        const data = await response.json();
        console.log('[SyncManager] New GitHub Gist created. ID:', data.id);
        return data.id;
      }
    } catch (e) {
      console.warn('[SyncManager] Gist creation failed:', e);
      return null;
    }
  }

  // ── GitHub Gist Revisions (Time Machine) ─────────────────────────────────

  static async getGistRevisions(pat, gistId) {
    if (!gistId) return [];
    try {
      const response = await fetch(`https://api.github.com/gists/${gistId}/commits`, {
        headers: { 'Authorization': `token ${pat}` }
      });
      if (!response.ok) return [];
      const commits = await response.json();
      return commits.map(c => ({
        version: c.version,
        committedAt: c.committed_at
      }));
    } catch (e) {
      console.warn('[SyncManager] Failed to fetch gist revisions:', e);
      return [];
    }
  }

  static async fetchGistRevision(pat, gistId, version) {
    if (!gistId || !version) return null;
    try {
      const response = await fetch(`https://api.github.com/gists/${gistId}/${version}`, {
        headers: { 'Authorization': `token ${pat}` }
      });
      if (!response.ok) return null;
      const data = await response.json();
      const file = data.files['dom-surgeon-rules.json'];
      if (file && file.content) {
        return JSON.parse(file.content);
      }
    } catch (e) {
      console.warn('[SyncManager] Failed to fetch specific gist revision:', e);
    }
    return null;
  }
}

// Expose SyncManager to window so options.js can call it via chrome.runtime.getBackgroundPage
self.SyncManager = SyncManager;
