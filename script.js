

const SLIDE_MS = 30000, PRODUCT_MS = 8000, RESUME_MS = 20000;

/* ================= GABUNGKAN SLIDE DARI data.js ================= */
const SLIDES = [
  { kind: "intro", ...INTRO_SLIDE },
  ...PRODUCT_SLIDES.map((s) => ({ kind: "products", ...s })),
];

/* ================= HEADER / FOOTER ================= */
function renderChrome() {
  const logoEl = document.getElementById("headerLogo");
  if (TOTEM_HEADER.logoImage) {
    const img = document.createElement("img");
    img.src = TOTEM_HEADER.logoImage;
    img.alt = TOTEM_HEADER.company;
    img.onerror = () => {
      logoEl.classList.add("fallback");
      logoEl.textContent = TOTEM_HEADER.logoText;
    };
    logoEl.appendChild(img);
  } else {
    logoEl.classList.add("fallback");
    logoEl.textContent = TOTEM_HEADER.logoText;
  }

  document.getElementById("coName").textContent = TOTEM_HEADER.company;
  document.getElementById("coSub").textContent = TOTEM_HEADER.companySub;
  document.getElementById("evLine1").textContent = TOTEM_HEADER.eventLine1;
  document.getElementById("evLine2").textContent = TOTEM_HEADER.eventLine2;

  document.getElementById("footerSlog").innerHTML =
    `${TOTEM_FOOTER.sloganPlain}<em>${TOTEM_FOOTER.sloganEmphasis}</em>`;
  document.getElementById("footerCta").textContent = TOTEM_FOOTER.cta;
}

/* ================= BUILD SLIDE DOM ================= */
const slidesEl = document.getElementById("slides");
const pickerEl = document.getElementById("picker");
const dotsEl = document.getElementById("dots");

function buildSlideDom() {
  SLIDES.forEach((s) => {
    const d = document.createElement("div");
    d.className = "slide";

    if (s.kind === "intro") {
      d.innerHTML = `
        <div class="badge">${s.badge}</div>
        <h1>${s.title}</h1>
        <div class="tag">${s.tag}</div>
        <div class="feats">${s.timeline
          .map(
            (t) => `
          <div class="feat static">
            <div class="dot">${t.year}</div>
            <div class="tx"><b>${t.title}</b><span>${t.text}</span></div>
          </div>`
          )
          .join("")}
        </div>
        <div class="stage photo" style="background-image:url('${s.backgroundImage}')">
          <div class="stName"><b>Warisan Sanken Sangyo</b><span>Sejak 1949, Jepang</span></div>
          <div class="stat-chips">${s.stats
            .map((st) => `<div class="stat-chip"><b>${st.value}</b><span>${st.label}</span></div>`)
            .join("")}
          </div>
        </div>`;
    } else {
      d.innerHTML = `
        <div class="badge">${s.badge}</div>
        <h1>${s.title}</h1>
        <div class="tag">${s.tag}</div>
        <div class="feats">${s.products
          .map(
            (p, j) => `
          <div class="feat" data-p="${j}">
            <div class="dot">${j + 1}</div>
            <div class="tx"><b>${p.name}</b><span>${p.desc}</span></div>
          </div>`
          )
          .join("")}
        </div>
        <div class="stage">
          <div class="stName"><b></b><span>3D Product View</span></div>
          <div class="hint"><i>&#8635;</i> 360&deg;</div>
          <div class="ph">Model belum diunggah — akan tampil placeholder generik</div>
        </div>`;
    }

    slidesEl.appendChild(d);
    dotsEl.appendChild(document.createElement("i"));
  });
}

const slideEls = () => [...document.querySelectorAll(".slide")];
const dotEls = () => [...dotsEl.children];

/* ================= THREE.JS VIEWER (dipakai bergantian di slide produk) ================= */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(0, 1.2, 6.4);
camera.lookAt(0, 0.1, 0);
scene.add(new THREE.AmbientLight(0xdce4ef, 0.6));
const key = new THREE.DirectionalLight(0xffffff, 0.95);
key.position.set(4, 6, 5);
scene.add(key);
const rim = new THREE.DirectionalLight(0x93a0ae, 0.5);
rim.position.set(-5, 3, -4);
scene.add(rim);
const ember = new THREE.PointLight(0xe2231a, 1.1, 12);
ember.position.set(0, -2.2, 1.5);
scene.add(ember);

