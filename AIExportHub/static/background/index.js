var e, t;
("function" == typeof (e = globalThis.define) && ((t = e), (e = null)),
  (function (t, r, n, a, o) {
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
      s = "function" == typeof i[a] && i[a],
      l = s.cache || {},
      c =
        "undefined" != typeof module &&
        "function" == typeof module.require &&
        module.require.bind(module);
    function u(e, r) {
      if (!l[e]) {
        if (!t[e]) {
          var n = "function" == typeof i[a] && i[a];
          if (!r && n) return n(e, !0);
          if (s) return s(e, !0);
          if (c && "string" == typeof e) return c(e);
          var o = Error("Cannot find module '" + e + "'");
          throw ((o.code = "MODULE_NOT_FOUND"), o);
        }
        ((d.resolve = function (r) {
          var n = t[e][1][r];
          return null != n ? n : r;
        }),
          (d.cache = {}));
        var p = (l[e] = new u.Module(e));
        t[e][0].call(p.exports, d, p, p.exports, this);
      }
      return l[e].exports;
      function d(e) {
        var t = d.resolve(e);
        return !1 === t ? {} : u(t);
      }
    }
    ((u.isParcelRequire = !0),
      (u.Module = function (e) {
        ((this.id = e), (this.bundle = u), (this.exports = {}));
      }),
      (u.modules = t),
      (u.cache = l),
      (u.parent = s),
      (u.register = function (e, r) {
        t[e] = [
          function (e, t) {
            t.exports = r;
          },
          {},
        ];
      }),
      Object.defineProperty(u, "root", {
        get: function () {
          return i[a];
        },
      }),
      (i[a] = u));
    for (var p = 0; p < r.length; p++) u(r[p]);
    if (n) {
      var d = u(n);
      "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = d)
        : "function" == typeof e && e.amd
          ? e(function () {
              return d;
            })
          : o && (this[o] = d);
    }
  })(
    {
      kgW6q: [
        function (e, t, r) {
          e("../../../src/background");
        },
        { "../../../src/background": "fx8Od" },
      ],
      fx8Od: [
        function (e, t, r) {
          var n = e("~background/chatgpt-library"),
            a = e("~background/export-jobs"),
            o = e("~background/notion"),
            i = e("~lib/aisaver-account-api");
          let s = "AI_SAVER_AUTH_COMPLETE",
            l = "https://chatgpt2notion.com/products/aiexporthub-hero/",
            c = "ai-saver:extension-update-landing-opened-at",
            u = {
              chatgpt: "https://chatgpt2notion.com/chatgpt/",
              claude: "https://chatgpt2notion.com/claude/",
              gemini: "https://chatgpt2notion.com/gemini/",
              perplexity: "https://chatgpt2notion.com/perplexity/",
            },
            p = {
              chatgpt: ["chatgpt.com", "chat.openai.com"],
              claude: ["claude.ai"],
              gemini: ["gemini.google.com"],
              perplexity: ["perplexity.ai"],
            },
            d = (e) =>
              "chatgpt" === e ||
              "claude" === e ||
              "gemini" === e ||
              "perplexity" === e,
            f = (e) =>
              !!(
                e &&
                "object" == typeof e &&
                "string" == typeof e.email &&
                "string" == typeof e.id
              ),
            h = (e) => {
              try {
                let t = new URL(e).hostname.toLowerCase();
                return (
                  "chatgpt2notion.com" === t ||
                  t.endsWith(".chatgpt2notion.com")
                );
              } catch {
                return !1;
              }
            },
            m = async (e) => {
              await (0, i.saveAiSaverAuthFromWebsite)({
                accessToken: String(e.accessToken ?? ""),
                expiresIn: Number(e.expiresIn ?? 1800),
                refreshToken: String(e.refreshToken ?? ""),
                user: f(e.user) ? e.user : null,
              });
            },
            g = () => {
              let e = chrome.runtime.getManifest();
              return e.host_permissions ?? [];
            },
            b = () => {
              let e = g(),
                t = Object.keys(p).filter((t) =>
                  p[t].some((t) => e.some((e) => e.includes(t))),
                );
              return 1 !== t.length ? l : u[t[0]];
            },
            x = async (e) => {
              await chrome.tabs.create({ active: !0, url: e });
            },
            y = async (e) => {
              if ("install" === e.reason) {
                await x(l);
                return;
              }
              if ("update" !== e.reason) return;
              let t = chrome.runtime.getManifest().version;
              if (!e.previousVersion || e.previousVersion === t) return;
              let r = Date.now(),
                n = await chrome.storage.local.get(c),
                a = Number(n[c] ?? 0);
              (Number.isFinite(a) && r - a < 1296e6) ||
                (await x(b()), await chrome.storage.local.set({ [c]: r }));
            };
          (chrome.runtime.onInstalled.addListener((e) => {
            y(e).catch((t) => {
              console.warn(
                "[AI Saver][background] Failed to open lifecycle page",
                {
                  error: t instanceof Error ? t.message : String(t),
                  reason: e.reason,
                },
              );
            });
          }),
            (0, a.recoverInterruptedExportJob)().catch((e) => {
              console.warn(
                "[AI Saver][background] Failed to recover interrupted export job",
                { error: e instanceof Error ? e.message : String(e) },
              );
            }));
          let v = async (e) => {
            let t = await chrome.tabs.query({
                url: "https://gemini.google.com/*",
              }),
              r = "string" == typeof e ? e : "";
            return [...t].sort((e, t) => {
              let n = e.url === r ? 4 : e.active ? 3 : e.highlighted ? 2 : 1,
                a = t.url === r ? 4 : t.active ? 3 : t.highlighted ? 2 : 1;
              return a - n;
            });
          };
          async function k(e, t) {
            let r = await v(t),
              n = "";
            for (let t of r)
              if (t.id)
                try {
                  let r = await chrome.tabs.sendMessage(t.id, e);
                  if (r?.success) return r;
                  n =
                    "string" == typeof r?.error && r.error.trim()
                      ? r.error
                      : "The Gemini content script responded without a success status.";
                } catch (e) {
                  n =
                    e instanceof Error
                      ? e.message
                      : "Failed to reach the Gemini tab.";
                }
            throw Error(n || "No connectable Gemini tab was found.");
          }
          (chrome.runtime.onMessage.addListener((e, t, r) => {
            if (e?.action === s)
              return (
                m(e)
                  .then(() => {
                    r({ success: !0 });
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "AIExportHub authentication could not be saved.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_RUN_EXPORT")
              return (
                (0, a.queueExportJob)(e.payload)
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "The export job failed unexpectedly.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_PREPARE_CUSTOM_PREVIEW")
              return (
                (0, a.prepareCustomExportPreview)(e.payload)
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "The custom export preview could not be prepared.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_RUN_CHATGPT_LIBRARY_DOWNLOAD")
              return (
                (0, n.runChatGptLibraryDownload)(e.payload)
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "ChatGPT Library download failed unexpectedly.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_CANCEL_CHATGPT_LIBRARY_DOWNLOAD")
              return (r((0, n.cancelChatGptLibraryDownload)()), !1);
            if (e?.action === "AI_EXPORTER_HUB_CLEAR_EXPORT_JOB")
              return (
                (0, a.dismissFinishedExportJob)().then(() => {
                  r({ success: !0 });
                }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_CANCEL_EXPORT_JOB")
              return (
                (0, a.cancelQueuedOrRunningExportJob)()
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "The export job could not be cancelled.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_RETRY_FAILED_EXPORTS")
              return (
                (0, a.retryFailedExportJob)()
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "Failed items could not be retried.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_RECOVER_EXPORT_JOB")
              return (
                (0, a.recoverInterruptedExportJob)({ force: !!e.force })
                  .then(() => {
                    r({ success: !0 });
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "The export job state could not be recovered.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_GET_NOTION_STATE")
              return (
                (0, o.getNotionConnectionState)().then((e) => {
                  r(e);
                }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_START_NOTION_AUTH")
              return (
                (0, o.startNotionAuthorization)().then((e) => {
                  r(e);
                }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_SAVE_NOTION_CONFIG")
              return (
                (0, o.saveNotionConnection)(e.payload).then((e) => {
                  r(e);
                }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_REFRESH_NOTION_DATABASES")
              return (
                (0, o.refreshNotionDatabases)().then((e) => {
                  r(e);
                }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_SELECT_NOTION_DATABASE")
              return (
                (0, o.selectNotionDatabase)(e.payload.databaseId).then((e) => {
                  r(e);
                }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_DISCONNECT_NOTION")
              return (
                (0, o.disconnectNotion)().then((e) => {
                  r(e);
                }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_GEMINI_SEND_TAB_MESSAGE")
              return (
                k(e.message, e.pageUrl)
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({
                      error:
                        e instanceof Error
                          ? e.message
                          : "Gemini background message forwarding failed.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_GET_AISAVER_ACCOUNT")
              return (
                (0, i.getAiSaverAccountSnapshot)()
                  .then((e) => {
                    r({ ...e, success: !0 });
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "AIExportHub account state could not be loaded.",
                      success: !1,
                    });
                  }),
                !0
              );
            if (e?.action === "AI_EXPORTER_HUB_GET_BULK_EXPORT_ENTITLEMENT") {
              let t = d(e.payload?.platform) ? e.payload.platform : "chatgpt";
              return (
                (0, i.getBulkExportEntitlement)(t)
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({
                      canBulkExport: !1,
                      message:
                        e instanceof Error
                          ? e.message
                          : "Bulk export access could not be checked.",
                      success: !1,
                    });
                  }),
                !0
              );
            }
            if (e?.action === "AI_EXPORTER_HUB_DISCONNECT_AISAVER_ACCOUNT")
              return (
                (0, i.disconnectAiSaverAccount)()
                  .then(() => {
                    r({ success: !0 });
                  })
                  .catch((e) => {
                    r({
                      message:
                        e instanceof Error
                          ? e.message
                          : "AIExportHub account could not be disconnected.",
                      success: !1,
                    });
                  }),
                !0
              );
          }),
            chrome.runtime.onMessageExternal.addListener((e, t, r) => {
              let n = t.url ?? t.origin ?? "";
              if (!h(n)) {
                r({ message: "External sender is not allowed.", success: !1 });
                return;
              }
              if (e?.action === s)
                return (
                  m(e)
                    .then(() => {
                      r({ success: !0 });
                    })
                    .catch((e) => {
                      r({
                        message:
                          e instanceof Error
                            ? e.message
                            : "AIExportHub authentication could not be saved.",
                        success: !1,
                      });
                    }),
                  !0
                );
            }));
        },
        {
          "~background/chatgpt-library": "fpm2R",
          "~background/export-jobs": "bakw5",
          "~background/notion": "6vXVe",
          "~lib/aisaver-account-api": "bZjEH",
        },
      ],
      fpm2R: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "runChatGptLibraryDownload", () => z),
            n.export(r, "cancelChatGptLibraryDownload", () => q));
          var a = e("~background/chatgpt-library-index"),
            o = e("~core/storage/chatgpt-library"),
            i = e("~lib/export-directories"),
            s = e("~lib/platform-tabs");
          let l = new Set(),
            c = new Set(),
            u = new TextEncoder(),
            p = (e) => {
              let t = e
                .replace(
                  /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202f\ufeff]/g,
                  "",
                )
                .replace(/[<>:"/\\|?*]/g, " ")
                .replace(/\s+/g, " ")
                .trim();
              return t.slice(0, 180) || "chatgpt-library-file";
            },
            d = (e, t) => {
              if (!t.has(e)) return (t.add(e), e);
              let r = e.lastIndexOf("."),
                n = r > 0 ? e.slice(0, r) : e,
                a = r > 0 ? e.slice(r) : "";
              for (let e = 2; e < 1e4; e += 1) {
                let r = `${n} (${e})${a}`;
                if (!t.has(r)) return (t.add(r), r);
              }
              let o = `${n}-${crypto.randomUUID()}${a}`;
              return (t.add(o), o);
            },
            f = async ({ filename: e, url: t }) =>
              await new Promise((r, n) => {
                chrome.downloads.download(
                  {
                    conflictAction: "uniquify",
                    filename: e,
                    saveAs: !1,
                    url: t,
                  },
                  (e) => {
                    if (chrome.runtime.lastError || "number" != typeof e) {
                      n(
                        Error(
                          chrome.runtime.lastError?.message ||
                            "Download could not be created.",
                        ),
                      );
                      return;
                    }
                    r(e);
                  },
                );
              }),
            h = (e) => {
              let t = "",
                r = new Uint8Array(e);
              for (let e = 0; e < r.length; e += 32768) {
                let n = r.subarray(e, e + 32768);
                t += String.fromCharCode(...n);
              }
              return btoa(t);
            },
            m = (e, t) => `data:${t};base64,${h(e.buffer)}`,
            g = (e, t) => `data:${t};charset=utf-8,${encodeURIComponent(e)}`,
            b = (e) => {
              let t = e.indexOf(",");
              if (t < 0)
                throw Error("Downloaded file data is not a valid data URL.");
              let r = e.slice(0, t),
                n = e.slice(t + 1);
              if (r.includes(";base64")) {
                let e = atob(n),
                  t = new Uint8Array(e.length);
                for (let r = 0; r < e.length; r += 1) t[r] = e.charCodeAt(r);
                return t;
              }
              return u.encode(decodeURIComponent(n));
            },
            x = (() => {
              let e = new Uint32Array(256);
              for (let t = 0; t < 256; t += 1) {
                let r = t;
                for (let e = 0; e < 8; e += 1)
                  r = 1 & r ? 3988292384 ^ (r >>> 1) : r >>> 1;
                e[t] = r >>> 0;
              }
              return e;
            })(),
            y = (e) => {
              let t = 4294967295;
              for (let r of e) t = x[(t ^ r) & 255] ^ (t >>> 8);
              return (4294967295 ^ t) >>> 0;
            },
            v = (e, t, r) => {
              ((e[t] = 255 & r), (e[t + 1] = (r >>> 8) & 255));
            },
            k = (e, t, r) => {
              ((e[t] = 255 & r),
                (e[t + 1] = (r >>> 8) & 255),
                (e[t + 2] = (r >>> 16) & 255),
                (e[t + 3] = (r >>> 24) & 255));
            },
            w = (e = new Date()) => {
              let t = Math.max(1980, e.getFullYear()),
                r =
                  (e.getHours() << 11) |
                  (e.getMinutes() << 5) |
                  (e.getSeconds() >> 1),
                n = ((t - 1980) << 9) | ((e.getMonth() + 1) << 5) | e.getDate();
              return { dosDate: n, dosTime: r };
            },
            _ = (e) => {
              let t = [],
                r = [],
                n = 0,
                { dosDate: a, dosTime: o } = w();
              for (let i of e) {
                let e = u.encode(i.name),
                  s = y(i.bytes),
                  l = new Uint8Array(30 + e.length);
                (k(l, 0, 67324752),
                  v(l, 4, 20),
                  v(l, 6, 0),
                  v(l, 8, 0),
                  v(l, 10, o),
                  v(l, 12, a),
                  k(l, 14, s),
                  k(l, 18, i.bytes.length),
                  k(l, 22, i.bytes.length),
                  v(l, 26, e.length),
                  v(l, 28, 0),
                  l.set(e, 30),
                  t.push(l, i.bytes));
                let c = new Uint8Array(46 + e.length);
                (k(c, 0, 33639248),
                  v(c, 4, 20),
                  v(c, 6, 20),
                  v(c, 8, 0),
                  v(c, 10, 0),
                  v(c, 12, o),
                  v(c, 14, a),
                  k(c, 16, s),
                  k(c, 20, i.bytes.length),
                  k(c, 24, i.bytes.length),
                  v(c, 28, e.length),
                  v(c, 30, 0),
                  v(c, 32, 0),
                  v(c, 34, 0),
                  v(c, 36, 0),
                  k(c, 38, 0),
                  k(c, 42, n),
                  c.set(e, 46),
                  r.push(c),
                  (n += l.length + i.bytes.length));
              }
              let i = r.reduce((e, t) => e + t.length, 0),
                s = new Uint8Array(22);
              (k(s, 0, 101010256),
                v(s, 4, 0),
                v(s, 6, 0),
                v(s, 8, e.length),
                v(s, 10, e.length),
                k(s, 12, i),
                k(s, 16, n),
                v(s, 20, 0));
              let l = n + i + s.length,
                c = new Uint8Array(l),
                p = 0;
              for (let e of [...t, ...r, s]) (c.set(e, p), (p += e.length));
              return m(c, "application/zip");
            },
            A = ({ exportedAt: e, files: t, mode: r }) => {
              let n = [];
              return (
                t.length &&
                  ((0, a.shouldGenerateMarkdownIndex)(r) &&
                    n.push({
                      content: (0, a.buildChatGptLibraryMarkdownIndex)({
                        exportedAt: e,
                        files: t,
                      }),
                      mimeType: "text/markdown",
                      name: a.CHATGPT_LIBRARY_INDEX_MARKDOWN_NAME,
                    }),
                  (0, a.shouldGenerateHtmlIndex)(r) &&
                    n.push({
                      content: (0, a.buildChatGptLibraryHtmlIndex)({
                        exportedAt: e,
                        files: t,
                      }),
                      mimeType: "text/html",
                      name: a.CHATGPT_LIBRARY_INDEX_HTML_NAME,
                    })),
                n
              );
            },
            C = async ({ exportedAt: e, files: t, folder: r, mode: n }) => {
              let a = A({ exportedAt: e, files: t, mode: n });
              for (let e of a)
                await f({
                  filename: `${r}/${e.name}`,
                  url: g(e.content, e.mimeType),
                });
              return a.length;
            },
            E = (e) =>
              e > 0 ? ` and ${e} index file${1 === e ? "" : "s"}` : "",
            j = (e) => ("image" === e.category ? "images" : "files"),
            I = ({ fileName: e, item: t, usedNamesByDirectory: r }) => {
              let n = j(t),
                a = r.get(n) ?? new Set();
              return (r.set(n, a), `${n}/${d(e, a)}`);
            },
            S = (e) => {
              if (c.has(e)) throw Error("ChatGPT Library download cancelled.");
            },
            D = (e) => {
              try {
                chrome.runtime.sendMessage(
                  {
                    action: "AI_EXPORTER_HUB_CHATGPT_LIBRARY_DOWNLOAD_PROGRESS",
                    payload: e,
                  },
                  () => void chrome.runtime.lastError,
                );
              } catch {}
            },
            F = async (e) => {
              let t = 1e3 + Math.floor(1e3 * Math.random());
              (await new Promise((e) => setTimeout(e, t)), S(e));
            },
            T = async () =>
              await new Promise((e) => {
                chrome.storage.local.get(
                  o.DOWNLOADED_LIBRARY_FILE_IDS_KEY,
                  (t) => {
                    e(
                      (0, o.createDownloadedLibraryFileIdSet)(
                        t[o.DOWNLOADED_LIBRARY_FILE_IDS_KEY],
                      ),
                    );
                  },
                );
              }),
            R = async (e) =>
              await new Promise((t) => {
                chrome.storage.local.set(
                  { [o.DOWNLOADED_LIBRARY_FILE_IDS_KEY]: Array.from(e) },
                  () => t(),
                );
              }),
            P = async (e, t) => {
              for (let r of t) e.add(r.fileId);
              await R(e);
            },
            L = (e) => ({
              completedDocuments: 0,
              completedImages: 0,
              completedItems: 0,
              failedItems: 0,
              skippedItems: 0,
              totalItems: e,
            }),
            O = (e, t) => {
              ((e.completedItems += 1),
                "image" === t.category
                  ? (e.completedImages += 1)
                  : (e.completedDocuments += 1));
            },
            N = async (e) => {
              let t = await (0, s.findConnectablePlatformTab)({
                  preferredPlatformId: "chatgpt",
                  preferredTabId: e,
                  timeoutMs: 3e3,
                }),
                r = t.connected?.tab;
              if (!r?.id)
                throw Error(
                  t.lastError
                    ? `No connectable ChatGPT tab was found. ${t.lastError}`
                    : "Open a ChatGPT tab before downloading Library files.",
                );
              return r;
            },
            M = async ({ item: e, tabId: t }) => {
              let r = await chrome.tabs.sendMessage(t, {
                action: "AI_EXPORTER_HUB_GET_CHATGPT_LIBRARY_DOWNLOAD_URL",
                fileId: e.fileId,
                originationThreadId: e.originationThreadId,
              });
              if (!r?.ok || !r.downloadUrl)
                throw Error(
                  r?.error ||
                    `Download URL could not be resolved for ${e.fileName}.`,
                );
              return r;
            },
            B = async ({ item: e, tabId: t }) => {
              let r = await M({ item: e, tabId: t }),
                n = await chrome.tabs.sendMessage(t, {
                  action: "AI_EXPORTER_HUB_DOWNLOAD_AUTHENTICATED_FILE",
                  url: r.downloadUrl,
                });
              if (!n?.ok || !n.dataUrl)
                throw Error(
                  n?.error ||
                    `File data could not be downloaded for ${e.fileName}.`,
                );
              return {
                dataUrl: n.dataUrl,
                fileName: p(r.fileName || e.fileName),
                mimeType: n.mimeType || r.mimeType || e.mimeType,
              };
            },
            z = async (e) => {
              let t = e.jobId || crypto.randomUUID(),
                r = (0, i.sanitizeRelativeDirectoryForDownload)(
                  e.directory,
                  "AI-Exporter-Hub/chatgpt-library",
                ),
                n = e.indexMode ?? "markdown-html",
                a = new Date(),
                o = await N(e.sourceTabId),
                s = o.id,
                p = L(e.items.length);
              if (!e.items.length)
                return {
                  message:
                    "Select at least one Library item before downloading.",
                  success: !1,
                };
              l.add(t);
              try {
                let o = e.skipDownloaded ? await T() : new Set();
                if (
                  (D({
                    completedItems: p.completedItems,
                    currentIndex: 0,
                    failedItems: p.failedItems,
                    jobId: t,
                    phase: "preparing",
                    skippedItems: p.skippedItems,
                    totalItems: p.totalItems,
                  }),
                  "zip" === e.mode)
                ) {
                  let i = [],
                    l = new Map();
                  for (let [r, n] of e.items.entries()) {
                    S(t);
                    let a = r + 1;
                    if (e.skipDownloaded && o.has(n.fileId)) {
                      ((p.skippedItems += 1),
                        D({
                          completedItems: p.completedItems,
                          currentFileName: n.fileName,
                          currentIndex: a,
                          failedItems: p.failedItems,
                          jobId: t,
                          phase: "skipping",
                          skippedItems: p.skippedItems,
                          totalItems: p.totalItems,
                        }));
                      continue;
                    }
                    (D({
                      completedItems: p.completedItems,
                      currentFileName: n.fileName,
                      currentIndex: a,
                      failedItems: p.failedItems,
                      jobId: t,
                      phase: "waiting",
                      skippedItems: p.skippedItems,
                      totalItems: p.totalItems,
                    }),
                      await F(t));
                    try {
                      D({
                        completedItems: p.completedItems,
                        currentFileName: n.fileName,
                        currentIndex: a,
                        failedItems: p.failedItems,
                        jobId: t,
                        phase: "downloading",
                        skippedItems: p.skippedItems,
                        totalItems: p.totalItems,
                      });
                      let e = await B({ item: n, tabId: s });
                      S(t);
                      let r = I({
                        fileName: e.fileName,
                        item: n,
                        usedNamesByDirectory: l,
                      });
                      (i.push({ bytes: b(e.dataUrl), item: n, name: r }),
                        O(p, n),
                        D({
                          completedItems: p.completedItems,
                          currentFileName: n.fileName,
                          currentIndex: a,
                          failedItems: p.failedItems,
                          jobId: t,
                          phase: "downloading",
                          skippedItems: p.skippedItems,
                          totalItems: p.totalItems,
                        }));
                    } catch (e) {
                      (console.warn("[AI Saver][library] ZIP item failed.", {
                        error: e instanceof Error ? e.message : String(e),
                        fileId: n.fileId,
                        fileName: n.fileName,
                      }),
                        (p.failedItems += 1),
                        D({
                          completedItems: p.completedItems,
                          currentFileName: n.fileName,
                          currentIndex: a,
                          failedItems: p.failedItems,
                          jobId: t,
                          phase: "failed",
                          skippedItems: p.skippedItems,
                          totalItems: p.totalItems,
                        }));
                    }
                  }
                  if ((S(t), !i.length)) {
                    let e = p.skippedItems > 0 && 0 === p.failedItems;
                    return {
                      completedCount: p.completedItems,
                      failedCount: p.failedItems,
                      message: e
                        ? `Skipped ${p.skippedItems} previously downloaded Library files. Nothing new downloaded.`
                        : "No Library files could be added to the ZIP archive.",
                      summary: p,
                      success: e,
                    };
                  }
                  D({
                    completedItems: p.completedItems,
                    currentIndex: p.totalItems,
                    failedItems: p.failedItems,
                    jobId: t,
                    phase: "packaging",
                    skippedItems: p.skippedItems,
                    totalItems: p.totalItems,
                  });
                  let c = `chatgpt-library-${new Date().toISOString().slice(0, 10)}.zip`,
                    d = `${r}/${c}`,
                    h = i.map(({ item: e, name: t }) => ({
                      fileName: t,
                      item: e,
                    })),
                    m = A({ exportedAt: a, files: h, mode: n }),
                    g = i.map(({ bytes: e, name: t }) => ({
                      bytes: e,
                      name: t,
                    }));
                  for (let e of m)
                    g.push({ bytes: u.encode(e.content), name: e.name });
                  return (
                    D({
                      completedItems: p.completedItems,
                      currentIndex: p.totalItems,
                      failedItems: p.failedItems,
                      jobId: t,
                      phase: "saving",
                      skippedItems: p.skippedItems,
                      totalItems: p.totalItems,
                    }),
                    await f({ filename: d, url: _(g) }),
                    await P(
                      o,
                      i.map((e) => e.item),
                    ),
                    D({
                      completedItems: p.completedItems,
                      currentIndex: p.totalItems,
                      failedItems: p.failedItems,
                      jobId: t,
                      phase: "complete",
                      skippedItems: p.skippedItems,
                      totalItems: p.totalItems,
                    }),
                    {
                      completedCount: p.completedItems,
                      failedCount: p.failedItems,
                      fileName: d,
                      message:
                        p.failedItems > 0
                          ? `Downloaded ZIP with ${p.completedItems} files${E(m.length)}. ${p.failedItems} files failed.`
                          : `Downloaded ZIP with ${p.completedItems} files${E(m.length)}.`,
                      summary: p,
                      success: p.completedItems > 0 && 0 === p.failedItems,
                    }
                  );
                }
                let i = [],
                  l = new Map();
                for (let [n, a] of e.items.entries()) {
                  S(t);
                  let c = n + 1;
                  if (e.skipDownloaded && o.has(a.fileId)) {
                    ((p.skippedItems += 1),
                      D({
                        completedItems: p.completedItems,
                        currentFileName: a.fileName,
                        currentIndex: c,
                        failedItems: p.failedItems,
                        jobId: t,
                        phase: "skipping",
                        skippedItems: p.skippedItems,
                        totalItems: p.totalItems,
                      }));
                    continue;
                  }
                  (D({
                    completedItems: p.completedItems,
                    currentFileName: a.fileName,
                    currentIndex: c,
                    failedItems: p.failedItems,
                    jobId: t,
                    phase: "waiting",
                    skippedItems: p.skippedItems,
                    totalItems: p.totalItems,
                  }),
                    await F(t));
                  try {
                    D({
                      completedItems: p.completedItems,
                      currentFileName: a.fileName,
                      currentIndex: c,
                      failedItems: p.failedItems,
                      jobId: t,
                      phase: "downloading",
                      skippedItems: p.skippedItems,
                      totalItems: p.totalItems,
                    });
                    let e = await B({ item: a, tabId: s }),
                      n = I({
                        fileName: e.fileName,
                        item: a,
                        usedNamesByDirectory: l,
                      });
                    (S(t),
                      await f({ filename: `${r}/${n}`, url: e.dataUrl }),
                      i.push({ fileName: n, item: a }),
                      O(p, a),
                      await P(o, [a]),
                      D({
                        completedItems: p.completedItems,
                        currentFileName: a.fileName,
                        currentIndex: c,
                        failedItems: p.failedItems,
                        jobId: t,
                        phase: "downloading",
                        skippedItems: p.skippedItems,
                        totalItems: p.totalItems,
                      }));
                  } catch (e) {
                    (console.warn(
                      "[AI Saver][library] Individual item failed.",
                      {
                        error: e instanceof Error ? e.message : String(e),
                        fileId: a.fileId,
                        fileName: a.fileName,
                      },
                    ),
                      (p.failedItems += 1),
                      D({
                        completedItems: p.completedItems,
                        currentFileName: a.fileName,
                        currentIndex: c,
                        failedItems: p.failedItems,
                        jobId: t,
                        phase: "failed",
                        skippedItems: p.skippedItems,
                        totalItems: p.totalItems,
                      }));
                  }
                }
                D({
                  completedItems: p.completedItems,
                  currentIndex: p.totalItems,
                  failedItems: p.failedItems,
                  jobId: t,
                  phase: "saving",
                  skippedItems: p.skippedItems,
                  totalItems: p.totalItems,
                });
                let c = await C({
                  exportedAt: a,
                  files: i,
                  folder: r,
                  mode: n,
                });
                return (
                  D({
                    completedItems: p.completedItems,
                    currentIndex: p.totalItems,
                    failedItems: p.failedItems,
                    jobId: t,
                    phase: "complete",
                    skippedItems: p.skippedItems,
                    totalItems: p.totalItems,
                  }),
                  {
                    completedCount: p.completedItems,
                    failedCount: p.failedItems,
                    message:
                      p.failedItems > 0
                        ? `Downloaded ${p.completedItems} Library files${E(c)}. ${p.failedItems} files failed.`
                        : p.completedItems > 0
                          ? `Downloaded ${p.completedItems} Library files${E(c)}.`
                          : `Skipped ${p.skippedItems} previously downloaded Library files. Nothing new downloaded.`,
                    summary: p,
                    success:
                      (p.completedItems > 0 || p.skippedItems > 0) &&
                      0 === p.failedItems,
                  }
                );
              } catch (e) {
                return {
                  completedCount: p.completedItems,
                  failedCount: p.failedItems,
                  message:
                    e instanceof Error
                      ? e.message
                      : "ChatGPT Library download failed unexpectedly.",
                  summary: p,
                  success: !1,
                };
              } finally {
                (l.delete(t), c.delete(t));
              }
            },
            q = () => {
              for (let e of l) c.add(e);
              return {
                message: l.size
                  ? "ChatGPT Library download cancellation requested."
                  : "No active ChatGPT Library download is running.",
                success: !0,
              };
            };
        },
        {
          "~background/chatgpt-library-index": "1M88n",
          "~core/storage/chatgpt-library": "8tW6h",
          "~lib/export-directories": "9WjWq",
          "~lib/platform-tabs": "aHwT0",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "1M88n": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "CHATGPT_LIBRARY_INDEX_MARKDOWN_NAME", () => a),
            n.export(r, "CHATGPT_LIBRARY_INDEX_HTML_NAME", () => o),
            n.export(r, "shouldGenerateMarkdownIndex", () => p),
            n.export(r, "shouldGenerateHtmlIndex", () => d),
            n.export(r, "buildChatGptLibraryMarkdownIndex", () => f),
            n.export(r, "buildChatGptLibraryHtmlIndex", () => h));
          let a = "ChatGPT Library Index.md",
            o = "ChatGPT Library Index.html",
            i = (e) =>
              e >= 1048576
                ? `${(e / 1024 / 1024).toFixed(1)} MB`
                : `${Math.max(1, Math.round(e / 1024))} KB`,
            s = (e) => {
              if (!e) return "Unknown";
              let t = new Date(e);
              return Number.isNaN(t.getTime())
                ? "Unknown"
                : t.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
            },
            l = (e) =>
              e
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;"),
            c = (e) =>
              `./${e
                .split("/")
                .map((e) => encodeURIComponent(e).replace(/%20/g, " "))
                .join("/")}`,
            u = (e) =>
              e.map(({ fileName: e, item: t }) => ({
                category: t.category,
                extension: t.extension,
                fileId: t.fileId,
                fileName: e,
                label: t.fileName,
                href: c(e),
                mimeType: t.mimeType,
                modified: s(t.updatedAt),
                rawModified: t.updatedAt ?? "",
                size: i(t.sizeBytes),
                sizeBytes: t.sizeBytes,
                state: t.state,
              })),
            p = (e) => "markdown-html" === e,
            d = (e) => "markdown-html" === e || "html-only" === e,
            f = ({ exportedAt: e, files: t }) => {
              let r = t.filter((e) => "image" === e.item.category).length,
                n = t.length - r,
                s = t.reduce((e, t) => e + t.item.sizeBytes, 0),
                l = [
                  "---",
                  "cssclasses:",
                  "  - ai-exporter-gallery",
                  "---",
                  "",
                  "# ChatGPT Library Export Summary",
                  "",
                  "## Summary",
                  "",
                  `- Exported: ${e.toLocaleString("en-US")}`,
                  `- Total files: ${t.length}`,
                  `- Images: ${r}`,
                  `- Documents: ${n}`,
                  `- Total size: ${i(s)}`,
                  "- Image folder: `images/`",
                  "- File folder: `files/`",
                  `- HTML preview: [[${o}|Open browser preview]]`,
                  "",
                  "## Directory Layout",
                  "",
                  "```text",
                  "./",
                  "\u251c\u2500\u2500 images/",
                  "\u251c\u2500\u2500 files/",
                  `\u251c\u2500\u2500 ${a}`,
                  `\u2514\u2500\u2500 ${o}`,
                  "```",
                  "",
                  "## Preview",
                  "",
                  "Use the HTML preview for a searchable grid/list view, or use Obsidian Bases to browse the `images/` and `files/` folders directly.",
                ];
              return `${l.join("\n")}
`;
            },
            h = ({ exportedAt: e, files: t }) => {
              let r = u(t),
                n = r.filter((e) => "image" === e.category).length,
                a = r.length - n,
                o = t.reduce((e, t) => e + t.item.sizeBytes, 0),
                s = JSON.stringify(r).replace(/</g, "\\u003c");
              return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ChatGPT Library Export</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f8fafc;
      --card: #ffffff;
      --line: #e2e8f0;
      --muted: #64748b;
      --text: #0f172a;
      --primary: #2563eb;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    main {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 28px 0 40px;
    }
    header {
      display: grid;
      gap: 16px;
      margin-bottom: 18px;
    }
    h1 {
      margin: 0;
      font-size: clamp(24px, 4vw, 36px);
      letter-spacing: 0;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
    }
    .metric, .toolbar, .card, .table-wrap {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 12px;
    }
    .metric { padding: 14px; }
    .metric span {
      display: block;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .metric strong {
      display: block;
      margin-top: 4px;
      font-size: 22px;
    }
    .toolbar {
      display: grid;
      gap: 10px;
      margin: 18px 0;
      padding: 12px;
    }
    @media (min-width: 760px) {
      .toolbar { grid-template-columns: 1fr auto auto auto; align-items: center; }
    }
    input, select, button {
      min-height: 40px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: #fff;
      color: var(--text);
      font: inherit;
      padding: 0 12px;
    }
    button {
      cursor: pointer;
      font-weight: 700;
    }
    button.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 14px;
    }
    .card {
      display: grid;
      overflow: hidden;
      color: inherit;
      text-decoration: none;
      width: 100%;
      padding: 0;
      text-align: left;
    }
    .card-button { cursor: zoom-in; }
    .thumb {
      display: grid;
      place-items: center;
      aspect-ratio: 4 / 3;
      background: #e2e8f0;
      color: var(--muted);
      font-weight: 800;
    }
    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .meta {
      display: grid;
      gap: 4px;
      padding: 12px;
      min-width: 0;
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 800;
    }
    .muted { color: var(--muted); font-size: 12px; }
    .table-wrap {
      overflow: auto;
      max-height: 70vh;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
    }
    th, td {
      border-bottom: 1px solid var(--line);
      padding: 11px 12px;
      text-align: left;
      vertical-align: top;
    }
    th {
      position: sticky;
      top: 0;
      background: #f8fafc;
      color: var(--muted);
      font-size: 11px;
      text-transform: uppercase;
      z-index: 1;
    }
    td a { color: var(--primary); font-weight: 700; }
    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 20;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgba(15, 23, 42, 0.82);
    }
    .lightbox-panel {
      display: grid;
      gap: 12px;
      width: min(1100px, 100%);
      max-height: calc(100vh - 48px);
    }
    .lightbox-frame {
      display: grid;
      place-items: center;
      overflow: hidden;
      border-radius: 14px;
      background: #020617;
    }
    .lightbox img {
      max-width: 100%;
      max-height: calc(100vh - 170px);
      object-fit: contain;
      display: block;
    }
    .lightbox-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      color: #fff;
    }
    .lightbox-title {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 800;
    }
    .lightbox-actions {
      display: flex;
      gap: 8px;
    }
    .lightbox-actions a, .lightbox-actions button {
      display: inline-flex;
      align-items: center;
      min-height: 38px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,.25);
      background: rgba(255,255,255,.12);
      color: #fff;
      padding: 0 12px;
      text-decoration: none;
      font-weight: 800;
    }
    .hidden { display: none !important; }
  </style>
</head>
<body>
  <main>
    <header>
      <div>
        <h1>ChatGPT Library Export</h1>
        <p class="muted">Exported ${l(e.toLocaleString("en-US"))}</p>
      </div>
      <section class="summary" aria-label="Export summary">
        <div class="metric"><span>Total</span><strong>${r.length}</strong></div>
        <div class="metric"><span>Images</span><strong>${n}</strong></div>
        <div class="metric"><span>Files</span><strong>${a}</strong></div>
        <div class="metric"><span>Size</span><strong>${l(i(o))}</strong></div>
      </section>
    </header>
    <section class="toolbar" aria-label="Gallery controls">
      <input id="search" type="search" placeholder="Search filename or file id..." />
      <select id="type">
        <option value="all">All items</option>
        <option value="image">Images</option>
        <option value="file">Files</option>
      </select>
      <select id="sort">
        <option value="name">Name</option>
        <option value="modified">Modified</option>
        <option value="size">Size</option>
      </select>
      <button id="toggle" type="button" class="active">Grid view</button>
    </section>
    <section id="grid" class="grid" aria-label="Exported files grid"></section>
    <section id="list" class="table-wrap hidden" aria-label="Exported files list"></section>
  </main>
  <div id="lightbox" class="lightbox hidden" role="dialog" aria-modal="true" aria-label="Image preview">
    <div class="lightbox-panel">
      <div class="lightbox-frame">
        <img id="lightboxImage" alt="" />
      </div>
      <div class="lightbox-bar">
        <div id="lightboxTitle" class="lightbox-title"></div>
        <div class="lightbox-actions">
          <a id="lightboxOpen" href="#" target="_blank" rel="noopener">Open file</a>
          <button id="lightboxClose" type="button">Close</button>
        </div>
      </div>
    </div>
  </div>
  <script>
    const items = ${s};
    const state = { view: "grid" };
    const search = document.getElementById("search");
    const type = document.getElementById("type");
    const sort = document.getElementById("sort");
    const toggle = document.getElementById("toggle");
    const grid = document.getElementById("grid");
    const list = document.getElementById("list");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxOpen = document.getElementById("lightboxOpen");
    const lightboxClose = document.getElementById("lightboxClose");

    const escapeHtml = (value) => String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

    const getVisibleItems = () => {
      const query = search.value.trim().toLowerCase();
      return items
        .filter((item) => type.value === "all" || item.category === type.value)
        .filter((item) => !query || item.label.toLowerCase().includes(query) || item.fileId.toLowerCase().includes(query))
        .sort((left, right) => {
          if (sort.value === "size") return right.sizeBytes - left.sizeBytes;
          if (sort.value === "modified") return String(right.rawModified).localeCompare(String(left.rawModified));
          return left.label.localeCompare(right.label);
        });
    };

    const render = () => {
      const visible = getVisibleItems();
      grid.innerHTML = visible.map((item, index) => {
        const preview = item.category === "image"
          ? '<img src="' + item.href + '" alt="' + escapeHtml(item.label) + '" loading="lazy" />'
          : '<span>' + escapeHtml(item.extension || "FILE") + '</span>';
        const tagStart = item.category === "image"
          ? '<button type="button" class="card card-button" data-visible-index="' + index + '">'
          : '<a class="card" href="' + item.href + '" target="_blank" rel="noopener">';
        const tagEnd = item.category === "image" ? '</button>' : '</a>';
        return tagStart +
          '<div class="thumb">' + preview + '</div>' +
          '<div class="meta">' +
          '<div class="name">' + escapeHtml(item.label) + '</div>' +
          '<div class="muted">' + escapeHtml(item.size) + ' \xb7 ' + escapeHtml(item.modified) + '</div>' +
          '<div class="muted">' + escapeHtml(item.fileId) + '</div>' +
          '</div>' + tagEnd;
      }).join("");

      list.innerHTML = '<table><thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Modified</th><th>Open</th><th>File ID</th></tr></thead><tbody>' +
        visible.map((item) => '<tr>' +
          '<td>' + escapeHtml(item.label) + '</td>' +
          '<td>' + escapeHtml(item.category === "image" ? "Image" : "File") + '</td>' +
          '<td>' + escapeHtml(item.size) + '</td>' +
          '<td>' + escapeHtml(item.modified) + '</td>' +
          '<td><a href="' + item.href + '" target="_blank" rel="noopener">' + (item.category === "image" ? "Open image" : "Open") + '</a></td>' +
          '<td><code>' + escapeHtml(item.fileId) + '</code></td>' +
        '</tr>').join("") +
        '</tbody></table>';

      grid.classList.toggle("hidden", state.view !== "grid");
      list.classList.toggle("hidden", state.view !== "list");
      toggle.textContent = state.view === "grid" ? "Grid view" : "List view";
      toggle.classList.toggle("active", state.view === "grid");
    };

    const openPreview = (item) => {
      lightboxImage.src = item.href;
      lightboxImage.alt = item.label;
      lightboxTitle.textContent = item.label;
      lightboxOpen.href = item.href;
      lightbox.classList.remove("hidden");
    };

    const closePreview = () => {
      lightbox.classList.add("hidden");
      lightboxImage.removeAttribute("src");
    };

    grid.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const button = target ? target.closest("[data-visible-index]") : null;
      if (!button) return;
      const item = getVisibleItems()[Number(button.dataset.visibleIndex)];
      if (item) openPreview(item);
    });
    lightboxClose.addEventListener("click", closePreview);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closePreview();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePreview();
    });

    search.addEventListener("input", render);
    type.addEventListener("change", render);
    sort.addEventListener("change", render);
    toggle.addEventListener("click", () => {
      state.view = state.view === "grid" ? "list" : "grid";
      render();
    });
    render();
  </script>
</body>
</html>
`;
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      hbR2Q: [
        function (e, t, r) {
          ((r.interopDefault = function (e) {
            return e && e.__esModule ? e : { default: e };
          }),
            (r.defineInteropFlag = function (e) {
              Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (r.exportAll = function (e, t) {
              return (
                Object.keys(e).forEach(function (r) {
                  "default" === r ||
                    "__esModule" === r ||
                    t.hasOwnProperty(r) ||
                    Object.defineProperty(t, r, {
                      enumerable: !0,
                      get: function () {
                        return e[r];
                      },
                    });
                }),
                t
              );
            }),
            (r.export = function (e, t, r) {
              Object.defineProperty(e, t, { enumerable: !0, get: r });
            }));
        },
        {},
      ],
      "8tW6h": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "DOWNLOADED_LIBRARY_FILE_IDS_KEY", () => a),
            n.export(r, "createDownloadedLibraryFileIdSet", () => o));
          let a = "ai-exporter-hub:chatgpt-library-downloaded-file-ids",
            o = (e) =>
              new Set(
                Array.isArray(e)
                  ? e
                      .map((e) => ("string" == typeof e ? e.trim() : ""))
                      .filter(Boolean)
                  : [],
              );
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "9WjWq": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "normalizeRelativeDirectory", () => s),
            n.export(r, "validateRelativeDirectory", () => l),
            n.export(r, "sanitizeRelativeDirectoryForDownload", () => c),
            n.export(r, "getDefaultDirectoryLabel", () => u));
          var a = e("~core/types/export");
          let o = /[<>:"|?*\u0000-\u001f]/,
            i = /^[a-zA-Z]:/,
            s = (e) =>
              e
                .trim()
                .replace(/\\/g, "/")
                .replace(/\/+/g, "/")
                .replace(/^\/+|\/+$/g, ""),
            l = (e) => {
              let t = s(e);
              if (!t)
                return {
                  error: "Enter a folder name or use the default directory.",
                  isValid: !1,
                  normalizedValue: t,
                };
              if (i.test(e.trim()))
                return {
                  error:
                    "Use a relative folder path instead of a Windows drive path.",
                  isValid: !1,
                  normalizedValue: t,
                };
              if (e.trim().startsWith("/") || e.trim().startsWith("\\"))
                return {
                  error:
                    "Use a relative folder path instead of an absolute path.",
                  isValid: !1,
                  normalizedValue: t,
                };
              let r = t.split("/");
              return r.some((e) => !e || "." === e || ".." === e || o.test(e))
                ? {
                    error:
                      "Only relative folder names are allowed. Avoid dots, empty segments, and special characters.",
                    isValid: !1,
                    normalizedValue: t,
                  }
                : { error: "", isValid: !0, normalizedValue: t };
            },
            c = (e, t) => {
              let r = l(e),
                n = r.isValid ? r.normalizedValue : t;
              return s(n)
                .split("/")
                .map((e) => e.replace(o, " ").trim())
                .filter(Boolean)
                .join("/");
            },
            u = (e, t) => (0, a.buildDefaultExportDirectory)(e, t);
        },
        {
          "~core/types/export": "9vpBg",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "9vpBg": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "pdfColorThemeLabels", () => a),
            n.export(r, "pdfMessageStyleLabels", () => o),
            n.export(r, "NOTION_SPLIT_PAGE_PRESETS", () => i),
            n.export(r, "DEFAULT_NOTION_MESSAGES_PER_PAGE", () => s),
            n.export(r, "DEFAULT_NOTION_CUSTOM_MESSAGES_PER_PAGE", () => l),
            n.export(r, "MIN_NOTION_MESSAGES_PER_PAGE", () => c),
            n.export(r, "MAX_NOTION_MESSAGES_PER_PAGE", () => u),
            n.export(r, "sanitizeNotionMessagesPerPage", () => p),
            n.export(r, "exportDirectoryPlatforms", () => d),
            n.export(r, "buildDefaultExportDirectory", () => f),
            n.export(r, "getExportDirectoryForPlatform", () => h),
            n.export(r, "defaultExportPreferences", () => m));
          let a = { comfort: "Eye-care", dark: "Dark", light: "Light" },
            o = {
              "scheme-a": "Label Emphasis",
              "scheme-b": "Side Accent Line",
              "scheme-c": "Label + Side Accent",
            },
            i = [10, 20, 30, 50],
            s = 20,
            l = 40,
            c = 1,
            u = 200,
            p = (e) => {
              let t =
                "number" == typeof e
                  ? e
                  : "string" == typeof e
                    ? Number.parseInt(e, 10)
                    : Number.NaN;
              if (!Number.isFinite(t)) return s;
              let r = Math.floor(t);
              return r < c ? c : r > u ? u : r;
            },
            d = ["chatgpt", "claude", "gemini", "perplexity"],
            f = (e, t) => `ai-chats-Hub-${e}-${t}`,
            h = ({ platformId: e, preferences: t, target: r }) =>
              t.exportDirectories?.[e]?.[r]?.trim() || f(e, r),
            m = {
              bulkExportDelayMaxMs: 1500,
              bulkExportDelayMinMs: 1e3,
              downloadFolder: "AI-Exporter-Hub",
              downloadMarkdownImages: !1,
              downloadPdfImages: !1,
              exportDirectories: {},
              filenamePattern: "{date}-{title}",
              dateFormat: "YYYY-MM-DD",
              includePlatformName: !1,
              includeConversationDate: !0,
              lastSelectedTarget: "markdown",
              markdownFlavor: "obsidian",
              notionEnhancedFormatting: !1,
              notionMessagesPerPage: s,
              notionSplitIntoPages: !1,
              notionSyncBehavior: "duplicate",
              organizeGeminiByGem: !1,
              perplexityBulkAfterDate: "",
              perplexityIncludeSourcesAndRelated: !0,
              perplexityOrganizeBySpace: !0,
              pdfColorTheme: "light",
              pdfMessageStyle: "scheme-c",
              pdfTheme: "clean",
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      aHwT0: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "getSupportedPlatformTabCandidates", () => s),
            n.export(r, "findConnectablePlatformTab", () => l));
          var a = e("~popup/lib/send-tab-message"),
            o = e("~platforms/detector");
          let i = (e, t) =>
              [...e].sort((e, r) => {
                let n = e.tab.id === t ? 3 : e.tab.active ? 2 : 1,
                  a = r.tab.id === t ? 3 : r.tab.active ? 2 : 1;
                return a - n;
              }),
            s = async ({ preferredPlatformId: e, preferredTabId: t }) => {
              let r = await chrome.tabs.query({ currentWindow: !0 }),
                n = r
                  .map((e) => ({
                    detection: (0, o.detectPlatformFromUrl)(e.url ?? ""),
                    tab: e,
                  }))
                  .filter(
                    (e) => e.detection.isSupported && e.detection.platform,
                  )
                  .map((e) => ({ platform: e.detection.platform, tab: e.tab })),
                a = e ? n.filter((t) => t.platform.id === e) : n;
              return i(a.length ? a : n, t);
            },
            l = async ({
              preferredPlatformId: e,
              preferredTabId: t,
              timeoutMs: r,
            }) => {
              let n = await s({ preferredPlatformId: e, preferredTabId: t }),
                o = "";
              for (let e of n)
                if (e.tab.id)
                  try {
                    let t = await (0, a.sendTabMessageWithTimeout)(
                      e.tab.id,
                      { action: "AI_EXPORTER_HUB_PING" },
                      r,
                    );
                    if (t?.ok)
                      return {
                        candidates: n,
                        connected: {
                          platform: e.platform,
                          response: t,
                          tab: e.tab,
                        },
                        lastError: o,
                      };
                    o = "The content bridge responded without an ok status.";
                  } catch (e) {
                    o =
                      e instanceof Error
                        ? e.message
                        : "Unknown connection error";
                  }
              return { candidates: n, connected: null, lastError: o };
            };
        },
        {
          "~popup/lib/send-tab-message": "9hgiO",
          "~platforms/detector": "5z2uV",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "9hgiO": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "sendTabMessageWithTimeout", () => s));
          let a = [
              "Could not establish connection. Receiving end does not exist.",
              "The message port closed before a response was received.",
            ],
            o = (e) =>
              e instanceof Error && a.some((t) => e.message.includes(t)),
            i = async (e, t, r) =>
              await new Promise((n, a) => {
                let o = setTimeout(() => {
                  a(Error(`Tab message timed out after ${r}ms.`));
                }, r);
                try {
                  chrome.tabs.sendMessage(e, t, (e) => {
                    if ((clearTimeout(o), chrome.runtime.lastError)) {
                      a(Error(chrome.runtime.lastError.message));
                      return;
                    }
                    n(e);
                  });
                } catch (e) {
                  (clearTimeout(o), a(e));
                }
              }),
            s = async (e, t, r, n = 3) => {
              let a;
              for (let s = 0; s < n; s++)
                try {
                  return await i(e, t, r);
                } catch (e) {
                  if (((a = e), !o(e))) throw e;
                  if (s < n - 1) {
                    let e = 400 * Math.pow(2, s);
                    await new Promise((t) => window.setTimeout(t, e));
                  }
                }
              throw a;
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "5z2uV": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "detectPlatformFromUrl", () => i));
          var a = e("~platforms/registry");
          let o = (e, t, r = "") => ({
              url: e,
              hostname: r,
              isSupported: !1,
              platform: null,
              reason: t,
            }),
            i = (e) => {
              if (!e)
                return o(
                  "",
                  "Open a supported AI conversation page to continue.",
                );
              try {
                let t = new URL(e),
                  r = t.hostname,
                  n = t.pathname,
                  i =
                    Object.values(a.platformRegistry).find(
                      (e) =>
                        !!e.hostnames.includes(r) &&
                        (!e.pathnameMatchers?.length ||
                          e.pathnameMatchers.some((e) => e.test(n))),
                    ) ?? null;
                if (!i)
                  return o(
                    e,
                    "This tab is not a supported AI conversation page.",
                    r,
                  );
                return { url: e, hostname: r, isSupported: !0, platform: i };
              } catch {
                return o(e, "The current tab URL could not be parsed.");
              }
            };
        },
        {
          "~platforms/registry": "5XhDa",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "5XhDa": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "platformRegistry", () => a));
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
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      bakw5: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "queueExportJob", () => em),
            n.export(r, "prepareCustomExportPreview", () => eg),
            n.export(r, "dismissFinishedExportJob", () => eb),
            n.export(r, "recoverInterruptedExportJob", () => ex),
            n.export(r, "cancelQueuedOrRunningExportJob", () => ey),
            n.export(r, "retryFailedExportJob", () => ev));
          var a = e("~background/notion"),
            o = e("~core/storage/custom-export-preview"),
            i = e("~core/storage/export-history"),
            s = e("~core/storage/export-job"),
            l = e("~exporters/markdown/assets"),
            c = e("~exporters/markdown/formatter"),
            u = e("~exporters/pdf/formatter"),
            p = e("~lib/aisaver-account-api"),
            d = e("~lib/aisaver-analytics-api"),
            f = e("~lib/filename"),
            h = e("~lib/platform-tabs");
          let m = new Set(),
            g = new Set(),
            b = (e, t) => `data:${t},${encodeURIComponent(e)}`,
            x = (e) => {
              let t = "",
                r = new Uint8Array(e);
              for (let e = 0; e < r.length; e += 32768) {
                let n = r.subarray(e, e + 32768);
                t += String.fromCharCode(...n);
              }
              return btoa(t);
            },
            y = (e, t) => {
              let r = e.trim();
              if ("claude" !== t) return r;
              try {
                return new URL(r, "https://claude.ai").toString();
              } catch {
                return r;
              }
            },
            v = (e) => {
              try {
                let t = new URL(e);
                return (
                  "claude.ai" === t.hostname.toLowerCase() &&
                  t.pathname.toLowerCase().startsWith("/api/")
                );
              } catch {
                return !1;
              }
            },
            k = (e) => {
              try {
                let t = new URL(e),
                  r = t.hostname.toLowerCase();
                return (
                  "chatgpt.com" === r ||
                  "chat.openai.com" === r ||
                  r.endsWith(".openai.com")
                );
              } catch {
                return !1;
              }
            },
            w = (e) => {
              try {
                let t = new URL(e),
                  r = t.hostname.toLowerCase(),
                  n = t.pathname.toLowerCase();
                return (
                  "ppl-ai-file-upload.s3.amazonaws.com" === r ||
                  (("perplexity.ai" === r || "www.perplexity.ai" === r) &&
                    (n.includes("/direct-files/attachments/") ||
                      n.includes("/api/")))
                );
              } catch {
                return !1;
              }
            },
            _ = async ({
              preferredTabId: e,
              preferredPlatformId: t,
              threadId: r,
              url: n,
            }) => {
              let a = await (0, h.findConnectablePlatformTab)({
                  preferredPlatformId: t,
                  preferredTabId: e,
                  timeoutMs: 3e3,
                }),
                o = a.connected?.tab.id;
              if (!o)
                throw Error(
                  `A connected ${t} tab is required to download authenticated files.`,
                );
              console.info(
                "[AI Saver][assets] Requesting authenticated asset via tab.",
                { platform: t, tabId: o, threadId: r ?? null, url: n },
              );
              let i = await chrome.tabs.sendMessage(o, {
                action: "AI_EXPORTER_HUB_DOWNLOAD_AUTHENTICATED_FILE",
                threadId: r,
                url: n,
              });
              if (!i?.ok || !i.dataUrl)
                throw Error(
                  i?.error || "The authenticated file download failed.",
                );
              return (
                console.info(
                  "[AI Saver][assets] Received authenticated asset data URL.",
                  {
                    hasMimeType:
                      "string" == typeof i.mimeType && i.mimeType.length > 0,
                    platform: t,
                    sizeHint: i.dataUrl.length,
                    url: n,
                  },
                ),
                i.dataUrl
              );
            },
            A = async ({
              conversationId: e,
              platform: t,
              preferredTabId: r,
              url: n,
            }) => {
              let a = y(n, t);
              return ("chatgpt" === t && k(a)) ||
                ("claude" === t && v(a)) ||
                ("perplexity" === t && w(a))
                ? (console.info(
                    "[AI Saver][assets] Resolving asset through source tab.",
                    {
                      conversationId: e ?? null,
                      platform: t,
                      preferredTabId: r ?? null,
                      url: a,
                    },
                  ),
                  await _({
                    preferredPlatformId: t,
                    preferredTabId: r,
                    threadId: "perplexity" === t ? e : void 0,
                    url: a,
                  }))
                : a;
            },
            C = async ({
              conversationId: e,
              conversation: t,
              platform: r,
              preferredTabId: n,
              warnings: a,
            }) => {
              let o = new Map(),
                i = new Map();
              for (let e of t.messages)
                for (let t of e.media ?? [])
                  "image" === t.type &&
                    t.downloadUrl &&
                    !o.has(t.id) &&
                    (o.set(t.id, t.downloadUrl), i.set(t.id, t));
              let s = await Promise.all(
                Array.from(o.entries()).map(async ([t, o]) => {
                  try {
                    console.info("[AI Saver][pdf] Resolving inline image.", {
                      conversationId: e ?? null,
                      mediaId: t,
                      platform: r,
                      url: o,
                    });
                    let a = await A({
                      conversationId: e,
                      platform: r,
                      preferredTabId: n,
                      url: o,
                    });
                    console.info("[AI Saver][pdf] Inline image URL resolved.", {
                      isDataUrl: a.startsWith("data:"),
                      mediaId: t,
                      platform: r,
                    });
                    let i = await fetch(a);
                    if (!i.ok)
                      return (
                        console.warn(
                          "[AI Saver][pdf] Inline image fetch failed; using resolved URL.",
                          {
                            mediaId: t,
                            platform: r,
                            resolvedUrl: a,
                            status: i.status,
                          },
                        ),
                        [t, a]
                      );
                    let s = i.headers.get("content-type") || "image/png",
                      l = await i.arrayBuffer();
                    return (
                      console.info(
                        "[AI Saver][pdf] Inline image fetched successfully.",
                        {
                          byteLength: l.byteLength,
                          mediaId: t,
                          mimeType: s,
                          platform: r,
                        },
                      ),
                      [t, `data:${s};base64,${x(l)}`]
                    );
                  } catch (n) {
                    let e = i.get(t);
                    return (
                      console.warn(
                        "[AI Saver][pdf] Inline image fetch threw; falling back to original URL.",
                        {
                          mediaId: t,
                          platform: r,
                          reason: n instanceof Error ? n.message : String(n),
                          url: o,
                        },
                      ),
                      a.push({
                        message: q({
                          assetKind: "image",
                          fileName: e?.fileName || t,
                          reason:
                            n instanceof Error
                              ? n.message
                              : "Download failed unexpectedly.",
                        }),
                      }),
                      [t, o]
                    );
                  }
                }),
              );
              return Object.fromEntries(s.filter((e) => Array.isArray(e)));
            },
            E = async (e) =>
              await new Promise((t) => {
                setTimeout(t, e);
              }),
            j = (e, t) => {
              let r = "number" == typeof e ? e : Number.NaN;
              return Number.isFinite(r)
                ? Math.min(1e4, Math.max(0, Math.round(r)))
                : t;
            },
            I = (e) => {
              let t = j(e.preferences.bulkExportDelayMinMs, 1e3),
                r = j(e.preferences.bulkExportDelayMaxMs, t),
                n = Math.min(t, r),
                a = Math.max(t, r);
              return a <= n ? n : Math.round(n + Math.random() * (a - n));
            },
            S = (e) => {
              let t = e.updatedAt || e.createdAt;
              if (!t) return 0;
              let r = new Date(t).getTime();
              return Number.isFinite(r) ? r : 0;
            },
            D = (e, t) => {
              let r = e.preferences.perplexityBulkAfterDate?.trim();
              if (
                "perplexity" !== e.platform ||
                e.conversationIds?.length ||
                !r
              )
                return t;
              let n = new Date(`${r}T00:00:00`).getTime();
              return Number.isFinite(n) ? t.filter((e) => S(e) >= n) : t;
            },
            F = (e) => {
              let t =
                e instanceof Error ? e.message : "string" == typeof e ? e : "";
              return /(?:\b429\b|too many requests|rate limit|rate-limit)/i.test(
                t,
              );
            },
            T = ({ conversation: e, platform: t, summary: r }) => {
              let n = e?.summary.id ?? r?.id ?? "";
              if ("gemini" !== t) return n;
              let a =
                ("string" == typeof e?.metadata.accountScope
                  ? e.metadata.accountScope
                  : r?.accountScope) ?? null;
              return a ? `${a}:${n}` : n;
            },
            R = ({ conversation: e, summary: t }) => {
              if (!t) return e;
              let r =
                  "string" == typeof e.metadata.projectName &&
                  e.metadata.projectName.trim()
                    ? e.metadata.projectName.trim()
                    : t.projectName?.trim() || "",
                n =
                  "string" == typeof e.metadata.gizmoId &&
                  e.metadata.gizmoId.trim()
                    ? e.metadata.gizmoId.trim()
                    : t.projectId?.trim();
              return {
                ...e,
                metadata: {
                  ...e.metadata,
                  ...(n ? { projectId: n } : {}),
                  ...(r ? { projectName: r } : {}),
                  ...("boolean" == typeof t.isArchived
                    ? { isArchived: t.isArchived }
                    : {}),
                },
                summary: {
                  ...e.summary,
                  isArchived: t.isArchived ?? e.summary.isArchived,
                  projectId: n ?? e.summary.projectId,
                  projectName: r || e.summary.projectName,
                  title: t.title || e.summary.title,
                  createdAt: e.summary.createdAt ?? t.createdAt ?? null,
                  updatedAt: e.summary.updatedAt ?? t.updatedAt ?? null,
                  url: t.url || e.summary.url,
                  tags:
                    t.tags.length > 0
                      ? Array.from(new Set([...e.summary.tags, ...t.tags]))
                      : e.summary.tags,
                },
              };
            },
            P = ({ conversation: e, exportedAt: t }) => ({
              ...e,
              metadata: {
                ...e.metadata,
                createdAt:
                  "string" == typeof e.metadata.createdAt &&
                  e.metadata.createdAt.trim()
                    ? e.metadata.createdAt
                    : (e.summary.createdAt ?? null),
                exportedAt: t,
                messageCount: e.messages.length,
                sourceId:
                  "string" == typeof e.metadata.sourceId &&
                  e.metadata.sourceId.trim()
                    ? e.metadata.sourceId
                    : ("string" == typeof e.metadata.uuid &&
                        e.metadata.uuid.trim()) ||
                      e.summary.id,
                sourceUrl:
                  "string" == typeof e.metadata.sourceUrl &&
                  e.metadata.sourceUrl.trim()
                    ? e.metadata.sourceUrl
                    : e.summary.url,
                updatedAt:
                  "string" == typeof e.metadata.updatedAt &&
                  e.metadata.updatedAt.trim()
                    ? e.metadata.updatedAt
                    : (e.summary.updatedAt ?? null),
              },
            }),
            L = (e) => {
              let t = [
                  e.indexOf("\n\n## Sources"),
                  e.indexOf("\n\n## Related Questions"),
                ]
                  .filter((e) => e >= 0)
                  .sort((e, t) => e - t),
                r = t[0];
              return "number" != typeof r ? e : e.slice(0, r).trimEnd();
            },
            O = ({ conversation: e, request: t }) =>
              "perplexity" !== t.platform ||
              t.preferences.perplexityIncludeSourcesAndRelated
                ? e
                : {
                    ...e,
                    messages: e.messages.map((e) =>
                      "assistant" !== e.role
                        ? e
                        : { ...e, content: L(e.content) },
                    ),
                  },
            N = async (e) =>
              await new Promise((t) => {
                let r = !1,
                  n = () => {
                    r ||
                      ((r = !0), chrome.tabs.onUpdated.removeListener(a), t());
                  };
                function a(t, r) {
                  t === e && "complete" === r.status && n();
                }
                (chrome.tabs.get(e, (e) => {
                  e?.status === "complete" && n();
                }),
                  chrome.tabs.onUpdated.addListener(a));
              }),
            M = async (e) => {
              let t =
                  globalThis.crypto?.randomUUID?.() ??
                  `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                r = `ai-exporter-hub:pdf-print-html:${t}`;
              return (
                await chrome.storage.session.set({ [r]: e }),
                {
                  storageKey: r,
                  url: chrome.runtime.getURL(
                    `tabs/pdf-print.html?id=${encodeURIComponent(t)}`,
                  ),
                }
              );
            },
            B = async (e) =>
              await new Promise((t, r) => {
                chrome.debugger.sendCommand(
                  { tabId: e },
                  "Runtime.evaluate",
                  {
                    awaitPromise: !0,
                    expression: `
          new Promise((resolve) => {
            const startedAt = Date.now();
            const checkReady = () => {
              if (
                window.__AI_EXPORTER_PDF_PRINT_READY__ ||
                document.documentElement.getAttribute("data-ai-exporter-pdf-print-ready") === "true"
              ) {
                resolve(true);
                return;
              }
              if (Date.now() - startedAt > 10000) {
                resolve(false);
                return;
              }
              setTimeout(checkReady, 50);
            };
            checkReady();
          })
        `,
                    returnByValue: !0,
                  },
                  (e) => {
                    if (chrome.runtime.lastError) {
                      r(Error(chrome.runtime.lastError.message));
                      return;
                    }
                    if (!e?.result?.value) {
                      r(Error("The PDF print page did not finish preparing."));
                      return;
                    }
                    t();
                  },
                );
              }),
            z = async ({ url: e, filename: t }) =>
              await new Promise((r, n) => {
                let a = t.trim();
                if (!a) {
                  n(Error("Invalid filename: filename is empty"));
                  return;
                }
                let o = a.split("/"),
                  i = o.map((e) => {
                    let t = e.slice(0, 255);
                    return t || "untitled";
                  }),
                  s = i.join("/");
                chrome.downloads.download(
                  {
                    conflictAction: "uniquify",
                    filename: s,
                    saveAs: !1,
                    url: e,
                  },
                  (e) => {
                    if (chrome.runtime.lastError || "number" != typeof e) {
                      n(
                        Error(
                          chrome.runtime.lastError?.message ||
                            "Download could not be created.",
                        ),
                      );
                      return;
                    }
                    r(e);
                  },
                );
              }),
            q = ({ assetKind: e, fileName: t, reason: r }) =>
              `The ${e} "${t}" could not be downloaded. ${r}`,
            $ = {
              "application/json": "json",
              "application/pdf": "pdf",
              "application/zip": "zip",
              "image/gif": "gif",
              "image/jpeg": "jpg",
              "image/jpg": "jpg",
              "image/png": "png",
              "image/svg+xml": "svg",
              "image/webp": "webp",
              "text/csv": "csv",
              "text/markdown": "md",
              "text/plain": "txt",
            },
            U = (e) => {
              let t = e.match(/^data:([^;,]+)/i),
                r = t?.[1]?.toLowerCase();
              return r ? $[r] : void 0;
            },
            H = (e) => {
              let t = e.split("/").pop() ?? "",
                r = t.lastIndexOf(".");
              return r >= 0 ? t.slice(r + 1).toLowerCase() : "";
            },
            Q = (e, t) => {
              let r = e.lastIndexOf("/"),
                n = r >= 0 ? e.slice(0, r + 1) : "",
                a = r >= 0 ? e.slice(r + 1) : e,
                o = a.lastIndexOf("."),
                i = o >= 0 ? a.slice(0, o) : a;
              return `${n}${i}.${t}`;
            },
            G = async ({
              conversationId: e,
              downloads: t,
              platform: r,
              preferredTabId: n,
            }) => {
              let a = {},
                o = [];
              for (let i of t)
                try {
                  let t = await A({
                      conversationId: e,
                      platform: r,
                      preferredTabId: n,
                      url: i.url,
                    }),
                    o = U(t),
                    s = o && o !== H(i.relativePath),
                    l = s ? Q(i.downloadPath, o) : i.downloadPath,
                    c = s ? Q(i.relativePath, o) : i.relativePath;
                  (await z({ filename: l, url: t }), (a[i.mediaId] = c));
                } catch (t) {
                  let e =
                    t instanceof Error
                      ? t.message
                      : "Download failed unexpectedly.";
                  o.push({
                    message: q({
                      assetKind:
                        "image" === i.media.type ? "image" : "attachment",
                      fileName: i.media.fileName || i.mediaId,
                      reason: e,
                    }),
                  });
                }
              return { relativePathByMediaId: a, warnings: o };
            },
            V = async ({
              conversationId: e,
              downloads: t,
              platform: r,
              preferredTabId: n,
            }) => {
              try {
                return await G({
                  conversationId: e,
                  downloads: t,
                  platform: r,
                  preferredTabId: n,
                });
              } catch (t) {
                let e =
                  t instanceof Error ? t.message : "Asset downloads failed.";
                return {
                  relativePathByMediaId: {},
                  warnings: [
                    {
                      message: `Conversation export continued, but attached images or files could not be downloaded. ${e}`,
                    },
                  ],
                };
              }
            },
            W = async (e, t, r) => {
              let n = e.preferences.downloadMarkdownImages
                  ? (0, l.buildConversationMediaDownloadPlan)({
                      conversation: t,
                      exportPath: r,
                    })
                  : { downloads: [], relativePathByMediaId: {} },
                a = await V({
                  conversationId: t.summary.id,
                  downloads: n.downloads,
                  platform: e.platform,
                  preferredTabId: e.sourceTabId,
                }),
                o = (0, c.formatConversationAsMarkdown)({
                  conversation: t,
                  mediaPathById: a.relativePathByMediaId,
                  platform: e.platform,
                });
              return (
                await z({
                  filename: r,
                  url: b(o, "text/markdown;charset=utf-8"),
                }),
                a.warnings
              );
            },
            Z = async (e, t, r) => {
              let n = [],
                a = e.preferences.downloadPdfImages
                  ? await C({
                      conversationId: t.summary.id,
                      conversation: t,
                      platform: e.platform,
                      preferredTabId: e.sourceTabId,
                      warnings: n,
                    })
                  : void 0,
                o = e.preferences.downloadPdfImages
                  ? (0, l.buildConversationMediaDownloadPlan)({
                      conversation: t,
                      exportPath: r,
                      includeFiles: !0,
                      includeImages: !1,
                    })
                  : { downloads: [], relativePathByMediaId: {} },
                i = await V({
                  conversationId: t.summary.id,
                  downloads: o.downloads,
                  platform: e.platform,
                  preferredTabId: e.sourceTabId,
                });
              n.push(...i.warnings);
              let s = (0, u.formatConversationAsPdfHtml)({
                  conversation: t,
                  mediaInlineSrcById: a,
                  mediaPathById: i.relativePathByMediaId,
                  pdfColorTheme: e.preferences.pdfColorTheme,
                  pdfMessageStyle: e.preferences.pdfMessageStyle,
                  platform: e.platform,
                }),
                c = await M(s),
                p = await chrome.tabs.create({ active: !1, url: c.url });
              if (!p.id)
                throw (
                  await chrome.storage.session.remove(c.storageKey),
                  Error("The PDF print tab could not be created.")
                );
              try {
                (await N(p.id),
                  await new Promise((e, t) => {
                    chrome.debugger.attach({ tabId: p.id }, "1.3", () => {
                      if (chrome.runtime.lastError) {
                        t(Error(chrome.runtime.lastError.message));
                        return;
                      }
                      e();
                    });
                  }),
                  await B(p.id),
                  await new Promise((e) => {
                    chrome.debugger.sendCommand(
                      { tabId: p.id },
                      "Runtime.evaluate",
                      {
                        awaitPromise: !0,
                        expression: `
            Promise.race([
              Promise.all(
                Array.from(document.images).map((image) => {
                  if (image.complete) {
                    return image.decode ? image.decode().catch(() => undefined) : undefined;
                  }
                  return new Promise((resolve) => {
                    image.addEventListener("load", resolve, { once: true });
                    image.addEventListener("error", resolve, { once: true });
                  }).then(() => image.decode ? image.decode().catch(() => undefined) : undefined);
                })
              ),
              new Promise((resolve) => setTimeout(resolve, 5000))
            ]).then(() => true)
          `,
                        returnByValue: !0,
                      },
                      () => e(),
                    );
                  }));
                let e = await new Promise((e, t) => {
                  chrome.debugger.sendCommand(
                    { tabId: p.id },
                    "Page.printToPDF",
                    {
                      marginBottom: 0.4,
                      marginLeft: 0.4,
                      marginRight: 0.4,
                      marginTop: 0.4,
                      paperHeight: 11.69,
                      paperWidth: 8.27,
                      printBackground: !0,
                    },
                    (r) => {
                      if (chrome.runtime.lastError || !r?.data) {
                        t(
                          Error(
                            chrome.runtime.lastError?.message ||
                              "PDF output could not be generated.",
                          ),
                        );
                        return;
                      }
                      e(r.data);
                    },
                  );
                });
                await z({
                  filename: r,
                  url: `data:application/pdf;base64,${e}`,
                });
              } finally {
                try {
                  await new Promise((e) => {
                    chrome.debugger.detach({ tabId: p.id }, () => e());
                  });
                } catch {}
                try {
                  await chrome.tabs.remove(p.id);
                } catch {}
                try {
                  await chrome.storage.session.remove(c.storageKey);
                } catch {}
              }
              return n;
            },
            X = async (e, t, r = {}) => {
              let n = P({
                  conversation: t,
                  exportedAt: new Date().toISOString(),
                }),
                o = O({ conversation: n, request: e }),
                i = (0, f.buildExportBaseName)({
                  conversation: o,
                  platform: e.platform,
                  preferences: e.preferences,
                }),
                s = (0, f.buildDownloadPath)({
                  baseName: i,
                  conversation: o,
                  platform: e.platform,
                  preferences: e.preferences,
                  target: e.target,
                });
              if ("markdown" === e.target) {
                let t = await W(e, o, s);
                return { fileName: s, warnings: t };
              }
              if ("pdf" === e.target) {
                let t = await Z(e, o, s);
                return { fileName: s, warnings: t };
              }
              if ("notion" === e.target) {
                let t = await (0, a.exportConversationToNotion)({
                  conversation: o,
                  onProgress: r.onProgress,
                  platform: e.platform,
                  preferences: e.preferences,
                });
                return {
                  fileName: t.pageUrl || `${t.databaseTitle} / ${t.pageTitle}`,
                  warnings: [],
                };
              }
              throw Error("Unsupported export target.");
            },
            J = (e) => ({
              analyticsEntitlement: null,
              completedFiles: [],
              conversationIds:
                "bulk" === e.mode
                  ? (e.conversationIds ??
                    e.recentConversations?.map((e) => e.id) ??
                    [])
                  : e.conversation
                    ? [e.conversation.summary.id]
                    : [],
              currentItemTitle:
                e.conversation?.summary.title ??
                e.recentConversations?.[0]?.title ??
                "Queued export",
              failedItems: [],
              jobId: crypto.randomUUID(),
              message:
                "bulk" === e.mode
                  ? "Bulk export queued."
                  : "Single export queued.",
              mode: e.mode,
              platform: e.platform,
              preferences: e.preferences,
              progress: {
                completedCount: 0,
                failedCount: 0,
                skippedCount: 0,
                totalCount:
                  "bulk" === e.mode
                    ? (e.conversationIds?.length ??
                      e.bulkLimit ??
                      e.recentConversations?.length ??
                      0)
                    : 1,
              },
              startedAt: new Date().toISOString(),
              cancellationRequested: !1,
              status: "queued",
              target: e.target,
              triggerSource: e.triggerSource ?? "background",
              updatedAt: new Date().toISOString(),
            }),
            Y = async (e, t) => {
              let r = {
                ...e,
                ...t,
                progress: { ...e.progress, ...(t.progress ?? {}) },
                updatedAt: new Date().toISOString(),
              };
              return (await (0, s.saveActiveExportJob)(r), r);
            },
            K = async (e) => {
              let t = await (0, h.findConnectablePlatformTab)({
                preferredPlatformId: e.platform,
                preferredTabId: e.sourceTabId ?? null,
                timeoutMs: 1200,
              });
              if (t.connected?.tab?.id) return t.connected.tab;
              let r =
                t.candidates.find((t) => t.tab.id === e.sourceTabId)?.tab ??
                t.candidates[0]?.tab;
              if (!r?.id)
                throw Error(
                  `Open a ${e.platform} conversation tab before starting this export.`,
                );
              throw Error(
                t.lastError
                  ? `No connectable ${e.platform} tab was found. ${t.lastError}`
                  : `No connectable ${e.platform} tab was found. Refresh one of the open tabs and retry.`,
              );
            },
            ee = async (e, t) => {
              if ("gemini" === t)
                try {
                  let t = await chrome.tabs.sendMessage(e, {
                    action: "checkGeminiStatus",
                  });
                  return t?.success && t.sid ? t.sid : void 0;
                } catch {
                  return;
                }
            },
            et = async (e, t) => {
              let r = await K(e);
              if (!r?.id)
                throw Error(
                  "The source tab is not available for bulk detail loading.",
                );
              let n = await ee(r.id, e.platform),
                a = await chrome.tabs.sendMessage(r.id, {
                  action: "AI_EXPORTER_HUB_GET_CONVERSATION_DETAILS",
                  chatGptContentMode: e.chatGptContentMode,
                  chatGptGroupChatSyncMode: e.chatGptGroupChatSyncMode,
                  chatGptProjectSyncMode: e.chatGptProjectSyncMode,
                  conversationIds: t,
                  targetSid: n,
                });
              if (!a?.ok || !Array.isArray(a.details))
                throw Error(
                  a?.error || "Conversation details could not be loaded.",
                );
              return a.details;
            },
            er = (e) =>
              "gemini" === e.platform ||
              "perplexity" === e.platform ||
              ("claude" === e.platform && "notion" === e.target) ||
              ("markdown" === e.target &&
                e.preferences.downloadMarkdownImages) ||
              ("pdf" === e.target && e.preferences.downloadPdfImages),
            en = ({ refreshedConversation: e, selectedConversation: t }) => {
              console.info(
                "[AI Saver][custom-preview] Merging refreshed detail into preview selection.",
                {
                  refreshedArtifactCount: e.artifacts.length,
                  refreshedMessageCount: e.messages.length,
                  selectedArtifactCount: t.artifacts.length,
                  selectedMessageCount: t.messages.length,
                },
              );
              let r = new Map(e.messages.map((e) => [e.id, e])),
                n = t.messages.map((e) => {
                  let t = r.get(e.id);
                  return t
                    ? {
                        ...e,
                        authorName: t.authorName ?? e.authorName,
                        createdAt: t.createdAt ?? e.createdAt,
                        media: t.media ?? e.media,
                      }
                    : e;
                }),
                a = new Set(n.map((e) => e.id)),
                o = new Map();
              for (let r of [...t.artifacts, ...e.artifacts])
                (!r.sourceMessageId || a.has(r.sourceMessageId)) &&
                  o.set(r.id, r);
              let i = {
                ...t,
                artifacts: Array.from(o.values()),
                attachments: e.attachments.length
                  ? e.attachments
                  : t.attachments,
                messages: n,
                metadata: {
                  ...e.metadata,
                  ...t.metadata,
                  messageCount: n.length,
                },
              };
              return (
                console.info(
                  "[AI Saver][custom-preview] Preview selection merge completed.",
                  {
                    mergedArtifactCount: i.artifacts.length,
                    mergedMessageCount: i.messages.length,
                  },
                ),
                i
              );
            },
            ea = async (e, t) => {
              let r = await K(e);
              if (!r?.id)
                throw Error(
                  "The source tab is not available for bulk summary loading.",
                );
              let n = await ee(r.id, e.platform),
                a = await chrome.tabs.sendMessage(r.id, {
                  action: "AI_EXPORTER_HUB_GET_CONVERSATION_SUMMARIES",
                  chatGptContentMode: e.chatGptContentMode,
                  chatGptGroupChatSyncMode: e.chatGptGroupChatSyncMode,
                  chatGptProjectId: e.chatGptProjectId,
                  chatGptProjectSyncMode: e.chatGptProjectSyncMode,
                  maxCount: t,
                  perplexityContentMode: e.perplexityContentMode,
                  perplexitySelectedSpaceSlugs: e.perplexitySelectedSpaceSlugs,
                  targetSid: n,
                });
              if (!a?.ok || !Array.isArray(a.summaries))
                throw Error(
                  a?.error || "Conversation summaries could not be loaded.",
                );
              return a.summaries;
            },
            eo = async (e, t) => {
              let r = await Y(e, {
                detailMessage: "",
                ...t,
                status:
                  t.status ??
                  (e.progress.failedCount > 0 ? "failed" : "completed"),
              });
              return r;
            },
            ei = async ({
              conversation: e,
              exportedAt: t,
              fileName: r,
              request: n,
            }) => {
              await (0, i.appendExportResultRecord)({
                conversationId: T({
                  conversation: e,
                  platform: n.platform,
                  summary: e.summary,
                }),
                exportedAt: t,
                fileName: r,
                platform: n.platform,
                target: n.target,
                title: e.summary.title,
                type: "success",
                url: e.summary.url,
              });
            },
            es = async ({
              conversationId: e,
              error: t,
              exportedAt: r,
              request: n,
              summary: a,
            }) => {
              await (0, i.appendExportResultRecord)({
                conversationId: T({
                  platform: n.platform,
                  summary: a
                    ? { ...a, id: e }
                    : {
                        accountScope: null,
                        id: e,
                        isSelected: !1,
                        platform: n.platform,
                        tags: [],
                        title: e,
                        updatedAt: null,
                        url: "",
                      },
                }),
                detail: t,
                exportedAt: r,
                platform: n.platform,
                target: n.target,
                title: a?.title ?? e,
                type: "failed",
                url: a?.url,
              });
            },
            el = async ({ job: e, note: t }) => {
              await (0, i.appendExportRunHistory)({
                failedCount: e.progress.failedCount,
                finishedAt: e.updatedAt ?? new Date().toISOString(),
                jobId: e.jobId,
                mode: e.mode,
                note: t,
                platform: e.platform,
                skippedCount: e.progress.skippedCount,
                startedAt: e.startedAt ?? new Date().toISOString(),
                status: e.status,
                successCount: e.progress.completedCount,
                target: e.target,
                totalCount: e.progress.totalCount,
              });
              let r = e.startedAt ?? new Date().toISOString(),
                n = e.updatedAt ?? new Date().toISOString(),
                a = Math.max(new Date(n).getTime() - new Date(r).getTime(), 0);
              (0, d.recordExportRun)({
                clientJobId: e.jobId,
                durationMs: Number.isFinite(a) ? a : null,
                entitlement: e.analyticsEntitlement,
                failedCount: e.progress.failedCount,
                finishedAt: n,
                metadata: t ? { note: t } : void 0,
                mode: e.mode,
                platform: e.platform,
                skippedCount: e.progress.skippedCount,
                startedAt: r,
                status:
                  "failed" === e.status && e.progress.completedCount > 0
                    ? "partial_failed"
                    : e.status,
                successCount: e.progress.completedCount,
                target: e.target,
                totalCount: e.progress.totalCount,
                triggerSource: e.triggerSource ?? "background",
                warningCount: e.warningItems?.length ?? 0,
              });
            },
            ec = (e) => {
              (0, d.recordExportRun)({
                clientJobId: e.jobId,
                entitlement: e.analyticsEntitlement,
                failedCount: 0,
                mode: e.mode,
                platform: e.platform,
                skippedCount: 0,
                startedAt: e.startedAt ?? new Date().toISOString(),
                status: "queued",
                successCount: 0,
                target: e.target,
                totalCount: e.progress.totalCount,
                triggerSource: e.triggerSource ?? "background",
                warningCount: 0,
              });
            },
            eu = async (e) => {
              try {
                return (0, d.buildEntitlementSnapshot)(
                  await (0, p.getBulkExportEntitlement)(e.platform),
                );
              } catch (e) {
                return (
                  console.warn(
                    "[AI Saver][analytics] Entitlement snapshot failed.",
                    { error: e instanceof Error ? e.message : String(e) },
                  ),
                  null
                );
              }
            },
            ep = async (e) => {
              if (m.has(e)) return !0;
              let t = await (0, s.loadActiveExportJob)();
              return (
                t?.jobId === e &&
                !0 === t.cancellationRequested &&
                ("queued" === t.status || "running" === t.status)
              );
            },
            ed = async (e, t = "User cancelled the export operation.") => {
              m.delete(e.jobId);
              let r = await Y(e, {
                cancellationRequested: !1,
                detailMessage: "",
                error: void 0,
                message: "Export cancelled.",
                status: "cancelled",
              });
              return (await el({ job: r, note: t }), r);
            },
            ef = async (e, t) => {
              if (!t.conversation)
                return await Y(e, {
                  error: "Single export requires an active conversation.",
                  message: "Single export could not start.",
                  progress: {
                    completedCount: 0,
                    failedCount: 1,
                    skippedCount: 0,
                    totalCount: 1,
                  },
                  status: "failed",
                });
              e = await Y(e, { analyticsEntitlement: await eu(t) });
              let r = await Y(e, {
                cancellationRequested: !1,
                currentItemTitle: t.conversation.summary.title,
                message: "Single export is running.",
                status: "running",
              });
              try {
                if (await ep(r.jobId)) return await ed(r);
                let e = t.conversation;
                if (er(t))
                  try {
                    console.info(
                      "[AI Saver][single-export] Refreshing conversation detail from source tab.",
                      {
                        conversationId: t.conversation.summary.id,
                        platform: t.platform,
                        target: t.target,
                      },
                    );
                    let r = await et(t, [t.conversation.summary.id]);
                    r[0] &&
                      ((e = t.isCustomPreviewExport
                        ? en({
                            refreshedConversation: r[0],
                            selectedConversation: e,
                          })
                        : r[0]),
                      console.info(
                        "[AI Saver][single-export] Source-tab detail refresh succeeded.",
                        {
                          artifactCount: e.artifacts.length,
                          conversationId: e.summary.id,
                          messageCount: e.messages.length,
                          platform: t.platform,
                          target: t.target,
                        },
                      ));
                  } catch (e) {
                    console.warn(
                      "[AI Saver][single-export] Source-tab detail refresh failed; continuing with popup conversation snapshot.",
                      {
                        conversationId: t.conversation.summary.id,
                        error: e instanceof Error ? e.message : String(e),
                        platform: t.platform,
                        target: t.target,
                      },
                    );
                  }
                if (await ep(r.jobId)) return await ed(r);
                let n = await X(t, e, {
                    onProgress:
                      "notion" === t.target
                        ? async (e) => {
                            r = await Y(r, { message: e });
                          }
                        : void 0,
                  }),
                  a = n.warnings.length
                    ? ` Single export completed with ${n.warnings.length} download warning${1 === n.warnings.length ? "" : "s"}.`
                    : "";
                ((r = await Y(r, {
                  cancellationRequested: !1,
                  completedFiles: [...(r.completedFiles ?? []), n.fileName],
                  message: `Single export completed.${a}`.trim(),
                  progress: {
                    completedCount: 1,
                    failedCount: 0,
                    skippedCount: 0,
                    totalCount: 1,
                  },
                  status: "completed",
                  warningItems: n.warnings.length
                    ? [
                        ...(r.warningItems ?? []),
                        ...n.warnings.map((t) => ({
                          conversationId: e.summary.id,
                          title: e.summary.title,
                          warning: t.message,
                        })),
                      ]
                    : r.warningItems,
                })),
                  await ei({
                    conversation: e,
                    exportedAt: new Date().toISOString(),
                    fileName: n.fileName,
                    request: t,
                  }));
              } catch (e) {
                ((r = await Y(r, {
                  cancellationRequested: !1,
                  error:
                    e instanceof Error ? e.message : "Single export failed.",
                  message: "Single export failed.",
                  progress: {
                    completedCount: 0,
                    failedCount: 1,
                    skippedCount: 0,
                    totalCount: 1,
                  },
                  status: "failed",
                })),
                  await es({
                    conversationId: t.conversation.summary.id,
                    error:
                      e instanceof Error ? e.message : "Single export failed.",
                    exportedAt: new Date().toISOString(),
                    request: t,
                    summary: t.conversation.summary,
                  }));
              }
              return (await el({ job: r }), r);
            },
            eh = async (e, t) => {
              if (await ep(e.jobId)) return await ed(e);
              let r =
                t.conversationIds?.length && t.recentConversations?.length
                  ? t.recentConversations.filter((e) =>
                      t.conversationIds?.includes(e.id),
                    )
                  : "all" === t.bulkScope
                    ? await ea(t, 1e5)
                    : t.recentConversations?.length &&
                        t.recentConversations.length >= (t.bulkLimit ?? 0)
                      ? t.recentConversations.slice(0, t.bulkLimit ?? 28)
                      : await ea(t, t.bulkLimit ?? 28);
              r = D(t, r);
              let n = t.skipPreviouslyExportedRecords
                  ? await (0, i.loadExportHistory)()
                  : null,
                a = new Set(
                  (n?.successRecords ?? [])
                    .filter(
                      (e) => e.platform === t.platform && e.target === t.target,
                    )
                    .map((e) => e.conversationId),
                ),
                o = t.conversationIds ?? r.map((e) => e.id),
                s = new Map(r.map((e) => [e.id, e])),
                l = t.skipPreviouslyExportedRecords
                  ? o.filter((e) => {
                      let r = T({
                        platform: t.platform,
                        summary: s.get(e) ?? {
                          accountScope: null,
                          id: e,
                          isSelected: !1,
                          platform: t.platform,
                          tags: [],
                          title: e,
                          updatedAt: null,
                          url: "",
                        },
                      });
                      return !a.has(r) && !a.has(e);
                    })
                  : o,
                c = o.length - l.length,
                u = await (0, p.getBulkExportEntitlement)(t.platform);
              if (
                ((e = await Y(e, {
                  analyticsEntitlement: (0, d.buildEntitlementSnapshot)(u),
                })),
                !u.canBulkExport)
              ) {
                let t = await eo(e, {
                  error:
                    "free_quota_exhausted" === u.reason
                      ? "Free bulk export quota is exhausted. Upgrade to Pro to continue bulk exporting."
                      : "Bulk export is not available for this account.",
                  message:
                    "free_quota_exhausted" === u.reason
                      ? "Upgrade required for bulk export."
                      : "Bulk export could not start.",
                  progress: {
                    completedCount: 0,
                    failedCount: 0,
                    skippedCount: c,
                    totalCount: o.length,
                  },
                  status: "failed",
                });
                return (
                  await el({
                    job: t,
                    note: `Upgrade at ${p.AIEXPORTHUB_PRICING_URL}`,
                  }),
                  t
                );
              }
              if (
                ("free_quota_available" === u.reason &&
                  u.platformUsage.remainingFreeCount < l.length &&
                  (l = l.slice(0, u.platformUsage.remainingFreeCount)),
                !l.length)
              ) {
                let t = await eo(e, {
                  error:
                    "No recent conversations are available for bulk export.",
                  message:
                    c > 0
                      ? "All matched conversations were skipped because they were already exported successfully."
                      : "Bulk export could not start because no conversations were found.",
                  progress: {
                    completedCount: 0,
                    failedCount: 0,
                    skippedCount: c,
                    totalCount: o.length,
                  },
                  status: c > 0 ? "completed" : "failed",
                });
                return (
                  await el({
                    job: t,
                    note:
                      c > 0
                        ? `Skipped ${c} previously exported conversation(s).`
                        : void 0,
                  }),
                  t
                );
              }
              let f = await Y(e, {
                cancellationRequested: !1,
                conversationIds: l,
                currentItemTitle: r[0]?.title,
                detailMessage: "",
                message: `Bulk export is running for ${l.length} conversations.`,
                progress: {
                  completedCount: 0,
                  failedCount: 0,
                  skippedCount: c,
                  totalCount: l.length,
                },
                status: "running",
              });
              for (let [e, n] of l.entries()) {
                if (await ep(f.jobId))
                  return await ed(
                    f,
                    "User cancelled the export operation. The current item finished before the queue stopped.",
                  );
                let a =
                  n === t.conversation?.summary.id ? t.conversation : null;
                if (!a)
                  try {
                    let e = await et(t, [n]);
                    a = e[0] ?? null;
                  } catch (a) {
                    let r =
                      a instanceof Error ? a.message : `Failed to load ${n}.`;
                    if ("perplexity" === t.platform && F(a)) {
                      ((f = await Y(f, {
                        cancellationRequested: !1,
                        detailMessage:
                          "Perplexity rate limit reached. Increase the shared bulk export delay, wait a few minutes, then retry failed items.",
                        error: "Perplexity rate limit reached.",
                        failedItems: [
                          ...(f.failedItems ?? []),
                          {
                            conversationId: n,
                            error: "Perplexity rate limit reached.",
                            title: s.get(n)?.title ?? n,
                          },
                        ],
                        message:
                          "Perplexity rate limit reached. Bulk export stopped.",
                        progress: {
                          completedCount: f.progress.completedCount,
                          failedCount: f.progress.failedCount + 1,
                          skippedCount: f.progress.skippedCount,
                          totalCount: l.length,
                        },
                      })),
                        await es({
                          conversationId: n,
                          error: r,
                          exportedAt: new Date().toISOString(),
                          request: t,
                          summary: s.get(n),
                        }));
                      let e = await eo(f, {
                        message:
                          "Perplexity rate limit reached. Bulk export stopped; retry failed items later.",
                        status: "failed",
                      });
                      return (
                        await el({
                          job: e,
                          note: "Stopped after Perplexity returned a rate-limit response. Increase the shared bulk export delay before retrying.",
                        }),
                        e.progress.completedCount > 0 &&
                          (await (0, p.consumeBulkExportUsage)({
                            count: e.progress.completedCount,
                            platform: t.platform,
                          }).catch((e) => {
                            console.warn(
                              "[AI Saver][bulk-export] Usage consume failed.",
                              {
                                error:
                                  e instanceof Error ? e.message : String(e),
                              },
                            );
                          })),
                        e
                      );
                    }
                    ((f = await Y(f, {
                      detailMessage: "",
                      error: r,
                      failedItems: [
                        ...(f.failedItems ?? []),
                        {
                          conversationId: n,
                          error: r,
                          title: s.get(n)?.title ?? n,
                        },
                      ],
                      message: `Skipped failed conversation ${e + 1}/${l.length}.`,
                      progress: {
                        completedCount: f.progress.completedCount,
                        failedCount: f.progress.failedCount + 1,
                        skippedCount: f.progress.skippedCount,
                        totalCount: l.length,
                      },
                    })),
                      await es({
                        conversationId: n,
                        error: r,
                        exportedAt: new Date().toISOString(),
                        request: t,
                        summary: s.get(n),
                      }));
                    continue;
                  }
                if (
                  !(a = a ? R({ conversation: a, summary: s.get(n) }) : null)
                ) {
                  ((f = await Y(f, {
                    detailMessage: "",
                    error: `Conversation ${n} could not be loaded.`,
                    failedItems: [
                      ...(f.failedItems ?? []),
                      {
                        conversationId: n,
                        error: `Conversation ${n} could not be loaded.`,
                        title: r.find((e) => e.id === n)?.title ?? n,
                      },
                    ],
                    message: `Skipped missing conversation ${e + 1}/${l.length}.`,
                    progress: {
                      completedCount: f.progress.completedCount,
                      failedCount: f.progress.failedCount + 1,
                      skippedCount: f.progress.skippedCount,
                      totalCount: l.length,
                    },
                  })),
                    await es({
                      conversationId: n,
                      error: `Conversation ${n} could not be loaded.`,
                      exportedAt: new Date().toISOString(),
                      request: t,
                      summary: r.find((e) => e.id === n),
                    }));
                  continue;
                }
                f = await Y(f, {
                  currentItemTitle: a.summary.title,
                  detailMessage: "",
                  message: `Exporting ${e + 1}/${l.length}: ${a.summary.title}`,
                  error: void 0,
                });
                try {
                  let e = await X(t, a, {
                    onProgress:
                      "notion" === t.target
                        ? async (e) => {
                            f = await Y(f, { detailMessage: e });
                          }
                        : void 0,
                  });
                  ((f = await Y(f, {
                    cancellationRequested: !1,
                    completedFiles: [...(f.completedFiles ?? []), e.fileName],
                    detailMessage: "",
                    progress: {
                      completedCount: f.progress.completedCount + 1,
                      failedCount: f.progress.failedCount,
                      skippedCount: f.progress.skippedCount,
                      totalCount: l.length,
                    },
                    warningItems: e.warnings.length
                      ? [
                          ...(f.warningItems ?? []),
                          ...e.warnings.map((e) => ({
                            conversationId: a.summary.id,
                            title: a.summary.title,
                            warning: e.message,
                          })),
                        ]
                      : f.warningItems,
                  })),
                    await ei({
                      conversation: a,
                      exportedAt: new Date().toISOString(),
                      fileName: e.fileName,
                      request: t,
                    }));
                } catch (r) {
                  let e =
                    r instanceof Error
                      ? r.message
                      : `Failed to export ${a.summary.title}.`;
                  if ("perplexity" === t.platform && F(r)) {
                    ((f = await Y(f, {
                      cancellationRequested: !1,
                      detailMessage:
                        "Perplexity rate limit reached. Increase the shared bulk export delay, wait a few minutes, then retry failed items.",
                      error: "Perplexity rate limit reached.",
                      failedItems: [
                        ...(f.failedItems ?? []),
                        {
                          conversationId: a.summary.id,
                          error: "Perplexity rate limit reached.",
                          title: a.summary.title,
                        },
                      ],
                      message:
                        "Perplexity rate limit reached. Bulk export stopped.",
                      progress: {
                        completedCount: f.progress.completedCount,
                        failedCount: f.progress.failedCount + 1,
                        skippedCount: f.progress.skippedCount,
                        totalCount: l.length,
                      },
                    })),
                      await es({
                        conversationId: a.summary.id,
                        error: e,
                        exportedAt: new Date().toISOString(),
                        request: t,
                        summary: a.summary,
                      }));
                    let r = await eo(f, {
                      message:
                        "Perplexity rate limit reached. Bulk export stopped; retry failed items later.",
                      status: "failed",
                    });
                    return (
                      await el({
                        job: r,
                        note: "Stopped after Perplexity returned a rate-limit response. Increase the shared bulk export delay before retrying.",
                      }),
                      r.progress.completedCount > 0 &&
                        (await (0, p.consumeBulkExportUsage)({
                          count: r.progress.completedCount,
                          platform: t.platform,
                        }).catch((e) => {
                          console.warn(
                            "[AI Saver][bulk-export] Usage consume failed.",
                            {
                              error: e instanceof Error ? e.message : String(e),
                            },
                          );
                        })),
                      r
                    );
                  }
                  ((f = await Y(f, {
                    cancellationRequested: !1,
                    detailMessage: "",
                    error: e,
                    failedItems: [
                      ...(f.failedItems ?? []),
                      {
                        conversationId: a.summary.id,
                        error: e,
                        title: a.summary.title,
                      },
                    ],
                    progress: {
                      completedCount: f.progress.completedCount,
                      failedCount: f.progress.failedCount + 1,
                      skippedCount: f.progress.skippedCount,
                      totalCount: l.length,
                    },
                  })),
                    await es({
                      conversationId: a.summary.id,
                      error: e,
                      exportedAt: new Date().toISOString(),
                      request: t,
                      summary: a.summary,
                    }));
                }
                if (e < l.length - 1) {
                  if (await ep(f.jobId))
                    return await ed(
                      f,
                      "User cancelled the export operation. The current item finished before the queue stopped.",
                    );
                  let e = I(t);
                  ((f = await Y(f, {
                    detailMessage: "",
                    message: `Waiting ${e}ms before the next export...`,
                  })),
                    await E(e));
                }
              }
              let h = await eo(f, {
                message:
                  f.progress.failedCount > 0
                    ? "Bulk export finished with partial failures."
                    : f.warningItems?.length
                      ? `Bulk export completed with ${f.warningItems.length} download warning${1 === f.warningItems.length ? "" : "s"}.`
                      : "Bulk export completed successfully.",
                status: f.progress.failedCount > 0 ? "failed" : "completed",
              });
              return (
                await el({
                  job: h,
                  note:
                    c > 0
                      ? `Skipped ${c} previously exported conversation(s).`
                      : void 0,
                }),
                h.progress.completedCount > 0 &&
                  (await (0, p.consumeBulkExportUsage)({
                    count: h.progress.completedCount,
                    platform: t.platform,
                  }).catch((e) => {
                    console.warn(
                      "[AI Saver][bulk-export] Usage consume failed.",
                      { error: e instanceof Error ? e.message : String(e) },
                    );
                  })),
                h
              );
            },
            em = async (e) => {
              if ("single" === e.mode && !e.conversation)
                return {
                  message: "Single export requires an active conversation.",
                  success: !1,
                };
              let t = J(e);
              (m.delete(t.jobId),
                g.add(t.jobId),
                await (0, s.saveActiveExportJob)(t),
                ec(t));
              let r = async () => {
                try {
                  "bulk" === e.mode ? await eh(t, e) : await ef(t, e);
                } catch (r) {
                  let e = await Y(t, {
                    error:
                      r instanceof Error
                        ? r.message
                        : "The export job failed unexpectedly.",
                    message: "The export job failed unexpectedly.",
                    status: "failed",
                  });
                  await el({ job: e });
                }
              };
              return (
                r().finally(() => {
                  g.delete(t.jobId);
                }),
                {
                  jobId: t.jobId,
                  message:
                    "bulk" === e.mode
                      ? "Bulk export started."
                      : "Single export started.",
                  success: !0,
                }
              );
            },
            eg = async (e) => {
              if (!e.conversation)
                return {
                  message: "Custom export requires an active conversation.",
                  success: !1,
                };
              let t = e.conversation;
              try {
                let r = await et(e, [e.conversation.summary.id]);
                r[0] && (t = r[0]);
              } catch (t) {
                console.warn(
                  "[AI Saver][custom-preview] Detail refresh failed; using the current conversation snapshot.",
                  {
                    conversationId: e.conversation.summary.id,
                    error: t instanceof Error ? t.message : String(t),
                    platform: e.platform,
                  },
                );
              }
              let r = await (0, o.saveCustomExportPreview)({
                  conversation: t,
                  platform: e.platform,
                }),
                n = chrome.runtime.getURL(
                  `tabs/custom-preview.html?id=${encodeURIComponent(r.id)}`,
                );
              return {
                message: "Custom export preview is ready.",
                previewId: r.id,
                previewUrl: n,
                success: !0,
              };
            },
            eb = async () => {
              let e = await (0, s.loadActiveExportJob)();
              (e?.jobId && m.delete(e.jobId),
                await (0, s.clearActiveExportJob)());
            },
            ex = async (e = {}) => {
              let t = await (0, s.loadActiveExportJob)();
              if (
                !t ||
                (!e.force && g.has(t.jobId)) ||
                ("queued" !== t.status && "running" !== t.status)
              )
                return;
              (m.add(t.jobId), g.delete(t.jobId));
              let r = await Y(t, {
                cancellationRequested: !1,
                error:
                  "The previous export was stopped when the export UI was reopened. Start a new export to retry.",
                message: "Previous export stopped.",
                status: "failed",
              });
              await el({
                job: r,
                note: e.force
                  ? "Stopped a stale export job after the export UI was reopened."
                  : "Recovered an interrupted export job after the extension restarted.",
              });
            },
            ey = async () => {
              let e = await (0, s.loadActiveExportJob)();
              return e
                ? "queued" !== e.status && "running" !== e.status
                  ? {
                      message:
                        "Only queued or running export jobs can be cancelled.",
                      success: !1,
                    }
                  : (m.add(e.jobId),
                    await (0, s.saveActiveExportJob)({
                      ...e,
                      cancellationRequested: !0,
                      message:
                        "Cancellation requested. Waiting for the current step to finish.",
                      updatedAt: new Date().toISOString(),
                    }),
                    {
                      jobId: e.jobId,
                      message: "Cancellation requested.",
                      success: !0,
                    })
                : {
                    message: "No export job is available to cancel.",
                    success: !1,
                  };
            },
            ev = async () => {
              let e = await (0, s.loadActiveExportJob)();
              if (!e)
                return {
                  message: "No export job is available to retry.",
                  success: !1,
                };
              if (!e.failedItems?.length)
                return {
                  message: "There are no failed items to retry.",
                  success: !1,
                };
              let t = e.failedItems.map((t) => ({
                id: t.conversationId,
                isSelected: !0,
                platform: e.platform,
                tags: [],
                title: t.title,
                updatedAt: null,
                url: "",
              }));
              return await em({
                bulkLimit: t.length,
                conversationIds: t.map((e) => e.id),
                mode: "bulk",
                platform: e.platform,
                preferences: e.preferences,
                recentConversations: t,
                target: e.target,
              });
            };
        },
        {
          "~background/notion": "6vXVe",
          "~core/storage/custom-export-preview": "leRfU",
          "~core/storage/export-history": "h6NML",
          "~core/storage/export-job": "6WwUz",
          "~exporters/markdown/assets": "kOwrn",
          "~exporters/markdown/formatter": "fvLbt",
          "~exporters/pdf/formatter": "bM5KP",
          "~lib/aisaver-account-api": "bZjEH",
          "~lib/aisaver-analytics-api": "8vI1w",
          "~lib/filename": "geggU",
          "~lib/platform-tabs": "aHwT0",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "6vXVe": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "getNotionConnectionState", () => ea),
            n.export(r, "startNotionAuthorization", () => eo),
            n.export(r, "refreshNotionDatabases", () => ei),
            n.export(r, "saveNotionConnection", () => es),
            n.export(r, "selectNotionDatabase", () => el),
            n.export(r, "disconnectNotion", () => ec),
            n.export(r, "exportConversationToNotion", () => eu));
          var a = e("~background/notion-markdown"),
            o = e("~core/storage/notion"),
            i = e("~core/types/export"),
            s = e("~lib/conversation-artifact-dedup"),
            l = e("~lib/conversation-title"),
            c = e("~lib/conversation-export-metadata");
          let u = 1800,
            p = 100,
            d = "ai-exporter-hub:notion-debug-failures",
            f =
              "https://chatgptsave.notion.site/AI-Chats-hub-Rediret-Page-32410052f0c880468e50e88dbb2530d9",
            h = `https://api.notion.com/v1/oauth/authorize?client_id=324d872b-594c-819d-8f47-0037fe8c4af1&response_type=code&owner=user&redirect_uri=${encodeURIComponent(f)}`,
            m = async (e) =>
              await new Promise((t) => {
                setTimeout(t, e);
              }),
            g = (e) => JSON.parse(JSON.stringify(e)),
            b = (e) => ({
              Authorization: `Bearer ${e}`,
              "Content-Type": "application/json",
              "Notion-Version": "2022-06-28",
            }),
            x = (e, t) => {
              let r =
                  "string" == typeof t?.message && t.message.trim()
                    ? t.message.trim()
                    : `Notion request failed with status ${e}.`,
                n =
                  "string" == typeof t?.code && t.code.trim()
                    ? t.code.trim()
                    : "",
                a =
                  "string" == typeof t?.request_id && t.request_id.trim()
                    ? t.request_id.trim()
                    : "";
              return [r, n ? `code: ${n}` : "", a ? `request_id: ${a}` : ""]
                .filter(Boolean)
                .join("\n");
            },
            y = (e) => {
              let t = e.toLowerCase();
              return (
                t.includes("invalid image url") ||
                (t.includes("image") &&
                  t.includes("valid url") &&
                  t.includes("validation"))
              );
            },
            v = (e) =>
              e.map((e) => {
                if (!e || "object" != typeof e || "string" != typeof e.type)
                  return e;
                if (
                  "image" === e.type &&
                  e.image?.type === "external" &&
                  e.image?.external?.url
                )
                  return {
                    bookmark: { url: e.image.external.url },
                    object: "block",
                    type: "bookmark",
                  };
                let t = e[e.type];
                return Array.isArray(t?.children)
                  ? { ...g(e), [e.type]: { ...g(t), children: v(t.children) } }
                  : g(e);
              }),
            k = async ({
              batch: e,
              batchIndex: t,
              blockId: r,
              error: n,
              pageTitle: a,
              requestPath: o,
            }) => {
              let i = {
                batch: e,
                batchIndex: t,
                blockId: r,
                error: n,
                pageTitle: a,
                recordedAt: new Date().toISOString(),
                requestPath: o,
              };
              try {
                let e = await chrome.storage.local.get(d),
                  t = e[d] ?? [];
                await chrome.storage.local.set({ [d]: [i, ...t].slice(0, 20) });
              } catch (e) {
                console.warn(
                  "[AI Saver][notion] Failed to persist Notion debug failure payload.",
                  {
                    blockId: r,
                    error: e instanceof Error ? e.message : String(e),
                    pageTitle: a,
                  },
                );
              }
            },
            w = (e) =>
              e
                ?.map((e) => e.plain_text ?? "")
                .join("")
                .trim() ?? "",
            _ = (e) =>
              e
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, " ")
                .trim(),
            A = {
              chatgpt: "ChatGPT",
              claude: "Claude",
              gemini: "Gemini",
              perplexity: "Perplexity",
            },
            C = {
              chatgpt: "ChatGPT",
              claude: "ClaudeAI",
              gemini: "Gemini",
              perplexity: "PerplexityAI",
            },
            E = (e, t = u) => {
              let r = e.replace(/\r\n/g, "\n").trim();
              if (!r) return [];
              let n = [];
              for (let e of r.split(/\n{2,}/)) {
                let r = e.trim();
                if (!r) continue;
                if (r.length <= t) {
                  n.push(r);
                  continue;
                }
                let a = 0;
                for (; a < r.length;)
                  (n.push(r.slice(a, a + t).trim()), (a += t));
              }
              return n.filter(Boolean);
            },
            j = (e) =>
              e.reduce((e, t) => {
                if (!t || "object" != typeof t || "string" != typeof t.type)
                  return e;
                let r = t[t.type]?.children;
                return e + 1 + (Array.isArray(r) ? j(r) : 0);
              }, 0),
            I = (e, t = p) => {
              let r = [],
                n = [],
                a = 0;
              for (let o of e) {
                let e = j([o]);
                (n.length > 0 && a + e > t && (r.push(n), (n = []), (a = 0)),
                  n.push(o),
                  (a += e));
              }
              return (n.length > 0 && r.push(n), r);
            },
            S = ({ chunkCount: e, messagesPerPage: t }) => [
              {
                callout: {
                  color: "blue_background",
                  icon: { emoji: "\uD83D\uDDC2\ufe0f", type: "emoji" },
                  rich_text: F(
                    `This conversation was split into ${e} pages to keep Notion fast and stable.`,
                  ),
                },
                object: "block",
                type: "callout",
              },
              {
                paragraph: {
                  rich_text: F(
                    `Messages per page: ${t}. Open the child pages below to view each part.`,
                  ),
                },
                object: "block",
                type: "paragraph",
              },
            ],
            D = ({
              conversation: e,
              endIndex: t,
              pageTitle: r,
              partNumber: n,
              totalParts: a,
              startIndex: o,
            }) => {
              let i = e.messages.slice(o, t),
                s = new Set(i.map((e) => e.id)),
                l = 1 === n;
              return {
                ...e,
                artifacts: e.artifacts.filter((e) =>
                  e.sourceMessageId ? s.has(e.sourceMessageId) : l,
                ),
                attachments: l ? e.attachments : [],
                messages: i,
                metadata: {
                  ...e.metadata,
                  messageCount: i.length,
                  notionSplitPartCount: a,
                  notionSplitPartNumber: n,
                },
                summary: { ...e.summary, title: `${r} (Part ${n}/${a})` },
              };
            },
            F = (e, t) =>
              e
                ? [
                    {
                      text: { content: e, ...(t ? { link: { url: t } } : {}) },
                      type: "text",
                    },
                  ]
                : [],
            T = (e) =>
              E(e)
                .slice(0, 8)
                .flatMap((e) => F(e)),
            R = async (e) => {
              let t = await fetch(
                "https://cfnodeapi.chatgpt2notion.com/api/getnotiontoken4common",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    code: e,
                    grant_type: "authorization_code",
                    redirect_uri: f,
                    source_type: "4_AIChatsHub_To_Notiom",
                  }),
                },
              );
              if (!t.ok)
                throw Error("The legacy Notion token exchange failed.");
              let r = await t.json(),
                n = r?.data ?? r;
              if (!n?.access_token)
                throw Error(
                  "Notion authorization did not return an access token.",
                );
              return {
                accessToken: n.access_token,
                userEmail: n.owner?.user?.person?.email ?? "",
                workspaceId: n.workspace_id ?? "",
                workspaceName: n.workspace_name ?? "",
              };
            },
            P = async (e) =>
              await new Promise((t, r) => {
                let n = !1,
                  a = setTimeout(() => {
                    (o(), r(Error("Notion authorization timed out.")));
                  }, 18e4),
                  o = () => {
                    n ||
                      ((n = !0),
                      clearTimeout(a),
                      chrome.tabs.onUpdated.removeListener(s),
                      chrome.tabs.onRemoved.removeListener(l));
                  },
                  i = async (n) => {
                    if (!n || !n.startsWith(f)) return;
                    let a = new URL(n),
                      i = a.searchParams.get("code"),
                      s = a.searchParams.get("error");
                    if (s) {
                      (o(), r(Error(`Notion authorization failed: ${s}`)));
                      return;
                    }
                    if (i) {
                      o();
                      try {
                        await chrome.tabs.remove(e);
                      } catch {}
                      t(i);
                    }
                  },
                  s = (t, r, n) => {
                    t === e && i(r.url ?? n.url);
                  },
                  l = (t) => {
                    t === e &&
                      (o(),
                      r(
                        Error(
                          "The Notion authorization tab was closed before completion.",
                        ),
                      ));
                  };
                (chrome.tabs.onUpdated.addListener(s),
                  chrome.tabs.onRemoved.addListener(l),
                  chrome.tabs.get(e, (e) => {
                    if (chrome.runtime.lastError) {
                      (o(), r(Error(chrome.runtime.lastError.message)));
                      return;
                    }
                    i(e?.url);
                  }));
              }),
            L = (e) => {
              if (!e) return null;
              let t = new Date(e);
              return Number.isNaN(t.getTime()) ? null : t.toISOString();
            },
            O = ({
              allowedTypes: e,
              exactNames: t,
              fuzzyNames: r,
              properties: n,
              usedPropertyNames: a,
            }) => {
              let o = Object.entries(n).filter(
                  ([t, r]) => !a.has(t) && !!(r.type && e.includes(r.type)),
                ),
                i = new Set(t.map(_)),
                s = o.find(([e]) => i.has(_(e)));
              return (
                s ||
                (r?.length
                  ? (o.find(([e]) => {
                      let t = _(e);
                      return r.some((e) => t.includes(_(e)));
                    }) ?? null)
                  : null)
              );
            },
            N = (e, t) => {
              let r = _(t),
                n =
                  "select" === e.type
                    ? e.select?.options
                    : "status" === e.type
                      ? e.status?.options
                      : "multi_select" === e.type
                        ? e.multi_select?.options
                        : [];
              return n?.find((e) => _(e.name ?? "") === r)?.name ?? null;
            },
            M = (e, t) =>
              t.trim()
                ? "title" === e
                  ? { title: T(t) }
                  : "rich_text" === e
                    ? { rich_text: T(t) }
                    : "url" === e
                      ? { url: t }
                      : null
                : null,
            B = (e, t) =>
              "number" === e
                ? { number: t }
                : "rich_text" === e
                  ? { rich_text: T(String(t)) }
                  : null,
            z = (e, t) => {
              let r = L(t);
              return r
                ? "date" === e
                  ? { date: { start: r } }
                  : "rich_text" === e
                    ? { rich_text: T(r) }
                    : null
                : null;
            },
            q = (e, t) => {
              let r = t.trim();
              if (!r) return null;
              let n = N(e, r),
                a = n ?? r;
              return n || "status" !== e.type
                ? "select" === e.type
                  ? { select: { name: a } }
                  : "status" === e.type
                    ? { status: { name: a } }
                    : "multi_select" === e.type
                      ? { multi_select: [{ name: a }] }
                      : null
                : null;
            },
            $ = (e, t) => {
              let r = Array.from(
                new Set(t.map((e) => e.trim()).filter((e) => !!e)),
              );
              return r.length
                ? "multi_select" === e.type
                  ? { multi_select: r.map((t) => ({ name: N(e, t) ?? t })) }
                  : "rich_text" === e.type
                    ? M("rich_text", r.join(", "))
                    : null
                : null;
            },
            U = async ({
              accessToken: e,
              body: t,
              metrics: r,
              method: n,
              path: a,
            }) => {
              (r?.entries.push(`${n} ${a}`), r && (r.totalRequests += 1));
              let o = await fetch(`https://api.notion.com${a}`, {
                body: t ? JSON.stringify(t) : void 0,
                headers: b(e),
                method: n,
              });
              if (!o.ok) {
                let e = await o.json().catch(() => null);
                throw Error(x(o.status, e));
              }
              return await o.json();
            },
            H = async (e) => {
              let t = await U({
                accessToken: e,
                body: {
                  filter: { property: "object", value: "database" },
                  page_size: 20,
                },
                method: "POST",
                path: "/v1/search",
              });
              return (t.results ?? [])
                .filter((e) => !!e.id)
                .map((e) => ({
                  id: e.id,
                  title: w(e.title) || "Untitled Database",
                  url: e.url,
                }));
            },
            Q = async (e, t) => {
              let r = await U({
                accessToken: e,
                method: "GET",
                path: `/v1/databases/${t}`,
              });
              return w(r.title) || "Selected Database";
            },
            G = async (e, t, r) => {
              let n = await U({
                accessToken: e,
                metrics: r,
                method: "GET",
                path: `/v1/databases/${t}`,
              });
              return {
                databaseTitle: w(n.title) || "Selected Database",
                properties: n.properties ?? {},
                titlePropertyName:
                  Object.entries(n.properties ?? {}).find(
                    ([, e]) => "title" === e.type,
                  )?.[0] ?? "Name",
              };
            },
            V = async ({
              accessToken: e,
              databaseId: t,
              metrics: r,
              schema: n,
            }) => {
              let a = new Set(Object.keys(n.properties).map((e) => _(e))),
                o = Object.fromEntries(
                  [
                    {
                      aliases: ["createdat", "created at"],
                      name: "Created At",
                      schema: { date: {} },
                    },
                    {
                      aliases: ["updatedat", "updated at"],
                      name: "Updated At",
                      schema: { date: {} },
                    },
                    {
                      aliases: ["exportedat", "exported at"],
                      name: "Exported At",
                      schema: { date: {} },
                    },
                    {
                      aliases: ["messagecount", "message count", "messages"],
                      name: "Message Count",
                      schema: { number: { format: "number" } },
                    },
                    {
                      aliases: ["platform", "source platform", "ai platform"],
                      name: "Platform",
                      schema: { select: { options: [] } },
                    },
                    {
                      aliases: [
                        "sourceurl",
                        "source url",
                        "url",
                        "conversation url",
                        "chat url",
                      ],
                      name: "Source URL",
                      schema: { url: {} },
                    },
                    {
                      aliases: [
                        "sourceid",
                        "source id",
                        "uuid",
                        "conversation id",
                        "thread id",
                      ],
                      name: "Source ID",
                      schema: { rich_text: {} },
                    },
                    {
                      aliases: ["model", "ai model", "source model"],
                      name: "Model",
                      schema: { select: { options: [] } },
                    },
                    {
                      aliases: ["mode", "answer mode", "copilot mode"],
                      name: "Mode",
                      schema: { select: { options: [] } },
                    },
                    {
                      aliases: [
                        "projectname",
                        "project name",
                        "project",
                        "gpt project",
                      ],
                      name: "Project",
                      schema: { select: { options: [] } },
                    },
                    {
                      aliases: [
                        "workspace",
                        "space",
                        "space name",
                        "collection",
                        "collection title",
                      ],
                      name: "Workspace",
                      schema: { select: { options: [] } },
                    },
                    {
                      aliases: ["tags", "tag", "labels"],
                      name: "Tags",
                      schema: { multi_select: { options: [] } },
                    },
                  ]
                    .filter(
                      ({ aliases: e, name: t }) =>
                        ![t, ...e].some((e) => a.has(_(e))),
                    )
                    .map(({ name: e, schema: t }) => [e, t]),
                );
              if (!Object.keys(o).length) return n;
              try {
                return (
                  await U({
                    accessToken: e,
                    body: { properties: o },
                    metrics: r,
                    method: "PATCH",
                    path: `/v1/databases/${t}`,
                  }),
                  await G(e, t, r)
                );
              } catch (e) {
                return (
                  console.warn(
                    "[AI Saver][notion] Failed to extend Notion database schema.",
                    {
                      databaseId: t,
                      error: e instanceof Error ? e.message : String(e),
                      missingProperties: Object.keys(o),
                    },
                  ),
                  n
                );
              }
            },
            W = (e) =>
              O({
                allowedTypes: ["url", "rich_text"],
                exactNames: [
                  "source url",
                  "sourceurl",
                  "conversation url",
                  "chat url",
                  "url",
                ],
                fuzzyNames: ["source", "conversation", "link"],
                properties: e,
                usedPropertyNames: new Set(),
              }),
            Z = async ({
              accessToken: e,
              conversationUrl: t,
              databaseId: r,
              databaseProperties: n,
              metrics: a,
            }) => {
              let o = W(n);
              if (!o) return null;
              let [i, s] = o,
                l =
                  "url" === s.type
                    ? { property: i, url: { equals: t } }
                    : "rich_text" === s.type
                      ? { property: i, rich_text: { equals: t } }
                      : null;
              if (!l) return null;
              let c = await U({
                accessToken: e,
                body: { filter: l, page_size: 20 },
                metrics: a,
                method: "POST",
                path: `/v1/databases/${r}/query`,
              });
              return (c.results ?? []).filter((e) => !!e.id);
            },
            X = async ({
              accessToken: e,
              blockId: t,
              children: r,
              metrics: n,
              onProgress: a,
              pageTitle: o,
            }) => {
              let i = I(r);
              for (let [s, l] of (console.info(
                "[AI Saver][notion] Appending conversation blocks",
                {
                  batchCount: i.length,
                  blockId: t,
                  pageTitle: o,
                  totalBlocks: j(r),
                  topLevelBlocks: r.length,
                },
              ),
              i.entries())) {
                let r = `/v1/blocks/${t}/children`;
                (await a?.(
                  `Exporting to Notion: Appending block batch ${s + 1}/${i.length}.`,
                ),
                  console.info("[AI Saver][notion] Appending block batch", {
                    batchIndex: s + 1,
                    batchSize: l.length,
                    batchTotalBlocks: j(l),
                    blockId: t,
                    pageTitle: o,
                    totalBatches: i.length,
                  }));
                try {
                  await U({
                    accessToken: e,
                    body: { children: l },
                    metrics: n,
                    method: "PATCH",
                    path: r,
                  });
                } catch (u) {
                  let c = u instanceof Error ? u.message : String(u);
                  if (
                    (await k({
                      batch: l,
                      batchIndex: s,
                      blockId: t,
                      error: c,
                      pageTitle: o,
                      requestPath: r,
                    }),
                    y(c))
                  ) {
                    let c = v(l);
                    (console.warn(
                      "[AI Saver][notion] Retrying failed batch after converting external images to bookmarks.",
                      {
                        batchIndex: s + 1,
                        blockId: t,
                        pageTitle: o,
                        totalBatches: i.length,
                      },
                    ),
                      await a?.(
                        `Exporting to Notion: retrying batch ${s + 1}/${i.length} with image link fallbacks.`,
                      ),
                      await U({
                        accessToken: e,
                        body: { children: c },
                        metrics: n,
                        method: "PATCH",
                        path: r,
                      }));
                  } else throw u;
                }
                s < i.length - 1 &&
                  (await a?.(
                    "Exporting to Notion: waiting 250ms before the next batch.",
                  ),
                  await m(250));
              }
            },
            J = ({
              conversation: e,
              databaseProperties: t,
              pageTitle: r,
              platform: n,
              titlePropertyName: o,
            }) => {
              let i = { [o]: { title: T(r) } },
                s = new Set([o]),
                l = A[n],
                p = C[n],
                d = (0, c.getConversationExportMetadata)(e),
                f = (0, a.sanitizeNotionUrl)(d.sourceUrl) ?? "",
                h = e.messages.find((e) => e.content.trim())?.content ?? "",
                m = h.slice(0, u),
                g = ({
                  allowedTypes: e,
                  exactNames: r,
                  fuzzyNames: n,
                  valueBuilder: a,
                }) => {
                  let o = O({
                    allowedTypes: e,
                    exactNames: r,
                    fuzzyNames: n,
                    properties: t,
                    usedPropertyNames: s,
                  });
                  if (!o) return;
                  let [l, c] = o,
                    u = a(c);
                  u && ((i[l] = u), s.add(l));
                };
              return (
                g({
                  allowedTypes: ["url", "rich_text"],
                  exactNames: [
                    "source url",
                    "sourceurl",
                    "conversation url",
                    "chat url",
                    "url",
                  ],
                  fuzzyNames: ["source", "conversation", "link"],
                  valueBuilder: (e) => M(e.type ?? "", f),
                }),
                g({
                  allowedTypes: [
                    "select",
                    "status",
                    "multi_select",
                    "rich_text",
                  ],
                  exactNames: ["platform", "source platform", "ai platform"],
                  fuzzyNames: ["platform"],
                  valueBuilder: (e) =>
                    "rich_text" === e.type ? M("rich_text", l) : q(e, l),
                }),
                g({
                  allowedTypes: ["multi_select", "rich_text"],
                  exactNames: ["tags", "tag", "labels"],
                  fuzzyNames: ["tag", "label"],
                  valueBuilder: (e) => $(e, [p, ...d.tags]),
                }),
                g({
                  allowedTypes: ["rich_text", "select", "multi_select"],
                  exactNames: [
                    "projectname",
                    "project name",
                    "project",
                    "gpt project",
                  ],
                  fuzzyNames: ["project"],
                  valueBuilder: (t) => {
                    let r =
                      "string" == typeof e.metadata.projectName
                        ? e.metadata.projectName.trim()
                        : "";
                    return r
                      ? "rich_text" === t.type
                        ? M("rich_text", r)
                        : q(t, r)
                      : null;
                  },
                }),
                g({
                  allowedTypes: ["date", "rich_text"],
                  exactNames: [
                    "createdat",
                    "created at",
                    "conversation created at",
                    "source created at",
                  ],
                  fuzzyNames: ["created"],
                  valueBuilder: (e) => z(e.type ?? "", d.createdAt || null),
                }),
                g({
                  allowedTypes: ["date", "rich_text"],
                  exactNames: [
                    "updatedat",
                    "updated at",
                    "conversation updated at",
                    "source updated at",
                  ],
                  fuzzyNames: ["updated"],
                  valueBuilder: (e) => z(e.type ?? "", d.updatedAt || null),
                }),
                g({
                  allowedTypes: ["date", "rich_text"],
                  exactNames: [
                    "exportedat",
                    "exported at",
                    "export date",
                    "synced at",
                  ],
                  fuzzyNames: ["exported", "synced"],
                  valueBuilder: (e) =>
                    z(e.type ?? "", d.exportedAt || new Date().toISOString()),
                }),
                g({
                  allowedTypes: ["number", "rich_text"],
                  exactNames: [
                    "messagecount",
                    "message count",
                    "messages",
                    "messages count",
                  ],
                  fuzzyNames: ["message"],
                  valueBuilder: (e) => B(e.type ?? "", d.messageCount),
                }),
                g({
                  allowedTypes: ["rich_text"],
                  exactNames: [
                    "source id",
                    "sourceid",
                    "conversation id",
                    "conversationid",
                    "thread id",
                    "uuid",
                  ],
                  fuzzyNames: ["source id", "thread id", "uuid"],
                  valueBuilder: (e) => M(e.type ?? "", d.sourceId),
                }),
                g({
                  allowedTypes: ["rich_text", "select", "multi_select"],
                  exactNames: ["model", "ai model", "source model"],
                  fuzzyNames: ["model"],
                  valueBuilder: (e) =>
                    d.model
                      ? "rich_text" === e.type
                        ? M("rich_text", d.model)
                        : q(e, d.model)
                      : null,
                }),
                g({
                  allowedTypes: ["rich_text", "select", "multi_select"],
                  exactNames: ["mode", "answer mode", "copilot mode"],
                  fuzzyNames: ["mode"],
                  valueBuilder: (e) =>
                    d.mode
                      ? "rich_text" === e.type
                        ? M("rich_text", d.mode)
                        : q(e, d.mode)
                      : null,
                }),
                g({
                  allowedTypes: ["rich_text", "select", "multi_select"],
                  exactNames: [
                    "workspace",
                    "space",
                    "space name",
                    "collection",
                    "collection title",
                  ],
                  fuzzyNames: ["workspace", "space", "collection"],
                  valueBuilder: (e) =>
                    d.space
                      ? "rich_text" === e.type
                        ? M("rich_text", d.space)
                        : q(e, d.space)
                      : null,
                }),
                g({
                  allowedTypes: ["number", "rich_text"],
                  exactNames: ["attachment count", "attachments"],
                  fuzzyNames: ["attachment"],
                  valueBuilder: (t) => B(t.type ?? "", e.attachments.length),
                }),
                g({
                  allowedTypes: ["number", "rich_text"],
                  exactNames: ["artifact count", "artifacts"],
                  fuzzyNames: ["artifact"],
                  valueBuilder: (t) => B(t.type ?? "", e.artifacts.length),
                }),
                g({
                  allowedTypes: ["rich_text"],
                  exactNames: ["summary", "excerpt", "preview"],
                  fuzzyNames: ["summary", "excerpt", "preview"],
                  valueBuilder: () => M("rich_text", m),
                }),
                i
              );
            },
            Y = async ({
              accessToken: e,
              databaseId: t,
              metrics: r,
              properties: n,
            }) =>
              await U({
                accessToken: e,
                body: { parent: { database_id: t }, properties: n },
                metrics: r,
                method: "POST",
                path: "/v1/pages",
              }),
            K = async ({
              accessToken: e,
              metrics: t,
              parentPageId: r,
              title: n,
            }) =>
              await U({
                accessToken: e,
                body: {
                  parent: { page_id: r },
                  properties: { title: { title: T(n.slice(0, 120)) } },
                },
                metrics: t,
                method: "POST",
                path: "/v1/pages",
              }),
            ee = (e) => e.replace(/^\d{4}-\d{2}-\d{2}[-_\s]+/, "").trim(),
            et = (e) =>
              (0, l.normalizeConversationTitle)(ee(e.summary.title || ""), {
                fallback: "Untitled Conversation",
                maxLength: 120,
              }),
            er = async ({
              accessToken: e,
              conversation: t,
              metrics: r,
              onProgress: n,
              parentPageId: o,
            }) => {
              let { distinctArtifacts: i, duplicateArtifacts: l } = (0,
              s.splitArtifactsByDuplicateMessageContent)({
                artifacts: t.artifacts.filter(
                  (e) => e.content?.trim() && e.sourceMessageId,
                ),
                messages: t.messages,
              });
              if (!i.length)
                return (
                  l.length &&
                    console.info(
                      "[AI Saver][notion] Skipped duplicate artifact child pages.",
                      {
                        conversationId: t.summary.id,
                        duplicateArtifactCount: l.length,
                      },
                    ),
                  {}
                );
              console.info("[AI Saver][notion] Creating artifact child pages", {
                artifactCount: i.length,
                conversationId: t.summary.id,
                duplicateArtifactCount: l.length,
                parentPageId: o,
              });
              let c = {};
              for (let s of i)
                try {
                  let i = await K({
                      accessToken: e,
                      metrics: r,
                      parentPageId: o,
                      title: s.label || "Linked Artifact",
                    }),
                    l = (0, a.buildArtifactChildPageBlocks)({
                      artifact: s,
                      baseUrl: t.summary.url,
                    });
                  l.length &&
                    (await X({
                      accessToken: e,
                      blockId: i.id,
                      children: l,
                      metrics: r,
                      onProgress: n,
                      pageTitle: s.label || "Linked Artifact",
                    }));
                  let u = s.sourceMessageId;
                  c[u] = [...(c[u] ?? []), i.id];
                } catch (e) {
                  console.warn(
                    "[AI Saver][notion] Failed to create artifact child page",
                    {
                      artifactId: s.id,
                      artifactLabel: s.label,
                      conversationId: t.summary.id,
                      error: e instanceof Error ? e.message : String(e),
                    },
                  );
                }
              return c;
            },
            en = async ({ accessToken: e, metrics: t, pageId: r }) =>
              await U({
                accessToken: e,
                body: { in_trash: !0 },
                metrics: t,
                method: "PATCH",
                path: `/v1/pages/${r}`,
              }),
            ea = async () => await (0, o.loadNotionState)(),
            eo = async () => {
              let e = await chrome.tabs.create({ active: !0, url: h });
              if (!e.id)
                return {
                  ...(await (0, o.loadNotionState)()),
                  error: "The Notion authorization tab could not be opened.",
                  status: "error",
                };
              try {
                let t = await P(e.id),
                  r = await R(t),
                  n = await H(r.accessToken),
                  a = n[0]?.id ?? "",
                  i = n[0]?.title ?? "";
                return {
                  ...(await (0, o.saveNotionState)({
                    accessToken: r.accessToken,
                    authenticated: !0,
                    databaseId: a,
                    databaseTitle: i,
                    databases: n,
                    status: "connected",
                    userEmail: r.userEmail,
                    workspaceId: r.workspaceId,
                    workspaceName: r.workspaceName,
                  })),
                  error: "",
                };
              } catch (e) {
                return {
                  ...(await (0, o.loadNotionState)()),
                  error:
                    e instanceof Error
                      ? e.message
                      : "Notion authorization could not be completed.",
                  status: "error",
                };
              }
            },
            ei = async () => {
              let e = await (0, o.loadNotionCredentials)();
              if (!e.accessToken)
                return {
                  ...(await (0, o.loadNotionState)()),
                  error: "Connect Notion first.",
                  status: "disconnected",
                };
              try {
                let t = await H(e.accessToken),
                  r = e.databaseId
                    ? (t.find((t) => t.id === e.databaseId)?.title ??
                      e.databaseTitle)
                    : "";
                return {
                  ...(await (0, o.saveNotionState)({
                    accessToken: e.accessToken,
                    authenticated: e.authenticated,
                    databaseId: e.databaseId,
                    databaseTitle: r,
                    databases: t,
                    status: "connected",
                    userEmail: e.userEmail,
                    workspaceId: e.workspaceId,
                    workspaceName: e.workspaceName,
                  })),
                  error: "",
                };
              } catch (e) {
                return {
                  ...(await (0, o.loadNotionState)()),
                  error:
                    e instanceof Error
                      ? e.message
                      : "Notion databases could not be loaded.",
                  status: "error",
                };
              }
            },
            es = async (e) => {
              let t = await (0, o.loadNotionCredentials)(),
                r = e.accessToken.trim() || t.accessToken,
                n = e.databaseId?.trim() ?? "";
              if (!r)
                return {
                  ...(await (0, o.loadNotionState)()),
                  error: "A Notion integration token is required.",
                  status: "error",
                };
              try {
                let e = await H(r),
                  a = n ? await Q(r, n) : (e[0]?.title ?? "");
                return {
                  ...(await (0, o.saveNotionState)({
                    accessToken: r,
                    authenticated: t.authenticated || !!r,
                    databaseId: n,
                    databaseTitle: a,
                    databases: e,
                    status: "connected",
                    userEmail: t.userEmail,
                    workspaceId: t.workspaceId,
                    workspaceName: t.workspaceName,
                  })),
                  error: "",
                };
              } catch (e) {
                return {
                  ...(await (0, o.loadNotionState)()),
                  error:
                    e instanceof Error
                      ? e.message
                      : "Notion configuration could not be saved.",
                  status: "error",
                };
              }
            },
            el = async (e) => {
              let t = await (0, o.loadNotionCredentials)();
              if (!t.accessToken)
                return {
                  ...(await (0, o.loadNotionState)()),
                  error: "Connect Notion first.",
                  status: "disconnected",
                };
              try {
                let r = await Q(t.accessToken, e);
                return {
                  ...(await (0, o.saveNotionState)({
                    accessToken: t.accessToken,
                    authenticated: t.authenticated,
                    databaseId: e,
                    databaseTitle: r,
                    databases: t.databases,
                    status: "connected",
                    userEmail: t.userEmail,
                    workspaceId: t.workspaceId,
                    workspaceName: t.workspaceName,
                  })),
                  error: "",
                };
              } catch (e) {
                return {
                  ...(await (0, o.loadNotionState)()),
                  error:
                    e instanceof Error
                      ? e.message
                      : "The selected Notion database could not be saved.",
                  status: "error",
                };
              }
            },
            ec = async () => (
              await (0, o.clearNotionState)(),
              await (0, o.loadNotionState)()
            ),
            eu = async ({
              conversation: e,
              onProgress: t,
              platform: r,
              preferences: n,
            }) => {
              let s, l, u;
              let p = await (0, o.loadNotionCredentials)();
              if (!p.accessToken)
                throw Error(
                  "A Notion integration token is required before export.",
                );
              if (!p.databaseId)
                throw Error(
                  "Select a Notion database before running the export.",
                );
              let d = { entries: [], totalRequests: 0 },
                f = await G(p.accessToken, p.databaseId, d);
              f = await V({
                accessToken: p.accessToken,
                databaseId: p.databaseId,
                metrics: d,
                schema: f,
              });
              let { databaseTitle: h, properties: m, titlePropertyName: g } = f;
              try {
                ((s = et(e)),
                  (l = J({
                    conversation: e,
                    databaseProperties: m,
                    pageTitle: s,
                    platform: r,
                    titlePropertyName: g,
                  })));
              } catch (t) {
                throw (
                  console.error(
                    "[AI Saver][notion] Failed while preparing page title or properties.",
                    {
                      conversationId: e.summary.id,
                      error: t instanceof Error ? t.message : String(t),
                      platform: r,
                      title: e.summary.title,
                    },
                  ),
                  Error(
                    t instanceof Error
                      ? `Notion page preparation failed. ${t.message}`
                      : "Notion page preparation failed.",
                  )
                );
              }
              let b = n.notionSyncBehavior ?? "duplicate",
                x = (0, a.sanitizeNotionUrl)(
                  (0, c.getConversationExportMetadata)(e).sourceUrl,
                ),
                y =
                  "duplicate" !== b && x
                    ? await Z({
                        accessToken: p.accessToken,
                        conversationUrl: x,
                        databaseId: p.databaseId,
                        databaseProperties: m,
                        metrics: d,
                      })
                    : [],
                v = y[0] ?? null,
                k = !!n.notionSplitIntoPages,
                w = (0, i.sanitizeNotionMessagesPerPage)(
                  n.notionMessagesPerPage,
                ),
                _ = k && e.messages.length > w,
                A = [],
                C = 0,
                E = [],
                F = async ({
                  pageId: e,
                  targetConversation: o,
                  targetPageTitle: i,
                }) => {
                  await t?.(`Exporting to Notion: preparing ${i}.`);
                  let s = await er({
                    accessToken: p.accessToken,
                    conversation: o,
                    metrics: d,
                    onProgress: t,
                    parentPageId: e,
                  });
                  try {
                    A = (0, a.buildConversationNotionBlocks)({
                      artifactPageLinks: s,
                      conversation: o,
                      platform: r,
                      preferences: n,
                    });
                  } catch (e) {
                    throw (
                      console.error(
                        "[AI Saver][notion] Failed while building Notion blocks.",
                        {
                          conversationId: o.summary.id,
                          error: e instanceof Error ? e.message : String(e),
                          platform: r,
                          title: o.summary.title,
                        },
                      ),
                      Error(
                        e instanceof Error
                          ? `Notion block generation failed. ${e.message}`
                          : "Notion block generation failed.",
                      )
                    );
                  }
                  ((C = j(A)),
                    (E = I(A)),
                    console.info(
                      "[AI Saver][notion] Preparing conversation import",
                      {
                        artifactLinkGroups: Object.keys(s).length,
                        batchCount: E.length,
                        messageCount: o.messages.length,
                        pageTitle: i,
                        platform: r,
                        syncBehavior: b,
                        topLevelBlocks: A.length,
                        totalBlocks: C,
                      },
                    ),
                    await X({
                      accessToken: p.accessToken,
                      blockId: e,
                      children: A,
                      metrics: d,
                      onProgress: t,
                      pageTitle: i,
                    }));
                },
                T = async (r) => {
                  let n = [];
                  for (let t = 0; t < e.messages.length; t += w)
                    n.push({
                      endIndex: Math.min(t + w, e.messages.length),
                      partNumber: n.length + 1,
                      startIndex: t,
                    });
                  await t?.(
                    `Exporting to Notion: splitting into ${n.length} pages (${w} messages per page).`,
                  );
                  let a = S({ chunkCount: n.length, messagesPerPage: w });
                  for (let o of (await X({
                    accessToken: p.accessToken,
                    blockId: r,
                    children: a,
                    metrics: d,
                    onProgress: t,
                    pageTitle: s,
                  }),
                  n)) {
                    let a = D({
                        conversation: e,
                        endIndex: o.endIndex,
                        pageTitle: s,
                        partNumber: o.partNumber,
                        startIndex: o.startIndex,
                        totalParts: n.length,
                      }),
                      i = a.summary.title || s;
                    await t?.(
                      `Exporting to Notion: creating page ${o.partNumber}/${n.length}.`,
                    );
                    let l = await K({
                      accessToken: p.accessToken,
                      metrics: d,
                      parentPageId: r,
                      title: i,
                    });
                    await F({
                      pageId: l.id,
                      targetConversation: a,
                      targetPageTitle: i,
                    });
                  }
                };
              if (v && "skip" === b) u = v;
              else if (v && "overwrite" === b) {
                for (let e of (console.info(
                  "[AI Saver][notion] Overwrite mode will trash existing pages",
                  {
                    existingPageCount: y.length,
                    pageIds: y.map((e) => e.id),
                    pageTitle: s,
                  },
                ),
                y))
                  await en({
                    accessToken: p.accessToken,
                    metrics: d,
                    pageId: e.id,
                  });
                ((u = await Y({
                  accessToken: p.accessToken,
                  databaseId: p.databaseId,
                  metrics: d,
                  properties: l,
                })),
                  _
                    ? await T(u.id)
                    : await F({
                        pageId: u.id,
                        targetConversation: e,
                        targetPageTitle: s,
                      }));
              } else
                ((u = await Y({
                  accessToken: p.accessToken,
                  databaseId: p.databaseId,
                  metrics: d,
                  properties: l,
                })),
                  _
                    ? await T(u.id)
                    : await F({
                        pageId: u.id,
                        targetConversation: e,
                        targetPageTitle: s,
                      }));
              return (
                console.info(
                  "[AI Saver][notion] Conversation import completed",
                  {
                    batchCount: E.length,
                    existingPageCount: y.length,
                    notionApiCalls: d.totalRequests,
                    notionApiRequestPaths: d.entries,
                    pageId: u.id,
                    pageTitle: s,
                    syncBehavior: b,
                    topLevelBlocks: A.length,
                    totalBlocks: C,
                  },
                ),
                await (0, o.saveNotionState)({
                  accessToken: p.accessToken,
                  authenticated: p.authenticated,
                  databaseId: p.databaseId,
                  databaseTitle: h,
                  databases: p.databases,
                  status: "connected",
                  userEmail: p.userEmail,
                  workspaceId: p.workspaceId,
                  workspaceName: p.workspaceName,
                }),
                {
                  databaseTitle: h,
                  pageId: u.id,
                  pageTitle: s,
                  pageUrl: u.url ?? "",
                }
              );
            };
        },
        {
          "~background/notion-markdown": "3NKqN",
          "~core/storage/notion": "3FDIm",
          "~core/types/export": "9vpBg",
          "~lib/conversation-artifact-dedup": "1EiWD",
          "~lib/conversation-title": "4IhWv",
          "~lib/conversation-export-metadata": "6LKjR",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "3NKqN": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "sanitizeNotionUrl", () => D),
            n.export(r, "buildArtifactChildPageBlocks", () => W),
            n.export(r, "buildConversationNotionBlocks", () => Y));
          var a = e("@tryfabric/martian");
          let o = new Set([
              "audio",
              "bookmark",
              "breadcrumb",
              "bulleted_list_item",
              "callout",
              "code",
              "divider",
              "embed",
              "equation",
              "file",
              "heading_1",
              "heading_2",
              "heading_3",
              "image",
              "link_to_page",
              "numbered_list_item",
              "paragraph",
              "pdf",
              "quote",
              "synced_block",
              "table",
              "table_of_contents",
              "table_row",
              "template",
              "to_do",
              "toggle",
              "video",
            ]),
            i = new Set(["bulleted_list_item", "numbered_list_item"]),
            s = new Set(["bulleted_list_item", "numbered_list_item", "to_do"]),
            l = {
              assistant: "Assistant",
              system: "System",
              tool: "Tool",
              user: "You",
            },
            c = {
              assistant: "blue_background",
              system: "gray_background",
              tool: "yellow_background",
              user: "default",
            },
            u = {
              chatgpt: "https://chatgpt.com/",
              claude: "https://claude.ai/",
              gemini: "https://gemini.google.com/",
              perplexity: "https://www.perplexity.ai/",
            },
            p = /(https?:\/\/[^\s<>"'\u00a0;,]+|www\.[^\s<>"'\u00a0;,]+)/iu,
            d = (e) => JSON.parse(JSON.stringify(e)),
            f = (e) => {
              try {
                return decodeURIComponent(e);
              } catch {
                return e;
              }
            },
            h = (e) => e.replace(/[.,;:!?]+$/u, ""),
            m = (e) =>
              f(e)
                .replace(/\u00a0/g, " ")
                .trim(),
            g = (e) => {
              let t = m(e),
                r = t.match(p);
              return r ? h(r[0]) : null;
            },
            b = (e) => {
              let t = m(e),
                r = t.split(/\s+/u)[0] ?? "";
              return /^(?:\/|\.\.?\/|[?#])/u.test(r) ? h(r) : null;
            },
            x = (e) =>
              e
                .replaceAll("\\", "\\\\")
                .replaceAll("[", "\\[")
                .replaceAll("]", "\\]"),
            y = (e) =>
              (e ?? [])
                .map((e) => e?.plain_text ?? e?.text?.content ?? "")
                .join("")
                .trim(),
            v = (e) => y(e[e.type]?.rich_text),
            k = (e) => {
              let t = v(e);
              return t
                ? "numbered_list_item" === e.type
                  ? `1. ${t}`
                  : "bulleted_list_item" === e.type
                    ? `- ${t}`
                    : "to_do" === e.type
                      ? `${e.to_do?.checked ? "[x]" : "[ ]"} ${t}`
                      : t
                : "";
            },
            w = (e) => ({
              object: "block",
              paragraph: {
                rich_text: [{ text: { content: e }, type: "text" }],
              },
              type: "paragraph",
            }),
            _ = (e, t = "plain text") => ({
              code: {
                language: t,
                rich_text: [{ text: { content: e }, type: "text" }],
              },
              object: "block",
              type: "code",
            }),
            A = ({ color: e, content: t, emoji: r }) => ({
              callout: {
                color: e,
                icon: { emoji: r, type: "emoji" },
                rich_text: [{ text: { content: t }, type: "text" }],
              },
              object: "block",
              type: "callout",
            }),
            C = () => ({ divider: {}, object: "block", type: "divider" }),
            E = (e) => ({
              link_to_page: { page_id: e },
              object: "block",
              type: "link_to_page",
            }),
            j = (e) => {
              let t = e.replace(/\r\n/g, "\n").trim();
              if (!t) return [w("No content captured.")];
              let r = t
                  .split(/\n{2,}/)
                  .map((e) => e.trim())
                  .filter(Boolean),
                n = [];
              for (let e of r) {
                if (e.length <= 2e3) {
                  n.push(w(e));
                  continue;
                }
                for (let t = 0; t < e.length; t += 2e3) {
                  let r = e.slice(t, t + 2e3).trim();
                  r && n.push(w(r));
                }
              }
              return n.length ? n : [w("No content captured.")];
            },
            I = (e, t) => ({
              object: "block",
              [e]: { rich_text: [{ text: { content: t }, type: "text" }] },
              type: e,
            }),
            S = ({ children: e, color: t, content: r }) => ({
              object: "block",
              toggle: {
                children: e,
                color: t,
                rich_text: [
                  {
                    annotations: {
                      bold: !0,
                      code: !1,
                      color: "default",
                      italic: !1,
                      strikethrough: !1,
                      underline: !1,
                    },
                    text: { content: r },
                    type: "text",
                  },
                ],
              },
              type: "toggle",
            }),
            D = (e, t = {}) => {
              if (!e || "#" === e) return null;
              let r = e.trim();
              if (!r || "#" === r) return null;
              let n = r.toLowerCase();
              if (
                ["sandbox:", "file:", "data:", "javascript:", "vbscript:"].some(
                  (e) => n.startsWith(e),
                )
              )
                return null;
              let a = g(r);
              if (a) {
                let e = a.startsWith("www.") ? `https://${a}` : a;
                try {
                  let t = new URL(e);
                  return "http:" === t.protocol || "https:" === t.protocol
                    ? t.toString()
                    : null;
                } catch {}
              }
              let o = b(r);
              if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(?:[/:?#].*)?$/i.test(r))
                return `https://${r}`;
              try {
                let e = new URL(r);
                return "http:" === e.protocol || "https:" === e.protocol
                  ? e.toString()
                  : null;
              } catch {}
              if (!t.baseUrl) return null;
              try {
                let e = new URL(o ?? r, t.baseUrl);
                return "http:" === e.protocol || "https:" === e.protocol
                  ? e.toString()
                  : null;
              } catch {
                return null;
              }
            },
            F = (e, t, r = {}) => {
              let n = D(t, r);
              return n ? `[${x(e)}](${n})` : x(e);
            },
            T = (e) => {
              let t = l[e.role] ?? e.role,
                r = e.authorName?.trim(),
                n =
                  r && r.toLowerCase() !== t.toLowerCase() ? `${t} (${r})` : t;
              return e.createdAt ? `${n} - ${e.createdAt}` : n;
            },
            R = (e) => {
              if (!e.attachments.length) return "";
              let t = e.summary.url,
                r = e.attachments.map((e) => {
                  let r = `${e.name} (${e.type || "unknown"})`;
                  return e.url ? `- ${F(r, e.url, { baseUrl: t })}` : `- ${r}`;
                });
              return `## Attachments

${r.join("\n")}`;
            },
            P = (e) => {
              if (!e.artifacts.length) return "";
              let t = e.summary.url,
                r = e.artifacts.map((e) => {
                  let r = `${e.label} (${e.type})`;
                  return e.url ? `- ${F(r, e.url, { baseUrl: t })}` : `- ${r}`;
                });
              return `## Artifacts

${r.join("\n")}`;
            },
            L = (e) => {
              let t = e
                .replace(/```[\s\S]*?```/g, "code block")
                .replace(/!\[[^\]]*]\([^)]+\)/g, "image")
                .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
                .replace(/[#>*_`~-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim();
              return t
                ? t.length > 72
                  ? `${t.slice(0, 69).trim()}...`
                  : t
                : "No content captured.";
            },
            O = (e, t = {}) =>
              (e ?? []).reduce((e, r) => {
                if (!r || "object" != typeof r) return e;
                let n = d(r);
                if ("text" === n.type) {
                  let r = n.text?.content;
                  if ("string" != typeof r) return e;
                  if (n.text?.link?.url) {
                    let e = D(n.text.link.url, t);
                    e ? (n.text.link.url = e) : delete n.text.link;
                  }
                }
                return (e.push(n), e);
              }, []),
            N = (e, t = {}) => {
              let r = e.table ?? {},
                n = Array.isArray(r.children) ? r.children : [],
                a = n.reduce((e, t) => {
                  let r = Array.isArray(t?.table_row?.cells)
                    ? t.table_row.cells
                    : [];
                  return Math.max(e, r.length);
                }, 0),
                o =
                  "number" == typeof r.table_width && r.table_width > 0
                    ? r.table_width
                    : a;
              e.table = {
                ...r,
                children: n.map((e) => {
                  let r = Array.isArray(e?.table_row?.cells)
                      ? e.table_row.cells
                      : [],
                    n = r
                      .slice(0, o)
                      .map((e) => O(Array.isArray(e) ? e : [], t));
                  for (; n.length < o;)
                    n.push([{ text: { content: "" }, type: "text" }]);
                  return {
                    object: "block",
                    table_row: { cells: n },
                    type: "table_row",
                  };
                }),
                table_width: o,
              };
            },
            M = (e, t = {}) =>
              e.reduce((e, r) => {
                if (!r || "object" != typeof r || "string" != typeof r.type)
                  return e;
                let n = d(r),
                  a = n.type,
                  i = n[a];
                if (!o.has(a) || (void 0 !== i && "object" != typeof i)) {
                  let t = v(n);
                  return (t && e.push(w(t)), e);
                }
                let s = i ?? {};
                if (
                  ((n.object = "block"),
                  (n[a] = s),
                  Array.isArray(s.rich_text) &&
                    (n[a].rich_text = O(s.rich_text, t)),
                  Array.isArray(s.children) &&
                    (n[a].children = M(s.children, t)),
                  "bookmark" === a && s.url)
                ) {
                  let r = D(s.url, t);
                  if (!r) return (e.push(w(`Bookmark: ${s.url}`)), e);
                  n.bookmark.url = r;
                }
                if ("image" === a && "external" === s.type && s.external?.url) {
                  let r = D(s.external.url, t);
                  if (!r) {
                    let t = y(s.caption) || "Image";
                    return (e.push(w(t)), e);
                  }
                  ((n.image.external.url = r),
                    (n.image.caption = O(s.caption, t)));
                }
                return ("table" === a && N(n, t), e.push(n), e);
              }, []),
            B = (e, t = 0) =>
              e.reduce((e, r) => {
                if (!r || "string" != typeof r.type) return e;
                if ("quote" === r.type) {
                  let n = B(r.quote?.children ?? [], t + 1);
                  if (t >= 2) {
                    let t = y(r.quote?.rich_text);
                    return (t && e.push(w(t)), e.push(...n), e);
                  }
                  return (
                    e.push({ ...r, quote: { ...r.quote, children: n } }),
                    e
                  );
                }
                if (t > 1 && (i.has(r.type) || "to_do" === r.type)) {
                  let n = k(r);
                  return (
                    n && e.push(w(n)),
                    e.push(...B(r[r.type]?.children ?? [], t + 1)),
                    e
                  );
                }
                let n = r[r.type];
                if (n?.children) {
                  let a = B(n.children, t + 1);
                  if (s.has(r.type)) {
                    let t = a.filter((e) => "table" !== e.type),
                      o = a.filter((e) => "table" === e.type);
                    return (
                      e.push({ ...r, [r.type]: { ...n, children: t } }),
                      e.push(...o),
                      e
                    );
                  }
                  return (e.push({ ...r, [r.type]: { ...n, children: a } }), e);
                }
                return (e.push(r), e);
              }, []),
            z = (e) => {
              let t = e.type,
                r = d(e[t] ?? {}),
                n = { object: "block", type: t, [t]: r };
              return (
                Array.isArray(n[t].rich_text) &&
                  (n[t].rich_text = n[t].rich_text.filter(
                    (e) =>
                      (!!e && "text" !== e.type) || e?.text?.content !== void 0,
                  )),
                Array.isArray(n[t].children) &&
                  (n[t].children = n[t].children.map(z)),
                "table" !== t ||
                  Array.isArray(n.table.children) ||
                  (n.table.children = []),
                n
              );
            },
            q = (e) => {
              let t = (e) => {
                  if (
                    !e ||
                    "text" !== e.type ||
                    !e.text ||
                    "string" != typeof e.text.content ||
                    e.text.content.length <= 2e3
                  )
                    return [e];
                  let t = [];
                  for (let r = 0; r < e.text.content.length; r += 2e3) {
                    let n = d(e);
                    ((n.text.content = e.text.content.slice(r, r + 2e3)),
                      t.push(n));
                  }
                  return t;
                },
                r = (e) => e.flatMap((e) => t(e)),
                n = (e, t) => {
                  if (t.length <= 100)
                    return [
                      { ...d(e), [e.type]: { ...d(e[e.type]), rich_text: t } },
                    ];
                  let r = [];
                  for (let n = 0; n < t.length; n += 100) {
                    let a = d(e);
                    ((a[e.type].rich_text = t.slice(n, n + 100)),
                      n + 100 < t.length &&
                        Array.isArray(a[e.type].children) &&
                        (a[e.type].children = []),
                      r.push(a));
                  }
                  return r;
                },
                a = (e) => {
                  if (!e || "string" != typeof e.type) return [e];
                  let t = e[e.type],
                    a =
                      t && Array.isArray(t.rich_text)
                        ? n(e, r(t.rich_text))
                        : [d(e)];
                  return a.map(
                    (e) => (
                      Array.isArray(e[e.type]?.children) &&
                        (e[e.type].children = q(e[e.type].children)),
                      e
                    ),
                  );
                };
              return e.flatMap((e) => a(e));
            },
            $ = (e) => {
              let t = (e, t) => {
                  let r = [];
                  for (let n = 0; n < e.length; n += t)
                    r.push(e.slice(n, n + t));
                  return r;
                },
                r = (e) => {
                  if (!e || "string" != typeof e.type) return [e];
                  let r = e[e.type] ?? {};
                  if (!Array.isArray(r.children)) return [d(e)];
                  let n = $(r.children),
                    a = d(e);
                  return ((a[e.type].children = n), n.length <= 100)
                    ? [a]
                    : "table" === e.type
                      ? t(n, 100).map((e, t) => ({
                          ...d(a),
                          table: {
                            ...d(a.table),
                            children: e,
                            has_column_header:
                              0 === t && a.table?.has_column_header,
                          },
                        }))
                      : t(n, 100).map((t) => ({
                          ...d(a),
                          [e.type]: { ...d(a[e.type]), children: t },
                        }));
                };
              return e.flatMap((e) => r(e));
            },
            U = (e, t = {}) => {
              let r = M(e, t),
                n = B(r),
                a = n.map(z);
              return $(q(a));
            },
            H = (e, t = {}) => {
              if (e.length > 5e4)
                return (
                  console.warn(
                    "[AI Saver][notion] Falling back to plain-text blocks for oversized markdown payload.",
                    { length: e.length },
                  ),
                  U(j(e), t)
                );
              try {
                return U((0, a.markdownToBlocks)(e), t);
              } catch (r) {
                return (
                  console.warn(
                    "[AI Saver][notion] Markdown parser failed; falling back to plain-text blocks.",
                    {
                      error: r instanceof Error ? r.message : String(r),
                      length: e.length,
                    },
                  ),
                  U(j(e), t)
                );
              }
            },
            Q = ({ artifactPageLinks: e, messageId: t }) =>
              t && e?.[t]?.length
                ? [
                    A({
                      color: "yellow_background",
                      content: "Artifacts generated in this message",
                      emoji: "\uD83D\uDCCE",
                    }),
                    ...e[t].map((e) => E(e)),
                  ]
                : [],
            G = ({ artifactPageLinks: e, conversation: t, platform: r }) => {
              if (!t.messages.length) return [w("No transcript captured.")];
              let n = [],
                a = t.summary.url || u[r];
              for (let [r, o] of t.messages.entries()) {
                let i = o.content.trim() || "No content captured.",
                  s = T(o),
                  l = H(i, { baseUrl: a });
                (n.push(I("heading_1", s)),
                  n.push(...(l.length ? l : [w("No content captured.")])),
                  n.push(...Q({ artifactPageLinks: e, messageId: o.id })),
                  r < t.messages.length - 1 && n.push(C()));
              }
              return n;
            },
            V = (e, t) => {
              let r = e.replace(/\r\n/g, "\n").trim();
              if (!r) return [w("Empty document.")];
              let n = [];
              for (let e = 0; e < r.length; e += 2e3) {
                let a = r.slice(e, e + 2e3);
                a && n.push(_(a, t));
              }
              return n.length ? n : [w("Empty document.")];
            },
            W = ({ artifact: e, baseUrl: t }) => {
              let r = e.content?.trim() ?? "",
                n = e.mimeType?.toLowerCase() ?? "";
              return r
                ? n.startsWith("code/")
                  ? U(V(r, n.slice(5) || "plain text"), { baseUrl: t })
                  : "html" === n || "text/html" === n || "code/html" === n
                    ? U(V(r, "html"), { baseUrl: t })
                    : "text/markdown" === n || "markdown" === n
                      ? H(r, { baseUrl: t })
                      : U(j(r), { baseUrl: t })
                : [w("Empty document.")];
            },
            Z = ({ artifactPageLinks: e, conversation: t }) => {
              if (!t.messages.length) return [w("No transcript captured.")];
              let r = [];
              for (let n of t.messages) {
                let a = n.content.trim() || "No content captured.",
                  o = T(n),
                  i = L(a),
                  s = H(a, { baseUrl: t.summary.url });
                (r.push(
                  S({
                    children: s.length ? s : [w("No content captured.")],
                    color: c[n.role] ?? "default",
                    content: `${o}: ${i}`,
                  }),
                ),
                  r.push(...Q({ artifactPageLinks: e, messageId: n.id })));
              }
              return r;
            },
            X = ({ artifactPageLinks: e, conversation: t, platform: r }) => {
              let n = R(t),
                a = P(t),
                o = t.summary.url || u[r];
              return U(
                [
                  I("heading_1", t.summary.title || "Untitled Conversation"),
                  ...(n ? H(n, { baseUrl: o }) : []),
                  ...(a ? H(a, { baseUrl: o }) : []),
                  ...Z({ artifactPageLinks: e, conversation: t }),
                ],
                { baseUrl: o },
              );
            },
            J = ({ artifactPageLinks: e, conversation: t, platform: r }) => {
              let n = R(t),
                a = P(t),
                o = t.summary.url || u[r];
              return U(
                [
                  I("heading_1", t.summary.title || "Untitled Conversation"),
                  ...(n ? H(n, { baseUrl: o }) : []),
                  ...(a ? H(a, { baseUrl: o }) : []),
                  ...G({ artifactPageLinks: e, conversation: t, platform: r }),
                ],
                { baseUrl: o },
              );
            },
            Y = ({
              artifactPageLinks: e,
              conversation: t,
              platform: r,
              preferences: n,
            }) =>
              n?.notionEnhancedFormatting
                ? X({ artifactPageLinks: e, conversation: t, platform: r })
                : J({ artifactPageLinks: e, conversation: t, platform: r });
        },
        {
          "@tryfabric/martian": "7rpvf",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "7rpvf": [
        function (e, t, r) {
          var n =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          (Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.markdownToRichText = r.markdownToBlocks = void 0));
          let a = n(e("bba4e937397d119f")),
            o = n(e("aeb6f1f5f55b7162")),
            i = e("12357c20a575dfc8"),
            s = n(e("2f454a120028ecaf")),
            l = n(e("ad843f14fd02e27c"));
          ((r.markdownToBlocks = function (e, t) {
            let r = (0, a.default)()
              .use(o.default)
              .use(s.default)
              .use(l.default)
              .parse(e);
            return (0, i.parseBlocks)(r, t);
          }),
            (r.markdownToRichText = function (e, t) {
              let r = (0, a.default)().use(o.default).use(s.default).parse(e);
              return (0, i.parseRichText)(r, t);
            }));
        },
        {
          bba4e937397d119f: "8XoJh",
          aeb6f1f5f55b7162: "4A3Gk",
          "12357c20a575dfc8": "l7IPP",
          "2f454a120028ecaf": "190uq",
          ad843f14fd02e27c: "390lO",
        },
      ],
      "8XoJh": [
        function (e, t, r) {
          var n = e("b24d8ed1b43ae23f"),
            a = e("2b696190406c845d"),
            o = e("7ee0bdb2802f08be"),
            i = e("25ceee36bc00575"),
            s = e("636b523cfa91b15f"),
            l = e("43d40fd006086cbb");
          t.exports = (function e() {
            var t,
              r = [],
              a = s(),
              x = {},
              y = -1;
            return (
              (v.data = function (e, r) {
                return "string" == typeof e
                  ? 2 == arguments.length
                    ? (m("data", t), (x[e] = r), v)
                    : (u.call(x, e) && x[e]) || null
                  : e
                    ? (m("data", t), (x = e), v)
                    : x;
              }),
              (v.freeze = k),
              (v.attachers = r),
              (v.use = function (e) {
                var n;
                if ((m("use", t), null == e));
                else if ("function" == typeof e) l.apply(null, arguments);
                else if ("object" == typeof e) "length" in e ? s(e) : a(e);
                else throw Error("Expected usable value, not `" + e + "`");
                return (n && (x.settings = o(x.settings || {}, n)), v);
                function a(e) {
                  (s(e.plugins), e.settings && (n = o(n || {}, e.settings)));
                }
                function s(e) {
                  var t = -1;
                  if (null == e);
                  else if ("object" == typeof e && "length" in e)
                    for (; ++t < e.length;)
                      !(function (e) {
                        if ("function" == typeof e) l(e);
                        else if ("object" == typeof e)
                          "length" in e ? l.apply(null, e) : a(e);
                        else
                          throw Error("Expected usable value, not `" + e + "`");
                      })(e[t]);
                  else
                    throw Error("Expected a list of plugins, not `" + e + "`");
                }
                function l(e, t) {
                  var n = (function (e) {
                    for (var t = -1; ++t < r.length;)
                      if (r[t][0] === e) return r[t];
                  })(e);
                  n
                    ? (i(n[1]) && i(t) && (t = o(!0, n[1], t)), (n[1] = t))
                    : r.push(c.call(arguments));
                }
              }),
              (v.parse = function (e) {
                var t,
                  r = l(e);
                return (k(), f("parse", (t = v.Parser)), d(t, "parse"))
                  ? new t(String(r), r).parse()
                  : t(String(r), r);
              }),
              (v.stringify = function (e, t) {
                var r,
                  n = l(t);
                return (k(),
                h("stringify", (r = v.Compiler)),
                g(e),
                d(r, "compile"))
                  ? new r(e, n).compile()
                  : r(e, n);
              }),
              (v.run = w),
              (v.runSync = function (e, t) {
                var r, a;
                return (
                  w(e, t, function (e, t) {
                    ((a = !0), (r = t), n(e));
                  }),
                  b("runSync", "run", a),
                  r
                );
              }),
              (v.process = _),
              (v.processSync = function (e) {
                var t, r;
                return (
                  k(),
                  f("processSync", v.Parser),
                  h("processSync", v.Compiler),
                  _((t = l(e)), function (e) {
                    ((r = !0), n(e));
                  }),
                  b("processSync", "process", r),
                  t
                );
              }),
              v
            );
            function v() {
              for (var t = e(), n = -1; ++n < r.length;)
                t.use.apply(null, r[n]);
              return (t.data(o(!0, {}, x)), t);
            }
            function k() {
              var e, n;
              if (t) return v;
              for (; ++y < r.length;)
                !1 !== (e = r[y])[1] &&
                  (!0 === e[1] && (e[1] = void 0),
                  "function" == typeof (n = e[0].apply(v, e.slice(1))) &&
                    a.use(n));
              return ((t = !0), (y = 1 / 0), v);
            }
            function w(e, t, r) {
              if (
                (g(e),
                k(),
                r || "function" != typeof t || ((r = t), (t = null)),
                !r)
              )
                return new Promise(n);
              function n(n, o) {
                a.run(e, l(t), function (t, a, i) {
                  ((a = a || e), t ? o(t) : n ? n(a) : r(null, a, i));
                });
              }
              n(null, r);
            }
            function _(e, t) {
              if ((k(), f("process", v.Parser), h("process", v.Compiler), !t))
                return new Promise(r);
              function r(r, n) {
                var a = l(e);
                p.run(v, { file: a }, function (e) {
                  e ? n(e) : r ? r(a) : t(null, a);
                });
              }
              r(null, t);
            }
          })().freeze();
          var c = [].slice,
            u = {}.hasOwnProperty,
            p = s()
              .use(function (e, t) {
                t.tree = e.parse(t.file);
              })
              .use(function (e, t, r) {
                e.run(t.tree, t.file, function (e, n, a) {
                  e ? r(e) : ((t.tree = n), (t.file = a), r());
                });
              })
              .use(function (e, t) {
                var r = e.stringify(t.tree, t.file);
                null == r ||
                  ("string" == typeof r || a(r)
                    ? ("value" in t.file && (t.file.value = r),
                      (t.file.contents = r))
                    : (t.file.result = r));
              });
          function d(e, t) {
            return (
              "function" == typeof e &&
              e.prototype &&
              ((function (e) {
                var t;
                for (t in e) return !0;
                return !1;
              })(e.prototype) ||
                t in e.prototype)
            );
          }
          function f(e, t) {
            if ("function" != typeof t)
              throw Error("Cannot `" + e + "` without `Parser`");
          }
          function h(e, t) {
            if ("function" != typeof t)
              throw Error("Cannot `" + e + "` without `Compiler`");
          }
          function m(e, t) {
            if (t)
              throw Error(
                "Cannot invoke `" +
                  e +
                  "` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.",
              );
          }
          function g(e) {
            if (!e || "string" != typeof e.type)
              throw Error("Expected node, got `" + e + "`");
          }
          function b(e, t, r) {
            if (!r)
              throw Error(
                "`" + e + "` finished async. Use `" + t + "` instead",
              );
          }
        },
        {
          b24d8ed1b43ae23f: "3TqHI",
          "2b696190406c845d": "bkMdD",
          "7ee0bdb2802f08be": "2p2UP",
          "25ceee36bc00575": "egukI",
          "636b523cfa91b15f": "b0Y23",
          "43d40fd006086cbb": "aBMrh",
        },
      ],
      "3TqHI": [
        function (e, t, r) {
          t.exports = function (e) {
            if (e) throw e;
          };
        },
        {},
      ],
      bkMdD: [
        function (e, t, r) {
          /*!
           * Determine if an object is a Buffer
           *
           * @author   Feross Aboukhadijeh <https://feross.org>
           * @license  MIT
           */ t.exports = function (e) {
            return (
              null != e &&
              null != e.constructor &&
              "function" == typeof e.constructor.isBuffer &&
              e.constructor.isBuffer(e)
            );
          };
        },
        {},
      ],
      "2p2UP": [
        function (e, t, r) {
          var n = Object.prototype.hasOwnProperty,
            a = Object.prototype.toString,
            o = Object.defineProperty,
            i = Object.getOwnPropertyDescriptor,
            s = function (e) {
              return "function" == typeof Array.isArray
                ? Array.isArray(e)
                : "[object Array]" === a.call(e);
            },
            l = function (e) {
              if (!e || "[object Object]" !== a.call(e)) return !1;
              var t,
                r = n.call(e, "constructor"),
                o =
                  e.constructor &&
                  e.constructor.prototype &&
                  n.call(e.constructor.prototype, "isPrototypeOf");
              if (e.constructor && !r && !o) return !1;
              for (t in e);
              return void 0 === t || n.call(e, t);
            },
            c = function (e, t) {
              o && "__proto__" === t.name
                ? o(e, t.name, {
                    enumerable: !0,
                    configurable: !0,
                    value: t.newValue,
                    writable: !0,
                  })
                : (e[t.name] = t.newValue);
            },
            u = function (e, t) {
              if ("__proto__" === t) {
                if (!n.call(e, t)) return;
                if (i) return i(e, t).value;
              }
              return e[t];
            };
          t.exports = function e() {
            var t,
              r,
              n,
              a,
              o,
              i,
              p = arguments[0],
              d = 1,
              f = arguments.length,
              h = !1;
            for (
              "boolean" == typeof p &&
                ((h = p), (p = arguments[1] || {}), (d = 2)),
                (null == p ||
                  ("object" != typeof p && "function" != typeof p)) &&
                  (p = {});
              d < f;
              ++d
            )
              if (((t = arguments[d]), null != t))
                for (r in t)
                  ((n = u(p, r)),
                    p !== (a = u(t, r)) &&
                      (h && a && (l(a) || (o = s(a)))
                        ? (o
                            ? ((o = !1), (i = n && s(n) ? n : []))
                            : (i = n && l(n) ? n : {}),
                          c(p, { name: r, newValue: e(h, i, a) }))
                        : void 0 !== a && c(p, { name: r, newValue: a })));
            return p;
          };
        },
        {},
      ],
      egukI: [
        function (e, t, r) {
          t.exports = (e) => {
            if ("[object Object]" !== Object.prototype.toString.call(e))
              return !1;
            let t = Object.getPrototypeOf(e);
            return null === t || t === Object.prototype;
          };
        },
        {},
      ],
      b0Y23: [
        function (e, t, r) {
          var n = e("80356767e020587b");
          ((t.exports = o), (o.wrap = n));
          var a = [].slice;
          function o() {
            var e = [],
              t = {};
            return (
              (t.run = function () {
                var t = -1,
                  r = a.call(arguments, 0, -1),
                  o = arguments[arguments.length - 1];
                if ("function" != typeof o)
                  throw Error("Expected function as last argument, not " + o);
                (function i(s) {
                  var l = e[++t],
                    c = a.call(arguments, 0),
                    u = c.slice(1),
                    p = r.length,
                    d = -1;
                  if (s) {
                    o(s);
                    return;
                  }
                  for (; ++d < p;)
                    (null === u[d] || void 0 === u[d]) && (u[d] = r[d]);
                  ((r = u),
                    l
                      ? n(l, i).apply(null, r)
                      : o.apply(null, [null].concat(r)));
                }).apply(null, [null].concat(r));
              }),
              (t.use = function (r) {
                if ("function" != typeof r)
                  throw Error("Expected `fn` to be a function, not " + r);
                return (e.push(r), t);
              }),
              t
            );
          }
        },
        { "80356767e020587b": "jNrTU" },
      ],
      jNrTU: [
        function (e, t, r) {
          var n = [].slice;
          t.exports = function (e, t) {
            var r;
            return function () {
              var t,
                i = n.call(arguments, 0),
                s = e.length > i.length;
              s && i.push(a);
              try {
                t = e.apply(null, i);
              } catch (e) {
                if (s && r) throw e;
                return a(e);
              }
              s ||
                (t && "function" == typeof t.then
                  ? t.then(o, a)
                  : t instanceof Error
                    ? a(t)
                    : o(t));
            };
            function a() {
              r || ((r = !0), t.apply(null, arguments));
            }
            function o(e) {
              a(null, e);
            }
          };
        },
        {},
      ],
      aBMrh: [
        function (e, t, r) {
          t.exports = e("66f1a5926cde8bf0");
        },
        { "66f1a5926cde8bf0": "j0ggX" },
      ],
      j0ggX: [
        function (e, t, r) {
          var n = e("5914e13b09427f57"),
            a = e("304bbaf9b673fd2c");
          ((t.exports = a),
            (a.prototype.message = function (e, t, r) {
              var a = new n(e, t, r);
              return (
                this.path &&
                  ((a.name = this.path + ":" + a.name), (a.file = this.path)),
                (a.fatal = !1),
                this.messages.push(a),
                a
              );
            }),
            (a.prototype.info = function () {
              var e = this.message.apply(this, arguments);
              return ((e.fatal = null), e);
            }),
            (a.prototype.fail = function () {
              var e = this.message.apply(this, arguments);
              throw ((e.fatal = !0), e);
            }));
        },
        { "5914e13b09427f57": "53V6R", "304bbaf9b673fd2c": "Q3Bpn" },
      ],
      "53V6R": [
        function (e, t, r) {
          var n = e("3ee93cf5775f42e9");
          function a() {}
          ((t.exports = i),
            (a.prototype = Error.prototype),
            (i.prototype = new a()));
          var o = i.prototype;
          function i(e, t, r) {
            var a, o, i, s, l;
            ("string" == typeof t && ((r = t), (t = null)),
              (l = [null, null]),
              "string" == typeof (i = r) &&
                (-1 === (s = i.indexOf(":"))
                  ? (l[1] = i)
                  : ((l[0] = i.slice(0, s)), (l[1] = i.slice(s + 1)))),
              (a = n(t) || "1:1"),
              (o = {
                start: { line: null, column: null },
                end: { line: null, column: null },
              }),
              t && t.position && (t = t.position),
              t && (t.start ? ((o = t), (t = t.start)) : (o.start = t)),
              e.stack && ((this.stack = e.stack), (e = e.message)),
              (this.message = e),
              (this.name = a),
              (this.reason = e),
              (this.line = t ? t.line : null),
              (this.column = t ? t.column : null),
              (this.location = o),
              (this.source = l[0]),
              (this.ruleId = l[1]));
          }
          ((o.file = ""),
            (o.name = ""),
            (o.reason = ""),
            (o.message = ""),
            (o.stack = ""),
            (o.fatal = null),
            (o.column = null),
            (o.line = null));
        },
        { "3ee93cf5775f42e9": "86toc" },
      ],
      "86toc": [
        function (e, t, r) {
          var n = {}.hasOwnProperty;
          function a(e) {
            return (
              (e && "object" == typeof e) || (e = {}),
              i(e.line) + ":" + i(e.column)
            );
          }
          function o(e) {
            return (
              (e && "object" == typeof e) || (e = {}),
              a(e.start) + "-" + a(e.end)
            );
          }
          function i(e) {
            return e && "number" == typeof e ? e : 1;
          }
          t.exports = function (e) {
            return e && "object" == typeof e
              ? n.call(e, "position") || n.call(e, "type")
                ? o(e.position)
                : n.call(e, "start") || n.call(e, "end")
                  ? o(e)
                  : n.call(e, "line") || n.call(e, "column")
                    ? a(e)
                    : ""
              : "";
          };
        },
        {},
      ],
      Q3Bpn: [
        function (e, t, r) {
          var n = e("817ccc6afe339f48"),
            a = e("a8fb77133b646e77"),
            o = e("87bfee90cff721a2");
          t.exports = l;
          var i = {}.hasOwnProperty,
            s = ["history", "path", "basename", "stem", "extname", "dirname"];
          function l(e) {
            var t, r;
            if (e) {
              if ("string" == typeof e || o(e)) e = { contents: e };
              else if ("message" in e && "messages" in e) return e;
            } else e = {};
            if (!(this instanceof l)) return new l(e);
            for (
              this.data = {},
                this.messages = [],
                this.history = [],
                this.cwd = a.cwd(),
                r = -1;
              ++r < s.length;
            )
              ((t = s[r]), i.call(e, t) && (this[t] = e[t]));
            for (t in e) 0 > s.indexOf(t) && (this[t] = e[t]);
          }
          function c(e, t) {
            if (e && e.indexOf(n.sep) > -1)
              throw Error(
                "`" + t + "` cannot be a path: did not expect `" + n.sep + "`",
              );
          }
          function u(e, t) {
            if (!e) throw Error("`" + t + "` cannot be empty");
          }
          function p(e, t) {
            if (!e)
              throw Error("Setting `" + t + "` requires `path` to be set too");
          }
          ((l.prototype.toString = function (e) {
            return (this.contents || "").toString(e);
          }),
            Object.defineProperty(l.prototype, "path", {
              get: function () {
                return this.history[this.history.length - 1];
              },
              set: function (e) {
                (u(e, "path"), this.path !== e && this.history.push(e));
              },
            }),
            Object.defineProperty(l.prototype, "dirname", {
              get: function () {
                return "string" == typeof this.path
                  ? n.dirname(this.path)
                  : void 0;
              },
              set: function (e) {
                (p(this.path, "dirname"),
                  (this.path = n.join(e || "", this.basename)));
              },
            }),
            Object.defineProperty(l.prototype, "basename", {
              get: function () {
                return "string" == typeof this.path
                  ? n.basename(this.path)
                  : void 0;
              },
              set: function (e) {
                (u(e, "basename"),
                  c(e, "basename"),
                  (this.path = n.join(this.dirname || "", e)));
              },
            }),
            Object.defineProperty(l.prototype, "extname", {
              get: function () {
                return "string" == typeof this.path
                  ? n.extname(this.path)
                  : void 0;
              },
              set: function (e) {
                if ((c(e, "extname"), p(this.path, "extname"), e)) {
                  if (46 !== e.charCodeAt(0))
                    throw Error("`extname` must start with `.`");
                  if (e.indexOf(".", 1) > -1)
                    throw Error("`extname` cannot contain multiple dots");
                }
                this.path = n.join(this.dirname, this.stem + (e || ""));
              },
            }),
            Object.defineProperty(l.prototype, "stem", {
              get: function () {
                return "string" == typeof this.path
                  ? n.basename(this.path, this.extname)
                  : void 0;
              },
              set: function (e) {
                (u(e, "stem"),
                  c(e, "stem"),
                  (this.path = n.join(
                    this.dirname || "",
                    e + (this.extname || ""),
                  )));
              },
            }));
        },
        {
          "817ccc6afe339f48": "4QCWp",
          a8fb77133b646e77: "l2YoN",
          "87bfee90cff721a2": "bkMdD",
        },
      ],
      "4QCWp": [
        function (e, t, r) {
          ((r.basename = function (e, t) {
            var r,
              a,
              o,
              i,
              s = 0,
              l = -1;
            if (void 0 !== t && "string" != typeof t)
              throw TypeError('"ext" argument must be a string');
            if (
              (n(e),
              (r = e.length),
              void 0 === t || !t.length || t.length > e.length)
            ) {
              for (; r--;)
                if (47 === e.charCodeAt(r)) {
                  if (o) {
                    s = r + 1;
                    break;
                  }
                } else l < 0 && ((o = !0), (l = r + 1));
              return l < 0 ? "" : e.slice(s, l);
            }
            if (t === e) return "";
            for (a = -1, i = t.length - 1; r--;)
              if (47 === e.charCodeAt(r)) {
                if (o) {
                  s = r + 1;
                  break;
                }
              } else
                (a < 0 && ((o = !0), (a = r + 1)),
                  i > -1 &&
                    (e.charCodeAt(r) === t.charCodeAt(i--)
                      ? i < 0 && (l = r)
                      : ((i = -1), (l = a))));
            return (s === l ? (l = a) : l < 0 && (l = e.length), e.slice(s, l));
          }),
            (r.dirname = function (e) {
              var t, r, a;
              if ((n(e), !e.length)) return ".";
              for (t = -1, a = e.length; --a;)
                if (47 === e.charCodeAt(a)) {
                  if (r) {
                    t = a;
                    break;
                  }
                } else r || (r = !0);
              return t < 0
                ? 47 === e.charCodeAt(0)
                  ? "/"
                  : "."
                : 1 === t && 47 === e.charCodeAt(0)
                  ? "//"
                  : e.slice(0, t);
            }),
            (r.extname = function (e) {
              var t,
                r,
                a,
                o = -1,
                i = 0,
                s = -1,
                l = 0;
              for (n(e), a = e.length; a--;) {
                if (47 === (r = e.charCodeAt(a))) {
                  if (t) {
                    i = a + 1;
                    break;
                  }
                  continue;
                }
                (s < 0 && ((t = !0), (s = a + 1)),
                  46 === r
                    ? o < 0
                      ? (o = a)
                      : 1 !== l && (l = 1)
                    : o > -1 && (l = -1));
              }
              return o < 0 ||
                s < 0 ||
                0 === l ||
                (1 === l && o === s - 1 && o === i + 1)
                ? ""
                : e.slice(o, s);
            }),
            (r.join = function () {
              for (var e, t, r, a, o = -1; ++o < arguments.length;)
                (n(arguments[o]),
                  arguments[o] &&
                    (a = void 0 === a ? arguments[o] : a + "/" + arguments[o]));
              return void 0 === a
                ? "."
                : (n((e = a)),
                  (t = 47 === e.charCodeAt(0)),
                  (r = (function (e, t) {
                    for (
                      var r, n, a = "", o = 0, i = -1, s = 0, l = -1;
                      ++l <= e.length;
                    ) {
                      if (l < e.length) r = e.charCodeAt(l);
                      else if (47 === r) break;
                      else r = 47;
                      if (47 === r) {
                        if (i === l - 1 || 1 === s);
                        else if (i !== l - 1 && 2 === s) {
                          if (
                            a.length < 2 ||
                            2 !== o ||
                            46 !== a.charCodeAt(a.length - 1) ||
                            46 !== a.charCodeAt(a.length - 2)
                          ) {
                            if (a.length > 2) {
                              if ((n = a.lastIndexOf("/")) !== a.length - 1) {
                                (n < 0
                                  ? ((a = ""), (o = 0))
                                  : (o =
                                      (a = a.slice(0, n)).length -
                                      1 -
                                      a.lastIndexOf("/")),
                                  (i = l),
                                  (s = 0));
                                continue;
                              }
                            } else if (a.length) {
                              ((a = ""), (o = 0), (i = l), (s = 0));
                              continue;
                            }
                          }
                          t && ((a = a.length ? a + "/.." : ".."), (o = 2));
                        } else
                          (a.length
                            ? (a += "/" + e.slice(i + 1, l))
                            : (a = e.slice(i + 1, l)),
                            (o = l - i - 1));
                        ((i = l), (s = 0));
                      } else 46 === r && s > -1 ? s++ : (s = -1);
                    }
                    return a;
                  })(e, !t)).length ||
                    t ||
                    (r = "."),
                  r.length && 47 === e.charCodeAt(e.length - 1) && (r += "/"),
                  t ? "/" + r : r);
            }),
            (r.sep = "/"));
          function n(e) {
            if ("string" != typeof e)
              throw TypeError(
                "Path must be a string. Received " + JSON.stringify(e),
              );
          }
        },
        {},
      ],
      l2YoN: [
        function (e, t, r) {
          r.cwd = function () {
            return "/";
          };
        },
        {},
      ],
      "4A3Gk": [
        function (e, t, r) {
          t.exports = function (e) {
            var t = this;
            this.Parser = function (r) {
              return n(
                r,
                Object.assign({}, t.data("settings"), e, {
                  extensions: t.data("micromarkExtensions") || [],
                  mdastExtensions: t.data("fromMarkdownExtensions") || [],
                }),
              );
            };
          };
          var n = e("6db0261b5c419523");
        },
        { "6db0261b5c419523": "iDQ6j" },
      ],
      iDQ6j: [
        function (e, t, r) {
          t.exports = e("d70719e39b672e48");
        },
        { d70719e39b672e48: "kxndO" },
      ],
      kxndO: [
        function (e, t, r) {
          t.exports = function (e, t, r) {
            return (
              "string" != typeof t && ((r = t), (t = void 0)),
              (function (e) {
                var t = (function (e, t) {
                    for (var r = -1; ++r < t.length;)
                      (function (e, t) {
                        var r, n;
                        for (r in t)
                          ((n = o.call(e, r) ? e[r] : (e[r] = {})),
                            "canContainEols" === r || "transforms" === r
                              ? (e[r] = [].concat(n, t[r]))
                              : Object.assign(n, t[r]));
                      })(e, t[r]);
                    return e;
                  })(
                    {
                      transforms: [],
                      canContainEols: [
                        "emphasis",
                        "fragment",
                        "heading",
                        "paragraph",
                        "strong",
                      ],
                      enter: {
                        autolink: f(j),
                        autolinkProtocol: y,
                        autolinkEmail: y,
                        atxHeading: f(A),
                        blockQuote: f(function () {
                          return { type: "blockquote", children: [] };
                        }),
                        characterEscape: y,
                        characterReference: y,
                        codeFenced: f(_),
                        codeFencedFenceInfo: h,
                        codeFencedFenceMeta: h,
                        codeIndented: f(_, h),
                        codeText: f(function () {
                          return { type: "inlineCode", value: "" };
                        }, h),
                        codeTextData: y,
                        data: y,
                        codeFlowValue: y,
                        definition: f(function () {
                          return {
                            type: "definition",
                            identifier: "",
                            label: null,
                            title: null,
                            url: "",
                          };
                        }),
                        definitionDestinationString: h,
                        definitionLabelString: h,
                        definitionTitleString: h,
                        emphasis: f(function () {
                          return { type: "emphasis", children: [] };
                        }),
                        hardBreakEscape: f(C),
                        hardBreakTrailing: f(C),
                        htmlFlow: f(E, h),
                        htmlFlowData: y,
                        htmlText: f(E, h),
                        htmlTextData: y,
                        image: f(function () {
                          return {
                            type: "image",
                            title: null,
                            url: "",
                            alt: null,
                          };
                        }),
                        label: h,
                        link: f(j),
                        listItem: f(function (e) {
                          return {
                            type: "listItem",
                            spread: e._spread,
                            checked: null,
                            children: [],
                          };
                        }),
                        listItemValue: function (e) {
                          r.expectingFirstListItemValue &&
                            ((this.stack[this.stack.length - 2].start =
                              parseInt(this.sliceSerialize(e), 10)),
                            (r.expectingFirstListItemValue = void 0));
                        },
                        listOrdered: f(I, function () {
                          r.expectingFirstListItemValue = !0;
                        }),
                        listUnordered: f(I),
                        paragraph: f(function () {
                          return { type: "paragraph", children: [] };
                        }),
                        reference: function () {
                          r.referenceType = "collapsed";
                        },
                        referenceString: h,
                        resourceDestinationString: h,
                        resourceTitleString: h,
                        setextHeading: f(A),
                        strong: f(function () {
                          return { type: "strong", children: [] };
                        }),
                        thematicBreak: f(function () {
                          return { type: "thematicBreak" };
                        }),
                      },
                      exit: {
                        atxHeading: g(),
                        atxHeadingSequence: function (e) {
                          this.stack[this.stack.length - 1].depth ||
                            (this.stack[this.stack.length - 1].depth =
                              this.sliceSerialize(e).length);
                        },
                        autolink: g(),
                        autolinkEmail: function (e) {
                          (v.call(this, e),
                            (this.stack[this.stack.length - 1].url =
                              "mailto:" + this.sliceSerialize(e)));
                        },
                        autolinkProtocol: function (e) {
                          (v.call(this, e),
                            (this.stack[this.stack.length - 1].url =
                              this.sliceSerialize(e)));
                        },
                        blockQuote: g(),
                        characterEscapeValue: v,
                        characterReferenceMarkerHexadecimal: w,
                        characterReferenceMarkerNumeric: w,
                        characterReferenceValue: function (e) {
                          var t,
                            n,
                            a = this.sliceSerialize(e),
                            o = r.characterReferenceType;
                          (o
                            ? ((t = s(
                                a,
                                "characterReferenceMarkerNumeric" === o
                                  ? 10
                                  : 16,
                              )),
                              (r.characterReferenceType = void 0))
                            : (t = p(a)),
                            (n = this.stack.pop()),
                            (n.value += t),
                            (n.position.end = u(e.end)));
                        },
                        codeFenced: g(function () {
                          var e = this.resume();
                          ((this.stack[this.stack.length - 1].value = e.replace(
                            /^(\r?\n|\r)|(\r?\n|\r)$/g,
                            "",
                          )),
                            (r.flowCodeInside = void 0));
                        }),
                        codeFencedFence: function () {
                          !r.flowCodeInside &&
                            (this.buffer(), (r.flowCodeInside = !0));
                        },
                        codeFencedFenceInfo: function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].lang = e;
                        },
                        codeFencedFenceMeta: function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].meta = e;
                        },
                        codeFlowValue: v,
                        codeIndented: g(function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].value = e;
                        }),
                        codeText: g(function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].value = e;
                        }),
                        codeTextData: v,
                        data: v,
                        definition: g(),
                        definitionDestinationString: function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].url = e;
                        },
                        definitionLabelString: function (e) {
                          var t = this.resume();
                          ((this.stack[this.stack.length - 1].label = t),
                            (this.stack[this.stack.length - 1].identifier = i(
                              this.sliceSerialize(e),
                            ).toLowerCase()));
                        },
                        definitionTitleString: function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].title = e;
                        },
                        emphasis: g(),
                        hardBreakEscape: g(k),
                        hardBreakTrailing: g(k),
                        htmlFlow: g(function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].value = e;
                        }),
                        htmlFlowData: v,
                        htmlText: g(function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].value = e;
                        }),
                        htmlTextData: v,
                        image: g(function () {
                          var e = this.stack[this.stack.length - 1];
                          (r.inReference
                            ? ((e.type += "Reference"),
                              (e.referenceType = r.referenceType || "shortcut"),
                              delete e.url,
                              delete e.title)
                            : (delete e.identifier,
                              delete e.label,
                              delete e.referenceType),
                            (r.referenceType = void 0));
                        }),
                        label: function () {
                          var e = this.stack[this.stack.length - 1],
                            t = this.resume();
                          ((this.stack[this.stack.length - 1].label = t),
                            (r.inReference = !0),
                            "link" === this.stack[this.stack.length - 1].type
                              ? (this.stack[this.stack.length - 1].children =
                                  e.children)
                              : (this.stack[this.stack.length - 1].alt = t));
                        },
                        labelText: function (e) {
                          this.stack[this.stack.length - 2].identifier = i(
                            this.sliceSerialize(e),
                          ).toLowerCase();
                        },
                        lineEnding: function (e) {
                          var n = this.stack[this.stack.length - 1];
                          if (r.atHardBreak) {
                            ((n.children[n.children.length - 1].position.end =
                              u(e.end)),
                              (r.atHardBreak = void 0));
                            return;
                          }
                          !r.setextHeadingSlurpLineEnding &&
                            t.canContainEols.indexOf(n.type) > -1 &&
                            (y.call(this, e), v.call(this, e));
                        },
                        link: g(function () {
                          var e = this.stack[this.stack.length - 1];
                          (r.inReference
                            ? ((e.type += "Reference"),
                              (e.referenceType = r.referenceType || "shortcut"),
                              delete e.url,
                              delete e.title)
                            : (delete e.identifier,
                              delete e.label,
                              delete e.referenceType),
                            (r.referenceType = void 0));
                        }),
                        listItem: g(),
                        listOrdered: g(),
                        listUnordered: g(),
                        paragraph: g(),
                        referenceString: function (e) {
                          var t = this.resume();
                          ((this.stack[this.stack.length - 1].label = t),
                            (this.stack[this.stack.length - 1].identifier = i(
                              this.sliceSerialize(e),
                            ).toLowerCase()),
                            (r.referenceType = "full"));
                        },
                        resourceDestinationString: function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].url = e;
                        },
                        resourceTitleString: function () {
                          var e = this.resume();
                          this.stack[this.stack.length - 1].title = e;
                        },
                        resource: function () {
                          r.inReference = void 0;
                        },
                        setextHeading: g(function () {
                          r.setextHeadingSlurpLineEnding = void 0;
                        }),
                        setextHeadingLineSequence: function (e) {
                          this.stack[this.stack.length - 1].depth =
                            61 === this.sliceSerialize(e).charCodeAt(0) ? 1 : 2;
                        },
                        setextHeadingText: function () {
                          r.setextHeadingSlurpLineEnding = !0;
                        },
                        strong: g(),
                        thematicBreak: g(),
                      },
                    },
                    (e || {}).mdastExtensions || [],
                  ),
                  r = {};
                return function (e) {
                  for (
                    var r,
                      n,
                      i = { type: "root", children: [] },
                      s = [],
                      p = [],
                      f = -1,
                      g = {
                        stack: [i],
                        tokenStack: s,
                        config: t,
                        enter: m,
                        exit: b,
                        buffer: h,
                        resume: x,
                        setData: l,
                        getData: c,
                      };
                    ++f < e.length;
                  )
                    ("listOrdered" === e[f][1].type ||
                      "listUnordered" === e[f][1].type) &&
                      ("enter" === e[f][0]
                        ? p.push(f)
                        : (f = (function (e, t, r) {
                            for (
                              var n,
                                a,
                                o,
                                i,
                                s,
                                l,
                                c,
                                p = t - 1,
                                d = -1,
                                f = !1;
                              ++p <= r;
                            )
                              if (
                                ("listUnordered" === (s = e[p])[1].type ||
                                "listOrdered" === s[1].type ||
                                "blockQuote" === s[1].type
                                  ? ("enter" === s[0] ? d++ : d--, (c = void 0))
                                  : "lineEndingBlank" === s[1].type
                                    ? "enter" === s[0] &&
                                      (!n || c || d || l || (l = p),
                                      (c = void 0))
                                    : "linePrefix" === s[1].type ||
                                      "listItemValue" === s[1].type ||
                                      "listItemMarker" === s[1].type ||
                                      "listItemPrefix" === s[1].type ||
                                      "listItemPrefixWhitespace" ===
                                        s[1].type ||
                                      (c = void 0),
                                (!d &&
                                  "enter" === s[0] &&
                                  "listItemPrefix" === s[1].type) ||
                                  (-1 === d &&
                                    "exit" === s[0] &&
                                    ("listUnordered" === s[1].type ||
                                      "listOrdered" === s[1].type)))
                              ) {
                                if (n) {
                                  for (a = p, o = void 0; a--;)
                                    if (
                                      "lineEnding" === (i = e[a])[1].type ||
                                      "lineEndingBlank" === i[1].type
                                    ) {
                                      if ("exit" === i[0]) continue;
                                      (o &&
                                        ((e[o][1].type = "lineEndingBlank"),
                                        (f = !0)),
                                        (i[1].type = "lineEnding"),
                                        (o = a));
                                    } else if (
                                      "linePrefix" === i[1].type ||
                                      "blockQuotePrefix" === i[1].type ||
                                      "blockQuotePrefixWhitespace" ===
                                        i[1].type ||
                                      "blockQuoteMarker" === i[1].type ||
                                      "listItemIndent" === i[1].type
                                    );
                                    else break;
                                  (l && (!o || l < o) && (n._spread = !0),
                                    (n.end = u(o ? e[o][1].start : s[1].end)),
                                    e.splice(o || p, 0, ["exit", n, s[2]]),
                                    p++,
                                    r++);
                                }
                                "listItemPrefix" === s[1].type &&
                                  ((n = {
                                    type: "listItem",
                                    _spread: !1,
                                    start: u(s[1].start),
                                  }),
                                  e.splice(p, 0, ["enter", n, s[2]]),
                                  p++,
                                  r++,
                                  (l = void 0),
                                  (c = !0));
                              }
                            return ((e[t][1]._spread = f), r);
                          })(e, (n = p.pop(f)), f)));
                  for (f = -1; ++f < e.length;)
                    ((r = t[e[f][0]]),
                      o.call(r, e[f][1].type) &&
                        r[e[f][1].type].call(
                          a({ sliceSerialize: e[f][2].sliceSerialize }, g),
                          e[f][1],
                        ));
                  if (s.length)
                    throw Error(
                      "Cannot close document, a token (`" +
                        s[s.length - 1].type +
                        "`, " +
                        d({
                          start: s[s.length - 1].start,
                          end: s[s.length - 1].end,
                        }) +
                        ") is still open",
                    );
                  for (
                    i.position = {
                      start: u(
                        e.length
                          ? e[0][1].start
                          : { line: 1, column: 1, offset: 0 },
                      ),
                      end: u(
                        e.length
                          ? e[e.length - 2][1].end
                          : { line: 1, column: 1, offset: 0 },
                      ),
                    },
                      f = -1;
                    ++f < t.transforms.length;
                  )
                    i = t.transforms[f](i) || i;
                  return i;
                };
                function l(e, t) {
                  r[e] = t;
                }
                function c(e) {
                  return r[e];
                }
                function u(e) {
                  return { line: e.line, column: e.column, offset: e.offset };
                }
                function f(e, t) {
                  return function (r) {
                    (m.call(this, e(r), r), t && t.call(this, r));
                  };
                }
                function h() {
                  this.stack.push({ type: "fragment", children: [] });
                }
                function m(e, t) {
                  return (
                    this.stack[this.stack.length - 1].children.push(e),
                    this.stack.push(e),
                    this.tokenStack.push(t),
                    (e.position = { start: u(t.start) }),
                    e
                  );
                }
                function g(e) {
                  return function (t) {
                    (e && e.call(this, t), b.call(this, t));
                  };
                }
                function b(e) {
                  var t = this.stack.pop(),
                    r = this.tokenStack.pop();
                  if (r) {
                    if (r.type !== e.type)
                      throw Error(
                        "Cannot close `" +
                          e.type +
                          "` (" +
                          d({ start: e.start, end: e.end }) +
                          "): a different token (`" +
                          r.type +
                          "`, " +
                          d({ start: r.start, end: r.end }) +
                          ") is open",
                      );
                  } else
                    throw Error(
                      "Cannot close `" +
                        e.type +
                        "` (" +
                        d({ start: e.start, end: e.end }) +
                        "): it\u2019s not open",
                    );
                  return ((t.position.end = u(e.end)), t);
                }
                function x() {
                  return n(this.stack.pop());
                }
                function y(e) {
                  var t = this.stack[this.stack.length - 1].children,
                    r = t[t.length - 1];
                  ((r && "text" === r.type) ||
                    (((r = { type: "text", value: "" }).position = {
                      start: u(e.start),
                    }),
                    this.stack[this.stack.length - 1].children.push(r)),
                    this.stack.push(r));
                }
                function v(e) {
                  var t = this.stack.pop();
                  ((t.value += this.sliceSerialize(e)),
                    (t.position.end = u(e.end)));
                }
                function k() {
                  r.atHardBreak = !0;
                }
                function w(e) {
                  var t;
                  ((t = e.type), (r.characterReferenceType = t));
                }
                function _() {
                  return { type: "code", lang: null, meta: null, value: "" };
                }
                function A() {
                  return { type: "heading", depth: void 0, children: [] };
                }
                function C() {
                  return { type: "break" };
                }
                function E() {
                  return { type: "html", value: "" };
                }
                function j() {
                  return { type: "link", title: null, url: "", children: [] };
                }
                function I(e) {
                  return {
                    type: "list",
                    ordered: "listOrdered" === e.type,
                    start: null,
                    spread: e._spread,
                    children: [],
                  };
                }
              })(r)(
                u(
                  l(r)
                    .document()
                    .write(c()(e, t, !0)),
                ),
              )
            );
          };
          var n = e("ee8a5388b4d34b82"),
            a = e("7a13b6d811214bcd"),
            o = e("81da867af7960f64"),
            i = e("74b27e53428867cf"),
            s = e("e2f7fd57a042c945"),
            l = e("c7fd7c275c6d04a3"),
            c = e("1f8077ca95d925e9"),
            u = e("6d47ff82e5b71bf9"),
            p = e("e682aaea41f8466e"),
            d = e("2a07a08b30355139");
        },
        {
          ee8a5388b4d34b82: "j53pC",
          "7a13b6d811214bcd": "2SPkz",
          "81da867af7960f64": "gULAK",
          "74b27e53428867cf": "8tCFG",
          e2f7fd57a042c945: "5ZLS5",
          c7fd7c275c6d04a3: "aRrbE",
          "1f8077ca95d925e9": "frk1q",
          "6d47ff82e5b71bf9": "gmdih",
          e682aaea41f8466e: "lcbet",
          "2a07a08b30355139": "86toc",
        },
      ],
      j53pC: [
        function (e, t, r) {
          function n(e) {
            return (
              (e &&
                (e.value ||
                  e.alt ||
                  e.title ||
                  ("children" in e && a(e.children)) ||
                  ("length" in e && a(e)))) ||
              ""
            );
          }
          function a(e) {
            for (var t = [], r = -1; ++r < e.length;) t[r] = n(e[r]);
            return t.join("");
          }
          t.exports = n;
        },
        {},
      ],
      "2SPkz": [
        function (e, t, r) {
          var n = Object.assign;
          t.exports = n;
        },
        {},
      ],
      gULAK: [
        function (e, t, r) {
          t.exports = {}.hasOwnProperty;
        },
        {},
      ],
      "8tCFG": [
        function (e, t, r) {
          t.exports = function (e) {
            return e
              .replace(/[\t\n\r ]+/g, " ")
              .replace(/^ | $/g, "")
              .toLowerCase()
              .toUpperCase();
          };
        },
        {},
      ],
      "5ZLS5": [
        function (e, t, r) {
          var n = e("a7bf174d5dec73f5");
          t.exports = function (e, t) {
            var r = parseInt(e, t);
            return r < 9 ||
              11 === r ||
              (r > 13 && r < 32) ||
              (r > 126 && r < 160) ||
              (r > 55295 && r < 57344) ||
              (r > 64975 && r < 65008) ||
              (65535 & r) == 65535 ||
              (65535 & r) == 65534 ||
              r > 1114111
              ? "\ufffd"
              : n(r);
          };
        },
        { a7bf174d5dec73f5: "39T21" },
      ],
      "39T21": [
        function (e, t, r) {
          var n = String.fromCharCode;
          t.exports = n;
        },
        {},
      ],
      aRrbE: [
        function (e, t, r) {
          var n = e("5e4a1a568699883f"),
            a = e("55ee3f72d47180ba"),
            o = e("e760e86c712cf0df"),
            i = e("a71490023eca0c00"),
            s = e("398519dc30e77372"),
            l = e("6fd86ba7cabef722"),
            c = e("63e3ebbaf592f992"),
            u = e("ede4973fef75278a");
          t.exports = function (e) {
            var t = {
              defined: [],
              constructs: s([u].concat(c((e || {}).extensions))),
              content: r(n),
              document: r(a),
              flow: r(o),
              string: r(i.string),
              text: r(i.text),
            };
            return t;
            function r(e) {
              return function (r) {
                return l(t, e, r);
              };
            }
          };
        },
        {
          "5e4a1a568699883f": "1o6hj",
          "55ee3f72d47180ba": "9PRxX",
          e760e86c712cf0df: "lBJru",
          a71490023eca0c00: "5KdFi",
          "398519dc30e77372": "kQyHb",
          "6fd86ba7cabef722": "6KJ5l",
          "63e3ebbaf592f992": "h1to5",
          ede4973fef75278a: "rxvD8",
        },
      ],
      "1o6hj": [
        function (e, t, r) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var n = e("864f2e30dbe3589c"),
            a = e("f71c52d3973929cc");
          r.tokenize = function (e) {
            var t,
              r = e.attempt(
                this.parser.constructs.contentInitial,
                function (t) {
                  if (null === t) {
                    e.consume(t);
                    return;
                  }
                  return (
                    e.enter("lineEnding"),
                    e.consume(t),
                    e.exit("lineEnding"),
                    a(e, r, "linePrefix")
                  );
                },
                function (r) {
                  return (
                    e.enter("paragraph"),
                    (function r(a) {
                      var o = e.enter("chunkText", {
                        contentType: "text",
                        previous: t,
                      });
                      return (
                        t && (t.next = o),
                        (t = o),
                        (function t(a) {
                          if (null === a) {
                            (e.exit("chunkText"),
                              e.exit("paragraph"),
                              e.consume(a));
                            return;
                          }
                          return n(a)
                            ? (e.consume(a), e.exit("chunkText"), r)
                            : (e.consume(a), t);
                        })(a)
                      );
                    })(r)
                  );
                },
              );
            return r;
          };
        },
        { "864f2e30dbe3589c": "1tQ98", f71c52d3973929cc: "j0hN2" },
      ],
      "1tQ98": [
        function (e, t, r) {
          t.exports = function (e) {
            return e < -2;
          };
        },
        {},
      ],
      j0hN2: [
        function (e, t, r) {
          var n = e("d22bbe5de7c7e270");
          t.exports = function (e, t, r, a) {
            var o = a ? a - 1 : 1 / 0,
              i = 0;
            return function (a) {
              return n(a)
                ? (e.enter(r),
                  (function a(s) {
                    return n(s) && i++ < o
                      ? (e.consume(s), a)
                      : (e.exit(r), t(s));
                  })(a))
                : t(a);
            };
          };
        },
        { d22bbe5de7c7e270: "aliHq" },
      ],
      aliHq: [
        function (e, t, r) {
          t.exports = function (e) {
            return -2 === e || -1 === e || 32 === e;
          };
        },
        {},
      ],
      "9PRxX": [
        function (e, t, r) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var n = e("c4d5ff37dfdc6a2f"),
            a = e("88081a528504cc23"),
            o = e("19519bac6241d968"),
            i = {
              tokenize: function (e, t, r) {
                return a(
                  e,
                  e.attempt(this.parser.constructs.document, t, r),
                  "linePrefix",
                  this.parser.constructs.disable.null.indexOf("codeIndented") >
                    -1
                    ? void 0
                    : 4,
                );
              },
            },
            s = {
              tokenize: function (e, t, r) {
                return a(
                  e,
                  e.lazy(this.parser.constructs.flow, t, r),
                  "linePrefix",
                  this.parser.constructs.disable.null.indexOf("codeIndented") >
                    -1
                    ? void 0
                    : 4,
                );
              },
            };
          r.tokenize = function (e) {
            var t,
              r,
              a,
              l = this,
              c = [],
              u = 0,
              p = {
                tokenize: function (e, n) {
                  var a = 0;
                  return ((t = {}), u);
                  function u(n) {
                    return a < c.length
                      ? ((l.containerState = c[a][1]),
                        e.attempt(c[a][0].continuation, p, d)(n))
                      : r.currentConstruct && r.currentConstruct.concrete
                        ? ((t.flowContinue = !0), m(n))
                        : ((l.interrupt =
                            r.currentConstruct &&
                            r.currentConstruct.interruptible),
                          (l.containerState = {}),
                          e.attempt(i, h, m)(n));
                  }
                  function p(e) {
                    return (a++, l.containerState._closeFlow ? h(e) : u(e));
                  }
                  function d(t) {
                    return r.currentConstruct && r.currentConstruct.lazy
                      ? ((l.containerState = {}),
                        e.attempt(i, h, e.attempt(s, h, e.check(o, h, f)))(t))
                      : h(t);
                  }
                  function f(e) {
                    return (
                      (a = c.length),
                      (t.lazy = !0),
                      (t.flowContinue = !0),
                      m(e)
                    );
                  }
                  function h(e) {
                    return ((t.flowEnd = !0), m(e));
                  }
                  function m(e) {
                    return (
                      (t.continued = a),
                      (l.interrupt = l.containerState = void 0),
                      n(e)
                    );
                  }
                },
                partial: !0,
              };
            return d;
            function d(t) {
              return u < c.length
                ? ((l.containerState = c[u][1]),
                  e.attempt(c[u][0].continuation, f, h)(t))
                : h(t);
            }
            function f(e) {
              return (u++, d(e));
            }
            function h(n) {
              return t && t.flowContinue
                ? g(n)
                : ((l.interrupt =
                    r &&
                    r.currentConstruct &&
                    r.currentConstruct.interruptible),
                  (l.containerState = {}),
                  e.attempt(i, m, g)(n));
            }
            function m(e) {
              return (
                c.push([l.currentConstruct, l.containerState]),
                (l.containerState = void 0),
                h(e)
              );
            }
            function g(t) {
              if (null === t) {
                (y(0, !0), e.consume(t));
                return;
              }
              return (
                (r = r || l.parser.flow(l.now())),
                e.enter("chunkFlow", {
                  contentType: "flow",
                  previous: a,
                  _tokenizer: r,
                }),
                (function t(r) {
                  return null === r
                    ? (x(e.exit("chunkFlow")), g(r))
                    : n(r)
                      ? (e.consume(r), x(e.exit("chunkFlow")), e.check(p, b))
                      : (e.consume(r), t);
                })(t)
              );
            }
            function b(e) {
              return (y(t.continued, t && t.flowEnd), (u = 0), d(e));
            }
            function x(e) {
              (a && (a.next = e),
                (a = e),
                (r.lazy = t && t.lazy),
                r.defineSkip(e.start),
                r.write(l.sliceStream(e)));
            }
            function y(t, n) {
              var o = c.length;
              for (r && n && (r.write([null]), (a = r = void 0)); o-- > t;)
                ((l.containerState = c[o][1]), c[o][0].exit.call(l, e));
              c.length = t;
            }
          };
        },
        {
          c4d5ff37dfdc6a2f: "1tQ98",
          "88081a528504cc23": "j0hN2",
          "19519bac6241d968": "ds5kQ",
        },
      ],
      ds5kQ: [
        function (e, t, r) {
          var n = e("5cc18bf877d84a4c"),
            a = e("1937c06fe1726cfb");
          t.exports = {
            tokenize: function (e, t, r) {
              return a(
                e,
                function (e) {
                  return null === e || n(e) ? t(e) : r(e);
                },
                "linePrefix",
              );
            },
            partial: !0,
          };
        },
        { "5cc18bf877d84a4c": "1tQ98", "1937c06fe1726cfb": "j0hN2" },
      ],
      lBJru: [
        function (e, t, r) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var n = e("7c0f69cce18d9082"),
            a = e("1486657aa0b45046"),
            o = e("2a39c8b76b34f4cc");
          r.tokenize = function (e) {
            var t = this,
              r = e.attempt(
                o,
                function (n) {
                  if (null === n) {
                    e.consume(n);
                    return;
                  }
                  return (
                    e.enter("lineEndingBlank"),
                    e.consume(n),
                    e.exit("lineEndingBlank"),
                    (t.currentConstruct = void 0),
                    r
                  );
                },
                e.attempt(
                  this.parser.constructs.flowInitial,
                  i,
                  a(
                    e,
                    e.attempt(this.parser.constructs.flow, i, e.attempt(n, i)),
                    "linePrefix",
                  ),
                ),
              );
            return r;
            function i(n) {
              if (null === n) {
                e.consume(n);
                return;
              }
              return (
                e.enter("lineEnding"),
                e.consume(n),
                e.exit("lineEnding"),
                (t.currentConstruct = void 0),
                r
              );
            }
          };
        },
        {
          "7c0f69cce18d9082": "cL0UH",
          "1486657aa0b45046": "j0hN2",
          "2a39c8b76b34f4cc": "ds5kQ",
        },
      ],
      cL0UH: [
        function (e, t, r) {
          var n = e("aba54d04f77b1aef"),
            a = e("fc1628ad92f60730"),
            o = e("5812d653fdbac24b"),
            i = e("3da0f5a9bfb73b63"),
            s = {
              tokenize: function (e, t, r) {
                var o = this;
                return function (t) {
                  return (
                    e.enter("lineEnding"),
                    e.consume(t),
                    e.exit("lineEnding"),
                    i(e, s, "linePrefix")
                  );
                };
                function s(i) {
                  return null === i || n(i)
                    ? r(i)
                    : o.parser.constructs.disable.null.indexOf("codeIndented") >
                          -1 || 4 > a(o.events, "linePrefix")
                      ? e.interrupt(o.parser.constructs.flow, r, t)(i)
                      : t(i);
                }
              },
              partial: !0,
            };
          t.exports = {
            tokenize: function (e, t) {
              var r;
              return function (t) {
                return (
                  e.enter("content"),
                  (r = e.enter("chunkContent", { contentType: "content" })),
                  a(t)
                );
              };
              function a(t) {
                return null === t
                  ? o(t)
                  : n(t)
                    ? e.check(s, i, o)(t)
                    : (e.consume(t), a);
              }
              function o(r) {
                return (e.exit("chunkContent"), e.exit("content"), t(r));
              }
              function i(t) {
                return (
                  e.consume(t),
                  e.exit("chunkContent"),
                  (r = r.next =
                    e.enter("chunkContent", {
                      contentType: "content",
                      previous: r,
                    })),
                  a
                );
              }
            },
            resolve: function (e) {
              return (o(e), e);
            },
            interruptible: !0,
            lazy: !0,
          };
        },
        {
          aba54d04f77b1aef: "1tQ98",
          fc1628ad92f60730: "hRwvs",
          "5812d653fdbac24b": "48aIz",
          "3da0f5a9bfb73b63": "j0hN2",
        },
      ],
      hRwvs: [
        function (e, t, r) {
          var n = e("c73e22b719b22905");
          t.exports = function (e, t) {
            var r = e[e.length - 1];
            return r && r[1].type === t ? n(r[2].sliceStream(r[1])) : 0;
          };
        },
        { c73e22b719b22905: "24NRN" },
      ],
      "24NRN": [
        function (e, t, r) {
          t.exports = function (e) {
            for (var t = -1, r = 0; ++t < e.length;)
              r += "string" == typeof e[t] ? e[t].length : 1;
            return r;
          };
        },
        {},
      ],
      "48aIz": [
        function (e, t, r) {
          var n = e("c04002c2aee1e392"),
            a = e("ce5225f95ad547b7"),
            o = e("7c856b668c47a994");
          t.exports = function (e) {
            for (var t, r, i, s, l, c, u, p = {}, d = -1; ++d < e.length;) {
              for (; d in p;) d = p[d];
              if (
                ((t = e[d]),
                d &&
                  "chunkFlow" === t[1].type &&
                  "listItemPrefix" === e[d - 1][1].type &&
                  ((i = 0) < (c = t[1]._tokenizer.events).length &&
                    "lineEndingBlank" === c[i][1].type &&
                    (i += 2),
                  i < c.length && "content" === c[i][1].type))
              )
                for (; ++i < c.length && "content" !== c[i][1].type;)
                  "chunkText" === c[i][1].type &&
                    ((c[i][1].isInFirstContentOfListItem = !0), i++);
              if ("enter" === t[0])
                t[1].contentType &&
                  (n(
                    p,
                    (function (e, t) {
                      for (
                        var r,
                          n,
                          o,
                          i,
                          s,
                          l,
                          c = e[t][1],
                          u = e[t][2],
                          p = t - 1,
                          d = [],
                          f = c._tokenizer || u.parser[c.contentType](c.start),
                          h = f.events,
                          m = [],
                          g = {};
                        c;
                      ) {
                        for (; e[++p][1] !== c;);
                        (d.push(p),
                          !c._tokenizer &&
                            ((r = u.sliceStream(c)),
                            c.next || r.push(null),
                            n && f.defineSkip(c.start),
                            c.isInFirstContentOfListItem &&
                              (f._gfmTasklistFirstContentOfListItem = !0),
                            f.write(r),
                            c.isInFirstContentOfListItem &&
                              (f._gfmTasklistFirstContentOfListItem = void 0)),
                          (n = c),
                          (c = c.next));
                      }
                      for (c = n, o = h.length; o--;)
                        "enter" === h[o][0]
                          ? (i = !0)
                          : i &&
                            h[o][1].type === h[o - 1][1].type &&
                            h[o][1].start.line !== h[o][1].end.line &&
                            (b(h.slice(o + 1, s)),
                            (c._tokenizer = c.next = void 0),
                            (c = c.previous),
                            (s = o + 1));
                      for (
                        f.events = c._tokenizer = c.next = void 0,
                          b(h.slice(0, s)),
                          o = -1,
                          l = 0;
                        ++o < m.length;
                      )
                        ((g[l + m[o][0]] = l + m[o][1]),
                          (l += m[o][1] - m[o][0] - 1));
                      return g;
                      function b(t) {
                        var r = d.pop();
                        (m.unshift([r, r + t.length - 1]), a(e, r, 2, t));
                      }
                    })(e, d),
                  ),
                  (d = p[d]),
                  (u = !0));
              else if (t[1]._container || t[1]._movePreviousLineEndings) {
                for (i = d, r = void 0; i--;)
                  if (
                    "lineEnding" === (s = e[i])[1].type ||
                    "lineEndingBlank" === s[1].type
                  )
                    "enter" === s[0] &&
                      (r && (e[r][1].type = "lineEndingBlank"),
                      (s[1].type = "lineEnding"),
                      (r = i));
                  else break;
                r &&
                  ((t[1].end = o(e[r][1].start)),
                  (l = e.slice(r, d)).unshift(t),
                  a(e, r, d - r + 1, l));
              }
            }
            return !u;
          };
        },
        {
          c04002c2aee1e392: "2SPkz",
          ce5225f95ad547b7: "6yEEr",
          "7c856b668c47a994": "fpPTw",
        },
      ],
      "6yEEr": [
        function (e, t, r) {
          var n = e("24b5fa1e81390aea");
          t.exports = function (e, t, r, a) {
            var o,
              i = e.length,
              s = 0;
            if (
              ((t = t < 0 ? (-t > i ? 0 : i + t) : t > i ? i : t),
              (r = r > 0 ? r : 0),
              a.length < 1e4)
            )
              ((o = Array.from(a)).unshift(t, r), n.apply(e, o));
            else
              for (r && n.apply(e, [t, r]); s < a.length;)
                ((o = a.slice(s, s + 1e4)).unshift(t, 0),
                  n.apply(e, o),
                  (s += 1e4),
                  (t += 1e4));
          };
        },
        { "24b5fa1e81390aea": "bQfFU" },
      ],
      bQfFU: [
        function (e, t, r) {
          var n = [].splice;
          t.exports = n;
        },
        {},
      ],
      fpPTw: [
        function (e, t, r) {
          var n = e("36c29f342c45941c");
          t.exports = function (e) {
            return n({}, e);
          };
        },
        { "36c29f342c45941c": "2SPkz" },
      ],
      "5KdFi": [
        function (e, t, r) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var n = e("9dc5719466ca027f"),
            a = e("174e25b8a4f3dcdd"),
            o = l("text"),
            i = l("string"),
            s = { resolveAll: c() };
          function l(e) {
            return {
              tokenize: function (t) {
                var r = this,
                  n = this.parser.constructs[e],
                  a = t.attempt(n, o, i);
                return o;
                function o(e) {
                  return l(e) ? a(e) : i(e);
                }
                function i(e) {
                  if (null === e) {
                    t.consume(e);
                    return;
                  }
                  return (t.enter("data"), t.consume(e), s);
                }
                function s(e) {
                  return l(e) ? (t.exit("data"), a(e)) : (t.consume(e), s);
                }
                function l(e) {
                  var t = n[e],
                    a = -1;
                  if (null === e) return !0;
                  if (t) {
                    for (; ++a < t.length;)
                      if (!t[a].previous || t[a].previous.call(r, r.previous))
                        return !0;
                  }
                }
              },
              resolveAll: c("text" === e ? u : void 0),
            };
          }
          function c(e) {
            return function (t, r) {
              for (var n, a = -1; ++a <= t.length;)
                void 0 === n
                  ? t[a] && "data" === t[a][1].type && ((n = a), a++)
                  : (t[a] && "data" === t[a][1].type) ||
                    (a !== n + 2 &&
                      ((t[n][1].end = t[a - 1][1].end),
                      t.splice(n + 2, a - n - 2),
                      (a = n + 2)),
                    (n = void 0));
              return e ? e(t, r) : t;
            };
          }
          function u(e, t) {
            for (var r, o, i, s, l, c, u, p, d = -1; ++d <= e.length;)
              if (
                (d === e.length || "lineEnding" === e[d][1].type) &&
                "data" === e[d - 1][1].type
              ) {
                for (
                  o = e[d - 1][1],
                    s = (r = t.sliceStream(o)).length,
                    l = -1,
                    c = 0,
                    u = void 0;
                  s--;
                )
                  if ("string" == typeof (i = r[s])) {
                    for (l = i.length; 32 === i.charCodeAt(l - 1);) (c++, l--);
                    if (l) break;
                    l = -1;
                  } else if (-2 === i) ((u = !0), c++);
                  else if (-1 === i);
                  else {
                    s++;
                    break;
                  }
                (c &&
                  ((p = {
                    type:
                      d === e.length || u || c < 2
                        ? "lineSuffix"
                        : "hardBreakTrailing",
                    start: {
                      line: o.end.line,
                      column: o.end.column - c,
                      offset: o.end.offset - c,
                      _index: o.start._index + s,
                      _bufferIndex: s ? l : o.start._bufferIndex + l,
                    },
                    end: a(o.end),
                  }),
                  (o.end = a(p.start)),
                  o.start.offset === o.end.offset
                    ? n(o, p)
                    : (e.splice(d, 0, ["enter", p, t], ["exit", p, t]),
                      (d += 2))),
                  d++);
              }
            return e;
          }
          ((r.resolver = s), (r.string = i), (r.text = o));
        },
        { "9dc5719466ca027f": "2SPkz", "174e25b8a4f3dcdd": "fpPTw" },
      ],
      kQyHb: [
        function (e, t, r) {
          var n = e("562f11c894e09255"),
            a = e("4369a81925d1e95d"),
            o = e("c651c7324b41a2d");
          t.exports = function (e) {
            for (var t = {}, r = -1; ++r < e.length;)
              (function (e, t) {
                var r, i, s, l;
                for (r in t)
                  for (l in ((i = n.call(e, r) ? e[r] : (e[r] = {})),
                  (s = t[r])))
                    i[l] = (function (e, t) {
                      for (var r = -1, n = []; ++r < e.length;)
                        ("after" === e[r].add ? t : n).push(e[r]);
                      return (a(t, 0, 0, n), t);
                    })(o(s[l]), n.call(i, l) ? i[l] : []);
              })(t, e[r]);
            return t;
          };
        },
        {
          "562f11c894e09255": "gULAK",
          "4369a81925d1e95d": "6yEEr",
          c651c7324b41a2d: "h1to5",
        },
      ],
      h1to5: [
        function (e, t, r) {
          t.exports = function (e) {
            return null == e ? [] : "length" in e ? e : [e];
          };
        },
        {},
      ],
      "6KJ5l": [
        function (e, t, r) {
          var n = e("85313e64b084f95f"),
            a = e("588e1fd0dba3b7fc"),
            o = e("d4e9bc78226e3b72"),
            i = e("952ff93fd79fe14a"),
            s = e("d71ae78f3c114902"),
            l = e("1e5b763413f0e476"),
            c = e("4eb585aedc9c6c41"),
            u = e("bb5074e7e37b5f1e"),
            p = e("88fe00c526f640a8");
          t.exports = function (e, t, r) {
            var d = r ? u(r) : { line: 1, column: 1, offset: 0 },
              f = {},
              h = [],
              m = [],
              g = [],
              b = {
                consume: function (e) {
                  (a(e)
                    ? (d.line++,
                      (d.column = 1),
                      (d.offset += -3 === e ? 2 : 1),
                      C())
                    : -1 !== e && (d.column++, d.offset++),
                    d._bufferIndex < 0
                      ? d._index++
                      : (d._bufferIndex++,
                        d._bufferIndex === m[d._index].length &&
                          ((d._bufferIndex = -1), d._index++)),
                    (x.previous = e));
                },
                enter: function (e, t) {
                  var r = t || {};
                  return (
                    (r.type = e),
                    (r.start = k()),
                    x.events.push(["enter", r, x]),
                    g.push(r),
                    r
                  );
                },
                exit: function (e) {
                  var t = g.pop();
                  return ((t.end = k()), x.events.push(["exit", t, x]), t);
                },
                attempt: _(function (e, t) {
                  A(e, t.from);
                }),
                check: _(w),
                interrupt: _(w, { interrupt: !0 }),
                lazy: _(w, { lazy: !0 }),
              },
              x = {
                previous: null,
                events: [],
                parser: e,
                sliceStream: v,
                sliceSerialize: function (e) {
                  return c(v(e));
                },
                now: k,
                defineSkip: function (e) {
                  ((f[e.line] = e.column), C());
                },
                write: function (e) {
                  return ((m = o(m, e)),
                  (function () {
                    for (var e, t, r; d._index < m.length;)
                      if ("string" == typeof (t = m[d._index]))
                        for (
                          e = d._index,
                            d._bufferIndex < 0 && (d._bufferIndex = 0);
                          d._index === e && d._bufferIndex < t.length;
                        )
                          ((r = t.charCodeAt(d._bufferIndex)), (y = y(r)));
                      else y = y(t);
                  })(),
                  null !== m[m.length - 1])
                    ? []
                    : (A(t, 0), (x.events = l(h, x.events, x)), x.events);
                },
              },
              y = t.tokenize.call(x, b);
            return (
              t.resolveAll && h.push(t),
              (d._index = 0),
              (d._bufferIndex = -1),
              x
            );
            function v(e) {
              return p(m, e);
            }
            function k() {
              return u(d);
            }
            function w(e, t) {
              t.restore();
            }
            function _(e, t) {
              return function (r, a, o) {
                var i, l, c, u;
                return r.tokenize || "length" in r
                  ? p(s(r))
                  : function (e) {
                      return e in r || null in r
                        ? p(r.null ? s(r[e]).concat(s(r.null)) : r[e])(e)
                        : o(e);
                    };
                function p(e) {
                  return ((i = e), f(e[(l = 0)]));
                }
                function f(e) {
                  return function (r) {
                    var a, o, i, s, l;
                    return ((a = k()),
                    (o = x.previous),
                    (i = x.currentConstruct),
                    (s = x.events.length),
                    (l = Array.from(g)),
                    (u = {
                      restore: function () {
                        ((d = a),
                          (x.previous = o),
                          (x.currentConstruct = i),
                          (x.events.length = s),
                          (g = l),
                          C());
                      },
                      from: s,
                    }),
                    (c = e),
                    e.partial || (x.currentConstruct = e),
                    e.name &&
                      x.parser.constructs.disable.null.indexOf(e.name) > -1)
                      ? m()
                      : e.tokenize.call(t ? n({}, x, t) : x, b, h, m)(r);
                  };
                }
                function h(t) {
                  return (e(c, u), a);
                }
                function m(e) {
                  return (u.restore(), ++l < i.length) ? f(i[l]) : o;
                }
              };
            }
            function A(e, t) {
              (e.resolveAll && 0 > h.indexOf(e) && h.push(e),
                e.resolve &&
                  i(
                    x.events,
                    t,
                    x.events.length - t,
                    e.resolve(x.events.slice(t), x),
                  ),
                e.resolveTo && (x.events = e.resolveTo(x.events, x)));
            }
            function C() {
              d.line in f &&
                d.column < 2 &&
                ((d.column = f[d.line]), (d.offset += f[d.line] - 1));
            }
          };
        },
        {
          "85313e64b084f95f": "2SPkz",
          "588e1fd0dba3b7fc": "1tQ98",
          d4e9bc78226e3b72: "765DT",
          "952ff93fd79fe14a": "6yEEr",
          d71ae78f3c114902: "h1to5",
          "1e5b763413f0e476": "8uO5H",
          "4eb585aedc9c6c41": "kASml",
          bb5074e7e37b5f1e: "fpPTw",
          "88fe00c526f640a8": "mGZ4b",
        },
      ],
      "765DT": [
        function (e, t, r) {
          var n = e("56d4b710fad75bae");
          t.exports = function (e, t) {
            return e.length ? (n(e, e.length, 0, t), e) : t;
          };
        },
        { "56d4b710fad75bae": "6yEEr" },
      ],
      "8uO5H": [
        function (e, t, r) {
          t.exports = function (e, t, r) {
            for (var n, a = [], o = -1; ++o < e.length;)
              (n = e[o].resolveAll) &&
                0 > a.indexOf(n) &&
                ((t = n(t, r)), a.push(n));
            return t;
          };
        },
        {},
      ],
      kASml: [
        function (e, t, r) {
          var n = e("7e5dab92da7500e6");
          t.exports = function (e) {
            for (var t, r, a, o = -1, i = []; ++o < e.length;) {
              if ("string" == typeof (t = e[o])) r = t;
              else if (-5 === t) r = "\r";
              else if (-4 === t) r = "\n";
              else if (-3 === t) r = "\r\n";
              else if (-2 === t) r = "	";
              else if (-1 === t) {
                if (a) continue;
                r = " ";
              } else r = n(t);
              ((a = -2 === t), i.push(r));
            }
            return i.join("");
          };
        },
        { "7e5dab92da7500e6": "39T21" },
      ],
      mGZ4b: [
        function (e, t, r) {
          t.exports = function (e, t) {
            var r,
              n = t.start._index,
              a = t.start._bufferIndex,
              o = t.end._index,
              i = t.end._bufferIndex;
            return (
              n === o
                ? (r = [e[n].slice(a, i)])
                : ((r = e.slice(n, o)),
                  a > -1 && (r[0] = r[0].slice(a)),
                  i > 0 && r.push(e[o].slice(0, i))),
              r
            );
          };
        },
        {},
      ],
      rxvD8: [
        function (e, t, r) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var n = e("b9bb7b1e97ad755c"),
            a = e("3621f56528d5f2fe"),
            o = e("8ec16ac870ba614"),
            i = e("6d1d78cc900a0f30"),
            s = e("23085c43abad1c56"),
            l = e("3c4afc1f026e9320"),
            c = e("1b5084ecabb89017"),
            u = e("20d8fdcc2fe5eefb"),
            p = e("72c949ce126aa925"),
            d = e("69834e907b492a24"),
            f = e("c34fcb1baec613fc"),
            h = e("33e97f83c1ba79b3"),
            m = e("b004c3e79e97868a"),
            g = e("20baaec8efec1bb9"),
            b = e("dabba643c36026cc"),
            x = e("6c481019780513e0"),
            y = e("eb29d65d12e2e2c7"),
            v = e("290e89765b97bbb0"),
            k = e("dd93cea3e5ca3251"),
            w = e("4812bc58411fc3e1"),
            _ = e("37c56ac1ab9dde3e"),
            A = { null: [a, n.resolver] };
          ((r.contentInitial = { 91: d }),
            (r.disable = { null: [] }),
            (r.document = {
              42: k,
              43: k,
              45: k,
              48: k,
              49: k,
              50: k,
              51: k,
              52: k,
              53: k,
              54: k,
              55: k,
              56: k,
              57: k,
              62: i,
            }),
            (r.flow = {
              35: h,
              42: _,
              45: [w, _],
              60: m,
              61: w,
              95: _,
              96: c,
              126: c,
            }),
            (r.flowInitial = { "-2": u, "-1": u, 32: u }),
            (r.insideSpan = A),
            (r.string = { 38: l, 92: s }),
            (r.text = {
              "-5": v,
              "-4": v,
              "-3": v,
              33: x,
              38: l,
              42: a,
              60: [o, g],
              91: y,
              92: [f, s],
              93: b,
              95: a,
              96: p,
            }));
        },
        {
          b9bb7b1e97ad755c: "5KdFi",
          "3621f56528d5f2fe": "bofbK",
          "8ec16ac870ba614": "h9o9x",
          "6d1d78cc900a0f30": "cwbi7",
          "23085c43abad1c56": "hAAvK",
          "3c4afc1f026e9320": "184Jm",
          "1b5084ecabb89017": "iAAfW",
          "20d8fdcc2fe5eefb": "bshUJ",
          "72c949ce126aa925": "aoYJ2",
          "69834e907b492a24": "jYpgq",
          c34fcb1baec613fc: "1Cqip",
          "33e97f83c1ba79b3": "3hVGm",
          b004c3e79e97868a: "cka8H",
          "20baaec8efec1bb9": "csxZL",
          dabba643c36026cc: "cEsUJ",
          "6c481019780513e0": "kycns",
          eb29d65d12e2e2c7: "2hIYv",
          "290e89765b97bbb0": "hZdRW",
          dd93cea3e5ca3251: "h7Ccp",
          "4812bc58411fc3e1": "8CsV2",
          "37c56ac1ab9dde3e": "eNrRr",
        },
      ],
      bofbK: [
        function (e, t, r) {
          var n = e("ea9775d6487dad16"),
            a = e("5d1997326a433262"),
            o = e("58e67c0039e80c17"),
            i = e("3ded693fb21a1ad8"),
            s = e("fe0557909dbe90be"),
            l = e("30a4b0cd8c434950");
          t.exports = {
            name: "attention",
            tokenize: function (e, t) {
              var r,
                n = o(this.previous);
              return function (a) {
                return (
                  e.enter("attentionSequence"),
                  (r = a),
                  (function a(i) {
                    var s, l, c, u;
                    return i === r
                      ? (e.consume(i), a)
                      : ((s = e.exit("attentionSequence")),
                        (c = !(l = o(i)) || (2 === l && n)),
                        (u = !n || (2 === n && l)),
                        (s._open = 42 === r ? c : c && (n || !u)),
                        (s._close = 42 === r ? u : u && (l || !c)),
                        t(i));
                  })(a)
                );
              };
            },
            resolveAll: function (e, t) {
              for (var r, o, c, u, p, d, f, h, m = -1; ++m < e.length;)
                if (
                  "enter" === e[m][0] &&
                  "attentionSequence" === e[m][1].type &&
                  e[m][1]._close
                ) {
                  for (r = m; r--;)
                    if (
                      "exit" === e[r][0] &&
                      "attentionSequence" === e[r][1].type &&
                      e[r][1]._open &&
                      t.sliceSerialize(e[r][1]).charCodeAt(0) ===
                        t.sliceSerialize(e[m][1]).charCodeAt(0)
                    ) {
                      if (
                        (e[r][1]._close || e[m][1]._open) &&
                        (e[m][1].end.offset - e[m][1].start.offset) % 3 &&
                        !(
                          (e[r][1].end.offset -
                            e[r][1].start.offset +
                            e[m][1].end.offset -
                            e[m][1].start.offset) %
                          3
                        )
                      )
                        continue;
                      ((u = {
                        type:
                          (d =
                            e[r][1].end.offset - e[r][1].start.offset > 1 &&
                            e[m][1].end.offset - e[m][1].start.offset > 1
                              ? 2
                              : 1) > 1
                            ? "strongSequence"
                            : "emphasisSequence",
                        start: i(l(e[r][1].end), -d),
                        end: l(e[r][1].end),
                      }),
                        (p = {
                          type: d > 1 ? "strongSequence" : "emphasisSequence",
                          start: l(e[m][1].start),
                          end: i(l(e[m][1].start), d),
                        }),
                        (c = {
                          type: d > 1 ? "strongText" : "emphasisText",
                          start: l(e[r][1].end),
                          end: l(e[m][1].start),
                        }),
                        (o = {
                          type: d > 1 ? "strong" : "emphasis",
                          start: l(u.start),
                          end: l(p.end),
                        }),
                        (e[r][1].end = l(u.start)),
                        (e[m][1].start = l(p.end)),
                        (f = []),
                        e[r][1].end.offset - e[r][1].start.offset &&
                          (f = n(f, [
                            ["enter", e[r][1], t],
                            ["exit", e[r][1], t],
                          ])),
                        (f = n(f, [
                          ["enter", o, t],
                          ["enter", u, t],
                          ["exit", u, t],
                          ["enter", c, t],
                        ])),
                        (f = n(
                          f,
                          s(
                            t.parser.constructs.insideSpan.null,
                            e.slice(r + 1, m),
                            t,
                          ),
                        )),
                        (f = n(f, [
                          ["exit", c, t],
                          ["enter", p, t],
                          ["exit", p, t],
                          ["exit", o, t],
                        ])),
                        e[m][1].end.offset - e[m][1].start.offset
                          ? ((h = 2),
                            (f = n(f, [
                              ["enter", e[m][1], t],
                              ["exit", e[m][1], t],
                            ])))
                          : (h = 0),
                        a(e, r - 1, m - r + 3, f),
                        (m = r + f.length - h - 2));
                      break;
                    }
                }
              for (m = -1; ++m < e.length;)
                "attentionSequence" === e[m][1].type && (e[m][1].type = "data");
              return e;
            },
          };
        },
        {
          ea9775d6487dad16: "765DT",
          "5d1997326a433262": "6yEEr",
          "58e67c0039e80c17": "4nWHv",
          "3ded693fb21a1ad8": "fqAXk",
          fe0557909dbe90be: "8uO5H",
          "30a4b0cd8c434950": "fpPTw",
        },
      ],
      "4nWHv": [
        function (e, t, r) {
          var n = e("1cfe29596ae70419"),
            a = e("13c8571d976b0a38"),
            o = e("fb4660043762e687");
          t.exports = function (e) {
            return null === e || n(e) || o(e) ? 1 : a(e) ? 2 : void 0;
          };
        },
        {
          "1cfe29596ae70419": "5jCAX",
          "13c8571d976b0a38": "8rLtM",
          fb4660043762e687: "6klFs",
        },
      ],
      "5jCAX": [
        function (e, t, r) {
          t.exports = function (e) {
            return e < 0 || 32 === e;
          };
        },
        {},
      ],
      "8rLtM": [
        function (e, t, r) {
          var n = e("596804e630f52296"),
            a = e("60454da7bd6bea2d")(n);
          t.exports = a;
        },
        { "596804e630f52296": "cdefz", "60454da7bd6bea2d": "fp9bp" },
      ],
      cdefz: [
        function (e, t, r) {
          t.exports =
            /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
        },
        {},
      ],
      fp9bp: [
        function (e, t, r) {
          var n = e("bda2f30eec1932fd");
          t.exports = function (e) {
            return function (t) {
              return e.test(n(t));
            };
          };
        },
        { bda2f30eec1932fd: "39T21" },
      ],
      "6klFs": [
        function (e, t, r) {
          var n = e("a0ea8c7c9d20af6e")(/\s/);
          t.exports = n;
        },
        { a0ea8c7c9d20af6e: "fp9bp" },
      ],
      fqAXk: [
        function (e, t, r) {
          t.exports = function (e, t) {
            return ((e.column += t), (e.offset += t), (e._bufferIndex += t), e);
          };
        },
        {},
      ],
      h9o9x: [
        function (e, t, r) {
          var n = e("399aaaf0a8003d9b"),
            a = e("26092bacd6612463"),
            o = e("6ff32aa49e94570d"),
            i = e("fcbe49998081d6e2");
          t.exports = {
            name: "autolink",
            tokenize: function (e, t, r) {
              var s = 1;
              return function (t) {
                return (
                  e.enter("autolink"),
                  e.enter("autolinkMarker"),
                  e.consume(t),
                  e.exit("autolinkMarker"),
                  e.enter("autolinkProtocol"),
                  l
                );
              };
              function l(t) {
                return n(t) ? (e.consume(t), c) : o(t) ? p(t) : r(t);
              }
              function c(t) {
                return 43 === t || 45 === t || 46 === t || a(t)
                  ? (function t(r) {
                      return 58 === r
                        ? (e.consume(r), u)
                        : (43 === r || 45 === r || 46 === r || a(r)) && s++ < 32
                          ? (e.consume(r), t)
                          : p(r);
                    })(t)
                  : p(t);
              }
              function u(t) {
                return 62 === t
                  ? (e.exit("autolinkProtocol"), f(t))
                  : 32 === t || 60 === t || i(t)
                    ? r(t)
                    : (e.consume(t), u);
              }
              function p(t) {
                return 64 === t
                  ? (e.consume(t), (s = 0), d)
                  : o(t)
                    ? (e.consume(t), p)
                    : r(t);
              }
              function d(t) {
                return a(t)
                  ? (function t(n) {
                      return 46 === n
                        ? (e.consume(n), (s = 0), d)
                        : 62 === n
                          ? ((e.exit("autolinkProtocol").type =
                              "autolinkEmail"),
                            f(n))
                          : (function n(o) {
                              return (45 === o || a(o)) && s++ < 63
                                ? (e.consume(o), 45 === o ? n : t)
                                : r(o);
                            })(n);
                    })(t)
                  : r(t);
              }
              function f(r) {
                return (
                  e.enter("autolinkMarker"),
                  e.consume(r),
                  e.exit("autolinkMarker"),
                  e.exit("autolink"),
                  t
                );
              }
            },
          };
        },
        {
          "399aaaf0a8003d9b": "5AeaT",
          "26092bacd6612463": "87vCT",
          "6ff32aa49e94570d": "2pDZN",
          fcbe49998081d6e2: "J22Fx",
        },
      ],
      "5AeaT": [
        function (e, t, r) {
          var n = e("57accb1360ad2a37")(/[A-Za-z]/);
          t.exports = n;
        },
        { "57accb1360ad2a37": "fp9bp" },
      ],
      "87vCT": [
        function (e, t, r) {
          var n = e("418f88d42e5f988c")(/[\dA-Za-z]/);
          t.exports = n;
        },
        { "418f88d42e5f988c": "fp9bp" },
      ],
      "2pDZN": [
        function (e, t, r) {
          var n = e("a677b07242d162db")(/[#-'*+\--9=?A-Z^-~]/);
          t.exports = n;
        },
        { a677b07242d162db: "fp9bp" },
      ],
      J22Fx: [
        function (e, t, r) {
          t.exports = function (e) {
            return e < 32 || 127 === e;
          };
        },
        {},
      ],
      cwbi7: [
        function (e, t, r) {
          var n = e("a9146f419850e7"),
            a = e("b60b904c6c0ebdfc"),
            o = {
              name: "blockQuote",
              tokenize: function (e, t, r) {
                var a = this;
                return function (t) {
                  return 62 === t
                    ? (a.containerState.open ||
                        (e.enter("blockQuote", { _container: !0 }),
                        (a.containerState.open = !0)),
                      e.enter("blockQuotePrefix"),
                      e.enter("blockQuoteMarker"),
                      e.consume(t),
                      e.exit("blockQuoteMarker"),
                      o)
                    : r(t);
                };
                function o(r) {
                  return n(r)
                    ? (e.enter("blockQuotePrefixWhitespace"),
                      e.consume(r),
                      e.exit("blockQuotePrefixWhitespace"),
                      e.exit("blockQuotePrefix"),
                      t)
                    : (e.exit("blockQuotePrefix"), t(r));
                }
              },
              continuation: {
                tokenize: function (e, t, r) {
                  return a(
                    e,
                    e.attempt(o, t, r),
                    "linePrefix",
                    this.parser.constructs.disable.null.indexOf(
                      "codeIndented",
                    ) > -1
                      ? void 0
                      : 4,
                  );
                },
              },
              exit: function (e) {
                e.exit("blockQuote");
              },
            };
          t.exports = o;
        },
        { a9146f419850e7: "aliHq", b60b904c6c0ebdfc: "j0hN2" },
      ],
      hAAvK: [
        function (e, t, r) {
          var n = e("10dbcb75a3cf1b69");
          t.exports = {
            name: "characterEscape",
            tokenize: function (e, t, r) {
              return function (t) {
                return (
                  e.enter("characterEscape"),
                  e.enter("escapeMarker"),
                  e.consume(t),
                  e.exit("escapeMarker"),
                  a
                );
              };
              function a(a) {
                return n(a)
                  ? (e.enter("characterEscapeValue"),
                    e.consume(a),
                    e.exit("characterEscapeValue"),
                    e.exit("characterEscape"),
                    t)
                  : r(a);
              }
            },
          };
        },
        { "10dbcb75a3cf1b69": "7Tht5" },
      ],
      "7Tht5": [
        function (e, t, r) {
          var n = e("75e42f04ba96bb5a")(/[!-/:-@[-`{-~]/);
          t.exports = n;
        },
        { "75e42f04ba96bb5a": "fp9bp" },
      ],
      "184Jm": [
        function (e, t, r) {
          var n = e("ff55e0c8e1132e7"),
            a = e("537e66fb17974b1f"),
            o = e("cfdafdeb4b3c1cb5"),
            i = e("18b84cf2a77a9452"),
            s =
              n && "object" == typeof n && "default" in n ? n : { default: n };
          t.exports = {
            name: "characterReference",
            tokenize: function (e, t, r) {
              var n,
                l,
                c = this,
                u = 0;
              return function (t) {
                return (
                  e.enter("characterReference"),
                  e.enter("characterReferenceMarker"),
                  e.consume(t),
                  e.exit("characterReferenceMarker"),
                  p
                );
              };
              function p(t) {
                return 35 === t
                  ? (e.enter("characterReferenceMarkerNumeric"),
                    e.consume(t),
                    e.exit("characterReferenceMarkerNumeric"),
                    d)
                  : (e.enter("characterReferenceValue"),
                    (n = 31),
                    (l = a),
                    f(t));
              }
              function d(t) {
                return 88 === t || 120 === t
                  ? (e.enter("characterReferenceMarkerHexadecimal"),
                    e.consume(t),
                    e.exit("characterReferenceMarkerHexadecimal"),
                    e.enter("characterReferenceValue"),
                    (n = 6),
                    (l = i),
                    f)
                  : (e.enter("characterReferenceValue"),
                    (n = 7),
                    (l = o),
                    f(t));
              }
              function f(o) {
                var i;
                return 59 === o && u
                  ? ((i = e.exit("characterReferenceValue")),
                    l !== a || s.default(c.sliceSerialize(i)))
                    ? (e.enter("characterReferenceMarker"),
                      e.consume(o),
                      e.exit("characterReferenceMarker"),
                      e.exit("characterReference"),
                      t)
                    : r(o)
                  : l(o) && u++ < n
                    ? (e.consume(o), f)
                    : r(o);
              }
            },
          };
        },
        {
          ff55e0c8e1132e7: "lcbet",
          "537e66fb17974b1f": "87vCT",
          cfdafdeb4b3c1cb5: "6DEhe",
          "18b84cf2a77a9452": "hCNjr",
        },
      ],
      lcbet: [
        function (e, t, r) {
          var n;
          t.exports = function (e) {
            var t,
              r = "&" + e + ";";
            return (
              ((n = n || document.createElement("i")).innerHTML = r),
              (59 !== (t = n.textContent).charCodeAt(t.length - 1) ||
                "semi" === e) &&
                t !== r &&
                t
            );
          };
        },
        {},
      ],
      "6DEhe": [
        function (e, t, r) {
          var n = e("c5dcfb3feca6d718")(/\d/);
          t.exports = n;
        },
        { c5dcfb3feca6d718: "fp9bp" },
      ],
      hCNjr: [
        function (e, t, r) {
          var n = e("3b59f24cd9300753")(/[\dA-Fa-f]/);
          t.exports = n;
        },
        { "3b59f24cd9300753": "fp9bp" },
      ],
      iAAfW: [
        function (e, t, r) {
          var n = e("f2da63e467659e56"),
            a = e("fc6f6d7e2a5eb57a"),
            o = e("5c2fbc952a681907"),
            i = e("eb005b8969048517");
          t.exports = {
            name: "codeFenced",
            tokenize: function (e, t, r) {
              var s,
                l = this,
                c = {
                  tokenize: function (e, t, r) {
                    var a = 0;
                    return i(
                      e,
                      function (t) {
                        return (
                          e.enter("codeFencedFence"),
                          e.enter("codeFencedFenceSequence"),
                          (function t(n) {
                            return n === s
                              ? (e.consume(n), a++, t)
                              : a < p
                                ? r(n)
                                : (e.exit("codeFencedFenceSequence"),
                                  i(e, o, "whitespace")(n));
                          })(t)
                        );
                      },
                      "linePrefix",
                      this.parser.constructs.disable.null.indexOf(
                        "codeIndented",
                      ) > -1
                        ? void 0
                        : 4,
                    );
                    function o(a) {
                      return null === a || n(a)
                        ? (e.exit("codeFencedFence"), t(a))
                        : r(a);
                    }
                  },
                  partial: !0,
                },
                u = o(this.events, "linePrefix"),
                p = 0;
              return function (t) {
                return (
                  e.enter("codeFenced"),
                  e.enter("codeFencedFence"),
                  e.enter("codeFencedFenceSequence"),
                  (s = t),
                  (function t(n) {
                    return n === s
                      ? (e.consume(n), p++, t)
                      : (e.exit("codeFencedFenceSequence"),
                        p < 3 ? r(n) : i(e, d, "whitespace")(n));
                  })(t)
                );
              };
              function d(t) {
                return null === t || n(t)
                  ? h(t)
                  : (e.enter("codeFencedFenceInfo"),
                    e.enter("chunkString", { contentType: "string" }),
                    (function t(n) {
                      return null === n || a(n)
                        ? (e.exit("chunkString"),
                          e.exit("codeFencedFenceInfo"),
                          i(e, f, "whitespace")(n))
                        : 96 === n && n === s
                          ? r(n)
                          : (e.consume(n), t);
                    })(t));
              }
              function f(t) {
                return null === t || n(t)
                  ? h(t)
                  : (e.enter("codeFencedFenceMeta"),
                    e.enter("chunkString", { contentType: "string" }),
                    (function t(a) {
                      return null === a || n(a)
                        ? (e.exit("chunkString"),
                          e.exit("codeFencedFenceMeta"),
                          h(a))
                        : 96 === a && a === s
                          ? r(a)
                          : (e.consume(a), t);
                    })(t));
              }
              function h(r) {
                return (
                  e.exit("codeFencedFence"),
                  l.interrupt
                    ? t(r)
                    : (function t(r) {
                        return null === r
                          ? m(r)
                          : n(r)
                            ? (e.enter("lineEnding"),
                              e.consume(r),
                              e.exit("lineEnding"),
                              e.attempt(
                                c,
                                m,
                                u ? i(e, t, "linePrefix", u + 1) : t,
                              ))
                            : (e.enter("codeFlowValue"),
                              (function r(a) {
                                return null === a || n(a)
                                  ? (e.exit("codeFlowValue"), t(a))
                                  : (e.consume(a), r);
                              })(r));
                      })(r)
                );
              }
              function m(r) {
                return (e.exit("codeFenced"), t(r));
              }
            },
            concrete: !0,
          };
        },
        {
          f2da63e467659e56: "1tQ98",
          fc6f6d7e2a5eb57a: "5jCAX",
          "5c2fbc952a681907": "hRwvs",
          eb005b8969048517: "j0hN2",
        },
      ],
      bshUJ: [
        function (e, t, r) {
          var n = e("10a1e932ed05c7c"),
            a = e("9092cbf3067b1b2a"),
            o = e("fefdbaff093f49a4"),
            i = e("4e577ad37c98dfbc"),
            s = {
              tokenize: function (e, t, r) {
                var a = this;
                return i(
                  e,
                  function s(l) {
                    return n(l)
                      ? (e.enter("lineEnding"),
                        e.consume(l),
                        e.exit("lineEnding"),
                        i(e, s, "linePrefix", 5))
                      : 4 > o(a.events, "linePrefix")
                        ? r(l)
                        : t(l);
                  },
                  "linePrefix",
                  5,
                );
              },
              partial: !0,
            };
          t.exports = {
            name: "codeIndented",
            tokenize: function (e, t, r) {
              return e.attempt(
                s,
                function r(a) {
                  return null === a
                    ? t(a)
                    : n(a)
                      ? e.attempt(s, r, t)(a)
                      : (e.enter("codeFlowValue"),
                        (function t(a) {
                          return null === a || n(a)
                            ? (e.exit("codeFlowValue"), r(a))
                            : (e.consume(a), t);
                        })(a));
                },
                r,
              );
            },
            resolve: function (e, t) {
              var r = {
                type: "codeIndented",
                start: e[0][1].start,
                end: e[e.length - 1][1].end,
              };
              return (
                a(e, 0, 0, [["enter", r, t]]),
                a(e, e.length, 0, [["exit", r, t]]),
                e
              );
            },
          };
        },
        {
          "10a1e932ed05c7c": "1tQ98",
          "9092cbf3067b1b2a": "6yEEr",
          fefdbaff093f49a4: "hRwvs",
          "4e577ad37c98dfbc": "j0hN2",
        },
      ],
      aoYJ2: [
        function (e, t, r) {
          var n = e("f9ffb21a9b27254c");
          t.exports = {
            name: "codeText",
            tokenize: function (e, t, r) {
              var a,
                o,
                i = 0;
              return function (t) {
                return (
                  e.enter("codeText"),
                  e.enter("codeTextSequence"),
                  (function t(r) {
                    return 96 === r
                      ? (e.consume(r), i++, t)
                      : (e.exit("codeTextSequence"), s(r));
                  })(t)
                );
              };
              function s(c) {
                return null === c
                  ? r(c)
                  : 96 === c
                    ? ((o = e.enter("codeTextSequence")),
                      (a = 0),
                      (function r(n) {
                        return 96 === n
                          ? (e.consume(n), a++, r)
                          : a === i
                            ? (e.exit("codeTextSequence"),
                              e.exit("codeText"),
                              t(n))
                            : ((o.type = "codeTextData"), l(n));
                      })(c))
                    : 32 === c
                      ? (e.enter("space"), e.consume(c), e.exit("space"), s)
                      : n(c)
                        ? (e.enter("lineEnding"),
                          e.consume(c),
                          e.exit("lineEnding"),
                          s)
                        : (e.enter("codeTextData"), l(c));
              }
              function l(t) {
                return null === t || 32 === t || 96 === t || n(t)
                  ? (e.exit("codeTextData"), s(t))
                  : (e.consume(t), l);
              }
            },
            resolve: function (e) {
              var t,
                r,
                n = e.length - 4,
                a = 3;
              if (
                ("lineEnding" === e[3][1].type || "space" === e[a][1].type) &&
                ("lineEnding" === e[n][1].type || "space" === e[n][1].type)
              ) {
                for (t = a; ++t < n;)
                  if ("codeTextData" === e[t][1].type) {
                    ((e[n][1].type = e[a][1].type = "codeTextPadding"),
                      (a += 2),
                      (n -= 2));
                    break;
                  }
              }
              for (t = a - 1, n++; ++t <= n;)
                void 0 === r
                  ? t !== n && "lineEnding" !== e[t][1].type && (r = t)
                  : (t === n || "lineEnding" === e[t][1].type) &&
                    ((e[r][1].type = "codeTextData"),
                    t !== r + 2 &&
                      ((e[r][1].end = e[t - 1][1].end),
                      e.splice(r + 2, t - r - 2),
                      (n -= t - r - 2),
                      (t = r + 2)),
                    (r = void 0));
              return e;
            },
            previous: function (e) {
              return (
                96 !== e ||
                "characterEscape" ===
                  this.events[this.events.length - 1][1].type
              );
            },
          };
        },
        { f9ffb21a9b27254c: "1tQ98" },
      ],
      jYpgq: [
        function (e, t, r) {
          var n = e("6a267568c9e6f0db"),
            a = e("aa8babd7f17367f3"),
            o = e("cbc99e8d308be7d8"),
            i = e("482e647a92212d6c"),
            s = e("5389e2482ca99ed4"),
            l = e("31d8d0a9db1a01a"),
            c = e("2b1487ac6b72081b"),
            u = e("e7990ee2808f29db"),
            p = {
              tokenize: function (e, t, r) {
                return function (t) {
                  return a(t) ? c(e, o)(t) : r(t);
                };
                function o(t) {
                  return 34 === t || 39 === t || 40 === t
                    ? u(
                        e,
                        l(e, i, "whitespace"),
                        r,
                        "definitionTitle",
                        "definitionTitleMarker",
                        "definitionTitleString",
                      )(t)
                    : r(t);
                }
                function i(e) {
                  return null === e || n(e) ? t(e) : r(e);
                }
              },
              partial: !0,
            };
          t.exports = {
            name: "definition",
            tokenize: function (e, t, r) {
              var a,
                u = this;
              return function (t) {
                return (
                  e.enter("definition"),
                  s.call(
                    u,
                    e,
                    d,
                    r,
                    "definitionLabel",
                    "definitionLabelMarker",
                    "definitionLabelString",
                  )(t)
                );
              };
              function d(t) {
                return ((a = o(
                  u
                    .sliceSerialize(u.events[u.events.length - 1][1])
                    .slice(1, -1),
                )),
                58 === t)
                  ? (e.enter("definitionMarker"),
                    e.consume(t),
                    e.exit("definitionMarker"),
                    c(
                      e,
                      i(
                        e,
                        e.attempt(
                          p,
                          l(e, f, "whitespace"),
                          l(e, f, "whitespace"),
                        ),
                        r,
                        "definitionDestination",
                        "definitionDestinationLiteral",
                        "definitionDestinationLiteralMarker",
                        "definitionDestinationRaw",
                        "definitionDestinationString",
                      ),
                    ))
                  : r(t);
              }
              function f(o) {
                return null === o || n(o)
                  ? (e.exit("definition"),
                    0 > u.parser.defined.indexOf(a) && u.parser.defined.push(a),
                    t(o))
                  : r(o);
              }
            },
          };
        },
        {
          "6a267568c9e6f0db": "1tQ98",
          aa8babd7f17367f3: "5jCAX",
          cbc99e8d308be7d8: "8tCFG",
          "482e647a92212d6c": "gHDCA",
          "5389e2482ca99ed4": "9WpSM",
          "31d8d0a9db1a01a": "j0hN2",
          "2b1487ac6b72081b": "48P1Y",
          e7990ee2808f29db: "hL8Vu",
        },
      ],
      gHDCA: [
        function (e, t, r) {
          var n = e("68e732336f3fbf42"),
            a = e("2827db0cc1eda74"),
            o = e("8d2cc5848bdc537d");
          t.exports = function (e, t, r, i, s, l, c, u, p) {
            var d = p || 1 / 0,
              f = 0;
            return function (t) {
              return 60 === t
                ? (e.enter(i),
                  e.enter(s),
                  e.enter(l),
                  e.consume(t),
                  e.exit(l),
                  h)
                : n(t) || 41 === t
                  ? r(t)
                  : (e.enter(i),
                    e.enter(c),
                    e.enter(u),
                    e.enter("chunkString", { contentType: "string" }),
                    b(t));
            };
            function h(r) {
              return 62 === r
                ? (e.enter(l), e.consume(r), e.exit(l), e.exit(s), e.exit(i), t)
                : (e.enter(u),
                  e.enter("chunkString", { contentType: "string" }),
                  m(r));
            }
            function m(t) {
              return 62 === t
                ? (e.exit("chunkString"), e.exit(u), h(t))
                : null === t || 60 === t || o(t)
                  ? r(t)
                  : (e.consume(t), 92 === t ? g : m);
            }
            function g(t) {
              return 60 === t || 62 === t || 92 === t
                ? (e.consume(t), m)
                : m(t);
            }
            function b(o) {
              return 40 === o
                ? ++f > d
                  ? r(o)
                  : (e.consume(o), b)
                : 41 === o
                  ? f--
                    ? (e.consume(o), b)
                    : (e.exit("chunkString"),
                      e.exit(u),
                      e.exit(c),
                      e.exit(i),
                      t(o))
                  : null === o || a(o)
                    ? f
                      ? r(o)
                      : (e.exit("chunkString"),
                        e.exit(u),
                        e.exit(c),
                        e.exit(i),
                        t(o))
                    : n(o)
                      ? r(o)
                      : (e.consume(o), 92 === o ? x : b);
            }
            function x(t) {
              return 40 === t || 41 === t || 92 === t
                ? (e.consume(t), b)
                : b(t);
            }
          };
        },
        {
          "68e732336f3fbf42": "J22Fx",
          "2827db0cc1eda74": "5jCAX",
          "8d2cc5848bdc537d": "1tQ98",
        },
      ],
      "9WpSM": [
        function (e, t, r) {
          var n = e("73067489d36be1b4"),
            a = e("400c55d333462e03");
          t.exports = function (e, t, r, o, i, s) {
            var l,
              c = this,
              u = 0;
            return function (t) {
              return (
                e.enter(o),
                e.enter(i),
                e.consume(t),
                e.exit(i),
                e.enter(s),
                p
              );
            };
            function p(a) {
              return null === a ||
                91 === a ||
                (93 === a && !l) ||
                (94 === a &&
                  !u &&
                  "_hiddenFootnoteSupport" in c.parser.constructs) ||
                u > 999
                ? r(a)
                : 93 === a
                  ? (e.exit(s),
                    e.enter(i),
                    e.consume(a),
                    e.exit(i),
                    e.exit(o),
                    t)
                  : n(a)
                    ? (e.enter("lineEnding"),
                      e.consume(a),
                      e.exit("lineEnding"),
                      p)
                    : (e.enter("chunkString", { contentType: "string" }), d(a));
            }
            function d(t) {
              return null === t || 91 === t || 93 === t || n(t) || u++ > 999
                ? (e.exit("chunkString"), p(t))
                : (e.consume(t), (l = l || !a(t)), 92 === t ? f : d);
            }
            function f(t) {
              return 91 === t || 92 === t || 93 === t
                ? (e.consume(t), u++, d)
                : d(t);
            }
          };
        },
        { "73067489d36be1b4": "1tQ98", "400c55d333462e03": "aliHq" },
      ],
      "48P1Y": [
        function (e, t, r) {
          var n = e("3b8585ec163064f4"),
            a = e("b058ca58c6300fdd"),
            o = e("d99934b593d118d5");
          t.exports = function (e, t) {
            var r;
            return function i(s) {
              return n(s)
                ? (e.enter("lineEnding"),
                  e.consume(s),
                  e.exit("lineEnding"),
                  (r = !0),
                  i)
                : a(s)
                  ? o(e, i, r ? "linePrefix" : "lineSuffix")(s)
                  : t(s);
            };
          };
        },
        {
          "3b8585ec163064f4": "1tQ98",
          b058ca58c6300fdd: "aliHq",
          d99934b593d118d5: "j0hN2",
        },
      ],
      hL8Vu: [
        function (e, t, r) {
          var n = e("fea4e96204c8b8ca"),
            a = e("51b8e7cfad9b9eb8");
          t.exports = function (e, t, r, o, i, s) {
            var l;
            return function (t) {
              return (
                e.enter(o),
                e.enter(i),
                e.consume(t),
                e.exit(i),
                (l = 40 === t ? 41 : t),
                c
              );
            };
            function c(r) {
              return r === l
                ? (e.enter(i), e.consume(r), e.exit(i), e.exit(o), t)
                : (e.enter(s), u(r));
            }
            function u(t) {
              return t === l
                ? (e.exit(s), c(l))
                : null === t
                  ? r(t)
                  : n(t)
                    ? (e.enter("lineEnding"),
                      e.consume(t),
                      e.exit("lineEnding"),
                      a(e, u, "linePrefix"))
                    : (e.enter("chunkString", { contentType: "string" }), p(t));
            }
            function p(t) {
              return t === l || null === t || n(t)
                ? (e.exit("chunkString"), u(t))
                : (e.consume(t), 92 === t ? d : p);
            }
            function d(t) {
              return t === l || 92 === t ? (e.consume(t), p) : p(t);
            }
          };
        },
        { fea4e96204c8b8ca: "1tQ98", "51b8e7cfad9b9eb8": "j0hN2" },
      ],
      "1Cqip": [
        function (e, t, r) {
          var n = e("c22842c13ea790b8");
          t.exports = {
            name: "hardBreakEscape",
            tokenize: function (e, t, r) {
              return function (t) {
                return (
                  e.enter("hardBreakEscape"),
                  e.enter("escapeMarker"),
                  e.consume(t),
                  a
                );
              };
              function a(a) {
                return n(a)
                  ? (e.exit("escapeMarker"), e.exit("hardBreakEscape"), t(a))
                  : r(a);
              }
            },
          };
        },
        { c22842c13ea790b8: "1tQ98" },
      ],
      "3hVGm": [
        function (e, t, r) {
          var n = e("4696f6ad593bb968"),
            a = e("a40c9e3c04dcecb5"),
            o = e("696c7575ce150532"),
            i = e("f8ffaf0be617c910"),
            s = e("f0b49c2018f168fd");
          t.exports = {
            name: "headingAtx",
            tokenize: function (e, t, r) {
              var i = this,
                l = 0;
              return function (c) {
                return (
                  e.enter("atxHeading"),
                  e.enter("atxHeadingSequence"),
                  (function c(u) {
                    return 35 === u && l++ < 6
                      ? (e.consume(u), c)
                      : null === u || a(u)
                        ? (e.exit("atxHeadingSequence"),
                          i.interrupt
                            ? t(u)
                            : (function r(i) {
                                return 35 === i
                                  ? (e.enter("atxHeadingSequence"),
                                    (function t(n) {
                                      return 35 === n
                                        ? (e.consume(n), t)
                                        : (e.exit("atxHeadingSequence"), r(n));
                                    })(i))
                                  : null === i || n(i)
                                    ? (e.exit("atxHeading"), t(i))
                                    : o(i)
                                      ? s(e, r, "whitespace")(i)
                                      : (e.enter("atxHeadingText"),
                                        (function t(n) {
                                          return null === n || 35 === n || a(n)
                                            ? (e.exit("atxHeadingText"), r(n))
                                            : (e.consume(n), t);
                                        })(i));
                              })(u))
                        : r(u);
                  })(c)
                );
              };
            },
            resolve: function (e, t) {
              var r,
                n,
                a = e.length - 2,
                o = 3;
              return (
                "whitespace" === e[3][1].type && (o += 2),
                a - 2 > o && "whitespace" === e[a][1].type && (a -= 2),
                "atxHeadingSequence" === e[a][1].type &&
                  (o === a - 1 ||
                    (a - 4 > o && "whitespace" === e[a - 2][1].type)) &&
                  (a -= o + 1 === a ? 2 : 4),
                a > o &&
                  ((r = {
                    type: "atxHeadingText",
                    start: e[o][1].start,
                    end: e[a][1].end,
                  }),
                  (n = {
                    type: "chunkText",
                    start: e[o][1].start,
                    end: e[a][1].end,
                    contentType: "text",
                  }),
                  i(e, o, a - o + 1, [
                    ["enter", r, t],
                    ["enter", n, t],
                    ["exit", n, t],
                    ["exit", r, t],
                  ])),
                e
              );
            },
          };
        },
        {
          "4696f6ad593bb968": "1tQ98",
          a40c9e3c04dcecb5: "5jCAX",
          "696c7575ce150532": "aliHq",
          f8ffaf0be617c910: "6yEEr",
          f0b49c2018f168fd: "j0hN2",
        },
      ],
      cka8H: [
        function (e, t, r) {
          var n = e("bbce0f837eb2c892"),
            a = e("7f3f32888e1a258f"),
            o = e("f508770fd2d12cda"),
            i = e("7db25ee5f555095c"),
            s = e("211d1409c7596e39"),
            l = e("f8706556a02b9798"),
            c = e("10acebd172f44292"),
            u = e("1ca0d7a2b04f87f7"),
            p = e("437dccc14227f3d1"),
            d = {
              tokenize: function (e, t, r) {
                return function (n) {
                  return (
                    e.exit("htmlFlowData"),
                    e.enter("lineEndingBlank"),
                    e.consume(n),
                    e.exit("lineEndingBlank"),
                    e.attempt(p, t, r)
                  );
                };
              },
              partial: !0,
            };
          t.exports = {
            name: "htmlFlow",
            tokenize: function (e, t, r) {
              var p,
                f,
                h,
                m,
                g,
                b = this;
              return function (t) {
                return (
                  e.enter("htmlFlow"),
                  e.enter("htmlFlowData"),
                  e.consume(t),
                  x
                );
              };
              function x(a) {
                return 33 === a
                  ? (e.consume(a), y)
                  : 47 === a
                    ? (e.consume(a), w)
                    : 63 === a
                      ? (e.consume(a), (p = 3), b.interrupt ? t : B)
                      : n(a)
                        ? (e.consume(a), (h = l(a)), (f = !0), _)
                        : r(a);
              }
              function y(a) {
                return 45 === a
                  ? (e.consume(a), (p = 2), v)
                  : 91 === a
                    ? (e.consume(a), (p = 5), (h = "CDATA["), (m = 0), k)
                    : n(a)
                      ? (e.consume(a), (p = 4), b.interrupt ? t : B)
                      : r(a);
              }
              function v(n) {
                return 45 === n ? (e.consume(n), b.interrupt ? t : B) : r(n);
              }
              function k(n) {
                return n === h.charCodeAt(m++)
                  ? (e.consume(n), m === h.length ? (b.interrupt ? t : R) : k)
                  : r(n);
              }
              function w(t) {
                return n(t) ? (e.consume(t), (h = l(t)), _) : r(t);
              }
              function _(n) {
                return null === n || 47 === n || 62 === n || i(n)
                  ? 47 !== n && f && u.indexOf(h.toLowerCase()) > -1
                    ? ((p = 1), b.interrupt ? t(n) : R(n))
                    : c.indexOf(h.toLowerCase()) > -1
                      ? ((p = 6), 47 === n)
                        ? (e.consume(n), A)
                        : b.interrupt
                          ? t(n)
                          : R(n)
                      : ((p = 7),
                        b.interrupt
                          ? r(n)
                          : f
                            ? C(n)
                            : (function t(r) {
                                return s(r) ? (e.consume(r), t) : F(r);
                              })(n))
                  : 45 === n || a(n)
                    ? (e.consume(n), (h += l(n)), _)
                    : r(n);
              }
              function A(n) {
                return 62 === n ? (e.consume(n), b.interrupt ? t : R) : r(n);
              }
              function C(t) {
                return 47 === t
                  ? (e.consume(t), F)
                  : 58 === t || 95 === t || n(t)
                    ? (e.consume(t), E)
                    : s(t)
                      ? (e.consume(t), C)
                      : F(t);
              }
              function E(t) {
                return 45 === t || 46 === t || 58 === t || 95 === t || a(t)
                  ? (e.consume(t), E)
                  : j(t);
              }
              function j(t) {
                return 61 === t
                  ? (e.consume(t), I)
                  : s(t)
                    ? (e.consume(t), j)
                    : C(t);
              }
              function I(t) {
                return null === t ||
                  60 === t ||
                  61 === t ||
                  62 === t ||
                  96 === t
                  ? r(t)
                  : 34 === t || 39 === t
                    ? (e.consume(t), (g = t), S)
                    : s(t)
                      ? (e.consume(t), I)
                      : ((g = void 0),
                        (function t(r) {
                          return null === r ||
                            34 === r ||
                            39 === r ||
                            60 === r ||
                            61 === r ||
                            62 === r ||
                            96 === r ||
                            i(r)
                            ? j(r)
                            : (e.consume(r), t);
                        })(t));
              }
              function S(t) {
                return t === g
                  ? (e.consume(t), D)
                  : null === t || o(t)
                    ? r(t)
                    : (e.consume(t), S);
              }
              function D(e) {
                return 47 === e || 62 === e || s(e) ? C(e) : r(e);
              }
              function F(t) {
                return 62 === t ? (e.consume(t), T) : r(t);
              }
              function T(t) {
                return s(t)
                  ? (e.consume(t), T)
                  : null === t || o(t)
                    ? R(t)
                    : r(t);
              }
              function R(t) {
                return 45 === t && 2 === p
                  ? (e.consume(t), L)
                  : 60 === t && 1 === p
                    ? (e.consume(t), O)
                    : 62 === t && 4 === p
                      ? (e.consume(t), z)
                      : 63 === t && 3 === p
                        ? (e.consume(t), B)
                        : 93 === t && 5 === p
                          ? (e.consume(t), M)
                          : o(t) && (6 === p || 7 === p)
                            ? e.check(d, z, P)(t)
                            : null === t || o(t)
                              ? P(t)
                              : (e.consume(t), R);
              }
              function P(t) {
                return (
                  e.exit("htmlFlowData"),
                  (function t(r) {
                    return null === r
                      ? q(r)
                      : o(r)
                        ? (e.enter("lineEnding"),
                          e.consume(r),
                          e.exit("lineEnding"),
                          t)
                        : (e.enter("htmlFlowData"), R(r));
                  })(t)
                );
              }
              function L(t) {
                return 45 === t ? (e.consume(t), B) : R(t);
              }
              function O(t) {
                return 47 === t ? (e.consume(t), (h = ""), N) : R(t);
              }
              function N(t) {
                return 62 === t && u.indexOf(h.toLowerCase()) > -1
                  ? (e.consume(t), z)
                  : n(t) && h.length < 8
                    ? (e.consume(t), (h += l(t)), N)
                    : R(t);
              }
              function M(t) {
                return 93 === t ? (e.consume(t), B) : R(t);
              }
              function B(t) {
                return 62 === t ? (e.consume(t), z) : R(t);
              }
              function z(t) {
                return null === t || o(t)
                  ? (e.exit("htmlFlowData"), q(t))
                  : (e.consume(t), z);
              }
              function q(r) {
                return (e.exit("htmlFlow"), t(r));
              }
            },
            resolveTo: function (e) {
              for (
                var t = e.length;
                t-- && ("enter" !== e[t][0] || "htmlFlow" !== e[t][1].type);
              );
              return (
                t > 1 &&
                  "linePrefix" === e[t - 2][1].type &&
                  ((e[t][1].start = e[t - 2][1].start),
                  (e[t + 1][1].start = e[t - 2][1].start),
                  e.splice(t - 2, 2)),
                e
              );
            },
            concrete: !0,
          };
        },
        {
          bbce0f837eb2c892: "5AeaT",
          "7f3f32888e1a258f": "87vCT",
          f508770fd2d12cda: "1tQ98",
          "7db25ee5f555095c": "5jCAX",
          "211d1409c7596e39": "aliHq",
          f8706556a02b9798: "39T21",
          "10acebd172f44292": "4ZMvl",
          "1ca0d7a2b04f87f7": "bRpbu",
          "437dccc14227f3d1": "ds5kQ",
        },
      ],
      "4ZMvl": [
        function (e, t, r) {
          t.exports = [
            "address",
            "article",
            "aside",
            "base",
            "basefont",
            "blockquote",
            "body",
            "caption",
            "center",
            "col",
            "colgroup",
            "dd",
            "details",
            "dialog",
            "dir",
            "div",
            "dl",
            "dt",
            "fieldset",
            "figcaption",
            "figure",
            "footer",
            "form",
            "frame",
            "frameset",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "head",
            "header",
            "hr",
            "html",
            "iframe",
            "legend",
            "li",
            "link",
            "main",
            "menu",
            "menuitem",
            "nav",
            "noframes",
            "ol",
            "optgroup",
            "option",
            "p",
            "param",
            "section",
            "source",
            "summary",
            "table",
            "tbody",
            "td",
            "tfoot",
            "th",
            "thead",
            "title",
            "tr",
            "track",
            "ul",
          ];
        },
        {},
      ],
      bRpbu: [
        function (e, t, r) {
          t.exports = ["pre", "script", "style", "textarea"];
        },
        {},
      ],
      csxZL: [
        function (e, t, r) {
          var n = e("c24927e604898dac"),
            a = e("693e06ca6995f73e"),
            o = e("7335cd73b82f07f7"),
            i = e("735d5c098a399f8b"),
            s = e("c8106c90d5e73c4b"),
            l = e("e4512b38830882b1");
          t.exports = {
            name: "htmlText",
            tokenize: function (e, t, r) {
              var c,
                u,
                p,
                d,
                f = this;
              return function (t) {
                return (
                  e.enter("htmlText"),
                  e.enter("htmlTextData"),
                  e.consume(t),
                  h
                );
              };
              function h(t) {
                return 33 === t
                  ? (e.consume(t), m)
                  : 47 === t
                    ? (e.consume(t), I)
                    : 63 === t
                      ? (e.consume(t), E)
                      : n(t)
                        ? (e.consume(t), D)
                        : r(t);
              }
              function m(t) {
                return 45 === t
                  ? (e.consume(t), g)
                  : 91 === t
                    ? (e.consume(t), (u = "CDATA["), (p = 0), k)
                    : n(t)
                      ? (e.consume(t), C)
                      : r(t);
              }
              function g(t) {
                return 45 === t ? (e.consume(t), b) : r(t);
              }
              function b(t) {
                return null === t || 62 === t
                  ? r(t)
                  : 45 === t
                    ? (e.consume(t), x)
                    : y(t);
              }
              function x(e) {
                return null === e || 62 === e ? r(e) : y(e);
              }
              function y(t) {
                return null === t
                  ? r(t)
                  : 45 === t
                    ? (e.consume(t), v)
                    : o(t)
                      ? ((d = y), N(t))
                      : (e.consume(t), y);
              }
              function v(t) {
                return 45 === t ? (e.consume(t), B) : y(t);
              }
              function k(t) {
                return t === u.charCodeAt(p++)
                  ? (e.consume(t), p === u.length ? w : k)
                  : r(t);
              }
              function w(t) {
                return null === t
                  ? r(t)
                  : 93 === t
                    ? (e.consume(t), _)
                    : o(t)
                      ? ((d = w), N(t))
                      : (e.consume(t), w);
              }
              function _(t) {
                return 93 === t ? (e.consume(t), A) : w(t);
              }
              function A(t) {
                return 62 === t ? B(t) : 93 === t ? (e.consume(t), A) : w(t);
              }
              function C(t) {
                return null === t || 62 === t
                  ? B(t)
                  : o(t)
                    ? ((d = C), N(t))
                    : (e.consume(t), C);
              }
              function E(t) {
                return null === t
                  ? r(t)
                  : 63 === t
                    ? (e.consume(t), j)
                    : o(t)
                      ? ((d = E), N(t))
                      : (e.consume(t), E);
              }
              function j(e) {
                return 62 === e ? B(e) : E(e);
              }
              function I(t) {
                return n(t) ? (e.consume(t), S) : r(t);
              }
              function S(t) {
                return 45 === t || a(t)
                  ? (e.consume(t), S)
                  : (function t(r) {
                      return o(r)
                        ? ((d = t), N(r))
                        : s(r)
                          ? (e.consume(r), t)
                          : B(r);
                    })(t);
              }
              function D(t) {
                return 45 === t || a(t)
                  ? (e.consume(t), D)
                  : 47 === t || 62 === t || i(t)
                    ? F(t)
                    : r(t);
              }
              function F(t) {
                return 47 === t
                  ? (e.consume(t), B)
                  : 58 === t || 95 === t || n(t)
                    ? (e.consume(t), T)
                    : o(t)
                      ? ((d = F), N(t))
                      : s(t)
                        ? (e.consume(t), F)
                        : B(t);
              }
              function T(t) {
                return 45 === t || 46 === t || 58 === t || 95 === t || a(t)
                  ? (e.consume(t), T)
                  : (function t(r) {
                      return 61 === r
                        ? (e.consume(r), R)
                        : o(r)
                          ? ((d = t), N(r))
                          : s(r)
                            ? (e.consume(r), t)
                            : F(r);
                    })(t);
              }
              function R(t) {
                return null === t ||
                  60 === t ||
                  61 === t ||
                  62 === t ||
                  96 === t
                  ? r(t)
                  : 34 === t || 39 === t
                    ? (e.consume(t), (c = t), P)
                    : o(t)
                      ? ((d = R), N(t))
                      : s(t)
                        ? (e.consume(t), R)
                        : (e.consume(t), (c = void 0), O);
              }
              function P(t) {
                return t === c
                  ? (e.consume(t), L)
                  : null === t
                    ? r(t)
                    : o(t)
                      ? ((d = P), N(t))
                      : (e.consume(t), P);
              }
              function L(e) {
                return 62 === e || 47 === e || i(e) ? F(e) : r(e);
              }
              function O(t) {
                return null === t ||
                  34 === t ||
                  39 === t ||
                  60 === t ||
                  61 === t ||
                  96 === t
                  ? r(t)
                  : 62 === t || i(t)
                    ? F(t)
                    : (e.consume(t), O);
              }
              function N(t) {
                return (
                  e.exit("htmlTextData"),
                  e.enter("lineEnding"),
                  e.consume(t),
                  e.exit("lineEnding"),
                  l(
                    e,
                    M,
                    "linePrefix",
                    f.parser.constructs.disable.null.indexOf("codeIndented") >
                      -1
                      ? void 0
                      : 4,
                  )
                );
              }
              function M(t) {
                return (e.enter("htmlTextData"), d(t));
              }
              function B(n) {
                return 62 === n
                  ? (e.consume(n),
                    e.exit("htmlTextData"),
                    e.exit("htmlText"),
                    t)
                  : r(n);
              }
            },
          };
        },
        {
          c24927e604898dac: "5AeaT",
          "693e06ca6995f73e": "87vCT",
          "7335cd73b82f07f7": "1tQ98",
          "735d5c098a399f8b": "5jCAX",
          c8106c90d5e73c4b: "aliHq",
          e4512b38830882b1: "j0hN2",
        },
      ],
      cEsUJ: [
        function (e, t, r) {
          var n = e("d6ae34076c929fc9"),
            a = e("fdc389f30260dac4"),
            o = e("aa0c4a03717638f8"),
            i = e("a0ad54d4f115c07c"),
            s = e("8adaa8a6e2fd6f8c"),
            l = e("a65dcaa6159fb0ab"),
            c = e("bc7b55a8b610ec0"),
            u = e("7103ccbd2ccdba03"),
            p = e("c6a9c352079631f"),
            d = e("a914ed3af7d8f9f0"),
            f = {
              tokenize: function (e, t, r) {
                return function (t) {
                  return (
                    e.enter("resource"),
                    e.enter("resourceMarker"),
                    e.consume(t),
                    e.exit("resourceMarker"),
                    d(e, a)
                  );
                };
                function a(t) {
                  return 41 === t
                    ? s(t)
                    : c(
                        e,
                        o,
                        r,
                        "resourceDestination",
                        "resourceDestinationLiteral",
                        "resourceDestinationLiteralMarker",
                        "resourceDestinationRaw",
                        "resourceDestinationString",
                        3,
                      )(t);
                }
                function o(t) {
                  return n(t) ? d(e, i)(t) : s(t);
                }
                function i(t) {
                  return 34 === t || 39 === t || 40 === t
                    ? p(
                        e,
                        d(e, s),
                        r,
                        "resourceTitle",
                        "resourceTitleMarker",
                        "resourceTitleString",
                      )(t)
                    : s(t);
                }
                function s(n) {
                  return 41 === n
                    ? (e.enter("resourceMarker"),
                      e.consume(n),
                      e.exit("resourceMarker"),
                      e.exit("resource"),
                      t)
                    : r(n);
                }
              },
            },
            h = {
              tokenize: function (e, t, r) {
                var n = this;
                return function (t) {
                  return u.call(
                    n,
                    e,
                    a,
                    r,
                    "reference",
                    "referenceMarker",
                    "referenceString",
                  )(t);
                };
                function a(e) {
                  return 0 >
                    n.parser.defined.indexOf(
                      i(
                        n
                          .sliceSerialize(n.events[n.events.length - 1][1])
                          .slice(1, -1),
                      ),
                    )
                    ? r(e)
                    : t(e);
                }
              },
            },
            m = {
              tokenize: function (e, t, r) {
                return function (t) {
                  return (
                    e.enter("reference"),
                    e.enter("referenceMarker"),
                    e.consume(t),
                    e.exit("referenceMarker"),
                    n
                  );
                };
                function n(n) {
                  return 93 === n
                    ? (e.enter("referenceMarker"),
                      e.consume(n),
                      e.exit("referenceMarker"),
                      e.exit("reference"),
                      t)
                    : r(n);
                }
              },
            };
          t.exports = {
            name: "labelEnd",
            tokenize: function (e, t, r) {
              for (var n, a, o = this, s = o.events.length; s--;)
                if (
                  ("labelImage" === o.events[s][1].type ||
                    "labelLink" === o.events[s][1].type) &&
                  !o.events[s][1]._balanced
                ) {
                  n = o.events[s][1];
                  break;
                }
              return function (t) {
                return n
                  ? n._inactive
                    ? c(t)
                    : ((a =
                        o.parser.defined.indexOf(
                          i(o.sliceSerialize({ start: n.end, end: o.now() })),
                        ) > -1),
                      e.enter("labelEnd"),
                      e.enter("labelMarker"),
                      e.consume(t),
                      e.exit("labelMarker"),
                      e.exit("labelEnd"),
                      l)
                  : r(t);
              };
              function l(r) {
                return 40 === r
                  ? e.attempt(f, t, a ? t : c)(r)
                  : 91 === r
                    ? e.attempt(h, t, a ? e.attempt(m, t, c) : c)(r)
                    : a
                      ? t(r)
                      : c(r);
              }
              function c(e) {
                return ((n._balanced = !0), r(e));
              }
            },
            resolveTo: function (e, t) {
              for (var r, n, i, c, u, p, d, f = e.length, h = 0; f--;)
                if (((c = e[f][1]), u)) {
                  if (
                    "link" === c.type ||
                    ("labelLink" === c.type && c._inactive)
                  )
                    break;
                  "enter" === e[f][0] &&
                    "labelLink" === c.type &&
                    (c._inactive = !0);
                } else if (p) {
                  if (
                    "enter" === e[f][0] &&
                    ("labelImage" === c.type || "labelLink" === c.type) &&
                    !c._balanced &&
                    ((u = f), "labelLink" !== c.type)
                  ) {
                    h = 2;
                    break;
                  }
                } else "labelEnd" === c.type && (p = f);
              return (
                (r = {
                  type: "labelLink" === e[u][1].type ? "link" : "image",
                  start: l(e[u][1].start),
                  end: l(e[e.length - 1][1].end),
                }),
                (n = {
                  type: "label",
                  start: l(e[u][1].start),
                  end: l(e[p][1].end),
                }),
                (i = {
                  type: "labelText",
                  start: l(e[u + h + 2][1].end),
                  end: l(e[p - 2][1].start),
                }),
                (d = a(
                  (d = [
                    ["enter", r, t],
                    ["enter", n, t],
                  ]),
                  e.slice(u + 1, u + h + 3),
                )),
                (d = a(d, [["enter", i, t]])),
                (d = a(
                  d,
                  s(
                    t.parser.constructs.insideSpan.null,
                    e.slice(u + h + 4, p - 3),
                    t,
                  ),
                )),
                (d = a(d, [
                  ["exit", i, t],
                  e[p - 2],
                  e[p - 1],
                  ["exit", n, t],
                ])),
                (d = a(d, e.slice(p + 1))),
                (d = a(d, [["exit", r, t]])),
                o(e, u, e.length, d),
                e
              );
            },
            resolveAll: function (e) {
              for (var t, r = -1; ++r < e.length;)
                !(t = e[r][1])._used &&
                  ("labelImage" === t.type ||
                    "labelLink" === t.type ||
                    "labelEnd" === t.type) &&
                  (e.splice(r + 1, "labelImage" === t.type ? 4 : 2),
                  (t.type = "data"),
                  r++);
              return e;
            },
          };
        },
        {
          d6ae34076c929fc9: "5jCAX",
          fdc389f30260dac4: "765DT",
          aa0c4a03717638f8: "6yEEr",
          a0ad54d4f115c07c: "8tCFG",
          "8adaa8a6e2fd6f8c": "8uO5H",
          a65dcaa6159fb0ab: "fpPTw",
          bc7b55a8b610ec0: "gHDCA",
          "7103ccbd2ccdba03": "9WpSM",
          c6a9c352079631f: "hL8Vu",
          a914ed3af7d8f9f0: "48P1Y",
        },
      ],
      kycns: [
        function (e, t, r) {
          var n = {
            name: "labelStartImage",
            tokenize: function (e, t, r) {
              var n = this;
              return function (t) {
                return (
                  e.enter("labelImage"),
                  e.enter("labelImageMarker"),
                  e.consume(t),
                  e.exit("labelImageMarker"),
                  a
                );
              };
              function a(t) {
                return 91 === t
                  ? (e.enter("labelMarker"),
                    e.consume(t),
                    e.exit("labelMarker"),
                    e.exit("labelImage"),
                    o)
                  : r(t);
              }
              function o(e) {
                return 94 === e &&
                  "_hiddenFootnoteSupport" in n.parser.constructs
                  ? r(e)
                  : t(e);
              }
            },
            resolveAll: e("3000668c52c43566").resolveAll,
          };
          t.exports = n;
        },
        { "3000668c52c43566": "cEsUJ" },
      ],
      "2hIYv": [
        function (e, t, r) {
          var n = {
            name: "labelStartLink",
            tokenize: function (e, t, r) {
              var n = this;
              return function (t) {
                return (
                  e.enter("labelLink"),
                  e.enter("labelMarker"),
                  e.consume(t),
                  e.exit("labelMarker"),
                  e.exit("labelLink"),
                  a
                );
              };
              function a(e) {
                return 94 === e &&
                  "_hiddenFootnoteSupport" in n.parser.constructs
                  ? r(e)
                  : t(e);
              }
            },
            resolveAll: e("170dd677b667049b").resolveAll,
          };
          t.exports = n;
        },
        { "170dd677b667049b": "cEsUJ" },
      ],
      hZdRW: [
        function (e, t, r) {
          var n = e("a012d3135884588b");
          t.exports = {
            name: "lineEnding",
            tokenize: function (e, t) {
              return function (r) {
                return (
                  e.enter("lineEnding"),
                  e.consume(r),
                  e.exit("lineEnding"),
                  n(e, t, "linePrefix")
                );
              };
            },
          };
        },
        { a012d3135884588b: "j0hN2" },
      ],
      h7Ccp: [
        function (e, t, r) {
          var n = e("1522335859281ae7"),
            a = e("c91401775ddc1e5d"),
            o = e("751a70cf84bd116e"),
            i = e("97f88e91c66642dd"),
            s = e("1df9754719bded1"),
            l = e("a7c64b5d57675a24"),
            c = e("6df6171d9d2b9ae"),
            u = {
              name: "list",
              tokenize: function (e, t, r) {
                var s = this,
                  u = o(s.events, "linePrefix"),
                  d = 0;
                return function (t) {
                  var a =
                    s.containerState.type ||
                    (42 === t || 43 === t || 45 === t
                      ? "listUnordered"
                      : "listOrdered");
                  if (
                    "listUnordered" === a
                      ? !s.containerState.marker ||
                        t === s.containerState.marker
                      : n(t)
                  ) {
                    if (
                      (s.containerState.type ||
                        ((s.containerState.type = a),
                        e.enter(a, { _container: !0 })),
                      "listUnordered" === a)
                    )
                      return (
                        e.enter("listItemPrefix"),
                        42 === t || 45 === t ? e.check(c, r, f)(t) : f(t)
                      );
                    if (!s.interrupt || 49 === t)
                      return (
                        e.enter("listItemPrefix"),
                        e.enter("listItemValue"),
                        (function t(a) {
                          return n(a) && ++d < 10
                            ? (e.consume(a), t)
                            : (!s.interrupt || d < 2) &&
                                (s.containerState.marker
                                  ? a === s.containerState.marker
                                  : 41 === a || 46 === a)
                              ? (e.exit("listItemValue"), f(a))
                              : r(a);
                        })(t)
                      );
                  }
                  return r(t);
                };
                function f(t) {
                  return (
                    e.enter("listItemMarker"),
                    e.consume(t),
                    e.exit("listItemMarker"),
                    (s.containerState.marker = s.containerState.marker || t),
                    e.check(l, s.interrupt ? r : h, e.attempt(p, g, m))
                  );
                }
                function h(e) {
                  return ((s.containerState.initialBlankLine = !0), u++, g(e));
                }
                function m(t) {
                  return a(t)
                    ? (e.enter("listItemPrefixWhitespace"),
                      e.consume(t),
                      e.exit("listItemPrefixWhitespace"),
                      g)
                    : r(t);
                }
                function g(r) {
                  return (
                    (s.containerState.size =
                      u + i(s.sliceStream(e.exit("listItemPrefix")))),
                    t(r)
                  );
                }
              },
              continuation: {
                tokenize: function (e, t, r) {
                  var n = this;
                  return (
                    (n.containerState._closeFlow = void 0),
                    e.check(
                      l,
                      function (r) {
                        return (
                          (n.containerState.furtherBlankLines =
                            n.containerState.furtherBlankLines ||
                            n.containerState.initialBlankLine),
                          s(
                            e,
                            t,
                            "listItemIndent",
                            n.containerState.size + 1,
                          )(r)
                        );
                      },
                      function (r) {
                        return n.containerState.furtherBlankLines || !a(r)
                          ? ((n.containerState.furtherBlankLines =
                              n.containerState.initialBlankLine =
                                void 0),
                            o(r))
                          : ((n.containerState.furtherBlankLines =
                              n.containerState.initialBlankLine =
                                void 0),
                            e.attempt(d, t, o)(r));
                      },
                    )
                  );
                  function o(a) {
                    return (
                      (n.containerState._closeFlow = !0),
                      (n.interrupt = void 0),
                      s(
                        e,
                        e.attempt(u, t, r),
                        "linePrefix",
                        n.parser.constructs.disable.null.indexOf(
                          "codeIndented",
                        ) > -1
                          ? void 0
                          : 4,
                      )(a)
                    );
                  }
                },
              },
              exit: function (e) {
                e.exit(this.containerState.type);
              },
            },
            p = {
              tokenize: function (e, t, r) {
                var n = this;
                return s(
                  e,
                  function (e) {
                    return a(e) || !o(n.events, "listItemPrefixWhitespace")
                      ? r(e)
                      : t(e);
                  },
                  "listItemPrefixWhitespace",
                  n.parser.constructs.disable.null.indexOf("codeIndented") > -1
                    ? void 0
                    : 5,
                );
              },
              partial: !0,
            },
            d = {
              tokenize: function (e, t, r) {
                var n = this;
                return s(
                  e,
                  function (e) {
                    return o(n.events, "listItemIndent") ===
                      n.containerState.size
                      ? t(e)
                      : r(e);
                  },
                  "listItemIndent",
                  n.containerState.size + 1,
                );
              },
              partial: !0,
            };
          t.exports = u;
        },
        {
          "1522335859281ae7": "6DEhe",
          c91401775ddc1e5d: "aliHq",
          "751a70cf84bd116e": "hRwvs",
          "97f88e91c66642dd": "24NRN",
          "1df9754719bded1": "j0hN2",
          a7c64b5d57675a24: "ds5kQ",
          "6df6171d9d2b9ae": "eNrRr",
        },
      ],
      eNrRr: [
        function (e, t, r) {
          var n = e("7c1a8d5d0e4d14"),
            a = e("83fc792db15b456b"),
            o = e("aa60c7f513e48a82");
          t.exports = {
            name: "thematicBreak",
            tokenize: function (e, t, r) {
              var i,
                s = 0;
              return function (l) {
                return (
                  e.enter("thematicBreak"),
                  (i = l),
                  (function l(c) {
                    return c === i
                      ? (e.enter("thematicBreakSequence"),
                        (function t(r) {
                          return r === i
                            ? (e.consume(r), s++, t)
                            : (e.exit("thematicBreakSequence"), l(r));
                        })(c))
                      : a(c)
                        ? o(e, l, "whitespace")(c)
                        : s < 3 || (null !== c && !n(c))
                          ? r(c)
                          : (e.exit("thematicBreak"), t(c));
                  })(l)
                );
              };
            },
          };
        },
        {
          "7c1a8d5d0e4d14": "1tQ98",
          "83fc792db15b456b": "aliHq",
          aa60c7f513e48a82: "j0hN2",
        },
      ],
      "8CsV2": [
        function (e, t, r) {
          var n = e("d324f7ef60457993"),
            a = e("cc478f4229f55eb4"),
            o = e("2dcb32e9ad71c27e");
          t.exports = {
            name: "setextUnderline",
            tokenize: function (e, t, r) {
              for (var a, i, s = this, l = s.events.length; l--;)
                if (
                  "lineEnding" !== s.events[l][1].type &&
                  "linePrefix" !== s.events[l][1].type &&
                  "content" !== s.events[l][1].type
                ) {
                  i = "paragraph" === s.events[l][1].type;
                  break;
                }
              return function (t) {
                return !s.lazy && (s.interrupt || i)
                  ? (e.enter("setextHeadingLine"),
                    e.enter("setextHeadingLineSequence"),
                    (a = t),
                    (function t(r) {
                      return r === a
                        ? (e.consume(r), t)
                        : (e.exit("setextHeadingLineSequence"),
                          o(e, c, "lineSuffix")(r));
                    })(t))
                  : r(t);
              };
              function c(a) {
                return null === a || n(a)
                  ? (e.exit("setextHeadingLine"), t(a))
                  : r(a);
              }
            },
            resolveTo: function (e, t) {
              for (var r, n, o, i, s = e.length; s--;)
                if ("enter" === e[s][0]) {
                  if ("content" === e[s][1].type) {
                    r = s;
                    break;
                  }
                  "paragraph" === e[s][1].type && (n = s);
                } else
                  ("content" === e[s][1].type && e.splice(s, 1),
                    o || "definition" !== e[s][1].type || (o = s));
              return (
                (i = {
                  type: "setextHeading",
                  start: a(e[n][1].start),
                  end: a(e[e.length - 1][1].end),
                }),
                (e[n][1].type = "setextHeadingText"),
                o
                  ? (e.splice(n, 0, ["enter", i, t]),
                    e.splice(o + 1, 0, ["exit", e[r][1], t]),
                    (e[r][1].end = a(e[o][1].end)))
                  : (e[r][1] = i),
                e.push(["exit", i, t]),
                e
              );
            },
          };
        },
        {
          d324f7ef60457993: "1tQ98",
          cc478f4229f55eb4: "fpPTw",
          "2dcb32e9ad71c27e": "j0hN2",
        },
      ],
      frk1q: [
        function (e, t, r) {
          var n = /[\0\t\n\r]/g;
          t.exports = function () {
            var e,
              t = !0,
              r = 1,
              a = "";
            return function (o, i, s) {
              var l,
                c,
                u,
                p,
                d,
                f = [];
              for (
                o = a + o.toString(i),
                  u = 0,
                  a = "",
                  t && (65279 === o.charCodeAt(0) && u++, (t = void 0));
                u < o.length;
              ) {
                if (
                  ((n.lastIndex = u),
                  (p = (l = n.exec(o)) ? l.index : o.length),
                  (d = o.charCodeAt(p)),
                  !l)
                ) {
                  a = o.slice(u);
                  break;
                }
                if (10 === d && u === p && e) (f.push(-3), (e = void 0));
                else if (
                  (e && (f.push(-5), (e = void 0)),
                  u < p && (f.push(o.slice(u, p)), (r += p - u)),
                  0 === d)
                )
                  (f.push(65533), r++);
                else if (9 === d)
                  for (c = 4 * Math.ceil(r / 4), f.push(-2); r++ < c;)
                    f.push(-1);
                else (10 === d ? f.push(-4) : (e = !0), (r = 1));
                u = p + 1;
              }
              return (s && (e && f.push(-5), a && f.push(a), f.push(null)), f);
            };
          };
        },
        {},
      ],
      gmdih: [
        function (e, t, r) {
          var n = e("828724f8c3e623ae");
          t.exports = function (e) {
            for (; !n(e););
            return e;
          };
        },
        { "828724f8c3e623ae": "48aIz" },
      ],
      l7IPP: [
        function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    (void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      }));
                  }
                : function (e, t, r, n) {
                    (void 0 === n && (n = r), (e[n] = t[r]));
                  }),
            a =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (e, t) {
                    Object.defineProperty(e, "default", {
                      enumerable: !0,
                      value: t,
                    });
                  }
                : function (e, t) {
                    e.default = t;
                  }),
            o =
              (this && this.__importStar) ||
              function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                  for (var r in e)
                    "default" !== r &&
                      Object.prototype.hasOwnProperty.call(e, r) &&
                      n(t, e, r);
                return (a(t, e), t);
              },
            i =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              };
          (Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.parseRichText = r.parseBlocks = void 0));
          let s = o(e("afca8572eee4e5b4")),
            l = i(e("51f85052579f3c5a")),
            c = e("70a6a1e66c1bc5a9"),
            u = e("afca8572eee4e5b4");
          function p(e, t) {
            let r = e.match(/[^]{1,2000}/g) || [];
            return r.flatMap((e) => s.richText(e, t));
          }
          function d(e, t) {
            var r;
            let n = {
              annotations: {
                ...(null !== (r = null == t ? void 0 : t.annotations) &&
                void 0 !== r
                  ? r
                  : {}),
              },
              url: null == t ? void 0 : t.url,
            };
            switch (e.type) {
              case "text":
                return p(e.value, n);
              case "delete":
                return (
                  (n.annotations.strikethrough = !0),
                  e.children.flatMap((e) => d(e, n))
                );
              case "emphasis":
                return (
                  (n.annotations.italic = !0),
                  e.children.flatMap((e) => d(e, n))
                );
              case "strong":
                return (
                  (n.annotations.bold = !0),
                  e.children.flatMap((e) => d(e, n))
                );
              case "link":
                return ((n.url = e.url), e.children.flatMap((e) => d(e, n)));
              case "inlineCode":
                return ((n.annotations.code = !0), [s.richText(e.value, n)]);
              case "inlineMath":
                return [s.richText(e.value, { ...n, type: "equation" })];
              default:
                return [];
            }
          }
          ((r.parseBlocks = function (e, t) {
            var r, n, a, o;
            let i = e.children.flatMap((e) =>
                (function e(t, r) {
                  switch (t.type) {
                    case "heading":
                      return [
                        (function (e) {
                          let t = e.children.flatMap((e) => d(e));
                          switch (e.depth) {
                            case 1:
                              return s.headingOne(t);
                            case 2:
                              return s.headingTwo(t);
                            default:
                              return s.headingThree(t);
                          }
                        })(t),
                      ];
                    case "paragraph":
                      return (function (e, t) {
                        let r =
                          e.children.length > 2 &&
                          "text" === e.children[0].type &&
                          "[[" === e.children[0].value &&
                          "emphasis" === e.children[1].type;
                        if (r) {
                          let t = e.children[1],
                            r = t.children[0];
                          if ("TOC" === r.value) return [s.table_of_contents()];
                        }
                        let n = [],
                          a = [];
                        return (e.children.forEach((e) => {
                          if ("image" === e.type)
                            n.push(
                              (function (e, t) {
                                var r;
                                function n() {
                                  return s.paragraph([s.richText(e.url)]);
                                }
                                try {
                                  if (
                                    null !== (r = t.strictImageUrls) &&
                                    void 0 !== r &&
                                    !r
                                  )
                                    return s.image(e.url);
                                  {
                                    let t = new c.URL(e.url),
                                      r = l.default.extname(t.pathname);
                                    if (
                                      [
                                        ".png",
                                        ".jpg",
                                        ".jpeg",
                                        ".gif",
                                        ".tif",
                                        ".tiff",
                                        ".bmp",
                                        ".svg",
                                        ".heic",
                                      ].includes(r)
                                    )
                                      return s.image(e.url);
                                    return n();
                                  }
                                } catch (e) {
                                  return n();
                                }
                              })(e, t),
                            );
                          else {
                            let t = d(e);
                            t.length && a.push(t);
                          }
                        }),
                        a.length)
                          ? [s.paragraph(a.flat()), ...n]
                          : n;
                      })(t, r);
                    case "code":
                      return [
                        (function (e) {
                          let t = p(e.value),
                            r = (function (e) {
                              if (e)
                                return (
                                  (e = e.toLowerCase()),
                                  (0, u.isSupportedCodeLang)(e)
                                    ? e
                                    : s.parseCodeLanguage(e)
                                );
                            })(e.lang);
                          return s.code(t, r);
                        })(t),
                      ];
                    case "blockquote":
                      return [
                        (function (t, r) {
                          let n = t.children.flatMap((t) => e(t, r));
                          return s.blockquote([], n);
                        })(t, r),
                      ];
                    case "list":
                      return t.children.flatMap((n) => {
                        let a = n.children.shift();
                        if (void 0 === a || "paragraph" !== a.type) return [];
                        let o = a.children.flatMap((e) => d(e)),
                          i = n.children.flatMap((t) => e(t, r));
                        return null !== t.start && void 0 !== t.start
                          ? [s.numberedListItem(o, i)]
                          : null !== n.checked && void 0 !== n.checked
                            ? [s.toDo(n.checked, o, i)]
                            : [s.bulletedListItem(o, i)];
                      });
                    case "table":
                      return (function (e) {
                        var t;
                        let r = (
                            null === (t = e.children) || void 0 === t
                              ? void 0
                              : t.length
                          )
                            ? e.children[0].children.length
                            : 0,
                          n = e.children.flatMap((e) =>
                            (function (e) {
                              let t = e.children.flatMap((e) => [
                                e.children.flatMap((e) => d(e)),
                              ]);
                              return [s.tableRow(t)];
                            })(e),
                          );
                        return [s.table(n, r)];
                      })(t);
                    case "math":
                      return [
                        (function (e) {
                          let t = e.value.split("\n").join("\\\\\n");
                          return s.equation(t);
                        })(t),
                      ];
                    default:
                      return [];
                  }
                })(e, t || {}),
              ),
              f = !!(
                null ===
                  (n =
                    null === (r = null == t ? void 0 : t.notionLimits) ||
                    void 0 === r
                      ? void 0
                      : r.truncate) ||
                void 0 === n ||
                n
              ),
              h =
                null !==
                  (o =
                    null === (a = null == t ? void 0 : t.notionLimits) ||
                    void 0 === a
                      ? void 0
                      : a.onError) && void 0 !== o
                  ? o
                  : () => {};
            return (
              i.length > u.LIMITS.PAYLOAD_BLOCKS &&
                h(
                  Error(
                    `Resulting blocks array exceeds Notion limit (${u.LIMITS.PAYLOAD_BLOCKS})`,
                  ),
                ),
              f ? i.slice(0, u.LIMITS.PAYLOAD_BLOCKS) : i
            );
          }),
            (r.parseRichText = function (e, t) {
              var r, n, a, o;
              let i = [];
              e.children.forEach((e) => {
                if ("paragraph" === e.type)
                  e.children.forEach((e) => i.push(...d(e)));
                else if ((null == t ? void 0 : t.nonInline) === "throw")
                  throw Error(
                    `Unsupported markdown element: ${JSON.stringify(e)}`,
                  );
              });
              let s = !!(
                  null ===
                    (n =
                      null === (r = null == t ? void 0 : t.notionLimits) ||
                      void 0 === r
                        ? void 0
                        : r.truncate) ||
                  void 0 === n ||
                  n
                ),
                l =
                  null !==
                    (o =
                      null === (a = null == t ? void 0 : t.notionLimits) ||
                      void 0 === a
                        ? void 0
                        : a.onError) && void 0 !== o
                    ? o
                    : () => {};
              return (
                i.length > u.LIMITS.RICH_TEXT_ARRAYS &&
                  l(
                    Error(
                      `Resulting richTexts array exceeds Notion limit (${u.LIMITS.RICH_TEXT_ARRAYS})`,
                    ),
                  ),
                (s ? i.slice(0, u.LIMITS.RICH_TEXT_ARRAYS) : i).map((e) => {
                  var t;
                  return (
                    "text" !== e.type ||
                      (e.text.content.length >
                        u.LIMITS.RICH_TEXT.TEXT_CONTENT &&
                        (l(
                          Error(
                            `Resulting text content exceeds Notion limit (${u.LIMITS.RICH_TEXT.TEXT_CONTENT})`,
                          ),
                        ),
                        s &&
                          (e.text.content =
                            e.text.content.slice(
                              0,
                              u.LIMITS.RICH_TEXT.TEXT_CONTENT - 3,
                            ) + "...")),
                      (null === (t = e.text.link) || void 0 === t
                        ? void 0
                        : t.url) &&
                        e.text.link.url.length > u.LIMITS.RICH_TEXT.LINK_URL &&
                        l(
                          Error(
                            `Resulting text URL exceeds Notion limit (${u.LIMITS.RICH_TEXT.LINK_URL})`,
                          ),
                        )),
                    e
                  );
                })
              );
            }));
        },
        {
          afca8572eee4e5b4: "1ZlA4",
          "51f85052579f3c5a": "268QV",
          "70a6a1e66c1bc5a9": "c6WBZ",
        },
      ],
      "1ZlA4": [
        function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    (void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      }));
                  }
                : function (e, t, r, n) {
                    (void 0 === n && (n = r), (e[n] = t[r]));
                  }),
            a =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r ||
                    Object.prototype.hasOwnProperty.call(t, r) ||
                    n(t, e, r);
              },
            o =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              };
          (Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.parseCodeLanguage = void 0));
          let i = o(e("fc1f554f3fe4e644"));
          (a(e("8bb07d094b8e7729"), r),
            a(e("3a037a2ab643a9fc"), r),
            (r.parseCodeLanguage = function (e) {
              return e ? i.default[e.toLowerCase()] : void 0;
            }));
        },
        {
          fc1f554f3fe4e644: "g8RFa",
          "8bb07d094b8e7729": "3ek3j",
          "3a037a2ab643a9fc": "h3pWN",
        },
      ],
      g8RFa: [
        function (e, t, r) {
          t.exports = JSON.parse(
            '{"abap":"abap","sh":"shell","shell-script":"shell","bash":"shell","zsh":"shell","text":"vb.net","c_cpp":"c++","clojure":"clojure","coffee":"coffeescript","coffee-script":"coffeescript","cpp":"c++","csharp":"c#","cake":"c#","cakescript":"c#","css":"css","dart":"dart","diff":"diff","udiff":"diff","dockerfile":"docker","elixir":"elixir","elm":"elm","erlang":"erlang","fsharp":"f#","cucumber":"gherkin","glsl":"glsl","golang":"go","groovy":"groovy","haskell":"haskell","html":"html","xhtml":"html","java":"java/c/c++/c#","javascript":"javascript","js":"javascript","node":"javascript","json":"json","julia":"julia","tex":"latex","latex":"latex","less":"less","lisp":"webassembly","livescript":"livescript","live-script":"livescript","ls":"livescript","lua":"lua","makefile":"makefile","bsdmake":"makefile","make":"makefile","mf":"makefile","markdown":"markdown","pandoc":"markdown","matlab":"matlab","octave":"matlab","nix":"nix","nixos":"nix","objectivec":"objective-c","obj-c":"objective-c","objc":"objective-c","ocaml":"ocaml","pascal":"pascal","delphi":"pascal","objectpascal":"pascal","perl":"perl","cperl":"perl","php":"php","inc":"php","powershell":"powershell","posh":"powershell","pwsh":"powershell","prolog":"prolog","protobuf":"protobuf","Protocol Buffers":"protobuf","python":"python","python3":"python","rusthon":"python","r":"r","R":"r","Rscript":"r","splus":"r","rust":"rust","ruby":"ruby","jruby":"ruby","macruby":"ruby","rake":"ruby","rb":"ruby","rbx":"ruby","rs":"rust","sass":"sass","scala":"scala","scheme":"scheme","scss":"scss","sql":"sql","typescript":"typescript","ts":"typescript","visual basic":"vb.net","vbnet":"vb.net","vb .net":"vb.net","vb.net":"vb.net","verilog":"verilog","vhdl":"vhdl","wast":"webassembly","wasm":"webassembly","xml":"xml","rss":"xml","xsd":"xml","wsdl":"xml","yaml":"yaml","yml":"yaml"}',
          );
        },
        {},
      ],
      "3ek3j": [
        function (e, t, r) {
          (Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.equation =
              r.tableRow =
              r.table =
              r.toDo =
              r.numberedListItem =
              r.bulletedListItem =
              r.headingThree =
              r.headingTwo =
              r.headingOne =
              r.table_of_contents =
              r.image =
              r.blockquote =
              r.code =
              r.paragraph =
                void 0));
          let n = e("47d0d5c6872934ce");
          ((r.paragraph = function (e) {
            return {
              object: "block",
              type: "paragraph",
              paragraph: { rich_text: e },
            };
          }),
            (r.code = function (e, t = "plain text") {
              return {
                object: "block",
                type: "code",
                code: { rich_text: e, language: t },
              };
            }),
            (r.blockquote = function (e = [], t = []) {
              return {
                object: "block",
                type: "quote",
                quote: {
                  rich_text: e.length ? e : [(0, n.richText)("")],
                  children: t,
                },
              };
            }),
            (r.image = function (e) {
              return {
                object: "block",
                type: "image",
                image: { type: "external", external: { url: e } },
              };
            }),
            (r.table_of_contents = function () {
              return {
                object: "block",
                type: "table_of_contents",
                table_of_contents: {},
              };
            }),
            (r.headingOne = function (e) {
              return {
                object: "block",
                type: "heading_1",
                heading_1: { rich_text: e },
              };
            }),
            (r.headingTwo = function (e) {
              return {
                object: "block",
                type: "heading_2",
                heading_2: { rich_text: e },
              };
            }),
            (r.headingThree = function (e) {
              return {
                object: "block",
                type: "heading_3",
                heading_3: { rich_text: e },
              };
            }),
            (r.bulletedListItem = function (e, t = []) {
              return {
                object: "block",
                type: "bulleted_list_item",
                bulleted_list_item: {
                  rich_text: e,
                  children: t.length ? t : void 0,
                },
              };
            }),
            (r.numberedListItem = function (e, t = []) {
              return {
                object: "block",
                type: "numbered_list_item",
                numbered_list_item: {
                  rich_text: e,
                  children: t.length ? t : void 0,
                },
              };
            }),
            (r.toDo = function (e, t, r = []) {
              return {
                object: "block",
                type: "to_do",
                to_do: {
                  rich_text: t,
                  checked: e,
                  children: r.length ? r : void 0,
                },
              };
            }),
            (r.table = function (e, t) {
              return {
                object: "block",
                type: "table",
                table: {
                  table_width: t,
                  has_column_header: !0,
                  children: (null == e ? void 0 : e.length) ? e : [],
                },
              };
            }),
            (r.tableRow = function (e = []) {
              return {
                object: "block",
                type: "table_row",
                table_row: { cells: e.length ? e : [] },
              };
            }),
            (r.equation = function (e) {
              return { type: "equation", equation: { expression: e } };
            }));
        },
        { "47d0d5c6872934ce": "h3pWN" },
      ],
      h3pWN: [
        function (e, t, r) {
          (Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.isSupportedCodeLang =
              r.SUPPORTED_CODE_BLOCK_LANGUAGES =
              r.richText =
              r.LIMITS =
                void 0),
            (r.LIMITS = {
              PAYLOAD_BLOCKS: 1e3,
              RICH_TEXT_ARRAYS: 100,
              RICH_TEXT: {
                TEXT_CONTENT: 2e3,
                LINK_URL: 1e3,
                EQUATION_EXPRESSION: 1e3,
              },
            }),
            (r.richText = function (e, t = {}) {
              let r = {
                bold: !1,
                strikethrough: !1,
                underline: !1,
                italic: !1,
                code: !1,
                color: "default",
                ...(t.annotations || {}),
              };
              return "equation" === t.type
                ? {
                    type: "equation",
                    annotations: r,
                    equation: { expression: e },
                  }
                : {
                    type: "text",
                    annotations: r,
                    text: {
                      content: e,
                      link: t.url ? { type: "url", url: t.url } : void 0,
                    },
                  };
            }),
            (r.SUPPORTED_CODE_BLOCK_LANGUAGES = [
              "abap",
              "arduino",
              "bash",
              "basic",
              "c",
              "clojure",
              "coffeescript",
              "c++",
              "c#",
              "css",
              "dart",
              "diff",
              "docker",
              "elixir",
              "elm",
              "erlang",
              "flow",
              "fortran",
              "f#",
              "gherkin",
              "glsl",
              "go",
              "graphql",
              "groovy",
              "haskell",
              "html",
              "java",
              "javascript",
              "json",
              "julia",
              "kotlin",
              "latex",
              "less",
              "lisp",
              "livescript",
              "lua",
              "makefile",
              "markdown",
              "markup",
              "matlab",
              "mermaid",
              "nix",
              "objective-c",
              "ocaml",
              "pascal",
              "perl",
              "php",
              "plain text",
              "powershell",
              "prolog",
              "protobuf",
              "python",
              "r",
              "reason",
              "ruby",
              "rust",
              "sass",
              "scala",
              "scheme",
              "scss",
              "shell",
              "sql",
              "swift",
              "typescript",
              "vb.net",
              "verilog",
              "vhdl",
              "visual basic",
              "webassembly",
              "xml",
              "yaml",
              "java/c/c++/c#",
            ]),
            (r.isSupportedCodeLang = function (e) {
              return r.SUPPORTED_CODE_BLOCK_LANGUAGES.includes(e);
            }));
        },
        {},
      ],
      "268QV": [
        function (e, t, r) {
          var n,
            a,
            o,
            i,
            s = e("ef7c51ce3f03c139"),
            l = Object.create,
            c = Object.defineProperty,
            u = Object.getOwnPropertyDescriptor,
            p = Object.getOwnPropertyNames,
            d = Object.getPrototypeOf,
            f = Object.prototype.hasOwnProperty,
            h = (e, t, r, n) => {
              if ((t && "object" == typeof t) || "function" == typeof t)
                for (let a of p(t))
                  f.call(e, a) ||
                    a === r ||
                    c(e, a, {
                      get: () => t[a],
                      enumerable: !(n = u(t, a)) || n.enumerable,
                    });
              return e;
            },
            m = (e, t, r) => (
              (r = null != e ? l(d(e)) : {}),
              h(
                !t && e && e.__esModule
                  ? r
                  : c(r, "default", { value: e, enumerable: !0 }),
                e,
              )
            ),
            g =
              ((n = (e, t) => {
                function r(e) {
                  if ("string" != typeof e)
                    throw TypeError(
                      "Path must be a string. Received " + JSON.stringify(e),
                    );
                }
                function n(e, t) {
                  for (
                    var r, n = "", a = 0, o = -1, i = 0, s = 0;
                    s <= e.length;
                    ++s
                  ) {
                    if (s < e.length) r = e.charCodeAt(s);
                    else {
                      if (47 === r) break;
                      r = 47;
                    }
                    if (47 === r) {
                      if (!(o === s - 1 || 1 === i)) {
                        if (o !== s - 1 && 2 === i) {
                          if (
                            n.length < 2 ||
                            2 !== a ||
                            46 !== n.charCodeAt(n.length - 1) ||
                            46 !== n.charCodeAt(n.length - 2)
                          ) {
                            if (n.length > 2) {
                              var l = n.lastIndexOf("/");
                              if (l !== n.length - 1) {
                                (-1 === l
                                  ? ((n = ""), (a = 0))
                                  : (a =
                                      (n = n.slice(0, l)).length -
                                      1 -
                                      n.lastIndexOf("/")),
                                  (o = s),
                                  (i = 0));
                                continue;
                              }
                            } else if (2 === n.length || 1 === n.length) {
                              ((n = ""), (a = 0), (o = s), (i = 0));
                              continue;
                            }
                          }
                          t &&
                            (n.length > 0 ? (n += "/..") : (n = ".."), (a = 2));
                        } else
                          (n.length > 0
                            ? (n += "/" + e.slice(o + 1, s))
                            : (n = e.slice(o + 1, s)),
                            (a = s - o - 1));
                      }
                      ((o = s), (i = 0));
                    } else 46 === r && -1 !== i ? ++i : (i = -1);
                  }
                  return n;
                }
                var a = {
                  resolve: function () {
                    for (
                      var e, t, a = "", o = !1, i = arguments.length - 1;
                      i >= -1 && !o;
                      i--
                    )
                      (i >= 0
                        ? (e = arguments[i])
                        : (void 0 === t && (t = s.cwd()), (e = t)),
                        r(e),
                        0 !== e.length &&
                          ((a = e + "/" + a), (o = 47 === e.charCodeAt(0))));
                    return (
                      (a = n(a, !o)),
                      o
                        ? a.length > 0
                          ? "/" + a
                          : "/"
                        : a.length > 0
                          ? a
                          : "."
                    );
                  },
                  normalize: function (e) {
                    if ((r(e), 0 === e.length)) return ".";
                    var t = 47 === e.charCodeAt(0),
                      a = 47 === e.charCodeAt(e.length - 1);
                    return (
                      0 !== (e = n(e, !t)).length || t || (e = "."),
                      e.length > 0 && a && (e += "/"),
                      t ? "/" + e : e
                    );
                  },
                  isAbsolute: function (e) {
                    return (r(e), e.length > 0 && 47 === e.charCodeAt(0));
                  },
                  join: function () {
                    if (0 == arguments.length) return ".";
                    for (var e, t = 0; t < arguments.length; ++t) {
                      var n = arguments[t];
                      (r(n),
                        n.length > 0 &&
                          (void 0 === e ? (e = n) : (e += "/" + n)));
                    }
                    return void 0 === e ? "." : a.normalize(e);
                  },
                  relative: function (e, t) {
                    if (
                      (r(e),
                      r(t),
                      e === t || (e = a.resolve(e)) === (t = a.resolve(t)))
                    )
                      return "";
                    for (
                      var n = 1;
                      n < e.length && 47 === e.charCodeAt(n);
                      ++n
                    );
                    for (
                      var o = e.length, i = o - n, s = 1;
                      s < t.length && 47 === t.charCodeAt(s);
                      ++s
                    );
                    for (
                      var l = t.length,
                        c = l - s,
                        u = i < c ? i : c,
                        p = -1,
                        d = 0;
                      d <= u;
                      ++d
                    ) {
                      if (d === u) {
                        if (c > u) {
                          if (47 === t.charCodeAt(s + d))
                            return t.slice(s + d + 1);
                          if (0 === d) return t.slice(s + d);
                        } else
                          i > u &&
                            (47 === e.charCodeAt(n + d)
                              ? (p = d)
                              : 0 === d && (p = 0));
                        break;
                      }
                      var f = e.charCodeAt(n + d);
                      if (f !== t.charCodeAt(s + d)) break;
                      47 === f && (p = d);
                    }
                    var h = "";
                    for (d = n + p + 1; d <= o; ++d)
                      (d === o || 47 === e.charCodeAt(d)) &&
                        (0 === h.length ? (h += "..") : (h += "/.."));
                    return h.length > 0
                      ? h + t.slice(s + p)
                      : ((s += p), 47 === t.charCodeAt(s) && ++s, t.slice(s));
                  },
                  _makeLong: function (e) {
                    return e;
                  },
                  dirname: function (e) {
                    if ((r(e), 0 === e.length)) return ".";
                    for (
                      var t = e.charCodeAt(0),
                        n = 47 === t,
                        a = -1,
                        o = !0,
                        i = e.length - 1;
                      i >= 1;
                      --i
                    )
                      if (47 === (t = e.charCodeAt(i))) {
                        if (!o) {
                          a = i;
                          break;
                        }
                      } else o = !1;
                    return -1 === a
                      ? n
                        ? "/"
                        : "."
                      : n && 1 === a
                        ? "//"
                        : e.slice(0, a);
                  },
                  basename: function (e, t) {
                    if (void 0 !== t && "string" != typeof t)
                      throw TypeError('"ext" argument must be a string');
                    r(e);
                    var n,
                      a = 0,
                      o = -1,
                      i = !0;
                    if (void 0 !== t && t.length > 0 && t.length <= e.length) {
                      if (t.length === e.length && t === e) return "";
                      var s = t.length - 1,
                        l = -1;
                      for (n = e.length - 1; n >= 0; --n) {
                        var c = e.charCodeAt(n);
                        if (47 === c) {
                          if (!i) {
                            a = n + 1;
                            break;
                          }
                        } else
                          (-1 === l && ((i = !1), (l = n + 1)),
                            s >= 0 &&
                              (c === t.charCodeAt(s)
                                ? -1 == --s && (o = n)
                                : ((s = -1), (o = l))));
                      }
                      return (
                        a === o ? (o = l) : -1 === o && (o = e.length),
                        e.slice(a, o)
                      );
                    }
                    for (n = e.length - 1; n >= 0; --n)
                      if (47 === e.charCodeAt(n)) {
                        if (!i) {
                          a = n + 1;
                          break;
                        }
                      } else -1 === o && ((i = !1), (o = n + 1));
                    return -1 === o ? "" : e.slice(a, o);
                  },
                  extname: function (e) {
                    r(e);
                    for (
                      var t = -1,
                        n = 0,
                        a = -1,
                        o = !0,
                        i = 0,
                        s = e.length - 1;
                      s >= 0;
                      --s
                    ) {
                      var l = e.charCodeAt(s);
                      if (47 === l) {
                        if (!o) {
                          n = s + 1;
                          break;
                        }
                        continue;
                      }
                      (-1 === a && ((o = !1), (a = s + 1)),
                        46 === l
                          ? -1 === t
                            ? (t = s)
                            : 1 !== i && (i = 1)
                          : -1 !== t && (i = -1));
                    }
                    return -1 === t ||
                      -1 === a ||
                      0 === i ||
                      (1 === i && t === a - 1 && t === n + 1)
                      ? ""
                      : e.slice(t, a);
                  },
                  format: function (e) {
                    var t, r;
                    if (null === e || "object" != typeof e)
                      throw TypeError(
                        'The "pathObject" argument must be of type Object. Received type ' +
                          typeof e,
                      );
                    return (
                      (t = e.dir || e.root),
                      (r = e.base || (e.name || "") + (e.ext || "")),
                      t ? (t === e.root ? t + r : t + "/" + r) : r
                    );
                  },
                  parse: function (e) {
                    r(e);
                    var t = { root: "", dir: "", base: "", ext: "", name: "" };
                    if (0 === e.length) return t;
                    var n,
                      a = e.charCodeAt(0),
                      o = 47 === a;
                    o ? ((t.root = "/"), (n = 1)) : (n = 0);
                    for (
                      var i = -1,
                        s = 0,
                        l = -1,
                        c = !0,
                        u = e.length - 1,
                        p = 0;
                      u >= n;
                      --u
                    ) {
                      if (47 === (a = e.charCodeAt(u))) {
                        if (!c) {
                          s = u + 1;
                          break;
                        }
                        continue;
                      }
                      (-1 === l && ((c = !1), (l = u + 1)),
                        46 === a
                          ? -1 === i
                            ? (i = u)
                            : 1 !== p && (p = 1)
                          : -1 !== i && (p = -1));
                    }
                    return (
                      -1 === i ||
                      -1 === l ||
                      0 === p ||
                      (1 === p && i === l - 1 && i === s + 1)
                        ? -1 !== l &&
                          (0 === s && o
                            ? (t.base = t.name = e.slice(1, l))
                            : (t.base = t.name = e.slice(s, l)))
                        : (0 === s && o
                            ? ((t.name = e.slice(1, i)),
                              (t.base = e.slice(1, l)))
                            : ((t.name = e.slice(s, i)),
                              (t.base = e.slice(s, l))),
                          (t.ext = e.slice(i, l))),
                      s > 0 ? (t.dir = e.slice(0, s - 1)) : o && (t.dir = "/"),
                      t
                    );
                  },
                  sep: "/",
                  delimiter: ":",
                  win32: null,
                  posix: null,
                };
                ((a.posix = a), (t.exports = a));
              }),
              () => (a || n((a = { exports: {} }).exports, a), a.exports)),
            b = {};
          (((e, t) => {
            for (var r in t) c(e, r, { get: t[r], enumerable: !0 });
          })(b, { default: () => y }),
            (t.exports = h(c({}, "__esModule", { value: !0 }), b)));
          var x = m(g());
          ((o = m(g())),
            (i = t.exports),
            h(b, o, "default"),
            i && h(i, o, "default"));
          var y = x.default;
        },
        { ef7c51ce3f03c139: "jDYfS" },
      ],
      jDYfS: [
        function (e, t, r) {
          var n,
            a,
            o,
            i,
            s = Object.create,
            l = Object.defineProperty,
            c = Object.getOwnPropertyDescriptor,
            u = Object.getOwnPropertyNames,
            p = Object.getPrototypeOf,
            d = Object.prototype.hasOwnProperty,
            f = (e, t, r, n) => {
              if ((t && "object" == typeof t) || "function" == typeof t)
                for (let a of u(t))
                  d.call(e, a) ||
                    a === r ||
                    l(e, a, {
                      get: () => t[a],
                      enumerable: !(n = c(t, a)) || n.enumerable,
                    });
              return e;
            },
            h = (e, t, r) => (
              (r = null != e ? s(p(e)) : {}),
              f(
                !t && e && e.__esModule
                  ? r
                  : l(r, "default", { value: e, enumerable: !0 }),
                e,
              )
            ),
            m =
              ((n = (e, t) => {
                var r,
                  n,
                  a = (t.exports = {});
                function o() {
                  throw Error("setTimeout has not been defined");
                }
                function i() {
                  throw Error("clearTimeout has not been defined");
                }
                function s(e) {
                  if (r === setTimeout) return setTimeout(e, 0);
                  if ((r === o || !r) && setTimeout)
                    return ((r = setTimeout), setTimeout(e, 0));
                  try {
                    return r(e, 0);
                  } catch (t) {
                    try {
                      return r.call(null, e, 0);
                    } catch (t) {
                      return r.call(this, e, 0);
                    }
                  }
                }
                !(function () {
                  try {
                    r = "function" == typeof setTimeout ? setTimeout : o;
                  } catch (e) {
                    r = o;
                  }
                  try {
                    n = "function" == typeof clearTimeout ? clearTimeout : i;
                  } catch (e) {
                    n = i;
                  }
                })();
                var l,
                  c = [],
                  u = !1,
                  p = -1;
                function d() {
                  u &&
                    l &&
                    ((u = !1),
                    l.length ? (c = l.concat(c)) : (p = -1),
                    c.length && f());
                }
                function f() {
                  if (!u) {
                    var e = s(d);
                    u = !0;
                    for (var t = c.length; t;) {
                      for (l = c, c = []; ++p < t;) l && l[p].run();
                      ((p = -1), (t = c.length));
                    }
                    ((l = null),
                      (u = !1),
                      (function (e) {
                        if (n === clearTimeout) return clearTimeout(e);
                        if ((n === i || !n) && clearTimeout)
                          return ((n = clearTimeout), clearTimeout(e));
                        try {
                          n(e);
                        } catch (t) {
                          try {
                            return n.call(null, e);
                          } catch (t) {
                            return n.call(this, e);
                          }
                        }
                      })(e));
                  }
                }
                function h(e, t) {
                  ((this.fun = e), (this.array = t));
                }
                function m() {}
                ((a.nextTick = function (e) {
                  var t = Array(arguments.length - 1);
                  if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++)
                      t[r - 1] = arguments[r];
                  (c.push(new h(e, t)), 1 !== c.length || u || s(f));
                }),
                  (h.prototype.run = function () {
                    this.fun.apply(null, this.array);
                  }),
                  (a.title = "browser"),
                  (a.browser = !0),
                  (a.env = {}),
                  (a.argv = []),
                  (a.version = ""),
                  (a.versions = {}),
                  (a.on = m),
                  (a.addListener = m),
                  (a.once = m),
                  (a.off = m),
                  (a.removeListener = m),
                  (a.removeAllListeners = m),
                  (a.emit = m),
                  (a.prependListener = m),
                  (a.prependOnceListener = m),
                  (a.listeners = function (e) {
                    return [];
                  }),
                  (a.binding = function (e) {
                    throw Error("process.binding is not supported");
                  }),
                  (a.cwd = function () {
                    return "/";
                  }),
                  (a.chdir = function (e) {
                    throw Error("process.chdir is not supported");
                  }),
                  (a.umask = function () {
                    return 0;
                  }));
              }),
              () => (a || n((a = { exports: {} }).exports, a), a.exports)),
            g = {};
          (((e, t) => {
            for (var r in t) l(e, r, { get: t[r], enumerable: !0 });
          })(g, { default: () => x }),
            (t.exports = f(l({}, "__esModule", { value: !0 }), g)));
          var b = h(m());
          ((o = h(m())),
            (i = t.exports),
            f(g, o, "default"),
            i && f(i, o, "default"));
          var x = b.default;
        },
        {},
      ],
      c6WBZ: [
        function (t, r, n) {
          var a,
            o,
            i = arguments[3],
            s = Object.create,
            l = Object.defineProperty,
            c = Object.getOwnPropertyDescriptor,
            u = Object.getOwnPropertyNames,
            p = Object.getPrototypeOf,
            d = Object.prototype.hasOwnProperty,
            f = (e, t) => () => (
              t || e((t = { exports: {} }).exports, t),
              t.exports
            ),
            h = (e, t, r, n) => {
              if ((t && "object" == typeof t) || "function" == typeof t)
                for (let a of u(t))
                  d.call(e, a) ||
                    a === r ||
                    l(e, a, {
                      get: () => t[a],
                      enumerable: !(n = c(t, a)) || n.enumerable,
                    });
              return e;
            },
            m = (e, t, r) => (
              (r = null != e ? s(p(e)) : {}),
              h(
                !t && e && e.__esModule
                  ? r
                  : l(r, "default", { value: e, enumerable: !0 }),
                e,
              )
            ),
            g = f((t, r) => {
              !(function (n) {
                var a = "object" == typeof t && t && !t.nodeType && t,
                  o = "object" == typeof r && r && !r.nodeType && r,
                  s = "object" == typeof i && i;
                (s.global === s || s.window === s || s.self === s) && (n = s);
                var l,
                  c,
                  u = /^xn--/,
                  p = /[^\x20-\x7E]/,
                  d = /[\x2E\u3002\uFF0E\uFF61]/g,
                  f = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic":
                      "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input",
                  },
                  h = Math.floor,
                  m = String.fromCharCode;
                function g(e) {
                  throw RangeError(f[e]);
                }
                function b(e, t) {
                  for (var r = e.length, n = []; r--;) n[r] = t(e[r]);
                  return n;
                }
                function x(e, t) {
                  var r = e.split("@"),
                    n = "";
                  return (
                    r.length > 1 && ((n = r[0] + "@"), (e = r[1])),
                    n + b((e = e.replace(d, ".")).split("."), t).join(".")
                  );
                }
                function y(e) {
                  for (var t, r, n = [], a = 0, o = e.length; a < o;)
                    (t = e.charCodeAt(a++)) >= 55296 && t <= 56319 && a < o
                      ? (64512 & (r = e.charCodeAt(a++))) == 56320
                        ? n.push(((1023 & t) << 10) + (1023 & r) + 65536)
                        : (n.push(t), a--)
                      : n.push(t);
                  return n;
                }
                function v(e) {
                  return b(e, function (e) {
                    var t = "";
                    return (
                      e > 65535 &&
                        ((e -= 65536),
                        (t += m(((e >>> 10) & 1023) | 55296)),
                        (e = 56320 | (1023 & e))),
                      (t += m(e))
                    );
                  }).join("");
                }
                function k(e, t) {
                  return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
                }
                function w(e, t, r) {
                  var n = 0;
                  for (
                    e = r ? h(e / 700) : e >> 1, e += h(e / t);
                    e > 455;
                    n += 36
                  )
                    e = h(e / 35);
                  return h(n + (36 * e) / (e + 38));
                }
                function _(e) {
                  var t,
                    r,
                    n,
                    a,
                    o,
                    i,
                    s,
                    l,
                    c,
                    u,
                    p,
                    d = [],
                    f = e.length,
                    m = 0,
                    b = 128,
                    x = 72;
                  for (
                    (n = e.lastIndexOf("-")) < 0 && (n = 0), a = 0;
                    a < n;
                    ++a
                  )
                    (e.charCodeAt(a) >= 128 && g("not-basic"),
                      d.push(e.charCodeAt(a)));
                  for (o = n > 0 ? n + 1 : 0; o < f;) {
                    for (
                      i = m, s = 1, l = 36;
                      o >= f && g("invalid-input"),
                        ((c =
                          (t = e.charCodeAt(o++)) - 48 < 10
                            ? t - 22
                            : t - 65 < 26
                              ? t - 65
                              : t - 97 < 26
                                ? t - 97
                                : 36) >= 36 ||
                          c > h((2147483647 - m) / s)) &&
                          g("overflow"),
                        (m += c * s),
                        !(c < (u = l <= x ? 1 : l >= x + 26 ? 26 : l - x));
                      l += 36
                    )
                      (s > h(2147483647 / (p = 36 - u)) && g("overflow"),
                        (s *= p));
                    ((x = w(m - i, (r = d.length + 1), 0 == i)),
                      h(m / r) > 2147483647 - b && g("overflow"),
                      (b += h(m / r)),
                      (m %= r),
                      d.splice(m++, 0, b));
                  }
                  return v(d);
                }
                function A(e) {
                  var t,
                    r,
                    n,
                    a,
                    o,
                    i,
                    s,
                    l,
                    c,
                    u,
                    p,
                    d,
                    f,
                    b,
                    x,
                    v = [];
                  for (
                    d = (e = y(e)).length, t = 128, r = 0, o = 72, i = 0;
                    i < d;
                    ++i
                  )
                    (p = e[i]) < 128 && v.push(m(p));
                  for (n = a = v.length, a && v.push("-"); n < d;) {
                    for (s = 2147483647, i = 0; i < d; ++i)
                      (p = e[i]) >= t && p < s && (s = p);
                    for (
                      s - t > h((2147483647 - r) / (f = n + 1)) &&
                        g("overflow"),
                        r += (s - t) * f,
                        t = s,
                        i = 0;
                      i < d;
                      ++i
                    )
                      if (
                        ((p = e[i]) < t && ++r > 2147483647 && g("overflow"),
                        p == t)
                      ) {
                        for (
                          l = r, c = 36;
                          !(l < (u = c <= o ? 1 : c >= o + 26 ? 26 : c - o));
                          c += 36
                        )
                          ((x = l - u),
                            (b = 36 - u),
                            v.push(m(k(u + (x % b), 0))),
                            (l = h(x / b)));
                        (v.push(m(k(l, 0))),
                          (o = w(r, f, n == a)),
                          (r = 0),
                          ++n);
                      }
                    (++r, ++t);
                  }
                  return v.join("");
                }
                if (
                  ((l = {
                    version: "1.4.1",
                    ucs2: { decode: y, encode: v },
                    decode: _,
                    encode: A,
                    toASCII: function (e) {
                      return x(e, function (e) {
                        return p.test(e) ? "xn--" + A(e) : e;
                      });
                    },
                    toUnicode: function (e) {
                      return x(e, function (e) {
                        return u.test(e) ? _(e.slice(4).toLowerCase()) : e;
                      });
                    },
                  }),
                  "function" == typeof e && "object" == typeof e.amd && e.amd)
                )
                  e("punycode", function () {
                    return l;
                  });
                else if (a && o) {
                  if (r.exports == a) o.exports = l;
                  else for (c in l) l.hasOwnProperty(c) && (a[c] = l[c]);
                } else n.punycode = l;
              })(t);
            }),
            b = f((e, t) => {
              t.exports = function () {
                if (
                  "function" != typeof Symbol ||
                  "function" != typeof Object.getOwnPropertySymbols
                )
                  return !1;
                if ("symbol" == typeof Symbol.iterator) return !0;
                var e = {},
                  t = Symbol("test"),
                  r = Object(t);
                if (
                  "string" == typeof t ||
                  "[object Symbol]" !== Object.prototype.toString.call(t) ||
                  "[object Symbol]" !== Object.prototype.toString.call(r)
                )
                  return !1;
                for (t in ((e[t] = 42), e)) return !1;
                if (
                  ("function" == typeof Object.keys &&
                    0 !== Object.keys(e).length) ||
                  ("function" == typeof Object.getOwnPropertyNames &&
                    0 !== Object.getOwnPropertyNames(e).length)
                )
                  return !1;
                var n = Object.getOwnPropertySymbols(e);
                if (
                  1 !== n.length ||
                  n[0] !== t ||
                  !Object.prototype.propertyIsEnumerable.call(e, t)
                )
                  return !1;
                if ("function" == typeof Object.getOwnPropertyDescriptor) {
                  var a = Object.getOwnPropertyDescriptor(e, t);
                  if (42 !== a.value || !0 !== a.enumerable) return !1;
                }
                return !0;
              };
            }),
            x = f((e, t) => {
              var r = "u" > typeof Symbol && Symbol,
                n = b();
              t.exports = function () {
                return (
                  "function" == typeof r &&
                  "function" == typeof Symbol &&
                  "symbol" == typeof r("foo") &&
                  "symbol" == typeof Symbol("bar") &&
                  n()
                );
              };
            }),
            y = f((e, t) => {
              var r = { foo: {} },
                n = Object;
              t.exports = function () {
                return (
                  { __proto__: r }.foo === r.foo &&
                  !({ __proto__: null } instanceof n)
                );
              };
            }),
            v = f((e, t) => {
              var r = Array.prototype.slice,
                n = Object.prototype.toString;
              t.exports = function (e) {
                var t = this;
                if ("function" != typeof t || "[object Function]" !== n.call(t))
                  throw TypeError(
                    "Function.prototype.bind called on incompatible " + t,
                  );
                for (
                  var a,
                    o = r.call(arguments, 1),
                    i = Math.max(0, t.length - o.length),
                    s = [],
                    l = 0;
                  l < i;
                  l++
                )
                  s.push("$" + l);
                if (
                  ((a = Function(
                    "binder",
                    "return function (" +
                      s.join(",") +
                      "){ return binder.apply(this,arguments); }",
                  )(function () {
                    if (!(this instanceof a))
                      return t.apply(e, o.concat(r.call(arguments)));
                    var n = t.apply(this, o.concat(r.call(arguments)));
                    return Object(n) === n ? n : this;
                  })),
                  t.prototype)
                ) {
                  var c = function () {};
                  ((c.prototype = t.prototype),
                    (a.prototype = new c()),
                    (c.prototype = null));
                }
                return a;
              };
            }),
            k = f((e, t) => {
              var r = v();
              t.exports = Function.prototype.bind || r;
            }),
            w = f((e, t) => {
              var r = k();
              t.exports = r.call(
                Function.call,
                Object.prototype.hasOwnProperty,
              );
            }),
            _ = f((e, t) => {
              var r,
                n = SyntaxError,
                a = Function,
                o = TypeError,
                i = function (e) {
                  try {
                    return a('"use strict"; return (' + e + ").constructor;")();
                  } catch (e) {}
                },
                s = Object.getOwnPropertyDescriptor;
              if (s)
                try {
                  s({}, "");
                } catch (e) {
                  s = null;
                }
              var l = function () {
                  throw new o();
                },
                c = s
                  ? (function () {
                      try {
                        return (arguments.callee, l);
                      } catch (e) {
                        try {
                          return s(arguments, "callee").get;
                        } catch (e) {
                          return l;
                        }
                      }
                    })()
                  : l,
                u = x()(),
                p = y()(),
                d =
                  Object.getPrototypeOf ||
                  (p
                    ? function (e) {
                        return e.__proto__;
                      }
                    : null),
                f = {},
                h = typeof Uint8Array > "u" || !d ? r : d(Uint8Array),
                m = {
                  "%AggregateError%":
                    typeof AggregateError > "u" ? r : AggregateError,
                  "%Array%": Array,
                  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
                  "%ArrayIteratorPrototype%":
                    u && d ? d([][Symbol.iterator]()) : r,
                  "%AsyncFromSyncIteratorPrototype%": r,
                  "%AsyncFunction%": f,
                  "%AsyncGenerator%": f,
                  "%AsyncGeneratorFunction%": f,
                  "%AsyncIteratorPrototype%": f,
                  "%Atomics%": typeof Atomics > "u" ? r : Atomics,
                  "%BigInt%": typeof BigInt > "u" ? r : BigInt,
                  "%BigInt64Array%":
                    typeof BigInt64Array > "u" ? r : BigInt64Array,
                  "%BigUint64Array%":
                    typeof BigUint64Array > "u" ? r : BigUint64Array,
                  "%Boolean%": Boolean,
                  "%DataView%": typeof DataView > "u" ? r : DataView,
                  "%Date%": Date,
                  "%decodeURI%": decodeURI,
                  "%decodeURIComponent%": decodeURIComponent,
                  "%encodeURI%": encodeURI,
                  "%encodeURIComponent%": encodeURIComponent,
                  "%Error%": Error,
                  "%eval%": eval,
                  "%EvalError%": EvalError,
                  "%Float32Array%":
                    typeof Float32Array > "u" ? r : Float32Array,
                  "%Float64Array%":
                    typeof Float64Array > "u" ? r : Float64Array,
                  "%FinalizationRegistry%":
                    typeof FinalizationRegistry > "u"
                      ? r
                      : FinalizationRegistry,
                  "%Function%": a,
                  "%GeneratorFunction%": f,
                  "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
                  "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
                  "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
                  "%isFinite%": isFinite,
                  "%isNaN%": isNaN,
                  "%IteratorPrototype%":
                    u && d ? d(d([][Symbol.iterator]())) : r,
                  "%JSON%": "object" == typeof JSON ? JSON : r,
                  "%Map%": typeof Map > "u" ? r : Map,
                  "%MapIteratorPrototype%":
                    !(typeof Map > "u") && u && d
                      ? d(new Map()[Symbol.iterator]())
                      : r,
                  "%Math%": Math,
                  "%Number%": Number,
                  "%Object%": Object,
                  "%parseFloat%": parseFloat,
                  "%parseInt%": parseInt,
                  "%Promise%": typeof Promise > "u" ? r : Promise,
                  "%Proxy%": typeof Proxy > "u" ? r : Proxy,
                  "%RangeError%": RangeError,
                  "%ReferenceError%": ReferenceError,
                  "%Reflect%": typeof Reflect > "u" ? r : Reflect,
                  "%RegExp%": RegExp,
                  "%Set%": typeof Set > "u" ? r : Set,
                  "%SetIteratorPrototype%":
                    !(typeof Set > "u") && u && d
                      ? d(new Set()[Symbol.iterator]())
                      : r,
                  "%SharedArrayBuffer%":
                    typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
                  "%String%": String,
                  "%StringIteratorPrototype%":
                    u && d ? d(""[Symbol.iterator]()) : r,
                  "%Symbol%": u ? Symbol : r,
                  "%SyntaxError%": n,
                  "%ThrowTypeError%": c,
                  "%TypedArray%": h,
                  "%TypeError%": o,
                  "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
                  "%Uint8ClampedArray%":
                    typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
                  "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
                  "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
                  "%URIError%": URIError,
                  "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
                  "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
                  "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
                };
              if (d)
                try {
                  null.error;
                } catch (e) {
                  ((g = d(d(e))), (m["%Error.prototype%"] = g));
                }
              var g,
                b = function e(t) {
                  var r;
                  if ("%AsyncFunction%" === t) r = i("async function () {}");
                  else if ("%GeneratorFunction%" === t)
                    r = i("function* () {}");
                  else if ("%AsyncGeneratorFunction%" === t)
                    r = i("async function* () {}");
                  else if ("%AsyncGenerator%" === t) {
                    var n = e("%AsyncGeneratorFunction%");
                    n && (r = n.prototype);
                  } else if ("%AsyncIteratorPrototype%" === t) {
                    var a = e("%AsyncGenerator%");
                    a && d && (r = d(a.prototype));
                  }
                  return ((m[t] = r), r);
                },
                v = {
                  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
                  "%ArrayPrototype%": ["Array", "prototype"],
                  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
                  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
                  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
                  "%ArrayProto_values%": ["Array", "prototype", "values"],
                  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
                  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
                  "%AsyncGeneratorPrototype%": [
                    "AsyncGeneratorFunction",
                    "prototype",
                    "prototype",
                  ],
                  "%BooleanPrototype%": ["Boolean", "prototype"],
                  "%DataViewPrototype%": ["DataView", "prototype"],
                  "%DatePrototype%": ["Date", "prototype"],
                  "%ErrorPrototype%": ["Error", "prototype"],
                  "%EvalErrorPrototype%": ["EvalError", "prototype"],
                  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
                  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
                  "%FunctionPrototype%": ["Function", "prototype"],
                  "%Generator%": ["GeneratorFunction", "prototype"],
                  "%GeneratorPrototype%": [
                    "GeneratorFunction",
                    "prototype",
                    "prototype",
                  ],
                  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
                  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
                  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
                  "%JSONParse%": ["JSON", "parse"],
                  "%JSONStringify%": ["JSON", "stringify"],
                  "%MapPrototype%": ["Map", "prototype"],
                  "%NumberPrototype%": ["Number", "prototype"],
                  "%ObjectPrototype%": ["Object", "prototype"],
                  "%ObjProto_toString%": ["Object", "prototype", "toString"],
                  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
                  "%PromisePrototype%": ["Promise", "prototype"],
                  "%PromiseProto_then%": ["Promise", "prototype", "then"],
                  "%Promise_all%": ["Promise", "all"],
                  "%Promise_reject%": ["Promise", "reject"],
                  "%Promise_resolve%": ["Promise", "resolve"],
                  "%RangeErrorPrototype%": ["RangeError", "prototype"],
                  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
                  "%RegExpPrototype%": ["RegExp", "prototype"],
                  "%SetPrototype%": ["Set", "prototype"],
                  "%SharedArrayBufferPrototype%": [
                    "SharedArrayBuffer",
                    "prototype",
                  ],
                  "%StringPrototype%": ["String", "prototype"],
                  "%SymbolPrototype%": ["Symbol", "prototype"],
                  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
                  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
                  "%TypeErrorPrototype%": ["TypeError", "prototype"],
                  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
                  "%Uint8ClampedArrayPrototype%": [
                    "Uint8ClampedArray",
                    "prototype",
                  ],
                  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
                  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
                  "%URIErrorPrototype%": ["URIError", "prototype"],
                  "%WeakMapPrototype%": ["WeakMap", "prototype"],
                  "%WeakSetPrototype%": ["WeakSet", "prototype"],
                },
                _ = k(),
                A = w(),
                C = _.call(Function.call, Array.prototype.concat),
                E = _.call(Function.apply, Array.prototype.splice),
                j = _.call(Function.call, String.prototype.replace),
                I = _.call(Function.call, String.prototype.slice),
                S = _.call(Function.call, RegExp.prototype.exec),
                D =
                  /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
                F = /\\(\\)?/g,
                T = function (e) {
                  var t = I(e, 0, 1),
                    r = I(e, -1);
                  if ("%" === t && "%" !== r)
                    throw new n(
                      "invalid intrinsic syntax, expected closing `%`",
                    );
                  if ("%" === r && "%" !== t)
                    throw new n(
                      "invalid intrinsic syntax, expected opening `%`",
                    );
                  var a = [];
                  return (
                    j(e, D, function (e, t, r, n) {
                      a[a.length] = r ? j(n, F, "$1") : t || e;
                    }),
                    a
                  );
                },
                R = function (e, t) {
                  var r,
                    a = e;
                  if ((A(v, a) && (a = "%" + (r = v[a])[0] + "%"), A(m, a))) {
                    var i = m[a];
                    if ((i === f && (i = b(a)), typeof i > "u" && !t))
                      throw new o(
                        "intrinsic " +
                          e +
                          " exists, but is not available. Please file an issue!",
                      );
                    return { alias: r, name: a, value: i };
                  }
                  throw new n("intrinsic " + e + " does not exist!");
                };
              t.exports = function (e, t) {
                if ("string" != typeof e || 0 === e.length)
                  throw new o("intrinsic name must be a non-empty string");
                if (arguments.length > 1 && "boolean" != typeof t)
                  throw new o('"allowMissing" argument must be a boolean');
                if (null === S(/^%?[^%]*%?$/, e))
                  throw new n(
                    "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
                  );
                var r = T(e),
                  a = r.length > 0 ? r[0] : "",
                  i = R("%" + a + "%", t),
                  l = i.name,
                  c = i.value,
                  u = !1,
                  p = i.alias;
                p && ((a = p[0]), E(r, C([0, 1], p)));
                for (var d = 1, f = !0; d < r.length; d += 1) {
                  var h = r[d],
                    g = I(h, 0, 1),
                    b = I(h, -1);
                  if (
                    ('"' === g ||
                      "'" === g ||
                      "`" === g ||
                      '"' === b ||
                      "'" === b ||
                      "`" === b) &&
                    g !== b
                  )
                    throw new n(
                      "property names with quotes must have matching quotes",
                    );
                  if (
                    (("constructor" !== h && f) || (u = !0),
                    (a += "." + h),
                    A(m, (l = "%" + a + "%")))
                  )
                    c = m[l];
                  else if (null != c) {
                    if (!(h in c)) {
                      if (!t)
                        throw new o(
                          "base intrinsic for " +
                            e +
                            " exists, but the property is not available.",
                        );
                      return;
                    }
                    if (s && d + 1 >= r.length) {
                      var x = s(c, h);
                      c =
                        (f = !!x) && "get" in x && !("originalValue" in x.get)
                          ? x.get
                          : c[h];
                    } else ((f = A(c, h)), (c = c[h]));
                    f && !u && (m[l] = c);
                  }
                }
                return c;
              };
            }),
            A = f((e, t) => {
              var r = k(),
                n = _(),
                a = n("%Function.prototype.apply%"),
                o = n("%Function.prototype.call%"),
                i = n("%Reflect.apply%", !0) || r.call(o, a),
                s = n("%Object.getOwnPropertyDescriptor%", !0),
                l = n("%Object.defineProperty%", !0),
                c = n("%Math.max%");
              if (l)
                try {
                  l({}, "a", { value: 1 });
                } catch (e) {
                  l = null;
                }
              t.exports = function (e) {
                var t = i(r, o, arguments);
                return (
                  s &&
                    l &&
                    s(t, "length").configurable &&
                    l(t, "length", {
                      value: 1 + c(0, e.length - (arguments.length - 1)),
                    }),
                  t
                );
              };
              var u = function () {
                return i(r, a, arguments);
              };
              l ? l(t.exports, "apply", { value: u }) : (t.exports.apply = u);
            }),
            C = f((e, t) => {
              var r = _(),
                n = A(),
                a = n(r("String.prototype.indexOf"));
              t.exports = function (e, t) {
                var o = r(e, !!t);
                return "function" == typeof o && a(e, ".prototype.") > -1
                  ? n(o)
                  : o;
              };
            }),
            E = f(() => {}),
            j = f((e, t) => {
              var r = "function" == typeof Map && Map.prototype,
                n =
                  Object.getOwnPropertyDescriptor && r
                    ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
                    : null,
                a = r && n && "function" == typeof n.get ? n.get : null,
                o = r && Map.prototype.forEach,
                i = "function" == typeof Set && Set.prototype,
                s =
                  Object.getOwnPropertyDescriptor && i
                    ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
                    : null,
                l = i && s && "function" == typeof s.get ? s.get : null,
                c = i && Set.prototype.forEach,
                u =
                  "function" == typeof WeakMap && WeakMap.prototype
                    ? WeakMap.prototype.has
                    : null,
                p =
                  "function" == typeof WeakSet && WeakSet.prototype
                    ? WeakSet.prototype.has
                    : null,
                d =
                  "function" == typeof WeakRef && WeakRef.prototype
                    ? WeakRef.prototype.deref
                    : null,
                f = Boolean.prototype.valueOf,
                h = Object.prototype.toString,
                m = Function.prototype.toString,
                g = String.prototype.match,
                b = String.prototype.slice,
                x = String.prototype.replace,
                y = String.prototype.toUpperCase,
                v = String.prototype.toLowerCase,
                k = RegExp.prototype.test,
                w = Array.prototype.concat,
                _ = Array.prototype.join,
                A = Array.prototype.slice,
                C = Math.floor,
                j =
                  "function" == typeof BigInt ? BigInt.prototype.valueOf : null,
                I = Object.getOwnPropertySymbols,
                S =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? Symbol.prototype.toString
                    : null,
                D =
                  "function" == typeof Symbol &&
                  "object" == typeof Symbol.iterator,
                F =
                  "function" == typeof Symbol && Symbol.toStringTag
                    ? Symbol.toStringTag
                    : null,
                T = Object.prototype.propertyIsEnumerable,
                R =
                  ("function" == typeof Reflect
                    ? Reflect.getPrototypeOf
                    : Object.getPrototypeOf) ||
                  ([].__proto__ === Array.prototype
                    ? function (e) {
                        return e.__proto__;
                      }
                    : null);
              function P(e, t) {
                if (
                  e === 1 / 0 ||
                  e === -1 / 0 ||
                  e != e ||
                  (e && e > -1e3 && e < 1e3) ||
                  k.call(/e/, t)
                )
                  return t;
                var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
                if ("number" == typeof e) {
                  var n = e < 0 ? -C(-e) : C(e);
                  if (n !== e) {
                    var a = String(n),
                      o = b.call(t, a.length + 1);
                    return (
                      x.call(a, r, "$&_") +
                      "." +
                      x.call(x.call(o, /([0-9]{3})/g, "$&_"), /_$/, "")
                    );
                  }
                }
                return x.call(t, r, "$&_");
              }
              var L = E(),
                O = L.custom,
                N = q(O) ? O : null;
              function M(e, t, r) {
                var n = "double" === (r.quoteStyle || t) ? '"' : "'";
                return n + e + n;
              }
              function B(e) {
                return (
                  "[object Array]" === H(e) &&
                  (!F || !("object" == typeof e && F in e))
                );
              }
              function z(e) {
                return (
                  "[object RegExp]" === H(e) &&
                  (!F || !("object" == typeof e && F in e))
                );
              }
              function q(e) {
                if (D) return e && "object" == typeof e && e instanceof Symbol;
                if ("symbol" == typeof e) return !0;
                if (!e || "object" != typeof e || !S) return !1;
                try {
                  return (S.call(e), !0);
                } catch (e) {}
                return !1;
              }
              t.exports = function e(t, r, n, i) {
                var s = r || {};
                if (
                  U(s, "quoteStyle") &&
                  "single" !== s.quoteStyle &&
                  "double" !== s.quoteStyle
                )
                  throw TypeError(
                    'option "quoteStyle" must be "single" or "double"',
                  );
                if (
                  U(s, "maxStringLength") &&
                  ("number" == typeof s.maxStringLength
                    ? s.maxStringLength < 0 && s.maxStringLength !== 1 / 0
                    : null !== s.maxStringLength)
                )
                  throw TypeError(
                    'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
                  );
                var h = !U(s, "customInspect") || s.customInspect;
                if ("boolean" != typeof h && "symbol" !== h)
                  throw TypeError(
                    "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`",
                  );
                if (
                  U(s, "indent") &&
                  null !== s.indent &&
                  "	" !== s.indent &&
                  !(parseInt(s.indent, 10) === s.indent && s.indent > 0)
                )
                  throw TypeError(
                    'option "indent" must be "\\t", an integer > 0, or `null`',
                  );
                if (
                  U(s, "numericSeparator") &&
                  "boolean" != typeof s.numericSeparator
                )
                  throw TypeError(
                    'option "numericSeparator", if provided, must be `true` or `false`',
                  );
                var y = s.numericSeparator;
                if (typeof t > "u") return "undefined";
                if (null === t) return "null";
                if ("boolean" == typeof t) return t ? "true" : "false";
                if ("string" == typeof t)
                  return (function e(t, r) {
                    if (t.length > r.maxStringLength) {
                      var n = t.length - r.maxStringLength;
                      return (
                        e(b.call(t, 0, r.maxStringLength), r) +
                        "... " +
                        n +
                        " more character" +
                        (n > 1 ? "s" : "")
                      );
                    }
                    return M(
                      x.call(x.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, G),
                      "single",
                      r,
                    );
                  })(t, s);
                if ("number" == typeof t) {
                  if (0 === t) return 1 / 0 / t > 0 ? "0" : "-0";
                  var k = String(t);
                  return y ? P(t, k) : k;
                }
                if ("bigint" == typeof t) {
                  var C = String(t) + "n";
                  return y ? P(t, C) : C;
                }
                var E = typeof s.depth > "u" ? 5 : s.depth;
                if (
                  (typeof n > "u" && (n = 0),
                  n >= E && E > 0 && "object" == typeof t)
                )
                  return B(t) ? "[Array]" : "[Object]";
                var I = (function (e, t) {
                  var r;
                  if ("	" === e.indent) r = "	";
                  else {
                    if ("number" != typeof e.indent || !(e.indent > 0))
                      return null;
                    r = _.call(Array(e.indent + 1), " ");
                  }
                  return { base: r, prev: _.call(Array(t + 1), r) };
                })(s, n);
                if (typeof i > "u") i = [];
                else if (Q(i, t) >= 0) return "[Circular]";
                function O(t, r, a) {
                  if ((r && (i = A.call(i)).push(r), a)) {
                    var o = { depth: s.depth };
                    return (
                      U(s, "quoteStyle") && (o.quoteStyle = s.quoteStyle),
                      e(t, o, n + 1, i)
                    );
                  }
                  return e(t, s, n + 1, i);
                }
                if ("function" == typeof t && !z(t)) {
                  var $ = (function (e) {
                      if (e.name) return e.name;
                      var t = g.call(m.call(e), /^function\s*([\w$]+)/);
                      return t ? t[1] : null;
                    })(t),
                    Y = J(t, O);
                  return (
                    "[Function" +
                    ($ ? ": " + $ : " (anonymous)") +
                    "]" +
                    (Y.length > 0 ? " { " + _.call(Y, ", ") + " }" : "")
                  );
                }
                if (q(t)) {
                  var K = D
                    ? x.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1")
                    : S.call(t);
                  return "object" != typeof t || D ? K : V(K);
                }
                if (
                  t &&
                  "object" == typeof t &&
                  (("u" > typeof HTMLElement && t instanceof HTMLElement) ||
                    ("string" == typeof t.nodeName &&
                      "function" == typeof t.getAttribute))
                ) {
                  for (
                    var ee,
                      et = "<" + v.call(String(t.nodeName)),
                      er = t.attributes || [],
                      en = 0;
                    en < er.length;
                    en++
                  )
                    et +=
                      " " +
                      er[en].name +
                      "=" +
                      M(
                        ((ee = er[en].value),
                        x.call(String(ee), /"/g, "&quot;")),
                        "double",
                        s,
                      );
                  return (
                    (et += ">"),
                    t.childNodes && t.childNodes.length && (et += "..."),
                    (et += "</" + v.call(String(t.nodeName)) + ">")
                  );
                }
                if (B(t)) {
                  if (0 === t.length) return "[]";
                  var ea = J(t, O);
                  return I &&
                    !(function (e) {
                      for (var t = 0; t < e.length; t++)
                        if (Q(e[t], "\n") >= 0) return !1;
                      return !0;
                    })(ea)
                    ? "[" + X(ea, I) + "]"
                    : "[ " + _.call(ea, ", ") + " ]";
                }
                if (
                  "[object Error]" === H(t) &&
                  (!F || !("object" == typeof t && F in t))
                ) {
                  var eo = J(t, O);
                  return "cause" in Error.prototype ||
                    !("cause" in t) ||
                    T.call(t, "cause")
                    ? 0 === eo.length
                      ? "[" + String(t) + "]"
                      : "{ [" + String(t) + "] " + _.call(eo, ", ") + " }"
                    : "{ [" +
                        String(t) +
                        "] " +
                        _.call(w.call("[cause]: " + O(t.cause), eo), ", ") +
                        " }";
                }
                if ("object" == typeof t && h) {
                  if (N && "function" == typeof t[N] && L)
                    return L(t, { depth: E - n });
                  if ("symbol" !== h && "function" == typeof t.inspect)
                    return t.inspect();
                }
                if (
                  (function (e) {
                    if (!a || !e || "object" != typeof e) return !1;
                    try {
                      a.call(e);
                      try {
                        l.call(e);
                      } catch (e) {
                        return !0;
                      }
                      return e instanceof Map;
                    } catch (e) {}
                    return !1;
                  })(t)
                ) {
                  var ei = [];
                  return (
                    o &&
                      o.call(t, function (e, r) {
                        ei.push(O(r, t, !0) + " => " + O(e, t));
                      }),
                    Z("Map", a.call(t), ei, I)
                  );
                }
                if (
                  (function (e) {
                    if (!l || !e || "object" != typeof e) return !1;
                    try {
                      l.call(e);
                      try {
                        a.call(e);
                      } catch (e) {
                        return !0;
                      }
                      return e instanceof Set;
                    } catch (e) {}
                    return !1;
                  })(t)
                ) {
                  var es = [];
                  return (
                    c &&
                      c.call(t, function (e) {
                        es.push(O(e, t));
                      }),
                    Z("Set", l.call(t), es, I)
                  );
                }
                if (
                  (function (e) {
                    if (!u || !e || "object" != typeof e) return !1;
                    try {
                      u.call(e, u);
                      try {
                        p.call(e, p);
                      } catch (e) {
                        return !0;
                      }
                      return e instanceof WeakMap;
                    } catch (e) {}
                    return !1;
                  })(t)
                )
                  return W("WeakMap");
                if (
                  (function (e) {
                    if (!p || !e || "object" != typeof e) return !1;
                    try {
                      p.call(e, p);
                      try {
                        u.call(e, u);
                      } catch (e) {
                        return !0;
                      }
                      return e instanceof WeakSet;
                    } catch (e) {}
                    return !1;
                  })(t)
                )
                  return W("WeakSet");
                if (
                  (function (e) {
                    if (!d || !e || "object" != typeof e) return !1;
                    try {
                      return (d.call(e), !0);
                    } catch (e) {}
                    return !1;
                  })(t)
                )
                  return W("WeakRef");
                if (
                  "[object Number]" === H(t) &&
                  (!F || !("object" == typeof t && F in t))
                )
                  return V(O(Number(t)));
                if (
                  (function (e) {
                    if (!e || "object" != typeof e || !j) return !1;
                    try {
                      return (j.call(e), !0);
                    } catch (e) {}
                    return !1;
                  })(t)
                )
                  return V(O(j.call(t)));
                if (
                  "[object Boolean]" === H(t) &&
                  (!F || !("object" == typeof t && F in t))
                )
                  return V(f.call(t));
                if (
                  "[object String]" === H(t) &&
                  (!F || !("object" == typeof t && F in t))
                )
                  return V(O(String(t)));
                if (
                  !(
                    "[object Date]" === H(t) &&
                    (!F || !("object" == typeof t && F in t))
                  ) &&
                  !z(t)
                ) {
                  var el = J(t, O),
                    ec = R
                      ? R(t) === Object.prototype
                      : t instanceof Object || t.constructor === Object,
                    eu = t instanceof Object ? "" : "null prototype",
                    ep =
                      !ec && F && Object(t) === t && F in t
                        ? b.call(H(t), 8, -1)
                        : eu
                          ? "Object"
                          : "",
                    ed =
                      (ec || "function" != typeof t.constructor
                        ? ""
                        : t.constructor.name
                          ? t.constructor.name + " "
                          : "") +
                      (ep || eu
                        ? "[" +
                          _.call(w.call([], ep || [], eu || []), ": ") +
                          "] "
                        : "");
                  return 0 === el.length
                    ? ed + "{}"
                    : I
                      ? ed + "{" + X(el, I) + "}"
                      : ed + "{ " + _.call(el, ", ") + " }";
                }
                return String(t);
              };
              var $ =
                Object.prototype.hasOwnProperty ||
                function (e) {
                  return e in this;
                };
              function U(e, t) {
                return $.call(e, t);
              }
              function H(e) {
                return h.call(e);
              }
              function Q(e, t) {
                if (e.indexOf) return e.indexOf(t);
                for (var r = 0, n = e.length; r < n; r++)
                  if (e[r] === t) return r;
                return -1;
              }
              function G(e) {
                var t = e.charCodeAt(0),
                  r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[t];
                return r
                  ? "\\" + r
                  : "\\x" + (t < 16 ? "0" : "") + y.call(t.toString(16));
              }
              function V(e) {
                return "Object(" + e + ")";
              }
              function W(e) {
                return e + " { ? }";
              }
              function Z(e, t, r, n) {
                return (
                  e + " (" + t + ") {" + (n ? X(r, n) : _.call(r, ", ")) + "}"
                );
              }
              function X(e, t) {
                if (0 === e.length) return "";
                var r = "\n" + t.prev + t.base;
                return r + _.call(e, "," + r) + "\n" + t.prev;
              }
              function J(e, t) {
                var r = B(e),
                  n = [];
                if (r) {
                  n.length = e.length;
                  for (var a = 0; a < e.length; a++)
                    n[a] = U(e, a) ? t(e[a], e) : "";
                }
                var o,
                  i = "function" == typeof I ? I(e) : [];
                if (D) {
                  o = {};
                  for (var s = 0; s < i.length; s++) o["$" + i[s]] = i[s];
                }
                for (var l in e)
                  U(e, l) &&
                    ((r && String(Number(l)) === l && l < e.length) ||
                      (D && o["$" + l] instanceof Symbol) ||
                      (k.call(/[^\w$]/, l)
                        ? n.push(t(l, e) + ": " + t(e[l], e))
                        : n.push(l + ": " + t(e[l], e))));
                if ("function" == typeof I)
                  for (var c = 0; c < i.length; c++)
                    T.call(e, i[c]) &&
                      n.push("[" + t(i[c]) + "]: " + t(e[i[c]], e));
                return n;
              }
            }),
            I = f((e, t) => {
              var r = _(),
                n = C(),
                a = j(),
                o = r("%TypeError%"),
                i = r("%WeakMap%", !0),
                s = r("%Map%", !0),
                l = n("WeakMap.prototype.get", !0),
                c = n("WeakMap.prototype.set", !0),
                u = n("WeakMap.prototype.has", !0),
                p = n("Map.prototype.get", !0),
                d = n("Map.prototype.set", !0),
                f = n("Map.prototype.has", !0),
                h = function (e, t) {
                  for (var r, n = e; null !== (r = n.next); n = r)
                    if (r.key === t)
                      return (
                        (n.next = r.next),
                        (r.next = e.next),
                        (e.next = r),
                        r
                      );
                },
                m = function (e, t) {
                  var r = h(e, t);
                  return r && r.value;
                },
                g = function (e, t, r) {
                  var n = h(e, t);
                  n
                    ? (n.value = r)
                    : (e.next = { key: t, next: e.next, value: r });
                };
              t.exports = function () {
                var e,
                  t,
                  r,
                  n = {
                    assert: function (e) {
                      if (!n.has(e))
                        throw new o("Side channel does not contain " + a(e));
                    },
                    get: function (n) {
                      if (
                        i &&
                        n &&
                        ("object" == typeof n || "function" == typeof n)
                      ) {
                        if (e) return l(e, n);
                      } else if (s) {
                        if (t) return p(t, n);
                      } else if (r) return m(r, n);
                    },
                    has: function (n) {
                      if (
                        i &&
                        n &&
                        ("object" == typeof n || "function" == typeof n)
                      ) {
                        if (e) return u(e, n);
                      } else if (s) {
                        if (t) return f(t, n);
                      } else if (r) return !!h(r, n);
                      return !1;
                    },
                    set: function (n, a) {
                      i && n && ("object" == typeof n || "function" == typeof n)
                        ? (e || (e = new i()), c(e, n, a))
                        : s
                          ? (t || (t = new s()), d(t, n, a))
                          : (r || (r = { key: {}, next: null }), g(r, n, a));
                    },
                  };
                return n;
              };
            }),
            S = f((e, t) => {
              var r = String.prototype.replace,
                n = /%20/g,
                a = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
              t.exports = {
                default: a.RFC3986,
                formatters: {
                  RFC1738: function (e) {
                    return r.call(e, n, "+");
                  },
                  RFC3986: function (e) {
                    return String(e);
                  },
                },
                RFC1738: a.RFC1738,
                RFC3986: a.RFC3986,
              };
            }),
            D = f((e, t) => {
              var r = S(),
                n = Object.prototype.hasOwnProperty,
                a = Array.isArray,
                o = (function () {
                  for (var e = [], t = 0; t < 256; ++t)
                    e.push(
                      "%" +
                        ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase(),
                    );
                  return e;
                })(),
                i = function (e) {
                  for (; e.length > 1;) {
                    var t = e.pop(),
                      r = t.obj[t.prop];
                    if (a(r)) {
                      for (var n = [], o = 0; o < r.length; ++o)
                        "u" > typeof r[o] && n.push(r[o]);
                      t.obj[t.prop] = n;
                    }
                  }
                },
                s = function (e, t) {
                  for (
                    var r = t && t.plainObjects ? Object.create(null) : {},
                      n = 0;
                    n < e.length;
                    ++n
                  )
                    "u" > typeof e[n] && (r[n] = e[n]);
                  return r;
                };
              t.exports = {
                arrayToObject: s,
                assign: function (e, t) {
                  return Object.keys(t).reduce(function (e, r) {
                    return ((e[r] = t[r]), e);
                  }, e);
                },
                combine: function (e, t) {
                  return [].concat(e, t);
                },
                compact: function (e) {
                  for (
                    var t = [{ obj: { o: e }, prop: "o" }], r = [], n = 0;
                    n < t.length;
                    ++n
                  )
                    for (
                      var a = t[n],
                        o = a.obj[a.prop],
                        s = Object.keys(o),
                        l = 0;
                      l < s.length;
                      ++l
                    ) {
                      var c = s[l],
                        u = o[c];
                      "object" == typeof u &&
                        null !== u &&
                        -1 === r.indexOf(u) &&
                        (t.push({ obj: o, prop: c }), r.push(u));
                    }
                  return (i(t), e);
                },
                decode: function (e, t, r) {
                  var n = e.replace(/\+/g, " ");
                  if ("iso-8859-1" === r)
                    return n.replace(/%[0-9a-f]{2}/gi, unescape);
                  try {
                    return decodeURIComponent(n);
                  } catch (e) {
                    return n;
                  }
                },
                encode: function (e, t, n, a, i) {
                  if (0 === e.length) return e;
                  var s = e;
                  if (
                    ("symbol" == typeof e
                      ? (s = Symbol.prototype.toString.call(e))
                      : "string" != typeof e && (s = String(e)),
                    "iso-8859-1" === n)
                  )
                    return escape(s).replace(/%u[0-9a-f]{4}/gi, function (e) {
                      return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
                    });
                  for (var l = "", c = 0; c < s.length; ++c) {
                    var u = s.charCodeAt(c);
                    if (
                      45 === u ||
                      46 === u ||
                      95 === u ||
                      126 === u ||
                      (u >= 48 && u <= 57) ||
                      (u >= 65 && u <= 90) ||
                      (u >= 97 && u <= 122) ||
                      (i === r.RFC1738 && (40 === u || 41 === u))
                    ) {
                      l += s.charAt(c);
                      continue;
                    }
                    if (u < 128) {
                      l += o[u];
                      continue;
                    }
                    if (u < 2048) {
                      l += o[192 | (u >> 6)] + o[128 | (63 & u)];
                      continue;
                    }
                    if (u < 55296 || u >= 57344) {
                      l +=
                        o[224 | (u >> 12)] +
                        o[128 | ((u >> 6) & 63)] +
                        o[128 | (63 & u)];
                      continue;
                    }
                    ((c += 1),
                      (l +=
                        o[
                          240 |
                            ((u =
                              65536 +
                              (((1023 & u) << 10) |
                                (1023 & s.charCodeAt(c)))) >>
                              18)
                        ] +
                        o[128 | ((u >> 12) & 63)] +
                        o[128 | ((u >> 6) & 63)] +
                        o[128 | (63 & u)]));
                  }
                  return l;
                },
                isBuffer: function (e) {
                  return (
                    !!e &&
                    "object" == typeof e &&
                    !!(
                      e.constructor &&
                      e.constructor.isBuffer &&
                      e.constructor.isBuffer(e)
                    )
                  );
                },
                isRegExp: function (e) {
                  return (
                    "[object RegExp]" === Object.prototype.toString.call(e)
                  );
                },
                maybeMap: function (e, t) {
                  if (a(e)) {
                    for (var r = [], n = 0; n < e.length; n += 1)
                      r.push(t(e[n]));
                    return r;
                  }
                  return t(e);
                },
                merge: function e(t, r, o) {
                  if (!r) return t;
                  if ("object" != typeof r) {
                    if (a(t)) t.push(r);
                    else {
                      if (!t || "object" != typeof t) return [t, r];
                      ((o && (o.plainObjects || o.allowPrototypes)) ||
                        !n.call(Object.prototype, r)) &&
                        (t[r] = !0);
                    }
                    return t;
                  }
                  if (!t || "object" != typeof t) return [t].concat(r);
                  var i = t;
                  return (
                    a(t) && !a(r) && (i = s(t, o)),
                    a(t) && a(r)
                      ? (r.forEach(function (r, a) {
                          if (n.call(t, a)) {
                            var i = t[a];
                            i &&
                            "object" == typeof i &&
                            r &&
                            "object" == typeof r
                              ? (t[a] = e(i, r, o))
                              : t.push(r);
                          } else t[a] = r;
                        }),
                        t)
                      : Object.keys(r).reduce(function (t, a) {
                          var i = r[a];
                          return (
                            n.call(t, a) ? (t[a] = e(t[a], i, o)) : (t[a] = i),
                            t
                          );
                        }, i)
                  );
                },
              };
            }),
            F = f((e, t) => {
              var r = I(),
                n = D(),
                a = S(),
                o = Object.prototype.hasOwnProperty,
                i = {
                  brackets: function (e) {
                    return e + "[]";
                  },
                  comma: "comma",
                  indices: function (e, t) {
                    return e + "[" + t + "]";
                  },
                  repeat: function (e) {
                    return e;
                  },
                },
                s = Array.isArray,
                l = Array.prototype.push,
                c = function (e, t) {
                  l.apply(e, s(t) ? t : [t]);
                },
                u = Date.prototype.toISOString,
                p = a.default,
                d = {
                  addQueryPrefix: !1,
                  allowDots: !1,
                  charset: "utf-8",
                  charsetSentinel: !1,
                  delimiter: "&",
                  encode: !0,
                  encoder: n.encode,
                  encodeValuesOnly: !1,
                  format: p,
                  formatter: a.formatters[p],
                  indices: !1,
                  serializeDate: function (e) {
                    return u.call(e);
                  },
                  skipNulls: !1,
                  strictNullHandling: !1,
                },
                f = {},
                h = function e(t, a, o, i, l, u, p, h, m, g, b, x, y, v, k, w) {
                  for (
                    var _, A, C = t, E = w, j = 0, I = !1;
                    void 0 !== (E = E.get(f)) && !I;
                  ) {
                    var S = E.get(t);
                    if (((j += 1), "u" > typeof S)) {
                      if (S === j) throw RangeError("Cyclic object value");
                      I = !0;
                    }
                    typeof E.get(f) > "u" && (j = 0);
                  }
                  if (
                    ("function" == typeof h
                      ? (C = h(a, C))
                      : C instanceof Date
                        ? (C = b(C))
                        : "comma" === o &&
                          s(C) &&
                          (C = n.maybeMap(C, function (e) {
                            return e instanceof Date ? b(e) : e;
                          })),
                    null === C)
                  ) {
                    if (l) return p && !v ? p(a, d.encoder, k, "key", x) : a;
                    C = "";
                  }
                  if (
                    "string" == typeof (_ = C) ||
                    "number" == typeof _ ||
                    "boolean" == typeof _ ||
                    "symbol" == typeof _ ||
                    "bigint" == typeof _ ||
                    n.isBuffer(C)
                  )
                    return p
                      ? [
                          y(v ? a : p(a, d.encoder, k, "key", x)) +
                            "=" +
                            y(p(C, d.encoder, k, "value", x)),
                        ]
                      : [y(a) + "=" + y(String(C))];
                  var D = [];
                  if (typeof C > "u") return D;
                  if ("comma" === o && s(C))
                    (v && p && (C = n.maybeMap(C, p)),
                      (A = [
                        { value: C.length > 0 ? C.join(",") || null : void 0 },
                      ]));
                  else if (s(h)) A = h;
                  else {
                    var F = Object.keys(C);
                    A = m ? F.sort(m) : F;
                  }
                  for (
                    var T = i && s(C) && 1 === C.length ? a + "[]" : a, R = 0;
                    R < A.length;
                    ++R
                  ) {
                    var P = A[R],
                      L =
                        "object" == typeof P && "u" > typeof P.value
                          ? P.value
                          : C[P];
                    if (!(u && null === L)) {
                      var O = s(C)
                        ? "function" == typeof o
                          ? o(T, P)
                          : T
                        : T + (g ? "." + P : "[" + P + "]");
                      w.set(t, j);
                      var N = r();
                      (N.set(f, w),
                        c(
                          D,
                          e(
                            L,
                            O,
                            o,
                            i,
                            l,
                            u,
                            "comma" === o && v && s(C) ? null : p,
                            h,
                            m,
                            g,
                            b,
                            x,
                            y,
                            v,
                            k,
                            N,
                          ),
                        ));
                    }
                  }
                  return D;
                },
                m = function (e) {
                  if (!e) return d;
                  if (
                    null !== e.encoder &&
                    "u" > typeof e.encoder &&
                    "function" != typeof e.encoder
                  )
                    throw TypeError("Encoder has to be a function.");
                  var t = e.charset || d.charset;
                  if (
                    "u" > typeof e.charset &&
                    "utf-8" !== e.charset &&
                    "iso-8859-1" !== e.charset
                  )
                    throw TypeError(
                      "The charset option must be either utf-8, iso-8859-1, or undefined",
                    );
                  var r = a.default;
                  if ("u" > typeof e.format) {
                    if (!o.call(a.formatters, e.format))
                      throw TypeError("Unknown format option provided.");
                    r = e.format;
                  }
                  var n = a.formatters[r],
                    i = d.filter;
                  return (
                    ("function" == typeof e.filter || s(e.filter)) &&
                      (i = e.filter),
                    {
                      addQueryPrefix:
                        "boolean" == typeof e.addQueryPrefix
                          ? e.addQueryPrefix
                          : d.addQueryPrefix,
                      allowDots:
                        typeof e.allowDots > "u" ? d.allowDots : !!e.allowDots,
                      charset: t,
                      charsetSentinel:
                        "boolean" == typeof e.charsetSentinel
                          ? e.charsetSentinel
                          : d.charsetSentinel,
                      delimiter:
                        typeof e.delimiter > "u" ? d.delimiter : e.delimiter,
                      encode:
                        "boolean" == typeof e.encode ? e.encode : d.encode,
                      encoder:
                        "function" == typeof e.encoder ? e.encoder : d.encoder,
                      encodeValuesOnly:
                        "boolean" == typeof e.encodeValuesOnly
                          ? e.encodeValuesOnly
                          : d.encodeValuesOnly,
                      filter: i,
                      format: r,
                      formatter: n,
                      serializeDate:
                        "function" == typeof e.serializeDate
                          ? e.serializeDate
                          : d.serializeDate,
                      skipNulls:
                        "boolean" == typeof e.skipNulls
                          ? e.skipNulls
                          : d.skipNulls,
                      sort: "function" == typeof e.sort ? e.sort : null,
                      strictNullHandling:
                        "boolean" == typeof e.strictNullHandling
                          ? e.strictNullHandling
                          : d.strictNullHandling,
                    }
                  );
                };
              t.exports = function (e, t) {
                var n,
                  a,
                  o = e,
                  l = m(t);
                "function" == typeof l.filter
                  ? (o = (0, l.filter)("", o))
                  : s(l.filter) && (a = l.filter);
                var u = [];
                if ("object" != typeof o || null === o) return "";
                n =
                  t && t.arrayFormat in i
                    ? t.arrayFormat
                    : t && "indices" in t
                      ? t.indices
                        ? "indices"
                        : "repeat"
                      : "indices";
                var p = i[n];
                if (
                  t &&
                  "commaRoundTrip" in t &&
                  "boolean" != typeof t.commaRoundTrip
                )
                  throw TypeError(
                    "`commaRoundTrip` must be a boolean, or absent",
                  );
                var d = "comma" === p && t && t.commaRoundTrip;
                (a || (a = Object.keys(o)), l.sort && a.sort(l.sort));
                for (var f = r(), g = 0; g < a.length; ++g) {
                  var b = a[g];
                  (l.skipNulls && null === o[b]) ||
                    c(
                      u,
                      h(
                        o[b],
                        b,
                        p,
                        d,
                        l.strictNullHandling,
                        l.skipNulls,
                        l.encode ? l.encoder : null,
                        l.filter,
                        l.sort,
                        l.allowDots,
                        l.serializeDate,
                        l.format,
                        l.formatter,
                        l.encodeValuesOnly,
                        l.charset,
                        f,
                      ),
                    );
                }
                var x = u.join(l.delimiter),
                  y = !0 === l.addQueryPrefix ? "?" : "";
                return (
                  l.charsetSentinel &&
                    ("iso-8859-1" === l.charset
                      ? (y += "utf8=%26%2310003%3B&")
                      : (y += "utf8=%E2%9C%93&")),
                  x.length > 0 ? y + x : ""
                );
              };
            }),
            T = f((e, t) => {
              var r = D(),
                n = Object.prototype.hasOwnProperty,
                a = Array.isArray,
                o = {
                  allowDots: !1,
                  allowPrototypes: !1,
                  allowSparse: !1,
                  arrayLimit: 20,
                  charset: "utf-8",
                  charsetSentinel: !1,
                  comma: !1,
                  decoder: r.decode,
                  delimiter: "&",
                  depth: 5,
                  ignoreQueryPrefix: !1,
                  interpretNumericEntities: !1,
                  parameterLimit: 1e3,
                  parseArrays: !0,
                  plainObjects: !1,
                  strictNullHandling: !1,
                },
                i = function (e, t) {
                  return e &&
                    "string" == typeof e &&
                    t.comma &&
                    e.indexOf(",") > -1
                    ? e.split(",")
                    : e;
                },
                s = function (e, t) {
                  var s,
                    l = { __proto__: null },
                    c = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
                    u = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
                    p = c.split(t.delimiter, u),
                    d = -1,
                    f = t.charset;
                  if (t.charsetSentinel)
                    for (s = 0; s < p.length; ++s)
                      0 === p[s].indexOf("utf8=") &&
                        ("utf8=%E2%9C%93" === p[s]
                          ? (f = "utf-8")
                          : "utf8=%26%2310003%3B" === p[s] &&
                            (f = "iso-8859-1"),
                        (d = s),
                        (s = p.length));
                  for (s = 0; s < p.length; ++s)
                    if (s !== d) {
                      var h,
                        m,
                        g = p[s],
                        b = g.indexOf("]="),
                        x = -1 === b ? g.indexOf("=") : b + 1;
                      (-1 === x
                        ? ((h = t.decoder(g, o.decoder, f, "key")),
                          (m = t.strictNullHandling ? null : ""))
                        : ((h = t.decoder(g.slice(0, x), o.decoder, f, "key")),
                          (m = r.maybeMap(i(g.slice(x + 1), t), function (e) {
                            return t.decoder(e, o.decoder, f, "value");
                          }))),
                        m &&
                          t.interpretNumericEntities &&
                          "iso-8859-1" === f &&
                          (m = m.replace(/&#(\d+);/g, function (e, t) {
                            return String.fromCharCode(parseInt(t, 10));
                          })),
                        g.indexOf("[]=") > -1 && (m = a(m) ? [m] : m),
                        n.call(l, h)
                          ? (l[h] = r.combine(l[h], m))
                          : (l[h] = m));
                    }
                  return l;
                },
                l = function (e, t, r, n) {
                  for (var a = n ? t : i(t, r), o = e.length - 1; o >= 0; --o) {
                    var s,
                      l = e[o];
                    if ("[]" === l && r.parseArrays) s = [].concat(a);
                    else {
                      s = r.plainObjects ? Object.create(null) : {};
                      var c =
                          "[" === l.charAt(0) && "]" === l.charAt(l.length - 1)
                            ? l.slice(1, -1)
                            : l,
                        u = parseInt(c, 10);
                      r.parseArrays || "" !== c
                        ? !isNaN(u) &&
                          l !== c &&
                          String(u) === c &&
                          u >= 0 &&
                          r.parseArrays &&
                          u <= r.arrayLimit
                          ? ((s = [])[u] = a)
                          : "__proto__" !== c && (s[c] = a)
                        : (s = { 0: a });
                    }
                    a = s;
                  }
                  return a;
                },
                c = function (e, t, r, a) {
                  if (e) {
                    var o = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
                      i = /(\[[^[\]]*])/g,
                      s = r.depth > 0 && /(\[[^[\]]*])/.exec(o),
                      c = s ? o.slice(0, s.index) : o,
                      u = [];
                    if (c) {
                      if (
                        !r.plainObjects &&
                        n.call(Object.prototype, c) &&
                        !r.allowPrototypes
                      )
                        return;
                      u.push(c);
                    }
                    for (
                      var p = 0;
                      r.depth > 0 && null !== (s = i.exec(o)) && p < r.depth;
                    ) {
                      if (
                        ((p += 1),
                        !r.plainObjects &&
                          n.call(Object.prototype, s[1].slice(1, -1)) &&
                          !r.allowPrototypes)
                      )
                        return;
                      u.push(s[1]);
                    }
                    return (
                      s && u.push("[" + o.slice(s.index) + "]"),
                      l(u, t, r, a)
                    );
                  }
                },
                u = function (e) {
                  if (!e) return o;
                  if (
                    null !== e.decoder &&
                    void 0 !== e.decoder &&
                    "function" != typeof e.decoder
                  )
                    throw TypeError("Decoder has to be a function.");
                  if (
                    "u" > typeof e.charset &&
                    "utf-8" !== e.charset &&
                    "iso-8859-1" !== e.charset
                  )
                    throw TypeError(
                      "The charset option must be either utf-8, iso-8859-1, or undefined",
                    );
                  var t = typeof e.charset > "u" ? o.charset : e.charset;
                  return {
                    allowDots:
                      typeof e.allowDots > "u" ? o.allowDots : !!e.allowDots,
                    allowPrototypes:
                      "boolean" == typeof e.allowPrototypes
                        ? e.allowPrototypes
                        : o.allowPrototypes,
                    allowSparse:
                      "boolean" == typeof e.allowSparse
                        ? e.allowSparse
                        : o.allowSparse,
                    arrayLimit:
                      "number" == typeof e.arrayLimit
                        ? e.arrayLimit
                        : o.arrayLimit,
                    charset: t,
                    charsetSentinel:
                      "boolean" == typeof e.charsetSentinel
                        ? e.charsetSentinel
                        : o.charsetSentinel,
                    comma: "boolean" == typeof e.comma ? e.comma : o.comma,
                    decoder:
                      "function" == typeof e.decoder ? e.decoder : o.decoder,
                    delimiter:
                      "string" == typeof e.delimiter || r.isRegExp(e.delimiter)
                        ? e.delimiter
                        : o.delimiter,
                    depth:
                      "number" == typeof e.depth || !1 === e.depth
                        ? +e.depth
                        : o.depth,
                    ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
                    interpretNumericEntities:
                      "boolean" == typeof e.interpretNumericEntities
                        ? e.interpretNumericEntities
                        : o.interpretNumericEntities,
                    parameterLimit:
                      "number" == typeof e.parameterLimit
                        ? e.parameterLimit
                        : o.parameterLimit,
                    parseArrays: !1 !== e.parseArrays,
                    plainObjects:
                      "boolean" == typeof e.plainObjects
                        ? e.plainObjects
                        : o.plainObjects,
                    strictNullHandling:
                      "boolean" == typeof e.strictNullHandling
                        ? e.strictNullHandling
                        : o.strictNullHandling,
                  };
                };
              t.exports = function (e, t) {
                var n = u(t);
                if ("" === e || null === e || typeof e > "u")
                  return n.plainObjects ? Object.create(null) : {};
                for (
                  var a = "string" == typeof e ? s(e, n) : e,
                    o = n.plainObjects ? Object.create(null) : {},
                    i = Object.keys(a),
                    l = 0;
                  l < i.length;
                  ++l
                ) {
                  var p = i[l],
                    d = c(p, a[p], n, "string" == typeof e);
                  o = r.merge(o, d, n);
                }
                return !0 === n.allowSparse ? o : r.compact(o);
              };
            }),
            R = f((e, t) => {
              var r = F(),
                n = T(),
                a = S();
              t.exports = { formats: a, parse: n, stringify: r };
            }),
            P = f((e) => {
              var t = g();
              function r() {
                ((this.protocol = null),
                  (this.slashes = null),
                  (this.auth = null),
                  (this.host = null),
                  (this.port = null),
                  (this.hostname = null),
                  (this.hash = null),
                  (this.search = null),
                  (this.query = null),
                  (this.pathname = null),
                  (this.path = null),
                  (this.href = null));
              }
              var n = /^([a-z0-9.+-]+:)/i,
                a = /:[0-9]*$/,
                o = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,
                i = ["'"].concat(
                  ["{", "}", "|", "\\", "^", "`"].concat([
                    "<",
                    ">",
                    '"',
                    "`",
                    " ",
                    "\r",
                    "\n",
                    "	",
                  ]),
                ),
                s = ["%", "/", "?", ";", "#"].concat(i),
                l = ["/", "?", "#"],
                c = /^[+a-z0-9A-Z_-]{0,63}$/,
                u = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                p = { javascript: !0, "javascript:": !0 },
                d = { javascript: !0, "javascript:": !0 },
                f = {
                  http: !0,
                  https: !0,
                  ftp: !0,
                  gopher: !0,
                  file: !0,
                  "http:": !0,
                  "https:": !0,
                  "ftp:": !0,
                  "gopher:": !0,
                  "file:": !0,
                },
                h = R();
              function m(e, t, n) {
                if (e && "object" == typeof e && e instanceof r) return e;
                var a = new r();
                return (a.parse(e, t, n), a);
              }
              ((r.prototype.parse = function (e, r, a) {
                if ("string" != typeof e)
                  throw TypeError(
                    "Parameter 'url' must be a string, not " + typeof e,
                  );
                var m = e.indexOf("?"),
                  g = -1 !== m && m < e.indexOf("#") ? "?" : "#",
                  b = e.split(g);
                b[0] = b[0].replace(/\\/g, "/");
                var x = (e = b.join(g));
                if (((x = x.trim()), !a && 1 === e.split("#").length)) {
                  var y = o.exec(x);
                  if (y)
                    return (
                      (this.path = x),
                      (this.href = x),
                      (this.pathname = y[1]),
                      y[2]
                        ? ((this.search = y[2]),
                          r
                            ? (this.query = h.parse(this.search.substr(1)))
                            : (this.query = this.search.substr(1)))
                        : r && ((this.search = ""), (this.query = {})),
                      this
                    );
                }
                var v = n.exec(x);
                if (v) {
                  var k = (v = v[0]).toLowerCase();
                  ((this.protocol = k), (x = x.substr(v.length)));
                }
                if (a || v || x.match(/^\/\/[^@/]+@[^@/]+/)) {
                  var w = "//" === x.substr(0, 2);
                  w && !(v && d[v]) && ((x = x.substr(2)), (this.slashes = !0));
                }
                if (!d[v] && (w || (v && !f[v]))) {
                  for (var _, A, C = -1, E = 0; E < l.length; E++) {
                    var j = x.indexOf(l[E]);
                    -1 !== j && (-1 === C || j < C) && (C = j);
                  }
                  (-1 !==
                    (A =
                      -1 === C ? x.lastIndexOf("@") : x.lastIndexOf("@", C)) &&
                    ((_ = x.slice(0, A)),
                    (x = x.slice(A + 1)),
                    (this.auth = decodeURIComponent(_))),
                    (C = -1));
                  for (var E = 0; E < s.length; E++) {
                    var j = x.indexOf(s[E]);
                    -1 !== j && (-1 === C || j < C) && (C = j);
                  }
                  (-1 === C && (C = x.length),
                    (this.host = x.slice(0, C)),
                    (x = x.slice(C)),
                    this.parseHost(),
                    (this.hostname = this.hostname || ""));
                  var I =
                    "[" === this.hostname[0] &&
                    "]" === this.hostname[this.hostname.length - 1];
                  if (!I)
                    for (
                      var S = this.hostname.split(/\./), E = 0, D = S.length;
                      E < D;
                      E++
                    ) {
                      var F = S[E];
                      if (F && !F.match(c)) {
                        for (var T = "", R = 0, P = F.length; R < P; R++)
                          F.charCodeAt(R) > 127 ? (T += "x") : (T += F[R]);
                        if (!T.match(c)) {
                          var L = S.slice(0, E),
                            O = S.slice(E + 1),
                            N = F.match(u);
                          (N && (L.push(N[1]), O.unshift(N[2])),
                            O.length && (x = "/" + O.join(".") + x),
                            (this.hostname = L.join(".")));
                          break;
                        }
                      }
                    }
                  (this.hostname.length > 255
                    ? (this.hostname = "")
                    : (this.hostname = this.hostname.toLowerCase()),
                    I || (this.hostname = t.toASCII(this.hostname)));
                  var M = this.port ? ":" + this.port : "",
                    B = this.hostname || "";
                  ((this.host = B + M),
                    (this.href += this.host),
                    I &&
                      ((this.hostname = this.hostname.substr(
                        1,
                        this.hostname.length - 2,
                      )),
                      "/" !== x[0] && (x = "/" + x)));
                }
                if (!p[k])
                  for (var E = 0, D = i.length; E < D; E++) {
                    var z = i[E];
                    if (-1 !== x.indexOf(z)) {
                      var q = encodeURIComponent(z);
                      (q === z && (q = escape(z)), (x = x.split(z).join(q)));
                    }
                  }
                var $ = x.indexOf("#");
                -1 !== $ && ((this.hash = x.substr($)), (x = x.slice(0, $)));
                var U = x.indexOf("?");
                if (
                  (-1 !== U
                    ? ((this.search = x.substr(U)),
                      (this.query = x.substr(U + 1)),
                      r && (this.query = h.parse(this.query)),
                      (x = x.slice(0, U)))
                    : r && ((this.search = ""), (this.query = {})),
                  x && (this.pathname = x),
                  f[k] &&
                    this.hostname &&
                    !this.pathname &&
                    (this.pathname = "/"),
                  this.pathname || this.search)
                ) {
                  var M = this.pathname || "",
                    H = this.search || "";
                  this.path = M + H;
                }
                return ((this.href = this.format()), this);
              }),
                (r.prototype.format = function () {
                  var e = this.auth || "";
                  e &&
                    (e =
                      (e = encodeURIComponent(e)).replace(/%3A/i, ":") + "@");
                  var t = this.protocol || "",
                    r = this.pathname || "",
                    n = this.hash || "",
                    a = !1,
                    o = "";
                  (this.host
                    ? (a = e + this.host)
                    : this.hostname &&
                      ((a =
                        e +
                        (-1 === this.hostname.indexOf(":")
                          ? this.hostname
                          : "[" + this.hostname + "]")),
                      this.port && (a += ":" + this.port)),
                    this.query &&
                      "object" == typeof this.query &&
                      Object.keys(this.query).length &&
                      (o = h.stringify(this.query, {
                        arrayFormat: "repeat",
                        addQueryPrefix: !1,
                      })));
                  var i = this.search || (o && "?" + o) || "";
                  return (
                    t && ":" !== t.substr(-1) && (t += ":"),
                    this.slashes || ((!t || f[t]) && !1 !== a)
                      ? ((a = "//" + (a || "")),
                        r && "/" !== r.charAt(0) && (r = "/" + r))
                      : a || (a = ""),
                    n && "#" !== n.charAt(0) && (n = "#" + n),
                    i && "?" !== i.charAt(0) && (i = "?" + i),
                    t +
                      a +
                      (r = r.replace(/[?#]/g, function (e) {
                        return encodeURIComponent(e);
                      })) +
                      (i = i.replace("#", "%23")) +
                      n
                  );
                }),
                (r.prototype.resolve = function (e) {
                  return this.resolveObject(m(e, !1, !0)).format();
                }),
                (r.prototype.resolveObject = function (e) {
                  if ("string" == typeof e) {
                    var t = new r();
                    (t.parse(e, !1, !0), (e = t));
                  }
                  for (
                    var n = new r(), a = Object.keys(this), o = 0;
                    o < a.length;
                    o++
                  ) {
                    var i = a[o];
                    n[i] = this[i];
                  }
                  if (((n.hash = e.hash), "" === e.href))
                    return ((n.href = n.format()), n);
                  if (e.slashes && !e.protocol) {
                    for (var s = Object.keys(e), l = 0; l < s.length; l++) {
                      var c = s[l];
                      "protocol" !== c && (n[c] = e[c]);
                    }
                    return (
                      f[n.protocol] &&
                        n.hostname &&
                        !n.pathname &&
                        ((n.pathname = "/"), (n.path = n.pathname)),
                      (n.href = n.format()),
                      n
                    );
                  }
                  if (e.protocol && e.protocol !== n.protocol) {
                    if (!f[e.protocol]) {
                      for (var u = Object.keys(e), p = 0; p < u.length; p++) {
                        var h = u[p];
                        n[h] = e[h];
                      }
                      return ((n.href = n.format()), n);
                    }
                    if (((n.protocol = e.protocol), e.host || d[e.protocol]))
                      n.pathname = e.pathname;
                    else {
                      for (
                        var m = (e.pathname || "").split("/");
                        m.length && !(e.host = m.shift());
                      );
                      (e.host || (e.host = ""),
                        e.hostname || (e.hostname = ""),
                        "" !== m[0] && m.unshift(""),
                        m.length < 2 && m.unshift(""),
                        (n.pathname = m.join("/")));
                    }
                    if (
                      ((n.search = e.search),
                      (n.query = e.query),
                      (n.host = e.host || ""),
                      (n.auth = e.auth),
                      (n.hostname = e.hostname || e.host),
                      (n.port = e.port),
                      n.pathname || n.search)
                    ) {
                      var g = n.pathname || "",
                        b = n.search || "";
                      n.path = g + b;
                    }
                    return (
                      (n.slashes = n.slashes || e.slashes),
                      (n.href = n.format()),
                      n
                    );
                  }
                  var x = n.pathname && "/" === n.pathname.charAt(0),
                    y = e.host || (e.pathname && "/" === e.pathname.charAt(0)),
                    v = y || x || (n.host && e.pathname),
                    k = v,
                    w = (n.pathname && n.pathname.split("/")) || [],
                    m = (e.pathname && e.pathname.split("/")) || [],
                    _ = n.protocol && !f[n.protocol];
                  if (
                    (_ &&
                      ((n.hostname = ""),
                      (n.port = null),
                      n.host &&
                        ("" === w[0] ? (w[0] = n.host) : w.unshift(n.host)),
                      (n.host = ""),
                      e.protocol &&
                        ((e.hostname = null),
                        (e.port = null),
                        e.host &&
                          ("" === m[0] ? (m[0] = e.host) : m.unshift(e.host)),
                        (e.host = null)),
                      (v = v && ("" === m[0] || "" === w[0]))),
                    y)
                  )
                    ((n.host = e.host || "" === e.host ? e.host : n.host),
                      (n.hostname =
                        e.hostname || "" === e.hostname
                          ? e.hostname
                          : n.hostname),
                      (n.search = e.search),
                      (n.query = e.query),
                      (w = m));
                  else if (m.length)
                    (w || (w = []),
                      w.pop(),
                      (w = w.concat(m)),
                      (n.search = e.search),
                      (n.query = e.query));
                  else if (null != e.search) {
                    if (_) {
                      ((n.host = w.shift()), (n.hostname = n.host));
                      var A =
                        !!(n.host && n.host.indexOf("@") > 0) &&
                        n.host.split("@");
                      A &&
                        ((n.auth = A.shift()),
                        (n.hostname = A.shift()),
                        (n.host = n.hostname));
                    }
                    return (
                      (n.search = e.search),
                      (n.query = e.query),
                      (null !== n.pathname || null !== n.search) &&
                        (n.path =
                          (n.pathname ? n.pathname : "") +
                          (n.search ? n.search : "")),
                      (n.href = n.format()),
                      n
                    );
                  }
                  if (!w.length)
                    return (
                      (n.pathname = null),
                      n.search ? (n.path = "/" + n.search) : (n.path = null),
                      (n.href = n.format()),
                      n
                    );
                  for (
                    var C = w.slice(-1)[0],
                      E =
                        ((n.host || e.host || w.length > 1) &&
                          ("." === C || ".." === C)) ||
                        "" === C,
                      j = 0,
                      I = w.length;
                    I >= 0;
                    I--
                  )
                    "." === (C = w[I])
                      ? w.splice(I, 1)
                      : ".." === C
                        ? (w.splice(I, 1), j++)
                        : j && (w.splice(I, 1), j--);
                  if (!v && !k) for (; j--; j) w.unshift("..");
                  (v &&
                    "" !== w[0] &&
                    (!w[0] || "/" !== w[0].charAt(0)) &&
                    w.unshift(""),
                    E && "/" !== w.join("/").substr(-1) && w.push(""));
                  var S = "" === w[0] || (w[0] && "/" === w[0].charAt(0));
                  if (_) {
                    ((n.hostname = S ? "" : w.length ? w.shift() : ""),
                      (n.host = n.hostname));
                    var A =
                      !!(n.host && n.host.indexOf("@") > 0) &&
                      n.host.split("@");
                    A &&
                      ((n.auth = A.shift()),
                      (n.hostname = A.shift()),
                      (n.host = n.hostname));
                  }
                  return (
                    (v = v || (n.host && w.length)) && !S && w.unshift(""),
                    w.length > 0
                      ? (n.pathname = w.join("/"))
                      : ((n.pathname = null), (n.path = null)),
                    (null !== n.pathname || null !== n.search) &&
                      (n.path =
                        (n.pathname ? n.pathname : "") +
                        (n.search ? n.search : "")),
                    (n.auth = e.auth || n.auth),
                    (n.slashes = n.slashes || e.slashes),
                    (n.href = n.format()),
                    n
                  );
                }),
                (r.prototype.parseHost = function () {
                  var e = this.host,
                    t = a.exec(e);
                  (t &&
                    (":" !== (t = t[0]) && (this.port = t.substr(1)),
                    (e = e.substr(0, e.length - t.length))),
                    e && (this.hostname = e));
                }),
                (e.parse = m),
                (e.resolve = function (e, t) {
                  return m(e, !1, !0).resolve(t);
                }),
                (e.resolveObject = function (e, t) {
                  return e ? m(e, !1, !0).resolveObject(t) : t;
                }),
                (e.format = function (e) {
                  return (
                    "string" == typeof e && (e = m(e)),
                    e instanceof r ? e.format() : r.prototype.format.call(e)
                  );
                }),
                (e.Url = r));
            }),
            L = {};
          (((e, t) => {
            for (var r in t) l(e, r, { get: t[r], enumerable: !0 });
          })(L, { default: () => N }),
            (r.exports = h(l({}, "__esModule", { value: !0 }), L)));
          var O = m(P());
          ((a = m(P())),
            (o = r.exports),
            h(L, a, "default"),
            o && h(o, a, "default"));
          var N = O.default; /*! Bundled license information:

punycode/punycode.js:
  (*! https://mths.be/punycode v1.4.1 by @mathias *)
*/
        },
        {},
      ],
      "190uq": [
        function (e, t, r) {
          var n,
            a = e("dc992f2ecd1daff8"),
            o = e("2c01ff5b53aa5e85"),
            i = e("24fb1c53d5407a8");
          t.exports = function (e) {
            var t = this.data();
            function r(e, r) {
              t[e] ? t[e].push(r) : (t[e] = [r]);
            }
            (!n &&
              ((this.Parser &&
                this.Parser.prototype &&
                this.Parser.prototype.blockTokenizers) ||
                (this.Compiler &&
                  this.Compiler.prototype &&
                  this.Compiler.prototype.visitors)) &&
              ((n = !0),
              console.warn(
                "[remark-gfm] Warning: please upgrade to remark 13 to use this plugin",
              )),
              r("micromarkExtensions", a(e)),
              r("fromMarkdownExtensions", o),
              r("toMarkdownExtensions", i(e)));
          };
        },
        {
          dc992f2ecd1daff8: "043eJ",
          "2c01ff5b53aa5e85": "6b8sO",
          "24fb1c53d5407a8": "jaeNt",
        },
      ],
      "043eJ": [
        function (e, t, r) {
          t.exports = e("79cd2de88aab1f4c");
        },
        { "79cd2de88aab1f4c": "fmKJ6" },
      ],
      fmKJ6: [
        function (e, t, r) {
          var n = e("e3e08dfcc65053ca"),
            a = e("5890cbc097932c82"),
            o = e("3ecc596de0060181"),
            i = e("3f5abd0ce51a5e09"),
            s = e("9ff3155d72768ce");
          t.exports = function (e) {
            return n([a, o(e), i, s]);
          };
        },
        {
          e3e08dfcc65053ca: "kQyHb",
          "5890cbc097932c82": "l1gta",
          "3ecc596de0060181": "gU4oG",
          "3f5abd0ce51a5e09": "4Lb23",
          "9ff3155d72768ce": "dZ23p",
        },
      ],
      l1gta: [
        function (e, t, r) {
          t.exports = e("28091982e036b9f0");
        },
        { "28091982e036b9f0": "iYhI5" },
      ],
      iYhI5: [
        function (e, t, r) {
          var n = e("b35310b1de75107a"),
            a = e("18b65ec24de6c061"),
            o = e("868ea0b0f6f7977c"),
            i = e("841c3517c71d5c58"),
            s = e("19f5219c50aba8fd"),
            l = e("18124dc9e74e166d"),
            c = {
              tokenize: function (e, t, r) {
                return function (t) {
                  return (e.consume(t), n);
                };
                function n(t) {
                  return 87 === t || t - 32 == 87 ? (e.consume(t), a) : r(t);
                }
                function a(t) {
                  return 87 === t || t - 32 == 87 ? (e.consume(t), o) : r(t);
                }
                function o(t) {
                  return 46 === t ? (e.consume(t), s) : r(t);
                }
                function s(e) {
                  return null === e || i(e) ? r(e) : t(e);
                }
              },
              partial: !0,
            },
            u = {
              tokenize: function (e, t, r) {
                var n, a;
                return i;
                function i(t) {
                  return 38 === t
                    ? e.check(f, u, c)(t)
                    : 46 === t || 95 === t
                      ? e.check(d, u, c)(t)
                      : o(t) || l(t) || (45 !== t && s(t))
                        ? u(t)
                        : (e.consume(t), i);
                }
                function c(t) {
                  return (
                    46 === t ? ((a = n), (n = void 0)) : 95 === t && (n = !0),
                    e.consume(t),
                    i
                  );
                }
                function u(e) {
                  return a || n ? r(e) : t(e);
                }
              },
              partial: !0,
            },
            p = {
              tokenize: function (e, t) {
                var r = 0;
                return n;
                function n(i) {
                  return 38 === i
                    ? e.check(f, t, a)(i)
                    : (40 === i && r++, 41 === i)
                      ? e.check(d, o, a)(i)
                      : v(i)
                        ? t(i)
                        : y(i)
                          ? e.check(d, t, a)(i)
                          : (e.consume(i), n);
                }
                function a(t) {
                  return (e.consume(t), n);
                }
                function o(e) {
                  return --r < 0 ? t(e) : a(e);
                }
              },
              partial: !0,
            },
            d = {
              tokenize: function (e, t, r) {
                return function (t) {
                  return (e.consume(t), n);
                };
                function n(a) {
                  return y(a) ? (e.consume(a), n) : v(a) ? t(a) : r(a);
                }
              },
              partial: !0,
            },
            f = {
              tokenize: function (e, t, r) {
                return function (t) {
                  return (e.consume(t), a);
                };
                function a(t) {
                  return n(t)
                    ? (e.consume(t), a)
                    : 59 === t
                      ? (e.consume(t), o)
                      : r(t);
                }
                function o(e) {
                  return v(e) ? t(e) : r(e);
                }
              },
              partial: !0,
            },
            h = {
              tokenize: function (e, t, r) {
                var n = this;
                return function (t) {
                  return (87 !== t && t - 32 != 87) ||
                    !w(n.previous) ||
                    C(n.events)
                    ? r(t)
                    : (e.enter("literalAutolink"),
                      e.enter("literalAutolinkWww"),
                      e.check(c, e.attempt(u, e.attempt(p, a), r), r)(t));
                };
                function a(r) {
                  return (
                    e.exit("literalAutolinkWww"),
                    e.exit("literalAutolink"),
                    t(r)
                  );
                }
              },
              previous: w,
            },
            m = {
              tokenize: function (e, t, r) {
                var n = this;
                return function (t) {
                  return (72 !== t && t - 32 != 72) ||
                    !_(n.previous) ||
                    C(n.events)
                    ? r(t)
                    : (e.enter("literalAutolink"),
                      e.enter("literalAutolinkHttp"),
                      e.consume(t),
                      a);
                };
                function a(t) {
                  return 84 === t || t - 32 == 84 ? (e.consume(t), i) : r(t);
                }
                function i(t) {
                  return 84 === t || t - 32 == 84 ? (e.consume(t), c) : r(t);
                }
                function c(t) {
                  return 80 === t || t - 32 == 80 ? (e.consume(t), d) : r(t);
                }
                function d(t) {
                  return 83 === t || t - 32 == 83 ? (e.consume(t), f) : f(t);
                }
                function f(t) {
                  return 58 === t ? (e.consume(t), h) : r(t);
                }
                function h(t) {
                  return 47 === t ? (e.consume(t), m) : r(t);
                }
                function m(t) {
                  return 47 === t ? (e.consume(t), g) : r(t);
                }
                function g(t) {
                  return o(t) || l(t) || s(t)
                    ? r(t)
                    : e.attempt(u, e.attempt(p, b), r)(t);
                }
                function b(r) {
                  return (
                    e.exit("literalAutolinkHttp"),
                    e.exit("literalAutolink"),
                    t(r)
                  );
                }
              },
              previous: _,
            },
            g = {
              tokenize: function (e, t, r) {
                var n,
                  o = this;
                return function (t) {
                  return !k(t) || !A(o.previous) || C(o.events)
                    ? r(t)
                    : (e.enter("literalAutolink"),
                      e.enter("literalAutolinkEmail"),
                      (function t(n) {
                        return k(n)
                          ? (e.consume(n), t)
                          : 64 === n
                            ? (e.consume(n), i)
                            : r(n);
                      })(t));
                };
                function i(t) {
                  return 46 === t
                    ? e.check(d, u, s)(t)
                    : 45 === t || 95 === t
                      ? e.check(d, r, l)(t)
                      : a(t)
                        ? (e.consume(t), i)
                        : u(t);
                }
                function s(t) {
                  return (e.consume(t), (n = !0), i);
                }
                function l(t) {
                  return (e.consume(t), c);
                }
                function c(t) {
                  return 46 === t ? e.check(d, r, s)(t) : i(t);
                }
                function u(a) {
                  return n
                    ? (e.exit("literalAutolinkEmail"),
                      e.exit("literalAutolink"),
                      t(a))
                    : r(a);
                }
              },
              previous: A,
            },
            b = {};
          r.text = b;
          for (var x = 48; x < 123;)
            ((b[x] = g), 58 == ++x ? (x = 65) : 91 === x && (x = 97));
          function y(e) {
            return (
              33 === e ||
              34 === e ||
              39 === e ||
              41 === e ||
              42 === e ||
              44 === e ||
              46 === e ||
              58 === e ||
              59 === e ||
              60 === e ||
              63 === e ||
              95 === e ||
              126 === e
            );
          }
          function v(e) {
            return null === e || e < 0 || 32 === e || 60 === e;
          }
          function k(e) {
            return 43 === e || 45 === e || 46 === e || 95 === e || a(e);
          }
          function w(e) {
            return (
              null === e ||
              e < 0 ||
              32 === e ||
              40 === e ||
              42 === e ||
              95 === e ||
              126 === e
            );
          }
          function _(e) {
            return null === e || !n(e);
          }
          function A(e) {
            return 47 !== e && _(e);
          }
          function C(e) {
            for (var t = e.length; t--;)
              if (
                ("labelLink" === e[t][1].type ||
                  "labelImage" === e[t][1].type) &&
                !e[t][1]._balanced
              )
                return !0;
          }
          ((b[43] = g),
            (b[45] = g),
            (b[46] = g),
            (b[95] = g),
            (b[72] = [g, m]),
            (b[104] = [g, m]),
            (b[87] = [g, h]),
            (b[119] = [g, h]));
        },
        {
          b35310b1de75107a: "5AeaT",
          "18b65ec24de6c061": "87vCT",
          "868ea0b0f6f7977c": "J22Fx",
          "841c3517c71d5c58": "1tQ98",
          "19f5219c50aba8fd": "8rLtM",
          "18124dc9e74e166d": "6klFs",
        },
      ],
      gU4oG: [
        function (e, t, r) {
          t.exports = function (e) {
            var t = (e || {}).singleTilde,
              r = {
                tokenize: function (e, r, a) {
                  var o = this.previous,
                    i = this.events,
                    s = 0;
                  return function (l) {
                    return 126 !== l ||
                      (126 === o &&
                        "characterEscape" !== i[i.length - 1][1].type)
                      ? a(l)
                      : (e.enter("strikethroughSequenceTemporary"),
                        (function i(l) {
                          var c,
                            u,
                            p = n(o);
                          return 126 === l
                            ? s > 1
                              ? a(l)
                              : (e.consume(l), s++, i)
                            : s < 2 && !t
                              ? a(l)
                              : ((c = e.exit("strikethroughSequenceTemporary")),
                                (u = n(l)),
                                (c._open = !u || (2 === u && p)),
                                (c._close = !p || (2 === p && u)),
                                r(l));
                        })(l));
                  };
                },
                resolveAll: function (e, t) {
                  for (var r, n, s, l, c = -1; ++c < e.length;)
                    if (
                      "enter" === e[c][0] &&
                      "strikethroughSequenceTemporary" === e[c][1].type &&
                      e[c][1]._close
                    ) {
                      for (s = c; s--;)
                        if (
                          "exit" === e[s][0] &&
                          "strikethroughSequenceTemporary" === e[s][1].type &&
                          e[s][1]._open &&
                          e[c][1].end.offset - e[c][1].start.offset ==
                            e[s][1].end.offset - e[s][1].start.offset
                        ) {
                          ((e[c][1].type = "strikethroughSequence"),
                            (e[s][1].type = "strikethroughSequence"),
                            (r = {
                              type: "strikethrough",
                              start: i(e[s][1].start),
                              end: i(e[c][1].end),
                            }),
                            (n = {
                              type: "strikethroughText",
                              start: i(e[s][1].end),
                              end: i(e[c][1].start),
                            }),
                            a(
                              (l = [
                                ["enter", r, t],
                                ["enter", e[s][1], t],
                                ["exit", e[s][1], t],
                                ["enter", n, t],
                              ]),
                              l.length,
                              0,
                              o(
                                t.parser.constructs.insideSpan.null,
                                e.slice(s + 1, c),
                                t,
                              ),
                            ),
                            a(l, l.length, 0, [
                              ["exit", n, t],
                              ["enter", e[c][1], t],
                              ["exit", e[c][1], t],
                              ["exit", r, t],
                            ]),
                            a(e, s - 1, c - s + 3, l),
                            (c = s + l.length - 2));
                          break;
                        }
                    }
                  return (function (e) {
                    for (var t = -1, r = e.length; ++t < r;)
                      "strikethroughSequenceTemporary" === e[t][1].type &&
                        (e[t][1].type = "data");
                    return e;
                  })(e);
                },
              };
            return (
              null == t && (t = !0),
              { text: { 126: r }, insideSpan: { null: r } }
            );
          };
          var n = e("ba12807708a6f3de"),
            a = e("aaf228c40a0ca098"),
            o = e("a81ae0aef537ed1f"),
            i = e("5bfdf98334245983");
        },
        {
          ba12807708a6f3de: "4nWHv",
          aaf228c40a0ca098: "6yEEr",
          a81ae0aef537ed1f: "8uO5H",
          "5bfdf98334245983": "fpPTw",
        },
      ],
      "4Lb23": [
        function (e, t, r) {
          t.exports = e("b2e7615efe894b23");
        },
        { b2e7615efe894b23: "8Oy3l" },
      ],
      "8Oy3l": [
        function (e, t, r) {
          r.flow = {
            null: {
              tokenize: function (e, t, r) {
                var i,
                  s,
                  l = [],
                  c = 0;
                return function (t) {
                  return null === t || -5 === t || -4 === t || -3 === t
                    ? r(t)
                    : ((e.enter("table")._align = l),
                        e.enter("tableHead"),
                        e.enter("tableRow"),
                        124 === t)
                      ? u(t)
                      : (c++, e.enter("temporaryTableCellContent"), f(t));
                };
                function u(t) {
                  return (
                    e.enter("tableCellDivider"),
                    e.consume(t),
                    e.exit("tableCellDivider"),
                    (i = !0),
                    p
                  );
                }
                function p(t) {
                  return null === t || -5 === t || -4 === t || -3 === t
                    ? null === t
                      ? r(t)
                      : (e.exit("tableRow"),
                        e.exit("tableHead"),
                        e.enter("lineEnding"),
                        e.consume(t),
                        e.exit("lineEnding"),
                        e.check(a, r, n(e, m, "linePrefix", 4)))
                    : -2 === t || -1 === t || 32 === t
                      ? (e.enter("whitespace"), e.consume(t), d)
                      : (i && ((i = void 0), c++), 124 === t)
                        ? u(t)
                        : (e.enter("temporaryTableCellContent"), f(t));
                }
                function d(t) {
                  return -2 === t || -1 === t || 32 === t
                    ? (e.consume(t), d)
                    : (e.exit("whitespace"), p(t));
                }
                function f(t) {
                  return null === t || t < 0 || 32 === t || 124 === t
                    ? (e.exit("temporaryTableCellContent"), p(t))
                    : (e.consume(t), 92 === t ? h : f);
                }
                function h(t) {
                  return 92 === t || 124 === t ? (e.consume(t), f) : f(t);
                }
                function m(t) {
                  return null === t || t < 0 || 32 === t
                    ? r(t)
                    : (e.enter("tableDelimiterRow"), g(t));
                }
                function g(t) {
                  return null === t || -5 === t || -4 === t || -3 === t
                    ? k(t)
                    : -2 === t || -1 === t || 32 === t
                      ? (e.enter("whitespace"), e.consume(t), b)
                      : 45 === t
                        ? (e.enter("tableDelimiterFiller"),
                          e.consume(t),
                          (s = !0),
                          l.push(null),
                          x)
                        : 58 === t
                          ? (e.enter("tableDelimiterAlignment"),
                            e.consume(t),
                            e.exit("tableDelimiterAlignment"),
                            l.push("left"),
                            y)
                          : 124 === t
                            ? (e.enter("tableCellDivider"),
                              e.consume(t),
                              e.exit("tableCellDivider"),
                              g)
                            : r(t);
                }
                function b(t) {
                  return -2 === t || -1 === t || 32 === t
                    ? (e.consume(t), b)
                    : (e.exit("whitespace"), g(t));
                }
                function x(t) {
                  return 45 === t
                    ? (e.consume(t), x)
                    : (e.exit("tableDelimiterFiller"), 58 === t)
                      ? (e.enter("tableDelimiterAlignment"),
                        e.consume(t),
                        e.exit("tableDelimiterAlignment"),
                        (l[l.length - 1] =
                          "left" === l[l.length - 1] ? "center" : "right"),
                        v)
                      : g(t);
                }
                function y(t) {
                  return 45 === t
                    ? (e.enter("tableDelimiterFiller"),
                      e.consume(t),
                      (s = !0),
                      x)
                    : r(t);
                }
                function v(t) {
                  return null === t || -5 === t || -4 === t || -3 === t
                    ? k(t)
                    : -2 === t || -1 === t || 32 === t
                      ? (e.enter("whitespace"), e.consume(t), b)
                      : 124 === t
                        ? (e.enter("tableCellDivider"),
                          e.consume(t),
                          e.exit("tableCellDivider"),
                          g)
                        : r(t);
                }
                function k(t) {
                  return (e.exit("tableDelimiterRow"), s && c === l.length)
                    ? null === t
                      ? w(t)
                      : e.check(o, w, _)(t)
                    : r(t);
                }
                function w(r) {
                  return (e.exit("table"), t(r));
                }
                function _(t) {
                  return (
                    e.enter("lineEnding"),
                    e.consume(t),
                    e.exit("lineEnding"),
                    n(e, A, "linePrefix", 4)
                  );
                }
                function A(t) {
                  return (e.enter("tableBody"), C(t));
                }
                function C(t) {
                  return (e.enter("tableRow"), 124 === t)
                    ? E(t)
                    : (e.enter("temporaryTableCellContent"), S(t));
                }
                function E(t) {
                  return (
                    e.enter("tableCellDivider"),
                    e.consume(t),
                    e.exit("tableCellDivider"),
                    j
                  );
                }
                function j(t) {
                  return null === t || -5 === t || -4 === t || -3 === t
                    ? (e.exit("tableRow"), null === t)
                      ? F(t)
                      : e.check(o, F, T)(t)
                    : -2 === t || -1 === t || 32 === t
                      ? (e.enter("whitespace"), e.consume(t), I)
                      : 124 === t
                        ? E(t)
                        : (e.enter("temporaryTableCellContent"), S(t));
                }
                function I(t) {
                  return -2 === t || -1 === t || 32 === t
                    ? (e.consume(t), I)
                    : (e.exit("whitespace"), j(t));
                }
                function S(t) {
                  return null === t || t < 0 || 32 === t || 124 === t
                    ? (e.exit("temporaryTableCellContent"), j(t))
                    : (e.consume(t), 92 === t ? D : S);
                }
                function D(t) {
                  return 92 === t || 124 === t ? (e.consume(t), S) : S(t);
                }
                function F(t) {
                  return (e.exit("tableBody"), w(t));
                }
                function T(t) {
                  return (
                    e.enter("lineEnding"),
                    e.consume(t),
                    e.exit("lineEnding"),
                    n(e, C, "linePrefix", 4)
                  );
                }
              },
              resolve: function (e, t) {
                for (
                  var r, n, a, o, i, s, l, c, u, p, d = e.length, f = -1;
                  ++f < d;
                )
                  ((r = e[f][1]),
                    o &&
                      ("temporaryTableCellContent" === r.type &&
                        ((c = c || f), (u = f)),
                      ("tableCellDivider" === r.type ||
                        "tableRow" === r.type) &&
                        u &&
                        ((l = {
                          type: "chunkText",
                          start: (s = {
                            type: "tableContent",
                            start: e[c][1].start,
                            end: e[u][1].end,
                          }).start,
                          end: s.end,
                          contentType: "text",
                        }),
                        e.splice(
                          c,
                          u - c + 1,
                          ["enter", s, t],
                          ["enter", l, t],
                          ["exit", l, t],
                          ["exit", s, t],
                        ),
                        (f -= u - c - 3),
                        (d = e.length),
                        (c = void 0),
                        (u = void 0))),
                    "exit" === e[f][0] &&
                      p &&
                      p + 1 < f &&
                      ("tableCellDivider" === r.type ||
                        ("tableRow" === r.type &&
                          (p + 3 < f || "whitespace" !== e[p][1].type))) &&
                      ((i = {
                        type: a
                          ? "tableDelimiter"
                          : n
                            ? "tableHeader"
                            : "tableData",
                        start: e[p][1].start,
                        end: e[f][1].end,
                      }),
                      e.splice(f + ("tableCellDivider" === r.type ? 1 : 0), 0, [
                        "exit",
                        i,
                        t,
                      ]),
                      e.splice(p, 0, ["enter", i, t]),
                      (f += 2),
                      (d = e.length),
                      (p = f + 1)),
                    "tableRow" === r.type &&
                      (o = "enter" === e[f][0]) &&
                      (p = f + 1),
                    "tableDelimiterRow" === r.type &&
                      (a = "enter" === e[f][0]) &&
                      (p = f + 1),
                    "tableHead" === r.type && (n = "enter" === e[f][0]));
                return e;
              },
              interruptible: !0,
            },
          };
          var n = e("885ae48a40bedea6"),
            a = {
              tokenize: function (e, t, r) {
                return function (n) {
                  return 45 !== n
                    ? r(n)
                    : (e.enter("setextUnderline"),
                      (function n(a) {
                        return 45 === a
                          ? (e.consume(a), n)
                          : (function n(a) {
                              return -2 === a || -1 === a || 32 === a
                                ? (e.consume(a), n)
                                : null === a || -5 === a || -4 === a || -3 === a
                                  ? t(a)
                                  : r(a);
                            })(a);
                      })(n));
                };
              },
              partial: !0,
            },
            o = {
              tokenize: function (e, t, r) {
                var n = 0;
                return function (t) {
                  return (e.enter("check"), e.consume(t), a);
                };
                function a(o) {
                  return -1 === o || 32 === o
                    ? (e.consume(o), 4 == ++n ? t : a)
                    : null === o || o < 0
                      ? t(o)
                      : r(o);
                }
              },
              partial: !0,
            };
        },
        { "885ae48a40bedea6": "j0hN2" },
      ],
      dZ23p: [
        function (e, t, r) {
          t.exports = e("2e9985bb164d4f5d");
        },
        { "2e9985bb164d4f5d": "2ztCA" },
      ],
      "2ztCA": [
        function (e, t, r) {
          var n = e("a41ee70057a9cc1d"),
            a = e("4384bede89f79f03"),
            o = e("c5526b4252a1e717");
          function i(e, t, r) {
            var i = this;
            return a(
              e,
              function (e) {
                return o(i.events, "whitespace") && null !== e && !n(e)
                  ? t(e)
                  : r(e);
              },
              "whitespace",
            );
          }
          r.text = {
            91: {
              tokenize: function (e, t, r) {
                var n = this;
                return function (t) {
                  return 91 === t &&
                    null === n.previous &&
                    n._gfmTasklistFirstContentOfListItem
                    ? (e.enter("taskListCheck"),
                      e.enter("taskListCheckMarker"),
                      e.consume(t),
                      e.exit("taskListCheckMarker"),
                      a)
                    : r(t);
                };
                function a(t) {
                  return -2 === t || 32 === t
                    ? (e.enter("taskListCheckValueUnchecked"),
                      e.consume(t),
                      e.exit("taskListCheckValueUnchecked"),
                      o)
                    : 88 === t || 120 === t
                      ? (e.enter("taskListCheckValueChecked"),
                        e.consume(t),
                        e.exit("taskListCheckValueChecked"),
                        o)
                      : r(t);
                }
                function o(n) {
                  return 93 === n
                    ? (e.enter("taskListCheckMarker"),
                      e.consume(n),
                      e.exit("taskListCheckMarker"),
                      e.exit("taskListCheck"),
                      e.check({ tokenize: i }, t, r))
                    : r(n);
                }
              },
            },
          };
        },
        {
          a41ee70057a9cc1d: "5jCAX",
          "4384bede89f79f03": "j0hN2",
          c5526b4252a1e717: "hRwvs",
        },
      ],
      "6b8sO": [
        function (e, t, r) {
          var n = e("4cc5cfa2c2d5903d"),
            a = e("a30587d2d0788766"),
            o = e("c536b65a8758a633"),
            i = e("b5effcf8f46ea626"),
            s = {}.hasOwnProperty;
          t.exports = (function (e) {
            for (
              var t = { transforms: [], canContainEols: [] },
                r = e.length,
                n = -1;
              ++n < r;
            )
              (function (e, t) {
                var r, n, a;
                for (r in t)
                  ((n = s.call(e, r) ? e[r] : (e[r] = {})),
                    (a = t[r]),
                    "canContainEols" === r || "transforms" === r
                      ? (e[r] = [].concat(n, a))
                      : Object.assign(n, a));
              })(t, e[n]);
            return t;
          })([n, a, o, i]);
        },
        {
          "4cc5cfa2c2d5903d": "fehwV",
          a30587d2d0788766: "foXSG",
          c536b65a8758a633: "cCoro",
          b5effcf8f46ea626: "gIBVW",
        },
      ],
      fehwV: [
        function (e, t, r) {
          var n = e("6004e66584c52e66"),
            a = e("e86fc588a5d284f2"),
            o = e("3978f6a43124a078"),
            i = e("2eb0ef53c046cdf8");
          function s(e) {
            this.config.enter.autolinkProtocol.call(this, e);
          }
          function l(e, t, r, a, o) {
            var i,
              s,
              l,
              c = "";
            return (
              !!u(o) &&
              (/^w/i.test(t) && ((r = t + r), (t = ""), (c = "http://")),
              !(
                (i = r.split(".")).length < 2 ||
                (i[i.length - 1] &&
                  (/_/.test(i[i.length - 1]) ||
                    !/[a-zA-Z\d]/.test(i[i.length - 1]))) ||
                (i[i.length - 2] &&
                  (/_/.test(i[i.length - 2]) ||
                    !/[a-zA-Z\d]/.test(i[i.length - 2])))
              ) &&
                !!(s = (function (e) {
                  var t,
                    r,
                    a,
                    o = /[!"&'),.:;<>?\]}]+$/.exec(e);
                  if (o)
                    for (
                      e = e.slice(0, o.index),
                        t = (o = o[0]).indexOf(")"),
                        r = n(e, "("),
                        a = n(e, ")");
                      -1 !== t && r > a;
                    )
                      ((e += o.slice(0, t + 1)),
                        (t = (o = o.slice(t + 1)).indexOf(")")),
                        a++);
                  return [e, o];
                })(r + a))[0] &&
                ((l = {
                  type: "link",
                  title: null,
                  url: c + t + s[0],
                  children: [{ type: "text", value: t + s[0] }],
                }),
                s[1] && (l = [l, { type: "text", value: s[1] }]),
                l))
            );
          }
          function c(e, t, r, n) {
            return (
              !(!u(n, !0) || /[_-]$/.test(r)) && {
                type: "link",
                title: null,
                url: "mailto:" + t + "@" + r,
                children: [{ type: "text", value: t + "@" + r }],
              }
            );
          }
          function u(e, t) {
            var r = e.input.charCodeAt(e.index - 1);
            return (r != r || i(r) || o(r)) && (!t || 47 !== r);
          }
          ((r.transforms = [
            function (e) {
              a(
                e,
                [
                  [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/i, l],
                  [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/, c],
                ],
                { ignore: ["link", "linkReference"] },
              );
            },
          ]),
            (r.enter = {
              literalAutolink: function (e) {
                this.enter(
                  { type: "link", title: null, url: "", children: [] },
                  e,
                );
              },
              literalAutolinkEmail: s,
              literalAutolinkHttp: s,
              literalAutolinkWww: s,
            }),
            (r.exit = {
              literalAutolink: function (e) {
                this.exit(e);
              },
              literalAutolinkEmail: function (e) {
                this.config.exit.autolinkEmail.call(this, e);
              },
              literalAutolinkHttp: function (e) {
                this.config.exit.autolinkProtocol.call(this, e);
              },
              literalAutolinkWww: function (e) {
                (this.config.exit.data.call(this, e),
                  (this.stack[this.stack.length - 1].url =
                    "http://" + this.sliceSerialize(e)));
              },
            }));
        },
        {
          "6004e66584c52e66": "hbaad",
          e86fc588a5d284f2: "iRCVx",
          "3978f6a43124a078": "8rLtM",
          "2eb0ef53c046cdf8": "6klFs",
        },
      ],
      hbaad: [
        function (e, t, r) {
          t.exports = function (e, t) {
            var r,
              n = String(e),
              a = 0;
            if ("string" != typeof t) throw Error("Expected character");
            for (r = n.indexOf(t); -1 !== r;)
              (a++, (r = n.indexOf(t, r + t.length)));
            return a;
          };
        },
        {},
      ],
      iRCVx: [
        function (e, t, r) {
          t.exports = function (e, t, r, n) {
            var a, o;
            return (
              "string" == typeof t || (t && "function" == typeof t.exec)
                ? (o = [[t, r]])
                : ((o = t), (n = r)),
              s(
                e,
                (a = n || {}),
                (function e(t) {
                  var r = t[0];
                  return function (n, o) {
                    var l,
                      c,
                      u,
                      p,
                      d = r[0],
                      f = r[1],
                      h = [],
                      m = 0,
                      g = o.children.indexOf(n);
                    for (
                      d.lastIndex = 0, c = d.exec(n.value);
                      c &&
                      ((l = c.index),
                      !1 !==
                        (p = f.apply(
                          null,
                          [].concat(c, { index: c.index, input: c.input }),
                        )) &&
                        (m !== l &&
                          h.push({ type: "text", value: n.value.slice(m, l) }),
                        "string" == typeof p &&
                          p.length > 0 &&
                          (p = { type: "text", value: p }),
                        p && (h = [].concat(h, p)),
                        (m = l + c[0].length)),
                      d.global);
                    )
                      c = d.exec(n.value);
                    if (
                      (void 0 === l
                        ? ((h = [n]), g--)
                        : (m < n.value.length &&
                            h.push({ type: "text", value: n.value.slice(m) }),
                          h.unshift(g, 1),
                          i.apply(o.children, h)),
                      t.length > 1)
                    )
                      for (u = e(t.slice(1)), l = -1; ++l < h.length;)
                        "text" === (n = h[l]).type ? u(n, o) : s(n, a, u);
                    return g + h.length + 1;
                  };
                })(
                  (function (e) {
                    var t,
                      r,
                      n = [];
                    if ("object" != typeof e)
                      throw Error("Expected array or object as schema");
                    if ("length" in e)
                      for (r = -1; ++r < e.length;)
                        n.push([l(e[r][0]), c(e[r][1])]);
                    else for (t in e) n.push([l(t), c(e[t])]);
                    return n;
                  })(o),
                ),
              ),
              e
            );
          };
          var n = e("1e27c916658701f5"),
            a = e("5629aee2b8f5d8df"),
            o = e("d36fb946ee8f9cb"),
            i = [].splice;
          function s(e, t, r) {
            var o = a(t.ignore || []);
            return (
              n(e, "text", function (e, t) {
                for (var n, a, i = -1; ++i < t.length;) {
                  if (o((n = t[i]), a ? a.children.indexOf(n) : void 0, a))
                    return;
                  a = n;
                }
                return r(e, a);
              }),
              []
            );
          }
          function l(e) {
            return "string" == typeof e ? RegExp(o(e), "g") : e;
          }
          function c(e) {
            return "function" == typeof e
              ? e
              : function () {
                  return e;
                };
          }
        },
        {
          "1e27c916658701f5": "aQm79",
          "5629aee2b8f5d8df": "gjD2w",
          d36fb946ee8f9cb: "1ISCS",
        },
      ],
      aQm79: [
        function (e, t, r) {
          t.exports = i;
          var n = e("e48ff70c447a705c"),
            a = e("533ce525daaee8"),
            o = "skip";
          function i(e, t, r, i) {
            var s, l;
            ("function" == typeof t &&
              "function" != typeof r &&
              ((i = r), (r = t), (t = null)),
              (l = n(t)),
              (s = i ? -1 : 1),
              (function e(n, c, u) {
                var p,
                  d = "object" == typeof n && null !== n ? n : {};
                return (
                  "string" == typeof d.type &&
                    ((p =
                      "string" == typeof d.tagName
                        ? d.tagName
                        : "string" == typeof d.name
                          ? d.name
                          : void 0),
                    (f.displayName =
                      "node (" + a(d.type + (p ? "<" + p + ">" : "")) + ")")),
                  f
                );
                function f() {
                  var a,
                    p,
                    d,
                    f = u.concat(n),
                    h = [];
                  if (
                    (!t || l(n, c, u[u.length - 1] || null)) &&
                    !1 ===
                      (h =
                        null !== (a = r(n, u)) &&
                        "object" == typeof a &&
                        "length" in a
                          ? a
                          : "number" == typeof a
                            ? [!0, a]
                            : [a])[0]
                  )
                    return h;
                  if (n.children && h[0] !== o)
                    for (
                      d = (i ? n.children.length : -1) + s;
                      d > -1 && d < n.children.length;
                    ) {
                      if (!1 === (p = e(n.children[d], d, f)())[0]) return p;
                      d = "number" == typeof p[1] ? p[1] : d + s;
                    }
                  return h;
                }
              })(e, null, [])());
          }
          ((i.CONTINUE = !0), (i.SKIP = o), (i.EXIT = !1));
        },
        { e48ff70c447a705c: "gjD2w", "533ce525daaee8": "hLKMG" },
      ],
      gjD2w: [
        function (e, t, r) {
          function n() {
            return !0;
          }
          t.exports = function e(t) {
            if (null == t) return n;
            if ("string" == typeof t)
              return function (e) {
                return !!(e && e.type === t);
              };
            if ("object" == typeof t)
              return "length" in t
                ? (function (t) {
                    for (var r = [], n = -1; ++n < t.length;) r[n] = e(t[n]);
                    return function () {
                      for (var e = -1; ++e < r.length;)
                        if (r[e].apply(this, arguments)) return !0;
                      return !1;
                    };
                  })(t)
                : function (e) {
                    var r;
                    for (r in t) if (e[r] !== t[r]) return !1;
                    return !0;
                  };
            if ("function" == typeof t) return t;
            throw Error("Expected function, string, or object as test");
          };
        },
        {},
      ],
      hLKMG: [
        function (e, t, r) {
          t.exports = function (e) {
            return e;
          };
        },
        {},
      ],
      "1ISCS": [
        function (e, t, r) {
          t.exports = (e) => {
            if ("string" != typeof e) throw TypeError("Expected a string");
            return e
              .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
              .replace(/-/g, "\\x2d");
          };
        },
        {},
      ],
      foXSG: [
        function (e, t, r) {
          ((r.canContainEols = ["delete"]),
            (r.enter = {
              strikethrough: function (e) {
                this.enter({ type: "delete", children: [] }, e);
              },
            }),
            (r.exit = {
              strikethrough: function (e) {
                this.exit(e);
              },
            }));
        },
        {},
      ],
      cCoro: [
        function (e, t, r) {
          function n(e) {
            this.exit(e);
          }
          function a(e) {
            this.enter({ type: "tableCell", children: [] }, e);
          }
          function o(e, t) {
            return "|" === t ? t : e;
          }
          ((r.enter = {
            table: function (e) {
              (this.enter({ type: "table", align: e._align, children: [] }, e),
                this.setData("inTable", !0));
            },
            tableData: a,
            tableHeader: a,
            tableRow: function (e) {
              this.enter({ type: "tableRow", children: [] }, e);
            },
          }),
            (r.exit = {
              codeText: function (e) {
                var t = this.resume();
                (this.getData("inTable") && (t = t.replace(/\\([\\|])/g, o)),
                  (this.stack[this.stack.length - 1].value = t),
                  this.exit(e));
              },
              table: function (e) {
                (this.exit(e), this.setData("inTable"));
              },
              tableData: n,
              tableHeader: n,
              tableRow: n,
            }));
        },
        {},
      ],
      gIBVW: [
        function (e, t, r) {
          function n(e) {
            this.stack[this.stack.length - 2].checked =
              "taskListCheckValueChecked" === e.type;
          }
          r.exit = {
            taskListCheckValueChecked: n,
            taskListCheckValueUnchecked: n,
            paragraph: function (e) {
              var t,
                r = this.stack[this.stack.length - 2],
                n = this.stack[this.stack.length - 1],
                a = r.children,
                o = n.children[0],
                i = -1;
              if (
                r &&
                "listItem" === r.type &&
                "boolean" == typeof r.checked &&
                o &&
                "text" === o.type
              ) {
                for (; ++i < a.length;)
                  if ("paragraph" === a[i].type) {
                    t = a[i];
                    break;
                  }
                t === n &&
                  ((o.value = o.value.slice(1)),
                  0 === o.value.length
                    ? n.children.shift()
                    : (o.position.start.column++,
                      o.position.start.offset++,
                      (n.position.start = Object.assign(
                        {},
                        o.position.start,
                      ))));
              }
              this.exit(e);
            },
          };
        },
        {},
      ],
      jaeNt: [
        function (e, t, r) {
          var n = e("29f3a882c79333"),
            a = e("cc95a149e2757eb6"),
            o = e("b73c7def919be663"),
            i = e("a48c8fe60965fdfb"),
            s = e("ee00304643b2088d");
          t.exports = function (e) {
            var t = s(
              { handlers: {}, join: [], unsafe: [], options: {} },
              { extensions: [n, a, o(e), i] },
            );
            return Object.assign(t.options, {
              handlers: t.handlers,
              join: t.join,
              unsafe: t.unsafe,
            });
          };
        },
        {
          "29f3a882c79333": "kIldv",
          cc95a149e2757eb6: "at9FU",
          b73c7def919be663: "dgzhD",
          a48c8fe60965fdfb: "jWJCn",
          ee00304643b2088d: "frPr0",
        },
      ],
      kIldv: [
        function (e, t, r) {
          var n = "phrasing",
            a = ["autolink", "link", "image", "label"];
          r.unsafe = [
            {
              character: "@",
              before: "[+\\-.\\w]",
              after: "[\\-.\\w]",
              inConstruct: n,
              notInConstruct: a,
            },
            {
              character: ".",
              before: "[Ww]",
              after: "[\\-.\\w]",
              inConstruct: n,
              notInConstruct: a,
            },
            {
              character: ":",
              before: "[ps]",
              after: "\\/",
              inConstruct: n,
              notInConstruct: a,
            },
          ];
        },
        {},
      ],
      at9FU: [
        function (e, t, r) {
          var n = e("7b0c6fbe28d35570");
          function a(e, t, r) {
            var a = r.enter("emphasis"),
              o = n(e, r, { before: "~", after: "~" });
            return (a(), "~~" + o + "~~");
          }
          ((r.unsafe = [{ character: "~", inConstruct: "phrasing" }]),
            (r.handlers = { delete: a }),
            (a.peek = function () {
              return "~";
            }));
        },
        { "7b0c6fbe28d35570": "iHzlW" },
      ],
      iHzlW: [
        function (e, t, r) {
          t.exports = function (e, t, r) {
            for (
              var n, a, o, i = e.children || [], s = [], l = -1, c = r.before;
              ++l < i.length;
            )
              ((o = i[l]),
                l + 1 < i.length
                  ? ((a = t.handle.handlers[i[l + 1].type]) &&
                      a.peek &&
                      (a = a.peek),
                    (n = a
                      ? a(i[l + 1], e, t, { before: "", after: "" }).charAt(0)
                      : ""))
                  : (n = r.after),
                s.length > 0 &&
                  ("\r" === c || "\n" === c) &&
                  "html" === o.type &&
                  ((s[s.length - 1] = s[s.length - 1].replace(
                    /(\r?\n|\r)$/,
                    " ",
                  )),
                  (c = " ")),
                s.push(t.handle(o, e, t, { before: c, after: n })),
                (c = s[s.length - 1].slice(-1)));
            return s.join("");
          };
        },
        {},
      ],
      dgzhD: [
        function (e, t, r) {
          var n = e("48fb97216feb4669"),
            a = e("c7927c123fdcb0e5"),
            o = e("be57f8d4869eb6b4");
          t.exports = function (e) {
            var t = e || {},
              r = t.tableCellPadding,
              i = t.tablePipeAlign,
              s = t.stringLength,
              l = r ? " " : "|";
            return {
              unsafe: [
                { character: "\r", inConstruct: "tableCell" },
                { character: "\n", inConstruct: "tableCell" },
                { atBreak: !0, character: "|", after: "[	 :-]" },
                { character: "|", inConstruct: "tableCell" },
                { atBreak: !0, character: ":", after: "-" },
                { atBreak: !0, character: "-", after: "[:|-]" },
              ],
              handlers: {
                table: function (e, t, r) {
                  return u(
                    (function (e, t) {
                      for (
                        var r = e.children,
                          n = -1,
                          a = r.length,
                          o = [],
                          i = t.enter("table");
                        ++n < a;
                      )
                        o[n] = p(r[n], t);
                      return (i(), o);
                    })(e, r),
                    e.align,
                  );
                },
                tableRow: function (e, t, r) {
                  var n = u([p(e, r)]);
                  return n.slice(0, n.indexOf("\n"));
                },
                tableCell: c,
                inlineCode: function (e, t, r) {
                  var n = a(e, t, r);
                  return (
                    -1 !== r.stack.indexOf("tableCell") &&
                      (n = n.replace(/\|/g, "\\$&")),
                    n
                  );
                },
              },
            };
            function c(e, t, r) {
              var a = r.enter("tableCell"),
                o = n(e, r, { before: l, after: l });
              return (a(), o);
            }
            function u(e, t) {
              return o(e, {
                align: t,
                alignDelimiters: i,
                padding: r,
                stringLength: s,
              });
            }
            function p(e, t) {
              for (
                var r = e.children,
                  n = -1,
                  a = r.length,
                  o = [],
                  i = t.enter("tableRow");
                ++n < a;
              )
                o[n] = c(r[n], e, t);
              return (i(), o);
            }
          };
        },
        {
          "48fb97216feb4669": "iHzlW",
          c7927c123fdcb0e5: "6axXB",
          be57f8d4869eb6b4: "7WNDP",
        },
      ],
      "6axXB": [
        function (e, t, r) {
          ((t.exports = a),
            (a.peek = function () {
              return "`";
            }));
          var n = e("c186dbe1755760b0");
          function a(e, t, r) {
            for (
              var a, o, i, s, l = e.value || "", c = "`", u = -1;
              RegExp("(^|[^`])" + c + "([^`]|$)").test(l);
            )
              c += "`";
            for (
              /[^ \r\n]/.test(l) &&
              (/[ \r\n`]/.test(l.charAt(0)) ||
                /[ \r\n`]/.test(l.charAt(l.length - 1))) &&
              (l = " " + l + " ");
              ++u < r.unsafe.length;
            )
              if ((a = r.unsafe[u]).atBreak)
                for (o = n(a); (i = o.exec(l));)
                  ((s = i.index),
                    10 === l.charCodeAt(s) && 13 === l.charCodeAt(s - 1) && s--,
                    (l = l.slice(0, s) + " " + l.slice(i.index + 1)));
            return c + l + c;
          }
        },
        { c186dbe1755760b0: "ipGFC" },
      ],
      ipGFC: [
        function (e, t, r) {
          t.exports = function (e) {
            var t, r;
            return (
              e._compiled ||
                ((t = e.before ? "(?:" + e.before + ")" : ""),
                (r = e.after ? "(?:" + e.after + ")" : ""),
                e.atBreak && (t = "[\\r\\n][\\t ]*" + t),
                (e._compiled = RegExp(
                  (t ? "(" + t + ")" : "") +
                    (/[|\\{}()[\]^$+*?.-]/.test(e.character) ? "\\" : "") +
                    e.character +
                    (r || ""),
                  "g",
                ))),
              e._compiled
            );
          };
        },
        {},
      ],
      "7WNDP": [
        function (e, t, r) {
          var n = e("a85cae37137c013a");
          t.exports = function (e, t) {
            for (
              var r,
                s,
                l,
                c,
                u,
                p,
                d,
                f,
                h,
                m,
                g,
                b,
                x = t || {},
                y = !1 !== x.padding,
                v = !1 !== x.delimiterStart,
                k = !1 !== x.delimiterEnd,
                w = (x.align || []).concat(),
                _ = !1 !== x.alignDelimiters,
                A = [],
                C = x.stringLength || o,
                E = -1,
                j = e.length,
                I = [],
                S = [],
                D = [],
                F = [],
                T = [],
                R = 0;
              ++E < j;
            ) {
              for (
                s = e[E],
                  l = -1,
                  c = s.length,
                  D = [],
                  F = [],
                  c > R && (R = c);
                ++l < c;
              )
                ((d = null == (r = s[l]) ? "" : String(r)),
                  !0 === _ &&
                    ((p = C(d)),
                    (F[l] = p),
                    (void 0 === (u = T[l]) || p > u) && (T[l] = p)),
                  D.push(d));
              ((I[E] = D), (S[E] = F));
            }
            if (((l = -1), (c = R), "object" == typeof w && "length" in w))
              for (; ++l < c;) A[l] = i(w[l]);
            else for (b = i(w); ++l < c;) A[l] = b;
            for (l = -1, c = R, D = [], F = []; ++l < c;)
              ((b = A[l]),
                (m = ""),
                (g = ""),
                108 === b
                  ? (m = ":")
                  : 114 === b
                    ? (g = ":")
                    : 99 === b && ((m = ":"), (g = ":")),
                (p = _ ? Math.max(1, T[l] - m.length - g.length) : 1),
                (d = m + n("-", p) + g),
                !0 === _ &&
                  ((p = m.length + p + g.length) > T[l] && (T[l] = p),
                  (F[l] = p)),
                (D[l] = d));
            for (
              I.splice(1, 0, D),
                S.splice(1, 0, F),
                E = -1,
                j = I.length,
                f = [];
              ++E < j;
            ) {
              for (D = I[E], F = S[E], l = -1, c = R, h = []; ++l < c;)
                ((d = D[l] || ""),
                  (m = ""),
                  (g = ""),
                  !0 === _ &&
                    ((p = T[l] - (F[l] || 0)),
                    114 === (b = A[l])
                      ? (m = n(" ", p))
                      : 99 === b
                        ? p % 2 == 0
                          ? (g = m = n(" ", p / 2))
                          : ((m = n(" ", p / 2 + 0.5)),
                            (g = n(" ", p / 2 - 0.5)))
                        : (g = n(" ", p))),
                  !0 === v && 0 === l && h.push("|"),
                  !0 !== y ||
                    (!1 === _ && "" === d) ||
                    (!0 !== v && 0 === l) ||
                    h.push(" "),
                  !0 === _ && h.push(m),
                  h.push(d),
                  !0 === _ && h.push(g),
                  !0 === y && h.push(" "),
                  (!0 === k || l !== c - 1) && h.push("|"));
              ((h = h.join("")), !1 === k && (h = h.replace(a, "")), f.push(h));
            }
            return f.join("\n");
          };
          var a = / +$/;
          function o(e) {
            return e.length;
          }
          function i(e) {
            var t = "string" == typeof e ? e.charCodeAt(0) : 0;
            return 76 === t || 108 === t
              ? 108
              : 82 === t || 114 === t
                ? 114
                : 67 === t || 99 === t
                  ? 99
                  : 0;
          }
        },
        { a85cae37137c013a: "9X1e9" },
      ],
      "9X1e9": [
        function (e, t, r) {
          var n,
            a = "";
          t.exports = function (e, t) {
            if ("string" != typeof e) throw TypeError("expected a string");
            if (1 === t) return e;
            if (2 === t) return e + e;
            var r = e.length * t;
            if (n !== e || void 0 === n) ((n = e), (a = ""));
            else if (a.length >= r) return a.substr(0, r);
            for (; r > a.length && t > 1;)
              (1 & t && (a += e), (t >>= 1), (e += e));
            return ((a += e), (a = a.substr(0, r)));
          };
        },
        {},
      ],
      jWJCn: [
        function (e, t, r) {
          var n = e("b3e74201a942ab4c");
          ((r.unsafe = [{ atBreak: !0, character: "-", after: "[:|-]" }]),
            (r.handlers = {
              listItem: function (e, t, r) {
                var a = n(e, t, r),
                  o = e.children[0];
                return (
                  "boolean" == typeof e.checked &&
                    o &&
                    "paragraph" === o.type &&
                    (a = a.replace(
                      /^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,
                      function (t) {
                        return t + "[" + (e.checked ? "x" : " ") + "] ";
                      },
                    )),
                  a
                );
              },
            }));
        },
        { b3e74201a942ab4c: "b1uYP" },
      ],
      b1uYP: [
        function (e, t, r) {
          t.exports = function (e, t, r) {
            var l,
              c,
              u,
              p = a(r),
              d = o(r);
            return (
              t &&
                t.ordered &&
                (p =
                  (t.start > -1 ? t.start : 1) +
                  (!1 === r.options.incrementListMarker
                    ? 0
                    : t.children.indexOf(e)) +
                  "."),
              (l = p.length + 1),
              ("tab" === d ||
                ("mixed" === d && ((t && t.spread) || e.spread))) &&
                (l = 4 * Math.ceil(l / 4)),
              (u = r.enter("listItem")),
              (c = s(i(e, r), function (e, t, r) {
                return t
                  ? (r ? "" : n(" ", l)) + e
                  : (r ? p : p + n(" ", l - p.length)) + e;
              })),
              u(),
              c
            );
          };
          var n = e("6ae127df5d47d747"),
            a = e("161e804fa5abcbc3"),
            o = e("c9c4eef1f3f80253"),
            i = e("55de49c8654ab445"),
            s = e("c797147e3906a805");
        },
        {
          "6ae127df5d47d747": "9X1e9",
          "161e804fa5abcbc3": "ptlXD",
          c9c4eef1f3f80253: "wrqFe",
          "55de49c8654ab445": "eqUwt",
          c797147e3906a805: "1S8be",
        },
      ],
      ptlXD: [
        function (e, t, r) {
          t.exports = function (e) {
            var t = e.options.bullet || "*";
            if ("*" !== t && "+" !== t && "-" !== t)
              throw Error(
                "Cannot serialize items with `" +
                  t +
                  "` for `options.bullet`, expected `*`, `+`, or `-`",
              );
            return t;
          };
        },
        {},
      ],
      wrqFe: [
        function (e, t, r) {
          t.exports = function (e) {
            var t = e.options.listItemIndent || "tab";
            if (1 === t || "1" === t) return "one";
            if ("tab" !== t && "one" !== t && "mixed" !== t)
              throw Error(
                "Cannot serialize items with `" +
                  t +
                  "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`",
              );
            return t;
          };
        },
        {},
      ],
      eqUwt: [
        function (e, t, r) {
          t.exports = function (e, t) {
            for (var r, a = e.children || [], o = [], i = -1; ++i < a.length;)
              ((r = a[i]),
                o.push(t.handle(r, e, t, { before: "\n", after: "\n" })),
                i + 1 < a.length &&
                  o.push(
                    (function (r, a) {
                      for (
                        var o, i = -1;
                        ++i < t.join.length &&
                        !0 !== (o = t.join[i](r, a, e, t)) &&
                        1 !== o;
                      ) {
                        if ("number" == typeof o) return n("\n", 1 + Number(o));
                        if (!1 === o) return "\n\n<!---->\n\n";
                      }
                      return "\n\n";
                    })(r, a[i + 1]),
                  ));
            return o.join("");
          };
          var n = e("693ef43f92560f79");
        },
        { "693ef43f92560f79": "9X1e9" },
      ],
      "1S8be": [
        function (e, t, r) {
          t.exports = function (e, t) {
            for (var r, a = [], o = 0, i = 0; (r = n.exec(e));)
              (s(e.slice(o, r.index)),
                a.push(r[0]),
                (o = r.index + r[0].length),
                i++);
            return (s(e.slice(o)), a.join(""));
            function s(e) {
              a.push(t(e, i, !e));
            }
          };
          var n = /\r?\n|\r/g;
        },
        {},
      ],
      frPr0: [
        function (e, t, r) {
          t.exports = function e(t, r) {
            var n,
              a = -1;
            if (r.extensions)
              for (; ++a < r.extensions.length;) e(t, r.extensions[a]);
            for (n in r)
              "extensions" === n ||
                ("unsafe" === n || "join" === n
                  ? (t[n] = t[n].concat(r[n] || []))
                  : "handlers" === n
                    ? (t[n] = Object.assign(t[n], r[n] || {}))
                    : (t.options[n] = r[n]));
            return t;
          };
        },
        {},
      ],
      "390lO": [
        function (e, t, r) {
          var n,
            a = e("e6b753639458cfbc"),
            o = e("426a94a2c691ac55"),
            i = e("819e9318c149f2b");
          t.exports = function () {
            var e = this.data();
            function t(t, r) {
              e[t] ? e[t].push(r) : (e[t] = [r]);
            }
            (!n &&
              ((this.Parser &&
                this.Parser.prototype &&
                this.Parser.prototype.blockTokenizers) ||
                (this.Compiler &&
                  this.Compiler.prototype &&
                  this.Compiler.prototype.visitors)) &&
              ((n = !0),
              console.warn(
                "[remark-math] Warning: please upgrade to remark 13 to use this plugin",
              )),
              t("micromarkExtensions", a),
              t("fromMarkdownExtensions", o),
              t("toMarkdownExtensions", i));
          };
        },
        {
          e6b753639458cfbc: "h5N6Z",
          "426a94a2c691ac55": "hsdUo",
          "819e9318c149f2b": "k8fpX",
        },
      ],
      h5N6Z: [
        function (e, t, r) {
          t.exports = e("ceaeebf42e3050a5");
        },
        { ceaeebf42e3050a5: "a1QLR" },
      ],
      a1QLR: [
        function (e, t, r) {
          ((r.flow = { 36: e("12201739d581fb2b") }),
            (r.text = { 36: e("2f4e4d22561a8a54") }));
        },
        { "12201739d581fb2b": "jaJt5", "2f4e4d22561a8a54": "kdnYj" },
      ],
      jaJt5: [
        function (e, t, r) {
          ((r.tokenize = function (e, t, r) {
            var o = this,
              i = n(this.events, "linePrefix"),
              s = 0;
            return function (t) {
              if (36 !== t) throw Error("expected `$`");
              return (
                e.enter("mathFlow"),
                e.enter("mathFlowFence"),
                e.enter("mathFlowFenceSequence"),
                (function t(n) {
                  return 36 === n
                    ? (e.consume(n), s++, t)
                    : (e.exit("mathFlowFenceSequence"),
                      s < 2 ? r(n) : a(e, l, "whitespace")(n));
                })(t)
              );
            };
            function l(t) {
              return null === t || -5 === t || -4 === t || -3 === t
                ? c(t)
                : (e.enter("mathFlowFenceMeta"),
                  e.enter("chunkString", { contentType: "string" }),
                  (function t(n) {
                    return null === n || -5 === n || -4 === n || -3 === n
                      ? (e.exit("chunkString"),
                        e.exit("mathFlowFenceMeta"),
                        c(n))
                      : 36 === n
                        ? r(n)
                        : (e.consume(n), t);
                  })(t));
            }
            function c(r) {
              return (
                e.exit("mathFlowFence"),
                o.interrupt
                  ? t(r)
                  : (function t(r) {
                      return null === r
                        ? u(r)
                        : -5 === r || -4 === r || -3 === r
                          ? (e.enter("lineEnding"),
                            e.consume(r),
                            e.exit("lineEnding"),
                            e.attempt(
                              { tokenize: p, partial: !0 },
                              u,
                              i ? a(e, t, "linePrefix", i + 1) : t,
                            ))
                          : (e.enter("mathFlowValue"),
                            (function r(n) {
                              return null === n ||
                                -5 === n ||
                                -4 === n ||
                                -3 === n
                                ? (e.exit("mathFlowValue"), t(n))
                                : (e.consume(n), r);
                            })(r));
                    })(r)
              );
            }
            function u(r) {
              return (e.exit("mathFlow"), t(r));
            }
            function p(e, t, r) {
              var n = 0;
              return a(
                e,
                function (t) {
                  return (
                    e.enter("mathFlowFence"),
                    e.enter("mathFlowFenceSequence"),
                    (function t(i) {
                      return 36 === i
                        ? (e.consume(i), n++, t)
                        : n < s
                          ? r(i)
                          : (e.exit("mathFlowFenceSequence"),
                            a(e, o, "whitespace")(i));
                    })(t)
                  );
                },
                "linePrefix",
                4,
              );
              function o(n) {
                return null === n || -5 === n || -4 === n || -3 === n
                  ? (e.exit("mathFlowFence"), t(n))
                  : r(n);
              }
            }
          }),
            (r.concrete = !0));
          var n = e("fdae8ae8ad663384"),
            a = e("4f8ada21b3a45f57");
        },
        { fdae8ae8ad663384: "hRwvs", "4f8ada21b3a45f57": "j0hN2" },
      ],
      kdnYj: [
        function (e, t, r) {
          ((r.tokenize = function (e, t, r) {
            var a,
              o,
              i = this,
              s = 0;
            return function (t) {
              if (36 !== t) throw Error("expected `$`");
              if (!n.call(i, i.previous))
                throw Error("expected correct previous");
              return (
                e.enter("mathText"),
                e.enter("mathTextSequence"),
                (function t(r) {
                  return 36 === r
                    ? (e.consume(r), s++, t)
                    : (e.exit("mathTextSequence"), l(r));
                })(t)
              );
            };
            function l(n) {
              return null === n
                ? r(n)
                : 36 === n
                  ? ((o = e.enter("mathTextSequence")),
                    (a = 0),
                    (function r(n) {
                      return 36 === n
                        ? (e.consume(n), a++, r)
                        : a === s
                          ? (e.exit("mathTextSequence"),
                            e.exit("mathText"),
                            t(n))
                          : ((o.type = "mathTextData"), c(n));
                    })(n))
                  : 32 === n
                    ? (e.enter("space"), e.consume(n), e.exit("space"), l)
                    : -5 === n || -4 === n || -3 === n
                      ? (e.enter("lineEnding"),
                        e.consume(n),
                        e.exit("lineEnding"),
                        l)
                      : (e.enter("mathTextData"), c(n));
            }
            function c(t) {
              return null === t ||
                32 === t ||
                36 === t ||
                -5 === t ||
                -4 === t ||
                -3 === t
                ? (e.exit("mathTextData"), l(t))
                : (e.consume(t), c);
            }
          }),
            (r.resolve = function (e) {
              var t,
                r,
                n = e.length - 4,
                a = 3;
              if (
                ("lineEnding" === e[3][1].type || "space" === e[a][1].type) &&
                ("lineEnding" === e[n][1].type || "space" === e[n][1].type)
              ) {
                for (t = a; ++t < n;)
                  if ("mathTextData" === e[t][1].type) {
                    ((e[n][1].type = "mathTextPadding"),
                      (e[a][1].type = "mathTextPadding"),
                      (a += 2),
                      (n -= 2));
                    break;
                  }
              }
              for (t = a - 1, n++; ++t <= n;)
                void 0 === r
                  ? t !== n && "lineEnding" !== e[t][1].type && (r = t)
                  : (t === n || "lineEnding" === e[t][1].type) &&
                    ((e[r][1].type = "mathTextData"),
                    t !== r + 2 &&
                      ((e[r][1].end = e[t - 1][1].end),
                      e.splice(r + 2, t - r - 2),
                      (n -= t - r - 2),
                      (t = r + 2)),
                    (r = void 0));
              return e;
            }),
            (r.previous = n));
          function n(e) {
            return (
              36 !== e ||
              "characterEscape" === this.events[this.events.length - 1][1].type
            );
          }
        },
        {},
      ],
      hsdUo: [
        function (e, t, r) {
          ((r.enter = {
            mathFlow: function (e) {
              this.enter(
                {
                  type: "math",
                  meta: null,
                  value: "",
                  data: {
                    hName: "div",
                    hProperties: { className: ["math", "math-display"] },
                    hChildren: [{ type: "text", value: "" }],
                  },
                },
                e,
              );
            },
            mathFlowFenceMeta: function () {
              this.buffer();
            },
            mathText: function (e) {
              (this.enter(
                {
                  type: "inlineMath",
                  value: "",
                  data: {
                    hName: "span",
                    hProperties: { className: ["math", "math-inline"] },
                    hChildren: [{ type: "text", value: "" }],
                  },
                },
                e,
              ),
                this.buffer());
            },
          }),
            (r.exit = {
              mathFlow: function (e) {
                var t = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""),
                  r = this.exit(e);
                ((r.value = t),
                  (r.data.hChildren[0].value = t),
                  this.setData("mathFlowInside"));
              },
              mathFlowFence: function () {
                this.getData("mathFlowInside") ||
                  (this.buffer(), this.setData("mathFlowInside", !0));
              },
              mathFlowFenceMeta: function () {
                var e = this.resume();
                this.stack[this.stack.length - 1].meta = e;
              },
              mathFlowValue: n,
              mathText: function (e) {
                var t = this.resume(),
                  r = this.exit(e);
                ((r.value = t), (r.data.hChildren[0].value = t));
              },
              mathTextData: n,
            }));
          function n(e) {
            (this.config.enter.data.call(this, e),
              this.config.exit.data.call(this, e));
          }
        },
        {},
      ],
      k8fpX: [
        function (e, t, r) {
          ((r.unsafe = [
            { character: "\r", inConstruct: ["mathFlowMeta"] },
            { character: "\r", inConstruct: ["mathFlowMeta"] },
            { character: "$", inConstruct: ["mathFlowMeta", "phrasing"] },
            { atBreak: !0, character: "$", after: "\\$" },
          ]),
            (r.handlers = {
              math: function (e, t, r) {
                var i,
                  s = e.value || "",
                  l = n("$", Math.max(a(s, "$") + 1, 2)),
                  c = r.enter("mathFlow"),
                  u = l;
                return (
                  e.meta &&
                    ((i = r.enter("mathFlowMeta")),
                    (u += o(r, e.meta, {
                      before: "$",
                      after: " ",
                      encode: ["$"],
                    })),
                    i()),
                  (u += "\n"),
                  s && (u += s + "\n"),
                  (u += l),
                  c(),
                  u
                );
              },
              inlineMath: i,
            }),
            (i.peek = function () {
              return "$";
            }));
          var n = e("9929ad38fb19cc5b"),
            a = e("6c65c874bb1cae27"),
            o = e("8d131582110c52c");
          function i(e) {
            for (
              var t, r = e.value || "", a = 1, o = "";
              RegExp("(^|[^$])" + n("\\$", a) + "([^$]|$)").test(r);
            )
              a++;
            return (
              /[^ \r\n]/.test(r) &&
                (/[ \r\n$]/.test(r.charAt(0)) ||
                  /[ \r\n$]/.test(r.charAt(r.length - 1))) &&
                (o = " "),
              (t = n("$", a)) + o + r + o + t
            );
          }
        },
        {
          "9929ad38fb19cc5b": "9X1e9",
          "6c65c874bb1cae27": "a1TSd",
          "8d131582110c52c": "5Qo6W",
        },
      ],
      a1TSd: [
        function (e, t, r) {
          t.exports = function (e, t) {
            var r,
              n,
              a = 0,
              o = 0;
            if ("string" != typeof t || 1 !== t.length)
              throw Error("Expected character");
            for (r = n = (e = String(e)).indexOf(t); -1 !== n;)
              (a++,
                n === r ? a > o && (o = a) : (a = 1),
                (r = n + 1),
                (n = e.indexOf(t, r)));
            return o;
          };
        },
        {},
      ],
      "5Qo6W": [
        function (e, t, r) {
          t.exports = function (e, t, r) {
            for (
              var s,
                l,
                c,
                u,
                p,
                d,
                f,
                h,
                m = (r.before || "") + (t || "") + (r.after || ""),
                g = [],
                b = [],
                x = {},
                y = -1;
              ++y < e.unsafe.length;
            )
              if (((u = e.unsafe[y]), a(e.stack, u)))
                for (p = n(u); (d = p.exec(m));)
                  ((s = "before" in u || u.atBreak),
                    (l = "after" in u),
                    -1 === g.indexOf((c = d.index + (s ? d[1].length : 0)))
                      ? (g.push(c), (x[c] = { before: s, after: l }))
                      : (x[c].before && !s && (x[c].before = !1),
                        x[c].after && !l && (x[c].after = !1)));
            for (
              g.sort(o),
                f = r.before ? r.before.length : 0,
                h = m.length - (r.after ? r.after.length : 0),
                y = -1;
              ++y < g.length;
            )
              !((c = g[y]) < f) &&
                !(c >= h) &&
                (!(c + 1 < h) ||
                  g[y + 1] !== c + 1 ||
                  !x[c].after ||
                  x[c + 1].before ||
                  x[c + 1].after) &&
                (f !== c && b.push(i(m.slice(f, c), "\\")),
                (f = c),
                /[!-/:-@[-`{-~]/.test(m.charAt(c)) &&
                (!r.encode || -1 === r.encode.indexOf(m.charAt(c)))
                  ? b.push("\\")
                  : (b.push(
                      "&#x" + m.charCodeAt(c).toString(16).toUpperCase() + ";",
                    ),
                    f++));
            return (b.push(i(m.slice(f, h), r.after)), b.join(""));
          };
          var n = e("616d041186d1d27f"),
            a = e("2c413d336cb7a71e");
          function o(e, t) {
            return e - t;
          }
          function i(e, t) {
            for (
              var r,
                n = /\\(?=[!-/:-@[-`{-~])/g,
                a = [],
                o = [],
                i = -1,
                s = 0,
                l = e + t;
              (r = n.exec(l));
            )
              a.push(r.index);
            for (; ++i < a.length;)
              (s !== a[i] && o.push(e.slice(s, a[i])),
                o.push("\\"),
                (s = a[i]));
            return (o.push(e.slice(s)), o.join(""));
          }
        },
        { "616d041186d1d27f": "ipGFC", "2c413d336cb7a71e": "fYbp8" },
      ],
      fYbp8: [
        function (e, t, r) {
          t.exports = function (e, t) {
            return n(e, t.inConstruct, !0) && !n(e, t.notInConstruct);
          };
          function n(e, t, r) {
            var n;
            if (!t) return r;
            for ("string" == typeof t && (t = [t]), n = -1; ++n < t.length;)
              if (-1 !== e.indexOf(t[n])) return !0;
            return !1;
          }
        },
        {},
      ],
      "3FDIm": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "loadNotionCredentials", () => s),
            n.export(r, "loadNotionState", () => l),
            n.export(r, "saveNotionState", () => c),
            n.export(r, "clearNotionState", () => u));
          let a = {
              accessToken: "ai-exporter-hub:notion-access-token",
              authenticated: "ai-exporter-hub:notion-authenticated",
              databaseId: "ai-exporter-hub:notion-database-id",
              databaseTitle: "ai-exporter-hub:notion-database-title",
              databases: "ai-exporter-hub:notion-databases",
              lastSyncedAt: "ai-exporter-hub:notion-last-synced-at",
              status: "ai-exporter-hub:notion-status",
              userEmail: "ai-exporter-hub:notion-user-email",
              workspaceId: "ai-exporter-hub:notion-workspace-id",
              workspaceName: "ai-exporter-hub:notion-workspace-name",
            },
            o = {
              accessToken: "access_token",
              authenticated: "authenticated",
              databaseId: "page_id",
              userEmail: "user_notion_email",
              workspaceId: "workspace_id",
              workspaceName: "workspace_name",
            },
            i = (e) =>
              e.length > 10
                ? `${e.slice(0, 6)}...${e.slice(-4)}`
                : "Configured",
            s = async () => {
              let e = await chrome.storage.sync.get([
                ...Object.values(a),
                ...Object.values(o),
              ]);
              return {
                accessToken: e[a.accessToken] ?? e[o.accessToken] ?? "",
                authenticated: !!e[a.authenticated] || !!e[o.authenticated],
                databaseId: e[a.databaseId] ?? e[o.databaseId] ?? "",
                databaseTitle: e[a.databaseTitle] ?? "",
                databases: e[a.databases] ?? [],
                lastSyncedAt: e[a.lastSyncedAt] ?? null,
                status: e[a.status] ?? "disconnected",
                userEmail: e[a.userEmail] ?? e[o.userEmail] ?? "",
                workspaceId: e[a.workspaceId] ?? e[o.workspaceId] ?? "",
                workspaceName: e[a.workspaceName] ?? e[o.workspaceName] ?? "",
              };
            },
            l = async () => {
              let e = await s();
              return {
                accessTokenMasked: e.accessToken ? i(e.accessToken) : "",
                authenticated: e.authenticated,
                databaseId: e.databaseId,
                databaseTitle: e.databaseTitle,
                databases: e.databases,
                error: "",
                hasAccessToken: !!e.accessToken,
                lastSyncedAt: e.lastSyncedAt,
                status: e.accessToken ? e.status : "disconnected",
                userEmail: e.userEmail,
                workspaceName: e.workspaceName,
              };
            },
            c = async ({
              accessToken: e,
              authenticated: t,
              databaseId: r,
              databaseTitle: n,
              databases: i,
              status: s,
              userEmail: c,
              workspaceId: u,
              workspaceName: p,
            }) => {
              let d = new Date().toISOString();
              return (
                await chrome.storage.sync.set({
                  [a.accessToken]: e,
                  [a.authenticated]: t,
                  [a.databaseId]: r,
                  [a.databaseTitle]: n,
                  [a.databases]: i,
                  [a.lastSyncedAt]: d,
                  [a.status]: s,
                  [a.userEmail]: c,
                  [a.workspaceId]: u,
                  [a.workspaceName]: p,
                  [o.accessToken]: e,
                  [o.authenticated]: t,
                  [o.databaseId]: r,
                  [o.userEmail]: c,
                  [o.workspaceId]: u,
                  [o.workspaceName]: p,
                }),
                await l()
              );
            },
            u = async () => {
              await chrome.storage.sync.remove([
                ...Object.values(a),
                ...Object.values(o),
              ]);
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "1EiWD": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "isArtifactContentDuplicateOfMessage", () => c),
            n.export(r, "splitArtifactsByDuplicateMessageContent", () => u));
          let a = (e) =>
              e
                .replace(/```[\s\S]*?```/g, (e) => e.replace(/```/g, " "))
                .replace(/`([^`]+)`/g, "$1")
                .replace(/!\[([^\]]*)]\([^)]+\)/g, "$1")
                .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
                .replace(/<\/?(details|summary|strong)>/gi, " ")
                .replace(/[>#*_~|-]+/g, " "),
            o = (e) =>
              a(e)
                .replace(/\[[0-9,\s]+\]/g, " ")
                .replace(/[^a-zA-Z0-9\s]/g, " ")
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase(),
            i = (e) =>
              o(e)
                .split(" ")
                .map((e) => e.trim())
                .filter(
                  (e) => e.length > 1 && !/^\d+$/.test(e) && "details" !== e,
                ),
            s = (e) => {
              let t = new Map();
              for (let r of e) t.set(r, (t.get(r) ?? 0) + 1);
              return t;
            },
            l = (e, t) => {
              if (!e.length || !t.length) return 0;
              let r = s(e),
                n = s(t),
                a = 0;
              for (let [e, t] of r.entries()) a += Math.min(t, n.get(e) ?? 0);
              return a / Math.max(e.length, t.length);
            },
            c = ({ artifactContent: e, messageContent: t }) => {
              let r = e?.trim() ?? "",
                n = t?.trim() ?? "";
              if (!r || !n) return !1;
              if (r === n) return !0;
              let a = o(r),
                s = o(n);
              if (!a || !s) return !1;
              if (a === s || a.includes(s) || s.includes(a)) return !0;
              if (r.length < 500 || n.length < 500) return !1;
              let c = i(r),
                u = i(n);
              return !(c.length < 80) && !(u.length < 80) && l(c, u) >= 0.9;
            },
            u = ({ artifacts: e, messages: t }) => {
              let r = new Map(t.map((e) => [e.id, e.content]));
              return e.reduce(
                (e, t) => {
                  let n = t.sourceMessageId ? r.get(t.sourceMessageId) : void 0;
                  return (
                    n && c({ artifactContent: t.content, messageContent: n })
                      ? e.duplicateArtifacts.push(t)
                      : e.distinctArtifacts.push(t),
                    e
                  );
                },
                { duplicateArtifacts: [], distinctArtifacts: [] },
              );
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "4IhWv": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "normalizeConversationTitle", () => i),
            n.export(r, "escapeYamlDoubleQuotedString", () => s));
          let a = /[\uE000-\uF8FF]/g,
            o = /[\u0000-\u001F\u007F-\u009F]/g,
            i = (e, t = {}) => {
              let r = t.fallback ?? "Untitled Conversation",
                n = t.maxLength ?? 80,
                i = e
                  .replace(a, " ")
                  .replace(o, " ")
                  .replace(/[\r\n\t]+/g, " ")
                  .replace(/\s+/g, " ")
                  .trim();
              return (i && i.slice(0, n).trim()) || r;
            },
            s = (e) => e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "6LKjR": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "getConversationExportMetadata", () => s),
            n.export(r, "formatLocalMetadataTimestamp", () => l));
          let a = (e, t) => {
              let r = e.metadata[t];
              return "string" == typeof r && r.trim() ? r.trim() : "";
            },
            o = (e, t) => {
              let r = e.metadata[t];
              return "number" == typeof r && Number.isFinite(r) ? r : null;
            },
            i = (e) =>
              Array.from(new Set(e.map((e) => e.trim()).filter((e) => !!e))),
            s = (e) => {
              let t = i(e.summary.tags),
                r = a(e, "sourceId") || a(e, "uuid") || e.summary.id,
                n = a(e, "sourceUrl") || e.summary.url || "";
              return {
                createdAt: a(e, "createdAt") || e.summary.createdAt || "",
                exportedAt: a(e, "exportedAt"),
                messageCount: o(e, "messageCount") ?? e.messages.length,
                mode: a(e, "mode"),
                model: a(e, "model"),
                projectName: a(e, "projectName"),
                sourceId: r,
                sourceUrl: n,
                space: a(e, "space"),
                tags: t,
                updatedAt: a(e, "updatedAt") || e.summary.updatedAt || "",
              };
            },
            l = (e) => {
              if (!e) return "";
              let t = new Date(e);
              if (Number.isNaN(t.getTime())) return "";
              let r = (e) => String(e).padStart(2, "0");
              return `${t.getFullYear()}-${r(t.getMonth() + 1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}:${r(t.getSeconds())}`;
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      leRfU: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "buildCustomExportPreviewKey", () => a),
            n.export(r, "saveCustomExportPreview", () => o),
            n.export(r, "loadCustomExportPreview", () => i));
          let a = (e) => `ai-exporter-hub:custom-export-preview:${e}`,
            o = async ({ conversation: e, platform: t }) => {
              let r = crypto.randomUUID(),
                n = {
                  conversation: e,
                  createdAt: new Date().toISOString(),
                  id: r,
                  platform: t,
                };
              return (await chrome.storage.local.set({ [a(r)]: n }), n);
            },
            i = async (e) => {
              let t = a(e),
                r = await chrome.storage.local.get(t);
              return r[t] ?? null;
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      h6NML: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "exportHistoryKeys", () => o),
            n.export(r, "loadExportHistory", () => i),
            n.export(r, "appendExportRunHistory", () => s),
            n.export(r, "appendExportResultRecord", () => l),
            n.export(r, "clearExportRunHistory", () => c),
            n.export(r, "clearExportFailedRecords", () => u),
            n.export(r, "clearExportSuccessRecords", () => p));
          let a = {
              failedRecords: "ai-exporter-hub:failed-export-records",
              runHistory: "ai-exporter-hub:export-run-history",
              successRecords: "ai-exporter-hub:success-export-records",
            },
            o = a,
            i = async () => {
              let e = await chrome.storage.local.get(Object.values(a));
              return {
                failedRecords: e[a.failedRecords] ?? [],
                runHistory: e[a.runHistory] ?? [],
                successRecords: e[a.successRecords] ?? [],
              };
            },
            s = async (e) => {
              let t = await i(),
                r = [e, ...t.runHistory].slice(0, 50);
              return (await chrome.storage.local.set({ [a.runHistory]: r }), r);
            },
            l = async (e) => {
              let t = await i(),
                r = "failed" === e.type ? a.failedRecords : a.successRecords,
                n = [
                  e,
                  ...("failed" === e.type ? t.failedRecords : t.successRecords),
                ].slice(0, 300);
              return (await chrome.storage.local.set({ [r]: n }), n);
            },
            c = async () => {
              await chrome.storage.local.remove(a.runHistory);
            },
            u = async () => {
              await chrome.storage.local.remove(a.failedRecords);
            },
            p = async () => {
              await chrome.storage.local.remove(a.successRecords);
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "6WwUz": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "exportJobStorageKey", () => o),
            n.export(r, "loadActiveExportJob", () => i),
            n.export(r, "saveActiveExportJob", () => s),
            n.export(r, "clearActiveExportJob", () => l));
          let a = "ai-exporter-hub:active-export-job",
            o = a,
            i = async () => {
              let e = await chrome.storage.local.get(a);
              return e[a] ?? null;
            },
            s = async (e) => (await chrome.storage.local.set({ [a]: e }), e),
            l = async () => {
              await chrome.storage.local.remove(a);
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      kOwrn: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "buildConversationMediaDownloadPlan", () => c));
          let a = {
              "application/json": "json",
              "application/pdf": "pdf",
              "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                "pptx",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                "xlsx",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                "docx",
              "application/zip": "zip",
              "image/gif": "gif",
              "image/jpeg": "jpg",
              "image/jpg": "jpg",
              "image/png": "png",
              "image/svg+xml": "svg",
              "image/webp": "webp",
              "text/csv": "csv",
              "text/markdown": "md",
              "text/plain": "txt",
            },
            o = (e) => {
              let t = e
                  .replace(
                    /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202f\ufeff]/g,
                    "",
                  )
                  .replace(/[<>:"/\\|?*]+/g, "-")
                  .replace(/[^a-zA-Z0-9._-]+/g, "-")
                  .replace(/-+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  .trim(),
                r = t.slice(0, 80);
              return r || "asset";
            },
            i = (e) => {
              let t = e.fileName.split("?")[0],
                r = t.includes(".") ? t.split(".").pop()?.toLowerCase() : "";
              if (r) return r;
              if (e.mimeType) {
                let t = a[e.mimeType.toLowerCase()];
                if (t) return t;
              }
              return "image" === e.type ? "png" : "bin";
            },
            s = (e) => {
              let t =
                  e.fileName.split("?")[0].split(/[\\/]/).pop() ?? e.fileName,
                r = t.replace(/\.[^.]+$/, ""),
                n = o(r);
              return n || o(e.id) || "asset";
            },
            l = (e, t) => {
              let r = e.lastIndexOf("/");
              return -1 === r ? t : `${e.slice(0, r)}/${t}`;
            },
            c = ({
              conversation: e,
              exportPath: t,
              includeFiles: r = !0,
              includeImages: n = !0,
            }) => {
              let a = new Map();
              for (let t of e.messages)
                for (let e of t.media ?? [])
                  e.downloadUrl &&
                    ("image" !== e.type || n) &&
                    ("file" !== e.type || r) &&
                    !a.has(e.id) &&
                    a.set(e.id, e);
              let c = new Set(),
                u = {},
                p = Array.from(a.values()).map((e) => {
                  let r = i(e),
                    n = s(e),
                    a = `${n}.${r}`;
                  (c.has(a) &&
                    (a = `${n}-${o(e.id).slice(0, 12) || "asset"}.${r}`),
                    c.add(a));
                  let p = `${"image" === e.type ? "images" : "attachments"}/${a}`;
                  return (
                    (u[e.id] = p),
                    {
                      downloadPath: l(t, p),
                      media: e,
                      mediaId: e.id,
                      relativePath: p,
                      url: e.downloadUrl,
                    }
                  );
                });
              return { downloads: p, relativePathByMediaId: u };
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      fvLbt: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "formatConversationAsMarkdown", () => w),
            n.export(r, "stripMarkdownFrontmatter", () => _));
          var a = e("~lib/conversation-export-metadata"),
            o = e("~lib/conversation-title"),
            i = e("~lib/conversation-artifact-dedup");
          let s = {
              assistant: "Assistant",
              system: "System",
              tool: "Tool",
              user: "You",
            },
            l = (e) => {
              let t = s[e.role] || e.role,
                r = e.authorName?.trim();
              return r && r.toLowerCase() !== t.toLowerCase()
                ? `${t} (${r})`
                : t;
            },
            c = (e) =>
              e
                .replaceAll("\\", "\\\\")
                .replaceAll("[", "\\[")
                .replaceAll("]", "\\]"),
            u = (e) =>
              e
                .replaceAll("\\", "\\\\")
                .replaceAll("[", "\\[")
                .replaceAll("]", "\\]")
                .replaceAll("(", "\\(")
                .replaceAll(")", "\\)"),
            p = (e) =>
              e
                .split("/")
                .map((e) => encodeURIComponent(e))
                .join("/"),
            d = (e) => /^(?:https?:\/\/|data:|blob:)/i.test(e),
            f = (e) =>
              e.replace(/\[([^\]]+)\]\(pplx:\/\/([^)]+)\)/gi, (e, t, r) => {
                let n = r.replace(/^\/+/, "");
                return `[${t}](https://www.perplexity.ai/${n})`;
              }),
            h = (e) => {
              let t = 0,
                r = 0;
              for (let n of e)
                "`" === n ? ((r += 1), (t = Math.max(t, r))) : (r = 0);
              return t;
            },
            m = ({ content: e, language: t }) => {
              let r = "`".repeat(Math.max(3, h(e) + 1));
              return `${r}${t?.trim() ?? ""}
${e}
${r}`;
            },
            g = (e) => {
              let t = e?.trim().toLowerCase() ?? "";
              return t
                ? t.startsWith("code/")
                  ? t.slice(5) || "text"
                  : "text/html" === t || "html" === t || "code/html" === t
                    ? "html"
                    : "application/json" === t || "text/json" === t
                      ? "json"
                      : "text/markdown" === t || "markdown" === t
                        ? "markdown"
                        : (t.startsWith("text/"), "text")
                : "text";
            },
            b = (e) => {
              let t = e.mimeType?.trim().toLowerCase() ?? "";
              return "text/markdown" === t || "markdown" === t;
            },
            x = (e) => {
              let t = e
                .filter((e) => e.content?.trim())
                .map((e) => {
                  let t = e.url?.trim()
                    ? `> Source file: [${u(e.label)}](${e.url.trim()})`
                    : "";
                  if (b(e))
                    return [
                      `### Document: ${e.label}`,
                      t,
                      f(e.content?.trim() ?? ""),
                    ]
                      .filter(Boolean)
                      .join("\n\n");
                  let r = e.mimeType
                    ? `> Artifact type: \`${e.mimeType}\``
                    : `> Artifact type: \`${e.type}\``;
                  return [
                    `### Artifact: ${e.label}`,
                    t,
                    r,
                    m({
                      content: e.content?.trim() ?? "",
                      language: g(e.mimeType),
                    }),
                  ].join("\n\n");
                });
              return t.join("\n\n");
            },
            y = (e) => {
              let t = e
                .map((e) => {
                  let t = e.label || "Attached Document";
                  return e.url?.trim()
                    ? `> Attached document: [${u(t)}](${e.url.trim()})`
                    : `> Attached document: ${t}`;
                })
                .filter(Boolean);
              return t.join("\n");
            },
            v = (e) => e.replace(/^(#{1,6})\s/gm, "\\$1 "),
            k = ({ media: e, mediaInlineSrcById: t, mediaPathById: r }) => {
              let n = e
                  .filter((e) => "image" === e.type)
                  .map((e) => {
                    let n = t?.[e.id] ?? r?.[e.id];
                    if (!n) return null;
                    let a = c(e.fileName.replace(/\.[^.]+$/, "") || "Image");
                    return `![${a}](${d(n) ? n : p(n)})`;
                  })
                  .filter((e) => !!e),
                a = e
                  .filter((e) => "file" === e.type)
                  .map((e) => {
                    let t = r?.[e.id];
                    if (!t) return null;
                    let n = d(t) ? t : p(t),
                      a = u(e.fileName || "Attachment"),
                      o = d(t) ? "" : ` \`${t}\``;
                    return `Attachment: [${a}](${n})${o}`;
                  })
                  .filter((e) => !!e);
              return [...n, ...a].join("\n\n");
            },
            w = ({
              conversation: e,
              mediaInlineSrcById: t,
              mediaPathById: r,
              platform: n,
            }) => {
              let s = (0, o.normalizeConversationTitle)(
                  e.summary.title || "Untitled Conversation",
                ),
                c = (0, a.getConversationExportMetadata)(e),
                u = c.projectName
                  ? (0, o.normalizeConversationTitle)(c.projectName, {
                      fallback: "",
                      maxLength: 80,
                    })
                  : "",
                p = (0, a.formatLocalMetadataTimestamp)(c.createdAt),
                d = (0, a.formatLocalMetadataTimestamp)(c.updatedAt),
                h = (0, a.formatLocalMetadataTimestamp)(c.exportedAt),
                m = [
                  "---",
                  `title: "${(0, o.escapeYamlDoubleQuotedString)(s)}"`,
                  `platform: "${n}"`,
                  `sourceUrl: "${(0, o.escapeYamlDoubleQuotedString)(c.sourceUrl)}"`,
                  `sourceId: "${(0, o.escapeYamlDoubleQuotedString)(c.sourceId)}"`,
                  `createdAt: "${(0, o.escapeYamlDoubleQuotedString)(p)}"`,
                  `updatedAt: "${(0, o.escapeYamlDoubleQuotedString)(d)}"`,
                  `exportedAt: "${(0, o.escapeYamlDoubleQuotedString)(h)}"`,
                  `messageCount: ${c.messageCount}`,
                  ...(c.model
                    ? [
                        `model: "${(0, o.escapeYamlDoubleQuotedString)(c.model)}"`,
                      ]
                    : []),
                  ...(c.mode
                    ? [`mode: "${(0, o.escapeYamlDoubleQuotedString)(c.mode)}"`]
                    : []),
                  ...(u
                    ? [
                        `projectName: "${(0, o.escapeYamlDoubleQuotedString)(u)}"`,
                      ]
                    : []),
                  ...(c.space
                    ? [
                        `space: "${(0, o.escapeYamlDoubleQuotedString)(c.space)}"`,
                      ]
                    : []),
                  ...(c.tags.length
                    ? [
                        "tags:",
                        ...c.tags.map(
                          (e) =>
                            `  - "${(0, o.escapeYamlDoubleQuotedString)(e)}"`,
                        ),
                      ]
                    : []),
                  "---",
                ].join("\n"),
                g = e.artifacts.reduce(
                  (e, t) => (
                    t.sourceMessageId &&
                      t.content?.trim() &&
                      (e[t.sourceMessageId] = [
                        ...(e[t.sourceMessageId] ?? []),
                        t,
                      ]),
                    e
                  ),
                  {},
                ),
                b = e.artifacts.filter(
                  (e) => e.content?.trim() && !e.sourceMessageId,
                ),
                { distinctArtifacts: w } = (0,
                i.splitArtifactsByDuplicateMessageContent)({
                  artifacts: b,
                  messages: e.messages,
                }),
                _ = e.messages
                  .map((e) => {
                    let n = l(e),
                      a = e.createdAt
                        ? `

> ${new Date(e.createdAt).toLocaleString("en-US")}`
                        : "",
                      o = k({
                        media: e.media ?? [],
                        mediaInlineSrcById: t,
                        mediaPathById: r,
                      }),
                      { distinctArtifacts: s, duplicateArtifacts: c } = (0,
                      i.splitArtifactsByDuplicateMessageContent)({
                        artifacts: g[e.id] ?? [],
                        messages: [e],
                      }),
                      u = x(s),
                      p = y(c),
                      d = f(e.content.trim()),
                      h = ["user" === e.role ? v(d) : d, o, p, u]
                        .filter(Boolean)
                        .join("\n\n");
                    return `# ${n}${a}

${h || "No content captured."}`;
                  })
                  .join("\n\n---\n\n"),
                A = x(w);
              return `${m}

# ${s}

${_}${
                A
                  ? `

---

## Artifacts

${A}`
                  : ""
              }
`;
            },
            _ = (e) => {
              if (!e.startsWith("---\n")) return e;
              let t = e.indexOf("\n---\n", 4);
              return -1 === t ? e : e.slice(t + 5).trimStart();
            };
        },
        {
          "~lib/conversation-export-metadata": "6LKjR",
          "~lib/conversation-title": "4IhWv",
          "~lib/conversation-artifact-dedup": "1EiWD",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      bM5KP: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "formatConversationAsPdfHtml", () => _));
          var a = e("markdown-it"),
            o = n.interopDefault(a),
            i = e("~lib/conversation-export-metadata");
          let s = (e) =>
              e
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            l = {
              assistant: "Assistant",
              system: "System",
              tool: "Tool",
              user: "You",
            },
            c = {
              chatgpt: "ChatGPT",
              claude: "Claude",
              gemini: "Gemini",
              perplexity: "Perplexity",
            },
            u = new o.default({ breaks: !0, html: !0, linkify: !0 }),
            p = (e) => /^(?:https?:\/\/|data:|blob:)/i.test(e),
            d = (e) =>
              e
                .split("/")
                .map((e) => encodeURIComponent(e))
                .join("/"),
            f = (e) =>
              e
                .replaceAll("\\", "\\\\")
                .replaceAll("[", "\\[")
                .replaceAll("]", "\\]"),
            h = (e) =>
              e
                .replace(/```[\s\S]*?```/g, " ")
                .replace(/`([^`]+)`/g, "$1")
                .replace(/!\[([^\]]*)]\(([^)]+)\)/g, "$1")
                .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
                .replace(/^#{1,6}\s+/gm, "")
                .replace(/^\s*[-*+]\s+/gm, "")
                .replace(/^\s*\d+\.\s+/gm, "")
                .replace(/[>*_~]/g, " ")
                .replace(/\s+/g, " ")
                .trim(),
            m = (e, t) => (e.length > t ? `${e.slice(0, t)}...` : e),
            g = (e, t) => {
              let r =
                  "assistant" === e.role
                    ? c[t] || "Assistant"
                    : l[e.role] || e.role,
                n = e.authorName?.trim();
              return n || r;
            },
            b = (e) =>
              "user" === e ? "print-message-user" : "print-message-assistant",
            x = (e) =>
              "print-message-user" === e
                ? '<span class="print-role-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="currentColor"></circle><path d="M5 19c0-3.2 2.9-5 7-5s7 1.8 7 5" fill="currentColor"></path></svg></span>'
                : '<span class="print-role-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" fill="currentColor"></path></svg></span>',
            y = (e) => (0, i.formatLocalMetadataTimestamp)(e) || "",
            v = ({ media: e, mediaInlineSrcById: t, mediaPathById: r }) => {
              let n = e
                  .filter((e) => "image" === e.type)
                  .map((e) => {
                    let n = t?.[e.id] ?? r?.[e.id];
                    if (!n) return "";
                    let a = f(e.fileName.replace(/\.[^.]+$/, "") || "Image");
                    return `![${a}](${p(n) ? n : d(n)})`;
                  })
                  .filter(Boolean),
                a = e
                  .filter((e) => "file" === e.type)
                  .map((e) => {
                    let t = r?.[e.id];
                    if (!t) return "";
                    let n = e.fileName || "Attachment",
                      a = p(t) ? t : d(t);
                    return `Attachment: [${n}](${a})`;
                  })
                  .filter(Boolean);
              return [...n, ...a].join("\n\n");
            },
            k = (e) => {
              let t = e
                .map((e) => {
                  let t = e.url?.trim()
                      ? `> Source file: [${e.label}](${e.url.trim()})`
                      : "",
                    r = e.content?.trim();
                  if (!r)
                    return e.url?.trim()
                      ? `> Attached document: [${e.label}](${e.url.trim()})`
                      : `> Attached document: ${e.label}`;
                  let n = e.mimeType?.trim().toLowerCase() ?? "";
                  return "text/markdown" === n || "markdown" === n
                    ? [`### Document: ${e.label}`, t, r]
                        .filter(Boolean)
                        .join("\n\n")
                    : [
                        `### Artifact: ${e.label}`,
                        t,
                        `> Artifact type: \`${e.mimeType || e.type}\``,
                        "```text",
                        r,
                        "```",
                      ]
                        .filter(Boolean)
                        .join("\n\n");
                })
                .filter(Boolean);
              return t.join("\n\n");
            },
            w = ({
              artifacts: e,
              mediaInlineSrcById: t,
              mediaPathById: r,
              message: n,
            }) => {
              let a = n.content.trim(),
                o = v({
                  media: n.media ?? [],
                  mediaInlineSrcById: t,
                  mediaPathById: r,
                }),
                i = k(e),
                s = [a, o, i].filter(Boolean).join("\n\n");
              return u.render(s || "No content captured.");
            },
            _ = ({
              conversation: e,
              mediaInlineSrcById: t,
              mediaPathById: r,
              pdfColorTheme: n = "light",
              pdfMessageStyle: a = "scheme-c",
              platform: o,
            }) => {
              let l = s(e.summary.title || "Untitled Conversation"),
                c = (0, i.getConversationExportMetadata)(e),
                p =
                  (0, i.formatLocalMetadataTimestamp)(c.createdAt) || "Unknown",
                d =
                  (0, i.formatLocalMetadataTimestamp)(e.summary.updatedAt) ||
                  "Unknown",
                f = (0, i.formatLocalMetadataTimestamp)(c.updatedAt) || d,
                v =
                  (0, i.formatLocalMetadataTimestamp)(c.exportedAt) ||
                  "Unknown",
                _ = e.messages
                  .map((e) => g(e, o))
                  .filter((e, t, r) => r.indexOf(e) === t)
                  .join(" \xb7 "),
                A = e.artifacts.reduce(
                  (e, t) => (
                    t.sourceMessageId &&
                      (e[t.sourceMessageId] = [
                        ...(e[t.sourceMessageId] ?? []),
                        t,
                      ]),
                    e
                  ),
                  {},
                ),
                C = e.artifacts.filter((e) => !e.sourceMessageId),
                E = [
                  { label: "Platform", value: o },
                  { label: "Created At", value: p },
                  { label: "Updated At", value: f },
                  { label: "Exported At", value: v },
                  { label: "Messages", value: String(c.messageCount) },
                  { label: "Model", value: c.model },
                  { label: "Mode", value: c.mode },
                  { label: "Workspace", value: c.space },
                  { label: "Source ID", value: c.sourceId, wide: !0 },
                  { label: "Source URL", value: c.sourceUrl, wide: !0 },
                  { label: "Tags", value: c.tags.join(" \xb7 "), wide: !0 },
                  { label: "Project", value: c.projectName, wide: !0 },
                  { label: "Roles", value: _ || "Conversation", wide: !0 },
                ]
                  .filter((e) => e.value)
                  .map(
                    (e) => `<div class="meta-tile${e.wide ? " meta-wide" : ""}">
            <span class="meta-label">${s(e.label)}</span>
            <span class="meta-value">${s(e.value)}</span>
          </div>`,
                  )
                  .join(""),
                j = e.messages.map((e, n) => {
                  let a = b(e.role),
                    i = g(e, o),
                    s = w({
                      artifacts: A[e.id] ?? [],
                      mediaInlineSrcById: t,
                      mediaPathById: r,
                      message: e,
                    }),
                    l = m(h(e.content) || i, 72);
                  return {
                    html: s,
                    id: `print-message-${n + 1}`,
                    roleClass: a,
                    roleLabel: i,
                    summary: l,
                    timestamp: y(e.createdAt),
                  };
                }),
                I = j.length
                  ? `<nav class="print-outline">
        <div class="print-outline-title">Conversation Outline</div>
        <div class="print-outline-list">
          ${j
            .map(
              (
                e,
              ) => `<a href="#${e.id}" class="print-outline-link ${e.roleClass}">
                <span class="print-outline-role">${x(e.roleClass)}<span class="print-outline-badge">${s(e.roleLabel)}</span></span>
                <span class="print-outline-text">${s(e.summary)}</span>
              </a>`,
            )
            .join("")}
        </div>
      </nav>`
                  : "",
                S = j
                  .map(
                    (
                      e,
                    ) => `<section id="${e.id}" class="print-message-card ${e.roleClass}">
        <div class="print-message-header">
          <div class="print-message-role">${x(e.roleClass)}<span class="print-role-badge">${s(e.roleLabel)}</span></div>
          ${e.timestamp ? `<span class="print-role-time">${s(e.timestamp)}</span>` : ""}
        </div>
        <div class="print-message-body">${e.html}</div>
      </section>`,
                  )
                  .join(""),
                D = C.length
                  ? `<section class="print-message-card print-message-assistant">
        <div class="print-message-header">
          <div class="print-message-role">${x("print-message-assistant")}<span class="print-role-badge">Artifacts</span></div>
        </div>
        <div class="print-message-body">${u.render(k(C))}</div>
      </section>`
                  : "";
              return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${l}</title>
    <style>
      :root {
        color-scheme: light dark;
      }
      * {
        box-sizing: border-box;
      }
      @page {
        margin: 0;
      }
      body {
        margin: 0;
        background: #ffffff;
        color: #111827;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
      .print-page {
        --pdf-page-bg: #ffffff;
        --pdf-surface: #ffffff;
        --pdf-muted-surface: #f8fafc;
        --pdf-soft-surface: #f3f4f6;
        --pdf-text: #111827;
        --pdf-title: #0f172a;
        --pdf-muted-text: #4b5563;
        --pdf-subtle-text: #6b7280;
        --pdf-border: #e5e7eb;
        --pdf-table-border: #cbd5e1;
        --pdf-table-header: #f1f5f9;
        --pdf-link: #2563eb;
        --pdf-user-soft: #fffdf9;
        --pdf-user-icon: #fff4e5;
        --pdf-assistant-soft: #fbfaff;
        --pdf-assistant-icon: #f1edff;
        min-height: 100vh;
        padding: 28px 30px 36px;
        background: var(--pdf-page-bg);
        color: var(--pdf-text);
        font-size: 15px;
        line-height: 1.8;
      }
      .print-theme-dark {
        --pdf-page-bg: #0b0b0c;
        --pdf-surface: #151516;
        --pdf-muted-surface: #1f2023;
        --pdf-soft-surface: #242529;
        --pdf-text: #e8eaed;
        --pdf-title: #f8fafc;
        --pdf-muted-text: #c4c7c5;
        --pdf-subtle-text: #9aa0a6;
        --pdf-border: #303134;
        --pdf-table-border: #4b5563;
        --pdf-table-header: #202124;
        --pdf-link: #8ab4f8;
        --pdf-user-soft: #191714;
        --pdf-user-icon: #2c2114;
        --pdf-assistant-soft: #17151f;
        --pdf-assistant-icon: #241f3a;
      }
      .print-theme-comfort {
        --pdf-page-bg: #fbf6e8;
        --pdf-surface: #fffaf0;
        --pdf-muted-surface: #f3ead7;
        --pdf-soft-surface: #efe4cc;
        --pdf-text: #2f3329;
        --pdf-title: #1f2933;
        --pdf-muted-text: #555b4c;
        --pdf-subtle-text: #737868;
        --pdf-border: #ded1b5;
        --pdf-table-border: #c9b892;
        --pdf-table-header: #efe3ca;
        --pdf-link: #1d5f8f;
        --pdf-user-soft: #fff3dc;
        --pdf-user-icon: #f6dfb9;
        --pdf-assistant-soft: #f4f0ff;
        --pdf-assistant-icon: #e6ddff;
      }
      .print-hero {
        margin: 0 0 28px;
        padding: 0 0 24px;
        border-bottom: 1px solid var(--pdf-border);
      }
      .print-eyebrow {
        margin: 0 0 10px;
        color: var(--pdf-link);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      .print-page h1 {
        margin: 0 0 22px;
        color: var(--pdf-title);
        font-size: 34px;
        font-weight: 800;
        letter-spacing: 0;
        line-height: 1.18;
      }
      .meta-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }
      .meta-tile {
        padding: 12px 14px;
        border: 1px solid var(--pdf-border);
        border-radius: 8px;
        background: var(--pdf-surface);
      }
      .meta-label {
        display: block;
        margin-bottom: 5px;
        color: var(--pdf-subtle-text);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .meta-value {
        color: var(--pdf-text);
        font-size: 12px;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }
      .meta-wide {
        grid-column: span 3;
      }
      .print-page hr {
        display: none;
      }
      .print-page p {
        margin: 0 0 16px;
      }
      .print-page p:last-child {
        margin-bottom: 0;
      }
      .print-page a {
        color: var(--pdf-link);
        text-decoration: underline;
        text-underline-offset: 2px;
        word-break: break-word;
      }
      .print-page img {
        display: block;
        width: 90%;
        max-width: calc(100% - 24px);
        height: auto;
        max-height: none;
        margin: 18px auto 6px;
        border: 1px solid var(--pdf-border);
        border-radius: 8px;
        break-inside: avoid;
        object-fit: contain;
        page-break-inside: avoid;
      }
      .print-page pre {
        margin: 16px 0;
        overflow-x: auto;
        padding: 14px 16px;
        border-radius: 8px;
        background: #0f172a;
        color: #f8fafc;
        font-size: 13px;
        line-height: 1.65;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .print-page code {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      }
      .print-page :not(pre) > code {
        padding: 0.15em 0.42em;
        border-radius: 6px;
        background: var(--pdf-soft-surface);
        color: #be123c;
        font-size: 0.94em;
      }
      .print-page ul,
      .print-page ol {
        margin: 0 0 16px;
        padding-left: 22px;
      }
      .print-page blockquote {
        margin: 16px 0;
        padding: 0 0 0 16px;
        border-left: 3px solid var(--pdf-table-border);
        color: var(--pdf-muted-text);
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .print-page table {
        width: 100%;
        max-width: 100%;
        margin: 18px 0;
        border: 1px solid var(--pdf-table-border);
        border-collapse: collapse;
        background: var(--pdf-surface);
        color: var(--pdf-text);
        font-size: 13px;
        line-height: 1.55;
        table-layout: fixed;
      }
      .print-page thead {
        display: table-header-group;
      }
      .print-page tr {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .print-page th,
      .print-page td {
        padding: 9px 10px;
        border: 1px solid var(--pdf-table-border);
        overflow-wrap: anywhere;
        text-align: left;
        vertical-align: top;
        word-break: break-word;
      }
      .print-page th {
        background: var(--pdf-table-header);
        color: var(--pdf-title);
        font-weight: 700;
      }
      .print-page tbody tr:nth-child(even) td {
        background: var(--pdf-muted-surface);
      }
      .print-outline {
        margin: 0 0 28px;
        padding: 0;
        border: 1px solid var(--pdf-border);
        border-radius: 8px;
        background: var(--pdf-surface);
      }
      .print-outline-title {
        margin: 0;
        padding: 16px 20px 12px;
        color: var(--pdf-muted-text);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .print-outline-list {
        display: grid;
      }
      .print-outline-link {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 16px;
        padding: 14px 20px;
        border-top: 1px solid var(--pdf-border);
        background: var(--pdf-surface);
        color: var(--pdf-text);
        text-decoration: none;
      }
      .print-page a.print-outline-link {
        color: var(--pdf-text);
        text-decoration: none;
      }
      .print-outline-role,
      .print-message-role {
        display: inline-flex;
        min-width: 0;
        align-items: center;
        gap: 12px;
      }
      .print-outline-role {
        min-width: 160px;
      }
      .print-outline-badge,
      .print-role-badge {
        display: inline-flex;
        align-items: center;
        min-height: 24px;
        color: var(--pdf-muted-text);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .print-outline-text {
        color: var(--pdf-text);
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
      }
      .print-message-card {
        margin: 0 0 20px;
        overflow: visible;
        border: 1px solid var(--pdf-border);
        border-left-width: 1px;
        border-radius: 8px;
        background: var(--pdf-surface);
        break-inside: auto;
        page-break-inside: auto;
      }
      .print-message-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 18px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.16);
        border-radius: 8px 8px 0 0;
        break-after: avoid;
        page-break-after: avoid;
      }
      .print-role-icon {
        display: inline-flex;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
      }
      .print-role-icon svg {
        width: 16px;
        height: 16px;
      }
      .print-role-time {
        flex-shrink: 0;
        color: var(--pdf-subtle-text);
        font-size: 12px;
        font-weight: 500;
      }
      .print-message-body {
        padding: 18px;
        overflow-wrap: anywhere;
      }
      .print-message-body > *:first-child {
        margin-top: 0;
      }
      .print-message-body > *:last-child {
        margin-bottom: 0;
      }
      .print-message-user {
        border-left-color: #f59e0b;
      }
      .print-message-user .print-message-header {
        background: var(--pdf-user-soft);
      }
      .print-message-user .print-role-badge,
      .print-message-user .print-outline-badge {
        color: #fb8c00;
      }
      .print-message-user .print-role-icon {
        background: var(--pdf-user-icon);
        color: #fb8c00;
      }
      .print-message-assistant {
        border-left-color: #4f46e5;
      }
      .print-message-assistant .print-message-header {
        background: var(--pdf-assistant-soft);
      }
      .print-message-assistant .print-role-badge,
      .print-message-assistant .print-outline-badge {
        color: #6d5efc;
      }
      .print-message-assistant .print-role-icon {
        background: var(--pdf-assistant-icon);
        color: #6d5efc;
      }
      .print-style-scheme-a .print-message-card {
        border-left-width: 1px;
      }
      .print-style-scheme-a .print-message-header {
        border-bottom: none;
        background: transparent;
      }
      .print-style-scheme-a .print-role-icon {
        background: transparent;
      }
      .print-style-scheme-b .print-message-card,
      .print-style-scheme-c .print-message-card {
        border-left-width: 4px;
      }
      .print-style-scheme-b .print-message-header {
        border-bottom: none;
        background: transparent;
      }
      .print-style-scheme-b .print-outline-link,
      .print-style-scheme-c .print-outline-link {
        border-left: 3px solid transparent;
      }
      .print-style-scheme-b .print-message-user,
      .print-style-scheme-c .print-message-user,
      .print-style-scheme-b .print-outline-link.print-message-user,
      .print-style-scheme-c .print-outline-link.print-message-user {
        border-left-color: #fb8c00;
      }
      .print-style-scheme-b .print-message-assistant,
      .print-style-scheme-c .print-message-assistant,
      .print-style-scheme-b .print-outline-link.print-message-assistant,
      .print-style-scheme-c .print-outline-link.print-message-assistant {
        border-left-color: #6d5efc;
      }
    </style>
  </head>
  <body>
    <main class="print-page print-theme-${n} print-style-${a}">
      <section class="print-hero">
        <p class="print-eyebrow">AIExportHub</p>
        <h1>${l}</h1>
        <div class="meta-grid">${E}</div>
      </section>
      ${I}
      ${S}
      ${D}
    </main>
  </body>
</html>`;
            };
        },
        {
          "markdown-it": "obdlL",
          "~lib/conversation-export-metadata": "6LKjR",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      obdlL: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o.default));
          var a = e("./lib/index.mjs"),
            o = n.interopDefault(a);
        },
        {
          "./lib/index.mjs": "6ztEZ",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "6ztEZ": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("./common/utils.mjs"),
            o = e("./helpers/index.mjs"),
            i = e("./renderer.mjs"),
            s = n.interopDefault(i),
            l = e("./parser_core.mjs"),
            c = n.interopDefault(l),
            u = e("./parser_block.mjs"),
            p = n.interopDefault(u),
            d = e("./parser_inline.mjs"),
            f = n.interopDefault(d),
            h = e("linkify-it"),
            m = n.interopDefault(h),
            g = e("mdurl"),
            b = e("punycode.js"),
            x = n.interopDefault(b),
            y = e("./presets/default.mjs"),
            v = n.interopDefault(y),
            k = e("./presets/zero.mjs"),
            w = n.interopDefault(k),
            _ = e("./presets/commonmark.mjs"),
            A = n.interopDefault(_);
          let C = {
              default: v.default,
              zero: w.default,
              commonmark: A.default,
            },
            E = /^(vbscript|javascript|file|data):/,
            j = /^data:image\/(gif|png|jpeg|webp);/;
          function I(e) {
            let t = e.trim().toLowerCase();
            return !E.test(t) || j.test(t);
          }
          let S = ["http:", "https:", "mailto:"];
          function D(e) {
            let t = g.parse(e, !0);
            if (t.hostname && (!t.protocol || S.indexOf(t.protocol) >= 0))
              try {
                t.hostname = (0, x.default).toASCII(t.hostname);
              } catch (e) {}
            return g.encode(g.format(t));
          }
          function F(e) {
            let t = g.parse(e, !0);
            if (t.hostname && (!t.protocol || S.indexOf(t.protocol) >= 0))
              try {
                t.hostname = (0, x.default).toUnicode(t.hostname);
              } catch (e) {}
            return g.decode(g.format(t), g.decode.defaultChars + "%");
          }
          function T(e, t) {
            if (!(this instanceof T)) return new T(e, t);
            (t || a.isString(e) || ((t = e || {}), (e = "default")),
              (this.inline = new f.default()),
              (this.block = new p.default()),
              (this.core = new c.default()),
              (this.renderer = new s.default()),
              (this.linkify = new m.default()),
              (this.validateLink = I),
              (this.normalizeLink = D),
              (this.normalizeLinkText = F),
              (this.utils = a),
              (this.helpers = a.assign({}, o)),
              (this.options = {}),
              this.configure(e),
              t && this.set(t));
          }
          ((T.prototype.set = function (e) {
            return (a.assign(this.options, e), this);
          }),
            (T.prototype.configure = function (e) {
              let t = this;
              if (a.isString(e)) {
                let t = e;
                if (!(e = C[t]))
                  throw Error(
                    'Wrong `markdown-it` preset "' + t + '", check name',
                  );
              }
              if (!e) throw Error("Wrong `markdown-it` preset, can't be empty");
              return (
                e.options && t.set(e.options),
                e.components &&
                  Object.keys(e.components).forEach(function (r) {
                    (e.components[r].rules &&
                      t[r].ruler.enableOnly(e.components[r].rules),
                      e.components[r].rules2 &&
                        t[r].ruler2.enableOnly(e.components[r].rules2));
                  }),
                this
              );
            }),
            (T.prototype.enable = function (e, t) {
              let r = [];
              (Array.isArray(e) || (e = [e]),
                ["core", "block", "inline"].forEach(function (t) {
                  r = r.concat(this[t].ruler.enable(e, !0));
                }, this),
                (r = r.concat(this.inline.ruler2.enable(e, !0))));
              let n = e.filter(function (e) {
                return 0 > r.indexOf(e);
              });
              if (n.length && !t)
                throw Error(
                  "MarkdownIt. Failed to enable unknown rule(s): " + n,
                );
              return this;
            }),
            (T.prototype.disable = function (e, t) {
              let r = [];
              (Array.isArray(e) || (e = [e]),
                ["core", "block", "inline"].forEach(function (t) {
                  r = r.concat(this[t].ruler.disable(e, !0));
                }, this),
                (r = r.concat(this.inline.ruler2.disable(e, !0))));
              let n = e.filter(function (e) {
                return 0 > r.indexOf(e);
              });
              if (n.length && !t)
                throw Error(
                  "MarkdownIt. Failed to disable unknown rule(s): " + n,
                );
              return this;
            }),
            (T.prototype.use = function (e) {
              let t = [this].concat(Array.prototype.slice.call(arguments, 1));
              return (e.apply(e, t), this);
            }),
            (T.prototype.parse = function (e, t) {
              if ("string" != typeof e)
                throw Error("Input data should be a String");
              let r = new this.core.State(e, this, t);
              return (this.core.process(r), r.tokens);
            }),
            (T.prototype.render = function (e, t) {
              return (
                (t = t || {}),
                this.renderer.render(this.parse(e, t), this.options, t)
              );
            }),
            (T.prototype.parseInline = function (e, t) {
              let r = new this.core.State(e, this, t);
              return ((r.inlineMode = !0), this.core.process(r), r.tokens);
            }),
            (T.prototype.renderInline = function (e, t) {
              return (
                (t = t || {}),
                this.renderer.render(this.parseInline(e, t), this.options, t)
              );
            }),
            (r.default = T));
        },
        {
          "./common/utils.mjs": "4QLOI",
          "./helpers/index.mjs": "i8sNd",
          "./renderer.mjs": "hBKGg",
          "./parser_core.mjs": "6unIa",
          "./parser_block.mjs": "izjCc",
          "./parser_inline.mjs": "dgfdX",
          "linkify-it": "7OsUs",
          mdurl: "bp3el",
          "punycode.js": "4xlTY",
          "./presets/default.mjs": "7bNAA",
          "./presets/zero.mjs": "eTWYy",
          "./presets/commonmark.mjs": "99ZFo",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "4QLOI": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "lib", () => F),
            n.export(r, "assign", () => u),
            n.export(r, "isString", () => s),
            n.export(r, "has", () => c),
            n.export(r, "unescapeMd", () => b),
            n.export(r, "unescapeAll", () => x),
            n.export(r, "isValidEntityCode", () => d),
            n.export(r, "fromCodePoint", () => f),
            n.export(r, "escapeHtml", () => _),
            n.export(r, "arrayReplaceAt", () => p),
            n.export(r, "isSpace", () => E),
            n.export(r, "isWhiteSpace", () => j),
            n.export(r, "isMdAsciiPunct", () => S),
            n.export(r, "isPunctChar", () => I),
            n.export(r, "escapeRE", () => C),
            n.export(r, "normalizeReference", () => D));
          var a = e("mdurl"),
            o = e("uc.micro"),
            i = e("entities");
          function s(e) {
            return "[object String]" === Object.prototype.toString.call(e);
          }
          let l = Object.prototype.hasOwnProperty;
          function c(e, t) {
            return l.call(e, t);
          }
          function u(e) {
            let t = Array.prototype.slice.call(arguments, 1);
            return (
              t.forEach(function (t) {
                if (t) {
                  if ("object" != typeof t)
                    throw TypeError(t + "must be object");
                  Object.keys(t).forEach(function (r) {
                    e[r] = t[r];
                  });
                }
              }),
              e
            );
          }
          function p(e, t, r) {
            return [].concat(e.slice(0, t), r, e.slice(t + 1));
          }
          function d(e) {
            return (
              (!(e >= 55296) || !(e <= 57343)) &&
              (!(e >= 64976) || !(e <= 65007)) &&
              (65535 & e) != 65535 &&
              (65535 & e) != 65534 &&
              (!(e >= 0) || !(e <= 8)) &&
              11 !== e &&
              (!(e >= 14) || !(e <= 31)) &&
              (!(e >= 127) || !(e <= 159)) &&
              !(e > 1114111)
            );
          }
          function f(e) {
            if (e > 65535) {
              e -= 65536;
              let t = 55296 + (e >> 10),
                r = 56320 + (1023 & e);
              return String.fromCharCode(t, r);
            }
            return String.fromCharCode(e);
          }
          let h = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,
            m = RegExp(
              h.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source,
              "gi",
            ),
            g = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
          function b(e) {
            return 0 > e.indexOf("\\") ? e : e.replace(h, "$1");
          }
          function x(e) {
            return 0 > e.indexOf("\\") && 0 > e.indexOf("&")
              ? e
              : e.replace(m, function (e, t, r) {
                  return (
                    t ||
                    (function (e, t) {
                      if (35 === t.charCodeAt(0) && g.test(t)) {
                        let r =
                          "x" === t[1].toLowerCase()
                            ? parseInt(t.slice(2), 16)
                            : parseInt(t.slice(1), 10);
                        return d(r) ? f(r) : e;
                      }
                      let r = (0, i.decodeHTML)(e);
                      return r !== e ? r : e;
                    })(e, r)
                  );
                });
          }
          let y = /[&<>"]/,
            v = /[&<>"]/g,
            k = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
          function w(e) {
            return k[e];
          }
          function _(e) {
            return y.test(e) ? e.replace(v, w) : e;
          }
          let A = /[.?*+^$[\]\\(){}|-]/g;
          function C(e) {
            return e.replace(A, "\\$&");
          }
          function E(e) {
            switch (e) {
              case 9:
              case 32:
                return !0;
            }
            return !1;
          }
          function j(e) {
            if (e >= 8192 && e <= 8202) return !0;
            switch (e) {
              case 9:
              case 10:
              case 11:
              case 12:
              case 13:
              case 32:
              case 160:
              case 5760:
              case 8239:
              case 8287:
              case 12288:
                return !0;
            }
            return !1;
          }
          function I(e) {
            return o.P.test(e) || o.S.test(e);
          }
          function S(e) {
            switch (e) {
              case 33:
              case 34:
              case 35:
              case 36:
              case 37:
              case 38:
              case 39:
              case 40:
              case 41:
              case 42:
              case 43:
              case 44:
              case 45:
              case 46:
              case 47:
              case 58:
              case 59:
              case 60:
              case 61:
              case 62:
              case 63:
              case 64:
              case 91:
              case 92:
              case 93:
              case 94:
              case 95:
              case 96:
              case 123:
              case 124:
              case 125:
              case 126:
                return !0;
              default:
                return !1;
            }
          }
          function D(e) {
            return (e = e.trim().replace(/\s+/g, " "))
              .toLowerCase()
              .toUpperCase();
          }
          let F = { mdurl: a, ucmicro: o };
        },
        {
          mdurl: "bp3el",
          "uc.micro": "4euC3",
          entities: "gEAz9",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      bp3el: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "decode", () => o.default),
            n.export(r, "encode", () => s.default),
            n.export(r, "format", () => c.default),
            n.export(r, "parse", () => p.default));
          var a = e("./lib/decode.mjs"),
            o = n.interopDefault(a),
            i = e("./lib/encode.mjs"),
            s = n.interopDefault(i),
            l = e("./lib/format.mjs"),
            c = n.interopDefault(l),
            u = e("./lib/parse.mjs"),
            p = n.interopDefault(u);
        },
        {
          "./lib/decode.mjs": "3g72k",
          "./lib/encode.mjs": "JrGlW",
          "./lib/format.mjs": "i95uM",
          "./lib/parse.mjs": "f6pSM",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "3g72k": [
        function (e, t, r) {
          e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
            r,
          );
          let n = {};
          function a(e, t) {
            "string" != typeof t && (t = a.defaultChars);
            let r = (function (e) {
              let t = n[e];
              if (t) return t;
              t = n[e] = [];
              for (let e = 0; e < 128; e++) {
                let r = String.fromCharCode(e);
                t.push(r);
              }
              for (let r = 0; r < e.length; r++) {
                let n = e.charCodeAt(r);
                t[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
              }
              return t;
            })(t);
            return e.replace(/(%[a-f0-9]{2})+/gi, function (e) {
              let t = "";
              for (let n = 0, a = e.length; n < a; n += 3) {
                let o = parseInt(e.slice(n + 1, n + 3), 16);
                if (o < 128) {
                  t += r[o];
                  continue;
                }
                if ((224 & o) == 192 && n + 3 < a) {
                  let r = parseInt(e.slice(n + 4, n + 6), 16);
                  if ((192 & r) == 128) {
                    let e = ((o << 6) & 1984) | (63 & r);
                    (e < 128
                      ? (t += "\ufffd\ufffd")
                      : (t += String.fromCharCode(e)),
                      (n += 3));
                    continue;
                  }
                }
                if ((240 & o) == 224 && n + 6 < a) {
                  let r = parseInt(e.slice(n + 4, n + 6), 16),
                    a = parseInt(e.slice(n + 7, n + 9), 16);
                  if ((192 & r) == 128 && (192 & a) == 128) {
                    let e = ((o << 12) & 61440) | ((r << 6) & 4032) | (63 & a);
                    (e < 2048 || (e >= 55296 && e <= 57343)
                      ? (t += "\ufffd\ufffd\ufffd")
                      : (t += String.fromCharCode(e)),
                      (n += 6));
                    continue;
                  }
                }
                if ((248 & o) == 240 && n + 9 < a) {
                  let r = parseInt(e.slice(n + 4, n + 6), 16),
                    a = parseInt(e.slice(n + 7, n + 9), 16),
                    i = parseInt(e.slice(n + 10, n + 12), 16);
                  if (
                    (192 & r) == 128 &&
                    (192 & a) == 128 &&
                    (192 & i) == 128
                  ) {
                    let e =
                      ((o << 18) & 1835008) |
                      ((r << 12) & 258048) |
                      ((a << 6) & 4032) |
                      (63 & i);
                    (e < 65536 || e > 1114111
                      ? (t += "\ufffd\ufffd\ufffd\ufffd")
                      : ((e -= 65536),
                        (t += String.fromCharCode(
                          55296 + (e >> 10),
                          56320 + (1023 & e),
                        ))),
                      (n += 9));
                    continue;
                  }
                }
                t += "\ufffd";
              }
              return t;
            });
          }
          ((a.defaultChars = ";/?:@&=+$,#"),
            (a.componentChars = ""),
            (r.default = a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      JrGlW: [
        function (e, t, r) {
          e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
            r,
          );
          let n = {};
          function a(e, t, r) {
            ("string" != typeof t && ((r = t), (t = a.defaultChars)),
              void 0 === r && (r = !0));
            let o = (function (e) {
                let t = n[e];
                if (t) return t;
                t = n[e] = [];
                for (let e = 0; e < 128; e++) {
                  let r = String.fromCharCode(e);
                  /^[0-9a-z]$/i.test(r)
                    ? t.push(r)
                    : t.push(
                        "%" + ("0" + e.toString(16).toUpperCase()).slice(-2),
                      );
                }
                for (let r = 0; r < e.length; r++) t[e.charCodeAt(r)] = e[r];
                return t;
              })(t),
              i = "";
            for (let t = 0, n = e.length; t < n; t++) {
              let a = e.charCodeAt(t);
              if (
                r &&
                37 === a &&
                t + 2 < n &&
                /^[0-9a-f]{2}$/i.test(e.slice(t + 1, t + 3))
              ) {
                ((i += e.slice(t, t + 3)), (t += 2));
                continue;
              }
              if (a < 128) {
                i += o[a];
                continue;
              }
              if (a >= 55296 && a <= 57343) {
                if (a >= 55296 && a <= 56319 && t + 1 < n) {
                  let r = e.charCodeAt(t + 1);
                  if (r >= 56320 && r <= 57343) {
                    ((i += encodeURIComponent(e[t] + e[t + 1])), t++);
                    continue;
                  }
                }
                i += "%EF%BF%BD";
                continue;
              }
              i += encodeURIComponent(e[t]);
            }
            return i;
          }
          ((a.defaultChars = ";/?:@&=+$,-_.!~*'()#"),
            (a.componentChars = "-_.!~*'()"),
            (r.default = a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      i95uM: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e) {
            let t = "";
            return (
              (t +=
                (e.protocol || "") +
                (e.slashes ? "//" : "") +
                (e.auth ? e.auth + "@" : "")),
              e.hostname && -1 !== e.hostname.indexOf(":")
                ? (t += "[" + e.hostname + "]")
                : (t += e.hostname || ""),
              (t +=
                (e.port ? ":" + e.port : "") +
                (e.pathname || "") +
                (e.search || "") +
                (e.hash || ""))
            );
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      f6pSM: [
        function (e, t, r) {
          function n() {
            ((this.protocol = null),
              (this.slashes = null),
              (this.auth = null),
              (this.port = null),
              (this.hostname = null),
              (this.hash = null),
              (this.search = null),
              (this.pathname = null));
          }
          e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
            r,
          );
          let a = /^([a-z0-9.+-]+:)/i,
            o = /:[0-9]*$/,
            i = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            s = ["{", "}", "|", "\\", "^", "`"].concat([
              "<",
              ">",
              '"',
              "`",
              " ",
              "\r",
              "\n",
              "	",
            ]),
            l = ["'"].concat(s),
            c = ["%", "/", "?", ";", "#"].concat(l),
            u = ["/", "?", "#"],
            p = /^[+a-z0-9A-Z_-]{0,63}$/,
            d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            f = { javascript: !0, "javascript:": !0 },
            h = {
              http: !0,
              https: !0,
              ftp: !0,
              gopher: !0,
              file: !0,
              "http:": !0,
              "https:": !0,
              "ftp:": !0,
              "gopher:": !0,
              "file:": !0,
            };
          ((n.prototype.parse = function (e, t) {
            let r, n, o;
            let s = e;
            if (((s = s.trim()), !t && 1 === e.split("#").length)) {
              let e = i.exec(s);
              if (e)
                return (
                  (this.pathname = e[1]),
                  e[2] && (this.search = e[2]),
                  this
                );
            }
            let l = a.exec(s);
            if (
              (l &&
                ((r = (l = l[0]).toLowerCase()),
                (this.protocol = l),
                (s = s.substr(l.length))),
              (t || l || s.match(/^\/\/[^@\/]+@[^@\/]+/)) &&
                (o = "//" === s.substr(0, 2)) &&
                !(l && f[l]) &&
                ((s = s.substr(2)), (this.slashes = !0)),
              !f[l] && (o || (l && !h[l])))
            ) {
              let e,
                t,
                r = -1;
              for (let e = 0; e < u.length; e++)
                -1 !== (n = s.indexOf(u[e])) && (-1 === r || n < r) && (r = n);
              (-1 !==
                (t = -1 === r ? s.lastIndexOf("@") : s.lastIndexOf("@", r)) &&
                ((e = s.slice(0, t)), (s = s.slice(t + 1)), (this.auth = e)),
                (r = -1));
              for (let e = 0; e < c.length; e++)
                -1 !== (n = s.indexOf(c[e])) && (-1 === r || n < r) && (r = n);
              (-1 === r && (r = s.length), ":" === s[r - 1] && r--);
              let a = s.slice(0, r);
              ((s = s.slice(r)),
                this.parseHost(a),
                (this.hostname = this.hostname || ""));
              let o =
                "[" === this.hostname[0] &&
                "]" === this.hostname[this.hostname.length - 1];
              if (!o) {
                let e = this.hostname.split(/\./);
                for (let t = 0, r = e.length; t < r; t++) {
                  let r = e[t];
                  if (r && !r.match(p)) {
                    let n = "";
                    for (let e = 0, t = r.length; e < t; e++)
                      r.charCodeAt(e) > 127 ? (n += "x") : (n += r[e]);
                    if (!n.match(p)) {
                      let n = e.slice(0, t),
                        a = e.slice(t + 1),
                        o = r.match(d);
                      (o && (n.push(o[1]), a.unshift(o[2])),
                        a.length && (s = a.join(".") + s),
                        (this.hostname = n.join(".")));
                      break;
                    }
                  }
                }
              }
              (this.hostname.length > 255 && (this.hostname = ""),
                o &&
                  (this.hostname = this.hostname.substr(
                    1,
                    this.hostname.length - 2,
                  )));
            }
            let m = s.indexOf("#");
            -1 !== m && ((this.hash = s.substr(m)), (s = s.slice(0, m)));
            let g = s.indexOf("?");
            return (
              -1 !== g && ((this.search = s.substr(g)), (s = s.slice(0, g))),
              s && (this.pathname = s),
              h[r] && this.hostname && !this.pathname && (this.pathname = ""),
              this
            );
          }),
            (n.prototype.parseHost = function (e) {
              let t = o.exec(e);
              (t &&
                (":" !== (t = t[0]) && (this.port = t.substr(1)),
                (e = e.substr(0, e.length - t.length))),
                e && (this.hostname = e));
            }),
            (r.default = function (e, t) {
              if (e && e instanceof n) return e;
              let r = new n();
              return (r.parse(e, t), r);
            }));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "4euC3": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "Any", () => o.default),
            n.export(r, "Cc", () => s.default),
            n.export(r, "Cf", () => c.default),
            n.export(r, "P", () => p.default),
            n.export(r, "S", () => f.default),
            n.export(r, "Z", () => m.default));
          var a = e("./properties/Any/regex.mjs"),
            o = n.interopDefault(a),
            i = e("./categories/Cc/regex.mjs"),
            s = n.interopDefault(i),
            l = e("./categories/Cf/regex.mjs"),
            c = n.interopDefault(l),
            u = e("./categories/P/regex.mjs"),
            p = n.interopDefault(u),
            d = e("./categories/S/regex.mjs"),
            f = n.interopDefault(d),
            h = e("./categories/Z/regex.mjs"),
            m = n.interopDefault(h);
        },
        {
          "./properties/Any/regex.mjs": "cZzkK",
          "./categories/Cc/regex.mjs": "7xoYr",
          "./categories/Cf/regex.mjs": "gpz4N",
          "./categories/P/regex.mjs": "8SE3A",
          "./categories/S/regex.mjs": "eYuVm",
          "./categories/Z/regex.mjs": "37MLf",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      cZzkK: [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default =
              /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "7xoYr": [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = /[\0-\x1F\x7F-\x9F]/));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      gpz4N: [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default =
              /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "8SE3A": [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default =
              /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      eYuVm: [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default =
              /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "37MLf": [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default =
              /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      gEAz9: [
        function (e, t, r) {
          var n,
            a,
            o,
            i,
            s = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (s.defineInteropFlag(r),
            s.export(r, "encodeXML", () => u.encodeXML),
            s.export(r, "escape", () => u.escape),
            s.export(r, "escapeUTF8", () => u.escapeUTF8),
            s.export(r, "escapeAttribute", () => u.escapeAttribute),
            s.export(r, "escapeText", () => u.escapeText),
            s.export(r, "encodeHTML", () => c.encodeHTML),
            s.export(r, "encodeNonAsciiHTML", () => c.encodeNonAsciiHTML),
            s.export(r, "encodeHTML4", () => c.encodeHTML),
            s.export(r, "encodeHTML5", () => c.encodeHTML),
            s.export(r, "EntityDecoder", () => l.EntityDecoder),
            s.export(r, "DecodingMode", () => l.DecodingMode),
            s.export(r, "decodeXML", () => l.decodeXML),
            s.export(r, "decodeHTML", () => l.decodeHTML),
            s.export(r, "decodeHTMLStrict", () => l.decodeHTMLStrict),
            s.export(r, "decodeHTMLAttribute", () => l.decodeHTMLAttribute),
            s.export(r, "decodeHTML4", () => l.decodeHTML),
            s.export(r, "decodeHTML5", () => l.decodeHTML),
            s.export(r, "decodeHTML4Strict", () => l.decodeHTMLStrict),
            s.export(r, "decodeHTML5Strict", () => l.decodeHTMLStrict),
            s.export(r, "decodeXMLStrict", () => l.decodeXML),
            s.export(r, "EntityLevel", () => o),
            s.export(r, "EncodingMode", () => i),
            s.export(r, "decode", () => p),
            s.export(r, "decodeStrict", () => d),
            s.export(r, "encode", () => f));
          var l = e("./decode.js"),
            c = e("./encode.js"),
            u = e("./escape.js");
          function p(e, t = o.XML) {
            let r = "number" == typeof t ? t : t.level;
            if (r === o.HTML) {
              let r = "object" == typeof t ? t.mode : void 0;
              return (0, l.decodeHTML)(e, r);
            }
            return (0, l.decodeXML)(e);
          }
          function d(e, t = o.XML) {
            var r;
            let n = "number" == typeof t ? { level: t } : t;
            return (
              (null !== (r = n.mode) && void 0 !== r) ||
                (n.mode = l.DecodingMode.Strict),
              p(e, n)
            );
          }
          function f(e, t = o.XML) {
            let r = "number" == typeof t ? { level: t } : t;
            return r.mode === i.UTF8
              ? (0, u.escapeUTF8)(e)
              : r.mode === i.Attribute
                ? (0, u.escapeAttribute)(e)
                : r.mode === i.Text
                  ? (0, u.escapeText)(e)
                  : r.level === o.HTML
                    ? r.mode === i.ASCII
                      ? (0, c.encodeNonAsciiHTML)(e)
                      : (0, c.encodeHTML)(e)
                    : (0, u.encodeXML)(e);
          }
          (((n = o || (o = {}))[(n.XML = 0)] = "XML"),
            (n[(n.HTML = 1)] = "HTML"),
            ((a = i || (i = {}))[(a.UTF8 = 0)] = "UTF8"),
            (a[(a.ASCII = 1)] = "ASCII"),
            (a[(a.Extensive = 2)] = "Extensive"),
            (a[(a.Attribute = 3)] = "Attribute"),
            (a[(a.Text = 4)] = "Text"));
        },
        {
          "./decode.js": "5FqPY",
          "./encode.js": "cCSuF",
          "./escape.js": "hqshJ",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "5FqPY": [
        function (e, t, r) {
          var n,
            a,
            o,
            i,
            s,
            l,
            c,
            u,
            p = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (p.defineInteropFlag(r),
            p.export(r, "replaceCodePoint", () => g.replaceCodePoint),
            p.export(r, "fromCodePoint", () => g.fromCodePoint),
            p.export(r, "htmlDecodeTree", () => f.default),
            p.export(r, "xmlDecodeTree", () => m.default),
            p.export(r, "decodeCodePoint", () => b.default),
            p.export(r, "BinTrieFlags", () => l),
            p.export(r, "DecodingMode", () => u),
            p.export(r, "EntityDecoder", () => y),
            p.export(r, "determineBranch", () => k),
            p.export(r, "decodeHTML", () => A),
            p.export(r, "decodeHTMLAttribute", () => C),
            p.export(r, "decodeHTMLStrict", () => E),
            p.export(r, "decodeXML", () => j));
          var d = e("./generated/decode-data-html.js"),
            f = p.interopDefault(d),
            h = e("./generated/decode-data-xml.js"),
            m = p.interopDefault(h),
            g = e("./decode_codepoint.js"),
            b = p.interopDefault(g);
          function x(e) {
            return e >= s.ZERO && e <= s.NINE;
          }
          (((n = s || (s = {}))[(n.NUM = 35)] = "NUM"),
            (n[(n.SEMI = 59)] = "SEMI"),
            (n[(n.EQUALS = 61)] = "EQUALS"),
            (n[(n.ZERO = 48)] = "ZERO"),
            (n[(n.NINE = 57)] = "NINE"),
            (n[(n.LOWER_A = 97)] = "LOWER_A"),
            (n[(n.LOWER_F = 102)] = "LOWER_F"),
            (n[(n.LOWER_X = 120)] = "LOWER_X"),
            (n[(n.LOWER_Z = 122)] = "LOWER_Z"),
            (n[(n.UPPER_A = 65)] = "UPPER_A"),
            (n[(n.UPPER_F = 70)] = "UPPER_F"),
            (n[(n.UPPER_Z = 90)] = "UPPER_Z"),
            ((a = l || (l = {}))[(a.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
            (a[(a.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
            (a[(a.JUMP_TABLE = 127)] = "JUMP_TABLE"),
            ((o = c || (c = {}))[(o.EntityStart = 0)] = "EntityStart"),
            (o[(o.NumericStart = 1)] = "NumericStart"),
            (o[(o.NumericDecimal = 2)] = "NumericDecimal"),
            (o[(o.NumericHex = 3)] = "NumericHex"),
            (o[(o.NamedEntity = 4)] = "NamedEntity"),
            ((i = u || (u = {}))[(i.Legacy = 0)] = "Legacy"),
            (i[(i.Strict = 1)] = "Strict"),
            (i[(i.Attribute = 2)] = "Attribute"));
          class y {
            constructor(e, t, r) {
              ((this.decodeTree = e),
                (this.emitCodePoint = t),
                (this.errors = r),
                (this.state = c.EntityStart),
                (this.consumed = 1),
                (this.result = 0),
                (this.treeIndex = 0),
                (this.excess = 1),
                (this.decodeMode = u.Strict));
            }
            startEntity(e) {
              ((this.decodeMode = e),
                (this.state = c.EntityStart),
                (this.result = 0),
                (this.treeIndex = 0),
                (this.excess = 1),
                (this.consumed = 1));
            }
            write(e, t) {
              switch (this.state) {
                case c.EntityStart:
                  if (e.charCodeAt(t) === s.NUM)
                    return (
                      (this.state = c.NumericStart),
                      (this.consumed += 1),
                      this.stateNumericStart(e, t + 1)
                    );
                  return (
                    (this.state = c.NamedEntity),
                    this.stateNamedEntity(e, t)
                  );
                case c.NumericStart:
                  return this.stateNumericStart(e, t);
                case c.NumericDecimal:
                  return this.stateNumericDecimal(e, t);
                case c.NumericHex:
                  return this.stateNumericHex(e, t);
                case c.NamedEntity:
                  return this.stateNamedEntity(e, t);
              }
            }
            stateNumericStart(e, t) {
              return t >= e.length
                ? -1
                : (32 | e.charCodeAt(t)) === s.LOWER_X
                  ? ((this.state = c.NumericHex),
                    (this.consumed += 1),
                    this.stateNumericHex(e, t + 1))
                  : ((this.state = c.NumericDecimal),
                    this.stateNumericDecimal(e, t));
            }
            addToNumericResult(e, t, r, n) {
              if (t !== r) {
                let a = r - t;
                ((this.result =
                  this.result * Math.pow(n, a) + parseInt(e.substr(t, a), n)),
                  (this.consumed += a));
              }
            }
            stateNumericHex(e, t) {
              let r = t;
              for (; t < e.length;) {
                var n;
                let a = e.charCodeAt(t);
                if (
                  !x(a) &&
                  (!((n = a) >= s.UPPER_A) || !(n <= s.UPPER_F)) &&
                  (!(n >= s.LOWER_A) || !(n <= s.LOWER_F))
                )
                  return (
                    this.addToNumericResult(e, r, t, 16),
                    this.emitNumericEntity(a, 3)
                  );
                t += 1;
              }
              return (this.addToNumericResult(e, r, t, 16), -1);
            }
            stateNumericDecimal(e, t) {
              let r = t;
              for (; t < e.length;) {
                let n = e.charCodeAt(t);
                if (!x(n))
                  return (
                    this.addToNumericResult(e, r, t, 10),
                    this.emitNumericEntity(n, 2)
                  );
                t += 1;
              }
              return (this.addToNumericResult(e, r, t, 10), -1);
            }
            emitNumericEntity(e, t) {
              var r;
              if (this.consumed <= t)
                return (
                  null === (r = this.errors) ||
                    void 0 === r ||
                    r.absenceOfDigitsInNumericCharacterReference(this.consumed),
                  0
                );
              if (e === s.SEMI) this.consumed += 1;
              else if (this.decodeMode === u.Strict) return 0;
              return (
                this.emitCodePoint(
                  (0, g.replaceCodePoint)(this.result),
                  this.consumed,
                ),
                this.errors &&
                  (e !== s.SEMI &&
                    this.errors.missingSemicolonAfterCharacterReference(),
                  this.errors.validateNumericCharacterReference(this.result)),
                this.consumed
              );
            }
            stateNamedEntity(e, t) {
              let { decodeTree: r } = this,
                n = r[this.treeIndex],
                a = (n & l.VALUE_LENGTH) >> 14;
              for (; t < e.length; t++, this.excess++) {
                let o = e.charCodeAt(t);
                if (
                  ((this.treeIndex = k(
                    r,
                    n,
                    this.treeIndex + Math.max(1, a),
                    o,
                  )),
                  this.treeIndex < 0)
                )
                  return 0 === this.result ||
                    (this.decodeMode === u.Attribute &&
                      (0 === a ||
                        (function (e) {
                          var t;
                          return (
                            e === s.EQUALS ||
                            ((t = e) >= s.UPPER_A && t <= s.UPPER_Z) ||
                            (t >= s.LOWER_A && t <= s.LOWER_Z) ||
                            x(t)
                          );
                        })(o)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
                if (
                  0 != (a = ((n = r[this.treeIndex]) & l.VALUE_LENGTH) >> 14)
                ) {
                  if (o === s.SEMI)
                    return this.emitNamedEntityData(
                      this.treeIndex,
                      a,
                      this.consumed + this.excess,
                    );
                  this.decodeMode !== u.Strict &&
                    ((this.result = this.treeIndex),
                    (this.consumed += this.excess),
                    (this.excess = 0));
                }
              }
              return -1;
            }
            emitNotTerminatedNamedEntity() {
              var e;
              let { result: t, decodeTree: r } = this,
                n = (r[t] & l.VALUE_LENGTH) >> 14;
              return (
                this.emitNamedEntityData(t, n, this.consumed),
                null === (e = this.errors) ||
                  void 0 === e ||
                  e.missingSemicolonAfterCharacterReference(),
                this.consumed
              );
            }
            emitNamedEntityData(e, t, r) {
              let { decodeTree: n } = this;
              return (
                this.emitCodePoint(
                  1 === t ? n[e] & ~l.VALUE_LENGTH : n[e + 1],
                  r,
                ),
                3 === t && this.emitCodePoint(n[e + 2], r),
                r
              );
            }
            end() {
              var e;
              switch (this.state) {
                case c.NamedEntity:
                  return 0 !== this.result &&
                    (this.decodeMode !== u.Attribute ||
                      this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
                case c.NumericDecimal:
                  return this.emitNumericEntity(0, 2);
                case c.NumericHex:
                  return this.emitNumericEntity(0, 3);
                case c.NumericStart:
                  return (
                    null === (e = this.errors) ||
                      void 0 === e ||
                      e.absenceOfDigitsInNumericCharacterReference(
                        this.consumed,
                      ),
                    0
                  );
                case c.EntityStart:
                  return 0;
              }
            }
          }
          function v(e) {
            let t = "",
              r = new y(e, (e) => (t += (0, g.fromCodePoint)(e)));
            return function (e, n) {
              let a = 0,
                o = 0;
              for (; (o = e.indexOf("&", o)) >= 0;) {
                ((t += e.slice(a, o)), r.startEntity(n));
                let i = r.write(e, o + 1);
                if (i < 0) {
                  a = o + r.end();
                  break;
                }
                ((a = o + i), (o = 0 === i ? a + 1 : a));
              }
              let i = t + e.slice(a);
              return ((t = ""), i);
            };
          }
          function k(e, t, r, n) {
            let a = (t & l.BRANCH_LENGTH) >> 7,
              o = t & l.JUMP_TABLE;
            if (0 === a) return 0 !== o && n === o ? r : -1;
            if (o) {
              let t = n - o;
              return t < 0 || t >= a ? -1 : e[r + t] - 1;
            }
            let i = r,
              s = i + a - 1;
            for (; i <= s;) {
              let t = (i + s) >>> 1,
                r = e[t];
              if (r < n) i = t + 1;
              else {
                if (!(r > n)) return e[t + a];
                s = t - 1;
              }
            }
            return -1;
          }
          let w = v(f.default),
            _ = v(m.default);
          function A(e, t = u.Legacy) {
            return w(e, t);
          }
          function C(e) {
            return w(e, u.Attribute);
          }
          function E(e) {
            return w(e, u.Strict);
          }
          function j(e) {
            return _(e, u.Strict);
          }
        },
        {
          "./generated/decode-data-html.js": "8Wnjb",
          "./generated/decode-data-xml.js": "jwR2C",
          "./decode_codepoint.js": "a9TwM",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "8Wnjb": [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = new Uint16Array(
              '\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\x00\x00\x00\x00\x00\x00\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\x00\x00\x00\u0342\u0354\x00\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\x00\x00\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\x00\x00\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\x00\u0446\x00\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\x00\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\x00\x00\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\x00\x00\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\x00\u05bf\x00\x00\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\x00\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\x00\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\x00\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\x00\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\x00\u08c3bleBracket;\u67e6n\u01d4\u08c8\x00\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\x00\u1005bleBracket;\u67e7n\u01d4\u100a\x00\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\x00\x00\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\x00\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\x00\u132c\u1331\x00\x00\x00\x00\x00\u1338\u133d\u1377\u1385\x00\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\x00\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\x00\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\x00\u15b0\u15b6\u15bf\x00\x00\x00\x00\u15c6\u15db\u15eb\u165f\u166d\x00\u1695\u169b\u16b2\u16b9\x00\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\x00\x00\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\x00\x00\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\x00\u1833\u01b2\u182f\x00\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\x00\u19e8\u1a11\u1a15\u1a32\x00\u1a37\u1a50\x00\x00\u1ab4\x00\x00\u1ac1\x00\x00\u1b21\u1b2e\u1b4d\u1b52\x00\u1bfd\x00\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\x00\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\x00\x00\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\x00\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\x00\x00\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\x00\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\x00\x00\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\x00\x00\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\x00\x00\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\x00\x00\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\x00\x00\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\x00\u1f9e\x00\u1fa1\u1fa7\x00\x00\u1fc6\u1fcc\x00\u1fd3\x00\u1fe6\u1fea\u2000\x00\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\x00\x00\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\x00\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\x00\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\x00\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\x00\u2036;\u6154;\u6156\u02b4\u203e\u2041\x00\x00\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\x00\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\x00\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\x00\u22aa\x00\u22b8\u22c5\u22ce\x00\u22d5\u22f3\x00\x00\u22f8\u2322\u2367\u2362\u237f\x00\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\x00\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\x00\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\x00\u24aa\x00\u24b1\x00\x00\x00\x00\x00\u24b5\u24ba\x00\u24c6\u24c8\u24cd\x00\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\x00\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\x00\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\x00\x00\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u2d2d\x00\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\x00\x00\u2d8d\u2dab\x00\u2dc8\u2dce\x00\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\x00\x00\u2d7c\x00\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\x00\u2e7d\x00\u2e80\u2e9d\x00\u2ea2\u2eb9\x00\x00\u2ecb\u0e9c\x00\u2f13\x00\x00\u2f2b\u2fbc\x00\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\x00\x00\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\x00\u337a\u33a4\x00\x00\u33ec\u33f0\x00\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\x00\u3616\x00\x00\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\x00\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\x00\x00\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\x00\u367e\u36c2\x00\x00\x00\x00\x00\u36db\u3703\x00\u3709\u376c\x00\x00\x00\u3787\u0272\u3656\x00\x00\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\x00\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\x00\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\x00\x00\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\x00\x00\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\x00\u3a8b\x00\u3a90\u3a9b\x00\x00\u3a9d\u3aa8\u3aab\u3aaf\x00\x00\u3ac3\u3ace\x00\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c'
                .split("")
                .map((e) => e.charCodeAt(0)),
            )));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      jwR2C: [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = new Uint16Array(
              "\u0200aglq	\x15\x18\x1b\u026d\x0f\x00\x00\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
                .split("")
                .map((e) => e.charCodeAt(0)),
            )));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      a9TwM: [
        function (e, t, r) {
          var n,
            a = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (a.defineInteropFlag(r),
            a.export(r, "fromCodePoint", () => i),
            a.export(r, "replaceCodePoint", () => s),
            a.export(r, "default", () => l));
          let o = new Map([
              [0, 65533],
              [128, 8364],
              [130, 8218],
              [131, 402],
              [132, 8222],
              [133, 8230],
              [134, 8224],
              [135, 8225],
              [136, 710],
              [137, 8240],
              [138, 352],
              [139, 8249],
              [140, 338],
              [142, 381],
              [145, 8216],
              [146, 8217],
              [147, 8220],
              [148, 8221],
              [149, 8226],
              [150, 8211],
              [151, 8212],
              [152, 732],
              [153, 8482],
              [154, 353],
              [155, 8250],
              [156, 339],
              [158, 382],
              [159, 376],
            ]),
            i =
              null !== (n = String.fromCodePoint) && void 0 !== n
                ? n
                : function (e) {
                    let t = "";
                    return (
                      e > 65535 &&
                        ((e -= 65536),
                        (t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
                        (e = 56320 | (1023 & e))),
                      (t += String.fromCharCode(e))
                    );
                  };
          function s(e) {
            var t;
            return (e >= 55296 && e <= 57343) || e > 1114111
              ? 65533
              : null !== (t = o.get(e)) && void 0 !== t
                ? t
                : e;
          }
          function l(e) {
            return i(s(e));
          }
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      cCSuF: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "encodeHTML", () => l),
            n.export(r, "encodeNonAsciiHTML", () => c));
          var a = e("./generated/encode-html.js"),
            o = n.interopDefault(a),
            i = e("./escape.js");
          let s = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
          function l(e) {
            return u(s, e);
          }
          function c(e) {
            return u(i.xmlReplacer, e);
          }
          function u(e, t) {
            let r,
              n = "",
              a = 0;
            for (; null !== (r = e.exec(t));) {
              let s = r.index;
              n += t.substring(a, s);
              let l = t.charCodeAt(s),
                c = (0, o.default).get(l);
              if ("object" == typeof c) {
                if (s + 1 < t.length) {
                  let r = t.charCodeAt(s + 1),
                    o =
                      "number" == typeof c.n
                        ? c.n === r
                          ? c.o
                          : void 0
                        : c.n.get(r);
                  if (void 0 !== o) {
                    ((n += o), (a = e.lastIndex += 1));
                    continue;
                  }
                }
                c = c.v;
              }
              if (void 0 !== c) ((n += c), (a = s + 1));
              else {
                let r = (0, i.getCodePoint)(t, s);
                ((n += `&#x${r.toString(16)};`),
                  (a = e.lastIndex += Number(r !== l)));
              }
            }
            return n + t.substr(a);
          }
        },
        {
          "./generated/encode-html.js": "4pgRy",
          "./escape.js": "hqshJ",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "4pgRy": [
        function (e, t, r) {
          function n(e) {
            for (let t = 1; t < e.length; t++) e[t][0] += e[t - 1][0] + 1;
            return e;
          }
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = new Map(
              n([
                [9, "&Tab;"],
                [0, "&NewLine;"],
                [22, "&excl;"],
                [0, "&quot;"],
                [0, "&num;"],
                [0, "&dollar;"],
                [0, "&percnt;"],
                [0, "&amp;"],
                [0, "&apos;"],
                [0, "&lpar;"],
                [0, "&rpar;"],
                [0, "&ast;"],
                [0, "&plus;"],
                [0, "&comma;"],
                [1, "&period;"],
                [0, "&sol;"],
                [10, "&colon;"],
                [0, "&semi;"],
                [0, { v: "&lt;", n: 8402, o: "&nvlt;" }],
                [0, { v: "&equals;", n: 8421, o: "&bne;" }],
                [0, { v: "&gt;", n: 8402, o: "&nvgt;" }],
                [0, "&quest;"],
                [0, "&commat;"],
                [26, "&lbrack;"],
                [0, "&bsol;"],
                [0, "&rbrack;"],
                [0, "&Hat;"],
                [0, "&lowbar;"],
                [0, "&DiacriticalGrave;"],
                [5, { n: 106, o: "&fjlig;" }],
                [20, "&lbrace;"],
                [0, "&verbar;"],
                [0, "&rbrace;"],
                [34, "&nbsp;"],
                [0, "&iexcl;"],
                [0, "&cent;"],
                [0, "&pound;"],
                [0, "&curren;"],
                [0, "&yen;"],
                [0, "&brvbar;"],
                [0, "&sect;"],
                [0, "&die;"],
                [0, "&copy;"],
                [0, "&ordf;"],
                [0, "&laquo;"],
                [0, "&not;"],
                [0, "&shy;"],
                [0, "&circledR;"],
                [0, "&macr;"],
                [0, "&deg;"],
                [0, "&PlusMinus;"],
                [0, "&sup2;"],
                [0, "&sup3;"],
                [0, "&acute;"],
                [0, "&micro;"],
                [0, "&para;"],
                [0, "&centerdot;"],
                [0, "&cedil;"],
                [0, "&sup1;"],
                [0, "&ordm;"],
                [0, "&raquo;"],
                [0, "&frac14;"],
                [0, "&frac12;"],
                [0, "&frac34;"],
                [0, "&iquest;"],
                [0, "&Agrave;"],
                [0, "&Aacute;"],
                [0, "&Acirc;"],
                [0, "&Atilde;"],
                [0, "&Auml;"],
                [0, "&angst;"],
                [0, "&AElig;"],
                [0, "&Ccedil;"],
                [0, "&Egrave;"],
                [0, "&Eacute;"],
                [0, "&Ecirc;"],
                [0, "&Euml;"],
                [0, "&Igrave;"],
                [0, "&Iacute;"],
                [0, "&Icirc;"],
                [0, "&Iuml;"],
                [0, "&ETH;"],
                [0, "&Ntilde;"],
                [0, "&Ograve;"],
                [0, "&Oacute;"],
                [0, "&Ocirc;"],
                [0, "&Otilde;"],
                [0, "&Ouml;"],
                [0, "&times;"],
                [0, "&Oslash;"],
                [0, "&Ugrave;"],
                [0, "&Uacute;"],
                [0, "&Ucirc;"],
                [0, "&Uuml;"],
                [0, "&Yacute;"],
                [0, "&THORN;"],
                [0, "&szlig;"],
                [0, "&agrave;"],
                [0, "&aacute;"],
                [0, "&acirc;"],
                [0, "&atilde;"],
                [0, "&auml;"],
                [0, "&aring;"],
                [0, "&aelig;"],
                [0, "&ccedil;"],
                [0, "&egrave;"],
                [0, "&eacute;"],
                [0, "&ecirc;"],
                [0, "&euml;"],
                [0, "&igrave;"],
                [0, "&iacute;"],
                [0, "&icirc;"],
                [0, "&iuml;"],
                [0, "&eth;"],
                [0, "&ntilde;"],
                [0, "&ograve;"],
                [0, "&oacute;"],
                [0, "&ocirc;"],
                [0, "&otilde;"],
                [0, "&ouml;"],
                [0, "&div;"],
                [0, "&oslash;"],
                [0, "&ugrave;"],
                [0, "&uacute;"],
                [0, "&ucirc;"],
                [0, "&uuml;"],
                [0, "&yacute;"],
                [0, "&thorn;"],
                [0, "&yuml;"],
                [0, "&Amacr;"],
                [0, "&amacr;"],
                [0, "&Abreve;"],
                [0, "&abreve;"],
                [0, "&Aogon;"],
                [0, "&aogon;"],
                [0, "&Cacute;"],
                [0, "&cacute;"],
                [0, "&Ccirc;"],
                [0, "&ccirc;"],
                [0, "&Cdot;"],
                [0, "&cdot;"],
                [0, "&Ccaron;"],
                [0, "&ccaron;"],
                [0, "&Dcaron;"],
                [0, "&dcaron;"],
                [0, "&Dstrok;"],
                [0, "&dstrok;"],
                [0, "&Emacr;"],
                [0, "&emacr;"],
                [2, "&Edot;"],
                [0, "&edot;"],
                [0, "&Eogon;"],
                [0, "&eogon;"],
                [0, "&Ecaron;"],
                [0, "&ecaron;"],
                [0, "&Gcirc;"],
                [0, "&gcirc;"],
                [0, "&Gbreve;"],
                [0, "&gbreve;"],
                [0, "&Gdot;"],
                [0, "&gdot;"],
                [0, "&Gcedil;"],
                [1, "&Hcirc;"],
                [0, "&hcirc;"],
                [0, "&Hstrok;"],
                [0, "&hstrok;"],
                [0, "&Itilde;"],
                [0, "&itilde;"],
                [0, "&Imacr;"],
                [0, "&imacr;"],
                [2, "&Iogon;"],
                [0, "&iogon;"],
                [0, "&Idot;"],
                [0, "&imath;"],
                [0, "&IJlig;"],
                [0, "&ijlig;"],
                [0, "&Jcirc;"],
                [0, "&jcirc;"],
                [0, "&Kcedil;"],
                [0, "&kcedil;"],
                [0, "&kgreen;"],
                [0, "&Lacute;"],
                [0, "&lacute;"],
                [0, "&Lcedil;"],
                [0, "&lcedil;"],
                [0, "&Lcaron;"],
                [0, "&lcaron;"],
                [0, "&Lmidot;"],
                [0, "&lmidot;"],
                [0, "&Lstrok;"],
                [0, "&lstrok;"],
                [0, "&Nacute;"],
                [0, "&nacute;"],
                [0, "&Ncedil;"],
                [0, "&ncedil;"],
                [0, "&Ncaron;"],
                [0, "&ncaron;"],
                [0, "&napos;"],
                [0, "&ENG;"],
                [0, "&eng;"],
                [0, "&Omacr;"],
                [0, "&omacr;"],
                [2, "&Odblac;"],
                [0, "&odblac;"],
                [0, "&OElig;"],
                [0, "&oelig;"],
                [0, "&Racute;"],
                [0, "&racute;"],
                [0, "&Rcedil;"],
                [0, "&rcedil;"],
                [0, "&Rcaron;"],
                [0, "&rcaron;"],
                [0, "&Sacute;"],
                [0, "&sacute;"],
                [0, "&Scirc;"],
                [0, "&scirc;"],
                [0, "&Scedil;"],
                [0, "&scedil;"],
                [0, "&Scaron;"],
                [0, "&scaron;"],
                [0, "&Tcedil;"],
                [0, "&tcedil;"],
                [0, "&Tcaron;"],
                [0, "&tcaron;"],
                [0, "&Tstrok;"],
                [0, "&tstrok;"],
                [0, "&Utilde;"],
                [0, "&utilde;"],
                [0, "&Umacr;"],
                [0, "&umacr;"],
                [0, "&Ubreve;"],
                [0, "&ubreve;"],
                [0, "&Uring;"],
                [0, "&uring;"],
                [0, "&Udblac;"],
                [0, "&udblac;"],
                [0, "&Uogon;"],
                [0, "&uogon;"],
                [0, "&Wcirc;"],
                [0, "&wcirc;"],
                [0, "&Ycirc;"],
                [0, "&ycirc;"],
                [0, "&Yuml;"],
                [0, "&Zacute;"],
                [0, "&zacute;"],
                [0, "&Zdot;"],
                [0, "&zdot;"],
                [0, "&Zcaron;"],
                [0, "&zcaron;"],
                [19, "&fnof;"],
                [34, "&imped;"],
                [63, "&gacute;"],
                [65, "&jmath;"],
                [142, "&circ;"],
                [0, "&caron;"],
                [16, "&breve;"],
                [0, "&DiacriticalDot;"],
                [0, "&ring;"],
                [0, "&ogon;"],
                [0, "&DiacriticalTilde;"],
                [0, "&dblac;"],
                [51, "&DownBreve;"],
                [127, "&Alpha;"],
                [0, "&Beta;"],
                [0, "&Gamma;"],
                [0, "&Delta;"],
                [0, "&Epsilon;"],
                [0, "&Zeta;"],
                [0, "&Eta;"],
                [0, "&Theta;"],
                [0, "&Iota;"],
                [0, "&Kappa;"],
                [0, "&Lambda;"],
                [0, "&Mu;"],
                [0, "&Nu;"],
                [0, "&Xi;"],
                [0, "&Omicron;"],
                [0, "&Pi;"],
                [0, "&Rho;"],
                [1, "&Sigma;"],
                [0, "&Tau;"],
                [0, "&Upsilon;"],
                [0, "&Phi;"],
                [0, "&Chi;"],
                [0, "&Psi;"],
                [0, "&ohm;"],
                [7, "&alpha;"],
                [0, "&beta;"],
                [0, "&gamma;"],
                [0, "&delta;"],
                [0, "&epsi;"],
                [0, "&zeta;"],
                [0, "&eta;"],
                [0, "&theta;"],
                [0, "&iota;"],
                [0, "&kappa;"],
                [0, "&lambda;"],
                [0, "&mu;"],
                [0, "&nu;"],
                [0, "&xi;"],
                [0, "&omicron;"],
                [0, "&pi;"],
                [0, "&rho;"],
                [0, "&sigmaf;"],
                [0, "&sigma;"],
                [0, "&tau;"],
                [0, "&upsi;"],
                [0, "&phi;"],
                [0, "&chi;"],
                [0, "&psi;"],
                [0, "&omega;"],
                [7, "&thetasym;"],
                [0, "&Upsi;"],
                [2, "&phiv;"],
                [0, "&piv;"],
                [5, "&Gammad;"],
                [0, "&digamma;"],
                [18, "&kappav;"],
                [0, "&rhov;"],
                [3, "&epsiv;"],
                [0, "&backepsilon;"],
                [10, "&IOcy;"],
                [0, "&DJcy;"],
                [0, "&GJcy;"],
                [0, "&Jukcy;"],
                [0, "&DScy;"],
                [0, "&Iukcy;"],
                [0, "&YIcy;"],
                [0, "&Jsercy;"],
                [0, "&LJcy;"],
                [0, "&NJcy;"],
                [0, "&TSHcy;"],
                [0, "&KJcy;"],
                [1, "&Ubrcy;"],
                [0, "&DZcy;"],
                [0, "&Acy;"],
                [0, "&Bcy;"],
                [0, "&Vcy;"],
                [0, "&Gcy;"],
                [0, "&Dcy;"],
                [0, "&IEcy;"],
                [0, "&ZHcy;"],
                [0, "&Zcy;"],
                [0, "&Icy;"],
                [0, "&Jcy;"],
                [0, "&Kcy;"],
                [0, "&Lcy;"],
                [0, "&Mcy;"],
                [0, "&Ncy;"],
                [0, "&Ocy;"],
                [0, "&Pcy;"],
                [0, "&Rcy;"],
                [0, "&Scy;"],
                [0, "&Tcy;"],
                [0, "&Ucy;"],
                [0, "&Fcy;"],
                [0, "&KHcy;"],
                [0, "&TScy;"],
                [0, "&CHcy;"],
                [0, "&SHcy;"],
                [0, "&SHCHcy;"],
                [0, "&HARDcy;"],
                [0, "&Ycy;"],
                [0, "&SOFTcy;"],
                [0, "&Ecy;"],
                [0, "&YUcy;"],
                [0, "&YAcy;"],
                [0, "&acy;"],
                [0, "&bcy;"],
                [0, "&vcy;"],
                [0, "&gcy;"],
                [0, "&dcy;"],
                [0, "&iecy;"],
                [0, "&zhcy;"],
                [0, "&zcy;"],
                [0, "&icy;"],
                [0, "&jcy;"],
                [0, "&kcy;"],
                [0, "&lcy;"],
                [0, "&mcy;"],
                [0, "&ncy;"],
                [0, "&ocy;"],
                [0, "&pcy;"],
                [0, "&rcy;"],
                [0, "&scy;"],
                [0, "&tcy;"],
                [0, "&ucy;"],
                [0, "&fcy;"],
                [0, "&khcy;"],
                [0, "&tscy;"],
                [0, "&chcy;"],
                [0, "&shcy;"],
                [0, "&shchcy;"],
                [0, "&hardcy;"],
                [0, "&ycy;"],
                [0, "&softcy;"],
                [0, "&ecy;"],
                [0, "&yucy;"],
                [0, "&yacy;"],
                [1, "&iocy;"],
                [0, "&djcy;"],
                [0, "&gjcy;"],
                [0, "&jukcy;"],
                [0, "&dscy;"],
                [0, "&iukcy;"],
                [0, "&yicy;"],
                [0, "&jsercy;"],
                [0, "&ljcy;"],
                [0, "&njcy;"],
                [0, "&tshcy;"],
                [0, "&kjcy;"],
                [1, "&ubrcy;"],
                [0, "&dzcy;"],
                [7074, "&ensp;"],
                [0, "&emsp;"],
                [0, "&emsp13;"],
                [0, "&emsp14;"],
                [1, "&numsp;"],
                [0, "&puncsp;"],
                [0, "&ThinSpace;"],
                [0, "&hairsp;"],
                [0, "&NegativeMediumSpace;"],
                [0, "&zwnj;"],
                [0, "&zwj;"],
                [0, "&lrm;"],
                [0, "&rlm;"],
                [0, "&dash;"],
                [2, "&ndash;"],
                [0, "&mdash;"],
                [0, "&horbar;"],
                [0, "&Verbar;"],
                [1, "&lsquo;"],
                [0, "&CloseCurlyQuote;"],
                [0, "&lsquor;"],
                [1, "&ldquo;"],
                [0, "&CloseCurlyDoubleQuote;"],
                [0, "&bdquo;"],
                [1, "&dagger;"],
                [0, "&Dagger;"],
                [0, "&bull;"],
                [2, "&nldr;"],
                [0, "&hellip;"],
                [9, "&permil;"],
                [0, "&pertenk;"],
                [0, "&prime;"],
                [0, "&Prime;"],
                [0, "&tprime;"],
                [0, "&backprime;"],
                [3, "&lsaquo;"],
                [0, "&rsaquo;"],
                [3, "&oline;"],
                [2, "&caret;"],
                [1, "&hybull;"],
                [0, "&frasl;"],
                [10, "&bsemi;"],
                [7, "&qprime;"],
                [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }],
                [0, "&NoBreak;"],
                [0, "&af;"],
                [0, "&InvisibleTimes;"],
                [0, "&ic;"],
                [72, "&euro;"],
                [46, "&tdot;"],
                [0, "&DotDot;"],
                [37, "&complexes;"],
                [2, "&incare;"],
                [4, "&gscr;"],
                [0, "&hamilt;"],
                [0, "&Hfr;"],
                [0, "&Hopf;"],
                [0, "&planckh;"],
                [0, "&hbar;"],
                [0, "&imagline;"],
                [0, "&Ifr;"],
                [0, "&lagran;"],
                [0, "&ell;"],
                [1, "&naturals;"],
                [0, "&numero;"],
                [0, "&copysr;"],
                [0, "&weierp;"],
                [0, "&Popf;"],
                [0, "&Qopf;"],
                [0, "&realine;"],
                [0, "&real;"],
                [0, "&reals;"],
                [0, "&rx;"],
                [3, "&trade;"],
                [1, "&integers;"],
                [2, "&mho;"],
                [0, "&zeetrf;"],
                [0, "&iiota;"],
                [2, "&bernou;"],
                [0, "&Cayleys;"],
                [1, "&escr;"],
                [0, "&Escr;"],
                [0, "&Fouriertrf;"],
                [1, "&Mellintrf;"],
                [0, "&order;"],
                [0, "&alefsym;"],
                [0, "&beth;"],
                [0, "&gimel;"],
                [0, "&daleth;"],
                [12, "&CapitalDifferentialD;"],
                [0, "&dd;"],
                [0, "&ee;"],
                [0, "&ii;"],
                [10, "&frac13;"],
                [0, "&frac23;"],
                [0, "&frac15;"],
                [0, "&frac25;"],
                [0, "&frac35;"],
                [0, "&frac45;"],
                [0, "&frac16;"],
                [0, "&frac56;"],
                [0, "&frac18;"],
                [0, "&frac38;"],
                [0, "&frac58;"],
                [0, "&frac78;"],
                [49, "&larr;"],
                [0, "&ShortUpArrow;"],
                [0, "&rarr;"],
                [0, "&darr;"],
                [0, "&harr;"],
                [0, "&updownarrow;"],
                [0, "&nwarr;"],
                [0, "&nearr;"],
                [0, "&LowerRightArrow;"],
                [0, "&LowerLeftArrow;"],
                [0, "&nlarr;"],
                [0, "&nrarr;"],
                [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }],
                [0, "&Larr;"],
                [0, "&Uarr;"],
                [0, "&Rarr;"],
                [0, "&Darr;"],
                [0, "&larrtl;"],
                [0, "&rarrtl;"],
                [0, "&LeftTeeArrow;"],
                [0, "&mapstoup;"],
                [0, "&map;"],
                [0, "&DownTeeArrow;"],
                [1, "&hookleftarrow;"],
                [0, "&hookrightarrow;"],
                [0, "&larrlp;"],
                [0, "&looparrowright;"],
                [0, "&harrw;"],
                [0, "&nharr;"],
                [1, "&lsh;"],
                [0, "&rsh;"],
                [0, "&ldsh;"],
                [0, "&rdsh;"],
                [1, "&crarr;"],
                [0, "&cularr;"],
                [0, "&curarr;"],
                [2, "&circlearrowleft;"],
                [0, "&circlearrowright;"],
                [0, "&leftharpoonup;"],
                [0, "&DownLeftVector;"],
                [0, "&RightUpVector;"],
                [0, "&LeftUpVector;"],
                [0, "&rharu;"],
                [0, "&DownRightVector;"],
                [0, "&dharr;"],
                [0, "&dharl;"],
                [0, "&RightArrowLeftArrow;"],
                [0, "&udarr;"],
                [0, "&LeftArrowRightArrow;"],
                [0, "&leftleftarrows;"],
                [0, "&upuparrows;"],
                [0, "&rightrightarrows;"],
                [0, "&ddarr;"],
                [0, "&leftrightharpoons;"],
                [0, "&Equilibrium;"],
                [0, "&nlArr;"],
                [0, "&nhArr;"],
                [0, "&nrArr;"],
                [0, "&DoubleLeftArrow;"],
                [0, "&DoubleUpArrow;"],
                [0, "&DoubleRightArrow;"],
                [0, "&dArr;"],
                [0, "&DoubleLeftRightArrow;"],
                [0, "&DoubleUpDownArrow;"],
                [0, "&nwArr;"],
                [0, "&neArr;"],
                [0, "&seArr;"],
                [0, "&swArr;"],
                [0, "&lAarr;"],
                [0, "&rAarr;"],
                [1, "&zigrarr;"],
                [6, "&larrb;"],
                [0, "&rarrb;"],
                [15, "&DownArrowUpArrow;"],
                [7, "&loarr;"],
                [0, "&roarr;"],
                [0, "&hoarr;"],
                [0, "&forall;"],
                [0, "&comp;"],
                [0, { v: "&part;", n: 824, o: "&npart;" }],
                [0, "&exist;"],
                [0, "&nexist;"],
                [0, "&empty;"],
                [1, "&Del;"],
                [0, "&Element;"],
                [0, "&NotElement;"],
                [1, "&ni;"],
                [0, "&notni;"],
                [2, "&prod;"],
                [0, "&coprod;"],
                [0, "&sum;"],
                [0, "&minus;"],
                [0, "&MinusPlus;"],
                [0, "&dotplus;"],
                [1, "&Backslash;"],
                [0, "&lowast;"],
                [0, "&compfn;"],
                [1, "&radic;"],
                [2, "&prop;"],
                [0, "&infin;"],
                [0, "&angrt;"],
                [0, { v: "&ang;", n: 8402, o: "&nang;" }],
                [0, "&angmsd;"],
                [0, "&angsph;"],
                [0, "&mid;"],
                [0, "&nmid;"],
                [0, "&DoubleVerticalBar;"],
                [0, "&NotDoubleVerticalBar;"],
                [0, "&and;"],
                [0, "&or;"],
                [0, { v: "&cap;", n: 65024, o: "&caps;" }],
                [0, { v: "&cup;", n: 65024, o: "&cups;" }],
                [0, "&int;"],
                [0, "&Int;"],
                [0, "&iiint;"],
                [0, "&conint;"],
                [0, "&Conint;"],
                [0, "&Cconint;"],
                [0, "&cwint;"],
                [0, "&ClockwiseContourIntegral;"],
                [0, "&awconint;"],
                [0, "&there4;"],
                [0, "&becaus;"],
                [0, "&ratio;"],
                [0, "&Colon;"],
                [0, "&dotminus;"],
                [1, "&mDDot;"],
                [0, "&homtht;"],
                [0, { v: "&sim;", n: 8402, o: "&nvsim;" }],
                [0, { v: "&backsim;", n: 817, o: "&race;" }],
                [0, { v: "&ac;", n: 819, o: "&acE;" }],
                [0, "&acd;"],
                [0, "&VerticalTilde;"],
                [0, "&NotTilde;"],
                [0, { v: "&eqsim;", n: 824, o: "&nesim;" }],
                [0, "&sime;"],
                [0, "&NotTildeEqual;"],
                [0, "&cong;"],
                [0, "&simne;"],
                [0, "&ncong;"],
                [0, "&ap;"],
                [0, "&nap;"],
                [0, "&ape;"],
                [0, { v: "&apid;", n: 824, o: "&napid;" }],
                [0, "&backcong;"],
                [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }],
                [0, { v: "&bump;", n: 824, o: "&nbump;" }],
                [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }],
                [0, { v: "&doteq;", n: 824, o: "&nedot;" }],
                [0, "&doteqdot;"],
                [0, "&efDot;"],
                [0, "&erDot;"],
                [0, "&Assign;"],
                [0, "&ecolon;"],
                [0, "&ecir;"],
                [0, "&circeq;"],
                [1, "&wedgeq;"],
                [0, "&veeeq;"],
                [1, "&triangleq;"],
                [2, "&equest;"],
                [0, "&ne;"],
                [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }],
                [0, "&nequiv;"],
                [1, { v: "&le;", n: 8402, o: "&nvle;" }],
                [0, { v: "&ge;", n: 8402, o: "&nvge;" }],
                [0, { v: "&lE;", n: 824, o: "&nlE;" }],
                [0, { v: "&gE;", n: 824, o: "&ngE;" }],
                [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }],
                [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }],
                [
                  0,
                  {
                    v: "&ll;",
                    n: new Map(
                      n([
                        [824, "&nLtv;"],
                        [7577, "&nLt;"],
                      ]),
                    ),
                  },
                ],
                [
                  0,
                  {
                    v: "&gg;",
                    n: new Map(
                      n([
                        [824, "&nGtv;"],
                        [7577, "&nGt;"],
                      ]),
                    ),
                  },
                ],
                [0, "&between;"],
                [0, "&NotCupCap;"],
                [0, "&nless;"],
                [0, "&ngt;"],
                [0, "&nle;"],
                [0, "&nge;"],
                [0, "&lesssim;"],
                [0, "&GreaterTilde;"],
                [0, "&nlsim;"],
                [0, "&ngsim;"],
                [0, "&LessGreater;"],
                [0, "&gl;"],
                [0, "&NotLessGreater;"],
                [0, "&NotGreaterLess;"],
                [0, "&pr;"],
                [0, "&sc;"],
                [0, "&prcue;"],
                [0, "&sccue;"],
                [0, "&PrecedesTilde;"],
                [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }],
                [0, "&NotPrecedes;"],
                [0, "&NotSucceeds;"],
                [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }],
                [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }],
                [0, "&nsub;"],
                [0, "&nsup;"],
                [0, "&sube;"],
                [0, "&supe;"],
                [0, "&NotSubsetEqual;"],
                [0, "&NotSupersetEqual;"],
                [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }],
                [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }],
                [1, "&cupdot;"],
                [0, "&UnionPlus;"],
                [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }],
                [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }],
                [0, "&sqsube;"],
                [0, "&sqsupe;"],
                [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }],
                [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }],
                [0, "&CirclePlus;"],
                [0, "&CircleMinus;"],
                [0, "&CircleTimes;"],
                [0, "&osol;"],
                [0, "&CircleDot;"],
                [0, "&circledcirc;"],
                [0, "&circledast;"],
                [1, "&circleddash;"],
                [0, "&boxplus;"],
                [0, "&boxminus;"],
                [0, "&boxtimes;"],
                [0, "&dotsquare;"],
                [0, "&RightTee;"],
                [0, "&dashv;"],
                [0, "&DownTee;"],
                [0, "&bot;"],
                [1, "&models;"],
                [0, "&DoubleRightTee;"],
                [0, "&Vdash;"],
                [0, "&Vvdash;"],
                [0, "&VDash;"],
                [0, "&nvdash;"],
                [0, "&nvDash;"],
                [0, "&nVdash;"],
                [0, "&nVDash;"],
                [0, "&prurel;"],
                [1, "&LeftTriangle;"],
                [0, "&RightTriangle;"],
                [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }],
                [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }],
                [0, "&origof;"],
                [0, "&imof;"],
                [0, "&multimap;"],
                [0, "&hercon;"],
                [0, "&intcal;"],
                [0, "&veebar;"],
                [1, "&barvee;"],
                [0, "&angrtvb;"],
                [0, "&lrtri;"],
                [0, "&bigwedge;"],
                [0, "&bigvee;"],
                [0, "&bigcap;"],
                [0, "&bigcup;"],
                [0, "&diam;"],
                [0, "&sdot;"],
                [0, "&sstarf;"],
                [0, "&divideontimes;"],
                [0, "&bowtie;"],
                [0, "&ltimes;"],
                [0, "&rtimes;"],
                [0, "&leftthreetimes;"],
                [0, "&rightthreetimes;"],
                [0, "&backsimeq;"],
                [0, "&curlyvee;"],
                [0, "&curlywedge;"],
                [0, "&Sub;"],
                [0, "&Sup;"],
                [0, "&Cap;"],
                [0, "&Cup;"],
                [0, "&fork;"],
                [0, "&epar;"],
                [0, "&lessdot;"],
                [0, "&gtdot;"],
                [0, { v: "&Ll;", n: 824, o: "&nLl;" }],
                [0, { v: "&Gg;", n: 824, o: "&nGg;" }],
                [0, { v: "&leg;", n: 65024, o: "&lesg;" }],
                [0, { v: "&gel;", n: 65024, o: "&gesl;" }],
                [2, "&cuepr;"],
                [0, "&cuesc;"],
                [0, "&NotPrecedesSlantEqual;"],
                [0, "&NotSucceedsSlantEqual;"],
                [0, "&NotSquareSubsetEqual;"],
                [0, "&NotSquareSupersetEqual;"],
                [2, "&lnsim;"],
                [0, "&gnsim;"],
                [0, "&precnsim;"],
                [0, "&scnsim;"],
                [0, "&nltri;"],
                [0, "&NotRightTriangle;"],
                [0, "&nltrie;"],
                [0, "&NotRightTriangleEqual;"],
                [0, "&vellip;"],
                [0, "&ctdot;"],
                [0, "&utdot;"],
                [0, "&dtdot;"],
                [0, "&disin;"],
                [0, "&isinsv;"],
                [0, "&isins;"],
                [0, { v: "&isindot;", n: 824, o: "&notindot;" }],
                [0, "&notinvc;"],
                [0, "&notinvb;"],
                [1, { v: "&isinE;", n: 824, o: "&notinE;" }],
                [0, "&nisd;"],
                [0, "&xnis;"],
                [0, "&nis;"],
                [0, "&notnivc;"],
                [0, "&notnivb;"],
                [6, "&barwed;"],
                [0, "&Barwed;"],
                [1, "&lceil;"],
                [0, "&rceil;"],
                [0, "&LeftFloor;"],
                [0, "&rfloor;"],
                [0, "&drcrop;"],
                [0, "&dlcrop;"],
                [0, "&urcrop;"],
                [0, "&ulcrop;"],
                [0, "&bnot;"],
                [1, "&profline;"],
                [0, "&profsurf;"],
                [1, "&telrec;"],
                [0, "&target;"],
                [5, "&ulcorn;"],
                [0, "&urcorn;"],
                [0, "&dlcorn;"],
                [0, "&drcorn;"],
                [2, "&frown;"],
                [0, "&smile;"],
                [9, "&cylcty;"],
                [0, "&profalar;"],
                [7, "&topbot;"],
                [6, "&ovbar;"],
                [1, "&solbar;"],
                [60, "&angzarr;"],
                [51, "&lmoustache;"],
                [0, "&rmoustache;"],
                [2, "&OverBracket;"],
                [0, "&bbrk;"],
                [0, "&bbrktbrk;"],
                [37, "&OverParenthesis;"],
                [0, "&UnderParenthesis;"],
                [0, "&OverBrace;"],
                [0, "&UnderBrace;"],
                [2, "&trpezium;"],
                [4, "&elinters;"],
                [59, "&blank;"],
                [164, "&circledS;"],
                [55, "&boxh;"],
                [1, "&boxv;"],
                [9, "&boxdr;"],
                [3, "&boxdl;"],
                [3, "&boxur;"],
                [3, "&boxul;"],
                [3, "&boxvr;"],
                [7, "&boxvl;"],
                [7, "&boxhd;"],
                [7, "&boxhu;"],
                [7, "&boxvh;"],
                [19, "&boxH;"],
                [0, "&boxV;"],
                [0, "&boxdR;"],
                [0, "&boxDr;"],
                [0, "&boxDR;"],
                [0, "&boxdL;"],
                [0, "&boxDl;"],
                [0, "&boxDL;"],
                [0, "&boxuR;"],
                [0, "&boxUr;"],
                [0, "&boxUR;"],
                [0, "&boxuL;"],
                [0, "&boxUl;"],
                [0, "&boxUL;"],
                [0, "&boxvR;"],
                [0, "&boxVr;"],
                [0, "&boxVR;"],
                [0, "&boxvL;"],
                [0, "&boxVl;"],
                [0, "&boxVL;"],
                [0, "&boxHd;"],
                [0, "&boxhD;"],
                [0, "&boxHD;"],
                [0, "&boxHu;"],
                [0, "&boxhU;"],
                [0, "&boxHU;"],
                [0, "&boxvH;"],
                [0, "&boxVh;"],
                [0, "&boxVH;"],
                [19, "&uhblk;"],
                [3, "&lhblk;"],
                [3, "&block;"],
                [8, "&blk14;"],
                [0, "&blk12;"],
                [0, "&blk34;"],
                [13, "&square;"],
                [8, "&blacksquare;"],
                [0, "&EmptyVerySmallSquare;"],
                [1, "&rect;"],
                [0, "&marker;"],
                [2, "&fltns;"],
                [1, "&bigtriangleup;"],
                [0, "&blacktriangle;"],
                [0, "&triangle;"],
                [2, "&blacktriangleright;"],
                [0, "&rtri;"],
                [3, "&bigtriangledown;"],
                [0, "&blacktriangledown;"],
                [0, "&dtri;"],
                [2, "&blacktriangleleft;"],
                [0, "&ltri;"],
                [6, "&loz;"],
                [0, "&cir;"],
                [32, "&tridot;"],
                [2, "&bigcirc;"],
                [8, "&ultri;"],
                [0, "&urtri;"],
                [0, "&lltri;"],
                [0, "&EmptySmallSquare;"],
                [0, "&FilledSmallSquare;"],
                [8, "&bigstar;"],
                [0, "&star;"],
                [7, "&phone;"],
                [49, "&female;"],
                [1, "&male;"],
                [29, "&spades;"],
                [2, "&clubs;"],
                [1, "&hearts;"],
                [0, "&diamondsuit;"],
                [3, "&sung;"],
                [2, "&flat;"],
                [0, "&natural;"],
                [0, "&sharp;"],
                [163, "&check;"],
                [3, "&cross;"],
                [8, "&malt;"],
                [21, "&sext;"],
                [33, "&VerticalSeparator;"],
                [25, "&lbbrk;"],
                [0, "&rbbrk;"],
                [84, "&bsolhsub;"],
                [0, "&suphsol;"],
                [28, "&LeftDoubleBracket;"],
                [0, "&RightDoubleBracket;"],
                [0, "&lang;"],
                [0, "&rang;"],
                [0, "&Lang;"],
                [0, "&Rang;"],
                [0, "&loang;"],
                [0, "&roang;"],
                [7, "&longleftarrow;"],
                [0, "&longrightarrow;"],
                [0, "&longleftrightarrow;"],
                [0, "&DoubleLongLeftArrow;"],
                [0, "&DoubleLongRightArrow;"],
                [0, "&DoubleLongLeftRightArrow;"],
                [1, "&longmapsto;"],
                [2, "&dzigrarr;"],
                [258, "&nvlArr;"],
                [0, "&nvrArr;"],
                [0, "&nvHarr;"],
                [0, "&Map;"],
                [6, "&lbarr;"],
                [0, "&bkarow;"],
                [0, "&lBarr;"],
                [0, "&dbkarow;"],
                [0, "&drbkarow;"],
                [0, "&DDotrahd;"],
                [0, "&UpArrowBar;"],
                [0, "&DownArrowBar;"],
                [2, "&Rarrtl;"],
                [2, "&latail;"],
                [0, "&ratail;"],
                [0, "&lAtail;"],
                [0, "&rAtail;"],
                [0, "&larrfs;"],
                [0, "&rarrfs;"],
                [0, "&larrbfs;"],
                [0, "&rarrbfs;"],
                [2, "&nwarhk;"],
                [0, "&nearhk;"],
                [0, "&hksearow;"],
                [0, "&hkswarow;"],
                [0, "&nwnear;"],
                [0, "&nesear;"],
                [0, "&seswar;"],
                [0, "&swnwar;"],
                [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }],
                [1, "&cudarrr;"],
                [0, "&ldca;"],
                [0, "&rdca;"],
                [0, "&cudarrl;"],
                [0, "&larrpl;"],
                [2, "&curarrm;"],
                [0, "&cularrp;"],
                [7, "&rarrpl;"],
                [2, "&harrcir;"],
                [0, "&Uarrocir;"],
                [0, "&lurdshar;"],
                [0, "&ldrushar;"],
                [2, "&LeftRightVector;"],
                [0, "&RightUpDownVector;"],
                [0, "&DownLeftRightVector;"],
                [0, "&LeftUpDownVector;"],
                [0, "&LeftVectorBar;"],
                [0, "&RightVectorBar;"],
                [0, "&RightUpVectorBar;"],
                [0, "&RightDownVectorBar;"],
                [0, "&DownLeftVectorBar;"],
                [0, "&DownRightVectorBar;"],
                [0, "&LeftUpVectorBar;"],
                [0, "&LeftDownVectorBar;"],
                [0, "&LeftTeeVector;"],
                [0, "&RightTeeVector;"],
                [0, "&RightUpTeeVector;"],
                [0, "&RightDownTeeVector;"],
                [0, "&DownLeftTeeVector;"],
                [0, "&DownRightTeeVector;"],
                [0, "&LeftUpTeeVector;"],
                [0, "&LeftDownTeeVector;"],
                [0, "&lHar;"],
                [0, "&uHar;"],
                [0, "&rHar;"],
                [0, "&dHar;"],
                [0, "&luruhar;"],
                [0, "&ldrdhar;"],
                [0, "&ruluhar;"],
                [0, "&rdldhar;"],
                [0, "&lharul;"],
                [0, "&llhard;"],
                [0, "&rharul;"],
                [0, "&lrhard;"],
                [0, "&udhar;"],
                [0, "&duhar;"],
                [0, "&RoundImplies;"],
                [0, "&erarr;"],
                [0, "&simrarr;"],
                [0, "&larrsim;"],
                [0, "&rarrsim;"],
                [0, "&rarrap;"],
                [0, "&ltlarr;"],
                [1, "&gtrarr;"],
                [0, "&subrarr;"],
                [1, "&suplarr;"],
                [0, "&lfisht;"],
                [0, "&rfisht;"],
                [0, "&ufisht;"],
                [0, "&dfisht;"],
                [5, "&lopar;"],
                [0, "&ropar;"],
                [4, "&lbrke;"],
                [0, "&rbrke;"],
                [0, "&lbrkslu;"],
                [0, "&rbrksld;"],
                [0, "&lbrksld;"],
                [0, "&rbrkslu;"],
                [0, "&langd;"],
                [0, "&rangd;"],
                [0, "&lparlt;"],
                [0, "&rpargt;"],
                [0, "&gtlPar;"],
                [0, "&ltrPar;"],
                [3, "&vzigzag;"],
                [1, "&vangrt;"],
                [0, "&angrtvbd;"],
                [6, "&ange;"],
                [0, "&range;"],
                [0, "&dwangle;"],
                [0, "&uwangle;"],
                [0, "&angmsdaa;"],
                [0, "&angmsdab;"],
                [0, "&angmsdac;"],
                [0, "&angmsdad;"],
                [0, "&angmsdae;"],
                [0, "&angmsdaf;"],
                [0, "&angmsdag;"],
                [0, "&angmsdah;"],
                [0, "&bemptyv;"],
                [0, "&demptyv;"],
                [0, "&cemptyv;"],
                [0, "&raemptyv;"],
                [0, "&laemptyv;"],
                [0, "&ohbar;"],
                [0, "&omid;"],
                [0, "&opar;"],
                [1, "&operp;"],
                [1, "&olcross;"],
                [0, "&odsold;"],
                [1, "&olcir;"],
                [0, "&ofcir;"],
                [0, "&olt;"],
                [0, "&ogt;"],
                [0, "&cirscir;"],
                [0, "&cirE;"],
                [0, "&solb;"],
                [0, "&bsolb;"],
                [3, "&boxbox;"],
                [3, "&trisb;"],
                [0, "&rtriltri;"],
                [
                  0,
                  { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" },
                ],
                [
                  0,
                  {
                    v: "&RightTriangleBar;",
                    n: 824,
                    o: "&NotRightTriangleBar;",
                  },
                ],
                [11, "&iinfin;"],
                [0, "&infintie;"],
                [0, "&nvinfin;"],
                [4, "&eparsl;"],
                [0, "&smeparsl;"],
                [0, "&eqvparsl;"],
                [5, "&blacklozenge;"],
                [8, "&RuleDelayed;"],
                [1, "&dsol;"],
                [9, "&bigodot;"],
                [0, "&bigoplus;"],
                [0, "&bigotimes;"],
                [1, "&biguplus;"],
                [1, "&bigsqcup;"],
                [5, "&iiiint;"],
                [0, "&fpartint;"],
                [2, "&cirfnint;"],
                [0, "&awint;"],
                [0, "&rppolint;"],
                [0, "&scpolint;"],
                [0, "&npolint;"],
                [0, "&pointint;"],
                [0, "&quatint;"],
                [0, "&intlarhk;"],
                [10, "&pluscir;"],
                [0, "&plusacir;"],
                [0, "&simplus;"],
                [0, "&plusdu;"],
                [0, "&plussim;"],
                [0, "&plustwo;"],
                [1, "&mcomma;"],
                [0, "&minusdu;"],
                [2, "&loplus;"],
                [0, "&roplus;"],
                [0, "&Cross;"],
                [0, "&timesd;"],
                [0, "&timesbar;"],
                [1, "&smashp;"],
                [0, "&lotimes;"],
                [0, "&rotimes;"],
                [0, "&otimesas;"],
                [0, "&Otimes;"],
                [0, "&odiv;"],
                [0, "&triplus;"],
                [0, "&triminus;"],
                [0, "&tritime;"],
                [0, "&intprod;"],
                [2, "&amalg;"],
                [0, "&capdot;"],
                [1, "&ncup;"],
                [0, "&ncap;"],
                [0, "&capand;"],
                [0, "&cupor;"],
                [0, "&cupcap;"],
                [0, "&capcup;"],
                [0, "&cupbrcap;"],
                [0, "&capbrcup;"],
                [0, "&cupcup;"],
                [0, "&capcap;"],
                [0, "&ccups;"],
                [0, "&ccaps;"],
                [2, "&ccupssm;"],
                [2, "&And;"],
                [0, "&Or;"],
                [0, "&andand;"],
                [0, "&oror;"],
                [0, "&orslope;"],
                [0, "&andslope;"],
                [1, "&andv;"],
                [0, "&orv;"],
                [0, "&andd;"],
                [0, "&ord;"],
                [1, "&wedbar;"],
                [6, "&sdote;"],
                [3, "&simdot;"],
                [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }],
                [0, "&easter;"],
                [0, "&apacir;"],
                [0, { v: "&apE;", n: 824, o: "&napE;" }],
                [0, "&eplus;"],
                [0, "&pluse;"],
                [0, "&Esim;"],
                [0, "&Colone;"],
                [0, "&Equal;"],
                [1, "&ddotseq;"],
                [0, "&equivDD;"],
                [0, "&ltcir;"],
                [0, "&gtcir;"],
                [0, "&ltquest;"],
                [0, "&gtquest;"],
                [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }],
                [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }],
                [0, "&lesdot;"],
                [0, "&gesdot;"],
                [0, "&lesdoto;"],
                [0, "&gesdoto;"],
                [0, "&lesdotor;"],
                [0, "&gesdotol;"],
                [0, "&lap;"],
                [0, "&gap;"],
                [0, "&lne;"],
                [0, "&gne;"],
                [0, "&lnap;"],
                [0, "&gnap;"],
                [0, "&lEg;"],
                [0, "&gEl;"],
                [0, "&lsime;"],
                [0, "&gsime;"],
                [0, "&lsimg;"],
                [0, "&gsiml;"],
                [0, "&lgE;"],
                [0, "&glE;"],
                [0, "&lesges;"],
                [0, "&gesles;"],
                [0, "&els;"],
                [0, "&egs;"],
                [0, "&elsdot;"],
                [0, "&egsdot;"],
                [0, "&el;"],
                [0, "&eg;"],
                [2, "&siml;"],
                [0, "&simg;"],
                [0, "&simlE;"],
                [0, "&simgE;"],
                [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }],
                [
                  0,
                  {
                    v: "&GreaterGreater;",
                    n: 824,
                    o: "&NotNestedGreaterGreater;",
                  },
                ],
                [1, "&glj;"],
                [0, "&gla;"],
                [0, "&ltcc;"],
                [0, "&gtcc;"],
                [0, "&lescc;"],
                [0, "&gescc;"],
                [0, "&smt;"],
                [0, "&lat;"],
                [0, { v: "&smte;", n: 65024, o: "&smtes;" }],
                [0, { v: "&late;", n: 65024, o: "&lates;" }],
                [0, "&bumpE;"],
                [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }],
                [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }],
                [2, "&prE;"],
                [0, "&scE;"],
                [0, "&precneqq;"],
                [0, "&scnE;"],
                [0, "&prap;"],
                [0, "&scap;"],
                [0, "&precnapprox;"],
                [0, "&scnap;"],
                [0, "&Pr;"],
                [0, "&Sc;"],
                [0, "&subdot;"],
                [0, "&supdot;"],
                [0, "&subplus;"],
                [0, "&supplus;"],
                [0, "&submult;"],
                [0, "&supmult;"],
                [0, "&subedot;"],
                [0, "&supedot;"],
                [0, { v: "&subE;", n: 824, o: "&nsubE;" }],
                [0, { v: "&supE;", n: 824, o: "&nsupE;" }],
                [0, "&subsim;"],
                [0, "&supsim;"],
                [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }],
                [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }],
                [2, "&csub;"],
                [0, "&csup;"],
                [0, "&csube;"],
                [0, "&csupe;"],
                [0, "&subsup;"],
                [0, "&supsub;"],
                [0, "&subsub;"],
                [0, "&supsup;"],
                [0, "&suphsub;"],
                [0, "&supdsub;"],
                [0, "&forkv;"],
                [0, "&topfork;"],
                [0, "&mlcp;"],
                [8, "&Dashv;"],
                [1, "&Vdashl;"],
                [0, "&Barv;"],
                [0, "&vBar;"],
                [0, "&vBarv;"],
                [1, "&Vbar;"],
                [0, "&Not;"],
                [0, "&bNot;"],
                [0, "&rnmid;"],
                [0, "&cirmid;"],
                [0, "&midcir;"],
                [0, "&topcir;"],
                [0, "&nhpar;"],
                [0, "&parsim;"],
                [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }],
                [
                  44343,
                  {
                    n: new Map(
                      n([
                        [56476, "&Ascr;"],
                        [1, "&Cscr;"],
                        [0, "&Dscr;"],
                        [2, "&Gscr;"],
                        [2, "&Jscr;"],
                        [0, "&Kscr;"],
                        [2, "&Nscr;"],
                        [0, "&Oscr;"],
                        [0, "&Pscr;"],
                        [0, "&Qscr;"],
                        [1, "&Sscr;"],
                        [0, "&Tscr;"],
                        [0, "&Uscr;"],
                        [0, "&Vscr;"],
                        [0, "&Wscr;"],
                        [0, "&Xscr;"],
                        [0, "&Yscr;"],
                        [0, "&Zscr;"],
                        [0, "&ascr;"],
                        [0, "&bscr;"],
                        [0, "&cscr;"],
                        [0, "&dscr;"],
                        [1, "&fscr;"],
                        [1, "&hscr;"],
                        [0, "&iscr;"],
                        [0, "&jscr;"],
                        [0, "&kscr;"],
                        [0, "&lscr;"],
                        [0, "&mscr;"],
                        [0, "&nscr;"],
                        [1, "&pscr;"],
                        [0, "&qscr;"],
                        [0, "&rscr;"],
                        [0, "&sscr;"],
                        [0, "&tscr;"],
                        [0, "&uscr;"],
                        [0, "&vscr;"],
                        [0, "&wscr;"],
                        [0, "&xscr;"],
                        [0, "&yscr;"],
                        [0, "&zscr;"],
                        [52, "&Afr;"],
                        [0, "&Bfr;"],
                        [1, "&Dfr;"],
                        [0, "&Efr;"],
                        [0, "&Ffr;"],
                        [0, "&Gfr;"],
                        [2, "&Jfr;"],
                        [0, "&Kfr;"],
                        [0, "&Lfr;"],
                        [0, "&Mfr;"],
                        [0, "&Nfr;"],
                        [0, "&Ofr;"],
                        [0, "&Pfr;"],
                        [0, "&Qfr;"],
                        [1, "&Sfr;"],
                        [0, "&Tfr;"],
                        [0, "&Ufr;"],
                        [0, "&Vfr;"],
                        [0, "&Wfr;"],
                        [0, "&Xfr;"],
                        [0, "&Yfr;"],
                        [1, "&afr;"],
                        [0, "&bfr;"],
                        [0, "&cfr;"],
                        [0, "&dfr;"],
                        [0, "&efr;"],
                        [0, "&ffr;"],
                        [0, "&gfr;"],
                        [0, "&hfr;"],
                        [0, "&ifr;"],
                        [0, "&jfr;"],
                        [0, "&kfr;"],
                        [0, "&lfr;"],
                        [0, "&mfr;"],
                        [0, "&nfr;"],
                        [0, "&ofr;"],
                        [0, "&pfr;"],
                        [0, "&qfr;"],
                        [0, "&rfr;"],
                        [0, "&sfr;"],
                        [0, "&tfr;"],
                        [0, "&ufr;"],
                        [0, "&vfr;"],
                        [0, "&wfr;"],
                        [0, "&xfr;"],
                        [0, "&yfr;"],
                        [0, "&zfr;"],
                        [0, "&Aopf;"],
                        [0, "&Bopf;"],
                        [1, "&Dopf;"],
                        [0, "&Eopf;"],
                        [0, "&Fopf;"],
                        [0, "&Gopf;"],
                        [1, "&Iopf;"],
                        [0, "&Jopf;"],
                        [0, "&Kopf;"],
                        [0, "&Lopf;"],
                        [0, "&Mopf;"],
                        [1, "&Oopf;"],
                        [3, "&Sopf;"],
                        [0, "&Topf;"],
                        [0, "&Uopf;"],
                        [0, "&Vopf;"],
                        [0, "&Wopf;"],
                        [0, "&Xopf;"],
                        [0, "&Yopf;"],
                        [1, "&aopf;"],
                        [0, "&bopf;"],
                        [0, "&copf;"],
                        [0, "&dopf;"],
                        [0, "&eopf;"],
                        [0, "&fopf;"],
                        [0, "&gopf;"],
                        [0, "&hopf;"],
                        [0, "&iopf;"],
                        [0, "&jopf;"],
                        [0, "&kopf;"],
                        [0, "&lopf;"],
                        [0, "&mopf;"],
                        [0, "&nopf;"],
                        [0, "&oopf;"],
                        [0, "&popf;"],
                        [0, "&qopf;"],
                        [0, "&ropf;"],
                        [0, "&sopf;"],
                        [0, "&topf;"],
                        [0, "&uopf;"],
                        [0, "&vopf;"],
                        [0, "&wopf;"],
                        [0, "&xopf;"],
                        [0, "&yopf;"],
                        [0, "&zopf;"],
                      ]),
                    ),
                  },
                ],
                [8906, "&fflig;"],
                [0, "&filig;"],
                [0, "&fllig;"],
                [0, "&ffilig;"],
                [0, "&ffllig;"],
              ]),
            )));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      hqshJ: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "xmlReplacer", () => a),
            n.export(r, "getCodePoint", () => i),
            n.export(r, "encodeXML", () => s),
            n.export(r, "escape", () => l),
            n.export(r, "escapeUTF8", () => u),
            n.export(r, "escapeAttribute", () => p),
            n.export(r, "escapeText", () => d));
          let a = /["&'<>$\x80-\uFFFF]/g,
            o = new Map([
              [34, "&quot;"],
              [38, "&amp;"],
              [39, "&apos;"],
              [60, "&lt;"],
              [62, "&gt;"],
            ]),
            i =
              null != String.prototype.codePointAt
                ? (e, t) => e.codePointAt(t)
                : (e, t) =>
                    (64512 & e.charCodeAt(t)) == 55296
                      ? (e.charCodeAt(t) - 55296) * 1024 +
                        e.charCodeAt(t + 1) -
                        56320 +
                        65536
                      : e.charCodeAt(t);
          function s(e) {
            let t,
              r = "",
              n = 0;
            for (; null !== (t = a.exec(e));) {
              let s = t.index,
                l = e.charCodeAt(s),
                c = o.get(l);
              void 0 !== c
                ? ((r += e.substring(n, s) + c), (n = s + 1))
                : ((r += `${e.substring(n, s)}&#x${i(e, s).toString(16)};`),
                  (n = a.lastIndex += Number((64512 & l) == 55296)));
            }
            return r + e.substr(n);
          }
          let l = s;
          function c(e, t) {
            return function (r) {
              let n;
              let a = 0,
                o = "";
              for (; (n = e.exec(r));)
                (a !== n.index && (o += r.substring(a, n.index)),
                  (o += t.get(n[0].charCodeAt(0))),
                  (a = n.index + 1));
              return o + r.substring(a);
            };
          }
          let u = c(/[&<>'"]/g, o),
            p = c(
              /["&\u00A0]/g,
              new Map([
                [34, "&quot;"],
                [38, "&amp;"],
                [160, "&nbsp;"],
              ]),
            ),
            d = c(
              /[&<>\u00A0]/g,
              new Map([
                [38, "&amp;"],
                [60, "&lt;"],
                [62, "&gt;"],
                [160, "&nbsp;"],
              ]),
            );
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      i8sNd: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "parseLinkLabel", () => o.default),
            n.export(r, "parseLinkDestination", () => s.default),
            n.export(r, "parseLinkTitle", () => c.default));
          var a = e("./parse_link_label.mjs"),
            o = n.interopDefault(a),
            i = e("./parse_link_destination.mjs"),
            s = n.interopDefault(i),
            l = e("./parse_link_title.mjs"),
            c = n.interopDefault(l);
        },
        {
          "./parse_link_label.mjs": "5mpXp",
          "./parse_link_destination.mjs": "a3tIl",
          "./parse_link_title.mjs": "hKyzg",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "5mpXp": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e, t, r) {
            let n, a, o, i;
            let s = e.posMax,
              l = e.pos;
            for (e.pos = t + 1, n = 1; e.pos < s;) {
              if (93 === (o = e.src.charCodeAt(e.pos)) && 0 == --n) {
                a = !0;
                break;
              }
              if (((i = e.pos), e.md.inline.skipToken(e), 91 === o)) {
                if (i === e.pos - 1) n++;
                else if (r) return ((e.pos = l), -1);
              }
            }
            let c = -1;
            return (a && (c = e.pos), (e.pos = l), c);
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      a3tIl: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t, r) {
            let n;
            let o = t,
              i = { ok: !1, pos: 0, str: "" };
            if (60 === e.charCodeAt(o)) {
              for (o++; o < r && 10 !== (n = e.charCodeAt(o)) && 60 !== n;) {
                if (62 === n) {
                  ((i.pos = o + 1),
                    (i.str = (0, a.unescapeAll)(e.slice(t + 1, o))),
                    (i.ok = !0));
                  break;
                }
                if (92 === n && o + 1 < r) {
                  o += 2;
                  continue;
                }
                o++;
              }
              return i;
            }
            let s = 0;
            for (
              ;
              o < r && 32 !== (n = e.charCodeAt(o)) && !(n < 32) && 127 !== n;
            ) {
              if (92 === n && o + 1 < r) {
                if (32 === e.charCodeAt(o + 1)) break;
                o += 2;
                continue;
              }
              if (40 === n && ++s > 32) return i;
              if (41 === n) {
                if (0 === s) break;
                s--;
              }
              o++;
            }
            return (
              t === o ||
                0 !== s ||
                ((i.str = (0, a.unescapeAll)(e.slice(t, o))),
                (i.pos = o),
                (i.ok = !0)),
              i
            );
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      hKyzg: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t, r, n) {
            let o;
            let i = t,
              s = { ok: !1, can_continue: !1, pos: 0, str: "", marker: 0 };
            if (n) ((s.str = n.str), (s.marker = n.marker));
            else {
              if (i >= r) return s;
              let n = e.charCodeAt(i);
              if (34 !== n && 39 !== n && 40 !== n) return s;
              (t++, i++, 40 === n && (n = 41), (s.marker = n));
            }
            for (; i < r;) {
              if ((o = e.charCodeAt(i)) === s.marker)
                return (
                  (s.pos = i + 1),
                  (s.str += (0, a.unescapeAll)(e.slice(t, i))),
                  (s.ok = !0),
                  s
                );
              if (40 === o && 41 === s.marker) return s;
              (92 === o && i + 1 < r && i++, i++);
            }
            return (
              (s.can_continue = !0),
              (s.str += (0, a.unescapeAll)(e.slice(t, i))),
              s
            );
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      hBKGg: [
        function (e, t, r) {
          e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
            r,
          );
          var n = e("./common/utils.mjs");
          let a = {};
          function o() {
            this.rules = (0, n.assign)({}, a);
          }
          ((a.code_inline = function (e, t, r, a, o) {
            let i = e[t];
            return (
              "<code" +
              o.renderAttrs(i) +
              ">" +
              (0, n.escapeHtml)(i.content) +
              "</code>"
            );
          }),
            (a.code_block = function (e, t, r, a, o) {
              let i = e[t];
              return (
                "<pre" +
                o.renderAttrs(i) +
                "><code>" +
                (0, n.escapeHtml)(e[t].content) +
                "</code></pre>\n"
              );
            }),
            (a.fence = function (e, t, r, a, o) {
              let i;
              let s = e[t],
                l = s.info ? (0, n.unescapeAll)(s.info).trim() : "",
                c = "",
                u = "";
              if (l) {
                let e = l.split(/(\s+)/g);
                ((c = e[0]), (u = e.slice(2).join("")));
              }
              if (
                0 ===
                (i =
                  (r.highlight && r.highlight(s.content, c, u)) ||
                  (0, n.escapeHtml)(s.content)).indexOf("<pre")
              )
                return i + "\n";
              if (l) {
                let e = s.attrIndex("class"),
                  t = s.attrs ? s.attrs.slice() : [];
                return (
                  e < 0
                    ? t.push(["class", r.langPrefix + c])
                    : ((t[e] = t[e].slice()),
                      (t[e][1] += " " + r.langPrefix + c)),
                  `<pre><code${o.renderAttrs({ attrs: t })}>${i}</code></pre>
`
                );
              }
              return `<pre><code${o.renderAttrs(s)}>${i}</code></pre>
`;
            }),
            (a.image = function (e, t, r, n, a) {
              let o = e[t];
              return (
                (o.attrs[o.attrIndex("alt")][1] = a.renderInlineAsText(
                  o.children,
                  r,
                  n,
                )),
                a.renderToken(e, t, r)
              );
            }),
            (a.hardbreak = function (e, t, r) {
              return r.xhtmlOut ? "<br />\n" : "<br>\n";
            }),
            (a.softbreak = function (e, t, r) {
              return r.breaks ? (r.xhtmlOut ? "<br />\n" : "<br>\n") : "\n";
            }),
            (a.text = function (e, t) {
              return (0, n.escapeHtml)(e[t].content);
            }),
            (a.html_block = function (e, t) {
              return e[t].content;
            }),
            (a.html_inline = function (e, t) {
              return e[t].content;
            }),
            (o.prototype.renderAttrs = function (e) {
              let t, r, a;
              if (!e.attrs) return "";
              for (t = 0, a = "", r = e.attrs.length; t < r; t++)
                a +=
                  " " +
                  (0, n.escapeHtml)(e.attrs[t][0]) +
                  '="' +
                  (0, n.escapeHtml)(e.attrs[t][1]) +
                  '"';
              return a;
            }),
            (o.prototype.renderToken = function (e, t, r) {
              let n = e[t],
                a = "";
              if (n.hidden) return "";
              (n.block &&
                -1 !== n.nesting &&
                t &&
                e[t - 1].hidden &&
                (a += "\n"),
                (a +=
                  (-1 === n.nesting ? "</" : "<") +
                  n.tag +
                  this.renderAttrs(n)),
                0 === n.nesting && r.xhtmlOut && (a += " /"));
              let o = !1;
              if (n.block && ((o = !0), 1 === n.nesting && t + 1 < e.length)) {
                let r = e[t + 1];
                "inline" === r.type || r.hidden
                  ? (o = !1)
                  : -1 === r.nesting && r.tag === n.tag && (o = !1);
              }
              return a + (o ? ">\n" : ">");
            }),
            (o.prototype.renderInline = function (e, t, r) {
              let n = "",
                a = this.rules;
              for (let o = 0, i = e.length; o < i; o++) {
                let i = e[o].type;
                void 0 !== a[i]
                  ? (n += a[i](e, o, t, r, this))
                  : (n += this.renderToken(e, o, t));
              }
              return n;
            }),
            (o.prototype.renderInlineAsText = function (e, t, r) {
              let n = "";
              for (let a = 0, o = e.length; a < o; a++)
                switch (e[a].type) {
                  case "text":
                  case "html_inline":
                  case "html_block":
                    n += e[a].content;
                    break;
                  case "image":
                    n += this.renderInlineAsText(e[a].children, t, r);
                    break;
                  case "softbreak":
                  case "hardbreak":
                    n += "\n";
                }
              return n;
            }),
            (o.prototype.render = function (e, t, r) {
              let n = "",
                a = this.rules;
              for (let o = 0, i = e.length; o < i; o++) {
                let i = e[o].type;
                "inline" === i
                  ? (n += this.renderInline(e[o].children, t, r))
                  : void 0 !== a[i]
                    ? (n += a[i](e, o, t, r, this))
                    : (n += this.renderToken(e, o, t, r));
              }
              return n;
            }),
            (r.default = o));
        },
        {
          "./common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "6unIa": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("./ruler.mjs"),
            o = n.interopDefault(a),
            i = e("./rules_core/state_core.mjs"),
            s = n.interopDefault(i),
            l = e("./rules_core/normalize.mjs"),
            c = n.interopDefault(l),
            u = e("./rules_core/block.mjs"),
            p = n.interopDefault(u),
            d = e("./rules_core/inline.mjs"),
            f = n.interopDefault(d),
            h = e("./rules_core/linkify.mjs"),
            m = n.interopDefault(h),
            g = e("./rules_core/replacements.mjs"),
            b = n.interopDefault(g),
            x = e("./rules_core/smartquotes.mjs"),
            y = n.interopDefault(x),
            v = e("./rules_core/text_join.mjs"),
            k = n.interopDefault(v);
          let w = [
            ["normalize", c.default],
            ["block", p.default],
            ["inline", f.default],
            ["linkify", m.default],
            ["replacements", b.default],
            ["smartquotes", y.default],
            ["text_join", k.default],
          ];
          function _() {
            this.ruler = new o.default();
            for (let e = 0; e < w.length; e++)
              this.ruler.push(w[e][0], w[e][1]);
          }
          ((_.prototype.process = function (e) {
            let t = this.ruler.getRules("");
            for (let r = 0, n = t.length; r < n; r++) t[r](e);
          }),
            (_.prototype.State = s.default),
            (r.default = _));
        },
        {
          "./ruler.mjs": "lrUlM",
          "./rules_core/state_core.mjs": "iCBS0",
          "./rules_core/normalize.mjs": "9CYje",
          "./rules_core/block.mjs": "29ADY",
          "./rules_core/inline.mjs": "69yuD",
          "./rules_core/linkify.mjs": "i0ubH",
          "./rules_core/replacements.mjs": "aZjfr",
          "./rules_core/smartquotes.mjs": "36Eza",
          "./rules_core/text_join.mjs": "kLGQA",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      lrUlM: [
        function (e, t, r) {
          function n() {
            ((this.__rules__ = []), (this.__cache__ = null));
          }
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (n.prototype.__find__ = function (e) {
              for (let t = 0; t < this.__rules__.length; t++)
                if (this.__rules__[t].name === e) return t;
              return -1;
            }),
            (n.prototype.__compile__ = function () {
              let e = this,
                t = [""];
              (e.__rules__.forEach(function (e) {
                e.enabled &&
                  e.alt.forEach(function (e) {
                    0 > t.indexOf(e) && t.push(e);
                  });
              }),
                (e.__cache__ = {}),
                t.forEach(function (t) {
                  ((e.__cache__[t] = []),
                    e.__rules__.forEach(function (r) {
                      r.enabled &&
                        ((t && 0 > r.alt.indexOf(t)) ||
                          e.__cache__[t].push(r.fn));
                    }));
                }));
            }),
            (n.prototype.at = function (e, t, r) {
              let n = this.__find__(e);
              if (-1 === n) throw Error("Parser rule not found: " + e);
              ((this.__rules__[n].fn = t),
                (this.__rules__[n].alt = (r || {}).alt || []),
                (this.__cache__ = null));
            }),
            (n.prototype.before = function (e, t, r, n) {
              let a = this.__find__(e);
              if (-1 === a) throw Error("Parser rule not found: " + e);
              (this.__rules__.splice(a, 0, {
                name: t,
                enabled: !0,
                fn: r,
                alt: (n || {}).alt || [],
              }),
                (this.__cache__ = null));
            }),
            (n.prototype.after = function (e, t, r, n) {
              let a = this.__find__(e);
              if (-1 === a) throw Error("Parser rule not found: " + e);
              (this.__rules__.splice(a + 1, 0, {
                name: t,
                enabled: !0,
                fn: r,
                alt: (n || {}).alt || [],
              }),
                (this.__cache__ = null));
            }),
            (n.prototype.push = function (e, t, r) {
              (this.__rules__.push({
                name: e,
                enabled: !0,
                fn: t,
                alt: (r || {}).alt || [],
              }),
                (this.__cache__ = null));
            }),
            (n.prototype.enable = function (e, t) {
              Array.isArray(e) || (e = [e]);
              let r = [];
              return (
                e.forEach(function (e) {
                  let n = this.__find__(e);
                  if (n < 0) {
                    if (t) return;
                    throw Error("Rules manager: invalid rule name " + e);
                  }
                  ((this.__rules__[n].enabled = !0), r.push(e));
                }, this),
                (this.__cache__ = null),
                r
              );
            }),
            (n.prototype.enableOnly = function (e, t) {
              (Array.isArray(e) || (e = [e]),
                this.__rules__.forEach(function (e) {
                  e.enabled = !1;
                }),
                this.enable(e, t));
            }),
            (n.prototype.disable = function (e, t) {
              Array.isArray(e) || (e = [e]);
              let r = [];
              return (
                e.forEach(function (e) {
                  let n = this.__find__(e);
                  if (n < 0) {
                    if (t) return;
                    throw Error("Rules manager: invalid rule name " + e);
                  }
                  ((this.__rules__[n].enabled = !1), r.push(e));
                }, this),
                (this.__cache__ = null),
                r
              );
            }),
            (n.prototype.getRules = function (e) {
              return (
                null === this.__cache__ && this.__compile__(),
                this.__cache__[e] || []
              );
            }),
            (r.default = n));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      iCBS0: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("../token.mjs"),
            o = n.interopDefault(a);
          function i(e, t, r) {
            ((this.src = e),
              (this.env = r),
              (this.tokens = []),
              (this.inlineMode = !1),
              (this.md = t));
          }
          ((i.prototype.Token = o.default), (r.default = i));
        },
        {
          "../token.mjs": "fwPe8",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      fwPe8: [
        function (e, t, r) {
          function n(e, t, r) {
            ((this.type = e),
              (this.tag = t),
              (this.attrs = null),
              (this.map = null),
              (this.nesting = r),
              (this.level = 0),
              (this.children = null),
              (this.content = ""),
              (this.markup = ""),
              (this.info = ""),
              (this.meta = null),
              (this.block = !1),
              (this.hidden = !1));
          }
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (n.prototype.attrIndex = function (e) {
              if (!this.attrs) return -1;
              let t = this.attrs;
              for (let r = 0, n = t.length; r < n; r++)
                if (t[r][0] === e) return r;
              return -1;
            }),
            (n.prototype.attrPush = function (e) {
              this.attrs ? this.attrs.push(e) : (this.attrs = [e]);
            }),
            (n.prototype.attrSet = function (e, t) {
              let r = this.attrIndex(e),
                n = [e, t];
              r < 0 ? this.attrPush(n) : (this.attrs[r] = n);
            }),
            (n.prototype.attrGet = function (e) {
              let t = this.attrIndex(e),
                r = null;
              return (t >= 0 && (r = this.attrs[t][1]), r);
            }),
            (n.prototype.attrJoin = function (e, t) {
              let r = this.attrIndex(e);
              r < 0
                ? this.attrPush([e, t])
                : (this.attrs[r][1] = this.attrs[r][1] + " " + t);
            }),
            (r.default = n));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "9CYje": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => i));
          let a = /\r\n?|\n/g,
            o = /\0/g;
          function i(e) {
            let t;
            ((t = (t = e.src.replace(a, "\n")).replace(o, "\ufffd")),
              (e.src = t));
          }
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "29ADY": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e) {
            let t;
            e.inlineMode
              ? (((t = new e.Token("inline", "", 0)).content = e.src),
                (t.map = [0, 1]),
                (t.children = []),
                e.tokens.push(t))
              : e.md.block.parse(e.src, e.md, e.env, e.tokens);
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "69yuD": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e) {
            let t = e.tokens;
            for (let r = 0, n = t.length; r < n; r++) {
              let n = t[r];
              "inline" === n.type &&
                e.md.inline.parse(n.content, e.md, e.env, n.children);
            }
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      i0ubH: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e) {
            let t = e.tokens;
            if (e.md.options.linkify)
              for (let o = 0, i = t.length; o < i; o++) {
                if (
                  "inline" !== t[o].type ||
                  !e.md.linkify.pretest(t[o].content)
                )
                  continue;
                let i = t[o].children,
                  s = 0;
                for (let l = i.length - 1; l >= 0; l--) {
                  let c = i[l];
                  if ("link_close" === c.type) {
                    for (
                      l--;
                      i[l].level !== c.level && "link_open" !== i[l].type;
                    )
                      l--;
                    continue;
                  }
                  if ("html_inline" === c.type) {
                    var r, n;
                    ((r = c.content),
                      /^<a[>\s]/i.test(r) && s > 0 && s--,
                      (n = c.content),
                      /^<\/a\s*>/i.test(n) && s++);
                  }
                  if (
                    !(s > 0) &&
                    "text" === c.type &&
                    e.md.linkify.test(c.content)
                  ) {
                    let r = c.content,
                      n = e.md.linkify.match(r),
                      s = [],
                      u = c.level,
                      p = 0;
                    n.length > 0 &&
                      0 === n[0].index &&
                      l > 0 &&
                      "text_special" === i[l - 1].type &&
                      (n = n.slice(1));
                    for (let t = 0; t < n.length; t++) {
                      let a = n[t].url,
                        o = e.md.normalizeLink(a);
                      if (!e.md.validateLink(o)) continue;
                      let i = n[t].text;
                      i = n[t].schema
                        ? "mailto:" !== n[t].schema || /^mailto:/i.test(i)
                          ? e.md.normalizeLinkText(i)
                          : e.md
                              .normalizeLinkText("mailto:" + i)
                              .replace(/^mailto:/, "")
                        : e.md
                            .normalizeLinkText("http://" + i)
                            .replace(/^http:\/\//, "");
                      let l = n[t].index;
                      if (l > p) {
                        let t = new e.Token("text", "", 0);
                        ((t.content = r.slice(p, l)), (t.level = u), s.push(t));
                      }
                      let c = new e.Token("link_open", "a", 1);
                      ((c.attrs = [["href", o]]),
                        (c.level = u++),
                        (c.markup = "linkify"),
                        (c.info = "auto"),
                        s.push(c));
                      let d = new e.Token("text", "", 0);
                      ((d.content = i), (d.level = u), s.push(d));
                      let f = new e.Token("link_close", "a", -1);
                      ((f.level = --u),
                        (f.markup = "linkify"),
                        (f.info = "auto"),
                        s.push(f),
                        (p = n[t].lastIndex));
                    }
                    if (p < r.length) {
                      let t = new e.Token("text", "", 0);
                      ((t.content = r.slice(p)), (t.level = u), s.push(t));
                    }
                    t[o].children = i = (0, a.arrayReplaceAt)(i, l, s);
                  }
                }
              }
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      aZjfr: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => c));
          let a = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
            o = /\((c|tm|r)\)/i,
            i = /\((c|tm|r)\)/gi,
            s = { c: "\xa9", r: "\xae", tm: "\u2122" };
          function l(e, t) {
            return s[t.toLowerCase()];
          }
          function c(e) {
            let t;
            if (e.md.options.typographer)
              for (t = e.tokens.length - 1; t >= 0; t--)
                "inline" === e.tokens[t].type &&
                  (o.test(e.tokens[t].content) &&
                    (function (e) {
                      let t = 0;
                      for (let r = e.length - 1; r >= 0; r--) {
                        let n = e[r];
                        ("text" !== n.type ||
                          t ||
                          (n.content = n.content.replace(i, l)),
                          "link_open" === n.type && "auto" === n.info && t--,
                          "link_close" === n.type && "auto" === n.info && t++);
                      }
                    })(e.tokens[t].children),
                  a.test(e.tokens[t].content) &&
                    (function (e) {
                      let t = 0;
                      for (let r = e.length - 1; r >= 0; r--) {
                        let n = e[r];
                        ("text" === n.type &&
                          !t &&
                          a.test(n.content) &&
                          (n.content = n.content
                            .replace(/\+-/g, "\xb1")
                            .replace(/\.{2,}/g, "\u2026")
                            .replace(/([?!])\u2026/g, "$1..")
                            .replace(/([?!]){4,}/g, "$1$1$1")
                            .replace(/,{2,}/g, ",")
                            .replace(/(^|[^-])---(?=[^-]|$)/gm, "$1\u2014")
                            .replace(/(^|\s)--(?=\s|$)/gm, "$1\u2013")
                            .replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1\u2013")),
                          "link_open" === n.type && "auto" === n.info && t--,
                          "link_close" === n.type && "auto" === n.info && t++);
                      }
                    })(e.tokens[t].children));
          }
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "36Eza": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => l));
          var a = e("../common/utils.mjs");
          let o = /['"]/,
            i = /['"]/g;
          function s(e, t, r) {
            return e.slice(0, t) + r + e.slice(t + 1);
          }
          function l(e) {
            if (e.md.options.typographer)
              for (let t = e.tokens.length - 1; t >= 0; t--)
                "inline" === e.tokens[t].type &&
                  o.test(e.tokens[t].content) &&
                  (function (e, t) {
                    let r;
                    let n = [];
                    for (let o = 0; o < e.length; o++) {
                      let l = e[o],
                        c = e[o].level;
                      for (r = n.length - 1; r >= 0 && !(n[r].level <= c); r--);
                      if (((n.length = r + 1), "text" !== l.type)) continue;
                      let u = l.content,
                        p = 0,
                        d = u.length;
                      e: for (; p < d;) {
                        i.lastIndex = p;
                        let f = i.exec(u);
                        if (!f) break;
                        let h = !0,
                          m = !0;
                        p = f.index + 1;
                        let g = "'" === f[0],
                          b = 32;
                        if (f.index - 1 >= 0) b = u.charCodeAt(f.index - 1);
                        else
                          for (
                            r = o - 1;
                            r >= 0 &&
                            "softbreak" !== e[r].type &&
                            "hardbreak" !== e[r].type;
                            r--
                          )
                            if (e[r].content) {
                              b = e[r].content.charCodeAt(
                                e[r].content.length - 1,
                              );
                              break;
                            }
                        let x = 32;
                        if (p < d) x = u.charCodeAt(p);
                        else
                          for (
                            r = o + 1;
                            r < e.length &&
                            "softbreak" !== e[r].type &&
                            "hardbreak" !== e[r].type;
                            r++
                          )
                            if (e[r].content) {
                              x = e[r].content.charCodeAt(0);
                              break;
                            }
                        let y =
                            (0, a.isMdAsciiPunct)(b) ||
                            (0, a.isPunctChar)(String.fromCharCode(b)),
                          v =
                            (0, a.isMdAsciiPunct)(x) ||
                            (0, a.isPunctChar)(String.fromCharCode(x)),
                          k = (0, a.isWhiteSpace)(b),
                          w = (0, a.isWhiteSpace)(x);
                        if (
                          (w ? (h = !1) : v && !(k || y) && (h = !1),
                          k ? (m = !1) : y && !(w || v) && (m = !1),
                          34 === x &&
                            '"' === f[0] &&
                            b >= 48 &&
                            b <= 57 &&
                            (m = h = !1),
                          h && m && ((h = y), (m = v)),
                          !h && !m)
                        ) {
                          g && (l.content = s(l.content, f.index, "\u2019"));
                          continue;
                        }
                        if (m)
                          for (r = n.length - 1; r >= 0; r--) {
                            let a = n[r];
                            if (n[r].level < c) break;
                            if (a.single === g && n[r].level === c) {
                              let i, c;
                              ((a = n[r]),
                                g
                                  ? ((i = t.md.options.quotes[2]),
                                    (c = t.md.options.quotes[3]))
                                  : ((i = t.md.options.quotes[0]),
                                    (c = t.md.options.quotes[1])),
                                (l.content = s(l.content, f.index, c)),
                                (e[a.token].content = s(
                                  e[a.token].content,
                                  a.pos,
                                  i,
                                )),
                                (p += c.length - 1),
                                a.token === o && (p += i.length - 1),
                                (d = (u = l.content).length),
                                (n.length = r));
                              continue e;
                            }
                          }
                        h
                          ? n.push({
                              token: o,
                              pos: f.index,
                              single: g,
                              level: c,
                            })
                          : m &&
                            g &&
                            (l.content = s(l.content, f.index, "\u2019"));
                      }
                    }
                  })(e.tokens[t].children, e);
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      kLGQA: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e) {
            let t, r;
            let n = e.tokens,
              a = n.length;
            for (let e = 0; e < a; e++) {
              if ("inline" !== n[e].type) continue;
              let a = n[e].children,
                o = a.length;
              for (t = 0; t < o; t++)
                "text_special" === a[t].type && (a[t].type = "text");
              for (t = r = 0; t < o; t++)
                "text" === a[t].type && t + 1 < o && "text" === a[t + 1].type
                  ? (a[t + 1].content = a[t].content + a[t + 1].content)
                  : (t !== r && (a[r] = a[t]), r++);
              t !== r && (a.length = r);
            }
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      izjCc: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("./ruler.mjs"),
            o = n.interopDefault(a),
            i = e("./rules_block/state_block.mjs"),
            s = n.interopDefault(i),
            l = e("./rules_block/table.mjs"),
            c = n.interopDefault(l),
            u = e("./rules_block/code.mjs"),
            p = n.interopDefault(u),
            d = e("./rules_block/fence.mjs"),
            f = n.interopDefault(d),
            h = e("./rules_block/blockquote.mjs"),
            m = n.interopDefault(h),
            g = e("./rules_block/hr.mjs"),
            b = n.interopDefault(g),
            x = e("./rules_block/list.mjs"),
            y = n.interopDefault(x),
            v = e("./rules_block/reference.mjs"),
            k = n.interopDefault(v),
            w = e("./rules_block/html_block.mjs"),
            _ = n.interopDefault(w),
            A = e("./rules_block/heading.mjs"),
            C = n.interopDefault(A),
            E = e("./rules_block/lheading.mjs"),
            j = n.interopDefault(E),
            I = e("./rules_block/paragraph.mjs"),
            S = n.interopDefault(I);
          let D = [
            ["table", c.default, ["paragraph", "reference"]],
            ["code", p.default],
            [
              "fence",
              f.default,
              ["paragraph", "reference", "blockquote", "list"],
            ],
            [
              "blockquote",
              m.default,
              ["paragraph", "reference", "blockquote", "list"],
            ],
            ["hr", b.default, ["paragraph", "reference", "blockquote", "list"]],
            ["list", y.default, ["paragraph", "reference", "blockquote"]],
            ["reference", k.default],
            ["html_block", _.default, ["paragraph", "reference", "blockquote"]],
            ["heading", C.default, ["paragraph", "reference", "blockquote"]],
            ["lheading", j.default],
            ["paragraph", S.default],
          ];
          function F() {
            this.ruler = new o.default();
            for (let e = 0; e < D.length; e++)
              this.ruler.push(D[e][0], D[e][1], {
                alt: (D[e][2] || []).slice(),
              });
          }
          ((F.prototype.tokenize = function (e, t, r) {
            let n = this.ruler.getRules(""),
              a = n.length,
              o = e.md.options.maxNesting,
              i = t,
              s = !1;
            for (
              ;
              i < r &&
              ((e.line = i = e.skipEmptyLines(i)),
              !(i >= r) && !(e.sCount[i] < e.blkIndent));
            ) {
              if (e.level >= o) {
                e.line = r;
                break;
              }
              let t = e.line,
                l = !1;
              for (let o = 0; o < a; o++)
                if ((l = n[o](e, i, r, !1))) {
                  if (t >= e.line)
                    throw Error("block rule didn't increment state.line");
                  break;
                }
              if (!l) throw Error("none of the block rules matched");
              ((e.tight = !s),
                e.isEmpty(e.line - 1) && (s = !0),
                (i = e.line) < r &&
                  e.isEmpty(i) &&
                  ((s = !0), i++, (e.line = i)));
            }
          }),
            (F.prototype.parse = function (e, t, r, n) {
              if (!e) return;
              let a = new this.State(e, t, r, n);
              this.tokenize(a, a.line, a.lineMax);
            }),
            (F.prototype.State = s.default),
            (r.default = F));
        },
        {
          "./ruler.mjs": "lrUlM",
          "./rules_block/state_block.mjs": "ip9Pb",
          "./rules_block/table.mjs": "89Smr",
          "./rules_block/code.mjs": "2kxm3",
          "./rules_block/fence.mjs": "7GqiZ",
          "./rules_block/blockquote.mjs": "cUbH1",
          "./rules_block/hr.mjs": "dQXJq",
          "./rules_block/list.mjs": "7uMxS",
          "./rules_block/reference.mjs": "8rk3i",
          "./rules_block/html_block.mjs": "qe0Px",
          "./rules_block/heading.mjs": "cSgSp",
          "./rules_block/lheading.mjs": "jVBur",
          "./rules_block/paragraph.mjs": "lq3T3",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      ip9Pb: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("../token.mjs"),
            o = n.interopDefault(a),
            i = e("../common/utils.mjs");
          function s(e, t, r, n) {
            ((this.src = e),
              (this.md = t),
              (this.env = r),
              (this.tokens = n),
              (this.bMarks = []),
              (this.eMarks = []),
              (this.tShift = []),
              (this.sCount = []),
              (this.bsCount = []),
              (this.blkIndent = 0),
              (this.line = 0),
              (this.lineMax = 0),
              (this.tight = !1),
              (this.ddIndent = -1),
              (this.listIndent = -1),
              (this.parentType = "root"),
              (this.level = 0));
            let a = this.src;
            for (
              let e = 0, t = 0, r = 0, n = 0, o = a.length, s = !1;
              t < o;
              t++
            ) {
              let l = a.charCodeAt(t);
              if (!s) {
                if ((0, i.isSpace)(l)) {
                  (r++, 9 === l ? (n += 4 - (n % 4)) : n++);
                  continue;
                }
                s = !0;
              }
              (10 === l || t === o - 1) &&
                (10 !== l && t++,
                this.bMarks.push(e),
                this.eMarks.push(t),
                this.tShift.push(r),
                this.sCount.push(n),
                this.bsCount.push(0),
                (s = !1),
                (r = 0),
                (n = 0),
                (e = t + 1));
            }
            (this.bMarks.push(a.length),
              this.eMarks.push(a.length),
              this.tShift.push(0),
              this.sCount.push(0),
              this.bsCount.push(0),
              (this.lineMax = this.bMarks.length - 1));
          }
          ((s.prototype.push = function (e, t, r) {
            let n = new o.default(e, t, r);
            return (
              (n.block = !0),
              r < 0 && this.level--,
              (n.level = this.level),
              r > 0 && this.level++,
              this.tokens.push(n),
              n
            );
          }),
            (s.prototype.isEmpty = function (e) {
              return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
            }),
            (s.prototype.skipEmptyLines = function (e) {
              for (
                let t = this.lineMax;
                e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]);
                e++
              );
              return e;
            }),
            (s.prototype.skipSpaces = function (e) {
              for (let t = this.src.length; e < t; e++) {
                let t = this.src.charCodeAt(e);
                if (!(0, i.isSpace)(t)) break;
              }
              return e;
            }),
            (s.prototype.skipSpacesBack = function (e, t) {
              if (e <= t) return e;
              for (; e > t;)
                if (!(0, i.isSpace)(this.src.charCodeAt(--e))) return e + 1;
              return e;
            }),
            (s.prototype.skipChars = function (e, t) {
              for (
                let r = this.src.length;
                e < r && this.src.charCodeAt(e) === t;
                e++
              );
              return e;
            }),
            (s.prototype.skipCharsBack = function (e, t, r) {
              if (e <= r) return e;
              for (; e > r;) if (t !== this.src.charCodeAt(--e)) return e + 1;
              return e;
            }),
            (s.prototype.getLines = function (e, t, r, n) {
              if (e >= t) return "";
              let a = Array(t - e);
              for (let o = 0, s = e; s < t; s++, o++) {
                let e,
                  l = 0,
                  c = this.bMarks[s],
                  u = c;
                for (
                  e = s + 1 < t || n ? this.eMarks[s] + 1 : this.eMarks[s];
                  u < e && l < r;
                ) {
                  let e = this.src.charCodeAt(u);
                  if ((0, i.isSpace)(e))
                    9 === e ? (l += 4 - ((l + this.bsCount[s]) % 4)) : l++;
                  else if (u - c < this.tShift[s]) l++;
                  else break;
                  u++;
                }
                l > r
                  ? (a[o] = Array(l - r + 1).join(" ") + this.src.slice(u, e))
                  : (a[o] = this.src.slice(u, e));
              }
              return a.join("");
            }),
            (s.prototype.Token = o.default),
            (r.default = s));
        },
        {
          "../token.mjs": "fwPe8",
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "89Smr": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => s));
          var a = e("../common/utils.mjs");
          function o(e, t) {
            let r = e.bMarks[t] + e.tShift[t],
              n = e.eMarks[t];
            return e.src.slice(r, n);
          }
          function i(e) {
            let t = [],
              r = e.length,
              n = 0,
              a = e.charCodeAt(n),
              o = !1,
              i = 0,
              s = "";
            for (; n < r;)
              (124 === a &&
                (o
                  ? ((s += e.substring(i, n - 1)), (i = n))
                  : (t.push(s + e.substring(i, n)), (s = ""), (i = n + 1))),
                (o = 92 === a),
                n++,
                (a = e.charCodeAt(n)));
            return (t.push(s + e.substring(i)), t);
          }
          function s(e, t, r, n) {
            let s;
            if (t + 2 > r) return !1;
            let l = t + 1;
            if (e.sCount[l] < e.blkIndent || e.sCount[l] - e.blkIndent >= 4)
              return !1;
            let c = e.bMarks[l] + e.tShift[l];
            if (c >= e.eMarks[l]) return !1;
            let u = e.src.charCodeAt(c++);
            if ((124 !== u && 45 !== u && 58 !== u) || c >= e.eMarks[l])
              return !1;
            let p = e.src.charCodeAt(c++);
            if (
              (124 !== p && 45 !== p && 58 !== p && !(0, a.isSpace)(p)) ||
              (45 === u && (0, a.isSpace)(p))
            )
              return !1;
            for (; c < e.eMarks[l];) {
              let t = e.src.charCodeAt(c);
              if (124 !== t && 45 !== t && 58 !== t && !(0, a.isSpace)(t))
                return !1;
              c++;
            }
            let d = o(e, t + 1),
              f = d.split("|"),
              h = [];
            for (let e = 0; e < f.length; e++) {
              let t = f[e].trim();
              if (!t) {
                if (0 === e || e === f.length - 1) continue;
                return !1;
              }
              if (!/^:?-+:?$/.test(t)) return !1;
              58 === t.charCodeAt(t.length - 1)
                ? h.push(58 === t.charCodeAt(0) ? "center" : "right")
                : 58 === t.charCodeAt(0)
                  ? h.push("left")
                  : h.push("");
            }
            if (
              -1 === (d = o(e, t).trim()).indexOf("|") ||
              e.sCount[t] - e.blkIndent >= 4
            )
              return !1;
            ((f = i(d)).length && "" === f[0] && f.shift(),
              f.length && "" === f[f.length - 1] && f.pop());
            let m = f.length;
            if (0 === m || m !== h.length) return !1;
            if (n) return !0;
            let g = e.parentType;
            e.parentType = "table";
            let b = e.md.block.ruler.getRules("blockquote"),
              x = e.push("table_open", "table", 1),
              y = [t, 0];
            x.map = y;
            let v = e.push("thead_open", "thead", 1);
            v.map = [t, t + 1];
            let k = e.push("tr_open", "tr", 1);
            k.map = [t, t + 1];
            for (let t = 0; t < f.length; t++) {
              let r = e.push("th_open", "th", 1);
              h[t] && (r.attrs = [["style", "text-align:" + h[t]]]);
              let n = e.push("inline", "", 0);
              ((n.content = f[t].trim()),
                (n.children = []),
                e.push("th_close", "th", -1));
            }
            (e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1));
            let w = 0;
            for (l = t + 2; l < r && !(e.sCount[l] < e.blkIndent); l++) {
              let n = !1;
              for (let t = 0, a = b.length; t < a; t++)
                if (b[t](e, l, r, !0)) {
                  n = !0;
                  break;
                }
              if (
                n ||
                !(d = o(e, l).trim()) ||
                e.sCount[l] - e.blkIndent >= 4 ||
                ((f = i(d)).length && "" === f[0] && f.shift(),
                f.length && "" === f[f.length - 1] && f.pop(),
                (w += m - f.length) > 65536)
              )
                break;
              if (l === t + 2) {
                let r = e.push("tbody_open", "tbody", 1);
                r.map = s = [t + 2, 0];
              }
              let a = e.push("tr_open", "tr", 1);
              a.map = [l, l + 1];
              for (let t = 0; t < m; t++) {
                let r = e.push("td_open", "td", 1);
                h[t] && (r.attrs = [["style", "text-align:" + h[t]]]);
                let n = e.push("inline", "", 0);
                ((n.content = f[t] ? f[t].trim() : ""),
                  (n.children = []),
                  e.push("td_close", "td", -1));
              }
              e.push("tr_close", "tr", -1);
            }
            return (
              s && (e.push("tbody_close", "tbody", -1), (s[1] = l)),
              e.push("table_close", "table", -1),
              (y[1] = l),
              (e.parentType = g),
              (e.line = l),
              !0
            );
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "2kxm3": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e, t, r) {
            if (e.sCount[t] - e.blkIndent < 4) return !1;
            let n = t + 1,
              a = n;
            for (; n < r;) {
              if (e.isEmpty(n)) {
                n++;
                continue;
              }
              if (e.sCount[n] - e.blkIndent >= 4) {
                a = ++n;
                continue;
              }
              break;
            }
            e.line = a;
            let o = e.push("code_block", "code", 0);
            return (
              (o.content = e.getLines(t, a, 4 + e.blkIndent, !1) + "\n"),
              (o.map = [t, e.line]),
              !0
            );
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "7GqiZ": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e, t, r, n) {
            let a = e.bMarks[t] + e.tShift[t],
              o = e.eMarks[t];
            if (e.sCount[t] - e.blkIndent >= 4 || a + 3 > o) return !1;
            let i = e.src.charCodeAt(a);
            if (126 !== i && 96 !== i) return !1;
            let s = a,
              l = (a = e.skipChars(a, i)) - s;
            if (l < 3) return !1;
            let c = e.src.slice(s, a),
              u = e.src.slice(a, o);
            if (96 === i && u.indexOf(String.fromCharCode(i)) >= 0) return !1;
            if (n) return !0;
            let p = t,
              d = !1;
            for (
              ;
              !(++p >= r) &&
              (!((a = s = e.bMarks[p] + e.tShift[p]) < (o = e.eMarks[p])) ||
                !(e.sCount[p] < e.blkIndent));
            )
              if (
                !(
                  e.src.charCodeAt(a) !== i ||
                  e.sCount[p] - e.blkIndent >= 4 ||
                  (a = e.skipChars(a, i)) - s < l
                ) &&
                !((a = e.skipSpaces(a)) < o)
              ) {
                d = !0;
                break;
              }
            ((l = e.sCount[t]), (e.line = p + (d ? 1 : 0)));
            let f = e.push("fence", "code", 0);
            return (
              (f.info = u),
              (f.content = e.getLines(t + 1, p, l, !0)),
              (f.markup = c),
              (f.map = [t, e.line]),
              !0
            );
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      cUbH1: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t, r, n) {
            let o,
              i = e.bMarks[t] + e.tShift[t],
              s = e.eMarks[t],
              l = e.lineMax;
            if (e.sCount[t] - e.blkIndent >= 4 || 62 !== e.src.charCodeAt(i))
              return !1;
            if (n) return !0;
            let c = [],
              u = [],
              p = [],
              d = [],
              f = e.md.block.ruler.getRules("blockquote"),
              h = e.parentType;
            e.parentType = "blockquote";
            let m = !1;
            for (o = t; o < r; o++) {
              let t = e.sCount[o] < e.blkIndent;
              if ((i = e.bMarks[o] + e.tShift[o]) >= (s = e.eMarks[o])) break;
              if (62 === e.src.charCodeAt(i++) && !t) {
                let t,
                  r,
                  n = e.sCount[o] + 1;
                32 === e.src.charCodeAt(i)
                  ? (i++, n++, (r = !1), (t = !0))
                  : 9 === e.src.charCodeAt(i)
                    ? ((t = !0),
                      (e.bsCount[o] + n) % 4 == 3
                        ? (i++, n++, (r = !1))
                        : (r = !0))
                    : (t = !1);
                let l = n;
                for (c.push(e.bMarks[o]), e.bMarks[o] = i; i < s;) {
                  let t = e.src.charCodeAt(i);
                  if ((0, a.isSpace)(t))
                    9 === t
                      ? (l += 4 - ((l + e.bsCount[o] + (r ? 1 : 0)) % 4))
                      : l++;
                  else break;
                  i++;
                }
                ((m = i >= s),
                  u.push(e.bsCount[o]),
                  (e.bsCount[o] = e.sCount[o] + 1 + (t ? 1 : 0)),
                  p.push(e.sCount[o]),
                  (e.sCount[o] = l - n),
                  d.push(e.tShift[o]),
                  (e.tShift[o] = i - e.bMarks[o]));
                continue;
              }
              if (m) break;
              let n = !1;
              for (let t = 0, a = f.length; t < a; t++)
                if (f[t](e, o, r, !0)) {
                  n = !0;
                  break;
                }
              if (n) {
                ((e.lineMax = o),
                  0 !== e.blkIndent &&
                    (c.push(e.bMarks[o]),
                    u.push(e.bsCount[o]),
                    d.push(e.tShift[o]),
                    p.push(e.sCount[o]),
                    (e.sCount[o] -= e.blkIndent)));
                break;
              }
              (c.push(e.bMarks[o]),
                u.push(e.bsCount[o]),
                d.push(e.tShift[o]),
                p.push(e.sCount[o]),
                (e.sCount[o] = -1));
            }
            let g = e.blkIndent;
            e.blkIndent = 0;
            let b = e.push("blockquote_open", "blockquote", 1);
            b.markup = ">";
            let x = [t, 0];
            ((b.map = x), e.md.block.tokenize(e, t, o));
            let y = e.push("blockquote_close", "blockquote", -1);
            ((y.markup = ">"),
              (e.lineMax = l),
              (e.parentType = h),
              (x[1] = e.line));
            for (let r = 0; r < d.length; r++)
              ((e.bMarks[r + t] = c[r]),
                (e.tShift[r + t] = d[r]),
                (e.sCount[r + t] = p[r]),
                (e.bsCount[r + t] = u[r]));
            return ((e.blkIndent = g), !0);
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      dQXJq: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t, r, n) {
            let o = e.eMarks[t];
            if (e.sCount[t] - e.blkIndent >= 4) return !1;
            let i = e.bMarks[t] + e.tShift[t],
              s = e.src.charCodeAt(i++);
            if (42 !== s && 45 !== s && 95 !== s) return !1;
            let l = 1;
            for (; i < o;) {
              let t = e.src.charCodeAt(i++);
              if (t !== s && !(0, a.isSpace)(t)) return !1;
              t === s && l++;
            }
            if (l < 3) return !1;
            if (n) return !0;
            e.line = t + 1;
            let c = e.push("hr", "hr", 0);
            return (
              (c.map = [t, e.line]),
              (c.markup = Array(l + 1).join(String.fromCharCode(s))),
              !0
            );
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "7uMxS": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => s));
          var a = e("../common/utils.mjs");
          function o(e, t) {
            let r = e.eMarks[t],
              n = e.bMarks[t] + e.tShift[t],
              o = e.src.charCodeAt(n++);
            if (42 !== o && 45 !== o && 43 !== o) return -1;
            if (n < r) {
              let t = e.src.charCodeAt(n);
              if (!(0, a.isSpace)(t)) return -1;
            }
            return n;
          }
          function i(e, t) {
            let r = e.bMarks[t] + e.tShift[t],
              n = e.eMarks[t],
              o = r;
            if (o + 1 >= n) return -1;
            let i = e.src.charCodeAt(o++);
            if (i < 48 || i > 57) return -1;
            for (;;) {
              if (o >= n) return -1;
              if ((i = e.src.charCodeAt(o++)) >= 48 && i <= 57) {
                if (o - r >= 10) return -1;
                continue;
              }
              if (41 === i || 46 === i) break;
              return -1;
            }
            return o < n && ((i = e.src.charCodeAt(o)), !(0, a.isSpace)(i))
              ? -1
              : o;
          }
          function s(e, t, r, n) {
            let a, s, l, c, u, p, d;
            let f = t,
              h = !0;
            if (
              e.sCount[f] - e.blkIndent >= 4 ||
              (e.listIndent >= 0 &&
                e.sCount[f] - e.listIndent >= 4 &&
                e.sCount[f] < e.blkIndent)
            )
              return !1;
            let m = !1;
            if (
              (n &&
                "paragraph" === e.parentType &&
                e.sCount[f] >= e.blkIndent &&
                (m = !0),
              (d = i(e, f)) >= 0)
            ) {
              if (
                ((u = !0),
                (l = e.bMarks[f] + e.tShift[f]),
                (p = Number(e.src.slice(l, d - 1))),
                m && 1 !== p)
              )
                return !1;
            } else {
              if (!((d = o(e, f)) >= 0)) return !1;
              u = !1;
            }
            if (m && e.skipSpaces(d) >= e.eMarks[f]) return !1;
            if (n) return !0;
            let g = e.src.charCodeAt(d - 1),
              b = e.tokens.length;
            u
              ? ((c = e.push("ordered_list_open", "ol", 1)),
                1 !== p && (c.attrs = [["start", p]]))
              : (c = e.push("bullet_list_open", "ul", 1));
            let x = [f, 0];
            ((c.map = x), (c.markup = String.fromCharCode(g)));
            let y = !1,
              v = e.md.block.ruler.getRules("list"),
              k = e.parentType;
            for (e.parentType = "list"; f < r;) {
              let t;
              ((s = d), (a = e.eMarks[f]));
              let n = e.sCount[f] + d - (e.bMarks[f] + e.tShift[f]),
                p = n;
              for (; s < a;) {
                let t = e.src.charCodeAt(s);
                if (9 === t) p += 4 - ((p + e.bsCount[f]) % 4);
                else if (32 === t) p++;
                else break;
                s++;
              }
              let m = s;
              (t = m >= a ? 1 : p - n) > 4 && (t = 1);
              let b = n + t;
              (c = e.push("list_item_open", "li", 1)).markup =
                String.fromCharCode(g);
              let x = [f, 0];
              ((c.map = x), u && (c.info = e.src.slice(l, d - 1)));
              let k = e.tight,
                w = e.tShift[f],
                _ = e.sCount[f],
                A = e.listIndent;
              if (
                ((e.listIndent = e.blkIndent),
                (e.blkIndent = b),
                (e.tight = !0),
                (e.tShift[f] = m - e.bMarks[f]),
                (e.sCount[f] = p),
                m >= a && e.isEmpty(f + 1)
                  ? (e.line = Math.min(e.line + 2, r))
                  : e.md.block.tokenize(e, f, r, !0),
                (!e.tight || y) && (h = !1),
                (y = e.line - f > 1 && e.isEmpty(e.line - 1)),
                (e.blkIndent = e.listIndent),
                (e.listIndent = A),
                (e.tShift[f] = w),
                (e.sCount[f] = _),
                (e.tight = k),
                ((c = e.push("list_item_close", "li", -1)).markup =
                  String.fromCharCode(g)),
                (f = e.line),
                (x[1] = f),
                f >= r ||
                  e.sCount[f] < e.blkIndent ||
                  e.sCount[f] - e.blkIndent >= 4)
              )
                break;
              let C = !1;
              for (let t = 0, n = v.length; t < n; t++)
                if (v[t](e, f, r, !0)) {
                  C = !0;
                  break;
                }
              if (C) break;
              if (u) {
                if ((d = i(e, f)) < 0) break;
                l = e.bMarks[f] + e.tShift[f];
              } else if ((d = o(e, f)) < 0) break;
              if (g !== e.src.charCodeAt(d - 1)) break;
            }
            return (
              ((c = u
                ? e.push("ordered_list_close", "ol", -1)
                : e.push("bullet_list_close", "ul", -1)).markup =
                String.fromCharCode(g)),
              (x[1] = f),
              (e.line = f),
              (e.parentType = k),
              h &&
                (function (e, t) {
                  let r = e.level + 2;
                  for (let n = t + 2, a = e.tokens.length - 2; n < a; n++)
                    e.tokens[n].level === r &&
                      "paragraph_open" === e.tokens[n].type &&
                      ((e.tokens[n + 2].hidden = !0),
                      (e.tokens[n].hidden = !0),
                      (n += 2));
                })(e, b),
              !0
            );
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "8rk3i": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t, r, n) {
            let o,
              i = e.bMarks[t] + e.tShift[t],
              s = e.eMarks[t],
              l = t + 1;
            if (e.sCount[t] - e.blkIndent >= 4 || 91 !== e.src.charCodeAt(i))
              return !1;
            function c(t) {
              let r = e.lineMax;
              if (t >= r || e.isEmpty(t)) return null;
              let n = !1;
              if (
                (e.sCount[t] - e.blkIndent > 3 && (n = !0),
                e.sCount[t] < 0 && (n = !0),
                !n)
              ) {
                let n = e.md.block.ruler.getRules("reference"),
                  a = e.parentType;
                e.parentType = "reference";
                let o = !1;
                for (let a = 0, i = n.length; a < i; a++)
                  if (n[a](e, t, r, !0)) {
                    o = !0;
                    break;
                  }
                if (((e.parentType = a), o)) return null;
              }
              let a = e.bMarks[t] + e.tShift[t],
                o = e.eMarks[t];
              return e.src.slice(a, o + 1);
            }
            let u = e.src.slice(i, s + 1);
            s = u.length;
            let p = -1;
            for (i = 1; i < s; i++) {
              let e = u.charCodeAt(i);
              if (91 === e) return !1;
              if (93 === e) {
                p = i;
                break;
              }
              if (10 === e) {
                let e = c(l);
                null !== e && ((u += e), (s = u.length), l++);
              } else if (92 === e && ++i < s && 10 === u.charCodeAt(i)) {
                let e = c(l);
                null !== e && ((u += e), (s = u.length), l++);
              }
            }
            if (p < 0 || 58 !== u.charCodeAt(p + 1)) return !1;
            for (i = p + 2; i < s; i++) {
              let e = u.charCodeAt(i);
              if (10 === e) {
                let e = c(l);
                null !== e && ((u += e), (s = u.length), l++);
              } else if ((0, a.isSpace)(e));
              else break;
            }
            let d = e.md.helpers.parseLinkDestination(u, i, s);
            if (!d.ok) return !1;
            let f = e.md.normalizeLink(d.str);
            if (!e.md.validateLink(f)) return !1;
            i = d.pos;
            let h = i,
              m = l,
              g = i;
            for (; i < s; i++) {
              let e = u.charCodeAt(i);
              if (10 === e) {
                let e = c(l);
                null !== e && ((u += e), (s = u.length), l++);
              } else if ((0, a.isSpace)(e));
              else break;
            }
            let b = e.md.helpers.parseLinkTitle(u, i, s);
            for (; b.can_continue;) {
              let t = c(l);
              if (null === t) break;
              ((u += t),
                (i = s),
                (s = u.length),
                l++,
                (b = e.md.helpers.parseLinkTitle(u, i, s, b)));
            }
            for (
              i < s && g !== i && b.ok
                ? ((o = b.str), (i = b.pos))
                : ((o = ""), (i = h), (l = m));
              i < s;
            ) {
              let e = u.charCodeAt(i);
              if (!(0, a.isSpace)(e)) break;
              i++;
            }
            if (i < s && 10 !== u.charCodeAt(i) && o)
              for (o = "", i = h, l = m; i < s;) {
                let e = u.charCodeAt(i);
                if (!(0, a.isSpace)(e)) break;
                i++;
              }
            if (i < s && 10 !== u.charCodeAt(i)) return !1;
            let x = (0, a.normalizeReference)(u.slice(1, p));
            return (
              !!x &&
              (!!n ||
                (void 0 === e.env.references && (e.env.references = {}),
                void 0 === e.env.references[x] &&
                  (e.env.references[x] = { title: o, href: f }),
                (e.line = l),
                !0))
            );
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      qe0Px: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => l));
          var a = e("../common/html_blocks.mjs"),
            o = n.interopDefault(a),
            i = e("../common/html_re.mjs");
          let s = [
            [
              /^<(script|pre|style|textarea)(?=(\s|>|$))/i,
              /<\/(script|pre|style|textarea)>/i,
              !0,
            ],
            [/^<!--/, /-->/, !0],
            [/^<\?/, /\?>/, !0],
            [/^<![A-Z]/, />/, !0],
            [/^<!\[CDATA\[/, /\]\]>/, !0],
            [
              RegExp(
                "^</?(" + (0, o.default).join("|") + ")(?=(\\s|/?>|$))",
                "i",
              ),
              /^$/,
              !0,
            ],
            [RegExp(i.HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, !1],
          ];
          function l(e, t, r, n) {
            let a = e.bMarks[t] + e.tShift[t],
              o = e.eMarks[t];
            if (
              e.sCount[t] - e.blkIndent >= 4 ||
              !e.md.options.html ||
              60 !== e.src.charCodeAt(a)
            )
              return !1;
            let i = e.src.slice(a, o),
              l = 0;
            for (; l < s.length && !s[l][0].test(i); l++);
            if (l === s.length) return !1;
            if (n) return s[l][2];
            let c = t + 1;
            if (!s[l][1].test(i)) {
              for (; c < r && !(e.sCount[c] < e.blkIndent); c++)
                if (
                  ((a = e.bMarks[c] + e.tShift[c]),
                  (o = e.eMarks[c]),
                  (i = e.src.slice(a, o)),
                  s[l][1].test(i))
                ) {
                  0 !== i.length && c++;
                  break;
                }
            }
            e.line = c;
            let u = e.push("html_block", "", 0);
            return (
              (u.map = [t, c]),
              (u.content = e.getLines(t, c, e.blkIndent, !0)),
              !0
            );
          }
        },
        {
          "../common/html_blocks.mjs": "kaZsj",
          "../common/html_re.mjs": "kkS8N",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      kaZsj: [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = [
              "address",
              "article",
              "aside",
              "base",
              "basefont",
              "blockquote",
              "body",
              "caption",
              "center",
              "col",
              "colgroup",
              "dd",
              "details",
              "dialog",
              "dir",
              "div",
              "dl",
              "dt",
              "fieldset",
              "figcaption",
              "figure",
              "footer",
              "form",
              "frame",
              "frameset",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "head",
              "header",
              "hr",
              "html",
              "iframe",
              "legend",
              "li",
              "link",
              "main",
              "menu",
              "menuitem",
              "nav",
              "noframes",
              "ol",
              "optgroup",
              "option",
              "p",
              "param",
              "search",
              "section",
              "summary",
              "table",
              "tbody",
              "td",
              "tfoot",
              "th",
              "thead",
              "title",
              "tr",
              "track",
              "ul",
            ]));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      kkS8N: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "HTML_TAG_RE", () => i),
            n.export(r, "HTML_OPEN_CLOSE_TAG_RE", () => s));
          let a =
              "<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>",
            o = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
            i = RegExp(
              "^(?:" +
                a +
                "|" +
                o +
                "|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)",
            ),
            s = RegExp("^(?:" + a + "|" + o + ")");
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      cSgSp: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t, r, n) {
            let o = e.bMarks[t] + e.tShift[t],
              i = e.eMarks[t];
            if (e.sCount[t] - e.blkIndent >= 4) return !1;
            let s = e.src.charCodeAt(o);
            if (35 !== s || o >= i) return !1;
            let l = 1;
            for (s = e.src.charCodeAt(++o); 35 === s && o < i && l <= 6;)
              (l++, (s = e.src.charCodeAt(++o)));
            if (l > 6 || (o < i && !(0, a.isSpace)(s))) return !1;
            if (n) return !0;
            i = e.skipSpacesBack(i, o);
            let c = e.skipCharsBack(i, 35, o);
            (c > o && (0, a.isSpace)(e.src.charCodeAt(c - 1)) && (i = c),
              (e.line = t + 1));
            let u = e.push("heading_open", "h" + String(l), 1);
            ((u.markup = "########".slice(0, l)), (u.map = [t, e.line]));
            let p = e.push("inline", "", 0);
            ((p.content = e.src.slice(o, i).trim()),
              (p.map = [t, e.line]),
              (p.children = []));
            let d = e.push("heading_close", "h" + String(l), -1);
            return ((d.markup = "########".slice(0, l)), !0);
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      jVBur: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e, t, r) {
            let n;
            let a = e.md.block.ruler.getRules("paragraph");
            if (e.sCount[t] - e.blkIndent >= 4) return !1;
            let o = e.parentType;
            e.parentType = "paragraph";
            let i = 0,
              s = t + 1;
            for (; s < r && !e.isEmpty(s); s++) {
              if (e.sCount[s] - e.blkIndent > 3) continue;
              if (e.sCount[s] >= e.blkIndent) {
                let t = e.bMarks[s] + e.tShift[s],
                  r = e.eMarks[s];
                if (
                  t < r &&
                  (45 === (n = e.src.charCodeAt(t)) || 61 === n) &&
                  ((t = e.skipChars(t, n)), (t = e.skipSpaces(t)) >= r)
                ) {
                  i = 61 === n ? 1 : 2;
                  break;
                }
              }
              if (e.sCount[s] < 0) continue;
              let t = !1;
              for (let n = 0, o = a.length; n < o; n++)
                if (a[n](e, s, r, !0)) {
                  t = !0;
                  break;
                }
              if (t) break;
            }
            if (!i) return !1;
            let l = e.getLines(t, s, e.blkIndent, !1).trim();
            e.line = s + 1;
            let c = e.push("heading_open", "h" + String(i), 1);
            ((c.markup = String.fromCharCode(n)), (c.map = [t, e.line]));
            let u = e.push("inline", "", 0);
            ((u.content = l), (u.map = [t, e.line - 1]), (u.children = []));
            let p = e.push("heading_close", "h" + String(i), -1);
            return (
              (p.markup = String.fromCharCode(n)),
              (e.parentType = o),
              !0
            );
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      lq3T3: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e, t, r) {
            let n = e.md.block.ruler.getRules("paragraph"),
              a = e.parentType,
              o = t + 1;
            for (e.parentType = "paragraph"; o < r && !e.isEmpty(o); o++) {
              if (e.sCount[o] - e.blkIndent > 3 || e.sCount[o] < 0) continue;
              let t = !1;
              for (let a = 0, i = n.length; a < i; a++)
                if (n[a](e, o, r, !0)) {
                  t = !0;
                  break;
                }
              if (t) break;
            }
            let i = e.getLines(t, o, e.blkIndent, !1).trim();
            e.line = o;
            let s = e.push("paragraph_open", "p", 1);
            s.map = [t, e.line];
            let l = e.push("inline", "", 0);
            return (
              (l.content = i),
              (l.map = [t, e.line]),
              (l.children = []),
              e.push("paragraph_close", "p", -1),
              (e.parentType = a),
              !0
            );
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      dgfdX: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("./ruler.mjs"),
            o = n.interopDefault(a),
            i = e("./rules_inline/state_inline.mjs"),
            s = n.interopDefault(i),
            l = e("./rules_inline/text.mjs"),
            c = n.interopDefault(l),
            u = e("./rules_inline/linkify.mjs"),
            p = n.interopDefault(u),
            d = e("./rules_inline/newline.mjs"),
            f = n.interopDefault(d),
            h = e("./rules_inline/escape.mjs"),
            m = n.interopDefault(h),
            g = e("./rules_inline/backticks.mjs"),
            b = n.interopDefault(g),
            x = e("./rules_inline/strikethrough.mjs"),
            y = n.interopDefault(x),
            v = e("./rules_inline/emphasis.mjs"),
            k = n.interopDefault(v),
            w = e("./rules_inline/link.mjs"),
            _ = n.interopDefault(w),
            A = e("./rules_inline/image.mjs"),
            C = n.interopDefault(A),
            E = e("./rules_inline/autolink.mjs"),
            j = n.interopDefault(E),
            I = e("./rules_inline/html_inline.mjs"),
            S = n.interopDefault(I),
            D = e("./rules_inline/entity.mjs"),
            F = n.interopDefault(D),
            T = e("./rules_inline/balance_pairs.mjs"),
            R = n.interopDefault(T),
            P = e("./rules_inline/fragments_join.mjs"),
            L = n.interopDefault(P);
          let O = [
              ["text", c.default],
              ["linkify", p.default],
              ["newline", f.default],
              ["escape", m.default],
              ["backticks", b.default],
              ["strikethrough", y.default.tokenize],
              ["emphasis", k.default.tokenize],
              ["link", _.default],
              ["image", C.default],
              ["autolink", j.default],
              ["html_inline", S.default],
              ["entity", F.default],
            ],
            N = [
              ["balance_pairs", R.default],
              ["strikethrough", y.default.postProcess],
              ["emphasis", k.default.postProcess],
              ["fragments_join", L.default],
            ];
          function M() {
            this.ruler = new o.default();
            for (let e = 0; e < O.length; e++)
              this.ruler.push(O[e][0], O[e][1]);
            this.ruler2 = new o.default();
            for (let e = 0; e < N.length; e++)
              this.ruler2.push(N[e][0], N[e][1]);
          }
          ((M.prototype.skipToken = function (e) {
            let t = e.pos,
              r = this.ruler.getRules(""),
              n = r.length,
              a = e.md.options.maxNesting,
              o = e.cache;
            if (void 0 !== o[t]) {
              e.pos = o[t];
              return;
            }
            let i = !1;
            if (e.level < a) {
              for (let a = 0; a < n; a++)
                if ((e.level++, (i = r[a](e, !0)), e.level--, i)) {
                  if (t >= e.pos)
                    throw Error("inline rule didn't increment state.pos");
                  break;
                }
            } else e.pos = e.posMax;
            (!i && e.pos++, (o[t] = e.pos));
          }),
            (M.prototype.tokenize = function (e) {
              let t = this.ruler.getRules(""),
                r = t.length,
                n = e.posMax,
                a = e.md.options.maxNesting;
              for (; e.pos < n;) {
                let o = e.pos,
                  i = !1;
                if (e.level < a) {
                  for (let n = 0; n < r; n++)
                    if ((i = t[n](e, !1))) {
                      if (o >= e.pos)
                        throw Error("inline rule didn't increment state.pos");
                      break;
                    }
                }
                if (i) {
                  if (e.pos >= n) break;
                  continue;
                }
                e.pending += e.src[e.pos++];
              }
              e.pending && e.pushPending();
            }),
            (M.prototype.parse = function (e, t, r, n) {
              let a = new this.State(e, t, r, n);
              this.tokenize(a);
              let o = this.ruler2.getRules(""),
                i = o.length;
              for (let e = 0; e < i; e++) o[e](a);
            }),
            (M.prototype.State = s.default),
            (r.default = M));
        },
        {
          "./ruler.mjs": "lrUlM",
          "./rules_inline/state_inline.mjs": "lmacU",
          "./rules_inline/text.mjs": "1kOIU",
          "./rules_inline/linkify.mjs": "gDUm5",
          "./rules_inline/newline.mjs": "irYj1",
          "./rules_inline/escape.mjs": "1xP5B",
          "./rules_inline/backticks.mjs": "4SEBq",
          "./rules_inline/strikethrough.mjs": "efNqW",
          "./rules_inline/emphasis.mjs": "4pJY4",
          "./rules_inline/link.mjs": "9w8aZ",
          "./rules_inline/image.mjs": "evbjm",
          "./rules_inline/autolink.mjs": "3UBqT",
          "./rules_inline/html_inline.mjs": "01uUt",
          "./rules_inline/entity.mjs": "hRL5a",
          "./rules_inline/balance_pairs.mjs": "83TVR",
          "./rules_inline/fragments_join.mjs": "am8Bm",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      lmacU: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("../token.mjs"),
            o = n.interopDefault(a),
            i = e("../common/utils.mjs");
          function s(e, t, r, n) {
            ((this.src = e),
              (this.env = r),
              (this.md = t),
              (this.tokens = n),
              (this.tokens_meta = Array(n.length)),
              (this.pos = 0),
              (this.posMax = this.src.length),
              (this.level = 0),
              (this.pending = ""),
              (this.pendingLevel = 0),
              (this.cache = {}),
              (this.delimiters = []),
              (this._prev_delimiters = []),
              (this.backticks = {}),
              (this.backticksScanned = !1),
              (this.linkLevel = 0));
          }
          ((s.prototype.pushPending = function () {
            let e = new o.default("text", "", 0);
            return (
              (e.content = this.pending),
              (e.level = this.pendingLevel),
              this.tokens.push(e),
              (this.pending = ""),
              e
            );
          }),
            (s.prototype.push = function (e, t, r) {
              this.pending && this.pushPending();
              let n = new o.default(e, t, r),
                a = null;
              return (
                r < 0 &&
                  (this.level--,
                  (this.delimiters = this._prev_delimiters.pop())),
                (n.level = this.level),
                r > 0 &&
                  (this.level++,
                  this._prev_delimiters.push(this.delimiters),
                  (this.delimiters = []),
                  (a = { delimiters: this.delimiters })),
                (this.pendingLevel = this.level),
                this.tokens.push(n),
                this.tokens_meta.push(a),
                n
              );
            }),
            (s.prototype.scanDelims = function (e, t) {
              let r = this.posMax,
                n = this.src.charCodeAt(e),
                a = e > 0 ? this.src.charCodeAt(e - 1) : 32,
                o = e;
              for (; o < r && this.src.charCodeAt(o) === n;) o++;
              let s = o - e,
                l = o < r ? this.src.charCodeAt(o) : 32,
                c =
                  (0, i.isMdAsciiPunct)(a) ||
                  (0, i.isPunctChar)(String.fromCharCode(a)),
                u =
                  (0, i.isMdAsciiPunct)(l) ||
                  (0, i.isPunctChar)(String.fromCharCode(l)),
                p = (0, i.isWhiteSpace)(a),
                d = (0, i.isWhiteSpace)(l),
                f = !d && (!u || p || c),
                h = !p && (!c || d || u);
              return {
                can_open: f && (t || !h || c),
                can_close: h && (t || !f || u),
                length: s,
              };
            }),
            (s.prototype.Token = o.default),
            (r.default = s));
        },
        {
          "../token.mjs": "fwPe8",
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "1kOIU": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e, t) {
            let r = e.pos;
            for (
              ;
              r < e.posMax &&
              !(function (e) {
                switch (e) {
                  case 10:
                  case 33:
                  case 35:
                  case 36:
                  case 37:
                  case 38:
                  case 42:
                  case 43:
                  case 45:
                  case 58:
                  case 60:
                  case 61:
                  case 62:
                  case 64:
                  case 91:
                  case 92:
                  case 93:
                  case 94:
                  case 95:
                  case 96:
                  case 123:
                  case 125:
                  case 126:
                    return !0;
                  default:
                    return !1;
                }
              })(e.src.charCodeAt(r));
            )
              r++;
            return (
              r !== e.pos &&
              (t || (e.pending += e.src.slice(e.pos, r)), (e.pos = r), !0)
            );
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      gDUm5: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          let a = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
          function o(e, t) {
            if (!e.md.options.linkify || e.linkLevel > 0) return !1;
            let r = e.pos,
              n = e.posMax;
            if (
              r + 3 > n ||
              58 !== e.src.charCodeAt(r) ||
              47 !== e.src.charCodeAt(r + 1) ||
              47 !== e.src.charCodeAt(r + 2)
            )
              return !1;
            let o = e.pending.match(a);
            if (!o) return !1;
            let i = o[1],
              s = e.md.linkify.matchAtStart(e.src.slice(r - i.length));
            if (!s) return !1;
            let l = s.url;
            if (l.length <= i.length) return !1;
            let c = l.length;
            for (; c > 0 && 42 === l.charCodeAt(c - 1);) c--;
            c !== l.length && (l = l.slice(0, c));
            let u = e.md.normalizeLink(l);
            if (!e.md.validateLink(u)) return !1;
            if (!t) {
              e.pending = e.pending.slice(0, -i.length);
              let t = e.push("link_open", "a", 1);
              ((t.attrs = [["href", u]]),
                (t.markup = "linkify"),
                (t.info = "auto"));
              let r = e.push("text", "", 0);
              r.content = e.md.normalizeLinkText(l);
              let n = e.push("link_close", "a", -1);
              ((n.markup = "linkify"), (n.info = "auto"));
            }
            return ((e.pos += l.length - i.length), !0);
          }
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      irYj1: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t) {
            let r = e.pos;
            if (10 !== e.src.charCodeAt(r)) return !1;
            let n = e.pending.length - 1,
              o = e.posMax;
            if (!t) {
              if (n >= 0 && 32 === e.pending.charCodeAt(n)) {
                if (n >= 1 && 32 === e.pending.charCodeAt(n - 1)) {
                  let t = n - 1;
                  for (; t >= 1 && 32 === e.pending.charCodeAt(t - 1);) t--;
                  ((e.pending = e.pending.slice(0, t)),
                    e.push("hardbreak", "br", 0));
                } else
                  ((e.pending = e.pending.slice(0, -1)),
                    e.push("softbreak", "br", 0));
              } else e.push("softbreak", "br", 0);
            }
            for (r++; r < o && (0, a.isSpace)(e.src.charCodeAt(r));) r++;
            return ((e.pos = r), !0);
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "1xP5B": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => i));
          var a = e("../common/utils.mjs");
          let o = [];
          for (let e = 0; e < 256; e++) o.push(0);
          function i(e, t) {
            let r = e.pos,
              n = e.posMax;
            if (92 !== e.src.charCodeAt(r) || ++r >= n) return !1;
            let i = e.src.charCodeAt(r);
            if (10 === i) {
              for (
                t || e.push("hardbreak", "br", 0), r++;
                r < n && ((i = e.src.charCodeAt(r)), (0, a.isSpace)(i));
              )
                r++;
              return ((e.pos = r), !0);
            }
            let s = e.src[r];
            if (i >= 55296 && i <= 56319 && r + 1 < n) {
              let t = e.src.charCodeAt(r + 1);
              t >= 56320 && t <= 57343 && ((s += e.src[r + 1]), r++);
            }
            let l = "\\" + s;
            if (!t) {
              let t = e.push("text_special", "", 0);
              (i < 256 && 0 !== o[i] ? (t.content = s) : (t.content = l),
                (t.markup = l),
                (t.info = "escape"));
            }
            return ((e.pos = r + 1), !0);
          }
          "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (e) {
            o[e.charCodeAt(0)] = 1;
          });
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "4SEBq": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e, t) {
            let r,
              n = e.pos,
              a = e.src.charCodeAt(n);
            if (96 !== a) return !1;
            let o = n;
            n++;
            let i = e.posMax;
            for (; n < i && 96 === e.src.charCodeAt(n);) n++;
            let s = e.src.slice(o, n),
              l = s.length;
            if (e.backticksScanned && (e.backticks[l] || 0) <= o)
              return (t || (e.pending += s), (e.pos += l), !0);
            let c = n;
            for (; -1 !== (r = e.src.indexOf("`", c));) {
              for (c = r + 1; c < i && 96 === e.src.charCodeAt(c);) c++;
              let a = c - r;
              if (a === l) {
                if (!t) {
                  let t = e.push("code_inline", "code", 0);
                  ((t.markup = s),
                    (t.content = e.src
                      .slice(n, r)
                      .replace(/\n/g, " ")
                      .replace(/^ (.+) $/, "$1")));
                }
                return ((e.pos = c), !0);
              }
              e.backticks[a] = r;
            }
            return (
              (e.backticksScanned = !0),
              t || (e.pending += s),
              (e.pos += l),
              !0
            );
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      efNqW: [
        function (e, t, r) {
          function n(e, t) {
            let r;
            let n = [],
              a = t.length;
            for (let o = 0; o < a; o++) {
              let a = t[o];
              if (126 !== a.marker || -1 === a.end) continue;
              let i = t[a.end];
              (((r = e.tokens[a.token]).type = "s_open"),
                (r.tag = "s"),
                (r.nesting = 1),
                (r.markup = "~~"),
                (r.content = ""),
                ((r = e.tokens[i.token]).type = "s_close"),
                (r.tag = "s"),
                (r.nesting = -1),
                (r.markup = "~~"),
                (r.content = ""),
                "text" === e.tokens[i.token - 1].type &&
                  "~" === e.tokens[i.token - 1].content &&
                  n.push(i.token - 1));
            }
            for (; n.length;) {
              let t = n.pop(),
                a = t + 1;
              for (; a < e.tokens.length && "s_close" === e.tokens[a].type;)
                a++;
              t !== --a &&
                ((r = e.tokens[a]),
                (e.tokens[a] = e.tokens[t]),
                (e.tokens[t] = r));
            }
          }
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = {
              tokenize: function (e, t) {
                let r = e.pos,
                  n = e.src.charCodeAt(r);
                if (t || 126 !== n) return !1;
                let a = e.scanDelims(e.pos, !0),
                  o = a.length,
                  i = String.fromCharCode(n);
                if (o < 2) return !1;
                o % 2 && ((e.push("text", "", 0).content = i), o--);
                for (let t = 0; t < o; t += 2)
                  ((e.push("text", "", 0).content = i + i),
                    e.delimiters.push({
                      marker: n,
                      length: 0,
                      token: e.tokens.length - 1,
                      end: -1,
                      open: a.can_open,
                      close: a.can_close,
                    }));
                return ((e.pos += a.length), !0);
              },
              postProcess: function (e) {
                let t = e.tokens_meta,
                  r = e.tokens_meta.length;
                n(e, e.delimiters);
                for (let a = 0; a < r; a++)
                  t[a] && t[a].delimiters && n(e, t[a].delimiters);
              },
            }));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "4pJY4": [
        function (e, t, r) {
          function n(e, t) {
            let r = t.length;
            for (let n = r - 1; n >= 0; n--) {
              let r = t[n];
              if ((95 !== r.marker && 42 !== r.marker) || -1 === r.end)
                continue;
              let a = t[r.end],
                o =
                  n > 0 &&
                  t[n - 1].end === r.end + 1 &&
                  t[n - 1].marker === r.marker &&
                  t[n - 1].token === r.token - 1 &&
                  t[r.end + 1].token === a.token + 1,
                i = String.fromCharCode(r.marker),
                s = e.tokens[r.token];
              ((s.type = o ? "strong_open" : "em_open"),
                (s.tag = o ? "strong" : "em"),
                (s.nesting = 1),
                (s.markup = o ? i + i : i),
                (s.content = ""));
              let l = e.tokens[a.token];
              ((l.type = o ? "strong_close" : "em_close"),
                (l.tag = o ? "strong" : "em"),
                (l.nesting = -1),
                (l.markup = o ? i + i : i),
                (l.content = ""),
                o &&
                  ((e.tokens[t[n - 1].token].content = ""),
                  (e.tokens[t[r.end + 1].token].content = ""),
                  n--));
            }
          }
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = {
              tokenize: function (e, t) {
                let r = e.pos,
                  n = e.src.charCodeAt(r);
                if (t || (95 !== n && 42 !== n)) return !1;
                let a = e.scanDelims(e.pos, 42 === n);
                for (let t = 0; t < a.length; t++) {
                  let t = e.push("text", "", 0);
                  ((t.content = String.fromCharCode(n)),
                    e.delimiters.push({
                      marker: n,
                      length: a.length,
                      token: e.tokens.length - 1,
                      end: -1,
                      open: a.can_open,
                      close: a.can_close,
                    }));
                }
                return ((e.pos += a.length), !0);
              },
              postProcess: function (e) {
                let t = e.tokens_meta,
                  r = e.tokens_meta.length;
                n(e, e.delimiters);
                for (let a = 0; a < r; a++)
                  t[a] && t[a].delimiters && n(e, t[a].delimiters);
              },
            }));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "9w8aZ": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t) {
            let r, n, o, i;
            let s = "",
              l = "",
              c = e.pos,
              u = !0;
            if (91 !== e.src.charCodeAt(e.pos)) return !1;
            let p = e.pos,
              d = e.posMax,
              f = e.pos + 1,
              h = e.md.helpers.parseLinkLabel(e, e.pos, !0);
            if (h < 0) return !1;
            let m = h + 1;
            if (m < d && 40 === e.src.charCodeAt(m)) {
              for (
                u = !1, m++;
                m < d &&
                ((r = e.src.charCodeAt(m)), (0, a.isSpace)(r) || 10 === r);
                m++
              );
              if (m >= d) return !1;
              if (
                ((c = m),
                (o = e.md.helpers.parseLinkDestination(e.src, m, e.posMax)).ok)
              ) {
                for (
                  s = e.md.normalizeLink(o.str),
                    e.md.validateLink(s) ? (m = o.pos) : (s = ""),
                    c = m;
                  m < d &&
                  ((r = e.src.charCodeAt(m)), (0, a.isSpace)(r) || 10 === r);
                  m++
                );
                if (
                  ((o = e.md.helpers.parseLinkTitle(e.src, m, e.posMax)),
                  m < d && c !== m && o.ok)
                )
                  for (
                    l = o.str, m = o.pos;
                    m < d &&
                    ((r = e.src.charCodeAt(m)), (0, a.isSpace)(r) || 10 === r);
                    m++
                  );
              }
              ((m >= d || 41 !== e.src.charCodeAt(m)) && (u = !0), m++);
            }
            if (u) {
              if (void 0 === e.env.references) return !1;
              if (
                (m < d && 91 === e.src.charCodeAt(m)
                  ? ((c = m + 1),
                    (m = e.md.helpers.parseLinkLabel(e, m)) >= 0
                      ? (n = e.src.slice(c, m++))
                      : (m = h + 1))
                  : (m = h + 1),
                n || (n = e.src.slice(f, h)),
                !(i = e.env.references[(0, a.normalizeReference)(n)]))
              )
                return ((e.pos = p), !1);
              ((s = i.href), (l = i.title));
            }
            if (!t) {
              ((e.pos = f), (e.posMax = h));
              let t = e.push("link_open", "a", 1),
                r = [["href", s]];
              ((t.attrs = r),
                l && r.push(["title", l]),
                e.linkLevel++,
                e.md.inline.tokenize(e),
                e.linkLevel--,
                e.push("link_close", "a", -1));
            }
            return ((e.pos = m), (e.posMax = d), !0);
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      evbjm: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/utils.mjs");
          function o(e, t) {
            let r, n, o, i, s, l, c, u;
            let p = "",
              d = e.pos,
              f = e.posMax;
            if (
              33 !== e.src.charCodeAt(e.pos) ||
              91 !== e.src.charCodeAt(e.pos + 1)
            )
              return !1;
            let h = e.pos + 2,
              m = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
            if (m < 0) return !1;
            if ((i = m + 1) < f && 40 === e.src.charCodeAt(i)) {
              for (
                i++;
                i < f &&
                ((r = e.src.charCodeAt(i)), (0, a.isSpace)(r) || 10 === r);
                i++
              );
              if (i >= f) return !1;
              for (
                u = i,
                  (l = e.md.helpers.parseLinkDestination(e.src, i, e.posMax))
                    .ok &&
                    ((p = e.md.normalizeLink(l.str)),
                    e.md.validateLink(p) ? (i = l.pos) : (p = "")),
                  u = i;
                i < f &&
                ((r = e.src.charCodeAt(i)), (0, a.isSpace)(r) || 10 === r);
                i++
              );
              if (
                ((l = e.md.helpers.parseLinkTitle(e.src, i, e.posMax)),
                i < f && u !== i && l.ok)
              )
                for (
                  c = l.str, i = l.pos;
                  i < f &&
                  ((r = e.src.charCodeAt(i)), (0, a.isSpace)(r) || 10 === r);
                  i++
                );
              else c = "";
              if (i >= f || 41 !== e.src.charCodeAt(i))
                return ((e.pos = d), !1);
              i++;
            } else {
              if (void 0 === e.env.references) return !1;
              if (
                (i < f && 91 === e.src.charCodeAt(i)
                  ? ((u = i + 1),
                    (i = e.md.helpers.parseLinkLabel(e, i)) >= 0
                      ? (o = e.src.slice(u, i++))
                      : (i = m + 1))
                  : (i = m + 1),
                o || (o = e.src.slice(h, m)),
                !(s = e.env.references[(0, a.normalizeReference)(o)]))
              )
                return ((e.pos = d), !1);
              ((p = s.href), (c = s.title));
            }
            if (!t) {
              n = e.src.slice(h, m);
              let t = [];
              e.md.inline.parse(n, e.md, e.env, t);
              let r = e.push("image", "img", 0),
                a = [
                  ["src", p],
                  ["alt", ""],
                ];
              ((r.attrs = a),
                (r.children = t),
                (r.content = n),
                c && a.push(["title", c]));
            }
            return ((e.pos = i), (e.posMax = f), !0);
          }
        },
        {
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "3UBqT": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => i));
          let a =
              /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
            o = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
          function i(e, t) {
            let r = e.pos;
            if (60 !== e.src.charCodeAt(r)) return !1;
            let n = e.pos,
              i = e.posMax;
            for (;;) {
              if (++r >= i) return !1;
              let t = e.src.charCodeAt(r);
              if (60 === t) return !1;
              if (62 === t) break;
            }
            let s = e.src.slice(n + 1, r);
            if (o.test(s)) {
              let r = e.md.normalizeLink(s);
              if (!e.md.validateLink(r)) return !1;
              if (!t) {
                let t = e.push("link_open", "a", 1);
                ((t.attrs = [["href", r]]),
                  (t.markup = "autolink"),
                  (t.info = "auto"));
                let n = e.push("text", "", 0);
                n.content = e.md.normalizeLinkText(s);
                let a = e.push("link_close", "a", -1);
                ((a.markup = "autolink"), (a.info = "auto"));
              }
              return ((e.pos += s.length + 2), !0);
            }
            if (a.test(s)) {
              let r = e.md.normalizeLink("mailto:" + s);
              if (!e.md.validateLink(r)) return !1;
              if (!t) {
                let t = e.push("link_open", "a", 1);
                ((t.attrs = [["href", r]]),
                  (t.markup = "autolink"),
                  (t.info = "auto"));
                let n = e.push("text", "", 0);
                n.content = e.md.normalizeLinkText(s);
                let a = e.push("link_close", "a", -1);
                ((a.markup = "autolink"), (a.info = "auto"));
              }
              return ((e.pos += s.length + 2), !0);
            }
            return !1;
          }
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "01uUt": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
          var a = e("../common/html_re.mjs");
          function o(e, t) {
            if (!e.md.options.html) return !1;
            let r = e.posMax,
              n = e.pos;
            if (60 !== e.src.charCodeAt(n) || n + 2 >= r) return !1;
            let o = e.src.charCodeAt(n + 1);
            if (
              33 !== o &&
              63 !== o &&
              47 !== o &&
              !(function (e) {
                let t = 32 | e;
                return t >= 97 && t <= 122;
              })(o)
            )
              return !1;
            let i = e.src.slice(n).match(a.HTML_TAG_RE);
            if (!i) return !1;
            if (!t) {
              var s, l;
              let t = e.push("html_inline", "", 0);
              ((t.content = i[0]),
                (s = t.content),
                /^<a[>\s]/i.test(s) && e.linkLevel++,
                (l = t.content),
                /^<\/a\s*>/i.test(l) && e.linkLevel--);
            }
            return ((e.pos += i[0].length), !0);
          }
        },
        {
          "../common/html_re.mjs": "kkS8N",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      hRL5a: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r), n.export(r, "default", () => l));
          var a = e("entities"),
            o = e("../common/utils.mjs");
          let i = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
            s = /^&([a-z][a-z0-9]{1,31});/i;
          function l(e, t) {
            let r = e.pos,
              n = e.posMax;
            if (38 !== e.src.charCodeAt(r) || r + 1 >= n) return !1;
            let l = e.src.charCodeAt(r + 1);
            if (35 === l) {
              let n = e.src.slice(r).match(i);
              if (n) {
                if (!t) {
                  let t =
                      "x" === n[1][0].toLowerCase()
                        ? parseInt(n[1].slice(1), 16)
                        : parseInt(n[1], 10),
                    r = e.push("text_special", "", 0);
                  ((r.content = (0, o.isValidEntityCode)(t)
                    ? (0, o.fromCodePoint)(t)
                    : (0, o.fromCodePoint)(65533)),
                    (r.markup = n[0]),
                    (r.info = "entity"));
                }
                return ((e.pos += n[0].length), !0);
              }
            } else {
              let n = e.src.slice(r).match(s);
              if (n) {
                let r = (0, a.decodeHTML)(n[0]);
                if (r !== n[0]) {
                  if (!t) {
                    let t = e.push("text_special", "", 0);
                    ((t.content = r), (t.markup = n[0]), (t.info = "entity"));
                  }
                  return ((e.pos += n[0].length), !0);
                }
              }
            }
            return !1;
          }
        },
        {
          entities: "gEAz9",
          "../common/utils.mjs": "4QLOI",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "83TVR": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e) {
            let t = {},
              r = e.length;
            if (!r) return;
            let n = 0,
              a = -2,
              o = [];
            for (let i = 0; i < r; i++) {
              let r = e[i];
              if (
                (o.push(0),
                (e[n].marker !== r.marker || a !== r.token - 1) && (n = i),
                (a = r.token),
                (r.length = r.length || 0),
                !r.close)
              )
                continue;
              t.hasOwnProperty(r.marker) ||
                (t[r.marker] = [-1, -1, -1, -1, -1, -1]);
              let s = t[r.marker][(r.open ? 3 : 0) + (r.length % 3)],
                l = n - o[n] - 1,
                c = l;
              for (; l > s; l -= o[l] + 1) {
                let t = e[l];
                if (t.marker === r.marker && t.open && t.end < 0) {
                  let n = !1;
                  if (
                    ((t.close || r.open) &&
                      (t.length + r.length) % 3 == 0 &&
                      (t.length % 3 != 0 || r.length % 3 != 0) &&
                      (n = !0),
                    !n)
                  ) {
                    let n = l > 0 && !e[l - 1].open ? o[l - 1] + 1 : 0;
                    ((o[i] = i - l + n),
                      (o[l] = n),
                      (r.open = !1),
                      (t.end = i),
                      (t.close = !1),
                      (c = -1),
                      (a = -2));
                    break;
                  }
                }
              }
              -1 !== c &&
                (t[r.marker][(r.open ? 3 : 0) + ((r.length || 0) % 3)] = c);
            }
          }
          function o(e) {
            let t = e.tokens_meta,
              r = e.tokens_meta.length;
            a(e.delimiters);
            for (let e = 0; e < r; e++)
              t[e] && t[e].delimiters && a(t[e].delimiters);
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => o));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      am8Bm: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          function a(e) {
            let t, r;
            let n = 0,
              a = e.tokens,
              o = e.tokens.length;
            for (t = r = 0; t < o; t++)
              (a[t].nesting < 0 && n--,
                (a[t].level = n),
                a[t].nesting > 0 && n++,
                "text" === a[t].type && t + 1 < o && "text" === a[t + 1].type
                  ? (a[t + 1].content = a[t].content + a[t + 1].content)
                  : (t !== r && (a[r] = a[t]), r++));
            t !== r && (a.length = r);
          }
          (n.defineInteropFlag(r), n.export(r, "default", () => a));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "7OsUs": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          n.defineInteropFlag(r);
          var a = e("./lib/re.mjs"),
            o = n.interopDefault(a);
          function i(e) {
            let t = Array.prototype.slice.call(arguments, 1);
            return (
              t.forEach(function (t) {
                t &&
                  Object.keys(t).forEach(function (r) {
                    e[r] = t[r];
                  });
              }),
              e
            );
          }
          function s(e) {
            return Object.prototype.toString.call(e);
          }
          function l(e) {
            return "[object Function]" === s(e);
          }
          function c(e) {
            return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
          }
          let u = { fuzzyLink: !0, fuzzyEmail: !0, fuzzyIP: !1 },
            p = {
              "http:": {
                validate: function (e, t, r) {
                  let n = e.slice(t);
                  return (r.re.http ||
                    (r.re.http = RegExp(
                      "^\\/\\/" +
                        r.re.src_auth +
                        r.re.src_host_port_strict +
                        r.re.src_path,
                      "i",
                    )),
                  r.re.http.test(n))
                    ? n.match(r.re.http)[0].length
                    : 0;
                },
              },
              "https:": "http:",
              "ftp:": "http:",
              "//": {
                validate: function (e, t, r) {
                  let n = e.slice(t);
                  return (r.re.no_http ||
                    (r.re.no_http = RegExp(
                      "^" +
                        r.re.src_auth +
                        "(?:localhost|(?:(?:" +
                        r.re.src_domain +
                        ")\\.)+" +
                        r.re.src_domain_root +
                        ")" +
                        r.re.src_port +
                        r.re.src_host_terminator +
                        r.re.src_path,
                      "i",
                    )),
                  r.re.no_http.test(n))
                    ? (t >= 3 && ":" === e[t - 3]) ||
                      (t >= 3 && "/" === e[t - 3])
                      ? 0
                      : n.match(r.re.no_http)[0].length
                    : 0;
                },
              },
              "mailto:": {
                validate: function (e, t, r) {
                  let n = e.slice(t);
                  return (r.re.mailto ||
                    (r.re.mailto = RegExp(
                      "^" + r.re.src_email_name + "@" + r.re.src_host_strict,
                      "i",
                    )),
                  r.re.mailto.test(n))
                    ? n.match(r.re.mailto)[0].length
                    : 0;
                },
              },
            },
            d =
              "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split(
                "|",
              );
          function f() {
            return function (e, t) {
              t.normalize(e);
            };
          }
          function h(e) {
            let t = (e.re = (0, o.default)(e.__opts__)),
              r = e.__tlds__.slice();
            function n(e) {
              return e.replace("%TLDS%", t.src_tlds);
            }
            (e.onCompile(),
              e.__tlds_replaced__ ||
                r.push(
                  "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
                ),
              r.push(t.src_xn),
              (t.src_tlds = r.join("|")),
              (t.email_fuzzy = RegExp(n(t.tpl_email_fuzzy), "i")),
              (t.link_fuzzy = RegExp(n(t.tpl_link_fuzzy), "i")),
              (t.link_no_ip_fuzzy = RegExp(n(t.tpl_link_no_ip_fuzzy), "i")),
              (t.host_fuzzy_test = RegExp(n(t.tpl_host_fuzzy_test), "i")));
            let a = [];
            function i(e, t) {
              throw Error('(LinkifyIt) Invalid schema "' + e + '": ' + t);
            }
            ((e.__compiled__ = {}),
              Object.keys(e.__schemas__).forEach(function (t) {
                let r = e.__schemas__[t];
                if (null === r) return;
                let n = { validate: null, link: null };
                if (((e.__compiled__[t] = n), "[object Object]" === s(r))) {
                  if ("[object RegExp]" === s(r.validate)) {
                    var o;
                    n.validate =
                      ((o = r.validate),
                      function (e, t) {
                        let r = e.slice(t);
                        return o.test(r) ? r.match(o)[0].length : 0;
                      });
                  } else l(r.validate) ? (n.validate = r.validate) : i(t, r);
                  l(r.normalize)
                    ? (n.normalize = r.normalize)
                    : r.normalize
                      ? i(t, r)
                      : (n.normalize = f());
                  return;
                }
                if ("[object String]" === s(r)) {
                  a.push(t);
                  return;
                }
                i(t, r);
              }),
              a.forEach(function (t) {
                e.__compiled__[e.__schemas__[t]] &&
                  ((e.__compiled__[t].validate =
                    e.__compiled__[e.__schemas__[t]].validate),
                  (e.__compiled__[t].normalize =
                    e.__compiled__[e.__schemas__[t]].normalize));
              }),
              (e.__compiled__[""] = { validate: null, normalize: f() }));
            let u = Object.keys(e.__compiled__)
              .filter(function (t) {
                return t.length > 0 && e.__compiled__[t];
              })
              .map(c)
              .join("|");
            ((e.re.schema_test = RegExp(
              "(^|(?!_)(?:[><\uff5c]|" + t.src_ZPCc + "))(" + u + ")",
              "i",
            )),
              (e.re.schema_search = RegExp(
                "(^|(?!_)(?:[><\uff5c]|" + t.src_ZPCc + "))(" + u + ")",
                "ig",
              )),
              (e.re.schema_at_start = RegExp(
                "^" + e.re.schema_search.source,
                "i",
              )),
              (e.re.pretest = RegExp(
                "(" +
                  e.re.schema_test.source +
                  ")|(" +
                  e.re.host_fuzzy_test.source +
                  ")|@",
                "i",
              )),
              (e.__index__ = -1),
              (e.__text_cache__ = ""));
          }
          function m(e, t) {
            let r = e.__index__,
              n = e.__last_index__,
              a = e.__text_cache__.slice(r, n);
            ((this.schema = e.__schema__.toLowerCase()),
              (this.index = r + t),
              (this.lastIndex = n + t),
              (this.raw = a),
              (this.text = a),
              (this.url = a));
          }
          function g(e, t) {
            let r = new m(e, t);
            return (e.__compiled__[r.schema].normalize(r, e), r);
          }
          function b(e, t) {
            if (!(this instanceof b)) return new b(e, t);
            (!t &&
              Object.keys(e || {}).reduce(function (e, t) {
                return e || u.hasOwnProperty(t);
              }, !1) &&
              ((t = e), (e = {})),
              (this.__opts__ = i({}, u, t)),
              (this.__index__ = -1),
              (this.__last_index__ = -1),
              (this.__schema__ = ""),
              (this.__text_cache__ = ""),
              (this.__schemas__ = i({}, p, e)),
              (this.__compiled__ = {}),
              (this.__tlds__ = d),
              (this.__tlds_replaced__ = !1),
              (this.re = {}),
              h(this));
          }
          ((b.prototype.add = function (e, t) {
            return ((this.__schemas__[e] = t), h(this), this);
          }),
            (b.prototype.set = function (e) {
              return ((this.__opts__ = i(this.__opts__, e)), this);
            }),
            (b.prototype.test = function (e) {
              let t, r, n, a, o, i, s, l;
              if (((this.__text_cache__ = e), (this.__index__ = -1), !e.length))
                return !1;
              if (this.re.schema_test.test(e)) {
                for (
                  (s = this.re.schema_search).lastIndex = 0;
                  null !== (t = s.exec(e));
                )
                  if ((a = this.testSchemaAt(e, t[2], s.lastIndex))) {
                    ((this.__schema__ = t[2]),
                      (this.__index__ = t.index + t[1].length),
                      (this.__last_index__ = t.index + t[0].length + a));
                    break;
                  }
              }
              return (
                this.__opts__.fuzzyLink &&
                  this.__compiled__["http:"] &&
                  (l = e.search(this.re.host_fuzzy_test)) >= 0 &&
                  (this.__index__ < 0 || l < this.__index__) &&
                  null !==
                    (r = e.match(
                      this.__opts__.fuzzyIP
                        ? this.re.link_fuzzy
                        : this.re.link_no_ip_fuzzy,
                    )) &&
                  ((o = r.index + r[1].length),
                  (this.__index__ < 0 || o < this.__index__) &&
                    ((this.__schema__ = ""),
                    (this.__index__ = o),
                    (this.__last_index__ = r.index + r[0].length))),
                this.__opts__.fuzzyEmail &&
                  this.__compiled__["mailto:"] &&
                  e.indexOf("@") >= 0 &&
                  null !== (n = e.match(this.re.email_fuzzy)) &&
                  ((o = n.index + n[1].length),
                  (i = n.index + n[0].length),
                  (this.__index__ < 0 ||
                    o < this.__index__ ||
                    (o === this.__index__ && i > this.__last_index__)) &&
                    ((this.__schema__ = "mailto:"),
                    (this.__index__ = o),
                    (this.__last_index__ = i))),
                this.__index__ >= 0
              );
            }),
            (b.prototype.pretest = function (e) {
              return this.re.pretest.test(e);
            }),
            (b.prototype.testSchemaAt = function (e, t, r) {
              return this.__compiled__[t.toLowerCase()]
                ? this.__compiled__[t.toLowerCase()].validate(e, r, this)
                : 0;
            }),
            (b.prototype.match = function (e) {
              let t = [],
                r = 0;
              this.__index__ >= 0 &&
                this.__text_cache__ === e &&
                (t.push(g(this, r)), (r = this.__last_index__));
              let n = r ? e.slice(r) : e;
              for (; this.test(n);)
                (t.push(g(this, r)),
                  (n = n.slice(this.__last_index__)),
                  (r += this.__last_index__));
              return t.length ? t : null;
            }),
            (b.prototype.matchAtStart = function (e) {
              if (((this.__text_cache__ = e), (this.__index__ = -1), !e.length))
                return null;
              let t = this.re.schema_at_start.exec(e);
              if (!t) return null;
              let r = this.testSchemaAt(e, t[2], t[0].length);
              return r
                ? ((this.__schema__ = t[2]),
                  (this.__index__ = t.index + t[1].length),
                  (this.__last_index__ = t.index + t[0].length + r),
                  g(this, 0))
                : null;
            }),
            (b.prototype.tlds = function (e, t) {
              return (
                ((e = Array.isArray(e) ? e : [e]), t)
                  ? (this.__tlds__ = this.__tlds__
                      .concat(e)
                      .sort()
                      .filter(function (e, t, r) {
                        return e !== r[t - 1];
                      })
                      .reverse())
                  : ((this.__tlds__ = e.slice()),
                    (this.__tlds_replaced__ = !0)),
                h(this),
                this
              );
            }),
            (b.prototype.normalize = function (e) {
              (e.schema || (e.url = "http://" + e.url),
                "mailto:" !== e.schema ||
                  /^mailto:/i.test(e.url) ||
                  (e.url = "mailto:" + e.url));
            }),
            (b.prototype.onCompile = function () {}),
            (r.default = b));
        },
        {
          "./lib/re.mjs": "6imtz",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "6imtz": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(
              r,
              "default",
              () =>
                function (e) {
                  let t = {};
                  ((e = e || {}),
                    (t.src_Any = a.Any.source),
                    (t.src_Cc = a.Cc.source),
                    (t.src_Z = a.Z.source),
                    (t.src_P = a.P.source),
                    (t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|")),
                    (t.src_ZCc = [t.src_Z, t.src_Cc].join("|")));
                  let r = "[><\uff5c]";
                  return (
                    (t.src_pseudo_letter =
                      "(?:(?!" + r + "|" + t.src_ZPCc + ")" + t.src_Any + ")"),
                    (t.src_ip4 =
                      "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"),
                    (t.src_auth =
                      "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?"),
                    (t.src_port =
                      "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?"),
                    (t.src_host_terminator =
                      "(?=$|" +
                      r +
                      "|" +
                      t.src_ZPCc +
                      ")(?!" +
                      (e["---"] ? "-(?!--)|" : "-|") +
                      "_|:\\d|\\.-|\\.(?!$|" +
                      t.src_ZPCc +
                      "))"),
                    (t.src_path =
                      "(?:[/?#](?:(?!" +
                      t.src_ZCc +
                      "|" +
                      r +
                      "|[()[\\]{}.,\"'?!\\-;]).|\\[(?:(?!" +
                      t.src_ZCc +
                      "|\\]).)*\\]|\\((?:(?!" +
                      t.src_ZCc +
                      "|[)]).)*\\)|\\{(?:(?!" +
                      t.src_ZCc +
                      '|[}]).)*\\}|\\"(?:(?!' +
                      t.src_ZCc +
                      '|["]).)+\\"|\\\'(?:(?!' +
                      t.src_ZCc +
                      "|[']).)+\\'|\\'(?=" +
                      t.src_pseudo_letter +
                      "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" +
                      t.src_ZCc +
                      "|[.]|$)|" +
                      (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") +
                      ",(?!" +
                      t.src_ZCc +
                      "|$)|;(?!" +
                      t.src_ZCc +
                      "|$)|\\!+(?!" +
                      t.src_ZCc +
                      "|[!]|$)|\\?(?!" +
                      t.src_ZCc +
                      "|[?]|$))+|\\/)?"),
                    (t.src_email_name =
                      '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*'),
                    (t.src_xn = "xn--[a-z0-9\\-]{1,59}"),
                    (t.src_domain_root =
                      "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})"),
                    (t.src_domain =
                      "(?:" +
                      t.src_xn +
                      "|(?:" +
                      t.src_pseudo_letter +
                      ")|(?:" +
                      t.src_pseudo_letter +
                      "(?:-|" +
                      t.src_pseudo_letter +
                      "){0,61}" +
                      t.src_pseudo_letter +
                      "))"),
                    (t.src_host =
                      "(?:(?:(?:(?:" +
                      t.src_domain +
                      ")\\.)*" +
                      t.src_domain +
                      "))"),
                    (t.tpl_host_fuzzy =
                      "(?:" +
                      t.src_ip4 +
                      "|(?:(?:(?:" +
                      t.src_domain +
                      ")\\.)+(?:%TLDS%)))"),
                    (t.tpl_host_no_ip_fuzzy =
                      "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))"),
                    (t.src_host_strict = t.src_host + t.src_host_terminator),
                    (t.tpl_host_fuzzy_strict =
                      t.tpl_host_fuzzy + t.src_host_terminator),
                    (t.src_host_port_strict =
                      t.src_host + t.src_port + t.src_host_terminator),
                    (t.tpl_host_port_fuzzy_strict =
                      t.tpl_host_fuzzy + t.src_port + t.src_host_terminator),
                    (t.tpl_host_port_no_ip_fuzzy_strict =
                      t.tpl_host_no_ip_fuzzy +
                      t.src_port +
                      t.src_host_terminator),
                    (t.tpl_host_fuzzy_test =
                      "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" +
                      t.src_ZPCc +
                      "|>|$))"),
                    (t.tpl_email_fuzzy =
                      "(^|" +
                      r +
                      '|"|\\(|' +
                      t.src_ZCc +
                      ")(" +
                      t.src_email_name +
                      "@" +
                      t.tpl_host_fuzzy_strict +
                      ")"),
                    (t.tpl_link_fuzzy =
                      "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|" +
                      t.src_ZPCc +
                      "))((?![$+<=>^`|\uff5c])" +
                      t.tpl_host_port_fuzzy_strict +
                      t.src_path +
                      ")"),
                    (t.tpl_link_no_ip_fuzzy =
                      "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|" +
                      t.src_ZPCc +
                      "))((?![$+<=>^`|\uff5c])" +
                      t.tpl_host_port_no_ip_fuzzy_strict +
                      t.src_path +
                      ")"),
                    t
                  );
                },
            ));
          var a = e("uc.micro");
        },
        {
          "uc.micro": "4euC3",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      "4xlTY": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "ucs2decode", () => d),
            n.export(r, "ucs2encode", () => f),
            n.export(r, "decode", () => g),
            n.export(r, "encode", () => b),
            n.export(r, "toASCII", () => y),
            n.export(r, "toUnicode", () => x));
          let a = /^xn--/,
            o = /[^\0-\x7F]/,
            i = /[\x2E\u3002\uFF0E\uFF61]/g,
            s = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input",
            },
            l = Math.floor,
            c = String.fromCharCode;
          function u(e) {
            throw RangeError(s[e]);
          }
          function p(e, t) {
            let r = e.split("@"),
              n = "";
            (r.length > 1 && ((n = r[0] + "@"), (e = r[1])),
              (e = e.replace(i, ".")));
            let a = e.split("."),
              o = (function (e, t) {
                let r = [],
                  n = e.length;
                for (; n--;) r[n] = t(e[n]);
                return r;
              })(a, t).join(".");
            return n + o;
          }
          function d(e) {
            let t = [],
              r = 0,
              n = e.length;
            for (; r < n;) {
              let a = e.charCodeAt(r++);
              if (a >= 55296 && a <= 56319 && r < n) {
                let n = e.charCodeAt(r++);
                (64512 & n) == 56320
                  ? t.push(((1023 & a) << 10) + (1023 & n) + 65536)
                  : (t.push(a), r--);
              } else t.push(a);
            }
            return t;
          }
          let f = (e) => String.fromCodePoint(...e),
            h = function (e, t) {
              return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
            },
            m = function (e, t, r) {
              let n = 0;
              for (e = r ? l(e / 700) : e >> 1, e += l(e / t); e > 455; n += 36)
                e = l(e / 35);
              return l(n + (36 * e) / (e + 38));
            },
            g = function (e) {
              let t = [],
                r = e.length,
                n = 0,
                a = 128,
                o = 72,
                i = e.lastIndexOf("-");
              i < 0 && (i = 0);
              for (let r = 0; r < i; ++r)
                (e.charCodeAt(r) >= 128 && u("not-basic"),
                  t.push(e.charCodeAt(r)));
              for (let c = i > 0 ? i + 1 : 0; c < r;) {
                let i = n;
                for (let t = 1, a = 36; ; a += 36) {
                  var s;
                  c >= r && u("invalid-input");
                  let i =
                    (s = e.charCodeAt(c++)) >= 48 && s < 58
                      ? 26 + (s - 48)
                      : s >= 65 && s < 91
                        ? s - 65
                        : s >= 97 && s < 123
                          ? s - 97
                          : 36;
                  (i >= 36 && u("invalid-input"),
                    i > l((2147483647 - n) / t) && u("overflow"),
                    (n += i * t));
                  let p = a <= o ? 1 : a >= o + 26 ? 26 : a - o;
                  if (i < p) break;
                  let d = 36 - p;
                  (t > l(2147483647 / d) && u("overflow"), (t *= d));
                }
                let p = t.length + 1;
                ((o = m(n - i, p, 0 == i)),
                  l(n / p) > 2147483647 - a && u("overflow"),
                  (a += l(n / p)),
                  (n %= p),
                  t.splice(n++, 0, a));
              }
              return String.fromCodePoint(...t);
            },
            b = function (e) {
              let t = [];
              e = d(e);
              let r = e.length,
                n = 128,
                a = 0,
                o = 72;
              for (let r of e) r < 128 && t.push(c(r));
              let i = t.length,
                s = i;
              for (i && t.push("-"); s < r;) {
                let r = 2147483647;
                for (let t of e) t >= n && t < r && (r = t);
                let p = s + 1;
                for (let d of (r - n > l((2147483647 - a) / p) && u("overflow"),
                (a += (r - n) * p),
                (n = r),
                e))
                  if ((d < n && ++a > 2147483647 && u("overflow"), d === n)) {
                    let e = a;
                    for (let r = 36; ; r += 36) {
                      let n = r <= o ? 1 : r >= o + 26 ? 26 : r - o;
                      if (e < n) break;
                      let a = e - n,
                        i = 36 - n;
                      (t.push(c(h(n + (a % i), 0))), (e = l(a / i)));
                    }
                    (t.push(c(h(e, 0))), (o = m(a, p, s === i)), (a = 0), ++s);
                  }
                (++a, ++n);
              }
              return t.join("");
            },
            x = function (e) {
              return p(e, function (e) {
                return a.test(e) ? g(e.slice(4).toLowerCase()) : e;
              });
            },
            y = function (e) {
              return p(e, function (e) {
                return o.test(e) ? "xn--" + b(e) : e;
              });
            };
          r.default = {
            version: "2.3.1",
            ucs2: { decode: d, encode: f },
            decode: g,
            encode: b,
            toASCII: y,
            toUnicode: x,
          };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "7bNAA": [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = {
              options: {
                html: !1,
                xhtmlOut: !1,
                breaks: !1,
                langPrefix: "language-",
                linkify: !1,
                typographer: !1,
                quotes: "\u201c\u201d\u2018\u2019",
                highlight: null,
                maxNesting: 100,
              },
              components: { core: {}, block: {}, inline: {} },
            }));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      eTWYy: [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = {
              options: {
                html: !1,
                xhtmlOut: !1,
                breaks: !1,
                langPrefix: "language-",
                linkify: !1,
                typographer: !1,
                quotes: "\u201c\u201d\u2018\u2019",
                highlight: null,
                maxNesting: 20,
              },
              components: {
                core: { rules: ["normalize", "block", "inline", "text_join"] },
                block: { rules: ["paragraph"] },
                inline: {
                  rules: ["text"],
                  rules2: ["balance_pairs", "fragments_join"],
                },
              },
            }));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "99ZFo": [
        function (e, t, r) {
          (e(
            "@parcel/transformer-js/src/esmodule-helpers.js",
          ).defineInteropFlag(r),
            (r.default = {
              options: {
                html: !0,
                xhtmlOut: !0,
                breaks: !1,
                langPrefix: "language-",
                linkify: !1,
                typographer: !1,
                quotes: "\u201c\u201d\u2018\u2019",
                highlight: null,
                maxNesting: 20,
              },
              components: {
                core: { rules: ["normalize", "block", "inline", "text_join"] },
                block: {
                  rules: [
                    "blockquote",
                    "code",
                    "fence",
                    "heading",
                    "hr",
                    "html_block",
                    "lheading",
                    "list",
                    "reference",
                    "paragraph",
                  ],
                },
                inline: {
                  rules: [
                    "autolink",
                    "backticks",
                    "emphasis",
                    "entity",
                    "escape",
                    "html_inline",
                    "image",
                    "link",
                    "newline",
                    "text",
                  ],
                  rules2: ["balance_pairs", "emphasis", "fragments_join"],
                },
              },
            }));
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      bZjEH: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "AIEXPORTHUB_PRICING_URL", () => i),
            n.export(r, "buildAccountSignInUrl", () => s),
            n.export(r, "getAiSaverAccountSnapshot", () => l),
            n.export(r, "saveAiSaverAuthFromWebsite", () => c),
            n.export(r, "disconnectAiSaverAccount", () => u),
            n.export(r, "getBulkExportEntitlement", () => p),
            n.export(r, "consumeBulkExportUsage", () => d),
            n.export(r, "getValidAccessToken", () => f));
          var a = e("~core/storage/account");
          let o = "https://api.chatgpt2notion.com",
            i = "https://chatgpt2notion.com/aiexporthub-hero/pricing",
            s = async () => {
              let e = await (0, a.getOrCreateInstallId)(),
                t = new URLSearchParams({
                  extensionId: chrome.runtime.id,
                  installId: e,
                  source: "extension",
                });
              return `https://chatgpt2notion.com/account/session/?${t.toString()}`;
            },
            l = async () => {
              let [e, t, r] = await Promise.all([
                (0, a.getOrCreateInstallId)(),
                (0, a.loadAiSaverAccountState)(),
                s(),
              ]);
              return {
                installId: e,
                isAuthenticated: true,
                signInUrl: r,
                user: t?.user ?? null,
              };
            },
            c = async ({
              accessToken: e,
              expiresIn: t,
              refreshToken: r,
              user: n,
            }) => {
              let o = await (0, a.saveAiSaverAccountState)({
                accessToken: e,
                expiresAt: Date.now() + 1e3 * Math.max(t - 60, 60),
                refreshToken: r,
                user: n,
              });
              return (
                await m(o).catch((e) => {
                  console.warn(
                    "[AI Saver][account] Extension activation failed.",
                    { error: e instanceof Error ? e.message : String(e) },
                  );
                }),
                o
              );
            },
            u = async () => {
              let e = await (0, a.loadAiSaverAccountState)();
              (e?.refreshToken &&
                (await fetch(`${o}/v1/auth/logout`, {
                  body: JSON.stringify({ refreshToken: e.refreshToken }),
                  headers: { "content-type": "application/json" },
                  method: "POST",
                }).catch(() => null)),
                await (0, a.clearAiSaverAccountState)());
            },
            p = async (e = "chatgpt") => { return { canBulkExport: true, planCode: "pro", reason: "premium_access", platformUsage: { remainingFreeCount: 9999, freeLimit: 9999 } }; },
            d = async ({ count: e, platform: t }) => {
              let r = await (0, a.getOrCreateInstallId)(),
                n = await f(),
                i = await fetch(`${o}/v1/extension/bulk-export/consume`, {
                  body: JSON.stringify({
                    anonymousInstallId: r,
                    count: e,
                    platform: t,
                  }),
                  headers: {
                    "content-type": "application/json",
                    ...(n ? { authorization: `Bearer ${n}` } : {}),
                    "x-aisaver-install-id": r,
                  },
                  method: "POST",
                });
              if (!i.ok) {
                let e = await i.json().catch(() => null);
                throw Error(
                  e?.error ?? "Bulk export usage could not be updated.",
                );
              }
            },
            f = async () => {
              let e = await (0, a.loadAiSaverAccountState)();
              return e?.accessToken
                ? e.expiresAt > Date.now() + 3e4
                  ? e.accessToken
                  : await h(e)
                : null;
            },
            h = async (e) => {
              let t = await (0, a.getOrCreateInstallId)(),
                r = await fetch(`${o}/v1/auth/refresh`, {
                  body: JSON.stringify({
                    clientType: "extension",
                    installId: t,
                    refreshToken: e.refreshToken,
                  }),
                  headers: { "content-type": "application/json" },
                  method: "POST",
                });
              if (!r.ok) return (await (0, a.clearAiSaverAccountState)(), null);
              let n = await r.json();
              return (
                await (0, a.saveAiSaverAccountState)({
                  accessToken: n.accessToken,
                  expiresAt: Date.now() + 1e3 * Math.max(n.expiresIn - 60, 60),
                  refreshToken: n.refreshToken,
                  user: n.user,
                }),
                n.accessToken
              );
            },
            m = async (e) => {
              let t = await (0, a.getOrCreateInstallId)();
              await fetch(`${o}/v1/extension/activate`, {
                body: JSON.stringify({
                  browser: "chrome",
                  extensionId: chrome.runtime.id,
                  installId: t,
                  version: chrome.runtime.getManifest().version,
                }),
                headers: {
                  authorization: `Bearer ${e.accessToken}`,
                  "content-type": "application/json",
                },
                method: "POST",
              });
            };
        },
        {
          "~core/storage/account": "hXOuZ",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      hXOuZ: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "loadAiSaverAccountState", () => i),
            n.export(r, "saveAiSaverAccountState", () => s),
            n.export(r, "clearAiSaverAccountState", () => l),
            n.export(r, "getOrCreateInstallId", () => c));
          let a = "ai-exporter-hub:aisaver-account",
            o = "ai-exporter-hub:install-id",
            i = async () => {
              let e = await chrome.storage.local.get(a);
              return e[a] ?? null;
            },
            s = async (e) => (await chrome.storage.local.set({ [a]: e }), e),
            l = async () => {
              await chrome.storage.local.remove(a);
            },
            c = async () => {
              let e = await chrome.storage.local.get(o),
                t = e[o];
              if ("string" == typeof t && t) return t;
              let r = crypto.randomUUID();
              return (await chrome.storage.local.set({ [o]: r }), r);
            };
        },
        { "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q" },
      ],
      "8vI1w": [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "recordActivityEvent", () => c),
            n.export(r, "recordExportRun", () => u),
            n.export(r, "buildEntitlementSnapshot", () => p));
          var a = e("~core/storage/account"),
            o = e("~lib/aisaver-account-api");
          let i = async () => {
              let [e, t] = await Promise.all([
                (0, a.getOrCreateInstallId)(),
                (0, o.getValidAccessToken)(),
              ]);
              return {
                accessToken: t,
                headers: {
                  "content-type": "application/json",
                  ...(t ? { authorization: `Bearer ${t}` } : {}),
                  "x-aisaver-install-id": e,
                },
                installId: e,
              };
            },
            s = () => {
              let e = chrome.runtime.getManifest();
              return {
                extensionId: chrome.runtime.id,
                extensionVersion: e.version,
              };
            },
            l = async (e, t) => {
              try {
                let [{ headers: r, installId: n }, o] = await Promise.all([
                  i(),
                  (0, a.loadAiSaverAccountState)(),
                ]);
                await fetch(`https://api.chatgpt2notion.com${e}`, {
                  body: JSON.stringify({
                    anonymousInstallId: n,
                    isAuthenticated: true,
                    ...s(),
                    ...t,
                  }),
                  headers: r,
                  method: "POST",
                });
              } catch (t) {
                console.warn(
                  "[AI Saver][analytics] Event could not be recorded.",
                  {
                    error: t instanceof Error ? t.message : String(t),
                    path: e,
                  },
                );
              }
            },
            c = (e) => {
              l("/v1/extension/analytics/event", {
                eventName: e.eventName,
                hasPaidAccess: e.entitlement?.hasPaidAccess ?? null,
                metadata: e.metadata,
                planCode: e.entitlement?.planCode ?? null,
                platform: e.platform ?? null,
                source: e.source,
              });
            },
            u = (e) => {
              l("/v1/extension/analytics/export-run", {
                clientJobId: e.clientJobId,
                durationMs: e.durationMs ?? null,
                entitlementReason: e.entitlement?.entitlementReason ?? null,
                failedCount: e.failedCount,
                finishedAt: e.finishedAt ?? null,
                hasPaidAccess: e.entitlement?.hasPaidAccess ?? !1,
                metadata: e.metadata,
                mode: e.mode,
                planCode: e.entitlement?.planCode ?? null,
                platform: e.platform,
                skippedCount: e.skippedCount,
                startedAt: e.startedAt ?? null,
                status: e.status,
                successCount: e.successCount,
                target: e.target,
                totalCount: e.totalCount,
                triggerSource: e.triggerSource,
                warningCount: e.warningCount,
              });
            },
            p = (e) =>
              e?.success
                ? {
                    entitlementReason: e.reason,
                    hasPaidAccess: e.canBulkExport && "free" !== e.planCode,
                    planCode: e.planCode,
                  }
                : null;
        },
        {
          "~core/storage/account": "hXOuZ",
          "~lib/aisaver-account-api": "bZjEH",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
      geggU: [
        function (e, t, r) {
          var n = e("@parcel/transformer-js/src/esmodule-helpers.js");
          (n.defineInteropFlag(r),
            n.export(r, "buildExportBaseName", () => h),
            n.export(r, "buildDownloadPath", () => m));
          var a = e("~core/types/export"),
            o = e("~lib/conversation-title"),
            i = e("~lib/export-directories");
          let s = (e) => {
              let t = e
                  .replace(
                    /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202f\ufeff]/g,
                    "",
                  )
                  .replace(/[<>:"/\\|?*]/g, " ")
                  .replace(/\s+/g, " ")
                  .trim(),
                r = t.slice(0, 180);
              return r || "untitled";
            },
            l = (e) => {
              let t = e.trim().replace(/\\/g, "/");
              return t
                ? t
                    .split("/")
                    .map((e) => s(e))
                    .filter(Boolean)
                    .join("/")
                : "";
            },
            c = (e) => {
              if (!e) return new Date().toISOString().slice(0, 10);
              let t = new Date(e);
              return Number.isNaN(t.getTime())
                ? new Date().toISOString().slice(0, 10)
                : t.toISOString().slice(0, 10);
            },
            u = (e) =>
              s(
                (0, o.normalizeConversationTitle)(
                  e.summary.title || "Untitled Conversation",
                ),
              ),
            p = (e) => {
              let t =
                "string" == typeof e.metadata.gemTitle
                  ? e.metadata.gemTitle
                  : e.summary.tags.find((e) => e && "Gem" !== e);
              return t ? s(t) : "";
            },
            d = (e) => {
              let t =
                "string" == typeof e.metadata.space ? e.metadata.space : "";
              return t.trim() ? s(t) : "";
            },
            f = (e) => {
              if (!e) return "";
              let t =
                !0 === e.summary.isArchived || !0 === e.metadata.isArchived;
              return t ? "Archived Chats" : "";
            },
            h = ({ conversation: e, platform: t, preferences: r }) => {
              let n = u(e),
                a = c(),
                o = c(e.summary.createdAt),
                i = c(e.summary.updatedAt),
                l = r.filenamePattern
                  .replaceAll("{title}", n)
                  .replaceAll("{date}", a)
                  .replaceAll("{original_date}", o)
                  .replaceAll("{updated_date}", i)
                  .replaceAll("{platform}", t);
              return (
                r.includePlatformName ||
                  (l = l.replaceAll(`${t}-`, "").replaceAll(t, "")),
                r.includeConversationDate ||
                  (l = l
                    .replaceAll(`-${a}`, "")
                    .replaceAll(`-${o}`, "")
                    .replaceAll(`-${i}`, "")
                    .replaceAll(a, "")
                    .replaceAll(o, "")
                    .replaceAll(i, "")),
                (l = s(l) || n || "ai-export")
              );
            },
            m = ({
              baseName: e,
              conversation: t,
              platform: r,
              preferences: n,
              target: o,
            }) => {
              let s = "pdf" === o ? "pdf" : "md",
                c =
                  "notion" === o
                    ? "AI-Exporter-Hub"
                    : (0, a.getExportDirectoryForPlatform)({
                        platformId: r,
                        preferences: n,
                        target: o,
                      }),
                u = (0, i.sanitizeRelativeDirectoryForDownload)(
                  "notion" === o ? n.downloadFolder : c,
                  c,
                ),
                h = "gemini" === r && n.organizeGeminiByGem && t ? p(t) : "",
                m =
                  "notion" !== o &&
                  "perplexity" === r &&
                  n.perplexityOrganizeBySpace &&
                  t
                    ? d(t)
                    : "",
                g = "notion" !== o && "chatgpt" === r ? f(t) : "",
                b = [u, g, h, m, `${e}.${s}`].filter(Boolean).join("/");
              return l(b);
            };
        },
        {
          "~core/types/export": "9vpBg",
          "~lib/conversation-title": "4IhWv",
          "~lib/export-directories": "9WjWq",
          "@parcel/transformer-js/src/esmodule-helpers.js": "hbR2Q",
        },
      ],
    },
    ["kgW6q"],
    "kgW6q",
    "parcelRequire987e",
  ),
  (globalThis.define = t));
