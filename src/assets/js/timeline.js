/**
 * TIMELINE.JS – Tab "Dòng thời gian" trong index.html (#viewTimeline)
 * Dựng các chương 5 giai đoạn từ TL_DATA, điều khiển tờ lịch bóc, dải đất 3D,
 * thước năm và các hoạt họa minh họa.
 */
(function () {
  "use strict";

  const DATA = window.TL_DATA;
  const TL = document.getElementById("viewTimeline");
  if (!DATA || !TL) return;

  const PLACES = DATA.places;
  const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  // Thoát ký tự HTML; đồng thời giữ tên "Hồ Chí Minh" trên cùng một dòng (dấu cách không ngắt)
  const esc = (s) =>
    String(s)
      .replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]))
      .replace(/Hồ Chí Minh/g, "Hồ\u00a0Chí\u00a0Minh");
  const fmt = (n) => Number(n).toLocaleString("vi-VN");
  const pad = (n) => String(n).padStart(2, "0");

  // ---------- Giấy xé viền ----------
  // Tạo clip-path polygon răng cưa ngẫu nhiên (có hạt giống để ổn định giữa các lần tải).
  // data-torn="tblr" (các cạnh bị xé), data-amp = độ sâu vết xé (px), data-seed = hạt giống.
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
    if (edges.includes("r")) for (let y = 2; y < 98; y += 1.2 + R() * 3) pts.push(`calc(100% - ${d()}px) ${y.toFixed(2)}%`);
    if (edges.includes("b")) {
      for (let x = 100; x > 0; x -= 0.7 + R() * 2.2) pts.push(`${x.toFixed(2)}% calc(100% - ${d()}px)`);
      pts.push(`0% calc(100% - ${d()}px)`);
    } else pts.push("100% 100%", "0% 100%");
    if (edges.includes("l")) for (let y = 98; y > 2; y -= 1.2 + R() * 3) pts.push(`${d()}px ${y.toFixed(2)}%`);
    return `polygon(${pts.join(",")})`;
  }
  let tornCount = 0;
  function applyTorn(root) {
    $$("[data-torn]", root || document).forEach((el) => {
      if (el.dataset.tornDone) return;
      const seed = Number(el.dataset.seed) || 1000 + tornCount++ * 7919;
      el.style.clipPath = tornPolygon(el.dataset.torn, Number(el.dataset.amp) || 6, seed);
      el.dataset.tornDone = "1";
    });
  }

  // ---------- Chuẩn hóa dữ liệu ----------
  const EVENTS = [];
  DATA.stages.forEach((st, si) => {
    st.index = si;
    st.events.forEach((ev) => {
      ev.stage = si;
      ev.gi = EVENTS.length;
      ev.d = parseDate(ev.date);
      EVENTS.push(ev);
    });
  });
  const byId = Object.fromEntries(EVENTS.map((e) => [e.id, e]));
  const libIdx = {};
  EVENTS.forEach((e) => { if (e.liberate) libIdx[e.liberate] = e.gi; });
  const UNIFY_GI = libIdx.all;

  function parseDate(s) {
    const [y, m, d] = s.split("-").map(Number);
    return { y, m: m || null, d: d || null };
  }
  const Y0 = 1954.0, Y1 = 1975.6;
  const yearFrac = (dt) => dt.y + (dt.m ? (dt.m - 1) / 12 : 0) + (dt.d ? (dt.d - 1) / 365 : 0);
  const posOf = (dt) => Math.max(0, Math.min(1, (yearFrac(dt) - Y0) / (Y1 - Y0)));

  // ---------- Biểu tượng ----------
  const ICON = {
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.85 6.05 6.65.78-4.92 4.56 1.3 6.57L12 17.3l-5.88 3.26 1.3-6.57L2.5 9.43l6.65-.78z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4v9a4 4 0 0 0 4 4h8.6l-3.3 3.3 1.4 1.4L21.4 16l-5.7-5.7-1.4 1.4 3.3 3.3H9a2 2 0 0 1-2-2V4z"/></svg>',
    image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17.5l5-5 4 4 2.5-2.5 5 4.5"/></svg>'
  };
  const TYPE_LABEL = { ctx: "Bối cảnh", line: "Đường lối", prac: "Thực tiễn" };

  // ---------- Hoạt họa minh họa ----------
  function renderModule(m) {
    switch (m.type) {
      case "waffle": {
        const cells = 100;
        const on = Math.round((m.value / m.total) * cells);
        let html = "";
        for (let i = 0; i < cells; i++) html += `<i class="${i < on ? "on" : ""}" style="--i:${i}"></i>`;
        return `<div class="mod mod--waffle">
          <div class="mod-num"><b class="mod-big" data-count="${m.value}">${fmt(m.value)}</b><span>/ ${fmt(m.total)} ${esc(m.unit)}</span></div>
          <div class="waffle" aria-hidden="true">${html}</div>
          <p class="mod-cap">${esc(m.caption)} · mỗi ô ≈ 26 xã</p>
        </div>`;
      }
      case "fence": {
        let stakes = "";
        for (let i = 0; i < 18; i++) {
          const x = 6 + i * 17.4, h = 44 + (i % 3) * 7;
          const fall = (i % 2 ? 1 : -1) * (64 + ((i * 13) % 24));
          stakes += `<polygon class="stake" style="--fall:${fall}deg;--d:${i * 55}ms" points="${x},92 ${x + 11},92 ${x + 11},${92 - h + 8} ${x + 5.5},${92 - h} ${x},${92 - h + 8}"/>`;
        }
        return `<div class="mod mod--fence">
          <div class="mod-num"><b class="mod-big">${esc(m.planned)}</b><span>ấp chiến lược dự kiến<br>(kế hoạch Staley – Taylor)</span></div>
          <svg class="fence" viewBox="0 0 320 96" aria-hidden="true">
            <line class="rail" x1="0" y1="60" x2="320" y2="60"/><line class="rail" x1="0" y1="78" x2="320" y2="78"/>
            ${stakes}<line class="ground" x1="0" y1="93" x2="320" y2="93"/>
          </svg>
          <p class="mod-cap fence-result">→ “Quốc sách” bị phá sản</p>
        </div>`;
      }
      case "triad":
        return `<div class="mod mod--triad">${m.rows
          .map((r) => `<div class="triad-row"><b>${esc(r[0])}</b><span class="triad-k">${esc(r[1])}</span><span class="triad-v">${esc(r[2])}</span></div>`)
          .join("")}</div>`;
      case "targets":
        return `<div class="mod mod--night">
          <div class="night-sky" aria-hidden="true">
            <svg viewBox="0 0 320 70" preserveAspectRatio="none"><path d="M0 70V48h18v-9h14v14h10V30h16v23h12V40h20v-14h8v14h14v22h10V36h22v26h8V20h6v-8h4v8h6v42h14V44h18v18h12V34h16v28h20V46h12v-9h18v33z"/></svg>
            <i style="--x:14%;--d:0s"></i><i style="--x:38%;--d:.5s"></i><i style="--x:62%;--d:1s"></i><i style="--x:84%;--d:1.5s"></i>
          </div>
          <ul class="targets">${m.items.map((t, i) => `<li style="--d:${i * 0.5}s">${esc(t)}</li>`).join("")}</ul>
          <p class="mod-cap">Các mục tiêu tại Sài Gòn · đêm giao thừa</p>
        </div>`;
      case "steps":
        return `<ol class="mod mod--steps">${m.items
          .map((s, i) => `<li style="--d:${i * 0.35}s"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></li>`)
          .join("")}</ol>`;
      case "fronts":
        return `<div class="mod mod--fronts">
          <svg viewBox="0 0 240 150" aria-hidden="true">
            <circle class="fc fc1" cx="92" cy="58" r="44"/><circle class="fc fc2" cx="148" cy="58" r="44"/><circle class="fc fc3" cx="120" cy="104" r="44"/>
            <text x="70" y="44" text-anchor="middle">${esc(m.items[0])}</text>
            <text x="170" y="44" text-anchor="middle">${esc(m.items[1])}</text>
            <text x="120" y="134" text-anchor="middle">${esc(m.items[2])}</text>
          </svg>
          <p class="mod-cap"><strong>${esc(m.center)}</strong> – sức mạnh nằm ở chỗ ba mặt trận giao nhau.</p>
        </div>`;
      case "twelve": {
        let cells = "";
        for (let i = 0; i < 12; i++) cells += `<i style="--i:${i}">${m.start + i}</i>`;
        return `<div class="mod mod--twelve">
          <div class="twelve" aria-label="12 ngày đêm, từ 18 đến 29 tháng 12 năm 1972">${cells}</div>
          <div class="mod-stats">${m.stats
            .map((s) => `<div><b class="mod-big" data-count="${s[0]}">${s[0]}</b><span>${esc(s[1])}</span></div>`)
            .join("")}</div>
        </div>`;
      }
      case "duration":
        return `<div class="mod mod--duration">
          <div class="dur">${m.parts.map((p) => `<div><b class="mod-big" data-count="${p[0]}">${p[0]}</b><span>${esc(p[1])}</span></div>`).join("")}</div>
          <p class="mod-cap">${esc(m.caption)}</p>
        </div>`;
      case "gate":
        return `<div class="mod mod--gate">
          <svg class="gate-scene" viewBox="0 0 340 120" aria-label="${m.hit ? `Xe tăng 390 húc đổ cổng Dinh Độc Lập lúc ${esc(m.hit)}, ` : "Xe tăng tiến vào cổng Dinh Độc Lập, "}cờ cách mạng tung bay lúc ${esc(m.time)}">
            <g class="palace">
              <rect x="168" y="60" width="160" height="44"/>
              ${Array.from({ length: 15 }, (_, i) => `<line x1="${176 + i * 10}" y1="64" x2="${176 + i * 10}" y2="100"/>`).join("")}
              <rect x="160" y="56" width="176" height="6"/>
            </g>
            <line class="pole" x1="248" y1="56" x2="248" y2="16"/>
            <g class="flag"><rect x="249" y="17" width="26" height="8" class="f-red"/><rect x="249" y="25" width="26" height="8" class="f-blue"/>
              <path class="f-star" d="M262 21.2l1 2.4 2.6.2-2 1.7.6 2.5-2.2-1.3-2.2 1.3.6-2.5-2-1.7 2.6-.2z"/></g>
            <rect class="post" x="118" y="70" width="5" height="34"/><rect class="post" x="157" y="70" width="5" height="34"/>
            <g class="leaf leaf-l"><rect x="123" y="74" width="17" height="30"/>${[127, 131, 135].map((x) => `<line x1="${x}" y1="74" x2="${x}" y2="104"/>`).join("")}</g>
            <g class="leaf leaf-r"><rect x="140" y="74" width="17" height="30"/>${[145, 149, 153].map((x) => `<line x1="${x}" y1="74" x2="${x}" y2="104"/>`).join("")}</g>
            <g class="tank">
              <rect x="0" y="92" width="64" height="12" rx="6"/>
              <path d="M6 92l6-10h40l8 10z"/>
              <path d="M20 82c0-7 6-11 13-11s12 4 12 11z"/>
              <rect x="40" y="74" width="34" height="3.5" rx="1.5"/>
              ${m.hit ? `<text class="tank-no" x="33" y="90" text-anchor="middle">390</text>` : ""}
            </g>
            <line class="ground" x1="0" y1="104.5" x2="340" y2="104.5"/>
          </svg>
          <div class="gate-clock${m.hit ? " has-hit" : ""}">
            ${m.hit ? `<b class="gc-hit">${esc(m.hit)}</b><span class="gc-cap gc-cap-hit">Xe tăng 390 húc cổng</span>` : ""}
            <b class="gc-flag">${esc(m.time)}</b><span class="gc-cap gc-cap-flag">Cờ tung bay · 30·4·1975</span>
          </div>
        </div>`;
      default:
        return "";
    }
  }

  // ---------- Dựng HTML ----------
  function renderEvent(ev) {
    const place = ev.place && PLACES[ev.place];
    const from = ev.from && byId[ev.from];
    return `<li class="ev${ev.key ? " is-key" : ""}${ev.detail ? " has-detail" : ""}" data-type="${ev.type}" data-gi="${ev.gi}" id="m-${ev.id}">
      <span class="ev-node" aria-hidden="true">${ev.type === "prac" ? ICON.star : ""}</span>
      <div class="ev-card">
      <article class="ev-paper" data-torn="tb" data-amp="6">
        <header class="ev-top">
          <span class="ev-type">${TYPE_LABEL[ev.type]}</span>
          <time class="ev-date" datetime="${esc(ev.date)}">${esc(ev.label)}</time>
          ${ev.key ? `<span class="ev-key" title="Mốc trọng tâm ôn thi">Trọng tâm</span>` : ""}
        </header>
        <h3 class="ev-title">${esc(ev.title)}</h3>
        <p class="ev-text">${esc(ev.text)}</p>
        ${ev.module ? renderModule(ev.module) : ""}
        ${ev.note ? `<p class="ev-note"><strong>Nhìn thẳng:</strong> ${esc(ev.note)}</p>` : ""}
        ${place || from || ev.detail
          ? `<footer class="ev-foot">
              ${from ? `<a class="ev-from" href="#m-${from.id}">${ICON.arrow}<span>Hiện thực hóa: ${esc(from.title)}</span></a>` : ""}
              ${place ? `<span class="ev-place">${ICON.pin}${esc(place.name)}</span>` : ""}
              ${ev.detail ? `<button class="ev-more" type="button" data-ev="${ev.id}">Xem chi tiết →</button>` : ""}
            </footer>`
          : ""}
      </article>
      </div>
    </li>`;
  }

  function renderArtifact(a, si, ai) {
    const inner = a.pending
      ? `<span class="ph"><span class="ph-icon">${ICON.image}</span><span class="ph-note">Ảnh sẽ được cập nhật sau</span></span>`
      : `<img src="${esc(a.img)}" alt="${esc(a.title)}" loading="lazy" decoding="async">`;
    return `<figure class="art${a.pending ? " is-pending" : ""}">
      <button class="photo" type="button" ${a.pending ? "disabled" : `data-art="${si}-${ai}"`} aria-label="${a.pending ? "Ảnh đang cập nhật" : "Phóng to: " + esc(a.title)}">
        <span data-torn="${ai % 2 ? "b" : "t"}" data-amp="10">${inner}<span class="glare" aria-hidden="true"></span></span>
      </button>
      <figcaption>
        <span class="art-kicker">Hình ảnh tư liệu</span>
        <strong>${esc(a.title)}</strong>
        <span class="art-text">${esc(a.text)}</span>
        ${a.pending ? "" : `<button class="art-more" type="button" data-art="${si}-${ai}">Xem chi tiết →</button>`}
      </figcaption>
    </figure>`;
  }

  function renderChapter(st, si) {
    const first = st.events[0];
    return `<section class="chapter" id="${st.id}" data-stage="${si}" aria-labelledby="${st.id}-title">
      <header class="ch-head" data-gi="${first.gi}">
        <span class="ch-num" aria-hidden="true">${pad(si + 1)}</span>
        <p class="eyebrow">Giai đoạn ${pad(si + 1)} <i aria-hidden="true"></i> ${esc(st.years)}</p>
        <h2 class="ch-title" id="${st.id}-title">${esc(st.title)}</h2>
        ${st.lede ? `<p class="ch-lede">${esc(st.lede)}</p>` : ""}
        ${st.quote ? `<blockquote class="ch-quote"><div data-torn="tb" data-amp="5"><p>“${esc(st.quote.text)}”</p><cite>${esc(st.quote.by)}</cite></div></blockquote>` : ""}
      </header>
      <div class="opp"><div data-torn="tb" data-amp="7">
        <span class="opp-label">Thế trận đối phương</span>
        <p class="opp-name">${esc(st.opp.name)}</p>
        <div class="opp-formula">${st.opp.parts.map((p) => `<span class="opp-chip">${esc(p)}</span>`).join('<span class="opp-plus" aria-hidden="true">+</span>')}</div>
        <p class="opp-note">${esc(st.opp.note)}</p>
      </div></div>
      <ol class="events">${st.events.map(renderEvent).join("")}</ol>
      <div class="arts-wrap">
        <p class="arts-head"><span>Chứng tích</span></p>
        <div class="arts">${st.artifacts.map((a, ai) => renderArtifact(a, si, ai)).join("")}</div>
      </div>
      <aside class="take"><span class="stamp">Ghi nhớ</span><div data-torn="tb" data-amp="6"><p>${esc(st.takeaway)}</p></div></aside>
    </section>`;
  }

  // Thước năm (ruler) chia 5 đoạn theo mốc đầu tiên của từng giai đoạn
  function renderRuler() {
    const starts = DATA.stages.map((st) => posOf(st.events[0].d));
    starts[0] = 0;
    const segs = starts.map((s, i) => [s, i < starts.length - 1 ? starts[i + 1] : 1]);
    const ticks = [1954, 1960, 1965, 1970, 1975];
    return `<div class="ruler-track">
        ${segs.map((g, i) => `<button class="ruler-seg" type="button" data-goto="${DATA.stages[i].id}" style="left:${g[0] * 100}%;width:${(g[1] - g[0]) * 100}%" title="Giai đoạn ${i + 1}: ${esc(DATA.stages[i].years)}"><span>${pad(i + 1)}</span></button>`).join("")}
        <span class="ruler-mark" id="rulerMark" aria-hidden="true"></span>
      </div>
      <div class="ruler-ticks" aria-hidden="true">${ticks.map((y) => `<span style="left:${posOf({ y }) * 100}%">${y}</span>`).join("")}</div>`;
  }

  $("#chapters").innerHTML = DATA.stages.map(renderChapter).join("");
  $("#ruler").innerHTML = renderRuler();
  $("#finReasons").innerHTML = DATA.finale.reasons.map((r, i) => `<li><b>${pad(i + 1)}</b><span>${esc(r)}</span></li>`).join("");
  applyTorn();

  // ---------- Thanh nav của trang chính ----------
  // Đo chiều cao thật của thanh nav để bảng định vị, thanh mini và vị trí cuộn bám đúng bên dưới.
  // (Nút ☰ trên điện thoại do main.js xử lý.)
  const siteHeader = $(".site-header");
  const navHeight = () => (siteHeader ? siteHeader.offsetHeight : 0);
  const syncNavHeight = () => TL.style.setProperty("--topbar-h", navHeight() + "px");
  syncNavHeight();
  if (siteHeader && "ResizeObserver" in window) new ResizeObserver(syncNavHeight).observe(siteHeader);

  // ---------- Dải đất 3D ----------
  const lands = [];
  let panelLand = null, finaleLand = null;
  if (window.Land3D) {
    const hero = $("#heroLand"), panel = $("#panelLand"), fin = $("#finaleLand");
    if (hero) lands.push(window.Land3D.create(hero, { variant: "hero" }));
    if (panel) lands.push((panelLand = window.Land3D.create(panel, { variant: "panel" })));
    if (fin) lands.push((finaleLand = window.Land3D.create(fin, { variant: "finale" })));
    if (panelLand) panelLand.setState({ libIdx });
  }

  // ---------- Tờ lịch bóc ----------
  const WD = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const cal = $("#calStack");
  let calGi = -1;

  function leafHTML(ev) {
    const { y, m, d } = ev.d;
    if (d) {
      const wd = new Date(y, m - 1, d).getDay();
      return { cls: wd === 0 ? "is-sunday" : "", head: `Tháng ${m} · ${y}`, kick: "", big: d, foot: WD[wd] };
    }
    if (m) return { cls: "prec-m", head: `Năm ${y}`, kick: "Tháng", big: m, foot: ev.label };
    return { cls: "prec-y", head: "Cả năm", kick: "", big: y, foot: ev.label };
  }

  function setCalendar(ev) {
    if (!cal || ev.gi === calGi) return;
    const dir = ev.gi > calGi ? 1 : -1;
    calGi = ev.gi;
    const L = leafHTML(ev);
    const leaf = document.createElement("div");
    leaf.className = `cal-leaf ${L.cls}`;
    leaf.style.clipPath = tornPolygon("t", 5, 31 + ev.gi * 101);
    leaf.innerHTML = `<span class="lh">${esc(L.head)}</span><span class="ld">${L.kick ? `<small>${L.kick}</small>` : ""}${L.big}</span><span class="lf">${esc(L.foot)}</span>`;
    $("#calSR").textContent = `${ev.label}: ${ev.title}`;

    const old = $$(".cal-leaf", cal);
    // dọn các tờ cũ còn sót khi cuộn nhanh
    old.slice(0, -1).forEach((n) => n.remove());
    const cur = old[old.length - 1];
    if (reducedMQ.matches || !cur) {
      if (cur) cur.remove();
      cal.appendChild(leaf);
      return;
    }
    if (dir > 0) {
      cal.insertBefore(leaf, cur);
      cur.classList.add("is-tearing");
      setTimeout(() => cur.remove(), 700);
    } else {
      leaf.classList.add("is-dropping");
      cal.appendChild(leaf);
      setTimeout(() => { cur.remove(); leaf.classList.remove("is-dropping"); }, 560);
    }
  }

  // ---------- Đồng bộ trạng thái khi cuộn ----------
  const EMBERS = [0.04, 0.07, 0.11, 0.15, 0.2];
  let activeGi = -1, activeStage = -1;
  const evEls = () => $$(".ch-head, .ev");

  function setActive(gi) {
    if (gi === activeGi || gi < 0) return;
    activeGi = gi;
    const ev = EVENTS[gi];
    const st = DATA.stages[ev.stage];

    $$(".ev.is-active").forEach((n) => n.classList.remove("is-active"));
    const el = document.getElementById("m-" + ev.id);
    if (el) el.classList.add("is-active");

    setCalendar(ev);

    if (ev.stage !== activeStage) {
      activeStage = ev.stage;
      $("#psCount").textContent = `Giai đoạn ${ev.stage + 1}/5 · ${st.years}`;
      $("#psTitle").textContent = st.title;
      $("#psOpp").textContent = "Đối phương: " + st.opp.name.replace(/[“”]/g, "");
      $$(".ruler-seg").forEach((b, i) => b.classList.toggle("is-on", i === ev.stage));
      $("#mbStage").textContent = `Giai đoạn ${ev.stage + 1} · ${st.short}`;
    }
    const place = ev.place ? PLACES[ev.place] : null;
    $("#psPlace").innerHTML = place ? `${ICON.pin}<span>${esc(place.name)}</span>` : "";
    const p = posOf(ev.d);
    $("#rulerMark").style.left = p * 100 + "%";
    $("#mbDate").textContent = ev.label;
    $("#mbFill").style.transform = `scaleX(${p})`;

    if (panelLand) {
      panelLand.setState({
        active: gi,
        pin: place,
        embers: EMBERS[ev.stage],
        unify: UNIFY_GI != null && gi >= UNIFY_GI ? 1 : 0
      });
    }
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const line = innerHeight * 0.5;
      let best = null;
      for (const el of evEls()) {
        if (el.offsetParent === null) continue;
        if (el.getBoundingClientRect().top <= line) best = el;
        else break;
      }
      setActive(best ? Number(best.dataset.gi) : 0);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // Thanh mini (di động) chỉ hiện khi đang ở trong phần dòng thời gian
  new IntersectionObserver((es) => es.forEach((e) => TL.classList.toggle("in-story", e.isIntersecting)), {
    rootMargin: `-${navHeight()}px 0px -40% 0px`
  }).observe($("#story"));

  // ---------- Hoạt họa khi xuất hiện ----------
  function countUp(el) {
    const to = Number(el.dataset.count);
    if (!to || reducedMQ.matches) return;
    const t0 = performance.now(), dur = 1300;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = "0";
    requestAnimationFrame(step);
  }
  const modIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in-view");
        $$("[data-count]", e.target).forEach(countUp);
        modIO.unobserve(e.target);
      });
    },
    { threshold: 0.45 }
  );
  $$(".mod").forEach((m) => modIO.observe(m));

  // Khép khe vĩ tuyến 17 ở phần kết
  if (finaleLand) {
    new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) finaleLand.setState({ unify: 1 }); }),
      { threshold: 0.45 }
    ).observe($("#finale"));
  }

  // ---------- Điều hướng ----------
  function scrollToEl(el, offsetRatio) {
    const y = el.getBoundingClientRect().top + scrollY - innerHeight * (offsetRatio == null ? 0.3 : offsetRatio);
    window.scrollTo({ top: Math.max(0, y), behavior: reducedMQ.matches ? "auto" : "smooth" });
  }
  document.addEventListener("click", (e) => {
    const seg = e.target.closest("[data-goto]");
    if (seg) {
      const t = document.getElementById(seg.dataset.goto);
      if (t) scrollToEl(t, 0.08);
    }
    const from = e.target.closest(".ev-from");
    if (from) {
      e.preventDefault();
      jumpToCard(from.getAttribute("href").replace("#m-", ""));
    }
  });

  // Cuộn tới thẻ mốc và nháy sáng viền để người xem nhận ra
  function jumpToCard(id) {
    const t = document.getElementById("m-" + id);
    if (!t) return;
    scrollToEl(t, 0.3);
    t.classList.remove("flash");
    void t.offsetWidth;
    t.classList.add("flash");
  }

  // ---------- Chi tiết mốc (24 mốc trọng tâm) ----------
  const evd = $("#evDetail");
  if (evd) evd.style.clipPath = tornPolygon("tb", 7, 4242);

  function eventLink(target, verb) {
    return `<li><button class="evd-link" type="button" data-evd-go="${target.id}">
        <span class="evd-link-type" data-type="${target.type}">${verb}</span>
        <span class="evd-link-title">${esc(target.title)}</span>
        <span class="evd-link-date">${esc(target.label)}</span>
      </button></li>`;
  }

  function openEventDetail(ev) {
    if (!evd || !ev) return;
    const place = ev.place && PLACES[ev.place];
    const from = ev.from && byId[ev.from];
    const results = EVENTS.filter((x) => x.from === ev.id);
    const st = DATA.stages[ev.stage];
    const paras = String(ev.detail).split(/\n\s*\n/).map((p) => `<p>${esc(p.trim())}</p>`).join("");
    let links = "";
    if (from) links += eventLink(from, "Từ đường lối");
    results.forEach((r) => (links += eventLink(r, "Hiện thực hóa thành")));
    $("#evdBody").innerHTML = `
      <p class="evd-stage">Giai đoạn ${ev.stage + 1} · ${esc(st.years)}</p>
      <header class="evd-top">
        <span class="evd-type" data-type="${ev.type}">${TYPE_LABEL[ev.type]}</span>
        <time class="evd-date" datetime="${esc(ev.date)}">${esc(ev.label)}</time>
        ${ev.key ? `<span class="ev-key">Trọng tâm</span>` : ""}
      </header>
      <h3 class="evd-title" id="evdTitle">${esc(ev.title)}</h3>
      ${place ? `<p class="evd-place">${ICON.pin}${esc(place.name)}</p>` : ""}
      <p class="evd-lead">${esc(ev.text)}</p>
      <div class="evd-detail">${paras}</div>
      ${ev.meaning ? `<aside class="evd-meaning"><span class="stamp">Ý nghĩa</span><p>${esc(ev.meaning)}</p></aside>` : ""}
      ${links ? `<section class="evd-section"><span class="evd-label">Từ đường lối đến thực tiễn</span><ul class="evd-links">${links}</ul></section>` : ""}
      ${ev.refs && ev.refs.length ? `<section class="evd-section"><span class="evd-label">Nguồn tham khảo</span><ul class="evd-refs">${ev.refs.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></section>` : ""}
      <button class="evd-jump" type="button" data-evd-jump="${ev.id}">↓ Xem mốc này trên dòng thời gian</button>`;
    evd.dataset.type = ev.type;
    if (!evd.open) {
      if (typeof evd.showModal === "function") evd.showModal();
      else evd.setAttribute("open", "");
    }
    evd.scrollTop = 0;
  }

  document.addEventListener("click", (e) => {
    const more = e.target.closest("[data-ev]");
    if (more) openEventDetail(byId[more.dataset.ev]);
    // Bấm vào bất kỳ chỗ nào trên thẻ có chi tiết cũng mở hộp
    // (trừ liên kết/nút bên trong thẻ, và khi người xem đang bôi đen chữ)
    const card = e.target.closest(".ev.has-detail .ev-card");
    if (card && !more && !e.target.closest("a, button") && !String(window.getSelection()).trim()) {
      openEventDetail(byId[card.closest(".ev").id.replace("m-", "")]);
    }
    const go = e.target.closest("[data-evd-go]");
    if (go) {
      const target = byId[go.dataset.evdGo];
      // Mốc có chi tiết thì mở luôn trong hộp; mốc thường thì đóng hộp và cuộn tới thẻ
      if (target && target.detail) openEventDetail(target);
      else if (target) closeThenJump(target.id);
    }
    const jump = e.target.closest("[data-evd-jump]");
    if (jump) closeThenJump(jump.dataset.evdJump);
  });
  // Đóng hộp xong mới cuộn: khi đóng, trình duyệt trả focus (và cuộn) về nút đã mở hộp
  function closeThenJump(id) {
    evd.close();
    requestAnimationFrame(() => jumpToCard(id));
  }
  if (evd) {
    $("#evdClose").addEventListener("click", () => evd.close());
    evd.addEventListener("click", (e) => { if (e.target === evd) evd.close(); });
  }

  let lastNav = { idx: -1, t: 0 };
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select/i.test(e.target.tagName)) return;
    if ($("#lightbox").open || (evd && evd.open)) return;
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const list = $$(".ev").filter((n) => n.offsetParent !== null);
    if (!list.length) return;
    let idx = list.findIndex((n) => Number(n.dataset.gi) === activeGi);
    const storyTop = $("#story").getBoundingClientRect().top;
    if (storyTop > innerHeight * 0.4) idx = -1; // còn ở phần mở đầu
    // Bấm liên tiếp khi trang còn đang cuộn: tính tiếp từ mốc vừa nhắm tới
    if (performance.now() - lastNav.t < 900) idx = lastNav.idx;
    const next = e.key === "ArrowRight" ? Math.min(list.length - 1, idx + 1) : Math.max(0, idx - 1);
    lastNav = { idx: next, t: performance.now() };
    e.preventDefault();
    scrollToEl(list[next], 0.3);
  });

  // ---------- Hiện vật: nghiêng 3D + phóng to ----------
  $$(".photo:not([disabled])").forEach((f) => {
    f.addEventListener("pointermove", (e) => {
      if (reducedMQ.matches || e.pointerType === "touch") return;
      const r = f.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
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

  const lb = $("#lightbox");
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-art]");
    if (!b) return;
    const [si, ai] = b.dataset.art.split("-").map(Number);
    const st = DATA.stages[si], a = st.artifacts[ai];
    $("#lbImg").src = a.img;
    $("#lbImg").alt = a.title;
    $("#lbStage").textContent = `Giai đoạn ${si + 1} · ${st.years}`;
    $("#lbTitle").textContent = a.title;
    $("#lbWhere").textContent = a.where || "Bảo tàng Chứng tích Chiến tranh";
    $("#lbDetail").innerHTML = String(a.detail || a.text)
      .split(/\n\s*\n/)
      .map((p) => `<p>${esc(p.trim())}</p>`)
      .join("");
    if (typeof lb.showModal === "function") lb.showModal();
    else lb.setAttribute("open", "");
    $(".lb-body", lb).scrollTop = 0;
  });
  $("#lbClose").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });

  onScroll();
})();
