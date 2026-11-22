/**
 * GALLERY.JS – KHO TƯ LIỆU (Bảo tàng Chứng tích Chiến tranh)
 * Phụ trách: Quý (Vibecode)
 *
 * - Layout theo Figma (màn hình "Kho tư liệu"); thẻ ảnh và hộp chi tiết cùng kiểu
 *   với tab Dòng thời gian (timeline.css / timeline.js).
 * - Dữ liệu: historicalStages[].museumArtifacts trong data.js (13 hiện vật lấy nguyên văn từ mục
 *   "Chứng tích lịch sử tại Bảo tàng Chứng tích Chiến tranh" của các file noi-dung.md trong docs/).
 *   Ảnh nằm trong assets/images/artifacts/. Muốn đổi nội dung hay nguồn ảnh: sửa data.js, không sửa file này.
 *   Mỗi hiện vật: id, name, area, areaFull?, desc (tóm tắt trên thẻ), detail (toàn văn),
 *   images[{ src, w, h, caption?, alt?, source, credit }], refs[].
 * - Nguồn ảnh hiển thị ngắn gọn theo images[].source: "internet" → "Internet", "sinhvien" → "Ảnh nhóm sinh viên chụp".
 *   credit (tác giả, giấy phép) chỉ lưu trong data.js, không hiển thị.
 * - Không dùng thuộc tính data-art (timeline.js bắt sự kiện toàn trang theo thuộc tính đó).
 */

