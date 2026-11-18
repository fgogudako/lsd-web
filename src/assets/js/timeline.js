/**
 * TIMELINE.JS - QUẢN LÝ SLIDE THUYẾT TRÌNH & DÒNG THỜI GIAN TƯƠNG TÁC Ở ĐÁY
 * Phụ trách bởi Giang (Vibecode)
 */

const TimelineModule = (() => {
  let currentStageIndex = 0; // 0 to 4 (giai đoạn 1-5), 5 là tổng kết/đội ngũ
  const totalStages = historicalStages.length; // 5

  // Các phần tử DOM
  let stageBadgeEl, assigneeEl, titleEl, periodEl;
  let tabBtns, tabPanes;
  let prevBtn, nextBtn;
  let timelineNodes, progressFillEl;

  // Khởi tạo module
  function init() {
    stageBadgeEl = document.getElementById("slideStageBadge");
    assigneeEl = document.getElementById("slideAssignee");
    titleEl = document.getElementById("slideTitle");
    periodEl = document.getElementById("slidePeriodMeta");
    tabBtns = document.querySelectorAll(".stage-tab-btn");
    tabPanes = document.querySelectorAll(".stage-tab-pane");
    prevBtn = document.getElementById("slidePrevBtn");
    nextBtn = document.getElementById("slideNextBtn");
    timelineNodes = document.querySelectorAll(".timeline-node");
    progressFillEl = document.getElementById("timelineProgressFill");

    // Gắn sự kiện tab trong slide
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabTarget = btn.getAttribute("data-tab");
        switchStageTab(tabTarget);
      });
    });

    // Nút Trước / Tiếp
    if (prevBtn) {
      prevBtn.addEventListener("click", () => navigateStage(currentStageIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => navigateStage(currentStageIndex + 1));
    }

    // Nút trên đường Timeline ở đáy
    timelineNodes.forEach(node => {
      node.addEventListener("click", () => {
        const targetIdx = parseInt(node.getAttribute("data-index"), 10);
        navigateStage(targetIdx);
      });
    });

    // Hỗ trợ phím mũi tên trái / phải
    document.addEventListener("keydown", (e) => {
      // Chỉ hoạt động khi đang ở view timeline
      const timelineView = document.getElementById("viewTimeline");
      if (timelineView && timelineView.classList.contains("active-view")) {
        if (e.key === "ArrowLeft") {
          navigateStage(currentStageIndex - 1);
        } else if (e.key === "ArrowRight") {
          navigateStage(currentStageIndex + 1);
        }
      }
    });

    // Render giai đoạn đầu tiên (Giai đoạn 1)
    renderCurrentStage();
  }

  // Chuyển tab con trong slide (Bối cảnh, Đường lối, Thực tiễn, Hiện vật, Ghi nhớ)
  function switchStageTab(tabId) {
    tabBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === tabId));
    tabPanes.forEach(p => p.classList.toggle("active-pane", p.id === `tab-${tabId}`));
  }

  // Điều hướng tới giai đoạn cụ thể
  function navigateStage(newIndex) {
    if (newIndex < 0 || newIndex >= totalStages) return;
    currentStageIndex = newIndex;
    renderCurrentStage();
  }

  // Render toàn bộ dữ liệu của Giai đoạn hiện tại vào giao diện
  function renderCurrentStage() {
    const stage = historicalStages[currentStageIndex];
    if (!stage) return;

    // 1. Cập nhật header slide
    if (stageBadgeEl) stageBadgeEl.textContent = `Giai đoạn ${stage.id}: ${stage.period}`;
    if (assigneeEl) assigneeEl.textContent = `Phụ trách nội dung: ${stage.assignee}`;
    if (titleEl) titleEl.textContent = stage.title;
    if (periodEl) periodEl.textContent = `★ Chủ đề: ${stage.shortTitle}`;

    // 2. Điền dữ liệu Tab 1: Bối cảnh
    const contextList = document.getElementById("stageContextList");
    if (contextList) {
      contextList.innerHTML = stage.context.map(item => `<li>${item}</li>`).join("");
    }

    // 3. Điền dữ liệu Tab 2: Đường lối của Đảng
    const guidelinesList = document.getElementById("stageGuidelinesList");
    if (guidelinesList) {
      guidelinesList.innerHTML = stage.partyGuidelines.map(item => `<li>${item}</li>`).join("");
    }

    // 4. Điền dữ liệu Tab 3: Giá trị thực tiễn
    const practicalList = document.getElementById("stagePracticalList");
    if (practicalList) {
      practicalList.innerHTML = stage.practicalValues.map(item => `<li>${item}</li>`).join("");
    }

    // 5. Điền dữ liệu Tab 4: Hiện vật chứng tích từ Bảo tàng
    const artifactsContainer = document.getElementById("stageArtifactsContainer");
    if (artifactsContainer) {
      artifactsContainer.innerHTML = stage.museumArtifacts.map(art => `
        <div class="artifact-preview-card">
          <img src="${art.image}" alt="${art.name}" class="artifact-preview-img" onerror="this.src='assets/images/placeholders/baotang_overview.svg'">
          <h4 class="artifact-preview-title">${art.name}</h4>
          <span class="artifact-preview-loc"><i class="loc-pin">📍</i> ${art.area}</span>
          <p class="artifact-preview-desc">${art.desc}</p>
        </div>
      `).join("");
    }

    // 6. Điền dữ liệu Tab 5: Kiến thức trọng tâm
    const keynotesList = document.getElementById("stageKeynotesList");
    if (keynotesList) {
      keynotesList.innerHTML = stage.keyNotes.map(item => `<li>${item}</li>`).join("");
    }

    // Reset về tab đầu tiên (Bối cảnh) khi chuyển giai đoạn mới
    switchStageTab("context");

    // 7. Cập nhật trạng thái các nút Trước / Sau
    if (prevBtn) prevBtn.disabled = currentStageIndex === 0;
    if (nextBtn) nextBtn.disabled = currentStageIndex === totalStages - 1;

    // 8. Cập nhật thanh timeline ở đáy
    updateBottomTimeline();
  }

  // Cập nhật giao diện thanh timeline đáy
  function updateBottomTimeline() {
    timelineNodes.forEach((node, idx) => {
      node.classList.remove("active", "completed");
      if (idx === currentStageIndex) {
        node.classList.add("active");
      } else if (idx < currentStageIndex) {
        node.classList.add("completed");
      }
    });

    // Tính % thanh tiến độ
    if (progressFillEl) {
      const percentage = (currentStageIndex / (totalStages - 1)) * 100;
      progressFillEl.style.width = `${percentage}%`;
    }

    // Cập nhật text số giai đoạn
    const counterEl = document.getElementById("timelineStageCounter");
    if (counterEl) {
      counterEl.textContent = `Giai đoạn ${currentStageIndex + 1} / ${totalStages}`;
    }
  }

  return {
    init,
    navigateStage,
    getCurrentIndex: () => currentStageIndex
  };
})();
