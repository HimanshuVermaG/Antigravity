var e, t;
("function" == typeof (e = globalThis.define) && ((t = e), (e = null)),
  (function (t, n, r, a, l) {
    var i =
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
              ? window
              : "undefined" != typeof global
                ? global
                : {},
      o = "function" == typeof i[a] && i[a],
      s = o.cache || {},
      u =
        "undefined" != typeof module &&
        "function" == typeof module.require &&
        module.require.bind(module);
    function c(e, n) {
      if (!s[e]) {
        if (!t[e]) {
          var r = "function" == typeof i[a] && i[a];
          if (!n && r) return r(e, !0);
          if (o) return o(e, !0);
          if (u && "string" == typeof e) return u(e);
          var l = Error("Cannot find module '" + e + "'");
          throw ((l.code = "MODULE_NOT_FOUND"), l);
        }
        ((f.resolve = function (n) {
          var r = t[e][1][n];
          return null != r ? r : n;
        }),
          (f.cache = {}));
        var d = (s[e] = new c.Module(e));
        t[e][0].call(d.exports, f, d, d.exports, this);
      }
      return s[e].exports;
      function f(e) {
        var t = f.resolve(e);
        return !1 === t ? {} : c(t);
      }
    }
    ((c.isParcelRequire = !0),
      (c.Module = function (e) {
        ((this.id = e), (this.bundle = c), (this.exports = {}));
      }),
      (c.modules = t),
      (c.cache = s),
      (c.parent = o),
      (c.register = function (e, n) {
        t[e] = [
          function (e, t) {
            t.exports = n;
          },
          {},
        ];
      }),
      Object.defineProperty(c, "root", {
        get: function () {
          return i[a];
        },
      }),
      (i[a] = c));
    for (var d = 0; d < n.length; d++) c(n[d]);
    if (r) {
      var f = c(r);
      "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = f)
        : "function" == typeof e && e.amd
          ? e(function () {
              return f;
            })
          : l && (this[l] = f);
    }
  })(
    {
      "54Vnj": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js"),
            a = e("react/jsx-runtime"),
            l = e("react");
          r.interopDefault(l);
          var i = e("react-dom/client"),
            o = e("@plasmo-static-common/csui"),
            s = e("@plasmo-static-common/csui-container-react"),
            u = e("@plasmo-static-common/react"),
            c = e("~content");
          let d = (0, o.createAnchorObserver)(c),
            f = (0, o.createRender)(
              c,
              [s.InlineCSUIContainer, s.OverlayCSUIContainer],
              d?.mountState,
              async (e, t) => {
                let n = (0, i.createRoot)(t);
                e.root = n;
                let r = (0, u.getLayout)(c);
                switch (e.type) {
                  case "inline":
                    n.render(
                      (0, a.jsx)(r, {
                        children: (0, a.jsx)(s.InlineCSUIContainer, {
                          anchor: e,
                          children: (0, a.jsx)(c.default, { anchor: e }),
                        }),
                      }),
                    );
                    break;
                  case "overlay": {
                    let t = d?.mountState.overlayTargetList || [e.element];
                    n.render(
                      (0, a.jsx)(r, {
                        children: t.map((e, t) => {
                          let n = `plasmo-overlay-${t}`,
                            r = { element: e, type: "overlay" };
                          return (0, a.jsx)(
                            s.OverlayCSUIContainer,
                            {
                              id: n,
                              anchor: r,
                              watchOverlayAnchor: c.watchOverlayAnchor,
                              children: (0, a.jsx)(c.default, { anchor: r }),
                            },
                            n,
                          );
                        }),
                      }),
                    );
                  }
                }
              },
            );
          (d
            ? d.start(f)
            : f({ element: document.documentElement, type: "overlay" }),
            "function" == typeof c.watch &&
              c.watch({ observer: d, render: f }));
        },
        {
          "react/jsx-runtime": "8iOxN",
          react: "329PG",
          "react-dom/client": "blMEL",
          "@plasmo-static-common/csui": "gcN4J",
          "@plasmo-static-common/csui-container-react": "e8dRS",
          "@plasmo-static-common/react": "4kz0G",
          "~content": "llHpa",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      "8iOxN": [
        function (e, t, n) {
          t.exports = e("ba80e5a03a461355");
        },
        { ba80e5a03a461355: "hIfNu" },
      ],
      hIfNu: [
        function (e, t, n) {
          var r = e("61e3cf0e9433c992"),
            a = Symbol.for("react.element"),
            l = Symbol.for("react.fragment"),
            i = Object.prototype.hasOwnProperty,
            o =
              r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
                .ReactCurrentOwner,
            s = { key: !0, ref: !0, __self: !0, __source: !0 };
          function u(e, t, n) {
            var r,
              l = {},
              u = null,
              c = null;
            for (r in (void 0 !== n && (u = "" + n),
            void 0 !== t.key && (u = "" + t.key),
            void 0 !== t.ref && (c = t.ref),
            t))
              i.call(t, r) && !s.hasOwnProperty(r) && (l[r] = t[r]);
            if (e && e.defaultProps)
              for (r in (t = e.defaultProps)) void 0 === l[r] && (l[r] = t[r]);
            return {
              $$typeof: a,
              type: e,
              key: u,
              ref: c,
              props: l,
              _owner: o.current,
            };
          }
          ((n.Fragment = l), (n.jsx = u), (n.jsxs = u));
        },
        { "61e3cf0e9433c992": "329PG" },
      ],
      "329PG": [
        function (e, t, n) {
          t.exports = e("ae0ab14aecd941d7");
        },
        { ae0ab14aecd941d7: "5ejwk" },
      ],
      "5ejwk": [
        function (e, t, n) {
          var r = Symbol.for("react.element"),
            a = Symbol.for("react.portal"),
            l = Symbol.for("react.fragment"),
            i = Symbol.for("react.strict_mode"),
            o = Symbol.for("react.profiler"),
            s = Symbol.for("react.provider"),
            u = Symbol.for("react.context"),
            c = Symbol.for("react.forward_ref"),
            d = Symbol.for("react.suspense"),
            f = Symbol.for("react.memo"),
            p = Symbol.for("react.lazy"),
            m = Symbol.iterator,
            h = {
              isMounted: function () {
                return !1;
              },
              enqueueForceUpdate: function () {},
              enqueueReplaceState: function () {},
              enqueueSetState: function () {},
            },
            g = Object.assign,
            y = {};
          function v(e, t, n) {
            ((this.props = e),
              (this.context = t),
              (this.refs = y),
              (this.updater = n || h));
          }
          function w() {}
          function b(e, t, n) {
            ((this.props = e),
              (this.context = t),
              (this.refs = y),
              (this.updater = n || h));
          }
          ((v.prototype.isReactComponent = {}),
            (v.prototype.setState = function (e, t) {
              if ("object" != typeof e && "function" != typeof e && null != e)
                throw Error(
                  "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
                );
              this.updater.enqueueSetState(this, e, t, "setState");
            }),
            (v.prototype.forceUpdate = function (e) {
              this.updater.enqueueForceUpdate(this, e, "forceUpdate");
            }),
            (w.prototype = v.prototype));
          var S = (b.prototype = new w());
          ((S.constructor = b),
            g(S, v.prototype),
            (S.isPureReactComponent = !0));
          var k = Array.isArray,
            _ = Object.prototype.hasOwnProperty,
            x = { current: null },
            C = { key: !0, ref: !0, __self: !0, __source: !0 };
          function E(e, t, n) {
            var a,
              l = {},
              i = null,
              o = null;
            if (null != t)
              for (a in (void 0 !== t.ref && (o = t.ref),
              void 0 !== t.key && (i = "" + t.key),
              t))
                _.call(t, a) && !C.hasOwnProperty(a) && (l[a] = t[a]);
            var s = arguments.length - 2;
            if (1 === s) l.children = n;
            else if (1 < s) {
              for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
              l.children = u;
            }
            if (e && e.defaultProps)
              for (a in (s = e.defaultProps)) void 0 === l[a] && (l[a] = s[a]);
            return {
              $$typeof: r,
              type: e,
              key: i,
              ref: o,
              props: l,
              _owner: x.current,
            };
          }
          function P(e) {
            return "object" == typeof e && null !== e && e.$$typeof === r;
          }
          var I = /\/+/g;
          function T(e, t) {
            var n, r;
            return "object" == typeof e && null !== e && null != e.key
              ? ((n = "" + e.key),
                (r = { "=": "=0", ":": "=2" }),
                "$" +
                  n.replace(/[=:]/g, function (e) {
                    return r[e];
                  }))
              : t.toString(36);
          }
          function N(e, t, n) {
            if (null == e) return e;
            var l = [],
              i = 0;
            return (
              (function e(t, n, l, i, o) {
                var s,
                  u,
                  c,
                  d = typeof t;
                ("undefined" === d || "boolean" === d) && (t = null);
                var f = !1;
                if (null === t) f = !0;
                else
                  switch (d) {
                    case "string":
                    case "number":
                      f = !0;
                      break;
                    case "object":
                      switch (t.$$typeof) {
                        case r:
                        case a:
                          f = !0;
                      }
                  }
                if (f)
                  return (
                    (o = o((f = t))),
                    (t = "" === i ? "." + T(f, 0) : i),
                    k(o)
                      ? ((l = ""),
                        null != t && (l = t.replace(I, "$&/") + "/"),
                        e(o, n, l, "", function (e) {
                          return e;
                        }))
                      : null != o &&
                        (P(o) &&
                          ((s = o),
                          (u =
                            l +
                            (!o.key || (f && f.key === o.key)
                              ? ""
                              : ("" + o.key).replace(I, "$&/") + "/") +
                            t),
                          (o = {
                            $$typeof: r,
                            type: s.type,
                            key: u,
                            ref: s.ref,
                            props: s.props,
                            _owner: s._owner,
                          })),
                        n.push(o)),
                    1
                  );
                if (((f = 0), (i = "" === i ? "." : i + ":"), k(t)))
                  for (var p = 0; p < t.length; p++) {
                    var h = i + T((d = t[p]), p);
                    f += e(d, n, l, h, o);
                  }
                else if (
                  "function" ==
                  typeof (h =
                    null === (c = t) || "object" != typeof c
                      ? null
                      : "function" ==
                          typeof (c = (m && c[m]) || c["@@iterator"])
                        ? c
                        : null)
                )
                  for (t = h.call(t), p = 0; !(d = t.next()).done;)
                    ((h = i + T((d = d.value), p++)), (f += e(d, n, l, h, o)));
                else if ("object" === d)
                  throw Error(
                    "Objects are not valid as a React child (found: " +
                      ("[object Object]" === (n = String(t))
                        ? "object with keys {" + Object.keys(t).join(", ") + "}"
                        : n) +
                      "). If you meant to render a collection of children, use an array instead.",
                  );
                return f;
              })(e, l, "", "", function (e) {
                return t.call(n, e, i++);
              }),
              l
            );
          }
          function A(e) {
            if (-1 === e._status) {
              var t = e._result;
              ((t = t()).then(
                function (t) {
                  (0 === e._status || -1 === e._status) &&
                    ((e._status = 1), (e._result = t));
                },
                function (t) {
                  (0 === e._status || -1 === e._status) &&
                    ((e._status = 2), (e._result = t));
                },
              ),
                -1 === e._status && ((e._status = 0), (e._result = t)));
            }
            if (1 === e._status) return e._result.default;
            throw e._result;
          }
          var L = { current: null },
            R = { transition: null };
          ((n.Children = {
            map: N,
            forEach: function (e, t, n) {
              N(
                e,
                function () {
                  t.apply(this, arguments);
                },
                n,
              );
            },
            count: function (e) {
              var t = 0;
              return (
                N(e, function () {
                  t++;
                }),
                t
              );
            },
            toArray: function (e) {
              return (
                N(e, function (e) {
                  return e;
                }) || []
              );
            },
            only: function (e) {
              if (!P(e))
                throw Error(
                  "React.Children.only expected to receive a single React element child.",
                );
              return e;
            },
          }),
            (n.Component = v),
            (n.Fragment = l),
            (n.Profiler = o),
            (n.PureComponent = b),
            (n.StrictMode = i),
            (n.Suspense = d),
            (n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
              ReactCurrentDispatcher: L,
              ReactCurrentBatchConfig: R,
              ReactCurrentOwner: x,
            }),
            (n.cloneElement = function (e, t, n) {
              if (null == e)
                throw Error(
                  "React.cloneElement(...): The argument must be a React element, but you passed " +
                    e +
                    ".",
                );
              var a = g({}, e.props),
                l = e.key,
                i = e.ref,
                o = e._owner;
              if (null != t) {
                if (
                  (void 0 !== t.ref && ((i = t.ref), (o = x.current)),
                  void 0 !== t.key && (l = "" + t.key),
                  e.type && e.type.defaultProps)
                )
                  var s = e.type.defaultProps;
                for (u in t)
                  _.call(t, u) &&
                    !C.hasOwnProperty(u) &&
                    (a[u] = void 0 === t[u] && void 0 !== s ? s[u] : t[u]);
              }
              var u = arguments.length - 2;
              if (1 === u) a.children = n;
              else if (1 < u) {
                s = Array(u);
                for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
                a.children = s;
              }
              return {
                $$typeof: r,
                type: e.type,
                key: l,
                ref: i,
                props: a,
                _owner: o,
              };
            }),
            (n.createContext = function (e) {
              return (
                ((e = {
                  $$typeof: u,
                  _currentValue: e,
                  _currentValue2: e,
                  _threadCount: 0,
                  Provider: null,
                  Consumer: null,
                  _defaultValue: null,
                  _globalName: null,
                }).Provider = { $$typeof: s, _context: e }),
                (e.Consumer = e)
              );
            }),
            (n.createElement = E),
            (n.createFactory = function (e) {
              var t = E.bind(null, e);
              return ((t.type = e), t);
            }),
            (n.createRef = function () {
              return { current: null };
            }),
            (n.forwardRef = function (e) {
              return { $$typeof: c, render: e };
            }),
            (n.isValidElement = P),
            (n.lazy = function (e) {
              return {
                $$typeof: p,
                _payload: { _status: -1, _result: e },
                _init: A,
              };
            }),
            (n.memo = function (e, t) {
              return { $$typeof: f, type: e, compare: void 0 === t ? null : t };
            }),
            (n.startTransition = function (e) {
              var t = R.transition;
              R.transition = {};
              try {
                e();
              } finally {
                R.transition = t;
              }
            }),
            (n.unstable_act = function () {
              throw Error(
                "act(...) is not supported in production builds of React.",
              );
            }),
            (n.useCallback = function (e, t) {
              return L.current.useCallback(e, t);
            }),
            (n.useContext = function (e) {
              return L.current.useContext(e);
            }),
            (n.useDebugValue = function () {}),
            (n.useDeferredValue = function (e) {
              return L.current.useDeferredValue(e);
            }),
            (n.useEffect = function (e, t) {
              return L.current.useEffect(e, t);
            }),
            (n.useId = function () {
              return L.current.useId();
            }),
            (n.useImperativeHandle = function (e, t, n) {
              return L.current.useImperativeHandle(e, t, n);
            }),
            (n.useInsertionEffect = function (e, t) {
              return L.current.useInsertionEffect(e, t);
            }),
            (n.useLayoutEffect = function (e, t) {
              return L.current.useLayoutEffect(e, t);
            }),
            (n.useMemo = function (e, t) {
              return L.current.useMemo(e, t);
            }),
            (n.useReducer = function (e, t, n) {
              return L.current.useReducer(e, t, n);
            }),
            (n.useRef = function (e) {
              return L.current.useRef(e);
            }),
            (n.useState = function (e) {
              return L.current.useState(e);
            }),
            (n.useSyncExternalStore = function (e, t, n) {
              return L.current.useSyncExternalStore(e, t, n);
            }),
            (n.useTransition = function () {
              return L.current.useTransition();
            }),
            (n.version = "18.2.0"));
        },
        {},
      ],
      blMEL: [
        function (e, t, n) {
          var r = e("87ad33dd8ef612b1");
          ((n.createRoot = r.createRoot), (n.hydrateRoot = r.hydrateRoot));
        },
        { "87ad33dd8ef612b1": "f20Gy" },
      ],
      f20Gy: [
        function (e, t, n) {
          ((function e() {
            if (
              "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
              "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
            )
              try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
              } catch (e) {
                console.error(e);
              }
          })(),
            (t.exports = e("6a4f0a32037af21")));
        },
        { "6a4f0a32037af21": "glUXj" },
      ],
      glUXj: [
        function (e, t, n) {
          var r,
            a,
            l,
            i,
            o,
            s,
            u = e("c293e9ed31165f07"),
            c = e("fabf034282b0d218");
          function d(e) {
            for (
              var t =
                  "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
                n = 1;
              n < arguments.length;
              n++
            )
              t += "&args[]=" + encodeURIComponent(arguments[n]);
            return (
              "Minified React error #" +
              e +
              "; visit " +
              t +
              " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
            );
          }
          var f = new Set(),
            p = {};
          function m(e, t) {
            (h(e, t), h(e + "Capture", t));
          }
          function h(e, t) {
            for (p[e] = t, e = 0; e < t.length; e++) f.add(t[e]);
          }
          var g = !(
              "undefined" == typeof window ||
              void 0 === window.document ||
              void 0 === window.document.createElement
            ),
            y = Object.prototype.hasOwnProperty,
            v =
              /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
            w = {},
            b = {};
          function S(e, t, n, r, a, l, i) {
            ((this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
              (this.attributeName = r),
              (this.attributeNamespace = a),
              (this.mustUseProperty = n),
              (this.propertyName = e),
              (this.type = t),
              (this.sanitizeURL = l),
              (this.removeEmptyString = i));
          }
          var k = {};
          ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
            .split(" ")
            .forEach(function (e) {
              k[e] = new S(e, 0, !1, e, null, !1, !1);
            }),
            [
              ["acceptCharset", "accept-charset"],
              ["className", "class"],
              ["htmlFor", "for"],
              ["httpEquiv", "http-equiv"],
            ].forEach(function (e) {
              var t = e[0];
              k[t] = new S(t, 1, !1, e[1], null, !1, !1);
            }),
            ["contentEditable", "draggable", "spellCheck", "value"].forEach(
              function (e) {
                k[e] = new S(e, 2, !1, e.toLowerCase(), null, !1, !1);
              },
            ),
            [
              "autoReverse",
              "externalResourcesRequired",
              "focusable",
              "preserveAlpha",
            ].forEach(function (e) {
              k[e] = new S(e, 2, !1, e, null, !1, !1);
            }),
            "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
              .split(" ")
              .forEach(function (e) {
                k[e] = new S(e, 3, !1, e.toLowerCase(), null, !1, !1);
              }),
            ["checked", "multiple", "muted", "selected"].forEach(function (e) {
              k[e] = new S(e, 3, !0, e, null, !1, !1);
            }),
            ["capture", "download"].forEach(function (e) {
              k[e] = new S(e, 4, !1, e, null, !1, !1);
            }),
            ["cols", "rows", "size", "span"].forEach(function (e) {
              k[e] = new S(e, 6, !1, e, null, !1, !1);
            }),
            ["rowSpan", "start"].forEach(function (e) {
              k[e] = new S(e, 5, !1, e.toLowerCase(), null, !1, !1);
            }));
          var _ = /[\-:]([a-z])/g;
          function x(e) {
            return e[1].toUpperCase();
          }
          function C(e, t, n, r) {
            var a,
              l = k.hasOwnProperty(t) ? k[t] : null;
            (null !== l
              ? 0 !== l.type
              : r ||
                !(2 < t.length) ||
                ("o" !== t[0] && "O" !== t[0]) ||
                ("n" !== t[1] && "N" !== t[1])) &&
              ((function (e, t, n, r) {
                if (
                  null == t ||
                  (function (e, t, n, r) {
                    if (null !== n && 0 === n.type) return !1;
                    switch (typeof t) {
                      case "function":
                      case "symbol":
                        return !0;
                      case "boolean":
                        if (r) return !1;
                        if (null !== n) return !n.acceptsBooleans;
                        return (
                          "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                          "aria-" !== e
                        );
                      default:
                        return !1;
                    }
                  })(e, t, n, r)
                )
                  return !0;
                if (r) return !1;
                if (null !== n)
                  switch (n.type) {
                    case 3:
                      return !t;
                    case 4:
                      return !1 === t;
                    case 5:
                      return isNaN(t);
                    case 6:
                      return isNaN(t) || 1 > t;
                  }
                return !1;
              })(t, n, l, r) && (n = null),
              r || null === l
                ? ((a = t),
                  (!!y.call(b, a) ||
                    (!y.call(w, a) &&
                      (v.test(a) ? (b[a] = !0) : ((w[a] = !0), !1)))) &&
                    (null === n
                      ? e.removeAttribute(t)
                      : e.setAttribute(t, "" + n)))
                : l.mustUseProperty
                  ? (e[l.propertyName] = null === n ? 3 !== l.type && "" : n)
                  : ((t = l.attributeName),
                    (r = l.attributeNamespace),
                    null === n
                      ? e.removeAttribute(t)
                      : ((n =
                          3 === (l = l.type) || (4 === l && !0 === n)
                            ? ""
                            : "" + n),
                        r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
          }
          ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
            .split(" ")
            .forEach(function (e) {
              var t = e.replace(_, x);
              k[t] = new S(t, 1, !1, e, null, !1, !1);
            }),
            "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
              .split(" ")
              .forEach(function (e) {
                var t = e.replace(_, x);
                k[t] = new S(
                  t,
                  1,
                  !1,
                  e,
                  "http://www.w3.org/1999/xlink",
                  !1,
                  !1,
                );
              }),
            ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
              var t = e.replace(_, x);
              k[t] = new S(
                t,
                1,
                !1,
                e,
                "http://www.w3.org/XML/1998/namespace",
                !1,
                !1,
              );
            }),
            ["tabIndex", "crossOrigin"].forEach(function (e) {
              k[e] = new S(e, 1, !1, e.toLowerCase(), null, !1, !1);
            }),
            (k.xlinkHref = new S(
              "xlinkHref",
              1,
              !1,
              "xlink:href",
              "http://www.w3.org/1999/xlink",
              !0,
              !1,
            )),
            ["src", "href", "action", "formAction"].forEach(function (e) {
              k[e] = new S(e, 1, !1, e.toLowerCase(), null, !0, !0);
            }));
          var E = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
            P = Symbol.for("react.element"),
            I = Symbol.for("react.portal"),
            T = Symbol.for("react.fragment"),
            N = Symbol.for("react.strict_mode"),
            A = Symbol.for("react.profiler"),
            L = Symbol.for("react.provider"),
            R = Symbol.for("react.context"),
            M = Symbol.for("react.forward_ref"),
            O = Symbol.for("react.suspense"),
            z = Symbol.for("react.suspense_list"),
            j = Symbol.for("react.memo"),
            $ = Symbol.for("react.lazy");
          (Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode"));
          var U = Symbol.for("react.offscreen");
          (Symbol.for("react.legacy_hidden"),
            Symbol.for("react.cache"),
            Symbol.for("react.tracing_marker"));
          var D = Symbol.iterator;
          function F(e) {
            return null === e || "object" != typeof e
              ? null
              : "function" == typeof (e = (D && e[D]) || e["@@iterator"])
                ? e
                : null;
          }
          var G,
            H = Object.assign;
          function B(e) {
            if (void 0 === G)
              try {
                throw Error();
              } catch (e) {
                var t = e.stack.trim().match(/\n( *(at )?)/);
                G = (t && t[1]) || "";
              }
            return "\n" + G + e;
          }
          var W = !1;
          function V(e, t) {
            if (!e || W) return "";
            W = !0;
            var n = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            try {
              if (t) {
                if (
                  ((t = function () {
                    throw Error();
                  }),
                  Object.defineProperty(t.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  "object" == typeof Reflect && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(t, []);
                  } catch (e) {
                    var r = e;
                  }
                  Reflect.construct(e, [], t);
                } else {
                  try {
                    t.call();
                  } catch (e) {
                    r = e;
                  }
                  e.call(t.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (e) {
                  r = e;
                }
                e();
              }
            } catch (t) {
              if (t && r && "string" == typeof t.stack) {
                for (
                  var a = t.stack.split("\n"),
                    l = r.stack.split("\n"),
                    i = a.length - 1,
                    o = l.length - 1;
                  1 <= i && 0 <= o && a[i] !== l[o];
                )
                  o--;
                for (; 1 <= i && 0 <= o; i--, o--)
                  if (a[i] !== l[o]) {
                    if (1 !== i || 1 !== o)
                      do
                        if ((i--, 0 > --o || a[i] !== l[o])) {
                          var s = "\n" + a[i].replace(" at new ", " at ");
                          return (
                            e.displayName &&
                              s.includes("<anonymous>") &&
                              (s = s.replace("<anonymous>", e.displayName)),
                            s
                          );
                        }
                      while (1 <= i && 0 <= o);
                    break;
                  }
              }
            } finally {
              ((W = !1), (Error.prepareStackTrace = n));
            }
            return (e = e ? e.displayName || e.name : "") ? B(e) : "";
          }
          function q(e) {
            switch (typeof e) {
              case "boolean":
              case "number":
              case "string":
              case "undefined":
              case "object":
                return e;
              default:
                return "";
            }
          }
          function Q(e) {
            var t = e.type;
            return (
              (e = e.nodeName) &&
              "input" === e.toLowerCase() &&
              ("checkbox" === t || "radio" === t)
            );
          }
          function X(e) {
            e._valueTracker ||
              (e._valueTracker = (function (e) {
                var t = Q(e) ? "checked" : "value",
                  n = Object.getOwnPropertyDescriptor(
                    e.constructor.prototype,
                    t,
                  ),
                  r = "" + e[t];
                if (
                  !e.hasOwnProperty(t) &&
                  void 0 !== n &&
                  "function" == typeof n.get &&
                  "function" == typeof n.set
                ) {
                  var a = n.get,
                    l = n.set;
                  return (
                    Object.defineProperty(e, t, {
                      configurable: !0,
                      get: function () {
                        return a.call(this);
                      },
                      set: function (e) {
                        ((r = "" + e), l.call(this, e));
                      },
                    }),
                    Object.defineProperty(e, t, { enumerable: n.enumerable }),
                    {
                      getValue: function () {
                        return r;
                      },
                      setValue: function (e) {
                        r = "" + e;
                      },
                      stopTracking: function () {
                        ((e._valueTracker = null), delete e[t]);
                      },
                    }
                  );
                }
              })(e));
          }
          function K(e) {
            if (!e) return !1;
            var t = e._valueTracker;
            if (!t) return !0;
            var n = t.getValue(),
              r = "";
            return (
              e && (r = Q(e) ? (e.checked ? "true" : "false") : e.value),
              (e = r) !== n && (t.setValue(e), !0)
            );
          }
          function J(e) {
            if (
              void 0 ===
              (e = e || ("undefined" != typeof document ? document : void 0))
            )
              return null;
            try {
              return e.activeElement || e.body;
            } catch (t) {
              return e.body;
            }
          }
          function Y(e, t) {
            var n = t.checked;
            return H({}, t, {
              defaultChecked: void 0,
              defaultValue: void 0,
              value: void 0,
              checked: null != n ? n : e._wrapperState.initialChecked,
            });
          }
          function Z(e, t) {
            var n = null == t.defaultValue ? "" : t.defaultValue,
              r = null != t.checked ? t.checked : t.defaultChecked;
            ((n = q(null != t.value ? t.value : n)),
              (e._wrapperState = {
                initialChecked: r,
                initialValue: n,
                controlled:
                  "checkbox" === t.type || "radio" === t.type
                    ? null != t.checked
                    : null != t.value,
              }));
          }
          function ee(e, t) {
            null != (t = t.checked) && C(e, "checked", t, !1);
          }
          function et(e, t) {
            ee(e, t);
            var n = q(t.value),
              r = t.type;
            if (null != n)
              "number" === r
                ? ((0 === n && "" === e.value) || e.value != n) &&
                  (e.value = "" + n)
                : e.value !== "" + n && (e.value = "" + n);
            else if ("submit" === r || "reset" === r) {
              e.removeAttribute("value");
              return;
            }
            (t.hasOwnProperty("value")
              ? er(e, t.type, n)
              : t.hasOwnProperty("defaultValue") &&
                er(e, t.type, q(t.defaultValue)),
              null == t.checked &&
                null != t.defaultChecked &&
                (e.defaultChecked = !!t.defaultChecked));
          }
          function en(e, t, n) {
            if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
              var r = t.type;
              if (!(
                ("submit" !== r && "reset" !== r) ||
                (void 0 !== t.value && null !== t.value)
              ))
                return;
              ((t = "" + e._wrapperState.initialValue),
                n || t === e.value || (e.value = t),
                (e.defaultValue = t));
            }
            ("" !== (n = e.name) && (e.name = ""),
              (e.defaultChecked = !!e._wrapperState.initialChecked),
              "" !== n && (e.name = n));
          }
          function er(e, t, n) {
            ("number" !== t || J(e.ownerDocument) !== e) &&
              (null == n
                ? (e.defaultValue = "" + e._wrapperState.initialValue)
                : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
          }
          var ea = Array.isArray;
          function el(e, t, n, r) {
            if (((e = e.options), t)) {
              t = {};
              for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
              for (n = 0; n < e.length; n++)
                ((a = t.hasOwnProperty("$" + e[n].value)),
                  e[n].selected !== a && (e[n].selected = a),
                  a && r && (e[n].defaultSelected = !0));
            } else {
              for (a = 0, n = "" + q(n), t = null; a < e.length; a++) {
                if (e[a].value === n) {
                  ((e[a].selected = !0), r && (e[a].defaultSelected = !0));
                  return;
                }
                null !== t || e[a].disabled || (t = e[a]);
              }
              null !== t && (t.selected = !0);
            }
          }
          function ei(e, t) {
            if (null != t.dangerouslySetInnerHTML) throw Error(d(91));
            return H({}, t, {
              value: void 0,
              defaultValue: void 0,
              children: "" + e._wrapperState.initialValue,
            });
          }
          function eo(e, t) {
            var n = t.value;
            if (null == n) {
              if (((n = t.children), (t = t.defaultValue), null != n)) {
                if (null != t) throw Error(d(92));
                if (ea(n)) {
                  if (1 < n.length) throw Error(d(93));
                  n = n[0];
                }
                t = n;
              }
              (null == t && (t = ""), (n = t));
            }
            e._wrapperState = { initialValue: q(n) };
          }
          function es(e, t) {
            var n = q(t.value),
              r = q(t.defaultValue);
            (null != n &&
              ((n = "" + n) !== e.value && (e.value = n),
              null == t.defaultValue &&
                e.defaultValue !== n &&
                (e.defaultValue = n)),
              null != r && (e.defaultValue = "" + r));
          }
          function eu(e) {
            var t = e.textContent;
            t === e._wrapperState.initialValue &&
              "" !== t &&
              null !== t &&
              (e.value = t);
          }
          function ec(e) {
            switch (e) {
              case "svg":
                return "http://www.w3.org/2000/svg";
              case "math":
                return "http://www.w3.org/1998/Math/MathML";
              default:
                return "http://www.w3.org/1999/xhtml";
            }
          }
          function ed(e, t) {
            return null == e || "http://www.w3.org/1999/xhtml" === e
              ? ec(t)
              : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
                ? "http://www.w3.org/1999/xhtml"
                : e;
          }
          var ef,
            ep,
            em =
              ((ef = function (e, t) {
                if (
                  "http://www.w3.org/2000/svg" !== e.namespaceURI ||
                  "innerHTML" in e
                )
                  e.innerHTML = t;
                else {
                  for (
                    (ep = ep || document.createElement("div")).innerHTML =
                      "<svg>" + t.valueOf().toString() + "</svg>",
                      t = ep.firstChild;
                    e.firstChild;
                  )
                    e.removeChild(e.firstChild);
                  for (; t.firstChild;) e.appendChild(t.firstChild);
                }
              }),
              "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
                ? function (e, t, n, r) {
                    MSApp.execUnsafeLocalFunction(function () {
                      return ef(e, t, n, r);
                    });
                  }
                : ef);
          function eh(e, t) {
            if (t) {
              var n = e.firstChild;
              if (n && n === e.lastChild && 3 === n.nodeType) {
                n.nodeValue = t;
                return;
              }
            }
            e.textContent = t;
          }
          var eg = {
              animationIterationCount: !0,
              aspectRatio: !0,
              borderImageOutset: !0,
              borderImageSlice: !0,
              borderImageWidth: !0,
              boxFlex: !0,
              boxFlexGroup: !0,
              boxOrdinalGroup: !0,
              columnCount: !0,
              columns: !0,
              flex: !0,
              flexGrow: !0,
              flexPositive: !0,
              flexShrink: !0,
              flexNegative: !0,
              flexOrder: !0,
              gridArea: !0,
              gridRow: !0,
              gridRowEnd: !0,
              gridRowSpan: !0,
              gridRowStart: !0,
              gridColumn: !0,
              gridColumnEnd: !0,
              gridColumnSpan: !0,
              gridColumnStart: !0,
              fontWeight: !0,
              lineClamp: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              tabSize: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
              fillOpacity: !0,
              floodOpacity: !0,
              stopOpacity: !0,
              strokeDasharray: !0,
              strokeDashoffset: !0,
              strokeMiterlimit: !0,
              strokeOpacity: !0,
              strokeWidth: !0,
            },
            ey = ["Webkit", "ms", "Moz", "O"];
          function ev(e, t, n) {
            return null == t || "boolean" == typeof t || "" === t
              ? ""
              : n ||
                  "number" != typeof t ||
                  0 === t ||
                  (eg.hasOwnProperty(e) && eg[e])
                ? ("" + t).trim()
                : t + "px";
          }
          function ew(e, t) {
            for (var n in ((e = e.style), t))
              if (t.hasOwnProperty(n)) {
                var r = 0 === n.indexOf("--"),
                  a = ev(n, t[n], r);
                ("float" === n && (n = "cssFloat"),
                  r ? e.setProperty(n, a) : (e[n] = a));
              }
          }
          Object.keys(eg).forEach(function (e) {
            ey.forEach(function (t) {
              eg[(t = t + e.charAt(0).toUpperCase() + e.substring(1))] = eg[e];
            });
          });
          var eb = H(
            { menuitem: !0 },
            {
              area: !0,
              base: !0,
              br: !0,
              col: !0,
              embed: !0,
              hr: !0,
              img: !0,
              input: !0,
              keygen: !0,
              link: !0,
              meta: !0,
              param: !0,
              source: !0,
              track: !0,
              wbr: !0,
            },
          );
          function eS(e, t) {
            if (t) {
              if (
                eb[e] &&
                (null != t.children || null != t.dangerouslySetInnerHTML)
              )
                throw Error(d(137, e));
              if (null != t.dangerouslySetInnerHTML) {
                if (null != t.children) throw Error(d(60));
                if (
                  "object" != typeof t.dangerouslySetInnerHTML ||
                  !("__html" in t.dangerouslySetInnerHTML)
                )
                  throw Error(d(61));
              }
              if (null != t.style && "object" != typeof t.style)
                throw Error(d(62));
            }
          }
          function ek(e, t) {
            if (-1 === e.indexOf("-")) return "string" == typeof t.is;
            switch (e) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return !1;
              default:
                return !0;
            }
          }
          var e_ = null;
          function ex(e) {
            return (
              (e = e.target || e.srcElement || window)
                .correspondingUseElement && (e = e.correspondingUseElement),
              3 === e.nodeType ? e.parentNode : e
            );
          }
          var eC = null,
            eE = null,
            eP = null;
          function eI(e) {
            if ((e = rz(e))) {
              if ("function" != typeof eC) throw Error(d(280));
              var t = e.stateNode;
              t && ((t = r$(t)), eC(e.stateNode, e.type, t));
            }
          }
          function eT(e) {
            eE ? (eP ? eP.push(e) : (eP = [e])) : (eE = e);
          }
          function eN() {
            if (eE) {
              var e = eE,
                t = eP;
              if (((eP = eE = null), eI(e), t))
                for (e = 0; e < t.length; e++) eI(t[e]);
            }
          }
          function eA(e, t) {
            return e(t);
          }
          function eL() {}
          var eR = !1;
          function eM(e, t, n) {
            if (eR) return e(t, n);
            eR = !0;
            try {
              return eA(e, t, n);
            } finally {
              ((eR = !1), (null !== eE || null !== eP) && (eL(), eN()));
            }
          }
          function eO(e, t) {
            var n = e.stateNode;
            if (null === n) return null;
            var r = r$(n);
            if (null === r) return null;
            switch (((n = r[t]), t)) {
              case "onClick":
              case "onClickCapture":
              case "onDoubleClick":
              case "onDoubleClickCapture":
              case "onMouseDown":
              case "onMouseDownCapture":
              case "onMouseMove":
              case "onMouseMoveCapture":
              case "onMouseUp":
              case "onMouseUpCapture":
              case "onMouseEnter":
                ((r = !r.disabled) ||
                  (r = !(
                    "button" === (e = e.type) ||
                    "input" === e ||
                    "select" === e ||
                    "textarea" === e
                  )),
                  (e = !r));
                break;
              default:
                e = !1;
            }
            if (e) return null;
            if (n && "function" != typeof n) throw Error(d(231, t, typeof n));
            return n;
          }
          var ez = !1;
          if (g)
            try {
              var ej = {};
              (Object.defineProperty(ej, "passive", {
                get: function () {
                  ez = !0;
                },
              }),
                window.addEventListener("test", ej, ej),
                window.removeEventListener("test", ej, ej));
            } catch (e) {
              ez = !1;
            }
          function e$(e, t, n, r, a, l, i, o, s) {
            var u = Array.prototype.slice.call(arguments, 3);
            try {
              t.apply(n, u);
            } catch (e) {
              this.onError(e);
            }
          }
          var eU = !1,
            eD = null,
            eF = !1,
            eG = null,
            eH = {
              onError: function (e) {
                ((eU = !0), (eD = e));
              },
            };
          function eB(e, t, n, r, a, l, i, o, s) {
            ((eU = !1), (eD = null), e$.apply(eH, arguments));
          }
          function eW(e) {
            var t = e,
              n = e;
            if (e.alternate) for (; t.return;) t = t.return;
            else {
              e = t;
              do
                (0 != (4098 & (t = e).flags) && (n = t.return), (e = t.return));
              while (e);
            }
            return 3 === t.tag ? n : null;
          }
          function eV(e) {
            if (13 === e.tag) {
              var t = e.memoizedState;
              if (
                (null === t &&
                  null !== (e = e.alternate) &&
                  (t = e.memoizedState),
                null !== t)
              )
                return t.dehydrated;
            }
            return null;
          }
          function eq(e) {
            if (eW(e) !== e) throw Error(d(188));
          }
          function eQ(e) {
            return null !==
              (e = (function (e) {
                var t = e.alternate;
                if (!t) {
                  if (null === (t = eW(e))) throw Error(d(188));
                  return t !== e ? null : e;
                }
                for (var n = e, r = t; ;) {
                  var a = n.return;
                  if (null === a) break;
                  var l = a.alternate;
                  if (null === l) {
                    if (null !== (r = a.return)) {
                      n = r;
                      continue;
                    }
                    break;
                  }
                  if (a.child === l.child) {
                    for (l = a.child; l;) {
                      if (l === n) return (eq(a), e);
                      if (l === r) return (eq(a), t);
                      l = l.sibling;
                    }
                    throw Error(d(188));
                  }
                  if (n.return !== r.return) ((n = a), (r = l));
                  else {
                    for (var i = !1, o = a.child; o;) {
                      if (o === n) {
                        ((i = !0), (n = a), (r = l));
                        break;
                      }
                      if (o === r) {
                        ((i = !0), (r = a), (n = l));
                        break;
                      }
                      o = o.sibling;
                    }
                    if (!i) {
                      for (o = l.child; o;) {
                        if (o === n) {
                          ((i = !0), (n = l), (r = a));
                          break;
                        }
                        if (o === r) {
                          ((i = !0), (r = l), (n = a));
                          break;
                        }
                        o = o.sibling;
                      }
                      if (!i) throw Error(d(189));
                    }
                  }
                  if (n.alternate !== r) throw Error(d(190));
                }
                if (3 !== n.tag) throw Error(d(188));
                return n.stateNode.current === n ? e : t;
              })(e))
              ? (function e(t) {
                  if (5 === t.tag || 6 === t.tag) return t;
                  for (t = t.child; null !== t;) {
                    var n = e(t);
                    if (null !== n) return n;
                    t = t.sibling;
                  }
                  return null;
                })(e)
              : null;
          }
          var eX = c.unstable_scheduleCallback,
            eK = c.unstable_cancelCallback,
            eJ = c.unstable_shouldYield,
            eY = c.unstable_requestPaint,
            eZ = c.unstable_now,
            e0 = c.unstable_getCurrentPriorityLevel,
            e1 = c.unstable_ImmediatePriority,
            e2 = c.unstable_UserBlockingPriority,
            e3 = c.unstable_NormalPriority,
            e4 = c.unstable_LowPriority,
            e5 = c.unstable_IdlePriority,
            e8 = null,
            e6 = null,
            e9 = Math.clz32
              ? Math.clz32
              : function (e) {
                  return 0 == (e >>>= 0) ? 32 : (31 - ((e7(e) / te) | 0)) | 0;
                },
            e7 = Math.log,
            te = Math.LN2,
            tt = 64,
            tn = 4194304;
          function tr(e) {
            switch (e & -e) {
              case 1:
                return 1;
              case 2:
                return 2;
              case 4:
                return 4;
              case 8:
                return 8;
              case 16:
                return 16;
              case 32:
                return 32;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
                return 4194240 & e;
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                return 130023424 & e;
              case 134217728:
                return 134217728;
              case 268435456:
                return 268435456;
              case 536870912:
                return 536870912;
              case 1073741824:
                return 1073741824;
              default:
                return e;
            }
          }
          function ta(e, t) {
            var n = e.pendingLanes;
            if (0 === n) return 0;
            var r = 0,
              a = e.suspendedLanes,
              l = e.pingedLanes,
              i = 268435455 & n;
            if (0 !== i) {
              var o = i & ~a;
              0 !== o ? (r = tr(o)) : 0 != (l &= i) && (r = tr(l));
            } else 0 != (i = n & ~a) ? (r = tr(i)) : 0 !== l && (r = tr(l));
            if (0 === r) return 0;
            if (
              0 !== t &&
              t !== r &&
              0 == (t & a) &&
              ((a = r & -r) >= (l = t & -t) || (16 === a && 0 != (4194240 & l)))
            )
              return t;
            if ((0 != (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
              for (e = e.entanglements, t &= r; 0 < t;)
                ((a = 1 << (n = 31 - e9(t))), (r |= e[n]), (t &= ~a));
            return r;
          }
          function tl(e) {
            return 0 != (e = -1073741825 & e.pendingLanes)
              ? e
              : 1073741824 & e
                ? 1073741824
                : 0;
          }
          function ti() {
            var e = tt;
            return (0 == (4194240 & (tt <<= 1)) && (tt = 64), e);
          }
          function to(e) {
            for (var t = [], n = 0; 31 > n; n++) t.push(e);
            return t;
          }
          function ts(e, t, n) {
            ((e.pendingLanes |= t),
              536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
              ((e = e.eventTimes)[(t = 31 - e9(t))] = n));
          }
          function tu(e, t) {
            var n = (e.entangledLanes |= t);
            for (e = e.entanglements; n;) {
              var r = 31 - e9(n),
                a = 1 << r;
              ((a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a));
            }
          }
          var tc = 0;
          function td(e) {
            return 1 < (e &= -e)
              ? 4 < e
                ? 0 != (268435455 & e)
                  ? 16
                  : 536870912
                : 4
              : 1;
          }
          var tf,
            tp,
            tm,
            th,
            tg,
            ty = !1,
            tv = [],
            tw = null,
            tb = null,
            tS = null,
            tk = new Map(),
            t_ = new Map(),
            tx = [],
            tC =
              "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
                " ",
              );
          function tE(e, t) {
            switch (e) {
              case "focusin":
              case "focusout":
                tw = null;
                break;
              case "dragenter":
              case "dragleave":
                tb = null;
                break;
              case "mouseover":
              case "mouseout":
                tS = null;
                break;
              case "pointerover":
              case "pointerout":
                tk.delete(t.pointerId);
                break;
              case "gotpointercapture":
              case "lostpointercapture":
                t_.delete(t.pointerId);
            }
          }
          function tP(e, t, n, r, a, l) {
            return (
              null === e || e.nativeEvent !== l
                ? ((e = {
                    blockedOn: t,
                    domEventName: n,
                    eventSystemFlags: r,
                    nativeEvent: l,
                    targetContainers: [a],
                  }),
                  null !== t && null !== (t = rz(t)) && tp(t))
                : ((e.eventSystemFlags |= r),
                  (t = e.targetContainers),
                  null !== a && -1 === t.indexOf(a) && t.push(a)),
              e
            );
          }
          function tI(e) {
            var t = rO(e.target);
            if (null !== t) {
              var n = eW(t);
              if (null !== n) {
                if (13 === (t = n.tag)) {
                  if (null !== (t = eV(n))) {
                    ((e.blockedOn = t),
                      tg(e.priority, function () {
                        tm(n);
                      }));
                    return;
                  }
                } else if (
                  3 === t &&
                  n.stateNode.current.memoizedState.isDehydrated
                ) {
                  e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null;
                  return;
                }
              }
            }
            e.blockedOn = null;
          }
          function tT(e) {
            if (null !== e.blockedOn) return !1;
            for (var t = e.targetContainers; 0 < t.length;) {
              var n = tD(
                e.domEventName,
                e.eventSystemFlags,
                t[0],
                e.nativeEvent,
              );
              if (null !== n)
                return (null !== (t = rz(n)) && tp(t), (e.blockedOn = n), !1);
              var r = new (n = e.nativeEvent).constructor(n.type, n);
              ((e_ = r), n.target.dispatchEvent(r), (e_ = null), t.shift());
            }
            return !0;
          }
          function tN(e, t, n) {
            tT(e) && n.delete(t);
          }
          function tA() {
            ((ty = !1),
              null !== tw && tT(tw) && (tw = null),
              null !== tb && tT(tb) && (tb = null),
              null !== tS && tT(tS) && (tS = null),
              tk.forEach(tN),
              t_.forEach(tN));
          }
          function tL(e, t) {
            e.blockedOn === t &&
              ((e.blockedOn = null),
              ty ||
                ((ty = !0),
                c.unstable_scheduleCallback(c.unstable_NormalPriority, tA)));
          }
          function tR(e) {
            function t(t) {
              return tL(t, e);
            }
            if (0 < tv.length) {
              tL(tv[0], e);
              for (var n = 1; n < tv.length; n++) {
                var r = tv[n];
                r.blockedOn === e && (r.blockedOn = null);
              }
            }
            for (
              null !== tw && tL(tw, e),
                null !== tb && tL(tb, e),
                null !== tS && tL(tS, e),
                tk.forEach(t),
                t_.forEach(t),
                n = 0;
              n < tx.length;
              n++
            )
              (r = tx[n]).blockedOn === e && (r.blockedOn = null);
            for (; 0 < tx.length && null === (n = tx[0]).blockedOn;)
              (tI(n), null === n.blockedOn && tx.shift());
          }
          var tM = E.ReactCurrentBatchConfig,
            tO = !0;
          function tz(e, t, n, r) {
            var a = tc,
              l = tM.transition;
            tM.transition = null;
            try {
              ((tc = 1), t$(e, t, n, r));
            } finally {
              ((tc = a), (tM.transition = l));
            }
          }
          function tj(e, t, n, r) {
            var a = tc,
              l = tM.transition;
            tM.transition = null;
            try {
              ((tc = 4), t$(e, t, n, r));
            } finally {
              ((tc = a), (tM.transition = l));
            }
          }
          function t$(e, t, n, r) {
            if (tO) {
              var a = tD(e, t, n, r);
              if (null === a) (ro(e, t, r, tU, n), tE(e, r));
              else if (
                (function (e, t, n, r, a) {
                  switch (t) {
                    case "focusin":
                      return ((tw = tP(tw, e, t, n, r, a)), !0);
                    case "dragenter":
                      return ((tb = tP(tb, e, t, n, r, a)), !0);
                    case "mouseover":
                      return ((tS = tP(tS, e, t, n, r, a)), !0);
                    case "pointerover":
                      var l = a.pointerId;
                      return (
                        tk.set(l, tP(tk.get(l) || null, e, t, n, r, a)),
                        !0
                      );
                    case "gotpointercapture":
                      return (
                        (l = a.pointerId),
                        t_.set(l, tP(t_.get(l) || null, e, t, n, r, a)),
                        !0
                      );
                  }
                  return !1;
                })(a, e, t, n, r)
              )
                r.stopPropagation();
              else if ((tE(e, r), 4 & t && -1 < tC.indexOf(e))) {
                for (; null !== a;) {
                  var l = rz(a);
                  if (
                    (null !== l && tf(l),
                    null === (l = tD(e, t, n, r)) && ro(e, t, r, tU, n),
                    l === a)
                  )
                    break;
                  a = l;
                }
                null !== a && r.stopPropagation();
              } else ro(e, t, r, null, n);
            }
          }
          var tU = null;
          function tD(e, t, n, r) {
            if (((tU = null), null !== (e = rO((e = ex(r)))))) {
              if (null === (t = eW(e))) e = null;
              else if (13 === (n = t.tag)) {
                if (null !== (e = eV(t))) return e;
                e = null;
              } else if (3 === n) {
                if (t.stateNode.current.memoizedState.isDehydrated)
                  return 3 === t.tag ? t.stateNode.containerInfo : null;
                e = null;
              } else t !== e && (e = null);
            }
            return ((tU = e), null);
          }
          function tF(e) {
            switch (e) {
              case "cancel":
              case "click":
              case "close":
              case "contextmenu":
              case "copy":
              case "cut":
              case "auxclick":
              case "dblclick":
              case "dragend":
              case "dragstart":
              case "drop":
              case "focusin":
              case "focusout":
              case "input":
              case "invalid":
              case "keydown":
              case "keypress":
              case "keyup":
              case "mousedown":
              case "mouseup":
              case "paste":
              case "pause":
              case "play":
              case "pointercancel":
              case "pointerdown":
              case "pointerup":
              case "ratechange":
              case "reset":
              case "resize":
              case "seeked":
              case "submit":
              case "touchcancel":
              case "touchend":
              case "touchstart":
              case "volumechange":
              case "change":
              case "selectionchange":
              case "textInput":
              case "compositionstart":
              case "compositionend":
              case "compositionupdate":
              case "beforeblur":
              case "afterblur":
              case "beforeinput":
              case "blur":
              case "fullscreenchange":
              case "focus":
              case "hashchange":
              case "popstate":
              case "select":
              case "selectstart":
                return 1;
              case "drag":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "mousemove":
              case "mouseout":
              case "mouseover":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "scroll":
              case "toggle":
              case "touchmove":
              case "wheel":
              case "mouseenter":
              case "mouseleave":
              case "pointerenter":
              case "pointerleave":
                return 4;
              case "message":
                switch (e0()) {
                  case e1:
                    return 1;
                  case e2:
                    return 4;
                  case e3:
                  case e4:
                    return 16;
                  case e5:
                    return 536870912;
                  default:
                    return 16;
                }
              default:
                return 16;
            }
          }
          var tG = null,
            tH = null,
            tB = null;
          function tW() {
            if (tB) return tB;
            var e,
              t,
              n = tH,
              r = n.length,
              a = "value" in tG ? tG.value : tG.textContent,
              l = a.length;
            for (e = 0; e < r && n[e] === a[e]; e++);
            var i = r - e;
            for (t = 1; t <= i && n[r - t] === a[l - t]; t++);
            return (tB = a.slice(e, 1 < t ? 1 - t : void 0));
          }
          function tV(e) {
            var t = e.keyCode;
            return (
              "charCode" in e
                ? 0 === (e = e.charCode) && 13 === t && (e = 13)
                : (e = t),
              10 === e && (e = 13),
              32 <= e || 13 === e ? e : 0
            );
          }
          function tq() {
            return !0;
          }
          function tQ() {
            return !1;
          }
          function tX(e) {
            function t(t, n, r, a, l) {
              for (var i in ((this._reactName = t),
              (this._targetInst = r),
              (this.type = n),
              (this.nativeEvent = a),
              (this.target = l),
              (this.currentTarget = null),
              e))
                e.hasOwnProperty(i) &&
                  ((t = e[i]), (this[i] = t ? t(a) : a[i]));
              return (
                (this.isDefaultPrevented = (
                  null != a.defaultPrevented
                    ? a.defaultPrevented
                    : !1 === a.returnValue
                )
                  ? tq
                  : tQ),
                (this.isPropagationStopped = tQ),
                this
              );
            }
            return (
              H(t.prototype, {
                preventDefault: function () {
                  this.defaultPrevented = !0;
                  var e = this.nativeEvent;
                  e &&
                    (e.preventDefault
                      ? e.preventDefault()
                      : "unknown" != typeof e.returnValue &&
                        (e.returnValue = !1),
                    (this.isDefaultPrevented = tq));
                },
                stopPropagation: function () {
                  var e = this.nativeEvent;
                  e &&
                    (e.stopPropagation
                      ? e.stopPropagation()
                      : "unknown" != typeof e.cancelBubble &&
                        (e.cancelBubble = !0),
                    (this.isPropagationStopped = tq));
                },
                persist: function () {},
                isPersistent: tq,
              }),
              t
            );
          }
          var tK,
            tJ,
            tY,
            tZ = {
              eventPhase: 0,
              bubbles: 0,
              cancelable: 0,
              timeStamp: function (e) {
                return e.timeStamp || Date.now();
              },
              defaultPrevented: 0,
              isTrusted: 0,
            },
            t0 = tX(tZ),
            t1 = H({}, tZ, { view: 0, detail: 0 }),
            t2 = tX(t1),
            t3 = H({}, t1, {
              screenX: 0,
              screenY: 0,
              clientX: 0,
              clientY: 0,
              pageX: 0,
              pageY: 0,
              ctrlKey: 0,
              shiftKey: 0,
              altKey: 0,
              metaKey: 0,
              getModifierState: na,
              button: 0,
              buttons: 0,
              relatedTarget: function (e) {
                return void 0 === e.relatedTarget
                  ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                  : e.relatedTarget;
              },
              movementX: function (e) {
                return "movementX" in e
                  ? e.movementX
                  : (e !== tY &&
                      (tY && "mousemove" === e.type
                        ? ((tK = e.screenX - tY.screenX),
                          (tJ = e.screenY - tY.screenY))
                        : (tJ = tK = 0),
                      (tY = e)),
                    tK);
              },
              movementY: function (e) {
                return "movementY" in e ? e.movementY : tJ;
              },
            }),
            t4 = tX(t3),
            t5 = tX(H({}, t3, { dataTransfer: 0 })),
            t8 = tX(H({}, t1, { relatedTarget: 0 })),
            t6 = tX(
              H({}, tZ, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
            ),
            t9 = tX(
              H({}, tZ, {
                clipboardData: function (e) {
                  return "clipboardData" in e
                    ? e.clipboardData
                    : window.clipboardData;
                },
              }),
            ),
            t7 = tX(H({}, tZ, { data: 0 })),
            ne = {
              Esc: "Escape",
              Spacebar: " ",
              Left: "ArrowLeft",
              Up: "ArrowUp",
              Right: "ArrowRight",
              Down: "ArrowDown",
              Del: "Delete",
              Win: "OS",
              Menu: "ContextMenu",
              Apps: "ContextMenu",
              Scroll: "ScrollLock",
              MozPrintableKey: "Unidentified",
            },
            nt = {
              8: "Backspace",
              9: "Tab",
              12: "Clear",
              13: "Enter",
              16: "Shift",
              17: "Control",
              18: "Alt",
              19: "Pause",
              20: "CapsLock",
              27: "Escape",
              32: " ",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "ArrowLeft",
              38: "ArrowUp",
              39: "ArrowRight",
              40: "ArrowDown",
              45: "Insert",
              46: "Delete",
              112: "F1",
              113: "F2",
              114: "F3",
              115: "F4",
              116: "F5",
              117: "F6",
              118: "F7",
              119: "F8",
              120: "F9",
              121: "F10",
              122: "F11",
              123: "F12",
              144: "NumLock",
              145: "ScrollLock",
              224: "Meta",
            },
            nn = {
              Alt: "altKey",
              Control: "ctrlKey",
              Meta: "metaKey",
              Shift: "shiftKey",
            };
          function nr(e) {
            var t = this.nativeEvent;
            return t.getModifierState
              ? t.getModifierState(e)
              : !!(e = nn[e]) && !!t[e];
          }
          function na() {
            return nr;
          }
          var nl = tX(
              H({}, t1, {
                key: function (e) {
                  if (e.key) {
                    var t = ne[e.key] || e.key;
                    if ("Unidentified" !== t) return t;
                  }
                  return "keypress" === e.type
                    ? 13 === (e = tV(e))
                      ? "Enter"
                      : String.fromCharCode(e)
                    : "keydown" === e.type || "keyup" === e.type
                      ? nt[e.keyCode] || "Unidentified"
                      : "";
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: na,
                charCode: function (e) {
                  return "keypress" === e.type ? tV(e) : 0;
                },
                keyCode: function (e) {
                  return "keydown" === e.type || "keyup" === e.type
                    ? e.keyCode
                    : 0;
                },
                which: function (e) {
                  return "keypress" === e.type
                    ? tV(e)
                    : "keydown" === e.type || "keyup" === e.type
                      ? e.keyCode
                      : 0;
                },
              }),
            ),
            ni = tX(
              H({}, t3, {
                pointerId: 0,
                width: 0,
                height: 0,
                pressure: 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: 0,
                pointerType: 0,
                isPrimary: 0,
              }),
            ),
            no = tX(
              H({}, t1, {
                touches: 0,
                targetTouches: 0,
                changedTouches: 0,
                altKey: 0,
                metaKey: 0,
                ctrlKey: 0,
                shiftKey: 0,
                getModifierState: na,
              }),
            ),
            ns = tX(
              H({}, tZ, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
            ),
            nu = tX(
              H({}, t3, {
                deltaX: function (e) {
                  return "deltaX" in e
                    ? e.deltaX
                    : "wheelDeltaX" in e
                      ? -e.wheelDeltaX
                      : 0;
                },
                deltaY: function (e) {
                  return "deltaY" in e
                    ? e.deltaY
                    : "wheelDeltaY" in e
                      ? -e.wheelDeltaY
                      : "wheelDelta" in e
                        ? -e.wheelDelta
                        : 0;
                },
                deltaZ: 0,
                deltaMode: 0,
              }),
            ),
            nc = [9, 13, 27, 32],
            nd = g && "CompositionEvent" in window,
            nf = null;
          g && "documentMode" in document && (nf = document.documentMode);
          var np = g && "TextEvent" in window && !nf,
            nm = g && (!nd || (nf && 8 < nf && 11 >= nf)),
            nh = !1;
          function ng(e, t) {
            switch (e) {
              case "keyup":
                return -1 !== nc.indexOf(t.keyCode);
              case "keydown":
                return 229 !== t.keyCode;
              case "keypress":
              case "mousedown":
              case "focusout":
                return !0;
              default:
                return !1;
            }
          }
          function ny(e) {
            return "object" == typeof (e = e.detail) && "data" in e
              ? e.data
              : null;
          }
          var nv = !1,
            nw = {
              color: !0,
              date: !0,
              datetime: !0,
              "datetime-local": !0,
              email: !0,
              month: !0,
              number: !0,
              password: !0,
              range: !0,
              search: !0,
              tel: !0,
              text: !0,
              time: !0,
              url: !0,
              week: !0,
            };
          function nb(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return "input" === t ? !!nw[e.type] : "textarea" === t;
          }
          function nS(e, t, n, r) {
            (eT(r),
              0 < (t = ru(t, "onChange")).length &&
                ((n = new t0("onChange", "change", null, n, r)),
                e.push({ event: n, listeners: t })));
          }
          var nk = null,
            n_ = null;
          function nx(e) {
            rt(e, 0);
          }
          function nC(e) {
            if (K(rj(e))) return e;
          }
          function nE(e, t) {
            if ("change" === e) return t;
          }
          var nP = !1;
          if (g) {
            if (g) {
              var nI = "oninput" in document;
              if (!nI) {
                var nT = document.createElement("div");
                (nT.setAttribute("oninput", "return;"),
                  (nI = "function" == typeof nT.oninput));
              }
              r = nI;
            } else r = !1;
            nP = r && (!document.documentMode || 9 < document.documentMode);
          }
          function nN() {
            nk && (nk.detachEvent("onpropertychange", nA), (n_ = nk = null));
          }
          function nA(e) {
            if ("value" === e.propertyName && nC(n_)) {
              var t = [];
              (nS(t, n_, e, ex(e)), eM(nx, t));
            }
          }
          function nL(e, t, n) {
            "focusin" === e
              ? (nN(),
                (nk = t),
                (n_ = n),
                nk.attachEvent("onpropertychange", nA))
              : "focusout" === e && nN();
          }
          function nR(e) {
            if ("selectionchange" === e || "keyup" === e || "keydown" === e)
              return nC(n_);
          }
          function nM(e, t) {
            if ("click" === e) return nC(t);
          }
          function nO(e, t) {
            if ("input" === e || "change" === e) return nC(t);
          }
          var nz =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                };
          function nj(e, t) {
            if (nz(e, t)) return !0;
            if (
              "object" != typeof e ||
              null === e ||
              "object" != typeof t ||
              null === t
            )
              return !1;
            var n = Object.keys(e),
              r = Object.keys(t);
            if (n.length !== r.length) return !1;
            for (r = 0; r < n.length; r++) {
              var a = n[r];
              if (!y.call(t, a) || !nz(e[a], t[a])) return !1;
            }
            return !0;
          }
          function n$(e) {
            for (; e && e.firstChild;) e = e.firstChild;
            return e;
          }
          function nU(e, t) {
            var n,
              r = n$(e);
            for (e = 0; r;) {
              if (3 === r.nodeType) {
                if (((n = e + r.textContent.length), e <= t && n >= t))
                  return { node: r, offset: t - e };
                e = n;
              }
              e: {
                for (; r;) {
                  if (r.nextSibling) {
                    r = r.nextSibling;
                    break e;
                  }
                  r = r.parentNode;
                }
                r = void 0;
              }
              r = n$(r);
            }
          }
          function nD() {
            for (var e = window, t = J(); t instanceof e.HTMLIFrameElement;) {
              try {
                var n = "string" == typeof t.contentWindow.location.href;
              } catch (e) {
                n = !1;
              }
              if (n) e = t.contentWindow;
              else break;
              t = J(e.document);
            }
            return t;
          }
          function nF(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return (
              t &&
              (("input" === t &&
                ("text" === e.type ||
                  "search" === e.type ||
                  "tel" === e.type ||
                  "url" === e.type ||
                  "password" === e.type)) ||
                "textarea" === t ||
                "true" === e.contentEditable)
            );
          }
          var nG =
              g && "documentMode" in document && 11 >= document.documentMode,
            nH = null,
            nB = null,
            nW = null,
            nV = !1;
          function nq(e, t, n) {
            var r =
              n.window === n
                ? n.document
                : 9 === n.nodeType
                  ? n
                  : n.ownerDocument;
            nV ||
              null == nH ||
              nH !== J(r) ||
              ((r =
                "selectionStart" in (r = nH) && nF(r)
                  ? { start: r.selectionStart, end: r.selectionEnd }
                  : {
                      anchorNode: (r = (
                        (r.ownerDocument && r.ownerDocument.defaultView) ||
                        window
                      ).getSelection()).anchorNode,
                      anchorOffset: r.anchorOffset,
                      focusNode: r.focusNode,
                      focusOffset: r.focusOffset,
                    }),
              (nW && nj(nW, r)) ||
                ((nW = r),
                0 < (r = ru(nB, "onSelect")).length &&
                  ((t = new t0("onSelect", "select", null, t, n)),
                  e.push({ event: t, listeners: r }),
                  (t.target = nH))));
          }
          function nQ(e, t) {
            var n = {};
            return (
              (n[e.toLowerCase()] = t.toLowerCase()),
              (n["Webkit" + e] = "webkit" + t),
              (n["Moz" + e] = "moz" + t),
              n
            );
          }
          var nX = {
              animationend: nQ("Animation", "AnimationEnd"),
              animationiteration: nQ("Animation", "AnimationIteration"),
              animationstart: nQ("Animation", "AnimationStart"),
              transitionend: nQ("Transition", "TransitionEnd"),
            },
            nK = {},
            nJ = {};
          function nY(e) {
            if (nK[e]) return nK[e];
            if (!nX[e]) return e;
            var t,
              n = nX[e];
            for (t in n)
              if (n.hasOwnProperty(t) && t in nJ) return (nK[e] = n[t]);
            return e;
          }
          g &&
            ((nJ = document.createElement("div").style),
            "AnimationEvent" in window ||
              (delete nX.animationend.animation,
              delete nX.animationiteration.animation,
              delete nX.animationstart.animation),
            "TransitionEvent" in window || delete nX.transitionend.transition);
          var nZ = nY("animationend"),
            n0 = nY("animationiteration"),
            n1 = nY("animationstart"),
            n2 = nY("transitionend"),
            n3 = new Map(),
            n4 =
              "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
                " ",
              );
          function n5(e, t) {
            (n3.set(e, t), m(t, [e]));
          }
          for (var n8 = 0; n8 < n4.length; n8++) {
            var n6 = n4[n8];
            n5(n6.toLowerCase(), "on" + (n6[0].toUpperCase() + n6.slice(1)));
          }
          (n5(nZ, "onAnimationEnd"),
            n5(n0, "onAnimationIteration"),
            n5(n1, "onAnimationStart"),
            n5("dblclick", "onDoubleClick"),
            n5("focusin", "onFocus"),
            n5("focusout", "onBlur"),
            n5(n2, "onTransitionEnd"),
            h("onMouseEnter", ["mouseout", "mouseover"]),
            h("onMouseLeave", ["mouseout", "mouseover"]),
            h("onPointerEnter", ["pointerout", "pointerover"]),
            h("onPointerLeave", ["pointerout", "pointerover"]),
            m(
              "onChange",
              "change click focusin focusout input keydown keyup selectionchange".split(
                " ",
              ),
            ),
            m(
              "onSelect",
              "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
                " ",
              ),
            ),
            m("onBeforeInput", [
              "compositionend",
              "keypress",
              "textInput",
              "paste",
            ]),
            m(
              "onCompositionEnd",
              "compositionend focusout keydown keypress keyup mousedown".split(
                " ",
              ),
            ),
            m(
              "onCompositionStart",
              "compositionstart focusout keydown keypress keyup mousedown".split(
                " ",
              ),
            ),
            m(
              "onCompositionUpdate",
              "compositionupdate focusout keydown keypress keyup mousedown".split(
                " ",
              ),
            ));
          var n9 =
              "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
                " ",
              ),
            n7 = new Set(
              "cancel close invalid load scroll toggle".split(" ").concat(n9),
            );
          function re(e, t, n) {
            var r = e.type || "unknown-event";
            ((e.currentTarget = n),
              (function (e, t, n, r, a, l, i, o, s) {
                if ((eB.apply(this, arguments), eU)) {
                  if (eU) {
                    var u = eD;
                    ((eU = !1), (eD = null));
                  } else throw Error(d(198));
                  eF || ((eF = !0), (eG = u));
                }
              })(r, t, void 0, e),
              (e.currentTarget = null));
          }
          function rt(e, t) {
            t = 0 != (4 & t);
            for (var n = 0; n < e.length; n++) {
              var r = e[n],
                a = r.event;
              r = r.listeners;
              e: {
                var l = void 0;
                if (t)
                  for (var i = r.length - 1; 0 <= i; i--) {
                    var o = r[i],
                      s = o.instance,
                      u = o.currentTarget;
                    if (((o = o.listener), s !== l && a.isPropagationStopped()))
                      break e;
                    (re(a, o, u), (l = s));
                  }
                else
                  for (i = 0; i < r.length; i++) {
                    if (
                      ((s = (o = r[i]).instance),
                      (u = o.currentTarget),
                      (o = o.listener),
                      s !== l && a.isPropagationStopped())
                    )
                      break e;
                    (re(a, o, u), (l = s));
                  }
              }
            }
            if (eF) throw ((e = eG), (eF = !1), (eG = null), e);
          }
          function rn(e, t) {
            var n = t[rL];
            void 0 === n && (n = t[rL] = new Set());
            var r = e + "__bubble";
            n.has(r) || (ri(t, e, 2, !1), n.add(r));
          }
          function rr(e, t, n) {
            var r = 0;
            (t && (r |= 4), ri(n, e, r, t));
          }
          var ra = "_reactListening" + Math.random().toString(36).slice(2);
          function rl(e) {
            if (!e[ra]) {
              ((e[ra] = !0),
                f.forEach(function (t) {
                  "selectionchange" !== t &&
                    (n7.has(t) || rr(t, !1, e), rr(t, !0, e));
                }));
              var t = 9 === e.nodeType ? e : e.ownerDocument;
              null === t ||
                t[ra] ||
                ((t[ra] = !0), rr("selectionchange", !1, t));
            }
          }
          function ri(e, t, n, r) {
            switch (tF(t)) {
              case 1:
                var a = tz;
                break;
              case 4:
                a = tj;
                break;
              default:
                a = t$;
            }
            ((n = a.bind(null, t, n, e)),
              (a = void 0),
              ez &&
                ("touchstart" === t || "touchmove" === t || "wheel" === t) &&
                (a = !0),
              r
                ? void 0 !== a
                  ? e.addEventListener(t, n, { capture: !0, passive: a })
                  : e.addEventListener(t, n, !0)
                : void 0 !== a
                  ? e.addEventListener(t, n, { passive: a })
                  : e.addEventListener(t, n, !1));
          }
          function ro(e, t, n, r, a) {
            var l = r;
            if (0 == (1 & t) && 0 == (2 & t) && null !== r)
              e: for (;;) {
                if (null === r) return;
                var i = r.tag;
                if (3 === i || 4 === i) {
                  var o = r.stateNode.containerInfo;
                  if (o === a || (8 === o.nodeType && o.parentNode === a))
                    break;
                  if (4 === i)
                    for (i = r.return; null !== i;) {
                      var s = i.tag;
                      if (
                        (3 === s || 4 === s) &&
                        ((s = i.stateNode.containerInfo) === a ||
                          (8 === s.nodeType && s.parentNode === a))
                      )
                        return;
                      i = i.return;
                    }
                  for (; null !== o;) {
                    if (null === (i = rO(o))) return;
                    if (5 === (s = i.tag) || 6 === s) {
                      r = l = i;
                      continue e;
                    }
                    o = o.parentNode;
                  }
                }
                r = r.return;
              }
            eM(function () {
              var r = l,
                a = ex(n),
                i = [];
              e: {
                var o = n3.get(e);
                if (void 0 !== o) {
                  var s = t0,
                    u = e;
                  switch (e) {
                    case "keypress":
                      if (0 === tV(n)) break e;
                    case "keydown":
                    case "keyup":
                      s = nl;
                      break;
                    case "focusin":
                      ((u = "focus"), (s = t8));
                      break;
                    case "focusout":
                      ((u = "blur"), (s = t8));
                      break;
                    case "beforeblur":
                    case "afterblur":
                      s = t8;
                      break;
                    case "click":
                      if (2 === n.button) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                      s = t4;
                      break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                      s = t5;
                      break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                      s = no;
                      break;
                    case nZ:
                    case n0:
                    case n1:
                      s = t6;
                      break;
                    case n2:
                      s = ns;
                      break;
                    case "scroll":
                      s = t2;
                      break;
                    case "wheel":
                      s = nu;
                      break;
                    case "copy":
                    case "cut":
                    case "paste":
                      s = t9;
                      break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                      s = ni;
                  }
                  var c = 0 != (4 & t),
                    d = !c && "scroll" === e,
                    f = c ? (null !== o ? o + "Capture" : null) : o;
                  c = [];
                  for (var p, m = r; null !== m;) {
                    var h = (p = m).stateNode;
                    if (
                      (5 === p.tag &&
                        null !== h &&
                        ((p = h),
                        null !== f &&
                          null != (h = eO(m, f)) &&
                          c.push(rs(m, h, p))),
                      d)
                    )
                      break;
                    m = m.return;
                  }
                  0 < c.length &&
                    ((o = new s(o, u, null, n, a)),
                    i.push({ event: o, listeners: c }));
                }
              }
              if (0 == (7 & t)) {
                if (
                  ((o = "mouseover" === e || "pointerover" === e),
                  (s = "mouseout" === e || "pointerout" === e),
                  !(
                    o &&
                    n !== e_ &&
                    (u = n.relatedTarget || n.fromElement) &&
                    (rO(u) || u[rA])
                  ) &&
                    (s || o) &&
                    ((o =
                      a.window === a
                        ? a
                        : (o = a.ownerDocument)
                          ? o.defaultView || o.parentWindow
                          : window),
                    s
                      ? ((u = n.relatedTarget || n.toElement),
                        (s = r),
                        null !== (u = u ? rO(u) : null) &&
                          ((d = eW(u)),
                          u !== d || (5 !== u.tag && 6 !== u.tag)) &&
                          (u = null))
                      : ((s = null), (u = r)),
                    s !== u))
                ) {
                  if (
                    ((c = t4),
                    (h = "onMouseLeave"),
                    (f = "onMouseEnter"),
                    (m = "mouse"),
                    ("pointerout" === e || "pointerover" === e) &&
                      ((c = ni),
                      (h = "onPointerLeave"),
                      (f = "onPointerEnter"),
                      (m = "pointer")),
                    (d = null == s ? o : rj(s)),
                    (p = null == u ? o : rj(u)),
                    ((o = new c(h, m + "leave", s, n, a)).target = d),
                    (o.relatedTarget = p),
                    (h = null),
                    rO(a) === r &&
                      (((c = new c(f, m + "enter", u, n, a)).target = p),
                      (c.relatedTarget = d),
                      (h = c)),
                    (d = h),
                    s && u)
                  )
                    t: {
                      for (c = s, f = u, m = 0, p = c; p; p = rc(p)) m++;
                      for (p = 0, h = f; h; h = rc(h)) p++;
                      for (; 0 < m - p;) ((c = rc(c)), m--);
                      for (; 0 < p - m;) ((f = rc(f)), p--);
                      for (; m--;) {
                        if (c === f || (null !== f && c === f.alternate))
                          break t;
                        ((c = rc(c)), (f = rc(f)));
                      }
                      c = null;
                    }
                  else c = null;
                  (null !== s && rd(i, o, s, c, !1),
                    null !== u && null !== d && rd(i, d, u, c, !0));
                }
                e: {
                  if (
                    "select" ===
                      (s =
                        (o = r ? rj(r) : window).nodeName &&
                        o.nodeName.toLowerCase()) ||
                    ("input" === s && "file" === o.type)
                  )
                    var g,
                      y = nE;
                  else if (nb(o)) {
                    if (nP) y = nO;
                    else {
                      y = nR;
                      var v = nL;
                    }
                  } else
                    (s = o.nodeName) &&
                      "input" === s.toLowerCase() &&
                      ("checkbox" === o.type || "radio" === o.type) &&
                      (y = nM);
                  if (y && (y = y(e, r))) {
                    nS(i, y, n, a);
                    break e;
                  }
                  (v && v(e, o, r),
                    "focusout" === e &&
                      (v = o._wrapperState) &&
                      v.controlled &&
                      "number" === o.type &&
                      er(o, "number", o.value));
                }
                switch (((v = r ? rj(r) : window), e)) {
                  case "focusin":
                    (nb(v) || "true" === v.contentEditable) &&
                      ((nH = v), (nB = r), (nW = null));
                    break;
                  case "focusout":
                    nW = nB = nH = null;
                    break;
                  case "mousedown":
                    nV = !0;
                    break;
                  case "contextmenu":
                  case "mouseup":
                  case "dragend":
                    ((nV = !1), nq(i, n, a));
                    break;
                  case "selectionchange":
                    if (nG) break;
                  case "keydown":
                  case "keyup":
                    nq(i, n, a);
                }
                if (nd)
                  t: {
                    switch (e) {
                      case "compositionstart":
                        var w = "onCompositionStart";
                        break t;
                      case "compositionend":
                        w = "onCompositionEnd";
                        break t;
                      case "compositionupdate":
                        w = "onCompositionUpdate";
                        break t;
                    }
                    w = void 0;
                  }
                else
                  nv
                    ? ng(e, n) && (w = "onCompositionEnd")
                    : "keydown" === e &&
                      229 === n.keyCode &&
                      (w = "onCompositionStart");
                (w &&
                  (nm &&
                    "ko" !== n.locale &&
                    (nv || "onCompositionStart" !== w
                      ? "onCompositionEnd" === w && nv && (g = tW())
                      : ((tH = "value" in (tG = a) ? tG.value : tG.textContent),
                        (nv = !0))),
                  0 < (v = ru(r, w)).length &&
                    ((w = new t7(w, e, null, n, a)),
                    i.push({ event: w, listeners: v }),
                    g ? (w.data = g) : null !== (g = ny(n)) && (w.data = g))),
                  (g = np
                    ? (function (e, t) {
                        switch (e) {
                          case "compositionend":
                            return ny(t);
                          case "keypress":
                            if (32 !== t.which) return null;
                            return ((nh = !0), " ");
                          case "textInput":
                            return " " === (e = t.data) && nh ? null : e;
                          default:
                            return null;
                        }
                      })(e, n)
                    : (function (e, t) {
                        if (nv)
                          return "compositionend" === e || (!nd && ng(e, t))
                            ? ((e = tW()), (tB = tH = tG = null), (nv = !1), e)
                            : null;
                        switch (e) {
                          case "paste":
                          default:
                            return null;
                          case "keypress":
                            if (
                              !(t.ctrlKey || t.altKey || t.metaKey) ||
                              (t.ctrlKey && t.altKey)
                            ) {
                              if (t.char && 1 < t.char.length) return t.char;
                              if (t.which) return String.fromCharCode(t.which);
                            }
                            return null;
                          case "compositionend":
                            return nm && "ko" !== t.locale ? null : t.data;
                        }
                      })(e, n)) &&
                    0 < (r = ru(r, "onBeforeInput")).length &&
                    ((a = new t7("onBeforeInput", "beforeinput", null, n, a)),
                    i.push({ event: a, listeners: r }),
                    (a.data = g)));
              }
              rt(i, t);
            });
          }
          function rs(e, t, n) {
            return { instance: e, listener: t, currentTarget: n };
          }
          function ru(e, t) {
            for (var n = t + "Capture", r = []; null !== e;) {
              var a = e,
                l = a.stateNode;
              (5 === a.tag &&
                null !== l &&
                ((a = l),
                null != (l = eO(e, n)) && r.unshift(rs(e, l, a)),
                null != (l = eO(e, t)) && r.push(rs(e, l, a))),
                (e = e.return));
            }
            return r;
          }
          function rc(e) {
            if (null === e) return null;
            do e = e.return;
            while (e && 5 !== e.tag);
            return e || null;
          }
          function rd(e, t, n, r, a) {
            for (var l = t._reactName, i = []; null !== n && n !== r;) {
              var o = n,
                s = o.alternate,
                u = o.stateNode;
              if (null !== s && s === r) break;
              (5 === o.tag &&
                null !== u &&
                ((o = u),
                a
                  ? null != (s = eO(n, l)) && i.unshift(rs(n, s, o))
                  : a || (null != (s = eO(n, l)) && i.push(rs(n, s, o)))),
                (n = n.return));
            }
            0 !== i.length && e.push({ event: t, listeners: i });
          }
          var rf = /\r\n?/g,
            rp = /\u0000|\uFFFD/g;
          function rm(e) {
            return ("string" == typeof e ? e : "" + e)
              .replace(rf, "\n")
              .replace(rp, "");
          }
          function rh(e, t, n) {
            if (((t = rm(t)), rm(e) !== t && n)) throw Error(d(425));
          }
          function rg() {}
          var ry = null,
            rv = null;
          function rw(e, t) {
            return (
              "textarea" === e ||
              "noscript" === e ||
              "string" == typeof t.children ||
              "number" == typeof t.children ||
              ("object" == typeof t.dangerouslySetInnerHTML &&
                null !== t.dangerouslySetInnerHTML &&
                null != t.dangerouslySetInnerHTML.__html)
            );
          }
          var rb = "function" == typeof setTimeout ? setTimeout : void 0,
            rS = "function" == typeof clearTimeout ? clearTimeout : void 0,
            rk = "function" == typeof Promise ? Promise : void 0,
            r_ =
              "function" == typeof queueMicrotask
                ? queueMicrotask
                : void 0 !== rk
                  ? function (e) {
                      return rk.resolve(null).then(e).catch(rx);
                    }
                  : rb;
          function rx(e) {
            setTimeout(function () {
              throw e;
            });
          }
          function rC(e, t) {
            var n = t,
              r = 0;
            do {
              var a = n.nextSibling;
              if ((e.removeChild(n), a && 8 === a.nodeType)) {
                if ("/$" === (n = a.data)) {
                  if (0 === r) {
                    (e.removeChild(a), tR(t));
                    return;
                  }
                  r--;
                } else ("$" !== n && "$?" !== n && "$!" !== n) || r++;
              }
              n = a;
            } while (n);
            tR(t);
          }
          function rE(e) {
            for (; null != e; e = e.nextSibling) {
              var t = e.nodeType;
              if (1 === t || 3 === t) break;
              if (8 === t) {
                if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
                if ("/$" === t) return null;
              }
            }
            return e;
          }
          function rP(e) {
            e = e.previousSibling;
            for (var t = 0; e;) {
              if (8 === e.nodeType) {
                var n = e.data;
                if ("$" === n || "$!" === n || "$?" === n) {
                  if (0 === t) return e;
                  t--;
                } else "/$" === n && t++;
              }
              e = e.previousSibling;
            }
            return null;
          }
          var rI = Math.random().toString(36).slice(2),
            rT = "__reactFiber$" + rI,
            rN = "__reactProps$" + rI,
            rA = "__reactContainer$" + rI,
            rL = "__reactEvents$" + rI,
            rR = "__reactListeners$" + rI,
            rM = "__reactHandles$" + rI;
          function rO(e) {
            var t = e[rT];
            if (t) return t;
            for (var n = e.parentNode; n;) {
              if ((t = n[rA] || n[rT])) {
                if (
                  ((n = t.alternate),
                  null !== t.child || (null !== n && null !== n.child))
                )
                  for (e = rP(e); null !== e;) {
                    if ((n = e[rT])) return n;
                    e = rP(e);
                  }
                return t;
              }
              n = (e = n).parentNode;
            }
            return null;
          }
          function rz(e) {
            return (e = e[rT] || e[rA]) &&
              (5 === e.tag || 6 === e.tag || 13 === e.tag || 3 === e.tag)
              ? e
              : null;
          }
          function rj(e) {
            if (5 === e.tag || 6 === e.tag) return e.stateNode;
            throw Error(d(33));
          }
          function r$(e) {
            return e[rN] || null;
          }
          var rU = [],
            rD = -1;
          function rF(e) {
            return { current: e };
          }
          function rG(e) {
            0 > rD || ((e.current = rU[rD]), (rU[rD] = null), rD--);
          }
          function rH(e, t) {
            ((rU[++rD] = e.current), (e.current = t));
          }
          var rB = {},
            rW = rF(rB),
            rV = rF(!1),
            rq = rB;
          function rQ(e, t) {
            var n = e.type.contextTypes;
            if (!n) return rB;
            var r = e.stateNode;
            if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
              return r.__reactInternalMemoizedMaskedChildContext;
            var a,
              l = {};
            for (a in n) l[a] = t[a];
            return (
              r &&
                (((e =
                  e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
                (e.__reactInternalMemoizedMaskedChildContext = l)),
              l
            );
          }
          function rX(e) {
            return null != (e = e.childContextTypes);
          }
          function rK() {
            (rG(rV), rG(rW));
          }
          function rJ(e, t, n) {
            if (rW.current !== rB) throw Error(d(168));
            (rH(rW, t), rH(rV, n));
          }
          function rY(e, t, n) {
            var r = e.stateNode;
            if (
              ((t = t.childContextTypes),
              "function" != typeof r.getChildContext)
            )
              return n;
            for (var a in (r = r.getChildContext()))
              if (!(a in t))
                throw Error(
                  d(
                    108,
                    (function (e) {
                      var t = e.type;
                      switch (e.tag) {
                        case 24:
                          return "Cache";
                        case 9:
                          return (t.displayName || "Context") + ".Consumer";
                        case 10:
                          return (
                            (t._context.displayName || "Context") + ".Provider"
                          );
                        case 18:
                          return "DehydratedFragment";
                        case 11:
                          return (
                            (e = (e = t.render).displayName || e.name || ""),
                            t.displayName ||
                              ("" !== e
                                ? "ForwardRef(" + e + ")"
                                : "ForwardRef")
                          );
                        case 7:
                          return "Fragment";
                        case 5:
                          return t;
                        case 4:
                          return "Portal";
                        case 3:
                          return "Root";
                        case 6:
                          return "Text";
                        case 16:
                          return (function e(t) {
                            if (null == t) return null;
                            if ("function" == typeof t)
                              return t.displayName || t.name || null;
                            if ("string" == typeof t) return t;
                            switch (t) {
                              case T:
                                return "Fragment";
                              case I:
                                return "Portal";
                              case A:
                                return "Profiler";
                              case N:
                                return "StrictMode";
                              case O:
                                return "Suspense";
                              case z:
                                return "SuspenseList";
                            }
                            if ("object" == typeof t)
                              switch (t.$$typeof) {
                                case R:
                                  return (
                                    (t.displayName || "Context") + ".Consumer"
                                  );
                                case L:
                                  return (
                                    (t._context.displayName || "Context") +
                                    ".Provider"
                                  );
                                case M:
                                  var n = t.render;
                                  return (
                                    (t = t.displayName) ||
                                      (t =
                                        "" !==
                                        (t = n.displayName || n.name || "")
                                          ? "ForwardRef(" + t + ")"
                                          : "ForwardRef"),
                                    t
                                  );
                                case j:
                                  return null !== (n = t.displayName || null)
                                    ? n
                                    : e(t.type) || "Memo";
                                case $:
                                  ((n = t._payload), (t = t._init));
                                  try {
                                    return e(t(n));
                                  } catch (e) {}
                              }
                            return null;
                          })(t);
                        case 8:
                          return t === N ? "StrictMode" : "Mode";
                        case 22:
                          return "Offscreen";
                        case 12:
                          return "Profiler";
                        case 21:
                          return "Scope";
                        case 13:
                          return "Suspense";
                        case 19:
                          return "SuspenseList";
                        case 25:
                          return "TracingMarker";
                        case 1:
                        case 0:
                        case 17:
                        case 2:
                        case 14:
                        case 15:
                          if ("function" == typeof t)
                            return t.displayName || t.name || null;
                          if ("string" == typeof t) return t;
                      }
                      return null;
                    })(e) || "Unknown",
                    a,
                  ),
                );
            return H({}, n, r);
          }
          function rZ(e) {
            return (
              (e =
                ((e = e.stateNode) &&
                  e.__reactInternalMemoizedMergedChildContext) ||
                rB),
              (rq = rW.current),
              rH(rW, e),
              rH(rV, rV.current),
              !0
            );
          }
          function r0(e, t, n) {
            var r = e.stateNode;
            if (!r) throw Error(d(169));
            (n
              ? ((e = rY(e, t, rq)),
                (r.__reactInternalMemoizedMergedChildContext = e),
                rG(rV),
                rG(rW),
                rH(rW, e))
              : rG(rV),
              rH(rV, n));
          }
          var r1 = null,
            r2 = !1,
            r3 = !1;
          function r4(e) {
            null === r1 ? (r1 = [e]) : r1.push(e);
          }
          function r5() {
            if (!r3 && null !== r1) {
              r3 = !0;
              var e = 0,
                t = tc;
              try {
                var n = r1;
                for (tc = 1; e < n.length; e++) {
                  var r = n[e];
                  do r = r(!0);
                  while (null !== r);
                }
                ((r1 = null), (r2 = !1));
              } catch (t) {
                throw (null !== r1 && (r1 = r1.slice(e + 1)), eX(e1, r5), t);
              } finally {
                ((tc = t), (r3 = !1));
              }
            }
            return null;
          }
          var r8 = [],
            r6 = 0,
            r9 = null,
            r7 = 0,
            ae = [],
            at = 0,
            an = null,
            ar = 1,
            aa = "";
          function al(e, t) {
            ((r8[r6++] = r7), (r8[r6++] = r9), (r9 = e), (r7 = t));
          }
          function ai(e, t, n) {
            ((ae[at++] = ar), (ae[at++] = aa), (ae[at++] = an), (an = e));
            var r = ar;
            e = aa;
            var a = 32 - e9(r) - 1;
            ((r &= ~(1 << a)), (n += 1));
            var l = 32 - e9(t) + a;
            if (30 < l) {
              var i = a - (a % 5);
              ((l = (r & ((1 << i) - 1)).toString(32)),
                (r >>= i),
                (a -= i),
                (ar = (1 << (32 - e9(t) + a)) | (n << a) | r),
                (aa = l + e));
            } else ((ar = (1 << l) | (n << a) | r), (aa = e));
          }
          function ao(e) {
            null !== e.return && (al(e, 1), ai(e, 1, 0));
          }
          function as(e) {
            for (; e === r9;)
              ((r9 = r8[--r6]),
                (r8[r6] = null),
                (r7 = r8[--r6]),
                (r8[r6] = null));
            for (; e === an;)
              ((an = ae[--at]),
                (ae[at] = null),
                (aa = ae[--at]),
                (ae[at] = null),
                (ar = ae[--at]),
                (ae[at] = null));
          }
          var au = null,
            ac = null,
            ad = !1,
            af = null;
          function ap(e, t) {
            var n = oX(5, null, null, 0);
            ((n.elementType = "DELETED"),
              (n.stateNode = t),
              (n.return = e),
              null === (t = e.deletions)
                ? ((e.deletions = [n]), (e.flags |= 16))
                : t.push(n));
          }
          function am(e, t) {
            switch (e.tag) {
              case 5:
                var n = e.type;
                return (
                  null !==
                    (t =
                      1 !== t.nodeType ||
                      n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t) &&
                  ((e.stateNode = t), (au = e), (ac = rE(t.firstChild)), !0)
                );
              case 6:
                return (
                  null !==
                    (t =
                      "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                  ((e.stateNode = t), (au = e), (ac = null), !0)
                );
              case 13:
                return (
                  null !== (t = 8 !== t.nodeType ? null : t) &&
                  ((n = null !== an ? { id: ar, overflow: aa } : null),
                  (e.memoizedState = {
                    dehydrated: t,
                    treeContext: n,
                    retryLane: 1073741824,
                  }),
                  ((n = oX(18, null, null, 0)).stateNode = t),
                  (n.return = e),
                  (e.child = n),
                  (au = e),
                  (ac = null),
                  !0)
                );
              default:
                return !1;
            }
          }
          function ah(e) {
            return 0 != (1 & e.mode) && 0 == (128 & e.flags);
          }
          function ag(e) {
            if (ad) {
              var t = ac;
              if (t) {
                var n = t;
                if (!am(e, t)) {
                  if (ah(e)) throw Error(d(418));
                  t = rE(n.nextSibling);
                  var r = au;
                  t && am(e, t)
                    ? ap(r, n)
                    : ((e.flags = (-4097 & e.flags) | 2), (ad = !1), (au = e));
                }
              } else {
                if (ah(e)) throw Error(d(418));
                ((e.flags = (-4097 & e.flags) | 2), (ad = !1), (au = e));
              }
            }
          }
          function ay(e) {
            for (
              e = e.return;
              null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;
            )
              e = e.return;
            au = e;
          }
          function av(e) {
            if (e !== au) return !1;
            if (!ad) return (ay(e), (ad = !0), !1);
            if (
              ((t = 3 !== e.tag) &&
                !(t = 5 !== e.tag) &&
                (t =
                  "head" !== (t = e.type) &&
                  "body" !== t &&
                  !rw(e.type, e.memoizedProps)),
              t && (t = ac))
            ) {
              if (ah(e)) throw (aw(), Error(d(418)));
              for (; t;) (ap(e, t), (t = rE(t.nextSibling)));
            }
            if ((ay(e), 13 === e.tag)) {
              if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
                throw Error(d(317));
              e: {
                for (t = 0, e = e.nextSibling; e;) {
                  if (8 === e.nodeType) {
                    var t,
                      n = e.data;
                    if ("/$" === n) {
                      if (0 === t) {
                        ac = rE(e.nextSibling);
                        break e;
                      }
                      t--;
                    } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
                  }
                  e = e.nextSibling;
                }
                ac = null;
              }
            } else ac = au ? rE(e.stateNode.nextSibling) : null;
            return !0;
          }
          function aw() {
            for (var e = ac; e;) e = rE(e.nextSibling);
          }
          function ab() {
            ((ac = au = null), (ad = !1));
          }
          function aS(e) {
            null === af ? (af = [e]) : af.push(e);
          }
          var ak = E.ReactCurrentBatchConfig;
          function a_(e, t) {
            if (e && e.defaultProps)
              for (var n in ((t = H({}, t)), (e = e.defaultProps)))
                void 0 === t[n] && (t[n] = e[n]);
            return t;
          }
          var ax = rF(null),
            aC = null,
            aE = null,
            aP = null;
          function aI() {
            aP = aE = aC = null;
          }
          function aT(e) {
            var t = ax.current;
            (rG(ax), (e._currentValue = t));
          }
          function aN(e, t, n) {
            for (; null !== e;) {
              var r = e.alternate;
              if (
                ((e.childLanes & t) !== t
                  ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                  : null !== r &&
                    (r.childLanes & t) !== t &&
                    (r.childLanes |= t),
                e === n)
              )
                break;
              e = e.return;
            }
          }
          function aA(e, t) {
            ((aC = e),
              (aP = aE = null),
              null !== (e = e.dependencies) &&
                null !== e.firstContext &&
                (0 != (e.lanes & t) && (io = !0), (e.firstContext = null)));
          }
          function aL(e) {
            var t = e._currentValue;
            if (aP !== e) {
              if (
                ((e = { context: e, memoizedValue: t, next: null }),
                null === aE)
              ) {
                if (null === aC) throw Error(d(308));
                ((aE = e), (aC.dependencies = { lanes: 0, firstContext: e }));
              } else aE = aE.next = e;
            }
            return t;
          }
          var aR = null;
          function aM(e) {
            null === aR ? (aR = [e]) : aR.push(e);
          }
          function aO(e, t, n, r) {
            var a = t.interleaved;
            return (
              null === a
                ? ((n.next = n), aM(t))
                : ((n.next = a.next), (a.next = n)),
              (t.interleaved = n),
              az(e, r)
            );
          }
          function az(e, t) {
            e.lanes |= t;
            var n = e.alternate;
            for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e;)
              ((e.childLanes |= t),
                null !== (n = e.alternate) && (n.childLanes |= t),
                (n = e),
                (e = e.return));
            return 3 === n.tag ? n.stateNode : null;
          }
          var aj = !1;
          function a$(e) {
            e.updateQueue = {
              baseState: e.memoizedState,
              firstBaseUpdate: null,
              lastBaseUpdate: null,
              shared: { pending: null, interleaved: null, lanes: 0 },
              effects: null,
            };
          }
          function aU(e, t) {
            ((e = e.updateQueue),
              t.updateQueue === e &&
                (t.updateQueue = {
                  baseState: e.baseState,
                  firstBaseUpdate: e.firstBaseUpdate,
                  lastBaseUpdate: e.lastBaseUpdate,
                  shared: e.shared,
                  effects: e.effects,
                }));
          }
          function aD(e, t) {
            return {
              eventTime: e,
              lane: t,
              tag: 0,
              payload: null,
              callback: null,
              next: null,
            };
          }
          function aF(e, t, n) {
            var r = e.updateQueue;
            if (null === r) return null;
            if (((r = r.shared), 0 != (2 & i5))) {
              var a = r.pending;
              return (
                null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
                (r.pending = t),
                az(e, n)
              );
            }
            return (
              null === (a = r.interleaved)
                ? ((t.next = t), aM(r))
                : ((t.next = a.next), (a.next = t)),
              (r.interleaved = t),
              az(e, n)
            );
          }
          function aG(e, t, n) {
            if (
              null !== (t = t.updateQueue) &&
              ((t = t.shared), 0 != (4194240 & n))
            ) {
              var r = t.lanes;
              ((r &= e.pendingLanes), (n |= r), (t.lanes = n), tu(e, n));
            }
          }
          function aH(e, t) {
            var n = e.updateQueue,
              r = e.alternate;
            if (null !== r && n === (r = r.updateQueue)) {
              var a = null,
                l = null;
              if (null !== (n = n.firstBaseUpdate)) {
                do {
                  var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                  };
                  (null === l ? (a = l = i) : (l = l.next = i), (n = n.next));
                } while (null !== n);
                null === l ? (a = l = t) : (l = l.next = t);
              } else a = l = t;
              ((n = {
                baseState: r.baseState,
                firstBaseUpdate: a,
                lastBaseUpdate: l,
                shared: r.shared,
                effects: r.effects,
              }),
                (e.updateQueue = n));
              return;
            }
            (null === (e = n.lastBaseUpdate)
              ? (n.firstBaseUpdate = t)
              : (e.next = t),
              (n.lastBaseUpdate = t));
          }
          function aB(e, t, n, r) {
            var a = e.updateQueue;
            aj = !1;
            var l = a.firstBaseUpdate,
              i = a.lastBaseUpdate,
              o = a.shared.pending;
            if (null !== o) {
              a.shared.pending = null;
              var s = o,
                u = s.next;
              ((s.next = null), null === i ? (l = u) : (i.next = u), (i = s));
              var c = e.alternate;
              null !== c &&
                (o = (c = c.updateQueue).lastBaseUpdate) !== i &&
                (null === o ? (c.firstBaseUpdate = u) : (o.next = u),
                (c.lastBaseUpdate = s));
            }
            if (null !== l) {
              var d = a.baseState;
              for (i = 0, c = u = s = null, o = l; ;) {
                var f = o.lane,
                  p = o.eventTime;
                if ((r & f) === f) {
                  null !== c &&
                    (c = c.next =
                      {
                        eventTime: p,
                        lane: 0,
                        tag: o.tag,
                        payload: o.payload,
                        callback: o.callback,
                        next: null,
                      });
                  e: {
                    var m = e,
                      h = o;
                    switch (((f = t), (p = n), h.tag)) {
                      case 1:
                        if ("function" == typeof (m = h.payload)) {
                          d = m.call(p, d, f);
                          break e;
                        }
                        d = m;
                        break e;
                      case 3:
                        m.flags = (-65537 & m.flags) | 128;
                      case 0:
                        if (
                          null ==
                          (f =
                            "function" == typeof (m = h.payload)
                              ? m.call(p, d, f)
                              : m)
                        )
                          break e;
                        d = H({}, d, f);
                        break e;
                      case 2:
                        aj = !0;
                    }
                  }
                  null !== o.callback &&
                    0 !== o.lane &&
                    ((e.flags |= 64),
                    null === (f = a.effects) ? (a.effects = [o]) : f.push(o));
                } else
                  ((p = {
                    eventTime: p,
                    lane: f,
                    tag: o.tag,
                    payload: o.payload,
                    callback: o.callback,
                    next: null,
                  }),
                    null === c ? ((u = c = p), (s = d)) : (c = c.next = p),
                    (i |= f));
                if (null === (o = o.next)) {
                  if (null === (o = a.shared.pending)) break;
                  ((o = (f = o).next),
                    (f.next = null),
                    (a.lastBaseUpdate = f),
                    (a.shared.pending = null));
                }
              }
              if (
                (null === c && (s = d),
                (a.baseState = s),
                (a.firstBaseUpdate = u),
                (a.lastBaseUpdate = c),
                null !== (t = a.shared.interleaved))
              ) {
                a = t;
                do ((i |= a.lane), (a = a.next));
                while (a !== t);
              } else null === l && (a.shared.lanes = 0);
              ((or |= i), (e.lanes = i), (e.memoizedState = d));
            }
          }
          function aW(e, t, n) {
            if (((e = t.effects), (t.effects = null), null !== e))
              for (t = 0; t < e.length; t++) {
                var r = e[t],
                  a = r.callback;
                if (null !== a) {
                  if (((r.callback = null), (r = n), "function" != typeof a))
                    throw Error(d(191, a));
                  a.call(r);
                }
              }
          }
          var aV = new u.Component().refs;
          function aq(e, t, n, r) {
            ((n = null == (n = n(r, (t = e.memoizedState))) ? t : H({}, t, n)),
              (e.memoizedState = n),
              0 === e.lanes && (e.updateQueue.baseState = n));
          }
          var aQ = {
            isMounted: function (e) {
              return !!(e = e._reactInternals) && eW(e) === e;
            },
            enqueueSetState: function (e, t, n) {
              e = e._reactInternals;
              var r = oS(),
                a = ok(e),
                l = aD(r, a);
              ((l.payload = t),
                null != n && (l.callback = n),
                null !== (t = aF(e, l, a)) && (o_(t, e, a, r), aG(t, e, a)));
            },
            enqueueReplaceState: function (e, t, n) {
              e = e._reactInternals;
              var r = oS(),
                a = ok(e),
                l = aD(r, a);
              ((l.tag = 1),
                (l.payload = t),
                null != n && (l.callback = n),
                null !== (t = aF(e, l, a)) && (o_(t, e, a, r), aG(t, e, a)));
            },
            enqueueForceUpdate: function (e, t) {
              e = e._reactInternals;
              var n = oS(),
                r = ok(e),
                a = aD(n, r);
              ((a.tag = 2),
                null != t && (a.callback = t),
                null !== (t = aF(e, a, r)) && (o_(t, e, r, n), aG(t, e, r)));
            },
          };
          function aX(e, t, n, r, a, l, i) {
            return "function" == typeof (e = e.stateNode).shouldComponentUpdate
              ? e.shouldComponentUpdate(r, l, i)
              : !t.prototype ||
                  !t.prototype.isPureReactComponent ||
                  !nj(n, r) ||
                  !nj(a, l);
          }
          function aK(e, t, n) {
            var r = !1,
              a = rB,
              l = t.contextType;
            return (
              "object" == typeof l && null !== l
                ? (l = aL(l))
                : ((a = rX(t) ? rq : rW.current),
                  (l = (r = null != (r = t.contextTypes)) ? rQ(e, a) : rB)),
              (t = new t(n, l)),
              (e.memoizedState =
                null !== t.state && void 0 !== t.state ? t.state : null),
              (t.updater = aQ),
              (e.stateNode = t),
              (t._reactInternals = e),
              r &&
                (((e =
                  e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a),
                (e.__reactInternalMemoizedMaskedChildContext = l)),
              t
            );
          }
          function aJ(e, t, n, r) {
            ((e = t.state),
              "function" == typeof t.componentWillReceiveProps &&
                t.componentWillReceiveProps(n, r),
              "function" == typeof t.UNSAFE_componentWillReceiveProps &&
                t.UNSAFE_componentWillReceiveProps(n, r),
              t.state !== e && aQ.enqueueReplaceState(t, t.state, null));
          }
          function aY(e, t, n, r) {
            var a = e.stateNode;
            ((a.props = n), (a.state = e.memoizedState), (a.refs = aV), a$(e));
            var l = t.contextType;
            ("object" == typeof l && null !== l
              ? (a.context = aL(l))
              : ((l = rX(t) ? rq : rW.current), (a.context = rQ(e, l))),
              (a.state = e.memoizedState),
              "function" == typeof (l = t.getDerivedStateFromProps) &&
                (aq(e, t, l, n), (a.state = e.memoizedState)),
              "function" == typeof t.getDerivedStateFromProps ||
                "function" == typeof a.getSnapshotBeforeUpdate ||
                ("function" != typeof a.UNSAFE_componentWillMount &&
                  "function" != typeof a.componentWillMount) ||
                ((t = a.state),
                "function" == typeof a.componentWillMount &&
                  a.componentWillMount(),
                "function" == typeof a.UNSAFE_componentWillMount &&
                  a.UNSAFE_componentWillMount(),
                t !== a.state && aQ.enqueueReplaceState(a, a.state, null),
                aB(e, n, a, r),
                (a.state = e.memoizedState)),
              "function" == typeof a.componentDidMount && (e.flags |= 4194308));
          }
          function aZ(e, t, n) {
            if (
              null !== (e = n.ref) &&
              "function" != typeof e &&
              "object" != typeof e
            ) {
              if (n._owner) {
                if ((n = n._owner)) {
                  if (1 !== n.tag) throw Error(d(309));
                  var r = n.stateNode;
                }
                if (!r) throw Error(d(147, e));
                var a = r,
                  l = "" + e;
                return null !== t &&
                  null !== t.ref &&
                  "function" == typeof t.ref &&
                  t.ref._stringRef === l
                  ? t.ref
                  : (((t = function (e) {
                      var t = a.refs;
                      (t === aV && (t = a.refs = {}),
                        null === e ? delete t[l] : (t[l] = e));
                    })._stringRef = l),
                    t);
              }
              if ("string" != typeof e) throw Error(d(284));
              if (!n._owner) throw Error(d(290, e));
            }
            return e;
          }
          function a0(e, t) {
            throw Error(
              d(
                31,
                "[object Object]" === (e = Object.prototype.toString.call(t))
                  ? "object with keys {" + Object.keys(t).join(", ") + "}"
                  : e,
              ),
            );
          }
          function a1(e) {
            return (0, e._init)(e._payload);
          }
          function a2(e) {
            function t(t, n) {
              if (e) {
                var r = t.deletions;
                null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
              }
            }
            function n(n, r) {
              if (!e) return null;
              for (; null !== r;) (t(n, r), (r = r.sibling));
              return null;
            }
            function r(e, t) {
              for (e = new Map(); null !== t;)
                (null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                  (t = t.sibling));
              return e;
            }
            function a(e, t) {
              return (((e = oJ(e, t)).index = 0), (e.sibling = null), e);
            }
            function l(t, n, r) {
              return ((t.index = r), e)
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 2), n)
                    : r
                  : ((t.flags |= 2), n)
                : ((t.flags |= 1048576), n);
            }
            function i(t) {
              return (e && null === t.alternate && (t.flags |= 2), t);
            }
            function o(e, t, n, r) {
              return (
                null === t || 6 !== t.tag
                  ? ((t = o1(n, e.mode, r)).return = e)
                  : ((t = a(t, n)).return = e),
                t
              );
            }
            function s(e, t, n, r) {
              var l = n.type;
              return l === T
                ? c(e, t, n.props.children, r, n.key)
                : (null !== t &&
                  (t.elementType === l ||
                    ("object" == typeof l &&
                      null !== l &&
                      l.$$typeof === $ &&
                      a1(l) === t.type))
                    ? ((r = a(t, n.props)).ref = aZ(e, t, n))
                    : ((r = oY(n.type, n.key, n.props, null, e.mode, r)).ref =
                        aZ(e, t, n)),
                  (r.return = e),
                  r);
            }
            function u(e, t, n, r) {
              return (
                null === t ||
                4 !== t.tag ||
                t.stateNode.containerInfo !== n.containerInfo ||
                t.stateNode.implementation !== n.implementation
                  ? ((t = o2(n, e.mode, r)).return = e)
                  : ((t = a(t, n.children || [])).return = e),
                t
              );
            }
            function c(e, t, n, r, l) {
              return (
                null === t || 7 !== t.tag
                  ? ((t = oZ(n, e.mode, r, l)).return = e)
                  : ((t = a(t, n)).return = e),
                t
              );
            }
            function f(e, t, n) {
              if (("string" == typeof t && "" !== t) || "number" == typeof t)
                return (((t = o1("" + t, e.mode, n)).return = e), t);
              if ("object" == typeof t && null !== t) {
                switch (t.$$typeof) {
                  case P:
                    return (
                      ((n = oY(t.type, t.key, t.props, null, e.mode, n)).ref =
                        aZ(e, null, t)),
                      (n.return = e),
                      n
                    );
                  case I:
                    return (((t = o2(t, e.mode, n)).return = e), t);
                  case $:
                    return f(e, (0, t._init)(t._payload), n);
                }
                if (ea(t) || F(t))
                  return (((t = oZ(t, e.mode, n, null)).return = e), t);
                a0(e, t);
              }
              return null;
            }
            function p(e, t, n, r) {
              var a = null !== t ? t.key : null;
              if (("string" == typeof n && "" !== n) || "number" == typeof n)
                return null !== a ? null : o(e, t, "" + n, r);
              if ("object" == typeof n && null !== n) {
                switch (n.$$typeof) {
                  case P:
                    return n.key === a ? s(e, t, n, r) : null;
                  case I:
                    return n.key === a ? u(e, t, n, r) : null;
                  case $:
                    return p(e, t, (a = n._init)(n._payload), r);
                }
                if (ea(n) || F(n))
                  return null !== a ? null : c(e, t, n, r, null);
                a0(e, n);
              }
              return null;
            }
            function m(e, t, n, r, a) {
              if (("string" == typeof r && "" !== r) || "number" == typeof r)
                return o(t, (e = e.get(n) || null), "" + r, a);
              if ("object" == typeof r && null !== r) {
                switch (r.$$typeof) {
                  case P:
                    return s(
                      t,
                      (e = e.get(null === r.key ? n : r.key) || null),
                      r,
                      a,
                    );
                  case I:
                    return u(
                      t,
                      (e = e.get(null === r.key ? n : r.key) || null),
                      r,
                      a,
                    );
                  case $:
                    return m(e, t, n, (0, r._init)(r._payload), a);
                }
                if (ea(r) || F(r))
                  return c(t, (e = e.get(n) || null), r, a, null);
                a0(t, r);
              }
              return null;
            }
            return function o(s, u, c, h) {
              if (
                ("object" == typeof c &&
                  null !== c &&
                  c.type === T &&
                  null === c.key &&
                  (c = c.props.children),
                "object" == typeof c && null !== c)
              ) {
                switch (c.$$typeof) {
                  case P:
                    e: {
                      for (var g = c.key, y = u; null !== y;) {
                        if (y.key === g) {
                          if ((g = c.type) === T) {
                            if (7 === y.tag) {
                              (n(s, y.sibling),
                                ((u = a(y, c.props.children)).return = s),
                                (s = u));
                              break e;
                            }
                          } else if (
                            y.elementType === g ||
                            ("object" == typeof g &&
                              null !== g &&
                              g.$$typeof === $ &&
                              a1(g) === y.type)
                          ) {
                            (n(s, y.sibling),
                              ((u = a(y, c.props)).ref = aZ(s, y, c)),
                              (u.return = s),
                              (s = u));
                            break e;
                          }
                          n(s, y);
                          break;
                        }
                        (t(s, y), (y = y.sibling));
                      }
                      c.type === T
                        ? (((u = oZ(
                            c.props.children,
                            s.mode,
                            h,
                            c.key,
                          )).return = s),
                          (s = u))
                        : (((h = oY(
                            c.type,
                            c.key,
                            c.props,
                            null,
                            s.mode,
                            h,
                          )).ref = aZ(s, u, c)),
                          (h.return = s),
                          (s = h));
                    }
                    return i(s);
                  case I:
                    e: {
                      for (y = c.key; null !== u;) {
                        if (u.key === y) {
                          if (
                            4 === u.tag &&
                            u.stateNode.containerInfo === c.containerInfo &&
                            u.stateNode.implementation === c.implementation
                          ) {
                            (n(s, u.sibling),
                              ((u = a(u, c.children || [])).return = s),
                              (s = u));
                            break e;
                          }
                          n(s, u);
                          break;
                        }
                        (t(s, u), (u = u.sibling));
                      }
                      (((u = o2(c, s.mode, h)).return = s), (s = u));
                    }
                    return i(s);
                  case $:
                    return o(s, u, (y = c._init)(c._payload), h);
                }
                if (ea(c))
                  return (function (a, i, o, s) {
                    for (
                      var u = null, c = null, d = i, h = (i = 0), g = null;
                      null !== d && h < o.length;
                      h++
                    ) {
                      d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
                      var y = p(a, d, o[h], s);
                      if (null === y) {
                        null === d && (d = g);
                        break;
                      }
                      (e && d && null === y.alternate && t(a, d),
                        (i = l(y, i, h)),
                        null === c ? (u = y) : (c.sibling = y),
                        (c = y),
                        (d = g));
                    }
                    if (h === o.length) return (n(a, d), ad && al(a, h), u);
                    if (null === d) {
                      for (; h < o.length; h++)
                        null !== (d = f(a, o[h], s)) &&
                          ((i = l(d, i, h)),
                          null === c ? (u = d) : (c.sibling = d),
                          (c = d));
                      return (ad && al(a, h), u);
                    }
                    for (d = r(a, d); h < o.length; h++)
                      null !== (g = m(d, a, h, o[h], s)) &&
                        (e &&
                          null !== g.alternate &&
                          d.delete(null === g.key ? h : g.key),
                        (i = l(g, i, h)),
                        null === c ? (u = g) : (c.sibling = g),
                        (c = g));
                    return (
                      e &&
                        d.forEach(function (e) {
                          return t(a, e);
                        }),
                      ad && al(a, h),
                      u
                    );
                  })(s, u, c, h);
                if (F(c))
                  return (function (a, i, o, s) {
                    var u = F(o);
                    if ("function" != typeof u) throw Error(d(150));
                    if (null == (o = u.call(o))) throw Error(d(151));
                    for (
                      var c = (u = null),
                        h = i,
                        g = (i = 0),
                        y = null,
                        v = o.next();
                      null !== h && !v.done;
                      g++, v = o.next()
                    ) {
                      h.index > g ? ((y = h), (h = null)) : (y = h.sibling);
                      var w = p(a, h, v.value, s);
                      if (null === w) {
                        null === h && (h = y);
                        break;
                      }
                      (e && h && null === w.alternate && t(a, h),
                        (i = l(w, i, g)),
                        null === c ? (u = w) : (c.sibling = w),
                        (c = w),
                        (h = y));
                    }
                    if (v.done) return (n(a, h), ad && al(a, g), u);
                    if (null === h) {
                      for (; !v.done; g++, v = o.next())
                        null !== (v = f(a, v.value, s)) &&
                          ((i = l(v, i, g)),
                          null === c ? (u = v) : (c.sibling = v),
                          (c = v));
                      return (ad && al(a, g), u);
                    }
                    for (h = r(a, h); !v.done; g++, v = o.next())
                      null !== (v = m(h, a, g, v.value, s)) &&
                        (e &&
                          null !== v.alternate &&
                          h.delete(null === v.key ? g : v.key),
                        (i = l(v, i, g)),
                        null === c ? (u = v) : (c.sibling = v),
                        (c = v));
                    return (
                      e &&
                        h.forEach(function (e) {
                          return t(a, e);
                        }),
                      ad && al(a, g),
                      u
                    );
                  })(s, u, c, h);
                a0(s, c);
              }
              return ("string" == typeof c && "" !== c) || "number" == typeof c
                ? ((c = "" + c),
                  null !== u && 6 === u.tag
                    ? (n(s, u.sibling), ((u = a(u, c)).return = s))
                    : (n(s, u), ((u = o1(c, s.mode, h)).return = s)),
                  i((s = u)))
                : n(s, u);
            };
          }
          var a3 = a2(!0),
            a4 = a2(!1),
            a5 = {},
            a8 = rF(a5),
            a6 = rF(a5),
            a9 = rF(a5);
          function a7(e) {
            if (e === a5) throw Error(d(174));
            return e;
          }
          function le(e, t) {
            switch ((rH(a9, t), rH(a6, e), rH(a8, a5), (e = t.nodeType))) {
              case 9:
              case 11:
                t = (t = t.documentElement) ? t.namespaceURI : ed(null, "");
                break;
              default:
                t = ed(
                  (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
                  (e = e.tagName),
                );
            }
            (rG(a8), rH(a8, t));
          }
          function lt() {
            (rG(a8), rG(a6), rG(a9));
          }
          function ln(e) {
            a7(a9.current);
            var t = a7(a8.current),
              n = ed(t, e.type);
            t !== n && (rH(a6, e), rH(a8, n));
          }
          function lr(e) {
            a6.current === e && (rG(a8), rG(a6));
          }
          var la = rF(0);
          function ll(e) {
            for (var t = e; null !== t;) {
              if (13 === t.tag) {
                var n = t.memoizedState;
                if (
                  null !== n &&
                  (null === (n = n.dehydrated) ||
                    "$?" === n.data ||
                    "$!" === n.data)
                )
                  return t;
              } else if (
                19 === t.tag &&
                void 0 !== t.memoizedProps.revealOrder
              ) {
                if (0 != (128 & t.flags)) return t;
              } else if (null !== t.child) {
                ((t.child.return = t), (t = t.child));
                continue;
              }
              if (t === e) break;
              for (; null === t.sibling;) {
                if (null === t.return || t.return === e) return null;
                t = t.return;
              }
              ((t.sibling.return = t.return), (t = t.sibling));
            }
            return null;
          }
          var li = [];
          function lo() {
            for (var e = 0; e < li.length; e++)
              li[e]._workInProgressVersionPrimary = null;
            li.length = 0;
          }
          var ls = E.ReactCurrentDispatcher,
            lu = E.ReactCurrentBatchConfig,
            lc = 0,
            ld = null,
            lf = null,
            lp = null,
            lm = !1,
            lh = !1,
            lg = 0,
            ly = 0;
          function lv() {
            throw Error(d(321));
          }
          function lw(e, t) {
            if (null === t) return !1;
            for (var n = 0; n < t.length && n < e.length; n++)
              if (!nz(e[n], t[n])) return !1;
            return !0;
          }
          function lb(e, t, n, r, a, l) {
            if (
              ((lc = l),
              (ld = t),
              (t.memoizedState = null),
              (t.updateQueue = null),
              (t.lanes = 0),
              (ls.current = null === e || null === e.memoizedState ? l3 : l4),
              (e = n(r, a)),
              lh)
            ) {
              l = 0;
              do {
                if (((lh = !1), (lg = 0), 25 <= l)) throw Error(d(301));
                ((l += 1),
                  (lp = lf = null),
                  (t.updateQueue = null),
                  (ls.current = l5),
                  (e = n(r, a)));
              } while (lh);
            }
            if (
              ((ls.current = l2),
              (t = null !== lf && null !== lf.next),
              (lc = 0),
              (lp = lf = ld = null),
              (lm = !1),
              t)
            )
              throw Error(d(300));
            return e;
          }
          function lS() {
            var e = 0 !== lg;
            return ((lg = 0), e);
          }
          function lk() {
            var e = {
              memoizedState: null,
              baseState: null,
              baseQueue: null,
              queue: null,
              next: null,
            };
            return (
              null === lp ? (ld.memoizedState = lp = e) : (lp = lp.next = e),
              lp
            );
          }
          function l_() {
            if (null === lf) {
              var e = ld.alternate;
              e = null !== e ? e.memoizedState : null;
            } else e = lf.next;
            var t = null === lp ? ld.memoizedState : lp.next;
            if (null !== t) ((lp = t), (lf = e));
            else {
              if (null === e) throw Error(d(310));
              ((e = {
                memoizedState: (lf = e).memoizedState,
                baseState: lf.baseState,
                baseQueue: lf.baseQueue,
                queue: lf.queue,
                next: null,
              }),
                null === lp ? (ld.memoizedState = lp = e) : (lp = lp.next = e));
            }
            return lp;
          }
          function lx(e, t) {
            return "function" == typeof t ? t(e) : t;
          }
          function lC(e) {
            var t = l_(),
              n = t.queue;
            if (null === n) throw Error(d(311));
            n.lastRenderedReducer = e;
            var r = lf,
              a = r.baseQueue,
              l = n.pending;
            if (null !== l) {
              if (null !== a) {
                var i = a.next;
                ((a.next = l.next), (l.next = i));
              }
              ((r.baseQueue = a = l), (n.pending = null));
            }
            if (null !== a) {
              ((l = a.next), (r = r.baseState));
              var o = (i = null),
                s = null,
                u = l;
              do {
                var c = u.lane;
                if ((lc & c) === c)
                  (null !== s &&
                    (s = s.next =
                      {
                        lane: 0,
                        action: u.action,
                        hasEagerState: u.hasEagerState,
                        eagerState: u.eagerState,
                        next: null,
                      }),
                    (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
                else {
                  var f = {
                    lane: c,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null,
                  };
                  (null === s ? ((o = s = f), (i = r)) : (s = s.next = f),
                    (ld.lanes |= c),
                    (or |= c));
                }
                u = u.next;
              } while (null !== u && u !== l);
              (null === s ? (i = r) : (s.next = o),
                nz(r, t.memoizedState) || (io = !0),
                (t.memoizedState = r),
                (t.baseState = i),
                (t.baseQueue = s),
                (n.lastRenderedState = r));
            }
            if (null !== (e = n.interleaved)) {
              a = e;
              do ((l = a.lane), (ld.lanes |= l), (or |= l), (a = a.next));
              while (a !== e);
            } else null === a && (n.lanes = 0);
            return [t.memoizedState, n.dispatch];
          }
          function lE(e) {
            var t = l_(),
              n = t.queue;
            if (null === n) throw Error(d(311));
            n.lastRenderedReducer = e;
            var r = n.dispatch,
              a = n.pending,
              l = t.memoizedState;
            if (null !== a) {
              n.pending = null;
              var i = (a = a.next);
              do ((l = e(l, i.action)), (i = i.next));
              while (i !== a);
              (nz(l, t.memoizedState) || (io = !0),
                (t.memoizedState = l),
                null === t.baseQueue && (t.baseState = l),
                (n.lastRenderedState = l));
            }
            return [l, r];
          }
          function lP() {}
          function lI(e, t) {
            var n = ld,
              r = l_(),
              a = t(),
              l = !nz(r.memoizedState, a);
            if (
              (l && ((r.memoizedState = a), (io = !0)),
              (r = r.queue),
              lD(lA.bind(null, n, r, e), [e]),
              r.getSnapshot !== t ||
                l ||
                (null !== lp && 1 & lp.memoizedState.tag))
            ) {
              if (
                ((n.flags |= 2048),
                lO(9, lN.bind(null, n, r, a, t), void 0, null),
                null === i8)
              )
                throw Error(d(349));
              0 != (30 & lc) || lT(n, t, a);
            }
            return a;
          }
          function lT(e, t, n) {
            ((e.flags |= 16384),
              (e = { getSnapshot: t, value: n }),
              null === (t = ld.updateQueue)
                ? ((t = { lastEffect: null, stores: null }),
                  (ld.updateQueue = t),
                  (t.stores = [e]))
                : null === (n = t.stores)
                  ? (t.stores = [e])
                  : n.push(e));
          }
          function lN(e, t, n, r) {
            ((t.value = n), (t.getSnapshot = r), lL(t) && lR(e));
          }
          function lA(e, t, n) {
            return n(function () {
              lL(t) && lR(e);
            });
          }
          function lL(e) {
            var t = e.getSnapshot;
            e = e.value;
            try {
              var n = t();
              return !nz(e, n);
            } catch (e) {
              return !0;
            }
          }
          function lR(e) {
            var t = az(e, 1);
            null !== t && o_(t, e, 1, -1);
          }
          function lM(e) {
            var t = lk();
            return (
              "function" == typeof e && (e = e()),
              (t.memoizedState = t.baseState = e),
              (e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: lx,
                lastRenderedState: e,
              }),
              (t.queue = e),
              (e = e.dispatch = lY.bind(null, ld, e)),
              [t.memoizedState, e]
            );
          }
          function lO(e, t, n, r) {
            return (
              (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
              null === (t = ld.updateQueue)
                ? ((t = { lastEffect: null, stores: null }),
                  (ld.updateQueue = t),
                  (t.lastEffect = e.next = e))
                : null === (n = t.lastEffect)
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e)),
              e
            );
          }
          function lz() {
            return l_().memoizedState;
          }
          function lj(e, t, n, r) {
            var a = lk();
            ((ld.flags |= e),
              (a.memoizedState = lO(
                1 | t,
                n,
                void 0,
                void 0 === r ? null : r,
              )));
          }
          function l$(e, t, n, r) {
            var a = l_();
            r = void 0 === r ? null : r;
            var l = void 0;
            if (null !== lf) {
              var i = lf.memoizedState;
              if (((l = i.destroy), null !== r && lw(r, i.deps))) {
                a.memoizedState = lO(t, n, l, r);
                return;
              }
            }
            ((ld.flags |= e), (a.memoizedState = lO(1 | t, n, l, r)));
          }
          function lU(e, t) {
            return lj(8390656, 8, e, t);
          }
          function lD(e, t) {
            return l$(2048, 8, e, t);
          }
          function lF(e, t) {
            return l$(4, 2, e, t);
          }
          function lG(e, t) {
            return l$(4, 4, e, t);
          }
          function lH(e, t) {
            return "function" == typeof t
              ? (t((e = e())),
                function () {
                  t(null);
                })
              : null != t
                ? ((e = e()),
                  (t.current = e),
                  function () {
                    t.current = null;
                  })
                : void 0;
          }
          function lB(e, t, n) {
            return (
              (n = null != n ? n.concat([e]) : null),
              l$(4, 4, lH.bind(null, t, e), n)
            );
          }
          function lW() {}
          function lV(e, t) {
            var n = l_();
            t = void 0 === t ? null : t;
            var r = n.memoizedState;
            return null !== r && null !== t && lw(t, r[1])
              ? r[0]
              : ((n.memoizedState = [e, t]), e);
          }
          function lq(e, t) {
            var n = l_();
            t = void 0 === t ? null : t;
            var r = n.memoizedState;
            return null !== r && null !== t && lw(t, r[1])
              ? r[0]
              : ((e = e()), (n.memoizedState = [e, t]), e);
          }
          function lQ(e, t, n) {
            return 0 == (21 & lc)
              ? (e.baseState && ((e.baseState = !1), (io = !0)),
                (e.memoizedState = n))
              : (nz(n, t) ||
                  ((n = ti()), (ld.lanes |= n), (or |= n), (e.baseState = !0)),
                t);
          }
          function lX(e, t) {
            var n = tc;
            ((tc = 0 !== n && 4 > n ? n : 4), e(!0));
            var r = lu.transition;
            lu.transition = {};
            try {
              (e(!1), t());
            } finally {
              ((tc = n), (lu.transition = r));
            }
          }
          function lK() {
            return l_().memoizedState;
          }
          function lJ(e, t, n) {
            var r = ok(e);
            ((n = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
              lZ(e)
                ? l0(t, n)
                : null !== (n = aO(e, t, n, r)) &&
                  (o_(n, e, r, oS()), l1(n, t, r)));
          }
          function lY(e, t, n) {
            var r = ok(e),
              a = {
                lane: r,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null,
              };
            if (lZ(e)) l0(t, a);
            else {
              var l = e.alternate;
              if (
                0 === e.lanes &&
                (null === l || 0 === l.lanes) &&
                null !== (l = t.lastRenderedReducer)
              )
                try {
                  var i = t.lastRenderedState,
                    o = l(i, n);
                  if (((a.hasEagerState = !0), (a.eagerState = o), nz(o, i))) {
                    var s = t.interleaved;
                    (null === s
                      ? ((a.next = a), aM(t))
                      : ((a.next = s.next), (s.next = a)),
                      (t.interleaved = a));
                    return;
                  }
                } catch (e) {
                } finally {
                }
              null !== (n = aO(e, t, a, r)) &&
                (o_(n, e, r, (a = oS())), l1(n, t, r));
            }
          }
          function lZ(e) {
            var t = e.alternate;
            return e === ld || (null !== t && t === ld);
          }
          function l0(e, t) {
            lh = lm = !0;
            var n = e.pending;
            (null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
              (e.pending = t));
          }
          function l1(e, t, n) {
            if (0 != (4194240 & n)) {
              var r = t.lanes;
              ((r &= e.pendingLanes), (n |= r), (t.lanes = n), tu(e, n));
            }
          }
          var l2 = {
              readContext: aL,
              useCallback: lv,
              useContext: lv,
              useEffect: lv,
              useImperativeHandle: lv,
              useInsertionEffect: lv,
              useLayoutEffect: lv,
              useMemo: lv,
              useReducer: lv,
              useRef: lv,
              useState: lv,
              useDebugValue: lv,
              useDeferredValue: lv,
              useTransition: lv,
              useMutableSource: lv,
              useSyncExternalStore: lv,
              useId: lv,
              unstable_isNewReconciler: !1,
            },
            l3 = {
              readContext: aL,
              useCallback: function (e, t) {
                return ((lk().memoizedState = [e, void 0 === t ? null : t]), e);
              },
              useContext: aL,
              useEffect: lU,
              useImperativeHandle: function (e, t, n) {
                return (
                  (n = null != n ? n.concat([e]) : null),
                  lj(4194308, 4, lH.bind(null, t, e), n)
                );
              },
              useLayoutEffect: function (e, t) {
                return lj(4194308, 4, e, t);
              },
              useInsertionEffect: function (e, t) {
                return lj(4, 2, e, t);
              },
              useMemo: function (e, t) {
                var n = lk();
                return (
                  (t = void 0 === t ? null : t),
                  (e = e()),
                  (n.memoizedState = [e, t]),
                  e
                );
              },
              useReducer: function (e, t, n) {
                var r = lk();
                return (
                  (t = void 0 !== n ? n(t) : t),
                  (r.memoizedState = r.baseState = t),
                  (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                  }),
                  (r.queue = e),
                  (e = e.dispatch = lJ.bind(null, ld, e)),
                  [r.memoizedState, e]
                );
              },
              useRef: function (e) {
                return ((e = { current: e }), (lk().memoizedState = e));
              },
              useState: lM,
              useDebugValue: lW,
              useDeferredValue: function (e) {
                return (lk().memoizedState = e);
              },
              useTransition: function () {
                var e = lM(!1),
                  t = e[0];
                return (
                  (e = lX.bind(null, e[1])),
                  (lk().memoizedState = e),
                  [t, e]
                );
              },
              useMutableSource: function () {},
              useSyncExternalStore: function (e, t, n) {
                var r = ld,
                  a = lk();
                if (ad) {
                  if (void 0 === n) throw Error(d(407));
                  n = n();
                } else {
                  if (((n = t()), null === i8)) throw Error(d(349));
                  0 != (30 & lc) || lT(r, t, n);
                }
                a.memoizedState = n;
                var l = { value: n, getSnapshot: t };
                return (
                  (a.queue = l),
                  lU(lA.bind(null, r, l, e), [e]),
                  (r.flags |= 2048),
                  lO(9, lN.bind(null, r, l, n, t), void 0, null),
                  n
                );
              },
              useId: function () {
                var e = lk(),
                  t = i8.identifierPrefix;
                if (ad) {
                  var n = aa,
                    r = ar;
                  ((t =
                    ":" +
                    t +
                    "R" +
                    (n = (r & ~(1 << (32 - e9(r) - 1))).toString(32) + n)),
                    0 < (n = lg++) && (t += "H" + n.toString(32)),
                    (t += ":"));
                } else t = ":" + t + "r" + (n = ly++).toString(32) + ":";
                return (e.memoizedState = t);
              },
              unstable_isNewReconciler: !1,
            },
            l4 = {
              readContext: aL,
              useCallback: lV,
              useContext: aL,
              useEffect: lD,
              useImperativeHandle: lB,
              useInsertionEffect: lF,
              useLayoutEffect: lG,
              useMemo: lq,
              useReducer: lC,
              useRef: lz,
              useState: function () {
                return lC(lx);
              },
              useDebugValue: lW,
              useDeferredValue: function (e) {
                return lQ(l_(), lf.memoizedState, e);
              },
              useTransition: function () {
                return [lC(lx)[0], l_().memoizedState];
              },
              useMutableSource: lP,
              useSyncExternalStore: lI,
              useId: lK,
              unstable_isNewReconciler: !1,
            },
            l5 = {
              readContext: aL,
              useCallback: lV,
              useContext: aL,
              useEffect: lD,
              useImperativeHandle: lB,
              useInsertionEffect: lF,
              useLayoutEffect: lG,
              useMemo: lq,
              useReducer: lE,
              useRef: lz,
              useState: function () {
                return lE(lx);
              },
              useDebugValue: lW,
              useDeferredValue: function (e) {
                var t = l_();
                return null === lf
                  ? (t.memoizedState = e)
                  : lQ(t, lf.memoizedState, e);
              },
              useTransition: function () {
                return [lE(lx)[0], l_().memoizedState];
              },
              useMutableSource: lP,
              useSyncExternalStore: lI,
              useId: lK,
              unstable_isNewReconciler: !1,
            };
          function l8(e, t) {
            try {
              var n = "",
                r = t;
              do
                ((n += (function (e) {
                  switch (e.tag) {
                    case 5:
                      return B(e.type);
                    case 16:
                      return B("Lazy");
                    case 13:
                      return B("Suspense");
                    case 19:
                      return B("SuspenseList");
                    case 0:
                    case 2:
                    case 15:
                      return (e = V(e.type, !1));
                    case 11:
                      return (e = V(e.type.render, !1));
                    case 1:
                      return (e = V(e.type, !0));
                    default:
                      return "";
                  }
                })(r)),
                  (r = r.return));
              while (r);
              var a = n;
            } catch (e) {
              a = "\nError generating stack: " + e.message + "\n" + e.stack;
            }
            return { value: e, source: t, stack: a, digest: null };
          }
          function l6(e, t, n) {
            return {
              value: e,
              source: null,
              stack: null != n ? n : null,
              digest: null != t ? t : null,
            };
          }
          function l9(e, t) {
            try {
              console.error(t.value);
            } catch (e) {
              setTimeout(function () {
                throw e;
              });
            }
          }
          var l7 = "function" == typeof WeakMap ? WeakMap : Map;
          function ie(e, t, n) {
            (((n = aD(-1, n)).tag = 3), (n.payload = { element: null }));
            var r = t.value;
            return (
              (n.callback = function () {
                (od || ((od = !0), (of = r)), l9(e, t));
              }),
              n
            );
          }
          function it(e, t, n) {
            (n = aD(-1, n)).tag = 3;
            var r = e.type.getDerivedStateFromError;
            if ("function" == typeof r) {
              var a = t.value;
              ((n.payload = function () {
                return r(a);
              }),
                (n.callback = function () {
                  l9(e, t);
                }));
            }
            var l = e.stateNode;
            return (
              null !== l &&
                "function" == typeof l.componentDidCatch &&
                (n.callback = function () {
                  (l9(e, t),
                    "function" != typeof r &&
                      (null === op ? (op = new Set([this])) : op.add(this)));
                  var n = t.stack;
                  this.componentDidCatch(t.value, {
                    componentStack: null !== n ? n : "",
                  });
                }),
              n
            );
          }
          function ir(e, t, n) {
            var r = e.pingCache;
            if (null === r) {
              r = e.pingCache = new l7();
              var a = new Set();
              r.set(t, a);
            } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
            a.has(n) || (a.add(n), (e = oB.bind(null, e, t, n)), t.then(e, e));
          }
          function ia(e) {
            do {
              var t;
              if (
                ((t = 13 === e.tag) &&
                  (t = null === (t = e.memoizedState) || null !== t.dehydrated),
                t)
              )
                return e;
              e = e.return;
            } while (null !== e);
            return null;
          }
          function il(e, t, n, r, a) {
            return (
              0 == (1 & e.mode)
                ? e === t
                  ? (e.flags |= 65536)
                  : ((e.flags |= 128),
                    (n.flags |= 131072),
                    (n.flags &= -52805),
                    1 === n.tag &&
                      (null === n.alternate
                        ? (n.tag = 17)
                        : (((t = aD(-1, 1)).tag = 2), aF(n, t, 1))),
                    (n.lanes |= 1))
                : ((e.flags |= 65536), (e.lanes = a)),
              e
            );
          }
          var ii = E.ReactCurrentOwner,
            io = !1;
          function is(e, t, n, r) {
            t.child = null === e ? a4(t, null, n, r) : a3(t, e.child, n, r);
          }
          function iu(e, t, n, r, a) {
            n = n.render;
            var l = t.ref;
            return (aA(t, a),
            (r = lb(e, t, n, r, l, a)),
            (n = lS()),
            null === e || io)
              ? (ad && n && ao(t), (t.flags |= 1), is(e, t, r, a), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~a),
                iT(e, t, a));
          }
          function ic(e, t, n, r, a) {
            if (null === e) {
              var l = n.type;
              return "function" != typeof l ||
                oK(l) ||
                void 0 !== l.defaultProps ||
                null !== n.compare ||
                void 0 !== n.defaultProps
                ? (((e = oY(n.type, null, r, t, t.mode, a)).ref = t.ref),
                  (e.return = t),
                  (t.child = e))
                : ((t.tag = 15), (t.type = l), id(e, t, l, r, a));
            }
            if (((l = e.child), 0 == (e.lanes & a))) {
              var i = l.memoizedProps;
              if (
                (n = null !== (n = n.compare) ? n : nj)(i, r) &&
                e.ref === t.ref
              )
                return iT(e, t, a);
            }
            return (
              (t.flags |= 1),
              ((e = oJ(l, r)).ref = t.ref),
              (e.return = t),
              (t.child = e)
            );
          }
          function id(e, t, n, r, a) {
            if (null !== e) {
              var l = e.memoizedProps;
              if (nj(l, r) && e.ref === t.ref) {
                if (((io = !1), (t.pendingProps = r = l), 0 == (e.lanes & a)))
                  return ((t.lanes = e.lanes), iT(e, t, a));
                0 != (131072 & e.flags) && (io = !0);
              }
            }
            return ih(e, t, n, r, a);
          }
          function ip(e, t, n) {
            var r = t.pendingProps,
              a = r.children,
              l = null !== e ? e.memoizedState : null;
            if ("hidden" === r.mode) {
              if (0 == (1 & t.mode))
                ((t.memoizedState = {
                  baseLanes: 0,
                  cachePool: null,
                  transitions: null,
                }),
                  rH(oe, i7),
                  (i7 |= n));
              else {
                if (0 == (1073741824 & n))
                  return (
                    (e = null !== l ? l.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                      baseLanes: e,
                      cachePool: null,
                      transitions: null,
                    }),
                    (t.updateQueue = null),
                    rH(oe, i7),
                    (i7 |= e),
                    null
                  );
                ((t.memoizedState = {
                  baseLanes: 0,
                  cachePool: null,
                  transitions: null,
                }),
                  (r = null !== l ? l.baseLanes : n),
                  rH(oe, i7),
                  (i7 |= r));
              }
            } else
              (null !== l
                ? ((r = l.baseLanes | n), (t.memoizedState = null))
                : (r = n),
                rH(oe, i7),
                (i7 |= r));
            return (is(e, t, a, n), t.child);
          }
          function im(e, t) {
            var n = t.ref;
            ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
              ((t.flags |= 512), (t.flags |= 2097152));
          }
          function ih(e, t, n, r, a) {
            var l = rX(n) ? rq : rW.current;
            return ((l = rQ(t, l)),
            aA(t, a),
            (n = lb(e, t, n, r, l, a)),
            (r = lS()),
            null === e || io)
              ? (ad && r && ao(t), (t.flags |= 1), is(e, t, n, a), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~a),
                iT(e, t, a));
          }
          function ig(e, t, n, r, a) {
            if (rX(n)) {
              var l = !0;
              rZ(t);
            } else l = !1;
            if ((aA(t, a), null === t.stateNode))
              (iI(e, t), aK(t, n, r), aY(t, n, r, a), (r = !0));
            else if (null === e) {
              var i = t.stateNode,
                o = t.memoizedProps;
              i.props = o;
              var s = i.context,
                u = n.contextType;
              u =
                "object" == typeof u && null !== u
                  ? aL(u)
                  : rQ(t, (u = rX(n) ? rq : rW.current));
              var c = n.getDerivedStateFromProps,
                d =
                  "function" == typeof c ||
                  "function" == typeof i.getSnapshotBeforeUpdate;
              (d ||
                ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
                  "function" != typeof i.componentWillReceiveProps) ||
                ((o !== r || s !== u) && aJ(t, i, r, u)),
                (aj = !1));
              var f = t.memoizedState;
              ((i.state = f),
                aB(t, r, i, a),
                (s = t.memoizedState),
                o !== r || f !== s || rV.current || aj
                  ? ("function" == typeof c &&
                      (aq(t, n, c, r), (s = t.memoizedState)),
                    (o = aj || aX(t, n, o, r, f, s, u))
                      ? (d ||
                          ("function" != typeof i.UNSAFE_componentWillMount &&
                            "function" != typeof i.componentWillMount) ||
                          ("function" == typeof i.componentWillMount &&
                            i.componentWillMount(),
                          "function" == typeof i.UNSAFE_componentWillMount &&
                            i.UNSAFE_componentWillMount()),
                        "function" == typeof i.componentDidMount &&
                          (t.flags |= 4194308))
                      : ("function" == typeof i.componentDidMount &&
                          (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = s)),
                    (i.props = r),
                    (i.state = s),
                    (i.context = u),
                    (r = o))
                  : ("function" == typeof i.componentDidMount &&
                      (t.flags |= 4194308),
                    (r = !1)));
            } else {
              ((i = t.stateNode),
                aU(e, t),
                (o = t.memoizedProps),
                (u = t.type === t.elementType ? o : a_(t.type, o)),
                (i.props = u),
                (d = t.pendingProps),
                (f = i.context),
                (s =
                  "object" == typeof (s = n.contextType) && null !== s
                    ? aL(s)
                    : rQ(t, (s = rX(n) ? rq : rW.current))));
              var p = n.getDerivedStateFromProps;
              ((c =
                "function" == typeof p ||
                "function" == typeof i.getSnapshotBeforeUpdate) ||
                ("function" != typeof i.UNSAFE_componentWillReceiveProps &&
                  "function" != typeof i.componentWillReceiveProps) ||
                ((o !== d || f !== s) && aJ(t, i, r, s)),
                (aj = !1),
                (f = t.memoizedState),
                (i.state = f),
                aB(t, r, i, a));
              var m = t.memoizedState;
              o !== d || f !== m || rV.current || aj
                ? ("function" == typeof p &&
                    (aq(t, n, p, r), (m = t.memoizedState)),
                  (u = aj || aX(t, n, u, r, f, m, s) || !1)
                    ? (c ||
                        ("function" != typeof i.UNSAFE_componentWillUpdate &&
                          "function" != typeof i.componentWillUpdate) ||
                        ("function" == typeof i.componentWillUpdate &&
                          i.componentWillUpdate(r, m, s),
                        "function" == typeof i.UNSAFE_componentWillUpdate &&
                          i.UNSAFE_componentWillUpdate(r, m, s)),
                      "function" == typeof i.componentDidUpdate &&
                        (t.flags |= 4),
                      "function" == typeof i.getSnapshotBeforeUpdate &&
                        (t.flags |= 1024))
                    : ("function" != typeof i.componentDidUpdate ||
                        (o === e.memoizedProps && f === e.memoizedState) ||
                        (t.flags |= 4),
                      "function" != typeof i.getSnapshotBeforeUpdate ||
                        (o === e.memoizedProps && f === e.memoizedState) ||
                        (t.flags |= 1024),
                      (t.memoizedProps = r),
                      (t.memoizedState = m)),
                  (i.props = r),
                  (i.state = m),
                  (i.context = s),
                  (r = u))
                : ("function" != typeof i.componentDidUpdate ||
                    (o === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 4),
                  "function" != typeof i.getSnapshotBeforeUpdate ||
                    (o === e.memoizedProps && f === e.memoizedState) ||
                    (t.flags |= 1024),
                  (r = !1));
            }
            return iy(e, t, n, r, l, a);
          }
          function iy(e, t, n, r, a, l) {
            im(e, t);
            var i = 0 != (128 & t.flags);
            if (!r && !i) return (a && r0(t, n, !1), iT(e, t, l));
            ((r = t.stateNode), (ii.current = t));
            var o =
              i && "function" != typeof n.getDerivedStateFromError
                ? null
                : r.render();
            return (
              (t.flags |= 1),
              null !== e && i
                ? ((t.child = a3(t, e.child, null, l)),
                  (t.child = a3(t, null, o, l)))
                : is(e, t, o, l),
              (t.memoizedState = r.state),
              a && r0(t, n, !0),
              t.child
            );
          }
          function iv(e) {
            var t = e.stateNode;
            (t.pendingContext
              ? rJ(e, t.pendingContext, t.pendingContext !== t.context)
              : t.context && rJ(e, t.context, !1),
              le(e, t.containerInfo));
          }
          function iw(e, t, n, r, a) {
            return (ab(), aS(a), (t.flags |= 256), is(e, t, n, r), t.child);
          }
          var ib = { dehydrated: null, treeContext: null, retryLane: 0 };
          function iS(e) {
            return { baseLanes: e, cachePool: null, transitions: null };
          }
          function ik(e, t, n) {
            var r,
              a = t.pendingProps,
              l = la.current,
              i = !1,
              o = 0 != (128 & t.flags);
            if (
              ((r = o) ||
                (r = (null === e || null !== e.memoizedState) && 0 != (2 & l)),
              r
                ? ((i = !0), (t.flags &= -129))
                : (null === e || null !== e.memoizedState) && (l |= 1),
              rH(la, 1 & l),
              null === e)
            )
              return (ag(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated))
                ? (0 == (1 & t.mode)
                    ? (t.lanes = 1)
                    : "$!" === e.data
                      ? (t.lanes = 8)
                      : (t.lanes = 1073741824),
                  null)
                : ((o = a.children),
                  (e = a.fallback),
                  i
                    ? ((a = t.mode),
                      (i = t.child),
                      (o = { mode: "hidden", children: o }),
                      0 == (1 & a) && null !== i
                        ? ((i.childLanes = 0), (i.pendingProps = o))
                        : (i = o0(o, a, 0, null)),
                      (e = oZ(e, a, n, null)),
                      (i.return = t),
                      (e.return = t),
                      (i.sibling = e),
                      (t.child = i),
                      (t.child.memoizedState = iS(n)),
                      (t.memoizedState = ib),
                      e)
                    : i_(t, o));
            if (null !== (l = e.memoizedState) && null !== (r = l.dehydrated))
              return (function (e, t, n, r, a, l, i) {
                if (n)
                  return 256 & t.flags
                    ? ((t.flags &= -257), ix(e, t, i, (r = l6(Error(d(422))))))
                    : null !== t.memoizedState
                      ? ((t.child = e.child), (t.flags |= 128), null)
                      : ((l = r.fallback),
                        (a = t.mode),
                        (r = o0(
                          { mode: "visible", children: r.children },
                          a,
                          0,
                          null,
                        )),
                        (l = oZ(l, a, i, null)),
                        (l.flags |= 2),
                        (r.return = t),
                        (l.return = t),
                        (r.sibling = l),
                        (t.child = r),
                        0 != (1 & t.mode) && a3(t, e.child, null, i),
                        (t.child.memoizedState = iS(i)),
                        (t.memoizedState = ib),
                        l);
                if (0 == (1 & t.mode)) return ix(e, t, i, null);
                if ("$!" === a.data) {
                  if ((r = a.nextSibling && a.nextSibling.dataset))
                    var o = r.dgst;
                  return (
                    (r = o),
                    ix(e, t, i, (r = l6((l = Error(d(419))), r, void 0)))
                  );
                }
                if (((o = 0 != (i & e.childLanes)), io || o)) {
                  if (null !== (r = i8)) {
                    switch (i & -i) {
                      case 4:
                        a = 2;
                        break;
                      case 16:
                        a = 8;
                        break;
                      case 64:
                      case 128:
                      case 256:
                      case 512:
                      case 1024:
                      case 2048:
                      case 4096:
                      case 8192:
                      case 16384:
                      case 32768:
                      case 65536:
                      case 131072:
                      case 262144:
                      case 524288:
                      case 1048576:
                      case 2097152:
                      case 4194304:
                      case 8388608:
                      case 16777216:
                      case 33554432:
                      case 67108864:
                        a = 32;
                        break;
                      case 536870912:
                        a = 268435456;
                        break;
                      default:
                        a = 0;
                    }
                    0 !== (a = 0 != (a & (r.suspendedLanes | i)) ? 0 : a) &&
                      a !== l.retryLane &&
                      ((l.retryLane = a), az(e, a), o_(r, e, a, -1));
                  }
                  return (oz(), ix(e, t, i, (r = l6(Error(d(421))))));
                }
                return "$?" === a.data
                  ? ((t.flags |= 128),
                    (t.child = e.child),
                    (t = oV.bind(null, e)),
                    (a._reactRetry = t),
                    null)
                  : ((e = l.treeContext),
                    (ac = rE(a.nextSibling)),
                    (au = t),
                    (ad = !0),
                    (af = null),
                    null !== e &&
                      ((ae[at++] = ar),
                      (ae[at++] = aa),
                      (ae[at++] = an),
                      (ar = e.id),
                      (aa = e.overflow),
                      (an = t)),
                    (t = i_(t, r.children)),
                    (t.flags |= 4096),
                    t);
              })(e, t, o, a, r, l, n);
            if (i) {
              ((i = a.fallback), (o = t.mode), (r = (l = e.child).sibling));
              var s = { mode: "hidden", children: a.children };
              return (
                0 == (1 & o) && t.child !== l
                  ? (((a = t.child).childLanes = 0),
                    (a.pendingProps = s),
                    (t.deletions = null))
                  : ((a = oJ(l, s)).subtreeFlags = 14680064 & l.subtreeFlags),
                null !== r
                  ? (i = oJ(r, i))
                  : ((i = oZ(i, o, n, null)), (i.flags |= 2)),
                (i.return = t),
                (a.return = t),
                (a.sibling = i),
                (t.child = a),
                (a = i),
                (i = t.child),
                (o =
                  null === (o = e.child.memoizedState)
                    ? iS(n)
                    : {
                        baseLanes: o.baseLanes | n,
                        cachePool: null,
                        transitions: o.transitions,
                      }),
                (i.memoizedState = o),
                (i.childLanes = e.childLanes & ~n),
                (t.memoizedState = ib),
                a
              );
            }
            return (
              (e = (i = e.child).sibling),
              (a = oJ(i, { mode: "visible", children: a.children })),
              0 == (1 & t.mode) && (a.lanes = n),
              (a.return = t),
              (a.sibling = null),
              null !== e &&
                (null === (n = t.deletions)
                  ? ((t.deletions = [e]), (t.flags |= 16))
                  : n.push(e)),
              (t.child = a),
              (t.memoizedState = null),
              a
            );
          }
          function i_(e, t) {
            return (
              ((t = o0(
                { mode: "visible", children: t },
                e.mode,
                0,
                null,
              )).return = e),
              (e.child = t)
            );
          }
          function ix(e, t, n, r) {
            return (
              null !== r && aS(r),
              a3(t, e.child, null, n),
              (e = i_(t, t.pendingProps.children)),
              (e.flags |= 2),
              (t.memoizedState = null),
              e
            );
          }
          function iC(e, t, n) {
            e.lanes |= t;
            var r = e.alternate;
            (null !== r && (r.lanes |= t), aN(e.return, t, n));
          }
          function iE(e, t, n, r, a) {
            var l = e.memoizedState;
            null === l
              ? (e.memoizedState = {
                  isBackwards: t,
                  rendering: null,
                  renderingStartTime: 0,
                  last: r,
                  tail: n,
                  tailMode: a,
                })
              : ((l.isBackwards = t),
                (l.rendering = null),
                (l.renderingStartTime = 0),
                (l.last = r),
                (l.tail = n),
                (l.tailMode = a));
          }
          function iP(e, t, n) {
            var r = t.pendingProps,
              a = r.revealOrder,
              l = r.tail;
            if ((is(e, t, r.children, n), 0 != (2 & (r = la.current))))
              ((r = (1 & r) | 2), (t.flags |= 128));
            else {
              if (null !== e && 0 != (128 & e.flags))
                e: for (e = t.child; null !== e;) {
                  if (13 === e.tag) null !== e.memoizedState && iC(e, n, t);
                  else if (19 === e.tag) iC(e, n, t);
                  else if (null !== e.child) {
                    ((e.child.return = e), (e = e.child));
                    continue;
                  }
                  if (e === t) break;
                  for (; null === e.sibling;) {
                    if (null === e.return || e.return === t) break e;
                    e = e.return;
                  }
                  ((e.sibling.return = e.return), (e = e.sibling));
                }
              r &= 1;
            }
            if ((rH(la, r), 0 == (1 & t.mode))) t.memoizedState = null;
            else
              switch (a) {
                case "forwards":
                  for (a = null, n = t.child; null !== n;)
                    (null !== (e = n.alternate) && null === ll(e) && (a = n),
                      (n = n.sibling));
                  (null === (n = a)
                    ? ((a = t.child), (t.child = null))
                    : ((a = n.sibling), (n.sibling = null)),
                    iE(t, !1, a, n, l));
                  break;
                case "backwards":
                  for (n = null, a = t.child, t.child = null; null !== a;) {
                    if (null !== (e = a.alternate) && null === ll(e)) {
                      t.child = a;
                      break;
                    }
                    ((e = a.sibling), (a.sibling = n), (n = a), (a = e));
                  }
                  iE(t, !0, n, null, l);
                  break;
                case "together":
                  iE(t, !1, null, null, void 0);
                  break;
                default:
                  t.memoizedState = null;
              }
            return t.child;
          }
          function iI(e, t) {
            0 == (1 & t.mode) &&
              null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
          }
          function iT(e, t, n) {
            if (
              (null !== e && (t.dependencies = e.dependencies),
              (or |= t.lanes),
              0 == (n & t.childLanes))
            )
              return null;
            if (null !== e && t.child !== e.child) throw Error(d(153));
            if (null !== t.child) {
              for (
                n = oJ((e = t.child), e.pendingProps),
                  t.child = n,
                  n.return = t;
                null !== e.sibling;
              )
                ((e = e.sibling),
                  ((n = n.sibling = oJ(e, e.pendingProps)).return = t));
              n.sibling = null;
            }
            return t.child;
          }
          function iN(e, t) {
            if (!ad)
              switch (e.tailMode) {
                case "hidden":
                  t = e.tail;
                  for (var n = null; null !== t;)
                    (null !== t.alternate && (n = t), (t = t.sibling));
                  null === n ? (e.tail = null) : (n.sibling = null);
                  break;
                case "collapsed":
                  n = e.tail;
                  for (var r = null; null !== n;)
                    (null !== n.alternate && (r = n), (n = n.sibling));
                  null === r
                    ? t || null === e.tail
                      ? (e.tail = null)
                      : (e.tail.sibling = null)
                    : (r.sibling = null);
              }
          }
          function iA(e) {
            var t = null !== e.alternate && e.alternate.child === e.child,
              n = 0,
              r = 0;
            if (t)
              for (var a = e.child; null !== a;)
                ((n |= a.lanes | a.childLanes),
                  (r |= 14680064 & a.subtreeFlags),
                  (r |= 14680064 & a.flags),
                  (a.return = e),
                  (a = a.sibling));
            else
              for (a = e.child; null !== a;)
                ((n |= a.lanes | a.childLanes),
                  (r |= a.subtreeFlags),
                  (r |= a.flags),
                  (a.return = e),
                  (a = a.sibling));
            return ((e.subtreeFlags |= r), (e.childLanes = n), t);
          }
          ((a = function (e, t) {
            for (var n = t.child; null !== n;) {
              if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
              else if (4 !== n.tag && null !== n.child) {
                ((n.child.return = n), (n = n.child));
                continue;
              }
              if (n === t) break;
              for (; null === n.sibling;) {
                if (null === n.return || n.return === t) return;
                n = n.return;
              }
              ((n.sibling.return = n.return), (n = n.sibling));
            }
          }),
            (l = function () {}),
            (i = function (e, t, n, r) {
              var a = e.memoizedProps;
              if (a !== r) {
                ((e = t.stateNode), a7(a8.current));
                var l,
                  i = null;
                switch (n) {
                  case "input":
                    ((a = Y(e, a)), (r = Y(e, r)), (i = []));
                    break;
                  case "select":
                    ((a = H({}, a, { value: void 0 })),
                      (r = H({}, r, { value: void 0 })),
                      (i = []));
                    break;
                  case "textarea":
                    ((a = ei(e, a)), (r = ei(e, r)), (i = []));
                    break;
                  default:
                    "function" != typeof a.onClick &&
                      "function" == typeof r.onClick &&
                      (e.onclick = rg);
                }
                for (u in (eS(n, r), (n = null), a))
                  if (
                    !r.hasOwnProperty(u) &&
                    a.hasOwnProperty(u) &&
                    null != a[u]
                  ) {
                    if ("style" === u) {
                      var o = a[u];
                      for (l in o)
                        o.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
                    } else
                      "dangerouslySetInnerHTML" !== u &&
                        "children" !== u &&
                        "suppressContentEditableWarning" !== u &&
                        "suppressHydrationWarning" !== u &&
                        "autoFocus" !== u &&
                        (p.hasOwnProperty(u)
                          ? i || (i = [])
                          : (i = i || []).push(u, null));
                  }
                for (u in r) {
                  var s = r[u];
                  if (
                    ((o = null != a ? a[u] : void 0),
                    r.hasOwnProperty(u) && s !== o && (null != s || null != o))
                  ) {
                    if ("style" === u) {
                      if (o) {
                        for (l in o)
                          !o.hasOwnProperty(l) ||
                            (s && s.hasOwnProperty(l)) ||
                            (n || (n = {}), (n[l] = ""));
                        for (l in s)
                          s.hasOwnProperty(l) &&
                            o[l] !== s[l] &&
                            (n || (n = {}), (n[l] = s[l]));
                      } else (n || (i || (i = []), i.push(u, n)), (n = s));
                    } else
                      "dangerouslySetInnerHTML" === u
                        ? ((s = s ? s.__html : void 0),
                          (o = o ? o.__html : void 0),
                          null != s && o !== s && (i = i || []).push(u, s))
                        : "children" === u
                          ? ("string" != typeof s && "number" != typeof s) ||
                            (i = i || []).push(u, "" + s)
                          : "suppressContentEditableWarning" !== u &&
                            "suppressHydrationWarning" !== u &&
                            (p.hasOwnProperty(u)
                              ? (null != s &&
                                  "onScroll" === u &&
                                  rn("scroll", e),
                                i || o === s || (i = []))
                              : (i = i || []).push(u, s));
                  }
                }
                n && (i = i || []).push("style", n);
                var u = i;
                (t.updateQueue = u) && (t.flags |= 4);
              }
            }),
            (o = function (e, t, n, r) {
              n !== r && (t.flags |= 4);
            }));
          var iL = !1,
            iR = !1,
            iM = "function" == typeof WeakSet ? WeakSet : Set,
            iO = null;
          function iz(e, t) {
            var n = e.ref;
            if (null !== n) {
              if ("function" == typeof n)
                try {
                  n(null);
                } catch (n) {
                  oH(e, t, n);
                }
              else n.current = null;
            }
          }
          function ij(e, t, n) {
            try {
              n();
            } catch (n) {
              oH(e, t, n);
            }
          }
          var i$ = !1;
          function iU(e, t, n) {
            var r = t.updateQueue;
            if (null !== (r = null !== r ? r.lastEffect : null)) {
              var a = (r = r.next);
              do {
                if ((a.tag & e) === e) {
                  var l = a.destroy;
                  ((a.destroy = void 0), void 0 !== l && ij(t, n, l));
                }
                a = a.next;
              } while (a !== r);
            }
          }
          function iD(e, t) {
            if (
              null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)
            ) {
              var n = (t = t.next);
              do {
                if ((n.tag & e) === e) {
                  var r = n.create;
                  n.destroy = r();
                }
                n = n.next;
              } while (n !== t);
            }
          }
          function iF(e) {
            var t = e.ref;
            if (null !== t) {
              var n = e.stateNode;
              (e.tag, (e = n), "function" == typeof t ? t(e) : (t.current = e));
            }
          }
          function iG(e) {
            return 5 === e.tag || 3 === e.tag || 4 === e.tag;
          }
          function iH(e) {
            e: for (;;) {
              for (; null === e.sibling;) {
                if (null === e.return || iG(e.return)) return null;
                e = e.return;
              }
              for (
                e.sibling.return = e.return, e = e.sibling;
                5 !== e.tag && 6 !== e.tag && 18 !== e.tag;
              ) {
                if (2 & e.flags || null === e.child || 4 === e.tag) continue e;
                ((e.child.return = e), (e = e.child));
              }
              if (!(2 & e.flags)) return e.stateNode;
            }
          }
          var iB = null,
            iW = !1;
          function iV(e, t, n) {
            for (n = n.child; null !== n;) (iq(e, t, n), (n = n.sibling));
          }
          function iq(e, t, n) {
            if (e6 && "function" == typeof e6.onCommitFiberUnmount)
              try {
                e6.onCommitFiberUnmount(e8, n);
              } catch (e) {}
            switch (n.tag) {
              case 5:
                iR || iz(n, t);
              case 6:
                var r = iB,
                  a = iW;
                ((iB = null),
                  iV(e, t, n),
                  (iB = r),
                  (iW = a),
                  null !== iB &&
                    (iW
                      ? ((e = iB),
                        (n = n.stateNode),
                        8 === e.nodeType
                          ? e.parentNode.removeChild(n)
                          : e.removeChild(n))
                      : iB.removeChild(n.stateNode)));
                break;
              case 18:
                null !== iB &&
                  (iW
                    ? ((e = iB),
                      (n = n.stateNode),
                      8 === e.nodeType
                        ? rC(e.parentNode, n)
                        : 1 === e.nodeType && rC(e, n),
                      tR(e))
                    : rC(iB, n.stateNode));
                break;
              case 4:
                ((r = iB),
                  (a = iW),
                  (iB = n.stateNode.containerInfo),
                  (iW = !0),
                  iV(e, t, n),
                  (iB = r),
                  (iW = a));
                break;
              case 0:
              case 11:
              case 14:
              case 15:
                if (
                  !iR &&
                  null !== (r = n.updateQueue) &&
                  null !== (r = r.lastEffect)
                ) {
                  a = r = r.next;
                  do {
                    var l = a,
                      i = l.destroy;
                    ((l = l.tag),
                      void 0 !== i &&
                        (0 != (2 & l)
                          ? ij(n, t, i)
                          : 0 != (4 & l) && ij(n, t, i)),
                      (a = a.next));
                  } while (a !== r);
                }
                iV(e, t, n);
                break;
              case 1:
                if (
                  !iR &&
                  (iz(n, t),
                  "function" == typeof (r = n.stateNode).componentWillUnmount)
                )
                  try {
                    ((r.props = n.memoizedProps),
                      (r.state = n.memoizedState),
                      r.componentWillUnmount());
                  } catch (e) {
                    oH(n, t, e);
                  }
                iV(e, t, n);
                break;
              case 21:
              default:
                iV(e, t, n);
                break;
              case 22:
                1 & n.mode
                  ? ((iR = (r = iR) || null !== n.memoizedState),
                    iV(e, t, n),
                    (iR = r))
                  : iV(e, t, n);
            }
          }
          function iQ(e) {
            var t = e.updateQueue;
            if (null !== t) {
              e.updateQueue = null;
              var n = e.stateNode;
              (null === n && (n = e.stateNode = new iM()),
                t.forEach(function (t) {
                  var r = oq.bind(null, e, t);
                  n.has(t) || (n.add(t), t.then(r, r));
                }));
            }
          }
          function iX(e, t) {
            var n = t.deletions;
            if (null !== n)
              for (var r = 0; r < n.length; r++) {
                var a = n[r];
                try {
                  var l = t,
                    i = l;
                  e: for (; null !== i;) {
                    switch (i.tag) {
                      case 5:
                        ((iB = i.stateNode), (iW = !1));
                        break e;
                      case 3:
                      case 4:
                        ((iB = i.stateNode.containerInfo), (iW = !0));
                        break e;
                    }
                    i = i.return;
                  }
                  if (null === iB) throw Error(d(160));
                  (iq(e, l, a), (iB = null), (iW = !1));
                  var o = a.alternate;
                  (null !== o && (o.return = null), (a.return = null));
                } catch (e) {
                  oH(a, t, e);
                }
              }
            if (12854 & t.subtreeFlags)
              for (t = t.child; null !== t;) (iK(t, e), (t = t.sibling));
          }
          function iK(e, t) {
            var n = e.alternate,
              r = e.flags;
            switch (e.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                if ((iX(t, e), iJ(e), 4 & r)) {
                  try {
                    (iU(3, e, e.return), iD(3, e));
                  } catch (t) {
                    oH(e, e.return, t);
                  }
                  try {
                    iU(5, e, e.return);
                  } catch (t) {
                    oH(e, e.return, t);
                  }
                }
                break;
              case 1:
                (iX(t, e), iJ(e), 512 & r && null !== n && iz(n, n.return));
                break;
              case 5:
                if (
                  (iX(t, e),
                  iJ(e),
                  512 & r && null !== n && iz(n, n.return),
                  32 & e.flags)
                ) {
                  var a = e.stateNode;
                  try {
                    eh(a, "");
                  } catch (t) {
                    oH(e, e.return, t);
                  }
                }
                if (4 & r && null != (a = e.stateNode)) {
                  var l = e.memoizedProps,
                    i = null !== n ? n.memoizedProps : l,
                    o = e.type,
                    s = e.updateQueue;
                  if (((e.updateQueue = null), null !== s))
                    try {
                      ("input" === o &&
                        "radio" === l.type &&
                        null != l.name &&
                        ee(a, l),
                        ek(o, i));
                      var u = ek(o, l);
                      for (i = 0; i < s.length; i += 2) {
                        var c = s[i],
                          f = s[i + 1];
                        "style" === c
                          ? ew(a, f)
                          : "dangerouslySetInnerHTML" === c
                            ? em(a, f)
                            : "children" === c
                              ? eh(a, f)
                              : C(a, c, f, u);
                      }
                      switch (o) {
                        case "input":
                          et(a, l);
                          break;
                        case "textarea":
                          es(a, l);
                          break;
                        case "select":
                          var p = a._wrapperState.wasMultiple;
                          a._wrapperState.wasMultiple = !!l.multiple;
                          var m = l.value;
                          null != m
                            ? el(a, !!l.multiple, m, !1)
                            : !!l.multiple !== p &&
                              (null != l.defaultValue
                                ? el(a, !!l.multiple, l.defaultValue, !0)
                                : el(
                                    a,
                                    !!l.multiple,
                                    l.multiple ? [] : "",
                                    !1,
                                  ));
                      }
                      a[rN] = l;
                    } catch (t) {
                      oH(e, e.return, t);
                    }
                }
                break;
              case 6:
                if ((iX(t, e), iJ(e), 4 & r)) {
                  if (null === e.stateNode) throw Error(d(162));
                  ((a = e.stateNode), (l = e.memoizedProps));
                  try {
                    a.nodeValue = l;
                  } catch (t) {
                    oH(e, e.return, t);
                  }
                }
                break;
              case 3:
                if (
                  (iX(t, e),
                  iJ(e),
                  4 & r && null !== n && n.memoizedState.isDehydrated)
                )
                  try {
                    tR(t.containerInfo);
                  } catch (t) {
                    oH(e, e.return, t);
                  }
                break;
              case 4:
              default:
                (iX(t, e), iJ(e));
                break;
              case 13:
                (iX(t, e),
                  iJ(e),
                  8192 & (a = e.child).flags &&
                    ((l = null !== a.memoizedState),
                    (a.stateNode.isHidden = l),
                    l &&
                      (null === a.alternate ||
                        null === a.alternate.memoizedState) &&
                      (os = eZ())),
                  4 & r && iQ(e));
                break;
              case 22:
                if (
                  ((c = null !== n && null !== n.memoizedState),
                  1 & e.mode
                    ? ((iR = (u = iR) || c), iX(t, e), (iR = u))
                    : iX(t, e),
                  iJ(e),
                  8192 & r)
                ) {
                  if (
                    ((u = null !== e.memoizedState),
                    (e.stateNode.isHidden = u) && !c && 0 != (1 & e.mode))
                  )
                    for (iO = e, c = e.child; null !== c;) {
                      for (f = iO = c; null !== iO;) {
                        switch (((m = (p = iO).child), p.tag)) {
                          case 0:
                          case 11:
                          case 14:
                          case 15:
                            iU(4, p, p.return);
                            break;
                          case 1:
                            iz(p, p.return);
                            var h = p.stateNode;
                            if ("function" == typeof h.componentWillUnmount) {
                              ((r = p), (n = p.return));
                              try {
                                ((t = r),
                                  (h.props = t.memoizedProps),
                                  (h.state = t.memoizedState),
                                  h.componentWillUnmount());
                              } catch (e) {
                                oH(r, n, e);
                              }
                            }
                            break;
                          case 5:
                            iz(p, p.return);
                            break;
                          case 22:
                            if (null !== p.memoizedState) {
                              iZ(f);
                              continue;
                            }
                        }
                        null !== m ? ((m.return = p), (iO = m)) : iZ(f);
                      }
                      c = c.sibling;
                    }
                  e: for (c = null, f = e; ;) {
                    if (5 === f.tag) {
                      if (null === c) {
                        c = f;
                        try {
                          ((a = f.stateNode),
                            u
                              ? ((l = a.style),
                                "function" == typeof l.setProperty
                                  ? l.setProperty(
                                      "display",
                                      "none",
                                      "important",
                                    )
                                  : (l.display = "none"))
                              : ((o = f.stateNode),
                                (i =
                                  null != (s = f.memoizedProps.style) &&
                                  s.hasOwnProperty("display")
                                    ? s.display
                                    : null),
                                (o.style.display = ev("display", i))));
                        } catch (t) {
                          oH(e, e.return, t);
                        }
                      }
                    } else if (6 === f.tag) {
                      if (null === c)
                        try {
                          f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                        } catch (t) {
                          oH(e, e.return, t);
                        }
                    } else if (
                      ((22 !== f.tag && 23 !== f.tag) ||
                        null === f.memoizedState ||
                        f === e) &&
                      null !== f.child
                    ) {
                      ((f.child.return = f), (f = f.child));
                      continue;
                    }
                    if (f === e) break;
                    for (; null === f.sibling;) {
                      if (null === f.return || f.return === e) break e;
                      (c === f && (c = null), (f = f.return));
                    }
                    (c === f && (c = null),
                      (f.sibling.return = f.return),
                      (f = f.sibling));
                  }
                }
                break;
              case 19:
                (iX(t, e), iJ(e), 4 & r && iQ(e));
              case 21:
            }
          }
          function iJ(e) {
            var t = e.flags;
            if (2 & t) {
              try {
                e: {
                  for (var n = e.return; null !== n;) {
                    if (iG(n)) {
                      var r = n;
                      break e;
                    }
                    n = n.return;
                  }
                  throw Error(d(160));
                }
                switch (r.tag) {
                  case 5:
                    var a = r.stateNode;
                    32 & r.flags && (eh(a, ""), (r.flags &= -33));
                    var l = iH(e);
                    !(function e(t, n, r) {
                      var a = t.tag;
                      if (5 === a || 6 === a)
                        ((t = t.stateNode),
                          n ? r.insertBefore(t, n) : r.appendChild(t));
                      else if (4 !== a && null !== (t = t.child))
                        for (e(t, n, r), t = t.sibling; null !== t;)
                          (e(t, n, r), (t = t.sibling));
                    })(e, l, a);
                    break;
                  case 3:
                  case 4:
                    var i = r.stateNode.containerInfo,
                      o = iH(e);
                    !(function e(t, n, r) {
                      var a = t.tag;
                      if (5 === a || 6 === a)
                        ((t = t.stateNode),
                          n
                            ? 8 === r.nodeType
                              ? r.parentNode.insertBefore(t, n)
                              : r.insertBefore(t, n)
                            : (8 === r.nodeType
                                ? (n = r.parentNode).insertBefore(t, r)
                                : (n = r).appendChild(t),
                              null != (r = r._reactRootContainer) ||
                                null !== n.onclick ||
                                (n.onclick = rg)));
                      else if (4 !== a && null !== (t = t.child))
                        for (e(t, n, r), t = t.sibling; null !== t;)
                          (e(t, n, r), (t = t.sibling));
                    })(e, o, i);
                    break;
                  default:
                    throw Error(d(161));
                }
              } catch (t) {
                oH(e, e.return, t);
              }
              e.flags &= -3;
            }
            4096 & t && (e.flags &= -4097);
          }
          function iY(e) {
            for (; null !== iO;) {
              var t = iO;
              if (0 != (8772 & t.flags)) {
                var n = t.alternate;
                try {
                  if (0 != (8772 & t.flags))
                    switch (t.tag) {
                      case 0:
                      case 11:
                      case 15:
                        iR || iD(5, t);
                        break;
                      case 1:
                        var r = t.stateNode;
                        if (4 & t.flags && !iR) {
                          if (null === n) r.componentDidMount();
                          else {
                            var a =
                              t.elementType === t.type
                                ? n.memoizedProps
                                : a_(t.type, n.memoizedProps);
                            r.componentDidUpdate(
                              a,
                              n.memoizedState,
                              r.__reactInternalSnapshotBeforeUpdate,
                            );
                          }
                        }
                        var l = t.updateQueue;
                        null !== l && aW(t, l, r);
                        break;
                      case 3:
                        var i = t.updateQueue;
                        if (null !== i) {
                          if (((n = null), null !== t.child))
                            switch (t.child.tag) {
                              case 5:
                              case 1:
                                n = t.child.stateNode;
                            }
                          aW(t, i, n);
                        }
                        break;
                      case 5:
                        var o = t.stateNode;
                        if (null === n && 4 & t.flags) {
                          n = o;
                          var s = t.memoizedProps;
                          switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                              s.autoFocus && n.focus();
                              break;
                            case "img":
                              s.src && (n.src = s.src);
                          }
                        }
                        break;
                      case 6:
                      case 4:
                      case 12:
                      case 19:
                      case 17:
                      case 21:
                      case 22:
                      case 23:
                      case 25:
                        break;
                      case 13:
                        if (null === t.memoizedState) {
                          var u = t.alternate;
                          if (null !== u) {
                            var c = u.memoizedState;
                            if (null !== c) {
                              var f = c.dehydrated;
                              null !== f && tR(f);
                            }
                          }
                        }
                        break;
                      default:
                        throw Error(d(163));
                    }
                  iR || (512 & t.flags && iF(t));
                } catch (e) {
                  oH(t, t.return, e);
                }
              }
              if (t === e) {
                iO = null;
                break;
              }
              if (null !== (n = t.sibling)) {
                ((n.return = t.return), (iO = n));
                break;
              }
              iO = t.return;
            }
          }
          function iZ(e) {
            for (; null !== iO;) {
              var t = iO;
              if (t === e) {
                iO = null;
                break;
              }
              var n = t.sibling;
              if (null !== n) {
                ((n.return = t.return), (iO = n));
                break;
              }
              iO = t.return;
            }
          }
          function i0(e) {
            for (; null !== iO;) {
              var t = iO;
              try {
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    var n = t.return;
                    try {
                      iD(4, t);
                    } catch (e) {
                      oH(t, n, e);
                    }
                    break;
                  case 1:
                    var r = t.stateNode;
                    if ("function" == typeof r.componentDidMount) {
                      var a = t.return;
                      try {
                        r.componentDidMount();
                      } catch (e) {
                        oH(t, a, e);
                      }
                    }
                    var l = t.return;
                    try {
                      iF(t);
                    } catch (e) {
                      oH(t, l, e);
                    }
                    break;
                  case 5:
                    var i = t.return;
                    try {
                      iF(t);
                    } catch (e) {
                      oH(t, i, e);
                    }
                }
              } catch (e) {
                oH(t, t.return, e);
              }
              if (t === e) {
                iO = null;
                break;
              }
              var o = t.sibling;
              if (null !== o) {
                ((o.return = t.return), (iO = o));
                break;
              }
              iO = t.return;
            }
          }
          var i1 = Math.ceil,
            i2 = E.ReactCurrentDispatcher,
            i3 = E.ReactCurrentOwner,
            i4 = E.ReactCurrentBatchConfig,
            i5 = 0,
            i8 = null,
            i6 = null,
            i9 = 0,
            i7 = 0,
            oe = rF(0),
            ot = 0,
            on = null,
            or = 0,
            oa = 0,
            ol = 0,
            oi = null,
            oo = null,
            os = 0,
            ou = 1 / 0,
            oc = null,
            od = !1,
            of = null,
            op = null,
            om = !1,
            oh = null,
            og = 0,
            oy = 0,
            ov = null,
            ow = -1,
            ob = 0;
          function oS() {
            return 0 != (6 & i5) ? eZ() : -1 !== ow ? ow : (ow = eZ());
          }
          function ok(e) {
            return 0 == (1 & e.mode)
              ? 1
              : 0 != (2 & i5) && 0 !== i9
                ? i9 & -i9
                : null !== ak.transition
                  ? (0 === ob && (ob = ti()), ob)
                  : 0 !== (e = tc)
                    ? e
                    : (e = void 0 === (e = window.event) ? 16 : tF(e.type));
          }
          function o_(e, t, n, r) {
            if (50 < oy) throw ((oy = 0), (ov = null), Error(d(185)));
            (ts(e, n, r),
              (0 == (2 & i5) || e !== i8) &&
                (e === i8 &&
                  (0 == (2 & i5) && (oa |= n), 4 === ot && oI(e, i9)),
                ox(e, r),
                1 === n &&
                  0 === i5 &&
                  0 == (1 & t.mode) &&
                  ((ou = eZ() + 500), r2 && r5())));
          }
          function ox(e, t) {
            var n,
              r,
              a,
              l = e.callbackNode;
            !(function (e, t) {
              for (
                var n = e.suspendedLanes,
                  r = e.pingedLanes,
                  a = e.expirationTimes,
                  l = e.pendingLanes;
                0 < l;
              ) {
                var i = 31 - e9(l),
                  o = 1 << i,
                  s = a[i];
                (-1 === s
                  ? (0 == (o & n) || 0 != (o & r)) &&
                    (a[i] = (function (e, t) {
                      switch (e) {
                        case 1:
                        case 2:
                        case 4:
                          return t + 250;
                        case 8:
                        case 16:
                        case 32:
                        case 64:
                        case 128:
                        case 256:
                        case 512:
                        case 1024:
                        case 2048:
                        case 4096:
                        case 8192:
                        case 16384:
                        case 32768:
                        case 65536:
                        case 131072:
                        case 262144:
                        case 524288:
                        case 1048576:
                        case 2097152:
                          return t + 5e3;
                        default:
                          return -1;
                      }
                    })(o, t))
                  : s <= t && (e.expiredLanes |= o),
                  (l &= ~o));
              }
            })(e, t);
            var i = ta(e, e === i8 ? i9 : 0);
            if (0 === i)
              (null !== l && eK(l),
                (e.callbackNode = null),
                (e.callbackPriority = 0));
            else if (((t = i & -i), e.callbackPriority !== t)) {
              if ((null != l && eK(l), 1 === t))
                (0 === e.tag
                  ? ((a = oT.bind(null, e)), (r2 = !0), r4(a))
                  : r4(oT.bind(null, e)),
                  r_(function () {
                    0 == (6 & i5) && r5();
                  }),
                  (l = null));
              else {
                switch (td(i)) {
                  case 1:
                    l = e1;
                    break;
                  case 4:
                    l = e2;
                    break;
                  case 16:
                  default:
                    l = e3;
                    break;
                  case 536870912:
                    l = e5;
                }
                l = eX(l, oC.bind(null, e));
              }
              ((e.callbackPriority = t), (e.callbackNode = l));
            }
          }
          function oC(e, t) {
            if (((ow = -1), (ob = 0), 0 != (6 & i5))) throw Error(d(327));
            var n = e.callbackNode;
            if (oF() && e.callbackNode !== n) return null;
            var r = ta(e, e === i8 ? i9 : 0);
            if (0 === r) return null;
            if (0 != (30 & r) || 0 != (r & e.expiredLanes) || t) t = oj(e, r);
            else {
              t = r;
              var a = i5;
              i5 |= 2;
              var l = oO();
              for (
                (i8 !== e || i9 !== t) &&
                ((oc = null), (ou = eZ() + 500), oR(e, t));
                ;
              )
                try {
                  (function () {
                    for (; null !== i6 && !eJ();) o$(i6);
                  })();
                  break;
                } catch (t) {
                  oM(e, t);
                }
              (aI(),
                (i2.current = l),
                (i5 = a),
                null !== i6 ? (t = 0) : ((i8 = null), (i9 = 0), (t = ot)));
            }
            if (0 !== t) {
              if (
                (2 === t && 0 !== (a = tl(e)) && ((r = a), (t = oE(e, a))),
                1 === t)
              )
                throw ((n = on), oR(e, 0), oI(e, r), ox(e, eZ()), n);
              if (6 === t) oI(e, r);
              else {
                if (
                  ((a = e.current.alternate),
                  0 == (30 & r) &&
                    !(function (e) {
                      for (var t = e; ;) {
                        if (16384 & t.flags) {
                          var n = t.updateQueue;
                          if (null !== n && null !== (n = n.stores))
                            for (var r = 0; r < n.length; r++) {
                              var a = n[r],
                                l = a.getSnapshot;
                              a = a.value;
                              try {
                                if (!nz(l(), a)) return !1;
                              } catch (e) {
                                return !1;
                              }
                            }
                        }
                        if (
                          ((n = t.child), 16384 & t.subtreeFlags && null !== n)
                        )
                          ((n.return = t), (t = n));
                        else {
                          if (t === e) break;
                          for (; null === t.sibling;) {
                            if (null === t.return || t.return === e) return !0;
                            t = t.return;
                          }
                          ((t.sibling.return = t.return), (t = t.sibling));
                        }
                      }
                      return !0;
                    })(a) &&
                    (2 === (t = oj(e, r)) &&
                      0 !== (l = tl(e)) &&
                      ((r = l), (t = oE(e, l))),
                    1 === t))
                )
                  throw ((n = on), oR(e, 0), oI(e, r), ox(e, eZ()), n);
                switch (((e.finishedWork = a), (e.finishedLanes = r), t)) {
                  case 0:
                  case 1:
                    throw Error(d(345));
                  case 2:
                  case 5:
                    oD(e, oo, oc);
                    break;
                  case 3:
                    if (
                      (oI(e, r),
                      (130023424 & r) === r && 10 < (t = os + 500 - eZ()))
                    ) {
                      if (0 !== ta(e, 0)) break;
                      if (((a = e.suspendedLanes) & r) !== r) {
                        (oS(), (e.pingedLanes |= e.suspendedLanes & a));
                        break;
                      }
                      e.timeoutHandle = rb(oD.bind(null, e, oo, oc), t);
                      break;
                    }
                    oD(e, oo, oc);
                    break;
                  case 4:
                    if ((oI(e, r), (4194240 & r) === r)) break;
                    for (a = -1, t = e.eventTimes; 0 < r;) {
                      var i = 31 - e9(r);
                      ((l = 1 << i), (i = t[i]) > a && (a = i), (r &= ~l));
                    }
                    if (
                      ((r = a),
                      10 <
                        (r =
                          (120 > (r = eZ() - r)
                            ? 120
                            : 480 > r
                              ? 480
                              : 1080 > r
                                ? 1080
                                : 1920 > r
                                  ? 1920
                                  : 3e3 > r
                                    ? 3e3
                                    : 4320 > r
                                      ? 4320
                                      : 1960 * i1(r / 1960)) - r))
                    ) {
                      e.timeoutHandle = rb(oD.bind(null, e, oo, oc), r);
                      break;
                    }
                    oD(e, oo, oc);
                    break;
                  default:
                    throw Error(d(329));
                }
              }
            }
            return (
              ox(e, eZ()),
              e.callbackNode === n ? oC.bind(null, e) : null
            );
          }
          function oE(e, t) {
            var n = oi;
            return (
              e.current.memoizedState.isDehydrated && (oR(e, t).flags |= 256),
              2 !== (e = oj(e, t)) && ((t = oo), (oo = n), null !== t && oP(t)),
              e
            );
          }
          function oP(e) {
            null === oo ? (oo = e) : oo.push.apply(oo, e);
          }
          function oI(e, t) {
            for (
              t &= ~ol,
                t &= ~oa,
                e.suspendedLanes |= t,
                e.pingedLanes &= ~t,
                e = e.expirationTimes;
              0 < t;
            ) {
              var n = 31 - e9(t),
                r = 1 << n;
              ((e[n] = -1), (t &= ~r));
            }
          }
          function oT(e) {
            if (0 != (6 & i5)) throw Error(d(327));
            oF();
            var t = ta(e, 0);
            if (0 == (1 & t)) return (ox(e, eZ()), null);
            var n = oj(e, t);
            if (0 !== e.tag && 2 === n) {
              var r = tl(e);
              0 !== r && ((t = r), (n = oE(e, r)));
            }
            if (1 === n) throw ((n = on), oR(e, 0), oI(e, t), ox(e, eZ()), n);
            if (6 === n) throw Error(d(345));
            return (
              (e.finishedWork = e.current.alternate),
              (e.finishedLanes = t),
              oD(e, oo, oc),
              ox(e, eZ()),
              null
            );
          }
          function oN(e, t) {
            var n = i5;
            i5 |= 1;
            try {
              return e(t);
            } finally {
              0 === (i5 = n) && ((ou = eZ() + 500), r2 && r5());
            }
          }
          function oA(e) {
            null !== oh && 0 === oh.tag && 0 == (6 & i5) && oF();
            var t = i5;
            i5 |= 1;
            var n = i4.transition,
              r = tc;
            try {
              if (((i4.transition = null), (tc = 1), e)) return e();
            } finally {
              ((tc = r), (i4.transition = n), 0 == (6 & (i5 = t)) && r5());
            }
          }
          function oL() {
            ((i7 = oe.current), rG(oe));
          }
          function oR(e, t) {
            ((e.finishedWork = null), (e.finishedLanes = 0));
            var n = e.timeoutHandle;
            if ((-1 !== n && ((e.timeoutHandle = -1), rS(n)), null !== i6))
              for (n = i6.return; null !== n;) {
                var r = n;
                switch ((as(r), r.tag)) {
                  case 1:
                    null != (r = r.type.childContextTypes) && rK();
                    break;
                  case 3:
                    (lt(), rG(rV), rG(rW), lo());
                    break;
                  case 5:
                    lr(r);
                    break;
                  case 4:
                    lt();
                    break;
                  case 13:
                  case 19:
                    rG(la);
                    break;
                  case 10:
                    aT(r.type._context);
                    break;
                  case 22:
                  case 23:
                    oL();
                }
                n = n.return;
              }
            if (
              ((i8 = e),
              (i6 = e = oJ(e.current, null)),
              (i9 = i7 = t),
              (ot = 0),
              (on = null),
              (ol = oa = or = 0),
              (oo = oi = null),
              null !== aR)
            ) {
              for (t = 0; t < aR.length; t++)
                if (null !== (r = (n = aR[t]).interleaved)) {
                  n.interleaved = null;
                  var a = r.next,
                    l = n.pending;
                  if (null !== l) {
                    var i = l.next;
                    ((l.next = a), (r.next = i));
                  }
                  n.pending = r;
                }
              aR = null;
            }
            return e;
          }
          function oM(e, t) {
            for (;;) {
              var n = i6;
              try {
                if ((aI(), (ls.current = l2), lm)) {
                  for (var r = ld.memoizedState; null !== r;) {
                    var a = r.queue;
                    (null !== a && (a.pending = null), (r = r.next));
                  }
                  lm = !1;
                }
                if (
                  ((lc = 0),
                  (lp = lf = ld = null),
                  (lh = !1),
                  (lg = 0),
                  (i3.current = null),
                  null === n || null === n.return)
                ) {
                  ((ot = 1), (on = t), (i6 = null));
                  break;
                }
                e: {
                  var l = e,
                    i = n.return,
                    o = n,
                    s = t;
                  if (
                    ((t = i9),
                    (o.flags |= 32768),
                    null !== s &&
                      "object" == typeof s &&
                      "function" == typeof s.then)
                  ) {
                    var u = s,
                      c = o,
                      f = c.tag;
                    if (
                      0 == (1 & c.mode) &&
                      (0 === f || 11 === f || 15 === f)
                    ) {
                      var p = c.alternate;
                      p
                        ? ((c.updateQueue = p.updateQueue),
                          (c.memoizedState = p.memoizedState),
                          (c.lanes = p.lanes))
                        : ((c.updateQueue = null), (c.memoizedState = null));
                    }
                    var m = ia(i);
                    if (null !== m) {
                      ((m.flags &= -257),
                        il(m, i, o, l, t),
                        1 & m.mode && ir(l, u, t),
                        (t = m),
                        (s = u));
                      var h = t.updateQueue;
                      if (null === h) {
                        var g = new Set();
                        (g.add(s), (t.updateQueue = g));
                      } else h.add(s);
                      break e;
                    }
                    if (0 == (1 & t)) {
                      (ir(l, u, t), oz());
                      break e;
                    }
                    s = Error(d(426));
                  } else if (ad && 1 & o.mode) {
                    var y = ia(i);
                    if (null !== y) {
                      (0 == (65536 & y.flags) && (y.flags |= 256),
                        il(y, i, o, l, t),
                        aS(l8(s, o)));
                      break e;
                    }
                  }
                  ((l = s = l8(s, o)),
                    4 !== ot && (ot = 2),
                    null === oi ? (oi = [l]) : oi.push(l),
                    (l = i));
                  do {
                    switch (l.tag) {
                      case 3:
                        ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                        var v = ie(l, s, t);
                        aH(l, v);
                        break e;
                      case 1:
                        o = s;
                        var w = l.type,
                          b = l.stateNode;
                        if (
                          0 == (128 & l.flags) &&
                          ("function" == typeof w.getDerivedStateFromError ||
                            (null !== b &&
                              "function" == typeof b.componentDidCatch &&
                              (null === op || !op.has(b))))
                        ) {
                          ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                          var S = it(l, o, t);
                          aH(l, S);
                          break e;
                        }
                    }
                    l = l.return;
                  } while (null !== l);
                }
                oU(n);
              } catch (e) {
                ((t = e), i6 === n && null !== n && (i6 = n = n.return));
                continue;
              }
              break;
            }
          }
          function oO() {
            var e = i2.current;
            return ((i2.current = l2), null === e ? l2 : e);
          }
          function oz() {
            ((0 === ot || 3 === ot || 2 === ot) && (ot = 4),
              null === i8 ||
                (0 == (268435455 & or) && 0 == (268435455 & oa)) ||
                oI(i8, i9));
          }
          function oj(e, t) {
            var n = i5;
            i5 |= 2;
            var r = oO();
            for ((i8 !== e || i9 !== t) && ((oc = null), oR(e, t)); ;)
              try {
                (function () {
                  for (; null !== i6;) o$(i6);
                })();
                break;
              } catch (t) {
                oM(e, t);
              }
            if ((aI(), (i5 = n), (i2.current = r), null !== i6))
              throw Error(d(261));
            return ((i8 = null), (i9 = 0), ot);
          }
          function o$(e) {
            var t = s(e.alternate, e, i7);
            ((e.memoizedProps = e.pendingProps),
              null === t ? oU(e) : (i6 = t),
              (i3.current = null));
          }
          function oU(e) {
            var t = e;
            do {
              var n = t.alternate;
              if (((e = t.return), 0 == (32768 & t.flags))) {
                if (
                  null !==
                  (n = (function (e, t, n) {
                    var r = t.pendingProps;
                    switch ((as(t), t.tag)) {
                      case 2:
                      case 16:
                      case 15:
                      case 0:
                      case 11:
                      case 7:
                      case 8:
                      case 12:
                      case 9:
                      case 14:
                        return (iA(t), null);
                      case 1:
                      case 17:
                        return (rX(t.type) && rK(), iA(t), null);
                      case 3:
                        return (
                          (r = t.stateNode),
                          lt(),
                          rG(rV),
                          rG(rW),
                          lo(),
                          r.pendingContext &&
                            ((r.context = r.pendingContext),
                            (r.pendingContext = null)),
                          (null === e || null === e.child) &&
                            (av(t)
                              ? (t.flags |= 4)
                              : null === e ||
                                (e.memoizedState.isDehydrated &&
                                  0 == (256 & t.flags)) ||
                                ((t.flags |= 1024),
                                null !== af && (oP(af), (af = null)))),
                          l(e, t),
                          iA(t),
                          null
                        );
                      case 5:
                        lr(t);
                        var s = a7(a9.current);
                        if (((n = t.type), null !== e && null != t.stateNode))
                          (i(e, t, n, r, s),
                            e.ref !== t.ref &&
                              ((t.flags |= 512), (t.flags |= 2097152)));
                        else {
                          if (!r) {
                            if (null === t.stateNode) throw Error(d(166));
                            return (iA(t), null);
                          }
                          if (((e = a7(a8.current)), av(t))) {
                            ((r = t.stateNode), (n = t.type));
                            var u = t.memoizedProps;
                            switch (
                              ((r[rT] = t),
                              (r[rN] = u),
                              (e = 0 != (1 & t.mode)),
                              n)
                            ) {
                              case "dialog":
                                (rn("cancel", r), rn("close", r));
                                break;
                              case "iframe":
                              case "object":
                              case "embed":
                                rn("load", r);
                                break;
                              case "video":
                              case "audio":
                                for (s = 0; s < n9.length; s++) rn(n9[s], r);
                                break;
                              case "source":
                                rn("error", r);
                                break;
                              case "img":
                              case "image":
                              case "link":
                                (rn("error", r), rn("load", r));
                                break;
                              case "details":
                                rn("toggle", r);
                                break;
                              case "input":
                                (Z(r, u), rn("invalid", r));
                                break;
                              case "select":
                                ((r._wrapperState = {
                                  wasMultiple: !!u.multiple,
                                }),
                                  rn("invalid", r));
                                break;
                              case "textarea":
                                (eo(r, u), rn("invalid", r));
                            }
                            for (var c in (eS(n, u), (s = null), u))
                              if (u.hasOwnProperty(c)) {
                                var f = u[c];
                                "children" === c
                                  ? "string" == typeof f
                                    ? r.textContent !== f &&
                                      (!0 !== u.suppressHydrationWarning &&
                                        rh(r.textContent, f, e),
                                      (s = ["children", f]))
                                    : "number" == typeof f &&
                                      r.textContent !== "" + f &&
                                      (!0 !== u.suppressHydrationWarning &&
                                        rh(r.textContent, f, e),
                                      (s = ["children", "" + f]))
                                  : p.hasOwnProperty(c) &&
                                    null != f &&
                                    "onScroll" === c &&
                                    rn("scroll", r);
                              }
                            switch (n) {
                              case "input":
                                (X(r), en(r, u, !0));
                                break;
                              case "textarea":
                                (X(r), eu(r));
                                break;
                              case "select":
                              case "option":
                                break;
                              default:
                                "function" == typeof u.onClick &&
                                  (r.onclick = rg);
                            }
                            ((r = s),
                              (t.updateQueue = r),
                              null !== r && (t.flags |= 4));
                          } else {
                            ((c = 9 === s.nodeType ? s : s.ownerDocument),
                              "http://www.w3.org/1999/xhtml" === e &&
                                (e = ec(n)),
                              "http://www.w3.org/1999/xhtml" === e
                                ? "script" === n
                                  ? (((e = c.createElement("div")).innerHTML =
                                      "<script></script>"),
                                    (e = e.removeChild(e.firstChild)))
                                  : "string" == typeof r.is
                                    ? (e = c.createElement(n, { is: r.is }))
                                    : ((e = c.createElement(n)),
                                      "select" === n &&
                                        ((c = e),
                                        r.multiple
                                          ? (c.multiple = !0)
                                          : r.size && (c.size = r.size)))
                                : (e = c.createElementNS(e, n)),
                              (e[rT] = t),
                              (e[rN] = r),
                              a(e, t, !1, !1),
                              (t.stateNode = e));
                            e: {
                              switch (((c = ek(n, r)), n)) {
                                case "dialog":
                                  (rn("cancel", e), rn("close", e), (s = r));
                                  break;
                                case "iframe":
                                case "object":
                                case "embed":
                                  (rn("load", e), (s = r));
                                  break;
                                case "video":
                                case "audio":
                                  for (s = 0; s < n9.length; s++) rn(n9[s], e);
                                  s = r;
                                  break;
                                case "source":
                                  (rn("error", e), (s = r));
                                  break;
                                case "img":
                                case "image":
                                case "link":
                                  (rn("error", e), rn("load", e), (s = r));
                                  break;
                                case "details":
                                  (rn("toggle", e), (s = r));
                                  break;
                                case "input":
                                  (Z(e, r), (s = Y(e, r)), rn("invalid", e));
                                  break;
                                case "option":
                                default:
                                  s = r;
                                  break;
                                case "select":
                                  ((e._wrapperState = {
                                    wasMultiple: !!r.multiple,
                                  }),
                                    (s = H({}, r, { value: void 0 })),
                                    rn("invalid", e));
                                  break;
                                case "textarea":
                                  (eo(e, r), (s = ei(e, r)), rn("invalid", e));
                              }
                              for (u in (eS(n, s), (f = s)))
                                if (f.hasOwnProperty(u)) {
                                  var m = f[u];
                                  "style" === u
                                    ? ew(e, m)
                                    : "dangerouslySetInnerHTML" === u
                                      ? null != (m = m ? m.__html : void 0) &&
                                        em(e, m)
                                      : "children" === u
                                        ? "string" == typeof m
                                          ? ("textarea" !== n || "" !== m) &&
                                            eh(e, m)
                                          : "number" == typeof m &&
                                            eh(e, "" + m)
                                        : "suppressContentEditableWarning" !==
                                            u &&
                                          "suppressHydrationWarning" !== u &&
                                          "autoFocus" !== u &&
                                          (p.hasOwnProperty(u)
                                            ? null != m &&
                                              "onScroll" === u &&
                                              rn("scroll", e)
                                            : null != m && C(e, u, m, c));
                                }
                              switch (n) {
                                case "input":
                                  (X(e), en(e, r, !1));
                                  break;
                                case "textarea":
                                  (X(e), eu(e));
                                  break;
                                case "option":
                                  null != r.value &&
                                    e.setAttribute("value", "" + q(r.value));
                                  break;
                                case "select":
                                  ((e.multiple = !!r.multiple),
                                    null != (u = r.value)
                                      ? el(e, !!r.multiple, u, !1)
                                      : null != r.defaultValue &&
                                        el(
                                          e,
                                          !!r.multiple,
                                          r.defaultValue,
                                          !0,
                                        ));
                                  break;
                                default:
                                  "function" == typeof s.onClick &&
                                    (e.onclick = rg);
                              }
                              switch (n) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                  r = !!r.autoFocus;
                                  break e;
                                case "img":
                                  r = !0;
                                  break e;
                                default:
                                  r = !1;
                              }
                            }
                            r && (t.flags |= 4);
                          }
                          null !== t.ref &&
                            ((t.flags |= 512), (t.flags |= 2097152));
                        }
                        return (iA(t), null);
                      case 6:
                        if (e && null != t.stateNode)
                          o(e, t, e.memoizedProps, r);
                        else {
                          if ("string" != typeof r && null === t.stateNode)
                            throw Error(d(166));
                          if (((n = a7(a9.current)), a7(a8.current), av(t))) {
                            if (
                              ((r = t.stateNode),
                              (n = t.memoizedProps),
                              (r[rT] = t),
                              (u = r.nodeValue !== n) && null !== (e = au))
                            )
                              switch (e.tag) {
                                case 3:
                                  rh(r.nodeValue, n, 0 != (1 & e.mode));
                                  break;
                                case 5:
                                  !0 !==
                                    e.memoizedProps.suppressHydrationWarning &&
                                    rh(r.nodeValue, n, 0 != (1 & e.mode));
                              }
                            u && (t.flags |= 4);
                          } else
                            (((r = (
                              9 === n.nodeType ? n : n.ownerDocument
                            ).createTextNode(r))[rT] = t),
                              (t.stateNode = r));
                        }
                        return (iA(t), null);
                      case 13:
                        if (
                          (rG(la),
                          (r = t.memoizedState),
                          null === e ||
                            (null !== e.memoizedState &&
                              null !== e.memoizedState.dehydrated))
                        ) {
                          if (
                            ad &&
                            null !== ac &&
                            0 != (1 & t.mode) &&
                            0 == (128 & t.flags)
                          )
                            (aw(), ab(), (t.flags |= 98560), (u = !1));
                          else if (
                            ((u = av(t)), null !== r && null !== r.dehydrated)
                          ) {
                            if (null === e) {
                              if (!u) throw Error(d(318));
                              if (
                                !(u =
                                  null !== (u = t.memoizedState)
                                    ? u.dehydrated
                                    : null)
                              )
                                throw Error(d(317));
                              u[rT] = t;
                            } else
                              (ab(),
                                0 == (128 & t.flags) &&
                                  (t.memoizedState = null),
                                (t.flags |= 4));
                            (iA(t), (u = !1));
                          } else
                            (null !== af && (oP(af), (af = null)), (u = !0));
                          if (!u) return 65536 & t.flags ? t : null;
                        }
                        if (0 != (128 & t.flags)) return ((t.lanes = n), t);
                        return (
                          (r = null !== r) !=
                            (null !== e && null !== e.memoizedState) &&
                            r &&
                            ((t.child.flags |= 8192),
                            0 != (1 & t.mode) &&
                              (null === e || 0 != (1 & la.current)
                                ? 0 === ot && (ot = 3)
                                : oz())),
                          null !== t.updateQueue && (t.flags |= 4),
                          iA(t),
                          null
                        );
                      case 4:
                        return (
                          lt(),
                          l(e, t),
                          null === e && rl(t.stateNode.containerInfo),
                          iA(t),
                          null
                        );
                      case 10:
                        return (aT(t.type._context), iA(t), null);
                      case 19:
                        if ((rG(la), null === (u = t.memoizedState)))
                          return (iA(t), null);
                        if (
                          ((r = 0 != (128 & t.flags)),
                          null === (c = u.rendering))
                        ) {
                          if (r) iN(u, !1);
                          else {
                            if (
                              0 !== ot ||
                              (null !== e && 0 != (128 & e.flags))
                            )
                              for (e = t.child; null !== e;) {
                                if (null !== (c = ll(e))) {
                                  for (
                                    t.flags |= 128,
                                      iN(u, !1),
                                      null !== (r = c.updateQueue) &&
                                        ((t.updateQueue = r), (t.flags |= 4)),
                                      t.subtreeFlags = 0,
                                      r = n,
                                      n = t.child;
                                    null !== n;
                                  )
                                    ((u = n),
                                      (e = r),
                                      (u.flags &= 14680066),
                                      null === (c = u.alternate)
                                        ? ((u.childLanes = 0),
                                          (u.lanes = e),
                                          (u.child = null),
                                          (u.subtreeFlags = 0),
                                          (u.memoizedProps = null),
                                          (u.memoizedState = null),
                                          (u.updateQueue = null),
                                          (u.dependencies = null),
                                          (u.stateNode = null))
                                        : ((u.childLanes = c.childLanes),
                                          (u.lanes = c.lanes),
                                          (u.child = c.child),
                                          (u.subtreeFlags = 0),
                                          (u.deletions = null),
                                          (u.memoizedProps = c.memoizedProps),
                                          (u.memoizedState = c.memoizedState),
                                          (u.updateQueue = c.updateQueue),
                                          (u.type = c.type),
                                          (e = c.dependencies),
                                          (u.dependencies =
                                            null === e
                                              ? null
                                              : {
                                                  lanes: e.lanes,
                                                  firstContext: e.firstContext,
                                                })),
                                      (n = n.sibling));
                                  return (
                                    rH(la, (1 & la.current) | 2),
                                    t.child
                                  );
                                }
                                e = e.sibling;
                              }
                            null !== u.tail &&
                              eZ() > ou &&
                              ((t.flags |= 128),
                              (r = !0),
                              iN(u, !1),
                              (t.lanes = 4194304));
                          }
                        } else {
                          if (!r) {
                            if (null !== (e = ll(c))) {
                              if (
                                ((t.flags |= 128),
                                (r = !0),
                                null !== (n = e.updateQueue) &&
                                  ((t.updateQueue = n), (t.flags |= 4)),
                                iN(u, !0),
                                null === u.tail &&
                                  "hidden" === u.tailMode &&
                                  !c.alternate &&
                                  !ad)
                              )
                                return (iA(t), null);
                            } else
                              2 * eZ() - u.renderingStartTime > ou &&
                                1073741824 !== n &&
                                ((t.flags |= 128),
                                (r = !0),
                                iN(u, !1),
                                (t.lanes = 4194304));
                          }
                          u.isBackwards
                            ? ((c.sibling = t.child), (t.child = c))
                            : (null !== (n = u.last)
                                ? (n.sibling = c)
                                : (t.child = c),
                              (u.last = c));
                        }
                        if (null !== u.tail)
                          return (
                            (t = u.tail),
                            (u.rendering = t),
                            (u.tail = t.sibling),
                            (u.renderingStartTime = eZ()),
                            (t.sibling = null),
                            (n = la.current),
                            rH(la, r ? (1 & n) | 2 : 1 & n),
                            t
                          );
                        return (iA(t), null);
                      case 22:
                      case 23:
                        return (
                          oL(),
                          (r = null !== t.memoizedState),
                          null !== e &&
                            (null !== e.memoizedState) !== r &&
                            (t.flags |= 8192),
                          r && 0 != (1 & t.mode)
                            ? 0 != (1073741824 & i7) &&
                              (iA(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                            : iA(t),
                          null
                        );
                      case 24:
                      case 25:
                        return null;
                    }
                    throw Error(d(156, t.tag));
                  })(n, t, i7))
                ) {
                  i6 = n;
                  return;
                }
              } else {
                if (
                  null !==
                  (n = (function (e, t) {
                    switch ((as(t), t.tag)) {
                      case 1:
                        return (
                          rX(t.type) && rK(),
                          65536 & (e = t.flags)
                            ? ((t.flags = (-65537 & e) | 128), t)
                            : null
                        );
                      case 3:
                        return (
                          lt(),
                          rG(rV),
                          rG(rW),
                          lo(),
                          0 != (65536 & (e = t.flags)) && 0 == (128 & e)
                            ? ((t.flags = (-65537 & e) | 128), t)
                            : null
                        );
                      case 5:
                        return (lr(t), null);
                      case 13:
                        if (
                          (rG(la),
                          null !== (e = t.memoizedState) &&
                            null !== e.dehydrated)
                        ) {
                          if (null === t.alternate) throw Error(d(340));
                          ab();
                        }
                        return 65536 & (e = t.flags)
                          ? ((t.flags = (-65537 & e) | 128), t)
                          : null;
                      case 19:
                        return (rG(la), null);
                      case 4:
                        return (lt(), null);
                      case 10:
                        return (aT(t.type._context), null);
                      case 22:
                      case 23:
                        return (oL(), null);
                      default:
                        return null;
                    }
                  })(n, t))
                ) {
                  ((n.flags &= 32767), (i6 = n));
                  return;
                }
                if (null !== e)
                  ((e.flags |= 32768),
                    (e.subtreeFlags = 0),
                    (e.deletions = null));
                else {
                  ((ot = 6), (i6 = null));
                  return;
                }
              }
              if (null !== (t = t.sibling)) {
                i6 = t;
                return;
              }
              i6 = t = e;
            } while (null !== t);
            0 === ot && (ot = 5);
          }
          function oD(e, t, n) {
            var r = tc,
              a = i4.transition;
            try {
              ((i4.transition = null),
                (tc = 1),
                (function (e, t, n, r) {
                  do oF();
                  while (null !== oh);
                  if (0 != (6 & i5)) throw Error(d(327));
                  n = e.finishedWork;
                  var a = e.finishedLanes;
                  if (null !== n) {
                    if (
                      ((e.finishedWork = null),
                      (e.finishedLanes = 0),
                      n === e.current)
                    )
                      throw Error(d(177));
                    ((e.callbackNode = null), (e.callbackPriority = 0));
                    var l = n.lanes | n.childLanes;
                    if (
                      ((function (e, t) {
                        var n = e.pendingLanes & ~t;
                        ((e.pendingLanes = t),
                          (e.suspendedLanes = 0),
                          (e.pingedLanes = 0),
                          (e.expiredLanes &= t),
                          (e.mutableReadLanes &= t),
                          (e.entangledLanes &= t),
                          (t = e.entanglements));
                        var r = e.eventTimes;
                        for (e = e.expirationTimes; 0 < n;) {
                          var a = 31 - e9(n),
                            l = 1 << a;
                          ((t[a] = 0), (r[a] = -1), (e[a] = -1), (n &= ~l));
                        }
                      })(e, l),
                      e === i8 && ((i6 = i8 = null), (i9 = 0)),
                      (0 == (2064 & n.subtreeFlags) && 0 == (2064 & n.flags)) ||
                        om ||
                        ((om = !0),
                        eX(e3, function () {
                          return (oF(), null);
                        })),
                      (l = 0 != (15990 & n.flags)),
                      0 != (15990 & n.subtreeFlags) || l)
                    ) {
                      ((l = i4.transition), (i4.transition = null));
                      var i,
                        o,
                        s,
                        u = tc;
                      tc = 1;
                      var c = i5;
                      ((i5 |= 4),
                        (i3.current = null),
                        (function (e, t) {
                          if (((ry = tO), nF((e = nD())))) {
                            if ("selectionStart" in e)
                              var n = {
                                start: e.selectionStart,
                                end: e.selectionEnd,
                              };
                            else
                              e: {
                                var r =
                                  (n =
                                    ((n = e.ownerDocument) && n.defaultView) ||
                                    window).getSelection && n.getSelection();
                                if (r && 0 !== r.rangeCount) {
                                  n = r.anchorNode;
                                  var a,
                                    l = r.anchorOffset,
                                    i = r.focusNode;
                                  r = r.focusOffset;
                                  try {
                                    (n.nodeType, i.nodeType);
                                  } catch (e) {
                                    n = null;
                                    break e;
                                  }
                                  var o = 0,
                                    s = -1,
                                    u = -1,
                                    c = 0,
                                    f = 0,
                                    p = e,
                                    m = null;
                                  t: for (;;) {
                                    for (
                                      ;
                                      p !== n ||
                                        (0 !== l && 3 !== p.nodeType) ||
                                        (s = o + l),
                                        p !== i ||
                                          (0 !== r && 3 !== p.nodeType) ||
                                          (u = o + r),
                                        3 === p.nodeType &&
                                          (o += p.nodeValue.length),
                                        null !== (a = p.firstChild);
                                    )
                                      ((m = p), (p = a));
                                    for (;;) {
                                      if (p === e) break t;
                                      if (
                                        (m === n && ++c === l && (s = o),
                                        m === i && ++f === r && (u = o),
                                        null !== (a = p.nextSibling))
                                      )
                                        break;
                                      m = (p = m).parentNode;
                                    }
                                    p = a;
                                  }
                                  n =
                                    -1 === s || -1 === u
                                      ? null
                                      : { start: s, end: u };
                                } else n = null;
                              }
                            n = n || { start: 0, end: 0 };
                          } else n = null;
                          for (
                            rv = { focusedElem: e, selectionRange: n },
                              tO = !1,
                              iO = t;
                            null !== iO;
                          )
                            if (
                              ((e = (t = iO).child),
                              0 != (1028 & t.subtreeFlags) && null !== e)
                            )
                              ((e.return = t), (iO = e));
                            else
                              for (; null !== iO;) {
                                t = iO;
                                try {
                                  var h = t.alternate;
                                  if (0 != (1024 & t.flags))
                                    switch (t.tag) {
                                      case 0:
                                      case 11:
                                      case 15:
                                      case 5:
                                      case 6:
                                      case 4:
                                      case 17:
                                        break;
                                      case 1:
                                        if (null !== h) {
                                          var g = h.memoizedProps,
                                            y = h.memoizedState,
                                            v = t.stateNode,
                                            w = v.getSnapshotBeforeUpdate(
                                              t.elementType === t.type
                                                ? g
                                                : a_(t.type, g),
                                              y,
                                            );
                                          v.__reactInternalSnapshotBeforeUpdate =
                                            w;
                                        }
                                        break;
                                      case 3:
                                        var b = t.stateNode.containerInfo;
                                        1 === b.nodeType
                                          ? (b.textContent = "")
                                          : 9 === b.nodeType &&
                                            b.documentElement &&
                                            b.removeChild(b.documentElement);
                                        break;
                                      default:
                                        throw Error(d(163));
                                    }
                                } catch (e) {
                                  oH(t, t.return, e);
                                }
                                if (null !== (e = t.sibling)) {
                                  ((e.return = t.return), (iO = e));
                                  break;
                                }
                                iO = t.return;
                              }
                          ((h = i$), (i$ = !1));
                        })(e, n),
                        iK(n, e),
                        (function (e) {
                          var t = nD(),
                            n = e.focusedElem,
                            r = e.selectionRange;
                          if (
                            t !== n &&
                            n &&
                            n.ownerDocument &&
                            (function e(t, n) {
                              return (
                                !!t &&
                                !!n &&
                                (t === n ||
                                  ((!t || 3 !== t.nodeType) &&
                                    (n && 3 === n.nodeType
                                      ? e(t, n.parentNode)
                                      : "contains" in t
                                        ? t.contains(n)
                                        : !!t.compareDocumentPosition &&
                                          !!(
                                            16 & t.compareDocumentPosition(n)
                                          ))))
                              );
                            })(n.ownerDocument.documentElement, n)
                          ) {
                            if (null !== r && nF(n)) {
                              if (
                                ((t = r.start),
                                void 0 === (e = r.end) && (e = t),
                                "selectionStart" in n)
                              )
                                ((n.selectionStart = t),
                                  (n.selectionEnd = Math.min(
                                    e,
                                    n.value.length,
                                  )));
                              else if (
                                (e =
                                  ((t = n.ownerDocument || document) &&
                                    t.defaultView) ||
                                  window).getSelection
                              ) {
                                e = e.getSelection();
                                var a = n.textContent.length,
                                  l = Math.min(r.start, a);
                                ((r =
                                  void 0 === r.end ? l : Math.min(r.end, a)),
                                  !e.extend &&
                                    l > r &&
                                    ((a = r), (r = l), (l = a)),
                                  (a = nU(n, l)));
                                var i = nU(n, r);
                                a &&
                                  i &&
                                  (1 !== e.rangeCount ||
                                    e.anchorNode !== a.node ||
                                    e.anchorOffset !== a.offset ||
                                    e.focusNode !== i.node ||
                                    e.focusOffset !== i.offset) &&
                                  ((t = t.createRange()).setStart(
                                    a.node,
                                    a.offset,
                                  ),
                                  e.removeAllRanges(),
                                  l > r
                                    ? (e.addRange(t),
                                      e.extend(i.node, i.offset))
                                    : (t.setEnd(i.node, i.offset),
                                      e.addRange(t)));
                              }
                            }
                            for (t = [], e = n; (e = e.parentNode);)
                              1 === e.nodeType &&
                                t.push({
                                  element: e,
                                  left: e.scrollLeft,
                                  top: e.scrollTop,
                                });
                            for (
                              "function" == typeof n.focus && n.focus(), n = 0;
                              n < t.length;
                              n++
                            )
                              (((e = t[n]).element.scrollLeft = e.left),
                                (e.element.scrollTop = e.top));
                          }
                        })(rv),
                        (tO = !!ry),
                        (rv = ry = null),
                        (e.current = n),
                        (i = n),
                        (o = e),
                        (s = a),
                        (iO = i),
                        (function e(t, n, r) {
                          for (var a = 0 != (1 & t.mode); null !== iO;) {
                            var l = iO,
                              i = l.child;
                            if (22 === l.tag && a) {
                              var o = null !== l.memoizedState || iL;
                              if (!o) {
                                var s = l.alternate,
                                  u =
                                    (null !== s && null !== s.memoizedState) ||
                                    iR;
                                s = iL;
                                var c = iR;
                                if (((iL = o), (iR = u) && !c))
                                  for (iO = l; null !== iO;)
                                    ((u = (o = iO).child),
                                      22 === o.tag && null !== o.memoizedState
                                        ? i0(l)
                                        : null !== u
                                          ? ((u.return = o), (iO = u))
                                          : i0(l));
                                for (; null !== i;)
                                  ((iO = i), e(i, n, r), (i = i.sibling));
                                ((iO = l), (iL = s), (iR = c));
                              }
                              iY(t, n, r);
                            } else
                              0 != (8772 & l.subtreeFlags) && null !== i
                                ? ((i.return = l), (iO = i))
                                : iY(t, n, r);
                          }
                        })(i, o, s),
                        eY(),
                        (i5 = c),
                        (tc = u),
                        (i4.transition = l));
                    } else e.current = n;
                    if (
                      (om && ((om = !1), (oh = e), (og = a)),
                      0 === (l = e.pendingLanes) && (op = null),
                      (function (e) {
                        if (e6 && "function" == typeof e6.onCommitFiberRoot)
                          try {
                            e6.onCommitFiberRoot(
                              e8,
                              e,
                              void 0,
                              128 == (128 & e.current.flags),
                            );
                          } catch (e) {}
                      })(n.stateNode, r),
                      ox(e, eZ()),
                      null !== t)
                    )
                      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                        r((a = t[n]).value, {
                          componentStack: a.stack,
                          digest: a.digest,
                        });
                    if (od) throw ((od = !1), (e = of), (of = null), e);
                    (0 != (1 & og) && 0 !== e.tag && oF(),
                      0 != (1 & (l = e.pendingLanes))
                        ? e === ov
                          ? oy++
                          : ((oy = 0), (ov = e))
                        : (oy = 0),
                      r5());
                  }
                })(e, t, n, r));
            } finally {
              ((i4.transition = a), (tc = r));
            }
            return null;
          }
          function oF() {
            if (null !== oh) {
              var e = td(og),
                t = i4.transition,
                n = tc;
              try {
                if (
                  ((i4.transition = null), (tc = 16 > e ? 16 : e), null === oh)
                )
                  var r = !1;
                else {
                  if (((e = oh), (oh = null), (og = 0), 0 != (6 & i5)))
                    throw Error(d(331));
                  var a = i5;
                  for (i5 |= 4, iO = e.current; null !== iO;) {
                    var l = iO,
                      i = l.child;
                    if (0 != (16 & iO.flags)) {
                      var o = l.deletions;
                      if (null !== o) {
                        for (var s = 0; s < o.length; s++) {
                          var u = o[s];
                          for (iO = u; null !== iO;) {
                            var c = iO;
                            switch (c.tag) {
                              case 0:
                              case 11:
                              case 15:
                                iU(8, c, l);
                            }
                            var f = c.child;
                            if (null !== f) ((f.return = c), (iO = f));
                            else
                              for (; null !== iO;) {
                                var p = (c = iO).sibling,
                                  m = c.return;
                                if (
                                  ((function e(t) {
                                    var n = t.alternate;
                                    (null !== n && ((t.alternate = null), e(n)),
                                      (t.child = null),
                                      (t.deletions = null),
                                      (t.sibling = null),
                                      5 === t.tag &&
                                        null !== (n = t.stateNode) &&
                                        (delete n[rT],
                                        delete n[rN],
                                        delete n[rL],
                                        delete n[rR],
                                        delete n[rM]),
                                      (t.stateNode = null),
                                      (t.return = null),
                                      (t.dependencies = null),
                                      (t.memoizedProps = null),
                                      (t.memoizedState = null),
                                      (t.pendingProps = null),
                                      (t.stateNode = null),
                                      (t.updateQueue = null));
                                  })(c),
                                  c === u)
                                ) {
                                  iO = null;
                                  break;
                                }
                                if (null !== p) {
                                  ((p.return = m), (iO = p));
                                  break;
                                }
                                iO = m;
                              }
                          }
                        }
                        var h = l.alternate;
                        if (null !== h) {
                          var g = h.child;
                          if (null !== g) {
                            h.child = null;
                            do {
                              var y = g.sibling;
                              ((g.sibling = null), (g = y));
                            } while (null !== g);
                          }
                        }
                        iO = l;
                      }
                    }
                    if (0 != (2064 & l.subtreeFlags) && null !== i)
                      ((i.return = l), (iO = i));
                    else
                      for (; null !== iO;) {
                        if (((l = iO), 0 != (2048 & l.flags)))
                          switch (l.tag) {
                            case 0:
                            case 11:
                            case 15:
                              iU(9, l, l.return);
                          }
                        var v = l.sibling;
                        if (null !== v) {
                          ((v.return = l.return), (iO = v));
                          break;
                        }
                        iO = l.return;
                      }
                  }
                  var w = e.current;
                  for (iO = w; null !== iO;) {
                    var b = (i = iO).child;
                    if (0 != (2064 & i.subtreeFlags) && null !== b)
                      ((b.return = i), (iO = b));
                    else
                      for (i = w; null !== iO;) {
                        if (((o = iO), 0 != (2048 & o.flags)))
                          try {
                            switch (o.tag) {
                              case 0:
                              case 11:
                              case 15:
                                iD(9, o);
                            }
                          } catch (e) {
                            oH(o, o.return, e);
                          }
                        if (o === i) {
                          iO = null;
                          break;
                        }
                        var S = o.sibling;
                        if (null !== S) {
                          ((S.return = o.return), (iO = S));
                          break;
                        }
                        iO = o.return;
                      }
                  }
                  if (
                    ((i5 = a),
                    r5(),
                    e6 && "function" == typeof e6.onPostCommitFiberRoot)
                  )
                    try {
                      e6.onPostCommitFiberRoot(e8, e);
                    } catch (e) {}
                  r = !0;
                }
                return r;
              } finally {
                ((tc = n), (i4.transition = t));
              }
            }
            return !1;
          }
          function oG(e, t, n) {
            ((t = ie(e, (t = l8(n, t)), 1)),
              (e = aF(e, t, 1)),
              (t = oS()),
              null !== e && (ts(e, 1, t), ox(e, t)));
          }
          function oH(e, t, n) {
            if (3 === e.tag) oG(e, e, n);
            else
              for (; null !== t;) {
                if (3 === t.tag) {
                  oG(t, e, n);
                  break;
                }
                if (1 === t.tag) {
                  var r = t.stateNode;
                  if (
                    "function" == typeof t.type.getDerivedStateFromError ||
                    ("function" == typeof r.componentDidCatch &&
                      (null === op || !op.has(r)))
                  ) {
                    ((e = it(t, (e = l8(n, e)), 1)),
                      (t = aF(t, e, 1)),
                      (e = oS()),
                      null !== t && (ts(t, 1, e), ox(t, e)));
                    break;
                  }
                }
                t = t.return;
              }
          }
          function oB(e, t, n) {
            var r = e.pingCache;
            (null !== r && r.delete(t),
              (t = oS()),
              (e.pingedLanes |= e.suspendedLanes & n),
              i8 === e &&
                (i9 & n) === n &&
                (4 === ot ||
                (3 === ot && (130023424 & i9) === i9 && 500 > eZ() - os)
                  ? oR(e, 0)
                  : (ol |= n)),
              ox(e, t));
          }
          function oW(e, t) {
            0 === t &&
              (0 == (1 & e.mode)
                ? (t = 1)
                : ((t = tn), 0 == (130023424 & (tn <<= 1)) && (tn = 4194304)));
            var n = oS();
            null !== (e = az(e, t)) && (ts(e, t, n), ox(e, n));
          }
          function oV(e) {
            var t = e.memoizedState,
              n = 0;
            (null !== t && (n = t.retryLane), oW(e, n));
          }
          function oq(e, t) {
            var n = 0;
            switch (e.tag) {
              case 13:
                var r = e.stateNode,
                  a = e.memoizedState;
                null !== a && (n = a.retryLane);
                break;
              case 19:
                r = e.stateNode;
                break;
              default:
                throw Error(d(314));
            }
            (null !== r && r.delete(t), oW(e, n));
          }
          function oQ(e, t, n, r) {
            ((this.tag = e),
              (this.key = n),
              (this.sibling =
                this.child =
                this.return =
                this.stateNode =
                this.type =
                this.elementType =
                  null),
              (this.index = 0),
              (this.ref = null),
              (this.pendingProps = t),
              (this.dependencies =
                this.memoizedState =
                this.updateQueue =
                this.memoizedProps =
                  null),
              (this.mode = r),
              (this.subtreeFlags = this.flags = 0),
              (this.deletions = null),
              (this.childLanes = this.lanes = 0),
              (this.alternate = null));
          }
          function oX(e, t, n, r) {
            return new oQ(e, t, n, r);
          }
          function oK(e) {
            return !(!(e = e.prototype) || !e.isReactComponent);
          }
          function oJ(e, t) {
            var n = e.alternate;
            return (
              null === n
                ? (((n = oX(e.tag, t, e.key, e.mode)).elementType =
                    e.elementType),
                  (n.type = e.type),
                  (n.stateNode = e.stateNode),
                  (n.alternate = e),
                  (e.alternate = n))
                : ((n.pendingProps = t),
                  (n.type = e.type),
                  (n.flags = 0),
                  (n.subtreeFlags = 0),
                  (n.deletions = null)),
              (n.flags = 14680064 & e.flags),
              (n.childLanes = e.childLanes),
              (n.lanes = e.lanes),
              (n.child = e.child),
              (n.memoizedProps = e.memoizedProps),
              (n.memoizedState = e.memoizedState),
              (n.updateQueue = e.updateQueue),
              (t = e.dependencies),
              (n.dependencies =
                null === t
                  ? null
                  : { lanes: t.lanes, firstContext: t.firstContext }),
              (n.sibling = e.sibling),
              (n.index = e.index),
              (n.ref = e.ref),
              n
            );
          }
          function oY(e, t, n, r, a, l) {
            var i = 2;
            if (((r = e), "function" == typeof e)) oK(e) && (i = 1);
            else if ("string" == typeof e) i = 5;
            else
              e: switch (e) {
                case T:
                  return oZ(n.children, a, l, t);
                case N:
                  ((i = 8), (a |= 8));
                  break;
                case A:
                  return (
                    ((e = oX(12, n, t, 2 | a)).elementType = A),
                    (e.lanes = l),
                    e
                  );
                case O:
                  return (
                    ((e = oX(13, n, t, a)).elementType = O),
                    (e.lanes = l),
                    e
                  );
                case z:
                  return (
                    ((e = oX(19, n, t, a)).elementType = z),
                    (e.lanes = l),
                    e
                  );
                case U:
                  return o0(n, a, l, t);
                default:
                  if ("object" == typeof e && null !== e)
                    switch (e.$$typeof) {
                      case L:
                        i = 10;
                        break e;
                      case R:
                        i = 9;
                        break e;
                      case M:
                        i = 11;
                        break e;
                      case j:
                        i = 14;
                        break e;
                      case $:
                        ((i = 16), (r = null));
                        break e;
                    }
                  throw Error(d(130, null == e ? e : typeof e, ""));
              }
            return (
              ((t = oX(i, n, t, a)).elementType = e),
              (t.type = r),
              (t.lanes = l),
              t
            );
          }
          function oZ(e, t, n, r) {
            return (((e = oX(7, e, r, t)).lanes = n), e);
          }
          function o0(e, t, n, r) {
            return (
              ((e = oX(22, e, r, t)).elementType = U),
              (e.lanes = n),
              (e.stateNode = { isHidden: !1 }),
              e
            );
          }
          function o1(e, t, n) {
            return (((e = oX(6, e, null, t)).lanes = n), e);
          }
          function o2(e, t, n) {
            return (
              ((t = oX(
                4,
                null !== e.children ? e.children : [],
                e.key,
                t,
              )).lanes = n),
              (t.stateNode = {
                containerInfo: e.containerInfo,
                pendingChildren: null,
                implementation: e.implementation,
              }),
              t
            );
          }
          function o3(e, t, n, r, a) {
            ((this.tag = t),
              (this.containerInfo = e),
              (this.finishedWork =
                this.pingCache =
                this.current =
                this.pendingChildren =
                  null),
              (this.timeoutHandle = -1),
              (this.callbackNode = this.pendingContext = this.context = null),
              (this.callbackPriority = 0),
              (this.eventTimes = to(0)),
              (this.expirationTimes = to(-1)),
              (this.entangledLanes =
                this.finishedLanes =
                this.mutableReadLanes =
                this.expiredLanes =
                this.pingedLanes =
                this.suspendedLanes =
                this.pendingLanes =
                  0),
              (this.entanglements = to(0)),
              (this.identifierPrefix = r),
              (this.onRecoverableError = a),
              (this.mutableSourceEagerHydrationData = null));
          }
          function o4(e, t, n, r, a, l, i, o, s) {
            return (
              (e = new o3(e, t, n, o, s)),
              1 === t ? ((t = 1), !0 === l && (t |= 8)) : (t = 0),
              (l = oX(3, null, null, t)),
              (e.current = l),
              (l.stateNode = e),
              (l.memoizedState = {
                element: r,
                isDehydrated: n,
                cache: null,
                transitions: null,
                pendingSuspenseBoundaries: null,
              }),
              a$(l),
              e
            );
          }
          function o5(e) {
            if (!e) return rB;
            e = e._reactInternals;
            e: {
              if (eW(e) !== e || 1 !== e.tag) throw Error(d(170));
              var t = e;
              do {
                switch (t.tag) {
                  case 3:
                    t = t.stateNode.context;
                    break e;
                  case 1:
                    if (rX(t.type)) {
                      t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                      break e;
                    }
                }
                t = t.return;
              } while (null !== t);
              throw Error(d(171));
            }
            if (1 === e.tag) {
              var n = e.type;
              if (rX(n)) return rY(e, n, t);
            }
            return t;
          }
          function o8(e, t, n, r, a, l, i, o, s) {
            return (
              ((e = o4(n, r, !0, e, a, l, i, o, s)).context = o5(null)),
              (n = e.current),
              ((l = aD((r = oS()), (a = ok(n)))).callback =
                null != t ? t : null),
              aF(n, l, a),
              (e.current.lanes = a),
              ts(e, a, r),
              ox(e, r),
              e
            );
          }
          function o6(e, t, n, r) {
            var a = t.current,
              l = oS(),
              i = ok(a);
            return (
              (n = o5(n)),
              null === t.context ? (t.context = n) : (t.pendingContext = n),
              ((t = aD(l, i)).payload = { element: e }),
              null !== (r = void 0 === r ? null : r) && (t.callback = r),
              null !== (e = aF(a, t, i)) && (o_(e, a, i, l), aG(e, a, i)),
              i
            );
          }
          function o9(e) {
            return (e = e.current).child
              ? (e.child.tag, e.child.stateNode)
              : null;
          }
          function o7(e, t) {
            if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
              var n = e.retryLane;
              e.retryLane = 0 !== n && n < t ? n : t;
            }
          }
          function se(e, t) {
            (o7(e, t), (e = e.alternate) && o7(e, t));
          }
          s = function (e, t, n) {
            if (null !== e) {
              if (e.memoizedProps !== t.pendingProps || rV.current) io = !0;
              else {
                if (0 == (e.lanes & n) && 0 == (128 & t.flags))
                  return (
                    (io = !1),
                    (function (e, t, n) {
                      switch (t.tag) {
                        case 3:
                          (iv(t), ab());
                          break;
                        case 5:
                          ln(t);
                          break;
                        case 1:
                          rX(t.type) && rZ(t);
                          break;
                        case 4:
                          le(t, t.stateNode.containerInfo);
                          break;
                        case 10:
                          var r = t.type._context,
                            a = t.memoizedProps.value;
                          (rH(ax, r._currentValue), (r._currentValue = a));
                          break;
                        case 13:
                          if (null !== (r = t.memoizedState)) {
                            if (null !== r.dehydrated)
                              return (
                                rH(la, 1 & la.current),
                                (t.flags |= 128),
                                null
                              );
                            if (0 != (n & t.child.childLanes))
                              return ik(e, t, n);
                            return (
                              rH(la, 1 & la.current),
                              null !== (e = iT(e, t, n)) ? e.sibling : null
                            );
                          }
                          rH(la, 1 & la.current);
                          break;
                        case 19:
                          if (
                            ((r = 0 != (n & t.childLanes)),
                            0 != (128 & e.flags))
                          ) {
                            if (r) return iP(e, t, n);
                            t.flags |= 128;
                          }
                          if (
                            (null !== (a = t.memoizedState) &&
                              ((a.rendering = null),
                              (a.tail = null),
                              (a.lastEffect = null)),
                            rH(la, la.current),
                            !r)
                          )
                            return null;
                          break;
                        case 22:
                        case 23:
                          return ((t.lanes = 0), ip(e, t, n));
                      }
                      return iT(e, t, n);
                    })(e, t, n)
                  );
                io = 0 != (131072 & e.flags);
              }
            } else
              ((io = !1), ad && 0 != (1048576 & t.flags) && ai(t, r7, t.index));
            switch (((t.lanes = 0), t.tag)) {
              case 2:
                var r = t.type;
                (iI(e, t), (e = t.pendingProps));
                var a = rQ(t, rW.current);
                (aA(t, n), (a = lb(null, t, r, e, a, n)));
                var l = lS();
                return (
                  (t.flags |= 1),
                  "object" == typeof a &&
                  null !== a &&
                  "function" == typeof a.render &&
                  void 0 === a.$$typeof
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      rX(r) ? ((l = !0), rZ(t)) : (l = !1),
                      (t.memoizedState =
                        null !== a.state && void 0 !== a.state
                          ? a.state
                          : null),
                      a$(t),
                      (a.updater = aQ),
                      (t.stateNode = a),
                      (a._reactInternals = t),
                      aY(t, r, e, n),
                      (t = iy(null, t, r, !0, l, n)))
                    : ((t.tag = 0),
                      ad && l && ao(t),
                      is(null, t, a, n),
                      (t = t.child)),
                  t
                );
              case 16:
                r = t.elementType;
                e: {
                  switch (
                    (iI(e, t),
                    (e = t.pendingProps),
                    (r = (a = r._init)(r._payload)),
                    (t.type = r),
                    (a = t.tag =
                      (function (e) {
                        if ("function" == typeof e) return oK(e) ? 1 : 0;
                        if (null != e) {
                          if ((e = e.$$typeof) === M) return 11;
                          if (e === j) return 14;
                        }
                        return 2;
                      })(r)),
                    (e = a_(r, e)),
                    a)
                  ) {
                    case 0:
                      t = ih(null, t, r, e, n);
                      break e;
                    case 1:
                      t = ig(null, t, r, e, n);
                      break e;
                    case 11:
                      t = iu(null, t, r, e, n);
                      break e;
                    case 14:
                      t = ic(null, t, r, a_(r.type, e), n);
                      break e;
                  }
                  throw Error(d(306, r, ""));
                }
                return t;
              case 0:
                return (
                  (r = t.type),
                  (a = t.pendingProps),
                  (a = t.elementType === r ? a : a_(r, a)),
                  ih(e, t, r, a, n)
                );
              case 1:
                return (
                  (r = t.type),
                  (a = t.pendingProps),
                  (a = t.elementType === r ? a : a_(r, a)),
                  ig(e, t, r, a, n)
                );
              case 3:
                e: {
                  if ((iv(t), null === e)) throw Error(d(387));
                  ((r = t.pendingProps),
                    (a = (l = t.memoizedState).element),
                    aU(e, t),
                    aB(t, r, null, n));
                  var i = t.memoizedState;
                  if (((r = i.element), l.isDehydrated)) {
                    if (
                      ((l = {
                        element: r,
                        isDehydrated: !1,
                        cache: i.cache,
                        pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                        transitions: i.transitions,
                      }),
                      (t.updateQueue.baseState = l),
                      (t.memoizedState = l),
                      256 & t.flags)
                    ) {
                      ((a = l8(Error(d(423)), t)), (t = iw(e, t, r, n, a)));
                      break e;
                    }
                    if (r !== a) {
                      ((a = l8(Error(d(424)), t)), (t = iw(e, t, r, n, a)));
                      break e;
                    }
                    for (
                      ac = rE(t.stateNode.containerInfo.firstChild),
                        au = t,
                        ad = !0,
                        af = null,
                        n = a4(t, null, r, n),
                        t.child = n;
                      n;
                    )
                      ((n.flags = (-3 & n.flags) | 4096), (n = n.sibling));
                  } else {
                    if ((ab(), r === a)) {
                      t = iT(e, t, n);
                      break e;
                    }
                    is(e, t, r, n);
                  }
                  t = t.child;
                }
                return t;
              case 5:
                return (
                  ln(t),
                  null === e && ag(t),
                  (r = t.type),
                  (a = t.pendingProps),
                  (l = null !== e ? e.memoizedProps : null),
                  (i = a.children),
                  rw(r, a)
                    ? (i = null)
                    : null !== l && rw(r, l) && (t.flags |= 32),
                  im(e, t),
                  is(e, t, i, n),
                  t.child
                );
              case 6:
                return (null === e && ag(t), null);
              case 13:
                return ik(e, t, n);
              case 4:
                return (
                  le(t, t.stateNode.containerInfo),
                  (r = t.pendingProps),
                  null === e ? (t.child = a3(t, null, r, n)) : is(e, t, r, n),
                  t.child
                );
              case 11:
                return (
                  (r = t.type),
                  (a = t.pendingProps),
                  (a = t.elementType === r ? a : a_(r, a)),
                  iu(e, t, r, a, n)
                );
              case 7:
                return (is(e, t, t.pendingProps, n), t.child);
              case 8:
              case 12:
                return (is(e, t, t.pendingProps.children, n), t.child);
              case 10:
                e: {
                  if (
                    ((r = t.type._context),
                    (a = t.pendingProps),
                    (l = t.memoizedProps),
                    (i = a.value),
                    rH(ax, r._currentValue),
                    (r._currentValue = i),
                    null !== l)
                  ) {
                    if (nz(l.value, i)) {
                      if (l.children === a.children && !rV.current) {
                        t = iT(e, t, n);
                        break e;
                      }
                    } else
                      for (
                        null !== (l = t.child) && (l.return = t);
                        null !== l;
                      ) {
                        var o = l.dependencies;
                        if (null !== o) {
                          i = l.child;
                          for (var s = o.firstContext; null !== s;) {
                            if (s.context === r) {
                              if (1 === l.tag) {
                                (s = aD(-1, n & -n)).tag = 2;
                                var u = l.updateQueue;
                                if (null !== u) {
                                  var c = (u = u.shared).pending;
                                  (null === c
                                    ? (s.next = s)
                                    : ((s.next = c.next), (c.next = s)),
                                    (u.pending = s));
                                }
                              }
                              ((l.lanes |= n),
                                null !== (s = l.alternate) && (s.lanes |= n),
                                aN(l.return, n, t),
                                (o.lanes |= n));
                              break;
                            }
                            s = s.next;
                          }
                        } else if (10 === l.tag)
                          i = l.type === t.type ? null : l.child;
                        else if (18 === l.tag) {
                          if (null === (i = l.return)) throw Error(d(341));
                          ((i.lanes |= n),
                            null !== (o = i.alternate) && (o.lanes |= n),
                            aN(i, n, t),
                            (i = l.sibling));
                        } else i = l.child;
                        if (null !== i) i.return = l;
                        else
                          for (i = l; null !== i;) {
                            if (i === t) {
                              i = null;
                              break;
                            }
                            if (null !== (l = i.sibling)) {
                              ((l.return = i.return), (i = l));
                              break;
                            }
                            i = i.return;
                          }
                        l = i;
                      }
                  }
                  (is(e, t, a.children, n), (t = t.child));
                }
                return t;
              case 9:
                return (
                  (a = t.type),
                  (r = t.pendingProps.children),
                  aA(t, n),
                  (r = r((a = aL(a)))),
                  (t.flags |= 1),
                  is(e, t, r, n),
                  t.child
                );
              case 14:
                return (
                  (a = a_((r = t.type), t.pendingProps)),
                  (a = a_(r.type, a)),
                  ic(e, t, r, a, n)
                );
              case 15:
                return id(e, t, t.type, t.pendingProps, n);
              case 17:
                return (
                  (r = t.type),
                  (a = t.pendingProps),
                  (a = t.elementType === r ? a : a_(r, a)),
                  iI(e, t),
                  (t.tag = 1),
                  rX(r) ? ((e = !0), rZ(t)) : (e = !1),
                  aA(t, n),
                  aK(t, r, a),
                  aY(t, r, a, n),
                  iy(null, t, r, !0, e, n)
                );
              case 19:
                return iP(e, t, n);
              case 22:
                return ip(e, t, n);
            }
            throw Error(d(156, t.tag));
          };
          var st =
            "function" == typeof reportError
              ? reportError
              : function (e) {
                  console.error(e);
                };
          function sn(e) {
            this._internalRoot = e;
          }
          function sr(e) {
            this._internalRoot = e;
          }
          function sa(e) {
            return !(
              !e ||
              (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
            );
          }
          function sl(e) {
            return !(
              !e ||
              (1 !== e.nodeType &&
                9 !== e.nodeType &&
                11 !== e.nodeType &&
                (8 !== e.nodeType ||
                  " react-mount-point-unstable " !== e.nodeValue))
            );
          }
          function si() {}
          function so(e, t, n, r, a) {
            var l = n._reactRootContainer;
            if (l) {
              var i = l;
              if ("function" == typeof a) {
                var o = a;
                a = function () {
                  var e = o9(i);
                  o.call(e);
                };
              }
              o6(t, i, e, a);
            } else
              i = (function (e, t, n, r, a) {
                if (a) {
                  if ("function" == typeof r) {
                    var l = r;
                    r = function () {
                      var e = o9(i);
                      l.call(e);
                    };
                  }
                  var i = o8(t, r, e, 0, null, !1, !1, "", si);
                  return (
                    (e._reactRootContainer = i),
                    (e[rA] = i.current),
                    rl(8 === e.nodeType ? e.parentNode : e),
                    oA(),
                    i
                  );
                }
                for (; (a = e.lastChild);) e.removeChild(a);
                if ("function" == typeof r) {
                  var o = r;
                  r = function () {
                    var e = o9(s);
                    o.call(e);
                  };
                }
                var s = o4(e, 0, !1, null, null, !1, !1, "", si);
                return (
                  (e._reactRootContainer = s),
                  (e[rA] = s.current),
                  rl(8 === e.nodeType ? e.parentNode : e),
                  oA(function () {
                    o6(t, s, n, r);
                  }),
                  s
                );
              })(n, t, e, a, r);
            return o9(i);
          }
          ((sr.prototype.render = sn.prototype.render =
            function (e) {
              var t = this._internalRoot;
              if (null === t) throw Error(d(409));
              o6(e, t, null, null);
            }),
            (sr.prototype.unmount = sn.prototype.unmount =
              function () {
                var e = this._internalRoot;
                if (null !== e) {
                  this._internalRoot = null;
                  var t = e.containerInfo;
                  (oA(function () {
                    o6(null, e, null, null);
                  }),
                    (t[rA] = null));
                }
              }),
            (sr.prototype.unstable_scheduleHydration = function (e) {
              if (e) {
                var t = th();
                e = { blockedOn: null, target: e, priority: t };
                for (
                  var n = 0;
                  n < tx.length && 0 !== t && t < tx[n].priority;
                  n++
                );
                (tx.splice(n, 0, e), 0 === n && tI(e));
              }
            }),
            (tf = function (e) {
              switch (e.tag) {
                case 3:
                  var t = e.stateNode;
                  if (t.current.memoizedState.isDehydrated) {
                    var n = tr(t.pendingLanes);
                    0 !== n &&
                      (tu(t, 1 | n),
                      ox(t, eZ()),
                      0 == (6 & i5) && ((ou = eZ() + 500), r5()));
                  }
                  break;
                case 13:
                  (oA(function () {
                    var t = az(e, 1);
                    null !== t && o_(t, e, 1, oS());
                  }),
                    se(e, 1));
              }
            }),
            (tp = function (e) {
              if (13 === e.tag) {
                var t = az(e, 134217728);
                (null !== t && o_(t, e, 134217728, oS()), se(e, 134217728));
              }
            }),
            (tm = function (e) {
              if (13 === e.tag) {
                var t = ok(e),
                  n = az(e, t);
                (null !== n && o_(n, e, t, oS()), se(e, t));
              }
            }),
            (th = function () {
              return tc;
            }),
            (tg = function (e, t) {
              var n = tc;
              try {
                return ((tc = e), t());
              } finally {
                tc = n;
              }
            }),
            (eC = function (e, t, n) {
              switch (t) {
                case "input":
                  if (
                    (et(e, n), (t = n.name), "radio" === n.type && null != t)
                  ) {
                    for (n = e; n.parentNode;) n = n.parentNode;
                    for (
                      n = n.querySelectorAll(
                        "input[name=" +
                          JSON.stringify("" + t) +
                          '][type="radio"]',
                      ),
                        t = 0;
                      t < n.length;
                      t++
                    ) {
                      var r = n[t];
                      if (r !== e && r.form === e.form) {
                        var a = r$(r);
                        if (!a) throw Error(d(90));
                        (K(r), et(r, a));
                      }
                    }
                  }
                  break;
                case "textarea":
                  es(e, n);
                  break;
                case "select":
                  null != (t = n.value) && el(e, !!n.multiple, t, !1);
              }
            }),
            (eA = oN),
            (eL = oA));
          var ss = {
              findFiberByHostInstance: rO,
              bundleType: 0,
              version: "18.2.0",
              rendererPackageName: "react-dom",
            },
            su = {
              bundleType: ss.bundleType,
              version: ss.version,
              rendererPackageName: ss.rendererPackageName,
              rendererConfig: ss.rendererConfig,
              overrideHookState: null,
              overrideHookStateDeletePath: null,
              overrideHookStateRenamePath: null,
              overrideProps: null,
              overridePropsDeletePath: null,
              overridePropsRenamePath: null,
              setErrorHandler: null,
              setSuspenseHandler: null,
              scheduleUpdate: null,
              currentDispatcherRef: E.ReactCurrentDispatcher,
              findHostInstanceByFiber: function (e) {
                return null === (e = eQ(e)) ? null : e.stateNode;
              },
              findFiberByHostInstance:
                ss.findFiberByHostInstance ||
                function () {
                  return null;
                },
              findHostInstancesForRefresh: null,
              scheduleRefresh: null,
              scheduleRoot: null,
              setRefreshHandler: null,
              getCurrentFiber: null,
              reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
            };
          if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
            var sc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (!sc.isDisabled && sc.supportsFiber)
              try {
                ((e8 = sc.inject(su)), (e6 = sc));
              } catch (e) {}
          }
          ((n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
            usingClientEntryPoint: !1,
            Events: [rz, rj, r$, eT, eN, oN],
          }),
            (n.createPortal = function (e, t) {
              var n =
                2 < arguments.length && void 0 !== arguments[2]
                  ? arguments[2]
                  : null;
              if (!sa(t)) throw Error(d(200));
              return (function (e, t, n) {
                var r =
                  3 < arguments.length && void 0 !== arguments[3]
                    ? arguments[3]
                    : null;
                return {
                  $$typeof: I,
                  key: null == r ? null : "" + r,
                  children: e,
                  containerInfo: t,
                  implementation: null,
                };
              })(e, t, null, n);
            }),
            (n.createRoot = function (e, t) {
              if (!sa(e)) throw Error(d(299));
              var n = !1,
                r = "",
                a = st;
              return (
                null != t &&
                  (!0 === t.unstable_strictMode && (n = !0),
                  void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
                  void 0 !== t.onRecoverableError &&
                    (a = t.onRecoverableError)),
                (t = o4(e, 1, !1, null, null, n, !1, r, a)),
                (e[rA] = t.current),
                rl(8 === e.nodeType ? e.parentNode : e),
                new sn(t)
              );
            }),
            (n.findDOMNode = function (e) {
              if (null == e) return null;
              if (1 === e.nodeType) return e;
              var t = e._reactInternals;
              if (void 0 === t) {
                if ("function" == typeof e.render) throw Error(d(188));
                throw Error(d(268, (e = Object.keys(e).join(","))));
              }
              return (e = null === (e = eQ(t)) ? null : e.stateNode);
            }),
            (n.flushSync = function (e) {
              return oA(e);
            }),
            (n.hydrate = function (e, t, n) {
              if (!sl(t)) throw Error(d(200));
              return so(null, e, t, !0, n);
            }),
            (n.hydrateRoot = function (e, t, n) {
              if (!sa(e)) throw Error(d(405));
              var r = (null != n && n.hydratedSources) || null,
                a = !1,
                l = "",
                i = st;
              if (
                (null != n &&
                  (!0 === n.unstable_strictMode && (a = !0),
                  void 0 !== n.identifierPrefix && (l = n.identifierPrefix),
                  void 0 !== n.onRecoverableError &&
                    (i = n.onRecoverableError)),
                (t = o8(t, null, e, 1, null != n ? n : null, a, !1, l, i)),
                (e[rA] = t.current),
                rl(e),
                r)
              )
                for (e = 0; e < r.length; e++)
                  ((a = (a = (n = r[e])._getVersion)(n._source)),
                    null == t.mutableSourceEagerHydrationData
                      ? (t.mutableSourceEagerHydrationData = [n, a])
                      : t.mutableSourceEagerHydrationData.push(n, a));
              return new sr(t);
            }),
            (n.render = function (e, t, n) {
              if (!sl(t)) throw Error(d(200));
              return so(null, e, t, !1, n);
            }),
            (n.unmountComponentAtNode = function (e) {
              if (!sl(e)) throw Error(d(40));
              return (
                !!e._reactRootContainer &&
                (oA(function () {
                  so(null, null, e, !1, function () {
                    ((e._reactRootContainer = null), (e[rA] = null));
                  });
                }),
                !0)
              );
            }),
            (n.unstable_batchedUpdates = oN),
            (n.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
              if (!sl(n)) throw Error(d(200));
              if (null == e || void 0 === e._reactInternals) throw Error(d(38));
              return so(e, t, n, !1, r);
            }),
            (n.version = "18.2.0-next-9e3b772b8-20220608"));
        },
        { c293e9ed31165f07: "329PG", fabf034282b0d218: "27BDD" },
      ],
      "27BDD": [
        function (e, t, n) {
          t.exports = e("13524e09db3ad441");
        },
        { "13524e09db3ad441": "jX71I" },
      ],
      jX71I: [
        function (e, t, n) {
          function r(e, t) {
            var n = e.length;
            for (e.push(t); 0 < n;) {
              var r = (n - 1) >>> 1,
                a = e[r];
              if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
              else break;
            }
          }
          function a(e) {
            return 0 === e.length ? null : e[0];
          }
          function l(e) {
            if (0 === e.length) return null;
            var t = e[0],
              n = e.pop();
            if (n !== t) {
              e[0] = n;
              for (var r = 0, a = e.length, l = a >>> 1; r < l;) {
                var o = 2 * (r + 1) - 1,
                  s = e[o],
                  u = o + 1,
                  c = e[u];
                if (0 > i(s, n))
                  u < a && 0 > i(c, s)
                    ? ((e[r] = c), (e[u] = n), (r = u))
                    : ((e[r] = s), (e[o] = n), (r = o));
                else if (u < a && 0 > i(c, n))
                  ((e[r] = c), (e[u] = n), (r = u));
                else break;
              }
            }
            return t;
          }
          function i(e, t) {
            var n = e.sortIndex - t.sortIndex;
            return 0 !== n ? n : e.id - t.id;
          }
          if (
            "object" == typeof performance &&
            "function" == typeof performance.now
          ) {
            var o,
              s = performance;
            n.unstable_now = function () {
              return s.now();
            };
          } else {
            var u = Date,
              c = u.now();
            n.unstable_now = function () {
              return u.now() - c;
            };
          }
          var d = [],
            f = [],
            p = 1,
            m = null,
            h = 3,
            g = !1,
            y = !1,
            v = !1,
            w = "function" == typeof setTimeout ? setTimeout : null,
            b = "function" == typeof clearTimeout ? clearTimeout : null,
            S = "undefined" != typeof setImmediate ? setImmediate : null;
          function k(e) {
            for (var t = a(f); null !== t;) {
              if (null === t.callback) l(f);
              else if (t.startTime <= e)
                (l(f), (t.sortIndex = t.expirationTime), r(d, t));
              else break;
              t = a(f);
            }
          }
          function _(e) {
            if (((v = !1), k(e), !y)) {
              if (null !== a(d)) ((y = !0), M(x));
              else {
                var t = a(f);
                null !== t && O(_, t.startTime - e);
              }
            }
          }
          function x(e, t) {
            ((y = !1), v && ((v = !1), b(P), (P = -1)), (g = !0));
            var r = h;
            try {
              for (
                k(t), m = a(d);
                null !== m && (!(m.expirationTime > t) || (e && !N()));
              ) {
                var i = m.callback;
                if ("function" == typeof i) {
                  ((m.callback = null), (h = m.priorityLevel));
                  var o = i(m.expirationTime <= t);
                  ((t = n.unstable_now()),
                    "function" == typeof o
                      ? (m.callback = o)
                      : m === a(d) && l(d),
                    k(t));
                } else l(d);
                m = a(d);
              }
              if (null !== m) var s = !0;
              else {
                var u = a(f);
                (null !== u && O(_, u.startTime - t), (s = !1));
              }
              return s;
            } finally {
              ((m = null), (h = r), (g = !1));
            }
          }
          "undefined" != typeof navigator &&
            void 0 !== navigator.scheduling &&
            void 0 !== navigator.scheduling.isInputPending &&
            navigator.scheduling.isInputPending.bind(navigator.scheduling);
          var C = !1,
            E = null,
            P = -1,
            I = 5,
            T = -1;
          function N() {
            return !(n.unstable_now() - T < I);
          }
          function A() {
            if (null !== E) {
              var e = n.unstable_now();
              T = e;
              var t = !0;
              try {
                t = E(!0, e);
              } finally {
                t ? o() : ((C = !1), (E = null));
              }
            } else C = !1;
          }
          if ("function" == typeof S)
            o = function () {
              S(A);
            };
          else if ("undefined" != typeof MessageChannel) {
            var L = new MessageChannel(),
              R = L.port2;
            ((L.port1.onmessage = A),
              (o = function () {
                R.postMessage(null);
              }));
          } else
            o = function () {
              w(A, 0);
            };
          function M(e) {
            ((E = e), C || ((C = !0), o()));
          }
          function O(e, t) {
            P = w(function () {
              e(n.unstable_now());
            }, t);
          }
          ((n.unstable_IdlePriority = 5),
            (n.unstable_ImmediatePriority = 1),
            (n.unstable_LowPriority = 4),
            (n.unstable_NormalPriority = 3),
            (n.unstable_Profiling = null),
            (n.unstable_UserBlockingPriority = 2),
            (n.unstable_cancelCallback = function (e) {
              e.callback = null;
            }),
            (n.unstable_continueExecution = function () {
              y || g || ((y = !0), M(x));
            }),
            (n.unstable_forceFrameRate = function (e) {
              0 > e || 125 < e
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                  )
                : (I = 0 < e ? Math.floor(1e3 / e) : 5);
            }),
            (n.unstable_getCurrentPriorityLevel = function () {
              return h;
            }),
            (n.unstable_getFirstCallbackNode = function () {
              return a(d);
            }),
            (n.unstable_next = function (e) {
              switch (h) {
                case 1:
                case 2:
                case 3:
                  var t = 3;
                  break;
                default:
                  t = h;
              }
              var n = h;
              h = t;
              try {
                return e();
              } finally {
                h = n;
              }
            }),
            (n.unstable_pauseExecution = function () {}),
            (n.unstable_requestPaint = function () {}),
            (n.unstable_runWithPriority = function (e, t) {
              switch (e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                  break;
                default:
                  e = 3;
              }
              var n = h;
              h = e;
              try {
                return t();
              } finally {
                h = n;
              }
            }),
            (n.unstable_scheduleCallback = function (e, t, l) {
              var i = n.unstable_now();
              switch (
                ((l =
                  "object" == typeof l &&
                  null !== l &&
                  "number" == typeof (l = l.delay) &&
                  0 < l
                    ? i + l
                    : i),
                e)
              ) {
                case 1:
                  var o = -1;
                  break;
                case 2:
                  o = 250;
                  break;
                case 5:
                  o = 1073741823;
                  break;
                case 4:
                  o = 1e4;
                  break;
                default:
                  o = 5e3;
              }
              return (
                (o = l + o),
                (e = {
                  id: p++,
                  callback: t,
                  priorityLevel: e,
                  startTime: l,
                  expirationTime: o,
                  sortIndex: -1,
                }),
                l > i
                  ? ((e.sortIndex = l),
                    r(f, e),
                    null === a(d) &&
                      e === a(f) &&
                      (v ? (b(P), (P = -1)) : (v = !0), O(_, l - i)))
                  : ((e.sortIndex = o), r(d, e), y || g || ((y = !0), M(x))),
                e
              );
            }),
            (n.unstable_shouldYield = N),
            (n.unstable_wrapCallback = function (e) {
              var t = h;
              return function () {
                var n = h;
                h = t;
                try {
                  return e.apply(this, arguments);
                } finally {
                  h = n;
                }
              };
            }));
        },
        {},
      ],
      gcN4J: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          async function a(e) {
            let t = document.createElement("plasmo-csui"),
              n =
                "function" == typeof e.createShadowRoot
                  ? await e.createShadowRoot(t)
                  : t.attachShadow({ mode: "open" }),
              r = document.createElement("div");
            return (
              (r.id = "plasmo-shadow-container"),
              (r.style.zIndex = "2147483647"),
              (r.style.position = "relative"),
              n.appendChild(r),
              { shadowHost: t, shadowRoot: n, shadowContainer: r }
            );
          }
          async function l(e, t, { shadowHost: n, shadowRoot: r }, a) {
            if ("function" == typeof e.getStyle) {
              let n =
                "function" == typeof e.getSfcStyleContent
                  ? await e.getSfcStyleContent()
                  : "";
              r.prepend(await e.getStyle({ ...t, sfcStyleContent: n }));
            }
            ("function" == typeof e.getShadowHostId &&
              (n.id = await e.getShadowHostId(t)),
              "function" == typeof e.mountShadowHost
                ? await e.mountShadowHost({
                    shadowHost: n,
                    anchor: t,
                    mountState: a,
                  })
                : "inline" === t.type
                  ? t.element.insertAdjacentElement(
                      t.insertPosition || "afterend",
                      n,
                    )
                  : document.documentElement.prepend(n));
          }
          async function i(e, t, n) {
            let r = await a(e);
            return (
              n?.hostSet.add(r.shadowHost),
              n?.hostMap.set(r.shadowHost, t),
              await l(e, t, r, n),
              r.shadowContainer
            );
          }
          (r.defineInteropFlag(n),
            r.export(n, "createShadowContainer", () => i),
            r.export(n, "createAnchorObserver", () => s),
            r.export(n, "createRender", () => u));
          let o = (e) => {
            if (!e) return !1;
            let t = e.getBoundingClientRect(),
              n = globalThis.getComputedStyle(e);
            return (
              "none" !== n.display &&
              "hidden" !== n.visibility &&
              "0" !== n.opacity &&
              (0 !== t.width || 0 !== t.height || "hidden" === n.overflow) &&
              !(t.x + t.width < 0) &&
              !(t.y + t.height < 0)
            );
          };
          function s(e) {
            let t = {
                document: document || window.document,
                observer: null,
                mountInterval: null,
                isMounting: !1,
                isMutated: !1,
                hostSet: new Set(),
                hostMap: new WeakMap(),
                overlayTargetList: [],
              },
              n = (e) =>
                e?.id
                  ? !!document.getElementById(e.id)
                  : e?.getRootNode({ composed: !0 }) === t.document,
              r = "function" == typeof e.getInlineAnchor,
              a = "function" == typeof e.getOverlayAnchor,
              l = "function" == typeof e.getInlineAnchorList,
              i = "function" == typeof e.getOverlayAnchorList;
            if (!(r || a || l || i)) return null;
            async function s(u) {
              t.isMounting = !0;
              let c = new WeakSet(),
                d = null;
              for (let e of t.hostSet) {
                let r = t.hostMap.get(e),
                  a = document.contains(r?.element);
                n(e) && a
                  ? "inline" === r.type
                    ? c.add(r.element)
                    : "overlay" === r.type && (d = e)
                  : (r.root?.unmount(), e.remove(), t.hostSet.delete(e));
              }
              let [f, p, m, h] = await Promise.all([
                  r ? e.getInlineAnchor() : null,
                  l ? e.getInlineAnchorList() : null,
                  a ? e.getOverlayAnchor() : null,
                  i ? e.getOverlayAnchorList() : null,
                ]),
                g = [];
              (f &&
                (f instanceof Element
                  ? c.has(f) || g.push({ element: f, type: "inline" })
                  : f.element instanceof Element &&
                    !c.has(f.element) &&
                    g.push({
                      element: f.element,
                      type: "inline",
                      insertPosition: f.insertPosition,
                    })),
                (p?.length || 0) > 0 &&
                  p.forEach((e) => {
                    e instanceof Element && !c.has(e)
                      ? g.push({ element: e, type: "inline" })
                      : e.element instanceof Element &&
                        !c.has(e.element) &&
                        g.push({
                          element: e.element,
                          type: "inline",
                          insertPosition: e.insertPosition,
                        });
                  }));
              let y = [];
              (m && o(m) && y.push(m),
                (h?.length || 0) > 0 &&
                  h.forEach((e) => {
                    e instanceof Element && o(e) && y.push(e);
                  }),
                y.length > 0
                  ? ((t.overlayTargetList = y),
                    d ||
                      g.push({
                        element: document.documentElement,
                        type: "overlay",
                      }))
                  : (d?.remove(), t.hostSet.delete(d)),
                await Promise.all(g.map(u)),
                t.isMutated && ((t.isMutated = !1), await s(u)),
                (t.isMounting = !1));
            }
            return {
              start: (e) => {
                ((t.observer = new MutationObserver(() => {
                  if (t.isMounting) {
                    t.isMutated = !0;
                    return;
                  }
                  s(e);
                })),
                  t.observer.observe(document.documentElement, {
                    childList: !0,
                    subtree: !0,
                  }),
                  (t.mountInterval = setInterval(() => {
                    if (t.isMounting) {
                      t.isMutated = !0;
                      return;
                    }
                    s(e);
                  }, 142)));
              },
              mountState: t,
            };
          }
          let u = (e, t, n, r) => {
            let a = (t) =>
              "function" == typeof e.getRootContainer
                ? e.getRootContainer({ anchor: t, mountState: n })
                : i(e, t, n);
            return "function" == typeof e.render
              ? (n) => e.render({ anchor: n, createRootContainer: a }, ...t)
              : async (e) => {
                  let t = await a(e);
                  return r(e, t);
                };
          };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl" },
      ],
      cHUbl: [
        function (e, t, n) {
          ((n.interopDefault = function (e) {
            return e && e.__esModule ? e : { default: e };
          }),
            (n.defineInteropFlag = function (e) {
              Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (n.exportAll = function (e, t) {
              return (
                Object.keys(e).forEach(function (n) {
                  "default" === n ||
                    "__esModule" === n ||
                    t.hasOwnProperty(n) ||
                    Object.defineProperty(t, n, {
                      enumerable: !0,
                      get: function () {
                        return e[n];
                      },
                    });
                }),
                t
              );
            }),
            (n.export = function (e, t, n) {
              Object.defineProperty(e, t, { enumerable: !0, get: n });
            }));
        },
        {},
      ],
      e8dRS: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "OverlayCSUIContainer", () => o),
            r.export(n, "InlineCSUIContainer", () => s));
          var a = e("react/jsx-runtime"),
            l = e("react"),
            i = r.interopDefault(l);
          let o = (e) => {
              let [t, n] = (0, i.default).useState(0),
                [r, l] = (0, i.default).useState(0);
              return (
                (0, i.default).useEffect(() => {
                  if ("overlay" !== e.anchor.type) return;
                  let t = async () => {
                    let t = e.anchor.element?.getBoundingClientRect();
                    if (!t) return;
                    let r = {
                      left: t.left + window.scrollX,
                      top: t.top + window.scrollY,
                    };
                    (l(r.left), n(r.top));
                  };
                  t();
                  let r = e.watchOverlayAnchor?.(t);
                  return (
                    window.addEventListener("scroll", t),
                    window.addEventListener("resize", t),
                    () => {
                      ("function" == typeof r && r(),
                        window.removeEventListener("scroll", t),
                        window.removeEventListener("resize", t));
                    }
                  );
                }, [e.anchor.element]),
                (0, a.jsx)("div", {
                  id: e.id,
                  className: "plasmo-csui-container",
                  style: {
                    display: "flex",
                    position: "absolute",
                    top: t,
                    left: r,
                  },
                  children: e.children,
                })
              );
            },
            s = (e) =>
              (0, a.jsx)("div", {
                id: "plasmo-inline",
                className: "plasmo-csui-container",
                style: {
                  display: "flex",
                  position: "relative",
                  top: 0,
                  left: 0,
                },
                children: e.children,
              });
        },
        {
          "react/jsx-runtime": "8iOxN",
          react: "329PG",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      "4kz0G": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n), r.export(n, "getLayout", () => l));
          var a = e("react");
          let l = (e) =>
            "function" == typeof e.Layout
              ? e.Layout
              : "function" == typeof e.getGlobalProvider
                ? e.getGlobalProvider()
                : a.Fragment;
        },
        {
          react: "329PG",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      llHpa: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n), r.export(n, "config", () => P));
          var a = e("react"),
            l = e("~lib/conversation-title"),
            i = e("~platforms/chatgpt/adapter"),
            o = e("~platforms/claude/org-id"),
            s = e("~platforms/detector"),
            u = e("~platforms/gemini/api-client"),
            c = e("~platforms/perplexity/url"),
            d = e("~platforms/runtime-context");
          let f = (e) =>
              (e || "")
                .trim()
                .replace(/[\n\r]+/g, " ")
                .replace(/\s+/g, " ")
                .trim(),
            p = (e) => {
              let t = f(e).toLowerCase();
              return !t || "gemini" === t || "__msg_extensionname__" === t;
            },
            m = () => {
              let e = f(document.title);
              if (e && !p(e)) return e;
              for (let e of [
                '[data-test-id="conversation-title"]',
                ".conversation-title-container [data-test-id='conversation-title']",
                "conversation-actions",
                ".conversation-title-container",
              ]) {
                let t = document.querySelector(e),
                  n = f(t?.innerText || "");
                if (n && !p(n)) return n;
              }
              return "";
            },
            h = async (e, t, n) => {
              let r;
              let a = t.replace(/^c_/, ""),
                l = 0;
              for (; l < 3;) {
                l += 1;
                let t = await e.getConversationList(r, n),
                  i = t.conversations.find((e) => {
                    let t = String(e.id || "").replace(/^c_/, "");
                    return t === a;
                  });
                if (i?.title && !p(i.title)) return i.title;
                if (!t.nextPageToken) break;
                r = t.nextPageToken;
              }
              return "";
            },
            g = async (e, t, n) => {
              let r = m();
              return r || (await h(e, t, n));
            },
            y = (e) => {
              try {
                let t = new URL(e),
                  n = t.pathname.match(/\/u\/(\d+)(?:\/|$)/);
                return n?.[1] ? `u${n[1]}` : "default";
              } catch {
                return "default";
              }
            },
            v = (e, t) => {
              let n = y(t ?? window.location.href);
              return "default" !== n
                ? `u:${n.slice(1)}`
                : e?.trim()
                  ? `sid:${e.trim()}`
                  : "default";
            },
            w = async () => {
              let e = await chrome.storage.local.get([
                  "gemini_credentials",
                  "gemini_credentials_map",
                ]),
                t = y(window.location.href),
                n = e.gemini_credentials_map ?? {},
                r = Object.values(n)
                  .filter((e) => e?.sid)
                  .sort((e, t) => (t.lastUsed ?? 0) - (e.lastUsed ?? 0)),
                a = r.find((e) => (e.accountSlot ?? "default") === t),
                l =
                  "string" == typeof e.gemini_credentials?.sid
                    ? e.gemini_credentials.sid
                    : "",
                i = a ?? ("default" === t ? r[0] : null),
                o = i?.sid ?? ("default" === t ? l : "");
              return {
                accountScope: v(o, window.location.href),
                sid: o,
                sidSource: i
                  ? a
                    ? "slot-match"
                    : "latest-fallback"
                  : o
                    ? "legacy-fallback"
                    : "missing-slot-credentials",
              };
            },
            b = async (e) =>
              await new Promise((t, n) => {
                let r = new FileReader();
                ((r.onloadend = () => {
                  if ("string" == typeof r.result) {
                    t(r.result);
                    return;
                  }
                  n(
                    Error(
                      "The authenticated file download could not be encoded.",
                    ),
                  );
                }),
                  (r.onerror = () => {
                    n(
                      Error(
                        "The authenticated file download could not be read.",
                      ),
                    );
                  }),
                  r.readAsDataURL(e));
              }),
            S = (e) => {
              try {
                let t = new URL(e),
                  n = t.hostname.toLowerCase();
                if ("ppl-ai-file-upload.s3.amazonaws.com" === n) return "omit";
              } catch {}
              return "include";
            },
            k = (e) => {
              try {
                let t = new URL(e);
                return (
                  "ppl-ai-file-upload.s3.amazonaws.com" ===
                  t.hostname.toLowerCase()
                );
              } catch {
                return !1;
              }
            },
            _ = (e) => {
              try {
                let t = new URL(e);
                if (
                  "ppl-ai-file-upload.s3.amazonaws.com" !==
                  t.hostname.toLowerCase()
                )
                  return e;
                return `${t.origin}${t.pathname}`;
              } catch {
                return e;
              }
            },
            x = async ({ threadId: e, url: t }) => {
              let n =
                  "https://www.perplexity.ai/rest/file-repository/download-attachment?version=2.18&source=default",
                r = {
                  accept: "*/*",
                  "content-type": "application/json",
                  "x-app-apiclient": "default",
                  "x-app-apiversion": "2.18",
                  "x-perplexity-request-endpoint": n,
                  "x-perplexity-request-reason": "attachments-row",
                  "x-perplexity-request-try-number": "1",
                },
                a = async (t) => {
                  let a = await fetch(n, {
                    body: JSON.stringify({ thread_id: e, url: t }),
                    credentials: "include",
                    headers: r,
                    method: "POST",
                  });
                  if (!a.ok)
                    throw Error(
                      `Perplexity attachment download failed with status ${a.status}.`,
                    );
                  let l = a.headers.get("content-type")?.toLowerCase() ?? "";
                  if (!l.includes("application/json")) return await a.blob();
                  let i = await a.json(),
                    o = i.file_url?.trim() ?? "";
                  if (!o)
                    throw Error(
                      "Perplexity attachment response did not include file_url.",
                    );
                  let s = await fetch(o, {
                    credentials: S(o),
                    headers: { accept: "*/*" },
                    method: "GET",
                  });
                  if (!s.ok)
                    throw Error(
                      `Perplexity file_url download failed with status ${s.status}.`,
                    );
                  return await s.blob();
                },
                l = _(t);
              if (l === t) return await a(t);
              try {
                return await a(l);
              } catch {
                return await a(t);
              }
            },
            C = () => {
              if (
                document.querySelector(
                  "[data-ai-chats-hub-gemini-credentials='true']",
                )
              )
                return;
              let e = document.createElement("script");
              ((e.src = chrome.runtime.getURL("gemini-hook-credentials.js")),
                (e.type = "text/javascript"),
                (e.async = !1),
                (e.dataset.aiChatsHubGeminiCredentials = "true"),
                document.documentElement.appendChild(e),
                e.remove());
            },
            E = () => {
              if (
                document.querySelector(
                  "[data-ai-chats-hub-claude-org-id='true']",
                )
              )
                return;
              let e = document.createElement("script");
              ((e.src = chrome.runtime.getURL("claude-hook-org-id.js")),
                (e.type = "text/javascript"),
                (e.async = !1),
                (e.dataset.aiChatsHubClaudeOrgId = "true"),
                document.documentElement.appendChild(e),
                e.remove(),
                console.log("[Claude] Injected org-id hook script"));
            },
            P = {
              matches: [
                "https://chatgpt.com/*",
                "https://chat.openai.com/*",
                "https://claude.ai/*",
                "https://gemini.google.com/*",
                "https://perplexity.ai/*",
                "https://www.perplexity.ai/*",
              ],
              run_at: "document_start",
            };
          n.default = () => (
            (0, a.useEffect)(() => {
              let e = (0, s.detectPlatformFromUrl)(window.location.href),
                t =
                  e.platform?.id === "gemini" ? new u.GeminiAPIClient() : null,
                n = window === window.top,
                r = null,
                a = null,
                f = null;
              if (
                (console.info("[AI Saver][content] Booting content bridge.", {
                  isSupported: e.isSupported,
                  platformId: e.platform?.id ?? null,
                  url: window.location.href,
                }),
                t && n && (t.initialize().catch(console.error), C()),
                e.platform?.id === "claude" && n)
              ) {
                E();
                let e = () => {
                  (0, o.captureClaudeOrgIdFromPage)();
                };
                (console.log(
                  "[Claude] Shared content bridge initialized:",
                  window.location.href,
                ),
                  e(),
                  (r = new MutationObserver(() => {
                    (null !== a && window.clearTimeout(a),
                      (a = window.setTimeout(() => {
                        e();
                      }, 250)));
                  })).observe(document.documentElement, {
                    childList: !0,
                    subtree: !0,
                  }),
                  (f = window.setInterval(() => {
                    e();
                  }, 1500)),
                  window.setTimeout(() => {
                    null !== f && (window.clearInterval(f), (f = null));
                  }, 15e3));
              }
              let p = async (e) => {
                  if (
                    e.source === window &&
                    e.data?.type === "GEMINI_CREDENTIALS"
                  )
                    try {
                      let t = e.data.payload ?? {},
                        n = "string" == typeof t.sid ? t.sid : "",
                        r =
                          "string" == typeof t.accountSlot &&
                          t.accountSlot.trim()
                            ? t.accountSlot
                            : y(window.location.href),
                        a = await chrome.storage.local.get(
                          "gemini_credentials_map",
                        ),
                        l = a.gemini_credentials_map ?? {};
                      (n &&
                        (l[n] = {
                          ...(l[n] ?? {}),
                          ...t,
                          accountSlot: r,
                          lastUsed: Date.now(),
                          sid: n,
                          timestamp: Date.now(),
                        }),
                        await chrome.storage.local.set({
                          ...(n ? { gemini_credentials_map: l } : {}),
                          gemini_credentials: {
                            ...t,
                            accountSlot: r,
                            lastUsed: Date.now(),
                            sid: n,
                            timestamp: Date.now(),
                          },
                        }));
                    } catch (e) {
                      console.error("Error storing Gemini credentials:", e);
                    }
                },
                m = async (e) => {
                  if (
                    e.source === window &&
                    e.data?.type === "CLAUDE_ORG_ID" &&
                    e.data?.payload?.orgId
                  )
                    try {
                      (await chrome.storage.local.set({
                        "ai-exporter-hub:claude-org-id": e.data.payload.orgId,
                      }),
                        console.log(
                          "[Claude] Org ID stored from page hook:",
                          e.data.payload.source,
                          e.data.payload.orgId,
                        ));
                    } catch (e) {
                      console.error(
                        "[Claude] Failed to persist org ID from page hook:",
                        e,
                      );
                    }
                },
                h = (e, n) => {
                  if (!t || window !== window.top) return !1;
                  if ("checkGeminiStatus" === e.action) {
                    let e = t.getCurrentConversationId();
                    return (
                      w()
                        .then((t) => {
                          n({
                            success: !0,
                            isConversationPage: !!e,
                            conversationId: e,
                            url: window.location.href,
                            ...t,
                          });
                        })
                        .catch(() => {
                          n({
                            success: !0,
                            isConversationPage: !!e,
                            conversationId: e,
                            url: window.location.href,
                            accountScope: "default",
                            sid: "",
                            sidSource: "storage-error",
                          });
                        }),
                      !0
                    );
                  }
                  if ("getCurrentConversation" === e.action) {
                    let r = async (a = 0) => {
                      let i = t.getCurrentConversationId();
                      if (i) {
                        try {
                          let r = await t.getConversationDetail(i, e.targetSid);
                          (r.id || (r.id = i.startsWith("c_") ? i : `c_${i}`),
                            (r.url = window.location.href));
                          let a = await g(t, i, e.targetSid);
                          (a &&
                            (r.title = (0, l.normalizeConversationTitle)(a)),
                            n({ success: !0, data: r }));
                        } catch (e) {
                          n({
                            success: !1,
                            error:
                              e instanceof Error
                                ? e.message
                                : "Failed to load the current Gemini conversation.",
                          });
                        }
                        return;
                      }
                      if (a < 3) {
                        window.setTimeout(() => {
                          r(a + 1);
                        }, 100);
                        return;
                      }
                      n({
                        success: !1,
                        error:
                          "Cannot get current conversation id, please ensure you are in the conversation page.",
                      });
                    };
                    return (r(), !0);
                  }
                  if ("getCurrentConversationPreview" === e.action) {
                    let r = async (a = 0) => {
                      let i = t.getCurrentConversationId();
                      if (i) {
                        try {
                          let r = await t.getConversationPreview(
                            i,
                            e.targetSid,
                          );
                          (r.id || (r.id = i.startsWith("c_") ? i : `c_${i}`),
                            (r.url = window.location.href));
                          let a = await g(t, i, e.targetSid);
                          (a &&
                            (r.title = (0, l.normalizeConversationTitle)(a)),
                            n({ success: !0, data: r }));
                        } catch (e) {
                          n({
                            success: !1,
                            error:
                              e instanceof Error
                                ? e.message
                                : "Failed to load the current Gemini conversation preview.",
                          });
                        }
                        return;
                      }
                      if (a < 3) {
                        window.setTimeout(() => {
                          r(a + 1);
                        }, 100);
                        return;
                      }
                      n({
                        success: !1,
                        error:
                          "Cannot get current conversation id, please ensure you are in the conversation page.",
                      });
                    };
                    return (r(), !0);
                  }
                  return "getConversationList" === e.action
                    ? (t
                        .getConversationList(e.pageToken, e.targetSid)
                        .then((e) => n({ success: !0, data: e }))
                        .catch((e) =>
                          n({
                            success: !1,
                            error:
                              e instanceof Error
                                ? e.message
                                : "Failed to load the Gemini conversation list.",
                          }),
                        ),
                      !0)
                    : "getGemsList" === e.action
                      ? (t
                          .getGemsList(e.targetSid)
                          .then((e) => n({ success: !0, data: e }))
                          .catch((e) =>
                            n({
                              success: !1,
                              error:
                                e instanceof Error
                                  ? e.message
                                  : "Failed to load the Gemini Gems list.",
                            }),
                          ),
                        !0)
                      : "getGemConversationList" === e.action
                        ? (t
                            .getGemConversationList(
                              e.gemId ?? "",
                              e.pageToken,
                              e.targetSid,
                            )
                            .then((e) => n({ success: !0, data: e }))
                            .catch((e) =>
                              n({
                                success: !1,
                                error:
                                  e instanceof Error
                                    ? e.message
                                    : "Failed to load the Gemini Gem conversation list.",
                              }),
                            ),
                          !0)
                        : "getConversationDetail" === e.action &&
                          (t
                            .getConversationDetail(
                              e.conversationId ?? "",
                              e.targetSid,
                            )
                            .then((r) => {
                              let a = t.getCurrentConversationId(),
                                i = (e.conversationId ?? "").replace(/^c_/, "");
                              if (
                                (a &&
                                  i &&
                                  a === i &&
                                  (r.url = window.location.href),
                                a && i && a === i)
                              )
                                return g(t, i, e.targetSid).then((e) => {
                                  (e &&
                                    (r.title = (0,
                                    l.normalizeConversationTitle)(e)),
                                    n({ success: !0, data: r }));
                                });
                              n({ success: !0, data: r });
                            })
                            .catch((e) =>
                              n({
                                success: !1,
                                error:
                                  e instanceof Error
                                    ? e.message
                                    : "Failed to load the Gemini conversation detail.",
                              }),
                            ),
                          !0);
                },
                v = async (e) => {
                  let t = (0, s.detectPlatformFromUrl)(window.location.href);
                  console.info("[AI Saver][content] Message received.", {
                    action: e.action ?? null,
                    platformId: t.platform?.id ?? null,
                    url: window.location.href,
                  });
                  let n = {
                    ok: t.isSupported,
                    platformId: t.platform?.id,
                    pageTitle: document.title,
                    url: window.location.href,
                  };
                  if ("AI_EXPORTER_HUB_PING" === e.action) return n;
                  if ("AI_EXPORTER_HUB_GET_CONTEXT" === e.action) {
                    if (!t.isSupported || !t.platform)
                      return {
                        ...n,
                        ok: !1,
                        error:
                          t.reason ||
                          "The current page is not supported for runtime context loading.",
                      };
                    try {
                      let e = await (0, d.getPlatformRuntimeContext)(
                        t.platform.id,
                        window.location.href,
                      );
                      return { ...e, pageTitle: document.title };
                    } catch (e) {
                      return {
                        ...n,
                        error:
                          e instanceof Error
                            ? e.message
                            : "Runtime context loading failed unexpectedly.",
                        ok: !1,
                      };
                    }
                  }
                  if ("AI_EXPORTER_HUB_GET_CONVERSATION_DETAILS" === e.action) {
                    if (!t.isSupported || !t.platform)
                      return {
                        ok: !1,
                        error:
                          t.reason ||
                          "The current page is not supported for conversation detail loading.",
                      };
                    try {
                      let n = await (0, d.getPlatformConversationDetails)(
                        t.platform.id,
                        Array.isArray(e.conversationIds)
                          ? e.conversationIds
                          : [],
                        {
                          chatGptContentMode: e.chatGptContentMode,
                          chatGptGroupChatSyncMode: e.chatGptGroupChatSyncMode,
                          chatGptProjectSyncMode: e.chatGptProjectSyncMode,
                          targetSid: e.targetSid,
                        },
                      );
                      return { ok: !0, details: n };
                    } catch (e) {
                      return {
                        ok: !1,
                        error:
                          e instanceof Error
                            ? e.message
                            : "Conversation detail loading failed unexpectedly.",
                      };
                    }
                  }
                  if (
                    "AI_EXPORTER_HUB_GET_CONVERSATION_SUMMARIES" === e.action
                  ) {
                    if (!t.isSupported || !t.platform)
                      return {
                        ok: !1,
                        error:
                          t.reason ||
                          "The current page is not supported for conversation summary loading.",
                      };
                    try {
                      let n = await (0, d.getPlatformConversationSummaries)(
                        t.platform.id,
                        "number" == typeof e.maxCount ? e.maxCount : 8,
                        {
                          chatGptContentMode: e.chatGptContentMode,
                          chatGptGroupChatSyncMode: e.chatGptGroupChatSyncMode,
                          chatGptProjectId: e.chatGptProjectId,
                          chatGptProjectSyncMode: e.chatGptProjectSyncMode,
                          perplexityContentMode: e.perplexityContentMode,
                          perplexitySelectedSpaceSlugs:
                            e.perplexitySelectedSpaceSlugs,
                          targetSid: e.targetSid,
                        },
                      );
                      return { ok: !0, summaries: n };
                    } catch (e) {
                      return {
                        ok: !1,
                        error:
                          e instanceof Error
                            ? e.message
                            : "Conversation summary loading failed unexpectedly.",
                      };
                    }
                  }
                  if ("AI_EXPORTER_HUB_GET_PROJECTS" === e.action) {
                    if (!t.isSupported || !t.platform)
                      return {
                        ok: !1,
                        error:
                          t.reason ||
                          "The current page is not supported for project loading.",
                      };
                    console.info(
                      "[AI Saver][content] Loading platform projects.",
                      { platformId: t.platform.id, url: window.location.href },
                    );
                    try {
                      let e = await (0, d.getPlatformProjects)(
                        t.platform.id,
                        window.location.href,
                      );
                      return (
                        console.info(
                          "[AI Saver][content] Platform projects loaded.",
                          {
                            ok: e.ok,
                            platformId: e.platformId,
                            projectCount: Array.isArray(e.projects)
                              ? e.projects.length
                              : null,
                          },
                        ),
                        e
                      );
                    } catch (e) {
                      return (
                        console.error(
                          "[AI Saver][content] Platform projects failed.",
                          e,
                        ),
                        {
                          ok: !1,
                          error:
                            e instanceof Error
                              ? e.message
                              : "Project loading failed unexpectedly.",
                        }
                      );
                    }
                  }
                  if ("AI_EXPORTER_HUB_GET_CHATGPT_LIBRARY_PAGE" === e.action) {
                    if (t.platform?.id !== "chatgpt")
                      return {
                        ok: !1,
                        cursor: null,
                        items: [],
                        error: "Open a ChatGPT tab before loading the Library.",
                      };
                    try {
                      let t = await (0, i.getChatGptLibraryPage)({
                        cursor: "string" == typeof e.cursor ? e.cursor : null,
                        limit: 50,
                      });
                      return { ok: !0, ...t };
                    } catch (e) {
                      return {
                        ok: !1,
                        cursor: null,
                        items: [],
                        error:
                          e instanceof Error
                            ? e.message
                            : "ChatGPT Library could not be loaded.",
                      };
                    }
                  }
                  if (
                    "AI_EXPORTER_HUB_GET_CHATGPT_LIBRARY_DOWNLOAD_URL" ===
                    e.action
                  ) {
                    if (t.platform?.id !== "chatgpt")
                      return {
                        ok: !1,
                        error:
                          "Open a ChatGPT tab before downloading Library files.",
                      };
                    if ("string" != typeof e.fileId || !e.fileId.trim())
                      return {
                        ok: !1,
                        error: "The ChatGPT Library file id is missing.",
                      };
                    try {
                      let t = await (0, i.getChatGptLibraryFileDownloadInfo)({
                        fileId: e.fileId.trim(),
                        originationThreadId:
                          "string" == typeof e.originationThreadId &&
                          e.originationThreadId.trim()
                            ? e.originationThreadId.trim()
                            : null,
                      });
                      if (!t?.download_url)
                        return {
                          ok: !1,
                          error:
                            "ChatGPT did not return a Library download URL.",
                        };
                      return {
                        downloadUrl: t.download_url,
                        fileName: t.file_name,
                        mimeType: t.mime_type,
                        ok: !0,
                      };
                    } catch (e) {
                      return {
                        ok: !1,
                        error:
                          e instanceof Error
                            ? e.message
                            : "ChatGPT Library download URL could not be resolved.",
                      };
                    }
                  }
                  if (
                    "AI_EXPORTER_HUB_DOWNLOAD_AUTHENTICATED_FILE" === e.action
                  ) {
                    if ("string" != typeof e.url || !e.url.trim())
                      return {
                        ok: !1,
                        error: "The authenticated file URL is missing.",
                      };
                    try {
                      let n;
                      if (
                        (console.info(
                          "[AI Saver][content] Download authenticated file request received.",
                          {
                            platform: t.platform?.id ?? null,
                            threadId:
                              "string" == typeof e.threadId ? e.threadId : null,
                            url: e.url,
                          },
                        ),
                        t.platform?.id === "perplexity" && k(e.url))
                      ) {
                        let t =
                          "string" == typeof e.threadId && e.threadId.trim()
                            ? e.threadId.trim()
                            : (0, c.extractPerplexityThreadId)(
                                window.location.href,
                              );
                        if (!t)
                          throw Error(
                            "The Perplexity thread id is missing for attachment download.",
                          );
                        n = await x({ threadId: t, url: e.url });
                      } else {
                        console.info(
                          "[AI Saver][content] Fetching authenticated asset in page context.",
                          {
                            credentials: S(e.url),
                            platform: t.platform?.id ?? null,
                            url: e.url,
                          },
                        );
                        let r = await fetch(e.url, {
                          credentials: S(e.url),
                          headers: { accept: "*/*" },
                          method: "GET",
                        });
                        if (!r.ok)
                          throw Error(
                            `Authenticated file download failed with status ${r.status}.`,
                          );
                        n = await r.blob();
                      }
                      console.info(
                        "[AI Saver][content] Authenticated asset fetched successfully.",
                        {
                          byteSize: n.size,
                          mimeType: n.type || "",
                          platform: t.platform?.id ?? null,
                          url: e.url,
                        },
                      );
                      let r = await b(n);
                      return { ok: !0, dataUrl: r, mimeType: n.type || "" };
                    } catch (n) {
                      return (
                        console.warn(
                          "[AI Saver][content] Authenticated asset fetch failed.",
                          {
                            error: n instanceof Error ? n.message : String(n),
                            platform: t.platform?.id ?? null,
                            url: e.url,
                          },
                        ),
                        {
                          ok: !1,
                          error:
                            n instanceof Error
                              ? n.message
                              : "Authenticated file download failed unexpectedly.",
                        }
                      );
                    }
                  }
                  throw Error(`Unknown action: ${e.action}`);
                };
              return (
                chrome.runtime.onMessage.addListener((e, t, n) => {
                  if (
                    s.detectPlatformFromUrl(window.location.href).platform
                      ?.id === "gemini"
                  ) {
                    let t = h(e, n);
                    if (t) return !0;
                    if ("checkGeminiStatus" === e.action) return !1;
                  }
                  return (
                    v(e)
                      .then((e) => {
                        n(e);
                      })
                      .catch((e) => {
                        (console.error(
                          "[AI Saver][content] Message handler error:",
                          e,
                        ),
                          n({
                            ok: !1,
                            error:
                              e instanceof Error
                                ? e.message
                                : "Message handling failed unexpectedly.",
                          }));
                      }),
                    !0
                  );
                }),
                console.info(
                  "[AI Saver][content] Message listener registered.",
                  {
                    platformId: e.platform?.id ?? null,
                    url: window.location.href,
                  },
                ),
                window.addEventListener("message", p),
                window.addEventListener("message", m),
                () => {
                  (window.removeEventListener("message", p),
                    window.removeEventListener("message", m),
                    r?.disconnect(),
                    null !== a && window.clearTimeout(a),
                    null !== f && window.clearInterval(f));
                }
              );
            }, []),
            null
          );
        },
        {
          react: "329PG",
          "~lib/conversation-title": "jk7Hl",
          "~platforms/chatgpt/adapter": "4oUPE",
          "~platforms/claude/org-id": "2k7nQ",
          "~platforms/detector": "1a9X3",
          "~platforms/gemini/api-client": "6PiqT",
          "~platforms/perplexity/url": "7yY77",
          "~platforms/runtime-context": "gTfMj",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      jk7Hl: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "normalizeConversationTitle", () => i),
            r.export(n, "escapeYamlDoubleQuotedString", () => o));
          let a = /[\uE000-\uF8FF]/g,
            l = /[\u0000-\u001F\u007F-\u009F]/g,
            i = (e, t = {}) => {
              let n = t.fallback ?? "Untitled Conversation",
                r = t.maxLength ?? 80,
                i = e
                  .replace(a, " ")
                  .replace(l, " ")
                  .replace(/[\r\n\t]+/g, " ")
                  .replace(/\s+/g, " ")
                  .trim();
              return (i && i.slice(0, r).trim()) || n;
            },
            o = (e) => e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl" },
      ],
      "4oUPE": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "getChatGptLibraryPage", () => B),
            r.export(n, "getChatGptLibraryFileDownloadInfo", () => W),
            r.export(n, "getChatGptProjectList", () => V),
            r.export(n, "getChatGptConversationListPage", () => et),
            r.export(n, "getChatGptConversationSummaries", () => en),
            r.export(n, "getChatGptConversationDetail", () => er),
            r.export(n, "getChatGptRuntimeContext", () => ea));
          var a = e("~platforms/registry");
          let l = 28,
            i = 1e4;
          class o extends Error {
            constructor(e, t) {
              (super(t || `ChatGPT API request failed with status ${e}.`),
                (this.name = "ChatGptApiError"),
                (this.status = e));
            }
          }
          let s = (e) =>
              e instanceof o && (409 === e.status || 429 === e.status),
            u = (e) => {
              try {
                let t = new URL(e),
                  n = t.pathname.split("/").filter(Boolean),
                  r = n.indexOf("c");
                if (r >= 0 && n[r + 1]) return n[r + 1];
                return null;
              } catch {
                return null;
              }
            },
            c = (e) => `gg:${e}`,
            d = (e) => (e?.startsWith("gg:") ? e.slice(3) : null),
            f = (e) => {
              if ("number" != typeof e || Number.isNaN(e)) return null;
              let t = new Date(1e3 * e);
              return Number.isNaN(t.getTime()) ? null : t.toISOString();
            },
            p = (e) => {
              if ("number" == typeof e) return f(e);
              if ("string" != typeof e || !e.trim()) return null;
              let t = new Date(e);
              return Number.isNaN(t.getTime()) ? null : t.toISOString();
            },
            m = async (e, t = i) =>
              await Promise.race([
                e,
                new Promise((e, n) => {
                  setTimeout(() => n(Error("ChatGPT request timed out.")), t);
                }),
              ]),
            h = async () => {
              let e = await chrome.storage.sync.get(["chatgptAccountType"]),
                t = e.chatgptAccountType;
              return "string" == typeof t &&
                t.length > 0 &&
                "personal" !== t &&
                "null" !== t &&
                "undefined" !== t
                ? t
                : null;
            },
            g = async () => {
              let e = await m(
                fetch("https://chatgpt.com/api/auth/session", {
                  credentials: "include",
                }),
              );
              if (!e.ok)
                throw Error(
                  `ChatGPT session request failed with status ${e.status}.`,
                );
              let t = await e.json();
              if (!t.accessToken)
                throw Error(
                  "ChatGPT access token is not available for this session.",
                );
              return t.accessToken;
            },
            y = async () => {
              let e = await g(),
                t = await h(),
                n = {
                  accept: "*/*",
                  authorization: `Bearer ${e}`,
                  "oai-language": "en-US",
                  priority: "u=1, i",
                  "sec-ch-ua-mobile": "?0",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                };
              return (t && (n["chatgpt-account-id"] = t), n);
            },
            v = async (e, t) => {
              let n = await y(),
                r = await m(
                  fetch(e, {
                    body: null,
                    credentials: "include",
                    headers: n,
                    method: "GET",
                    mode: "cors",
                    referrer: t,
                    referrerPolicy: "strict-origin-when-cross-origin",
                  }),
                );
              if (!r.ok) throw new o(r.status);
              return await r.json();
            },
            w = ({ item: e, projectName: t }) =>
              e.id && e.title
                ? {
                    createdAt: p(e.create_time),
                    id: e.id,
                    isSelected: !1,
                    platform: "chatgpt",
                    projectId: e.gizmo_id ?? null,
                    projectName: t || null,
                    tags: ["Project"],
                    title: e.title,
                    updatedAt: p(e.update_time ?? e.create_time),
                    url: `https://chatgpt.com/c/${e.id}`,
                  }
                : null,
            b = (e) =>
              e.id
                ? {
                    createdAt: p(e.created_at),
                    id: c(e.id),
                    isSelected: !1,
                    platform: "chatgpt",
                    tags: ["Group Chat"],
                    title: e.name?.trim() || `Group chat ${e.id}`,
                    updatedAt: p(e.updated_at ?? e.created_at),
                    url: `https://chatgpt.com/gg/${e.id}`,
                  }
                : null,
            S = (e) =>
              e.gizmo_id?.trim() || e.conversation_template_id?.trim() || null,
            k = ({ item: e, projectNameById: t }) => {
              if (!e.id || !e.title) return null;
              let n = S(e),
                r = n ? t?.get(n) : void 0,
                a = [
                  ...(e.is_archived ? ["Archived"] : []),
                  ...(n || r ? ["Project"] : []),
                ];
              return {
                createdAt: p(e.create_time),
                id: e.id,
                isArchived: e.is_archived,
                isSelected: !1,
                platform: "chatgpt",
                projectId: n,
                projectName: r ?? null,
                tags: a,
                title: e.title,
                updatedAt: p(e.update_time ?? e.create_time),
                url: `https://chatgpt.com/c/${e.id}`,
              };
            },
            _ = (e) =>
              e
                .replace(
                  /[\ue200\ue201\ue202\ue203\ue204\ue206\u200b\uFEFF]/g,
                  " ",
                )
                .replace(/\\n/g, "\n")
                .replace(/\\"/g, '"')
                .replace(/\\t/g, "	")
                .replace(/\\\\/g, "\\")
                .replace(/\ue200cite\ue202turn0search\ue201/g, " ")
                .replace(/cite turn0search/g, " ")
                .replace(/turn0search/g, " ")
                .trim(),
            x = (e) => e?.toLowerCase().startsWith("image/") ?? !1,
            C = (e) => e.trim().replace(/-/g, "").toLowerCase(),
            E = (e) => {
              if (null == e) return [];
              let t =
                  "string" == typeof e
                    ? e
                    : (() => {
                        try {
                          return JSON.stringify(e);
                        } catch {
                          return "";
                        }
                      })(),
                n = new Set();
              for (let e of [
                /textdoc_id\s*:\s*['"]?([a-f0-9-]{32,36})['"]?/gi,
                /"textdoc_id"\s*:\s*"([a-f0-9-]{32,36})"/gi,
              ]) {
                let r;
                for (; null !== (r = e.exec(t));) r[1] && n.add(C(r[1]));
              }
              return Array.from(n);
            },
            P = (e) => e.message?.id ?? e.id ?? "",
            I = ({ mapping: e, orderedNodes: t, toolNode: n }) => {
              for (let t of n.children ?? []) {
                let n = e[t];
                if (n?.message?.author?.role === "assistant") return P(n);
              }
              let r = n.message?.create_time ?? 0,
                a = t.find((e) => {
                  let t = e.message;
                  return (
                    t?.author?.role === "assistant" && (t.create_time ?? 0) >= r
                  );
                });
              return a ? P(a) : "";
            },
            T = (e) => {
              let t = e.mapping ?? {},
                n = z(t, e.current_node),
                r = new Set(),
                a = new Map(),
                l = ({ node: e, textDocId: l }) => {
                  let i = e.message,
                    o = i?.author?.role;
                  if (!i || !o) return;
                  let s = C(l),
                    u = P(e),
                    c =
                      ("tool" === o &&
                        I({ mapping: t, orderedNodes: n, toolNode: e })) ||
                      u;
                  (r.add(s),
                    c && (!a.has(s) || "assistant" === o) && a.set(s, c));
                };
              for (let e of Object.values(t)) {
                let t = e.message;
                if (!t) continue;
                let n = new Set([
                  ...E(t.metadata?.canvas),
                  ...E(t.content?.parts),
                ]);
                for (let t of n) l({ node: e, textDocId: t });
              }
              return {
                referencedTextDocIds: Array.from(r),
                sourceMessageIdByTextDocId: a,
              };
            },
            N = (e) => {
              if ("string" == typeof e) return _(e);
              if (null == e) return "";
              try {
                return JSON.stringify(e, null, 2);
              } catch {
                return String(e);
              }
            },
            A = (e) => {
              let t = (e.mime_type || e.textdoc_type || "")
                  .trim()
                  .toLowerCase(),
                n = e.language?.trim().toLowerCase();
              return t.includes("/")
                ? t
                : n
                  ? `code/${n}`
                  : "html" === t
                    ? "text/html"
                    : "markdown" === t || "md" === t
                      ? "text/markdown"
                      : "json" === t
                        ? "application/json"
                        : [
                              "css",
                              "go",
                              "java",
                              "javascript",
                              "js",
                              "jsx",
                              "python",
                              "ruby",
                              "rust",
                              "shell",
                              "sql",
                              "tsx",
                              "typescript",
                              "ts",
                            ].includes(t)
                          ? `code/${t}`
                          : "text/plain";
            },
            L = (e) =>
              e.startsWith("code/") || "text/html" === e ? "code" : "document",
            R = async (e) => {
              let t = await y(),
                n = await m(
                  fetch(
                    `https://chatgpt.com/backend-api/conversation/${e}/textdocs`,
                    {
                      body: null,
                      credentials: "include",
                      headers: t,
                      method: "GET",
                      mode: "cors",
                      referrer: `https://chatgpt.com/c/${e}`,
                      referrerPolicy: "strict-origin-when-cross-origin",
                    },
                  ),
                );
              if (!n.ok)
                return (
                  console.warn("[AI Saver][chatgpt] TextDoc request failed", {
                    conversationId: e,
                    status: n.status,
                  }),
                  []
                );
              let r = await n.json();
              return Array.isArray(r) ? r : [];
            },
            M = async ({
              conversationId: e,
              messageIds: t,
              textDocBindings: n,
            }) => {
              let r = new Set(n.referencedTextDocIds);
              if (!r.size) return [];
              let a = await R(e),
                l = [];
              for (let [e, i] of a.entries()) {
                let a = C(i.id ?? i.textdoc_id ?? "");
                if (!a || !r.has(a)) continue;
                let o = A(i),
                  s = n.sourceMessageIdByTextDocId.get(a),
                  u =
                    i.title?.trim() ||
                    i.name?.trim() ||
                    `ChatGPT TextDoc ${e + 1}`;
                l.push({
                  content: N(i.content),
                  id: `chatgpt-textdoc:${a}`,
                  label: u,
                  mimeType: o,
                  sourceMessageId: s && t.has(s) ? s : void 0,
                  type: L(o),
                });
              }
              return l;
            },
            O = (e) =>
              e
                ? e
                    .replace("sediment://", "")
                    .replace("file-service://", "")
                    .trim()
                : "",
            z = (e, t) => {
              let n = null;
              if (t && e[t]) n = t;
              else {
                let t = -1 / 0;
                for (let [r, a] of Object.entries(e)) {
                  let e = a.message?.create_time;
                  "number" == typeof e && e > t && ((t = e), (n = r));
                }
              }
              if (!n) return [];
              let r = new Set(),
                a = [],
                l = n;
              for (; l && e[l] && !r.has(l);)
                (r.add(l), a.push(e[l]), (l = e[l].parent ?? null));
              return a.reverse().filter((e) => {
                let t =
                  e.message?.metadata?.is_visually_hidden_from_conversation ===
                  !0;
                return !!e.message && !t;
              });
            },
            j = (e) => {
              if (!Array.isArray(e)) return "";
              let t = e
                .map((e) =>
                  "string" == typeof e
                    ? _(e)
                    : "text" === e.content_type
                      ? _(e.parts?.join("\n") ?? e.text ?? "")
                      : "code" === e.content_type
                        ? `\`\`\`${e.language ?? ""}
${_(e.text ?? "")}
\`\`\``
                        : "execution_output" === e.content_type
                          ? _(e.text ?? "")
                          : "image_asset_pointer" === e.content_type
                            ? ""
                            : e.content_type
                              ? `[${e.content_type}]`
                              : "",
                )
                .filter(Boolean)
                .join("\n");
              return _(t);
            },
            $ = (e) => {
              let t = Array.isArray(e.message?.metadata?.attachments)
                  ? (e.message?.metadata?.attachments ?? [])
                  : [],
                n = new Map(),
                r = ({
                  fileId: e,
                  fileName: t,
                  height: r,
                  mimeType: a,
                  width: l,
                }) => {
                  if (!e) return;
                  let i = n.get(e);
                  n.set(e, {
                    downloadUrl: i?.downloadUrl,
                    fileName: t || i?.fileName || `${e}.png`,
                    height: r ?? i?.height,
                    id: e,
                    mimeType: a || i?.mimeType,
                    type: "image",
                    width: l ?? i?.width,
                  });
                };
              for (let e of t)
                e?.id &&
                  x(e.mime_type) &&
                  r({
                    fileId: e.id,
                    fileName: e.name,
                    height: e.height,
                    mimeType: e.mime_type,
                    width: e.width,
                  });
              for (let t of e.message?.content?.parts ?? [])
                "string" != typeof t &&
                  "image_asset_pointer" === t.content_type &&
                  r({
                    fileId: O(t.asset_pointer),
                    height: t.height,
                    width: t.width,
                  });
              return Array.from(n.values());
            },
            U = async (e, t) => {
              let n = await y(),
                r = await m(
                  fetch(
                    `https://chatgpt.com/backend-api/files/download/${t}?conversation_id=${e}&inline=false`,
                    {
                      credentials: "include",
                      headers: n,
                      method: "GET",
                      mode: "cors",
                      referrer: `https://chatgpt.com/c/${e}`,
                      referrerPolicy: "strict-origin-when-cross-origin",
                    },
                  ),
                );
              return r.ok ? await r.json() : null;
            },
            D = async ({ conversationId: e, messages: t }) => {
              let n = Array.from(
                new Set(t.flatMap((e) => (e.media ?? []).map((e) => e.id))),
              );
              if (!n.length) return t;
              let r = await Promise.all(n.map(async (t) => [t, await U(e, t)])),
                a = new Map(r);
              return t.map((e) =>
                e.media?.length
                  ? {
                      ...e,
                      media: e.media.map((e) => {
                        let t = a.get(e.id);
                        return {
                          ...e,
                          downloadUrl:
                            t?.status === "success"
                              ? (t.download_url ?? e.downloadUrl)
                              : e.downloadUrl,
                          fileName: t?.file_name ?? e.fileName,
                          mimeType: t?.mime_type ?? e.mimeType,
                        };
                      }),
                    }
                  : e,
              );
            },
            F = (e) => {
              let t = e.mapping ?? {},
                n = z(t, e.current_node);
              return n
                .map((e) => {
                  let t = e.message,
                    n = t?.author?.role;
                  if (
                    !t ||
                    ("assistant" !== n &&
                      "user" !== n &&
                      "tool" !== n &&
                      "system" !== n)
                  )
                    return null;
                  let r = j(t.content?.parts),
                    a = $(e);
                  return r || a.length
                    ? {
                        content: r,
                        createdAt: f(t.create_time),
                        id: t.id ?? e.id ?? crypto.randomUUID(),
                        ...(a.length ? { media: a } : {}),
                        role: n,
                      }
                    : null;
                })
                .filter((e) => !!e);
            },
            G = (e) =>
              "image" === e.library_file_category ||
              e.mime_type?.toLowerCase().startsWith("image/")
                ? "image"
                : "file",
            H = (e) => {
              let t = e.file_id?.trim(),
                n = e.file_name?.trim();
              return t && n
                ? {
                    category: G(e),
                    extension: e.file_extension?.trim() ?? "",
                    fileId: t,
                    fileName: n,
                    id: e.id?.trim() || t,
                    mimeType: e.mime_type?.trim() ?? "",
                    originationThreadId:
                      e.origination_thread_id?.trim() || null,
                    sizeBytes:
                      "number" == typeof e.file_size_bytes &&
                      Number.isFinite(e.file_size_bytes)
                        ? e.file_size_bytes
                        : 0,
                    state: e.state?.trim() || "unknown",
                    updatedAt: p(e.updated_at),
                  }
                : null;
            },
            B = async ({ cursor: e, limit: t = 50 }) => {
              let n = await y(),
                r = await m(
                  fetch("https://chatgpt.com/backend-api/files/library", {
                    body: JSON.stringify({ cursor: e ?? null, limit: t }),
                    credentials: "include",
                    headers: {
                      ...n,
                      "content-type": "application/json",
                      "x-openai-target-path": "/backend-api/files/library",
                      "x-openai-target-route": "/backend-api/files/library",
                    },
                    method: "POST",
                    mode: "cors",
                    referrer: "https://chatgpt.com/library",
                    referrerPolicy: "strict-origin-when-cross-origin",
                  }),
                );
              if (!r.ok)
                throw Error(
                  `ChatGPT Library request failed with status ${r.status}.`,
                );
              let a = await r.json();
              return {
                cursor: a.cursor ?? null,
                items: (a.items ?? []).map(H).filter((e) => !!e),
              };
            },
            W = async (e) => {
              let t = await y(),
                n = [
                  `https://chatgpt.com/backend-api/files/download/${e.fileId}?download_intent=true`,
                  e.originationThreadId
                    ? `https://chatgpt.com/backend-api/files/download/${e.fileId}?conversation_id=${e.originationThreadId}&download_intent=true`
                    : "",
                ].filter(Boolean);
              for (let r of n) {
                let n = await m(
                  fetch(r, {
                    credentials: "include",
                    headers: {
                      ...t,
                      "x-openai-target-path": `/backend-api/files/download/${e.fileId}`,
                      "x-openai-target-route":
                        "/backend-api/files/download/{file_id}",
                    },
                    method: "GET",
                    mode: "cors",
                    referrer: "https://chatgpt.com/library",
                    referrerPolicy: "strict-origin-when-cross-origin",
                  }),
                );
                if (!n.ok) continue;
                let a = await n.json();
                if (a.download_url) return a;
              }
              return null;
            },
            V = async () => {
              let e;
              let t = [],
                n = new Set();
              for (let r = 1; r <= 100; r += 1) {
                let r = new URLSearchParams({
                  conversations_per_gizmo: String(5),
                });
                e && r.set("cursor", e);
                let a = await v(
                  `https://chatgpt.com/backend-api/gizmos/snorlax/sidebar?${r.toString()}`,
                  "https://chatgpt.com/",
                );
                for (let e of a.items ?? []) {
                  let r = e.gizmo?.gizmo?.id;
                  !r ||
                    n.has(r) ||
                    (n.add(r),
                    t.push({
                      id: r,
                      name: e.gizmo?.gizmo?.display?.name?.trim() || r,
                    }));
                }
                if (!(e = a.cursor)) break;
              }
              return t;
            },
            q = async () => {
              try {
                let e = await V();
                return new Map(e.map((e) => [e.id, e.name]));
              } catch (e) {
                return (
                  console.warn(
                    "[AIExportHub][chatgpt] Project name mapping failed.",
                    { reason: e instanceof Error ? e.message : String(e) },
                  ),
                  new Map()
                );
              }
            },
            Q = async ({ cursor: e, limit: t, projectId: n }) => {
              let r = new URLSearchParams({
                conversations_per_gizmo: String(t),
              });
              return (
                e && r.set("cursor", e),
                await v(
                  `https://chatgpt.com/backend-api/gizmos/${n}/conversations?${r.toString()}`,
                  "https://chatgpt.com/",
                )
              );
            },
            X = async (e, t = "all-pages", n) => {
              let r = n ? (await V()).filter((e) => e.id === n) : await V(),
                a = [];
              for (let n of r) {
                let r;
                do {
                  let e = await Q({
                    cursor: r || void 0,
                    limit: 5,
                    projectId: n.id,
                  });
                  if (
                    (a.push(
                      ...(e.items ?? [])
                        .map((e) => w({ item: e, projectName: n.name }))
                        .filter((e) => !!e),
                    ),
                    (r = e.cursor),
                    "first-page" === t)
                  )
                    break;
                } while (r && a.length < e);
                if (a.length >= e) break;
              }
              return a.slice(0, e);
            },
            K = async (e, t = "latest-5") => {
              let n;
              let r = [],
                a = new Set(),
                l = "latest-5" === t ? 5 : 20,
                i = "latest-5" === t ? Math.min(5, e) : 500;
              for (let e = 1; e <= 1e3 && r.length < i; e += 1) {
                let e = new URLSearchParams({ limit: String(l) });
                n && e.set("cursor", n);
                let o = await v(
                  `https://chatgpt.com/backend-api/calpico/chatgpt/rooms/summary?${e.toString()}`,
                  "https://chatgpt.com/",
                );
                for (let e of o.items ?? []) {
                  if (!e.id || a.has(e.id)) continue;
                  a.add(e.id);
                  let t = b(e);
                  if ((t && r.push(t), r.length >= i)) break;
                }
                if (!(n = o.cursor) || "latest-5" === t) break;
              }
              return r.slice(0, e);
            },
            J = (e) => {
              let t = (e) => _(e).replace(/^\s+|\s+$/g, "");
              if ("assistant" === e.role) {
                let n = e.raw_messages?.[0]?.content?.parts ?? [],
                  r = n
                    .map((e) => ("string" == typeof e ? e : (e?.text ?? "")))
                    .map(t)
                    .filter(Boolean)
                    .join("\n");
                return r || t(e.preview ?? "");
              }
              let n = t(e.content?.text ?? e.preview ?? ""),
                r = e.content?.attachments ?? e.attachments ?? [],
                a = r
                  .map((e) =>
                    e.url
                      ? `- [${e.title || e.url}](${e.url})`
                      : `- ${e.title || e.type || "Attachment"}`,
                  )
                  .filter(Boolean);
              return [
                n,
                a.length
                  ? `Links:
${a.join("\n")}`
                  : "",
              ]
                .filter(Boolean)
                .join("\n\n");
            },
            Y = (e) => {
              let t = new Map();
              for (let n of e.members ?? []) {
                if (!n.account_user_id) continue;
                let e = n.name?.trim() || n.username?.trim();
                e && t.set(n.account_user_id, e);
              }
              return t;
            },
            Z = ({
              assistantName: e,
              memberNameById: t,
              message: n,
              role: r,
            }) =>
              "assistant" === r
                ? e || "ChatGPT"
                : "system" === r
                  ? "System"
                  : "user" === r
                    ? (n.account_user_id ? t.get(n.account_user_id) : void 0) ||
                      n.account_user_id ||
                      "User"
                    : void 0,
            ee = async (e) => {
              let t;
              let n = await v(
                  `https://chatgpt.com/backend-api/calpico/chatgpt/rooms/${e}`,
                  `https://chatgpt.com/gg/${e}`,
                ),
                r = new Set(),
                a = [],
                l = n.assistant_name?.trim() || "ChatGPT",
                i = Y(n);
              for (let n = 1; n <= 500; n += 1) {
                let n = new URLSearchParams({ limit: "20" });
                t && n.set("before", t);
                let l = await v(
                    `https://chatgpt.com/backend-api/calpico/chatgpt/rooms/${e}/messages?${n.toString()}`,
                    `https://chatgpt.com/gg/${e}`,
                  ),
                  i = (l.items ?? []).filter(
                    (e) => !!e.id && null == e.deleted_at,
                  );
                if (!i.length) break;
                for (let e of i)
                  !e.id || r.has(e.id) || (r.add(e.id), a.push(e));
                t = i[0]?.id;
              }
              let o = a
                .sort((e, t) => {
                  let n = e.created_at ? Date.parse(e.created_at) : 0,
                    r = t.created_at ? Date.parse(t.created_at) : 0;
                  return n - r;
                })
                .map((e) => {
                  let t =
                    "assistant" === e.role ||
                    "system" === e.role ||
                    "user" === e.role
                      ? e.role
                      : null;
                  if (!t || !e.id) return null;
                  let n = J(e);
                  return n
                    ? {
                        authorName: Z({
                          assistantName: l,
                          memberNameById: i,
                          message: e,
                          role: t,
                        }),
                        content: n,
                        createdAt: p(e.created_at),
                        id: e.id,
                        role: t,
                      }
                    : null;
                })
                .filter(Boolean);
              return {
                artifacts: [],
                attachments: [],
                messages: o,
                metadata: {
                  groupMemberCount: i.size,
                  groupChat: !0,
                  messageCount: o.length,
                  source: "chatgpt-group-chats-api",
                },
                summary: {
                  createdAt: p(n.created_at),
                  id: c(e),
                  isSelected: !1,
                  platform: "chatgpt",
                  tags: ["Group Chat"],
                  title: n.name?.trim() || `Group chat ${e}`,
                  updatedAt: p(n.updated_at ?? n.created_at),
                  url: `https://chatgpt.com/gg/${e}`,
                },
              };
            },
            et = async (e = 1, t = l, n = {}) => {
              let r = Math.max(e - 1, 0) * t,
                a = !0 === n.isArchived,
                i = await v(
                  `https://chatgpt.com/backend-api/conversations?offset=${r}&limit=${t}&order=updated&is_archived=${a ? "true" : "false"}`,
                  "https://chatgpt.com/",
                ),
                o = Array.isArray(i.items) ? i.items : [],
                s = o
                  .map((e) =>
                    k({ item: e, projectNameById: n.projectNameById }),
                  )
                  .filter((e) => !!e),
                u = "number" == typeof i.total ? i.total : s.length,
                c = s.length,
                d =
                  "number" == typeof i.total
                    ? r + o.length < i.total
                    : s.length === t;
              return (
                console.info(
                  "[AI Saver][chatgpt] Conversation list page loaded",
                  {
                    availableCount: u,
                    firstPageCount: c,
                    isArchived: a,
                    limit: t,
                    offset: r,
                    page: e,
                    returnedItemCount: o.length,
                  },
                ),
                {
                  bulk: { availableCount: u, firstPageCount: c, hasMore: d },
                  recentConversations: s,
                }
              );
            },
            en = async (e, t = {}) => {
              if ("projects" === t.contentMode)
                return await X(
                  e,
                  t.projectSyncMode ?? "all-pages",
                  t.projectId,
                );
              if ("group-chats" === t.contentMode)
                return await K(e, t.groupChatSyncMode ?? "latest-5");
              let n = Math.max(1, e),
                r = "archived-chats" === t.contentMode,
                a = await q(),
                l = [];
              for (let e = 1; l.length < n && e <= 25; e += 1) {
                let t;
                try {
                  t = await et(e, 100, { isArchived: r, projectNameById: a });
                } catch (t) {
                  if (s(t)) {
                    console.warn(
                      "[AI Saver][chatgpt] Conversation summary loading stopped after ChatGPT returned a rate-limit response.",
                      { loadedCount: l.length, page: e, status: t.status },
                    );
                    break;
                  }
                  throw t;
                }
                let { bulk: n, recentConversations: i } = t;
                if ((l.push(...i), !n.hasMore || i.length < 100)) break;
              }
              return l.slice(0, n);
            },
            er = async (e, t = {}) => {
              if (!e) return null;
              let n = d(e);
              if (n) return await ee(n);
              let r = await v(
                  `https://chatgpt.com/backend-api/conversation/${e}`,
                  `https://chatgpt.com/c/${e}`,
                ),
                a = F(r),
                l = t.includeDownloadInfo
                  ? await D({ conversationId: e, messages: a })
                  : a,
                i = T(r),
                o = await M({
                  conversationId: e,
                  messageIds: new Set(l.map((e) => e.id)),
                  textDocBindings: i,
                }),
                s = {
                  createdAt: l[0]?.createdAt ?? null,
                  id: e,
                  isArchived: r.is_archived,
                  isSelected: !1,
                  platform: "chatgpt",
                  tags: [],
                  title:
                    r.title ?? document.title.replace(" - ChatGPT", "").trim(),
                  updatedAt: f(r.update_time),
                  url: `https://chatgpt.com/c/${e}`,
                };
              return {
                artifacts: o,
                attachments: [],
                messages: l,
                metadata: {
                  conversationTemplateId: r.conversation_template_id ?? null,
                  gizmoId: r.gizmo_id ?? null,
                  isArchived: r.is_archived ?? null,
                  messageCount: l.length,
                  source: "chatgpt-backend-api",
                  textDocCount: o.length,
                },
                summary: s,
              };
            },
            ea = async (e) => {
              let t;
              let n = u(e),
                r = !!n,
                i = r ? er(n) : Promise.resolve(null);
              try {
                let e = await q();
                t = await et(1, l, { projectNameById: e });
              } catch (e) {
                if (!s(e)) throw e;
                (console.warn(
                  "[AI Saver][chatgpt] Runtime context skipped recent conversation loading after ChatGPT returned a rate-limit response.",
                  { status: e.status },
                ),
                  (t = {
                    bulk: { availableCount: 0, firstPageCount: 0, hasMore: !1 },
                    recentConversations: [],
                  }));
              }
              let o = await i;
              return (
                console.info("[AIExportHub][chatgpt] Runtime context loaded.", {
                  availableCount: t.bulk.availableCount,
                  currentConversationId: n,
                  firstPageCount: t.bulk.firstPageCount,
                  hasCurrentConversation: !!o,
                  hasMore: t.bulk.hasMore,
                  isConversationPage: r,
                  recentConversationCount: t.recentConversations.length,
                }),
                {
                  bulk: t.bulk,
                  capabilities: a.platformRegistry.chatgpt.capabilities,
                  currentConversation: o,
                  metadata: {
                    currentConversationId: n,
                    isConversationPage: r,
                    platformStatus: "connected",
                    recentConversationCount: t.recentConversations.length,
                  },
                  recentConversations: t.recentConversations,
                }
              );
            };
        },
        {
          "~platforms/registry": "bmsSX",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      bmsSX: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n), r.export(n, "platformRegistry", () => a));
          let a = {
            chatgpt: {
              id: "chatgpt",
              label: "ChatGPT",
              shortLabel: "GPT",
              description:
                "Primary reference platform for the first migration pass.",
              hostnames: ["chatgpt.com", "chat.openai.com"],
              accentClassName:
                "plasmo-from-emerald-500 plasmo-to-teal-500 plasmo-text-emerald-100",
              capabilities: {
                singleExport: !0,
                bulkExport: !0,
                notionAuth: !0,
                exportTargets: ["notion", "pdf", "markdown"],
              },
            },
            claude: {
              id: "claude",
              label: "Claude",
              shortLabel: "AI",
              description:
                "Second migration target with shared export services.",
              hostnames: ["claude.ai"],
              accentClassName:
                "plasmo-from-violet-500 plasmo-to-sky-500 plasmo-text-violet-100",
              capabilities: {
                singleExport: !0,
                bulkExport: !0,
                notionAuth: !0,
                exportTargets: ["notion", "pdf", "markdown"],
              },
            },
            gemini: {
              id: "gemini",
              label: "Gemini",
              shortLabel: "GM",
              description:
                "Google-hosted conversations with PDF, Markdown and Notion support.",
              hostnames: ["gemini.google.com"],
              pathnameMatchers: [
                /^\/$/,
                /^\/(?:u\/\d+\/)?$/,
                /^\/(?:u\/\d+\/)?app(?:\/|$)/,
                /^\/(?:u\/\d+\/)?gem(?:\/|$)/,
              ],
              accentClassName:
                "plasmo-from-sky-500 plasmo-to-indigo-500 plasmo-text-sky-100",
              capabilities: {
                singleExport: !0,
                bulkExport: !0,
                notionAuth: !0,
                exportTargets: ["notion", "pdf", "markdown"],
              },
            },
            perplexity: {
              id: "perplexity",
              label: "Perplexity",
              shortLabel: "PX",
              description:
                "Research-oriented exports with a shared Markdown pipeline.",
              hostnames: ["perplexity.ai", "www.perplexity.ai"],
              accentClassName:
                "plasmo-from-cyan-500 plasmo-to-blue-500 plasmo-text-cyan-100",
              capabilities: {
                singleExport: !0,
                bulkExport: !0,
                notionAuth: !0,
                exportTargets: ["notion", "pdf", "markdown"],
              },
            },
          };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl" },
      ],
      "2k7nQ": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "CLAUDE_ORG_ID_STORAGE_KEY", () => a),
            r.export(n, "CLAUDE_INTEGRATION_STATUS_STORAGE_KEY", () => l),
            r.export(n, "extractClaudeOrgIdFromHtml", () => u),
            r.export(n, "extractClaudeOrgIdFromIntegrationStatus", () => c),
            r.export(n, "extractClaudeOrgIdFromSessionStorage", () => d),
            r.export(n, "extractClaudeOrgIdFromPage", () => f),
            r.export(n, "loadClaudeOrgIdFromStorage", () => p),
            r.export(n, "saveClaudeOrgIdToStorage", () => m),
            r.export(n, "captureClaudeOrgIdFromPage", () => h));
          let a = "ai-exporter-hub:claude-org-id",
            l = "SSS-cardamom-integration-statuses",
            i = () =>
              "undefined" != typeof window && "undefined" != typeof document,
            o = [
              /https:\/\/claude\.ai\/api\/organizations\/([a-f0-9-]{36})\/chat_conversations/i,
              /lastActiveOrg[^a-f0-9]{0,120}?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
              /organization(?:UUID|ID)[^a-f0-9]{0,120}?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
            ],
            s = (e, t) => {
              let n = e.indexOf(t);
              if (-1 === n) return null;
              let r = e.slice(
                  Math.max(0, n - 600),
                  Math.min(e.length, n + 600),
                ),
                a = r.match(
                  /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
                );
              return a?.[1] ?? null;
            },
            u = (e) => {
              for (let t of o) {
                let n = e.match(t);
                if (n?.[1]) return n[1];
              }
              return (
                s(e, "lastActiveOrg") ??
                s(e, "organizationUUID") ??
                s(e, "organizationID")
              );
            },
            c = (e) => {
              if (!e) return null;
              try {
                let t = JSON.parse(e);
                return "string" == typeof t.orgUuid && t.orgUuid.trim()
                  ? t.orgUuid.trim()
                  : null;
              } catch {
                return null;
              }
            },
            d = () => {
              if ("undefined" == typeof window) return null;
              try {
                return c(window.sessionStorage.getItem(l));
              } catch {
                return null;
              }
            },
            f = () =>
              i()
                ? (u(document.documentElement?.innerHTML || "") ?? d())
                : null,
            p = async () => {
              let e = await chrome.storage.local.get([a]);
              return e[a] ?? null;
            },
            m = async (e) => {
              await chrome.storage.local.set({ [a]: e });
            },
            h = async () => {
              if (!i())
                return (
                  console.debug(
                    "[Claude] Skipping page org-id capture because no DOM context is available.",
                  ),
                  null
                );
              let e = f();
              if (!e)
                return (
                  console.debug(
                    "[Claude] Page org-id capture did not find a value.",
                  ),
                  null
                );
              let t = await p();
              return (
                t !== e &&
                  (await m(e), console.log("[Claude] Org ID captured:", e)),
                e
              );
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl" },
      ],
      "1a9X3": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "detectPlatformFromUrl", () => i));
          var a = e("~platforms/registry");
          let l = (e, t, n = "") => ({
              url: e,
              hostname: n,
              isSupported: !1,
              platform: null,
              reason: t,
            }),
            i = (e) => {
              if (!e)
                return l(
                  "",
                  "Open a supported AI conversation page to continue.",
                );
              try {
                let t = new URL(e),
                  n = t.hostname,
                  r = t.pathname,
                  i =
                    Object.values(a.platformRegistry).find(
                      (e) =>
                        !!e.hostnames.includes(n) &&
                        (!e.pathnameMatchers?.length ||
                          e.pathnameMatchers.some((e) => e.test(r))),
                    ) ?? null;
                if (!i)
                  return l(
                    e,
                    "This tab is not a supported AI conversation page.",
                    n,
                  );
                return { url: e, hostname: n, isSupported: !0, platform: i };
              } catch {
                return l(e, "The current tab URL could not be parsed.");
              }
            };
        },
        {
          "~platforms/registry": "bmsSX",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      "6PiqT": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n), r.export(n, "GeminiAPIClient", () => m));
          var a = e("./constants"),
            l = e("./parser");
          let i = (e) => {
              try {
                let t = new URL(e ?? window.location.href),
                  n = t.pathname.match(/\/u\/(\d+)(?:\/|$)/);
                return n?.[1] ? `u${n[1]}` : "default";
              } catch {
                return "default";
              }
            },
            o = (e) =>
              e && "default" !== e
                ? `https://gemini.google.com/${e.replace(/^u/, "u/")}/_/BardChatUi/data/batchexecute`
                : a.GEMINI_API_URL,
            s = (e) => {
              let t = e.accountSlot ?? "default";
              return "default" !== t
                ? `u:${t.replace(/^u/, "")}`
                : e.sid
                  ? `sid:${e.sid}`
                  : "default";
            };
          async function u() {
            let e = await chrome.storage.local.get("gemini_credentials"),
              t = e.gemini_credentials ?? {};
            return (
              t.at && t.sid && t.timestamp && (Date.now(), t.timestamp),
              t
            );
          }
          async function c() {
            let e = await chrome.storage.local.get([
                "gemini_credentials",
                "gemini_credentials_map",
              ]),
              t = e.gemini_credentials_map ?? {},
              n = e.gemini_credentials ?? null;
            return (
              n?.sid &&
                !t[n.sid] &&
                ((t[n.sid] = {
                  ...n,
                  accountSlot: n.accountSlot ?? "default",
                  lastUsed: n.lastUsed ?? n.timestamp ?? Date.now(),
                }),
                await chrome.storage.local.set({ gemini_credentials_map: t })),
              t
            );
          }
          async function d(e) {
            let t = await c(),
              n = Object.values(t)
                .filter((e) => e?.sid)
                .sort((e, t) => (t.lastUsed ?? 0) - (e.lastUsed ?? 0));
            if (!n.length) return null;
            if (e.targetSid) return t[e.targetSid] ?? null;
            let r = e.accountSlot ?? i(),
              a = n.find((e) => (e.accountSlot ?? "default") === r);
            return a || ("default" === r ? n[0] : null);
          }
          let f = async (e) =>
            await new Promise((t) => {
              setTimeout(t, e);
            });
          async function p(e = {}) {
            let t = Date.now(),
              n = (await d(e)) ?? (await u());
            for (; (!n.at || !n.sid) && Date.now() - t < 4e3;)
              (await f(150), (n = (await d(e)) ?? (await u())));
            return {
              accountSlot: n.accountSlot ?? e.accountSlot ?? "default",
              at: n.at ?? "",
              bl: n.bl ?? a.GEMINI_BL,
              lastUsed: n.lastUsed ?? n.timestamp ?? 0,
              sid: n.sid ?? "",
              timestamp: n.timestamp ?? 0,
            };
          }
          class m {
            async initialize() {
              await p().catch(() => null);
            }
            async getRequestCredentials(e = {}) {
              let t = await p(e);
              if (!t.sid || !t.at)
                throw Error(
                  "Gemini credentials are unavailable. Refresh the Gemini page, wait a moment, and try again.",
                );
              return t;
            }
            async getConversationList(e, t) {
              let n = await this.getRequestCredentials({
                  accountSlot: i(),
                  targetSid: t,
                }),
                r = new URLSearchParams({
                  rpcids: a.GEMINI_RPCIDS.GET_CONVERSATION_LIST,
                  "source-path": "/app",
                  bl: n.bl,
                  "f.sid": n.sid,
                  _reqid: Math.floor(1e5 * Math.random()).toString(),
                  rt: "c",
                }),
                u = o(n.accountSlot),
                c = new URLSearchParams(),
                d = e
                  ? JSON.stringify([
                      [
                        [
                          a.GEMINI_RPCIDS.GET_CONVERSATION_LIST,
                          JSON.stringify([20, e, [0, null, 1]]),
                          null,
                          "generic",
                        ],
                      ],
                    ])
                  : JSON.stringify([
                      [
                        [
                          a.GEMINI_RPCIDS.GET_CONVERSATION_LIST,
                          JSON.stringify([13, null, [0, null, 1]]),
                          null,
                          "generic",
                        ],
                      ],
                    ]);
              (c.append("f.req", d), c.append("at", n.at));
              try {
                let e = await fetch(`${u}?${r}`, {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                    "X-Same-Domain": "1",
                  },
                  body: c.toString(),
                  credentials: "include",
                });
                if (!e.ok) throw Error(`HTTP ${e.status}: ${e.statusText}`);
                let t = await e.text(),
                  a = (0, l.GeminiResponseParser).parseConversationListResponse(
                    t,
                  ),
                  i = s(n);
                return {
                  ...a,
                  conversations: a.conversations.map((e) => ({
                    ...e,
                    accountScope: i,
                  })),
                };
              } catch (e) {
                throw (
                  console.error("Failed to get conversation list:", e),
                  Error(`Failed to get conversation list: ${e.message}`)
                );
              }
            }
            async getConversationDetail(e, t) {
              let n = e;
              n.startsWith("c_") || (n = `c_${n}`);
              let r = [],
                a = null,
                l = null;
              do {
                let e = await this.fetchConversationPage(n, l, t);
                (a || (a = e),
                  (r = [...e.messages, ...r]),
                  (l = e.nextPageToken || null));
              } while (l);
              return {
                ...a,
                accountScope: a?.accountScope ?? void 0,
                messages: r,
                nextPageToken: null,
              };
            }
            async getGemsList(e) {
              let t = await this.getRequestCredentials({
                  accountSlot: i(),
                  targetSid: e,
                }),
                n = new URLSearchParams({
                  rpcids: a.GEMINI_RPCIDS.GET_GEMS_LIST,
                  "source-path": "/gems/view",
                  bl: t.bl,
                  "f.sid": t.sid,
                  _reqid: Math.floor(1e5 * Math.random()).toString(),
                  rt: "c",
                }),
                r = o(t.accountSlot),
                s = new URLSearchParams(),
                u = JSON.stringify([
                  [
                    [
                      a.GEMINI_RPCIDS.GET_GEMS_LIST,
                      JSON.stringify([2, ["en"], 0]),
                      null,
                      "generic",
                    ],
                  ],
                ]);
              (s.append("f.req", u), s.append("at", t.at));
              try {
                let e = await fetch(`${r}?${n}`, {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                    "X-Same-Domain": "1",
                  },
                  body: s.toString(),
                  credentials: "include",
                });
                if (!e.ok) throw Error(`HTTP ${e.status}: ${e.statusText}`);
                let t = await e.text();
                return (0, l.GeminiResponseParser).parseGemsListResponse(t);
              } catch (e) {
                throw (
                  console.error("Failed to get Gems list:", e),
                  Error(`Failed to get Gems list: ${e.message}`)
                );
              }
            }
            async getGemConversationList(e, t, n) {
              let r = await this.getRequestCredentials({
                  accountSlot: i(),
                  targetSid: n,
                }),
                u = new URLSearchParams({
                  rpcids: a.GEMINI_RPCIDS.GET_CONVERSATION_LIST,
                  "source-path": `/gem/${e}`,
                  bl: r.bl,
                  "f.sid": r.sid,
                  _reqid: Math.floor(1e5 * Math.random()).toString(),
                  rt: "c",
                }),
                c = o(r.accountSlot),
                d = new URLSearchParams(),
                f = JSON.stringify([
                  [
                    [
                      a.GEMINI_RPCIDS.GET_CONVERSATION_LIST,
                      JSON.stringify([3, t || null, [null, null, 1, e]]),
                      null,
                      "generic",
                    ],
                  ],
                ]);
              (d.append("f.req", f), d.append("at", r.at));
              try {
                let t = await fetch(`${c}?${u}`, {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                    "X-Same-Domain": "1",
                  },
                  body: d.toString(),
                  credentials: "include",
                });
                if (!t.ok) throw Error(`HTTP ${t.status}: ${t.statusText}`);
                let n = await t.text(),
                  a = (0,
                  l.GeminiResponseParser).parseGemConversationListResponse(n),
                  i = s(r);
                return {
                  ...a,
                  conversations: a.conversations.map((t) => ({
                    ...t,
                    accountScope: i,
                    gemId: t.gemId || e,
                  })),
                };
              } catch (e) {
                throw (
                  console.error("Failed to get Gem conversation list:", e),
                  Error(`Failed to get Gem conversation list: ${e.message}`)
                );
              }
            }
            async getConversationPreview(e, t) {
              let n = e;
              return (
                n.startsWith("c_") || (n = `c_${n}`),
                await this.fetchConversationPage(n, null, t)
              );
            }
            async fetchConversationPage(e, t, n) {
              let r = await this.getRequestCredentials({
                  accountSlot: i(),
                  targetSid: n,
                }),
                u = new URLSearchParams({
                  rpcids: a.GEMINI_RPCIDS.GET_CONVERSATION_DETAIL,
                  "source-path": "/app",
                  bl: r.bl,
                  "f.sid": r.sid,
                  _reqid: Math.floor(1e5 * Math.random()).toString(),
                  rt: "c",
                }),
                c = o(r.accountSlot),
                d = new URLSearchParams(),
                f = JSON.stringify([
                  [
                    [
                      a.GEMINI_RPCIDS.GET_CONVERSATION_DETAIL,
                      JSON.stringify([e, 10, t, 1, [1], [4], null, 1]),
                      null,
                      "generic",
                    ],
                  ],
                ]);
              (d.append("f.req", f), d.append("at", r.at));
              try {
                let e = await fetch(`${c}?${u}`, {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                    "X-Same-Domain": "1",
                  },
                  body: d.toString(),
                  credentials: "include",
                });
                if (!e.ok) throw Error(`HTTP ${e.status}: ${e.statusText}`);
                let t = await e.text();
                return {
                  ...(0,
                  l.GeminiResponseParser).parseConversationDetailResponse(t),
                  accountScope: s(r),
                };
              } catch (e) {
                throw (
                  console.error("Failed to fetch conversation page:", e),
                  Error(`Failed to fetch conversation page: ${e.message}`)
                );
              }
            }
            getCurrentConversationId() {
              try {
                let e = new URL(window.location.href),
                  t = e.pathname.split("/"),
                  n = t.indexOf("app");
                if (e.pathname.startsWith("/_/")) return null;
                if (-1 !== n && n < t.length - 1) {
                  let e = t[n + 1];
                  return e;
                }
                let r = t.indexOf("gem");
                if (-1 !== r && r < t.length - 2) return t[r + 2];
                return null;
              } catch (e) {
                return (
                  console.error("Error getting conversation ID:", e),
                  null
                );
              }
            }
          }
        },
        {
          "./constants": "foPpf",
          "./parser": "c407P",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      foPpf: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "GEMINI_API_URL", () => a),
            r.export(n, "GEMINI_RPCIDS", () => l),
            r.export(n, "GEMINI_BL", () => i));
          let a = "https://gemini.google.com/_/BardChatUi/data/batchexecute",
            l = {
              GET_CONVERSATION_LIST: "MaZiqc",
              GET_CONVERSATION_DETAIL: "hNvQHb",
              GET_GEMS_LIST: "CNgdBe",
            },
            i = "boq_assistant-bard-web-server_20260202.09_p1";
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl" },
      ],
      c407P: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "GeminiResponseParser", () => a));
          class a {
            static {
              this.IMAGE_GENERATION_CONTENT_REGEX =
                /https?:\/\/googleusercontent\.com\/(?:image_generation_content|imagegenerationcontent)\/(\d+)/i;
            }
            static normalizeConversationId(e) {
              return (e || "").replace(/^c_/, "");
            }
            static parseFirstWrbPayload(e) {
              let t = e.indexOf('[["wrb.fr"');
              if (-1 === t) return null;
              let n = 0,
                r = !1,
                a = !1;
              for (let l = t; l < e.length; l += 1) {
                let i = e[l];
                if (r) {
                  a ? (a = !1) : "\\" === i ? (a = !0) : '"' === i && (r = !1);
                  continue;
                }
                if ('"' === i) r = !0;
                else if ("[" === i) n += 1;
                else if ("]" === i && 0 == (n -= 1)) {
                  let n = JSON.parse(e.slice(t, l + 1)),
                    r =
                      n.find?.((e) => Array.isArray(e) && "wrb.fr" === e[0]) ||
                      n[0];
                  return JSON.parse(r[2]);
                }
              }
              return null;
            }
            static findNextPageToken(e, t = 120) {
              for (let n = 0; n < e.length; n += 1)
                if (e[n] && "string" == typeof e[n] && e[n].length >= t)
                  return e[n];
            }
            static parseConversationItems(e) {
              let t = [];
              for (let n of e)
                if (n && Array.isArray(n) && n.length >= 6) {
                  let e = n[0] || "",
                    r = n[1] || "Untitled",
                    l =
                      n[5] && Array.isArray(n[5]) && n[5].length >= 2
                        ? new Date(1e3 * n[5][0]).getTime()
                        : Date.now(),
                    i = r.replace(/\\n/g, "");
                  i.endsWith("-") && (i = i.slice(0, -1));
                  let o =
                      "string" == typeof n[7] && n[7].trim()
                        ? n[7].trim()
                        : null,
                    s = a.normalizeConversationId(e);
                  t.push({
                    id: e,
                    title: i,
                    messages: [],
                    timestamp: l,
                    url: o
                      ? `https://gemini.google.com/gem/${o}/${s}`
                      : `https://gemini.google.com/app/${s}`,
                    gemId: o,
                  });
                }
              return t;
            }
            static parseConversationListResponse(e) {
              try {
                let t;
                let n = e.split("\n"),
                  r = null;
                for (let e = 0; e < n.length; e++) {
                  let t = n[e];
                  if (t.startsWith("["))
                    try {
                      let e = t.replace(/[\x00-\x1F\x7F]/g, "").trim();
                      r = JSON.parse(e);
                      break;
                    } catch (l) {
                      let a = t;
                      for (let t = e + 1; t < n.length; t++) {
                        a += n[t];
                        try {
                          let e = a
                            .replace(/[\x00-\x1F\x7F]/g, "")
                            .replace(/,\s*null\s*,/g, ",null,")
                            .replace(/,\s*\[/g, ",[")
                            .replace(/\]\s*,/g, "],")
                            .trim();
                          r = JSON.parse(e);
                          break;
                        } catch (e) {
                          continue;
                        }
                      }
                      if (r) break;
                    }
                }
                if (!r || !r[0] || !r[0][2]) return { conversations: [] };
                let l = JSON.parse(r[0][2]),
                  i = null;
                l[1] && Array.isArray(l[1])
                  ? (i = l[1])
                  : l[2] && Array.isArray(l[2]) && (i = l[2]);
                let o = i ? a.parseConversationItems(i) : [];
                for (let e = 0; e < l.length; e++)
                  if (l[e] && "string" == typeof l[e] && l[e].length > 150) {
                    t = l[e];
                    break;
                  }
                return { conversations: o, nextPageToken: t };
              } catch (e) {
                return (
                  console.error("Failed to parse conversation list:", e),
                  { conversations: [] }
                );
              }
            }
            static parseGemsListResponse(e) {
              try {
                let t = a.parseFirstWrbPayload(e),
                  n = Array.isArray(t?.[2]) ? t[2] : [];
                return n
                  .map((e) => {
                    if (!Array.isArray(e)) return null;
                    let t = e[0] || "",
                      n = e[1] || [],
                      r = e[2] || [],
                      a = n[0] || "Untitled Gem",
                      l = n[1] || r[0] || "",
                      i = r[0] || l || "";
                    return t
                      ? { description: l, id: t, promptPreview: i, title: a }
                      : null;
                  })
                  .filter(Boolean);
              } catch (e) {
                return (
                  console.error("Failed to parse Gems list response:", e),
                  []
                );
              }
            }
            static parseGemConversationListResponse(e) {
              try {
                let t = a.parseFirstWrbPayload(e);
                if (!t) return { conversations: [] };
                let n = Array.isArray(t[2])
                  ? t[2]
                  : Array.isArray(t[1])
                    ? t[1]
                    : [];
                return {
                  conversations: a.parseConversationItems(n),
                  nextPageToken: a.findNextPageToken(t, 80),
                };
              } catch (e) {
                return (
                  console.error(
                    "Failed to parse Gem conversation list response:",
                    e,
                  ),
                  { conversations: [] }
                );
              }
            }
            static parseConversationDetailResponse(e) {
              try {
                let t;
                let n = e.split("\n"),
                  r = null;
                for (let e of n)
                  if (e.startsWith("["))
                    try {
                      r = JSON.parse(e);
                      break;
                    } catch (e) {
                      continue;
                    }
                if (!r || !r[0] || !r[0][2])
                  throw Error("Invalid response format");
                let a = JSON.parse(r[0][2]),
                  l = [],
                  i = a?.[0] || [],
                  o = [...i].reverse(),
                  s = new Set(),
                  u = (e) => {
                    if (
                      Array.isArray(e) &&
                      2 === e.length &&
                      "number" == typeof e[0] &&
                      e[0] > 16e8 &&
                      e[0] < 2e9 &&
                      "number" == typeof e[1]
                    )
                      return 1e3 * e[0];
                    if (Array.isArray(e))
                      for (let t = e.length - 1; t >= 0; t -= 1) {
                        let n = u(e[t]);
                        if (n) return n;
                      }
                  };
                for (let e of o) {
                  let t = u(e) ?? Date.now(),
                    n = e?.[2]?.[0]?.[0] || "",
                    r = this.filterNewImages(this.extractImages(e?.[2]), s);
                  (n || r.length > 0) &&
                    l.push({
                      id: e?.[0]?.[0] || "",
                      content: n,
                      media: r.length > 0 ? r : void 0,
                      role: "user",
                      timestamp: t,
                    });
                  let i = e?.[3]?.[0];
                  if (Array.isArray(i) && i.length > 0) {
                    let e = i[0];
                    if (Array.isArray(e) && e.length > 1) {
                      let n = e[0] || "",
                        r = e[1]?.[0] || "",
                        i = this.extractDocumentsMeta(e);
                      if (0 === i.length) {
                        let e = this.extractDocumentsMeta(a);
                        e.length > 0 && (i = e);
                      }
                      let o = this.extractImageSelectionIndex(r),
                        u = this.extractImages(e),
                        c = "number" == typeof o && u[o] ? [u[o]] : u,
                        d = this.filterNewImages(c, s),
                        f = new Set(),
                        p = i.filter((e) => {
                          let t =
                              /^rc_/.test(e.id) ||
                              /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                                e.id,
                              ),
                            n =
                              e.id.includes("immersive_entry_chip") ||
                              e.id.startsWith("http"),
                            r = e.chipUrl || e.id;
                          return !f.has(r) && (!!t || !n) && (f.add(r), !0);
                        }),
                        m = [];
                      if (p.length > 0)
                        try {
                          let e = p
                            .map((e) => {
                              let t = this.findDocContentById(a, e.id),
                                n = e.contentId
                                  ? this.findDocContentById(a, e.contentId)
                                  : null,
                                r = this.parseDocSections(t),
                                l = n
                                  ? this.parseDocSections(n)
                                  : {
                                      sections: [],
                                      links: [],
                                      contentMarkdown: void 0,
                                    },
                                i =
                                  r.contentMarkdown ||
                                  l.contentMarkdown ||
                                  this.findDocMarkdownByClues(a, e),
                                o = {
                                  id: e.id,
                                  title: e.title,
                                  createdAt: e.createdAt,
                                  chipUrl: e.chipUrl,
                                  sections: [...r.sections, ...l.sections],
                                  links: [...r.links, ...l.links],
                                  contentMarkdown: i,
                                };
                              return o;
                            })
                            .filter(Boolean);
                          m.push(...e);
                        } catch (e) {
                          console.warn("Failed to parse documents:", e);
                        }
                      let h = this.normalizeAssistantContent(r);
                      (h || m.length > 0 || d.length > 0) &&
                        l.push({
                          id: n,
                          content: h,
                          role: "assistant",
                          timestamp: t,
                          documents: m.length > 0 ? m : void 0,
                          media: d.length > 0 ? d : void 0,
                        });
                    }
                  }
                }
                let c = this.extractConversationId(a, i),
                  d =
                    o.find((e) => e?.[2]?.[0]?.[0])?.[2]?.[0]?.[0] ||
                    "Untitled",
                  f = this.extractGemInfo(i?.[0] ?? a),
                  p = c.replace(/^c_/, ""),
                  m = f.gemId
                    ? `https://gemini.google.com/gem/${f.gemId}/${p}`
                    : `https://gemini.google.com/app/${p}`,
                  h = i?.length ? u(i[i.length - 1]) : void 0,
                  g = i?.length ? u(i[0]) : void 0,
                  y = g || h || Date.now(),
                  v = this.extractModelName(a, e);
                return (
                  a[1] &&
                    "string" == typeof a[1] &&
                    a[1].startsWith("tC") &&
                    (t = a[1]),
                  {
                    id: c,
                    title: d,
                    messages: l,
                    chatTime: y,
                    createdAt: h,
                    timestamp: y,
                    url: m,
                    gemId: f.gemId,
                    gemTitle: f.gemTitle,
                    model: v,
                    tags: [],
                    nextPageToken: t,
                  }
                );
              } catch (e) {
                throw (
                  console.error("Failed to parse conversation detail:", e),
                  Error(`Failed to parse conversation detail: ${e.message}`)
                );
              }
            }
            static normalizeAssistantContent(e) {
              return e
                ? e
                    .replace(this.IMAGE_GENERATION_CONTENT_REGEX, "")
                    .replace(/^\s+/, "")
                : "";
            }
            static extractImageSelectionIndex(e) {
              if (!e) return;
              let t = e.match(this.IMAGE_GENERATION_CONTENT_REGEX);
              if (!t) return;
              let n = Number.parseInt(t[1], 10);
              return Number.isNaN(n) ? void 0 : n;
            }
            static getImageDedupKey(e) {
              return (
                e.downloadUrl ||
                e.id ||
                [e.fileName, e.mimeType, e.width, e.height]
                  .filter((e) => null != e && "" !== e)
                  .join(":")
              );
            }
            static filterNewImages(e, t) {
              return e.filter((e) => {
                let n = this.getImageDedupKey(e);
                return !n || (!t.has(n) && (t.add(n), !0));
              });
            }
            static extractImages(e) {
              let t = new Map(),
                n = (e) => {
                  let n = e.find(
                    (e) =>
                      "string" == typeof e &&
                      (/^https:\/\/lh3\.googleusercontent\.com\//.test(e) ||
                        /^https:\/\/lh3\.google\.com\/rd-gg\//.test(e)),
                  );
                  if (!n) return;
                  let r = e.find(
                      (e) => "string" == typeof e && /^image\//.test(e),
                    ),
                    a = e.find(
                      (e) =>
                        "string" == typeof e &&
                        /\.(png|jpe?g|gif|webp|svg)$/i.test(e),
                    ),
                    l = e.find(
                      (e) =>
                        Array.isArray(e) &&
                        e.length >= 2 &&
                        "number" == typeof e[0] &&
                        "number" == typeof e[1],
                    ),
                    i = e.find(
                      (e) => "string" == typeof e && e.startsWith("$AQ"),
                    ),
                    o =
                      a ||
                      `${n.split("/").pop()?.split("?")[0] || "gemini-image"}.${r?.split("/")[1] || "png"}`,
                    s = i || o || n;
                  t.has(s) ||
                    t.set(s, {
                      downloadUrl: n,
                      fileName: o,
                      height:
                        Array.isArray(l) && "number" == typeof l[1]
                          ? l[1]
                          : void 0,
                      id: s,
                      mimeType: r,
                      width:
                        Array.isArray(l) && "number" == typeof l[0]
                          ? l[0]
                          : void 0,
                    });
                },
                r = (e) => {
                  if (Array.isArray(e)) {
                    for (let t of (n(e), e)) r(t);
                    return;
                  }
                  if (e && "object" == typeof e)
                    for (let t of Object.values(e)) r(t);
                };
              return (r(e), Array.from(t.values()));
            }
            static extractDocumentsMeta(e) {
              let t = [],
                n =
                  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
                r = (e) => {
                  e.id &&
                    e.title &&
                    t.push({
                      id: e.id,
                      title: e.title,
                      chipUrl: e.chipUrl,
                      createdAt: e.createdAt,
                      contentId: e.contentId,
                    });
                },
                a = (e) => {
                  if (Array.isArray(e))
                    for (let t = 0; t < e.length; t++) {
                      let l = e[t];
                      if (
                        Array.isArray(l) &&
                        l.length >= 4 &&
                        Array.isArray(l[0]) &&
                        l[0].length > 0 &&
                        "string" == typeof l[0][0] &&
                        l[0][0].includes("immersive_entry_chip") &&
                        "string" == typeof l[1] &&
                        "string" == typeof l[2] &&
                        "string" == typeof l[3]
                      ) {
                        let e;
                        let t = l[0][0],
                          n = l[2],
                          a = l[3];
                        Array.isArray(l[5]) &&
                          "number" == typeof l[5][0] &&
                          (e = 1e3 * l[5][0]);
                        let i =
                          "string" == typeof l[4] && l[4].length > 10
                            ? l[4]
                            : void 0;
                        r({
                          id: n,
                          title: a,
                          chipUrl: t,
                          createdAt: e,
                          contentId: i,
                        });
                      } else if (Array.isArray(l)) {
                        let e = l.flat().filter((e) => "string" == typeof e),
                          t = e.find((e) => e.includes("immersive_entry_chip"));
                        if (t) {
                          let a = e.find((e) => n.test(e)),
                            l = e.find(
                              (e) =>
                                !e.includes("http") &&
                                !n.test(e) &&
                                e.length > 3 &&
                                !e.includes("c_") &&
                                !e.includes(".html"),
                            );
                          r({
                            id: a || e.find((e) => e.includes("rc_")) || t,
                            title: l || "Document",
                            chipUrl: t,
                          });
                        }
                        a(l);
                      } else a(l);
                    }
                };
              return (a(e), t);
            }
            static findDocContentById(e, t) {
              let n = null,
                r = (e) => {
                  if (!n && Array.isArray(e)) {
                    if (e.some((e) => e === t)) {
                      n = e;
                      return;
                    }
                    for (let t of e) r(t);
                  }
                };
              return (r(e), n);
            }
            static parseDocSections(e) {
              let t;
              let n = [],
                r = [];
              if (!e) return { sections: n, links: r };
              let a = null,
                l = (e) => {
                  if (!a && Array.isArray(e)) {
                    if (
                      e.length >= 3 &&
                      "string" == typeof e[0] &&
                      (null === e[1] || "string" == typeof e[1]) &&
                      Array.isArray(e[2])
                    ) {
                      a = e[2];
                      return;
                    }
                    for (let t of e) l(t);
                  }
                };
              l(e);
              let i = Array.isArray(a) ? a : [];
              for (let e of i) {
                if (
                  Array.isArray(e) &&
                  Array.isArray(e[5]) &&
                  "string" == typeof e[5][0]
                ) {
                  let t = String(e[5][0] || "").trim(),
                    r = "string" == typeof e[5][1] ? String(e[5][1]) : void 0;
                  t && n.push({ title: t, content: r });
                  continue;
                }
                if (
                  Array.isArray(e) &&
                  Array.isArray(e[4]) &&
                  1 === e[4][0] &&
                  Array.isArray(e[4][2]) &&
                  "string" == typeof e[4][2][1]
                ) {
                  let t = e[4][2][1],
                    n = "string" == typeof e[4][2][2] ? e[4][2][2] : t;
                  r.push({ title: n, url: t });
                  continue;
                }
              }
              let o = (e) => {
                if (!t) {
                  if ("string" == typeof e) {
                    let n = e.trim();
                    if (
                      n.startsWith("# ") ||
                      n.startsWith("## ") ||
                      (n.includes("\n") && n.length > 80)
                    ) {
                      t = n;
                      return;
                    }
                  } else if (Array.isArray(e)) for (let t of e) o(t);
                }
              };
              return (o(e), { sections: n, links: r, contentMarkdown: t });
            }
            static findDocMarkdownByClues(e, t) {
              let n;
              let r = (e) => {
                if (!n && Array.isArray(e)) {
                  let a = e.flat ? e.flat(1) : e,
                    l = a.some((e) => e === t.id),
                    i = a.some((e) => e === t.title);
                  if (l && i) {
                    let t = (e) => {
                      if (!n) {
                        if ("string" == typeof e) {
                          let t = e.trim();
                          if (
                            t.startsWith("# ") ||
                            t.startsWith("## ") ||
                            (t.includes("\n") && t.length > 120)
                          ) {
                            n = t;
                            return;
                          }
                        } else if (Array.isArray(e)) for (let n of e) t(n);
                      }
                    };
                    if ((t(e), n)) return;
                  }
                  for (let t of e) r(t);
                }
              };
              return (r(e), n);
            }
            static extractGemInfo(e) {
              let t = null,
                n = null,
                r = (e) => {
                  if (!t && Array.isArray(e))
                    for (let a = 0; a < e.length; a += 1) {
                      let l = e[a];
                      if (
                        "string" == typeof l &&
                        /^[0-9a-f]{12}$/i.test(l) &&
                        null === e[a + 1] &&
                        Array.isArray(e[a + 2]) &&
                        "string" == typeof e[a + 2][0]
                      ) {
                        ((t = l), (n = e[a + 2][0]));
                        return;
                      }
                      r(l);
                    }
                };
              return (r(e), { gemId: t, gemTitle: n });
            }
            static extractModelName(e, t) {
              let n = [
                  /^(?:Gemini\s*)?\d+(?:\.\d+)?\s+(?:Flash|Pro|Thinking)(?:\s+[A-Za-z0-9.-]+)?$/i,
                  /^(?:Gemini\s+)?(?:Flash|Pro|Thinking|Fast)$/i,
                ],
                r = (e) => e.trim().replace(/\s+/g, " "),
                a = (e) => {
                  let t = r(e);
                  return !!t && !(t.length > 40) && n.some((e) => e.test(t));
                },
                l = (e) => {
                  if ("string" == typeof e) return a(e) ? r(e) : null;
                  if (Array.isArray(e))
                    for (let t = e.length - 1; t >= 0; t -= 1) {
                      let n = l(e[t]);
                      if (n) return n;
                    }
                  return null;
                },
                i = l(e);
              if (i) return i;
              let o = t.match(
                /"(Gemini\s*\d+(?:\.\d+)?\s+(?:Flash|Pro|Thinking)(?:\s+[A-Za-z0-9.-]+)?|Gemini\s+(?:Flash|Pro|Thinking|Fast)|(?:\d+(?:\.\d+)?\s+)?(?:Flash|Pro|Thinking|Fast))"/gi,
              );
              return o?.length ? r(o[o.length - 1].slice(1, -1)) : null;
            }
            static extractConversationId(e, t) {
              let n = [
                e?.[1]?.[0],
                t?.[0]?.[0]?.[0],
                t?.[t.length - 1]?.[0]?.[0],
              ];
              for (let e of n)
                if ("string" == typeof e && e.startsWith("c_")) return e;
              let r = (e) => {
                if ("string" == typeof e) return e.startsWith("c_") ? e : null;
                if (Array.isArray(e))
                  for (let t of e) {
                    let e = r(t);
                    if (e) return e;
                  }
                return null;
              };
              return r(e) || "";
            }
          }
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl" },
      ],
      "7yY77": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "extractPerplexityThreadId", () => a));
          let a = (e) => {
            try {
              let t = new URL(e),
                n = t.pathname.match(/^\/search\/([^/?#]+)/);
              return n?.[1] ?? null;
            } catch {
              return null;
            }
          };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl" },
      ],
      gTfMj: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "getPlatformRuntimeContext", () => s),
            r.export(n, "getPlatformConversationDetails", () => u),
            r.export(n, "getPlatformConversationSummaries", () => c),
            r.export(n, "getPlatformProjects", () => d));
          var a = e("~platforms/chatgpt/adapter"),
            l = e("~platforms/claude/adapter"),
            i = e("~platforms/gemini/adapter"),
            o = e("~platforms/perplexity/adapter");
          e("~platforms/registry");
          let s = async (e, t) => {
              try {
                switch (e) {
                  case "chatgpt":
                    return {
                      ok: !0,
                      platformId: e,
                      url: t,
                      context: await (0, a.getChatGptRuntimeContext)(t),
                    };
                  case "claude":
                    return {
                      ok: !0,
                      platformId: e,
                      url: t,
                      context: await (0, l.getClaudeRuntimeContext)(t),
                    };
                  case "gemini":
                    return {
                      ok: !0,
                      platformId: e,
                      url: t,
                      context: await (0, i.getGeminiRuntimeContext)(t),
                    };
                  case "perplexity":
                    return {
                      ok: !0,
                      platformId: e,
                      url: t,
                      context: await (0, o.getPerplexityRuntimeContext)(t),
                    };
                  default:
                    return {
                      ok: !1,
                      platformId: e,
                      url: t,
                      error: "Unsupported platform context request.",
                    };
                }
              } catch (n) {
                return {
                  ok: !1,
                  platformId: e,
                  url: t,
                  error:
                    n instanceof Error
                      ? n.message
                      : "Failed to load platform runtime context.",
                };
              }
            },
            u = async (e, t, n = {}) => {
              switch (e) {
                case "chatgpt": {
                  let e = await Promise.all(
                    t.map((e) =>
                      (0, a.getChatGptConversationDetail)(e, {
                        contentMode: n.chatGptContentMode,
                        groupChatSyncMode: n.chatGptGroupChatSyncMode,
                        includeDownloadInfo: !0,
                      }),
                    ),
                  );
                  return e.filter((e) => !!e);
                }
                case "claude": {
                  let e = await Promise.all(
                    t.map((e) => (0, l.getClaudeConversationDetail)(e)),
                  );
                  return e.filter((e) => !!e);
                }
                case "gemini": {
                  let e = await Promise.all(
                    t.map((e) =>
                      (0, i.getGeminiConversationDetail)(e, {
                        targetSid: n.targetSid,
                      }),
                    ),
                  );
                  return e.filter((e) => !!e);
                }
                case "perplexity": {
                  let e = await Promise.all(
                    t.map((e) => (0, o.getPerplexityConversationDetail)(e)),
                  );
                  return e.filter((e) => !!e);
                }
                default:
                  return [];
              }
            },
            c = async (e, t, n = {}) => {
              switch (e) {
                case "chatgpt":
                  return await (0, a.getChatGptConversationSummaries)(t, {
                    contentMode: n.chatGptContentMode,
                    groupChatSyncMode: n.chatGptGroupChatSyncMode,
                    projectId: n.chatGptProjectId,
                    projectSyncMode: n.chatGptProjectSyncMode,
                  });
                case "claude":
                  return await (0, l.getClaudeConversationSummaries)(t);
                case "gemini":
                  return await (0, i.getGeminiConversationSummaries)(t, {
                    targetSid: n.targetSid,
                  });
                case "perplexity":
                  return await (0, o.getPerplexityConversationSummaries)(t, {
                    perplexityContentMode: n.perplexityContentMode,
                    perplexitySelectedSpaceSlugs:
                      n.perplexitySelectedSpaceSlugs,
                  });
                default:
                  return [];
              }
            },
            d = async (e, t) => {
              try {
                switch (e) {
                  case "chatgpt": {
                    let n = await (0, a.getChatGptProjectList)();
                    return {
                      ok: !0,
                      pageTitle: document.title,
                      platformId: e,
                      projects: n,
                      url: t,
                    };
                  }
                  case "perplexity": {
                    let n = await (0, o.getPerplexitySpaces)();
                    return {
                      ok: !0,
                      pageTitle: document.title,
                      platformId: e,
                      projects: n.map((e) => ({
                        id: e.slug,
                        name: `${e.emoji ? `${e.emoji} ` : ""}${e.title}`,
                      })),
                      url: t,
                    };
                  }
                  default:
                    return {
                      ok: !1,
                      error: "Project selection is only available for ChatGPT.",
                      platformId: e,
                      url: t,
                    };
                }
              } catch (n) {
                return {
                  ok: !1,
                  error:
                    n instanceof Error
                      ? n.message
                      : "Failed to load platform projects.",
                  platformId: e,
                  url: t,
                };
              }
            };
        },
        {
          "~platforms/chatgpt/adapter": "4oUPE",
          "~platforms/claude/adapter": "iMz4C",
          "~platforms/gemini/adapter": "dpcnP",
          "~platforms/perplexity/adapter": "fbsIy",
          "~platforms/registry": "bmsSX",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      iMz4C: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "getClaudeConversationListPage", () => N),
            r.export(n, "getClaudeConversationSummaries", () => A),
            r.export(n, "getClaudeConversationDetail", () => L),
            r.export(n, "getClaudeRuntimeContext", () => R));
          var a = e("~platforms/registry"),
            l = e("~platforms/claude/org-id");
          let i = 10,
            o = 1e4,
            s = async (e, t = o) =>
              await Promise.race([
                e,
                new Promise((e, n) => {
                  setTimeout(() => n(Error("Claude request timed out.")), t);
                }),
              ]),
            u = (e) =>
              e
                .replace(/\u200b|\uFEFF/g, " ")
                .replace(/\r\n/g, "\n")
                .trim(),
            c = (e, t) => {
              if ("undefined" != typeof document) {
                let e = document.title.replace(" - Claude", "").trim();
                if (e) return e;
              }
              let n = t?.uuid ?? e;
              return n
                ? `Claude Conversation ${n.slice(0, 8)}`
                : "Untitled Conversation";
            },
            d = (e) => {
              if ("string" == typeof e) return u(e);
              if (null == e) return "";
              try {
                return u(JSON.stringify(e, null, 2));
              } catch {
                return u(String(e));
              }
            },
            f = (e) => {
              if (!e) return null;
              let t = new Date(e);
              return Number.isNaN(t.getTime()) ? null : t.toISOString();
            },
            p = (e) => {
              try {
                let t = new URL(e),
                  n = t.pathname.split("/").filter(Boolean),
                  r = n.indexOf("chat");
                if (r >= 0 && n[r + 1]) return n[r + 1];
                return null;
              } catch {
                return null;
              }
            },
            m = async () => await (0, l.loadClaudeOrgIdFromStorage)(),
            h = async () => {
              let e = await m();
              if (e)
                return (
                  console.debug(
                    "[Claude Adapter] Using stored organization id.",
                  ),
                  e
                );
              let t = await (0, l.captureClaudeOrgIdFromPage)();
              return (
                t
                  ? (await chrome.storage.local.set({
                      [l.CLAUDE_ORG_ID_STORAGE_KEY]: t,
                    }),
                    console.debug(
                      "[Claude Adapter] Captured organization id from page context.",
                    ))
                  : console.warn(
                      "[Claude Adapter] No organization id available from storage or page context.",
                    ),
                t
              );
            },
            g = async (e) => {
              console.debug("[Claude Adapter] Fetching Claude JSON:", e);
              let t = await h();
              if (!t)
                throw Error(
                  "Claude organization id is unavailable. Refresh the claude.ai tab and try again.",
                );
              let n = await s(
                fetch(`https://claude.ai/api/organizations/${t}${e}`, {
                  credentials: "include",
                  headers: { accept: "*/*" },
                  method: "GET",
                }),
              );
              if (!n.ok)
                throw Error(
                  `Claude API request failed with status ${n.status}.`,
                );
              return await n.json();
            },
            y = (e) => {
              if (!e.uuid || !e.name) return null;
              let t = [
                e.is_starred ? "starred" : null,
                e.project?.name ?? null,
              ].filter((e) => !!e);
              return {
                createdAt: f(e.created_at),
                id: e.uuid,
                isSelected: !1,
                platform: "claude",
                tags: t,
                title: e.name,
                updatedAt: f(e.updated_at ?? e.created_at),
                url: `https://claude.ai/chat/${e.uuid}`,
              };
            },
            v = (e) =>
              e
                ? e.includes("image")
                  ? "image"
                  : e.includes("code") ||
                      e.includes("javascript") ||
                      e.includes("python")
                    ? "code"
                    : e.includes("text") ||
                        e.includes("markdown") ||
                        e.includes("document")
                      ? "document"
                      : "unknown"
                : "unknown",
            w = (e) => e.file_name || "Attachment",
            b = (e) => e.file_type || e.mime_type || "unknown",
            S = (e) => {
              let t = e?.trim();
              if (t)
                try {
                  return new URL(t, "https://claude.ai").toString();
                } catch {
                  return t;
                }
            },
            k = (e) => S(e.url || e.preview_url),
            _ = (e) => e.mime_type || e.file_type,
            x = ({ conversationId: e, orgId: t, path: n }) =>
              `https://claude.ai/api/organizations/${t}/conversations/${e}/wiggle/download-file?path=${encodeURIComponent(n)}`,
            C = (e) => {
              let t = e.split("?")[0],
                n = t.split(/[\\/]/).pop()?.trim();
              return n || "Attachment";
            },
            E = (e) => {
              let t = e.toLowerCase();
              return t.endsWith(".md")
                ? "text/markdown"
                : t.endsWith(".txt")
                  ? "text/plain"
                  : t.endsWith(".json")
                    ? "application/json"
                    : t.endsWith(".csv")
                      ? "text/csv"
                      : t.endsWith(".pdf")
                        ? "application/pdf"
                        : t.endsWith(".docx")
                          ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          : t.endsWith(".xlsx")
                            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            : t.endsWith(".pptx")
                              ? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              : t.endsWith(".png")
                                ? "image/png"
                                : t.endsWith(".jpg") || t.endsWith(".jpeg")
                                  ? "image/jpeg"
                                  : t.endsWith(".webp")
                                    ? "image/webp"
                                    : t.endsWith(".gif")
                                      ? "image/gif"
                                      : "application/octet-stream";
            },
            P = (e) =>
              e?.toLowerCase().startsWith("image/") ? "image" : "file",
            I = (e, t, n) =>
              e
                ? t
                  ? e.includes(t)
                    ? e.replace(t, n || "")
                    : `${e}

/* patch_failed (old_str not found) */
${n || ""}`.trim()
                  : `${e}

${n || ""}`.trim()
                : n || "",
            T = ({ conversationId: e, detail: t, orgId: n }) => {
              let r = new Map(),
                a = new Map(),
                l = new Map(),
                i = (t.chat_messages ?? [])
                  .map((t) => {
                    let i = t.uuid ?? crypto.randomUUID(),
                      o =
                        "human" === t.sender
                          ? "user"
                          : "tool" === t.sender
                            ? "tool"
                            : "assistant",
                      s = new Map(),
                      c = new Set(),
                      p = ({
                        downloadUrl: e,
                        fileName: t,
                        id: n,
                        mimeType: r,
                      }) => {
                        let a = r || E(t),
                          o = {
                            downloadUrl: e,
                            fileName: t,
                            id: n,
                            mimeType: a,
                            type: P(a),
                          },
                          u = `${o.type}:${o.downloadUrl || ""}:${o.fileName}`;
                        c.has(u) ||
                          (c.add(u),
                          s.set(o.id, o),
                          l.set(o.id, {
                            id: o.id,
                            name: o.fileName,
                            sourceMessageId: i,
                            type: o.mimeType || o.type,
                            url: o.downloadUrl,
                          }));
                      };
                    for (let [r, a] of [
                      ...(t.attachments ?? []),
                      ...(t.files ?? []),
                      ...(t.files_v2 ?? []),
                    ].entries()) {
                      let t = k(a),
                        o = w(a),
                        s = a.id || `${i}-attachment-${r}-${o}`;
                      (l.set(s, {
                        id: s,
                        name: o,
                        sourceMessageId: i,
                        type: b(a),
                        url: t,
                      }),
                        t
                          ? p({
                              downloadUrl: t,
                              fileName: o,
                              id: s,
                              mimeType: _(a),
                            })
                          : a.path &&
                            p({
                              downloadUrl: x({
                                conversationId: e,
                                orgId: n,
                                path: a.path,
                              }),
                              fileName: o,
                              id: s,
                              mimeType: _(a),
                            }));
                    }
                    let m = (t.content ?? [])
                        .map((l) => {
                          if ("tool_use" === l.type) {
                            let o = l.name || "tool",
                              s = l.input ?? {};
                            if ("artifacts" === o) {
                              let e = String(
                                  s.id ||
                                    l.input?.id ||
                                    l.input?.version_uuid ||
                                    crypto.randomUUID(),
                                ),
                                n = String(s.command || "create"),
                                i = String(
                                  s.type || s.textdoc_type || "text/plain",
                                ),
                                o = String(
                                  s.title ||
                                    s.id ||
                                    s.version_uuid ||
                                    "Untitled Artifact",
                                ),
                                u = s.version_uuid
                                  ? String(s.version_uuid)
                                  : void 0,
                                c = a.get(e) ?? { version: 0 },
                                f = c.current || "";
                              f =
                                "create" === n || "rewrite" === n
                                  ? "string" == typeof s.content
                                    ? s.content
                                    : d(s.content || s)
                                  : "update" === n
                                    ? I(
                                        c.current || "",
                                        s.old_str,
                                        s.new_str ||
                                          ("string" == typeof s.content
                                            ? s.content
                                            : void 0),
                                      )
                                    : "string" == typeof s.content
                                      ? s.content
                                      : d(s.content || s);
                              let p = c.version + 1,
                                m = u || `${e}-v${p}`,
                                h = `${o} (v${p}${"create" !== n ? ` ${n}` : ""})`;
                              (r.set(m, {
                                content: f,
                                id: m,
                                label: h,
                                mimeType: i,
                                sourceMessageId: t.uuid,
                                type: v(i),
                              }),
                                a.set(e, {
                                  current: f,
                                  textdocType: i,
                                  title: o,
                                  version: p,
                                }));
                            }
                            if (
                              ("create_file" === o || "present_files" === o) &&
                              "string" == typeof s.path &&
                              s.path.trim()
                            ) {
                              let t = s.path.trim(),
                                r = C(t);
                              p({
                                downloadUrl: x({
                                  conversationId: e,
                                  orgId: n,
                                  path: t,
                                }),
                                fileName: r,
                                id: `${i}-generated-${t}`,
                                mimeType: E(r),
                              });
                            }
                            if (
                              "present_files" === o &&
                              Array.isArray(s.filepaths)
                            )
                              for (let t of s.filepaths) {
                                if ("string" != typeof t || !t.trim()) continue;
                                let r = t.trim(),
                                  a = C(r);
                                p({
                                  downloadUrl: x({
                                    conversationId: e,
                                    orgId: n,
                                    path: r,
                                  }),
                                  fileName: a,
                                  id: `${i}-presented-${r}`,
                                  mimeType: E(a),
                                });
                              }
                            return "";
                          }
                          return "text" === l.type
                            ? u(l.text || "")
                            : "tool_result" === l.type
                              ? ""
                              : l.text
                                ? u(l.text)
                                : "";
                        })
                        .filter(Boolean),
                      h = m.join("\n\n").trim(),
                      g = Array.from(s.values());
                    return h || g.length
                      ? {
                          content: h,
                          createdAt: f(t.created_at),
                          ...(g.length ? { media: g } : {}),
                          id: i,
                          role: o,
                        }
                      : null;
                  })
                  .filter((e) => null !== e);
              return {
                artifacts: Array.from(r.values()),
                attachments: Array.from(l.values()).map((e) => ({
                  id: e.id,
                  name: e.name,
                  type: e.type,
                  url: e.url,
                })),
                messages: i,
              };
            },
            N = async (e = 1, t = i) => {
              let n = await g(
                  `/chat_conversations?limit=${t}&offset=${Math.max(e - 1, 0) * t}&consistency=eventual`,
                ),
                r = (Array.isArray(n) ? n : []).map(y).filter((e) => !!e);
              return {
                bulk: {
                  availableCount: null,
                  firstPageCount: r.length,
                  hasMore: r.length === t,
                },
                recentConversations: r,
              };
            },
            A = async (e) => {
              let t = Math.max(1, e),
                n = [];
              for (let e = 1; n.length < t; e += 1) {
                let { bulk: t, recentConversations: r } = await N(e, 20);
                if ((n.push(...r), !t.hasMore || r.length < 20)) break;
              }
              return n.slice(0, t);
            },
            L = async (e) => {
              if (!e) return null;
              let t = await g(
                  `/chat_conversations/${e}?tree=True&rendering_mode=messages&render_all_tools=true`,
                ),
                n = await h();
              if (!n)
                throw Error(
                  "Claude organization id is unavailable. Refresh the claude.ai tab and try again.",
                );
              let r = T({ conversationId: e, detail: t, orgId: n }),
                a = t.name?.trim() || c(e, t);
              return (
                t.name?.trim() ||
                  console.warn(
                    "[Claude Adapter] Conversation detail is missing `name`; using fallback title.",
                    {
                      conversationId: e,
                      fallbackTitle: a,
                      uuid: t.uuid ?? null,
                    },
                  ),
                {
                  artifacts: r.artifacts,
                  attachments: r.attachments,
                  messages: r.messages,
                  metadata: {
                    messageCount: r.messages.length,
                    projectName: t.project?.name ?? null,
                    source: "claude-conversations-api",
                    starred: t.is_starred ?? !1,
                  },
                  summary: {
                    createdAt: f(t.created_at),
                    id: t.uuid ?? e,
                    isSelected: !1,
                    platform: "claude",
                    tags: [
                      t.is_starred ? "starred" : null,
                      t.project?.name ?? null,
                    ].filter((e) => !!e),
                    title: a,
                    updatedAt: f(t.updated_at ?? t.created_at),
                    url: `https://claude.ai/chat/${t.uuid ?? e}`,
                  },
                }
              );
            },
            R = async (e) => {
              let { bulk: t, recentConversations: n } = await N(),
                r = p(e),
                l = await L(r),
                i = await h();
              return {
                bulk: t,
                capabilities: a.platformRegistry.claude.capabilities,
                currentConversation: l,
                metadata: {
                  hasOrgId: !!i,
                  orgIdStatus: i ? "captured" : "missing",
                },
                recentConversations: n,
              };
            };
        },
        {
          "~platforms/registry": "bmsSX",
          "~platforms/claude/org-id": "2k7nQ",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      dpcnP: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "getGeminiConversationSummaries", () => f),
            r.export(n, "getGeminiConversationDetail", () => p),
            r.export(n, "getGeminiRuntimeContext", () => m));
          var a = e("~platforms/registry");
          let l = (e) => {
              if ("number" != typeof e || Number.isNaN(e)) return null;
              let t = new Date(e);
              return Number.isNaN(t.getTime()) ? null : t.toISOString();
            },
            i = (e) => {
              if (!e.id || !e.title) return null;
              let t = e.id.startsWith("c_") ? e.id.slice(2) : e.id,
                n = [];
              return (
                e.gemTitle && n.push("Gem", e.gemTitle),
                {
                  accountScope: e.accountScope ?? null,
                  createdAt: l(e.createdAt || e.chatTime || e.timestamp),
                  id: t,
                  isSelected: !1,
                  platform: "gemini",
                  tags: n,
                  title: e.title,
                  updatedAt: l(e.timestamp || e.chatTime),
                  url: e.url,
                }
              );
            },
            o = (e) =>
              e.messages.map((e) => ({
                content: e.content,
                createdAt: l(e.timestamp),
                id: e.id,
                ...(e.media?.length
                  ? {
                      media: e.media.map((e) => ({
                        downloadUrl: e.downloadUrl,
                        fileName: e.fileName,
                        height: e.height,
                        id: e.id,
                        mimeType: e.mimeType,
                        type: "image",
                        width: e.width,
                      })),
                    }
                  : {}),
                role: "user" === e.role ? "user" : "assistant",
              })),
            s = (e) => {
              let t = [];
              for (let n of e.messages) {
                if (n.documents && n.documents.length > 0)
                  for (let e of n.documents)
                    t.push({
                      id: e.id,
                      label: e.title,
                      sourceMessageId: n.id,
                      type: "document",
                      url: e.chipUrl,
                    });
                if (n.media?.length)
                  for (let e of n.media)
                    t.push({
                      id: e.id,
                      label: e.fileName,
                      mimeType: e.mimeType,
                      sourceMessageId: n.id,
                      type: "image",
                      url: e.downloadUrl,
                    });
              }
              return t;
            },
            u = () => ({
              bulk: { availableCount: null, firstPageCount: 0, hasMore: !1 },
              capabilities: a.platformRegistry.gemini.capabilities,
              currentConversation: null,
              metadata: {
                platformStatus: "pending",
                recentConversationCount: 0,
              },
              recentConversations: [],
            }),
            c = (e) => {
              let t = i(e);
              return t
                ? {
                    artifacts: s(e),
                    attachments: [],
                    messages: o(e),
                    metadata: {
                      hasMoreMessages: !!e.nextPageToken,
                      messageCount: e.messages.length,
                      source: "gemini-api",
                      ...(e.accountScope && { accountScope: e.accountScope }),
                      ...(e.gemId && { gemId: e.gemId }),
                      ...(e.model && { model: e.model }),
                      ...(e.gemTitle && { gemTitle: e.gemTitle }),
                    },
                    summary: t,
                  }
                : null;
            },
            d = async (e, t = {}) => {
              if (
                (console.log("[Gemini Adapter] Sending message:", e),
                !chrome?.tabs?.query)
              ) {
                let n = await chrome.runtime.sendMessage({
                  action: "AI_EXPORTER_HUB_GEMINI_SEND_TAB_MESSAGE",
                  message: e,
                  pageUrl: t.pageUrl,
                });
                if (!n?.success)
                  throw Error(n?.error || "Gemini background bridge failed.");
                return n;
              }
              let n = await chrome.tabs.query({
                url: "https://gemini.google.com/*",
              });
              for (let t of (console.log(
                "[Gemini Adapter] Found tabs:",
                n.length,
              ),
              n))
                if (t.id)
                  try {
                    console.log("[Gemini Adapter] Trying tab:", t.id, t.url);
                    let n = await chrome.tabs.sendMessage(t.id, e);
                    if (
                      (console.log("[Gemini Adapter] Response:", n), n?.success)
                    )
                      return n;
                  } catch (e) {
                    console.warn("[Gemini Adapter] Tab failed:", t.id, e);
                    continue;
                  }
              throw Error("No active Gemini tab found");
            },
            f = async (e, t = {}) => {
              let n;
              let r = [];
              for (; r.length < e;) {
                let a = await d({
                  action: "getConversationList",
                  pageToken: n,
                  targetSid: t.targetSid,
                });
                if (!a.data) break;
                let { conversations: l, nextPageToken: o } = a.data;
                for (let t of l) {
                  let n = i(t);
                  if ((n && r.push(n), r.length >= e)) break;
                }
                if (!(n = o)) break;
              }
              return r.slice(0, e);
            },
            p = async (e, t = {}) => {
              if (!e) return null;
              let n = await d({
                action: "getConversationDetail",
                conversationId: e,
                targetSid: t.targetSid,
              });
              if (!n.data)
                throw Error(n.error || "Failed to get conversation detail");
              let r = n.data,
                a = c(r);
              if (!a) throw Error("Invalid conversation data");
              return a;
            },
            m = async (e) => {
              console.log(
                "[Gemini Adapter] getGeminiRuntimeContext called from:",
                e,
              );
              try {
                let [t, n] = await Promise.all([
                    d(
                      { action: "getCurrentConversationPreview" },
                      { pageUrl: e },
                    ).catch((e) => ({
                      error:
                        e instanceof Error
                          ? e.message
                          : "Failed to load current conversation.",
                      success: !1,
                    })),
                    d({ action: "getConversationList" }, { pageUrl: e }).catch(
                      (e) => ({
                        error:
                          e instanceof Error
                            ? e.message
                            : "Failed to load conversation list.",
                        success: !1,
                      }),
                    ),
                  ]),
                  r = t?.data ? c(t.data) : null,
                  l = Array.isArray(n?.data?.conversations)
                    ? n.data.conversations.map((e) => i(e)).filter((e) => !!e)
                    : [];
                return {
                  bulk: {
                    availableCount: null,
                    firstPageCount: l.length,
                    hasMore: !!n?.data?.nextPageToken,
                  },
                  capabilities: a.platformRegistry.gemini.capabilities,
                  currentConversation: r,
                  metadata: {
                    currentConversationId: r?.summary.id ?? null,
                    listError: n?.success ? null : (n?.error ?? null),
                    platformStatus: r ? "connected" : "pending",
                    recentConversationCount: l.length,
                    currentConversationError: t?.success
                      ? null
                      : (t?.error ?? null),
                  },
                  recentConversations: l,
                };
              } catch (t) {
                let e = u();
                return {
                  ...e,
                  metadata: {
                    ...e.metadata,
                    error:
                      t instanceof Error
                        ? t.message
                        : "Gemini runtime context loading failed.",
                  },
                };
              }
            };
        },
        {
          "~platforms/registry": "bmsSX",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
      fbsIy: [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n),
            r.export(n, "getPerplexityConversationSummaries", () => z),
            r.export(n, "getPerplexitySpaces", () => j),
            r.export(n, "getPerplexityConversationDetail", () => U),
            r.export(n, "getPerplexityRuntimeContext", () => D));
          var a = e("~platforms/registry"),
            l = e("./url");
          let i = "https://www.perplexity.ai/rest",
            o = "2.18",
            s = [
              "answer_modes",
              "media_items",
              "knowledge_cards",
              "inline_entity_cards",
              "place_widgets",
              "finance_widgets",
              "sports_widgets",
              "flight_status_widgets",
              "shopping_widgets",
              "jobs_widgets",
              "search_result_widgets",
              "clarification_responses",
              "inline_images",
              "inline_assets",
              "unified_assets",
              "placeholder_cards",
              "diff_blocks",
              "inline_knowledge_cards",
              "entity_group_v2",
              "refinement_filters",
              "canvas_mode",
              "maps_preview",
              "answer_tabs",
              "price_comparison_widgets",
            ],
            u = async (e, t = {}) => {
              let { extraHeaders: n, headers: r, ...a } = t,
                l = `${i}${e}`,
                s = await fetch(l, {
                  ...a,
                  credentials: "include",
                  headers: {
                    accept: "*/*",
                    "content-type": "application/json",
                    "x-app-apiclient": "default",
                    "x-app-apiversion": o,
                    ...(r ?? {}),
                    ...(n ?? {}),
                  },
                });
              if (!s.ok)
                throw Error(
                  `Perplexity API error: ${s.status} ${s.statusText}`,
                );
              return await s.json();
            },
            c = () => {
              for (let e of [
                'h1[data-testid="thread-title"]',
                "h1.text-xl",
                "h1.font-medium",
                ".thread-title",
                "h1",
              ]) {
                let t = document.querySelector(e),
                  n = t?.innerText?.replace(/\s+/g, " ").trim();
                if (n) return n;
              }
              return "";
            },
            d = ({ detail: e, fallbackThreadId: t }) => {
              let n =
                  "undefined" != typeof window
                    ? (0, l.extractPerplexityThreadId)(window.location.href)
                    : null,
                r = n && n === t ? c() : "";
              if (r) return r;
              let a =
                e?.entries
                  ?.find((e) => e.thread_title?.trim())
                  ?.thread_title?.trim() ?? "";
              if (a) return a;
              let i =
                e?.entries
                  ?.find((e) => e.query_str?.trim())
                  ?.query_str?.trim() ?? "";
              return i || t;
            },
            f = (e) => ({
              createdAt: e.last_query_datetime || null,
              id: e.uuid,
              isSelected: !1,
              platform: "perplexity",
              tags: [],
              title: e.title || "Untitled",
              updatedAt: e.last_query_datetime || null,
              url: `https://www.perplexity.ai/search/${e.slug || e.uuid}`,
            }),
            p = (e) =>
              Array.from(new Set(["perplexity", "ai", e?.trim() ?? ""])).filter(
                Boolean,
              ),
            m = (e) => {
              try {
                return decodeURIComponent(e);
              } catch {
                return e;
              }
            },
            h = (e) => {
              let t = e?.trim() ?? "";
              if (!t) return "";
              try {
                let e = new URL(t);
                if (
                  "ppl-ai-file-upload.s3.amazonaws.com" !==
                  e.hostname.toLowerCase()
                )
                  return t;
                return `${e.origin}${e.pathname}`;
              } catch {
                return t;
              }
            },
            g = ({ fallbackName: e, url: t }) => {
              if (e?.trim()) return e.trim();
              if (!t?.trim()) return "attachment";
              try {
                let e = new URL(t),
                  n = e.pathname.split("/").filter(Boolean),
                  r = n[n.length - 1];
                return m(r || "attachment");
              } catch {
                return "attachment";
              }
            },
            y = (e) => {
              let t = e.split(".").pop()?.trim().toLowerCase() ?? "";
              return t || "file";
            },
            v = (e) => {
              let t = e.split(".").pop()?.trim().toLowerCase() ?? "";
              return "md" === t || "markdown" === t
                ? "text/markdown"
                : "html" === t || "htm" === t
                  ? "text/html"
                  : "json" === t
                    ? "application/json"
                    : "txt" === t
                      ? "text/plain"
                      : "";
            },
            w = ({ entryId: e, fileName: t, url: n }) => {
              let r =
                t.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 80) ||
                "attachment";
              if (!n?.trim()) return `${e}-attachment-${r}`;
              try {
                let t = new URL(n),
                  a = t.pathname
                    .split("/")
                    .filter(Boolean)
                    .slice(-3)
                    .join("-")
                    .replace(/[^a-zA-Z0-9._-]+/g, "-")
                    .slice(0, 120);
                return `${e}-attachment-${a || r}`;
              } catch {
                return `${e}-attachment-${r}`;
              }
            },
            b = ({ fileName: e, url: t }) => {
              if (!t?.trim()) return e;
              try {
                let e = new URL(t);
                return `${e.origin}${e.pathname}`.toLowerCase();
              } catch {
                return `${e}:${t}`.toLowerCase();
              }
            },
            S = ({ entryId: e, fallbackName: t, url: n }) => {
              let r = h(n);
              if (!r) return null;
              let a = g({ fallbackName: t, url: r }),
                l = y(a),
                i = w({ entryId: e, fileName: a, url: r });
              return {
                attachment: { id: i, name: a, type: l, url: r },
                media: {
                  downloadUrl: r,
                  fileName: a,
                  id: i,
                  mimeType: l,
                  type: "file",
                },
              };
            },
            k = (e) =>
              (e.blocks ?? []).flatMap((e) =>
                (e.web_result_block?.web_results ?? []).filter(
                  (e) => !!(e?.is_attachment && e.url),
                ),
              ),
            _ = (e) => {
              let t = new Map();
              for (let n of e.attachments ?? []) {
                let r =
                    "string" == typeof n
                      ? n
                      : "string" == typeof n?.url
                        ? n.url
                        : "",
                  a = S({
                    entryId: e.uuid,
                    fallbackName: "object" == typeof n ? n?.name : void 0,
                    url: r,
                  });
                a && t.set(a.attachment.id, a);
              }
              for (let n of k(e)) {
                let r = S({
                  entryId: e.uuid,
                  fallbackName: n.name,
                  url: n.url,
                });
                r && t.set(r.attachment.id, r);
              }
              return Array.from(t.values());
            },
            x = (e) => {
              let t = (e.blocks ?? [])
                .flatMap((e) => e.web_result_block?.web_results ?? [])
                .filter((e) => e?.url && !e?.is_attachment)
                .map((e, t) => {
                  let n = e.name?.trim() || `Source ${t + 1}`;
                  return `${t + 1}. [${n}](${e.url})`;
                });
              return t.length
                ? `## Sources

${t.join("\n")}`
                : "";
            },
            C = (e) => {
              let t = (e.related_queries ?? [])
                .map((e) => e?.trim())
                .filter((e) => !!e)
                .map((e) => `- ${e}`);
              return t.length
                ? `## Related Questions

${t.join("\n")}`
                : "";
            },
            E = (e) =>
              e.slug && e.title
                ? { emoji: e.emoji, slug: e.slug, title: e.title }
                : null,
            P = (e) => {
              for (let t of e.blocks ?? []) {
                if (
                  "ask_text" !== t.intended_usage &&
                  !t.markdown_block?.answer
                )
                  continue;
                let n =
                    t.markdown_block?.answer ||
                    t.markdown_block?.chunks?.join("\n") ||
                    "",
                  r = n.trim();
                if (!r) continue;
                let a = [x(e), C(e)].filter(Boolean);
                return {
                  content: [r, ...a].join("\n\n"),
                  createdAt: e.updated_datetime || e.created_datetime || null,
                  id: `${e.uuid}-answer`,
                  role: "assistant",
                };
              }
              return null;
            },
            I = ({ assetId: e, entryId: t, fileName: n }) => {
              let r =
                n.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 80) || "artifact";
              return e?.trim()
                ? `${t}-artifact-${e.trim()}`
                : `${t}-artifact-${r}`;
            },
            T = (e) => e?.doc_file?.source_content?.trim() ?? "",
            N = (e) =>
              e.doc_file?.filename?.trim() ||
              e.download_info
                ?.find((e) => e.filename?.trim())
                ?.filename?.trim() ||
              e.doc_file?.name?.trim() ||
              e.fallback_info?.name?.trim() ||
              "document.md",
            A = (e, t) =>
              e.doc_file?.name?.trim() ||
              e.fallback_info?.name?.trim() ||
              t.replace(/\.[^.]+$/, "").trim() ||
              "Perplexity Document",
            L = (e) =>
              e.doc_file?.url?.trim() ||
              e.download_info?.find((e) => e.url?.trim())?.url?.trim() ||
              e.fallback_info?.webview_url?.trim() ||
              void 0,
            R = (e) => {
              let t = [
                  {
                    assets: e.unified_assets_block?.assets ?? [],
                    source: "unified_assets_block",
                  },
                  {
                    assets: e.assets_mode_block?.assets ?? [],
                    source: "assets_mode_block",
                  },
                  {
                    assets:
                      e.inline_entity_block?.assets_preview_block?.assets ?? [],
                    source: "assets_preview_block",
                  },
                  {
                    assets: e.canvas_block?.asset ? [e.canvas_block.asset] : [],
                    source: "canvas_block",
                  },
                ],
                n =
                  e.plan_block?.steps?.flatMap((e, t) =>
                    (e.assets ?? []).map((e) => ({
                      asset: e,
                      source: `plan_block.step_assets.${t}`,
                    })),
                  ) ?? [];
              return [
                ...t.flatMap(({ assets: e, source: t }) =>
                  e.map((e) => ({ asset: e, source: t })),
                ),
                ...n,
              ];
            },
            M = (e) => {
              let t = new Map(),
                n = `${e.uuid}-answer`,
                r = {};
              for (let a of e.blocks ?? [])
                for (let { asset: l, source: i } of R(a)) {
                  if (((r[i] = (r[i] ?? 0) + 1), "DOC_FILE" !== l.asset_type))
                    continue;
                  let a = T(l);
                  if (!a) continue;
                  let o = N(l),
                    s = v(o) || "text/markdown",
                    u = I({
                      assetId: l.uuid || l.backend_uuid_slug,
                      entryId: e.uuid,
                      fileName: o,
                    }),
                    c = A(l, o),
                    d = L(l);
                  t.set(u, {
                    content: a,
                    id: u,
                    label: c,
                    mimeType: s,
                    sourceMessageId: n,
                    type: "document",
                    url: d,
                  });
                }
              return (
                console.info(
                  "[AI Saver][perplexity] Parsed assets for entry.",
                  {
                    assetSourceCounts: r,
                    entryId: e.uuid,
                    parsedArtifacts: t.size,
                  },
                ),
                Array.from(t.values())
              );
            },
            O = async (e) => {
              let t = [];
              for (; t.length < e || e >= 1e5;) {
                let n = e >= 1e5 ? 100 : Math.min(20, e - t.length);
                if (n <= 0) break;
                let r = {
                    ascending: !1,
                    limit: n,
                    offset: t.length,
                    search_term: "",
                  },
                  a = `/thread/list_ask_threads?version=${o}&source=default`,
                  l = await u(a, {
                    body: JSON.stringify(r),
                    extraHeaders: {
                      "x-perplexity-request-endpoint": `${i}${a}`,
                      "x-perplexity-request-try-number": "1",
                    },
                    method: "POST",
                  }),
                  s = Array.isArray(l) ? l : [];
                if ((t.push(...s.map((e) => f(e))), s.length < n)) break;
              }
              return t;
            },
            z = async (e, t = {}) => {
              let n = Math.max(1, e),
                r = t.perplexitySelectedSpaceSlugs ?? [];
              if (
                "spaces" === t.perplexityContentMode &&
                Array.isArray(r) &&
                r.length > 0
              ) {
                let e = new Map();
                for (let t of r) {
                  let r = await $(t, n);
                  for (let t of r) e.has(t.id) || e.set(t.id, t);
                }
                return Array.from(e.values())
                  .sort((e, t) => {
                    let n = e.updatedAt ? new Date(e.updatedAt).getTime() : 0,
                      r = t.updatedAt ? new Date(t.updatedAt).getTime() : 0;
                    return r - n;
                  })
                  .slice(0, n);
              }
              return await O(n);
            },
            j = async () => {
              let e = [],
                t = 0;
              for (
                console.info(
                  "[AI Saver][perplexity] Loading spaces from Perplexity collections API.",
                );
                ;
              ) {
                let n = `/collections/list_user_collections?limit=100&offset=${t}&version=${o}&source=default`,
                  r = `${i}${n}`,
                  a = await u(n, {
                    extraHeaders: {
                      "x-perplexity-request-endpoint": r,
                      "x-perplexity-request-reason": "sidebar-v2",
                      "x-perplexity-request-try-number": "1",
                    },
                    method: "GET",
                  }),
                  l = Array.isArray(a) ? a : [];
                if (
                  (console.info("[AI Saver][perplexity] Spaces page loaded.", {
                    count: l.length,
                    offset: t,
                  }),
                  !l.length)
                )
                  break;
                (e.push(...l), (t += 100));
              }
              let n = e.map((e) => E(e)).filter((e) => !!e);
              return (
                console.info(
                  "[AI Saver][perplexity] Spaces loading completed.",
                  { normalizedCount: n.length, rawCount: e.length },
                ),
                n
              );
            },
            $ = async (e, t) => {
              let n = [];
              for (; n.length < t || t >= 1e5;) {
                let r = t >= 1e5 ? 100 : Math.min(20, t - n.length);
                if (r <= 0) break;
                let a = `/collections/list_collection_threads?collection_slug=${encodeURIComponent(e)}&limit=${r}&filter_by_user=true&filter_by_shared_threads=false&offset=${n.length}&version=${o}&source=default`,
                  l = `${i}${a}`,
                  s = await u(a, {
                    extraHeaders: {
                      "x-perplexity-request-endpoint": l,
                      "x-perplexity-request-reason": "space-tabs",
                      "x-perplexity-request-try-number": "1",
                    },
                    method: "GET",
                  }),
                  c = Array.isArray(s) ? s : [];
                if ((n.push(...c.map((e) => f(e))), c.length < r)) break;
              }
              return n;
            },
            U = async (e) => {
              if (!e) return null;
              let t = [],
                n = new Set(),
                r = new Set(),
                a = null,
                c = !0,
                f = null;
              for (;;) {
                let l = new URLSearchParams({
                  from_first: "true",
                  offset: "0",
                  source: "default",
                  version: o,
                  with_parent_info: "true",
                  with_schematized_response: "true",
                });
                for (let e of s) l.append("supported_block_use_cases", e);
                (l.append("limit", c ? "10" : "100"),
                  a && l.append("cursor", a));
                let d = `/thread/${e}?${l.toString()}`,
                  p = `${i}${d}`,
                  m = await u(d, {
                    extraHeaders: {
                      ...(c
                        ? {}
                        : {
                            "x-perplexity-url-template":
                              "/rest/thread/{entry_uuid_or_slug}",
                          }),
                      "x-perplexity-request-endpoint": p,
                      "x-perplexity-request-reason": "search-components",
                      "x-perplexity-request-try-number": "1",
                    },
                    method: "GET",
                  });
                if (m?.status !== "success")
                  throw Error(
                    `Perplexity detail request returned status: ${m?.status ?? "unknown"}`,
                  );
                !f && m?.collection_info && (f = m.collection_info);
                let h = Array.isArray(m?.entries) ? m.entries : [];
                for (let e of h)
                  e.uuid && !n.has(e.uuid) && (t.push(e), n.add(e.uuid));
                let g = m?.next_cursor;
                if (!g) break;
                let y = "string" == typeof g ? g : JSON.stringify(g);
                if (r.has(y)) {
                  console.warn(
                    "[Perplexity Adapter] Repeated cursor detected; stopping pagination.",
                    { threadId: e },
                  );
                  break;
                }
                (r.add(y), (a = y), (c = !1));
              }
              let m = [],
                h = new Map(),
                g = new Map();
              for (let e of t) {
                let t = _(e),
                  n = M(e);
                for (let e of t)
                  h.set(
                    b({ fileName: e.attachment.name, url: e.attachment.url }),
                    e.attachment,
                  );
                for (let e of n) g.set(e.id, e);
                e.query_str?.trim() &&
                  m.push({
                    content: e.query_str.trim(),
                    createdAt: e.created_datetime || null,
                    id: `${e.uuid}-question`,
                    media: t.map((e) => e.media),
                    role: "user",
                  });
                let r = P(e);
                r && m.push(r);
              }
              let y = d({ detail: { entries: t }, fallbackThreadId: e }),
                v =
                  t.find(
                    (e) =>
                      e.display_model?.trim() ||
                      e.user_selected_model?.trim() ||
                      e.mode?.trim() ||
                      e.search_focus?.trim(),
                  ) ?? t[0],
                w =
                  "string" == typeof f?.title && f.title.trim()
                    ? f.title.trim()
                    : (v?.collection_info?.title?.trim() ?? null),
                S =
                  "string" == typeof f?.slug && f.slug.trim()
                    ? f.slug.trim()
                    : (v?.collection_info?.slug?.trim() ?? null),
                k =
                  v?.display_model?.trim() ||
                  v?.user_selected_model?.trim() ||
                  null,
                x = v?.mode?.trim() || null,
                C = v?.search_focus?.trim() || null,
                E =
                  "undefined" != typeof window &&
                  (0, l.extractPerplexityThreadId)(window.location.href) === e
                    ? window.location.href
                    : `https://www.perplexity.ai/search/${e}`,
                I = p(C);
              return (
                console.info(
                  "[AI Saver][perplexity] Built conversation detail.",
                  {
                    artifactCount: g.size,
                    attachmentCount: h.size,
                    messageCount: m.length,
                    threadId: e,
                    title: y,
                  },
                ),
                {
                  artifacts: Array.from(g.values()),
                  attachments: Array.from(h.values()),
                  messages: m,
                  metadata: {
                    collectionTitle: w,
                    entryCount: t.length,
                    model: k,
                    mode: x,
                    searchFocus: C,
                    source: "perplexity-api",
                    space: w,
                    spaceSlug: S,
                    uuid: e,
                  },
                  summary: {
                    createdAt: t[0]?.created_datetime || null,
                    id: e,
                    isSelected: !1,
                    platform: "perplexity",
                    tags: I,
                    title: y,
                    updatedAt:
                      t.findLast((e) => e.updated_datetime)?.updated_datetime ||
                      t[0]?.updated_datetime ||
                      null,
                    url: E,
                  },
                }
              );
            },
            D = async (e) => {
              let t = await z(20),
                n = (0, l.extractPerplexityThreadId)(e),
                r = null;
              if (n)
                try {
                  (r = await U(n)) &&
                    (r = { ...r, summary: { ...r.summary, url: e } });
                } catch (t) {
                  console.warn(
                    "[Perplexity Adapter] Failed to load current conversation detail.",
                    {
                      error: t instanceof Error ? t.message : String(t),
                      pageUrl: e,
                      threadId: n,
                    },
                  );
                }
              return {
                bulk: {
                  availableCount: null,
                  firstPageCount: t.length,
                  hasMore: 20 === t.length,
                },
                capabilities: a.platformRegistry.perplexity.capabilities,
                currentConversation: r,
                metadata: {
                  currentThreadId: n,
                  platformStatus: "connected",
                  recentConversationCount: t.length,
                },
                recentConversations: t,
              };
            };
        },
        {
          "~platforms/registry": "bmsSX",
          "./url": "7yY77",
          "@parcel/transformer-js/src/esmodule-helpers.js": "cHUbl",
        },
      ],
    },
    ["54Vnj"],
    "54Vnj",
    "parcelRequire987e",
  ),
  (globalThis.define = t));
