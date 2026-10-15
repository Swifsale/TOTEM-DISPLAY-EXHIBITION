/* =========================================================================
   SWIF ASIA — Totem Display · SCRIPT
   Tiga mode dalam satu halaman (tanpa reload):
     home     → HOME_PAGES berulang otomatis (15 detik / halaman)
     products → MAIN PRODUCT (menu kategori)
     detail   → PAGE 3D VIEW (model 3D, statistik, penjelasan bergulir)
   Butuh data.js (CONFIG, HOME_PAGES, CLIENTS, PRODUCT_CATEGORIES, PAGE_BG).
   ========================================================================= */
"use strict";

/* ===========================================================================
   LoopController — aturan looping & sentuhan (tanpa DOM, bisa dites sendiri)
   - 1 halaman = pageMs, lalu pindah otomatis.
   - Sentuhan → loop berhenti holdMs (masa penjelasan ke customer).
   - Selama immuneMs pertama setelah sentuhan, sentuhan lain DIABAIKAN (anti error).
   - Sentuhan setelah immuneMs tapi masih di dalam holdMs → counter kembali 0,
     hitung ulang holdMs penuh (dan immunity berlaku lagi).
   - Setelah holdMs tanpa sentuhan → loop jalan lagi (halaman yang sedang tampil).
   =========================================================================== */
class LoopController {
  constructor(o) {
    this.pageMs = o.pageMs; this.holdMs = o.holdMs; this.immuneMs = o.immuneMs;
    this.reset(o.now || 0);
  }
  reset(now) { this.pageStart = now; this.holdUntil = 0; this.touchedAt = 0; this.frozen = 0; }
  /** Dipanggil saat halaman berganti manual (BACK / NEXT / tab). */
  pageChanged(now) { this.pageStart = now; if (this.holdUntil) this.frozen = 0; }
  /** @returns {boolean} true bila sentuhan dihitung (memulai / mereset hold). */
  touch(now) {
    if (this.holdUntil && now - this.touchedAt < this.immuneMs) return false;   // immunity
    if (!this.holdUntil) this.frozen = Math.min(1, (now - this.pageStart) / this.pageMs);
    this.touchedAt = now;
    this.holdUntil = now + this.holdMs;
    return true;
  }
  /** @returns {{advance:boolean, holding:boolean, holdLeft:number, progress:number}} */
  tick(now) {
    if (this.holdUntil) {
      if (now < this.holdUntil) return { advance: false, holding: true, holdLeft: this.holdUntil - now, progress: this.frozen };
      this.holdUntil = 0; this.pageStart = now;                                  // hold selesai → loop jalan lagi
    }
    const el = now - this.pageStart;
    if (el >= this.pageMs) { this.pageStart = now; return { advance: true, holding: false, holdLeft: 0, progress: 0 }; }
    return { advance: false, holding: false, holdLeft: 0, progress: el / this.pageMs };
  }
}

/* ===========================================================================
   Util
   =========================================================================== */
const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const attr = esc;

const PAGE_GEO = {
  home:     { bc: 950, diff: 90,  ry: 1100 },
  pillar:   { bc: 830, diff: 140, ry: 614 },
  why:      { bc: 830, diff: 140, ry: 614 },
  products: { bc: 680, diff: 120, ry: 526 },
};
function geoVars(g) {
  const k = 1 - g.diff / g.ry, rx = 540 / Math.sqrt(1 - k * k);
  return `--bc:${g.bc}px;--ry:${g.ry}px;--rx:${rx.toFixed(1)}px;--cy:${g.bc - g.ry}px`;
}
function bgVars(bg) {
  if (!bg || !bg.photo) return "";
  return `--photo:url('${attr(bg.photo)}');--photo-op:${bg.opacity == null ? 0.24 : bg.opacity};--photo-pos:${attr(bg.pos || "center")}`;
}
const BG_HTML = '<i class="blob b1"></i><i class="blob b2"></i><i class="ring"></i><i class="ribbon"></i>' +
  '<i class="w w3"></i><i class="w w2"></i><i class="w w1"></i><i class="w main"></i><i class="photo"></i><i class="glow"></i>';
