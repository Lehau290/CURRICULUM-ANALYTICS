/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Research Methodology Controller
 * 8-Step Interactive Comparative Education Pipeline
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'methodology') {
        renderMethodologyTimeline();
      }
    });
  });

  function renderMethodologyTimeline() {
    const container = document.getElementById('methodology-timeline-container');
    if (!container) return;

    const data = window.CURRICULUM_DATA;
    if (!data || !data.methodologySteps) return;

    container.innerHTML = data.methodologySteps.map(step => `
      <div class="methodology-step-card">
        <div class="step-circle">${step.step}</div>
        <div class="step-content">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px;">
            <h3>Bước ${step.step}: ${step.title}</h3>
            <span style="font-size: 11.5px; color: var(--primary); font-weight: 600;">${step.shortDesc}</span>
          </div>
          <p style="margin-top: 6px;">${step.detail}</p>
          <div class="academic-note">
            <strong>Cơ sở phương pháp luận:</strong> ${step.academicRationale}
          </div>
        </div>
      </div>
    `).join('');
  }

})();
