'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const statSites = document.getElementById('stat-sites');
  const statChanges = document.getElementById('stat-changes');
  const tbody = document.getElementById('sites-list');
  const emptyState = document.getElementById('empty-state');
  const btnClearAll = document.getElementById('btn-clear-all');

  async function loadData() {
    const data = await chrome.storage.local.get(null);
    const sites = [];
    let totalChanges = 0;

    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('ds_site_')) {
        const url = key.replace('ds_site_', '');
        const count = value.changes?.length || 0;
        if (count > 0) {
          sites.push({ url, key, count });
          totalChanges += count;
        }
      } else if (key === 'domSurgeonData' && value.sites) {
        // Handle legacy data format
        for (const [url, siteData] of Object.entries(value.sites)) {
          const count = siteData.changes?.length || 0;
          if (count > 0) {
            sites.push({ url, key: 'legacy_' + url, count });
            totalChanges += count;
          }
        }
      }
    }

    // Update stats
    statSites.textContent = sites.length;
    statChanges.textContent = totalChanges;

    // Render table
    tbody.innerHTML = '';
    
    if (sites.length === 0) {
      emptyState.style.display = 'block';
      document.querySelector('table').style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    document.querySelector('table').style.display = 'table';

    // Sort by count descending
    sites.sort((a, b) => b.count - a.count);

    sites.forEach(site => {
      const tr = document.createElement('tr');
      
      let faviconUrl = '';
      try {
        const u = new URL(site.url);
        faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${u.hostname}`;
      } catch(e) {}

      tr.innerHTML = `
        <td>
          <div class="site-url">
            ${faviconUrl ? `<img src="${faviconUrl}" alt="">` : ''}
            <span>${site.url}</span>
          </div>
        </td>
        <td><span class="badge">${site.count} changes</span></td>
        <td>
          <button class="btn btn--icon btn-delete" title="Wipe data for this site" data-key="${site.key}">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 4.5L4 2.5M4 2.5L5.5 4.5M4 2.5V9C4 11.2 5.8 13 8 13C10.2 13 12 11.2 12 9C12 6.8 10.2 5 8 5H6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Attach delete handlers
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const key = e.currentTarget.dataset.key;
        if (confirm('Are you sure you want to wipe all modifications for this site?')) {
          if (key.startsWith('legacy_')) {
             const url = key.replace('legacy_', '');
             const data = await chrome.storage.local.get('domSurgeonData');
             if (data.domSurgeonData?.sites?.[url]) {
               delete data.domSurgeonData.sites[url];
               await chrome.storage.local.set({ domSurgeonData: data.domSurgeonData });
             }
          } else {
             await chrome.storage.local.remove(key);
          }
          loadData();
        }
      });
    });
  }

  btnClearAll.addEventListener('click', async () => {
    if (confirm('WARNING: Are you absolutely sure you want to wipe ALL modifications across EVERY site?')) {
      await chrome.storage.local.clear();
      loadData();
    }
  });

  loadData();
});