const logoHTML = () =>
  `<div class="logo"><img src="${attr(CONFIG.LOGO_IMAGE)}" alt="PT SWIF Asia" onerror="this.parentNode.classList.add('fb')"><b>SWIF</b></div>`;
const imgHTML = (src) => (src ? `<img src="${attr(src)}" alt="" onerror="this.style.display='none'">` : "");
function qrBox() {
  return `<div class="qrbox">${CONFIG.QR_IMAGE ? `<img src="${attr(CONFIG.QR_IMAGE)}" alt="QR" onerror="this.parentNode.textContent='QR'">` : "QR"}</div>`;
}
function qrCard() { return `<div class="qrc">${qrBox()}<small>SCAN WEBSITE</small></div>`; }
function qrRow() {
  return `<div class="qrrow">${qrBox()}<div class="tx"><b>SCAN</b><i>WEBSITE UTAMA</i><span>${esc(CONFIG.WEBSITE_LABEL)}</span></div></div>`;
}
function titleWithLast(words, cls) {            // kata terakhir berwarna merah
  const parts = String(words).split(" ");
  const last = parts.pop();
  return (parts.length ? esc(parts.join(" ")) + " " : "") + `<em${cls ? ` class="${cls}"` : ""}>${esc(last)}</em>`;
}

/* ===========================================================================
   HOME — render halaman
   =========================================================================== */
function mediaHTML(m) {
  m = m || {};
  if (m.video) {
    return `<video src="${attr(m.video)}" ${m.image ? `poster="${attr(m.image)}"` : ""} autoplay muted loop playsinline preload="auto"></video>`;
  }
  return imgHTML(m.image);
}
function cardHTML(c, grow) {
  const pic = c.img ? `<div class="pic${c.photo ? " photo" : ""}">${imgHTML(c.img)}</div>` : "";
  return `<div class="card${grow ? " grow" : ""}${c.img ? "" : " pad28"}">${pic}
    <div class="txt"><div class="hd"><span class="bdg c-${attr(c.color)}">${esc(c.letter)}</span><b>${esc(c.title)}</b></div><p>${esc(c.desc)}</p></div></div>`;
}
function homeBody(p) {
  const pil = p.pillars.map((x) =>
    `<div class="pil"><span class="ico c-${attr(x.color)}">${x.icon ? `<img src="${attr(x.icon)}" alt="" onerror="this.remove()">` : ""}</span><b>${esc(x.label)}</b></div>`).join("");
  return `<div class="hcard"><div class="media" id="homeMedia">${mediaHTML(p.media)}</div><div class="pillars">${pil}</div></div>
    <div class="row"><button class="cta" data-act="products"><span class="ct"><b>${esc(p.cta.label)}</b><em class="sb">${esc(p.cta.sub)}</em></span><i>→</i></button>${qrCard()}</div>`;
}
function pillarBody(p) {
  let h = p.cards.map((c) => cardHTML(c, !!c.img)).join("");
  if (p.stat) {
    const s = p.stat;
    h += `<div class="band"><div><div class="k">${esc(s.label)}</div><div class="big">${esc(s.from)} → ${esc(s.to)}</div><div class="u">${esc(s.unit)}</div></div>
      <div class="r"><div class="pc">${esc(s.percent)}</div><div class="pl">${esc(s.percentLabel)}</div></div></div>`;
    if (s.note) h += `<p class="note">${esc(s.note)}</p>`;
  }
  if (p.quote) {
    const q = p.quote;
    h += `<div class="quote"><div class="k">${esc(q.label)}</div><div class="q">${esc(q.pre)}<em>${esc(q.em)}</em>${esc(q.post)}</div></div>`;
  }
  return h;
}
function whyBody(p) {
  const photos = (p.photos || []).map((u, i) => `<div class="sl${i === 0 ? " on" : ""}" style="background-image:url('${attr(u)}')"></div>`).join("");
  const dots = (p.photos || []).map((_, i) => `<i class="${i === 0 ? "on" : ""}"></i>`).join("");
  const pts = p.points.map((x) => `<div class="pt"><em>${esc(x.n)}</em><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div>`).join("");
  const tile = (c) => `<div class="lt">${c.logo ? `<img src="${attr(c.logo)}" alt="${attr(c.name)}" onerror="this.replaceWith(document.createTextNode('${attr(c.name).replace(/'/g, "\\'")}'))">` : esc(c.name)}</div>`;
  const half = (list) => list.concat(list).map(tile).join("");           // tiap separuh harus lebih lebar dari layar
  const fwd = CLIENTS, rev = CLIENTS.slice().reverse();
  return `<div class="slider" id="slider"><div class="ph"><b>FOTO COMPANY PROFILE</b><span>tambahkan foto di data.js (photos)</span></div>${photos}<div class="sdots">${dots}</div></div>
    <div class="pts">${pts}</div>
    <div class="trust"><div class="th"><b>DIPERCAYA OLEH</b><span>◀ SLIDING LOOP ▶</span></div>
      <div class="mq"><div class="track">${half(fwd)}${half(fwd)}</div></div>
      <div class="mq r"><div class="track">${half(rev)}${half(rev)}</div></div></div>`;
}
function pageHTML(p, i, total, tabs) {
  const geo = PAGE_GEO[p.type] || PAGE_GEO.pillar;
  const style = geoVars(geo) + ";" + bgVars(p.bg);
  let hero, body;
  if (p.type === "home") {
    const t = p.title.map((l, k) => (k === p.title.length - 1 ? `<em>${esc(l)}</em>` : esc(l))).join("<br>");
    hero = `<div class="lbl">${esc(p.label)}</div><h1>${t}</h1><div class="sub">${esc(p.subtitle)}</div>
      <div class="stats">${p.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("")}</div>`;
    body = homeBody(p);
  } else {
    const tabHTML = tabs.map((t) => `<button class="tab${t.i === i ? " on" : ""}" data-go="${t.i}">${esc(t.label)}</button>`).join("");
    hero = `<div class="lbl">${esc(p.label)}</div><h1>${esc(p.title)}</h1><div class="sub">${esc(p.subtitle)}</div><div class="tabs">${tabHTML}</div>`;
    body = p.type === "why" ? whyBody(p) : pillarBody(p);
  }
  return `<section class="pg t-${attr(p.type)}" data-i="${i}" style="${style}">
    <div class="bg">${BG_HTML}</div>
    <header class="top">${logoHTML()}<div class="pager"><b>${pad(i + 1)}</b> / ${pad(total)}</div></header>
    <div class="hero">${hero}</div><div class="body">${body}</div></section>`;
}