const M = {
  steel: () => new THREE.MeshStandardMaterial({ color: 0x93a0ae, metalness: 0.75, roughness: 0.32 }),
  dark: () => new THREE.MeshStandardMaterial({ color: 0x22282a, metalness: 0.4, roughness: 0.55 }),
  ink: () => new THREE.MeshStandardMaterial({ color: 0x141a16, metalness: 0.3, roughness: 0.7 }),
  red: () => new THREE.MeshStandardMaterial({ color: 0xe2231a, metalness: 0.45, roughness: 0.4 }),
  glow: () => new THREE.MeshStandardMaterial({ color: 0xff4b3e, emissive: 0xe2231a, emissiveIntensity: 0.9, roughness: 0.5 }),
};
function mesh(geo, mat) { return new THREE.Mesh(geo, mat); }
function tube(r, len, mat, seg = 24) { return mesh(new THREE.CylinderGeometry(r, r, len, seg), mat); }

/* --- placeholder generik: bentuk furnace abstrak, dipakai bila belum ada file 3D --- */
function buildPlaceholder() {
  const g = new THREE.Group();
  const pot = mesh(new THREE.CylinderGeometry(1.05, 0.8, 1.9, 36), M.dark());
  g.add(pot);
  const lip = mesh(new THREE.TorusGeometry(1.05, 0.1, 12, 40), M.steel());
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.95;
  g.add(lip);
  const glow = mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 36), M.glow());
  glow.position.y = 0.82;
  g.add(glow);
  for (let i = 0; i < 4; i++) {
    const c = mesh(new THREE.TorusGeometry(1.0 - 0.05 * i, 0.06, 10, 36), M.red());
    c.rotation.x = Math.PI / 2;
    c.position.y = 0.4 - 0.45 * i;
    g.add(c);
  }
  const base = tube(1.2, 0.25, M.ink(), 36);
  base.position.y = -1.15;
  g.add(base);
  return g;
}

/* --- loader universal: pilih loader berdasarkan ekstensi file --- */
function loadModelAuto(url, onSuccess, onFail) {
  const ext = (url.split(".").pop() || "").toLowerCase();

  if ((ext === "glb" || ext === "gltf") && window.THREE && THREE.GLTFLoader && !window.__noGltf) {
    new THREE.GLTFLoader().load(
      url,
      (g) => onSuccess(normalizeObject(g.scene)),
      undefined,
      onFail
    );
  } else if (ext === "stl" && window.THREE && THREE.STLLoader && !window.__noStl) {
    new THREE.STLLoader().load(
      url,
      (geometry) => {
        geometry.center();
        geometry.computeVertexNormals();
        const m = new THREE.Mesh(geometry, M.steel());
        m.rotation.x = -Math.PI / 2;
        onSuccess(normalizeObject(m));
      },
      undefined,
      onFail
    );
  } else if (ext === "obj" && window.THREE && THREE.OBJLoader && !window.__noObj) {
    new THREE.OBJLoader().load(
      url,
      (obj) => {
        obj.traverse((c) => { if (c.isMesh) c.material = M.steel(); });
        onSuccess(normalizeObject(obj));
      },
      undefined,
      onFail
    );
  } else {
    onFail();
  }
}

function normalizeObject(obj) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const scale = 2.6 / (Math.max(size.x, size.y, size.z) || 1);
  obj.scale.setScalar(scale);
  box.setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  obj.position.sub(center);
  return obj;
}

let group = null, modelCache = {};
function setModel(product) {
  if (group) {
    scene.remove(group);
    group.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
  }
  group = new THREE.Group();
  scene.add(group);

  const showPlaceholder = () => {
    const p = buildPlaceholder();
    p.position.y = -0.15;
    group.add(p);
  };

  if (!product.modelFile) {
    showPlaceholder();
    return;
  }
  if (modelCache[product.modelFile]) {
    group.add(modelCache[product.modelFile].clone());
    return;
  }
  loadModelAuto(
    product.modelFile,
    (obj) => {
      obj.position.y = -0.15;
      modelCache[product.modelFile] = obj;
      group.add(obj.clone());
    },
    showPlaceholder
  );
}

