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
          <header class="header">
            <div class="header__brand">
              <div class="header__icon">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="16" height="16" rx="3" stroke="#6366F1" stroke-width="1.5"/>
                  <path d="M7 7L13 13M13 7L7 13" stroke="#6366F1" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="10" cy="10" r="2" fill="#6366F1" opacity="0.3"/>
                </svg>
              </div>
              <div>
                <h1 class="header__title">DOM Surgeon</h1>
                <p class="header__sub">Visually edit any website</p>
              </div>
            </div>
            <div class="header__controls">
              <button class="header-btn" id="ds-w-min" title="Minimize">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              </button>
              <button class="header-btn" id="ds-w-close" title="Close">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6m0-6l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              </button>
            </div>
          </header>

          <!-- Selector toggle -->
          <section class="section section--toggle">
            <span class="section__label">Element Selector</span>
            <label class="toggle">
              <input type="checkbox" class="toggle__input">
              <span class="toggle__track">
                <span class="toggle__thumb"></span>
              </span>
            </label>
          </section>

          <!-- Actions -->
          <section class="section section--actions">
            <button class="action-btn" id="ds-w-undo" title="Undo last change (Cmd+Z)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H12C13.1 8 14 8.9 14 10V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 5L3 8L6 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Undo</span>
            </button>
            <button class="action-btn" id="ds-w-redo" title="Redo last change (Cmd+Shift+Z)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H4C2.9 8 2 8.9 2 10V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 5L13 8L10 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Redo</span>
            </button>
            <button class="action-btn action-btn--danger" id="ds-w-reset" title="Reset all changes on this page">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              <span>Reset</span>
            </button>
          </section>

          <!-- History -->
          <section class="section section--history" id="history-section">
            <div class="section--history__header">
              <span class="section__label">History</span>
              <span class="badge badge--sm" id="ds-w-history-count">0</span>
            </div>
            <div class="history-list" id="ds-w-history-list">
              <div class="history-empty" id="ds-w-history-empty">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4"/>
                  <path d="M12 7V12L15 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>No changes yet</span>
              </div>
            </div>
          </section>

          <!-- Shortcuts -->
          <section class="section section--shortcuts">
            <div class="section__label ds-shortcut-toggle" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none;">
              Keyboard Shortcuts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ds-shortcut-icon" style="transition: transform 200ms;"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="shortcut-grid" style="display: none; margin-top: 10px;">
              <div class="shortcut">
                <kbd>Esc</kbd>
                <span>Exit selector</span>
              </div>
              <div class="shortcut">
                <kbd>Alt</kbd><kbd>S</kbd>
                <span>Toggle mode</span>
              </div>
              <div class="shortcut">
                <kbd>Cmd</kbd><kbd>Z</kbd>
                <span>Undo change</span>
              </div>
              <div class="shortcut">
                <kbd>Cmd</kbd><kbd>⇧</kbd><kbd>Z</kbd>
                <span>Redo change</span>
              </div>
              <div class="shortcut" style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.06);">
                <kbd>Q</kbd>
                <span>Select parent</span>
              </div>
              <div class="shortcut">
                <kbd>W</kbd>
                <span>Select first child</span>
              </div>
              <div class="shortcut">
                <kbd>A</kbd>
                <span>Previous sibling</span>
              </div>
              <div class="shortcut">
                <kbd>D</kbd>
                <span>Next sibling</span>
              </div>
            </div>
          </section>
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
        if (!btnReset.classList.contains('action-btn--confirm')) {
          btnReset.classList.add('action-btn--confirm');
          btnReset.innerHTML = '<span>Confirm</span>';
          resetTimer = setTimeout(() => {
            btnReset.classList.remove('action-btn--confirm');
            btnReset.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg><span>Reset</span>';
          }, 3000);
          return;
        }
        clearTimeout(resetTimer);
        btnReset.classList.remove('action-btn--confirm');
        btnReset.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg><span>Reset</span>';
        DS.Main?.reset().then(() => this.refresh());
      });

      let lastRect = null;

      w.querySelector('#ds-w-close').addEventListener('click', () => this.hide());
      w.querySelector('#ds-w-min').addEventListener('click', () => {
        lastRect = w.getBoundingClientRect();
        
        // The minimized bubble is roughly 60x40 and sits at bottom:24, right:24
        // So its center is approx window.innerWidth - 24 - 30, window.innerHeight - 24 - 20
        const targetCenterX = window.innerWidth - 54;
        const targetCenterY = window.innerHeight - 44;
        
        // We will scale to 0.15, so the widget's new dimensions will be:
        const scaledWidth = lastRect.width * 0.15;
        const scaledHeight = lastRect.height * 0.15;
        
        // Calculate dx, dy so the top-left is positioned such that the center aligns with the target
        const dx = targetCenterX - lastRect.left - (scaledWidth / 2);
        const dy = targetCenterY - lastRect.top - (scaledHeight / 2);

        w.style.transition = 'transform 300ms cubic-bezier(0.32, 0, 0.1, 1)';
        w.style.transformOrigin = 'top left';
        w.style.transform = `translate(${dx}px, ${dy}px) scale(0.15)`;
        
        setTimeout(() => {
          this._isMinimized = true;
          w.classList.add('ds-widget--minimized');
          w.style.transition = '';
          w.style.transform = 'none';
        }, 300);
      });

      w.querySelector('.ds-widget__min').addEventListener('click', () => {
        this._isMinimized = false;
        w.classList.remove('ds-widget--minimized');
        
        if (lastRect) {
          const targetCenterX = window.innerWidth - 54;
          const targetCenterY = window.innerHeight - 44;
          const scaledWidth = lastRect.width * 0.15;
          const scaledHeight = lastRect.height * 0.15;
          const dx = targetCenterX - lastRect.left - (scaledWidth / 2);
          const dy = targetCenterY - lastRect.top - (scaledHeight / 2);
          
          w.style.transition = 'none';
          w.style.transformOrigin = 'top left';
          w.style.transform = `translate(${dx}px, ${dy}px) scale(0.15)`;
          
          // Force reflow
          void w.offsetWidth;
          
          w.style.transition = 'transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1)';
          w.style.transform = 'translate(0, 0) scale(1)';
          
          setTimeout(() => {
            w.style.transition = '';
            w.style.transform = 'none';
          }, 350);
        } else {
          // Fallback if no lastRect
          w.style.transition = 'none';
          w.style.opacity = '0';
          void w.offsetWidth;
          w.style.transition = 'opacity 300ms ease';
          w.style.opacity = '1';
        }
      });

      // Shortcut accordion
      const shortcutToggle = w.querySelector('.ds-shortcut-toggle');
      const shortcutGrid = w.querySelector('.shortcut-grid');
      const shortcutIcon = w.querySelector('.ds-shortcut-icon');
      shortcutToggle.addEventListener('click', () => {
        const isHidden = shortcutGrid.style.display === 'none';
        shortcutGrid.style.display = isHidden ? 'flex' : 'none';
        shortcutIcon.style.transform = isHidden ? 'rotate(180deg)' : '';
      });

      // Dragging logic
      const head = w.querySelector('.header');
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
/* ── Floating Widget Base ─────────────────────────────── */
.ds-widget {
  position: fixed;
  width: 320px;
  background: #0F0F12;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #EDEDEF;
  z-index: 2147483647;
  pointer-events: auto;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.5;

  /* Closed state */
  display: none;
  opacity: 0;
  transform: scale(0.96) translateY(10px);
  transition: opacity 400ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 400ms ease, width 400ms ease;
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

/* ── Professional Popup Styles ───────────────────────── */
:host {
  --bg:             #0F0F12;
  --bg-card:        #16161B;
  --bg-hover:       #1E1E24;
  --border:         rgba(255, 255, 255, 0.06);
  --border-hover:   rgba(255, 255, 255, 0.10);
  --text:           #EDEDEF;
  --text-2:         #8B8B96;
  --text-3:         #5A5A65;
  --accent:         #6366F1;
  --accent-hover:   #7577F5;
  --accent-muted:   rgba(99, 102, 241, 0.12);
  --danger:         #EF4444;
  --danger-muted:   rgba(239, 68, 68, 0.10);
  --radius:         8px;
  --radius-sm:      6px;
  --transition:     120ms ease;
}

/* ── Header ── */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 12px;
  border-bottom: 1px solid var(--border);
  cursor: grab;
  user-select: none;
}
.header:active { cursor: grabbing; }

