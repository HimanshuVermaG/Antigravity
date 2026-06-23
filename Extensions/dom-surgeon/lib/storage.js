/**
 * DOM Surgeon — Storage Manager
 * Abstraction over chrome.storage.local for persisting element changes.
 * Writes are debounced to avoid hammering the storage API.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const STORAGE_KEY = 'domSurgeonData';
  const DEBOUNCE_MS = 300;

  const Storage = {
    _cache: null,
    _writeTimer: null,

    // ── Public API ─────────────────────────────────────

    /** Append a change record for the given URL. */
    async saveChange(url, change) {
      const data = await this._load();
      this._ensureSite(data, url);
      data.sites[url].changes.push(change);
      this._scheduleWrite();
      this._emitBadgeUpdate(url);
    },

    /** Get all change records for a URL. */
    async getChanges(url) {
      const data = await this._load();
      return data.sites[url]?.changes || [];
    },

    /** Remove a specific change by ID. */
    async removeChange(url, changeId) {
      const data = await this._load();
      const site = data.sites[url];
      if (!site) return;

      site.changes = site.changes.filter(c => c.id !== changeId);

      // Clean up empty sites
      if (site.changes.length === 0 &&
          site.history.undoStack.length === 0 &&
          site.history.redoStack.length === 0) {
        delete data.sites[url];
      }

      this._scheduleWrite();
      this._emitBadgeUpdate(url);
    },

    /** Clear all changes and history for a URL. */
    async clearChanges(url) {
      const data = await this._load();
      delete data.sites[url];
      this._scheduleWrite();
      this._emitBadgeUpdate(url);
    },

    /** Get undo/redo history stacks for a URL. */
    async getHistory(url) {
      const data = await this._load();
      return data.sites[url]?.history || { undoStack: [], redoStack: [] };
    },

    /** Save undo/redo history stacks for a URL. */
    async saveHistory(url, history) {
      const data = await this._load();
      this._ensureSite(data, url);
      data.sites[url].history = history;
      this._scheduleWrite();
    },

    /** Count of changes for a URL. */
    async getChangeCount(url) {
      const changes = await this.getChanges(url);
      return changes.length;
    },

    /** Export entire dataset as a plain object (for JSON export). */
    async getAllData() {
      const data = await this._load();
      return JSON.parse(JSON.stringify(data));
    },

    /** Import a dataset, fully replacing current data. */
    async importData(json) {
      try {
        const parsed = typeof json === 'string' ? JSON.parse(json) : json;
        if (!parsed || !parsed.sites || typeof parsed.version !== 'number') {
          throw new Error('Invalid DOM Surgeon data format');
        }
        this._cache = parsed;
        await this._writeNow();
        return { success: true };
      } catch (e) {
        console.error('[DOM Surgeon] Import failed:', e);
        return { success: false, error: e.message };
      }
    },

    // ── Private ────────────────────────────────────────

    async _load() {
      if (this._cache) return this._cache;

      return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
          this._cache = result[STORAGE_KEY] || { version: 1, sites: {} };
          resolve(this._cache);
        });
      });
    },

    _ensureSite(data, url) {
      if (!data.sites[url]) {
        data.sites[url] = {
          changes: [],
          history: { undoStack: [], redoStack: [] }
        };
      }
    },

    _scheduleWrite() {
      clearTimeout(this._writeTimer);
      this._writeTimer = setTimeout(() => this._writeNow(), DEBOUNCE_MS);
    },

    _writeNow() {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: this._cache }, resolve);
      });
    },

    _emitBadgeUpdate(url) {
      const pageKey = window.location.origin + window.location.pathname;
      if (url !== pageKey) return;

      this.getChangeCount(url).then((count) => {
        try {
          chrome.runtime.sendMessage({ type: 'update-badge', count });
        } catch (e) {
          // Extension context invalidated (e.g., extension was reloaded)
        }
      });
    }
  };

  DS.Storage = Storage;
})();
