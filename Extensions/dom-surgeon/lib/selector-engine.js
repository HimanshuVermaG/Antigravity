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
      if (element.id) {
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
        if (segment.startsWith('#') || segment.startsWith('[data-testid')) {
          path.unshift(segment);
          break;
        }

        path.unshift(segment);
        current = current.parentElement;
      }

      // Prepend body if we didn't anchor on an ID / data-testid
      if (path.length > 0 && !path[0].startsWith('#') && !path[0].startsWith('[data-testid')) {
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

    _buildSegment(el) {
      // Try unique ID
      if (el.id) {
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

      // Tag + nth-child for disambiguation
      let tag = el.tagName.toLowerCase();
      const parent = el.parentElement;

      if (parent) {
        const siblings = Array.from(parent.children);
        const sameTag = siblings.filter(s => s.tagName === el.tagName);

        if (sameTag.length > 1) {
          const index = siblings.indexOf(el) + 1;
          tag += ':nth-child(' + index + ')';
        }
      }

      return tag;
    },

    _buildAbsolutePath(element) {
      const path = [];
      let current = element;

      while (current && current !== document.body) {
        const parent = current.parentElement;
        if (!parent) break;

        const index = Array.from(parent.children).indexOf(current) + 1;
        path.unshift(current.tagName.toLowerCase() + ':nth-child(' + index + ')');
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
