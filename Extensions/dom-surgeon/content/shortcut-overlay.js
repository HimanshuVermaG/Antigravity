/**
 * DOM Surgeon — Shortcut Overlay
 * Shows a beautiful modal with all keyboard shortcuts when pressing `?`.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const ShortcutOverlay = {
    _shadow: null,
    _container: null,
    _isOpen: false,

    init(shadow) {
      this._shadow = shadow;
      this._build();
      this._bindEvents();
    },

    toggle() {
      if (this._isOpen) this.close();
      else this.open();
    },

    open() {
      this._isOpen = true;
      this._container.style.display = 'flex';
      // Small delay to allow display:flex to apply before opacity transition
      requestAnimationFrame(() => {
        this._container.classList.add('ds-so--open');
      });
    },

    close() {
      this._isOpen = false;
      this._container.classList.remove('ds-so--open');
      setTimeout(() => {
        if (!this._isOpen) {
          this._container.style.display = 'none';
        }
      }, 200);
    },

    _build() {
      const overlay = document.createElement('div');
      overlay.className = 'ds-so-overlay';
      overlay.style.display = 'none';
      
      overlay.innerHTML = `
        <div class="ds-so-modal">
          <div class="ds-so-header">
            <h2>Keyboard Shortcuts</h2>
            <button class="ds-so-close" title="Close (Esc)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div class="ds-so-body">
            <!-- Navigation -->
            <div class="ds-so-section">
              <h3>Navigation</h3>
              <div class="ds-so-grid">
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>Q</kbd> / <kbd>↑</kbd></div>
                  <span>Select parent</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>W</kbd> / <kbd>↓</kbd></div>
                  <span>Select first child</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>A</kbd> / <kbd>←</kbd></div>
                  <span>Previous sibling</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>D</kbd> / <kbd>→</kbd></div>
                  <span>Next sibling</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="ds-so-section">
              <h3>Actions</h3>
              <div class="ds-so-grid">
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>Alt</kbd> + <kbd>S</kbd></div>
                  <span>Toggle Selector Mode</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>B</kbd></div>
                  <span>Toggle Before / After</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>C</kbd></div>
                  <span>Toggle Change Sidebar</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>E</kbd></div>
                  <span>Open CSS Injector</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>?</kbd></div>
                  <span>Show Shortcuts</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>Esc</kbd></div>
                  <span>Close Panel / Exit</span>
                </div>
              </div>
            </div>
            
            <!-- History -->
            <div class="ds-so-section">
              <h3>History</h3>
              <div class="ds-so-grid">
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>Cmd</kbd> + <kbd>Z</kbd></div>
                  <span>Undo last change</span>
                </div>
                <div class="ds-so-item">
                  <div class="ds-so-keys"><kbd>Cmd</kbd> + <kbd>⇧</kbd> + <kbd>Z</kbd></div>
                  <span>Redo last change</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      this._container = overlay;
      this._shadow.appendChild(overlay);
    },

    _bindEvents() {
      // Global keydown for ?
      document.addEventListener('keydown', (e) => {
        // Ignore if typing in input
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
        
        // ? is Shift + / usually, so e.key === '?'
        if (e.key === '?') {
          e.preventDefault();
          this.toggle();
        } else if (e.key === 'Escape' && this._isOpen) {
          e.preventDefault();
          e.stopPropagation(); // Stop other Esc handlers if overlay is open
          this.close();
        }
      }, true);

      // Close button
      this._container.querySelector('.ds-so-close').addEventListener('click', () => {
        this.close();
      });

      // Click outside to close
      this._container.addEventListener('click', (e) => {
        if (e.target === this._container) {
          this.close();
        }
      });
    },

    getStyles() {
      return `
/* ── Shortcut Overlay ───────────────────────── */
.ds-so-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 200ms ease;
  pointer-events: auto;
  font-family: var(--font-sans, -apple-system, sans-serif);
}

.ds-so-overlay.ds-so--open {
  opacity: 1;
}

.ds-so-modal {
  background: var(--surface-primary, #0F0F12);
  border: 1px solid var(--border-subtle, rgba(255,255,255,0.06));
  border-radius: var(--radius-xl, 12px);
  box-shadow: var(--shadow-lg, 0 8px 30px rgba(0,0,0,0.5));
  width: 480px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  color: var(--text-primary, #EDEDEF);
  transform: scale(0.95);
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ds-so-overlay.ds-so--open .ds-so-modal {
  transform: scale(1);
}

.ds-so-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.06));
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ds-so-header h2 {
  margin: 0;
  font-size: var(--text-lg, 16px);
  font-weight: 600;
}

.ds-so-close {
  background: transparent;
  border: none;
  color: var(--text-secondary, #8B8B96);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 150ms, color 150ms;
}

.ds-so-close:hover {
  background: var(--surface-tertiary, rgba(255,255,255,0.05));
  color: #fff;
}

.ds-so-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ds-so-section h3 {
  margin: 0 0 12px 0;
  font-size: var(--text-sm, 12px);
  font-weight: 600;
  color: var(--accent-indigo, #6366F1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ds-so-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
}

.ds-so-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--text-base, 13px);
  color: var(--text-secondary, #8B8B96);
}

.ds-so-keys {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ds-so-item kbd {
  background: var(--surface-tertiary, #222228);
  border: 1px solid var(--border-subtle, rgba(255,255,255,0.06));
  border-bottom-width: 2px;
  border-radius: 4px;
  padding: 3px 6px;
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs, 11px);
  color: var(--text-primary, #EDEDEF);
  min-width: 20px;
  text-align: center;
}
      `;
    }
  };

  DS.ShortcutOverlay = ShortcutOverlay;
})();
