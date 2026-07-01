var e, t;
("function" == typeof (e = globalThis.define) && ((t = e), (e = null)),
  (function (t, n, r, o, i) {
    var a =
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
              ? window
              : "undefined" != typeof global
                ? global
                : {},
      s = "function" == typeof a[o] && a[o],
      l = s.cache || {},
      u =
        "undefined" != typeof module &&
        "function" == typeof module.require &&
        module.require.bind(module);
    function c(e, n) {
      if (!l[e]) {
        if (!t[e]) {
          var r = "function" == typeof a[o] && a[o];
          if (!n && r) return r(e, !0);
          if (s) return s(e, !0);
          if (u && "string" == typeof e) return u(e);
          var i = Error("Cannot find module '" + e + "'");
          throw ((i.code = "MODULE_NOT_FOUND"), i);
        }
        ((d.resolve = function (n) {
          var r = t[e][1][n];
          return null != r ? r : n;
        }),
          (d.cache = {}));
        var f = (l[e] = new c.Module(e));
        t[e][0].call(f.exports, d, f, f.exports, this);
      }
      return l[e].exports;
      function d(e) {
        var t = d.resolve(e);
        return !1 === t ? {} : c(t);
      }
    }
    ((c.isParcelRequire = !0),
      (c.Module = function (e) {
        ((this.id = e), (this.bundle = c), (this.exports = {}));
      }),
      (c.modules = t),
      (c.cache = l),
      (c.parent = s),
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
          return a[o];
        },
      }),
      (a[o] = c));
    for (var f = 0; f < n.length; f++) c(n[f]);
    if (r) {
      var d = c(r);
      "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = d)
        : "function" == typeof e && e.amd
          ? e(function () {
              return d;
            })
          : i && (this[i] = d);
    }
  })(
    {
      "51xDu": [
        function (e, t, n) {
          var r = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (r.defineInteropFlag(n), r.export(n, "config", () => l));
          let o = "aisaver_access_token",
            i = "aisaver_refresh_token",
            a = "aisaver_access_expires_at",
            s = "aisaver_user",
            l = {
              matches: [
                "https://chatgpt2notion.com/*",
                "https://*.chatgpt2notion.com/*",
                "https://www.chatgpt2notion.com/*",
              ],
              run_at: "document_idle",
            },
            u = "",
            c = () => {
              try {
                return JSON.parse(localStorage.getItem(s) || "null");
              } catch {
                return null;
              }
            },
            f = ({
              accessToken: e,
              expiresIn: t,
              refreshToken: n,
              user: r,
            }) => {
              (localStorage.setItem(o, e),
                localStorage.setItem(i, n),
                localStorage.setItem(
                  a,
                  String(Date.now() + 1e3 * Math.max(Number(t) - 60, 60)),
                ),
                r && localStorage.setItem(s, JSON.stringify(r)));
            },
            d = async (e) => {
              let t = await fetch(
                  "https://api.chatgpt2notion.com/v1/auth/refresh",
                  {
                    body: JSON.stringify({
                      clientType: "website",
                      refreshToken: e,
                    }),
                    headers: { "content-type": "application/json" },
                    method: "POST",
                  },
                ),
                n = await t.json().catch(() => null);
              if (!t.ok || !n?.accessToken || !n?.refreshToken) return null;
              let r = {
                accessToken: n.accessToken,
                expiresIn: Number(n.expiresIn || 1800),
                refreshToken: n.refreshToken,
                user: n.user ?? c(),
              };
              return (f(r), r);
            },
            p = async () => {
              let e = localStorage.getItem(i);
              if (!e) return null;
              let t = localStorage.getItem(o),
                n = Number(localStorage.getItem(a) || "0");
              return t && n > Date.now() + 6e4
                ? {
                    accessToken: t,
                    expiresIn: Math.max(Math.floor((n - Date.now()) / 1e3), 60),
                    refreshToken: e,
                    user: c(),
                  }
                : await d(e);
            },
            h = async () => {
              let e = await p().catch(() => null);
              if (!e) return;
              let t = `${e.accessToken}:${e.refreshToken}`;
              t !== u &&
                (await chrome.runtime.sendMessage({
                  action: "AI_SAVER_AUTH_COMPLETE",
                  accessToken: e.accessToken,
                  expiresIn: e.expiresIn,
                  refreshToken: e.refreshToken,
                  user: e.user ?? null,
                }),
                (u = t));
            };
          for (let e of [0, 300, 1e3, 2500])
            window.setTimeout(() => {
              h();
            }, e);
          (window.addEventListener("focus", () => {
            h();
          }),
            document.addEventListener("visibilitychange", () => {
              "visible" === document.visibilityState && h();
            }));
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
    },
    ["51xDu"],
    "51xDu",
    "parcelRequire987e",
  ),
  (globalThis.define = t));
