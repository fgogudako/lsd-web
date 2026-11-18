/**
 * GALLERY.JS - KHO TƯ LIỆU BẢO TÀNG CHỨNG TÍCH CHIẾN TRANH
 * Phụ trách bởi Quý (Vibecode)
 */

const GalleryModule = (() => {
  let allArtifacts = [];
  let currentFilter = "all";

  let galleryGridEl;
  let filterBtns;
  let modalBackdrop, modalImg, modalTitle, modalLoc, modalStage, modalDesc, modalCloseBtn;

  function init() {
    galleryGridEl = document.getElementById("galleryGrid");
    filterBtns = document.querySelectorAll(".filter-btn");

    modalBackdrop = document.getElementById("artifactModal");
    modalImg = document.getElementById("modalArtifactImg");
    modalTitle = document.getElementById("modalArtifactTitle");
    modalLoc = document.getElementById("modalArtifactLoc");
    modalStage = document.getElementById("modalArtifactStage");
    modalDesc = document.getElementById("modalArtifactDesc");
    modalCloseBtn = document.getElementById("modalCloseBtn");

    // Thu thập tất cả hiện vật từ các giai đoạn
    collectArtifacts();

    // Gắn sự kiện các nút lọc
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderArtifacts();
      });
    });

    // Sự kiện đóng modal
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeModal);
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    // Đóng bằng phím ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("active")) {
        closeModal();
      }
    });

    renderArtifacts();
  }

  // Thu thập danh sách hiện vật kèm thông tin giai đoạn
  function collectArtifacts() {
    allArtifacts = [];
    historicalStages.forEach(stage => {
      stage.museumArtifacts.forEach(art => {
        allArtifacts.push({
          ...art,
          stagePeriod: stage.period,
          stageId: stage.id.toString()
        });
      });
    });
  }

  // Render danh sách hiện vật theo bộ lọc
  function renderArtifacts() {
    if (!galleryGridEl) return;

    const filtered = currentFilter === "all"
      ? allArtifacts
      : allArtifacts.filter(item => item.stageId === currentFilter);

    if (filtered.length === 0) {
      galleryGridEl.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #777;">
          <p>Chưa có hình ảnh tư liệu cho bộ lọc này.</p>
        </div>
      `;
      return;
    }

    galleryGridEl.innerHTML = filtered.map(art => `
      <div class="artifact-card" data-id="${art.id}">
        <div class="artifact-thumb-wrapper">
          <img src="${art.image}" alt="${art.name}" class="artifact-thumb" onerror="this.src='assets/images/placeholders/baotang_overview.svg'">
          <span class="artifact-stage-tag">${art.stagePeriod}</span>
          <div class="artifact-zoom-icon">🔍</div>
        </div>
        <div class="artifact-info">
          <h4 class="artifact-title">${art.name}</h4>
          <span class="artifact-location">📍 ${art.area}</span>
          <p class="artifact-description">${art.desc}</p>
        </div>
      </div>
    `).join("");

    // Gắn sự kiện click mở modal cho từng thẻ
    galleryGridEl.querySelectorAll(".artifact-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const artifact = allArtifacts.find(a => a.id === id);
        if (artifact) openModal(artifact);
      });
    });
  }

  // Mở modal chi tiết
  function openModal(artifact) {
    if (!modalBackdrop) return;
    if (modalImg) modalImg.src = artifact.image;
    if (modalTitle) modalTitle.textContent = artifact.name;
    if (modalLoc) modalLoc.textContent = `📍 Vị trí: ${artifact.area}`;
    if (modalStage) modalStage.textContent = `Giai đoạn: ${artifact.stagePeriod}`;
    if (modalDesc) modalDesc.textContent = artifact.desc;

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden"; // Chặn scroll nền
  }

  // Đóng modal
  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  return { init };
})();
