/**
 * CURRICULUM ANALYTICS – PROJECT 03
 * Authentication & Admin Access Control System
 * Tài khoản Quản trị viên & Chủ nhiệm nghiên cứu: Lê Trung Hậu & Ngọc Lan
 */

(function () {
  'use strict';

  const AUTH_STORAGE_KEY = 'ca_current_user';
  const USERS_STORAGE_KEY = 'ca_admin_accounts';

  // Danh mục tài khoản Admin mặc định
  const DEFAULT_ADMINS = [
    {
      id: "admin-01",
      username: "letrunghau",
      fullName: "Lê Trung Hậu",
      role: "Chủ nhiệm Đề tài & Quản trị viên Cấp cao",
      roleCode: "lead_admin",
      email: "lehau290920@gmail.com",
      avatarInitials: "TH",
      avatarBg: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
      title: "Chủ nhiệm đề tài nghiên cứu",
      affiliation: "Ban Chủ nhiệm Đề tài 03 - Giáo dục học So sánh",
      permissions: ["all", "edit_matrix", "verify_sources", "manage_recommendations", "export_reports", "manage_settings"]
    },
    {
      id: "admin-02",
      username: "ngoclan",
      fullName: "Ngọc Lan",
      role: "Đồng Chủ nhiệm & Quản trị viên Phân tích",
      roleCode: "analytics_admin",
      email: "ngoclan.research@gmail.com",
      avatarInitials: "NL",
      avatarBg: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
      title: "Chuyên gia phân tích dữ liệu giáo dục",
      affiliation: "Nhóm Nghiên cứu & Đối sánh Quốc tế",
      permissions: ["all", "edit_matrix", "verify_sources", "manage_recommendations", "export_reports"]
    }
  ];

  // Khởi tạo người dùng hiện tại
  let currentUser = null;

  document.addEventListener('DOMContentLoaded', () => {
    initAuthSystem();
  });

  function initAuthSystem() {
    // Lưu danh sách tài khoản nếu chưa có
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_ADMINS));
    }

    // Đọc session người dùng đã lưu hoặc mặc định chọn Lê Trung Hậu làm Admin đăng nhập sẵn
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUser) {
      try {
        currentUser = JSON.parse(savedUser);
      } catch (e) {
        currentUser = DEFAULT_ADMINS[0];
      }
    } else {
      currentUser = DEFAULT_ADMINS[0]; // Mặc định Lê Trung Hậu đăng nhập
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    }

    renderUserHeaderWidget();
    initAuthModalEvents();
  }

  // Render widget tài khoản trên Top Header
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
      userWidget.innerHTML = `
        <button class="btn-primary btn-sm" onclick="AuthManager.openLoginModal()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Đăng nhập Admin</span>
        </button>
      `;
    }
  }

  // Khởi tạo sự kiện modal
  function initAuthModalEvents() {
    const btnSwitchHau = document.getElementById('btn-switch-user-hau');
    if (btnSwitchHau) {
      btnSwitchHau.addEventListener('click', () => {
        AuthManager.switchUser('letrunghau');
      });
    }

    const btnSwitchLan = document.getElementById('btn-switch-user-lan');
    if (btnSwitchLan) {
      btnSwitchLan.addEventListener('click', () => {
        AuthManager.switchUser('ngoclan');
      });
    }

    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username-input').value.trim().toLowerCase();
        AuthManager.login(username);
      });
    }
  }

  // API Đối tượng Quản lý Tài khoản công khai
  window.AuthManager = {
    getCurrentUser() {
      return currentUser;
    },

    isAdmin() {
      return currentUser && currentUser.roleCode.includes('admin');
    },

    openAccountMenu() {
      renderAccountModalInfo();
      window.ModalManager.open('account-modal');
    },

    openLoginModal() {
      window.ModalManager.open('login-modal');
    },

    switchUser(username) {
      const user = DEFAULT_ADMINS.find(u => u.username === username);
      if (user) {
        currentUser = user;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
        renderUserHeaderWidget();
        renderAccountModalInfo();
        window.ModalManager.close('account-modal');
        window.ModalManager.close('login-modal');
        window.showToast(`Đã chuyển phiên làm việc: ${user.fullName} (${user.role})`);
        
        // Notify other components if needed
        window.dispatchEvent(new CustomEvent('authChanged', { detail: { user: currentUser } }));
      }
    },

    login(username) {
      const user = DEFAULT_ADMINS.find(u => u.username.toLowerCase() === username.toLowerCase());
      if (user) {
        this.switchUser(user.username);
      } else {
        // Hỗ trợ đăng nhập nhanh nếu nhập đúng tên
        if (username.includes('hau') || username.includes('hậu')) {
          this.switchUser('letrunghau');
        } else if (username.includes('lan')) {
          this.switchUser('ngoclan');
        } else {
          window.showToast('Vui lòng chọn tài khoản "Lê Trung Hậu" hoặc "Ngọc Lan"', 'warning');
        }
      }
    },

    logout() {
      currentUser = null;
      localStorage.removeItem(AUTH_STORAGE_KEY);
      renderUserHeaderWidget();
      window.ModalManager.close('account-modal');
      window.showToast('Đã đăng xuất khỏi phiên làm việc Quản trị viên');
      window.dispatchEvent(new CustomEvent('authChanged', { detail: { user: null } }));
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
          <div><strong>Quyền hạn:</strong> Phê duyệt nguồn, sửa rubric, duyệt khuyến nghị, xuất báo cáo.</div>
        </div>
      `;
    }
  }

})();
