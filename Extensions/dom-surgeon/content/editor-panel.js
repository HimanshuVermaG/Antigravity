/**
 * DOM Surgeon — Editor Panel
 * Floating in-page panel for editing selected element properties.
 * Rendered inside the Shadow DOM for style isolation.
 * Draggable, with dimension inputs, unit selectors, and a delete button.
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const EditorPanel = {
    _panel: null,
    _shadowRoot: null,
    _currentEl: null,
    _dragging: false,
    _dragOff: { x: 0, y: 0 },
    _deleteTimer: null,
    _pendingStyles: {}, // { cssProp: { original, current } } — staged but not saved
    _pendingContent: {}, // { property: { original, current } }

    // ── Public API ─────────────────────────────────────

    init(shadowRoot) {
      this._shadowRoot = shadowRoot;
      this._build();
      this._bindDrag();
    },

    show(element, editChange = null) {
      if (this._currentEl) {
        this._currentEl.style.removeProperty('anchor-name');
      }
      this._currentEl = element;
      this._currentEl.style.setProperty('anchor-name', '--ds-target', 'important');
      
      this._editChange = editChange;
      this._isBatchMode = DS.MultiSelect?.isActive() || false;
      this._pendingStyles = {}; // reset staged changes on each new selection
      this._pendingContent = {};
      this._populate(element);
      this._resetDelete();
      
      // Force the popover to the top of the Top Layer stack by re-showing it
      if (this._panel.matches(':popover-open')) {
        this._panel.hidePopover();
      }
      this._panel.showPopover();
      
      this._position(element);
    },

    hide() {
      if (!this._panel) return;
      this._revertPreview();
      if (this._panel.matches(':popover-open')) {
        this._panel.hidePopover();
      }
      if (this._currentEl) {
        this._currentEl.style.removeProperty('anchor-name');
      }
      this._currentEl = null;
      this._editChange = null;
      this._originalStyles = null;
      this._pendingStyles = {};
      this._pendingContent = {};
      this._resetDelete();
    },

    isVisible() {
      return this._panel && this._panel.matches(':popover-open');
    },

    // ── Build ──────────────────────────────────────────

    _build() {
      const p = document.createElement('div');
      p.className = 'ds-ep';
      p.setAttribute('popover', 'manual');
      p.innerHTML = `
        <!-- Header -->
        <div class="ds-ep__head">
          <div class="ds-ep__title">
            <span class="ds-ep__tag"></span>
            <span class="ds-ep__dims"></span>
          </div>
          <button class="ds-ep__close" title="Close (Esc)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Selector path -->
        <div class="ds-ep__path"></div>
        
        <!-- Action Row: Magic Wand -->
        <div class="ds-ep__action-row" style="padding: 0 16px 12px 16px; display: flex; gap: 8px;">
          <button class="ds-ep__btn ds-ep__btn--secondary" id="ds-ep-magic-wand" style="flex:1; font-size: 11px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: text-bottom;">
              <path d="M15 4V2 M15 16v-2 M8 9h2 M20 9h2 M14.2 4.2l1.4-1.4 M19.8 9.8l1.4 1.4 M14.2 13.8l1.4 1.4 M19.8 4.2l1.4-1.4 M3 21l9-9" />
            </svg> Select Similar
          </button>
        </div>

        <!-- Body -->
        <div class="ds-ep__body">

          <!-- Dimensions (always visible) -->
          <div class="ds-ep__sec">
            <div class="ds-ep__sec-title">Dimensions</div>

            <div class="ds-ep__row">
              <span class="ds-ep__lbl">W</span>
              <input type="number" class="ds-ep__input" data-prop="width" placeholder="auto">
              <select class="ds-ep__unit" data-prop="width">
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vw">vw</option>
                <option value="auto">auto</option>
              </select>
            </div>

            <div class="ds-ep__row">
              <span class="ds-ep__lbl">H</span>
              <input type="number" class="ds-ep__input" data-prop="height" placeholder="auto">
              <select class="ds-ep__unit" data-prop="height">
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vh">vh</option>
                <option value="auto">auto</option>
              </select>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="ds-ep__btn ds-ep__btn--secondary" data-action="reset" style="flex:1; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1);" title="Revert all unsaved changes">
                Reset
              </button>
              <button class="ds-ep__btn ds-ep__btn--primary" data-action="apply" style="flex:1">
                Apply
              </button>
            </div>
          </div>

          <div class="ds-ep__hr"></div>

          <!-- Content Accordion -->
          <div class="ds-ep__accordion" id="ds-ep-content-acc" style="display:none">
            <div class="ds-ep__accordion-head" data-target="content">
              <span class="ds-ep__sec-title" style="margin:0">Content</span>
              <svg class="ds-ep__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="ds-ep__accordion-body" id="ds-ep-content" style="display:none; padding-top: 16px;">
              <div class="ds-ep__row" id="ds-ep-text-row" style="display:none; flex-direction:column; align-items:flex-start;">
                <span class="ds-ep__lbl" style="margin-bottom:4px; width:auto">Text Content</span>
                <textarea class="ds-ep__input" id="ds-ep-text-content" style="width:100%; min-height:60px; resize:vertical; padding:4px;"></textarea>
              </div>
              <div class="ds-ep__row" id="ds-ep-img-row" style="display:none; flex-direction:column; align-items:flex-start; margin-top:8px;">
                <span class="ds-ep__lbl" style="margin-bottom:4px; width:auto">Image URL (src)</span>
                <input type="text" class="ds-ep__input" id="ds-ep-img-src" style="width:100%;">
              </div>
            </div>
          </div>

          <!-- Layout Accordion -->
          <div class="ds-ep__accordion">
            <div class="ds-ep__accordion-head" data-target="layout">
              <span class="ds-ep__sec-title" style="margin:0">Layout (Box Model)</span>
              <svg class="ds-ep__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="ds-ep__accordion-body" id="ds-ep-layout" style="display:none; padding-top: 16px;">
              <div id="ds-ep-box-model-container"></div>
            </div>
          </div>

          <!-- Appearance Accordion -->
          <div class="ds-ep__accordion">
            <div class="ds-ep__accordion-head" data-target="appearance">
              <span class="ds-ep__sec-title" style="margin:0">Appearance</span>
              <svg class="ds-ep__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="ds-ep__accordion-body" id="ds-ep-appearance" style="display:none">

              <!-- Background color -->
              <div class="ds-ep__row">
                <span class="ds-ep__lbl" style="width:auto;font-size:10px;color:#8B8B96;white-space:nowrap">Bg</span>
                <input type="color" class="ds-ep__color" data-style="backgroundColor" title="Background color">
                <input type="text" class="ds-ep__input ds-ep__input--color-text" data-style="backgroundColor" placeholder="transparent" spellcheck="false">
              </div>

              <!-- Text color -->
              <div class="ds-ep__row">
                <span class="ds-ep__lbl" style="width:auto;font-size:10px;color:#8B8B96;white-space:nowrap">Fg</span>
                <input type="color" class="ds-ep__color" data-style="color" title="Text color">
                <input type="text" class="ds-ep__input ds-ep__input--color-text" data-style="color" placeholder="inherit" spellcheck="false">
              </div>

              <!-- Opacity -->
              <div class="ds-ep__slider-row">
                <div class="ds-ep__slider-label">
                  <span>Opacity</span>
                  <span class="ds-ep__slider-val" id="ds-ep-opacity-val">100%</span>
                </div>
                <input type="range" class="ds-ep__slider" id="ds-ep-opacity" min="0" max="100" value="100" data-style="opacity">
              </div>

              <!-- Kill Animations -->
              <div class="ds-ep__row" style="margin-top: 8px;">
                <button class="ds-ep__btn ds-ep__btn--secondary" id="ds-ep-kill-anim-btn" style="width: 100%; font-size: 11px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: text-bottom;"><path d="M10 9l-6 6 6 6 M20 4v7a4 4 0 0 1-4 4H4"/></svg>
                  Kill Animations & Transitions
                </button>
              </div>

              <!-- Blur -->
              <div class="ds-ep__slider-row">
                <div class="ds-ep__slider-label">
                  <span>Blur</span>
                  <span class="ds-ep__slider-val" id="ds-ep-blur-val">0px</span>
                </div>
                <input type="range" class="ds-ep__slider" id="ds-ep-blur" min="0" max="20" value="0" data-style="blur">
              </div>

            </div>
          </div>

          <div class="ds-ep__hr"></div>

          <!-- Typography Accordion -->
          <div class="ds-ep__accordion">
            <div class="ds-ep__accordion-head" data-target="typography">
              <span class="ds-ep__sec-title" style="margin:0">Typography</span>
              <svg class="ds-ep__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="ds-ep__accordion-body" id="ds-ep-typography" style="display:none">

              <!-- Font size -->
              <div class="ds-ep__row">
                <span class="ds-ep__lbl">Sz</span>
                <input type="number" class="ds-ep__input" id="ds-ep-font-size" placeholder="16" min="1" max="999">
                <select class="ds-ep__unit" id="ds-ep-font-unit">
                  <option value="px">px</option>
                  <option value="rem">rem</option>
                  <option value="em">em</option>
                </select>
              </div>

              <!-- Font weight slider -->
              <div class="ds-ep__slider-row">
                <div class="ds-ep__slider-label">
                  <span>Weight</span>
                  <span class="ds-ep__slider-val" id="ds-ep-weight-val">400</span>
                </div>
                <input type="range" class="ds-ep__slider" id="ds-ep-weight" min="100" max="900" step="100" value="400" data-style="fontWeight">
              </div>

              <!-- Line height -->
              <div class="ds-ep__row">
                <span class="ds-ep__lbl" style="font-size:10px">LH</span>
                <input type="number" class="ds-ep__input" id="ds-ep-line-height" placeholder="1.5" step="0.1" min="0.5" max="5">
              </div>

              <!-- Font Swapper -->
              <div class="ds-ep__row" style="margin-top: 8px;">
                <button class="ds-ep__btn ds-ep__btn--secondary" id="ds-ep-font-swap-btn" style="width: 100%; font-size: 11px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: text-bottom;"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
                  Force Readable Font
                </button>
              </div>

              <!-- Text align -->
              <div class="ds-ep__align-row">
                <button class="ds-ep__align-btn" data-align="left" title="Align left">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h12M3 18h15"/></svg>
                </button>
                <button class="ds-ep__align-btn" data-align="center" title="Align center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M6 12h12M4 18h16"/></svg>
                </button>
                <button class="ds-ep__align-btn" data-align="right" title="Align right">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M9 12h12M6 18h15"/></svg>
                </button>
                <button class="ds-ep__align-btn" data-align="justify" title="Justify">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                </button>
              </div>

            </div>
          </div>

          <div class="ds-ep__hr"></div>

          <!-- Scope -->
          <div class="ds-ep__sec">
            <div class="ds-ep__sec-title">Scope</div>
            <select class="ds-ep__input" id="ds-ep-scope" style="width:100%; margin-bottom: 8px;">
              <option value="page">This Page Only (Default)</option>
              <option value="domain">Entire Website</option>
            </select>
          </div>

          <div class="ds-ep__hr"></div>

          <!-- Actions -->
          <div class="ds-ep__sec" style="display: flex; gap: 8px;">
            <button class="ds-ep__btn ds-ep__btn--secondary" id="ds-ep-hide-btn" data-action="hide" style="flex:1; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 8px 4px;">
              <svg id="ds-ep-hide-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
              <span id="ds-ep-hide-label">Hide</span>
            </button>
            <button class="ds-ep__btn ds-ep__btn--danger" data-action="delete" style="flex:1; padding: 8px 4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              <span>Delete</span>
            </button>
          </div>

          <!-- Selected Elements List (Batch Mode Only) -->
          <div class="ds-ep__hr" id="ds-ep-list-hr" style="display:none"></div>
          <div class="ds-ep__sec" id="ds-ep-selected-list-sec" style="display:none; max-height: 150px; overflow-y: auto;">
            <div class="ds-ep__sec-title" style="margin-bottom: 8px;">Selected Elements</div>
            <div id="ds-ep-selected-list" style="display: flex; flex-direction: column; gap: 4px;"></div>
          </div>
        </div>
      `;


      // ── Wire events ────────────────────────────────
      p.querySelector('.ds-ep__close').addEventListener('click', () => {
        this.hide();
        DS.Selector?.deselect();
      });

      // Accordion toggles
      p.querySelectorAll('.ds-ep__accordion-head').forEach(head => {
        head.addEventListener('click', () => {
          const target = head.dataset.target;
          const body = p.querySelector(`#ds-ep-${target}`);
          const chevron = head.querySelector('.ds-ep__chevron');
          const isOpen = body.style.display !== 'none';
          body.style.display = isOpen ? 'none' : 'block';
          chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
        });
      });

      p.querySelector('[data-action="reset"]').addEventListener('click', () => {
        this._handleReset();
      });

      p.querySelector('[data-action="apply"]').addEventListener('click', () => {
        this._applyDimensions();
      });

      p.querySelector('[data-action="hide"]').addEventListener('click', () => {
        this._handleHide();
      });

      p.querySelector('[data-action="delete"]').addEventListener('click', () => {
        this._handleDelete();
      });

      // ── Color pickers — stage on change, preview on input ────
      p.querySelectorAll('.ds-ep__color').forEach(picker => {
        picker.addEventListener('input', (e) => {
          const prop = e.target.dataset.style;
          const textInput = p.querySelector(`.ds-ep__input--color-text[data-style="${prop}"]`);
          if (this._currentEl) {
            this._applyLivePreview(prop, e.target.value);
            if (textInput) textInput.value = e.target.value;
          }
        });
        // 'change' just syncs text field — staging already done on 'input'
      });

      // Color text inputs
      p.querySelectorAll('.ds-ep__input--color-text').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const prop = e.target.dataset.style;
          if (this._currentEl) {
            this._applyLivePreview(prop, e.target.value);
          }
        });
        inp.addEventListener('click', (e) => e.stopPropagation());
        inp.addEventListener('keydown', (e) => e.stopPropagation());
      });

      // ── Sliders — stage on input ─────────────────────
      const opacitySlider = p.querySelector('#ds-ep-opacity');
      const opacityVal = p.querySelector('#ds-ep-opacity-val');
      opacitySlider.addEventListener('input', (e) => {
        const v = (e.target.value / 100).toString();
        opacityVal.textContent = e.target.value + '%';
        if (this._currentEl) {
          this._applyLivePreview('opacity', v);
        }
      });

      const blurSlider = p.querySelector('#ds-ep-blur');
      const blurVal = p.querySelector('#ds-ep-blur-val');
      blurSlider.addEventListener('input', (e) => {
        const filterVal = e.target.value > 0 ? `blur(${e.target.value}px)` : '';
        blurVal.textContent = e.target.value + 'px';
        if (this._currentEl) {
          this._applyLivePreview('filter', filterVal);
        }
      });

      // ── Typography — stage on input ──────────────────
      const fontSizeInp = p.querySelector('#ds-ep-font-size');
      const fontUnitSel = p.querySelector('#ds-ep-font-unit');
      const stageFontSize = () => {
        if (!this._currentEl || !fontSizeInp.value) return;
        const val = fontSizeInp.value + fontUnitSel.value;
        this._applyLivePreview('fontSize', val);
      };
      fontSizeInp.addEventListener('input', stageFontSize);
      fontUnitSel.addEventListener('change', stageFontSize);
      fontSizeInp.addEventListener('click', (e) => e.stopPropagation());
      fontSizeInp.addEventListener('keydown', (e) => e.stopPropagation());

      const weightSlider = p.querySelector('#ds-ep-weight');
      const weightVal = p.querySelector('#ds-ep-weight-val');
      weightSlider.addEventListener('input', (e) => {
        weightVal.textContent = e.target.value;
        if (this._currentEl) {
          this._applyLivePreview('fontWeight', e.target.value);
        }
      });

      const lineHeightInp = p.querySelector('#ds-ep-line-height');
      lineHeightInp.addEventListener('input', (e) => {
        if (this._currentEl) {
          this._applyLivePreview('lineHeight', e.target.value);
        }
      });
      lineHeightInp.addEventListener('click', (e) => e.stopPropagation());
      lineHeightInp.addEventListener('keydown', (e) => e.stopPropagation());

      // Text align buttons
      p.querySelectorAll('.ds-ep__align-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const align = btn.dataset.align;
          if (!this._currentEl) return;
          this._applyLivePreview('textAlign', align);
          p.querySelectorAll('.ds-ep__align-btn').forEach(b => b.classList.remove('ds-ep__align-btn--active'));
          btn.classList.add('ds-ep__align-btn--active');
        });
      });

      // Quick actions
      const killAnimBtn = p.querySelector('#ds-ep-kill-anim-btn');
      if (killAnimBtn) {
        killAnimBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._applyLivePreview('animation', 'none !important');
          this._applyLivePreview('transition', 'none !important');
          this._applyDimensions(); // Save immediately
        });
      }

      const fontSwapBtn = p.querySelector('#ds-ep-font-swap-btn');
      if (fontSwapBtn) {
        fontSwapBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._applyLivePreview('fontFamily', 'system-ui, -apple-system, sans-serif !important');
          this._applyDimensions(); // Save immediately
        });
      }

      // Select Similar (Magic Wand)
      const magicWandBtn = p.querySelector('#ds-ep-magic-wand');
      if (magicWandBtn) {
        magicWandBtn.addEventListener('click', () => {
          if (!this._currentEl) return;
          const tag = this._currentEl.tagName.toLowerCase();
          const classes = Array.from(this._currentEl.classList || []).filter(c => !c.startsWith('ds-') && !c.includes(':'));
          const selector = tag + (classes.length > 0 ? '.' + classes.join('.') : '');
          try {
            const matches = document.querySelectorAll(selector);
            DS.MultiSelect.add(this._currentEl);
            matches.forEach(m => {
              if (m !== this._currentEl && !DS.MultiSelect._selected.includes(m)) {
                if (!DS.MultiSelect._selected.some(sel => sel.contains(m))) {
                   DS.MultiSelect._selected = DS.MultiSelect._selected.filter(sel => !m.contains(sel));
                   DS.MultiSelect._selected.push(m);
                }
              }
            });
            DS.MultiSelect._render();
            if (!DS.MultiSelect._rafId) DS.MultiSelect._rafId = requestAnimationFrame(DS.MultiSelect._loop);
            this.show(this._currentEl);
            DS.Toast?.show(`Selected ${DS.MultiSelect._selected.length} elements`, 'success');
          } catch(e) { console.error(e); }
        });
      }

      // ── Content live preview ──────────────────────────
      const textContentInp = p.querySelector('#ds-ep-text-content');
      if (textContentInp) {
        textContentInp.addEventListener('input', (e) => {
          if (!this._currentEl) return;
          this._applyLiveContentPreview('innerText', e.target.value);
        });
        textContentInp.addEventListener('keydown', (e) => e.stopPropagation());
      }

      const imgSrcInp = p.querySelector('#ds-ep-img-src');
      if (imgSrcInp) {
        imgSrcInp.addEventListener('input', (e) => {
          if (!this._currentEl) return;
          this._applyLiveContentPreview('src', e.target.value);
        });
        imgSrcInp.addEventListener('keydown', (e) => e.stopPropagation());
      }

      // ── Dimensions live preview ─────────────────────
      p.querySelectorAll('.ds-ep__input[data-prop]').forEach(inp => {
        inp.addEventListener('input', () => this._previewDimensions());
        inp.addEventListener('click', (e) => e.stopPropagation());
      });

      p.querySelectorAll('.ds-ep__unit').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const prop = e.target.dataset.prop;
          const input = p.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
          if (e.target.value === 'auto') {
            input.value = '';
            input.disabled = true;
          } else {
            input.disabled = false;
          }
          this._previewDimensions();
        });
        sel.addEventListener('click', (e) => e.stopPropagation());
      });

      if (DS.BoxModel) {
        const bmContainer = p.querySelector('#ds-ep-box-model-container');
        if (bmContainer) DS.BoxModel.renderInto(bmContainer);
      }

      // Enter to apply
      p.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          this._applyDimensions();
        }
      });

      this._panel = p;
      this._shadowRoot.appendChild(p);
    },

    // ── Position ───────────────────────────────────────

    _position(el) {
      if (!el || !this._panel) return;
      const r = el.getBoundingClientRect();
      const pw = 300; // panel width
      const ph = this._panel.offsetHeight || 400; // estimated panel height

      // User request: "default to bottom left"
      // Position below the element, aligned to its left edge.
      let left = r.left;
      let top = r.bottom + 12;

      // Keep within horizontal bounds
      if (left + pw > window.innerWidth - 16) left = window.innerWidth - pw - 16;
      if (left < 16) left = 16;

      // Keep within vertical bounds (avoid bottom edge)
      if (top + ph > window.innerHeight - 16) {
        // If it goes off the bottom, flip it ABOVE the element
        top = r.top - ph - 12;
      }
      
      // Keep within top bounds (avoid Breadcrumb which is ~34px)
      if (top < 44) top = 44;

      this._panel.style.left = left + 'px';
      this._panel.style.top = top + 'px';
    },

    // ── Populate ───────────────────────────────────────

    _populate(el) {
      const tag = el.tagName.toLowerCase();
      let cls = '';
      if (typeof el.className === 'string' && el.className.trim()) {
        cls = '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.');
      }
      const rect = el.getBoundingClientRect();
      const comp = getComputedStyle(el);

      if (this._isBatchMode) {
        const count = DS.MultiSelect.getSelection().length;
        this._panel.querySelector('.ds-ep__tag').textContent = `${count} elements selected`;
        this._panel.querySelector('.ds-ep__dims').textContent = 'Batch Mode';
        
        const pathEl = this._panel.querySelector('.ds-ep__path');
        pathEl.textContent = 'Multi-Select';
        pathEl.title = '';
        
        this._panel.querySelector('#ds-ep-hide-label').textContent = 'Hide All';
        this._panel.querySelector('[data-action="delete"] span').textContent = 'Delete All';

        // Populate Selected Elements List
        const listSec = this._panel.querySelector('#ds-ep-selected-list-sec');
        const listHr = this._panel.querySelector('#ds-ep-list-hr');
        const listCont = this._panel.querySelector('#ds-ep-selected-list');
        listSec.style.display = 'block';
        listHr.style.display = 'block';
        listCont.innerHTML = '';

        DS.MultiSelect.getSelection().forEach((selEl, idx) => {
          const sTag = selEl.tagName.toLowerCase();
          let sCls = '';
          if (typeof selEl.className === 'string' && selEl.className.trim()) {
            sCls = '.' + selEl.className.trim().split(/\s+/).slice(0, 2).join('.');
          }
          
          const item = document.createElement('div');
          item.style.cssText = `
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(255,255,255,0.03); padding: 4px 8px; border-radius: 4px;
            font-size: 11px; border: 1px solid rgba(255,255,255,0.05);
          `;
          
          item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
              <span style="background: #6366F1; color: #fff; width: 14px; height: 14px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: bold; flex-shrink: 0;">${idx + 1}</span>
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #EDEDEF;">${sTag}${sCls}</span>
            </div>
            <button class="ds-ep-remove-btn" style="background: transparent; border: none; color: #8B8B96; cursor: pointer; padding: 2px; flex-shrink: 0;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          `;

          // Remove button logic
          item.querySelector('.ds-ep-remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            DS.MultiSelect.remove(selEl);
          });

          // Optional: highlight element on hover
          item.addEventListener('mouseenter', () => {
            DS.Selector?.flashHighlight(selEl);
          });

          listCont.appendChild(item);
        });

      } else {
        const listSec = this._panel.querySelector('#ds-ep-selected-list-sec');
        const listHr = this._panel.querySelector('#ds-ep-list-hr');
        if (listSec) listSec.style.display = 'none';
        if (listHr) listHr.style.display = 'none';
        this._panel.querySelector('.ds-ep__tag').textContent = tag + cls;
        this._panel.querySelector('.ds-ep__dims').textContent =
          Math.round(rect.width) + ' × ' + Math.round(rect.height);

        // Content Accordion Logic
        const contentAcc = this._panel.querySelector('#ds-ep-content-acc');
        const textRow = this._panel.querySelector('#ds-ep-text-row');
        const imgRow = this._panel.querySelector('#ds-ep-img-row');
        const textInp = this._panel.querySelector('#ds-ep-text-content');
        const imgInp = this._panel.querySelector('#ds-ep-img-src');
        
        let showContentAcc = false;
        if (tag === 'img' || tag === 'video' || tag === 'audio' || tag === 'iframe') {
          imgRow.style.display = 'flex';
          imgInp.value = el.getAttribute('src') || '';
          showContentAcc = true;
        } else {
          imgRow.style.display = 'none';
        }

        if (el.children.length === 0 || (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)) {
          // It's a leaf node containing only text (or empty)
          textRow.style.display = 'flex';
          textInp.value = el.innerText || '';
          showContentAcc = true;
        } else {
          textRow.style.display = 'none';
        }
        
        if (showContentAcc) {
          contentAcc.style.display = 'block';
        } else {
          contentAcc.style.display = 'none';
        }

        // Selector path
        const selector = DS.SelectorEngine.generate(el);
        const pathEl = this._panel.querySelector('.ds-ep__path');
        pathEl.textContent = selector;
        pathEl.title = selector;
        
        this._panel.querySelector('#ds-ep-hide-label').textContent = 'Hide';
        this._panel.querySelector('[data-action="delete"] span').textContent = 'Delete';
      }

      if (DS.BoxModel) {
        DS.BoxModel.populate(el);
      }

      this._originalStyles = {
        width: el.style.width || '',
        height: el.style.height || ''
      };

      // Dimensions
      this._fillInput('width', el.style.width, comp.width);
      this._fillInput('height', el.style.height, comp.height);

      // ── Populate Appearance ──────────────────────────
      const bgPicker  = this._panel.querySelector('.ds-ep__color[data-style="backgroundColor"]');
      const bgText    = this._panel.querySelector('.ds-ep__input--color-text[data-style="backgroundColor"]');
      const fgPicker  = this._panel.querySelector('.ds-ep__color[data-style="color"]');
      const fgText    = this._panel.querySelector('.ds-ep__input--color-text[data-style="color"]');
      const opSlider  = this._panel.querySelector('#ds-ep-opacity');
      const opVal     = this._panel.querySelector('#ds-ep-opacity-val');
      const blurSlider= this._panel.querySelector('#ds-ep-blur');
      const blurVal   = this._panel.querySelector('#ds-ep-blur-val');

      // Background
      const bgColor = comp.backgroundColor;
      const bgHex = this._colorToHex(bgColor);
      if (bgPicker) bgPicker.value = bgHex || '#000000';
      if (bgText)   bgText.value   = el.style.backgroundColor || bgHex || '';

      // Text color
      const fgColor = comp.color;
      const fgHex = this._colorToHex(fgColor);
      if (fgPicker) fgPicker.value = fgHex || '#000000';
      if (fgText)   fgText.value   = el.style.color || fgHex || '';

      // Opacity
      const currentOpacity = parseFloat(comp.opacity ?? '1');
      if (opSlider) { opSlider.value = Math.round(currentOpacity * 100); }
      if (opVal)    { opVal.textContent = Math.round(currentOpacity * 100) + '%'; }

      // Blur
      const filterVal = comp.filter || '';
      const blurMatch = filterVal.match(/blur\((\d+(?:\.\d+)?)px\)/);
      const blurPx = blurMatch ? parseFloat(blurMatch[1]) : 0;
      if (blurSlider) { blurSlider.value = Math.min(20, Math.round(blurPx)); }
      if (blurVal)    { blurVal.textContent = Math.round(blurPx) + 'px'; }

      // ── Populate Typography ──────────────────────────
      const fontSizeInp  = this._panel.querySelector('#ds-ep-font-size');
      const fontUnitSel  = this._panel.querySelector('#ds-ep-font-unit');
      const weightSlider = this._panel.querySelector('#ds-ep-weight');
      const weightVal    = this._panel.querySelector('#ds-ep-weight-val');
      const lineHeightInp= this._panel.querySelector('#ds-ep-line-height');

      // Font size
      const fsParsed = this._parseCSS(el.style.fontSize || comp.fontSize);
      if (fontSizeInp) fontSizeInp.value = fsParsed.num;
      if (fontUnitSel) {
        const unit = ['px','rem','em'].includes(fsParsed.unit) ? fsParsed.unit : 'px';
        fontUnitSel.value = unit;
      }

      // Font weight
      const fw = parseInt(comp.fontWeight) || 400;
      if (weightSlider) weightSlider.value = Math.round(fw / 100) * 100;
      if (weightVal)    weightVal.textContent = Math.round(fw / 100) * 100;

      // Line height
      const lh = parseFloat(comp.lineHeight) || '';
      if (lineHeightInp) lineHeightInp.value = lh ? parseFloat(lh.toFixed(2)) : '';

      // Text align
      const align = comp.textAlign || 'left';
      this._panel.querySelectorAll('.ds-ep__align-btn').forEach(btn => {
        btn.classList.toggle('ds-ep__align-btn--active', btn.dataset.align === align);
      });

      // ── Hide/Show toggle ──────────────────────────────
      const isHidden = getComputedStyle(el).display === 'none' || el.dataset.dsHidden === 'true';
      const hideBtn   = this._panel.querySelector('#ds-ep-hide-btn');
      const hideLabel = this._panel.querySelector('#ds-ep-hide-label');
      const hideIcon  = this._panel.querySelector('#ds-ep-hide-icon');
      if (hideBtn && hideLabel && hideIcon) {
        if (isHidden) {
          hideLabel.textContent = 'Show';
          hideIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
          hideBtn.style.background = 'rgba(99,102,241,0.12)';
          hideBtn.style.borderColor = 'rgba(99,102,241,0.3)';
          hideBtn.style.color = '#818CF8';
        } else {
          hideLabel.textContent = 'Hide';
          hideIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>';
          hideBtn.style.background = 'rgba(255,255,255,0.05)';
          hideBtn.style.borderColor = 'rgba(255,255,255,0.1)';
          hideBtn.style.color = '#fff';
        }
      }
      
      const applyBtn = this._panel.querySelector('[data-action="apply"]');
      if (applyBtn) {
        applyBtn.textContent = this._editChange ? 'Update' : 'Apply';
      }
      const scopeSel = this._panel.querySelector('#ds-ep-scope');
      if (scopeSel && this._editChange) {
        scopeSel.value = this._editChange.isGlobal ? 'domain' : 'page';
      }
    },

    _stageBoxModelChange(cssProp, val) {
      if (this._currentEl) {
        this._applyLivePreview(cssProp, val);
      }
    },

    _fillInput(prop, inlineVal, computedVal) {
      const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
      const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);

      if (inlineVal && inlineVal !== '') {
        const p = this._parseCSS(inlineVal);
        input.value = p.num;
        unit.value = p.unit;
        input.disabled = p.unit === 'auto';
      } else {
        input.value = Math.round(parseFloat(computedVal)) || '';
        unit.value = 'px';
        input.disabled = false;
      }
    },

    _parseCSS(val) {
      if (val === 'auto') return { num: '', unit: 'auto' };
      const m = val.match(/^([\d.]+)(px|%|vw|vh)?$/);
      return m ? { num: m[1], unit: m[2] || 'px' } : { num: '', unit: 'px' };
    },

    // ── Apply & Preview ───────────────────────────────

    _previewDimensions() {
      const elements = this._isBatchMode ? DS.MultiSelect.getSelection() : (this._currentEl ? [this._currentEl] : []);
      if (elements.length === 0) return;

      for (const prop of ['width', 'height']) {
        const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
        const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);
        const newVal = unit.value === 'auto' ? 'auto' : (input.value + unit.value);
        
        if (input.value !== '' || unit.value === 'auto') {
          elements.forEach(el => el.style[prop] = newVal);
        }
      }
      DS.Selector?.refreshSelection();
    },

    _revertPreview() {
      // Revert dimension preview
      if (this._currentEl && this._originalStyles) {
        for (const prop of ['width', 'height']) {
           const current = this._currentEl.style[prop] || '';
           const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
           const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);
           const valInUI = unit.value === 'auto' ? 'auto' : (input.value + unit.value);
           
           if (current === valInUI && valInUI !== this._originalStyles[prop]) {
              if (this._originalStyles[prop]) {
                 this._currentEl.style[prop] = this._originalStyles[prop];
              } else {
                 this._currentEl.style.removeProperty(prop);
              }
           }
        }
      }

      // Revert all staged (unsaved) style changes
      if (this._pendingStyles) {
        const elements = this._isBatchMode ? DS.MultiSelect.getSelection() : (this._currentEl ? [this._currentEl] : []);
        for (const [prop, record] of Object.entries(this._pendingStyles)) {
          elements.forEach(element => {
            if (record.original !== undefined && record.original !== '') {
              element.style[prop] = record.original;
            } else {
              element.style.removeProperty(prop);
            }
          });
        }
      }
      // Revert all staged (unsaved) content changes
      if (this._pendingContent && this._currentEl) {
        for (const [prop, record] of Object.entries(this._pendingContent)) {
          if (prop === 'innerText') {
            this._currentEl.innerText = record.original;
          } else {
            this._currentEl.setAttribute(prop, record.original);
          }
        }
      }
    },

    _handleReset() {
      if (!this._currentEl) return;
      this._revertPreview();
      this._pendingStyles = {};
      this._pendingContent = {};
      this._populate(this._currentEl);
    },

    async _applyDimensions() {
      const elements = this._isBatchMode ? DS.MultiSelect.getSelection() : (this._currentEl ? [this._currentEl] : []);
      if (elements.length === 0) return;

      const url = window.location.origin + window.location.pathname;
      const isGlobal = this._panel.querySelector('#ds-ep-scope').value === 'domain';
      let madeChange = false;
      const batchChanges = [];

      for (const element of elements) {
        const selector = DS.SelectorEngine.generate(element);
        
        // ── 1. Dimensions ─────────────────────────────────
        const changesMap = {};
        let elementMadeChange = false;

        for (const prop of ['width', 'height']) {
          const input = this._panel.querySelector(`.ds-ep__input[data-prop="${prop}"]`);
          const unit = this._panel.querySelector(`.ds-ep__unit[data-prop="${prop}"]`);

          const newVal = unit.value === 'auto' ? 'auto' : (input.value + unit.value);
          const oldVal = this._originalStyles[prop] || '';

          if (newVal !== oldVal && (input.value !== '' || unit.value === 'auto')) {
            changesMap[prop] = { original: oldVal, modified: newVal };
          }
        }

        for (const prop in changesMap) {
            const newVal = changesMap[prop].modified;
            this._setStyleProp(element, prop, newVal);
            elementMadeChange = true;
        }

        if (elementMadeChange) {
          const change = {
            id: _uid(),
            selector,
            type: 'resize',
            styles: changesMap,
            isGlobal,
            fingerprint: DS.Main._fingerprint(element),
            timestamp: Date.now()
          };

          const propsChanged = Object.keys(changesMap);
          if (propsChanged.length === 1) {
            change.property = propsChanged[0];
            change.original = changesMap[propsChanged[0]].original;
            change.modified = changesMap[propsChanged[0]].modified;
          } else {
            change.property = 'dimensions';
            change.modified = 'updated';
          }
          batchChanges.push(change);
        }

        // ── 2. Flush all pending (Appearance + Typography) styles ─
        const pendingEntries = Object.entries(this._pendingStyles);
        for (const [cssProp, record] of pendingEntries) {
          const styleChange = {
            id: _uid(),
            selector,
            type: 'style',
            property: cssProp,
            original: record.original,
            modified: record.current,
            isGlobal,
            fingerprint: DS.Main._fingerprint(element),
            timestamp: Date.now()
          };
          batchChanges.push(styleChange);
        }

        // ── 3. Flush all pending Content changes ─
        const pendingContentEntries = Object.entries(this._pendingContent);
        for (const [prop, record] of pendingContentEntries) {
          const contentChange = {
            id: _uid(),
            selector,
            type: 'content',
            property: prop,
            original: record.original,
            modified: record.current,
            isGlobal,
            fingerprint: DS.Main._fingerprint(element),
            timestamp: Date.now()
          };
          batchChanges.push(contentChange);
        }
      }

      if (batchChanges.length === 0 && this._editChange) {
        const isGlobal = this._panel.querySelector('#ds-ep-scope').value === 'domain';
        if (isGlobal !== !!this._editChange.isGlobal) {
          const updatedChange = { ...this._editChange, isGlobal };
          await DS.Storage.updateChange(url, updatedChange.id, updatedChange, this._editChange.isGlobal);
          DS.Toast?.show('Scope updated', 'success');
          DS.Main?._afterChange();
          DS.Selector?.refreshSelection();
        }
        this.hide();
        return;
      }

      if (batchChanges.length > 0) {
        let finalChange;
        
        if (this._editChange && !this._isBatchMode) {
          // Merge with existing change to prevent destroying unmodified properties
          let existingChanges = [];
          if (this._editChange.type === 'batch') {
            existingChanges = [...this._editChange.changes];
          } else {
            existingChanges = [this._editChange];
          }
          
          for (const newCh of batchChanges) {
            const existingIdx = existingChanges.findIndex(c => c.property === newCh.property && c.type === newCh.type);
            if (existingIdx >= 0) {
              existingChanges[existingIdx] = newCh;
            } else {
              existingChanges.push(newCh);
            }
          }
          
          if (existingChanges.length === 1) {
             finalChange = existingChanges[0];
             finalChange.isGlobal = isGlobal;
             finalChange.id = this._editChange.id;
          } else {
             finalChange = {
               id: this._editChange.id,
               type: 'batch',
               batchAction: 'Multiple Styles',
               changes: existingChanges,
               isGlobal,
               timestamp: Date.now()
             };
          }
          
          await DS.Storage.updateChange(url, finalChange.id, finalChange, this._editChange.isGlobal);
          madeChange = true;
          
        } else {
          // Original logic for new changes or batch mode
          if (this._isBatchMode) {
             finalChange = {
               id: _uid(),
               type: 'batch',
               batchAction: 'Style / Resize',
               changes: batchChanges,
               isGlobal,
               timestamp: Date.now()
             };
          } else {
             if (batchChanges.length === 1) {
               finalChange = batchChanges[0];
             } else {
               finalChange = {
                 id: _uid(),
                 type: 'batch',
                 batchAction: 'Multiple Styles',
                 changes: batchChanges,
                 isGlobal,
                 timestamp: Date.now()
               };
             }
          }
          
          if (this._editChange) {
            finalChange.id = this._editChange.id;
            await DS.Storage.updateChange(url, finalChange.id, finalChange, this._editChange.isGlobal);
          } else {
            await DS.Storage.saveChange(url, finalChange);
            await DS.History.push(url, finalChange);
          }
          madeChange = true;
        }
      }

      // Clear pending after save — they're now committed
      this._pendingStyles = {};
      this._pendingContent = {};
      this._editChange = null;

      if (madeChange) {
        DS.Toast?.show('Changes applied', 'success', {
          undoCallback: () => DS.Main?.undo()
        });
        DS.Main?._afterChange();
        DS.Selector?.refreshSelection();
        this._populate(this._currentEl);
      }
    },

    // ── Style utility ───────────────────────────────────

    /**
     * Stage a style change as a "live preview" — updates the DOM immediately
     * but does NOT save to storage. The original value is captured on first call
     * per property, so we can revert if the user closes without applying.
     */
    _stageStyle(cssProp, value) {
      if (!this._pendingStyles[cssProp]) {
        // Capture the true original before any preview changes
        this._pendingStyles[cssProp] = {
          original: this._currentEl ? (this._currentEl.style[cssProp] || '') : '',
          current: value
        };
        // But if the element already had this style set via storage replay,
        // the "original" we just captured IS the live value — that's correct.
      } else {
        this._pendingStyles[cssProp].current = value;
      }
    },

    /** Helper to set style with optional !important support */
    _setStyleProp(el, cssProp, value) {
      const valStr = String(value || '').trim();
      const kebabProp = cssProp.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (valStr.endsWith('!important')) {
        el.style.setProperty(kebabProp, valStr.replace('!important', '').trim(), 'important');
      } else {
        el.style.setProperty(kebabProp, valStr);
      }
    },

    /**
     * Applies a style change immediately to all selected elements for live preview,
     * and stages it in _pendingStyles for the final Apply.
     */
    _applyLivePreview(cssProp, value) {
      const elements = this._isBatchMode ? DS.MultiSelect.getSelection() : (this._currentEl ? [this._currentEl] : []);
      elements.forEach(el => this._setStyleProp(el, cssProp, value));
      this._stageStyle(cssProp, value);
    },

    /** Convert rgb/rgba computed color to hex string */
    _colorToHex(color) {
      if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return null;
      const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return null;
      return '#' + [m[1], m[2], m[3]].map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
    },

    /**
     * Applies a content change immediately for live preview,
     * and stages it in _pendingContent for the final Apply.
     */
    _applyLiveContentPreview(prop, value) {
      if (this._isBatchMode) return; // Content changes don't support batch editing currently
      if (!this._currentEl) return;

      if (!this._pendingContent[prop]) {
        this._pendingContent[prop] = {
          original: prop === 'innerText' ? this._currentEl.innerText : this._currentEl.getAttribute(prop),
          current: value
        };
      } else {
        this._pendingContent[prop].current = value;
      }

      if (prop === 'innerText') {
        this._currentEl.innerText = value;
      } else {
        this._currentEl.setAttribute(prop, value);
      }
    },

    /** Apply a single CSS style property, save to storage + history */
    async _applyStyle(cssProp, value) {
      if (!this._currentEl) return;
      const url = window.location.origin + window.location.pathname;
      const selector = DS.SelectorEngine.generate(this._currentEl);
      const isGlobal = this._panel.querySelector('#ds-ep-scope').value === 'domain';
      const original = this._currentEl.style[cssProp] || '';

      // Apply live (already done by input handler, but ensure it's set)
      this._setStyleProp(this._currentEl, cssProp, value);

      const change = {
        id: _uid(),
        selector,
        type: 'style',
        property: cssProp,
        original,
        modified: value,
        isGlobal,
        fingerprint: DS.Main._fingerprint(this._currentEl),
        timestamp: Date.now()
      };

      if (this._editChange) {
        change.id = this._editChange.id;
        await DS.Storage.updateChange(url, change.id, change, this._editChange.isGlobal);
      } else {
        await DS.Storage.saveChange(url, change);
        await DS.History.push(url, change);
      }

      DS.Toast?.show(`${cssProp} updated`, 'success', {
        undoCallback: () => DS.Main?.undo()
      });
      DS.Main?._afterChange();
    },

    // ── Delete ─────────────────────────────────────────

    async _handleDelete() {
      const elements = this._isBatchMode ? DS.MultiSelect.getSelection() : (this._currentEl ? [this._currentEl] : []);
      if (elements.length === 0) return;

      const btn = this._panel.querySelector('[data-action="delete"]');
      if (!this._deleteConfirm) {
        this._deleteConfirm = true;
        btn.classList.add('ds-ep__btn--confirm');
        btn.querySelector('span').textContent = 'Confirm?';
        
        this._deleteTimer = setTimeout(() => this._resetDelete(), 3000);
        return;
      }

      clearTimeout(this._deleteTimer);
      this.hide();

      const url = window.location.origin + window.location.pathname;
      const isGlobal = this._panel.querySelector('#ds-ep-scope').value === 'domain';
      const batchChanges = [];

      for (const el of elements) {
        const selector = DS.SelectorEngine.generate(el);
        const parent = el.parentElement;
        const parentSelector = parent ? DS.SelectorEngine.generate(parent) : null;
        const childIndex = parent ? Array.from(parent.children).indexOf(el) : 0;

        const change = {
          id: _uid(),
          selector,
          type: 'delete',
          outerHTML: el.outerHTML,
          parentSelector,
          childIndex,
          isGlobal,
          fingerprint: DS.Main._fingerprint(el),
          timestamp: Date.now()
        };
        batchChanges.push(change);
        el.remove();
      }

      let finalChange;
      if (this._isBatchMode) {
         finalChange = {
           id: _uid(),
           type: 'batch',
           batchAction: 'Delete',
           changes: batchChanges,
           isGlobal,
           timestamp: Date.now()
         };
      } else {
         finalChange = batchChanges[0];
      }

      if (this._editChange) {
         finalChange.id = this._editChange.id;
         await DS.Storage.updateChange(url, finalChange.id, finalChange, this._editChange.isGlobal);
      } else {
         await DS.Storage.saveChange(url, finalChange);
         await DS.Storage.getHistory(url, isGlobal).then(hist => {
            hist.undoStack.push(finalChange);
            hist.redoStack = [];
            DS.Storage.saveHistory(url, hist, isGlobal);
         });
      }

      DS.Selector?.deselect();
      DS.Toast?.show(`${elements.length > 1 ? elements.length + ' elements' : 'Element'} deleted`, 'danger', {
        undoCallback: () => DS.Main?.undo()
      });
      DS.Main?._afterChange();
    },

    async _handleHide() {
      const elements = this._isBatchMode ? DS.MultiSelect.getSelection() : (this._currentEl ? [this._currentEl] : []);
      if (elements.length === 0) return;

      const url = window.location.origin + window.location.pathname;
      const isGlobal = this._panel.querySelector('#ds-ep-scope').value === 'domain';
      const batchChanges = [];
      let isShowing = false;

      for (const el of elements) {
        const selector = DS.SelectorEngine.generate(el);
        const isHidden = el.dataset.dsHidden === 'true';
        
        if (isHidden) {
          isShowing = true;
          const originalDisplay = el.dataset.dsOriginalDisplay || '';
          el.style.display = originalDisplay;
          el.style.removeProperty('pointer-events');
          delete el.dataset.dsHidden;
          delete el.dataset.dsOriginalDisplay;

          batchChanges.push({
            id: _uid(),
            selector,
            type: 'show',
            original: 'none',
            modified: originalDisplay,
            isGlobal,
            fingerprint: DS.Main._fingerprint(el),
            timestamp: Date.now()
          });
        } else {
          const originalDisplay = el.style.display || '';
          el.dataset.dsHidden = 'true';
          el.dataset.dsOriginalDisplay = originalDisplay;
          el.style.display = 'none';

          batchChanges.push({
            id: _uid(),
            selector,
            type: 'hide',
            original: originalDisplay,
            modified: 'none',
            isGlobal,
            fingerprint: DS.Main._fingerprint(el),
            timestamp: Date.now()
          });
        }
      }

      let finalChange;
      if (this._isBatchMode) {
         finalChange = {
           id: _uid(),
           type: 'batch',
           batchAction: isShowing ? 'Show' : 'Hide',
           changes: batchChanges,
           isGlobal,
           timestamp: Date.now()
         };
      } else {
         finalChange = batchChanges[0];
      }

      if (this._editChange) {
         finalChange.id = this._editChange.id;
         await DS.Storage.updateChange(url, finalChange.id, finalChange, this._editChange.isGlobal);
      } else {
         await DS.Storage.saveChange(url, finalChange);
         await DS.History.push(url, finalChange);
      }

      DS.Toast?.show(`${elements.length > 1 ? elements.length + ' elements' : 'Element'} updated`, 'success', { undoCallback: () => DS.Main?.undo() });
      DS.Main?._afterChange();
      this.hide(); // close the panel
      DS.Selector?.deselect();
    },

    _resetDelete() {
      clearTimeout(this._deleteTimer);
      const btn = this._panel.querySelector('[data-action="delete"]');
      if (btn) {
        btn.classList.remove('ds-ep__btn--confirm');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Delete Element';
      }
    },

    // ── Drag ───────────────────────────────────────────

    _bindDrag() {
      const head = this._panel.querySelector('.ds-ep__head');

      head.addEventListener('mousedown', (e) => {
        if (e.target.closest('.ds-ep__close')) return;
        this._dragging = true;
        const rect = this._panel.getBoundingClientRect();
        this._dragOff.x = e.clientX - rect.left;
        this._dragOff.y = e.clientY - rect.top;
        this._panel.style.transition = 'none';
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!this._dragging) return;
        let x = e.clientX - this._dragOff.x;
        let y = e.clientY - this._dragOff.y;
        x = Math.max(0, Math.min(x, window.innerWidth - 280));
        y = Math.max(0, Math.min(y, window.innerHeight - 100));
        this._panel.style.left = x + 'px';
        this._panel.style.top = y + 'px';
      });

      document.addEventListener('mouseup', () => {
        if (this._dragging) {
          this._dragging = false;
          this._panel.style.transition = '';
        }
      });
    },

    // ── Styles ─────────────────────────────────────────

    getStyles() {
      return `
/* ── Editor Panel ─────────────────────────────────── */
.ds-ep {
  position: fixed;
  margin: 12px;
  width: 300px;
  z-index: 2147483647 !important;
  background: #0F0F12;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.55),
              0 0 0 1px rgba(255,255,255,0.03);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #EDEDEF;
  font-size: 13px;
  overflow: hidden;
  pointer-events: auto;
  max-height: calc(100vh - 80px);
  overflow-y: auto;

  /* Animation */
  opacity: 0;
  transform: scale(0.96) translateY(6px);
  transition: opacity 200ms cubic-bezier(0.34,1.56,0.64,1),
              transform 200ms cubic-bezier(0.34,1.56,0.64,1),
              display 200ms allow-discrete;
}
.ds-ep::-webkit-scrollbar { width: 4px; }
.ds-ep::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

.ds-ep:popover-open {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@starting-style {
  .ds-ep:popover-open {
    opacity: 0;
    transform: scale(0.96) translateY(6px);
  }
}

/* ── Header ──── */
.ds-ep__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px 6px;
  cursor: grab;
  user-select: none;
}
.ds-ep__head:active { cursor: grabbing; }

.ds-ep__title {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  overflow: hidden;
}
.ds-ep__tag {
  font-family: 'SF Mono','Cascadia Code','JetBrains Mono',monospace;
  font-size: 12px;
  font-weight: 600;
  color: #EDEDEF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ds-ep__dims {
  font-size: 11px;
  color: #5A5A65;
  font-weight: 400;
}

.ds-ep__close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #5A5A65;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 120ms, background 120ms;
}
.ds-ep__close:hover {
  color: #EDEDEF;
  background: rgba(255,255,255,0.06);
}

/* ── Selector path ── */
.ds-ep__path {
  padding: 2px 12px 8px;
  font-family: 'SF Mono',monospace;
  font-size: 10px;
  color: #5A5A65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

/* ── Body ──── */
.ds-ep__body { padding: 4px 12px 12px; }

/* ── Section ── */
.ds-ep__sec { padding: 6px 0; }
.ds-ep__sec-title {
  font-size: 11px;
  font-weight: 600;
  color: #8B8B96;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

/* ── Input Row ── */
.ds-ep__row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.ds-ep__lbl {
  width: 16px;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  color: #8B8B96;
  text-align: center;
}

.ds-ep__input {
  flex: 1;
  background: #18181D;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  color: #EDEDEF;
  font-family: inherit;
  font-size: 12px;
  padding: 6px 8px;
  outline: none;
  transition: border-color 120ms, box-shadow 120ms;
  -moz-appearance: textfield;
}
.ds-ep__input::-webkit-inner-spin-button,
.ds-ep__input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.ds-ep__input:focus {
  border-color: rgba(99,102,241,0.5);
  box-shadow: 0 0 0 2px rgba(99,102,241,0.12);
}
.ds-ep__input:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.ds-ep__unit {
  width: 54px;
  flex-shrink: 0;
  background: #18181D;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  color: #8B8B96;
  font-family: inherit;
  font-size: 11px;
  padding: 6px 4px;
  outline: none;
  cursor: pointer;
  transition: border-color 120ms;
  -webkit-appearance: none;
}
.ds-ep__unit:focus { border-color: rgba(99,102,241,0.5); }

/* ── Divider ── */
.ds-ep__hr {
  height: 1px;
  background: rgba(255,255,255,0.04);
  margin: 2px 0;
}

/* ── Buttons ── */
.ds-ep__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 120ms, transform 80ms;
  outline: none;
}
.ds-ep__btn:active { transform: scale(0.98); }

.ds-ep__btn--primary {
  background: #6366F1;
  color: #fff;
  margin-top: 4px;
}
.ds-ep__btn--primary:hover { background: #7577F5; }

.ds-ep__btn--danger {
  background: rgba(239,68,68,0.1);
  color: #EF4444;
  border: 1px solid rgba(239,68,68,0.15);
}
.ds-ep__btn--danger:hover {
  background: rgba(239,68,68,0.18);
}

.ds-ep__btn--confirm {
  background: #EF4444 !important;
  color: #fff !important;
  border-color: #EF4444 !important;
  animation: ds-shake 300ms ease;
}

@keyframes ds-shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-3px); }
  75%      { transform: translateX(3px); }
}

/* ── Accordion ── */
.ds-ep__accordion {
  padding: 2px 0;
}
.ds-ep__accordion-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 6px;
  cursor: pointer;
  user-select: none;
}
.ds-ep__accordion-head:hover .ds-ep__sec-title { color: #EDEDEF; }
.ds-ep__chevron {
  color: #5A5A65;
  flex-shrink: 0;
  transition: transform 180ms ease, color 120ms;
}
.ds-ep__accordion-head:hover .ds-ep__chevron { color: #8B8B96; }
.ds-ep__accordion-body {
  padding-bottom: 6px;
}

/* ── Color picker ── */
.ds-ep__color {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: none;
  padding: 2px;
  border-radius: 6px;
  background: #18181D;
  border: 1px solid rgba(255,255,255,0.07);
  cursor: pointer;
  overflow: hidden;
}
.ds-ep__color::-webkit-color-swatch-wrapper { padding: 0; }
.ds-ep__color::-webkit-color-swatch { border: none; border-radius: 4px; }

.ds-ep__input--color-text {
  font-family: 'SF Mono','Cascadia Code',monospace;
  font-size: 11px;
}

/* ── Slider ── */
.ds-ep__slider-row {
  margin-bottom: 8px;
}
.ds-ep__slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #8B8B96;
  margin-bottom: 4px;
}
.ds-ep__slider-val {
  font-family: 'SF Mono','Cascadia Code',monospace;
  color: #EDEDEF;
  font-size: 10px;
}
.ds-ep__slider {
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: #27272A;
  outline: none;
  cursor: pointer;
  accent-color: #6366F1;
}
.ds-ep__slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #6366F1;
  border: 2px solid #0F0F12;
  box-shadow: 0 0 0 1px rgba(99,102,241,0.4);
  cursor: pointer;
  transition: transform 120ms, box-shadow 120ms;
}
.ds-ep__slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.25);
}

/* ── Text Align ── */
.ds-ep__align-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-top: 6px;
}
.ds-ep__align-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  background: #18181D;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  color: #8B8B96;
  cursor: pointer;
  transition: all 120ms;
}
.ds-ep__align-btn:hover {
  background: rgba(255,255,255,0.06);
  color: #EDEDEF;
}
.ds-ep__align-btn--active {
  background: rgba(99,102,241,0.15) !important;
  border-color: rgba(99,102,241,0.35) !important;
  color: #818CF8 !important;
}
`;

    }
  };

  // ── Utility ──────────────────────────────────────────
  function _uid() {
    return 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
  }

  DS.EditorPanel = EditorPanel;
})();
