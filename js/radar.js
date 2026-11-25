/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Radar Chart & Rubric Scoring Controller
 * 8 Dimensions, Dynamic Country Toggling, Rubric Explanations
 */

(function () {
  'use strict';

  let radarChartInstance = null;
  const activeCountries = {
    vietnam: true,
    finland: true,
    singapore: true,
    japan: true
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'radar') {
        renderRadarView();
      }
    });

    window.addEventListener('themeChanged', () => {
      if (window.AppState && window.AppState.currentView === 'radar') {
        renderRadarChart();
      }
    });

    initRadarControls();
  });

  function initRadarControls() {
    ['vietnam', 'finland', 'singapore', 'japan'].forEach(cid => {
      const checkbox = document.getElementById(`radar-toggle-${cid}`);
      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          activeCountries[cid] = e.target.checked;
          renderRadarChart();
        });
      }
    });
  }

  function renderRadarView() {
    renderRadarChart();
    renderRubricGuide();
  }

  function renderRadarChart() {
    const ctx = document.getElementById('chart-radar-canvas');
    if (!ctx) return;

    if (radarChartInstance) radarChartInstance.destroy();

    const data = window.CURRICULUM_DATA;
    if (!data || !data.criteria) return;

    const isDark = document.body.classList.contains('dark-theme');
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';

    const labels = data.criteria.map(c => c.name);

    const datasets = [];

    if (activeCountries.vietnam) {
      datasets.push({
        label: 'Việt Nam 🇻🇳',
        data: data.criteria.map(c => c.scores.vietnam),
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 0.9)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointRadius: 4
      });
    }

    if (activeCountries.finland) {
      datasets.push({
        label: 'Phần Lan 🇫🇮',
        data: data.criteria.map(c => c.scores.finland),
        backgroundColor: 'rgba(2, 132, 199, 0.2)',
        borderColor: 'rgba(2, 132, 199, 0.9)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(2, 132, 199, 1)',
        pointRadius: 4
      });
    }

    if (activeCountries.singapore) {
      datasets.push({
        label: 'Singapore 🇸🇬',
        data: data.criteria.map(c => c.scores.singapore),
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 0.9)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
        pointRadius: 4
      });
    }

    if (activeCountries.japan) {
      datasets.push({
        label: 'Nhật Bản 🇯🇵',
        data: data.criteria.map(c => c.scores.japan),
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: 'rgba(245, 158, 11, 0.9)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(245, 158, 11, 1)',
        pointRadius: 4
      });
    }

    radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0.1 }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: textColor, font: { family: 'Inter', size: 12, weight: '500' } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.r} / 5.0 (Thang rubric)`
            }
          }
        },
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              color: textColor,
              backdropColor: 'transparent'
            },
            grid: { color: gridColor },
            angleLines: { color: gridColor },
            pointLabels: {
              color: textColor,
              font: { family: 'Inter', size: 11.5, weight: '600' }
            }
          }
        }
      }
    });
  }

  function renderRubricGuide() {
    const rubricContainer = document.getElementById('radar-rubrics-list');
    if (!rubricContainer) return;

    const data = window.CURRICULUM_DATA;
    if (!data || !data.radarRubrics) return;

    rubricContainer.innerHTML = data.radarRubrics.levels.map(lvl => `
      <div class="rubric-level">
        <span class="rubric-level-badge">${lvl.score}</span>
        <div>
          <strong style="color: var(--text-main); font-size: 12.5px;">${lvl.label}</strong>
          <p style="color: var(--text-muted); font-size: 11.5px; margin-top: 2px;">${lvl.desc}</p>
        </div>
      </div>
    `).join('');
  }

})();
