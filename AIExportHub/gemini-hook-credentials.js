(() => {
  const result = {};

  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);
    processRequest(args[0], args[1]?.body?.toString?.());
    return response;
  };

  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    this.__url = url;
    return originalOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    if (this.__url?.includes("batchexecute")) {
      processRequest(this.__url, body?.toString?.());
    }
    return originalSend.apply(this, arguments);
  };

  function processRequest(url, body) {
    try {
      const atMatch = body?.match(/at=([a-zA-Z0-9%:\-_]+)/);
      const sidMatch = url?.match(/[?&]f\.sid=([^&]+)/);
      const blMatch = url?.match(/[?&]bl=([^&]+)/);

      if (atMatch || sidMatch || blMatch) {
        result.at = atMatch ? decodeURIComponent(atMatch[1]) : result.at;
        result.sid = sidMatch ? decodeURIComponent(sidMatch[1]) : result.sid;
        result.bl = blMatch ? decodeURIComponent(blMatch[1]) : result.bl;

        window.postMessage(
          {
            type: "GEMINI_CREDENTIALS",
            payload: { ...result },
          },
          "*",
        );
      }
    } catch (e) {
      console.warn("[Gemini] Credential parse error:", e);
    }
  }
})();
