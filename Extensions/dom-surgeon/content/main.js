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

    _previewNode: null,
    _previewOriginalStyle: null,
    _previewChange: null,

    /** Create a semantic fingerprint to ensure a selector matches the correct element across pages */
    _fingerprint(el) {
      if (!el) return null;
      return {
        tag: el.tagName.toLowerCase(),
        classes: Array.from(el.classList).sort()
      };
    },

    /** Validate if the found element matches the fingerprint of the originally modified element */
    _validateFingerprint(el, fp) {
      if (!fp) return true; // Legacy changes have no fingerprint
      if (el.tagName.toLowerCase() !== fp.tag) return false;
      
      // Strict class match is too brittle because active states change classes.
      // We just ensure the original classes are a subset of the current classes, or close enough.
      // Actually, matching tag name + the specific selector is usually 99% accurate.
      // We will just do a simple intersection check. If it shares at least one class (if it had classes), good.
      if (fp.classes.length > 0) {
         const currentClasses = Array.from(el.classList);
         const hasSharedClass = fp.classes.some(c => currentClasses.includes(c));
         if (!hasSharedClass && currentClasses.length > 0) return false;
      }
      return true;
    },

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
      DS.Widget.init(this._shadow);
      DS.Selector.init();

      // 5. Replay saved changes
      await this._replay();

      // 6. Listen for messages from popup / background
      chrome.runtime.onMessage.addListener(this._onMessage.bind(this));

      // Context menu tracking
      document.addEventListener('contextmenu', (e) => {
        this._contextMenuTarget = e.target;
      }, true);

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
          DS.Widget?.refresh();
          break;
        }

        case 'toggle-widget':
          DS.Widget?.toggle();
          sendResponse({ ok: true });
          return true;

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

        case 'preview-change':
          this.previewChange(msg.changeId).then(() => sendResponse({ ok: true }));
          return true;

        case 'clear-preview':
          this.clearPreview();
          sendResponse({ ok: true });
          return true;

        case 'context-action': {
          if (!this._contextMenuTarget) {
            sendResponse({ ok: false, error: 'No target found' });
            return true;
          }
          const el = this._contextMenuTarget;
          const url = this._pageKey();
          
          if (msg.action === 'delete') {
            const selector = DS.SelectorEngine.generate(el);
            const parent = el.parentElement;
            const parentSelector = parent ? DS.SelectorEngine.generate(parent) : null;
            const childIndex = parent ? Array.from(parent.children).indexOf(el) : 0;
            
            const change = {
              id: 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
              selector,
              type: 'delete',
              outerHTML: el.outerHTML,
              parentSelector,
              childIndex,
              isGlobal: false,
              fingerprint: this._fingerprint(el),
              timestamp: Date.now()
            };
            
            this._apply(change);
            DS.Storage.saveChange(url, change).then(() => {
              DS.History.push(url, change);
              DS.Toast.show('Element deleted via context menu', 'success');
              this._afterChange();
            });
          } else if (msg.action === 'hide') {
            const selector = DS.SelectorEngine.generate(el);
            const oldVal = el.style.opacity || '';
            const change = {
              id: 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
              selector,
              type: 'resize',
              property: 'opacity',
              original: oldVal,
              modified: '0',
              timestamp: Date.now()
            };
            
            this._apply(change);
            el.style.pointerEvents = 'none'; // also disable interactions
            DS.Storage.saveChange(url, change).then(() => {
              DS.History.push(url, change);
              DS.Toast.show('Element hidden via context menu', 'success');
              this._afterChange();
            });
          }
          
          sendResponse({ ok: true });
          return true;
        }
      }
    },

    // ── Undo / Redo / Reset ────────────────────────────

    async undo() {
      this.clearPreview();
      const url = this._pageKey();
      const change = await DS.History.undo(url);
      if (!change) {
        DS.Toast.show('Nothing to undo', 'warning');
        return;
      }

      const target = this._revert(change);
      await DS.Storage.removeChange(url, change.id, change.isGlobal);
      DS.Toast.show('Change undone', 'info');
      this._afterChange();

      if (target && DS.Selector.flashHighlight) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        DS.Selector.flashHighlight(target);
      }
    },

    async redo() {
      this.clearPreview();
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
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        DS.Selector.flashHighlight(target);
      }
    },

    async reset() {
      this.clearPreview();
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
      this.clearPreview();
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
      await DS.Storage.removeChange(url, changeId, change.isGlobal);

      // Remove from undoStack, but PUSH to redoStack so it can be redone
      const history = await DS.Storage.getHistory(url, change.isGlobal);
      history.undoStack = history.undoStack.filter(c => c.id !== changeId);
      history.redoStack.push(change);
      await DS.Storage.saveHistory(url, history, change.isGlobal);

      DS.Toast.show('Change undone', 'info');
      this._afterChange();

      if (target && DS.Selector.flashHighlight) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        DS.Selector.flashHighlight(target);
      }
    },

    // ── Preview Logic ──────────────────────────────────

    async previewChange(changeId) {
      this.clearPreview();

      const url = this._pageKey();
      const changes = await DS.Storage.getChanges(url);
      const change = changes.find(c => c.id === changeId);
      if (!change) return;

      this._previewChange = change;

      switch (change.type) {
        case 'delete': {
          const parent = DS.SelectorEngine.find(change.parentSelector);
          if (!parent) return;

          const tmp = document.createElement('div');
          tmp.innerHTML = change.outerHTML;
          const restored = tmp.firstElementChild;
          if (!restored) return;

          const children = Array.from(parent.children);
          if (change.childIndex < children.length) {
            parent.insertBefore(restored, children[change.childIndex]);
          } else {
            parent.appendChild(restored);
          }

          restored.style.opacity = '0.7';
          restored.style.boxShadow = '0 0 0 2px #EAB308, 0 0 20px rgba(234, 179, 8, 0.4)';
          restored.style.pointerEvents = 'none';
          restored.style.transition = 'all 0.2s ease';
          
          this._previewNode = restored;
          restored.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }

        case 'resize': {
          const el = DS.SelectorEngine.find(change.selector);
          if (!el) return;

          if (change.styles) {
            this._previewOriginalStyle = {};
            for (const p in change.styles) {
              this._previewOriginalStyle[p] = el.style[p] || '';
              if (change.styles[p].original) {
                el.style[p] = change.styles[p].original;
              } else {
                el.style.removeProperty(p);
              }
            }
          } else {
            this._previewOriginalStyle = el.style[change.property] || '';
            if (change.original) {
              el.style[change.property] = change.original;
            } else {
              el.style.removeProperty(change.property);
            }
          }

          el.style.boxShadow = '0 0 0 2px #EAB308, 0 0 20px rgba(234, 179, 8, 0.4)';
          el.style.transition = 'all 0.2s ease';
          
          this._previewNode = el;
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    },

    clearPreview() {
      if (!this._previewChange) return;

      const ch = this._previewChange;
      const el = this._previewNode;

      if (el) {
        if (ch.type === 'delete') {
          el.remove();
        } else if (ch.type === 'resize') {
          if (ch.styles && this._previewOriginalStyle && typeof this._previewOriginalStyle === 'object') {
            for (const p in ch.styles) {
              if (this._previewOriginalStyle[p]) {
                el.style[p] = this._previewOriginalStyle[p];
              } else {
                el.style.removeProperty(p);
              }
            }
          } else {
            if (this._previewOriginalStyle) {
               el.style[ch.property] = this._previewOriginalStyle;
            } else {
               el.style.removeProperty(ch.property);
            }
          }
          el.style.boxShadow = '';
        }
      }

      this._previewNode = null;
      this._previewOriginalStyle = null;
      this._previewChange = null;
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
      
      if (el && ch.isGlobal) {
         if (!this._validateFingerprint(el, ch.fingerprint)) {
            console.warn(`[DOM Surgeon] Global rule skipped due to fingerprint mismatch on ${ch.selector}`);
            return null;
         }
      }

      switch (ch.type) {
        case 'delete':
          if (el) { el.remove(); return el; }
          console.warn('[DOM Surgeon] Delete target not found:', ch.selector);
          return null;

        case 'resize':
          if (el) {
            if (ch.styles) {
              for (const p in ch.styles) {
                el.style[p] = ch.styles[p].modified;
              }
            } else {
              el.style[ch.property] = ch.modified;
            }
            return el;
          }
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
          
          if (ch.styles) {
            for (const p in ch.styles) {
              if (ch.styles[p].original) {
                el.style[p] = ch.styles[p].original;
              } else {
                el.style.removeProperty(p);
              }
            }
          } else {
            if (ch.original) {
              el.style[ch.property] = ch.original;
            } else {
              el.style.removeProperty(ch.property);
            }
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
        DS.Widget?.refresh();
      });
    },

    _pageKey() {
      return window.location.origin + window.location.pathname;
    },

    _collectStyles() {
      let css = '';
      if (DS.Toast?.getStyles) css += DS.Toast.getStyles();
      if (DS.EditorPanel?.getStyles) css += DS.EditorPanel.getStyles();
      if (DS.Widget?.getStyles) css += DS.Widget.getStyles();
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