/* ===========================================================================
   MAIN PRODUCT & DETAIL — struktur HTML
   =========================================================================== */
function productsHTML() {
  const g = PAGE_GEO.products, bg = PAGE_BG.products;
  const tiles = PRODUCT_CATEGORIES.map((c, i) =>
    `<button class="tile${c.wide ? " wide" : ""}" data-cat="${i}">
      <div class="tp"><span class="bdg c-${attr(c.color)}">${esc(c.letter)}</span><span class="cnt">${c.products.length} ${c.wide ? "ITEM" : "MODEL"}</span></div>
      <b>${esc(c.title)}</b><p>${esc(c.sub)}</p><span class="go">LIHAT DETAIL &amp; 3D  →</span></button>`).join("");
  return `<section class="pg on" style="${geoVars(g)};${bgVars(bg)}">
    <div class="bg">${BG_HTML}</div>
    <header class="top">${logoHTML()}<div class="tagpill">PRODUK</div></header>
    <div class="hero"><div class="lbl">PT. SWIF ASIA</div><h1>MAIN <em>PRODUCT</em></h1>
      <div class="sub">Pilih kategori untuk melihat penjelasan detail dan 3D live view.</div></div>
    <div class="body"><div class="tiles">${tiles}</div></div>
    <footer class="pfoot"><div class="grp"><button class="btn back" data-act="back"><span>←</span>KEMBALI</button><button class="btn home" data-act="home">HOME</button></div>${qrRow()}</footer>
  </section>`;
}
function detailHTML() {
  const bg = PAGE_BG.detail;
  return `<div class="dbg" style="${bgVars(bg)}">${bg && bg.photo ? '<i class="photo"></i>' : ""}<i class="g1"></i><i class="g2"></i>
      <i class="rg" style="width:900px;height:900px"></i><i class="rg r2" style="width:1250px;height:1250px"></i><i class="rg" style="width:1600px;height:1600px"></i>
      <i class="nn" style="--c:#2F7BFF;left:-420px;top:1180px"></i><i class="nn" style="--c:#F2A93B;left:-300px;top:1620px;opacity:.35"></i><i class="nn" style="--c:#FF3B41;left:-200px;top:1500px;opacity:.4"></i></div>
    <header class="top">${logoHTML()}<div class="tagpill">3D VIEW</div></header>
    <div class="dtitle"><div class="lbl" id="dCat"></div><h1 id="dName"></h1></div>
    <div class="dstage" id="dStage">
      <i class="spot"></i><i class="rn a"></i><i class="rn b"></i><i class="rn c"></i>
      <div class="dview" id="dView"><img class="dimg" id="dImg" alt=""></div>
      <i class="br tl"></i><i class="br tr"></i><i class="br bl"></i><i class="br brr"></i>
      <div class="hud" id="hudLive"><span class="dot"></span>3D LIVE VIEW</div>
      <div class="hud" id="hudRot">↻ 360°</div>
      <div class="hud" id="hudNo">MODEL 3D SEGERA HADIR</div>
      <div class="hud" id="hudIso">KEMBALI KE ISOMETRIC SETELAH ${Math.round(CONFIG.ISO_RESET_MS / 1000)} DETIK</div>
      <div class="dstats" id="dStats"></div>
    </div>
    <div class="dpick" id="dPick"></div>
    <div class="dtext"><div class="dh"><b>PENJELASAN DETAIL PRODUK</b><span>AUTO-SCROLL ↓</span></div>
      <div class="win" id="dWin"><div class="scroll" id="dScroll"></div><i class="fade t"></i><i class="fade b"></i><div class="bar"><i id="dThumb"></i></div></div></div>
    <footer class="dfoot"><div class="grp">
      <button class="btn back dk" data-act="back"><span>←</span>KEMBALI</button><button class="btn home dk" data-act="home">HOME</button></div>${qrRow()}</footer>`;
}

