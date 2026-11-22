/**
 * MAIN.JS - ĐIỀU PHỐI ỨNG DỤNG HỌC LIỆU LỊCH SỬ ĐẢNG
 * Khởi chạy các module, quản lý điều hướng thanh menu và render trang nhóm
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderTeamSection();

  // Khởi động các module nghiệp vụ (tab Dòng thời gian tự khởi chạy trong timeline.js)
  if (typeof GalleryModule !== "undefined") GalleryModule.init();
  if (typeof SummaryModule !== "undefined") SummaryModule.init();
  if (typeof QuizModule !== "undefined") QuizModule.init();
});

// Quản lý các tab điều hướng chính (Top Navbar)
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionViews = document.querySelectorAll(".section-view");
  const header = document.querySelector(".site-header");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  document.querySelectorAll("a[data-view]").forEach(link => {
    link.addEventListener("click", (e) => {
      const targetView = document.getElementById(link.dataset.view);
      if (!targetView) return;
      e.preventDefault();

      // Cập nhật class active cho menu
      navLinks.forEach(navLink => navLink.classList.toggle("active", navLink.dataset.view === targetView.id));

      // Hiển thị view tương ứng
      sectionViews.forEach(view => {
        view.classList.toggle("active-view", view === targetView);
      });

      // Đóng mobile menu nếu đang mở
      if (mainNav && mainNav.classList.contains("menu-open")) {
        mainNav.classList.remove("menu-open");
      }

      // Cuộn nhẹ lên đầu khu vực nội dung (tab Dòng thời gian ẩn banner nên cuộn về đầu trang)
      if (targetView.id === "viewTimeline") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const headerHeight = header?.offsetHeight ?? 0;
        const viewTop = targetView.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: viewTop - headerHeight - 16, behavior: "smooth" });
      }
    });
  });

  // Các liên kết khác mở tab (nút ở banner, chân trang, phần kết dòng thời gian): data-open-view="viewX"
  document.querySelectorAll("[data-open-view]").forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(`.nav-link[data-view="${a.dataset.openView}"]`);
      if (!target) return;
      e.preventDefault();
      target.click();
    });
  });

  // Toggle mobile menu
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener("click", () => {
      mainNav.classList.toggle("menu-open");
    });
  }

  // Mở đúng tab khi vào bằng đường dẫn có hash (vd: index.html#quiz), kể cả khi chỉ đổi hash
  const openFromHash = () => {
    const target = Array.from(navLinks).find(l => l.getAttribute("href") === location.hash);
    if (target) target.click();
  };
  if (location.hash) openFromHash();
  window.addEventListener("hashchange", openFromHash);
}

// Render dữ liệu phần Giới thiệu Nhóm & Cảm nghĩ
function renderTeamSection() {
  const teamGridEl = document.getElementById("teamGrid");
  if (teamGridEl && typeof teamMembers !== "undefined") {
    teamGridEl.innerHTML = teamMembers.map(member => `
      <article class="team-card">
        <div class="team-avatar" aria-hidden="true">
          <span>${member.name.charAt(0)}</span>
        </div>
        <h3 class="team-name">${member.name}</h3>
        <p class="team-student-id">MSSV: ${member.studentId}</p>
        <p class="team-role">${member.role}</p>
        <p class="team-task">${member.task}</p>
      </article>
    `).join("");

    teamGridEl.querySelectorAll(".team-avatar").forEach((avatar, index) => {
      const { photo } = teamMembers[index];
      if (!photo) return;

      const image = new Image();
      image.alt = "";
      image.decoding = "async";
      image.addEventListener("load", () => avatar.replaceChildren(image), { once: true });
      image.src = `assets/images/team/${photo}`;
    });
  }
}
