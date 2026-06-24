/**
 * DOM Surgeon — Selector Engine
 * Generates unique, stable CSS selectors for DOM elements.
 * Used to persist and replay changes across page reloads.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const SelectorEngine = {

    /**
     * Generate a unique CSS selector for the given element.
     * Priority: #id > [data-testid] > optimized nth-child path
     */
    generate(element) {
      if (!element) return null;
      if (element === document.body) return 'body';
      if (element === document.documentElement) return 'html';

      // Fast path: element has a unique ID
      if (element.id && !this._isDynamic(element.id)) {
        const escaped = CSS.escape(element.id);
        try {
          if (document.querySelectorAll('#' + escaped).length === 1) {
            return '#' + escaped;
          }
        } catch (e) { /* invalid selector, fall through */ }
      }

      // Build path walking up the tree
      const path = [];
      let current = element;

      while (current && current !== document.body && current !== document.documentElement) {
        let segment = this._buildSegment(current);

        // If this segment alone is unique, anchor here and stop
        if (segment.startsWith('#') || segment.startsWith('[data-testid') || segment.startsWith('.')) {
          path.unshift(segment);
          break;
        }

        path.unshift(segment);
        current = current.parentElement;
      }

      // Prepend body if we didn't anchor on an ID / data-testid / class
      if (path.length > 0 && !path[0].startsWith('#') && !path[0].startsWith('[data-testid') && !path[0].startsWith('.')) {
        path.unshift('body');
      }

      const selector = path.join(' > ');

      // Validate: must match exactly one element, and it must be the right one
      if (this._validate(selector, element)) {
        return selector;
      }

      // Fallback: absolute nth-child path from body
      return this._buildAbsolutePath(element);
    },

    /**
     * Find an element by selector. Returns null if not found or selector is invalid.
     */
    find(selector) {
      if (!selector) return null;
      try {
        return document.querySelector(selector);
      } catch (e) {
        console.warn('[DOM Surgeon] Invalid selector:', selector, e);
        return null;
      }
    },

    // ── Private ──────────────────────────────────────────

    _isDynamic(str) {
      if (!str) return false;
      // Common dynamic ad/tracking prefixes
      if (/^(aswift|google_ads|goog_|snige)/i.test(str)) return true;
      // Modern framework auto-generated prefixes
      if (/^(css-|styled-|mui-|radix-|headlessui-)/i.test(str)) return true;
      // Long numeric hashes (6+ consecutive digits suggest auto-generated)
      if (/\d{6,}/.test(str)) return true;
      // Trailing numeric suffix with 3+ digits (e.g., `_host_123`, `-container-456`)
      if (/[-_]\d{3,}$/.test(str)) return true;
      return false;
    },

    _buildSegment(el) {
      // Try unique ID
      if (el.id && !this._isDynamic(el.id)) {
        const escaped = CSS.escape(el.id);
        try {
          if (document.querySelectorAll('#' + escaped).length === 1) {
            return '#' + escaped;
          }
        } catch (e) { /* fall through */ }
      }

      // Try data-testid
      const testId = el.getAttribute('data-testid');
      if (testId) {
        const sel = `[data-testid="${CSS.escape(testId)}"]`;
        try {
          if (document.querySelectorAll(sel).length === 1) {
            return sel;
          }
        } catch (e) { /* fall through */ }
      }

      // Try unique class
      if (typeof el.className === 'string' && el.className.trim()) {
        const classes = el.className.trim().split(/\s+/).filter(c => c && !this._isDynamic(c));
        for (const cls of classes) {
          try {
            const escaped = '.' + CSS.escape(cls);
            if (document.querySelectorAll(escaped).length === 1) {
              return escaped;
            }
          } catch (e) { /* fall through */ }
        }
        
        if (classes.length > 1) {
          try {
            const combined = classes.map(c => '.' + CSS.escape(c)).join('');
            if (document.querySelectorAll(combined).length === 1) {
              return combined;
            }
          } catch (e) { /* fall through */ }
        }
      }

      // Tag + nth-child for disambiguation
      let segment = el.tagName.toLowerCase();
      const parent = el.parentElement;

      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === el.tagName);
        const index = siblings.indexOf(el) + 1;
        segment = `${segment}:nth-of-type(${index})`;
      }

      return segment;
    },

    _buildAbsolutePath(element) {
      const path = [];
      let current = element;

      while (current && current !== document.body) {
        const parent = current.parentElement;
        if (!parent) break;

        const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
        const index = siblings.indexOf(current) + 1;
        const tag = current.tagName.toLowerCase();
        path.unshift(`${tag}:nth-of-type(${index})`);
        current = parent;
      }

      path.unshift('body');
      return path.join(' > ');
    },

    _validate(selector, expectedElement) {
      try {
        const matches = document.querySelectorAll(selector);
        return matches.length === 1 && matches[0] === expectedElement;
      } catch (e) {
        return false;
      }
    }
  };

  DS.SelectorEngine = SelectorEngine;
})();