.header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-muted);
  border-radius: var(--radius);
  flex-shrink: 0;
}

.header__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.2px;
  margin: 0;
}

.header__sub {
  font-size: 11px;
  color: var(--text-3);
  font-weight: 400;
  margin-top: 1px;
}

.header__controls {
  display: flex;
  gap: 4px;
}

.header-btn {
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
.header-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

/* ── Section ── */
.section {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.section__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-2);
}

/* ── Toggle Section ── */
.section--toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle {
  position: relative;
  display: inline-flex;
  cursor: pointer;
}
.toggle__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle__track {
  display: block;
  width: 40px;
  height: 22px;
  background: #2A2A32;
  border-radius: 11px;
  position: relative;
  transition: background var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: #6B6B78;
  border-radius: 50%;
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), background 120ms ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.toggle__input:checked + .toggle__track {
  background: rgba(99, 102, 241, 0.25);
  border-color: rgba(99, 102, 241, 0.3);
}
.toggle__input:checked + .toggle__track .toggle__thumb {
  transform: translateX(18px);
  background: #6366F1;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
}
.toggle--on .toggle__track {
  background: rgba(99, 102, 241, 0.25);
  border-color: rgba(99, 102, 241, 0.3);
}
.toggle--on .toggle__thumb {
  transform: translateX(18px);
  background: #6366F1;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  background: var(--accent-muted);
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  border-radius: 11px;
}
.badge--sm {
  min-width: 18px;
  height: 18px;
  font-size: 10px;
  padding: 0 5px;
}

