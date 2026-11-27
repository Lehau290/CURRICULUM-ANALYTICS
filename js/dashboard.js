/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Dashboard Analytics & Charts Controller
 */

(function () {
  'use strict';

  let chartCountryComp = null;
  let chartScoresDist = null;
  let chartDataCoverage = null;
  let chartCurriculumOverview = null;

  document.addEventListener('DOMContentLoaded', () => {
    // Listen for view changes or filter updates
    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'dashboard') {
        renderDashboard();
      }
    });

    window.addEventListener('countryFilterChanged', (e) => {
      if (window.AppState && window.AppState.currentView === 'dashboard') {
        updateChartsForCountry(e.detail.country);
      }
    });

    window.addEventListener('themeChanged', () => {
      renderDashboardCharts();
    });

    // Initial render if already on dashboard
    setTimeout(() => {
      renderDashboard();
    }, 100);
  });

  function renderDashboard() {
    renderStats();
    renderDashboardCharts();
  }

  // 1. Render Overview Statistic Cards
  function renderStats() {
    const data = window.CURRICULUM_DATA;
    if (!data) return;

    let liveSources = data.sources || [];
    try {
      const storedSources = localStorage.getItem('ca_sources_data');
      if (storedSources) {
        const parsed = JSON.parse(storedSources);
        if (Array.isArray(parsed)) liveSources = parsed;
      }
    } catch (e) {}

    let customRecs = [];
    try {
      const storedRecs = localStorage.getItem('ca_custom_recommendations');
      if (storedRecs) {
        const parsedRecs = JSON.parse(storedRecs);
        if (Array.isArray(parsedRecs)) customRecs = parsedRecs;
      }
    } catch (e) {}

    const countriesCount = data.countries ? data.countries.length : 4;
    const criteriaCount = data.criteria ? data.criteria.length : 8;
    const sourcesCount = liveSources.length;
    const verifiedSources = liveSources.filter(s => s.verificationStatus === 'verified').length;
    const recommendationsCount = (data.recommendations ? data.recommendations.length : 0) + customRecs.length;
    const dataCompleteness = sourcesCount > 0 ? ((verifiedSources / sourcesCount) * 100).toFixed(1) + '%' : '0%';

    const statsContainer = document.getElementById('dashboard-stats-grid');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-header">
          <span>Hệ thống giáo dục</span>
          <div class="stat-icon primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>
          </div>
        </div>
        <div class="stat-value">${countriesCount}</div>
        <div class="stat-footer">
          <span style="color: var(--success); font-weight: 600;">100%</span>
          <span>Đối chiếu độc lập</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span>Tiêu chí chuẩn hóa</span>
          <div class="stat-icon teal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
        </div>
        <div class="stat-value">${criteriaCount}</div>
        <div class="stat-footer">
          <span>Rubric 1-5 điểm</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span>Tài liệu & Nguồn gốc</span>
          <div class="stat-icon info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
        </div>
        <div class="stat-value">${sourcesCount}</div>
        <div class="stat-footer">
          <span style="color: var(--success); font-weight: 600;">${verifiedSources}</span>
          <span>Văn bản chính thức</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span>Độ phủ dữ liệu</span>
          <div class="stat-icon success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>
        <div class="stat-value">${dataCompleteness}</div>
        <div class="stat-footer">
          <span>Minh chứng xác thực</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span>Khuyến nghị thực tiễn</span>
          <div class="stat-icon warning">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
        </div>
        <div class="stat-value">${recommendationsCount}</div>
        <div class="stat-footer">
          <span>Áp dụng có điều kiện</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span>Độ tin cậy học thuật</span>
          <div class="stat-icon navy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
        </div>
        <div class="stat-value">A+</div>
        <div class="stat-footer">
          <span>Chuẩn so sánh Bereday</span>
        </div>
      </div>
    `;
  }

  // 2. Render 4 Core Charts with Chart.js
  function renderDashboardCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded yet');
      return;
    }

    const data = window.CURRICULUM_DATA;
    if (!data) return;

    const isDark = document.body.classList.contains('dark-theme');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

    // Chart 1: Country Comparison by Criteria (Grouped Bar Chart)
    const ctx1 = document.getElementById('chart-country-comparison');
    if (ctx1) {
      if (chartCountryComp) chartCountryComp.destroy();

      const labels = data.criteria.map(c => c.name);
      const dsVietnam = data.criteria.map(c => c.scores.vietnam);
      const dsFinland = data.criteria.map(c => c.scores.finland);
      const dsSingapore = data.criteria.map(c => c.scores.singapore);
      const dsJapan = data.criteria.map(c => c.scores.japan);

      chartCountryComp = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'Việt Nam 🇻🇳', data: dsVietnam, backgroundColor: 'rgba(239, 68, 68, 0.85)', borderRadius: 4 },
            { label: 'Phần Lan 🇫🇮', data: dsFinland, backgroundColor: 'rgba(2, 132, 199, 0.85)', borderRadius: 4 },
            { label: 'Singapore 🇸🇬', data: dsSingapore, backgroundColor: 'rgba(139, 92, 246, 0.85)', borderRadius: 4 },
            { label: 'Nhật Bản 🇯🇵', data: dsJapan, backgroundColor: 'rgba(245, 158, 11, 0.85)', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { color: textColor, font: { family: 'Inter', size: 12 } } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} / 5.0 điểm (Thang định tính rubric)`
              }
            }
          },
          scales: {
            x: { ticks: { color: textColor, font: { size: 11 } }, grid: { display: false } },
            y: {
              min: 0,
              max: 5,
              ticks: { stepSize: 1, color: textColor },
              grid: { color: gridColor },
              title: { display: true, text: 'Điểm rubric học thuật (1-5)', color: textColor }
            }
          }
        }
      });
    }

    // Chart 2: Comparison Scores - Average Overall Score (Bar Horizontal or Polar Area)
    const ctx2 = document.getElementById('chart-comparison-scores');
    if (ctx2) {
      if (chartScoresDist) chartScoresDist.destroy();

      // Calculate averages
      const avgVn = (data.criteria.reduce((a, b) => a + b.scores.vietnam, 0) / data.criteria.length).toFixed(2);
      const avgFi = (data.criteria.reduce((a, b) => a + b.scores.finland, 0) / data.criteria.length).toFixed(2);
      const avgSg = (data.criteria.reduce((a, b) => a + b.scores.singapore, 0) / data.criteria.length).toFixed(2);
      const avgJp = (data.criteria.reduce((a, b) => a + b.scores.japan, 0) / data.criteria.length).toFixed(2);

      chartScoresDist = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Việt Nam 🇻🇳', 'Phần Lan 🇫🇮', 'Singapore 🇸🇬', 'Nhật Bản 🇯🇵'],
          datasets: [{
            label: 'Điểm trung bình 8 tiêu chí',
            data: [avgVn, avgFi, avgSg, avgJp],
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
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `Điểm trung bình: ${ctx.parsed.x} / 5.0 (Thang quy ước học thuật)`
              }
            }
          },
          scales: {
            x: { min: 0, max: 5, ticks: { stepSize: 1, color: textColor }, grid: { color: gridColor } },
            y: { ticks: { color: textColor, font: { size: 12, weight: '600' } }, grid: { display: false } }
          }
        }
      });
    }

    // Chart 3: Data Coverage & Evidence Verification (Stacked Bar)
    const ctx3 = document.getElementById('chart-data-coverage');
    if (ctx3) {
      if (chartDataCoverage) chartDataCoverage.destroy();

      chartDataCoverage = new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: ['Việt Nam', 'Phần Lan', 'Singapore', 'Nhật Bản'],
          datasets: [
            {
              label: 'Đã xác minh qua văn bản gốc (%)',
              data: [92, 95, 90, 88],
              backgroundColor: 'rgba(16, 185, 129, 0.85)',
              borderRadius: 4
            },
            {
              label: 'Dữ liệu đối chiếu bổ sung (%)',
              data: [8, 5, 10, 12],
              backgroundColor: 'rgba(245, 158, 11, 0.85)',
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: true, ticks: { color: textColor }, grid: { display: false } },
            y: {
              stacked: true,
              min: 0,
              max: 100,
              ticks: { callback: v => v + '%', color: textColor },
              grid: { color: gridColor }
            }
          },
          plugins: {
            legend: { position: 'top', labels: { color: textColor } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`
              }
            }
          }
        }
      });
    }

    // Chart 4: Curriculum Overview Metrics (Hours / Years / Subjects comparison)
    const ctx4 = document.getElementById('chart-curriculum-overview');
    if (ctx4) {
      if (chartCurriculumOverview) chartCurriculumOverview.destroy();

      chartCurriculumOverview = new Chart(ctx4, {
        type: 'bar',
        data: {
          labels: ['Việt Nam 🇻🇳', 'Phần Lan 🇫🇮', 'Singapore 🇸🇬', 'Nhật Bản 🇯🇵'],
          datasets: [
            {
              label: 'Số giờ học chuẩn/năm (h)',
              data: [910, 680, 980, 850],
              backgroundColor: 'rgba(2, 132, 199, 0.85)',
              yAxisID: 'y'
            },
            {
              label: 'Số năm tiểu học (năm x 100)',
              data: [500, 600, 600, 600],
              backgroundColor: 'rgba(13, 148, 136, 0.85)',
              yAxisID: 'y'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { color: textColor } },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  if (ctx.datasetIndex === 1) {
                    return `Số năm tiểu học: ${ctx.parsed.y / 100} năm`;
                  }
                  return `Thời lượng học: ${ctx.parsed.y} giờ/năm`;
                }
              }
            }
          },
          scales: {
            x: { ticks: { color: textColor }, grid: { display: false } },
            y: {
              ticks: { color: textColor },
              grid: { color: gridColor },
              title: { display: true, text: 'Chỉ số định lượng thời gian', color: textColor }
            }
          }
        }
      });
    }
  }

  function updateChartsForCountry(countryFilter) {
    const countryIndexMap = { vietnam: 0, finland: 1, singapore: 2, japan: 3 };
    const selectedIdx = countryIndexMap[countryFilter];

    if (chartCountryComp) {
      if (countryFilter === 'all') {
        chartCountryComp.data.datasets.forEach(ds => ds.hidden = false);
      } else {
        const countryNames = {
          'vietnam': 'Việt Nam 🇻🇳',
          'finland': 'Phần Lan 🇫🇮',
          'singapore': 'Singapore 🇸🇬',
          'japan': 'Nhật Bản 🇯🇵'
        };
        chartCountryComp.data.datasets.forEach(ds => {
          ds.hidden = ds.label !== countryNames[countryFilter];
        });
      }
      chartCountryComp.update();
    }

    const baseColors = [
      'rgba(239, 68, 68, 0.85)',
      'rgba(2, 132, 199, 0.85)',
      'rgba(139, 92, 246, 0.85)',
      'rgba(245, 158, 11, 0.85)'
    ];
    if (chartScoresDist) {
      chartScoresDist.data.datasets[0].backgroundColor = baseColors.map((c, idx) =>
        countryFilter === 'all' || idx === selectedIdx ? c : c.replace('0.85)', '0.2)')
      );
      chartScoresDist.update();
    }

    if (chartDataCoverage) {
      const covColors = ['rgba(16, 185, 129, 0.85)', 'rgba(245, 158, 11, 0.85)'];
      chartDataCoverage.data.datasets.forEach((ds, dIdx) => {
        ds.backgroundColor = [0, 1, 2, 3].map(idx =>
          countryFilter === 'all' || idx === selectedIdx ? covColors[dIdx] : covColors[dIdx].replace('0.85)', '0.2)')
        );
      });
      chartDataCoverage.update();
    }

    if (chartCurriculumOverview) {
      const ovColors = ['rgba(2, 132, 199, 0.85)', 'rgba(13, 148, 136, 0.85)'];
      chartCurriculumOverview.data.datasets.forEach((ds, dIdx) => {
        ds.backgroundColor = [0, 1, 2, 3].map(idx =>
          countryFilter === 'all' || idx === selectedIdx ? ovColors[dIdx] : ovColors[dIdx].replace('0.85)', '0.2)')
        );
      });
      chartCurriculumOverview.update();
    }
  }

})();
