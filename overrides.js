/* SWIF Asia Totem - user customization layer.
   Loaded after script.js. Keep custom content and image paths here. */
(function () {
  "use strict";

  const TOTEM_CUSTOM = {
    // Ganti/urutkan path foto pabrik di sini. Gunakan file lokal di folder assets.
    ENGINEERING_FACTORY_PHOTOS: [
      "assets/company/5.jpg",
      "assets/company/9.jpg",
      "assets/company/11.jpg",
      "assets/company/12.jpg"
    ],
    // Tambahkan/hapus path gambar mascot sesuai jumlah yang diinginkan.
    // Dipakai bergantian (tiap MASCOT_INTERVAL_MS) di layar yang tidak
    // punya gambar khusus di MASCOT_GUIDE.
    MASCOT_IMAGES: [
      "assets/mascot/swifi-1.png",
      "assets/mascot/swifi-2.png",
      "assets/mascot/swifi-3.png",
      "assets/mascot/swifi-4.png",
       "assets/mascot/swifi-5.png",
       "assets/mascot/swifi-6.png"
    ],
    MASCOT_INTERVAL_MS: 15000,
    MASCOT_ROTATE_MS: 650,

    /* ===== MASCOT PEMANDU — teks balon kata & gambar per layar =====
       text  : isi balon kata. Kosongkan ("") untuk menyembunyikan balon.
               Tulis *kata* untuk menebalkan/mewarnai kata tersebut.
       image : (opsional) gambar mascot khusus untuk layar ini, mis.
               "assets/mascot/swifi-home.png". Kosong = ikut MASCOT_IMAGES.
       hide  : true = mascot tidak tampil di layar ini.
       Kunci layar: home-1 … home-8, featured-1 … featured-4, products, detail */
    MASCOT_GUIDE: {
      "home-1":     { text: "Halo, aku *SWIFI*! Sentuh *START EXPLORATION* untuk mulai.", image: "" },
      "home-2":     { text: "Lebih dari *40 pelanggan industri* sudah percaya pada kami!", image: "" },
      "home-3":     { text: "Dari *desain* sampai *commissioning*, semua kami kerjakan.", image: "" },
      "home-4":     { text: "*Keselamatan operator* selalu jadi prioritas utama.", image: "" },
      "home-5":     { text: "Sentuh *kartu produk* untuk melihat model 3D-nya!", image: "" },
      "home-6":     { text: "*Geser model 3D* untuk memutarnya, yuk coba!", image: "" },
      "home-7":     { text: "Hemat energi, rendah emisi, menuju *Net Zero 2060*.", image: "" },
      "home-8":     { text: "Maintenance, repair, upgrade, spare parts: *semua di satu tempat*!", image: "" },
      "featured-1": { text: "Hemat energi hingga *±25%*! Sentuh *LIHAT 3D*.", image: "" },
      "featured-2": { text: "Daur ulang chip aluminium dengan *metal recovery ≥98%*.", image: "" },
      "featured-3": { text: "Keseragaman temperatur hingga *±5°C*!", image: "" },
      "featured-4": { text: "Transfer molten lebih *aman* dengan satu tombol.", image: "" },
      "products":   { text: "Pilih produk yang ingin kamu lihat dalam *3D*!", image: "" },
      "detail":     { text: "*Geser model* untuk memutar, atau pilih produk lain.", image: "" }
    },

    /* ===== MERCH QUEST — tombol "side quest" merchandise di header =====
       mode "tab": tombol membuka halaman campaign di TAB BARU pada totem.
                   Tab yang sama dipakai ulang, jadi tap berulang tidak membuka banyak tab.
       mode "qr" : tombol membuka pop-up QR code untuk di-scan dengan HP
                   (QR: assets/merch/qr-campaign.svg — buat ulang bila URL berubah). */
    MERCH_QUEST: {
      enabled: true,
      mode: "tab",
      url: "https://swifsale.github.io/Campaign-For-Merch/",
      qr: "assets/merch/qr-campaign.svg",
      button: "GET MERCH",        // tulisan besar di tombol header
      buttonSub: "SIDE QUEST",     // tulisan kecil di atasnya
      kicker: "MINI SIDE QUEST",
      title: "Foto Bareng *SWIFI*",
      subtitle: "Selesaikan quest ini dan dapatkan *goodiebag* dari SWIF ASIA!",
      steps: [
        "Foto bareng *SWIFI*",
        "Upload ke *Instagram Story*",
        "Tag *@swifasia*",
        "Tunjukkan Story ke tim booth & ambil *goodiebag*-mu!"
      ],
      scanText: "Scan dengan kamera HP",
      mascot: "assets/mascot/swifi-1.png",
      autoCloseMs: 60000          // pop-up tertutup sendiri bila tidak disentuh
    },
    // ===== LOGO CUSTOMER (layar 02 Company Profile) =====
    // "step"       = geser 1 logo, berhenti sebentar, lalu geser lagi (mudah dibaca)
    // "continuous" = berjalan pelan tanpa henti
    CUSTOMER_LOGO_MODE: "step",
    CUSTOMER_LOGO_STEP_PAUSE_MS: 2200, // mode step: lama berhenti di tiap posisi
    CUSTOMER_LOGO_STEP_MS: 800,        // mode step: lama gerakan geser 1 logo
    CUSTOMER_LOGO_SPEED: 30,           // mode continuous: kecepatan (pixel/detik)
    // Model chip smelter belum ada di repository. Setelah file diunggah,
    // isi dengan path-nya, mis. "models/CHIP_SMELTER.glb".
    CHIP_SMELTER_MODEL: ""
  };

  const $ = (s, r = document) => r.querySelector(s);

  function installFactorySlideshow() {
    const page = $('#homePages .pg[data-i="2"]');
    if (!page) return;
    const proc = page.querySelector('.proc');
    if (!proc) return;
    const photos = TOTEM_CUSTOM.ENGINEERING_FACTORY_PHOTOS.filter(Boolean);
    if (!photos.length) return;

    proc.innerHTML = `
      <div class="factory-showcase">
        <div class="factory-showcase-track">
          ${photos.map((src, i) => `<div class="factory-slide${i === 0 ? ' active' : ''}"><img src="${src}" alt="Foto fasilitas dan proses manufaktur SWIF Asia" loading="eager"></div>`).join('')}
        </div>
        <div class="factory-showcase-caption">FASILITAS & PROYEK SWIF ASIA</div>
        <div class="factory-showcase-dots">${photos.map((_, i) => `<i class="${i === 0 ? 'active' : ''}"></i>`).join('')}</div>
      </div>`;

    const slides = [...proc.querySelectorAll('.factory-slide')];
    const dots = [...proc.querySelectorAll('.factory-showcase-dots i')];
    let current = 0;
    if (slides.length < 2) return;
    window.setInterval(() => {
      const next = (current + 1) % slides.length;
      slides.forEach((slide, i) => slide.style.transform = `translateX(${(i - next) * 100}%)`);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === next));
      current = next;
    }, Math.max(2500, Number(CONFIG.SLIDER_MS) || 4000));
  }

  /* ---------------------------------------------------------------------
     LOGO CUSTOMER — slider baru (menggantikan marquee CSS lama).
     Marquee lama dibangun saat layar 02 masih tersembunyi (lebar = 0),
     sehingga logo disalin ribuan kali dan bergerak ±3.000 px/detik.
     Versi ini: kotak logo berukuran tetap (tidak perlu mengukur layar),
     digerakkan requestAnimationFrame dengan kecepatan konstan, dan
     hanya berjalan saat layar 02 sedang tampil.
     --------------------------------------------------------------------- */
  const TILE_W = 200, TILE_GAP = 18, TILE_STEP = TILE_W + TILE_GAP;

  function logoUrls() {
    const dir = (typeof CONFIG !== 'undefined' && CONFIG.CLIENT_DIR) || 'assets/clients/';
    const list = typeof CLIENT_LOGOS !== 'undefined' ? CLIENT_LOGOS : [];
    const norm = (f) => (/^(https?:)?\/\//.test(f) || f.startsWith('/') || f.startsWith('assets/') ? f : dir + f);
    const probe = (u) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(u); i.onerror = () => ok(null); i.src = u; });
    return Promise.all([...new Set(list.map(norm))].map(probe)).then((r) => r.filter(Boolean));
  }

  function installCustomerLogoSlider() {
    const trust = $('#trust');
    if (!trust) return;
    // Lepas baris marquee lama agar buildMarquee() di script.js tidak menyentuhnya
    trust.querySelectorAll('.mq').forEach((el) => el.remove());
    const rails = [0, 1].map((k) => {
      const rail = document.createElement('div');
      rail.className = 'logo-rail' + (k ? ' rev' : '');
      rail.innerHTML = '<div class="logo-rail-track"></div>';
      trust.appendChild(rail);
      return { el: rail, track: rail.firstChild, rev: !!k, w: 0, pos: 0 };
    });

    logoUrls().then((urls) => {
      if (!urls.length) { trust.style.display = 'none'; return; }
      // >= 10 logo: dibagi dua (atas / bawah) agar tidak ada logo tampil dobel.
      // Lebih sedikit: kedua baris memakai semua logo dengan urutan berbeda.
      const half = Math.ceil(urls.length / 2);
      const lists = urls.length >= 10 ? [urls.slice(0, half), urls.slice(half)]
        : [urls, urls.slice(half).concat(urls.slice(0, half))];
      rails.forEach((r, k) => {
        const list = lists[k];
        const setW = list.length * TILE_STEP;                  // lebar satu set logo
        const copies = Math.max(2, Math.ceil(1100 / setW) + 1); // cukup menutup lebar layar
        const tiles = list.map((u) => `<div class="logo-tile"><img src="${u.replace(/"/g, '&quot;')}" alt="" draggable="false"></div>`).join('');
        r.track.innerHTML = Array(copies).fill(tiles).join('');
        r.w = setW;
        r.pos = 0;
      });

      const mode = TOTEM_CUSTOM.CUSTOMER_LOGO_MODE === 'continuous' ? 'continuous' : 'step';
      const speed = Math.max(5, Number(TOTEM_CUSTOM.CUSTOMER_LOGO_SPEED) || 30);
      const pauseMs = Math.max(300, Number(TOTEM_CUSTOM.CUSTOMER_LOGO_STEP_PAUSE_MS) || 2200);
      const moveMs = Math.max(200, Number(TOTEM_CUSTOM.CUSTOMER_LOGO_STEP_MS) || 800);
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      let last = 0;
      // Baris bawah melangkah setengah siklus setelah baris atas (bergantian)
      rails.forEach((r, i) => { r.phaseT = i ? -(pauseMs + moveMs) / 2 : 0; r.moving = false; r.from = 0; });

      const draw = () => rails.forEach((r) => {
        const p = ((r.pos % r.w) + r.w) % r.w;
        const x = r.rev ? -(r.w - p) : -p;                     // baris bawah bergerak ke kanan
        r.track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      });
      draw();

      const frame = (t) => {
        requestAnimationFrame(frame);
        const visible = trust.offsetParent !== null;           // hanya saat layar 02 tampil
        if (!visible) { last = 0; return; }
        const dt = last ? Math.min(100, t - last) : 0;
        last = t;
        if (mode === 'continuous') {
          rails.forEach((r) => { r.pos += speed * dt / 1000; });
        } else {
          rails.forEach((r) => {
            r.phaseT += dt;
            if (!r.moving && r.phaseT >= pauseMs) { r.moving = true; r.phaseT = 0; r.from = r.pos; }
            if (r.moving) {
              const k = Math.min(1, r.phaseT / moveMs);
              r.pos = r.from + TILE_STEP * ease(k);
              if (k >= 1) { r.moving = false; r.phaseT = 0; r.pos = (r.from + TILE_STEP) % r.w; }
            }
          });
        }
        draw();
      };
      requestAnimationFrame(frame);
    });
  }


  const PREVIEW_PRODUCTS = [
    { cat: 0, prod: 0, title: 'Hybrid Melting Furnace (Tower Type)' },
    { cat: 1, prod: 0, title: 'Chip Smelting Furnace' },
    { cat: 2, prod: 1, title: 'T6 Rotary Heat Treatment Furnace' },
    { cat: 3, prod: 0, title: 'Molten Transfer Device' }
  ];

  function setExplorerProduct(index) {
    const choice = PREVIEW_PRODUCTS[index];
    if (!choice || typeof PRODUCT_CATEGORIES === 'undefined' ||
        typeof HOSTS === 'undefined' || typeof V === 'undefined') return;
    const category = PRODUCT_CATEGORIES[choice.cat];
    const product = category && category.products[choice.prod];
    if (!product) return;

    const title = $('#hStage .vtitle');
    const link = $('#hStage .vlink');
    const stage = $('#hStage');
    if (title) title.textContent = choice.title;
    if (link) {
      link.dataset.cat = String(choice.cat);
      link.dataset.prod = String(choice.prod);
    }
    document.querySelectorAll('#homePages .catb').forEach((button, i) => {
      button.classList.toggle('on', i === index);
      button.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });

    // Chip Smelter belum mempunyai GLB di repository. Siapkan path yang dapat
    // diisi user; jika file belum ada, viewer memakai fallback yang tersedia.
    if (index === 1 && !product.modelFile && TOTEM_CUSTOM.CHIP_SMELTER_MODEL) {
      product.modelFile = TOTEM_CUSTOM.CHIP_SMELTER_MODEL;
    }

    if (typeof startRender === 'function') startRender('home');
    if (typeof setModel === 'function') {
      V.shown = `home:${choice.cat}:${choice.prod}`;
      setModel(product);
    }
    if (stage) stage.dataset.previewCategory = String(index);
  }

  function installCategoryPreview() {
    // Tangkap lebih dahulu agar handler lama (yang membuka halaman detail)
    // tidak mengambil alih klik kategori di halaman 6.
    document.addEventListener('click', function (event) {
      const button = event.target.closest('#homePages .catb');
      if (!button) return;
      const index = [...document.querySelectorAll('#homePages .catb')].indexOf(button);
      if (index < 0 || index > 3) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setExplorerProduct(index);
    }, true);

    const link = $('#hStage .vlink');
    if (link) {
      link.addEventListener('click', function () {
        // The existing global handler reads these data attributes.
      });
    }
    setExplorerProduct(0);
  }

  /* ---------------------------------------------------------------------
     MASCOT PEMANDU — berdiri di pojok kanan bawah banner (hero) setiap
     layar, dengan balon kata sesuai layar (lihat MASCOT_GUIDE di atas).
     Posisi dihitung otomatis dari tinggi banner & tombol di dalamnya,
     sehingga tidak pernah menutupi judul atau tombol.
     --------------------------------------------------------------------- */
  const escHTML = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const richText = (s) => escHTML(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');

  function currentScreenKey() {
    if (typeof S === 'undefined') return '';
    if (S.mode === 'home') return 'home-' + (S.cur + 1);
    if (S.mode === 'featured') return 'featured-' + (S.feat + 1);
    return S.mode; // products | detail
  }

  function installMascotSlot() {
    const fit = $('#fit');
    if (!fit || $('#swifi-guide')) return;
    const images = (TOTEM_CUSTOM.MASCOT_IMAGES || []).filter(Boolean);
    const GUIDE = TOTEM_CUSTOM.MASCOT_GUIDE || {};

    const slot = document.createElement('div');
    slot.id = 'swifi-guide';
    slot.className = 'swifi-guide';
    slot.innerHTML = `<i class="swifi-ground"></i><img class="swifi-img" alt="SWIFI mascot"><span class="swifi-fallback">SWIFI</span>`;
    const bubble = document.createElement('div');
    bubble.className = 'swifi-bubble';
    bubble.innerHTML = '<b>SWIFI</b><p></p>';
    fit.appendChild(slot);
    fit.appendChild(bubble);

    const img = slot.querySelector('img');
    img.addEventListener('error', () => slot.classList.add('no-image'));
    img.addEventListener('load', () => slot.classList.remove('no-image'));
    images.forEach((src) => { const pre = new Image(); pre.src = src; });

    let rotIndex = 0, shownSrc = '', lastKey = null, lastGeom = '';
    const rotateMs = Math.max(200, Number(TOTEM_CUSTOM.MASCOT_ROTATE_MS) || 650);

    function setImage(src, animate) {
      if (!src || src === shownSrc) return;
      shownSrc = src;
      if (!animate) { img.src = src; return; }
      img.classList.add('is-rotating');
      setTimeout(() => { img.src = src; img.classList.remove('is-rotating'); }, rotateMs / 2);
    }
    const screenImage = (cfg) => (cfg && cfg.image) || images[rotIndex % Math.max(1, images.length)] || '';

    /** Ukur banner layar aktif lalu tempatkan mascot + balon kata. */
    function place() {
      const key = currentScreenKey();
      const cfg = GUIDE[key] || {};
      const pg = document.querySelector('.mode.on .pg.on');
      const hero = pg && pg.querySelector('.hero');
      if (!hero || cfg.hide) { slot.classList.add('off'); bubble.classList.add('off'); lastKey = key; return; }

      const scale = (typeof V !== 'undefined' && V.scale) || 1;
      const F = fit.getBoundingClientRect();
      const loc = (r) => ({ l: (r.left - F.left) / scale, t: (r.top - F.top) / scale, r: (r.right - F.left) / scale, b: (r.bottom - F.top) / scale });
      const H = loc(hero.getBoundingClientRect());
      // Batas kanan teks judul/subjudul (mascot & balon tidak boleh melewati ini)
      let textRight = 0;
      // (Range mengukur lebar teks sebenarnya, bukan lebar kotak elemen)
      hero.querySelectorAll('.htx h1, .htx .sub, .htx .ftl').forEach((e) => {
        const rg = document.createRange(); rg.selectNodeContents(e);
        [...rg.getClientRects()].forEach((r) => { if (r.width) textRight = Math.max(textRight, loc(r).r); });
      });
      hero.querySelectorAll('.htx .tagp, .htx .ftag, .htx .finset').forEach((e) => {
        const r = e.getBoundingClientRect(); if (r.width) textRight = Math.max(textRight, loc(r).r);
      });
      // Dasar berdiri: tepi bawah banner, atau di atas tombol/area tombol di banner
      let floor = H.b;
      const blocker = hero.querySelector('.hbot') || hero.querySelector(':scope > button, :scope > .vlink');
      if (blocker) floor = Math.min(floor, loc(blocker.getBoundingClientRect()).t - 6);
      const room = floor - H.t;                      // tinggi ruang yang tersedia

      const tall = room >= 380;
      const right = 26;
      let mh = tall ? Math.min(300, room - 140) : Math.max(150, room - 22);
      // Banner pendek: jangan sampai menabrak judul → perkecil sesuai ruang kosong
      if (!tall) mh = Math.min(mh, (1080 - right - (textRight + 14)) / 0.72);
      mh = Math.round(mh);
      if (mh < 120) { slot.classList.add('off'); bubble.classList.add('off'); lastKey = key; lastGeom = ''; return; }
      const mw = Math.round(mh * 0.72);
      const mLeft = 1080 - right - mw, mTop = floor - mh;

      const geom = [key, mh, mTop, mLeft, Math.round(textRight)].join('|');
      if (geom !== lastGeom) {
        lastGeom = geom;
        Object.assign(slot.style, { left: mLeft + 'px', top: mTop + 'px', width: mw + 'px', height: mh + 'px' });

        // Balon kata: di atas kepala (banner tinggi) atau di kiri mascot (banner pendek)
        bubble.classList.remove('above', 'side');
        const text = cfg.text || '';
        let ok = !!text;
        if (ok && tall) {
          const bw = Math.min(330, 1080 - 20 - Math.max(textRight + 18, 640));
          ok = bw >= 200;
          bubble.classList.add('above');
          Object.assign(bubble.style, { width: bw + 'px', left: (1080 - 20 - bw) + 'px', top: 'auto',
            bottom: (1920 - (mTop + 8)) + 'px' });
        } else if (ok) {
          const bw = Math.min(300, mLeft + 14 - (textRight + 22));
          ok = bw >= 220;
          bubble.classList.add('side');
          Object.assign(bubble.style, { width: bw + 'px', left: (mLeft + 14 - bw) + 'px', bottom: 'auto',
            top: Math.max(H.t + 14, mTop + mh * 0.12) + 'px' });
        }
        bubble.classList.toggle('off', !ok);
        if (key !== lastKey) {
          bubble.querySelector('p').innerHTML = richText(text);
          bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
        }
      }
      slot.classList.remove('off');
      setImage(screenImage(cfg), lastKey !== null && key !== lastKey);
      lastKey = key;
    }

    place();
    setInterval(place, 250);
    window.addEventListener('resize', () => { lastGeom = ''; place(); }, { passive: true });

    if (images.length > 1) {
      setInterval(() => {
        rotIndex = (rotIndex + 1) % images.length;
        const cfg = GUIDE[currentScreenKey()] || {};
        if (!cfg.image) setImage(screenImage(cfg), true);
      }, Math.max(1000, Number(TOTEM_CUSTOM.MASCOT_INTERVAL_MS) || 15000));
    }
  }

  function installLogoShine() {
    const brand = $('.brand');
    if (!brand) return;
    brand.classList.add('brand-shine');
    // Fixed rounded-rectangle path around the logo frame. Only the colored
    // stroke segments animate; neither the logo nor the SVG frame rotates.
    if (!brand.querySelector('.logo-chase')) {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'logo-chase');
      svg.setAttribute('viewBox', '0 0 100 40');
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.setAttribute('aria-hidden', 'true');
      const d = 'M 6 2 H 94 Q 98 2 98 6 V 34 Q 98 38 94 38 H 6 Q 2 38 2 34 V 6 Q 2 2 6 2 Z';
      ['blue-light', 'red-light'].forEach(className => {
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('pathLength', '1000');
        path.setAttribute('class', className);
        svg.appendChild(path);
      });
      brand.appendChild(svg);
    }
    const logo = brand.querySelector('img');
    // Correct the stale filename in the original CONFIG/header markup.
    if (logo) {
      logo.src = 'assets/logo-swifasia.png';
      logo.alt = 'PT. SWIF ASIA';
    }
  }

  function installAnimatedIconFallback() {
    // Existing inline SVG icons remain crisp and offline. This adds subtle
    // motion while optional per-icon GIFs can be supplied in assets/icons/gif/.
    document.querySelectorAll('.ic').forEach(icon => {
      const name = [...icon.classList].find(c => c !== 'ic' && c !== 'flag');
      if (name) icon.dataset.iconName = name;
      icon.classList.add('icon-motion');
    });
  }

  /* ---------------------------------------------------------------------
     DRAG-SCROLL — container bisa digeser dengan jari/mouse.
     Dibuat manual (pointer events) karena banyak touch frame totem
     mengirim event mouse, sehingga scroll bawaan browser tidak jalan.
     Tap singkat tetap = klik; geser > 10px = scroll (klik dibatalkan).
     --------------------------------------------------------------------- */
  let suppressClickUntil = 0;
  window.addEventListener('click', function (e) {
    if (Date.now() < suppressClickUntil) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    }
  }, true);

  const fitScale = () => (typeof V !== 'undefined' && V.scale) || 1;

  function updateEdges(el, axis) {
    const pos = axis === 'y' ? el.scrollTop : el.scrollLeft;
    const max = axis === 'y' ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
    el.classList.toggle(axis === 'y' ? 'more-t' : 'more-l', pos > 2);
    el.classList.toggle(axis === 'y' ? 'more-b' : 'more-r', pos < max - 2);
    if (el._hint) el._hint.classList.toggle('on', max > 2 && pos < max - 2);
  }

  function enableDragScroll(el, axis) {
    if (!el || el._dragScroll) return;
    el._dragScroll = true;
    el.classList.add('drag-scroll');
    let id = null, start = 0, startScroll = 0, dragging = false;
    let lastPos = 0, lastT = 0, vel = 0, raf = 0;
    const coord = (e) => (axis === 'y' ? e.clientY : e.clientX);
    const get = () => (axis === 'y' ? el.scrollTop : el.scrollLeft);
    const set = (v) => { if (axis === 'y') el.scrollTop = v; else el.scrollLeft = v; updateEdges(el, axis); };

    el.addEventListener('pointerdown', (e) => {
      if (e.button > 0) return;
      cancelAnimationFrame(raf);
      id = e.pointerId; start = coord(e); startScroll = get(); dragging = false;
      lastPos = start; lastT = performance.now(); vel = 0;
    });
    el.addEventListener('pointermove', (e) => {
      if (e.pointerId !== id) return;
      const d = (coord(e) - start) / fitScale();
      if (!dragging && Math.abs(d) > 10) {
        dragging = true; el.classList.add('dragging');
        try { el.setPointerCapture(id); } catch (_) {}
      }
      if (!dragging) return;
      set(startScroll - d);
      const now = performance.now(), dt = now - lastT;
      if (dt > 0) vel = 0.8 * ((lastPos - coord(e)) / fitScale() / dt) + 0.2 * vel;
      lastPos = coord(e); lastT = now;
    });
    const end = (e) => {
      if (e.pointerId !== id) return;
      id = null;
      if (!dragging) return;
      dragging = false; el.classList.remove('dragging');
      suppressClickUntil = Date.now() + 250;
      // Sedikit momentum agar terasa natural
      let v = vel * 16;
      const step = () => {
        if (Math.abs(v) < 0.5) return;
        set(get() + v); v *= 0.92; raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('scroll', () => updateEdges(el, axis), { passive: true });
    // Roda mouse (untuk pengujian di PC)
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      set(get() + (axis === 'y' ? e.deltaY : (e.deltaX || e.deltaY)));
    }, { passive: false });
    updateEdges(el, axis);
  }

  function installDragScroll() {
    // 3D PRODUCT EXPLORER: daftar produk tiap kategori
    document.querySelectorAll('#products .pks').forEach((pks) => {
      enableDragScroll(pks, 'y');
      const hint = document.createElement('div');
      hint.className = 'scroll-hint';
      hint.innerHTML = 'GESER UNTUK PILIHAN LAIN <svg class="ic" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';
      pks.after(hint);
      pks._hint = hint;
      updateEdges(pks, 'y');
    });
    // Halaman detail: baris pilihan produk (isinya berganti tiap kategori)
    const pick = $('#dPick');
    if (pick) {
      enableDragScroll(pick, 'x');
      new MutationObserver(() => requestAnimationFrame(() => updateEdges(pick, 'x')))
        .observe(pick, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }
    // Perbarui indikator saat layar dibuka / ukuran berubah
    const refresh = () => requestAnimationFrame(() => {
      document.querySelectorAll('#products .pks').forEach((el) => updateEdges(el, 'y'));
      if (pick) updateEdges(pick, 'x');
    });
    new MutationObserver(refresh).observe(document.body, { attributes: true, attributeFilter: ['data-mode'] });
    window.addEventListener('resize', refresh, { passive: true });
  }

  /* ---------------------------------------------------------------------
     MERCH QUEST — tombol di header + pop-up QR code (lihat MERCH_QUEST).
     --------------------------------------------------------------------- */
  function installMerchQuest() {
    const M = TOTEM_CUSTOM.MERCH_QUEST;
    const header = $('header.top'), fit = $('#fit');
    if (!M || !M.enabled || !header || !fit || $('#merch-btn')) return;
    const gift = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 21V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>';

    const btn = document.createElement('button');
    btn.id = 'merch-btn';
    btn.className = 'merch-btn';
    btn.type = 'button';
    btn.innerHTML = `<span class="mq-ic">${gift}</span><span class="mq-tx"><b>${escHTML(M.button)}</b><small>${escHTML(M.buttonSub)}</small></span>`;
    header.appendChild(btn);

    const modal = document.createElement('div');
    modal.id = 'merch-modal';
    modal.className = 'merch-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="mq-card" role="dialog" aria-label="${escHTML(M.kicker)}">
        <button class="mq-close" type="button" aria-label="Tutup">&times;</button>
        <span class="mq-kicker">${gift}${escHTML(M.kicker)}</span>
        <h2>${richText(M.title)}</h2>
        <p class="mq-sub">${richText(M.subtitle)}</p>
        <div class="mq-main">
          <div class="mq-qr"><img src="${escHTML(M.qr)}" alt="QR code merch quest"><span>${escHTML(M.scanText)}</span></div>
          <ol class="mq-steps">${(M.steps || []).map((t) => `<li><p>${richText(t)}</p></li>`).join('')}</ol>
        </div>
        <img class="mq-mascot" src="${escHTML(M.mascot)}" alt="" onerror="this.remove()">
        <button class="mq-done" type="button">TUTUP</button>
      </div>`;
    fit.appendChild(modal);

    let timer = 0;
    const close = () => { modal.classList.remove('on'); modal.setAttribute('aria-hidden', 'true'); clearTimeout(timer); };
    const arm = () => { clearTimeout(timer); timer = setTimeout(close, Math.max(10000, Number(M.autoCloseMs) || 60000)); };
    const open = () => { modal.classList.add('on'); modal.setAttribute('aria-hidden', 'false'); arm(); };
    // Tangani di sini agar klik tidak diteruskan ke navigasi totem di belakang pop-up
    const stop = (e) => { e.stopPropagation(); };
    btn.addEventListener('click', (e) => {
      stop(e);
      if (M.mode === 'qr') { open(); return; }
      // Tab bernama tetap: tap berikutnya memakai & memfokuskan tab yang sama
      const w = window.open(M.url, 'swifa-merch-quest');
      if (!w) location.href = M.url;   // jika pop-up diblokir, buka di tab ini
    });
    modal.addEventListener('click', (e) => {
      stop(e);
      if (e.target === modal || e.target.closest('.mq-close, .mq-done')) close(); else arm();
    });
    modal.addEventListener('pointerdown', arm);
  }

  function boot() {
    installDragScroll();
    installFactorySlideshow();
    installCustomerLogoSlider();
    installCategoryPreview();
    installMascotSlot();
    installLogoShine();
    installAnimatedIconFallback();
    installMerchQuest();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(boot, 0), { once: true });
  } else {
    window.setTimeout(boot, 0);
  }
  window.SWIFA_TOTEM_CUSTOM = TOTEM_CUSTOM;
})();
