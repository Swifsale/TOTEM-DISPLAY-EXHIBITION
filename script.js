import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/* ------------------------------------------------------------
   1. Kiosk viewport fix (locks height even if the browser
      chrome resizes / address bar shows on some devices)
------------------------------------------------------------ */
function setVH(){
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener('resize', setVH);

/* ------------------------------------------------------------
   2. Section dots — highlight active screen while scrolling
------------------------------------------------------------ */
const screens = Array.from(document.querySelectorAll('.screen'));
const dots = Array.from(document.querySelectorAll('.dot'));

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    document.getElementById(dot.dataset.target)
      .scrollIntoView({ behavior: 'smooth' });
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      dots.forEach(d => d.classList.toggle('active', d.dataset.target === entry.target.id));
    }
  });
}, { threshold: 0.6 });

screens.forEach(s => sectionObserver.observe(s));

/* ------------------------------------------------------------
   3. Product cards -> open 3D viewer
------------------------------------------------------------ */
const viewer        = document.getElementById('viewer');
const viewerClose    = document.getElementById('viewer-close');
const viewerCode     = document.getElementById('viewer-code');
const viewerName     = document.getElementById('viewer-name');
const viewerLoading  = document.getElementById('viewer-loading');
const viewerEmpty    = document.getElementById('viewer-empty');
const viewerEmptyPath= document.getElementById('viewer-empty-path');
const canvasWrap     = document.getElementById('viewer-canvas-wrap');
const resetBtn       = document.getElementById('viewer-reset');

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => openViewer(card.dataset));
});

function openViewer(data){
  viewerCode.textContent = data.code;
  viewerName.textContent = data.name;
  viewerEmptyPath.textContent = data.model;
  viewer.classList.add('open');
  viewer.setAttribute('aria-hidden', 'false');
  loadModel(data.model);
}

function closeViewer(){
  viewer.classList.remove('open');
  viewer.setAttribute('aria-hidden', 'true');
}
viewerClose.addEventListener('click', closeViewer);

/* ------------------------------------------------------------
   4. Three.js scene — one renderer, reused for every product.
      Drop matching .glb files into /models to replace the
      placeholder shown when a file isn't found yet.
------------------------------------------------------------ */
let scene, camera, renderer, controls, currentMesh, defaultCamState;

function initThree(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(40, 1, 0.05, 100);
  camera.position.set(2.4, 1.6, 2.4);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasWrap.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xfff3e0, 0x14161a, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(4, 6, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff7a29, 0.8);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.8;
  controls.maxDistance = 8;
  controls.target.set(0, 0.4, 0);
  // Touch: one finger = rotate, two fingers = pinch-zoom + pan
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };

  defaultCamState = { pos: camera.position.clone(), target: controls.target.clone() };

  resizeRenderer();
  animate();
}

function resizeRenderer(){
  const w = canvasWrap.clientWidth || 1;
  const h = canvasWrap.clientHeight || 1;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', () => { if (renderer) resizeRenderer(); });

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function clearCurrentMesh(){
  if (currentMesh){
    scene.remove(currentMesh);
    currentMesh.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material){
        (Array.isArray(obj.material) ? obj.material : [obj.material])
          .forEach(m => m.dispose());
      }
    });
    currentMesh = null;
  }
}

function frameObject(object){
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3()).length() || 1;
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center); // center the model at the origin
  const dist = size * 1.4;
  camera.position.set(dist * 0.6, dist * 0.45, dist * 0.6);
  controls.target.set(0, size * 0.12, 0);
  camera.near = size / 100;
  camera.far = size * 100;
  camera.updateProjectionMatrix();

  defaultCamState = { pos: camera.position.clone(), target: controls.target.clone() };
}

/* Placeholder shown until the real .glb is added to /models */
function showPlaceholder(){
  const geo = new THREE.IcosahedronGeometry(0.9, 0);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x2a2e33, metalness: 0.6, roughness: 0.35,
    emissive: 0xff7a29, emissiveIntensity: 0.06, wireframe: false
  });
  currentMesh = new THREE.Mesh(geo, mat);
  scene.add(currentMesh);
  frameObject(currentMesh);
}

function loadModel(path){
  if (!renderer) initThree();

  viewerLoading.hidden = false;
  viewerEmpty.hidden = true;
  clearCurrentMesh();

  const loader = new GLTFLoader();
  loader.load(
    path,
    (gltf) => {
      viewerLoading.hidden = true;
      currentMesh = gltf.scene;
      scene.add(currentMesh);
      frameObject(currentMesh);
    },
    undefined,
    () => {
      // File not found yet — expected until the model is added to the repo.
      viewerLoading.hidden = true;
      viewerEmpty.hidden = false;
      showPlaceholder();
    }
  );
}

resetBtn.addEventListener('click', () => {
  if (!defaultCamState) return;
  camera.position.copy(defaultCamState.pos);
  controls.target.copy(defaultCamState.target);
});

/* Re-fit the renderer once the overlay becomes visible and has real size */
new MutationObserver(() => {
  if (viewer.classList.contains('open') && renderer) resizeRenderer();
}).observe(viewer, { attributes: true, attributeFilter: ['class'] });