/* ── Actions Section ── */
.section--actions {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
}

.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 4px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-2);
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition), color var(--transition), transform 80ms ease;
}
.action-btn:hover {
  background: var(--bg-hover);
  border-color: var(--border-hover);
  color: var(--text);
}
.action-btn:active { transform: scale(0.96); }
.action-btn svg { opacity: 0.7; }
.action-btn:hover svg { opacity: 1; }

.action-btn--danger:hover {
  border-color: rgba(239, 68, 68, 0.2);
  color: var(--danger);
}
.action-btn--danger:hover svg { color: var(--danger); }
.action-btn--confirm {
  background: var(--danger-muted) !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
  color: var(--danger) !important;
}
.action-btn--confirm svg {
  color: var(--danger) !important;
  opacity: 1 !important;
}

/* ── History Section ── */
.section--history {
  padding: 12px 16px;
}
.section--history__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.history-list {
  max-height: 130px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.history-list::-webkit-scrollbar { width: 4px; }
.history-list::-webkit-scrollbar-track { background: transparent; }
.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}
.history-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.14);
}

.history-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 0;
  color: var(--text-3);
  font-size: 11px;
}
.history-empty svg { opacity: 0.35; }

.history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition), opacity 250ms ease, transform 250ms ease;
}
.history-item:hover { background: var(--bg-hover); }
.history-item--previewing {
  background: rgba(234, 179, 8, 0.08) !important;
  border-color: rgba(234, 179, 8, 0.3);
}
.history-item--removing {
  opacity: 0;
  transform: translateX(20px);
}

.history-item__icon {
  flex-shrink: 0;
  font-size: 10px;
  line-height: 1;
}
.history-item__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.history-item__desc {
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.history-item__detail {
  font-size: 10px;
  color: var(--text-3);
  font-family: 'SF Mono', 'Cascadia Code', monospace;
  margin-top: 1px;
}
.history-item__time {
  flex-shrink: 0;
  font-size: 10px;
  color: var(--text-3);
  white-space: nowrap;
}
.history-item__undo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--text-3);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition), background var(--transition), border-color var(--transition), color var(--transition);
}
.history-item:hover .history-item__undo { opacity: 1; }
.history-item__undo:hover {
  background: var(--accent-muted);
  border-color: rgba(99, 102, 241, 0.2);
  color: var(--accent);
}

/* ── Shortcuts Section ── */
.section--shortcuts {
  padding: 12px 16px;
}
.section--shortcuts .section__label {
  display: block;
  margin-bottom: 8px;
}
.shortcut-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.shortcut {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-3);
}
kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 20px;
  padding: 0 5px;
  background: #222228;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: var(--text-2);
  font-family: 'SF Mono', 'Cascadia Code', monospace;
  font-size: 10px;
  font-weight: 500;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04);
}
`;
    }
  };

  DS.Widget = Widget;
})();
