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
      const storageKey = change.isGlobal ? this._domainKey(url) : this._key(url);
      const site = await this._loadData(storageKey, url);
      site.changes.push(change);
      await this._saveData(storageKey, site);
      this._emitBadgeUpdate(url);
    },

    /** Get all change records for a URL (both global and local). */
    async getChanges(url) {
      const local = await this._loadData(this._key(url), url);
      const global = await this._loadData(this._domainKey(url), url);
      return [...global.changes, ...local.changes];
    },

    /** Remove a specific change by ID. */
    async removeChange(url, changeId, isGlobal = false) {
      const storageKey = isGlobal ? this._domainKey(url) : this._key(url);
      const site = await this._loadData(storageKey, url);
      
      const changeToRemove = site.changes.find(c => c.id === changeId);
      if (changeToRemove) {
        site.trash = site.trash || [];
        changeToRemove.deletedAt = Date.now();
        site.trash.unshift(changeToRemove); // Add to top of trash
        if (site.trash.length > 20) site.trash = site.trash.slice(0, 20);
      }

      site.changes = site.changes.filter(c => c.id !== changeId);

      if (site.changes.length === 0 &&
          (!site.trash || site.trash.length === 0) &&
          site.history.undoStack.length === 0 &&
          site.history.redoStack.length === 0) {
        await this._deleteData(storageKey);
      } else {
        await this._saveData(storageKey, site);
      }
      this._emitBadgeUpdate(url);
    },

    /** Restore a specific change from trash back to active changes. */
    async restoreChange(url, changeId, isGlobal = false) {
      const storageKey = isGlobal ? this._domainKey(url) : this._key(url);
      const site = await this._loadData(storageKey, url);
      
      if (!site.trash) return;
      const changeToRestore = site.trash.find(c => c.id === changeId);
      if (changeToRestore) {
        delete changeToRestore.deletedAt;
        site.changes.push(changeToRestore);
        site.trash = site.trash.filter(c => c.id !== changeId);
        await this._saveData(storageKey, site);
        this._emitBadgeUpdate(url);
      }
    },

    /** Update an existing change (e.g. editing properties or changing scope). */
    async updateChange(url, changeId, newChange, oldIsGlobal) {
      // 1. Remove from old location
      const oldStorageKey = oldIsGlobal ? this._domainKey(url) : this._key(url);
      const oldSite = await this._loadData(oldStorageKey, url);
      oldSite.changes = oldSite.changes.filter(c => c.id !== changeId);
      await this._saveData(oldStorageKey, oldSite);

      // 2. Add to new location
      const newStorageKey = newChange.isGlobal ? this._domainKey(url) : this._key(url);
      const newSite = await this._loadData(newStorageKey, url);
      
      // Preserve timestamp or other meta if needed, but newChange should have it
      newSite.changes.push(newChange);
      await this._saveData(newStorageKey, newSite);
      
      this._emitBadgeUpdate(url);
    },

    /** Clear all changes and history for a URL. */
    async clearChanges(url) {
      await this._deleteData(this._key(url));
      // Optionally could clear domain key, but usually reset just means this page.
      // We will leave domain key intact on "reset this page".
      this._emitBadgeUpdate(url);
    },

    /** Get undo/redo history stacks for a URL. */
    async getHistory(url, isGlobal = false) {
      const storageKey = isGlobal ? this._domainKey(url) : this._key(url);
      const site = await this._loadData(storageKey, url);
      return site.history;
    },

    /** Save undo/redo history stacks for a URL. */
    async saveHistory(url, history, isGlobal = false) {
      const storageKey = isGlobal ? this._domainKey(url) : this._key(url);
      const site = await this._loadData(storageKey, url);
      
      // Enforce a maximum history depth of 50 to prevent QUOTA_BYTES_PER_ITEM limit (8MB)
      if (history.undoStack && history.undoStack.length > 50) {
        history.undoStack = history.undoStack.slice(-50);
      }
      if (history.redoStack && history.redoStack.length > 50) {
        history.redoStack = history.redoStack.slice(-50);
      }
      
      site.history = history;
      await this._saveData(storageKey, site);
    },

    /** Get extension settings. */
    async getSettings() {
      return new Promise(resolve => {
        chrome.storage.local.get(['ds_settings'], res => {
          resolve(res.ds_settings || { highlightMode: 'xray' });
        });
      });
    },

    /** Save extension settings. */
    async saveSettings(settings) {
      return new Promise(resolve => {
        chrome.storage.local.get(['ds_settings'], res => {
          const newSettings = { ...(res.ds_settings || {}), ...settings };
          chrome.storage.local.set({ ds_settings: newSettings }, resolve);
        });
      });
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
          const exportData = {
            version: 2,
            records: {}
          };

          // Gather all per-URL and per-Domain keys intact
          for (const key in items) {
            if (key.startsWith('ds_site_') || key.startsWith('ds_domain_')) {
              exportData.records[key] = items[key];
            }
          }

          resolve(exportData);
        });
      });
    },

    /** Import a dataset, adding to current data. */
    async importData(json) {
      try {
        const parsed = typeof json === 'string' ? JSON.parse(json) : json;
        if (!parsed || (!parsed.sites && !parsed.records)) {
          throw new Error('Invalid DOM Surgeon data format');
        }
        
        const toSave = {};
        
        // Handle V1 format (older exports where keys were stripped)
        if (parsed.sites) {
          for (const url in parsed.sites) {
            toSave[this._key(url)] = parsed.sites[url];
          }
        }
        
        // Handle V2 format (new exports)
        if (parsed.records) {
          for (const key in parsed.records) {
            toSave[key] = parsed.records[key];
          }
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

    _domainKey(url) {
      try {
        return 'ds_domain_' + new URL(url).hostname;
      } catch(e) {
        return 'ds_domain_local';
      }
    },

    async _loadData(storageKey, urlForLegacyFallback) {
      return new Promise(resolve => {
        try {
          chrome.storage.local.get([storageKey, 'domSurgeonData'], result => {
            if (chrome.runtime.lastError) {
              return resolve({ changes: [], history: { undoStack: [], redoStack: [] } });
            }
            if (result[storageKey]) {
              if (result[storageKey].deletedAt) {
                // It's a tombstone, treat as completely empty
                return resolve({ changes: [], history: { undoStack: [], redoStack: [] } });
              }
              return resolve(result[storageKey]);
            }
            if (urlForLegacyFallback && storageKey.startsWith('ds_site_') && result.domSurgeonData?.sites?.[urlForLegacyFallback]) {
              return resolve(result.domSurgeonData.sites[urlForLegacyFallback]);
            }
            resolve({ changes: [], history: { undoStack: [], redoStack: [] } });
          });
        } catch (e) {
          console.warn('[DOM Surgeon] Extension context invalidated.');
          resolve({ changes: [], history: { undoStack: [], redoStack: [] } });
        }
      });
    },

    async _saveData(storageKey, siteData) {
      return new Promise(resolve => {
        try {
          siteData.lastModified = Date.now();
          chrome.storage.local.set({ [storageKey]: siteData }, () => {
            if (chrome.runtime.lastError) console.warn(chrome.runtime.lastError);
            resolve();
          });
        } catch (e) {
          console.warn('[DOM Surgeon] Extension context invalidated.');
          resolve();
        }
      });
    },

    async _deleteData(storageKey) {
      return new Promise(resolve => {
        try {
          // Instead of chrome.storage.local.remove, write a tombstone
          chrome.storage.local.set({ [storageKey]: { deletedAt: Date.now() } }, () => {
            if (chrome.runtime.lastError) console.warn(chrome.runtime.lastError);
            resolve();
          });
        } catch (e) {
          console.warn('[DOM Surgeon] Extension context invalidated.');
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
