/**
 * DOM Surgeon — Box Model (Upgrade B)
 */
(function () {
  'use strict';
  const DS = (window.__DOMSurgeon = window.__DOMSurgeon || {});

  const BoxModel = {
    _container: null,
    _currentEl: null,

    init() {
      // Box model is injected into EditorPanel directly, we don't build a floating bar.
    },

    renderInto(container) {
      this._container = container;
      this._build();
    },

    populate(el) {
      this._currentEl = el;
      if (!this._container || !el) return;
      const comp = getComputedStyle(el);
      
      const parts = ['margin', 'border', 'padding'];
      const sides = ['Top', 'Right', 'Bottom', 'Left'];
      
      parts.forEach(part => {
        sides.forEach(side => {
          let val = comp[`${part}${side}`];
          if (part === 'border') {
            val = comp[`${part}${side}Width`];
          }
          const num = parseFloat(val) || 0;
          const input = this._container.querySelector(`.ds-bm__input[data-prop="${part}${side}"]`);
          if (input) input.value = Math.round(num) === 0 ? '-' : Math.round(num);
        });
      });
      
      const width = Math.round(parseFloat(comp.width));
      const height = Math.round(parseFloat(comp.height));
      const center = this._container.querySelector('.ds-bm__center');
      if (center) center.textContent = `${width} × ${height}`;
    },

    _build() {
      this._container.innerHTML = `
        <div class="ds-bm">
          <!-- Margin -->
          <div class="ds-bm__box ds-bm__margin">
            <span class="ds-bm__label">margin</span>
            <input type="text" class="ds-bm__input ds-bm__top" data-prop="marginTop">
            <input type="text" class="ds-bm__input ds-bm__bottom" data-prop="marginBottom">
            <input type="text" class="ds-bm__input ds-bm__left" data-prop="marginLeft">
            <input type="text" class="ds-bm__input ds-bm__right" data-prop="marginRight">
            
            <!-- Border -->
            <div class="ds-bm__box ds-bm__border">
              <span class="ds-bm__label">border</span>
              <input type="text" class="ds-bm__input ds-bm__top" data-prop="borderTop">
              <input type="text" class="ds-bm__input ds-bm__bottom" data-prop="borderBottom">
              <input type="text" class="ds-bm__input ds-bm__left" data-prop="borderLeft">
              <input type="text" class="ds-bm__input ds-bm__right" data-prop="borderRight">

              <!-- Padding -->
              <div class="ds-bm__box ds-bm__padding">
                <span class="ds-bm__label">padding</span>
                <input type="text" class="ds-bm__input ds-bm__top" data-prop="paddingTop">
                <input type="text" class="ds-bm__input ds-bm__bottom" data-prop="paddingBottom">
                <input type="text" class="ds-bm__input ds-bm__left" data-prop="paddingLeft">
                <input type="text" class="ds-bm__input ds-bm__right" data-prop="paddingRight">

                <!-- Content -->
                <div class="ds-bm__box ds-bm__content">
                  <span class="ds-bm__center">0 × 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      this._container.querySelectorAll('.ds-bm__input').forEach(inp => {
        inp.addEventListener('input', (e) => this._onInput(e.target));
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            let val = parseInt(e.target.value) || 0;
            val += (e.key === 'ArrowUp' ? 1 : -1);
            e.target.value = val;
            this._onInput(e.target);
          }
        });
      });
    },

    _onInput(input) {
      if (!this._currentEl) return;
      let val = input.value;
      if (val === '' || val === '-') val = '0';
      const prop = input.dataset.prop;
      
      let cssProp = prop;
      if (prop.startsWith('border')) cssProp = prop + 'Width';

      const newVal = parseInt(val) + 'px';
      
      // Live preview
      this._currentEl.style[cssProp] = newVal;
      DS.Selector?.refreshSelection();
      
      // Notify editor panel to stage it
      if (DS.EditorPanel && DS.EditorPanel._stageBoxModelChange) {
        DS.EditorPanel._stageBoxModelChange(cssProp, newVal);
      }
    },

    getStyles() {
      return `
        .ds-bm {
          font-size: 10px;
          color: #8B8B96;
          user-select: none;
          text-align: center;
          margin-bottom: 12px;
        }
        .ds-bm__box {
          position: relative;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
        }
        .ds-bm__label {
          position: absolute;
          top: 2px;
          left: 4px;
          font-size: 9px;
          text-transform: uppercase;
        }
        .ds-bm__input {
          position: absolute;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 10px;
          text-align: center;
          width: 30px;
          outline: none;
        }
        .ds-bm__input:hover, .ds-bm__input:focus {
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }
        .ds-bm__top { top: 2px; left: 50%; transform: translateX(-50%); }
        .ds-bm__bottom { bottom: 2px; left: 50%; transform: translateX(-50%); }
        .ds-bm__left { left: 2px; top: 50%; transform: translateY(-50%); }
        .ds-bm__right { right: 2px; top: 50%; transform: translateY(-50%); }

        .ds-bm__margin { padding: 20px 24px; background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.3); color: #F59E0B; }
        .ds-bm__margin .ds-bm__input { color: #FCD34D; }

        .ds-bm__border { padding: 20px 24px; background: rgba(250, 204, 21, 0.1); border-color: rgba(250, 204, 21, 0.3); color: #FACC15; }
        .ds-bm__border .ds-bm__input { color: #FEF08A; }

        .ds-bm__padding { padding: 20px 24px; background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #10B981; }
        .ds-bm__padding .ds-bm__input { color: #6EE7B7; }

        .ds-bm__content { padding: 12px; background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3); display: flex; align-items: center; justify-content: center; min-height: 24px; color: #93C5FD; }
      `;
    }
  };

  DS.BoxModel = BoxModel;
})();
