/**
 * DOM Surgeon — Multi-Select Module
 * Manages selecting multiple elements and rendering visual numbered badges over them.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const MultiSelect = {
    _shadow: null,
    _selected: [],
    _badges: [],
    _container: null,
    _rafId: null,

    init(shadow) {
      this._shadow = shadow;
      
      this._container = document.createElement('div');
      this._container.id = 'ds-multiselect-layer';
      this._container.style.cssText = `
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none;
        z-index: 2147483645;
      `;
      this._shadow.appendChild(this._container);

      const style = document.createElement('style');
      style.textContent = `
        .ds-ms-badge {
          position: absolute;
          background: #6366F1;
          color: white;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: bold;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2) inset;
          pointer-events: auto;
          cursor: pointer;
          transform: translate(-50%, -50%);
          z-index: 2;
          transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ds-ms-badge:hover {
          transform: translate(-50%, -50%) scale(1.1);
          background: #EF4444;
        }
        .ds-ms-badge:hover::after {
          content: '×';
          position: absolute;
        }
        .ds-ms-badge:hover span {
          display: none;
        }
        .ds-ms-overlay {
          position: absolute;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.5);
          pointer-events: none;
          z-index: 1;
          border-radius: 2px;
        }
      `;
      this._shadow.appendChild(style);

      this._loop = this._loop.bind(this);
    },

    _loop() {
      if (this._selected.length > 0) {
        this._updatePositions();
        this._rafId = requestAnimationFrame(this._loop);
      }
    },

    toggle(el) {
      const idx = this._selected.indexOf(el);
      if (idx > -1) {
        this.remove(el);
      } else {
        this.add(el);
      }
    },

    add(el) {
      if (!el || this._selected.includes(el)) return;

      // 1. If el is a descendant of an already selected element, ignore it.
      const isDescendant = this._selected.some(sel => sel.contains(el));
      if (isDescendant) return;

      // 2. If el is an ancestor of any already selected elements, remove the descendants.
      this._selected = this._selected.filter(sel => !el.contains(sel));

      this._selected.push(el);
      this._render();
      DS.EditorPanel?.show(el);
      
      // Start loop if not running
      if (!this._rafId) {
        this._rafId = requestAnimationFrame(this._loop);
      }
    },

    remove(el) {
      const idx = this._selected.indexOf(el);
      if (idx === -1) return;
      this._selected.splice(idx, 1);
      this._render();
      
      if (this._selected.length === 0) {
        DS.EditorPanel?.hide();
      } else {
        // Refresh panel with remaining elements
        DS.EditorPanel?.show(this._selected[this._selected.length - 1]);
      }
    },

    clear() {
      if (this._selected.length === 0) return;
      this._selected = [];
      this._render();
      if (this._rafId) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
    },

    getSelection() {
      return [...this._selected];
    },

    isActive() {
      return this._selected.length > 0;
    },

    _render() {
      this._container.innerHTML = '';
      this._badges = [];

      this._selected.forEach((el, idx) => {
        // Create highlight box
        const box = document.createElement('div');
        box.className = 'ds-ms-overlay';
        this._container.appendChild(box);

        // Create number badge
        const badge = document.createElement('div');
        badge.className = 'ds-ms-badge';
        const num = document.createElement('span');
        num.textContent = idx + 1;
        badge.appendChild(num);
        
        badge.addEventListener('click', (e) => {
          e.stopPropagation();
          this.remove(el);
        });

        this._container.appendChild(badge);
        this._badges.push({ el, box, badge });
      });

      this._updatePositions();
    },

    _updatePositions() {
      if (!this._selected.length) return;

      this._badges.forEach(({ el, box, badge }) => {
        const rect = el.getBoundingClientRect();
        
        // Box position
        box.style.left = rect.left + 'px';
        box.style.top = rect.top + 'px';
        box.style.width = rect.width + 'px';
        box.style.height = rect.height + 'px';

        // Badge position (top-left corner)
        badge.style.left = rect.left + 'px';
        badge.style.top = rect.top + 'px';
      });
    }
  };

  DS.MultiSelect = MultiSelect;
})();
