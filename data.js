/* =========================================================================
   SWIF ASIA — Totem Display · DATA
   Semua teks, gambar, dan pengaturan ada di file ini.
   Struktur mengikuti MASTER LAYOUT di Figma:
     1) HOME LOOP   : 5 halaman berulang otomatis (HOME_PAGES)
     2) MAIN PRODUCT: menu kategori produk (PRODUCT_CATEGORIES)
     3) PAGE 3D VIEW: detail produk + model 3D (isi tiap produk)
   Path gambar/video/model relatif terhadap index.html.
   File yang belum ada tidak membuat error — area itu tampil kosong/placeholder.
   ========================================================================= */

/* ---------------------------------------------------------------------------
   PENGATURAN (waktu dalam milidetik)
   --------------------------------------------------------------------------- */
const CONFIG = {
  PAGE_MS: 15000,        // 1 halaman home = 15 detik
  HOLD_MS: 90000,        // setelah disentuh, loop berhenti 90 detik (masa penjelasan)
  IMMUNE_MS: 10000,      // 10 detik pertama setelah sentuhan: sentuhan lain diabaikan (anti error)
  ISO_RESET_MS: 10000,   // model 3D kembali ke tampilan isometric setelah 10 detik tanpa interaksi
  DETAIL_IDLE_MS: 0,     // 0 = halaman produk/3D tidak otomatis kembali ke home. Isi mis. 180000 untuk kembali setelah 3 menit.
  SCROLL_SPEED: 16,      // kecepatan teks penjelasan produk (px per detik) — kecil = pelan
  SLIDER_MS: 4000,       // pergantian foto company profile (halaman Why SWIFA)

  // Logo customer (halaman Why SWIFA) — lihat CLIENT_LOGOS di bawah
  CLIENT_DIR: "assets/clients/",
  MARQUEE_SPEED: 45,     // kecepatan logo bergeser (px per detik)
  CLIENT_AUTO: { enabled: true, max: 60, exts: ["png", "jpg", "jpeg", "webp", "svg"] },

  LOGO_IMAGE: "assets/logo-swifasia.png",
  QR_IMAGE: "assets/qr-swifa.png",           // gambar QR menuju website utama
  WEBSITE_LABEL: "PT. SWIF ASIA",

  // Decoder Draco untuk .glb terkompresi. Untuk offline, salin folder decoder ke vendor/draco/
  // dan ganti menjadi "vendor/draco/".
  DRACO_PATH: "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
};

/* Foto latar tipis di panel biru (opacity 0–1). Ganti file kapan saja. */
const PAGE_BG = {
  home:    { photo: "assets/bg/home.jpg",    opacity: 0.26, pos: "center" },
  energy:  { photo: "assets/bg/energy.jpg",  opacity: 0.26, pos: "center" },
  safety:  { photo: "assets/bg/safety.jpg",  opacity: 0.28, pos: "right center" },
  quality: { photo: "assets/bg/quality.jpg", opacity: 0.28, pos: "right center" },
  why:     { photo: "assets/bg/why.jpg",     opacity: 0.22, pos: "center" },
  products:{ photo: "assets/bg/products.jpg",opacity: 0.28, pos: "right center" },
  detail:  { photo: "assets/bg/detail.jpg",  opacity: 0.12, pos: "center" },
};

/* ---------------------------------------------------------------------------
   HOME LOOP — urutan di array = urutan tampil
   --------------------------------------------------------------------------- */
