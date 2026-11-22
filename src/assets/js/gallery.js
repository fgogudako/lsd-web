/**
 * GALLERY.JS – KHO TƯ LIỆU (Bảo tàng Chứng tích Chiến tranh)
 * Phụ trách: Quý (Vibecode)
 *
 * - Layout theo Figma (màn hình "Kho tư liệu"); thẻ ảnh và hộp chi tiết cùng kiểu
 *   với tab Dòng thời gian (timeline.css / timeline.js): ảnh "rửa" có viền giấy, mép giấy bị xé,
 *   nghiêng nhẹ, nghiêng 3D và loá sáng theo con trỏ.
 * - Dữ liệu: historicalStages[].museumArtifacts trong data.js (13 hiện vật lấy nguyên văn từ mục
 *   "Chứng tích lịch sử tại Bảo tàng Chứng tích Chiến tranh" của các file noi-dung.md trong docs/).
 *   Ảnh nằm trong assets/images/artifacts/. Muốn đổi nội dung hay nguồn ảnh: sửa data.js, không sửa file này.
 *   Mỗi hiện vật: id, name, area, areaFull?, desc (tóm tắt trên thẻ), detail (toàn văn),
 *   featured? (thẻ nổi bật chiếm trọn hàng), images[{ src, w, h, caption?, alt?, source, credit }].
 * - Nguồn ảnh hiển thị ngắn gọn theo images[].source: "internet" → "Internet", "sinhvien" → "Ảnh nhóm sinh viên chụp".
 *   credit (tác giả, giấy phép) chỉ lưu trong data.js, không hiển thị.
 * - Không dùng thuộc tính data-art (timeline.js bắt sự kiện toàn trang theo thuộc tính đó).
 */

