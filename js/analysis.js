/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Criteria Analysis Controller (Deep-Dive per Criterion)
 */

(function () {
  'use strict';

  let currentCriterionId = 'muc-tieu';
  let criterionChart = null;

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'analysis') {
        renderAnalysisTabs();
        renderCriterionAnalysis(currentCriterionId);
      }
    });
  });

  function renderAnalysisTabs() {
    const tabsContainer = document.getElementById('criteria-tabs-bar');
    if (!tabsContainer) return;

    const data = window.CURRICULUM_DATA;
    if (!data || !data.criteria) return;

    tabsContainer.innerHTML = data.criteria.map(c => `
      <button class="criterion-tab-btn ${c.id === currentCriterionId ? 'active' : ''}" 
              onclick="AnalysisManager.selectCriterion('${c.id}')">
        <span>${c.code}. ${c.name}</span>
      </button>
    `).join('');
  }

  function renderCriterionAnalysis(criterionId) {
    currentCriterionId = criterionId;
    const data = window.CURRICULUM_DATA;
    if (!data || !data.criteria) return;

    const criterion = data.criteria.find(c => c.id === criterionId) || data.criteria[0];
    if (!criterion) return;

    // Update Tab states
    document.querySelectorAll('.criterion-tab-btn').forEach(btn => {
      if (btn.textContent.includes(criterion.name)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Render Criterion Header
    const titleArea = document.getElementById('analysis-title-area');
    if (titleArea) {
      titleArea.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="background: var(--primary); color: #fff; padding: 2px 8px; border-radius: var(--radius-pill); font-weight: 700; font-size: 11px;">${criterion.code}</span>
          <h2 style="font-size: 20px; font-weight: 700; color: var(--text-main); margin: 0;">${criterion.name} (${criterion.englishName})</h2>
        </div>
        <p style="color: var(--text-muted); font-size: 13px;">${criterion.description}</p>
      `;
    }

    // Render 4 Countries Analysis Boxes
    const cardsContainer = document.getElementById('analysis-countries-cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = `
        <div class="analysis-country-box vietnam">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🇻🇳</span>
              <strong style="color: var(--color-vn); font-size: 14px;">Việt Nam (CT 2018)</strong>
            </div>
            <span style="font-size: 11.5px; font-weight: 700; background: rgba(239, 68, 68, 0.1); color: var(--color-vn); padding: 2px 8px; border-radius: var(--radius-pill);">${criterion.scores.vietnam} / 5.0</span>
          </div>
          <p style="font-size: 13px; line-height: 1.6; color: var(--text-main);">${criterion.comparison.vietnam}</p>
        </div>

        <div class="analysis-country-box finland">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🇫🇮</span>
              <strong style="color: var(--color-fi); font-size: 14px;">Phần Lan (OPS 2014)</strong>
            </div>
            <span style="font-size: 11.5px; font-weight: 700; background: rgba(2, 132, 199, 0.1); color: var(--color-fi); padding: 2px 8px; border-radius: var(--radius-pill);">${criterion.scores.finland} / 5.0</span>
          </div>
          <p style="font-size: 13px; line-height: 1.6; color: var(--text-main);">${criterion.comparison.finland}</p>
        </div>

        <div class="analysis-country-box singapore">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🇸🇬</span>
              <strong style="color: var(--color-sg); font-size: 14px;">Singapore (21CC / MOE)</strong>
            </div>
            <span style="font-size: 11.5px; font-weight: 700; background: rgba(139, 92, 246, 0.1); color: var(--color-sg); padding: 2px 8px; border-radius: var(--radius-pill);">${criterion.scores.singapore} / 5.0</span>
          </div>
          <p style="font-size: 13px; line-height: 1.6; color: var(--text-main);">${criterion.comparison.singapore}</p>
        </div>

        <div class="analysis-country-box japan">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🇯🇵</span>
              <strong style="color: var(--color-jp); font-size: 14px;">Nhật Bản (MEXT 2017/2020)</strong>
            </div>
            <span style="font-size: 11.5px; font-weight: 700; background: rgba(245, 158, 11, 0.1); color: var(--color-jp); padding: 2px 8px; border-radius: var(--radius-pill);">${criterion.scores.japan} / 5.0</span>
          </div>
          <p style="font-size: 13px; line-height: 1.6; color: var(--text-main);">${criterion.comparison.japan}</p>
        </div>
      `;
    }

    // Render Synthesis & Comparative Notes
    const synthesisArea = document.getElementById('analysis-synthesis-area');
    if (synthesisArea) {
      synthesisArea.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          <div style="background-color: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md); border-left: 3px solid var(--info);">
            <h4 style="font-size: 13px; color: var(--info); margin-bottom: 6px;">Điểm tương đồng chính</h4>
            <p style="font-size: 12.5px; line-height: 1.6; color: var(--text-main);">${criterion.similarities}</p>
          </div>

          <div style="background-color: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md); border-left: 3px solid var(--warning);">
            <h4 style="font-size: 13px; color: var(--warning); margin-bottom: 6px;">Khác biệt & Bối cảnh hóa</h4>
            <p style="font-size: 12.5px; line-height: 1.6; color: var(--text-main);">${criterion.differences}</p>
          </div>
        </div>

        <div style="margin-top: 16px; background-color: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md); display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 12.5px;">
          <div>
            <strong style="color: var(--success);">Ưu điểm nổi bật:</strong>
            <p style="color: var(--text-muted); margin-top: 4px;">${criterion.prosAndCons.pros}</p>
          </div>
          <div>
            <strong style="color: var(--danger);">Thách thức & Hạn chế:</strong>
            <p style="color: var(--text-muted); margin-top: 4px;">${criterion.prosAndCons.cons}</p>
          </div>
        </div>
      `;
    }

    // Render Mini Bar Chart for this criterion
    renderCriterionChart(criterion);
  }

  function renderCriterionChart(criterion) {
    const ctx = document.getElementById('chart-single-criterion');
    if (!ctx) return;

    if (criterionChart) criterionChart.destroy();

    const isDark = document.body.classList.contains('dark-theme');
    const textColor = isDark ? '#94a3b8' : '#64748b';

    criterionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Việt Nam 🇻🇳', 'Phần Lan 🇫🇮', 'Singapore 🇸🇬', 'Nhật Bản 🇯🇵'],
        datasets: [{
          label: `Điểm ${criterion.name}`,
          data: [criterion.scores.vietnam, criterion.scores.finland, criterion.scores.singapore, criterion.scores.japan],
          backgroundColor: [
            'rgba(239, 68, 68, 0.85)',
            'rgba(2, 132, 199, 0.85)',
            'rgba(139, 92, 246, 0.85)',
            'rgba(245, 158, 11, 0.85)'
          ],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed.y} / 5.0 (Rubric chuẩn)`
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor }, grid: { display: false } },
          y: {
            min: 0,
            max: 5,
            ticks: { stepSize: 1, color: textColor },
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }
          }
        }
      }
    });
  }

  window.AnalysisManager = {
    selectCriterion(criterionId) {
      renderCriterionAnalysis(criterionId);
    }
  };

})();