const GalleryModule = (() => {
  "use strict";

  const LEAD_MIN_WIDTH = 700; // ảnh nhỏ hơn mức này không làm thẻ tiêu biểu (2 cột sẽ bị mờ)

  // ---------- Tiện ích ----------

  const ICONS = {
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    imageOff: '<line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>'
  };

  function icon(name, size = 20) {
    return `<svg class="g-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = () => (reduceMotion() ? "auto" : "smooth");
  const stageOf = (n) => STAGES.find((s) => String(s.n) === String(n));
  const basename = (p) => String(p || "").split("/").pop();

  // "1954 - 1960" → "1954 – 1960"
  const years = (t) => String(t || "").replace(/\s*[-–—]\s*/, " – ");

  // ---------- Dữ liệu dẫn xuất ----------

  let STAGES = [];
  let items = [];

  function loadData() {
    STAGES = [];
    items = [];
    if (typeof historicalStages === "undefined") return;
    const tl = window.TL_DATA; // tab Dòng thời gian mới (nếu có) – dùng để nhảy đúng hiện vật
    historicalStages.forEach((st) => {
      const stage = { n: Number(st.id), years: years(st.period) };
      STAGES.push(stage);
      (st.museumArtifacts || []).forEach((a) => {
        const raw = a.images && a.images.length ? a.images : a.image ? [{ src: a.image }] : [];
        const images = raw.map((im) => ({ ...im, url: im.src, alt: im.alt || a.name, w: im.w || 0, h: im.h || 0 }));
        let tlRef = null;
        if (tl && Array.isArray(tl.stages)) {
          tl.stages.forEach((s, si) => (s.artifacts || []).forEach((t, ai) => {
            if (!tlRef && images.some((im) => {
              const a = basename(im.src);
              const b = basename(t.img);
              return a === b || (a.replace(/b\.jpg$/, ".jpg") === b.replace(/b\.jpg$/, ".jpg"));
            })) tlRef = `${si}-${ai}`;
          }));
        }
        items.push({
          id: a.id,
          stage: stage.n,
          years: stage.years,
          title: a.name,
          where: a.area || "",
          whereFull: a.areaFull || a.area || "",
          text: a.desc || "",
          detail: a.detail || a.desc || "",
          images,
          refs: a.refs || [],
          portrait: images.length > 0 && images[0].h > images[0].w,
          broken: false,
          tlRef
        });
      });
    });
  }

  const hasPhoto = (it) => it.images.length > 0 && !it.broken;
  const isLeadCandidate = (it) => hasPhoto(it) && it.images[0].w >= LEAD_MIN_WIDTH && it.images[0].h > 0 && it.images[0].w / it.images[0].h >= 1.25;

  // ---------- Trạng thái & DOM ----------

  let filter = "all";
  let visible = [];
  let current = -1;       // vị trí trong visible đang mở ở hộp chi tiết
  let imgIdx = 0;         // ảnh đang xem của hiện vật (có hiện vật có 2 ảnh)
  let openedAt = -1;
  let opener = null;
  let leavingToLesson = false;
  let returnState = null; // { scrollY, filter, id } để quay lại sau "Xem trên dòng thời gian"

  let root, gridEl, countEl, filtersEl, filterBtns = [], dlg, backBtn, liveEl;

  function buildSection() {
    root = document.getElementById("viewGallery");
    if (!root) return false;
    root.setAttribute("aria-labelledby", "galleryTitle");
    root.innerHTML = `
      <div class="g-wrap">
        <header class="g-head">
          <div>
            <p class="g-eyebrow">Bảo tàng số <span class="g-dash" aria-hidden="true"></span> Kho tư liệu</p>
            <h2 class="g-title" id="galleryTitle">Chứng tích kể chuyện</h2>
          </div>
          <p class="g-lede">Hiện vật và ảnh tư liệu về kháng chiến chống Mỹ, cứu nước (1954 – 1975), phần lớn tại Bảo tàng Chứng tích Chiến tranh, xếp theo năm giai đoạn. <span class="g-lede-hint">Chọn ảnh để xem mô tả đầy đủ và nguồn.</span></p>
        </header>

        <div class="g-bar">
          <div class="g-filters" role="group" aria-label="Lọc tư liệu theo giai đoạn">
            <button class="g-filter" type="button" data-filter="all" aria-pressed="true">Tất cả</button>
            ${STAGES.map((st) => `<button class="g-filter" type="button" data-filter="${st.n}" aria-pressed="false" aria-label="Giai đoạn ${st.n}: ${esc(st.years)}"><span class="g-filter-n" aria-hidden="true">0${st.n}</span>${esc(st.years)}</button>`).join("")}
          </div>
          <p class="g-count" id="galleryCount" aria-live="polite"></p>
        </div>

        <div class="g-grid" id="galleryGrid"></div>
      </div>`;
    gridEl = root.querySelector("#galleryGrid");
    countEl = root.querySelector("#galleryCount");
    filtersEl = root.querySelector(".g-filters");
    filterBtns = [...root.querySelectorAll(".g-filter")];
    return true;
  }

  function buildDialog() {
    dlg = document.createElement("dialog");
    dlg.id = "galleryLightbox";
    dlg.className = "g-lightbox";
    dlg.setAttribute("aria-labelledby", "glbTitle");
    dlg.innerHTML = `
      <button class="g-lb-close" type="button" aria-label="Đóng">${icon("x", 20)}</button>
      <div class="g-lb-media">
        <div class="g-lb-img"></div>
        <div class="g-lb-thumbs" role="group" aria-label="Chọn ảnh của hiện vật" hidden></div>
      </div>
      <div class="g-lb-body">
        <span class="g-lb-stage" id="glbStage"></span>
        <h3 id="glbTitle"></h3>
        <dl class="g-lb-meta">
          <dt>Vị trí / bộ sưu tập</dt>
          <dd id="glbWhere"></dd>
        </dl>
        <div class="g-lb-detail" id="glbDetail"></div>
        <div class="g-lb-source" id="glbSource"></div>
        <div class="g-lb-actions">
          <button class="g-lesson" type="button" id="glbLesson">Xem trên dòng thời gian</button>
        </div>
        <nav class="g-lb-nav" aria-label="Chuyển hiện vật">
          <button class="g-lb-step" type="button" data-step="-1" aria-label="Hiện vật trước">${icon("chevronLeft", 16)}<span>Trước</span></button>
          <span class="g-lb-pos" id="glbPos"></span>
          <button class="g-lb-step" type="button" data-step="1" aria-label="Hiện vật sau"><span>Sau</span>${icon("chevronRight", 16)}</button>
        </nav>
        <p class="g-sr" id="glbLive" aria-live="polite"></p>
      </div>`;
    document.body.appendChild(dlg);
    liveEl = dlg.querySelector("#glbLive");

    dlg.querySelector(".g-lb-close").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", onDialogClose);
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    });
    dlg.querySelectorAll(".g-lb-step").forEach((b) => b.addEventListener("click", () => step(Number(b.dataset.step))));
    dlg.querySelector("#glbLesson").addEventListener("click", () => {
      const it = visible[current];
      leavingToLesson = true;
      dlg.close();
      if (it) goToLesson(it);
    });
    dlg.querySelector(".g-lb-thumbs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-img]");
      if (!b) return;
      imgIdx = Number(b.dataset.img);
      fill(visible[current]);
    });
    // Ảnh lỗi trong hộp chi tiết → ô báo không tải được
    dlg.querySelector(".g-lb-img").addEventListener("error", (e) => {
      if (e.target instanceof HTMLImageElement) dlg.querySelector(".g-lb-img").innerHTML = placeholderHTML(true);
    }, true);
  }

  function buildBackButton() {
    backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "g-back";
    backBtn.hidden = true;
    backBtn.innerHTML = `${icon("arrowLeft", 18)}<span>Quay lại Kho tư liệu</span>`;
    document.body.appendChild(backBtn);
    backBtn.addEventListener("click", returnToGallery);
  }

  // ---------- Render ----------

  function placeholderHTML(broken = false) {
    return `<span class="g-ph"><span class="g-ph-icon">${icon(broken ? "imageOff" : "image", 28)}</span><span class="g-ph-note">${broken ? "Không tải được ảnh" : "Ảnh sẽ được cập nhật sau"}</span></span>`;
  }

  function cardHTML(it, idx, leadIdx) {
    const classes = ["g-art"];
    if (idx === leadIdx) classes.push("g-art--lead");
    if (it.portrait) classes.push("is-portrait");
    if (!hasPhoto(it)) classes.push("is-pending");
    const im = it.images[0];
    const photo = hasPhoto(it)
      ? `<button class="g-photo" type="button" tabindex="-1" data-gallery-art="${esc(it.id)}" aria-label="Phóng to: ${esc(it.title)}"><span><img src="${esc(im.url)}" alt="${esc(im.alt)}" loading="lazy" decoding="async"></span></button>`
      : `<div class="g-photo" aria-hidden="true"><span>${placeholderHTML(it.broken)}</span></div>`;
    return `
      <figure class="${classes.join(" ")}" data-id="${esc(it.id)}">
        ${photo}
        <figcaption>
          <span class="g-kicker">Giai đoạn ${it.stage} · ${esc(it.years)}</span>
          <strong class="g-name">${esc(it.title)}</strong>
          <span class="g-where">${esc(it.where)}</span>
          <span class="g-text">${esc(it.text)}</span>
          <span class="g-links">
            <button class="g-more" type="button" data-gallery-art="${esc(it.id)}">Xem chi tiết &amp; nguồn →</button>
            <button class="g-lesson" type="button" data-gallery-lesson="${esc(it.id)}">Xem trên dòng thời gian</button>
          </span>
        </figcaption>
      </figure>`;
  }

  function render() {
    visible = filter === "all" ? items : items.filter((it) => String(it.stage) === filter);

    filterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
    const st = stageOf(filter);
    countEl.textContent = st
      ? `${visible.length} mục · Giai đoạn ${st.n} (${st.years})`
      : `${visible.length} mục tư liệu`;

    // Thẻ tiêu biểu: mục đầu tiên có ảnh ngang đủ nét
    const leadIdx = visible.findIndex(isLeadCandidate);
    gridEl.innerHTML = visible.map((it, i) => cardHTML(it, i, leadIdx)).join("");
    revealActiveFilter();
  }

  // Trên điện thoại thanh lọc cuộn ngang: luôn đưa nút đang chọn vào khung nhìn.
  function revealActiveFilter() {
    const active = filtersEl.querySelector('.g-filter[aria-pressed="true"]');
    if (!active || filtersEl.scrollWidth <= filtersEl.clientWidth) return;
    const left = active.offsetLeft - filtersEl.offsetLeft;
    const target = left - (filtersEl.clientWidth - active.offsetWidth) / 2;
    filtersEl.scrollTo({ left: Math.max(0, target), behavior: "auto" });
  }

  // ---------- Khối "Nguồn" trong hộp chi tiết ----------

  const SOURCE_LABEL = { internet: "Internet", sinhvien: "Ảnh nhóm sinh viên chụp" };

  function sourceHTML(it) {
    const label = SOURCE_LABEL[it.images[imgIdx] && it.images[imgIdx].source];
    const photo = label ? `<li>Nguồn ảnh: ${esc(label)}</li>` : "";
    const refs = it.refs.map((r) => {
      const t = typeof r === "string" ? r : r.t;
      return `<li>${typeof r === "string" ? esc(t) : `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(t)}</a>`}</li>`;
    }).join("");
    return `<span class="g-lb-source-label">Nguồn</span><ul class="g-lb-source-list">${photo}${refs}</ul>`;
  }

  function fill(it) {
    const im = it.images[imgIdx] || it.images[0];
    dlg.querySelector(".g-lb-img").innerHTML = hasPhoto(it) ? `<img src="${esc(im.url)}" alt="${esc(im.alt)}">` : placeholderHTML(it.broken);
    const thumbs = dlg.querySelector(".g-lb-thumbs");
    thumbs.hidden = it.images.length < 2;
    thumbs.innerHTML = it.images.length < 2 ? "" : it.images.map((x, i) =>
      `<button class="g-lb-thumb" type="button" data-img="${i}" aria-pressed="${i === imgIdx}">Ảnh ${i + 1}: ${esc(x.caption || "")}</button>`).join("");
    dlg.querySelector("#glbStage").textContent = `Giai đoạn ${it.stage} · ${it.years}`;
    dlg.querySelector("#glbTitle").textContent = it.title;
    dlg.querySelector("#glbWhere").textContent = it.whereFull;
    dlg.querySelector("#glbDetail").innerHTML = String(it.detail)
      .split(/\n\s*\n/)
      .filter(Boolean)
      .map((p) => `<p>${esc(p.trim())}</p>`)
      .join("");
    dlg.querySelector("#glbSource").innerHTML = sourceHTML(it);
    dlg.querySelector(".g-lb-nav").hidden = visible.length < 2;
    dlg.querySelector("#glbPos").textContent = `${current + 1} / ${visible.length}`;
    dlg.querySelector(".g-lb-body").scrollTop = 0;
    dlg.scrollTop = 0;
  }

  function openAt(index, from) {
    if (index < 0 || index >= visible.length) return;
    current = openedAt = index;
    imgIdx = 0;
    opener = from || document.activeElement;
    leavingToLesson = false;
    fill(visible[current]);
    if (!dlg.open) {
      document.documentElement.classList.add("g-lock");
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
    }
    dlg.querySelector(".g-lb-close").focus();
  }

  function step(dir) {
    if (visible.length < 2) return;
    current = (current + dir + visible.length) % visible.length;
    imgIdx = 0;
    fill(visible[current]);
    liveEl.textContent = `${current + 1} / ${visible.length}: ${visible[current].title}`;
  }

  function onDialogClose() {
    document.documentElement.classList.remove("g-lock");
    liveEl.textContent = "";
    if (leavingToLesson) return; // đang chuyển tab – focus do goToLesson xử lý
    let target = opener;
    if (current !== openedAt) {
      // Đã chuyển sang hiện vật khác: trả focus về nút của thẻ đó
      const it = visible[current];
      target = it && gridEl.querySelector(`.g-more[data-gallery-art="${CSS.escape(it.id)}"]`);
    }
    if (target && document.contains(target)) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
  }

  // ---------- "Xem trên dòng thời gian" và quay lại ----------

  function goToLesson(it) {
    returnState = { scrollY: window.scrollY, filter, id: it.id };
    const nav = document.querySelector('.nav-link[data-view="viewTimeline"]');
    if (nav) nav.click();
    window.setTimeout(() => {
      // Tab Dòng thời gian mới: tới đúng hiện vật nếu có, không thì tới đầu chương id="gd-N"
      const art = it.tlRef && document.querySelector(`#viewTimeline [data-art="${it.tlRef}"]`);
      const artFig = art && art.closest("figure");
      const chapter = document.getElementById(`gd-${it.stage}`);
      if (artFig || chapter) {
        const el = artFig || chapter;
        el.scrollIntoView({ behavior: scrollBehavior(), block: artFig ? "center" : "start" });
        if (artFig) {
          artFig.classList.add("g-target");
          window.setTimeout(() => artFig.classList.remove("g-target"), 2400);
        }
        const heading = (artFig && artFig.querySelector("button")) || chapter.querySelector("h2, h3") || chapter;
        if (!heading.hasAttribute("tabindex") && !/^(BUTTON|A)$/.test(heading.tagName)) heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      } else {
        // Tab cũ: chọn nút giai đoạn trên thanh dòng thời gian
        const node = document.querySelector(`.timeline-node[data-index="${it.stage - 1}"]`);
        if (node) { node.click(); node.focus({ preventScroll: true }); }
      }
      backBtn.hidden = false;
    }, 80);
  }

  function returnToGallery() {
    const state = returnState;
    backBtn.hidden = true;
    const nav = document.querySelector('.nav-link[data-view="viewGallery"]');
    if (nav) nav.click();
    if (!state) return;
    if (state.filter !== filter) { filter = state.filter; render(); }
    window.setTimeout(() => {
      window.scrollTo({ top: state.scrollY, behavior: "auto" });
      const btn = gridEl.querySelector(`.g-more[data-gallery-art="${CSS.escape(state.id)}"]`);
      if (btn) { btn.focus({ preventScroll: true }); btn.scrollIntoView({ block: "nearest" }); }
    }, 120);
    returnState = null;
  }

  // ---------- Khởi động ----------

  function init() {
    loadData();
    if (!items.length || !buildSection()) return;
    buildDialog();
    buildBackButton();

    filtersEl.addEventListener("click", (e) => {
      const b = e.target.closest(".g-filter");
      if (!b || b.dataset.filter === filter) return;
      filter = b.dataset.filter;
      render();
      // Nếu đầu lưới đã cuộn khuất (thanh lọc đang dính), đưa người dùng về đầu kết quả
      const bar = root.querySelector(".g-bar");
      const barBottom = bar.getBoundingClientRect().bottom;
      const gridTop = gridEl.getBoundingClientRect().top;
      if (gridTop < barBottom) {
        window.scrollTo({ top: window.scrollY + gridTop - barBottom - 16, behavior: scrollBehavior() });
      }
    });

    gridEl.addEventListener("click", (e) => {
      const art = e.target.closest("[data-gallery-art]");
      if (art) {
        const idx = visible.findIndex((it) => it.id === art.dataset.galleryArt);
        openAt(idx, art);
        return;
      }
      const lesson = e.target.closest("[data-gallery-lesson]");
      if (lesson) {
        const it = items.find((x) => x.id === lesson.dataset.galleryLesson);
        if (it) goToLesson(it);
      }
    });

    // Ảnh thẻ lỗi → ô "Không tải được ảnh" (sự kiện error không nổi bọt nên bắt ở pha capture)
    gridEl.addEventListener("error", (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement)) return;
      const fig = img.closest(".g-art");
      const it = fig && items.find((x) => x.id === fig.dataset.id);
      if (!it) return;
      it.broken = true;
      const holder = document.createElement("div");
      holder.className = "g-photo";
      holder.setAttribute("aria-hidden", "true");
      holder.innerHTML = `<span>${placeholderHTML(true)}</span>`;
      img.closest(".g-photo").replaceWith(holder);
      fig.classList.add("is-pending");
      fig.classList.remove("g-art--lead");
    }, true);

    // Menu điều hướng: vào Kho tư liệu thì đưa đầu trang gallery vào khung nhìn
    // (main.js cuộn cố định tới 380px, trên điện thoại dừng giữa banner);
    // rời sang tab khác thì ẩn nút "Quay lại Kho tư liệu".
    document.addEventListener("click", (e) => {
      const link = e.target.closest(".nav-link[data-view]");
      if (!link) return;
      if (link.dataset.view === "viewGallery") {
        window.setTimeout(() => {
          if (!returnState) root.scrollIntoView({ behavior: "auto", block: "start" });
          revealActiveFilter();
        }, 30);
      }
      if (link.dataset.view !== "viewTimeline" && e.isTrusted) { backBtn.hidden = true; returnState = null; }
    });

    // Chiều cao thanh menu (để thanh lọc dính ngay dưới nó)
    const header = document.querySelector(".site-header");
    const setTop = () => root.style.setProperty("--g-sticky-top", `${header ? header.offsetHeight : 0}px`);
    setTop();
    window.addEventListener("resize", setTop);

    render();
  }

  return { init };
})();
