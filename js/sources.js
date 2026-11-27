/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Source Database Manager Controller (Full CRUD with LocalStorage)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ca_sources_data';
  let sources = [];
  let filterCountry = 'all';
  let filterCategory = 'all';
  let filterStatus = 'all';
  let searchQuery = '';

  document.addEventListener('DOMContentLoaded', () => {
    loadSources();

    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'sources') {
        renderSourcesTable();
      }
    });

    window.addEventListener('searchUpdated', (e) => {
      searchQuery = e.detail.query || '';
      const searchInput = document.getElementById('source-search-input');
      if (searchInput) searchInput.value = searchQuery;
      if (window.AppState && window.AppState.currentView === 'sources') {
        renderSourcesTable();
      }
    });

    window.addEventListener('countryFilterChanged', (e) => {
      filterCountry = e.detail.country || 'all';
      const countrySelect = document.getElementById('source-filter-country');
      if (countrySelect) countrySelect.value = filterCountry;
      if (window.AppState && window.AppState.currentView === 'sources') {
        renderSourcesTable();
      }
    });

    initSourceControls();
  });

  function loadSources() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        sources = JSON.parse(stored);
      } catch (e) {
        sources = window.CURRICULUM_DATA ? [...window.CURRICULUM_DATA.sources] : [];
      }
    } else {
      sources = window.CURRICULUM_DATA ? [...window.CURRICULUM_DATA.sources] : [];
      saveSources();
    }
  }

  function saveSources() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sources));
  }

  function initSourceControls() {
    const countrySelect = document.getElementById('source-filter-country');
    if (countrySelect) {
      countrySelect.addEventListener('change', (e) => {
        filterCountry = e.target.value;
        renderSourcesTable();
      });
    }

    const catSelect = document.getElementById('source-filter-category');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        filterCategory = e.target.value;
        renderSourcesTable();
      });
    }

    const statusSelect = document.getElementById('source-filter-status');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        filterStatus = e.target.value;
        renderSourcesTable();
      });
    }

    const searchInput = document.getElementById('source-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderSourcesTable();
      });
    }

    const btnAdd = document.getElementById('btn-add-source');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        document.getElementById('source-form').reset();
        document.getElementById('source-id-input').value = '';
        document.getElementById('source-modal-title').textContent = 'Thêm nguồn tài liệu mới';
        window.ModalManager.open('source-modal');
      });
    }

    // Source Form Submit (Add or Edit)
    const sourceForm = document.getElementById('source-form');
    if (sourceForm) {
      sourceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveSourceFromForm();
      });
    }
  }

  function renderSourcesTable() {
    const tbody = document.getElementById('sources-table-body');
    if (!tbody) return;

    let filtered = [...sources];

    if (filterCountry !== 'all') {
      filtered = filtered.filter(s => s.countryCode === filterCountry || s.country.toLowerCase().includes(filterCountry));
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(s => s.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.verificationStatus === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(s => {
        const text = `${s.title} ${s.issuingBody} ${s.description} ${s.category} ${s.country}`.toLowerCase();
        return text.includes(searchQuery);
      });
    }

    const countElem = document.getElementById('sources-count-label');
    if (countElem) {
      countElem.textContent = `Hiển thị ${filtered.length} / ${sources.length} tài liệu tham chiếu`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 36px; color: var(--text-muted);">
            Không có nguồn tài liệu nào thỏa mãn điều kiện lọc.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(src => `
      <tr>
        <td style="font-weight: 600; width: 60px;">
          <span style="font-size: 11px; background: var(--bg-subtle); padding: 2px 6px; border-radius: var(--radius-sm);">${src.id}</span>
        </td>
        <td style="max-width: 280px;">
          <div style="font-weight: 600; color: var(--text-main); line-height: 1.4; margin-bottom: 4px;">
            ${src.title}
          </div>
          <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">
            ${src.description || ''}
          </div>
        </td>
        <td style="font-size: 12px; white-space: nowrap;">
          <strong>${src.country}</strong><br>
          <span style="font-size: 11px; color: var(--text-muted);">${src.issuingBody}</span>
        </td>
        <td style="font-size: 12px;">
          <span style="font-size: 11px; padding: 2px 8px; border-radius: var(--radius-pill); background: var(--bg-subtle);">${src.category}</span><br>
          <span style="font-size: 10.5px; color: var(--text-muted);">Năm ${src.year}</span>
        </td>
        <td style="font-size: 12px;">
          <div style="display: flex; gap: 3px; flex-wrap: wrap;">
            ${(src.criteriaSupported || []).map(c => `<span style="font-size: 10px; background: var(--primary-light); color: var(--primary); padding: 1px 4px; border-radius: 3px;">${c}</span>`).join('')}
          </div>
        </td>
        <td>
          <button class="verification-tag ${src.verificationStatus === 'verified' ? 'verified' : 'pending'}" 
                  onclick="SourcesManager.toggleVerification('${src.id}')" 
                  title="Nhấn để đổi trạng thái xác minh">
            ${src.verificationStatus === 'verified' ? '✓ Đã xác minh' : '⚠ Cần đối soát'}
          </button>
        </td>
        <td style="white-space: nowrap; text-align: right;">
          ${src.url ? `<a href="${src.url}" target="_blank" rel="noopener noreferrer" class="btn-icon" style="display: inline-flex;" title="Mở đường dẫn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>` : ''}
          <button class="btn-icon" style="display: inline-flex;" onclick="SourcesManager.editSource('${src.id}')" title="Chỉnh sửa"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
          <button class="btn-icon" style="display: inline-flex; color: var(--danger);" onclick="SourcesManager.deleteSource('${src.id}')" title="Xóa"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </td>
      </tr>
    `).join('');
  }

  function saveSourceFromForm() {
    const idInput = document.getElementById('source-id-input').value;
    const title = document.getElementById('source-title-input').value.trim();
    const country = document.getElementById('source-country-input').value;
    const issuingBody = document.getElementById('source-issuing-input').value.trim();
    const year = parseInt(document.getElementById('source-year-input').value, 10) || 2024;
    const version = document.getElementById('source-version-input').value.trim() || 'Chính thức';
    const category = document.getElementById('source-category-input').value;
    const url = document.getElementById('source-url-input').value.trim();
    const accessDate = document.getElementById('source-date-input').value || new Date().toISOString().slice(0, 10);
    const description = document.getElementById('source-desc-input').value.trim();
    const verificationStatus = document.getElementById('source-status-input').value;

    const countryCodeMap = {
      'Việt Nam': 'vietnam',
      'Phần Lan': 'finland',
      'Singapore': 'singapore',
      'Nhật Bản': 'japan',
      'Quốc tế': 'international'
    };

    if (idInput) {
      // Edit
      const idx = sources.findIndex(s => s.id === idInput);
      if (idx !== -1) {
        sources[idx] = {
          ...sources[idx],
          title, country, countryCode: countryCodeMap[country] || 'vietnam',
          issuingBody, year, version, category, url, accessDate, description, verificationStatus
        };
        window.showToast('Đã cập nhật nguồn tài liệu thành công!');
      }
    } else {
      // Create new with collision-free ID
      const maxIdNum = sources.reduce((max, s) => {
        const m = String(s.id || '').match(/^src-(\d+)$/);
        return m ? Math.max(max, parseInt(m[1], 10)) : max;
      }, 0);
      const newId = 'src-' + String(maxIdNum + 1).padStart(2, '0');
      sources.push({
        id: newId,
        title,
        country,
        countryCode: countryCodeMap[country] || 'vietnam',
        issuingBody,
        year,
        version,
        category,
        url,
        accessDate,
        description,
        criteriaSupported: ['C1', 'C4'],
        verificationStatus
      });
      window.showToast('Đã thêm nguồn tài liệu mới thành công!');
    }

    saveSources();
    renderSourcesTable();
    window.ModalManager.close('source-modal');
  }

  window.SourcesManager = {
    editSource(id) {
      const src = sources.find(s => s.id === id);
      if (!src) return;

      document.getElementById('source-id-input').value = src.id;
      document.getElementById('source-title-input').value = src.title;
      document.getElementById('source-country-input').value = src.country;
      document.getElementById('source-issuing-input').value = src.issuingBody;
      document.getElementById('source-year-input').value = src.year;
      document.getElementById('source-version-input').value = src.version || '';
      document.getElementById('source-category-input').value = src.category;
      document.getElementById('source-url-input').value = src.url || '';
      document.getElementById('source-date-input').value = src.accessDate || '';
      document.getElementById('source-desc-input').value = src.description || '';
      document.getElementById('source-status-input').value = src.verificationStatus;

      document.getElementById('source-modal-title').textContent = `Chỉnh sửa nguồn: ${src.id}`;
      window.ModalManager.open('source-modal');
    },

    deleteSource(id) {
      if (confirm(`Bạn có chắc chắn muốn xóa nguồn tài liệu [${id}] khỏi hệ thống?`)) {
        sources = sources.filter(s => s.id !== id);
        saveSources();
        renderSourcesTable();
        window.showToast('Đã xóa nguồn tài liệu thành công!');
      }
    },

    toggleVerification(id) {
      const src = sources.find(s => s.id === id);
      if (src) {
        src.verificationStatus = src.verificationStatus === 'verified' ? 'pending' : 'verified';
        saveSources();
        renderSourcesTable();
        window.showToast(`Đã chuyển trạng thái: ${src.verificationStatus === 'verified' ? 'Đã xác minh' : 'Cần đối soát'}`);
      }
    }
  };

})();
