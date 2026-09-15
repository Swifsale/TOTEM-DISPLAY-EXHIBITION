/**
 * script.js — Totem Display SWIF Asia
 * ------------------------------------
 * - Merender konten dari data.js (stats, timeline, klien, produk)
 * - Navigasi titik di sisi kanan mengikuti scroll-snap section
 * - Viewer 3D memakai STLLoader (format .stl), menggantikan GLTFLoader (.glb)
 *   sebelumnya. STL tidak menyimpan warna/tekstur, jadi model diberi material
 *   metal abu-abu secara default di sini.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderTimeline();
  renderTrusted();
  renderProductCategories();
  renderViewerTabs();
  setupNavDots();
  setupViewerToggle();
  setupViewerProductTabs();
  initViewer(FEATURED_3D_PRODUCTS[0]);
});

/* ---------------------------------------------------------------------- */
/* Statistik                                                               */
/* ---------------------------------------------------------------------- */
function renderStats() {
  const grid = document.getElementById("statsGrid");
  grid.innerHTML = COMPANY_STATS.map(
    (s) => `
    <div class="stat-card">
      <div class="stat-card__value">${s.value}<span class="unit">${s.suffix}</span></div>
      <div class="stat-card__label">${s.label}</div>
    </div>`
  ).join("");
}

/* ---------------------------------------------------------------------- */
/* Linimasa                                                                 */
/* ---------------------------------------------------------------------- */
function renderTimeline() {
  const el = document.getElementById("timelineList");
  el.innerHTML = COMPANY_TIMELINE.map(
    (t) => `
    <div class="timeline-item">
      <div class="timeline-item__year">${t.year}</div>
      <div class="timeline-item__title">${t.title}</div>
      <div class="timeline-item__text">${t.text}</div>
    </div>`
  ).join("");
}

/* ---------------------------------------------------------------------- */
/* Klien terpercaya                                                         */
/* ---------------------------------------------------------------------- */
function renderTrusted() {
  const el = document.getElementById("trustedRow");
  el.innerHTML = TRUSTED_CLIENTS.map((c) => `<div class="trusted__chip">${c.name}</div>`).join("");
}

/* ---------------------------------------------------------------------- */
/* Lini produk — tab kategori + grid kartu                                 */
/* ---------------------------------------------------------------------- */
let activeCategoryId = PRODUCT_CATEGORIES[0].id;

function renderProductCategories() {
  const tabsEl = document.getElementById("categoryTabs");
  tabsEl.innerHTML = PRODUCT_CATEGORIES.map(
    (c) => `<button class="category-tab${c.id === activeCategoryId ? " active" : ""}" data-cat="${c.id}">${c.name}</button>`
  ).join("");

  tabsEl.querySelectorAll(".category-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategoryId = btn.dataset.cat;
      renderProductCategories();
    });
  });

  const category = PRODUCT_CATEGORIES.find((c) => c.id === activeCategoryId);
  document.getElementById("categoryIntro").textContent = category.intro;

  const gridEl = document.getElementById("productGrid");
  gridEl.innerHTML = category.items.map(renderProductCard).join("");
}

function renderProductCard(item) {
  const isPlaceholder = item.image && item.image.startsWith("PLACEHOLDER:");
  const media = isPlaceholder
    ? `<div class="product-card__placeholder">Gambar: ${item.image.replace("PLACEHOLDER:", "")}</div>`
    : `<img src="${item.image}" alt="${item.name}" />`;

  return `
    <div class="product-card">
      <div class="product-card__media">${media}</div>
      <div class="product-card__body">
        <div class="product-card__code">${item.code}</div>
        <div class="product-card__name">${item.name}</div>
        <div class="product-card__desc">${item.desc}</div>
      </div>
    </div>`;
}

