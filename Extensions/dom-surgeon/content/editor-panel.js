/**
 * DOM Surgeon — Editor Panel
 * Floating in-page panel for editing selected element properties.
 * Rendered inside the Shadow DOM for style isolation.
 * Draggable, with dimension inputs, unit selectors, and a delete button.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const EditorPanel = {
    _panel: null,
    _shadowRoot: null,
    _currentEl: null,
    _dragging: false,
    _dragOff: { x: 0, y: 0 },
    _deleteTimer: null,

    // ── Public API ─────────────────────────────────────

    init(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this._build();
      this._bindDrag();
    },

    show(element) {
      this._currentEl = element;
      this._populate(element);
      this._resetDelete();
      this._position(element);
      this._panel.classList.add('ds-ep--open');
    },

    hide() {
      if (!this._panel) return;
      this._revertPreview();
      this._panel.classList.remove('ds-ep--open');
      this._currentEl = null;
      this._originalStyles = null;
      this._resetDelete();
    },

    isVisible() {
      return this._panel.classList.contains('ds-ep--open');
    },

    // ── Build ──────────────────────────────────────────

    _build() {
      const p = document.createElement('div');
      p.className = 'ds-ep';
      p.innerHTML = `
        <!-- Header -->
        <div class="ds-ep__head">
          <div class="ds-ep__title">
            <span class="ds-ep__tag"></span>
            <span class="ds-ep__dims"></span>
          </div>
          <button class="ds-ep__close" title="Close (Esc)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Selector path -->
        <div class="ds-ep__path"></div>

        <!-- Body -->
        <div class="ds-ep__body">

          <!-- Dimensions -->
          <div class="ds-ep__sec">
            <div class="ds-ep__sec-title">Dimensions</div>

            <div class="ds-ep__row">
              <span class="ds-ep__lbl">W</span>
              <input type="number" class="ds-ep__input" data-prop="width" placeholder="auto">
              <select class="ds-ep__unit" data-prop="width">
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vw">vw</option>
                <option value="auto">auto</option>
              </select>
            </div>

            <div class="ds-ep__row">
              <span class="ds-ep__lbl">H</span>
              <input type="number" class="ds-ep__input" data-prop="height" placeholder="auto">
              <select class="ds-ep__unit" data-prop="height">
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vh">vh</option>
                <option value="auto">auto</option>
              </select>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="ds-ep__btn ds-ep__btn--secondary" data-action="preview" style="flex:1; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1);">
                Preview
              </button>
              <button class="ds-ep__btn ds-ep__btn--primary" data-action="apply" style="flex:1">
                Apply
              </button>
            </div>
          </div>

          <div class="ds-ep__hr"></div>

          <!-- Scope -->
          <div class="ds-ep__sec">
            <div class="ds-ep__sec-title">Scope</div>
            <select class="ds-ep__input" id="ds-ep-scope" style="width:100%; margin-bottom: 8px;">
              <option value="page">This Page Only (Default)</option>
              <option value="domain">Entire Website</option>
            </select>
          </div>

          <div class="ds-ep__hr"></div>

          <!-- Delete -->
          <div class="ds-ep__sec">
            <button class="ds-ep__btn ds-ep__btn--danger" data-action="delete">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 4H11.5M5 4V2.5H9V4M5.5 6V10.5M8.5 6V10.5M3.5 4L4 11.5H10L10.5 4"
                  stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Delete Element</span>
            </button>
          </div>
        </div>
      `;

      // ── Wire events ────────────────────────────────
      p.querySelector('.ds-ep__close').addEventListener('click', () => {
        this.hide();
        DS.Selector?.deselect();
      });

      p.querySelector('[data-action="preview"]').addEventListener('click', () => {
        this._previewDimensions();
      });

      p.querySelector('[data-action="apply"]').addEventListener('click', () => {
        this._applyDimensions();
      });

      p.querySelector('[data-action="delete"]').addEventListener('click', () => {
        this._handleDelete();
      });

      // Enter key in inputs → apply
      p.querySelectorAll('.ds-ep__input').forEach(inp => {
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this._applyDimensions();
          }
          e.stopPropagation(); // prevent selector's keydown handler
        });
        // Prevent selector clicks when interacting with inputs
        inp.addEventListener('click', (e) => e.stopPropagation());
      });

      // Unit select: disable input when "auto" chosen
      p.querySelectorAll('.ds-ep__unit').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const prop = e.target.dataset.prop;
          const input = p.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
          if (e.target.value === 'auto') {
            input.value = '';
            input.disabled = true;
          } else {
            input.disabled = false;
          }
        });
        sel.addEventListener('click', (e) => e.stopPropagation());
      });

      this._panel = p;
      this._shadowRoot.appendChild(p);
    },

    // ── Position ───────────────────────────────────────

    _position(el) {
      const r = el.getBoundingClientRect();
      const pw = 284; // panel width (280 + borders)
      const ph = 310; // estimated panel height

      let left = r.right + 12;
      let top = r.top;

      if (left + pw > window.innerWidth - 16) left = r.left - pw - 12;
      if (left < 16) left = 16;
      if (top + ph > window.innerHeight - 16) top = window.innerHeight - ph - 16;
      if (top < 16) top = 16;

      this._panel.style.left = left + 'px';
      this._panel.style.top = top + 'px';
    },

    // ── Populate ───────────────────────────────────────

    _populate(el) {
      const tag = el.tagName.toLowerCase();
      let cls = '';
      if (typeof el.className === 'string' && el.className.trim()) {
        cls = '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.');
      }
      const rect = el.getBoundingClientRect();
      const comp = getComputedStyle(el);

      this._panel.querySelector('.ds-ep__tag').textContent = tag + cls;
      this._panel.querySelector('.ds-ep__dims').textContent =
        Math.round(rect.width) + ' × ' + Math.round(rect.height);

      // Selector path
      const selector = DS.SelectorEngine.generate(el);
      const pathEl = this._panel.querySelector('.ds-ep__path');
      pathEl.textContent = selector;
      pathEl.title = selector;

      this._originalStyles = {
        width: el.style.width || '',
        height: el.style.height || ''
      };

      // Width
      this._fillInput('width', el.style.width, comp.width);
      // Height
      this._fillInput('height', el.style.height, comp.height);
    },

    _fillInput(prop, inlineVal, computedVal) {
      const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
      const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);

      if (inlineVal && inlineVal !== '') {
        const p = this._parseCSS(inlineVal);
        input.value = p.num;
        unit.value = p.unit;
        input.disabled = p.unit === 'auto';
      } else {
        input.value = Math.round(parseFloat(computedVal)) || '';
        unit.value = 'px';
        input.disabled = false;
      }
    },

    _parseCSS(val) {
      if (val === 'auto') return { num: '', unit: 'auto' };
      const m = val.match(/^([\d.]+)(px|%|vw|vh)?$/);
      return m ? { num: m[1], unit: m[2] || 'px' } : { num: '', unit: 'px' };
    },

    // ── Apply & Preview ───────────────────────────────

    _previewDimensions() {
      if (!this._currentEl) return;

      for (const prop of ['width', 'height']) {
        const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
        const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);
        const newVal = unit.value === 'auto' ? 'auto' : (input.value + unit.value);
        
        if (input.value !== '' || unit.value === 'auto') {
          this._currentEl.style[prop] = newVal;
        }
      }
      DS.Selector?.refreshSelection();
    },

    _revertPreview() {
      if (this._currentEl && this._originalStyles) {
        for (const prop of ['width', 'height']) {
           const current = this._currentEl.style[prop] || '';
           const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
           const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);
           const valInUI = unit.value === 'auto' ? 'auto' : (input.value + unit.value);
           
           if (current === valInUI && valInUI !== this._originalStyles[prop]) {
              if (this._originalStyles[prop]) {
                 this._currentEl.style[prop] = this._originalStyles[prop];
              } else {
                 this._currentEl.style.removeProperty(prop);
              }
           }
        }
      }
    },

    async _applyDimensions() {
      if (!this._currentEl) return;

      const url = window.location.origin + window.location.pathname;
      const selector = DS.SelectorEngine.generate(this._currentEl);
      const changesMap = {};
      let madeChange = false;

      for (const prop of ['width', 'height']) {
        const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
        const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);

        const newVal = unit.value === 'auto' ? 'auto' : (input.value + unit.value);
        const oldVal = this._originalStyles[prop];

        if (newVal !== oldVal) {
          changesMap[prop] = { original: oldVal, modified: newVal };
          this._currentEl.style[prop] = newVal;
          this._originalStyles[prop] = newVal; // Update original so further changes work
          madeChange = true;
        }
      }

      if (madeChange) {
        const isGlobal = this._panel.querySelector('#ds-ep-scope').value === 'domain';
        const change = {
          id: _uid(),
          selector,
          type: 'resize',
          styles: changesMap,
          isGlobal,
          fingerprint: DS.Main._fingerprint(this._currentEl),
          timestamp: Date.now()
        };

        const propsChanged = Object.keys(changesMap);
        if (propsChanged.length === 1) {
          change.property = propsChanged[0];
          change.original = changesMap[propsChanged[0]].original;
          change.modified = changesMap[propsChanged[0]].modified;
        } else {
          change.property = 'dimensions';
          change.modified = 'updated';
        }

        await DS.Storage.saveChange(url, change);
        await DS.History.push(url, change);

        DS.Toast?.show('Dimensions updated', 'success', {
          undoCallback: () => DS.Main?.undo()
        });
        DS.Main?._afterChange();
        DS.Selector?.refreshSelection();
        this._populate(this._currentEl);
      }
    },

    // ── Delete ─────────────────────────────────────────

    async _handleDelete() {
      const btn = this._panel.querySelector('[data-action="delete"]');

      if (!btn.classList.contains('ds-ep__btn--confirm')) {
        // First click: ask for confirmation
        btn.classList.add('ds-ep__btn--confirm');
        btn.querySelector('span').textContent = 'Click again to confirm';
        this._deleteTimer = setTimeout(() => this._resetDelete(), 3000);
        return;
      }

      // Second click: delete
      clearTimeout(this._deleteTimer);
      if (!this._currentEl) return;

      const el = this._currentEl;
      const selector = DS.SelectorEngine.generate(el);
      const parent = el.parentElement;
      const parentSelector = parent ? DS.SelectorEngine.generate(parent) : null;
      const childIndex = parent ? Array.from(parent.children).indexOf(el) : 0;
      const url = window.location.origin + window.location.pathname;
      const isGlobal = this._panel.querySelector('#ds-ep-scope').value === 'domain';

      const change = {
        id: _uid(),
        selector,
        type: 'delete',
        outerHTML: el.outerHTML,
        parentSelector,
        childIndex,
        isGlobal,
        fingerprint: DS.Main._fingerprint(el),
        timestamp: Date.now()
      };

      el.remove();

      await DS.Storage.saveChange(url, change);
      await DS.History.push(url, change);

      this.hide();
      DS.Selector?.deselect();

      DS.Toast?.show('Element deleted', 'danger', {
        undoCallback: () => DS.Main?.undo()
      });
      DS.Main?._afterChange();
    },

    _resetDelete() {
      clearTimeout(this._deleteTimer);
      const btn = this._panel.querySelector('[data-action="delete"]');
      if (btn) {
        btn.classList.remove('ds-ep__btn--confirm');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Delete Element';
      }
    },

    // ── Drag ───────────────────────────────────────────

    _bindDrag() {
      const head = this._panel.querySelector('.ds-ep__head');

      head.addEventListener('mousedown', (e) => {
        if (e.target.closest('.ds-ep__close')) return;
        this._dragging = true;
        const rect = this._panel.getBoundingClientRect();
        this._dragOff.x = e.clientX - rect.left;
        this._dragOff.y = e.clientY - rect.top;
        this._panel.style.transition = 'none';
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!this._dragging) return;
        let x = e.clientX - this._dragOff.x;
        let y = e.clientY - this._dragOff.y;
        x = Math.max(0, Math.min(x, window.innerWidth - 280));
        y = Math.max(0, Math.min(y, window.innerHeight - 100));
        this._panel.style.left = x + 'px';
        this._panel.style.top = y + 'px';
      });

      document.addEventListener('mouseup', () => {
        if (this._dragging) {
          this._dragging = false;
          this._panel.style.transition = '';
        }
      });
    },

    // ── Styles ─────────────────────────────────────────

    getStyles() {
      return `
/* ── Editor Panel ─────────────────────────────────── */
.ds-ep {
  position: fixed;
  width: 280px;
  background: #0F0F12;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.55),
              0 0 0 1px rgba(255,255,255,0.03);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #EDEDEF;
  font-size: 13px;
  z-index: 2147483646;
  overflow: hidden;
  pointer-events: auto;

  /* Closed state */
  display: none;
  opacity: 0;
  transform: scale(0.96) translateY(6px);
  transition: opacity 200ms cubic-bezier(0.34,1.56,0.64,1),
              transform 200ms cubic-bezier(0.34,1.56,0.64,1);
}
.ds-ep--open {
  display: block;
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* ── Header ──── */
.ds-ep__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px 6px;
  cursor: grab;
  user-select: none;
}
.ds-ep__head:active { cursor: grabbing; }

