/**
 * SUMMARY.JS – TAB "TỔNG KẾT & BÀI HỌC"
 *
 * - Dữ liệu: summaryContent trong data.js (nguyên văn docs/tong-ket-va-on-tap/tong-ket.md).
 *   Muốn đổi nội dung: sửa docs rồi cập nhật data.js, không sửa file này.
 * - Dựng toàn bộ #viewSummary (đầu trang, mục lục, nội dung) nên không cần sửa index.html.
 * - Bố cục đọc dài: mục lục 01–05 bên trái (dính khi cuộn, tô mục đang đọc), nội dung bên phải.
 * - Phần "Câu hỏi ôn tập" lấy số câu thật từ quizData (quiz-data.js) và dẫn sang tab Đố vui.
 */

const SummaryModule = (() => {
  "use strict";

  const ICONS = {
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'
  };

  function icon(name, size = 18) {
    return `<svg class="s-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  const pad = (n) => String(n).padStart(2, "0");
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let root;
  let lockUntil = 0; // sau khi bấm mục lục, tạm không để thanh cuộn đổi mục đang tô

  // ---------- Dựng giao diện ----------

  function paragraphsHTML(list) {
    return list.map((p) => `<p>${esc(p)}</p>`).join("");
  }

  function itemsHTML(list) {
    return `<ol class="s-list" role="list">${list.map((it, i) => `
      <li>
        <span class="s-li-n" aria-hidden="true">${i + 1}</span>
        <div class="s-li-body">
          <h4 class="s-li-t">${esc(it.title)}</h4>
          <p>${esc(it.body)}</p>
        </div>
      </li>`).join("")}</ol>`;
  }

  function quizCtaHTML() {
    const n = typeof quizData !== "undefined" && Array.isArray(quizData) ? quizData.length : 0;
    const count = n ? `gồm ${n} câu ` : "";
    return `
      <p>Bộ câu hỏi trắc nghiệm ${count}về các giai đoạn 1954 – 1975 và nội dung tổng kết, có đáp án cùng giải thích.</p>
      <p class="s-actions">
        <a class="s-btn s-btn--solid" href="#quiz" data-open-view="viewQuiz">Làm bài ôn tập ${icon("arrowRight")}</a>
        <a class="s-btn" href="#gallery" data-open-view="viewGallery">Xem Kho tư liệu ${icon("arrowRight")}</a>
      </p>`;
  }

  function build(c) {
    const toc = c.sections.map((s, i) => `
      <li><a href="#s-${esc(s.id)}" data-s="${esc(s.id)}"><span class="s-toc-n" aria-hidden="true">${pad(i + 1)}</span><span>${esc(s.title)}</span></a></li>`).join("");

    const sections = c.sections.map((s, i) => {
      let body = "";
      if (s.paragraphs) body = paragraphsHTML(s.paragraphs);
      else if (s.items) body = itemsHTML(s.items);
      else if (s.id === "on-tap") body = quizCtaHTML();
      return `
        <section class="s-sec" id="s-${esc(s.id)}" aria-labelledby="s-h-${esc(s.id)}">
          <p class="s-kicker">Phần ${pad(i + 1)}</p>
          <h3 class="s-h" id="s-h-${esc(s.id)}">${esc(s.title)}</h3>
          ${body}
        </section>`;
    }).join("");

    root.setAttribute("aria-labelledby", "summaryTitle");
    root.innerHTML = `
      <div class="s-wrap">
        <header class="s-head">
          <div>
            <p class="eyebrow">Tổng kết &amp; bài học <i aria-hidden="true"></i> 1954 – 1975</p>
            <h2 class="s-title" id="summaryTitle">${esc(c.title)}</h2>
          </div>
        </header>

        <div class="s-body">
          <nav class="s-toc" aria-label="Mục lục bài tổng kết"><ol>${toc}</ol></nav>
          <article class="s-doc">
            ${sections}
          </article>
        </div>
      </div>`;
  }

  // ---------- Tương tác ----------

  function setCurrent(id) {
    root.querySelectorAll(".s-toc a").forEach((a) => {
      if (a.dataset.s === id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  function bind() {
    // Mục lục: cuộn tới phần, không đổi hash (main.js dùng hash để mở tab)
    root.querySelector(".s-toc").addEventListener("click", (e) => {
      const a = e.target.closest("a[data-s]");
      if (!a) return;
      e.preventDefault();
      const sec = root.querySelector(`#s-${CSS.escape(a.dataset.s)}`);
      if (!sec) return;
      lockUntil = Date.now() + 1000;
      sec.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
      setCurrent(a.dataset.s);
      const h = sec.querySelector(".s-h");
      h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    });

    // Liên kết sang tab khác (main.js chỉ gắn data-open-view lúc khởi động, trước khi tab này dựng xong)
    root.addEventListener("click", (e) => {
      const a = e.target.closest("[data-open-view]");
      if (!a) return;
      const nav = document.querySelector(`.nav-link[data-view="${a.dataset.openView}"]`);
      if (!nav) return;
      e.preventDefault();
      nav.click();
    });

    // Tô mục đang đọc
    const header = document.querySelector(".site-header");
    const top = (header ? header.offsetHeight : 0) + 24;
    const secs = [...root.querySelectorAll(".s-sec")];
    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => visible.set(en.target.id, en.isIntersecting ? en.boundingClientRect.top : null));
      if (Date.now() < lockUntil) return;
      const live = secs.filter((s) => visible.get(s.id) !== null && visible.has(s.id));
      if (live.length) setCurrent(live[0].id.replace(/^s-/, ""));
    }, { rootMargin: `-${top}px 0px -55% 0px`, threshold: 0 });
    secs.forEach((s) => io.observe(s));
    setCurrent(secs[0].id.replace(/^s-/, ""));

    // Chiều cao thanh menu (để mục lục dính ngay dưới nó)
    const setTop = () => root.style.setProperty("--s-sticky-top", `${header ? header.offsetHeight : 0}px`);
    setTop();
    window.addEventListener("resize", setTop);
  }

  function init() {
    root = document.getElementById("viewSummary");
    if (!root || typeof summaryContent === "undefined") return;
    build(summaryContent);
    bind();
  }

  return { init };
})();
