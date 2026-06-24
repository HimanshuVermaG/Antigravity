/**
 * DOM Surgeon — Smart Suggestions (Quick Clean)
 * Auto-detects annoying elements (cookie banners, ad containers, newsletter
 * popups, oversized sticky headers, overlay modals) and offers one-click
 * removal through the popup UI.
 *
 * All removals go through the standard DS change infrastructure so undo/redo,
 * reload persistence, sidebar history, and batch grouping all work seamlessly.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  // ── Category metadata ───────────────────────────────
  const CATEGORIES = {
    cookie:     { icon: '🍪', label: 'Cookie banner' },
    newsletter: { icon: '📧', label: 'Newsletter popup' },
    sticky:     { icon: '📌', label: 'Sticky header' },
    ad:         { icon: '📢', label: 'Ad container' },
    overlay:    { icon: '🪟', label: 'Overlay modal' }
  };

  // ── Selector lists per category ─────────────────────
  const COOKIE_SELECTORS = [
    '[class*="cookie" i]',
    '[class*="consent" i]',
    '[id*="cookie" i]',
    '[id*="gdpr" i]',
    '[class*="cc-" i]',
    '[id*="onetrust" i]',
    '[class*="cookie-banner" i]',
    '[id*="consent" i]',
    '[class*="CookieConsent" i]',
    '[aria-label*="cookie" i]',
    '[class*="privacy-banner" i]'
  ];

  const NEWSLETTER_SELECTORS = [
    '[class*="newsletter" i]',
    '[class*="subscribe" i]',
    '[class*="signup" i]',
    '[class*="email-capture" i]',
    '[class*="lead-capture" i]',
    '[class*="optin" i]'
  ];

  const AD_SELECTORS = [
    '[class*="ad-container" i]',
    '[class*="ad-wrapper" i]',
    '[class*="advert" i]',
    '[id*="ad-container" i]',
    '[id*="ad-wrapper" i]',
    '[class*="banner-ad" i]',
    '[class*="sponsored" i]',
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
    'iframe[src*="adservice"]',
    '[class*="ad-slot" i]',
    '[id*="google_ads" i]',
    '[data-ad]',
    '[data-ad-slot]'
  ];

  // ── Helpers ─────────────────────────────────────────

  function _isOwn(el) {
    if (!el) return true;
    const host = document.getElementById('dom-surgeon-host');
    return host && host.contains(el);
  }

  function _isVisible(el) {
    if (!el) return false;
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function _expandToWrapper(el) {
    let current = el;
    let depth = 0;
    const MAX_DEPTH = 20;
    while (current.parentElement && current.parentElement !== document.body && current.parentElement !== document.documentElement && depth < MAX_DEPTH) {
      depth++;
      const parent = current.parentElement;
      const tag = parent.tagName.toLowerCase();
      if (tag === 'header' || tag === 'main' || tag === 'nav' || tag === 'article') break;
      
      const children = Array.from(parent.children).filter(c => 
        c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE' && c.tagName !== 'NOSCRIPT' && _isVisible(c)
      );
      
      if (children.length > 1) {
        const id = parent.id || '';
        const cls = typeof parent.className === 'string' ? parent.className : '';
        const adRegex = /(^|[-_])(ad|ads|banner|popup|sponsored|cookie|adsbygoogle)([-_]|$)/i;
        
        if (adRegex.test(id) || adRegex.test(cls)) {
           current = parent;
           continue;
        }
        break;
      }
      
      const directTextLength = Array.from(parent.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .reduce((acc, n) => acc + n.textContent.trim().length, 0);
          
      if (directTextLength > 50) break;

      current = parent;
    }
    return current;
  }

  function _shortSelector(el) {
    const tag = el.tagName.toLowerCase();
    if (el.id) return tag + '#' + el.id;
    if (typeof el.className === 'string' && el.className.trim()) {
      const cls = el.className.trim().split(/\s+/).slice(0, 2).join('.');
      return tag + '.' + cls;
    }
    return tag;
  }

  function _uid() {
    return 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
  }

  // ── Deduplication: keep only the outermost element ──
  function _dedup(elements) {
    const unique = [];
    for (const el of elements) {
      let dominated = false;
      for (const other of elements) {
        if (other !== el && other.contains(el)) {
          dominated = true;
          break;
        }
      }
      if (!dominated) unique.push(el);
    }
    return unique;
  }

  // ── Query safely (some selectors can be invalid) ────
  function _safeQueryAll(selector) {
    try {
      return Array.from(document.querySelectorAll(selector));
    } catch (e) {
      return [];
    }
  }

  // ── Detection functions ─────────────────────────────

  function _detectBySelectors(selectors) {
    const results = [];
    for (const sel of selectors) {
      const els = _safeQueryAll(sel);
      els.forEach(el => {
        const wrapper = _expandToWrapper(el);
        results.push({ el: wrapper, rule: wrapper === el ? sel : null });
      });
    }
    return results;
  }

  function _detectStickyHeaders() {
    const results = [];
    const allEls = document.querySelectorAll('*');
    const vw = window.innerWidth;

    for (const el of allEls) {
      if (_isOwn(el)) continue;
      const style = getComputedStyle(el);
      const pos = style.position;
      if (pos !== 'fixed' && pos !== 'sticky') continue;

      const rect = el.getBoundingClientRect();
      // Must be near top, tall (> 80px), and span at least half the viewport
      if (rect.top <= 10 && rect.height > 80 && rect.width >= vw * 0.5) {
        results.push({ el, rule: null });
      }
    }
    return results;
  }

  function _detectOverlayModals() {
    const results = [];
    const allEls = document.querySelectorAll('*');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const viewportArea = vw * vh;

    for (const el of allEls) {
      if (_isOwn(el)) continue;
      const style = getComputedStyle(el);
      if (style.position !== 'fixed') continue;

      const zIndex = parseInt(style.zIndex, 10);
      if (isNaN(zIndex) || zIndex <= 999) continue;

      const rect = el.getBoundingClientRect();
      const area = rect.width * rect.height;
      if (area < viewportArea * 0.5) continue;

      // Check for dark/semi-transparent background (backdrop-like)
      const bg = style.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        results.push({ el, rule: null });
      }
    }
    return results;
  }

  // ── Main module ─────────────────────────────────────

  const SmartSuggestions = {

    /**
     * Scan the page for common annoyances.
     * Returns an array of serializable suggestion objects.
     */
    scan() {
      const suggestions = [];
      const seen = new Set();

      const addCategory = (category, items) => {
        const els = items.map(i => i.el);
        const deduped = _dedup(els.filter(el => {
          if (!el || _isOwn(el) || !_isVisible(el)) return false;
          if (el === document.body || el === document.documentElement) return false;
          if (el.dataset.dsHidden === 'true') return false;
          return true;
        }));

        for (const el of deduped) {
          // Avoid duplicates across categories
          if (seen.has(el)) continue;
          seen.add(el);

          const selector = DS.SelectorEngine?.generate(el);
          if (!selector) continue;

          const rect = el.getBoundingClientRect();
          const meta = CATEGORIES[category];
          const originalItem = items.find(i => i.el === el);
          const rule = originalItem ? originalItem.rule : null;

          suggestions.push({
            category,
            icon: meta.icon,
            label: meta.label,
            shortLabel: _shortSelector(el),
            selector,
            matchedRule: rule,
            dimensions: `${Math.round(rect.width)} × ${Math.round(rect.height)}`,
          });
        }
      };

      // 1. Cookie banners
      addCategory('cookie', _detectBySelectors(COOKIE_SELECTORS));

      // 2. Newsletter popups
      addCategory('newsletter', _detectBySelectors(NEWSLETTER_SELECTORS));

      // 3. Sticky headers > 80px
      addCategory('sticky', _detectStickyHeaders());

      // 4. Ad containers
      addCategory('ad', _detectBySelectors(AD_SELECTORS));

      // 5. Overlay modals
      addCategory('overlay', _detectOverlayModals());

      return suggestions;
    },

    /**
     * Clean the given suggestions by creating proper change records
     * through the standard DS infrastructure.
     * @param {Object[]} suggestions — array of suggestion objects to remove
     */
    async clean(suggestions) {
      if (!suggestions || suggestions.length === 0) return;

      const url = window.location.origin + window.location.pathname;
      const batchChanges = [];
      let shouldRestoreScroll = false;

      for (const suggestion of suggestions) {
        // Check if we need to restore scroll for overlays/sticky
        if (suggestion.category === 'overlay' || suggestion.category === 'sticky') {
          shouldRestoreScroll = true;
        }

        // Robust Removal via Global CSS Injection (if a generic rule exists)
        if (suggestion.matchedRule) {
          const change = {
            id: _uid(),
            type: 'inject-css',
            cssText: `${suggestion.matchedRule} { display: none !important; }`,
            isGlobal: true,
            timestamp: Date.now()
          };
          batchChanges.push(change);

          // Visually remove them immediately
          const matchingElements = _safeQueryAll(suggestion.matchedRule);
          matchingElements.forEach(el => el.remove());
          continue;
        }

        // Standard DOM removal for others
        const el = DS.SelectorEngine.find(suggestion.selector);
        if (!el || !document.body.contains(el)) continue;

        const parent = el.parentElement;
        const parentSelector = parent ? DS.SelectorEngine.generate(parent) : null;
        const childIndex = parent ? Array.from(parent.children).indexOf(el) : 0;

        const change = {
          id: _uid(),
          selector: suggestion.selector,
          type: 'delete',
          outerHTML: el.outerHTML,
          parentSelector,
          childIndex,
          isGlobal: true,
          fingerprint: DS.Main?._fingerprint(el),
          timestamp: Date.now()
        };

        batchChanges.push(change);
        el.remove();
      }

      // Auto-Restore Scrolling if a modal/overlay was removed
      if (shouldRestoreScroll) {
        const candidates = [
          { el: document.documentElement, sel: 'html' },
          { el: document.body, sel: 'body' },
          { el: document.getElementById('root'), sel: '#root' },
          { el: document.getElementById('app'), sel: '#app' },
          { el: document.getElementById('__next'), sel: '#__next' }
        ];

        for (const { el, sel } of candidates) {
          if (!el) continue;
          const style = getComputedStyle(el);
          let modified = false;

          let cssText = '';

          if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
            cssText += 'overflow: auto !important; ';
            el.style.setProperty('overflow', 'auto', 'important');
            modified = true;
          }

          if (style.position === 'fixed') {
            cssText += 'position: static !important; ';
            el.style.setProperty('position', 'static', 'important');
            modified = true;
          }

          if (cssText) {
            batchChanges.push({
              id: _uid(),
              type: 'inject-css',
              cssText: `${sel} { ${cssText} }`,
              isGlobal: true,
              timestamp: Date.now()
            });
          }
        }
      }

      if (batchChanges.length === 0) return;

      // Group as a batch if multiple, single change if one
      let finalChange;
      if (batchChanges.length === 1) {
        finalChange = batchChanges[0];
        finalChange.isGlobal = true;
      } else {
        finalChange = {
          id: _uid(),
          type: 'batch',
          batchAction: 'Quick Clean',
          changes: batchChanges,
          isGlobal: true,
          timestamp: Date.now()
        };
      }

      await DS.Storage.saveChange(url, finalChange, false);
      await DS.History.push(url, finalChange, finalChange.isGlobal);

      DS.Toast?.show(
        `Cleaned ${batchChanges.length} element${batchChanges.length > 1 ? 's' : ''}`,
        'success',
        { undoCallback: () => DS.Main?.undo() }
      );
      DS.Main?._afterChange();
    }
  };

  DS.SmartSuggestions = SmartSuggestions;
})();