/* ===========================================================================
   STATE & NAVIGASI
   =========================================================================== */
const S = { mode: "home", cur: 0, lastHome: 0, cat: 0, prod: 0, touchAt: 0 };
let loop = null, els = {};

function setMode(m) {
  S.mode = m;
  ["home", "products", "detail"].forEach((id) => els[id].classList.toggle("on", id === m));
  if (m === "detail") startRender(); else stopRender();
  syncMedia();
}
function showHome(i) {
  const n = HOME_PAGES.length;
  S.cur = ((i % n) + n) % n;
  els.pages.forEach((p, k) => p.classList.toggle("on", k === S.cur));
  [...els.segs.children].forEach((s, k) => { s.classList.toggle("on", k === S.cur); s.firstChild.style.width = k === S.cur ? "0%" : ""; });
  els.nav.classList.toggle("first", S.cur === 0);
  if (S.mode !== "home") { setMode("home"); loop.reset(Date.now()); }
  else loop.pageChanged(Date.now());
  S.lastHome = S.cur;
  syncMedia();
}
function goHomeBegin() { showHome(0); loop.reset(Date.now()); }
function openProducts() { setMode("products"); }
function backFromProducts() { showHome(S.lastHome); loop.reset(Date.now()); }
function openDetail(ci, pj) {
  S.cat = ci; S.prod = pj || 0;
  const cat = PRODUCT_CATEGORIES[ci];
  $("#dCat").textContent = `${cat.title}  ·  PAGE 3D VIEW`;
  $("#dPick").innerHTML = cat.products.map((p, j) => `<button class="pk" data-prod="${j}">${esc(p.short || p.name)}</button>`).join("");
  setMode("detail");
  selectProduct(S.prod);
}
function $(s, r) { return (r || document).querySelector(s); }