const HOME_PAGES = [
  /* 01 — HOME PAGE */
  {
    type: "home",
    bg: PAGE_BG.home,
    label: "BERANDA  ·  PT. SWIF ASIA",
    title: ["SAFETY AND", "QUALITY IS", "#1 PRIORITY"],   // baris terakhir berwarna merah
    subtitle: "Solusi industrial furnace & heat treatment dengan fokus pada efisiensi energi, keselamatan, dan kualitas.",
    stats: [
      { value: "75+", label: "Tahun warisan" },
      { value: "ISO", label: "Standar mutu" },
      { value: "JIS B8514", label: "Standar keamanan combustion" },
    ],
    // CONTAINER PERTAMA — isi salah satu: video ATAU gambar (video diprioritaskan)
    media: {
      video: "",                                  // contoh: "assets/home/hero.mp4"  (MP4 H.264, tanpa suara)
      image: "assets/home/hybrid-melter.png",
    },
    pillars: [
      { label: "ENERGY SAVING",   color: "blue", icon: "assets/icons/energy.gif" },
      { label: "HIGH SAFETY",     color: "dark", icon: "assets/icons/safety.gif" },
      { label: "PRODUCT QUALITY", color: "red",  icon: "assets/icons/quality.gif" },
    ],
    cta: { label: "LIHAT DETAIL PRODUK & 3D", sub: "Sentuh untuk eksplorasi interaktif" },
  },

  /* 02 — ENERGY SAVING */
  {
    type: "pillar",
    tab: "ENERGY SAVING",
    bg: PAGE_BG.energy,
    label: "PILAR 1  ·  SWIF ASIA",
    title: "ENERGY SAVING",
    // Sinkronkan dengan teks di Figma bila ada perbedaan
    subtitle: "Energy saving adalah upaya mengurangi energi yang dibutuhkan untuk menghasilkan jumlah produksi yang sama, tanpa mengorbankan kualitas produk, kapasitas produksi, atau keselamatan operasi.",
    cards: [
      {
        letter: "A", color: "blue", title: "HYBRID TECHNOLOGY",
        desc: "Teknologi peleburan logam yang menggabungkan dua sumber panas, yaitu Gas Burner dan Electric Heater, dalam satu sistem melting furnace (tungku peleburan). Teknologi ini dirancang untuk mendukung proses peleburan yang lebih efisien dan ramah lingkungan.",
        img: "assets/home/hybrid-melter.png",
      },
      {
        letter: "B", color: "red", title: "HEAT EXCHANGER",
        // TODO: tempel teks asli dari Figma (Frame 5) bila berbeda
        desc: "Heat Exchanger (Penukar Panas) memindahkan panas dari satu fluida ke fluida lain tanpa mencampurkan keduanya, dan dapat memanfaatkan panas dari gas buang.",
        img: "assets/home/heat-exchanger.png",
      },
    ],
    stat: {
      label: "PENGHEMATAN ENERGI SPESIFIK",
      from: "800", to: "680", unit: "kWh/ton aluminium  ·  produksi 1 ton/jam",
      percent: "15%", percentLabel: "LEBIH HEMAT",
    },
  },

  /* 03 — HIGH SAFETY */
  {
    type: "pillar",
    tab: "HIGH SAFETY",
    bg: PAGE_BG.safety,
    label: "PILAR 2  ·  SWIF ASIA",
    title: "HIGH SAFETY",
    subtitle: "SWIF ASIA memiliki pendekatan untuk mengurangi risiko kecelakaan melalui desain peralatan, sistem pengaman, kontrol operasional, dan kompetensi operator.",
    cards: [
      { letter: "A", color: "blue", title: "EARTHQUAKE DETECTOR",
        desc: "Mendeteksi kejadian gempa sesuai kemampuan dan konfigurasi sensor; tindakan otomatis setelah deteksi perlu dikonfirmasi." },
      { letter: "B", color: "dark", title: "GAS LEAKAGE DETECTOR",
        desc: "Mendeteksi keberadaan gas yang bocor agar potensi kebakaran atau ledakan dapat ditangani sebelum berkembang menjadi insiden yang lebih serius." },
      { letter: "C", color: "red", title: "SMART INTERLOCK SWITCH",
        desc: "Interlock mencegah suatu tindakan atau proses berlangsung ketika kondisi keselamatan yang disyaratkan belum terpenuhi." },
    ],
    quote: { label: "KOMITMEN SWIF ASIA", pre: "“Safety and Quality is ", em: "#1 Priority", post: "”" },
  },

  /* 04 — PRODUCT QUALITY */
  {
    type: "pillar",
    tab: "PRODUCT QUALITY",
    bg: PAGE_BG.quality,
    label: "PILAR 3  ·  SWIF ASIA",
    title: "PRODUCT QUALITY",
    subtitle: "Product Quality bukan hanya tentang furnace yang dibuat dengan baik, tetapi juga tentang proses manufaktur yang terkontrol, kualitas desain, keandalan mesin, dan dukungan setelah pemasangan.",
    cards: [
      // TODO: tempel teks asli dari Figma (Frame 7, 8, 9) — di bawah ini teks ringkas sementara
      { letter: "A", color: "blue", title: "MANUFACTURING QUALITY", photo: true, img: "assets/home/manufacturing.jpg",
        desc: "Proses manufaktur yang terkontrol untuk menjaga kualitas setiap unit furnace." },
      { letter: "B", color: "dark", title: "ENGINEERING & DESIGN QUALITY", photo: true, img: "assets/home/engineering.jpg",
        desc: "Desain furnace disesuaikan dengan kebutuhan proses dan kapasitas customer." },
      { letter: "C", color: "red", title: "ASSEMBLY & PRODUCTION CONTROL", photo: true, img: "assets/home/assembly.jpg",
        desc: "Perakitan dan kontrol produksi yang terukur sampai unit siap dipasang." },
    ],
  },

  /* 05 — WHY SWIFA */
  {
    type: "why",
    tab: "WHY SWIFA",
    bg: PAGE_BG.why,
    label: "COMPANY PROFILE",
    title: "WHY SWIF ASIA",
    subtitle: "Dipercaya produsen otomotif terkemuka, dengan desain yang disesuaikan kebutuhan customer.",
    photos: [                                    // slider foto company profile (efek sliding)
      "assets/company/1.jpg",
      "assets/company/2.jpg",
      "assets/company/3.jpg",
    ],
    points: [
      { n: "01", title: "Trusted by Leading OEMs", text: "Dipercaya produsen otomotif terkemuka" },
      { n: "02", title: "Zero-Repair Track Record", text: "Belum ada unit tercatat repair sejak instalasi" },
      { n: "03", title: "Certified Safety Standard", text: "Sistem combustion memenuhi JIS B8514" },
      { n: "04", title: "Custom-Engineered Design", text: "Fleksibel merancang sesuai kebutuhan customer" },
    ],
  },
];

