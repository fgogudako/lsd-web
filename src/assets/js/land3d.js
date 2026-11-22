/**
 * LAND3D.JS – "Dải đất hình chữ S".
 *
 * - Hình dạng giản lược theo vĩ độ / kinh độ gần đúng: mang tính minh họa, KHÔNG phải bản đồ chính xác.
 * - Hạt phía bắc vĩ tuyến 17 tô đỏ; miền Nam nhạt màu, lóe "đốm lửa" phong trào theo từng giai đoạn.
 * - Năm 1975: từng vùng sáng dần theo các chiến dịch, khe vĩ tuyến 17 khép lại khi thống nhất.
 * - Có độ cao giả lập (Tây Bắc, Trường Sơn, Tây Nguyên) nên khi xoay sẽ thấy khối nổi 3D.
 *
 * API: const land = Land3D.create(canvas, { variant: "hero" | "panel" | "finale" });
 *      land.setState({ active, pin, embers, unify, libIdx }); land.refreshColors();
 */
(function () {
  "use strict";

  // [vĩ độ, kinh độ mép tây, kinh độ mép đông] – giản lược từ nam ra bắc
  const ROWS = [
    [8.6, 104.72, 104.92], [8.8, 104.74, 105.25], [9.2, 104.8, 105.8], [9.6, 104.92, 106.35],
    [10.0, 105.05, 106.75], [10.4, 104.5, 107.1], [10.7, 104.95, 107.65], [10.9, 105.3, 108.05],
    [11.1, 106.0, 108.5], [11.4, 106.25, 108.95], [11.8, 106.6, 109.2], [12.2, 107.25, 109.25],
    [12.6, 107.5, 109.4], [13.0, 107.45, 109.35], [13.5, 107.35, 109.3], [14.0, 107.4, 109.25],
    [14.5, 107.5, 109.1], [15.0, 107.45, 108.9], [15.5, 107.3, 108.75], [16.0, 107.15, 108.35],
    [16.3, 107.0, 107.95], [16.6, 106.6, 107.55], [17.0, 106.45, 107.15], [17.4, 106.05, 106.75],
    [17.8, 105.6, 106.5], [18.2, 105.3, 106.3], [18.6, 105.0, 105.85], [19.0, 104.45, 105.8],
    [19.4, 104.0, 105.85], [19.8, 104.6, 106.0], [20.2, 104.45, 106.45], [20.6, 104.3, 106.7],
    [21.0, 103.5, 107.2], [21.3, 102.9, 107.55], [21.5, 102.7, 107.98], [21.7, 102.4, 107.3],
    [22.0, 102.25, 106.8], [22.4, 102.15, 106.75], [22.8, 103.0, 106.4], [23.1, 104.8, 105.75],
    [23.38, 105.25, 105.45]
  ];
  const LAT_MIN = 8.6, LAT_MAX = 23.38, LON_MIN = 102.1, LON_MAX = 109.5;
  const LAT_SPLIT = 17.0;
  const LON0 = 108.4, LAT0 = 16.0;
  const KX = Math.cos((LAT0 * Math.PI) / 180);

  const ISLANDS = [
    { name: "QĐ. HOÀNG SA", lat: 16.45, lon: 111.95, sx: 0.55, sy: 0.38, clumps: 7, per: 7 },
    { name: "QĐ. TRƯỜNG SA", lat: 9.9, lon: 113.7, sx: 1.25, sy: 1.35, clumps: 11, per: 6 }
  ];
  const CITIES = [
    { name: "Hà Nội", lat: 21.03, lon: 105.85 },
    { name: "Sài Gòn", lat: 10.78, lon: 106.7 }
  ];

  const VARIANTS = {
    hero: { count: 3600, cx: 0.5, cy: 0.5, zoom: 0.9, pitch: 0.5, yaw: -0.18, intro: true, pins: false, cities: true },
    panel: { count: 3000, cx: 0.5, cy: 0.53, zoom: 1.0, pitch: 0.46, yaw: -0.12, intro: false, pins: true, cities: true },
    finale: { count: 3600, cx: 0.5, cy: 0.52, zoom: 0.95, pitch: 0.48, yaw: -0.15, intro: false, pins: false, cities: true }
  };

  // ---------- Hình học ----------
  function edgesAt(lat) {
    if (lat <= ROWS[0][0]) return [ROWS[0][1], ROWS[0][2]];
    for (let i = 1; i < ROWS.length; i++) {
      const a = ROWS[i - 1], b = ROWS[i];
      if (lat <= b[0]) {
        const t = (lat - a[0]) / (b[0] - a[0]);
        return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      }
    }
    const L = ROWS[ROWS.length - 1];
    return [L[1], L[2]];
  }

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function gauss(R) {
    let u = 0, v = 0;
    while (u === 0) u = R();
    while (v === 0) v = R();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  // Độ cao giả lập: núi phía tây (Tây Bắc, Trường Sơn), cao nguyên Tây Nguyên, đồng bằng phẳng
  function relief(lat, lon, w, e) {
    const f = Math.max(0, Math.min(1, (e - lon) / Math.max(0.2, e - w)));
    let a = 0;
    if (lat > 20.4) a = 1.0;
    else if (lat > 15.3) a = 0.72;
    else if (lat > 11.6) a = 0.8;
    else if (lat > 10.9) a = (0.8 * (lat - 10.9)) / 0.7;
    const dR = Math.hypot(lat - 20.7, lon - 106.1); // đồng bằng sông Hồng
    if (dR < 1.0) a *= dR;
    let h = a * Math.pow(f, 1.35);
    if (lat > 11.4 && lat < 15.4) h += 0.35 * Math.exp(-((lat - 13.4) ** 2 + (lon - 108.0) ** 2) / 1.1);
    h += 0.45 * Math.exp(-((lat - 12.0) ** 2 + (lon - 108.45) ** 2) / 0.18);
    return h;
  }

  // Vùng giải phóng năm 1975 (giản lược theo các chiến dịch)
  function region(lat, lon) {
    if (lat >= LAT_SPLIT) return "north";
    if (Math.hypot(lat - 11.75, lon - 106.95) < 0.42) return "phuoclong";
    if (lat >= 11.7 && lat <= 15.2 && lon < 108.55) return "taynguyen";
    if (lat >= 14.4) return "huedanang";
    return "all";
  }

  function makeParticle(lat, lon, h, reg, R) {
    return {
      lat, lon, h, reg,
      r: R(), ph: R() * Math.PI * 2,
      m: reg === "north" ? 1 : 0, onAt: -1,
      sx: gauss(R) * 9, sy: gauss(R) * 9, sz: gauss(R) * 6,
      delay: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 0.9 + R() * 0.3
    };
  }

  function build(n, seed) {
    const R = mulberry32(seed);
    const P = [];
    let guard = 0;
    while (P.length < n && guard++ < n * 30) {
      const lat = LAT_MIN + R() * (LAT_MAX - LAT_MIN);
      const lon = LON_MIN + R() * (LON_MAX - LON_MIN);
      const [w, e] = edgesAt(lat);
      if (lon < w || lon > e) continue;
      P.push(makeParticle(lat, lon, relief(lat, lon, w, e) + R() * 0.06, region(lat, lon), R));
    }
    for (const isl of ISLANDS) {
      for (let c = 0; c < isl.clumps; c++) {
        const cl = isl.lat + gauss(R) * isl.sy * 0.5;
        const cn = isl.lon + gauss(R) * isl.sx * 0.5;
        for (let k = 0; k < isl.per; k++) {
          P.push(makeParticle(cl + gauss(R) * 0.06, cn + gauss(R) * 0.06, 0.02, "island", R));
        }
      }
    }
    return P;
  }

  // ---------- Màu ----------
  function parseColor(str, fallback) {
    const s = (str || "").trim();
    let m = s.match(/^#([0-9a-f]{6})$/i);
    if (m) {
      const n = parseInt(m[1], 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    m = s.match(/^#([0-9a-f]{3})$/i);
    if (m) return m[1].split("").map((c) => parseInt(c + c, 16));
    m = s.match(/rgba?\(([^)]+)\)/i);
    if (m) return m[1].split(",").slice(0, 3).map((v) => parseFloat(v));
    return fallback;
  }
  const mix = (a, b, t) => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
  const rgb = (c, a) => (a == null ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${a})`);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

  function create(canvas, options) {
    const opts = Object.assign({}, VARIANTS[(options && options.variant) || "panel"], options || {});
    const ctx = canvas.getContext("2d");
    const P = build(opts.count, 1975);
    const state = { active: -1, pin: null, embers: 0, unify: 0, libIdx: {} };
    let W = 0, H = 0, dpr = 1, S = 1;
    let running = false, raf = 0, t0 = performance.now();
    let gap = 0.9;
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    let lastNow = performance.now();
    let C = {};
    let PAL_SOUTH = [], PAL_EMBER = [];

    function refreshColors() {
      const cs = getComputedStyle(canvas);
      const v = (name, fb) => parseColor(cs.getPropertyValue(name), fb);
      C = {
        north: v("--land-north", [179, 38, 30]),
        south: v("--land-south", [156, 142, 122]),
        ember: v("--land-ember", [224, 162, 31]),
        island: v("--land-island", [183, 130, 26]),
        line: v("--land-line", [61, 111, 145]),
        label: v("--land-label", [75, 65, 55]),
        pin: v("--land-pin", [28, 23, 18]),
        halo: v("--land-halo", null),
        font: cs.getPropertyValue("--font-body").trim() || "system-ui, sans-serif",
        mono: cs.getPropertyValue("--font-mono").trim() || "ui-monospace, monospace"
      };
      // Bảng màu lượng tử hóa để vẽ nhanh
      PAL_SOUTH = [];
      PAL_EMBER = [];
      for (let i = 0; i <= 16; i++) {
        PAL_SOUTH.push(rgb(mix(C.south, C.north, i / 16)));
        PAL_EMBER.push(rgb(mix(C.south, C.ember, i / 16)));
      }
      draw(performance.now());
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      S = Math.min(W / 13.4, H / 16.2) * opts.zoom;
      opts._cx = opts.cx;
      // Bố cục tùy chỉnh (vd: phần mở đầu chừa chỗ cho chữ bên trái)
      const fit = typeof opts.fit === "function" ? opts.fit(W, H) : null;
      if (fit) {
        S = fit.S;
        opts._cx = fit.cx;
      }
      draw(performance.now());
    }

    // Phép chiếu 3D → 2D
    let cyaw = 1, syaw = 0, cp = 1, sp = 0, ox = 0, oy = 0;
    const F = 30;
    function project(x, y, z, out) {
      const x1 = x * cyaw + z * syaw;
      const z1 = -x * syaw + z * cyaw;
      const y2 = y * cp + z1 * sp;
      const z2 = -y * sp + z1 * cp;
      const k = F / (F - z2);
      out.x = ox + x1 * S * k;
      out.y = oy - y2 * S * k;
      out.k = k;
      return out;
    }
    const geo = (lat, lon, h, g) => [
      (lon - LON0) * KX,
      lat - LAT0 + (g ? (lat >= LAT_SPLIT ? 1 : -1) * gap * 0.5 : 0),
      (h || 0) * 0.9
    ];

    function draw(now) {
      if (!W) return;
      const reduced = reducedMQ.matches;
      const t = (now - t0) / 1000;
      // Nội suy theo thời gian thực (không phụ thuộc tốc độ khung hình)
      const dt = Math.max(0, (now - lastNow) / 1000);
      lastNow = now;
      const ease = (rate) => (reduced ? 1 : 1 - Math.exp(-dt * rate));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Camera
      mx += (tmx - mx) * ease(3);
      my += (tmy - my) * ease(3);
      const sway = reduced ? 0 : Math.sin(t * 0.22) * 0.26;
      const yaw = opts.yaw + sway + mx * 0.3;
      const pitch = opts.pitch + my * 0.12;
      cyaw = Math.cos(yaw); syaw = Math.sin(yaw);
      cp = Math.cos(pitch); sp = Math.sin(pitch);
      ox = W * opts._cx;
      oy = H * opts.cy;

      // Khe vĩ tuyến 17
      const gapTarget = state.unify ? 0 : 0.9;
      gap += (gapTarget - gap) * ease(2.2);

      const introT = opts.intro && !reduced ? t : 99;
      const dot = Math.max(1.4, S * 0.06);
      const embers = state.embers || 0;
      const pt = { x: 0, y: 0, k: 1 };
      const kMix = ease(4.4);

      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        // Mục tiêu màu (giải phóng / thống nhất)
        if (p.reg !== "north" && p.reg !== "island") {
          const li = state.libIdx[p.reg];
          const want = state.unify || (li != null && state.active >= li);
          if (want && p.onAt < 0) {
            const wave = p.reg === "all" || state.unify ? clamp((LAT_SPLIT - p.lat) / 8.4, 0, 1) * 1700 : p.r * 500;
            p.onAt = now + (reduced ? 0 : wave);
          } else if (!want) p.onAt = -1;
          const target = p.onAt >= 0 && now >= p.onAt ? 1 : 0;
          p.m += (target - p.m) * kMix;
        }

        let [x, y, z] = geo(p.lat, p.lon, p.h, true);
        if (introT < 3) {
          const k = easeOut(clamp((introT - p.delay) / 1.4, 0, 1));
          x = p.sx + (x - p.sx) * k;
          y = p.sy + (y - p.sy) * k;
          z = p.sz + (z - p.sz) * k;
        }
        project(x, y, z, pt);
        const size = dot * pt.k * (p.reg === "island" ? 0.9 : 1);

        let style;
        if (p.reg === "north") style = PAL_SOUTH[16];
        else if (p.reg === "island") style = rgb(C.island);
        else {
          const lib = p.m;
          if (lib < 0.5 && p.r < embers) {
            const fl = reduced ? 0.8 : 0.5 + 0.5 * Math.sin(t * (1.6 + p.r * 9) + p.ph);
            style = PAL_EMBER[Math.round(fl * 16)];
          } else style = PAL_SOUTH[Math.round(lib * 16)];
        }
        ctx.fillStyle = style;
        ctx.fillRect(pt.x - size / 2, pt.y - size / 2, size, size);
      }

      const introDone = introT > 2.2;
      if (introDone) drawOverlays(now, t, pt);
    }

    function label(text, x, y, opt) {
      const o = Object.assign({ size: 11, color: C.label, alpha: 0.85, align: "left", font: C.mono, weight: 600, spacing: 1 }, opt || {});
      ctx.save();
      ctx.globalAlpha = o.alpha;
      ctx.fillStyle = rgb(o.color);
      ctx.font = `${o.weight} ${o.size}px ${o.font}`;
      ctx.textAlign = o.align;
      ctx.textBaseline = "middle";
      if ("letterSpacing" in ctx) ctx.letterSpacing = o.spacing + "px";
      // Viền chữ cùng màu nền tờ giấy để nhãn không lẫn vào lớp hạt
      if (C.halo && !o.noHalo) {
        ctx.lineJoin = "round";
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = rgb(C.halo, 0.9);
        ctx.strokeText(text, x, y);
      }
      ctx.fillText(text, x, y);
      ctx.restore();
    }

    function drawOverlays(now, t, pt) {
      const small = W < 420;
      // Vĩ tuyến 17
      const la = clamp(gap / 0.9, 0, 1);
      if (la > 0.02) {
        const a = project(...geo(LAT_SPLIT, 104.9, 0, false), { x: 0, y: 0, k: 1 });
        const b = project(...geo(LAT_SPLIT, 110.6, 0, false), { x: 0, y: 0, k: 1 });
        ctx.save();
        ctx.globalAlpha = la;
        ctx.strokeStyle = rgb(C.line);
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 5]);
        ctx.lineDashOffset = reducedMQ.matches ? 0 : -t * 12;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();
        label("VĨ TUYẾN 17", b.x + 8, b.y - 7, { color: C.line, alpha: la, size: small ? 9 : 11, weight: 700, spacing: 1.5 });
        label("Sông Bến Hải", b.x + 8, b.y + 8, { color: C.line, alpha: la * 0.85, size: small ? 9 : 10, font: C.font, weight: 500, spacing: 0 });
      }

      // Biển Đông & quần đảo
      const bd = project(...geo(13.6, 111.3, 0, true), { x: 0, y: 0, k: 1 });
      label("BIỂN ĐÔNG", bd.x, bd.y, { align: "center", alpha: 0.32, size: small ? 9 : 12, spacing: 5, weight: 500 });
      for (const isl of ISLANDS) {
        // Hoàng Sa: nhãn dưới cụm đảo; Trường Sa: nhãn trên cụm đảo (tránh mép dưới khung)
        const dy = isl.lat > LAT_SPLIT - 2 ? -(isl.sy * 1.15 + 0.2) : isl.sy * 1.7 + 0.5;
        const q = project(...geo(isl.lat + dy, isl.lon, 0, true), { x: 0, y: 0, k: 1 });
        const fs = small ? 8 : 9.5;
        ctx.font = `600 ${fs}px ${C.mono}`;
        const half = (ctx.measureText(isl.name).width + isl.name.length) / 2 + 4;
        label(isl.name, clamp(q.x, half, W - half), q.y, { align: "center", alpha: 0.6, size: fs, color: C.island, spacing: 1 });
      }

      // Thành phố
      if (opts.cities) {
        for (const c of CITIES) {
          const q = project(...geo(c.lat, c.lon, 0.15, true), { x: 0, y: 0, k: 1 });
          ctx.save();
          ctx.fillStyle = rgb(C.pin);
          ctx.globalAlpha = 0.85;
          ctx.translate(q.x, q.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-3, -3, 6, 6);
          ctx.restore();
          label(c.name, q.x - 9, q.y, { align: "right", font: C.font, size: small ? 9.5 : 11, weight: 600, spacing: 0, color: C.pin, alpha: 0.8 });
        }
      }

      // Ghim sự kiện hiện tại
      if (opts.pins && state.pin) {
        if (state.pin.offmap) {
          // Tên địa điểm đã hiện ở nhãn góc trái; ở đây chỉ ghi chú sự kiện ngoài lãnh thổ
          label("↗ Diễn ra ngoài lãnh thổ", W - 18, 25, { align: "right", font: C.font, size: 11, weight: 600, spacing: 0, color: C.ember, alpha: 0.9 });
        } else {
          const base = project(...geo(state.pin.lat, state.pin.lon, 0.2, true), { x: 0, y: 0, k: 1 });
          const top = project(...geo(state.pin.lat, state.pin.lon, 2.4, true), { x: 0, y: 0, k: 1 });
          const pulse = reducedMQ.matches ? 0.6 : (t * 0.9) % 1;
          ctx.save();
          ctx.strokeStyle = rgb(C.north);
          ctx.globalAlpha = 1 - pulse;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(base.x, base.y, 6 + pulse * 22, (6 + pulse * 22) * 0.55, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = rgb(C.pin);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(base.x, base.y);
          ctx.lineTo(top.x, top.y);
          ctx.stroke();
          ctx.fillStyle = rgb(C.north);
          ctx.beginPath();
          ctx.arc(top.x, top.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          // nhãn
          ctx.font = `700 12px ${C.font}`;
          const tw = ctx.measureText(state.pin.name).width;
          const bx = clamp(top.x + 8, 4, W - tw - 20), by = top.y - 12;
          ctx.fillStyle = rgb(C.pin);
          ctx.globalAlpha = 0.92;
          ctx.fillRect(bx, by - 2, tw + 14, 22);
          ctx.restore();
          label(state.pin.name, bx + 7, by + 9, { font: C.font, size: 12, weight: 700, spacing: 0, color: invert(C.pin), alpha: 1, noHalo: true });
        }
      }
    }

    function invert(c) {
      const lum = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
      return lum > 140 ? [20, 16, 12] : [245, 238, 225];
    }

    function loop(now) {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    }
    let introPlayed = false;
    function start() {
      if (running) return;
      running = true;
      lastNow = performance.now();
      // Hiệu ứng ghép hạt chỉ chạy lần đầu canvas thật sự hiện ra (vd: khi mở tab Dòng thời gian)
      if (opts.intro && !introPlayed && W > 2) {
        t0 = lastNow;
        introPlayed = true;
      }
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Chỉ chạy khi canvas đang hiển thị
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting && !document.hidden ? start() : stop())),
      { threshold: 0.01 }
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else {
        const r = canvas.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) start();
      }
    });

    window.addEventListener(
      "pointermove",
      (e) => {
        tmx = clamp((e.clientX / innerWidth) * 2 - 1, -1, 1);
        tmy = clamp((e.clientY / innerHeight) * 2 - 1, -1, 1);
      },
      { passive: true }
    );

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    refreshColors();
    resize();

    return {
      setState(next) {
        Object.assign(state, next);
        if (!running) draw(performance.now());
      },
      refreshColors,
      get state() {
        return state;
      }
    };
  }

  window.Land3D = { create };
})();
