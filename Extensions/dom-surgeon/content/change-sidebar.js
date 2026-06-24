/**
 * DOM Surgeon — Change Sidebar
 * A right-side panel listing all changes, with individual undo and hover highlights.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  function _escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const CHANGE_ICONS = {
    delete: { icon: '🔴', label: 'Deleted' },
    resize: { icon: '🔵', label: 'Resized' },
    hide:   { icon: '🟣', label: 'Hidden' },
    show:   { icon: '🟢', label: 'Shown' },
    style:  { icon: '🟡', label: 'Styled' },
    batch:  { icon: '📦', label: 'Batch' }
  };

  const ChangeSidebar = {
    _shadow: null,
    _panel: null,
    _filter: 'all',
    _isOpen: false,

    init(shadow) {
      this._shadow = shadow;
      this._build();
      this._bindEvents();
    },

    toggle() {
      this._isOpen ? this.close() : this.open();
    },

    open() {
      if (this._isOpen) return;
      this._isOpen = true;
      this._panel.classList.add('ds-sidebar--open');
      this.refresh();
    },

    close() {
      if (!this._isOpen) return;
      this._isOpen = false;
      this._panel.classList.remove('ds-sidebar--open');
    },

    async refresh() {
      if (!this._isOpen) return;
      
      const url = DS.Main?._pageKey();
      if (!url) return;
      
      const changes = await DS.Storage.getChanges(url);
      this._render(changes);
      
      // Update widget count if needed, or other places can handle their own
    },

    _build() {
      const el = document.createElement('div');
      el.id = 'ds-sidebar';
      el.className = 'ds-sidebar';

      el.innerHTML = `
        <div class="ds-sidebar__header">
          <div class="ds-sidebar__title">
            <span>Changes on this page</span>
            <span id="ds-sidebar-count" class="ds-sidebar__count">0</span>
          </div>
          <button id="ds-sidebar-close" class="ds-sidebar__close" title="Close Sidebar (C)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="ds-sidebar__filters">
          <button class="ds-sidebar__filter active" data-filter="all">All</button>
          <button class="ds-sidebar__filter" data-filter="delete">Del</button>
          <button class="ds-sidebar__filter" data-filter="resize">Resize</button>
          <button class="ds-sidebar__filter" data-filter="hide">Hide</button>
          <button class="ds-sidebar__filter" data-filter="style">Style</button>
        </div>

        <div id="ds-sidebar-list" class="ds-sidebar__list"></div>
        
        <div id="ds-sidebar-empty" class="ds-sidebar__empty" style="display: none;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          <div style="margin-top: 12px; font-weight: 500;">No changes yet</div>
          <div style="margin-top: 4px; font-size: 11px; color: var(--text-2);">Use the Element Selector to start modifying this page.</div>
        </div>
      `;

      this._panel = el;
      this._shadow.appendChild(el);
      
      this._injectStyles();
    },

    _injectStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .ds-sidebar {
          position: fixed;
          top: 0;
          right: -320px;
          width: 320px;
          height: 100vh;
          background: rgba(15, 15, 18, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: -8px 0 24px rgba(0,0,0,0.4);
          z-index: 2147483647;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          color: #EDEDEF;
          pointer-events: auto;
          transition: right 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .ds-sidebar--open {
          right: 0;
        }

        .ds-sidebar__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .ds-sidebar__title {
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ds-sidebar__count {
          background: rgba(255,255,255,0.1);
          padding: 2px 6px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }
        .ds-sidebar__close {
          background: none;
          border: none;
          color: #8B8B96;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          display: flex;
          transition: all 150ms;
        }
        .ds-sidebar__close:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .ds-sidebar__filters {
          display: flex;
          padding: 12px 16px;
          gap: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .ds-sidebar__filters::-webkit-scrollbar { display: none; }
        
        .ds-sidebar__filter {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid transparent;
          color: #A1A1AA;
          padding: 4px 10px;
          border-radius: 14px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 150ms;
          white-space: nowrap;
        }
        .ds-sidebar__filter:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        .ds-sidebar__filter.active {
          background: rgba(99, 102, 241, 0.15);
          color: #818CF8;
          border-color: rgba(99, 102, 241, 0.3);
        }

        .ds-sidebar__list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ds-sidebar-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          cursor: pointer;
          transition: all 150ms;
          position: relative;
        }
        .ds-sidebar-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
        }
        .ds-sidebar-item--previewing {
          border-color: rgba(234, 179, 8, 0.5);
          background: rgba(234, 179, 8, 0.05);
        }

        .ds-sidebar-item__icon {
          font-size: 14px;
          margin-top: 2px;
        }
        
        .ds-sidebar-item__body {
          flex: 1;
          min-width: 0;
        }
        .ds-sidebar-item__desc {
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ds-sidebar-item__detail {
          font-size: 11px;
          color: #A1A1AA;
          margin-top: 4px;
          font-family: 'SF Mono', 'Cascadia Code', monospace;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ds-sidebar-item__time {
          font-size: 10px;
          color: #6B7280;
          margin-top: 6px;
        }

        .ds-sidebar-item__undo {
          background: rgba(255,255,255,0.08);
          border: none;
          color: #A1A1AA;
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
          opacity: 0;
          transform: translateX(5px);
          transition: all 200ms;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ds-sidebar-item:hover .ds-sidebar-item__undo {
          opacity: 1;
          transform: translateX(0);
        }
        .ds-sidebar-item__undo:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #EF4444;
        }

        .ds-sidebar__empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #8B8B96;
          text-align: center;
          padding: 32px;
        }
      `;
      this._shadow.appendChild(style);
    },

    _bindEvents() {
      this._panel.querySelector('#ds-sidebar-close').addEventListener('click', () => this.close());

      this._panel.querySelectorAll('.ds-sidebar__filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this._panel.querySelectorAll('.ds-sidebar__filter').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          this._filter = e.currentTarget.dataset.filter;
          this.refresh();
        });
      });
    },

    _render(changes) {
      const list = this._panel.querySelector('#ds-sidebar-list');
      const empty = this._panel.querySelector('#ds-sidebar-empty');
      const countEl = this._panel.querySelector('#ds-sidebar-count');
      
      list.innerHTML = '';
      
      let filtered = changes;
      if (this._filter !== 'all') {
        filtered = changes.filter(c => c.type === this._filter);
      }

      countEl.textContent = filtered.length;

      if (filtered.length === 0) {
        empty.style.display = 'flex';
        return;
      }
      empty.style.display = 'none';

      const reversed = [...filtered].reverse();
      for (const ch of reversed) {
        list.appendChild(this._createItem(ch));
      }
    },

    _createItem(change) {
      const el = document.createElement('div');
      el.className = 'ds-sidebar-item';
      
      const info = CHANGE_ICONS[change.type] || { icon: '⚪', label: change.type };
      let desc = info.label;
      let sel = '';
      let detail = '';

      if (change.type === 'batch') {
        sel = `${change.changes.length} elements`;
        desc = `${change.batchAction} ${sel}`;
        detail = `${change.changes.length} items grouped`;
      } else {
        sel = change.selector || '';
        const shortSel = sel.split(' > ').pop() || sel;
        desc += ` ${shortSel}`;

        if (change.type === 'resize' || change.type === 'style') {
          detail = `${change.property}: ${change.modified}`;
        } else if (change.type === 'hide') {
          detail = `display: none`;
        }
      }

      const diff = Math.floor((Date.now() - change.timestamp) / 1000);
      let timeStr = 'now';
      if (diff >= 5 && diff < 60) timeStr = diff + 's ago';
      else if (diff >= 60 && diff < 3600) timeStr = Math.floor(diff/60) + 'm ago';
      else if (diff >= 3600 && diff < 86400) timeStr = Math.floor(diff/3600) + 'h ago';
      else if (diff >= 86400) timeStr = Math.floor(diff/86400) + 'd ago';

      el.innerHTML = `
        <span class="ds-sidebar-item__icon">${info.icon}</span>
        <div class="ds-sidebar-item__body">
          <div class="ds-sidebar-item__desc" title="${_escapeHtml(sel)}">${_escapeHtml(desc)}</div>
          ${detail ? `<div class="ds-sidebar-item__detail">${_escapeHtml(detail)}</div>` : ''}
          <div class="ds-sidebar-item__time">${timeStr}</div>
        </div>
        <button class="ds-sidebar-item__undo" title="Undo this change">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H12C13.1 8 14 8.9 14 10V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 5L3 8L6 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;

      // Click to preview
      el.addEventListener('click', (e) => {
        if (e.target.closest('.ds-sidebar-item__undo')) return;
        
        const isPreviewing = el.classList.contains('ds-sidebar-item--previewing');
        
        this._panel.querySelectorAll('.ds-sidebar-item--previewing').forEach(node => {
          node.classList.remove('ds-sidebar-item--previewing');
        });

        if (isPreviewing) {
          DS.Main?.clearPreview();
          DS.EditorPanel?.hide();
        } else {
          el.classList.add('ds-sidebar-item--previewing');
          DS.Main?.previewChange(change.id).then(() => {
             const nodes = DS.Main?._previewNodes || [];
             if (nodes.length > 0 && DS.EditorPanel) {
                nodes.forEach(n => {
                   if (n.el && n.el.style) n.el.style.pointerEvents = 'auto'; // ensure we can interact
                });
                DS.EditorPanel.show(nodes[0].el, change, true);
             }
          });
        }
      });

      // Undo
      el.querySelector('.ds-sidebar-item__undo').addEventListener('click', async (e) => {
        e.stopPropagation();
        e.currentTarget.disabled = true;
        DS.Main?.clearPreview();
        el.style.opacity = '0.5';
        DS.Main?.undoSpecific(change.id).then(() => this.refresh());
      });

      return el;
    }
  };

  DS.ChangeSidebar = ChangeSidebar;
})();
