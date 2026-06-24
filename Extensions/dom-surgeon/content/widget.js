/**
 * DOM Surgeon — Floating Widget
 * Replaces the native popup with an in-page, draggable, minimizable UI.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const CHANGE_ICONS = {
    delete:       { icon: '🔴', label: 'Deleted' },
    resize:       { icon: '🔵', label: 'Resized' },
    hide:         { icon: '🟣', label: 'Hidden' },
    show:         { icon: '🟢', label: 'Shown' },
    style:        { icon: '🟡', label: 'Styled' },
    batch:        { icon: '📦', label: 'Batch' },
    'inject-css': { icon: '🛡️', label: 'CSS Rule' }
  };

  function _escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

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
      this._isMinimized = false;
      this._container.classList.remove('ds-widget--minimized');
      
      // Safety check: if position is wildly off-screen, reset it
      const rect = this._container.getBoundingClientRect();
      if (!this._container.style.left || rect.left > window.innerWidth || rect.top > window.innerHeight) {
        // Place in top-right corner by default (320px widget width + 24px margin)
        this._container.style.left = Math.max(24, window.innerWidth - 320 - 24) + 'px';
        this._container.style.top = '50px'; // Account for breadcrumb bar (34px)
      }
      
      this._container.classList.add('ds-widget--open');
      if (!this._container.matches(':popover-open')) {
        this._container.showPopover();
      }
      this.refresh();
    },

    hide() {
      this._container.classList.remove('ds-widget--open');
      if (this._container.matches(':popover-open')) {
        this._container.hidePopover();
      }
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
      this._renderQuickClean();
    },

    async _renderQuickClean() {
      const qcList = this._shadow.querySelector('#ds-w-qc-list');
      const qcCount = this._shadow.querySelector('#ds-w-qc-count');
      const qcEmpty = this._shadow.querySelector('#ds-w-qc-empty');
      const qcCleanBtn = this._shadow.querySelector('#ds-w-qc-clean');

      if (!qcList) return;

      const suggestions = DS.SmartSuggestions?.scan() || [];
      this._lastSuggestions = suggestions;
      qcList.innerHTML = '';
      qcCount.textContent = suggestions.length;

      if (suggestions.length === 0) {
        qcEmpty.style.display = 'flex';
        qcCleanBtn.style.display = 'none';
        return;
      }

      qcEmpty.style.display = 'none';
      qcCleanBtn.style.display = 'flex';

      for (const s of suggestions) {
        const item = document.createElement('label');
        item.className = 'qc-item';
        item.innerHTML = `
          <input type="checkbox" class="qc-item__check" value="${s.selector}" checked>
          <span class="qc-item__icon">${s.icon}</span>
          <div class="qc-item__body">
            <div class="qc-item__label">${s.label}</div>
            <div class="qc-item__detail">${s.shortLabel} — ${s.dimensions}</div>
          </div>
        `;
        qcList.appendChild(item);
      }
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
      if (change.type === 'batch') {
        const count = change.changes ? change.changes.length : 0;
        desc = `${change.batchAction || 'Batch'} (${count} items)`;
        detail = `${count} items grouped`;
      } else if (change.type === 'inject-css') {
        desc = 'CSS Rule';
        detail = change.cssText || '';
      } else if (change.type === 'resize') {
        detail = `${_escapeHtml(change.property)}: ${_escapeHtml(change.modified)}`;
      } else if (change.type === 'style') {
        detail = `${_escapeHtml(change.property)}: ${_escapeHtml(change.modified)}`;
      } else if (change.type === 'hide') {
        detail = `display: none`;
      }

      const diff = Math.floor((Date.now() - change.timestamp) / 1000);
      let timeStr = 'now';
      if (diff >= 5 && diff < 60) timeStr = diff + 's ago';
      else if (diff >= 60 && diff < 3600) timeStr = Math.floor(diff/60) + 'm ago';
      else if (diff >= 3600 && diff < 86400) timeStr = Math.floor(diff/3600) + 'h ago';
      else if (diff >= 86400) timeStr = Math.floor(diff/86400) + 'd ago';

      const safeDesc = _escapeHtml(desc);
      const safeSel = _escapeHtml(sel);

      el.innerHTML = `
        <span class="history-item__icon">${info.icon}</span>
        <div class="history-item__body">
          <div class="history-item__desc" title="${safeSel}">${safeDesc}</div>
          ${detail ? `<div class="history-item__detail">${_escapeHtml(detail)}</div>` : ''}
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
        DS.Main?.undoSpecific(change.id).then(() => {
          this.refresh();
          DS.ChangeSidebar?.refresh();
        });
      });

      return el;
    },

    _build() {
      const w = document.createElement('div');
      w.className = 'ds-widget';
      w.setAttribute('popover', 'manual');
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
          <section class="section section--toggle" style="flex-direction: column; align-items: stretch; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="section__label">Element Selector</span>
              <label class="toggle">
                <input type="checkbox" class="toggle__input">
                <span class="toggle__track">
                  <span class="toggle__thumb"></span>
                </span>
              </label>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 12px;">
              <span class="section__label" style="color: var(--text-2); font-weight: normal;">Highlight Mode</span>
              <select id="ds-w-highlight-mode" style="background: var(--bg-card); color: var(--text); border: 1px solid var(--border); border-radius: 4px; padding: 4px 8px; font-size: 12px; outline: none; cursor: pointer;">
                <option value="xray">X-Ray (Default)</option>
                <option value="depth">Depth</option>
                <option value="marquee">Marquee Mode</option>
              </select>
            </div>
          </section>

          <!-- Quick Clean -->
          <section class="section section--quick-clean" id="ds-w-qc-section">
            <div class="qc-header">
              <div class="qc-header__left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span class="section__label">Quick Clean</span>
              </div>
              <span class="badge badge--sm" id="ds-w-qc-count">—</span>
            </div>
            <div class="qc-list" id="ds-w-qc-list"></div>
            <div class="qc-empty" id="ds-w-qc-empty" style="display:none;">
              <span class="qc-empty__icon">✨</span>
              <span>Page looks clean!</span>
            </div>
            <button class="qc-clean-btn" id="ds-w-qc-clean" style="display:none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
              <span>Clean Selected</span>
            </button>
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
            <button class="action-btn" id="ds-w-open-sidebar" style="flex-direction: row; gap: 8px; justify-content: center; margin-top: 8px; width: 100%;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><polyline points="21 3 14 10"/><polyline points="21 3 15 3"/><polyline points="21 3 21 9"/></svg>
              <span>View All Changes (C)</span>
            </button>
          </section>
          <!-- Shortcuts -->
          <section class="section section--shortcuts" style="padding-top: 0; border-top: none;">
            <button class="action-btn" id="ds-w-open-shortcuts" style="flex-direction: row; gap: 8px; justify-content: center; width: 100%;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <span>Keyboard Shortcuts (?)</span>
            </button>
          </section>

          <!-- Export / Import Footer -->
          <footer class="ds-w-footer-actions">
            <button class="footer-btn" id="ds-w-export">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span>Export</span>
            </button>
            <button class="footer-btn" id="ds-w-import-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Import</span>
            </button>
            <input type="file" id="ds-w-import-file" accept=".json" style="display:none;">
          </footer>
        </div>
      `;
      this._container = w;
      this._shadow.appendChild(w);
    },

    _bindEvents() {
      const w = this._container;
      
      // Highlight mode
      const modeSelect = w.querySelector('#ds-w-highlight-mode');
      if (modeSelect) {
        DS.Storage.getSettings().then(settings => {
          modeSelect.value = settings.highlightMode || 'depth';
        });
        modeSelect.addEventListener('change', (e) => {
          if (DS.Selector) {
            DS.Selector.setMode(e.target.value);
          }
        });
      }

      // Toggle logic
      w.querySelector('.toggle__input').addEventListener('change', async () => {
        const on = DS.Selector?.toggle();
        if (on !== undefined) {
          DS.Toast?.show(on ? 'Selector mode on' : 'Selector mode off', 'info');
          
          try {
            await this.refresh();
          } catch (err) {
            console.error('[DOM Surgeon] Failed to refresh widget:', err);
          }
          
          // Auto-minimize when activating selector
          if (on && !this._isMinimized) {
            // Slight delay ensures toggle animation doesn't conflict with minimize animation
            setTimeout(() => {
              const minBtn = w.querySelector('#ds-w-min');
              if (minBtn) minBtn.click();
            }, 100);
          }
        }
      });

      // Actions
      w.querySelector('#ds-w-undo').addEventListener('click', () => {
        DS.Main?.undo().then(() => this.refresh());
      });
      w.querySelector('#ds-w-redo').addEventListener('click', () => {
        DS.Main?.redo().then(() => this.refresh());
      });

      const qcCleanBtn = w.querySelector('#ds-w-qc-clean');
      if (qcCleanBtn) {
        qcCleanBtn.addEventListener('click', async () => {
          const checked = w.querySelectorAll('.qc-item__check:checked');
          const selectors = Array.from(checked).map(cb => cb.value);
          if (selectors.length === 0) return;

          const toClean = (this._lastSuggestions || []).filter(s => selectors.includes(s.selector));

          qcCleanBtn.classList.add('action-btn--pressed');
          qcCleanBtn.querySelector('span').textContent = 'Cleaning...';

          if (DS.SmartSuggestions) {
            await DS.SmartSuggestions.clean(toClean);
          }

          qcCleanBtn.querySelector('span').textContent = 'Clean Selected';
          qcCleanBtn.classList.remove('action-btn--pressed');
          
          this.refresh();
          DS.ChangeSidebar?.refresh();
        });
      }

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
      
      // Sidebar Toggle
      w.querySelector('#ds-w-open-sidebar')?.addEventListener('click', () => {
        DS.ChangeSidebar?.open();
      });

      let lastRect;
      // Close
      this._shadow.querySelector('#ds-w-close').addEventListener('click', () => {
        this.hide();
      });

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

      // Open shortcuts modal
      w.querySelector('#ds-w-open-shortcuts')?.addEventListener('click', () => {
        DS.ShortcutOverlay?.open();
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

      // Export logic
      w.querySelector('#ds-w-export').addEventListener('click', async () => {
        try {
          const data = await DS.Storage.getAllData();
          const json = JSON.stringify(data, null, 2);
          const blob = new Blob([json], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          const date = new Date().toISOString().split('T')[0];
          a.download = `dom-surgeon-backup-${date}.json`;
          a.click();
          URL.revokeObjectURL(url);
          
          DS.Toast?.show('Backup exported successfully', 'success');
        } catch (err) {
          console.error('[DOM Surgeon] Export failed', err);
          DS.Toast?.show('Failed to export backup', 'danger');
        }
      });

      // Import logic
      const importBtn = w.querySelector('#ds-w-import-btn');
      const importFile = w.querySelector('#ds-w-import-file');
      
      importBtn.addEventListener('click', () => importFile.click());
      
      importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const json = event.target.result;
            const res = await DS.Storage.importData(json);
            if (res.success) {
              DS.Toast?.show('Backup imported successfully. Reloading...', 'success');
              setTimeout(() => location.reload(), 1500);
            } else {
              throw new Error(res.error);
            }
          } catch (err) {
            console.error('[DOM Surgeon] Import failed', err);
            DS.Toast?.show('Failed to import backup: Invalid JSON', 'danger');
          }
          // Reset file input
          importFile.value = '';
        };
        reader.readAsText(file);
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
  pointer-events: auto;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.5;

  /* Animation */
  opacity: 0;
  transform: scale(0.96) translateY(10px);
  transition: opacity 400ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 400ms ease, width 400ms ease, display 400ms allow-discrete;
}

