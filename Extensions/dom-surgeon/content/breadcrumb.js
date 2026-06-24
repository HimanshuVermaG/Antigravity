/**
 * DOM Surgeon — Breadcrumb Bar (Upgrade A)
 * Shows a fixed bar at the top of the viewport with the ancestor path
 * of the currently selected element. Each segment is clickable.
 *
 * Injected into the Shadow DOM root, so host-page CSS cannot interfere.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const Breadcrumb = {
    _shadow: null,
    _bar: null,
    _visible: false,

    init(shadow) {
      this._shadow = shadow;
      this._build();
    },

    // ── Public API ─────────────────────────────────────

    show(el) {
      if (!el || !this._bar) return;
      this._renderPath(el);
      if (!this._visible) {
        this._visible = true;
        this._bar.classList.add('ds-bc--visible');
        if (!this._bar.matches(':popover-open')) {
          this._bar.showPopover();
        }
      }
    },

    hide() {
      if (!this._bar || !this._visible) return;
      this._visible = false;
      this._bar.classList.remove('ds-bc--visible');
      if (this._bar.matches(':popover-open')) {
        this._bar.hidePopover();
      }
    },

    // ── Internal ───────────────────────────────────────

    _build() {
      const bar = document.createElement('div');
      bar.className = 'ds-bc';
      bar.setAttribute('popover', 'manual');
      bar.innerHTML = `
        <div class="ds-bc__inner">
          <div class="ds-bc__scroll" id="ds-bc-scroll"></div>
          <div class="ds-bc__dims" id="ds-bc-dims"></div>
        </div>
      `;
      this._bar = bar;
      this._shadow.appendChild(bar);
    },

    _renderPath(el) {
      const scroll = this._shadow.querySelector('#ds-bc-scroll');
      const dims = this._shadow.querySelector('#ds-bc-dims');
      if (!scroll || !dims) return;

      // Build ancestor chain (from <body> down to el)
      const ancestors = [];
      let cur = el;
      while (cur && cur !== document.documentElement && cur !== document.body) {
        ancestors.unshift(cur);
        cur = cur.parentElement;
      }

      // Render segments
      scroll.innerHTML = '';
      ancestors.forEach((node, i) => {
        const isLast = i === ancestors.length - 1;

        const seg = document.createElement('span');
        seg.className = 'ds-bc__seg' + (isLast ? ' ds-bc__seg--active' : '');
        seg.textContent = this._label(node);
        seg.title = node.tagName.toLowerCase() + (node.id ? '#' + node.id : '');

        if (!isLast) {
          seg.addEventListener('click', () => {
            DS.Selector?.selectElement(node);
          });
        }

        scroll.appendChild(seg);

        // Separator between segments
        if (!isLast) {
          const sep = document.createElement('span');
          sep.className = 'ds-bc__sep';
          sep.textContent = '›';
          scroll.appendChild(sep);
        }
      });

      // Scroll to end to show active element
      requestAnimationFrame(() => { scroll.scrollLeft = scroll.scrollWidth; });

      // Dimensions of the currently selected element
      const r = el.getBoundingClientRect();
      dims.textContent = Math.round(r.width) + ' × ' + Math.round(r.height);
    },

    /** Short label for a segment: tagName + up to 2 classes or id */
    _label(el) {
      let label = el.tagName.toLowerCase();
      if (el.id) {
        label += '#' + el.id;
      } else if (typeof el.className === 'string' && el.className.trim()) {
        const classes = el.className.trim().split(/\s+/).slice(0, 2);
        label += '.' + classes.join('.');
      }
      return label;
    },

    // ── Styles ─────────────────────────────────────────

    getStyles() {
      return `
/* ── Breadcrumb Bar ───────────────────────────────── */
.ds-bc {
  position: fixed;
  bottom: 0;
  top: auto;
  left: 0;
  right: 0;
  pointer-events: none;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 2147483645 !important;

  /* Slide-up animation */
  transform: translateY(100%);
  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1), display 280ms allow-discrete;
}

.ds-bc:popover-open {
  transform: translateY(0);
}

@starting-style {
  .ds-bc:popover-open {
    transform: translateY(100%);
  }
}

.ds-bc__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 34px;
  background: rgba(15, 15, 18, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.35);
  pointer-events: auto;
  font-family: 'SF Mono', 'Cascadia Code', monospace;
}

.ds-bc__scroll {
  display: flex;
  align-items: center;
  gap: 0px;
  overflow-x: auto;
  flex: 1;
  min-width: 0;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
  padding: 0 4px;
}
.ds-bc__scroll::-webkit-scrollbar { display: none; }

.ds-bc__seg {
  font-size: 11px;
  color: #8B8B96;
  white-space: nowrap;
  padding: 2px 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 120ms ease, background 120ms ease;
  flex-shrink: 0;
}
.ds-bc__seg:hover {
  color: #EDEDEF;
  background: rgba(255,255,255,0.06);
}
.ds-bc__seg--active {
  color: #818CF8;
  font-weight: 600;
  cursor: default;
}
.ds-bc__seg--active:hover {
  background: transparent;
  color: #818CF8;
}

.ds-bc__sep {
  font-size: 12px;
  color: rgba(255,255,255,0.2);
  padding: 0 1px;
  flex-shrink: 0;
  user-select: none;
  pointer-events: none;
}

.ds-bc__dims {
  font-size: 10px;
  color: #5A5A65;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.3px;
}
`;
    }
  };

  DS.Breadcrumb = Breadcrumb;
})();
