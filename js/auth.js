/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Unified Authentication & Access Control System
 * Tài khoản Quản trị viên: Lê Trung Hậu (Đề tài 03), Ngọc Lan (Đề tài 20), Kim Hân (Đề tài 17)
 */

(function () {
  'use strict';

  const AUTH_STORAGE_KEY = 'ca_current_user';
  const USERS_STORAGE_KEY = 'ca_admin_accounts';

  const DEFAULT_ADMINS = [
    {
      id: "admin-01",
      username: "letrunghau",
      aliases: ["lê trung hậu", "le trung hau", "hậu", "hau"],
      passwords: ["Admin@2026", "123456"],
      fullName: "Lê Trung Hậu",
      role: "Chủ nhiệm Đề tài 03 & Quản trị viên Cấp cao",
      roleCode: "lead_admin",
      email: "lehau290920@gmail.com",
      avatarInitials: "TH",
      avatarBg: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
      title: "Chủ nhiệm đề tài nghiên cứu",
      affiliation: "Ban Chủ nhiệm Đề tài 03 - Giáo dục học So sánh",
      targetUrl: "index.html",
      permissions: ["all", "edit_matrix", "verify_sources", "manage_recommendations", "export_reports", "manage_settings"]
    },
    {
      id: "admin-02",
      username: "ngoclan",
      aliases: ["ngọc lan", "ngoc lan", "lan"],
      passwords: ["123456", "Admin@2026"],
      fullName: "Ngọc Lan",
      role: "Chủ nhiệm Đề tài 20 & Quản trị viên Phân tích",
      roleCode: "analytics_admin",
      email: "ngoclan.research@gmail.com",
      avatarInitials: "NL",
      avatarBg: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
      title: "Chuyên gia phân tích dữ liệu giáo dục",
      affiliation: "Nhóm Nghiên cứu Đề tài 20 - AI & CTGDPT 2018",
      targetUrl: "detai20.html",
      permissions: ["all", "edit_matrix", "verify_sources", "manage_recommendations", "export_reports"]
    },
    {
      id: "admin-03",
      username: "kimhan",
      aliases: ["kim hân", "kim han", "hân", "han"],
      passwords: ["123456", "Admin@2026"],
      fullName: "Kim Hân",
      role: "Chủ nhiệm Đề tài 17 & Quản trị viên Chính sách",
      roleCode: "policy_admin",
      email: "kimhan.research@gmail.com",
      avatarInitials: "KH",
      avatarBg: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
      title: "Chuyên gia phân tích chính sách Năng lực số & AI",
      affiliation: "Nhóm Nghiên cứu Đề tài 17 - Năng lực số Tiểu học",
      targetUrl: "detai17.html",
      permissions: ["all", "edit_matrix", "verify_sources", "manage_recommendations", "export_reports"]
    }
  ];

  let currentUser = null;

  document.addEventListener('DOMContentLoaded', () => {
    initAuthSystem();
  });

  function initAuthSystem() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_ADMINS));

    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUser) {
      try {
        currentUser = JSON.parse(savedUser);
      } catch (e) {
        currentUser = null;
      }
    }

    if (!currentUser) {
      showLoginGate();
    } else if (currentUser.targetUrl && !window.location.pathname.endsWith(currentUser.targetUrl) && currentUser.username !== 'letrunghau') {
      window.location.href = currentUser.targetUrl;
      return;
    } else {
      hideLoginGate();
    }

    renderUserHeaderWidget();
    initAuthModalEvents();
  }

  function showLoginGate() {
    const gate = document.getElementById('login-gate-overlay');
    const app = document.querySelector('.app-container');
    if (gate) gate.style.display = 'flex';
    if (app) app.style.display = 'none';
  }

  function hideLoginGate() {
    const gate = document.getElementById('login-gate-overlay');
    const app = document.querySelector('.app-container');
    if (gate) gate.style.display = 'none';
    if (app) app.style.display = 'flex';
  }

  function renderUserHeaderWidget() {
    const userWidget = document.getElementById('header-user-widget');
    if (!userWidget) return;

    if (currentUser) {
      userWidget.innerHTML = `
        <div class="user-profile-btn" onclick="AuthManager.openAccountMenu()" title="Tài khoản: ${currentUser.fullName} (${currentUser.role})">
          <div class="user-avatar" style="background: ${currentUser.avatarBg};">${currentUser.avatarInitials}</div>
          <div class="user-meta-desktop">
            <span class="user-name">${currentUser.fullName}</span>
            <span class="user-role-badge">Admin</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      `;
    } else {
      userWidget.innerHTML = '';
    }
  }

  function initAuthModalEvents() {
    const gateForm = document.getElementById('gate-login-form');
    if (gateForm) {
      gateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawUser = document.getElementById('gate-username').value.trim().toLowerCase();
        const rawPass = document.getElementById('gate-password').value;
        const errBox = document.getElementById('gate-login-error');

        const matched = DEFAULT_ADMINS.find(acc =>
          (acc.username === rawUser || acc.aliases.includes(rawUser)) &&
          acc.passwords.includes(rawPass)
        );

        if (matched) {
          if (errBox) errBox.style.display = 'none';
          AuthManager.completeLogin(matched);
        } else {
          if (errBox) errBox.style.display = 'block';
        }
      });
    }

    const btnSwitchHau = document.getElementById('btn-switch-user-hau');
    if (btnSwitchHau) btnSwitchHau.addEventListener('click', () => AuthManager.switchUser('letrunghau'));

    const btnSwitchLan = document.getElementById('btn-switch-user-lan');
    if (btnSwitchLan) btnSwitchLan.addEventListener('click', () => AuthManager.switchUser('ngoclan'));

    const btnSwitchHan = document.getElementById('btn-switch-user-han');
    if (btnSwitchHan) btnSwitchHan.addEventListener('click', () => AuthManager.switchUser('kimhan'));

    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username-input').value.trim().toLowerCase();
        AuthManager.login(username);
      });
    }
  }

  window.AuthManager = {
    getCurrentUser() {
      return currentUser;
    },

    isAdmin() {
      return currentUser && currentUser.roleCode && currentUser.roleCode.includes('admin');
    },

    openAccountMenu() {
      renderAccountModalInfo();
      window.ModalManager.open('account-modal');
    },

    openLoginModal() {
      window.ModalManager.open('login-modal');
    },

    completeLogin(user) {
      currentUser = user;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));

      if (user.targetUrl && user.username !== 'letrunghau') {
        window.location.href = user.targetUrl;
        return;
      }

      hideLoginGate();
      renderUserHeaderWidget();
      renderAccountModalInfo();
      window.ModalManager.close('account-modal');
      window.ModalManager.close('login-modal');
      if (window.showToast) {
        window.showToast(`Chào mừng ${user.fullName} (${user.role})`);
      }
      window.dispatchEvent(new CustomEvent('authChanged', { detail: { user: currentUser } }));
      // Trigger dashboard re-render so charts size properly after unhiding .app-container
      window.dispatchEvent(new CustomEvent('viewChanged', { detail: { view: window.AppState ? window.AppState.currentView : 'dashboard' } }));
    },

    switchUser(username) {
      const user = DEFAULT_ADMINS.find(u => u.username === username);
      if (user) {
        this.completeLogin(user);
      }
    },

    login(username) {
      const user = DEFAULT_ADMINS.find(u =>
        u.username.toLowerCase() === username.toLowerCase() ||
        u.aliases.includes(username.toLowerCase())
      );
      if (user) {
        this.completeLogin(user);
      } else {
        window.showToast('Vui lòng chọn tài khoản "Ngọc Lan", "Kim Hân" hoặc "Lê Trung Hậu"', 'warning');
      }
    },

    logout() {
      currentUser = null;
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.ModalManager.close('account-modal');
      const gateForm = document.getElementById('gate-login-form');
      if (gateForm) gateForm.reset();
      showLoginGate();
    }
  };

  function renderAccountModalInfo() {
    if (!currentUser) return;
    const infoContainer = document.getElementById('current-account-info-box');
    if (infoContainer) {
      infoContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
          <div class="user-avatar" style="width: 52px; height: 52px; font-size: 20px; background: ${currentUser.avatarBg};">${currentUser.avatarInitials}</div>
          <div>
            <h3 style="font-size: 17px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${currentUser.fullName}</h3>
            <span style="font-size: 12px; color: var(--primary); font-weight: 600;">${currentUser.role}</span>
          </div>
        </div>

        <div style="background-color: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md); font-size: 12px; display: flex; flex-direction: column; gap: 6px;">
          <div><strong>Email xác thực:</strong> ${currentUser.email}</div>
          <div><strong>Đơn vị công tác:</strong> ${currentUser.affiliation}</div>
          <div><strong>Trạng thái phiên:</strong> <span style="color: var(--success); font-weight: 600;">● Đang hoạt động (Toàn quyền Admin)</span></div>
        </div>
      `;
    }
  }

})();
