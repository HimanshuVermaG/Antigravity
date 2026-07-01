(function () {
  const EVENT_TYPE = "CLAUDE_ORG_ID";
  const MARKER = "data-ai-chats-hub-claude-hook";
  const INTEGRATION_STATUS_STORAGE_KEY = "SSS-cardamom-integration-statuses";
  const ORG_ID_REGEX =
    /https:\/\/claude\.ai\/api\/organizations\/([a-f0-9-]{36})(?:\/|$)/i;
  const STATE_REGEXES = [
    /lastActiveOrg[^a-f0-9]{0,120}?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
    /organization(?:UUID|ID)[^a-f0-9]{0,120}?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
  ];

  if (document.documentElement.hasAttribute(MARKER)) {
    return;
  }

  document.documentElement.setAttribute(MARKER, "true");

  const seenOrgIds = new Set();

  const emitOrgId = (orgId, source) => {
    if (!orgId || seenOrgIds.has(orgId)) {
      return;
    }

    seenOrgIds.add(orgId);
    window.postMessage(
      {
        payload: {
          orgId,
          source,
        },
        type: EVENT_TYPE,
      },
      "*",
    );
    console.log("[Claude Hook] Captured org ID from", source, orgId);
  };

  const extractOrgIdFromText = (value) => {
    if (!value || typeof value !== "string") {
      return null;
    }

    const urlMatch = value.match(ORG_ID_REGEX);

    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }

    for (const regex of STATE_REGEXES) {
      const match = value.match(regex);

      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const scanPageState = () => {
    try {
      const html = document.documentElement
        ? document.documentElement.innerHTML
        : "";
      const orgId = extractOrgIdFromText(html);

      if (orgId) {
        emitOrgId(orgId, "dom");
        return;
      }

      const integrationStatuses = window.sessionStorage.getItem(
        INTEGRATION_STATUS_STORAGE_KEY,
      );
      const sessionOrgId =
        integrationStatuses && typeof integrationStatuses === "string"
          ? (() => {
              try {
                const parsed = JSON.parse(integrationStatuses);
                return typeof parsed?.orgUuid === "string"
                  ? parsed.orgUuid
                  : null;
              } catch {
                return null;
              }
            })()
          : null;

      if (sessionOrgId) {
        emitOrgId(sessionOrgId, "sessionStorage");
      }
    } catch (error) {
      console.warn("[Claude Hook] Failed to scan page state", error);
    }
  };

  const inspectRequestTarget = (target, source) => {
    if (!target) {
      return;
    }

    const rawTarget =
      typeof target === "string"
        ? target
        : typeof target.url === "string"
          ? target.url
          : "";
    const orgId = extractOrgIdFromText(rawTarget);

    if (orgId) {
      emitOrgId(orgId, source);
    }
  };

  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    inspectRequestTarget(args[0], "fetch");
    return originalFetch.apply(this, args);
  };

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    inspectRequestTarget(url, "xhr");
    return originalOpen.call(this, method, url, ...rest);
  };

  console.log("[Claude Hook] Initialized");
  scanPageState();
  window.setTimeout(scanPageState, 1000);
  window.setTimeout(scanPageState, 3000);
})();
