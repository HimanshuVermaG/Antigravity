/**
 * DOM Surgeon — Storage Manager
 * Abstraction over chrome.storage.local for persisting element changes.
 * Uses per-URL keys to prevent cross-tab race conditions.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const Storage = {
    // ── Public API ─────────────────────────────────────

    /** Append a change record for the given URL. */
    async saveChange(url, change) {
      const site = await this._loadSite(url);
      site.changes.push(change);
      await this._saveSite(url, site);
      this._emitBadgeUpdate(url);
    },

    /** Get all change records for a URL. */
    async getChanges(url) {
      const site = await this._loadSite(url);
      return site.changes;
    },

    /** Remove a specific change by ID. */
    async removeChange(url, changeId) {
      const site = await this._loadSite(url);
      site.changes = site.changes.filter(c => c.id !== changeId);

      // Clean up if completely empty
      if (site.changes.length === 0 &&
          site.history.undoStack.length === 0 &&
          site.history.redoStack.length === 0) {
        await this._deleteSite(url);
      } else {
        await this._saveSite(url, site);
      }
      this._emitBadgeUpdate(url);
    },

    /** Clear all changes and history for a URL. */
    async clearChanges(url) {
      await this._deleteSite(url);
      this._emitBadgeUpdate(url);
    },

    /** Get undo/redo history stacks for a URL. */
    async getHistory(url) {
      const site = await this._loadSite(url);
      return site.history;
    },

    /** Save undo/redo history stacks for a URL. */
    async saveHistory(url, history) {
      const site = await this._loadSite(url);
      site.history = history;
      await this._saveSite(url, site);
    },

    /** Count of changes for a URL. */
    async getChangeCount(url) {
      const changes = await this.getChanges(url);
      return changes.length;
    },

    /** Export entire dataset as a plain object (for JSON export). */
    async getAllData() {
      return new Promise(resolve => {
        chrome.storage.local.get(null, items => {
          const sites = {};
          
          // Migrate old single-key format if present
          if (items.domSurgeonData && items.domSurgeonData.sites) {
            Object.assign(sites, items.domSurgeonData.sites);
          }

          // Gather all per-URL keys
          for (const key in items) {
            if (key.startsWith('ds_site_')) {
              const url = key.replace('ds_site_', '');
              sites[url] = items[key];
            }
          }

          resolve({ version: 2, sites });
        });
      });
    },

    /** Import a dataset, adding to current data. */
    async importData(json) {
      try {
        const parsed = typeof json === 'string' ? JSON.parse(json) : json;
        if (!parsed || !parsed.sites) {
          throw new Error('Invalid DOM Surgeon data format');
        }
        
        const toSave = {};
        for (const url in parsed.sites) {
          toSave[this._key(url)] = parsed.sites[url];
        }
        
        await new Promise(resolve => chrome.storage.local.set(toSave, resolve));
        return { success: true };
      } catch (e) {
        console.error('[DOM Surgeon] Import failed:', e);
        return { success: false, error: e.message };
      }
    },

    // ── Private ────────────────────────────────────────

    _key(url) {
      return 'ds_site_' + url;
    },

    async _loadSite(url) {
      return new Promise(resolve => {
        try {
          chrome.storage.local.get([this._key(url), 'domSurgeonData'], result => {
            if (chrome.runtime.lastError) {
              return resolve({ changes: [], history: { undoStack: [], redoStack: [] } });
            }
            if (result[this._key(url)]) {
              return resolve(result[this._key(url)]);
            }
            if (result.domSurgeonData?.sites?.[url]) {
              return resolve(result.domSurgeonData.sites[url]);
            }
            resolve({ changes: [], history: { undoStack: [], redoStack: [] } });
          });
        } catch (e) {
          // Extension context invalidated (e.g. extension was reloaded)
          console.warn('[DOM Surgeon] Extension context invalidated. Please refresh the page.');
          resolve({ changes: [], history: { undoStack: [], redoStack: [] } });
        }
      });
    },

    async _saveSite(url, siteData) {
      return new Promise(resolve => {
        try {
          chrome.storage.local.set({ [this._key(url)]: siteData }, () => {
            if (chrome.runtime.lastError) console.warn(chrome.runtime.lastError);
            resolve();
          });
        } catch (e) {
          console.warn('[DOM Surgeon] Extension context invalidated. Please refresh the page.');
          resolve();
        }
      });
    },

    async _deleteSite(url) {
      return new Promise(resolve => {
        try {
          chrome.storage.local.remove([this._key(url)], () => {
            if (chrome.runtime.lastError) console.warn(chrome.runtime.lastError);
            resolve();
          });
        } catch (e) {
          console.warn('[DOM Surgeon] Extension context invalidated. Please refresh the page.');
          resolve();
        }
      });
    },

    _emitBadgeUpdate(url) {
      const pageKey = window.location.origin + window.location.pathname;
      if (url !== pageKey) return;

      this.getChangeCount(url).then((count) => {
        try {
          chrome.runtime.sendMessage({ type: 'update-badge', count });
        } catch (e) {
          // Extension context invalidated
        }
      });
    }
  };

  DS.Storage = Storage;
})();
