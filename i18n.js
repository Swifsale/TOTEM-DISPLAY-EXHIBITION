/* ===========================================================================
   I18N — pengganti bahasa totem (Indonesia / English / 日本語)
   ---------------------------------------------------------------------------
   • Dimuat SETELAH data.js dan SEBELUM script.js.
   • Bahasa Indonesia = sumber (data.js). Terjemahan ada di i18n-dict.js.
   • Pilihan bahasa disimpan di browser (localStorage) → tetap dipakai setelah
     totem dinyalakan ulang. Bisa juga dipaksa lewat alamat: ?lang=en / ?lang=ja
   • Ganti bahasa = halaman dimuat ulang lalu kembali ke layar yang sama.
   =========================================================================== */
(function () {
  "use strict";
  const LANGS = [
    { code: "id", name: "Bahasa Indonesia", short: "ID" },
    { code: "en", name: "English",          short: "EN" },
    { code: "ja", name: "日本語",            short: "JP" },
  ];
  const STORE = "swifa-lang", RETURN = "swifa-lang-return";
  const codes = LANGS.map((l) => l.code);

  let lang = "id";
  try {
    const q = new URLSearchParams(location.search).get("lang");
    lang = (q && codes.includes(q)) ? q : (localStorage.getItem(STORE) || "id");
    if (!codes.includes(lang)) lang = "id";
  } catch (_) { /* storage diblokir: tetap Indonesia */ }

  document.documentElement.lang = lang;
  document.documentElement.setAttribute("data-lang", lang);

  const DICT = window.I18N_DICT || {};
  const col = lang === "en" ? 0 : 1;
  const missing = new Set();

  /** Terjemahkan satu teks. Tidak ada di kamus → teks asli dipakai. */
  function t(s) {
    if (lang === "id" || typeof s !== "string" || !s) return s;
    const e = DICT[s];
    if (!e) { if (/[A-Za-z]{3,}/.test(s)) missing.add(s); return s; }
    const v = e[col];
    return v == null ? s : v;
  }

  // Kunci yang berisi path / pengaturan, bukan teks tampilan
  const SKIP = new Set(["photo", "photos", "image", "modelFile", "poster", "video", "icon", "color", "tone", "type",
    "ribbon", "focus", "aspect", "url", "qr", "src", "mascot", "mode", "LOGO_IMAGE", "CLIENT_DIR", "DRACO_PATH"]);

  /** Terjemahkan isi objek/array (di tempat). Array judul diterjemahkan per judul. */
  function tree(o) {
    if (lang === "id" || !o || typeof o !== "object") return o;
    if (Array.isArray(o)) {
      if (o.length && o.every((x) => typeof x === "string")) {
        const joint = o.join("\n");
        const e = DICT[joint];
        if (e && o.length > 1) {
          const v = e[col] == null ? joint : e[col];
          o.splice(0, o.length, ...v.split("\n"));
          return o;
        }
        // Terjemahan per baris; terjemahan yang berisi \n dipecah jadi beberapa baris
        const lines = o.map(t).flatMap((x) => String(x).split("\n"));
        o.splice(0, o.length, ...lines);
        return o;
      }
      o.forEach((x, i) => { if (typeof x === "string") o[i] = t(x); else tree(x); });
      return o;
    }
    for (const k of Object.keys(o)) {
      if (SKIP.has(k)) continue;
      const v = o[k];
      if (typeof v === "string") o[k] = t(v);
      else if (v && typeof v === "object") tree(v);
    }
    return o;
  }

  // Terjemahkan seluruh konten data.js sebelum script.js merender
  if (lang !== "id") {
    try {
      if (typeof CONFIG !== "undefined") { CONFIG.TAGLINE = t(CONFIG.TAGLINE); CONFIG.GROUP_LINE = t(CONFIG.GROUP_LINE); }
      if (typeof HOME_PAGES !== "undefined") tree(HOME_PAGES);
      if (typeof FEATURED_PAGES !== "undefined") tree(FEATURED_PAGES);
      if (typeof PRODUCT_CATEGORIES !== "undefined") tree(PRODUCT_CATEGORIES);
    } catch (e) { console.warn("i18n: gagal menerjemahkan data", e); }
  }

  /* ---------- ganti bahasa: simpan layar saat ini, muat ulang ---------- */
  function setLang(code) {
    if (!codes.includes(code) || code === lang) return;
    try {
      localStorage.setItem(STORE, code);
      if (typeof S !== "undefined") {
        sessionStorage.setItem(RETURN, JSON.stringify({ mode: S.mode, cur: S.cur, feat: S.feat, cat: S.cat, prod: S.prod, lastHome: S.lastHome }));
      }
    } catch (_) {}
    const u = new URL(location.href);
    u.searchParams.delete("lang");
    location.replace(u.toString());
  }

  /** Dipanggil setelah totem siap: kembali ke layar sebelum ganti bahasa. */
  function restoreScreen() {
    let st = null;
    try { st = JSON.parse(sessionStorage.getItem(RETURN) || "null"); sessionStorage.removeItem(RETURN); } catch (_) {}
    if (!st) return;
    try {
      if (st.mode === "home") showHome(st.cur || 0);
      else if (st.mode === "featured") showFeatured(st.feat || 0);
      else if (st.mode === "products") openProducts();
      else if (st.mode === "detail") openDetail(st.cat || 0, st.prod || 0);
      if (typeof st.lastHome === "number") S.lastHome = st.lastHome;
    } catch (e) { console.warn("i18n: gagal kembali ke layar", e); }
  }

  /* ---------- tombol bendera (pojok kanan bawah, menu muncul ke atas) ---------- */
  const FLAGS = {
    id: '<svg viewBox="0 0 30 20"><rect width="30" height="10" fill="#E70011"/><rect y="10" width="30" height="10" fill="#fff"/></svg>',
    en: '<svg viewBox="0 0 60 40"><clipPath id="ukc"><rect width="60" height="40"/></clipPath><g clip-path="url(#ukc)"><rect width="60" height="40" fill="#012169"/>' +
        '<path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/>' +
        '<path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="12"/><path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="7"/></g></svg>',
    ja: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/></svg>',
  };

  function mountSwitcher(host) {
    if (!host || document.getElementById("lang-switch")) return;
    const cur = LANGS.find((l) => l.code === lang);
    const wrap = document.createElement("div");
    wrap.id = "lang-switch";
    wrap.className = "lang-switch";
    wrap.innerHTML =
      `<div class="ls-menu" role="menu" aria-label="${t("Pilih bahasa")}">` +
      LANGS.map((l) => `<button type="button" class="ls-opt${l.code === lang ? " on" : ""}" data-lang="${l.code}" role="menuitem">` +
        `<span class="ls-flag">${FLAGS[l.code]}</span><span class="ls-name">${l.name}</span></button>`).join("") +
      `</div><button type="button" class="ls-btn" aria-label="${t("Pilih bahasa")}: ${cur.name}">` +
      `<span class="ls-flag">${FLAGS[lang]}</span><b>${cur.short}</b></button>`;
    host.appendChild(wrap);

    let timer = 0;
    const close = () => { wrap.classList.remove("open"); clearTimeout(timer); };
    const open = () => { wrap.classList.add("open"); clearTimeout(timer); timer = setTimeout(close, 8000); };
    // Ditangani di sini agar sentuhan tidak memicu navigasi totem di belakangnya
    wrap.addEventListener("click", (e) => {
      e.stopPropagation();
      const opt = e.target.closest(".ls-opt");
      if (opt) { const c = opt.getAttribute("data-lang"); if (c === lang) close(); else setLang(c); return; }
      if (e.target.closest(".ls-btn")) wrap.classList.contains("open") ? close() : open();
    });
    document.addEventListener("pointerdown", (e) => { if (!wrap.contains(e.target)) close(); }, true);
  }

  window.I18N = { lang, langs: LANGS, t, tree, setLang, restoreScreen, mountSwitcher, missing };
  window.t = t;
})();