/* Logo customer — baris sliding looping di halaman Why SWIFA.
   Ada DUA cara menambah logo (boleh dipakai bersamaan, urutan: daftar dulu, lalu otomatis):
   1) OTOMATIS  : taruh file bernama 1.png, 2.png, 3.png ... (atau .jpg/.webp/.svg) di assets/clients/
                  — logo baru langsung muncul, tanpa mengubah kode.
   2) DAFTAR    : tulis nama file di bawah (relatif terhadap CONFIG.CLIENT_DIR).
   File yang tidak ditemukan dilewati; jumlah logo bebas, barisnya menyesuaikan sendiri. */
const CLIENT_LOGOS = [
  // "suzuki.png",
  // "lg.png",
  // "central-motor-wheel.png",
];

/* ---------------------------------------------------------------------------
   MAIN PRODUCT — kategori & produk
   Tiap produk:
     name, short (label tombol), desc (ringkas),
     detail: [paragraf...]   → teks penjelasan yang bergulir otomatis (opsional; default = desc)
     specs : [{value,label}] → label statistik di dalam container 3D (maks 4)
     modelFile (.glb/.gltf/.stl/.obj) + modelRotation {x,y,z} derajat
     image : gambar render, dipakai bila modelFile kosong
   --------------------------------------------------------------------------- */
/* Bar chart 3D View (kanan atas): ENERGY · DURABILITY · ADAPTABLE dalam persen.
   ⚠ Semua produk masih memakai nilai CONTOH 80% — ganti per produk: metrics: SKOR(energy, durability, adaptable).
   Hapus baris metrics pada produk bila bar chart tidak ingin ditampilkan untuk produk itu. */
