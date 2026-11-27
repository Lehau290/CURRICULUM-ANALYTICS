/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Main Application Controller, Router & Utilities
 */

(function () {
  'use strict';

  // Application State
  const AppState = {
    currentView: 'dashboard',
    theme: localStorage.getItem('ca_theme') || 'light',
    selectedCountryFilter: 'all',
    searchQuery: '',
    data: window.CURRICULUM_DATA || {}
  };

  window.AppState = AppState;

  // Initialize Application
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initGlobalSearch();
    initFilters();
    initMobileMenu();
    initExportReport();

    // Route based on URL hash or default to dashboard
    handleRouting();
    window.addEventListener('hashchange', handleRouting);
  });

  // 1. Theme Management (Light / Dark)
  function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (AppState.theme === 'dark') {
      document.body.classList.add('dark-theme');
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        AppState.theme = isDark ? 'dark' : 'light';
        localStorage.setItem('ca_theme', AppState.theme);
        updateThemeIcon(isDark);
        showToast(isDark ? 'Đã bật chế độ tối (Dark Mode)' : 'Đã chuyển về giao diện sáng');
        
        // Notify charts to update theme colors if necessary
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: AppState.theme } }));
      });
      updateThemeIcon(AppState.theme === 'dark');
    }
  }

  function updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    if (isDark) {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    } else {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // 2. Routing & View Switching
  function handleRouting() {
    let hash = window.location.hash.replace('#', '') || 'dashboard';
    const validViews = ['dashboard', 'countries', 'comparison', 'analysis', 'radar', 'recommendations', 'sources', 'ai-assistant', 'methodology', 'settings'];
    
    if (!validViews.includes(hash)) {
      hash = 'dashboard';
    }

    navigateToView(hash);
  }

  function navigateToView(viewName) {
    AppState.currentView = viewName;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
      if (el.getAttribute('data-view') === viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Update view containers
    document.querySelectorAll('.view-section').forEach(section => {
      if (section.id === `view-${viewName}`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Update Breadcrumb
    const breadcrumb = document.getElementById('current-breadcrumb');
    if (breadcrumb) {
      const titles = {
        'dashboard': 'Tổng quan Dashboard',
        'countries': 'Hồ sơ 4 Quốc gia',
        'comparison': 'Ma trận So sánh 8 Tiêu chí',
        'analysis': 'Phân tích Chi tiết Tiêu chí',
        'radar': 'Biểu đồ Radar Năng lực',
        'recommendations': 'Khuyến nghị Ứng dụng',
        'sources': 'Quản lý Nguồn Dữ liệu',
        'ai-assistant': 'AI Trợ lý Nghiên cứu',
        'methodology': 'Phương pháp Nghiên cứu',
        'settings': 'Cài đặt Hệ thống'
      };
      breadcrumb.textContent = titles[viewName] || 'Tổng quan';
    }

    // Close mobile sidebar if open
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Trigger view-specific render handlers
    window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: viewName } }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initNavigation() {
    document.querySelectorAll('.nav-item[data-view]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        window.location.hash = view;
      });
    });
  }

  // 3. Global Search & Header Filters
  function initGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.trim().toLowerCase();
      window.dispatchEvent(new CustomEvent('searchUpdated', { detail: { query: AppState.searchQuery } }));
    });
  }

  function initFilters() {
    const countryFilter = document.getElementById('header-country-filter');
    if (!countryFilter) return;

    countryFilter.addEventListener('change', (e) => {
      AppState.selectedCountryFilter = e.target.value;
      window.dispatchEvent(new CustomEvent('countryFilterChanged', { detail: { country: AppState.selectedCountryFilter } }));
      showToast(`Đã lọc theo: ${e.target.options[e.target.selectedIndex].text}`);
    });
  }

  // 4. Mobile Menu
  function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.app-sidebar');
    if (!mobileBtn || !sidebar) return;

    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  // 5. Export Report
  function prepareAllViewsForPrint() {
    const previousView = AppState.currentView;
    const views = ['dashboard', 'countries', 'comparison', 'analysis', 'radar', 'recommendations', 'sources', 'methodology'];
    views.forEach(v => {
      window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: v } }));
    });
    AppState.currentView = previousView;
  }

  function initExportReport() {
    window.addEventListener('beforeprint', prepareAllViewsForPrint);
    const exportBtn = document.getElementById('btn-export-report');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        prepareAllViewsForPrint();
        window.print();
      });
    }
  }

  // Toast Notification Utility
  window.showToast = function (message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // Generic Modal Controller
  window.ModalManager = {
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },
    close(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  };

  // Close modals on overlay click or Esc key
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });

})();
