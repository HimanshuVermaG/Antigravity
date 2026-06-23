'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const statSites = document.getElementById('stat-sites');
  const statChanges = document.getElementById('stat-changes');
  const sitesListContainer = document.getElementById('sites-list');
  const emptyState = document.getElementById('empty-state');
  const btnClearAll = document.getElementById('btn-clear-all');

  async function loadData() {
    const data = await chrome.storage.local.get(null);
    const groups = {}; // hostname -> { hostname, totalCount, items: [] }
    let totalChangesGlobal = 0;

    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('ds_site_') || key.startsWith('ds_domain_')) {
        const changes = value.changes || [];
        if (changes.length === 0) continue;

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
          groups[hostname] = { hostname, totalCount: 0, items: [] };
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
            ${group.items.map(ch => `
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
                  <button class="btn btn--secondary btn-preview-change" style="background: rgba(255,255,255,0.05); color:#fff;" data-url="${ch.urlContext}" data-id="${ch.id}">Preview</button>
                  <button class="btn btn--danger btn-undo-change" data-key="${ch.storageKey}" data-id="${ch.id}">Undo</button>
                </div>
              </div>
            `).join('')}
          </div>
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
        if (confirm(`Wipe all modifications for ${hostname}?`)) {
          const keysToRemove = [];
          for (const key of Object.keys(data)) {
            if (key.includes(hostname)) {
               keysToRemove.push(key);
            }
          }
          await chrome.storage.local.remove(keysToRemove);
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
          await chrome.storage.local.set({ [key]: siteData });
          
          if (removedChange) {
            chrome.tabs.query({}, tabs => {
               tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { type: 'dashboard-revert', change: removedChange }));
            });
          }
          loadData();
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
      await chrome.storage.local.clear();
      loadData();
    }
  });

  function truncate(str, max) {
    if (!str) return '';
    return str.length > max ? str.substring(0, max) + '...' : str;
  }

  loadData();
});
