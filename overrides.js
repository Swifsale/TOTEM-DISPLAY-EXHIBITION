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
    // Semua gambar memakai slot/layout yang sama dan berganti setiap 15 detik.
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
    // Kecepatan marquee dalam pixel/detik. Angka lebih kecil = lebih lambat.
    CUSTOMER_LOGO_SPEED: 8,
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

  function slowCustomerMarquee() {
    const tracks = document.querySelectorAll('#trust .track');
    tracks.forEach(track => {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        track.style.animationDuration = `${Math.max(45, halfWidth / TOTEM_CUSTOM.CUSTOMER_LOGO_SPEED)}s`;
      }
    });
  }

  const PREVIEW_PRODUCTS = [
    { cat: 0, prod: 1, title: 'Hybrid Melting Furnace (Tower Type)' },
    { cat: 1, prod: 0, title: 'Chip Smelting Furnace' },
    { cat: 2, prod: 1, title: 'T6 Rotary Heat Treatment Furnace' },
    { cat: 3, prod: 1, title: 'Molten Transfer Device' }
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

  function installMascotSlot() {
    const fit = $('#fit');
    if (!fit || $('#swifi-mascot-slot')) return;

    const images = (TOTEM_CUSTOM.MASCOT_IMAGES || []).filter(Boolean);
    if (!images.length) return;

    const slot = document.createElement('div');
    slot.id = 'swifi-mascot-slot';
    slot.className = 'swifi-mascot-slot';
    slot.innerHTML = `
      <img class="swifi-mascot-image" src="${images[0]}" alt="SWIFI mascot">
      <span>SWIFI</span>`;
    fit.appendChild(slot);

    const image = slot.querySelector('img');
    let current = 0;
    let switching = false;
    const rotateMs = Math.max(200, Number(TOTEM_CUSTOM.MASCOT_ROTATE_MS) || 650);

    image.addEventListener('error', function () {
      slot.classList.add('no-image');
    });
    image.addEventListener('load', function () {
      slot.classList.remove('no-image');
    });

    // Preload seluruh gambar agar pergantian tidak menampilkan gambar kosong.
    images.forEach(src => {
      const preload = new Image();
      preload.src = src;
    });

    if (images.length < 2) return;

    window.setInterval(() => {
      if (switching) return;
      switching = true;
      image.classList.add('is-rotating');

      window.setTimeout(() => {
        current = (current + 1) % images.length;
        image.src = images[current];
        image.alt = `SWIFI mascot ${current + 1}`;
        image.classList.remove('is-rotating');
        switching = false;
      }, rotateMs / 2);
    }, Math.max(1000, Number(TOTEM_CUSTOM.MASCOT_INTERVAL_MS) || 15000));
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

  function boot() {
    installDragScroll();
    installFactorySlideshow();
    slowCustomerMarquee();
    installCategoryPreview();
    installMascotSlot();
    installLogoShine();
    installAnimatedIconFallback();
    // buildMarquee() is asynchronous; re-apply the speed after logo images load.
    window.setTimeout(slowCustomerMarquee, 1200);
    window.setTimeout(slowCustomerMarquee, 3500);
    window.addEventListener('resize', slowCustomerMarquee, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(boot, 0), { once: true });
  } else {
    window.setTimeout(boot, 0);
  }
  window.SWIFA_TOTEM_CUSTOM = TOTEM_CUSTOM;
})();
