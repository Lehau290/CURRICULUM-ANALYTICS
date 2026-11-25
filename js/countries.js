/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Country Profiles & Deep-dive Details Modal Controller
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'countries') {
        renderCountriesList();
      }
    });

    window.addEventListener('searchUpdated', (e) => {
      if (window.AppState && window.AppState.currentView === 'countries') {
        filterCountries(e.detail.query);
      }
    });
  });

  // Render Country Cards Grid
  function renderCountriesList() {
    const container = document.getElementById('countries-grid-container');
    if (!container) return;

    const data = window.CURRICULUM_DATA;
    if (!data || !data.countries) return;

    container.innerHTML = data.countries.map(country => `
      <div class="country-card" data-country-id="${country.id}">
        <div class="country-card-header">
          <div class="country-flag-title">
            <span class="country-flag">${country.flag}</span>
            <div class="country-name-group">
              <h3>${country.name}</h3>
              <span>${country.englishName}</span>
            </div>
          </div>
          <span class="country-status-badge">Đã xác minh</span>
        </div>

        <div class="country-card-body">
          <div class="curriculum-meta-list">
            <div class="meta-item">
              <span class="meta-label">Chương trình</span>
              <span class="meta-value" style="font-size: 11.5px;">${country.curriculumName}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Cấp quản lý</span>
              <span class="meta-value">${country.governingBody}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Thời gian tiểu học</span>
              <span class="meta-value">${country.primaryYears} năm (${country.ageRange})</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Năm ban hành</span>
              <span class="meta-value">${country.promulgationYear.split(' ')[0]}</span>
            </div>
          </div>

          <p class="country-summary">${country.summary}</p>

          <div class="country-highlights">
            <h4>Đặc điểm nổi bật</h4>
            <div>
              ${country.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="country-card-footer">
          <span style="font-size: 11px; color: var(--text-muted);">Nguồn: ${country.officialSource}</span>
          <button class="btn-primary btn-sm" onclick="CountryManager.openDetails('${country.id}')">
            Xem hồ sơ chi tiết
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  function filterCountries(query) {
    const cards = document.querySelectorAll('.country-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Country Deep-Dive Details Modal (10 points of curriculum)
  window.CountryManager = {
    openDetails(countryId) {
      const country = window.CURRICULUM_DATA.countries.find(c => c.id === countryId);
      if (!country) return;

      const modalTitle = document.getElementById('country-modal-title');
      const modalBody = document.getElementById('country-modal-body');

      if (modalTitle) {
        modalTitle.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 28px;">${country.flag}</span>
            <div>
              <h2 style="font-size: 18px; margin: 0;">${country.name} (${country.englishName})</h2>
              <span style="font-size: 12px; color: var(--text-muted); font-weight: normal;">${country.curriculumName}</span>
            </div>
          </div>
        `;
      }

      if (modalBody) {
        modalBody.innerHTML = `
          <!-- Thẻ định danh nhanh -->
          <div style="background-color: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 12px;">
            <div><strong>Cơ quan ban hành:</strong> ${country.governingBody}</div>
            <div><strong>Thời lượng học:</strong> ${country.primaryYears} năm (${country.ageRange})</div>
            <div><strong>Văn bản chính thức:</strong> ${country.officialCode}</div>
            <div><strong>Thời lượng tuần:</strong> ${country.periodsPerWeek}</div>
            <div><strong>Tổng giờ học/năm:</strong> ${country.annualHours}</div>
            <div><strong>Sĩ số lớp trung bình:</strong> ${country.classSizeAvg}</div>
          </div>

          <!-- 10 Mục phân tích chi tiết -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">1. Tổng quan hệ thống giáo dục</h4>
              <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${country.details.systemOverview}</p>
            </div>

            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">2. Cấu trúc chương trình tiểu học & Phân bổ môn học</h4>
              <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${country.details.curriculumStructure}</p>
            </div>

            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">3. Mục tiêu & Triết lý giáo dục</h4>
              <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${country.details.educationalPhilosophy}</p>
            </div>

            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">4. Khung năng lực & Phẩm chất cốt lõi</h4>
              <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${country.details.coreCompetencies}</p>
            </div>

            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">5. Phương pháp sư phạm chủ đạo</h4>
              <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${country.details.pedagogicalApproach}</p>
            </div>

            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">6. Phương thức đánh giá & Kiểm định</h4>
              <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${country.details.assessmentMethod}</p>
            </div>

            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">7. Ghi chú bối cảnh giáo dục & Thách thức</h4>
              <p style="font-size: 13px; line-height: 1.6; color: var(--text-muted);">${country.contextNotes}</p>
            </div>

            <div class="modal-section-card">
              <h4 style="color: var(--primary); font-size: 13.5px; margin-bottom: 6px;">8. Nguồn văn bản tham khảo chính thức</h4>
              <div style="font-size: 12.5px;">
                <p><strong>Cơ quan:</strong> ${country.officialSource}</p>
                <p><strong>Đường dẫn tra cứu:</strong> <a href="${country.officialUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: underline;">${country.officialUrl}</a></p>
              </div>
            </div>
          </div>
        `;
      }

      window.ModalManager.open('country-details-modal');
    }
  };

})();