/* rotasi: auto + drag */
let rotY = 0, rotX = -0.12, vel = 0.005, dragging = false, lx = 0, ly = 0, pauseUntil = 0;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
renderer.domElement.style.cursor = "grab";
function onDown(e) { dragging = true; lx = e.clientX; ly = e.clientY; pauseUntil = Date.now() + RESUME_MS; }
function onMove(e) {
  if (!dragging) return;
  rotY += (e.clientX - lx) * 0.008;
  rotX += (e.clientY - ly) * 0.005;
  rotX = Math.max(-0.9, Math.min(0.5, rotX));
  lx = e.clientX; ly = e.clientY;
}
function onUp() { dragging = false; }
renderer.domElement.addEventListener("pointerdown", onDown);
addEventListener("pointermove", onMove);
addEventListener("pointerup", onUp);

function tick() {
  requestAnimationFrame(tick);
  if (!dragging && !reduced) rotY += vel;
  if (group) {
    group.rotation.y = rotY;
    group.rotation.x = rotX;
  }
  renderer.render(scene, camera);
}
tick();

/* ================= LAYOUT / SCALING (frame 1080x1920 ke layar) ================= */
const fit = document.getElementById("fit");
function rescale() {
  const s = Math.min(innerWidth / 1080, innerHeight / 1920);
  fit.style.transform = `translate(-50%,-50%) scale(${s})`;
}
addEventListener("resize", rescale);

/* ================= STATE / NAVIGASI ================= */
let cur = 0, curProd = 0, slideTimer, prodTimer;

function mountViewer() {
  const slide = SLIDES[cur];
  if (slide.kind !== "products") return; // slide intro pakai foto, bukan canvas
  const stage = slideEls()[cur].querySelector(".stage");
  stage.insertBefore(renderer.domElement, stage.firstChild);
  const r = () => {
    const b = stage.getBoundingClientRect();
    const s = Math.min(innerWidth / 1080, innerHeight / 1920) || 1;
    renderer.setSize(b.width / s, b.height / s, false);
    camera.aspect = (b.width / s) / (b.height / s);
    camera.updateProjectionMatrix();
  };
  requestAnimationFrame(r);
  addEventListener("resize", r);
}

function selectProduct(j, user) {
  const slide = SLIDES[cur];
  if (slide.kind !== "products") return;
  curProd = j;
  const p = slide.products[j];
  slideEls()[cur].querySelectorAll(".feat").forEach((f, i) => f.classList.toggle("sel", i === j));
  [...pickerEl.children].forEach((b, i) => b.classList.toggle("sel", i === j));
  const nameEl = slideEls()[cur].querySelector(".stName b");
  if (nameEl) nameEl.textContent = p.name;
  setModel(p);
  rotY = 0;
  if (user) pauseUntil = Date.now() + RESUME_MS;
}

function buildPicker() {
  pickerEl.innerHTML = "";
  const slide = SLIDES[cur];
  if (slide.kind === "products") {
    slide.products.forEach((p, j) => {
      const b = document.createElement("button");
      b.className = "pick";
      b.textContent = p.short;
      b.onclick = () => selectProduct(j, true);
      pickerEl.appendChild(b);
    });
  } else {
    // slide intro: tampilkan klien terpercaya sebagai chip statis
    (slide.trustedClients || []).forEach((name) => {
      const b = document.createElement("button");
      b.className = "pick static";
      b.textContent = name;
      pickerEl.appendChild(b);
    });
  }
}

function goSlide(i, user) {
  cur = (i + SLIDES.length) % SLIDES.length;
  slideEls().forEach((el, k) => el.classList.toggle("on", k === cur));
  dotEls().forEach((d, k) => d.classList.toggle("on", k === cur));
  buildPicker();
  mountViewer();
  if (SLIDES[cur].kind === "products") selectProduct(0, false);
  if (user) pauseUntil = Date.now() + RESUME_MS;
  restartTimers();
}

function restartTimers() {
  clearInterval(slideTimer);
  clearInterval(prodTimer);
  prodTimer = setInterval(() => {
    if (Date.now() < pauseUntil) return;
    const slide = SLIDES[cur];
    if (slide.kind === "products") selectProduct((curProd + 1) % slide.products.length, false);
  }, PRODUCT_MS);
  slideTimer = setInterval(() => {
    if (Date.now() < pauseUntil) return;
    goSlide(cur + 1, false);
  }, SLIDE_MS);
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  buildSlideDom();
  rescale();

  document.getElementById("prev").onclick = () => goSlide(cur - 1, true);
  document.getElementById("next").onclick = () => goSlide(cur + 1, true);
  slidesEl.addEventListener("click", (e) => {
    const f = e.target.closest(".feat");
    if (f && !f.classList.contains("static")) selectProduct(+f.dataset.p, true);
  });

  goSlide(0, false);
});
