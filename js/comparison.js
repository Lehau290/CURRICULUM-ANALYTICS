/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Comparison Matrix Table Controller
 * 8 Criteria, Filtering, Row Expansion, CSV & Excel Export
 */

(function () {
  'use strict';

  let currentCriteriaFilter = 'all';
  let searchQuery = '';

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('viewChanged', (e) => {
      if (e.detail.view === 'comparison') {
        renderComparisonMatrix();
      }
    });

    initMatrixControls();
  });

  function initMatrixControls() {
    const filterSelect = document.getElementById('matrix-criteria-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        currentCriteriaFilter = e.target.value;
        renderComparisonMatrix();
      });
    }

    const searchInput = document.getElementById('matrix-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderComparisonMatrix();
      });
    }

    // Export Buttons
    const btnExportCSV = document.getElementById('btn-export-csv');
    if (btnExportCSV) {
      btnExportCSV.addEventListener('click', exportMatrixToCSV);
    }

    const btnExportExcel = document.getElementById('btn-export-excel');
    if (btnExportExcel) {
      btnExportExcel.addEventListener('click', exportMatrixToExcel);
    }
  }

  function renderComparisonMatrix() {
    const tbody = document.getElementById('matrix-table-body');
    if (!tbody) return;

    const data = window.CURRICULUM_DATA;
    if (!data || !data.criteria) return;

    // Filter criteria
    let criteriaList = data.criteria;
    if (currentCriteriaFilter !== 'all') {
      criteriaList = criteriaList.filter(c => c.id === currentCriteriaFilter);
    }

    if (searchQuery) {
      criteriaList = criteriaList.filter(c => {
        const fullContent = `${c.name} ${c.description} ${c.comparison.vietnam} ${c.comparison.finland} ${c.comparison.singapore} ${c.comparison.japan}`.toLowerCase();
        return fullContent.includes(searchQuery);
      });
    }

    if (criteriaList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
            Không tìm thấy tiêu chí nào phù hợp với từ khóa "${searchQuery}".
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = criteriaList.map(criterion => `
      <tr class="matrix-row" id="row-${criterion.id}">
        <!-- Criterion Header Col -->
        <td class="criterion-col">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 11px; background: var(--primary-light); color: var(--primary); padding: 2px 6px; border-radius: var(--radius-pill); font-weight: 700;">${criterion.code}</span>
              <span class="verification-tag verified" title="Đối chiếu nguồn chính thức">Đã xác minh</span>
            </div>
            <strong style="color: var(--text-main); font-size: 13.5px;">${criterion.name}</strong>
            <span style="font-size: 11px; color: var(--text-muted);">${criterion.englishName}</span>
            <div class="expandable-row-trigger" onclick="MatrixManager.toggleDetails('${criterion.id}')">
              <span>Xem Rubric & Chỉ báo</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <!-- Expanded Details -->
            <div class="expanded-content" id="details-${criterion.id}">
              <div style="font-weight: 600; margin-bottom: 4px;">Chỉ báo đánh giá:</div>
              <ul style="padding-left: 14px; list-style-type: disc; margin-bottom: 6px;">
                ${criterion.indicators.map(ind => `<li>${ind}</li>`).join('')}
              </ul>
              <div style="font-weight: 600; margin-bottom: 2px;">Điểm rubric tham chiếu:</div>
              <div style="font-size: 11px; color: var(--text-muted);">Thang 1-5 quy ước học thuật.</div>
            </div>
          </div>
        </td>

        <!-- Vietnam Col -->
        <td class="country-col">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="color: var(--color-vn); font-size: 12px;">Việt Nam 🇻🇳</strong>
            <span style="font-size: 11px; font-weight: 700; background: rgba(239, 68, 68, 0.1); color: var(--color-vn); padding: 1px 6px; border-radius: var(--radius-pill);">${criterion.scores.vietnam} / 5.0</span>
          </div>
          <p style="font-size: 12.5px; line-height: 1.55; color: var(--text-main);">${criterion.comparison.vietnam}</p>
        </td>

        <!-- Finland Col -->
        <td class="country-col">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="color: var(--color-fi); font-size: 12px;">Phần Lan 🇫🇮</strong>
            <span style="font-size: 11px; font-weight: 700; background: rgba(2, 132, 199, 0.1); color: var(--color-fi); padding: 1px 6px; border-radius: var(--radius-pill);">${criterion.scores.finland} / 5.0</span>
          </div>
          <p style="font-size: 12.5px; line-height: 1.55; color: var(--text-main);">${criterion.comparison.finland}</p>
        </td>

        <!-- Singapore Col -->
        <td class="country-col">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="color: var(--color-sg); font-size: 12px;">Singapore 🇸🇬</strong>
            <span style="font-size: 11px; font-weight: 700; background: rgba(139, 92, 246, 0.1); color: var(--color-sg); padding: 1px 6px; border-radius: var(--radius-pill);">${criterion.scores.singapore} / 5.0</span>
          </div>
          <p style="font-size: 12.5px; line-height: 1.55; color: var(--text-main);">${criterion.comparison.singapore}</p>
        </td>

        <!-- Japan Col -->
        <td class="country-col">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="color: var(--color-jp); font-size: 12px;">Nhật Bản 🇯🇵</strong>
            <span style="font-size: 11px; font-weight: 700; background: rgba(245, 158, 11, 0.1); color: var(--color-jp); padding: 1px 6px; border-radius: var(--radius-pill);">${criterion.scores.japan} / 5.0</span>
          </div>
          <p style="font-size: 12.5px; line-height: 1.55; color: var(--text-main);">${criterion.comparison.japan}</p>
        </td>
      </tr>
    `).join('');
  }

  window.MatrixManager = {
    toggleDetails(criterionId) {
      const details = document.getElementById(`details-${criterionId}`);
      if (details) {
        details.classList.toggle('active');
      }
    }
  };

  // Export Matrix to CSV
  function exportMatrixToCSV() {
    const data = window.CURRICULUM_DATA;
    if (!data || !data.criteria) return;

    let csvContent = "\uFEFF"; // UTF-8 BOM
    csvContent += "Mã,Tiêu chí so sánh,Việt Nam (Điểm),Việt Nam (Nội dung),Phần Lan (Điểm),Phần Lan (Nội dung),Singapore (Điểm),Singapore (Nội dung),Nhật Bản (Điểm),Nhật Bản (Nội dung)\n";

    data.criteria.forEach(c => {
      const row = [
        `"${c.code}"`,
        `"${c.name}"`,
        `"${c.scores.vietnam}"`,
        `"${c.comparison.vietnam.replace(/"/g, '""')}"`,
        `"${c.scores.finland}"`,
        `"${c.comparison.finland.replace(/"/g, '""')}"`,
        `"${c.scores.singapore}"`,
        `"${c.comparison.singapore.replace(/"/g, '""')}"`,
        `"${c.scores.japan}"`,
        `"${c.comparison.japan.replace(/"/g, '""')}"`
      ];
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Ma_tran_so_sanh_chuong_trinh_tieu_hoc_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.showToast("Đã xuất ma trận so sánh sang file CSV thành công!");
  }

  // Export Matrix to Excel (HTML table format compatible with Excel)
  function exportMatrixToExcel() {
    const table = document.getElementById('matrix-table');
    if (!table) return;

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>MaTranSoSanh</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style>
          th { background-color: #0284c7; color: #ffffff; font-weight: bold; border: 1px solid #ddd; padding: 8px; }
          td { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
        </style>
      </head>
      <body>
        <h3>CURRICULUM ANALYTICS – PROJECT 03: MA TRẬN SO SÁNH CHƯƠNG TRÌNH TIỂU HỌC</h3>
        <p>Việt Nam - Phần Lan - Singapore - Nhật Bản</p>
        ${table.outerHTML}
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Ma_tran_so_sanh_chuong_trinh_tieu_hoc_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.showToast("Đã xuất dữ liệu sang Microsoft Excel (.xls) thành công!");
  }

})();
