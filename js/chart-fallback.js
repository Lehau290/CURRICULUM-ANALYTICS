/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Built-in Canvas Chart Engine & Offline Fallback for Chart.js
 * Ensures charts render with high quality even when offline or CDN is unreachable.
 */

(function () {
  'use strict';

  // Check if Chart.js is already provided
  if (typeof window.Chart !== 'undefined') {
    return;
  }

  console.info('Chart.js CDN unavailable or offline; activating native high-performance Canvas Chart Engine.');

  class FallbackChart {
    constructor(canvas, config) {
      this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.config = config || {};
      this.data = config.data || { labels: [], datasets: [] };
      this.options = config.options || {};
      this.type = config.type || 'bar';

      this.init();
    }

    init() {
      this.resize();
      this.render();

      window.addEventListener('resize', () => {
        this.resize();
        this.render();
      });
    }

    resize() {
      if (!this.canvas.parentElement) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width || 400;
      this.height = (rect.height && rect.height > 100) ? rect.height : (this.type === 'radar' ? 380 : 260);

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';
      this.ctx.scale(dpr, dpr);
    }

    destroy() {
      // Clean up if needed
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    }

    update() {
      this.render();
    }

    render() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      if (this.type === 'radar') {
        this.renderRadar();
      } else if (this.options.indexAxis === 'y') {
        this.renderHorizontalBar();
      } else {
        this.renderBar();
      }
    }

    renderBar() {
      const { ctx, width, height, data } = this;
      const padding = { top: 40, right: 30, bottom: 50, left: 45 };
      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;

      const isDark = document.body.classList.contains('dark-theme');
      const textColor = isDark ? '#94a3b8' : '#64748b';
      const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

      const visibleDatasets = data.datasets.filter(ds => !ds.hidden);
      if (visibleDatasets.length === 0) return;

      const labels = data.labels || [];
      const numGroups = labels.length;
      if (numGroups === 0) return;

      const groupWidth = chartW / numGroups;
      const barWidth = Math.max(4, Math.min(22, (groupWidth * 0.75) / visibleDatasets.length));

      // Draw Grid & Axes
      const maxVal = 5;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.fillStyle = textColor;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      for (let i = 0; i <= maxVal; i++) {
        const y = padding.top + chartH - (i / maxVal) * chartH;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartW, y);
        ctx.stroke();
        ctx.fillText(i.toString(), padding.left - 8, y);
      }

      // Draw Group Labels & Bars
      labels.forEach((lbl, gIdx) => {
        const groupCenterX = padding.left + gIdx * groupWidth + groupWidth / 2;
        
        // Group label
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = textColor;
        const shortLbl = lbl.length > 12 ? lbl.slice(0, 10) + '..' : lbl;
        ctx.fillText(shortLbl, groupCenterX, padding.top + chartH + 10);

        // Draw Bars
        const groupStart = groupCenterX - (visibleDatasets.length * barWidth) / 2;
        visibleDatasets.forEach((ds, dsIdx) => {
          const val = ds.data[gIdx] || 0;
          const barH = (Math.min(val, maxVal) / maxVal) * chartH;
          const barX = groupStart + dsIdx * barWidth;
          const barY = padding.top + chartH - barH;

          ctx.fillStyle = ds.backgroundColor || '#0284c7';
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(barX, barY, barWidth - 2, barH, [3, 3, 0, 0]) : ctx.rect(barX, barY, barWidth - 2, barH);
          ctx.fill();
        });
      });

      // Draw Legend at top
      let legendX = padding.left;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      visibleDatasets.forEach(ds => {
        ctx.fillStyle = ds.backgroundColor || '#0284c7';
        ctx.fillRect(legendX, 15, 12, 12);
        ctx.fillStyle = textColor;
        ctx.font = '11px Inter, sans-serif';
        ctx.fillText(ds.label || '', legendX + 16, 21);
        legendX += ctx.measureText(ds.label || '').width + 30;
      });
    }

    renderHorizontalBar() {
      const { ctx, width, height, data } = this;
      const padding = { top: 20, right: 30, bottom: 30, left: 110 };
      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;

      const isDark = document.body.classList.contains('dark-theme');
      const textColor = isDark ? '#94a3b8' : '#64748b';
      const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

      const ds = data.datasets[0];
      if (!ds) return;
      const labels = data.labels || [];
      const numBars = labels.length;
      const barHeight = Math.max(10, Math.min(26, chartH / numBars - 12));

      // Draw horizontal grid lines
      ctx.strokeStyle = gridColor;
      for (let i = 0; i <= 5; i++) {
        const x = padding.left + (i / 5) * chartW;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartH);
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(i.toString(), x, padding.top + chartH + 12);
      }

      // Draw Bars
      labels.forEach((lbl, idx) => {
        const y = padding.top + (idx + 0.5) * (chartH / numBars) - barHeight / 2;
        const val = ds.data[idx] || 0;
        const barW = (val / 5) * chartW;

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = textColor;
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText(lbl, padding.left - 10, y + barHeight / 2);

        const color = Array.isArray(ds.backgroundColor) ? ds.backgroundColor[idx] : ds.backgroundColor;
        ctx.fillStyle = color || '#0284c7';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(padding.left, y, barW, barHeight, [0, 4, 4, 0]) : ctx.rect(padding.left, y, barW, barHeight);
        ctx.fill();

        // Value text
        ctx.textAlign = 'left';
        ctx.fillStyle = textColor;
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(val + ' đ', padding.left + barW + 6, y + barHeight / 2);
      });
    }

    renderRadar() {
      const { ctx, width, height, data } = this;
      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const radius = Math.min(width, height) * 0.38;

      const isDark = document.body.classList.contains('dark-theme');
      const textColor = isDark ? '#94a3b8' : '#475569';
      const gridColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';

      const labels = data.labels || [];
      const numAxes = labels.length;
      if (numAxes === 0) return;

      const angleStep = (Math.PI * 2) / numAxes;

      // Draw concentric polygons (1 to 5)
      for (let level = 1; level <= 5; level++) {
        const r = (level / 5) * radius;
        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label concentric number
        ctx.fillStyle = textColor;
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(level.toString(), centerX + 4, centerY - r + 3);
      }

      // Draw radial axis lines & labels
      labels.forEach((lbl, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gridColor;
        ctx.stroke();

        // Label
        const labelDist = radius + 18;
        const lx = centerX + Math.cos(angle) * labelDist;
        const ly = centerY + Math.sin(angle) * labelDist;

        ctx.fillStyle = textColor;
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
        ctx.textBaseline = 'middle';
        ctx.fillText(lbl, lx, ly);
      });

      // Draw Datasets
      const visibleDatasets = data.datasets.filter(ds => !ds.hidden);
      visibleDatasets.forEach(ds => {
        ctx.beginPath();
        ds.data.forEach((val, i) => {
          const r = (Math.min(val, 5) / 5) * radius;
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = ds.backgroundColor || 'rgba(2, 132, 199, 0.2)';
        ctx.fill();
        ctx.strokeStyle = ds.borderColor || 'rgba(2, 132, 199, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw points
        ds.data.forEach((val, i) => {
          const r = (Math.min(val, 5) / 5) * radius;
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = ds.borderColor || '#0284c7';
          ctx.fill();
        });
      });
    }
  }

  // Bind to global window
  window.Chart = FallbackChart;
})();