.ds-widget:popover-open {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@starting-style {
  .ds-widget:popover-open {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
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

/* ── Quick Clean Section ── */

.section--quick-clean {
  padding: 12px 16px;
}

.qc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.qc-header__left {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-2);
}

.qc-header__left svg {
  opacity: 0.6;
}

.qc-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 160px;
  overflow-y: auto;
}

.qc-list::-webkit-scrollbar { width: 4px; }
.qc-list::-webkit-scrollbar-track { background: transparent; }
.qc-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}

.qc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition);
}

.qc-item:hover {
  background: var(--bg-hover);
}

.qc-item__check {
  flex-shrink: 0;
  appearance: none;
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: border-color var(--transition), background var(--transition);
}

.qc-item__check:checked {
  background: var(--accent);
  border-color: var(--accent);
}

.qc-item__check:checked::after {
  content: '';
  position: absolute;
  left: 3.5px;
  top: 1px;
  width: 4px;
  height: 7px;
  border: solid #fff;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
}

.qc-item__icon {
  flex-shrink: 0;
  font-size: 12px;
  line-height: 1;
}

.qc-item__body {
  flex: 1;
  min-width: 0;
}

.qc-item__label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qc-item__detail {
  font-size: 10px;
  color: var(--text-3);
  font-family: 'SF Mono', 'Cascadia Code', monospace;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qc-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 0;
  color: var(--text-3);
  font-size: 11px;
}

.qc-empty__icon {
  font-size: 20px;
}

.qc-clean-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 8px;
  padding: 8px 12px;
  background: var(--accent-muted);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-sm);
  color: var(--accent);
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition),
              border-color var(--transition),
              transform 80ms ease;
}

.qc-clean-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.35);
}

.qc-clean-btn:active {
  transform: scale(0.98);
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

/* ── Footer / Export & Import ── */
.ds-w-footer-actions {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}
.footer-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-right: 1px solid var(--border);
  color: var(--text-2);
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}
.footer-btn:last-child {
  border-right: none;
}
.footer-btn:hover {
  background: var(--bg-hover);
  color: var(--text);
}
.footer-btn:active {
  background: var(--surface-tertiary);
}
.footer-btn svg {
  opacity: 0.7;
}
.footer-btn:hover svg {
  opacity: 1;
  color: var(--accent);
}
`;
    }
  };

  DS.Widget = Widget;
})();