const SKOR = (energy, durability, adaptable) => ({ energy, durability, adaptable });
const METRIC_LABELS = [
  { key: "energy", label: "ENERGY" },
  { key: "durability", label: "DURABILITY" },
  { key: "adaptable", label: "ADAPTABLE" },
];

const PRODUCT_CATEGORIES = [
  {
    letter: "A", color: "blue", title: "HEAT TREATMENT", sub: "T5 Roller Hearth · T6 Roller Hearth · Rotary HT",
    tag: "Dari proses kontinu compressor hingga cylinder head skala besar.",
    products: [
      {
        name: "T5 Heat Treatment Furnace", short: "T5 Roller Hearth", metrics: SKOR(80, 80, 80),
        desc: "Roller Hearth Type — heat treatment kontinu untuk komponen compressor. Re-circulated hot air memanfaatkan panas buangan exhaust untuk pre-heating, mengoptimalkan efisiensi energi. Combustion system sesuai JIS B8514.",
        modelFile: "", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Operating Temp (max 300°C)", value: "240°C" },
          { label: "Hot Air Circulation", value: "331 m³/min" },
          { label: "Gas Burner Capacity", value: "116 kW" },
          { label: "Total Process Cycle", value: "60 min" },
        ],
      },
      {
        name: "T6 Heat Treatment Furnace", short: "T6 Roller Hearth", metrics: SKOR(80, 80, 80),
        desc: "Roller Hearth Type — untuk processing cylinder head, alur proses 15 zona (solution heating & soaking, quenching, aging heating & soaking), dikendalikan otomatis via damper berbasis thermocouple. Sistem terlengkap di jajaran produk SWIF Asia.",
        modelFile: "", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Solution Furnace", value: "505±10°C" },
          { label: "Quenching Tank", value: "85±5°C" },
          { label: "Aging Furnace", value: "210±10°C" },
          { label: "Gas Burner Capacity", value: "350 kW" },
        ],
      },
      {
        name: "Rotary Heat Treatment Furnace", short: "Rotary HT", metrics: SKOR(80, 80, 80),
        desc: "Alur material pada rack rotary. Opsi panas: burner, hybrid, atau elektrik.",
        modelFile: "models/ROTARY_HT.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "", specs: [],
      },
    ],
  },
  {
    letter: "B", color: "dark", title: "HEATING FURNACE", sub: "Drying Oven · Heating Furnace Batch-Boggie",
    tag: "Melengkapi tahap akhir proses coating & finishing.",
    products: [
      {
        name: "Drying Oven Furnace", short: "Drying Oven", metrics: SKOR(80, 80, 80),
        desc: "Untuk drying core paint — material dimasukkan langsung ke ruang heating.",
        modelFile: "", image: "",
        specs: [
          { label: "Operating Temp", value: "220°C" },
          { label: "Hot Air Circulation", value: "400 m³/min" },
          { label: "Gas Burner", value: "233 kW" },
          { label: "Process Cycle", value: "60 min" },
        ],
      },
      {
        name: "Heating Furnace (Batch-Boggie)", short: "Batch-Boggie", metrics: SKOR(80, 80, 80),
        desc: "Untuk coating hardening — material diletakkan pada boggie yang masuk ke ruang furnace.",
        modelFile: "", image: "",
        specs: [
          { label: "Operating Temp", value: "500°C" },
          { label: "Hot Air Circulation", value: "250 m³/min" },
          { label: "Gas Burner", value: "233 kW" },
          { label: "Process Cycle", value: "180 min" },
        ],
      },
    ],
  },
  {
    letter: "C", color: "red", title: "MELTING", sub: "Tower · Crucible · Chip Smelter · Hybrid Melter",
    tag: "Kapasitas 100 kg/jam – 4 ton/jam.",
    products: [
      { name: "Tower Melting Furnace", short: "Tower Melting", metrics: SKOR(80, 80, 80),
        desc: "Furnace peleburan tipe menara untuk lini produksi dengan alur vertikal.", modelFile: "", image: "", specs: [] },
      { name: "Crucible Melting Furnace", short: "Crucible", metrics: SKOR(80, 80, 80),
        desc: "Melt & holding logam cair di sisi sel pengecoran, opsi standar JIS B8415:2008.", modelFile: "", image: "", specs: [] },
      { name: "Chip Smelter Melting Furnace", short: "Chip Smelter", metrics: SKOR(80, 80, 80),
        desc: "Furnace peleburan khusus untuk material berbentuk chip/serpihan logam.", modelFile: "", image: "", specs: [] },
      {
        name: "Hybrid Melter", short: "Hybrid Melter", metrics: SKOR(80, 80, 80),
        desc: "Gabungan gas burner & elektrik heater sebagai sumber panas — produk terbaru.",
        detail: [
          "Teknologi peleburan logam yang menggabungkan dua sumber panas, yaitu Gas Burner dan Electric Heater, dalam satu sistem melting furnace (tungku peleburan). Teknologi ini dirancang untuk mendukung proses peleburan yang lebih efisien dan ramah lingkungan.",
          "Jangan menilai energy saving hanya dari total gas atau listrik yang digunakan. Produksi yang turun juga bisa membuat konsumsi energi total turun, meskipun efisiensi furnace justru memburuk. Ukuran utama yang perlu diperhatikan adalah Specific Energy Consumption (SEC), yaitu energi yang digunakan per satuan produksi.",
          "Sistem hybrid memungkinkan sumber panas dikombinasikan dalam satu peralatan. Potensi penghematan bergantung pada desain, tarif energi, profil produksi, serta strategi pengoperasiannya.",
        ],
        modelFile: "models/MF_HYBRID.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "assets/home/hybrid-melter.png",
        specs: [
          { value: "15%", label: "Penghematan energi spesifik" },
          { value: "2 sumber", label: "Gas burner + electric heater" },
          { value: "100 kg – 4 t/jam", label: "Kapasitas lini melting" },
        ],
      },
    ],
  },
  {
    letter: "D", color: "blue", title: "HOLDING", sub: "Aluminium Holding Furnace 700 – 2500 kg",
    tag: "Kapasitas 700 – 2500 kg, siap tuang tanpa pernah direpair.",
    products: [
      { name: "Under Heater — 1000 kg", short: "Under 1000kg", metrics: SKOR(80, 80, 80),
        desc: "Dipercaya PT. Suzuki Indomobil Motor (2016) & PT. Astra Otoparts Nusa Metal (2018) dengan desain identik. 0 kali repair/kerusakan sejak dipasang.",
        modelFile: "", image: "",
        specs: [
          { label: "Kapasitas", value: "1000 kg" },
          { label: "Heater Capacity", value: "2×8 kW = 16 kW" },
          { label: "Klien", value: "Suzuki (2016), Astra Otoparts (2018)" },
          { label: "Repair Tercatat", value: "0 kali" },
        ] },
      { name: "Roof Heater — 700 kg", short: "Roof 700kg", metrics: SKOR(80, 80, 80),
        desc: "Untuk kebutuhan kapasitas lebih kecil — pemanas diposisikan di bagian atas tungku. Dipercaya PT. Progress Die Cast sejak 2020, 0 kali repair.",
        modelFile: "", image: "",
        specs: [
          { label: "Kapasitas", value: "700 kg" },
          { label: "Heater Capacity", value: "6×3 kW = 18 kW" },
          { label: "Klien", value: "Progress Die Cast (2020)" },
          { label: "Repair Tercatat", value: "0 kali" },
        ] },
      { name: "Side (SA) Heater — 1500 kg", short: "Side 1500kg", metrics: SKOR(80, 80, 80),
        desc: "Bagian dari proyek 5 unit untuk PT. Astra Daihatsu Motor (2021), 2 unit kapasitas ini. Beroperasi tanpa kerusakan hingga kini.",
        modelFile: "", image: "",
        specs: [
          { label: "Kapasitas", value: "1500 kg" },
          { label: "Heater Capacity", value: "2×15 kW = 30 kW/unit" },
          { label: "Klien", value: "Astra Daihatsu Motor (2021) — 2 unit" },
          { label: "Repair Tercatat", value: "0 kali" },
        ] },
      { name: "Side (SA) Heater — 2500 kg", short: "Side 2500kg", metrics: SKOR(80, 80, 80),
        desc: "Varian kapasitas terbesar dari proyek 5 unit PT. Astra Daihatsu Motor (2021), 3 unit kapasitas ini. Beroperasi tanpa kerusakan hingga kini.",
        modelFile: "", image: "",
        specs: [
          { label: "Kapasitas", value: "2500 kg" },
          { label: "Heater Capacity", value: "3×15 kW = 45 kW/unit" },
          { label: "Klien", value: "Astra Daihatsu Motor (2021) — 3 unit" },
          { label: "Repair Tercatat", value: "0 kali" },
        ] },
    ],
  },
  {
    letter: "E", color: "dark", wide: true, title: "AUXILIARY",
    sub: "Molten transfer device · Molten metal pump · Ladle pre-heat · Degassing · Conveyor · Heat exchanger · Automatic damper",
    tag: "Kelengkapan lini produksi furnace.",
    products: [
      // TODO: isi deskripsi tiap item (sementara teks ringkas)
      { name: "Molten Transfer Device", short: "Molten Transfer", metrics: SKOR(80, 80, 80),
        desc: "Perangkat pemindah logam cair: overhead, bottom carrier, atau ladle forklift.", modelFile: "", image: "", specs: [] },
      { name: "Molten Metal Pump", short: "Metal Pump", metrics: SKOR(80, 80, 80),
        desc: "Pompa untuk memindahkan logam cair antar-stasiun produksi.", modelFile: "", image: "", specs: [] },
      { name: "Ladle Pre-Heat", short: "Ladle Pre-Heat", metrics: SKOR(80, 80, 80),
        desc: "Pemanas awal ladle sebelum dipakai menampung logam cair.", modelFile: "", image: "", specs: [] },
      { name: "Degassing", short: "Degassing", metrics: SKOR(80, 80, 80),
        desc: "Sistem penghilang gas pada logam cair.", modelFile: "", image: "", specs: [] },
      { name: "Conveyor", short: "Conveyor", metrics: SKOR(80, 80, 80),
        desc: "Sistem konveyor untuk mengalirkan material antar-proses.", modelFile: "", image: "", specs: [] },
      { name: "Heat Exchanger", short: "Heat Exchanger", metrics: SKOR(80, 80, 80),
        desc: "Penukar panas yang memanfaatkan panas dari gas buang.", modelFile: "", image: "assets/home/heat-exchanger.png", specs: [] },
      { name: "Automatic Damper", short: "Auto Damper", metrics: SKOR(80, 80, 80),
        desc: "Damper otomatis untuk mengatur aliran udara/gas pada furnace.", modelFile: "", image: "", specs: [] },
    ],
  },
];

/* ---------------------------------------------------------------------------
   ARSIP (tidak dipakai lagi) — item dari versi lama, disimpan agar tidak hilang:
   Peralatan Pendukung : Ladle Device, Porter Metal Transfer, Dust Collector
   Spare Parts & Layanan: Spare Parts Furnace (immersion heater Atherm), Layanan Purna Jual
   Slogan footer lama  : "Heartful Thermal Technology." · "No.1 Furnace Manufacturer di ASEAN"
   Slide lama "Tentang Kami": sejarah 1949 (Sanken Sangyo), 2011 PT SWIF Asia, Cikarang (GIIC).
   Tambahkan kembali sebagai produk/halaman bila diperlukan.
   --------------------------------------------------------------------------- */