/** Video container pertama: mainkan hanya saat halaman home 0 tampil. */
function syncMedia() {
  const v = document.querySelector("#homeMedia video");
  if (!v) return;
  const visible = S.mode === "home" && S.cur === 0;
  if (visible) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } else v.pause();
}

/* ---- tick UI home (100 ms) ---- */
function uiTick() {
  const now = Date.now();
  if (S.mode === "home") {
    const r = loop.tick(now);
    if (r.advance) { showHome(S.cur + 1); }
    const seg = els.segs.children[S.cur];
    if (seg) seg.firstChild.style.width = Math.round((r.holding ? r.progress : r.progress) * 100) + "%";
    els.nav.classList.toggle("hold", r.holding);
    els.cap.textContent = r.holding
      ? `MODE PENJELASAN  ·  LOOP LANJUT ${Math.ceil(r.holdLeft / 1000)} DETIK`
      : `${Math.round(CONFIG.PAGE_MS / 1000)} DETIK / HALAMAN  ·  SENTUH = JEDA ${Math.round(CONFIG.HOLD_MS / 1000)} DETIK`;
    // slider foto (Why SWIFA)
    if (HOME_PAGES[S.cur].type === "why") sliderTick(now);
  } else if (CONFIG.DETAIL_IDLE_MS && now - S.touchAt > CONFIG.DETAIL_IDLE_MS) {
    goHomeBegin();
  }
}
let sliderAt = 0;
function sliderTick(now) {
  const sl = document.querySelectorAll("#slider .sl");
  if (sl.length < 2 || now - sliderAt < CONFIG.SLIDER_MS) return;
  sliderAt = now;
  const dots = document.querySelectorAll("#slider .sdots i");
  let k = [...sl].findIndex((e) => e.classList.contains("on"));
  sl[k].classList.remove("on"); dots[k].classList.remove("on");
  k = (k + 1) % sl.length; sl[k].classList.add("on"); dots[k].classList.add("on");
}

/* ===========================================================================
   DETAIL — pilih produk, statistik, teks bergulir
   =========================================================================== */
