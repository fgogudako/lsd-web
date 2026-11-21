/**
 * MAIN.JS - ĐIỀU PHỐI ỨNG DỤNG HỌC LIỆU LỊCH SỬ ĐẢNG
 * Khởi chạy các module, quản lý điều hướng thanh menu và render trang tổng kết / nhóm
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderSummarySection();
  renderTeamSection();

  // Khởi động các module nghiệp vụ
  if (typeof TimelineModule !== "undefined") TimelineModule.init();
  if (typeof GalleryModule !== "undefined") GalleryModule.init();
  if (typeof QuizModule !== "undefined") QuizModule.init();
});

// Quản lý các tab điều hướng chính (Top Navbar)
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionViews = document.querySelectorAll(".section-view");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  document.querySelectorAll("a[data-view]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetViewId = link.getAttribute("data-view");

      // Cập nhật class active cho menu
      navLinks.forEach(navLink => navLink.classList.toggle("active", navLink.dataset.view === targetViewId));

      // Hiển thị view tương ứng
      sectionViews.forEach(view => {
        view.classList.toggle("active-view", view.id === targetViewId);
      });

      // Đóng mobile menu nếu đang mở
      if (mainNav && mainNav.classList.contains("menu-open")) {
        mainNav.classList.remove("menu-open");
      }

      // Cuộn nhẹ lên đầu khu vực nội dung
      window.scrollTo({ top: 380, behavior: "smooth" });
    });
  });

  // Toggle mobile menu
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener("click", () => {
      mainNav.classList.toggle("menu-open");
    });
  }
}

// Render dữ liệu phần Tổng kết & Bài học lịch sử (Quang phụ trách)
function renderSummarySection() {
  const summaryGridEl = document.getElementById("summaryGrid");
  const museumRefEl = document.getElementById("museumReflectionText");

  if (summaryGridEl && typeof summaryContent !== "undefined") {
    summaryGridEl.innerHTML = summaryContent.keyTakeaways.map(item => `
      <div class="summary-card">
        <h3><span>★</span> ${item.heading}</h3>
        <p>${item.body}</p>
      </div>
    `).join("");
  }

  if (museumRefEl && typeof summaryContent !== "undefined") {
    museumRefEl.innerHTML = `
      <h3>🏛️ ${summaryContent.museumReflection.title}</h3>
      <p>${summaryContent.museumReflection.body}</p>
    `;
  }
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
