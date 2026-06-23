/**
 * DOM Surgeon — Main Content Script
 * Entry point that boots every module, creates the Shadow DOM host,
 * replays persisted changes, and handles messages from the popup / background.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const Main = {
    _host: null,
    _shadow: null,

    // ── Bootstrap ──────────────────────────────────────

    async init() {
      // Avoid double-init (can happen with extension reload)
      if (document.getElementById('dom-surgeon-host')) return;

      // 1. Create Shadow DOM host
      this._host = document.createElement('div');
      this._host.id = 'dom-surgeon-host';
      this._host.style.cssText = [
        'position:fixed !important',
        'top:0 !important',
        'left:0 !important',
        'width:0 !important',
        'height:0 !important',
        'overflow:visible !important',
        'z-index:2147483646 !important',
        'pointer-events:none !important',
        'padding:0 !important',
        'margin:0 !important',
        'border:none !important',
        'background:none !important',
        'display:block !important',
        'opacity:1 !important',
        'visibility:visible !important'
      ].join(';');
      document.documentElement.appendChild(this._host);

      this._shadow = this._host.attachShadow({ mode: 'closed' });

      // 2. Inject styles into shadow
      const style = document.createElement('style');
      style.textContent = this._collectStyles();
      this._shadow.appendChild(style);

      // 3. Load Google Fonts (Inter) via link — inside shadow
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
      this._shadow.appendChild(fontLink);

      // 4. Initialize modules
      DS.Toast.init(this._shadow);
      DS.EditorPanel.init(this._shadow);
      DS.Selector.init();

      // 5. Replay saved changes
      await this._replay();

      // 6. Listen for messages from popup / background
      chrome.runtime.onMessage.addListener(this._onMessage.bind(this));

      // 7. Update badge
      this._syncBadge();

      console.log('[DOM Surgeon] Initialized');
    },

    // ── Message handler ────────────────────────────────

    _onMessage(msg, _sender, sendResponse) {
      switch (msg.type) {
        case 'toggle-selector': {
          const on = DS.Selector.toggle();
          DS.Toast.show(
            on ? 'Selector mode on — click any element' : 'Selector mode off',
            'info'
          );
          sendResponse({ active: on });
          break;
        }

        case 'undo':
          this.undo().then(() => sendResponse({ ok: true }));
          return true; // async

        case 'redo':
          this.redo().then(() => sendResponse({ ok: true }));
          return true;

        case 'reset':
          this.reset().then(() => sendResponse({ ok: true }));
          return true;

        case 'get-status': {
          const url = this._pageKey();
          DS.Storage.getChangeCount(url).then((count) => {
            sendResponse({
              active: DS.Selector.isActive(),
              changeCount: count
            });
          });
          return true;
        }

        case 'get-changes': {
          const url = this._pageKey();
          DS.Storage.getChanges(url).then((changes) => {
            sendResponse({ changes });
          });
          return true;
        }

        case 'undo-specific':
          this.undoSpecific(msg.changeId).then(() => sendResponse({ ok: true }));
          return true;
      }
    },

    // ── Undo / Redo / Reset ────────────────────────────

    async undo() {
      const url = this._pageKey();
      const change = await DS.History.undo(url);
      if (!change) {
        DS.Toast.show('Nothing to undo', 'warning');
        return;
      }

      const target = this._revert(change);
      await DS.Storage.removeChange(url, change.id);
      DS.Toast.show('Change undone', 'info');
      this._afterChange();

      if (target && DS.Selector.flashHighlight) {
        DS.Selector.flashHighlight(target);
      }
    },

    async redo() {
      const url = this._pageKey();
      const change = await DS.History.redo(url);
      if (!change) {
        DS.Toast.show('Nothing to redo', 'warning');
        return;
      }

      const target = this._apply(change);
      await DS.Storage.saveChange(url, change);
      DS.Toast.show('Change reapplied', 'info');
      this._afterChange();

      if (target && DS.Selector.flashHighlight) {
        DS.Selector.flashHighlight(target);
      }
    },

    async reset() {
      const url = this._pageKey();
      const changes = await DS.Storage.getChanges(url);

      // Revert in reverse order
      for (let i = changes.length - 1; i >= 0; i--) {
        this._revert(changes[i]);
      }

      await DS.Storage.clearChanges(url);
      await DS.History.reset(url);

      DS.Selector.deselect();
      DS.Toast.show('All changes reset', 'success');
      this._syncBadge();
    },

    /** Undo a single specific change by ID (from history list). */
    async undoSpecific(changeId) {
      const url = this._pageKey();
      const changes = await DS.Storage.getChanges(url);
      const change = changes.find(c => c.id === changeId);

      if (!change) {
        DS.Toast.show('Change not found', 'warning');
        return;
      }

      // Revert this change on the DOM
      const target = this._revert(change);

      // Remove from storage
      await DS.Storage.removeChange(url, changeId);

      // Remove from undoStack, but PUSH to redoStack so it can be redone
      const history = await DS.Storage.getHistory(url);
      history.undoStack = history.undoStack.filter(c => c.id !== changeId);
      history.redoStack.push(change);
      await DS.Storage.saveHistory(url, history);

      DS.Toast.show('Change undone', 'info');
      this._afterChange();

      if (target && DS.Selector.flashHighlight) {
        DS.Selector.flashHighlight(target);
      }
    },

    // ── Replay saved changes on page load ──────────────

    async _replay() {
      const url = this._pageKey();
      const changes = await DS.Storage.getChanges(url);
      let applied = 0;

      for (const ch of changes) {
        if (this._apply(ch)) applied++;
      }

      if (applied > 0) {
        console.log(`[DOM Surgeon] Replayed ${applied}/${changes.length} changes`);
      }
    },

    // ── Apply / Revert a single change ─────────────────

    _apply(ch) {
      const el = DS.SelectorEngine.find(ch.selector);

      switch (ch.type) {
        case 'delete':
          if (el) { el.remove(); return el; }
          console.warn('[DOM Surgeon] Delete target not found:', ch.selector);
          return null;

        case 'resize':
          if (el) { el.style[ch.property] = ch.modified; return el; }
          console.warn('[DOM Surgeon] Resize target not found:', ch.selector);
          return null;

        default:
          console.warn('[DOM Surgeon] Unknown change type:', ch.type);
          return null;
      }
    },

    _revert(ch) {
      switch (ch.type) {
        case 'delete': {
          // Re-insert from stored outerHTML
          const parent = DS.SelectorEngine.find(ch.parentSelector);
          if (!parent || !ch.outerHTML) {
            console.warn('[DOM Surgeon] Cannot restore deleted element — parent not found');
            return null;
          }
          const tmp = document.createElement('div');
          tmp.innerHTML = ch.outerHTML;
          const restored = tmp.firstElementChild;
          if (!restored) return null;

          const children = Array.from(parent.children);
          if (ch.childIndex < children.length) {
            parent.insertBefore(restored, children[ch.childIndex]);
          } else {
            parent.appendChild(restored);
          }
          return restored;
        }

        case 'resize': {
          const el = DS.SelectorEngine.find(ch.selector);
          if (!el) return null;
          if (ch.original) {
            el.style[ch.property] = ch.original;
          } else {
            el.style.removeProperty(ch.property);
          }
          return el;
        }
      }
      return null;
    },

    // ── Helpers ─────────────────────────────────────────

    _afterChange() {
      this._syncBadge();
      const sel = DS.Selector.getSelectedElement();
      if (sel && document.body.contains(sel)) {
        DS.EditorPanel.show(sel);
        DS.Selector.refreshSelection();
      } else {
        DS.Selector.deselect();
      }
    },

    _syncBadge() {
      const url = this._pageKey();
      DS.Storage.getChangeCount(url).then((count) => {
        try { chrome.runtime.sendMessage({ type: 'update-badge', count }); }
        catch (e) { /* context invalidated */ }
      });
    },

    _pageKey() {
      return window.location.origin + window.location.pathname;
    },

    _collectStyles() {
      let css = '';
      if (DS.Toast?.getStyles) css += DS.Toast.getStyles();
      if (DS.EditorPanel?.getStyles) css += DS.EditorPanel.getStyles();
      return css;
    }
  };

  DS.Main = Main;

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Main.init());
  } else {
    Main.init();
  }
})();
