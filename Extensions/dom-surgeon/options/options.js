'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const statSites = document.getElementById('stat-sites');
  const statChanges = document.getElementById('stat-changes');
  const sitesListContainer = document.getElementById('sites-list');
  const emptyState = document.getElementById('empty-state');
  const btnClearAll = document.getElementById('btn-clear-all');
  const btnImport = document.getElementById('btn-import');
  const btnExport = document.getElementById('btn-export');
  const importFile = document.getElementById('import-file');

  async function loadData() {
    const data = await chrome.storage.local.get(null);
    const groups = {}; // hostname -> { hostname, totalCount, items: [], trashItems: [] }
    let totalChangesGlobal = 0;

    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('ds_site_') || key.startsWith('ds_domain_')) {
        if (value.deletedAt) continue;
        
        const changes = value.changes || [];
        const trash = value.trash || [];
        
        if (changes.length === 0 && trash.length === 0) continue;

        let hostname = '';
        let isDomain = key.startsWith('ds_domain_');
        let originUrl = '';

        if (isDomain) {
          hostname = key.replace('ds_domain_', '');
          originUrl = 'https://' + hostname;
        } else {
          originUrl = key.replace('ds_site_', '');
          try {
             hostname = new URL(originUrl).hostname;
          } catch(e) {
             hostname = originUrl;
          }
        }

        if (!groups[hostname]) {
          groups[hostname] = { hostname, totalCount: 0, items: [], trashItems: [] };
        }

        groups[hostname].totalCount += changes.length;
        totalChangesGlobal += changes.length;

        changes.forEach(ch => {
          groups[hostname].items.push({
             ...ch,
             urlContext: originUrl,
             storageKey: key
          });
        });

        trash.forEach(ch => {
          groups[hostname].trashItems.push({ ...ch, urlContext: originUrl, storageKey: key });
        });
      }
    }

    const hostnames = Object.keys(groups);
    statSites.textContent = hostnames.length;
    statChanges.textContent = totalChangesGlobal;

    sitesListContainer.innerHTML = '';

    if (hostnames.length === 0) {
      emptyState.style.display = 'block';
      sitesListContainer.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    sitesListContainer.style.display = 'block';

    const sortedGroups = Object.values(groups).sort((a, b) => b.totalCount - a.totalCount);

    sortedGroups.forEach(group => {
      group.items.sort((a, b) => b.timestamp - a.timestamp);

      const div = document.createElement('div');
      div.className = 'accordion-item';
      
      const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${group.hostname}`;

      div.innerHTML = `
        <div class="accordion-header">
          <div class="accordion-header__left">
            <div class="accordion-header__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="site-url">
              <img src="${faviconUrl}" alt="">
              <span>${group.hostname}</span>
            </div>
          </div>
          <div class="accordion-header__right">
            <span class="badge">${group.totalCount} changes</span>
            <button class="btn btn--icon btn-wipe-site" title="Wipe all data for this site" data-hostname="${group.hostname}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18 M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6 M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="accordion-body">
          <div class="change-list">
            ${group.items.length > 0 ? group.items.map(ch => `
              <div class="change-item">
                <div class="change-item__info">
                  <div class="change-item__title">
                    <span class="change-item__type ${ch.type === 'delete' ? 'change-item__type--delete' : ''}">${ch.type}</span>
                    <span class="change-item__selector" title="${ch.selector}">${truncate(ch.selector, 35)}</span>
                    ${ch.isGlobal ? '<span class="site-domain-badge">Global</span>' : ''}
                  </div>
                  <div class="change-item__date">
                    ${new Date(ch.timestamp).toLocaleString()} • ${ch.isGlobal ? 'Applies to entire site' : `<a href="${ch.urlContext}" target="_blank" style="color:inherit;text-decoration:none;border-bottom:1px dotted #666;">${truncate(ch.urlContext, 50)}</a>`}
                  </div>
                </div>
                <div class="change-item__actions">
                  <button class="btn btn--secondary btn-preview-change" style="background: rgba(255,255,255,0.05); color:#fff;" data-url="${ch.urlContext}" data-id="${ch.id}">Edit in Page</button>
                  <button class="btn btn--danger btn-undo-change" data-key="${ch.storageKey}" data-id="${ch.id}">Undo</button>
                </div>
              </div>
            `).join('') : '<div style="padding:1rem;color:#888;">No active modifications.</div>'}
          </div>
          
          ${group.trashItems.length > 0 ? `
          <div style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
            <div style="font-size: 0.85rem; color: #a1a1aa; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Recently Deleted (Trash)
            </div>
            <div class="change-list" style="opacity: 0.7;">
              ${group.trashItems.map(ch => `
                <div class="change-item" style="border-left-color: #555;">
                  <div class="change-item__info">
                    <div class="change-item__title" style="color:#a1a1aa; text-decoration: line-through;">
                      <span class="change-item__selector" title="${ch.selector}">${truncate(ch.selector, 35)}</span>
                    </div>
                    <div class="change-item__date">Deleted: ${new Date(ch.deletedAt || ch.timestamp).toLocaleString()}</div>
                  </div>
                  <div class="change-item__actions">
                    <button class="btn btn--secondary btn-restore-change" data-key="${ch.storageKey}" data-id="${ch.id}">Restore</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      `;

      const header = div.querySelector('.accordion-header');
      header.addEventListener('click', (e) => {
        if (e.target.closest('.btn-wipe-site')) return;
        div.classList.toggle('is-open');
      });

      sitesListContainer.appendChild(div);
    });

    // Attach listeners
    document.querySelectorAll('.btn-wipe-site').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const hostname = e.currentTarget.dataset.hostname;
        if (confirm(`Wipe all modifications for ${hostname} (including trash)?`)) {
          const updates = {};
          for (const key of Object.keys(data)) {
            if (key.includes(hostname)) {
               updates[key] = { deletedAt: Date.now() };
            }
          }
          await chrome.storage.local.set(updates);
          loadData();
        }
      });
    });

    document.querySelectorAll('.btn-undo-change').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const key = e.currentTarget.dataset.key;
        const changeId = e.currentTarget.dataset.id;
        
        const siteData = data[key];
        if (siteData && siteData.changes) {
          const removedChange = siteData.changes.find(c => c.id === changeId);
          siteData.changes = siteData.changes.filter(c => c.id !== changeId);
          
          if (removedChange) {
            siteData.trash = siteData.trash || [];
            removedChange.deletedAt = Date.now();
            siteData.trash.unshift(removedChange);
            if (siteData.trash.length > 20) siteData.trash = siteData.trash.slice(0, 20);
          }
          
          if (siteData.changes.length === 0 && (!siteData.trash || siteData.trash.length === 0)) {
             await chrome.storage.local.set({ [key]: { deletedAt: Date.now() } });
          } else {
             siteData.lastModified = Date.now();
             await chrome.storage.local.set({ [key]: siteData });
          }
          
          if (removedChange) {
            chrome.tabs.query({}, tabs => {
               tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { type: 'dashboard-revert', change: removedChange }));
            });
          }
          loadData();
        }
      });
    });

    document.querySelectorAll('.btn-restore-change').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const key = e.currentTarget.dataset.key;
        const changeId = e.currentTarget.dataset.id;
        
        const siteData = data[key];
        if (siteData && siteData.trash) {
          const restoredChange = siteData.trash.find(c => c.id === changeId);
          if (restoredChange) {
            delete restoredChange.deletedAt;
            siteData.changes = siteData.changes || [];
            siteData.changes.push(restoredChange);
            siteData.trash = siteData.trash.filter(c => c.id !== changeId);
            
            siteData.lastModified = Date.now();
            await chrome.storage.local.set({ [key]: siteData });
            loadData();
          }
        }
      });
    });

    document.querySelectorAll('.btn-preview-change').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.currentTarget.dataset.url;
        const changeId = e.currentTarget.dataset.id;
        
        chrome.tabs.create({ url, active: true }, (tab) => {
          const checkReady = setInterval(() => {
             chrome.tabs.sendMessage(tab.id, { type: 'dashboard-preview', changeId }, (response) => {
                if (!chrome.runtime.lastError && response?.ok) {
                   clearInterval(checkReady);
                }
             });
          }, 500);
          
          setTimeout(() => clearInterval(checkReady), 10000);
        });
      });
    });
  }

  btnClearAll.addEventListener('click', async () => {
    if (confirm('WARNING: Are you absolutely sure you want to wipe ALL modifications across EVERY site?')) {
      const data = await chrome.storage.local.get(null);
      const updates = {};
      for (const key of Object.keys(data)) {
        if (key.startsWith('ds_site_') || key.startsWith('ds_domain_')) {
          updates[key] = { deletedAt: Date.now() };
        }
      }
      await chrome.storage.local.set(updates);
      loadData();
    }
  });

  btnExport.addEventListener('click', async () => {
    const data = await chrome.storage.local.get(null);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dom-surgeon-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  btnImport.addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        console.log('[DOM Surgeon] Parsed import data:', importedData);
        if (typeof importedData !== 'object' || importedData === null) {
          throw new Error('Invalid JSON format: Not an object');
        }
        
        // Ensure chrome.storage.local.set resolves properly
        await new Promise((resolve, reject) => {
          chrome.storage.local.set(importedData, () => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            else resolve();
          });
        });
        
        console.log('[DOM Surgeon] Import saved to storage.');
        // alert('Data imported successfully!'); // alert might get suppressed or block
        
        // Show temporary success state on the button
        const originalText = btnImport.innerHTML;
        btnImport.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg> Imported';
        setTimeout(() => btnImport.innerHTML = originalText, 2000);
        
        loadData();
      } catch (err) {
        console.error('[DOM Surgeon] Import failed:', err);
        alert('Failed to import data: ' + err.message);
      } finally {
        importFile.value = ''; // Reset
      }
    };
    reader.onerror = (err) => {
      console.error('[DOM Surgeon] FileReader error:', err);
      alert('Failed to read file.');
      importFile.value = '';
    };
    reader.readAsText(file);
  });

  function truncate(str, max) {
    if (!str) return '';
    return str.length > max ? str.substring(0, max) + '...' : str;
  }

  // ── Sync Logic ──────────────────────────────────────────

  const chkChromeSync = document.getElementById('sync-chrome-toggle');
  const inpGithubPat = document.getElementById('sync-github-pat');
  const inpGithubGist = document.getElementById('sync-github-gist');
  const btnSyncNow = document.getElementById('btn-sync-now');
  const btnPauseSync = document.getElementById('btn-pause-sync');
  const txtPauseSync = document.getElementById('txt-pause-sync');
  const iconPause = document.getElementById('icon-pause');
  const iconResume = document.getElementById('icon-resume');
  const syncStatusMsg = document.getElementById('sync-status-msg');

  let isSyncPaused = false;

  async function loadSyncSettings() {
    const data = await chrome.storage.local.get(['ds_sync_chrome', 'ds_sync_github_pat', 'ds_sync_github_gist', 'ds_sync_paused']);
    chkChromeSync.checked = !!data.ds_sync_chrome;
    inpGithubPat.value = data.ds_sync_github_pat || '';
    inpGithubGist.value = data.ds_sync_github_gist || '';
    isSyncPaused = !!data.ds_sync_paused;
    updatePauseUI();
  }

  function updatePauseUI() {
    if (isSyncPaused) {
      btnPauseSync.style.color = '#f97316';
      btnPauseSync.style.background = 'rgba(249, 115, 22, 0.1)';
      btnPauseSync.style.borderColor = 'rgba(249, 115, 22, 0.2)';
      txtPauseSync.textContent = 'Resume Sync';
      iconPause.style.display = 'none';
      iconResume.style.display = 'block';
    } else {
      btnPauseSync.style.color = '#fff';
      btnPauseSync.style.background = 'rgba(255,255,255,0.05)';
      btnPauseSync.style.borderColor = 'transparent';
      txtPauseSync.textContent = 'Pause Sync';
      iconPause.style.display = 'block';
      iconResume.style.display = 'none';
    }
  }

  btnPauseSync.addEventListener('click', async () => {
    isSyncPaused = !isSyncPaused;
    await chrome.storage.local.set({ ds_sync_paused: isSyncPaused });
    updatePauseUI();
  });

  async function saveSyncSettings() {
    await chrome.storage.local.set({
      ds_sync_chrome: chkChromeSync.checked,
      ds_sync_github_pat: inpGithubPat.value.trim(),
      ds_sync_github_gist: inpGithubGist.value.trim()
    });
  }

  chkChromeSync.addEventListener('change', saveSyncSettings);
  inpGithubPat.addEventListener('input', saveSyncSettings);
  inpGithubGist.addEventListener('input', saveSyncSettings);

  btnSyncNow.addEventListener('click', async () => {
    await saveSyncSettings();
    btnSyncNow.disabled = true;
    btnSyncNow.textContent = 'Syncing...';
    syncStatusMsg.textContent = 'Syncing...';
    syncStatusMsg.style.color = '#fff';

    chrome.runtime.sendMessage({ type: 'force-sync', force: true }, (response) => {
      btnSyncNow.disabled = false;
      btnSyncNow.textContent = 'Sync Now';
      if (chrome.runtime.lastError || (response && !response.ok)) {
        syncStatusMsg.textContent = 'Sync Failed!';
        syncStatusMsg.style.color = '#ef4444';
      } else {
        syncStatusMsg.textContent = 'Sync Successful!';
        syncStatusMsg.style.color = '#10B981';
        if (response && response.gistId) {
           inpGithubGist.value = response.gistId; // Update UI if gist was auto-created
        }
        setTimeout(() => syncStatusMsg.textContent = '', 3000);
      }
    });
  });

  // ── Time Machine Logic ───────────────────────────────────────────────

  const btnTimeMachine = document.getElementById('btn-time-machine');
  const tmModal = document.getElementById('time-machine-modal');
  const btnTmClose = document.getElementById('btn-tm-close');
  const tmLoading = document.getElementById('tm-loading');
  const tmList = document.getElementById('tm-revisions-list');

  if (btnTimeMachine) {
    btnTimeMachine.addEventListener('click', async () => {
      tmModal.showModal();
      tmList.innerHTML = '';
      tmLoading.style.display = 'block';

      const data = await chrome.storage.local.get(['ds_sync_github_pat', 'ds_sync_github_gist']);
      if (!data.ds_sync_github_pat || !data.ds_sync_github_gist) {
        tmLoading.style.display = 'none';
        tmList.innerHTML = '<div style="color:#ef4444; padding:1rem;">You must configure GitHub Gist sync and perform at least one sync to use the Time Machine.</div>';
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/gists/${data.ds_sync_github_gist}/commits`, {
          headers: { 'Authorization': `token ${data.ds_sync_github_pat}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch revisions');
        const commits = await response.json();
        
        tmLoading.style.display = 'none';
        if (commits.length === 0) {
          tmList.innerHTML = '<div style="color:#a1a1aa; padding:1rem;">No history found.</div>';
          return;
        }

        tmList.innerHTML = commits.map((c, i) => `
          <div style="background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 500; font-size: 14px;">${i === 0 ? 'Current State' : 'Historic Backup'}</div>
              <div style="color: #a1a1aa; font-size: 12px; margin-top: 4px;">${new Date(c.committed_at).toLocaleString()}</div>
            </div>
            ${i === 0 ? '<span style="color:#22c55e; font-size:12px; font-weight:500;">Active</span>' : `<button class="btn btn--danger btn-restore-revision" data-version="${c.version}" style="padding: 6px 12px; font-size: 12px;">Restore</button>`}
          </div>
        `).join('');

        // Attach restore handlers
        tmList.querySelectorAll('.btn-restore-revision').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const version = e.currentTarget.dataset.version;
            if (!confirm('Are you absolutely sure you want to restore this version? This will permanently overwrite your current configuration.')) return;
            
            e.currentTarget.textContent = 'Restoring...';
            e.currentTarget.disabled = true;

            try {
              const res = await fetch(`https://api.github.com/gists/${data.ds_sync_github_gist}/${version}`, {
                headers: { 'Authorization': `token ${data.ds_sync_github_pat}` }
              });
              const gistData = await res.json();
              const file = gistData.files['dom-surgeon-rules.json'];
              if (!file || !file.content) throw new Error('Missing rules file in gist');
              
              const historicRules = JSON.parse(file.content);
              
              // Force timestamps into the future so SyncManager treats this as a brand new update to be pushed
              for (const [key, site] of Object.entries(historicRules)) {
                if (key.startsWith('ds_site_') || key.startsWith('ds_domain_')) {
                  site.lastModified = Date.now() + 5000;
                }
              }

              // Overwrite local storage (clearing current rules and applying historic ones)
              const currentStorage = await chrome.storage.local.get(null);
              const keysToRemove = Object.keys(currentStorage).filter(k => k.startsWith('ds_site_') || k.startsWith('ds_domain_'));
              await chrome.storage.local.remove(keysToRemove);
              
              await chrome.storage.local.set(historicRules);
              
              // Force a sync to push the restored state
              chrome.runtime.sendMessage({ type: 'force-sync' }, () => {
                alert('Successfully restored and synced to cloud!');
                window.location.reload();
              });
            } catch (err) {
              alert('Restore failed: ' + err.message);
              e.currentTarget.textContent = 'Restore';
              e.currentTarget.disabled = false;
            }
          });
        });

      } catch (err) {
        tmLoading.style.display = 'none';
        tmList.innerHTML = `<div style="color:#ef4444; padding:1rem;">Error: ${err.message}</div>`;
      }
    });

    btnTmClose.addEventListener('click', () => {
      tmModal.close();
    });
  }

  loadData();
  loadSyncSettings();
});
