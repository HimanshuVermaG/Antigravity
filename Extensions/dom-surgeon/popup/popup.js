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
const changeCount = document.getElementById('change-count');
const btnUndo     = document.getElementById('btn-undo');
const btnRedo     = document.getElementById('btn-redo');
const btnReset    = document.getElementById('btn-reset');

// ── Init: fetch status from content script ───────────

(async function init() {
  const status = await sendToContent({ type: 'get-status' });
  if (status) {
    toggleInput.checked = status.active;
    changeCount.textContent = status.changeCount || 0;

    if (status.active) {
      toggleInput.closest('.toggle').classList.add('toggle--on');
    }
  }
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
  await refreshCount();
});

// ── Redo ─────────────────────────────────────────────

btnRedo.addEventListener('click', async () => {
  btnRedo.classList.add('action-btn--pressed');
  await sendToContent({ type: 'redo' });
  setTimeout(() => btnRedo.classList.remove('action-btn--pressed'), 150);
  await refreshCount();
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
  await refreshCount();
});

// ── Refresh change count ─────────────────────────────

async function refreshCount() {
  const status = await sendToContent({ type: 'get-status' });
  if (status) {
    changeCount.textContent = status.changeCount || 0;
  }
}
