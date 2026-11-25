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
    // Ganti path ini setelah file mascot dimasukkan ke repository.
    MASCOT_IMAGE: "assets/mascot/swifi.png",
    // Kecepatan marquee dalam pixel/detik. Angka lebih kecil = lebih lambat.
    CUSTOMER_LOGO_SPEED: 8,
    // Model chip smelter belum ada di repository saat patch dibuat.
    CHIP_SMELTER_MODEL: "models/CHIP_SMELTER.glb"
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
    if (index === 1 && !product.modelFile) {
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
    const slot = document.createElement('div');
    slot.id = 'swifi-mascot-slot';
    slot.className = 'swifi-mascot-slot';
    slot.innerHTML = `
      <img src="${TOTEM_CUSTOM.MASCOT_IMAGE}" alt="SWIFI mascot">
      <span>SWIFI</span>`;
    slot.querySelector('img').addEventListener('error', function () {
      slot.classList.add('no-image');
    });
    fit.appendChild(slot);
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

  function boot() {
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
