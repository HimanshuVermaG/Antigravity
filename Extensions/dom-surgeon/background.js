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
        chrome.tabs.sendMessage(tabs[0].id, { type: 'toggle-selector' }).catch(() => {});
      }
    });
  }
});

// Toggle widget when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'toggle-widget' }).catch(() => {});
  }
});

// Context Menu (Right Click)
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'force-sync-cloud') {
    SyncManager.syncAll({ github: true, force: true }).catch(err => console.error('[Background] Manual Sync failed:', err));
  } else if (info.menuItemId === 'open-dashboard') {
    chrome.tabs.create({ url: chrome.runtime.getURL('options/options.html') });
  }
});

importScripts('background/sync.js');

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


    case 'force-sync': {
      // Manual trigger from options dashboard
      SyncManager.syncAll({ github: true, force: message.force }).then(response => {
        sendResponse(response);
      }).catch(err => {
        sendResponse({ ok: false, error: err.message });
      });
      return true; // async response
    }
  }
});

let isSyncPaused = false;
chrome.storage.local.get('ds_sync_paused', data => { isSyncPaused = !!data.ds_sync_paused; });

// Auto-sync in background when rules change locally
chrome.storage.local.onChanged.addListener((changes) => {
  if (changes.ds_sync_paused) {
    isSyncPaused = changes.ds_sync_paused.newValue;
  }
  
  if (SyncManager._ignoreNextLocalChange) return;

  // Check if any rule data changed (ignore sync settings themselves)
  const ruleChanged = Object.keys(changes).some(key => key.startsWith('ds_site_') || key.startsWith('ds_domain_'));
  if (ruleChanged) {
    if (isSyncPaused) {
      console.log('[Background] Local rules changed, but sync is PAUSED. Skipping timers.');
      return;
    }

    console.log('[Background] Local rule data changed. Scheduling debounced GitHub sync...');
    
    // 1-Minute Debounce: Clear existing alarm and set a new one
    chrome.alarms.clear('github-sync-timer');
    chrome.alarms.create('github-sync-timer', { delayInMinutes: 1 });
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'github-sync-timer') {
    if (isSyncPaused) {
      console.log('[Background] GitHub timer fired, but sync is PAUSED. Skipping.');
      return;
    }
    console.log('[Background] Triggering GitHub Sync...');
    SyncManager.syncAll({ github: true }).catch(err => console.error('[Background] GitHub Sync failed:', err));
  }
});

// Auto-sync automatically when the browser is opened or extension is reloaded
chrome.runtime.onStartup.addListener(() => {
  if (isSyncPaused) return console.log('[Background] Browser started, but sync is PAUSED.');
  console.log('[Background] Browser started. Triggering startup cloud sync...');
  SyncManager.syncAll({ github: true }).catch(err => console.error('[Background] Startup sync failed:', err));
});
chrome.runtime.onInstalled.addListener(() => {
  if (isSyncPaused) return console.log('[Background] Extension installed/reloaded, but sync is PAUSED.');
  console.log('[Background] Extension installed/reloaded. Triggering startup cloud sync...');
  SyncManager.syncAll({ github: true }).catch(err => console.error('[Background] Startup sync failed:', err));
});

// Set default badge style on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#6366F1' });
  
  chrome.contextMenus.create({
    id: 'force-sync-cloud',
    title: 'Sync Cloud Now',
    contexts: ['action']
  });

  chrome.contextMenus.create({
    id: 'open-dashboard',
    title: 'Dashboard',
    contexts: ['action']
  });
});
