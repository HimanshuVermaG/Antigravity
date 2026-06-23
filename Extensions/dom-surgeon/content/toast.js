/**
 * DOM Surgeon — Toast Notification System
 * Renders toast messages inside the Shadow DOM.
 * Supports success / info / warning / danger types.
 * Each toast can optionally include an Undo button.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const MAX_VISIBLE = 3;
  const DEFAULT_DURATION = 5000;

  const ICONS = {
    success: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
      <path d="M8 7.2V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="8" cy="5" r="0.75" fill="currentColor"/>
    </svg>`,
    warning: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5L15 13.5H1L8 1.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M8 6.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="8" cy="11.5" r="0.65" fill="currentColor"/>
    </svg>`,
    danger: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
      <path d="M5.75 5.75L10.25 10.25M10.25 5.75L5.75 10.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  };

  const Toast = {
    _container: null,
    _toasts: [],

    /** Attach toast container to the given shadow root. */
    init(shadowRoot) {
      this._container = document.createElement('div');
      this._container.className = 'ds-toast-stack';
      shadowRoot.appendChild(this._container);
    },

    /**
     * Show a toast notification.
     * @param {string} message
     * @param {'success'|'info'|'warning'|'danger'} type
     * @param {{ undoCallback?: Function, duration?: number }} opts
     */
    show(message, type = 'info', opts = {}) {
      if (!this._container) return;

      const duration = opts.duration ?? DEFAULT_DURATION;

      const el = document.createElement('div');
      el.className = `ds-toast ds-toast--${type}`;

      // Icon
      const iconWrap = document.createElement('div');
      iconWrap.className = 'ds-toast__icon';
      iconWrap.innerHTML = ICONS[type] || ICONS.info;
      el.appendChild(iconWrap);

      // Message
      const msg = document.createElement('span');
      msg.className = 'ds-toast__msg';
      msg.textContent = message;
      el.appendChild(msg);

      // Optional Undo button
      if (typeof opts.undoCallback === 'function') {
        const undoBtn = document.createElement('button');
        undoBtn.className = 'ds-toast__undo';
        undoBtn.textContent = 'Undo';
        undoBtn.addEventListener('click', () => {
          opts.undoCallback();
          this._dismiss(el);
        });
        el.appendChild(undoBtn);
      }

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'ds-toast__close';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => this._dismiss(el));
      el.appendChild(closeBtn);

      // Progress bar
      const progress = document.createElement('div');
      progress.className = 'ds-toast__progress';
      progress.style.animationDuration = duration + 'ms';
      el.appendChild(progress);

      // Add to DOM
      this._container.appendChild(el);
      this._toasts.push(el);

      // Trigger enter animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add('ds-toast--in');
        });
      });

      // Evict oldest if over limit
      while (this._toasts.length > MAX_VISIBLE) {
        this._dismiss(this._toasts[0]);
      }

      // Auto-dismiss
      el._timer = setTimeout(() => this._dismiss(el), duration);
    },

    /** Dismiss a toast with exit animation. */
    _dismiss(el) {
      if (!el || !el.parentElement) return;
      clearTimeout(el._timer);

      el.classList.remove('ds-toast--in');
      el.classList.add('ds-toast--out');

      el.addEventListener('transitionend', () => {
        el.remove();
        this._toasts = this._toasts.filter(t => t !== el);
      }, { once: true });

      // Safety fallback in case transitionend doesn't fire
      setTimeout(() => {
        if (el.parentElement) {
          el.remove();
          this._toasts = this._toasts.filter(t => t !== el);
        }
      }, 300);
    },

    getStyles() {
      return `
/* ── Toast Stack ─────────────────────────────────── */
.ds-toast-stack {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2147483647;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.ds-toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  min-width: 240px;
  max-width: 380px;
  background: #1C1C22;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.45),
              0 0 0 1px rgba(255,255,255,0.03);
  color: #EDEDEF;
  font-size: 13px;
  line-height: 1.4;
  pointer-events: auto;
  position: relative;
  overflow: hidden;

  /* Enter: slide from right */
  transform: translateX(110%);
  opacity: 0;
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 220ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ds-toast--in {
  transform: translateX(0);
  opacity: 1;
}

.ds-toast--out {
  transform: translateX(110%);
  opacity: 0;
}

/* ── Icon ───── */
.ds-toast__icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
}
.ds-toast--success .ds-toast__icon { color: #22C55E; }
.ds-toast--info    .ds-toast__icon { color: #6366F1; }
.ds-toast--warning .ds-toast__icon { color: #F59E0B; }
.ds-toast--danger  .ds-toast__icon { color: #EF4444; }

/* ── Message ── */
.ds-toast__msg { flex: 1; }

/* ── Undo button */
.ds-toast__undo {
  flex-shrink: 0;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #818CF8;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: background 120ms, border-color 120ms;
}
.ds-toast__undo:hover {
  background: rgba(99,102,241,0.14);
  border-color: rgba(99,102,241,0.35);
}

/* ── Close ──── */
.ds-toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #5A5A65;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 0 2px;
  transition: color 120ms;
}
.ds-toast__close:hover { color: #EDEDEF; }

/* ── Progress bar ── */
.ds-toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform-origin: left center;
  animation: ds-toast-shrink linear forwards;
}
.ds-toast--success .ds-toast__progress { background: #22C55E; opacity: 0.4; }
.ds-toast--info    .ds-toast__progress { background: #6366F1; opacity: 0.4; }
.ds-toast--warning .ds-toast__progress { background: #F59E0B; opacity: 0.4; }
.ds-toast--danger  .ds-toast__progress { background: #EF4444; opacity: 0.4; }

@keyframes ds-toast-shrink {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}
`;
    }
  };

  DS.Toast = Toast;
})();