.ds-ep__title {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  overflow: hidden;
}
.ds-ep__tag {
  font-family: 'SF Mono','Cascadia Code','JetBrains Mono',monospace;
  font-size: 12px;
  font-weight: 600;
  color: #EDEDEF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ds-ep__dims {
  font-size: 11px;
  color: #5A5A65;
  font-weight: 400;
}

.ds-ep__close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #5A5A65;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 120ms, background 120ms;
}
.ds-ep__close:hover {
  color: #EDEDEF;
  background: rgba(255,255,255,0.06);
}

/* ── Selector path ── */
.ds-ep__path {
  padding: 2px 12px 8px;
  font-family: 'SF Mono',monospace;
  font-size: 10px;
  color: #5A5A65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

/* ── Body ──── */
.ds-ep__body { padding: 4px 12px 12px; }

/* ── Section ── */
.ds-ep__sec { padding: 6px 0; }
.ds-ep__sec-title {
  font-size: 11px;
  font-weight: 600;
  color: #8B8B96;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

/* ── Input Row ── */
.ds-ep__row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.ds-ep__lbl {
  width: 16px;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  color: #8B8B96;
  text-align: center;
}

.ds-ep__input {
  flex: 1;
  background: #18181D;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  color: #EDEDEF;
  font-family: inherit;
  font-size: 12px;
  padding: 6px 8px;
  outline: none;
  transition: border-color 120ms, box-shadow 120ms;
  -moz-appearance: textfield;
}
.ds-ep__input::-webkit-inner-spin-button,
.ds-ep__input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.ds-ep__input:focus {
  border-color: rgba(99,102,241,0.5);
  box-shadow: 0 0 0 2px rgba(99,102,241,0.12);
}
.ds-ep__input:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.ds-ep__unit {
  width: 54px;
  flex-shrink: 0;
  background: #18181D;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  color: #8B8B96;
  font-family: inherit;
  font-size: 11px;
  padding: 6px 4px;
  outline: none;
  cursor: pointer;
  transition: border-color 120ms;
  -webkit-appearance: none;
}
.ds-ep__unit:focus { border-color: rgba(99,102,241,0.5); }

/* ── Divider ── */
.ds-ep__hr {
  height: 1px;
  background: rgba(255,255,255,0.04);
  margin: 2px 0;
}

/* ── Buttons ── */
.ds-ep__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 120ms, transform 80ms;
  outline: none;
}
.ds-ep__btn:active { transform: scale(0.98); }

.ds-ep__btn--primary {
  background: #6366F1;
  color: #fff;
  margin-top: 4px;
}
.ds-ep__btn--primary:hover { background: #7577F5; }

.ds-ep__btn--danger {
  background: rgba(239,68,68,0.1);
  color: #EF4444;
  border: 1px solid rgba(239,68,68,0.15);
}
.ds-ep__btn--danger:hover {
  background: rgba(239,68,68,0.18);
}

.ds-ep__btn--confirm {
  background: #EF4444 !important;
  color: #fff !important;
  border-color: #EF4444 !important;
  animation: ds-shake 300ms ease;
}

@keyframes ds-shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-3px); }
  75%      { transform: translateX(3px); }
}
`;
    }
  };

  // ── Utility ──────────────────────────────────────────
  function _uid() {
    return 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
  }

  DS.EditorPanel = EditorPanel;
})();
