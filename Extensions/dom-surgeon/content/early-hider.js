/**
 * DOM Surgeon — Early Hider
 * Runs at document_start to inject a CSS stylesheet that hides elements before they render,
 * preventing Flash of Unstyled Content (FOUC).
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const EarlyHider = {
    _styleEl: null,

    init() {
      // Create the style element once and append it to <html> immediately
      this._styleEl = document.createElement('style');
      this._styleEl.id = 'ds-early-hider';
      if (document.documentElement) {
        document.documentElement.appendChild(this._styleEl);
      }

      this._loadAndApply();
    },

    async _loadAndApply() {
      if (!DS.Storage) return;
      try {
        const url = window.location.origin + window.location.pathname;
        const changes = await DS.Storage.getChanges(url);
        this.apply(changes);
      } catch (e) {
        // Storage might not be fully initialized in some edge cases
        console.warn('[DOM Surgeon] EarlyHider could not load changes:', e);
      }
    },

    apply(changes) {
      if (!this._styleEl) return;
      if (!changes || changes.length === 0) {
        this._styleEl.textContent = '';
        return;
      }

      const hideSelectors = [];
      const cssInjections = [];

      // Flatten batches
      const flatChanges = [];
      for (const ch of changes) {
        if (ch.type === 'batch') {
          flatChanges.push(...ch.changes);
        } else {
          flatChanges.push(ch);
        }
      }

      for (const ch of flatChanges) {
        if (ch.type === 'delete' || ch.type === 'hide') {
          hideSelectors.push(ch.selector);
        } else if (ch.type === 'inject-css') {
          cssInjections.push(ch.cssText);
        }
      }

      let css = '';
      if (hideSelectors.length > 0) {
        // Group all selectors to minimize CSS size
        css += hideSelectors.join(',\\n') + ' {\\n  display: none !important;\\n}\\n';
      }

      if (cssInjections.length > 0) {
        css += '\\n/* Injected CSS */\\n' + cssInjections.join('\\n');
      }

      this._styleEl.textContent = css;
    }
  };

  DS.EarlyHider = EarlyHider;

  // Run immediately at document_start
  EarlyHider.init();
})();