/* ---------------------------------------------------------------------- */
/* Navigasi titik (mengikuti section yang sedang terlihat)                 */
/* ---------------------------------------------------------------------- */
function setupNavDots() {
  const sections = Array.from(document.querySelectorAll(".panel"));
  const nav = document.getElementById("navdots");
  nav.innerHTML = sections.map((_, i) => `<button data-i="${i}" aria-label="Ke bagian ${i + 1}"></button>`).join("");
  const dots = Array.from(nav.querySelectorAll("button"));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      sections[i].scrollIntoView({ behavior: "smooth" });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          dots.forEach((d) => d.classList.remove("active"));
          if (dots[idx]) dots[idx].classList.add("active");
        }
      });
    },
    { root: document.getElementById("app"), threshold: 0.6 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------------------------------------------------------------------- */
/* Toggle "Model 3D" / "Spesifikasi"                                        */
/* ---------------------------------------------------------------------- */
function setupViewerToggle() {
  const btnModel = document.getElementById("btnViewModel");
  const btnSpecs = document.getElementById("btnViewSpecs");
  const viewModel = document.getElementById("viewModel");
  const viewSpecs = document.getElementById("viewSpecs");

  btnModel.addEventListener("click", () => {
    btnModel.classList.add("active");
    btnSpecs.classList.remove("active");
    viewModel.style.display = "";
    viewSpecs.style.display = "none";
  });

  btnSpecs.addEventListener("click", () => {
    btnSpecs.classList.add("active");
    btnModel.classList.remove("active");
    viewModel.style.display = "none";
    viewSpecs.style.display = "";
  });
}

/* ---------------------------------------------------------------------- */
/* Tab pemilihan produk pada viewer 3D                                      */
/* ---------------------------------------------------------------------- */
function renderViewerTabs() {
  const el = document.getElementById("viewerProductTabs");
  el.innerHTML = FEATURED_3D_PRODUCTS.map(
    (p, i) => `<button class="viewer-product-tab${i === 0 ? " active" : ""}" data-i="${i}">${p.name}</button>`
  ).join("");
}

function setupViewerProductTabs() {
  const el = document.getElementById("viewerProductTabs");
  el.querySelectorAll(".viewer-product-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      el.querySelectorAll(".viewer-product-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const product = FEATURED_3D_PRODUCTS[Number(btn.dataset.i)];
      initViewer(product);
    });
  });
}

/* ---------------------------------------------------------------------- */
/* Panel spesifikasi teks                                                   */
/* ---------------------------------------------------------------------- */
function renderSpecs(product) {
  document.getElementById("specsTitle").textContent = product.name;
  document.getElementById("specsCode").textContent = product.code;
  document.getElementById("specsList").innerHTML = product.specs
    .map((s) => `<div class="spec-row"><span class="spec-row__label">${s.label}</span><span class="spec-row__value">${s.value}</span></div>`)
    .join("");
}

/* ---------------------------------------------------------------------- */
/* Viewer 3D — three.js + STLLoader                                        */
/* ---------------------------------------------------------------------- */
let renderer, scene, camera, controls, currentMesh;
let viewerInitialized = false;

function initViewer(product) {
  renderSpecs(product);
  const wrap = document.getElementById("viewerCanvasWrap");
  const loading = document.getElementById("viewerLoading");
  loading.style.display = "flex";
  loading.textContent = "Memuat model…";

  if (!viewerInitialized) {
    setupThreeScene(wrap);
    viewerInitialized = true;
  }

  if (currentMesh) {
    scene.remove(currentMesh);
    currentMesh.geometry.dispose();
    currentMesh.material.dispose();
    currentMesh = null;
  }

  const loader = new THREE.STLLoader();
  loader.load(
    product.modelFile,
    (geometry) => {
      geometry.center();
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({
        color: 0x9aa1a6,
        metalness: 0.35,
        roughness: 0.55,
      });

      currentMesh = new THREE.Mesh(geometry, material);
      currentMesh.rotation.x = -Math.PI / 2; // orientasi umum ekspor STL
      scene.add(currentMesh);
      fitCameraToObject(currentMesh);

      loading.style.display = "none";
    },
    undefined,
    () => {
      // Gagal memuat — kemungkinan besar karena file .stl belum diunggah ke /models
      loading.textContent = "Model 3D belum tersedia — unggah file .stl ke folder /models";
    }
  );

  document.getElementById("viewerReset").onclick = () => {
    if (currentMesh) fitCameraToObject(currentMesh);
  };
}

function setupThreeScene(wrap) {
  const width = wrap.clientWidth;
  const height = wrap.clientHeight;

  scene = new THREE.Scene();
  scene.background = null;

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 200);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  wrap.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  const dir1 = new THREE.DirectionalLight(0xffffff, 0.9);
  dir1.position.set(1, 1, 1);
  scene.add(dir1);

  const dir2 = new THREE.DirectionalLight(0xffffff, 0.4);
  dir2.position.set(-1, -0.5, -1);
  scene.add(dir2);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 10;
  controls.maxDistance = 2000;

  window.addEventListener("resize", () => {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  animate();
}

function fitCameraToObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const fov = camera.fov * (Math.PI / 180);
  let camDist = Math.abs(maxDim / 2 / Math.tan(fov / 2));
  camDist *= 1.6; // beri ruang napas di sekitar model

  camera.position.set(center.x, center.y, center.z + camDist);
  camera.near = camDist / 100;
  camera.far = camDist * 100;
  camera.updateProjectionMatrix();

  controls.target.copy(center);
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
}
