/**
 * DOM Surgeon — Element Selector
 * Handles hover highlighting, click-to-select, and keyboard navigation.
 * Overlay elements are placed directly on the page (not in Shadow DOM)
 * so they can visually overlay any page element.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const Selector = {
    _active: false,
    _hoveredEl: null,
    _selectedEl: null,

    // Overlay DOM nodes (injected into page)
    _hoverOverlay: null,
    _selectOverlay: null,
    _infoTag: null,

    // Bound listeners (for clean add/remove)
    _onMove: null,
    _onClick: null,
    _onKey: null,
    _onScroll: null,

    // ── Public API ─────────────────────────────────────

    init() {
      // Inject highlight mode CSS into document head
      if (!document.getElementById('ds-selector-styles')) {
        const style = document.createElement('style');
        style.id = 'ds-selector-styles';
        style.textContent = ``;
        document.head.appendChild(style);
      }

      DS.Storage.getSettings().then(settings => {
        this.mode = settings.highlightMode || 'depth';
      });

      this._hoverOverlay = this._makeOverlay('dom-surgeon-hover');
      this._selectOverlay = this._makeOverlay('dom-surgeon-select');
      this._infoTag = this._makeInfoTag();

      this._onMove = this._handleMove.bind(this);
      this._onClick = this._handleClick.bind(this);
      this._onKey = this._handleKey.bind(this);
      this._onScroll = this._handleScroll.bind(this);
    },

    setMode(mode) {
      this.mode = mode;
      DS.Storage.saveSettings({ highlightMode: mode });
      // Refresh current overlays if active
      if (this._hoveredEl && this._hoverOverlay.style.display !== 'none') {
        this._positionOverlay(this._hoverOverlay, this._hoveredEl, false);
      }
      if (this._selectedEl && this._selectOverlay.style.display !== 'none') {
        this._positionOverlay(this._selectOverlay, this._selectedEl, true);
      }
    },

    toggle() {
      this._active ? this.deactivate() : this.activate();
      return this._active;
    },

    activate() {
      if (this._active) return;
      this._active = true;

      document.addEventListener('mousemove', this._onMove, true);
      document.addEventListener('keydown', this._onKey, true);
      
      // Delay click listener to prevent catching the trailing click that activated the selector
      setTimeout(() => {
        if (this._active) {
          document.addEventListener('click', this._onClick, true);
        }
      }, 50);
      window.addEventListener('scroll', this._onScroll, true);
      window.addEventListener('resize', this._onScroll, true);

      document.body.style.setProperty('cursor', 'crosshair', 'important');
    },

    deactivate() {
      if (!this._active) return;
      this._active = false;

      document.removeEventListener('mousemove', this._onMove, true);
      document.removeEventListener('click', this._onClick, true);
      document.removeEventListener('keydown', this._onKey, true);
      window.removeEventListener('scroll', this._onScroll, true);
      window.removeEventListener('resize', this._onScroll, true);

      document.body.style.removeProperty('cursor');
      this._clearHover();
      this.deselect();
    },

    selectElement(el) {
      if (!el || el === document.body || el === document.documentElement) return;
      if (this._isOwn(el)) return;

      this._selectedEl = el;
      this._positionOverlay(this._selectOverlay, el, true);

      if (DS.EditorPanel) DS.EditorPanel.show(el);
      if (DS.Breadcrumb) DS.Breadcrumb.show(el);
    },

    deselect() {
      if (!this._selectedEl) return;
      this._selectedEl = null;
      this._hide(this._selectOverlay);
      DS.EditorPanel?.hide();
      DS.MultiSelect?.clear();
      DS.Breadcrumb?.hide();
    },

    getSelectedElement() {
      return this._selectedEl;
    },

    isActive() {
      return this._active;
    },

    /** Re-position the selection overlay (call after element resizes). */
    refreshSelection() {
      if (this._selectedEl) {
        // Check if element is still in the DOM
        if (!document.body.contains(this._selectedEl)) {
          this.deselect();
          return;
        }
        this._positionOverlay(this._selectOverlay, this._selectedEl, true);
      }
    },

    /** Briefly highlight an element to show it was undone/redone. */
    flashHighlight(el) {
      if (!el || !(el instanceof Node) || !document.body.contains(el)) return;
      
      const overlay = this._makeOverlay('dom-surgeon-flash-' + Date.now());
      this._positionOverlay(overlay, el, false);
      
      overlay.style.border = '2px solid #22C55E';
      overlay.style.background = 'rgba(34, 197, 94, 0.2)';
      overlay.style.boxShadow = '0 0 12px rgba(34, 197, 94, 0.4)';
      overlay.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
      overlay.style.zIndex = '2147483649';
      overlay.style.display = 'block';
      overlay.style.opacity = '1';

      // Reposition dynamically if page scrolls while flashing
      const scrollHandler = () => {
        if (document.body.contains(el)) {
           this._positionOverlay(overlay, el, false);
           overlay.style.border = '2px solid #22C55E';
           overlay.style.background = 'rgba(34, 197, 94, 0.2)';
        }
      };
      window.addEventListener('scroll', scrollHandler, true);

      // Start fade out
      setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(1.02)';
      }, 3000);

      // Cleanup
      setTimeout(() => {
        overlay.remove();
        window.removeEventListener('scroll', scrollHandler, true);
      }, 3400);
    },

    // ── Event Handlers ─────────────────────────────────

    _handleMove(e) {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target || target === this._hoveredEl) return;
      if (this._isOwn(target)) return;
      if (target === document.body || target === document.documentElement) {
        this._clearHover();
        return;
      }

      this._hoveredEl = target;

      // Don't show hover overlay on the already-selected element
      if (target === this._selectedEl || DS.MultiSelect?.getSelection().includes(target)) {
        this._hide(this._hoverOverlay);
        this._hide(this._infoTag);
        return;
      }

      this._positionOverlay(this._hoverOverlay, target, false);
      this._positionInfoTag(target);
    },

    _handleClick(e) {
      if (!e.isTrusted) return; // Ignore programmatic clicks

      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target || this._isOwn(target)) return;
      if (target === document.body || target === document.documentElement) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      this._clearHover();
      
      if (e.metaKey || e.ctrlKey) {
        DS.MultiSelect?.toggle(target);
      } else {
        DS.MultiSelect?.clear();
        this.selectElement(target);
      }
    },

    _handleKey(e) {
      // Ignore if typing in our own inputs
      if (e.target.closest?.('#dom-surgeon-host')) return;

      // Undo / Redo shortcuts (Cmd+Z / Cmd+Shift+Z)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) {
          DS.Main?.redo();
        } else {
          DS.Main?.undo();
        }
        return;
      }

      // Only process QWAD nav when an element is selected
      if (this._selectedEl) {
        let next = null;
        
        // Helper to check if element is valid for navigation (not script/style)
        const isValid = (el) => {
          return !this._isOwn(el) && !['SCRIPT','STYLE','LINK','META','NOSCRIPT'].includes(el.tagName);
        };

        switch (e.key.toLowerCase()) {
          case 'q': { // Parent
            let p = this._selectedEl.parentElement;
            while (p && p !== document.body && p !== document.documentElement && !isValid(p)) {
              p = p.parentElement;
            }
            if (p && p !== document.body && p !== document.documentElement) {
              this._navHistory = this._navHistory || new WeakMap();
              this._navHistory.set(p, this._selectedEl); // remember the path we came from
              next = p;
            }
            break;
          }
          case 'w': { // First child element (or last visited child)
            const children = Array.from(this._selectedEl.children).filter(isValid);
            if (children.length > 0) {
              this._navHistory = this._navHistory || new WeakMap();
              const lastVisited = this._navHistory.get(this._selectedEl);
              if (lastVisited && children.includes(lastVisited)) {
                next = lastVisited;
              } else {
                next = children[0];
              }
            }
            break;
          }
          case 'a': { // Previous sibling element
            let prev = this._selectedEl.previousElementSibling;
            while (prev && !isValid(prev)) prev = prev.previousElementSibling;
            if (prev) next = prev;
            break;
          }
          case 'd': { // Next sibling element
            let sib = this._selectedEl.nextElementSibling;
            while (sib && !isValid(sib)) sib = sib.nextElementSibling;
            if (sib) next = sib;
            break;
          }
        }
        if (next) {
          e.preventDefault();
          e.stopPropagation();
          this._clearHover();
          this.selectElement(next);
          // Scroll the newly selected element into view gently
          next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
          return;
        }
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (DS.MultiSelect?.isActive()) {
            DS.MultiSelect?.clear();
            DS.EditorPanel?.hide();
          } else if (this._selectedEl) {
            this.deselect();
          } else {
            this.deactivate();
            DS.Toast?.show('Selector mode off', 'info');
          }
          break;

        case 'Delete':
        case 'Backspace':
          // Handled by editor panel if visible
          break;
      }
    },

    _handleScroll() {
      // Reposition overlays on scroll/resize
      if (this._hoveredEl && this._hoverOverlay.style.display !== 'none') {
        if (document.body.contains(this._hoveredEl)) {
          this._positionOverlay(this._hoverOverlay, this._hoveredEl, false);
          this._positionInfoTag(this._hoveredEl);
        }
      }
      if (this._selectedEl && this._selectOverlay.style.display !== 'none') {
        if (document.body.contains(this._selectedEl)) {
          this._positionOverlay(this._selectOverlay, this._selectedEl, true);
        }
      }
    },

    // ── Overlay Management ─────────────────────────────

    _makeOverlay(id) {
      const el = document.createElement('div');
      el.id = id;
      el.style.cssText = [
        'position:fixed',
        'pointer-events:none',
        'z-index:2147483644',
        'display:none',
        'box-sizing:border-box',
        'transition:top 50ms ease-out,left 50ms ease-out,width 50ms ease-out,height 50ms ease-out',
        'border-radius:2px'
      ].join(';');
      document.documentElement.appendChild(el);
      return el;
    },

    _makeInfoTag() {
      const el = document.createElement('div');
      el.id = 'dom-surgeon-info';
      el.style.cssText = [
        'position:fixed',
        'pointer-events:none',
        'z-index:2147483645',
        'display:none',
        'background:#0F0F12',
        'color:#EDEDEF',
        "font-family:'SF Mono','Cascadia Code',monospace",
        'font-size:11px',
        'line-height:1.4',
        'padding:3px 8px',
        'border-radius:4px',
        'border:1px solid rgba(255,255,255,0.08)',
        'box-shadow:0 4px 12px rgba(0,0,0,0.5)',
        'white-space:nowrap'
      ].join(';');
      document.documentElement.appendChild(el);
      return el;
    },

    _positionOverlay(overlay, el, isSelected) {
      const r = el.getBoundingClientRect();

      Object.assign(overlay.style, {
        display: 'block',
        top: r.top + 'px',
        left: r.left + 'px',
        width: r.width + 'px',
        height: r.height + 'px',
        border: '',
        background: '',
        boxShadow: '',
        animation: ''
      });

      overlay.className = '';

      const mode = this.mode || 'depth';

      if (mode === 'xray') {
        const hasShadow = isSelected || (!isSelected && !this._selectedEl);
        overlay.style.border = isSelected ? '2px solid #6366F1' : '1.5px dashed rgba(255,255,255,0.8)';
        overlay.style.background = isSelected ? 'transparent' : (hasShadow ? 'transparent' : 'rgba(255,255,255,0.1)');
        overlay.style.boxShadow = hasShadow ? '0 0 0 9999px rgba(0,0,0,0.8)' : 'none';
      } else if (mode === 'depth') {
         let depth = 0;
         let cur = el;
         while(cur && cur !== document.body && cur !== document.documentElement) { depth++; cur = cur.parentElement; }
         const hue = Math.max(30, 220 - depth * 15);
         if (isSelected) {
             overlay.style.border = `2px solid hsl(${hue}, 90%, 60%)`;
             overlay.style.background = `hsla(${hue}, 90%, 60%, 0.25)`;
             overlay.style.boxShadow = `0 0 0 1px hsla(${hue}, 90%, 60%, 0.4)`;
         } else {
             overlay.style.border = `1.5px dashed hsla(${hue}, 90%, 60%, 0.7)`;
             overlay.style.background = `hsla(${hue}, 90%, 60%, 0.15)`;
             overlay.style.boxShadow = 'none';
         }
      }
    },

    _positionInfoTag(el) {
      const r = el.getBoundingClientRect();
      const tag = el.tagName.toLowerCase();

      let cls = '';
      if (typeof el.className === 'string' && el.className.trim()) {
        cls = '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.');
      }

      const dims = Math.round(r.width) + ' × ' + Math.round(r.height);
      this._infoTag.textContent = tag + cls + '  ' + dims;
      this._infoTag.style.display = 'block';

      // Position above element (or below if too close to top)
      let top = r.top - 26;
      if (top < 4) top = r.bottom + 4;

      let left = r.left;
      const w = this._infoTag.offsetWidth;
      if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
      if (left < 4) left = 4;

      this._infoTag.style.top = top + 'px';
      this._infoTag.style.left = left + 'px';
    },

    _clearHover() {
      this._hoveredEl = null;
      this._hide(this._hoverOverlay);
      this._hide(this._infoTag);
    },

    _hide(el) {
      if (el) el.style.display = 'none';
    },

    /** Check if an element belongs to our own injected UI. */
    _isOwn(el) {
      let cur = el;
      while (cur) {
        const id = cur.id;
        if (id === 'dom-surgeon-host' ||
            id === 'dom-surgeon-hover' ||
            id === 'dom-surgeon-select' ||
            id === 'dom-surgeon-info') {
          return true;
        }
        cur = cur.parentElement;
      }
      return false;
    }
  };

  DS.Selector = Selector;
})();
