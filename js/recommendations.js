/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Recommendations for Vietnam Controller
 * 5 Rich Conditional Proposals, Feasibility Assessment, Add/Edit Custom Recommendation
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ca_custom_recommendations';

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'recommendations') {
        renderRecommendationsList();
      }
    });

    initRecommendationModal();
  });

  function getStoredRecommendations() {
    const defaultRecs = window.CURRICULUM_DATA ? window.CURRICULUM_DATA.recommendations : [];
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return [...defaultRecs, ...custom];
  }

  function renderRecommendationsList() {
    const container = document.getElementById('recommendations-container');
    if (!container) return;

    const recs = getStoredRecommendations();

    container.innerHTML = recs.map((rec, index) => {
      const isHighPriority = rec.priority.toLowerCase().includes('cao') || rec.priority.includes('1');
      return `
        <div class="recommendation-card" id="rec-card-${rec.id}">
          <div class="rec-header">
            <div class="rec-title-group">
              <div class="rec-number">${index + 1}</div>
              <div>
                <h3 class="rec-title">${rec.title}</h3>
                <span style="font-size: 12px; color: var(--primary); font-weight: 500;">
                  Tham chiếu quốc tế: ${rec.referenceCountry}
                </span>
              </div>
            </div>
            <div class="rec-badges">
              <span class="priority-badge ${isHighPriority ? 'high' : 'medium'}">${rec.priority}</span>
              <span class="feasibility-pill">Tính khả thi: ${rec.feasibilityLabel || rec.feasibilityScore + '%'}</span>
            </div>
          </div>

          <div class="rec-details-grid">
            <div class="rec-box issue">
              <h5>Vấn đề tại Việt Nam cần giải quyết</h5>
              <p>${rec.vietnamIssue}</p>
            </div>

            <div class="rec-box condition">
              <h5>Điều kiện áp dụng thực tế</h5>
              <p>${rec.conditions}</p>
            </div>

            <div class="rec-box challenge">
              <h5>Khó khăn & Thách thức dự kiến</h5>
              <p>${rec.challenges}</p>
            </div>

            <div class="rec-box solution">
              <h5>Giải pháp khắc phục & Yếu tố điều chỉnh</h5>
              <p>${rec.solutions}</p>
              <div style="margin-top: 6px; font-size: 11px; color: var(--text-muted);">
                <strong>Yếu tố điều chỉnh:</strong> ${rec.adjustments}
              </div>
            </div>
          </div>

          <div style="background-color: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap; gap: 8px;">
            <div>
              <strong>Cơ sở dữ liệu / Nguồn:</strong> ${rec.databaseGrounding}
            </div>
            <div>
              <strong>Đối tượng áp dụng:</strong> ${rec.targetAudience}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function initRecommendationModal() {
    const btnAdd = document.getElementById('btn-add-rec');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        window.ModalManager.open('add-recommendation-modal');
      });
    }

    const form = document.getElementById('add-rec-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newRec = {
          id: 'rec-custom-' + Date.now(),
          title: document.getElementById('rec-input-title').value.trim(),
          referenceCountry: document.getElementById('rec-input-country').value.trim(),
          vietnamIssue: document.getElementById('rec-input-issue').value.trim(),
          databaseGrounding: document.getElementById('rec-input-grounding').value.trim() || 'Nghiên cứu đối sánh độc lập',
          conditions: document.getElementById('rec-input-conditions').value.trim(),
          adjustments: document.getElementById('rec-input-adjustments').value.trim(),
          challenges: document.getElementById('rec-input-challenges').value.trim(),
          solutions: document.getElementById('rec-input-solutions').value.trim(),
          targetAudience: document.getElementById('rec-input-audience').value.trim() || 'Cơ sở giáo dục tiểu học',
          priority: document.getElementById('rec-input-priority').value,
          feasibilityScore: parseInt(document.getElementById('rec-input-feasibility').value, 10) || 80,
          feasibilityLabel: `Khả thi (${document.getElementById('rec-input-feasibility').value || 80}%)`
        };

        const custom = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        custom.push(newRec);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));

        window.ModalManager.close('add-recommendation-modal');
        form.reset();
        renderRecommendationsList();
        window.showToast('Đã thêm khuyến nghị mới thành công!');
      });
    }
  }

})();