const GalleryModule = (() => {
  "use strict";

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
  const basename = (p) => String(p || "").split("/").pop();

  // "1954 - 1960" → "1954 – 1960"
  const years = (t) => String(t || "").replace(/\s*[-–—]\s*/, " – ");

  // ---------- Giấy xé viền (cùng thuật toán với timeline.js, chép lại vì hàm đó nằm trong IIFE) ----------
  // Tạo clip-path polygon răng cưa ngẫu nhiên, có hạt giống nên ổn định giữa các lần tải.

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function tornPolygon(edges, amp, seed) {
    const R = mulberry32(seed);
    const d = () => (R() < 0.14 ? amp * (0.65 + R() * 0.35) : R() * amp * 0.5).toFixed(1);
    const pts = [];
    if (edges.includes("t")) {
      for (let x = 0; x < 100; x += 0.7 + R() * 2.2) pts.push(`${x.toFixed(2)}% ${d()}px`);
      pts.push(`100% ${d()}px`);
    } else pts.push("0% 0%", "100% 0%");
    if (edges.includes("b")) {
      for (let x = 100; x > 0; x -= 0.7 + R() * 2.2) pts.push(`${x.toFixed(2)}% calc(100% - ${d()}px)`);
      pts.push(`0% calc(100% - ${d()}px)`);
    } else pts.push("100% 100%", "0% 100%");
    return `polygon(${pts.join(",")})`;
  }

  // ---------- Dữ liệu dẫn xuất ----------

  let items = [];

  function loadData() {
    items = [];
    if (typeof historicalStages === "undefined") return;
    const tl = window.TL_DATA; // tab Dòng thời gian (nếu có) – dùng để nhảy đúng hiện vật
    historicalStages.forEach((st) => {
      const stageNo = Number(st.id);
      const stageYears = years(st.period);
      (st.museumArtifacts || []).forEach((a) => {
        const raw = a.images && a.images.length ? a.images : a.image ? [{ src: a.image }] : [];
        const images = raw.map((im) => ({ ...im, url: im.src, alt: im.alt || a.name, w: im.w || 0, h: im.h || 0 }));
        let tlRef = null;
        if (tl && Array.isArray(tl.stages)) {
          tl.stages.forEach((s, si) => (s.artifacts || []).forEach((t, ai) => {
            if (!tlRef && images.some((im) => {
              const x = basename(im.src);
              const y = basename(t.img);
              return x === y || (x.replace(/b\.jpg$/, ".jpg") === y.replace(/b\.jpg$/, ".jpg"));
            })) tlRef = `${si}-${ai}`;
          }));
        }
        items.push({
          id: a.id,
          stage: stageNo,
          years: stageYears,
          title: a.name,
          where: a.area || "",
          whereFull: a.areaFull || a.area || "",
          text: a.desc || "",
          detail: a.detail || a.desc || "",
          images,
          featured: Boolean(a.featured),
          portrait: images.length > 0 && images[0].h > images[0].w,
          broken: false,
          tlRef
        });
      });
    });
  }

  const hasPhoto = (it) => it.images.length > 0 && !it.broken;

  // ---------- Trạng thái & DOM ----------

  let current = -1;       // vị trí trong items đang mở ở hộp chi tiết
  let imgIdx = 0;         // ảnh đang xem của hiện vật (có hiện vật có 2 ảnh)
  let openedAt = -1;
  let opener = null;
  let leavingToLesson = false;
  let returnState = null; // { scrollY, id } để quay lại sau "Xem trên dòng thời gian"

  let root, gridEl, dlg, backBtn, liveEl;

  function buildSection() {
    root = document.getElementById("viewGallery");
    if (!root) return false;
    root.setAttribute("aria-labelledby", "galleryTitle");
    root.innerHTML = `
      <div class="g-wrap">
        <header class="g-head">
          <div>
            <p class="eyebrow">Bảo tàng số <i aria-hidden="true"></i> Kho tư liệu</p>
            <h2 class="g-title" id="galleryTitle">Chứng tích kể chuyện</h2>
          </div>
        </header>

        <div class="g-grid" id="galleryGrid"></div>
      </div>`;
    gridEl = root.querySelector("#galleryGrid");
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
        <p class="g-lb-source" id="glbSource"></p>
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
      const it = items[current];
      leavingToLesson = true;
      dlg.close();
      if (it) goToLesson(it);
    });
    dlg.querySelector(".g-lb-thumbs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-img]");
      if (!b) return;
      imgIdx = Number(b.dataset.img);
      fill(items[current]);
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

  function cardHTML(it, idx) {
    const classes = ["g-art"];
    if (it.featured && hasPhoto(it)) classes.push("g-art--lead");
    if (it.portrait) classes.push("is-portrait");
    if (!hasPhoto(it)) classes.push("is-pending");
    const im = it.images[0];
    const photo = hasPhoto(it)
      ? `<button class="g-photo" type="button" tabindex="-1" data-gallery-art="${esc(it.id)}" aria-label="Phóng to: ${esc(it.title)}"><span data-torn="${idx % 2 ? "b" : "t"}"><img src="${esc(im.url)}" alt="${esc(im.alt)}" loading="lazy" decoding="async"><span class="g-glare" aria-hidden="true"></span></span></button>`
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
            <button class="g-more" type="button" data-gallery-art="${esc(it.id)}">Xem chi tiết →</button>
            <button class="g-lesson" type="button" data-gallery-lesson="${esc(it.id)}">Xem trên dòng thời gian</button>
          </span>
        </figcaption>
      </figure>`;
  }

  function render() {
    gridEl.innerHTML = items.map(cardHTML).join("");
    decorate();
  }

  // Mép giấy xé + nghiêng 3D và loá sáng theo con trỏ (giống ảnh ở tab Dòng thời gian)
  function decorate() {
    gridEl.querySelectorAll("[data-torn]").forEach((el, i) => {
      el.style.clipPath = tornPolygon(el.dataset.torn, 10, 1000 + i * 7919);
    });
    gridEl.querySelectorAll("button.g-photo").forEach((f) => {
      f.addEventListener("pointermove", (e) => {
        if (reduceMotion() || e.pointerType === "touch") return;
        const r = f.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        f.style.setProperty("--ry", (px - 0.5) * 14 + "deg");
        f.style.setProperty("--rx", (0.5 - py) * 10 + "deg");
        f.style.setProperty("--gx", px * 100 + "%");
        f.style.setProperty("--gy", py * 100 + "%");
      });
      f.addEventListener("pointerleave", () => {
        f.style.setProperty("--rx", "0deg");
        f.style.setProperty("--ry", "0deg");
      });
    });
  }

  // ---------- Nguồn ảnh trong hộp chi tiết ----------

  const SOURCE_LABEL = { internet: "Internet", sinhvien: "Ảnh nhóm sinh viên chụp" };

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
    const src = dlg.querySelector("#glbSource");
    const label = SOURCE_LABEL[im && im.source];
    src.hidden = !label;
    src.textContent = label ? `Nguồn ảnh: ${label}` : "";
    dlg.querySelector(".g-lb-nav").hidden = items.length < 2;
    dlg.querySelector("#glbPos").textContent = `${current + 1} / ${items.length}`;
    dlg.querySelector(".g-lb-body").scrollTop = 0;
    dlg.scrollTop = 0;
  }

  function openAt(index, from) {
    if (index < 0 || index >= items.length) return;
    current = openedAt = index;
    imgIdx = 0;
    opener = from || document.activeElement;
    leavingToLesson = false;
    fill(items[current]);
    if (!dlg.open) {
      document.documentElement.classList.add("g-lock");
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
    }
    dlg.querySelector(".g-lb-close").focus();
  }

  function step(dir) {
    if (items.length < 2) return;
    current = (current + dir + items.length) % items.length;
    imgIdx = 0;
    fill(items[current]);
    liveEl.textContent = `${current + 1} / ${items.length}: ${items[current].title}`;
  }

  function onDialogClose() {
    document.documentElement.classList.remove("g-lock");
    liveEl.textContent = "";
    if (leavingToLesson) return; // đang chuyển tab – focus do goToLesson xử lý
    let target = opener;
    if (current !== openedAt) {
      // Đã chuyển sang hiện vật khác: trả focus về nút của thẻ đó
      const it = items[current];
      target = it && gridEl.querySelector(`.g-more[data-gallery-art="${CSS.escape(it.id)}"]`);
    }
    if (target && document.contains(target)) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
  }

  // ---------- "Xem trên dòng thời gian" và quay lại ----------

  function goToLesson(it) {
    returnState = { scrollY: window.scrollY, id: it.id };
    const nav = document.querySelector('.nav-link[data-view="viewTimeline"]');
    if (nav) nav.click();
    window.setTimeout(() => {
      // Tab Dòng thời gian: tới đúng hiện vật nếu có, không thì tới đầu chương id="gd-N"
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

    gridEl.addEventListener("click", (e) => {
      const art = e.target.closest("[data-gallery-art]");
      if (art) {
        const idx = items.findIndex((it) => it.id === art.dataset.galleryArt);
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
        }, 30);
      }
      if (link.dataset.view !== "viewTimeline" && e.isTrusted) { backBtn.hidden = true; returnState = null; }
    });

    render();
  }

  return { init };
})();
