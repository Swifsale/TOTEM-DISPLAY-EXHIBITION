/* =========================================================================
   SWIF ASIA — Totem Display · SCRIPT
   Tiga mode dalam satu halaman (tanpa reload):
     home     → HOME_PAGES berulang otomatis (15 detik / halaman)
     products → 3D PRODUCT EXPLORER (pilih kategori & produk)
     detail   → 3D VIEW (model 3D, spesifikasi, penjelasan bergulir)
   Header & footer (HOME · BACK · 3D PRODUCT EXPLORER · NEXT) dipakai bersama.
   Butuh data.js (CONFIG, HOME_PAGES, CLIENT_LOGOS, PRODUCT_CATEGORIES).
   ========================================================================= */
"use strict";

/* ===========================================================================
   LoopController — aturan looping & sentuhan (tanpa DOM, bisa dites sendiri)
   =========================================================================== */
class LoopController {
  constructor(o) {
    this.pageMs = o.pageMs; this.holdMs = o.holdMs; this.immuneMs = o.immuneMs;
    this.reset(o.now || 0);
  }
  reset(now) { this.pageStart = now; this.holdUntil = 0; this.touchedAt = 0; this.frozen = 0; }
  pageChanged(now) { this.pageStart = now; if (this.holdUntil) this.frozen = 0; }
  touch(now) {
    if (this.holdUntil && now - this.touchedAt < this.immuneMs) return false;
    if (!this.holdUntil) this.frozen = Math.min(1, (now - this.pageStart) / this.pageMs);
    this.touchedAt = now;
    this.holdUntil = now + this.holdMs;
    return true;
  }
  tick(now) {
    if (this.holdUntil) {
      if (now < this.holdUntil) return { advance: false, holding: true, holdLeft: this.holdUntil - now, progress: this.frozen };
      this.holdUntil = 0; this.pageStart = now;
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
const bgi = (u) => (u ? `background-image:url('${attr(u)}')` : "");
function $(s, r) { return (r || document).querySelector(s); }

/* ---- Ikon garis (24×24). Nama dipakai di data.js ---- */
const ICONS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  left: '<path d="M15 5l-7 7 7 7"/>',
  right: '<path d="M9 5l7 7-7 7"/>',
  cube: '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
  fire: '<path d="M12 22c4 0 7-3 7-7 0-5-4-7-5-12-3 3-4 5-4 8-1-1-2-2-2-4-2 2-3 5-3 8 0 4 3 7 7 7z"/><path d="M12 22c-1.7 0-3-1.3-3-3 0-2 1.5-3 3-5 1.5 2 3 3 3 5 0 1.7-1.3 3-3 3z"/>',
  pump: '<rect x="2" y="8" width="12" height="9" rx="2"/><path d="M14 11h3l4-2v8l-4-2h-3M5 17v3M11 17v3M3 20h10M6 8V5h4v3"/>',
  robot: '<path d="M3 21h9M7.5 21v-3"/><circle cx="7.5" cy="16" r="2"/><path d="M8.5 14.3L11 8"/><circle cx="11.5" cy="6.5" r="2"/><path d="M13.3 5.8L18 4l3 3M21 7l-1.5 3M18 4l-.5 3.5"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  leaf: '<path d="M5 20c-1-9 5-15 15-16 1 10-5 16-14 16"/><path d="M5 20c3-6 6-9 10-11"/>',
  eco: '<path d="M2 18h4l5 2 7-3a1.5 1.5 0 0 0-1-2.8L13 15"/><path d="M6 15h5a1.5 1.5 0 0 1 0 3H9"/><path d="M14 11c0-4 2.5-6.5 7-6.5 0 4.5-2.5 6.5-7 6.5zM14 11c0-3-2-4.5-5-4.5 0 3 2 4.5 5 4.5zM14 11v4"/>',
  recycle: '<path d="M7.2 19.5H4.6a1.8 1.8 0 0 1-1.6-2.7l3.3-5.7"/><path d="M11 19.5h8.4a1.8 1.8 0 0 0 1.6-2.7l-1.7-3"/><path d="M14 22.5l-3-3 3-3"/><path d="M8.6 7.6l1.9-3.3a1.8 1.8 0 0 1 3.1 0l4.2 7.2"/><path d="M3.3 9.8l3 1.3 1.3-3"/><path d="M15.4 12.3l2.3-.8.8 3.1"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  heat: '<path d="M7 3c-1.5 2 1.5 4 0 6s1.5 4 0 6M12 3c-1.5 2 1.5 4 0 6s1.5 4 0 6M17 3c-1.5 2 1.5 4 0 6s1.5 4 0 6"/><path d="M3 20h18"/>',
  furnace: '<path d="M4 10h16l-1.5 10h-13z"/><path d="M2 10h20M9 10V7l3-3 3 3v3"/><path d="M9 15c1-1 2 1 3 0s2 1 3 0"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 15l2.5 2.5L16 13"/>',
  factory: '<path d="M2 21V10l6 4V10l6 4V6l2-3h3l1 3v15z"/><path d="M6 18h2M11 18h2M16 18h2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17.5 14.5c2.8 0 4.5 2 4.5 5"/>',
  iso: '<path d="M12 3l9.5 17h-19z"/><path d="M12 9.5l4 7.5H8z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',
  monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4M6.5 13l3.5-4 2.5 2.5L17 7"/>',
  tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  truck: '<path d="M1 5h14v11H1zM15 9h4l3 3v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  check: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 12l3 3 6-6"/>',
  power: '<path d="M18.4 6.6a9 9 0 1 1-12.8 0M12 2v10"/>',
  chart: '<path d="M3 21h18M5 21v-5M10 21v-8M15 21v-6M20 21V9"/><path d="M4 11l5-4 4 3 7-7M16 3h4v4"/>',
  pin: '<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  handshake: '<path d="M1 9l4-3 4 1M23 9l-4-3-6 2-4 4a1.5 1.5 0 0 0 2 2l3-2 5 5"/><path d="M5 6v8l5 5a1.5 1.5 0 0 0 2-2M9 16l3 3a1.5 1.5 0 0 0 2-2M12 14l3 3a1.5 1.5 0 0 0 2-2l2-1V6"/>',
  zoomin: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M11 8v6M8 11h6"/>',
  zoomout: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5M8 11h6"/>',
  rotate: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  move: '<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
  hand: '<path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V3.5a1.5 1.5 0 0 1 3 0V11M14 11V5a1.5 1.5 0 0 1 3 0v6M17 9a1.5 1.5 0 0 1 3 0v5a8 8 0 0 1-8 8h-1a7 7 0 0 1-5.6-2.8L3 16a1.6 1.6 0 0 1 2.5-2L8 16"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  layers: '<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/>',
  drop: '<path d="M12 2.5s7 7.5 7 12.5a7 7 0 0 1-14 0c0-5 7-12.5 7-12.5z"/>',
  cloud: '<path d="M7 18a5 5 0 0 1-.5-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>',
};
function ic(name, cls) {
  if (name === "flag-jp") return `<svg class="ic flag ${cls || ""}" viewBox="0 0 30 20"><rect width="30" height="20" rx="2" fill="#fff"/><circle cx="15" cy="10" r="5.6" fill="#D7001A"/></svg>`;
  return `<svg class="ic ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.cube}</svg>`;
}
const imgTag = (src, cls) => (src ? `<img class="${cls || ""}" src="${attr(src)}" alt="" onerror="this.style.visibility='hidden'">` : "");

/* ---- blok umum ---- */
function headerHTML() {
  return `<header class="top"><div class="brand"><img src="${attr(CONFIG.LOGO_IMAGE)}" alt="PT. SWIF ASIA" onerror="this.outerHTML='<b class=fbl>PT. SWIF ASIA</b>'"></div>
    <i class="sep"></i><div class="tagl"><b>${esc(CONFIG.TAGLINE)}</b><span>${esc(CONFIG.GROUP_LINE)}</span></div><i class="swoosh"></i></header>`;
}
function tagPill(no, text) { return `<div class="tagp"><b>${esc(no)}</b><span>${esc(text)}</span></div>`; }
function rib(text, cls) { return `<div class="rib ${cls || ""}"><span>${esc(text)}</span></div>`; }
function titleHTML(p) {
  const w = (p.title || []).map((l) => `<span class="w">${esc(l)}</span>`);
  const a = (p.accent || []).map((l) => `<span class="a">${esc(l)}</span>`);
  let lines;
  if (p.titleInline && w.length && a.length) lines = [...w.slice(0, -1), w[w.length - 1] + " " + a[0], ...a.slice(1)];
  else lines = [...w, ...a];
  return `<h1>${lines.join("<br>")}</h1><i class="uline"></i>`;
}
function heroHTML(p, no, cls) {
  return `<div class="hero ${cls || ""}">
      <div class="hph" style="${bgi(p.photo)}"></div><i class="hshade"></i>
      <div class="htx">${p.tag ? tagPill(no, p.tag) : ""}${titleHTML(p)}<p class="sub">${esc(p.subtitle)}</p></div>
    </div>`;
}
function slashText(t) { return `<p class="sl"><i></i>${esc(t)}</p>`; }
/* kartu bergaya "banner biru miring di atas foto" (layar 05, 07, 08) */
function bannerCard(o, extra, attrs) {
  const photos = (o.photos || [o.photo]).filter(Boolean);
  const pics = `<div class="bcp n${photos.length}">${photos.map((u) => `<div class="pp" style="${bgi(u)}"></div>`).join("")}${extra || ""}</div>`;
  return `<div class="bcard" ${attrs || ""}><div class="bch">${ic(o.icon)}<div><b>${esc(o.title)}</b><em>${esc(o.accent)}</em></div></div>
      ${pics}${slashText(o.desc)}</div>`;
}

/* ===========================================================================
   HOME — 8 layar
   =========================================================================== */
const RENDER = {
  hero(p) {
    const badges = p.badges.map((b) => `<div class="bdg">${ic(b.icon)}<span>${esc(b.text)}</span></div>`).join("<i class='vs'></i>");
    const stats = p.stats.map((s) => {
      return `<div class="st">${ic(s.icon)}<div>${s.small && s.icon === "calendar" ? `<small>${esc(s.small)}</small><b>${esc(s.value)}</b>` : `<b>${esc(s.value)}</b><small>${esc(s.small)}</small>`}</div></div>`;
    }).join("<i class='vs'></i>");
    return `<div class="hero full"><div class="hph" style="${bgi(p.photo)}"></div><i class="hshade"></i>
        <div class="htx">${titleHTML(p)}<p class="sub">${esc(p.subtitle)}</p></div>
        <div class="hbot"><div class="badges">${badges}</div><div class="stats">${stats}</div>
        <button class="cta" data-act="next"><span>${esc(p.cta)}</span>${ic("right")}</button></div></div>`;
  },

  company(p, no) {
    const photos = p.photos.map((u, i) => `<div class="sl2${i === 0 ? " on" : ""}" style="${bgi(u)}"></div>`).join("");
    const dots = p.photos.map((_, i) => `<i class="${i === 0 ? "on" : ""}"></i>`).join("");
    const pts = p.points.map((x) => `<div class="pt">${ic(x.icon)}<div><b>${esc(x.title)}</b><span>${esc(x.text)}</span></div></div>`).join("");
    return heroHTML(p, no) + `<div class="body">
        <div class="slider card" id="slider">${photos}<div class="slab">${esc(p.sliderLabel)}</div><div class="sdots">${dots}</div></div>
        <div class="pts">${pts}</div>
        <div class="trust card grow" id="trust">${rib(p.clientsLabel)}<div class="mq"><div class="track"></div></div><div class="mq r"><div class="track"></div></div></div>
      </div>`;
  },

  engineering(p, no) {
    const f = p.facility, iso = p.iso, pr = p.process;
    const fst = f.stats.map((s) => `<div class="fs">${ic(s.icon)}<b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("<i class='vs'></i>");
    const st = pr.steps.map((s, i) => `<div class="step"><em>${pad(i + 1)}</em>${ic(s.icon)}<span>${esc(s.text)}</span></div>`);
    // urutan berputar: 1-4 di atas (kiri→kanan), 5-8 di bawah (kanan→kiri)
    const top = st.slice(0, 4).join(`<i class="arr">${ic("right")}</i>`);
    const bot = st.slice(4, 8).reverse().join(`<i class="arr">${ic("left")}</i>`);
    return heroHTML(p, no, "h-eng") + `<div class="body">
        <div class="sect">${rib(f.label)}<div class="card fac"><div class="fph" style="${bgi(f.photo)}"></div><i class="vs"></i>${fst}</div></div>
        <div class="card iso"><div class="tuv">${ic("iso")}<small>${esc(iso.by)}</small></div><i class="vs"></i>
          <div class="isov">${ic("shield")}<div><b>${esc(iso.value)}</b><span>${esc(iso.label)}</span></div></div><i class="vs"></i><p>${esc(iso.note)}</p></div>
        <div class="sect grow">${rib(pr.label, "big")}<div class="card proc grow"><p class="psub">${esc(pr.sub)}</p>
          <div class="pwrap"><div class="pph" style="${bgi(pr.photo)}"></div>
            <div class="prow">${top}</div><div class="prow">${bot}</div><i class="loopL"></i><i class="loopR"></i></div></div></div>
      </div>`;
  },

  safety(p, no) {
    const rows = p.items.map((x) => `<div class="srow card"><div class="sph" style="${bgi(x.photo)}"></div>
        <div class="stx">${ic(x.icon, "red")}<i class="vs"></i><div><b>${esc(x.title)}</b><p>${esc(x.desc)}</p></div></div></div>`).join("");
    return heroHTML(p, no, "h-tall") + `<div class="body">${rows}</div>`;
  },

  solutions(p, no) {
    const cards = PRODUCT_CATEGORIES.map((c, i) =>
      bannerCard({ icon: c.icon, title: `${c.n}. ${c.title}`, accent: c.accent, photo: c.photo, desc: c.desc }, "", `data-cat="${i}"`)).join("");
    const vals = p.values.map((v) => `<div class="val">${ic(v.icon)}<b>${esc(v.title)}</b><span>${esc(v.text)}</span></div>`).join("<i class='vs'></i>");
    return heroHTML(p, no, "h-tall") + `<div class="body"><div class="grid2 grow">${cards}</div>
        <div class="sect">${rib(p.valuesLabel)}<div class="card vals">${vals}</div></div></div>`;
  },

  explorer(p, no) {
    const cats = PRODUCT_CATEGORIES.map((c, i) => `<button class="catb${i === 0 ? " on" : ""}" data-cat="${i}">${ic(c.icon)}<span>${esc(c.menu)}</span>${ic("right", "chev")}</button>`).join("");
    const v = p.preview;
    const feats = p.features.map((f) => `<div class="ft">${ic(f.icon)}<b>${esc(f.text)}</b>${f.sub ? `<small>${esc(f.sub)}</small>` : ""}</div>`).join("<i class='vs'></i>");
    return heroHTML(p, no) + `<div class="body">
        <div class="sect">${rib(p.pickLabel)}<div class="card cats">${cats}</div></div>
        <div class="viewer live grow" id="hStage">
          <div class="vtitle">${esc(v.title)}</div><div class="v3d"><span class="dot"></span><b>3D<br>LIVE</b></div>
          <div class="dview" id="hView"><img class="dimg" id="hImg" alt=""></div>
          ${toolsHTML()}
          ${v.callout ? `<div class="callout"><div class="cph" style="${bgi(v.callout.photo)}"></div><span>${esc(v.callout.text)}</span></div>` : ""}
          <button class="vlink" data-cat="${v.open.cat}" data-prod="${v.open.prod}">${esc(v.link || "LIHAT DETAIL")}${ic("right")}</button>
          <div class="vhint">${ic("hand")}GESER UNTUK MEMUTAR 3D</div>
        </div>
        <div class="sect">${rib(p.featuresLabel)}<div class="card feats">${feats}</div></div>
      </div>`;
  },

  energy(p, no) {
    const cards = p.items.map((x) => {
      let extra = "";
      if (x.chips) extra = `<div class="chips${x.chipsSide ? " side" : ""}">${x.chips.map((c, k) => `<span>${x.chipsSide ? ic(k ? "bolt" : "fire") : "<i></i>"}${esc(c)}</span>`).join("")}</div>`;
      return bannerCard(x, extra);
    }).join("");
    const c = p.commitment;
    return heroHTML(p, no, "h-green") + `<div class="body"><div class="grid2 grow">${cards}</div>
        <div class="sect">${rib(c.label, "green")}<div class="card commit">${ic("eco")}<i class="vs"></i><div><b>${esc(c.title)}</b><p>${esc(c.text)}</p></div>${ic("leaf", "big")}</div></div></div>`;
  },

  service(p, no) {
    const cards = p.items.map((x) => bannerCard(x)).join("");
    const adv = p.advantages.map((a) => `<div class="adv">${ic(a.icon)}<b>${esc(a.text)}</b><i></i></div>`).join("<i class='vs'></i>");
    const b = p.banner;
    return heroHTML(p, no) + `<div class="body"><div class="grid2 grow">${cards}</div>
        <div class="sect">${rib(p.advLabel)}<div class="card advs">${adv}</div></div>
        <div class="mitra"><div class="mph" style="${bgi(b.photo)}"></div><div class="mbx">${ic("pin")}<div><b>${esc(b.title)}<br>${esc(b.pre)}<em>${esc(b.accent)}</em></b>
          <span>${b.tags.map(esc).join("<i>|</i>")}</span></div></div></div></div>`;
  },
};

function pageHTML(p, i) {
  const r = RENDER[p.type] || RENDER.safety;
  return `<section class="pg t-${attr(p.type)}" data-i="${i}">${r(p, pad(i + 1))}</section>`;
}

/* ===========================================================================
   PRODUK UNGGULAN — hero + blok-blok (lihat FEATURED_PAGES di data.js)
   =========================================================================== */
const rich = (t) => esc(t).replace(/\*([^*]+)\*/g, "<em>$1</em>");
/** Foto, atau kotak placeholder ber-ikon bila path kosong / gagal dimuat. */
function pic(src, icon, cls) {
  return `<div class="pic ${src ? "" : "ph"} ${cls || ""}" style="${bgi(src)}">${src ? "" : ic(icon || "cube") + "<small>FOTO MENYUSUL</small>"}</div>`;
}
const checks = (arr) => (arr && arr.length ? `<ul class="chk">${arr.map((t) => `<li>${ic("check")}<span>${esc(t)}</span></li>`).join("")}</ul>` : "");
const sectWrap = (b, inner, cls) => (b.label ? `<div class="sect ${b.grow ? "grow" : ""}">${rib(b.label, b.ribbon || "")}<div class="card ${cls || ""}">${inner}</div></div>`
  : `<div class="card nolab ${cls || ""} ${b.grow ? "grow" : ""}">${inner}</div>`);

const BLOCK = {
  cards(b) {
    const cards = b.items.map((c) => {
      let vis = "";
      if (c.chart) {
        // Tinggi batang proporsional terhadap nilai terbesar; angka menempel di atas batangnya.
        const h = (v) => (v / Math.max(c.chart.from, c.chart.to)).toFixed(3);
        const bar = (v) => `<div class="trk"><b>${v}</b><i style="height:calc((100% - 28px) * ${h(v)})"></i></div>`;
        vis = `<div class="fchart"><div class="col">${bar(c.chart.from)}<small>${esc(c.chart.fromLabel)}</small></div>
          ${ic("right", "arw")}<div class="col g">${bar(c.chart.to)}<small>${esc(c.chart.toLabel)}</small></div></div>`;
      } else if (c.photo !== undefined) vis = `<div class="fvis">${pic(c.photo, c.icon)}${c.overlay ? `<b class="ovl">${esc(c.overlay)}</b>` : ""}</div>`;
      const big = c.big ? `<div class="fbig"><b>${esc(c.big)}</b><span>${esc(c.bigLabel || "")}</span>${c.note ? `<small>${esc(c.note)}</small>` : ""}</div>` : "";
      const side = big || checks(c.points);
      const below = big && c.points ? checks(c.points) : "";
      return `<div class="fcard"><div class="fch ${c.color || "blue"}">${ic(c.icon)}<b>${esc(c.title)}</b></div>
        <div class="fcb">${vis}<div class="fside">${side}</div></div>${below}</div>`;
    }).join("");
    return `<div class="sect ${b.grow ? "grow" : ""}">${rib(b.label)}<div class="fgrid">${cards}</div></div>`;
  },
  banner(b) {
    return `<div class="fban">${ic(b.icon)}<i class="vs"></i><div><b>${esc(b.text)}</b><em>${esc(b.accent)}</em></div></div>`;
  },
  stats(b) {
    return `<div class="fstats">${b.items.map((x) => `<div class="fst"><div class="v">${ic(x.icon)}<div>${x.pre ? `<small>${esc(x.pre)}</small>` : ""}<b class="${String(x.value).length > 5 ? "sm" : ""}">${esc(x.value)}</b>${x.unit ? `<small>${esc(x.unit)}</small>` : ""}</div></div>
      <span class="lb">${esc(x.label)}</span>${x.note ? `<p>${esc(x.note)}</p>` : ""}</div>`).join("")}</div>`;
  },
  process(b) {
    const st = b.steps.map((x) => `<div class="pstep">${pic(x.photo, x.icon)}<b>${esc(x.label)}</b></div>`).join(`<i class="arr">${ic("right")}</i>`);
    return sectWrap(b, `<div class="psteps">${st}</div>${b.note ? slashText(b.note) : ""}`, "fproc");
  },
  cols(b) { return `<div class="fcols ${b.grow ? "grow" : ""}">${b.items.map((x) => `<div class="fcol">${BLOCK[x.type](x)}</div>`).join("")}</div>`; },
  stack(b) { return `<div class="fstack">${b.items.map((x) => BLOCK[x.type](x)).join("")}</div>`; },
  compare(b) {
    const row = (n, lbl, cls) => `<div class="crow ${cls}"><div class="cic">${Array(n).fill(ic("factory")).join("")}</div><span>${esc(lbl)}</span></div>`;
    return sectWrap({ ...b, ribbon: "green" }, `${row(6, b.fromLabel, "a")}<div class="cval"><b>${esc(b.value)}</b><em>${esc(b.valueLabel)}</em></div>${row(2, b.toLabel, "b")}`, "fcmp");
  },
  info(b) { return `<div class="finfo">${b.items.map((x) => `<div class="card fi">${ic(x.icon)}<p>${esc(x.text)}</p></div>`).join("")}</div>`; },
  principle(b) {
    return sectWrap(b, `<div class="fpr">${pic(b.photo, b.icon)}<i class="vs"></i><div><b>${esc(b.title)}</b><p>${esc(b.text)}</p></div></div>`);
  },
  features(b) {
    const it = b.items.map((x) => `<div class="ff">${ic(x.icon)}<b>${esc(x.title)}</b>${x.value ? `<em>${esc(x.value)}</em>` : ""}<span>${esc(x.text)}</span></div>`).join("<i class='vs'></i>");
    return sectWrap(b, `<div class="ffs">${it}</div>${b.footnote ? `<p class="fnote">${esc(b.footnote)}</p>` : ""}`);
  },
  innovation(b) {
    return `<div class="sect">${rib(b.label)}<div class="finno">${ic(b.icon, "bolt")}<div class="itx"><b>${esc(b.title)}</b><em>${esc(b.accent)}</em><p>${esc(b.text)}</p></div>
      <div class="iside">${ic("leaf")}<p>${rich(b.side)}</p></div></div></div>`;
  },
  apps(b) {
    const g = b.groups.map((x) => `<div class="ag"><div class="atag">${esc(x.tag)}</div><div class="ais">${x.items.map((y) => `<div class="ai">${pic(y.photo, y.icon)}<span>${esc(y.label)}</span></div>`).join("")}</div></div>`).join("");
    return sectWrap(b, `<div class="fapps">${g}</div>`);
  },
  video(b) {
    const inner = b.video ? `<video src="${attr(b.video)}" ${b.poster ? `poster="${attr(b.poster)}"` : ""} muted loop playsinline preload="auto"></video>`
      : `<div class="vph">${ic("play")}<span>Area video akan ditambahkan</span></div>`;
    // aspect (mis. "16/9"): kotak mengikuti rasio video, tidak meregang mengisi kolom
    const ar = b.aspect ? ` style="aspect-ratio:${attr(b.aspect)}"` : "";
    return `<div class="sect ${b.grow ? "grow" : ""}">${rib(b.label, "blue")}<div class="fvid ${b.aspect ? "fixed" : ""}"${ar}>${inner}</div></div>`;
  },
  photo(b) {
    // Foto pengisi bergaya kartu; focus = posisi fokus foto (CSS background-position)
    const pos = b.focus ? `;background-position:${attr(b.focus)}` : "";
    return `<div class="sect ${b.grow ? "grow" : ""}">${rib(b.label, b.ribbon || "")}<div class="fphoto" style="${bgi(b.photo)}${pos}">${b.caption ? `<span class="fpcap">${esc(b.caption)}</span>` : ""}</div></div>`;
  },
  techinfo(b) {
    return sectWrap(b, `<div class="ftech">${b.items.map((x) => `<div class="ti">${ic(x.icon)}<div><span>${esc(x.text)}</span>${x.value ? `<b>${esc(x.value)}</b>` : ""}</div></div>`).join("<i class='vs'></i>")}</div>`);
  },
  list(b) {
    return sectWrap({ ...b, grow: true }, `<div class="flist">${b.items.map((x) => `<div class="li"><span class="ib">${ic(x.icon)}</span><div><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div></div>`).join("")}</div>`, "flistc");
  },
  eco(b) {
    return `<div class="card commit feco">${ic(b.icon)}<i class="vs"></i><div><b>${esc(b.title)}</b><p>${esc(b.text)}</p></div>${ic("leaf", "big")}</div>`;
  },
};
function insetHTML(n) {
  if (!n) return "";
  if (n.type === "principle") return `<div class="finset prin"><div class="rib blue sm"><span>${esc(n.label)}</span></div><div class="pp">${n.items.map((x) =>
    `<div class="pi ${x.tone}">${ic(x.icon)}<b>${esc(x.title)}</b><em>${esc(x.sub)}</em><span>${esc(x.text)}</span></div>`).join(`<i class="plus">+</i>`)}</div></div>`;
  if (n.type === "photo") return `<div class="finset ph2">${pic(n.photo, n.icon)}<b>${esc(n.label)}</b></div>`;
  if (n.type === "note") return `<div class="finset note"><i></i><p>${esc(n.text)}</p></div>`;
  // Kartu teks saja (tanpa foto): label kecil + judul + penjelasan singkat
  if (n.type === "text") return `<div class="finset ftext">${ic(n.icon || "cube")}<div>${n.kicker ? `<small>${esc(n.kicker)}</small>` : ""}<b>${esc(n.label)}</b>${n.text ? `<p>${rich(n.text)}</p>` : ""}</div></div>`;
  if (n.type === "stat") return `<div class="finset fstat">${ic("chart")}<div><b>${esc(n.value)}</b><em>${esc(n.accent)}</em><small>${esc(n.note)}</small></div></div>`;
  return "";
}
function featuredPageHTML(p, i) {
  const t = [...(p.title || []).map((l) => `<span class="w">${esc(l)}</span>`), ...(p.accent || []).map((l) => `<span class="a">${esc(l)}</span>`), ...(p.title2 || []).map((l) => `<span class="w">${esc(l)}</span>`)].join("<br>");
  let link = "";
  if (p.open) {
    const pr = PRODUCT_CATEGORIES[p.open.cat] && PRODUCT_CATEGORIES[p.open.cat].products[p.open.prod];
    if (pr) link = `<button class="vlink fopen" data-cat="${p.open.cat}" data-prod="${p.open.prod}" data-from="featured">${pr.modelFile ? ic("cube") + "LIHAT 3D" : "LIHAT DETAIL"}${ic("right")}</button>`;
  }
  return `<section class="pg fp" data-i="${i}">
    <div class="hero fhero"><div class="hph" style="${bgi(p.photo)}"></div><i class="hshade"></i>
      <div class="htx"><div class="ftag"><span>PRODUK UNGGULAN KAMI</span></div><h1>${t}</h1><i class="uline"></i>
        ${p.tagline ? `<p class="ftl">${rich(p.tagline)}</p>` : ""}${p.subtitle ? `<p class="sub">${esc(p.subtitle)}</p>` : ""}${insetHTML(p.inset)}</div>
      ${link}</div>
    <div class="body">${p.blocks.map((b) => BLOCK[b.type](b)).join("")}</div></section>`;
}

/* ===========================================================================
   PRODUCTS (3D PRODUCT EXPLORER) & DETAIL (3D VIEW)
   =========================================================================== */
function productsHTML() {
  const ex = HOME_PAGES.find((p) => p.type === "explorer") || {};
  const rows = PRODUCT_CATEGORIES.map((c, i) => `<div class="pcat card">
      <div class="pcph" style="${bgi(c.photo)}"><div class="bch">${ic(c.icon)}<div><b>${esc(c.n)}. ${esc(c.title)}</b><em>${esc(c.accent)}</em></div></div></div>
      <div class="pcr"><p>${esc(c.desc)}</p><div class="pks">${c.products.map((p, j) =>
        `<button class="pk" data-cat="${i}" data-prod="${j}">${p.modelFile ? ic("cube") : ""}<span>${esc(p.short || p.name)}</span></button>`).join("")}</div></div></div>`).join("");
  return `<section class="pg on t-products">${heroHTML({ tag: "3D PRODUCT EXPLORER", photo: ex.photo, title: ["PILIH PRODUK"], accent: ["UNTUK 3D VIEW"],
      subtitle: "Sentuh produk untuk melihat model 3D interaktif, spesifikasi, dan penjelasan detail." }, "3D")}
    <div class="body">${rows}<div class="plegend">${ic("cube")}<span>= tersedia model 3D interaktif</span></div></div></section>`;
}
function toolsHTML() {
  return `<div class="tools">${[["rotate", "Putar 360°", "auto"], ["zoomin", "Zoom In", "in"], ["zoomout", "Zoom Out", "out"], ["reset", "Reset", "reset"]]
    .map(([i, t, a]) => `<button class="tl" data-v="${a}">${ic(i)}<small>${t}</small></button>`).join("")}</div>`;
}
function detailHTML() {
  return `<section class="pg on t-detail">
    <div class="hero dhero"><div class="hph" id="dPh"></div><i class="hshade"></i>
      <div class="htx"><div class="tagp"><b id="dNo">01</b><span id="dCat"></span></div><h1 id="dName"></h1><i class="uline"></i></div></div>
    <div class="body">
      <div class="dpick" id="dPick"></div>
      <div class="viewer live grow" id="dStage">
        <div class="vtitle" id="dVt">3D LIVE VIEW</div><div class="v3d"><span class="dot"></span><b>3D<br>LIVE</b></div>
        <div class="dview" id="dView"><img class="dimg" id="dImg" alt=""></div>
        ${toolsHTML()}
        <div class="dbars" id="dBars"></div>
        <div class="vhint">${ic("hand")}GESER UNTUK MEMUTAR · KEMBALI KE ISOMETRIC SETELAH ${Math.round(CONFIG.ISO_RESET_MS / 1000)} DETIK</div>
      </div>
      <div class="sect" id="dSpecWrap">${rib("SPESIFIKASI UTAMA")}<div class="card dstats" id="dStats"></div></div>
      <div class="sect dtext">${rib("PENJELASAN PRODUK")}<div class="card win" id="dWin"><div class="scroll" id="dScroll"></div><i class="fade t"></i><i class="fade b"></i><div class="bar"><i id="dThumb"></i></div></div></div>
    </div></section>`;
}
function footerHTML() {
  return `<footer id="nav"><i class="fwave"></i>
    <div class="btns">
      <button class="nb" data-act="home">${ic("home")}<span>HOME</span></button>
      <button class="nb" data-act="back">${ic("left")}<span>BACK</span></button>
      <button class="nb xfeat" data-act="featured">${ic("layers")}<span>PRODUK<br>UNGGULAN</span></button>
      <button class="nb x3d" data-act="products">${ic("cube")}<span>3D PRODUCT<br>EXPLORER</span></button>
      <button class="nb" data-act="next" id="bNext">${ic("right")}<span>NEXT</span></button>
    </div>
    <div class="scr"><i></i><span id="scrLbl">SCREEN 01 / 08</span><i></i></div>
    <div class="dots" id="dots"></div>
  </footer>`;
}

/* ===========================================================================
   STATE & NAVIGASI
   =========================================================================== */
const S = { mode: "home", cur: 0, lastHome: 0, cat: 0, prod: 0, touchAt: 0, feat: 0, from: "products" };
let loop = null, els = {};

function setMode(m) {
  S.mode = m;
  ["home", "products", "detail", "featured"].forEach((id) => els[id] && els[id].classList.toggle("on", id === m));
  document.body.dataset.mode = m;
  syncViewer();
  syncFooter();
  syncVideo();
}
/** Video di layar Produk Unggulan: hanya diputar saat layarnya tampil. */
function syncVideo() {
  document.querySelectorAll("#featured video").forEach((v) => {
    const on = S.mode === "featured" && v.closest(".pg").classList.contains("on");
    if (on) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } else v.pause();
  });
}
function showFeatured(i) {
  const n = FEATURED_PAGES.length;
  S.feat = ((i % n) + n) % n;
  S.touchAt = Date.now();
  els.fpages.forEach((p, k) => p.classList.toggle("on", k === S.feat));
  if (S.mode !== "featured") setMode("featured"); else { syncFooter(); syncVideo(); }
}
/** Satu renderer 3D dipakai bergantian: layar 06 (home) atau halaman detail. */
function syncViewer() {
  if (S.mode === "detail") return startRender("detail");
  const pg = HOME_PAGES[S.cur];
  if (S.mode === "home" && pg && pg.type === "explorer" && HOSTS.home) {
    // Ikuti produk yang sedang dipilih pengunjung (tombol LIHAT DETAIL menyimpan pilihannya),
    // agar judul & model 3D tetap cocok saat kembali ke layar ini.
    const lk = $("#hStage .vlink");
    const o = lk && lk.dataset.cat !== undefined ? { cat: +lk.dataset.cat, prod: +lk.dataset.prod } : pg.preview.open;
    const p = PRODUCT_CATEGORIES[o.cat].products[o.prod];
    startRender("home");
    if (V.shown !== "home:" + o.cat + ":" + o.prod) { V.shown = "home:" + o.cat + ":" + o.prod; setModel(p); }
    return;
  }
  stopRender();
}
function syncFooter() {
  const dots = els.dots, lbl = $("#scrLbl"), next = $("#bNext");
  next.classList.remove("off");
  if (S.mode === "home") {
    lbl.textContent = `SCREEN ${pad(S.cur + 1)} / ${pad(HOME_PAGES.length)}`;
    dots.innerHTML = HOME_PAGES.map((_, k) => `<i class="${k === S.cur ? "on" : ""}"><u></u></i>`).join("");
  } else if (S.mode === "featured") {
    lbl.textContent = `PRODUK UNGGULAN ${pad(S.feat + 1)} / ${pad(FEATURED_PAGES.length)}`;
    dots.innerHTML = FEATURED_PAGES.map((_, k) => `<i class="${k === S.feat ? "on" : ""}"><u></u></i>`).join("");
  } else if (S.mode === "products") {
    lbl.textContent = "3D PRODUCT EXPLORER · PILIH PRODUK";
    dots.innerHTML = "";
    next.classList.add("off");
  } else {
    const c = PRODUCT_CATEGORIES[S.cat];
    lbl.textContent = `PRODUK ${pad(S.prod + 1)} / ${pad(c.products.length)}  ·  ${c.menu.toUpperCase()}`;
    dots.innerHTML = c.products.map((_, k) => `<i class="${k === S.prod ? "on" : ""}"><u></u></i>`).join("");
  }
  document.querySelectorAll("#nav .x3d").forEach((b) => b.classList.toggle("act", S.mode === "products" || S.mode === "detail"));
  document.querySelectorAll("#nav .xfeat").forEach((b) => b.classList.toggle("act", S.mode === "featured"));
}
function showHome(i) {
  const n = HOME_PAGES.length;
  S.cur = ((i % n) + n) % n;
  els.pages.forEach((p, k) => p.classList.toggle("on", k === S.cur));
  if (S.mode !== "home") { setMode("home"); loop.reset(Date.now()); }
  else loop.pageChanged(Date.now());
  S.lastHome = S.cur;
  syncViewer();
  syncFooter();
}
function goHomeBegin() { showHome(0); loop.reset(Date.now()); }
function openProducts() { setMode("products"); }
function backFromProducts() { showHome(S.lastHome); loop.reset(Date.now()); }
function openDetail(ci, pj) {
  S.cat = ci; S.prod = pj || 0;
  const cat = PRODUCT_CATEGORIES[ci];
  $("#dCat").textContent = cat.menu.toUpperCase();
  $("#dNo").textContent = pad(ci + 1);
  $("#dPh").style.backgroundImage = `url('${cat.photo}')`;
  $("#dPick").innerHTML = cat.products.map((p, j) => `<button class="pk" data-prod="${j}">${p.modelFile ? ic("cube") : ""}<span>${esc(p.short || p.name)}</span></button>`).join("");
  setMode("detail");
  selectProduct(S.prod);
}
function nextAct() {
  if (S.mode === "home") return showHome(S.cur + 1);
  if (S.mode === "featured") return showFeatured(S.feat + 1);
  if (S.mode === "detail") {
    const c = PRODUCT_CATEGORIES[S.cat];
    if (S.prod + 1 < c.products.length) return selectProduct(S.prod + 1);
    return openDetail((S.cat + 1) % PRODUCT_CATEGORIES.length, 0);
  }
}
function backAct() {
  if (S.mode === "home") return showHome(S.cur - 1);
  if (S.mode === "featured") return S.feat > 0 ? showFeatured(S.feat - 1) : backFromProducts();
  if (S.mode === "detail") {
    if (S.from === "featured") return showFeatured(S.feat);
    if (S.from === "home") return backFromProducts();
    return setMode("products");
  }
  if (S.mode === "products") return backFromProducts();
}

/* ---- tick UI home (100 ms) ---- */
function uiTick() {
  const now = Date.now();
  if (S.mode === "home") {
    const r = loop.tick(now);
    if (r.advance) showHome(S.cur + 1);
    const d = els.dots.children[S.cur];
    if (d) d.firstChild.style.width = Math.round(r.progress * 100) + "%";
    els.nav.classList.toggle("hold", r.holding);
    if (HOME_PAGES[S.cur].type === "company") sliderTick(now);
  } else if (S.mode === "featured") {
    if (CONFIG.FEATURED_IDLE_MS && now - S.touchAt > CONFIG.FEATURED_IDLE_MS) goHomeBegin();
  } else if (CONFIG.DETAIL_IDLE_MS && now - S.touchAt > CONFIG.DETAIL_IDLE_MS) {
    goHomeBegin();
  }
}
let sliderAt = 0;
function sliderTick(now) {
  const sl = document.querySelectorAll("#slider .sl2");
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
const SC = { pos: 0, h: 0, wait: 1.5, drag: false, resumeAt: 0, lastY: 0 };
const BAR_COLORS = { energy: "linear-gradient(90deg,#FFC20E,#F07F12)", durability: "linear-gradient(90deg,#3E8BFF,#1B4FD1)", adaptable: "linear-gradient(90deg,#FF5A4E,#D90F1F)" };

function fitTitle() {
  const h = $("#dName");
  for (const size of [76, 68, 60, 54, 48]) {
    const lh = Math.round(size * 1.05);
    h.style.fontSize = size + "px"; h.style.lineHeight = lh + "px";
    if (Math.round(h.scrollHeight / lh) <= 2) return;
  }
}
function renderBars(m) {
  const box = $("#dBars");
  if (!m) { box.style.display = "none"; box.innerHTML = ""; return; }
  box.style.display = "";
  box.innerHTML = METRIC_LABELS.map((x) => {
    const v = Math.max(0, Math.min(100, Math.round(Number(m[x.key]) || 0)));
    return `<div class="bar2"><div class="bl"><b>${esc(x.label)}</b><span>${v}%</span></div><div class="bt"><i data-w="${v}" style="background:${BAR_COLORS[x.key] || BAR_COLORS.energy}"></i></div></div>`;
  }).join("");
  requestAnimationFrame(() => requestAnimationFrame(() => box.querySelectorAll("i[data-w]").forEach((i) => { i.style.width = i.dataset.w + "%"; })));
}
function selectProduct(j) {
  const cat = PRODUCT_CATEGORIES[S.cat], p = cat.products[j];
  S.prod = j;
  document.querySelectorAll("#dPick .pk").forEach((b, k) => b.classList.toggle("sel", k === j));
  const sel = document.querySelector("#dPick .pk.sel"); if (sel && sel.scrollIntoView) sel.scrollIntoView({ inline: "center", block: "nearest" });
  $("#dName").textContent = String(p.name).toUpperCase();
  fitTitle();
  $("#dVt").textContent = p.name;
  const specs = (p.specs || []).slice(0, 4);
  $("#dSpecWrap").style.display = specs.length ? "" : "none";
  $("#dStats").style.gridTemplateColumns = `repeat(${Math.max(1, specs.length)},1fr)`;
  $("#dStats").innerHTML = specs.map((s) => `<div class="dstat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
  renderBars(p.metrics);
  buildScroll(p.detail && p.detail.length ? p.detail : [p.desc]);
  V.shown = "detail";
  setModel(p);
  syncFooter();
  requestAnimationFrame(resizeViewer);
}

function buildScroll(paras) {
  const sc = $("#dScroll"), one = paras.map((t) => `<p>${esc(t)}</p>`).join("");
  sc.innerHTML = `<div class="blk">${one}</div>`;
  SC.pos = 0; SC.wait = 1.5; SC.h = 0; SC.resumeAt = 0; SC.loop = false;
  requestAnimationFrame(() => {
    const blk = sc.firstChild; if (!blk) return;
    SC.h = blk.offsetHeight;
    SC.loop = SC.h > $("#dWin").clientHeight - 20;          // teks pendek → tidak perlu bergulir
    $("#dWin").classList.toggle("short", !SC.loop);
    if (!SC.loop) { sc.style.transform = ""; return; }
    const copies = Math.max(2, Math.ceil($("#dWin").clientHeight / Math.max(1, SC.h)) + 1);
    sc.innerHTML = Array(copies).fill(`<div class="blk">${one}</div>`).join("");
    applyScroll();
  });
}
function applyScroll() {
  if (!SC.h || !SC.loop) return;
  SC.pos = ((SC.pos % SC.h) + SC.h) % SC.h;
  $("#dScroll").style.transform = `translateY(${(-SC.pos).toFixed(1)}px)`;
  $("#dThumb").style.top = ((($("#dWin .bar").clientHeight - 50) * SC.pos) / SC.h).toFixed(1) + "px";
}
function scrollTick(dt) {
  if (!SC.h || !SC.loop || SC.drag || Date.now() < SC.resumeAt) return;
  if (SC.wait > 0) { SC.wait -= dt; return; }
  SC.pos += CONFIG.SCROLL_SPEED * dt;
  applyScroll();
}
function bindScrollDrag() {
  const w = $("#dWin");
  w.addEventListener("pointerdown", (e) => { SC.drag = true; SC.lastY = e.clientY; w.setPointerCapture && w.setPointerCapture(e.pointerId); });
  w.addEventListener("pointermove", (e) => { if (!SC.drag) return; SC.pos += (SC.lastY - e.clientY) / V.scale; SC.lastY = e.clientY; applyScroll(); });
  const up = () => { if (SC.drag) { SC.drag = false; SC.resumeAt = Date.now() + 3000; } };
  w.addEventListener("pointerup", up); w.addEventListener("pointercancel", up);
}

/* ===========================================================================
   THREE.JS VIEWER (satu renderer dipakai bergantian)
   =========================================================================== */
const V = { ok: false, token: 0, cache: {}, group: null, rotY: 0, rotX: 0, auto: true, drag: false, lastInt: 0, raf: 0, last: 0, scale: 1, dist: 6.4, host: "detail", shown: "" };
const HOSTS = {};   // { detail: {stage, view, img}, home: {...} }
const H = () => HOSTS[V.host] || HOSTS.detail;
const ISO = { y: Math.PI / 4, x: -0.35, dist: 6.4 };

function initViewer() {
  if (!window.THREE) return false;
  const r = (V.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }));
  r.outputEncoding = THREE.sRGBEncoding;
  V.scene = new THREE.Scene();
  V.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  placeCamera();
  V.scene.add(new THREE.AmbientLight(0xdce4ef, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(4, 6, 5); V.scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fb8ff, 0.55); rim.position.set(-5, 3, -4); V.scene.add(rim);
  const ember = new THREE.PointLight(0xff7a1a, 0.8, 12); ember.position.set(0, -2.2, 1.5); V.scene.add(ember);
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
function placeCamera() { if (!V.camera) return; V.camera.position.set(0, V.dist * 0.19, V.dist); V.camera.lookAt(0, 0.1, 0); }
/** Tombol toolbar 3D: auto (putar), in, out, reset */
function viewerTool(a) {
  if (a === "auto") { V.auto = true; V.lastInt = 0; }
  else if (a === "in" || a === "out") { V.dist = Math.max(3.4, Math.min(11, V.dist * (a === "in" ? 0.85 : 1.18))); V.auto = false; V.lastInt = Date.now(); }
  else if (a === "reset") { V.dist = ISO.dist; V.rotY = ISO.y; V.rotX = ISO.x; V.auto = true; }
  placeCamera();
  syncTools();
}
function syncTools() {
  document.querySelectorAll(".viewer.live .tl").forEach((b) => b.classList.toggle("on", b.dataset.v === "auto" && V.auto));
}
function resizeViewer() {
  const m = H() && H().view; if (!V.ok || !m) return;
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
  glow: () => new THREE.MeshStandardMaterial({ color: 0xff7a1a, emissive: 0xff4b0a, emissiveIntensity: 0.9, roughness: 0.5 }),
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
  // Model yang dikompres Meshopt (EXT_meshopt_compression, mis. hasil glTF-Transform) butuh decoder ini
  if (typeof MeshoptDecoder !== "undefined") gltfLoader.setMeshoptDecoder(MeshoptDecoder);
  return gltfLoader;
}
function normalizeObject(obj) {
  const box = new THREE.Box3().setFromObject(obj), size = box.getSize(new THREE.Vector3());
  obj.scale.setScalar(2.6 / (Math.max(size.x, size.y, size.z) || 1));
  box.setFromObject(obj); obj.position.sub(box.getCenter(new THREE.Vector3()));
  const wrap = new THREE.Group(); wrap.add(obj); return wrap;
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

function setModel(p) {
  const my = ++V.token, stage = H().stage, view = H().view, img = H().img;
  const show = (state) => {
    stage.classList.toggle("nomodel", state !== "model");
    stage.classList.toggle("loading", state === "loading");
    view.classList.toggle("imgmode", state === "image");
  };
  V.rotY = ISO.y; V.rotX = ISO.x; V.auto = true; V.dist = ISO.dist; placeCamera(); syncTools();
  if (!V.ok) { img.src = p.image || ""; show(p.image ? "image" : "placeholder"); return; }
  const asImage = () => { if (my !== V.token) return; clearGroup(); if (p.image) { img.src = p.image; show("image"); } else { setGroup(buildPlaceholder()); show("placeholder"); } };
  if (!p.modelFile) { asImage(); return; }
  if (V.cache[p.modelFile]) { setGroup(V.cache[p.modelFile].clone()); show("model"); return; }
  clearGroup(); show("loading");
  loadModel(p.modelFile, p.modelRotation, (obj) => {
    V.cache[p.modelFile] = obj;
    if (my !== V.token) return;
    setGroup(obj.clone()); show("model");
  }, asImage);
}
function renderFrame(t) {
  V.raf = requestAnimationFrame(renderFrame);
  const dt = Math.min(0.1, (t - (V.last || t)) / 1000); V.last = t;
  if (!V.auto && !V.drag && Date.now() - V.lastInt > CONFIG.ISO_RESET_MS) {
    const ty = ISO.y + Math.round((V.rotY - ISO.y) / (2 * Math.PI)) * 2 * Math.PI;
    V.rotY += (ty - V.rotY) * 0.08; V.rotX += (ISO.x - V.rotX) * 0.08;
    V.dist += (ISO.dist - V.dist) * 0.08; placeCamera();
    if (Math.abs(ty - V.rotY) < 0.01 && Math.abs(ISO.x - V.rotX) < 0.01) { V.auto = true; V.dist = ISO.dist; placeCamera(); }
  }
  if (V.auto && !V.drag) V.rotY += 0.006 * dt * 60;
  if (V.wasAuto !== V.auto) { V.wasAuto = V.auto; syncTools(); }
  if (V.group) { V.group.rotation.y = V.rotY; V.group.rotation.x = V.rotX; }
  if (V.ok) V.renderer.render(V.scene, V.camera);
  scrollTick(dt);
}
function startRender(host) {
  if (host && host !== V.host) { V.host = host; V.shown = ""; }
  const view = H().view;
  if (V.ok && V.renderer.domElement.parentNode !== view) {
    view.insertBefore(V.renderer.domElement, view.firstChild);
    if (V.group && !V.shown) clearGroup();        // model lama milik host lain
  }
  resizeViewer();
  if (!V.raf) { V.last = 0; V.raf = requestAnimationFrame(renderFrame); }
}
function stopRender() { if (V.raf) { cancelAnimationFrame(V.raf); V.raf = 0; } }

/* ===========================================================================
   LOGO CUSTOMER — sliding looping
   =========================================================================== */
const probeImg = (url) => new Promise((res) => { const i = new Image(); i.onload = () => res(url); i.onerror = () => res(null); i.src = url; });
async function discoverLogos() {
  const dir = CONFIG.CLIENT_DIR || "", found = [], seen = new Set();
  const norm = (f) => (/^(https?:)?\/\//.test(f) || f.startsWith("/") || f.startsWith("assets/") ? f : dir + f);
  const listed = (typeof CLIENT_LOGOS !== "undefined" ? CLIENT_LOGOS : []).map(norm);
  const got = await Promise.all(listed.map(probeImg));
  got.forEach((u) => { if (u && !seen.has(u)) { seen.add(u); found.push(u); } });
  const A = CONFIG.CLIENT_AUTO;
  if (A && A.enabled) {
    let miss = 0;
    for (let n = 1; n <= (A.max || 60) && miss < 3; n++) {
      let hit = null;
      for (const ext of A.exts || ["png"]) { hit = await probeImg(`${dir}${n}.${ext}`); if (hit) break; }
      if (hit) { miss = 0; if (!seen.has(hit)) { seen.add(hit); found.push(hit); } } else miss++;
    }
  }
  return found;
}
const imgReady = (img) => new Promise((res) => (img.complete ? res() : (img.onload = img.onerror = () => res())));
async function buildMarquee() {
  const trust = document.getElementById("trust"); if (!trust) return;
  const urls = await discoverLogos();
  if (!urls.length) { trust.style.display = "none"; return; }
  const tile = (u) => `<div class="lt"><img src="${attr(u)}" alt=""></div>`;
  for (const row of trust.querySelectorAll(".mq")) {
    const track = row.querySelector(".track"), list = row.classList.contains("r") ? urls.slice().reverse() : urls;
    track.innerHTML = list.map(tile).join("");
    await Promise.all([...track.querySelectorAll("img")].map(imgReady));
    const unit = track.scrollWidth + 18;
    const reps = Math.max(1, Math.ceil(1100 / unit));
    const half = Array(reps).fill(list.map(tile).join("")).join("");
    track.innerHTML = half + half;
    track.style.animationDuration = Math.max(8, (unit * reps) / (CONFIG.MARQUEE_SPEED || 45)) + "s";
  }
}

/* ===========================================================================
   Skala layar, input global, start
   =========================================================================== */
function rescale() {
  V.scale = Math.min(innerWidth / 1080, innerHeight / 1920) || 1;
  document.getElementById("fit").style.transform = `translate(-50%,-50%) scale(${V.scale})`;
  resizeViewer();
}
function onTap(e) {
  const t = e.target.closest("[data-act],[data-go],[data-cat],[data-prod],[data-v]");
  if (!t) return;
  if (t.dataset.v !== undefined) return viewerTool(t.dataset.v);
  if (t.dataset.go !== undefined) return showHome(+t.dataset.go);
  if (t.dataset.cat !== undefined) { S.from = t.dataset.from || (S.mode === "products" ? "products" : S.mode); return openDetail(+t.dataset.cat, +(t.dataset.prod || 0)); }
  if (t.dataset.prod !== undefined) return selectProduct(+t.dataset.prod);
  const act = t.dataset.act;
  if (act === "products") return openProducts();
  if (act === "featured") return showFeatured(S.mode === "featured" ? 0 : S.feat);
  if (act === "home") return goHomeBegin();
  if (act === "next") return nextAct();
  if (act === "back") return backAct();
}

function start() {
  const fit = $("#fit");
  fit.insertAdjacentHTML("beforeend", headerHTML() + footerHTML());
  els = { home: $("#home"), products: $("#products"), detail: $("#detail"), nav: $("#nav"), dots: $("#dots") };
  $("#homePages").innerHTML = HOME_PAGES.map((p, i) => pageHTML(p, i)).join("");
  els.pages = [...document.querySelectorAll("#homePages .pg")];
  els.products.innerHTML = productsHTML();
  els.detail.innerHTML = detailHTML();
  els.featured = $("#featured");
  if (els.featured && typeof FEATURED_PAGES !== "undefined" && FEATURED_PAGES.length) {
    els.featured.innerHTML = FEATURED_PAGES.map((p, i) => featuredPageHTML(p, i)).join("");
    els.fpages = [...els.featured.querySelectorAll(".pg")];
  } else { els.fpages = []; document.querySelectorAll("#nav .xfeat").forEach((b) => b.remove()); }
  HOSTS.detail = { stage: $("#dStage"), view: $("#dView"), img: $("#dImg") };
  if ($("#hStage")) HOSTS.home = { stage: $("#hStage"), view: $("#hView"), img: $("#hImg") };

  loop = new LoopController({ pageMs: CONFIG.PAGE_MS, holdMs: CONFIG.HOLD_MS, immuneMs: CONFIG.IMMUNE_MS, now: Date.now() });
  initViewer();
  bindScrollDrag();
  buildMarquee();

  addEventListener("pointerdown", () => { S.touchAt = Date.now(); if (S.mode === "home") loop.touch(Date.now()); }, true);
  document.addEventListener("click", onTap);
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("dragstart", (e) => e.preventDefault());
  addEventListener("resize", rescale);
  rescale();

  setMode("home");
  const q = new URLSearchParams(location.search);
  showHome(+(q.get("p") || 1) - 1);
  if (q.get("f") && els.fpages.length) showFeatured(+q.get("f") - 1);
  setInterval(uiTick, 100);
}

if (typeof module !== "undefined" && module.exports) module.exports = { LoopController, pageHTML, productsHTML, detailHTML, esc };
if (typeof window !== "undefined" && typeof document !== "undefined") start();
