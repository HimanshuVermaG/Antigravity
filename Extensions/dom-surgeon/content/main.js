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

    _pendingChanges: [],
    _observer: null,

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
      DS.ChangeSidebar?.init(this._shadow);
      DS.Breadcrumb?.init(this._shadow);
      DS.MultiSelect?.init(this._shadow);
      DS.ShortcutOverlay?.init(this._shadow);
      DS.Selector.init();

      // Before/After badge in shadow DOM
      this._buildBeforeAfterBadge();

      // B-key for Before/After toggle (active globally when widget is open)
      document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'b' && !e.metaKey && !e.ctrlKey) {
          const target = e.target;
          if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
          // Only fire when selector is NOT in typing mode
          if (target.closest?.('#dom-surgeon-host')) return;
          // Only fire when selector is NOT in typing mode
          if (DS.Selector.isActive()) {
            e.preventDefault();
            this._toggleBeforeAfter();
          }
        } else if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
          const target = e.target;
          if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
          if (DS.Selector.isActive()) {
            e.preventDefault();
            DS.ChangeSidebar?.toggle();
          }
        }
      }, true);

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

        case 'scan-suggestions': {
          const suggestions = DS.SmartSuggestions?.scan() || [];
          sendResponse({ suggestions });
          return true;
        }

        case 'clean-suggestions':
          DS.SmartSuggestions?.clean(msg.selectors).then(() => {
            sendResponse({ ok: true });
          });
          return true;

        case 'dashboard-preview':
          this.previewChange(msg.changeId);
          sendResponse({ ok: true });
          return true;

        case 'dashboard-revert':
          if (msg.change) {
            this._revert(msg.change);
            this._afterChange();
            DS.Toast?.show('Change undone via dashboard', 'info');
          }
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
            const originalDisplay = el.style.display || '';
            const preHideRect = el.getBoundingClientRect(); // Capture rect BEFORE setting display: none
            
            const change = {
              id: 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
              selector,
              type: 'hide',
              original: originalDisplay,
              modified: 'none',
              timestamp: Date.now()
            };
            
            el.dataset.dsHidden = 'true';
            el.dataset.dsOriginalDisplay = originalDisplay;
            el.style.display = 'none';

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
      // Try local history first, then global
      let change = await DS.History.undo(url, false);
      let isGlobal = false;
      if (!change) {
        change = await DS.History.undo(url, true);
        isGlobal = true;
      }
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
      // Try local history first, then global
      let change = await DS.History.redo(url, false);
      if (!change) {
        change = await DS.History.redo(url, true);
      }
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

      // Clear both local and global changes & history
      await DS.Storage.clearChanges(url);
      await DS.Storage._deleteData(DS.Storage._domainKey(url));
      await DS.History.reset(url, false);
      await DS.History.reset(url, true);

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

      this._previewNodes = [];
      this._doPreview(change);
    },

    _doPreview(change) {
      if (change.type === 'batch') {
        change.changes.forEach(c => this._doPreview(c));
        return;
      }

      switch (change.type) {
        case 'inject-css': {
          const styleEl = document.createElement('style');
          styleEl.textContent = change.cssText;
          document.head.appendChild(styleEl);
          this._previewNodes.push({ el: document.head, change: change, isRestored: false, injectedStyle: styleEl });
          break;
        }

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
          
          this._previewNodes.push({ el: restored, change: change, isRestored: true });
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
          
          this._previewNodes.push({ el, change, originalStyle: this._previewOriginalStyle });
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }

        case 'style': {
          const el = DS.SelectorEngine.find(change.selector);
          if (!el) return;

          this._previewOriginalStyle = el.style[change.property] || '';
          if (change.original !== undefined && change.original !== '') {
            el.style[change.property] = change.original;
          } else {
            el.style.removeProperty(change.property);
          }

          el.style.boxShadow = '0 0 0 2px #EAB308, 0 0 20px rgba(234, 179, 8, 0.4)';
          el.style.transition = 'all 0.2s ease';
          
          this._previewNodes.push({ el, change, originalStyle: this._previewOriginalStyle });
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }

        case 'hide': {
          const el = DS.SelectorEngine.find(change.selector);
          if (!el) return;

          // Hiding means original was visible. We preview the original visible state.
          el.style.display = change.original || '';
          el.style.boxShadow = '0 0 0 2px #EAB308, 0 0 20px rgba(234, 179, 8, 0.4)';
          el.style.transition = 'all 0.2s ease';
          
          this._previewNodes.push({ el, change });
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }

        case 'show': {
          const el = DS.SelectorEngine.find(change.selector);
          if (!el) return;

          // Showing means original was hidden. We preview the original hidden state.
          el.style.boxShadow = '0 0 0 2px #EAB308, 0 0 20px rgba(234, 179, 8, 0.4)';
          el.style.transition = 'all 0.2s ease';
          
          this._previewNodes.push({ el, change });
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    },

    clearPreview() {
      if (!this._previewNodes || this._previewNodes.length === 0) return;

      for (const { el, change, originalStyle, isRestored, injectedStyle } of this._previewNodes) {
        if (!el) continue;
        
        if (change.type === 'inject-css' && injectedStyle) {
          injectedStyle.remove();
        } else if (change.type === 'delete' && isRestored) {
          el.remove();
        } else if (change.type === 'resize' || change.type === 'style') {
          if (change.styles && originalStyle && typeof originalStyle === 'object') {
            for (const p in change.styles) {
              if (change.styles[p].modified !== undefined && change.styles[p].modified !== '') {
                el.style[p] = change.styles[p].modified;
              } else {
                el.style.removeProperty(p);
              }
            }
          } else {
            if (change.modified !== undefined && change.modified !== '') {
               el.style[change.property] = change.modified;
            } else {
               el.style.removeProperty(change.property);
            }
          }
          el.style.boxShadow = '';
        } else if (change.type === 'hide') {
          el.style.display = 'none';
          el.style.boxShadow = '';
        } else if (change.type === 'show') {
          el.style.display = change.modified || '';
          el.style.boxShadow = '';
        }
      }

      this._previewNodes = [];
    },

    // ── Replay saved changes on page load ──────────────

    async _replay() {
      const url = this._pageKey();
      const changes = await DS.Storage.getChanges(url);
      let applied = 0;
      this._pendingChanges = [];

      for (const ch of changes) {
        if (ch.type === 'batch') {
          let batchApplied = false;
          for (const sub of ch.changes) {
            if (this._apply(sub)) {
              batchApplied = true;
            } else if (sub.type !== 'inject-css') {
              this._pendingChanges.push(sub);
            }
          }
          if (batchApplied) applied++;
        } else {
          if (this._apply(ch)) {
            applied++;
          } else if (ch.type !== 'inject-css') {
            this._pendingChanges.push(ch);
          }
        }
      }

      this._activeChanges = changes;

      if (applied > 0) {
        console.log(`[DOM Surgeon] Replayed ${applied}/${changes.length} changes`);
      }

      if (this._activeChanges.length > 0) {
        this._startObserver();
        this._startUrlPoller();
      } else {
        this._stopObserver();
        this._stopUrlPoller();
      }
    },

    _startUrlPoller() {
      if (this._urlPoller) return;
      this._lastUrl = this._pageKey();
      this._urlPoller = setInterval(() => {
        const currentUrl = this._pageKey();
        if (currentUrl !== this._lastUrl) {
          this._lastUrl = currentUrl;
          console.log('[DOM Surgeon] URL changed (SPA Navigation detected). Replaying changes.');
          // Re-fetch and apply new changes for the new URL
          this._replay();
        }
      }, 500);
    },

    _stopUrlPoller() {
      if (this._urlPoller) {
        clearInterval(this._urlPoller);
        this._urlPoller = null;
      }
    },

    _stopObserver() {
      if (this._observerTimeout) {
        clearTimeout(this._observerTimeout);
        this._observerTimeout = null;
      }
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
    },

    _startObserver() {
      if (this._observer) {
        // If already running, just reset the 30s timeout
        if (this._observerTimeout) clearTimeout(this._observerTimeout);
        this._observerTimeout = setTimeout(() => this._stopObserver(), 30000);
        return;
      }
      
      let debounceTimer = null;

      this._observer = new MutationObserver((mutations) => {
        if (!this._activeChanges || this._activeChanges.length === 0) {
          this._stopObserver();
          return;
        }

        // Ignore mutations inside our own shadow DOM host to prevent infinite loops
        const validMutations = mutations.filter(m => !m.target.closest('#dom-surgeon-host'));
        const hasAdded = validMutations.some(m => m.addedNodes.length > 0);
        
        if (!hasAdded) return;

        // Debounce to prevent layout thrashing on heavy SPA loads
        if (debounceTimer) cancelAnimationFrame(debounceTimer);
        debounceTimer = requestAnimationFrame(() => {
          this._checkDynamicElements();
        });
      });

      this._observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      
      // Auto-disconnect after 30s to save CPU
      if (this._observerTimeout) clearTimeout(this._observerTimeout);
      this._observerTimeout = setTimeout(() => {
        console.log('[DOM Surgeon] Observer timed out after 30s to save CPU.');
        this._stopObserver();
      }, 30000);
    },

    _checkDynamicElements() {
      if (!this._activeChanges) return;
      for (const ch of this._activeChanges) {
        this._apply(ch);
      }
    },

    // ── Apply / Revert a single change ─────────────────

    _apply(ch) {
      if (ch.type === 'batch') {
        let anyApplied = false;
        ch.changes.forEach(sub => {
          if (this._apply(sub)) anyApplied = true;
        });
        return anyApplied ? true : null;
      }

      const el = DS.SelectorEngine.find(ch.selector);
      
      if (el && ch.isGlobal) {
         if (!this._validateFingerprint(el, ch.fingerprint)) {
            console.warn(`[DOM Surgeon] Global rule skipped due to fingerprint mismatch on ${ch.selector}`);
            return null;
         }
      }

      switch (ch.type) {
        case 'inject-css': {
          let styleEl = document.head.querySelector(`style[data-ds-id="${ch.id}"]`);
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.dataset.dsId = ch.id;
            document.head.appendChild(styleEl);
          }
          styleEl.textContent = ch.cssText;
          return document.head;
        }

        case 'delete':
          if (el) { el.remove(); return el; }
          return null;

        case 'resize':
          if (el) {
            if (ch.styles) {
              let alreadyApplied = true;
              for (const p in ch.styles) {
                if (el.style[p] !== ch.styles[p].modified) {
                   alreadyApplied = false;
                   break;
                }
              }
              if (alreadyApplied) return el;
              
              for (const p in ch.styles) {
                el.style[p] = ch.styles[p].modified;
              }
            } else {
              if (el.style[ch.property] === ch.modified) return el;
              el.style[ch.property] = ch.modified;
            }
            return el;
          }
          return null;

        case 'hide':
          if (el) {
            if (el.dataset.dsHidden === 'true') return el;
            const origDisplay = ch.original || '';
            el.dataset.dsHidden = 'true';
            el.dataset.dsOriginalDisplay = origDisplay;
            el.style.display = 'none';
            return el;
          }
          return null;

        case 'show':
          if (el) {
            const display = ch.modified || '';
            el.style.display = display;
            el.style.removeProperty('pointer-events');
            delete el.dataset.dsHidden;
            delete el.dataset.dsOriginalDisplay;
            return el;
          }
          return null;

        case 'style':
          if (el) {
            if (ch.modified !== undefined && ch.modified !== '') {
              if (el.style[ch.property] === ch.modified) return el;
              el.style[ch.property] = ch.modified;
            } else {
              if (!el.style[ch.property]) return el;
              el.style.removeProperty(ch.property);
            }
            return el;
          }
          return null;

        default:
          console.warn('[DOM Surgeon] Unknown change type:', ch.type);
          return null;
      }
    },

    _revert(ch) {
      if (ch.type === 'batch') {
        let firstTarget = null;
        // Revert in reverse order
        for (let i = ch.changes.length - 1; i >= 0; i--) {
          const t = this._revert(ch.changes[i]);
          if (!firstTarget) firstTarget = t;
        }
        return firstTarget;
      }

      switch (ch.type) {
        case 'inject-css': {
          const styleEl = document.head.querySelector(`style[data-ds-id="${ch.id}"]`);
          if (styleEl) styleEl.remove();
          return document.head;
        }

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

        case 'style': {
          const el = DS.SelectorEngine.find(ch.selector);
          if (!el) return null;
          if (ch.original) {
            el.style[ch.property] = ch.original;
          } else {
            el.style.removeProperty(ch.property);
          }
          return el;
        }

        case 'hide': {
          // Undo a hide = show the element
          const el = DS.SelectorEngine.find(ch.selector);
          if (!el) return null;
          const origDisplay = ch.original || '';
          el.style.display = origDisplay;
          el.style.removeProperty('pointer-events');
          delete el.dataset.dsHidden;
          delete el.dataset.dsOriginalDisplay;
          return el;
        }

        case 'show': {
          // Undo a show = hide again
          const el = DS.SelectorEngine.find(ch.selector);
          if (!el) return null;
          el.dataset.dsHidden = 'true';
          el.dataset.dsOriginalDisplay = ch.original || '';
          el.style.display = 'none';
          return el;
        }
      }
      return null;
    },

    // ── Helpers ─────────────────────────────────────────

    async _afterChange() {
      const url = this._pageKey();
      const changes = await DS.Storage.getChanges(url);
      this._activeChanges = changes;
      
      if (changes.length > 0) {
        this._startObserver();
        this._startUrlPoller();
      } else {
        this._stopObserver();
        this._stopUrlPoller();
      }

      this._syncBadge();
      const sel = DS.Selector.getSelectedElement();
      if (sel && document.body.contains(sel)) {
        DS.EditorPanel.show(sel);
        DS.Selector.refreshSelection();
      } else {
        DS.Selector.deselect();
      }
    },

    // ── Before / After ───────────────────────────────────

    _beforeAfterMode: false,
    _beforeAfterSnapshot: null,
    _beforeAfterBadge: null,

    _buildBeforeAfterBadge() {
      const badge = document.createElement('div');
      badge.className = 'ds-ba-badge';
      badge.innerHTML = `
        <span>Viewing Original</span>
        <kbd>B</kbd>
        <span>to return</span>
      `;
      this._shadow.appendChild(badge);
      this._beforeAfterBadge = badge;
    },

    async _toggleBeforeAfter() {
      if (this._beforeAfterMode) {
        // Re-apply all changes
        this._beforeAfterMode = false;
        const url = this._pageKey();
        const changes = await DS.Storage.getChanges(url);
        for (const ch of changes) this._apply(ch);
        if (this._beforeAfterBadge) this._beforeAfterBadge.classList.remove('ds-ba-badge--visible');
        DS.Toast?.show('Changes restored', 'success');
      } else {
        // Revert all changes temporarily
        this._beforeAfterMode = true;
        const url = this._pageKey();
        const changes = await DS.Storage.getChanges(url);
        // Revert in reverse order
        for (let i = changes.length - 1; i >= 0; i--) this._revert(changes[i]);
        if (this._beforeAfterBadge) this._beforeAfterBadge.classList.add('ds-ba-badge--visible');
        DS.Toast?.show('Viewing original — press B to restore', 'info');
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
      if (DS.Breadcrumb?.getStyles) css += DS.Breadcrumb.getStyles();
      if (DS.BoxModel?.getStyles) css += DS.BoxModel.getStyles();
      if (DS.ShortcutOverlay?.getStyles) css += DS.ShortcutOverlay.getStyles();
      css += `
/* ── Before/After Badge ───────────────────────────── */
.ds-ba-badge {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(80px);
  background: rgba(15,15,18,0.96);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 30px;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  color: #EDEDEF;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  pointer-events: none;
  z-index: 2147483646;
  transition: transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 300ms ease;
  opacity: 0;
}
.ds-ba-badge--visible {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
.ds-ba-badge kbd {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px;
  padding: 1px 6px;
  font-family: 'SF Mono', monospace;
  font-size: 11px;
  color: #818CF8;
}
`;
      return css;
    }
  };

  DS.Main = Main;

  // ── Zero-Impact Boot ──────────────────────────────
  Main.boot = function() {
    // 1. Setup message listener for explicit user actions
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if ((msg.type === 'toggle-widget' || msg.type === 'toggle-selector')) {
        if (!Main._shadow) {
          Main.init().then(() => Main._onMessage(msg, sender, sendResponse));
          return true;
        }
      }
      // other messages handled by Main._onMessage if initialized
    });

    // 2. Check storage for any rules for this domain to see if we should init immediately
    chrome.storage.local.get(null, (data) => {
      const hostname = window.location.hostname;
      const origin = window.location.origin;
      const hasChanges = Object.keys(data).some(k => 
         k.includes(hostname) || k.includes(origin)
      );
      if (hasChanges) {
        Main.init();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Main.boot());
  } else {
    Main.boot();
  }
})();
