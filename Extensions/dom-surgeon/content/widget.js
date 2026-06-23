/**
 * DOM Surgeon — Floating Widget
 * Replaces the native popup with an in-page, draggable, minimizable UI.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const CHANGE_ICONS = {
    delete: { icon: '🔴', label: 'Deleted' },
    resize: { icon: '🔵', label: 'Resized' },
    hide:   { icon: '🟣', label: 'Hidden' },
    style:  { icon: '🟡', label: 'Styled' }
  };

  const Widget = {
    _shadow: null,
    _container: null,
    _isMinimized: false,
    _dragging: false,
    _dragOff: { x: 0, y: 0 },

    init(shadow) {
      this._shadow = shadow;
      this._build();
      this._bindEvents();
      this.refresh();
    },

    toggle() {
      if (this._container.classList.contains('ds-widget--open')) {
        if (this._isMinimized) {
          // If it's open but minimized, expand it
          this._isMinimized = false;
          this._container.classList.remove('ds-widget--minimized');
        } else {
          // If it's open and fully expanded, hide it completely
          this.hide();
        }
      } else {
        this.show();
      }
    },

    show() {
      this._container.classList.add('ds-widget--open');
      this._isMinimized = false;
      this._container.classList.remove('ds-widget--minimized');
      
      // Safety check: if position is wildly off-screen, reset it
      const rect = this._container.getBoundingClientRect();
      if (!this._container.style.left || rect.left > window.innerWidth || rect.top > window.innerHeight) {
        this._container.style.left = '24px';
        this._container.style.top = '24px';
      }
      this.refresh();
    },

    hide() {
      this._container.classList.remove('ds-widget--open');
    },

    async refresh() {
      const active = DS.Selector?.isActive();
      const toggleInput = this._shadow.querySelector('.ds-widget .toggle__input');
      const toggleEl = this._shadow.querySelector('.ds-widget .toggle');
      
      if (toggleInput) toggleInput.checked = active;
      if (toggleEl) toggleEl.classList.toggle('toggle--on', active);

      const url = DS.Main?._pageKey();
      if (!url) return;
      const changes = await DS.Storage.getChanges(url);
      
      const historyCount = this._shadow.querySelector('#ds-w-history-count');
      if (historyCount) historyCount.textContent = changes.length;

      const badgeCount = this._shadow.querySelector('.ds-widget__min-badge');
      if (badgeCount) {
        badgeCount.textContent = changes.length;
        badgeCount.style.display = changes.length > 0 ? 'flex' : 'none';
      }

      this._renderHistory(changes);
    },

    _renderHistory(changes) {
      const list = this._shadow.querySelector('#ds-w-history-list');
      const empty = this._shadow.querySelector('#ds-w-history-empty');
      if (!list || !empty) return;

      list.querySelectorAll('.history-item').forEach(el => el.remove());

      if (changes.length === 0) {
        empty.style.display = 'flex';
        return;
      }
      empty.style.display = 'none';

      const reversed = [...changes].reverse();
      for (const ch of reversed) {
        list.appendChild(this._createHistoryItem(ch));
      }
    },

    _createHistoryItem(change) {
      const el = document.createElement('div');
      el.className = 'history-item';
      
      const info = CHANGE_ICONS[change.type] || { icon: '⚪', label: change.type };
      let desc = info.label;
      const sel = change.selector || '';
      const shortSel = sel.split(' > ').pop() || sel;
      desc += ` ${shortSel}`;

      let detail = '';
      if (change.type === 'resize') {
        detail = `${change.property}: ${change.modified}`;
      }

      const diff = Math.floor((Date.now() - change.timestamp) / 1000);
      let timeStr = 'now';
      if (diff >= 5 && diff < 60) timeStr = diff + 's ago';
      else if (diff >= 60 && diff < 3600) timeStr = Math.floor(diff/60) + 'm ago';
      else if (diff >= 3600 && diff < 86400) timeStr = Math.floor(diff/3600) + 'h ago';
      else if (diff >= 86400) timeStr = Math.floor(diff/86400) + 'd ago';

      el.innerHTML = `
        <span class="history-item__icon">${info.icon}</span>
        <div class="history-item__body">
          <div class="history-item__desc" title="${sel}">${desc}</div>
          ${detail ? `<div class="history-item__detail">${detail}</div>` : ''}
        </div>
        <span class="history-item__time">${timeStr}</span>
        <button class="history-item__undo" title="Undo this change">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H12C13.1 8 14 8.9 14 10V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 5L3 8L6 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;

      el.addEventListener('click', async () => {
        const isPreviewing = el.classList.contains('history-item--previewing');
        
        this._shadow.querySelectorAll('.history-item--previewing').forEach(node => {
          node.classList.remove('history-item--previewing');
        });

        if (isPreviewing) {
          DS.Main?.clearPreview();
        } else {
          el.classList.add('history-item--previewing');
          DS.Main?.previewChange(change.id);
        }
      });

      el.querySelector('.history-item__undo').addEventListener('click', async (e) => {
        e.stopPropagation();
        e.currentTarget.disabled = true;
        el.classList.add('history-item--removing');
        DS.Main?.undoSpecific(change.id).then(() => this.refresh());
      });

      return el;
    },

    _build() {
      const w = document.createElement('div');
      w.className = 'ds-widget';
      w.innerHTML = `
        <!-- Minimized State -->
        <div class="ds-widget__min" title="Click to expand DOM Surgeon">
          <div class="ds-widget__min-icon">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="16" height="16" rx="3" stroke="#6366F1" stroke-width="1.5"/>
              <path d="M7 7L13 13M13 7L7 13" stroke="#6366F1" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="10" cy="10" r="2" fill="#6366F1" opacity="0.3"/>
            </svg>
            <span class="ds-widget__min-badge">0</span>
          </div>
          <div class="ds-widget__min-expand">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 14L8 8M14 2L8 8M8 8V14M8 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>

        <!-- Full State -->
        <div class="ds-widget__full">
          <!-- Header (Draggable) -->
          <div class="ds-widget__header">
            <div class="ds-widget__brand">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="16" height="16" rx="3" stroke="#6366F1" stroke-width="1.5"/>
                <path d="M7 7L13 13M13 7L7 13" stroke="#6366F1" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="10" cy="10" r="2" fill="#6366F1" opacity="0.3"/>
              </svg>
              <span>DOM Surgeon</span>
            </div>
            <div class="ds-widget__controls">
              <button class="ds-w-btn ds-w-btn--icon" id="ds-w-min" title="Minimize">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              </button>
              <button class="ds-w-btn ds-w-btn--icon" id="ds-w-close" title="Close">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6m0-6l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              </button>
            </div>
          </div>

          <!-- Selector toggle -->
          <div class="ds-widget__section">
            <span class="ds-widget__label">Element Selector</span>
            <label class="toggle">
              <input type="checkbox" class="toggle__input">
              <span class="toggle__track"><span class="toggle__thumb"></span></span>
            </label>
          </div>

          <!-- Actions -->
          <div class="ds-widget__actions">
            <button class="ds-w-btn" id="ds-w-undo" title="Undo last change (Cmd+Z)">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H12C13.1 8 14 8.9 14 10V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5L3 8L6 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Undo
            </button>
            <button class="ds-w-btn" id="ds-w-redo" title="Redo last change (Cmd+Shift+Z)">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H4C2.9 8 2 8.9 2 10V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 5L13 8L10 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Redo
            </button>
            <button class="ds-w-btn ds-w-btn--danger" id="ds-w-reset" title="Reset all changes on this page">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              Reset
            </button>
          </div>

          <!-- History -->
          <div class="ds-widget__history">
            <div class="ds-widget__history-head">
              <span class="ds-widget__label">History</span>
              <span class="ds-widget__badge" id="ds-w-history-count">0</span>
            </div>
            <div class="history-list" id="ds-w-history-list">
              <div class="history-empty" id="ds-w-history-empty">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4"/><path d="M12 7V12L15 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>No changes yet</span>
              </div>
            </div>
          </div>
          
          <!-- Shortcuts Info -->
          <div class="ds-widget__shortcuts">
            <div class="shortcut">
              <kbd>Alt</kbd>+<kbd>S</kbd> to toggle selector
            </div>
          </div>
        </div>
      `;
      this._container = w;
      this._shadow.appendChild(w);
    },

    _bindEvents() {
      const w = this._container;
      
      // Toggle logic
      w.querySelector('.toggle__input').addEventListener('change', () => {
        const on = DS.Selector?.toggle();
        if (on !== undefined) {
          DS.Toast?.show(on ? 'Selector mode on' : 'Selector mode off', 'info');
          this.refresh();
        }
      });

      // Actions
      w.querySelector('#ds-w-undo').addEventListener('click', () => {
        DS.Main?.undo().then(() => this.refresh());
      });
      w.querySelector('#ds-w-redo').addEventListener('click', () => {
        DS.Main?.redo().then(() => this.refresh());
      });

      let resetTimer;
      const btnReset = w.querySelector('#ds-w-reset');
      btnReset.addEventListener('click', () => {
        if (!btnReset.classList.contains('ds-w-btn--confirm')) {
          btnReset.classList.add('ds-w-btn--confirm');
          btnReset.innerHTML = 'Confirm';
          resetTimer = setTimeout(() => {
            btnReset.classList.remove('ds-w-btn--confirm');
            btnReset.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>Reset';
          }, 3000);
          return;
        }
        clearTimeout(resetTimer);
        btnReset.classList.remove('ds-w-btn--confirm');
        btnReset.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>Reset';
        DS.Main?.reset().then(() => this.refresh());
      });

      // Minimize / Close
      w.querySelector('#ds-w-close').addEventListener('click', () => this.hide());
      w.querySelector('#ds-w-min').addEventListener('click', () => {
        this._isMinimized = true;
        w.classList.add('ds-widget--minimized');
      });
      w.querySelector('.ds-widget__min').addEventListener('click', () => {
        this._isMinimized = false;
        w.classList.remove('ds-widget--minimized');
      });

      // Dragging logic
      const head = w.querySelector('.ds-widget__header');
      head.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) return;
        this._dragging = true;
        const rect = w.getBoundingClientRect();
        this._dragOff.x = e.clientX - rect.left;
        this._dragOff.y = e.clientY - rect.top;
        w.style.transition = 'none';
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!this._dragging) return;
        let x = e.clientX - this._dragOff.x;
        let y = e.clientY - this._dragOff.y;
        x = Math.max(0, Math.min(x, window.innerWidth - w.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - w.offsetHeight));
        w.style.left = x + 'px';
        w.style.top = y + 'px';
      });

      document.addEventListener('mouseup', () => {
        if (this._dragging) {
          this._dragging = false;
          w.style.transition = '';
        }
      });
    },

    getStyles() {
      return `
/* ── Floating Widget ─────────────────────────────── */
.ds-widget {
  position: fixed;
  width: 320px;
  background: rgba(15, 15, 18, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #EDEDEF;
  z-index: 2147483647;
  pointer-events: auto;
  overflow: hidden;

  /* Closed state */
  display: none;
  opacity: 0;
  transform: scale(0.96) translateY(10px);
  transition: opacity 300ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 300ms ease, width 300ms ease;
}

.ds-widget--open {
  display: block;
  opacity: 1;
  transform: scale(1) translateY(0);
}

.ds-widget--minimized {
  width: auto;
  border-radius: 30px;
  top: auto !important;
  left: auto !important;
  bottom: 24px !important;
  right: 24px !important;
  transform: none;
}
.ds-widget--minimized .ds-widget__full {
  display: none;
}
.ds-widget--minimized .ds-widget__min {
  display: flex;
}

/* ── Minimized State ── */
.ds-widget__min {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  gap: 12px;
  cursor: pointer;
  background: rgba(15, 15, 18, 0.95);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  transition: background 200ms;
}
.ds-widget__min:hover {
  background: rgba(30, 30, 35, 0.95);
}
.ds-widget__min-icon {
  position: relative;
  display: flex;
  align-items: center;
}
.ds-widget__min-expand {
  display: flex;
  align-items: center;
  color: #8B8B96;
}
.ds-widget__min:hover .ds-widget__min-expand {
  color: #fff;
}
.ds-widget__min-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #6366F1;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  height: 14px;
  min-width: 14px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

/* ── Header ── */
.ds-widget__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  cursor: grab;
  user-select: none;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(to bottom, rgba(255,255,255,0.05), transparent);
}
.ds-widget__header:active { cursor: grabbing; }

