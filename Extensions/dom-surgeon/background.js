'use strict';

/**
 * DOM Surgeon — Background Service Worker
 * Routes messages between popup ↔ content scripts.
 * Manages badge text and keyboard shortcut commands.
 */

// Handle Alt+S keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-selector') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'toggle-selector' }).catch(() => {
          // Content script not loaded on this page (e.g., chrome:// pages)
        });
      }
    });
  }
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'update-badge': {
      // Content script reports change count → update badge
      const tabId = sender.tab?.id;
      if (tabId) {
        const text = message.count > 0 ? String(message.count) : '';
        chrome.action.setBadgeText({ text, tabId });
        chrome.action.setBadgeBackgroundColor({ color: '#6366F1', tabId });
      }
      break;
    }

    case 'forward-to-tab': {
      // Popup wants to send a message to the active tab's content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, message.payload)
            .then(sendResponse)
            .catch(() => sendResponse({ error: 'Content script not available' }));
        } else {
          sendResponse({ error: 'No active tab' });
        }
      });
      return true; // async response
    }
  }
});

// Set default badge style on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#6366F1' });
});
