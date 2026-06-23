/**
 * DOM Surgeon — Popup Script
 * Controls the extension popup UI.
 * Communicates with the active tab's content script via chrome.tabs.sendMessage.
 */
'use strict';

// ── Helpers ──────────────────────────────────────────

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function sendToContent(message) {
  const tab = await getActiveTab();
  if (!tab?.id) return null;
  try {
    return await chrome.tabs.sendMessage(tab.id, message);
  } catch (e) {
    // Content script not loaded (e.g., on chrome:// pages)
    return null;
  }
}

// ── DOM refs ─────────────────────────────────────────

const toggleInput = document.querySelector('#toggle-selector .toggle__input');

const btnUndo     = document.getElementById('btn-undo');
const btnRedo     = document.getElementById('btn-redo');
const btnReset    = document.getElementById('btn-reset');
const historyList = document.getElementById('history-list');
const historyCount = document.getElementById('history-count');
const historyEmpty = document.getElementById('history-empty');

// ── Init: fetch status from content script ───────────

(async function init() {
  const status = await sendToContent({ type: 'get-status' });
  if (status) {
    toggleInput.checked = status.active;


    if (status.active) {
      toggleInput.closest('.toggle').classList.add('toggle--on');
    }
  }
  await loadHistory();
})();

// ── Toggle Selector Mode ─────────────────────────────

toggleInput.addEventListener('change', async () => {
  const res = await sendToContent({ type: 'toggle-selector' });
  if (res) {
    toggleInput.checked = res.active;
    toggleInput.closest('.toggle').classList.toggle('toggle--on', res.active);
  }
});

// ── Undo ─────────────────────────────────────────────

btnUndo.addEventListener('click', async () => {
  btnUndo.classList.add('action-btn--pressed');
  await sendToContent({ type: 'undo' });
  setTimeout(() => btnUndo.classList.remove('action-btn--pressed'), 150);
  await refreshAll();
});

// ── Redo ─────────────────────────────────────────────

btnRedo.addEventListener('click', async () => {
  btnRedo.classList.add('action-btn--pressed');
  await sendToContent({ type: 'redo' });
  setTimeout(() => btnRedo.classList.remove('action-btn--pressed'), 150);
  await refreshAll();
});

// ── Reset ────────────────────────────────────────────

let resetPending = false;

btnReset.addEventListener('click', async () => {
  if (!resetPending) {
    // First click — confirm
    resetPending = true;
    btnReset.querySelector('span').textContent = 'Confirm';
    btnReset.classList.add('action-btn--confirm');
    setTimeout(() => {
      resetPending = false;
      btnReset.querySelector('span').textContent = 'Reset';
      btnReset.classList.remove('action-btn--confirm');
    }, 3000);
    return;
  }

  // Second click — execute
  resetPending = false;
  btnReset.querySelector('span').textContent = 'Reset';
  btnReset.classList.remove('action-btn--confirm');
  btnReset.classList.add('action-btn--pressed');

  await sendToContent({ type: 'reset' });
  setTimeout(() => btnReset.classList.remove('action-btn--pressed'), 150);
  await refreshAll();
});

// ── History ──────────────────────────────────────────

const CHANGE_ICONS = {
  delete: { icon: '🔴', label: 'Deleted' },
  resize: { icon: '🔵', label: 'Resized' },
  hide:   { icon: '🟣', label: 'Hidden' },
  style:  { icon: '🟡', label: 'Styled' }
};

async function loadHistory() {
  const res = await sendToContent({ type: 'get-changes' });
  const changes = res?.changes || [];

  // Update count badge
  historyCount.textContent = changes.length;


  // Clear old items (keep empty state element)
  historyList.querySelectorAll('.history-item').forEach(el => el.remove());

  if (changes.length === 0) {
    historyEmpty.style.display = 'flex';
    return;
  }

  historyEmpty.style.display = 'none';

  // Render most recent first
  const reversed = [...changes].reverse();
  for (const ch of reversed) {
    const item = createHistoryItem(ch);
    historyList.appendChild(item);
  }
}

function createHistoryItem(change) {
  const el = document.createElement('div');
  el.className = 'history-item';
  el.dataset.id = change.id;

  const info = CHANGE_ICONS[change.type] || { icon: '⚪', label: change.type };

  // Format description
  let desc = info.label;
  const sel = change.selector || '';
  // Show just the last segment of selector for readability
  const shortSel = sel.split(' > ').pop() || sel;
  desc += ` ${shortSel}`;

  // Format detail (what changed)
  let detail = '';
  if (change.type === 'resize') {
    detail = `${change.property}: ${change.modified}`;
  }

  // Relative time
  const timeStr = formatRelativeTime(change.timestamp);

  el.innerHTML = `
    <span class="history-item__icon">${info.icon}</span>
    <div class="history-item__body">
      <div class="history-item__desc" title="${sel}">${desc}</div>
      ${detail ? `<div class="history-item__detail">${detail}</div>` : ''}
    </div>
    <span class="history-item__time">${timeStr}</span>
    <button class="history-item__undo" title="Undo this change">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8H12C13.1 8 14 8.9 14 10V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 5L3 8L6 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;

  // Toggle preview on click
  el.addEventListener('click', async () => {
    const isPreviewing = el.classList.contains('history-item--previewing');
    
    // Clear other previews
    document.querySelectorAll('.history-item--previewing').forEach(node => {
      node.classList.remove('history-item--previewing');
    });

    if (isPreviewing) {
      await sendToContent({ type: 'clear-preview' });
    } else {
      el.classList.add('history-item--previewing');
      await sendToContent({ type: 'preview-change', changeId: change.id });
    }
  });

  // Undo this specific change
  el.querySelector('.history-item__undo').addEventListener('click', async (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    btn.disabled = true;
    el.classList.add('history-item--removing');

    await sendToContent({ type: 'clear-preview' });
    await sendToContent({ type: 'undo-specific', changeId: change.id });

    // Remove with animation then refresh
    setTimeout(async () => {
      el.remove();
      await refreshAll();
    }, 250);
  });

  return el;
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return '';
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 5) return 'now';
  if (diff < 60) return diff + 's ago';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}

// ── Refresh all UI state ─────────────────────────────

async function refreshAll() {
  const status = await sendToContent({ type: 'get-status' });

  await loadHistory();
}