.ds-widget__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 13px;
  color: #fff;
}

.ds-widget__controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ds-w-btn--icon {
  background: none;
  border: none;
  color: #8B8B96;
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 150ms;
}
.ds-w-btn--icon:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

/* ── Section ── */
.ds-widget__section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.ds-widget__label {
  font-size: 12px;
  font-weight: 500;
  color: #EDEDEF;
}

/* ── Actions ── */
.ds-widget__actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.ds-w-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  color: #EDEDEF;
  font-size: 11px;
  font-weight: 500;
  padding: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms;
}
.ds-w-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.15);
}
.ds-w-btn:active { transform: scale(0.96); }

.ds-w-btn--danger:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #EF4444;
}
.ds-w-btn--confirm {
  background: #EF4444 !important;
  color: #fff !important;
  border-color: #EF4444 !important;
}

/* ── History ── */
.ds-widget__history {
  display: flex;
  flex-direction: column;
  max-height: 250px;
}
.ds-widget__history-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(0,0,0,0.2);
}
.ds-widget__badge {
  background: rgba(255,255,255,0.1);
  color: #EDEDEF;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
}

.history-list {
  padding: 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.history-list::-webkit-scrollbar { width: 6px; }
.history-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

.history-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  gap: 8px;
  color: #5A5A65;
  font-size: 12px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms ease;
}
.history-item:hover {
  background: rgba(255,255,255,0.06);
}
.history-item--previewing {
  background: rgba(234, 179, 8, 0.1) !important;
  border-color: rgba(234, 179, 8, 0.3);
}
.history-item--removing {
  opacity: 0;
  transform: translateX(20px);
}

