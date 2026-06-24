/**
 * DOM Surgeon — History Manager
 * Per-URL undo/redo stacks backed by chrome.storage.
 * Max 50 entries per stack to prevent unbounded growth.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const MAX_STACK = 50;

  const History = {

    /** Push a new change onto the undo stack. Clears redo stack. */
    async push(url, change, isGlobal = false) {
      const h = await DS.Storage.getHistory(url, isGlobal);
      h.undoStack.push(change);
      h.redoStack = [];

      // Trim oldest entries if over limit
      while (h.undoStack.length > MAX_STACK) {
        h.undoStack.shift();
      }

      await DS.Storage.saveHistory(url, h, isGlobal);
    },

    /** Pop the last change from undo stack → push to redo. Returns the change, or null. */
    async undo(url, isGlobal = false) {
      const h = await DS.Storage.getHistory(url, isGlobal);
      if (h.undoStack.length === 0) return null;

      const change = h.undoStack.pop();
      h.redoStack.push(change);
      await DS.Storage.saveHistory(url, h, isGlobal);
      return change;
    },

    /** Pop from redo stack → push to undo. Returns the change, or null. */
    async redo(url, isGlobal = false) {
      const h = await DS.Storage.getHistory(url, isGlobal);
      if (h.redoStack.length === 0) return null;

      const change = h.redoStack.pop();
      h.undoStack.push(change);
      await DS.Storage.saveHistory(url, h, isGlobal);
      return change;
    },

    async canUndo(url, isGlobal = false) {
      const h = await DS.Storage.getHistory(url, isGlobal);
      return h.undoStack.length > 0;
    },

    async canRedo(url, isGlobal = false) {
      const h = await DS.Storage.getHistory(url, isGlobal);
      return h.redoStack.length > 0;
    },

    /** Clear both stacks for a URL. */
    async reset(url, isGlobal = false) {
      await DS.Storage.saveHistory(url, { undoStack: [], redoStack: [] }, isGlobal);
    },

    /** Remove a specific change by ID from both stacks. */
    async removeSpecific(url, changeId, isGlobal = false) {
      const h = await DS.Storage.getHistory(url, isGlobal);
      h.undoStack = h.undoStack.filter(c => c.id !== changeId);
      h.redoStack = h.redoStack.filter(c => c.id !== changeId);
      await DS.Storage.saveHistory(url, h, isGlobal);
    }
  };

  DS.History = History;
})();