const SC = { pos: 0, wait: 1.5, max: 0 };
function selectProduct(j) {
  const cat = PRODUCT_CATEGORIES[S.cat], p = cat.products[j];
  S.prod = j;
  document.querySelectorAll("#dPick .pk").forEach((b, k) => b.classList.toggle("sel", k === j));
  $("#dName").innerHTML = titleWithLast(String(p.name).toUpperCase());
  // statistik di dalam container 3D
  const specs = (p.specs || []).slice(0, 4);
  const stage = $("#dStage");
  stage.classList.toggle("nostats", !specs.length);
  $("#dStats").style.gridTemplateColumns = `repeat(${Math.max(1, specs.length)},1fr)`;
  $("#dStats").innerHTML = specs.map((s) => `<div class="dstat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
  // teks penjelasan
  const paras = p.detail && p.detail.length ? p.detail : [p.desc];
  $("#dScroll").innerHTML = paras.map((t) => `<p>${esc(t)}</p>`).join("");
  SC.pos = 0; SC.wait = 1.5; applyScroll();
  requestAnimationFrame(measureScroll);
  setModel(p);
}
function measureScroll() {
  SC.max = Math.max(0, $("#dScroll").offsetHeight - $("#dWin").clientHeight);
  $(".win .bar").style.display = SC.max > 4 ? "" : "none";
}
function applyScroll() {
  $("#dScroll").style.transform = `translateY(${(-SC.pos).toFixed(1)}px)`;
  const barH = $(".win .bar").clientHeight;
  $("#dThumb").style.top = (SC.max > 0 ? (barH - 60) * (SC.pos / SC.max) : 0).toFixed(1) + "px";
}
/** Teks bergulir pelan; diam sebentar di ujung bawah, lalu kembali ke atas. */
function scrollTick(dt) {
  if (SC.max <= 4) return;
  if (SC.wait > 0) {
    SC.wait -= dt;
    if (SC.wait <= 0 && SC.pos >= SC.max) { SC.pos = 0; SC.wait = 1.5; applyScroll(); }
    return;
  }
  SC.pos = Math.min(SC.max, SC.pos + CONFIG.SCROLL_SPEED * dt);
  if (SC.pos >= SC.max) SC.wait = 2.5;
  applyScroll();
}

/* ===========================================================================
   THREE.JS VIEWER (satu renderer dipakai bergantian)
   =========================================================================== */
const V = { ok: false, token: 0, cache: {}, group: null, rotY: 0, rotX: 0, auto: true, drag: false, lastInt: 0, raf: 0, last: 0, scale: 1 };
const ISO = { y: Math.PI / 4, x: -0.35 };

function initViewer() {
  if (!window.THREE) return false;
  const r = (V.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }));
  r.outputEncoding = THREE.sRGBEncoding;
  V.scene = new THREE.Scene();
  V.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  V.camera.position.set(0, 1.2, 6.4); V.camera.lookAt(0, 0.1, 0);
  V.scene.add(new THREE.AmbientLight(0xdce4ef, 0.75));
  const key = new THREE.DirectionalLight(0xffffff, 0.95); key.position.set(4, 6, 5); V.scene.add(key);
  const rim = new THREE.DirectionalLight(0x93a0ae, 0.5); rim.position.set(-5, 3, -4); V.scene.add(rim);
  const ember = new THREE.PointLight(0xe2231a, 0.8, 12); ember.position.set(0, -2.2, 1.5); V.scene.add(ember);
  const el = r.domElement;
  el.addEventListener("pointerdown", (e) => { V.drag = true; V.auto = false; V.lastInt = Date.now(); V.px = e.clientX; V.py = e.clientY; el.setPointerCapture && el.setPointerCapture(e.pointerId); });
  el.addEventListener("pointermove", (e) => {
    if (!V.drag) return;
    V.rotY += ((e.clientX - V.px) / V.scale) * 0.008; V.rotX += ((e.clientY - V.py) / V.scale) * 0.005;
    V.rotX = Math.max(-0.9, Math.min(0.5, V.rotX)); V.px = e.clientX; V.py = e.clientY; V.lastInt = Date.now();
  });
  const up = () => { if (V.drag) { V.drag = false; V.lastInt = Date.now(); } };
  el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
  V.rotY = ISO.y; V.rotX = ISO.x;
  return (V.ok = true);
}
function resizeViewer() {
  const m = els.view; if (!V.ok || !m) return;
  const w = m.clientWidth, h = m.clientHeight; if (!w || !h) return;
  V.renderer.setPixelRatio(Math.min(2, Math.max(1, (window.devicePixelRatio || 1) * V.scale)));
  V.renderer.setSize(w, h, false);
  V.camera.aspect = w / h; V.camera.updateProjectionMatrix();
}
const M = {
  steel: () => new THREE.MeshStandardMaterial({ color: 0x93a0ae, metalness: 0.75, roughness: 0.32 }),
  dark: () => new THREE.MeshStandardMaterial({ color: 0x22282a, metalness: 0.4, roughness: 0.55 }),
  ink: () => new THREE.MeshStandardMaterial({ color: 0x141a16, metalness: 0.3, roughness: 0.7 }),
  red: () => new THREE.MeshStandardMaterial({ color: 0xe2231a, metalness: 0.45, roughness: 0.4 }),
  glow: () => new THREE.MeshStandardMaterial({ color: 0xff4b3e, emissive: 0xe2231a, emissiveIntensity: 0.9, roughness: 0.5 }),
};
function buildPlaceholder() {
  const g = new THREE.Group(), mesh = (geo, mat) => new THREE.Mesh(geo, mat);
  g.add(mesh(new THREE.CylinderGeometry(1.05, 0.8, 1.9, 36), M.dark()));
  const lip = mesh(new THREE.TorusGeometry(1.05, 0.1, 12, 40), M.steel()); lip.rotation.x = Math.PI / 2; lip.position.y = 0.95; g.add(lip);
  const glow = mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 36), M.glow()); glow.position.y = 0.82; g.add(glow);
  for (let i = 0; i < 4; i++) { const c = mesh(new THREE.TorusGeometry(1.0 - 0.05 * i, 0.06, 10, 36), M.red()); c.rotation.x = Math.PI / 2; c.position.y = 0.4 - 0.45 * i; g.add(c); }
  const base = mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.25, 36), M.ink()); base.position.y = -1.15; g.add(base);
  g.userData.disposable = true; return g;
}
let gltfLoader = null;
function getGLTFLoader() {
  if (gltfLoader) return gltfLoader;
  gltfLoader = new THREE.GLTFLoader();
  if (THREE.DRACOLoader) { const d = new THREE.DRACOLoader(); d.setDecoderPath(CONFIG.DRACO_PATH); gltfLoader.setDRACOLoader(d); }
  return gltfLoader;
}
function normalizeObject(obj) {
  const box = new THREE.Box3().setFromObject(obj), size = box.getSize(new THREE.Vector3());
  obj.scale.setScalar(2.6 / (Math.max(size.x, size.y, size.z) || 1));
  box.setFromObject(obj); obj.position.sub(box.getCenter(new THREE.Vector3()));
  const wrap = new THREE.Group(); wrap.add(obj); return wrap;     // pusat model = pusat putaran
}
function loadModel(url, rot, ok, fail) {
  const ext = (url.split(".").pop() || "").toLowerCase(), r = rot || {};
  const orient = (o) => { o.rotation.set(THREE.MathUtils.degToRad(r.x || 0), THREE.MathUtils.degToRad(r.y || 0), THREE.MathUtils.degToRad(r.z || 0)); return o; };
  const bad = (e) => { console.error("Gagal memuat model", url, e); fail(); };
  try {
    if ((ext === "glb" || ext === "gltf") && THREE.GLTFLoader) getGLTFLoader().load(url, (g) => ok(normalizeObject(orient(g.scene))), undefined, bad);
    else if (ext === "stl" && THREE.STLLoader) new THREE.STLLoader().load(url, (geo) => { geo.center(); geo.computeVertexNormals(); ok(normalizeObject(orient(new THREE.Mesh(geo, M.steel())))); }, undefined, bad);
    else if (ext === "obj" && THREE.OBJLoader) new THREE.OBJLoader().load(url, (o) => { o.traverse((c) => { if (c.isMesh) c.material = M.steel(); }); ok(normalizeObject(orient(o))); }, undefined, bad);
    else { console.warn("Format/loader tidak tersedia:", url); fail(); }
  } catch (e) { bad(e); }
}
function clearGroup() {
  if (!V.group) return;
  V.scene.remove(V.group);
  if (V.group.userData.disposable) V.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
  V.group = null;
}
function setGroup(g) { clearGroup(); V.group = g; V.scene.add(g); }

/** Tampilan model: 'model' | 'image' | 'placeholder'. Token mencegah model lama masuk ke produk baru. */
function setModel(p) {
  const my = ++V.token, stage = $("#dStage"), view = els.view, img = $("#dImg");
  const show = (state) => {
    stage.classList.toggle("nomodel", state !== "model");
    view.classList.toggle("imgmode", state === "image");
  };
  V.rotY = ISO.y; V.rotX = ISO.x; V.auto = true;
  if (!V.ok) { img.src = p.image || ""; show(p.image ? "image" : "placeholder"); return; }   // Three.js tidak tersedia
  const asImage = () => { if (my !== V.token) return; clearGroup(); if (p.image) { img.src = p.image; show("image"); } else { setGroup(buildPlaceholder()); show("placeholder"); } };
  if (!p.modelFile) { asImage(); return; }
  if (V.cache[p.modelFile]) { setGroup(V.cache[p.modelFile].clone()); show("model"); return; }
  clearGroup(); show("model");
  loadModel(p.modelFile, p.modelRotation, (obj) => {
    V.cache[p.modelFile] = obj;
    if (my !== V.token) return;                 // produk sudah berganti → simpan di cache saja
    setGroup(obj.clone()); show("model");
  }, asImage);
}
function renderFrame(t) {
  V.raf = requestAnimationFrame(renderFrame);
  const dt = Math.min(0.1, (t - (V.last || t)) / 1000); V.last = t;
  // kembali ke isometric setelah ISO_RESET_MS tanpa interaksi, lalu berputar lagi
  if (!V.auto && !V.drag && Date.now() - V.lastInt > CONFIG.ISO_RESET_MS) {
    const ty = ISO.y + Math.round((V.rotY - ISO.y) / (2 * Math.PI)) * 2 * Math.PI;
    V.rotY += (ty - V.rotY) * 0.08; V.rotX += (ISO.x - V.rotX) * 0.08;
    if (Math.abs(ty - V.rotY) < 0.01 && Math.abs(ISO.x - V.rotX) < 0.01) V.auto = true;
  }
  if (V.auto && !V.drag) V.rotY += 0.006 * dt * 60;
  if (V.group) { V.group.rotation.y = V.rotY; V.group.rotation.x = V.rotX; }
  if (V.ok) V.renderer.render(V.scene, V.camera);
  scrollTick(dt);
}
function startRender() {
  if (V.ok && V.renderer.domElement.parentNode !== els.view) els.view.insertBefore(V.renderer.domElement, els.view.firstChild);
  resizeViewer(); measureScroll();
  if (!V.raf) { V.last = 0; V.raf = requestAnimationFrame(renderFrame); }
}
function stopRender() { if (V.raf) { cancelAnimationFrame(V.raf); V.raf = 0; } }

/* ===========================================================================
   Skala layar, input global, start
   =========================================================================== */
function rescale() {
  V.scale = Math.min(innerWidth / 1080, innerHeight / 1920) || 1;
  document.getElementById("fit").style.transform = `translate(-50%,-50%) scale(${V.scale})`;
  resizeViewer();
}
function onTap(e) {
  const t = e.target.closest("[data-act],[data-go],[data-cat],[data-prod]");
  if (!t) return;
  if (t.dataset.go !== undefined) return showHome(+t.dataset.go);
  if (t.dataset.cat !== undefined) return openDetail(+t.dataset.cat, 0);
  if (t.dataset.prod !== undefined) return selectProduct(+t.dataset.prod);
  const act = t.dataset.act;
  if (act === "products") return openProducts();
  if (act === "home") return goHomeBegin();
  if (act === "back") return S.mode === "detail" ? setMode("products") : S.mode === "products" ? backFromProducts() : null;
}

function start() {
  els = { home: $("#home"), products: $("#products"), detail: $("#detail"), nav: $("#nav"), segs: $("#segs"), cap: $("#cap") };
  const total = HOME_PAGES.length;
  const tabs = HOME_PAGES.map((p, i) => (p.tab ? { label: p.tab, i } : null)).filter(Boolean);
  $("#homePages").innerHTML = HOME_PAGES.map((p, i) => pageHTML(p, i, total, tabs)).join("");
  els.pages = [...document.querySelectorAll("#homePages .pg")];
  els.segs.innerHTML = HOME_PAGES.map(() => '<div class="seg"><i></i></div>').join("");
  els.products.innerHTML = productsHTML();
  els.detail.innerHTML = detailHTML();
  els.view = $("#dView");

  loop = new LoopController({ pageMs: CONFIG.PAGE_MS, holdMs: CONFIG.HOLD_MS, immuneMs: CONFIG.IMMUNE_MS, now: Date.now() });
  initViewer();

  // sentuhan di mana pun (termasuk tombol) dihitung oleh loop; urutan capture agar selalu tercatat
  addEventListener("pointerdown", () => { S.touchAt = Date.now(); if (S.mode === "home") loop.touch(Date.now()); }, true);
  document.addEventListener("click", onTap);
  $("#bBack").onclick = () => showHome(S.cur - 1);
  $("#bNext").onclick = () => showHome(S.cur + 1);
  $("#bHome").onclick = () => goHomeBegin();
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("dragstart", (e) => e.preventDefault());
  addEventListener("resize", rescale);
  rescale();

  setMode("home");
  showHome(0);
  setInterval(uiTick, 100);
}

if (typeof module !== "undefined" && module.exports) module.exports = { LoopController, pageHTML, productsHTML, detailHTML, geoVars, titleWithLast, esc };
if (typeof window !== "undefined" && typeof document !== "undefined") start();