.history-item__icon { font-size: 12px; }
.history-item__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.history-item__desc {
  font-size: 11px;
  font-weight: 500;
  color: #EDEDEF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.history-item__detail {
  font-size: 10px;
  color: #8B8B96;
}
.history-item__time {
  font-size: 10px;
  color: #5A5A65;
}

.history-item__undo {
  background: none;
  border: none;
  color: #5A5A65;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 150ms;
}
.history-item__undo:hover {
  color: #EDEDEF;
  background: rgba(255,255,255,0.1);
}

/* ── Toggle switch ── */
.toggle {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}
.toggle__input { opacity: 0; width: 0; height: 0; margin: 0; }
.toggle__track {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #27272A;
  border-radius: 20px;
  transition: background-color 200ms;
  cursor: pointer;
}
.toggle__thumb {
  position: absolute;
  top: 2px; left: 2px;
  width: 16px; height: 16px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.toggle--on .toggle__track { background-color: #6366F1; }
.toggle--on .toggle__thumb { transform: translateX(16px); }

/* ── Shortcuts Info ── */
.ds-widget__shortcuts {
  padding: 10px 14px;
  font-size: 10px;
  color: #8B8B96;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.06);
}
kbd {
  font-family: inherit;
  background: rgba(255,255,255,0.1);
  padding: 2px 4px;
  border-radius: 4px;
  color: #EDEDEF;
}
`;
    }
  };

  DS.Widget = Widget;
})();
