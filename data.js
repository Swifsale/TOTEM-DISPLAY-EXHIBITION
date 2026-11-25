const CONFIG = {
  PAGE_MS: 15000,        // 1 halaman home = 15 detik
  HOLD_MS: 60000,        // setelah disentuh, loop berhenti 60 detik (masa penjelasan)
  IMMUNE_MS: 10000,      // 10 detik pertama setelah sentuhan: sentuhan lain diabaikan (anti error)
  ISO_RESET_MS: 10000,   // model 3D kembali ke tampilan isometric setelah 10 detik tanpa interaksi
  DETAIL_IDLE_MS: 0,     // 0 = halaman produk/3D tidak otomatis kembali ke home. Isi mis. 180000 untuk 3 menit.
  SCROLL_SPEED: 16,      // kecepatan teks penjelasan produk (px per detik)
  SLIDER_MS: 4000,       // pergantian foto slider (halaman Company Profile)

  // Logo customer (halaman Company Profile) — lihat CLIENT_LOGOS di bawah
  CLIENT_DIR: "assets/clients/",
  MARQUEE_SPEED: 20,
  CLIENT_AUTO: { enabled: true, max: 60, exts: ["png", "jpg", "jpeg", "webp", "svg"] },

  // Header (atas setiap layar)
  LOGO_IMAGE: "assets/logo-swifasia.png",
  FEATURED_IDLE_MS: 6000,  // layar Produk Unggulan kembali ke home setelah 1 menit tanpa sentuhan (0 = tidak)
  TAGLINE: "Heartful Thermal Technology",
  GROUP_LINE: "A Member of Sanken Sangyo Group, Japan",   // ⚠ cek ejaan nama grup sebelum pameran
  QR_IMAGE: "assets/qr-swifa.png",
  WEBSITE_LABEL: "PT. SWIF ASIA",

  // Decoder Draco (untuk .glb terkompresi) — sudah disertakan offline di vendor/draco/
  DRACO_PATH: "vendor/draco/",
};

/* ---------------------------------------------------------------------------
   HOME LOOP — 8 layar, urutan array = urutan tampil.
   Judul: "title" = baris putih, "accent" = baris kuning.
   --------------------------------------------------------------------------- */
const HOME_PAGES = [
  /* 01 — HOME */
  {
    type: "hero",
    photo: "assets/company/6.jpg",
    title: ["ENGINEERING", "HEAT."],
    accent: ["POWERING", "THE FUTURE."],
    subtitle: "Solusi furnace industri untuk aluminium, otomotif dan metal di Indonesia dan ASEAN — dengan teknologi Jepang dan manufaktur lokal.",
    badges: [
      { icon: "flag-jp", text: "Teknologi Furnace Jepang" },
      { icon: "factory", text: "Engineering dan Manufaktur Lokal" },
      { icon: "handshake", text: "Solusi Thermal Terintegrasi" },
    ],
    stats: [
      { icon: "calendar", small: "Sejak", value: "2011" },
      { icon: "factory", value: "4.740 m²", small: "Workshop" },
      { icon: "users", value: "40+", small: "Pelanggan Industri" },
      { icon: "iso", value: "ISO 9001:2015", small: "TÜV Rheinland" },
    ],
    cta: "START EXPLORATION",          // tombol menuju layar berikutnya
  },

  /* 02 — COMPANY PROFILE */
  {
    type: "company",
    tag: "COMPANY PROFILE",
    photo: "assets/bg/why.jpg",
    title: ["TRUSTED BY"],
    accent: ["LEADING", "MANUFACTURERS."],
    subtitle: "Dipercaya produsen otomotif dan metal terkemuka, dengan desain furnace yang disesuaikan kebutuhan setiap pelanggan.",
    photos: [                          // slider foto
      "assets/company/5.jpg",
      "assets/company/9.jpg",
      "assets/company/11.jpg",
      "assets/company/12.jpg",
    ],
    sliderLabel: "PROYEK SWIF ASIA",
    points: [
      { icon: "award", title: "Trusted by Leading OEMs", text: "Dipercaya produsen otomotif terkemuka" },
      { icon: "check", title: "Zero-Repair Track Record", text: "Belum ada unit tercatat repair sejak instalasi" },
      { icon: "shield", title: "Certified Safety Standard", text: "Sistem combustion mengacu pada JIS B 8415" },
      { icon: "gear", title: "Custom-Engineered Design", text: "Dirancang sesuai kebutuhan proses customer" },
    ],
    clientsLabel: "DIPERCAYA OLEH",
  },

  /* 03 — ENGINEERING & MANUFACTURING */
  {
    type: "engineering",
    tag: "ENGINEERING & MANUFACTURING",
    photo: "assets/bg/quality.jpg",
    title: ["DARI DESAIN", "HINGGA FURNACE"],
    accent: ["SIAP OPERASI."],
    subtitle: "Solusi furnace terintegrasi dengan engineering, manufaktur, assembly dan commissioning.",
    facility: {
      label: "FASILITAS WORKSHOP",
      photo: "assets/bg/why.jpg",
      stats: [
        { icon: "factory", value: "4.740 m²", label: "Total area workshop" },
        { icon: "tools", value: "4.145 m²", label: "Area manufaktur & assembly" },
      ],
    },
    iso: { value: "ISO 9001:2015", label: "Sistem Manajemen Mutu", by: "TÜV Rheinland", note: "Menjamin kualitas di setiap proses engineering, manufaktur dan instalasi proyek." },
    process: {
      label: "CUSTOMIZED FURNACE SOLUTIONS",
      sub: "Setiap furnace dirancang dan diproduksi sesuai kebutuhan proses dan spesifikasi pelanggan.",
      photo: "assets/company/9.jpg",
      steps: [
        { icon: "search", text: "Survey & Konsultasi" },
        { icon: "monitor", text: "Desain Engineering" },
        { icon: "cube", text: "Desain 3D & Simulasi" },
        { icon: "gear", text: "Fabrikasi & Refractory" },
        { icon: "check", text: "Pre-assembly & FAT Testing" },
        { icon: "truck", text: "Pengiriman & Instalasi" },
        { icon: "power", text: "Commissioning & Dry-out" },
        { icon: "users", text: "Training & Serah Terima" },
      ],
    },
  },

  /* 04 — SAFETY SOLUTION */
  {
    type: "safety",
    tag: "SAFETY SOLUTION",
    photo: "assets/bg/safety.jpg",
    title: ["SAFETY"],
    accent: ["ENGINEERED", "INTO EVERY", "FURNACE."],
    subtitle: "Sistem keselamatan terintegrasi untuk operasi furnace yang lebih aman, stabil, dan andal.",
    items: [
      { icon: "fire", photo: "assets/home/assembly.jpg", title: "COMBUSTION SYSTEM SESUAI JIS B 8415",
        desc: "Desain dan integrasi combustion system mengacu pada standar JIS B 8415." },
      { icon: "pump", photo: "assets/company/7.jpg", title: "MOLTEN PUMP",
        desc: "Transfer molten aluminium ke ladle secara lebih aman, stabil dan terkendali." },
      { icon: "robot", photo: "assets/company/3.jpg", title: "AUTOMATIC MOLTEN TRANSFER",
        desc: "Pemindahan molten aluminium secara otomatis untuk meminimalkan risiko dan paparan operator." },
      { icon: "shield", photo: "assets/company/12.jpg", title: "GAS DETECTION & EARTHQUAKE INTERLOCK",
        desc: "Deteksi kebocoran gas dan gempa yang terintegrasi dengan sistem interlock untuk penghentian operasi furnace secara otomatis." },
    ],
  },

  /* 05 — PRODUCT SOLUTIONS (kartu = kategori di PRODUCT_CATEGORIES, sentuh → 3D) */
  {
    type: "solutions",
    tag: "PRODUCT SOLUTIONS",
    photo: "assets/company/5.jpg",
    title: ["COMPLETE"],
    accent: ["INDUSTRIAL", "FURNACE", "SOLUTIONS"],
    subtitle: "Solusi furnace terintegrasi untuk industri aluminium, dari peleburan, daur ulang, heat treatment hingga peralatan pendukung.",
    valuesLabel: "NILAI UNTUK PELANGGAN",
    values: [
      { icon: "leaf", title: "Hemat Energi", text: "Efisiensi proses, biaya operasi lebih rendah." },
      { icon: "chart", title: "Produktivitas", text: "Proses andal, kapasitas sesuai kebutuhan." },
      { icon: "shield", title: "Kualitas Produk", text: "Hasil proses presisi dan konsisten." },
      { icon: "eco", title: "Ramah Lingkungan", text: "Mendukung pengurangan emisi menuju Net Zero." },
    ],
  },

  /* 06 — 3D PRODUCT EXPLORER */
  {
    type: "explorer",
    tag: "3D PRODUCT EXPLORER",
    photo: "assets/home/engineering.jpg",
    title: ["INTERACTIVE"],
    accent: ["3D PRODUCT DETAIL"],
    subtitle: "Jelajahi desain dan fitur utama furnace SWIFA dalam tampilan 3D interaktif.",
    pickLabel: "PILIH KATEGORI PRODUK",
    preview: {                                   // model 3D LIVE yang tampil di layar ini
      title: "Hybrid Melting Furnace (Tower Type)",
      open: { cat: 0, prod: 1 },                 // produk di PRODUCT_CATEGORIES (model, rotasi & gambar diambil dari sana)
      link: "LIHAT DETAIL & SPESIFIKASI",        // tombol menuju halaman detail produk ini
      callout: { photo: "assets/home/assembly.jpg", text: "Sistem Combustion (JIS B 8415)" },
    },
    featuresLabel: "FITUR UTAMA",
    features: [
      { icon: "fire", text: "Combustion System", sub: "(JIS B 8415)" },
      { icon: "pump", text: "Molten Pump", sub: "(Opsional)" },
      { icon: "robot", text: "Automatic Molten Transfer", sub: "(Opsional)" },
      { icon: "shield", text: "Gas Detection & Earthquake Interlock" },
      { icon: "leaf", text: "Efisiensi Energi & Emisi Lebih Rendah" },
    ],
  },

  /* 07 — ENERGY & DECARBONISATION */
  {
    type: "energy",
    tag: "ENERGY & DECARBONISATION",
    photo: "assets/bg/energy.jpg",
    green: true,
    title: ["ENERGY EFFICIENCY", "FOR A"],
    accent: ["LOWER", "CARBON FUTURE"],
    titleInline: true,                           // "FOR A" dan "LOWER" satu baris
    subtitle: "Teknologi furnace yang hemat energi, mengurangi emisi, dan mendukung inisiatif dekarbonisasi industri.",
    items: [
      { icon: "fire", title: "EFISIEN", accent: "COMBUSTION TECHNOLOGY",
        photos: ["assets/home/assembly.jpg", "assets/company/12.jpg"], chips: ["Regenerative Burner", "Recuperative Burner"],
        desc: "Teknologi pembakaran efisien dengan regenerative burner dan recuperative burner untuk pemanfaatan panas optimal." },
      { icon: "rotate", title: "RETROFIT", accent: "HOT AIR BURNER SYSTEM",
        photos: ["assets/company/7.jpg"],
        desc: "Modifikasi sistem pembakaran (retrofit) pada furnace existing dengan hot air burner untuk menurunkan konsumsi energi secara signifikan." },
      { icon: "bolt", title: "HYBRID", accent: "ALUMINIUM MELTING FURNACE",
        photos: ["assets/home/hybrid-melter.png"], chips: ["Melting · Burner", "Holding · Electric Heater"], chipsSide: true,
        desc: "Teknologi hybrid yang menggabungkan pembakaran (burner) untuk proses peleburan dan pemanas elektrik untuk proses penahanan (holding) yang lebih efisien dan rendah emisi." },
      { icon: "bolt", title: "FULL ELECTRIC", accent: "T6 ROTARY FURNACE",
        photos: ["assets/company/2.jpg"],
        desc: "Rotary furnace T6 dengan pemanas elektrik penuh (full electric) untuk proses heat treatment aluminium parts yang bersih, efisien, dan rendah emisi." },
    ],
    commitment: {
      label: "KOMITMEN KAMI",
      title: "MENDORONG EFISIENSI ENERGI DAN MENDUKUNG DEKARBONISASI",
      text: "Secara berkelanjutan mengembangkan solusi furnace yang lebih hemat energi, rendah emisi, dan selaras dengan target Net Zero 2060.",
    },
  },

  /* 08 — AFTER-SALES SERVICE & SUPPORT */
  {
    type: "service",
    tag: "AFTER-SALES SERVICE & SUPPORT",
    photo: "assets/home/manufacturing.jpg",
    title: ["LOCAL EXPERTISE."],
    accent: ["LIFETIME PARTNERSHIP."],
    subtitle: "Jaga keamanan, keandalan, dan performa furnace Anda, hari ini dan jangka panjang.",
    items: [
      { icon: "calendar", title: "REGULAR", accent: "MAINTENANCE", photo: "assets/company/11.jpg",
        desc: "Preventive maintenance untuk operasi andal dan aman." },
      { icon: "tools", title: "REPAIR &", accent: "TROUBLESHOOTING", photo: "assets/company/8.jpg",
        desc: "Penanganan cepat oleh tim teknisi berpengalaman." },
      { icon: "chart", title: "UPGRADE &", accent: "PERFORMANCE IMPROVEMENT", photo: "assets/home/engineering.jpg",
        desc: "Upgrade sistem safety, control, combustion, dll. untuk operasi lebih aman, efisien, dan optimal." },
      { icon: "gear", title: "SPARE PARTS", accent: "SUPPORT", photo: "assets/company/7.jpg",
        desc: "Penyediaan suku cadang utama dan komponen furnace secara cepat dan terpercaya." },
    ],
    advLabel: "KEUNGGULAN SWIFA",
    advantages: [
      { icon: "users", text: "Tim Ahli Berpengalaman" },
      { icon: "pin", text: "Lokal & Lebih Dekat" },
      { icon: "chat", text: "Komunikasi Mudah & Cepat" },
      { icon: "handshake", text: "Dukungan Jangka Panjang" },
    ],
    banner: {
      photo: "assets/bg/why.jpg",
      title: "MITRA LOKAL ANDAL", pre: "UNTUK ", accent: "FURNACE ANDA.",
      tags: ["Maintenance", "Repair", "Upgrade", "Spare Parts"],
    },
  },
];

/* ---------------------------------------------------------------------------
   PRODUK UNGGULAN — dibuka lewat tombol "PRODUK UNGGULAN KAMI" di footer.
   Tidak ikut loop otomatis. Tiap layar = hero + daftar "blocks".
   ⚠ Angka klaim (%, kg, °C) silakan disesuaikan di sini.
   Foto kosong ("") → tampil kotak placeholder dengan ikon; ganti path kapan saja.
   open: { cat, prod } → tombol LIHAT 3D / DETAIL ke produk di PRODUCT_CATEGORIES.
   Jenis block: cards, banner, stats, process, compare, info, principle, features,
                innovation, apps, video, techinfo, list, eco, cols (2 kolom)
   --------------------------------------------------------------------------- */
const FEATURED_PAGES = [
  /* 1 — HYBRID MELTING FURNACE */
  {
    title: ["HYBRID"], accent: ["MELTING FURNACE"],
    tagline: "Efisiensi Energi. Kualitas Aluminium. Desain Lebih Ringkas.",
    subtitle: "Teknologi hybrid yang menggabungkan gas burner untuk proses melting dan SA electric heater untuk proses holding.",
    photo: "assets/company/9.jpg",
    open: { cat: 0, prod: 1 },
    inset: { type: "principle", label: "PRINSIP OPERASI", items: [
      { icon: "fire", tone: "orange", title: "MELTING", sub: "Gas Burner", text: "Peleburan aluminium" },
      { icon: "bolt", tone: "blue", title: "HOLDING", sub: "SA Electric Heater", text: "Menjaga temperatur molten secara stabil" },
    ] },
    blocks: [
      { type: "cards", label: "KEUNGGULAN UTAMA", grow: true, items: [
        { title: "HEMAT ENERGI", icon: "leaf", color: "green",
          chart: { from: 100, to: 75, fromLabel: "Furnace Konvensional", toLabel: "Hybrid Melter" },
          big: "±25%", bigLabel: "Penghematan energi", note: "(hasil trial aktual di customer Sanken Sangyo)" },
        { title: "DROSS LEBIH RENDAH", icon: "chart", color: "green", photo: "assets/company/12.jpg",
          points: ["Mengurangi oksidasi dan pembentukan dross", "Temperatur holding lebih stabil", "Kualitas molten aluminium lebih baik"] },
        { title: "DESAIN COMPACT", icon: "move", color: "blue", photo: "assets/company/5.jpg", overlay: "21% DOWN",
          points: ["±21% pengurangan footprint (vs. standard furnace)", "Desain tower yang ringkas dan efisien"] },
        { title: "KONTROL TEMPERATUR PRESISI", icon: "heat", color: "blue", photo: "assets/home/assembly.jpg",
          big: "±3°C", bigLabel: "Kontrol temperatur holding", note: "(hasil aktual)",
          points: ["Pemanasan langsung pada molten", "Temperatur lebih stabil dan konsisten"] },
      ] },
      { type: "eco", icon: "cloud", title: "MENDUKUNG DEKARBONISASI",
        text: "Mengurangi emisi CO₂ dari proses pembakaran di area pabrik dan mendukung target karbon yang lebih rendah." },
    ],
  },

  /* 2 — ALUMINIUM BRIQUETTE MELTING SYSTEM */
  {
    title: ["ALUMINIUM"], accent: ["BRIQUETTE"], title2: ["MELTING SYSTEM"],
    tagline: "Recycle Aluminium Chips. *Save Space.* Recover More Metal.",
    subtitle: "Solusi peleburan aluminium briquette dengan sistem vortex melting yang ringkas dan efisien.",
    photo: "assets/company/13.jpg",
    open: { cat: 1, prod: 1 },
    inset: { type: "photo", photo: "", icon: "cube", label: "Aluminium Briquette (Chips)" },
    blocks: [
      { type: "banner", icon: "recycle", text: "TANPA PRETREATMENT LINE TERPISAH", accent: "LEBIH RINGKAS – LEBIH SEDIKIT EQUIPMENT" },
      { type: "stats", items: [
        { icon: "factory", pre: "HINGGA", value: "60%", label: "PENGURANGAN FOOTPRINT", note: "dibanding conventional recycling line" },
        { icon: "recycle", value: "≥98%", label: "METAL RECOVERY", note: "berdasarkan data Sanken" },
        { icon: "fire", value: "1/4", label: "KONSUMSI BAHAN BAKAR", note: "dibanding sistem konvensional" },
        { icon: "chart", value: "300–1.000", unit: "kg/jam", label: "KAPASITAS MELTING" },
      ] },
      { type: "process", label: "PROSES SINGKAT", grow: true, steps: [
        { photo: "", icon: "cube", label: "BRIQUETTE ALUMINIUM CHIPS" },
        { photo: "", icon: "fire", label: "IMMERSION / VORTEX MELTING" },
        { photo: "", icon: "furnace", label: "MOLTEN ALUMINIUM" },
      ], note: "Moisture dan cutting oil dibakar di melting chamber; gas hasil pembakaran mengalami afterburning." },
      { type: "cols", items: [
        { type: "compare", label: "DESAIN LEBIH RINGKAS", fromLabel: "Conventional Recycling Line", toLabel: "Briquette Melting System", value: "60%", valueLabel: "DOWN" },
        { type: "info", items: [
          { icon: "eco", text: "Briquetting membantu mengurangi penyebaran debu saat handling dan transportasi." },
          { icon: "gear", text: "Dapat dirancang sebagai furnace khusus atau diintegrasikan melalui modifikasi holding chamber pada tower melting & holding furnace yang sudah ada." },
        ] },
      ] },
    ],
  },

  /* 3 — ALUMINIUM ROTARY HEAT TREATMENT FURNACE */
  {
    title: ["ALUMINIUM ROTARY"], accent: ["HEAT TREATMENT", "FURNACE"],
    tagline: "Presisi, Efisien, dan Siap Mendukung Dekarbonisasi.",
    photo: "assets/company/2.jpg",
    open: { cat: 2, prod: 1 },
    inset: { type: "note", text: "Furnace rotari untuk perlakuan panas aluminium (T5 / T6 / T7) dengan kualitas, efisiensi, dan produktivitas tinggi." },
    blocks: [
      { type: "principle", label: "PRINSIP & HASIL PROSES", photo: "assets/bg/energy.jpg", icon: "rotate",
        title: "Perlakuan panas / Heat Treatment yang merata.",
        text: "Rotasi furnace dan distribusi suhu yang optimal untuk keseragaman temperatur hingga ±5°C." },
      { type: "features", label: "KEUNGGULAN TEKNOLOGI SANKEN", items: [
        { icon: "check", title: "BASKETLESS OPERATION", text: "Tanpa basket, lebih efisien." },
        { icon: "recycle", title: "EXHAUST HEAT RECOVERY", text: "Pemanfaatan panas buang." },
        { icon: "heat", title: "TEMPERATURE UNIFORMITY", value: "±5°C", text: "Keseragaman temperatur soaking." },
        { icon: "move", title: "COMPACT INSTALLATION", text: "Hemat ruang (hingga 50%)*" },
        { icon: "monitor", title: "PRODUCT TRACEABILITY", text: "Rekaman & monitoring proses." },
        { icon: "shield", title: "COMBUSTION SAFETY", value: "JIS B 8415", text: "Sistem pembakaran aman." },
      ], footnote: "* Pengurangan area instalasi hingga 50% berdasarkan brosur Sanken Sangyo (dibandingkan desain konvensional)." },
      { type: "innovation", label: "SWIFA INNOVATION", icon: "bolt", title: "FULL ELECTRIC", accent: "T6 ROTARY FURNACE",
        text: "Solusi heat treatment T6 dengan pemanas listrik penuh (full electric) yang telah diproduksi oleh SWIFA.",
        side: "Mendukung inisiatif *dekarbonisasi* dengan teknologi *full electric.*" },
      { type: "apps", label: "APLIKASI", grow: true, groups: [
        { tag: "BASKETLESS", items: [{ photo: "", icon: "gear", label: "Wheel" }, { photo: "", icon: "cube", label: "Cylinder Heads" }] },
        { tag: "TRAY", items: [{ photo: "", icon: "tools", label: "Brake Caliper" }, { photo: "", icon: "cube", label: "Other Small Parts" }] },
      ] },
    ],
  },

  /* 4 — KAMOGAWA 2.0 MOLTEN METAL PUMP */
  {
    title: ["KAMOGAWA 2.0"], accent: ["MOLTEN METAL PUMP"],
    tagline: "TRANSFER ALUMINIUM CAIR DENGAN OPERASI YANG LEBIH AMAN.",
    subtitle: "Pompa tipe pengeluaran molten metal untuk mentransfer aluminium cair dari furnace peleburan ke ladle, sebagai alternatif tapping konvensional yang lebih aman.",
    photo: "assets/company/3.jpg",
    open: { cat: 3, prod: 2 },
    inset: { type: "stat", icon: "chart", value: "400 kg / 56 detik", accent: "≈ 429 kg/menit", note: "(hasil aktual operasi SWIFA)" },
    blocks: [
      { type: "cols", grow: true, items: [
        { type: "stack", items: [
          { type: "video", label: "VIDEO OPERASIONAL", video: "", poster: "", grow: true },   // video: "assets/video/kamogawa.mp4"
          { type: "techinfo", label: "INFORMASI TEKNIS", items: [
            { icon: "gear", text: "Tipe Impeller Pump" },
            { icon: "heat", text: "Kedalaman Aluminium Maks.", value: "±500 mm" },
          ] },
        ] },
        { type: "list", label: "KEUNGGULAN UTAMA", items: [
          { icon: "hand", title: "Operasi Mudah", text: "Pengeluaran molten hanya dengan satu tombol." },
          { icon: "users", title: "Lebih Aman", text: "Operator bekerja lebih jauh dari aluminium cair dibanding tapping konvensional." },
          { icon: "shield", title: "Operasi Terproteksi", text: "Berhenti otomatis saat pemadaman listrik, gempa, atau emergency stop." },
          { icon: "check", title: "Tanpa Tapping Cone", text: "Tidak memerlukan tapping cone." },
          { icon: "shield", title: "Lebih Andal", text: "Tidak ada kekhawatiran kebocoran akibat degradasi tapping hole." },
          { icon: "heat", title: "Tanpa Preheating", text: "Setelah terpasang, tidak perlu pemanasan awal — siap digunakan." },
          { icon: "award", title: "Kualitas Molten Lebih Baik", text: "Mengambil molten dari bagian tengah, sehingga bottom dross dan logam berat tidak ikut keluar." },
        ] },
      ] },
    ],
  },
];

/* Logo customer — baris sliding di halaman Company Profile.
   1) OTOMATIS : file 1.png, 2.png, ... di assets/clients/ langsung muncul.
   2) DAFTAR   : tulis nama file di bawah. File yang tidak ditemukan dilewati. */
const CLIENT_LOGOS = [ "KYB.png", "TMMIN.png", "kyowa.png", "Astemo_logo.jpg", "aisin.jpg", "antam.png", "cmwiho.png", "artpiston.png", "toyoda.jpg", "akebono-logi.png", "adm.png", "astra.png", "sim.png",
  "logo-lg 1.png", "logo-suzuki-indomobil 1.png", "logoright 1.png"
];

/* ---------------------------------------------------------------------------
   PRODUK — 4 kategori (sesuai layar 05 & 06)
   Kategori: title (baris putih) + accent (baris kuning), icon, photo, desc.
   Produk:
     name, short (label tombol), desc,
     detail: [paragraf...]   → teks bergulir otomatis (opsional; default = desc)
     specs : [{value,label}] → kotak FITUR / SPESIFIKASI (maks 4)
     metrics: SKOR(energy, durability, adaptable) → bar chart (⚠ nilai 80 = contoh)
     modelFile (.glb/.gltf/.stl/.obj) + modelRotation {x,y,z} derajat
     image : gambar render, dipakai bila modelFile kosong
   --------------------------------------------------------------------------- */
const SKOR = (energy, durability, adaptable) => ({ energy, durability, adaptable });
const METRIC_LABELS = [
  { key: "energy", label: "ENERGY" },
  { key: "durability", label: "DURABILITY" },
  { key: "adaptable", label: "ADAPTABLE" },
];

const PRODUCT_CATEGORIES = [
  {
    n: "1", icon: "furnace", title: "ALUMINIUM", accent: "MELTING & HOLDING FURNACE",
    menu: "Aluminium Melting & Holding Furnace",
    photo: "assets/company/9.jpg",
    desc: "Peleburan dan penahanan aluminium yang efisien, aman dan hemat energi.",
    products: [
      {
        name: "Tower Melting Furnace", short: "Tower Melting", metrics: SKOR(80, 80, 80),
        desc: "Furnace peleburan tipe menara untuk lini produksi dengan alur vertikal.", modelFile: "", image: "", specs: [],
      },
      {
        name: "Hybrid Melter", short: "Hybrid Melter", metrics: SKOR(80, 80, 80),
        desc: "Gabungan gas burner & elektrik heater sebagai sumber panas — produk terbaru.",
        detail: [
          "Teknologi peleburan logam yang menggabungkan dua sumber panas, yaitu Gas Burner dan Electric Heater, dalam satu sistem melting furnace (tungku peleburan). Teknologi ini dirancang untuk mendukung proses peleburan yang lebih efisien dan ramah lingkungan.",
          "Jangan menilai energy saving hanya dari total gas atau listrik yang digunakan. Produksi yang turun juga bisa membuat konsumsi energi total turun, meskipun efisiensi furnace justru memburuk. Ukuran utama yang perlu diperhatikan adalah Specific Energy Consumption (SEC), yaitu energi yang digunakan per satuan produksi.",
          "Sistem hybrid memungkinkan sumber panas dikombinasikan dalam satu peralatan. Potensi penghematan bergantung pada desain, tarif energi, profil produksi, serta strategi pengoperasiannya.",
        ],
        // File CAD ini "Z-up" → diputar x:90 agar tegak, z:90 agar sisi burner menghadap depan
        modelFile: "models/MF_HYBRID.glb", modelRotation: { x: 90, y: 0, z: 90 }, image: "assets/home/hybrid-melter.png",
        specs: [
          { value: "±25%", label: "Penghematan energi (trial aktual)" },
          { value: "2 sumber", label: "Gas burner + electric heater" },
          { value: "100 kg – 4 t/jam", label: "Kapasitas lini melting" },
        ],
      },
      {
        name: "Crucible Furnace", short: "Crucible Furnace", metrics: SKOR(90, 95, 87),
        desc: "Crucible Melting Furnace adalah tungku industri yang digunakan untuk melebur logam menjadi cair atau mempertahankan logam agar tetap cair sebelum proses pengecoran (casting). Secara sederhana, bayangkan ada sebuah wadah khusus yang tahan terhadap suhu sangat tinggi di dalam tungku. Logam dimasukkan ke wadah tersebut, kemudian dipanaskan sampai mencair. Setelah itu, logam cair dapat digunakan untuk proses produksi atau dijaga suhunya sampai dibutuhkan. Crucible furnace berguna ketika pabrik membutuhkan proses peleburan logam dengan kapasitas yang sesuai kebutuhan produksi, atau membutuhkan logam cair di dekat mesin pengecoran (casting cell).",
        modelFile: "models/CRUCIBLE.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Daya Pemanas", value: "25-125 kW" },
          { label: "Suhu Maksimal", value: "±950°C" },
          { label: "Kapasitas", value: "Up to 1000 kg" },
          { label: "Heating System", value: "Electric/Gas" },
        ],
      },
      {
        name: "Holding Furnace — Under Heater 1000 kg", short: "Holding 1000 kg", metrics: SKOR(80, 80, 80),
        desc: "Holding Furnace merupakan peralatan termal industri yang berfungsi mempertahankan logam cair pada temperatur operasional yang stabil sebelum proses pengecoran (casting). Sistem ini dilengkapi pengendalian temperatur untuk meminimalkan kehilangan panas, menjaga homogenitas suhu, serta mengurangi risiko pembentukan oksida pada permukaan logam cair. Pengaturan temperatur yang presisi membantu menjaga kualitas material dan kestabilan proses produksi. Holding Furnace banyak digunakan pada industri pengecoran aluminium dan manufaktur komponen logam.",
        modelFile: "models/HOLDING.glb", image: "",
        specs: [
          { label: "Kapasitas", value: "Up to 1000 kg" },
          { label: "Heater Capacity", value: "2×8 kW" },
          { label: "Efisiensi", value: "Up to 75%" },
          { label: "Suhu", value: "700-1050°C" },
        ],
      },
    ],
  },
  {
    n: "2", icon: "recycle", title: "ALUMINIUM", accent: "RECYCLING",
    menu: "Aluminium Recycling",
    photo: "assets/company/13.jpg",
    desc: "Solusi daur ulang aluminium untuk pemanfaatan material yang lebih optimal, hemat energi dan ramah lingkungan.",
    products: [
      { name: "Chip Smelter Melting Furnace", short: "Chip Smelter", metrics: SKOR(80, 80, 80),
        desc: "Furnace peleburan khusus untuk material berbentuk chip/serpihan logam.", modelFile: "", image: "", specs: [] },
      { name: "Aluminium Briquette Melting System", short: "Briquette Melting", metrics: SKOR(80, 80, 80),
        desc: "Solusi peleburan aluminium briquette dengan sistem vortex melting yang ringkas dan efisien, tanpa pretreatment line terpisah. Moisture dan cutting oil dibakar di melting chamber; gas hasil pembakaran mengalami afterburning. Dapat dirancang sebagai furnace khusus atau diintegrasikan melalui modifikasi holding chamber pada tower melting & holding furnace yang sudah ada.",
        modelFile: "", image: "", specs: [
          { value: "Hingga 60%", label: "Pengurangan footprint" },
          { value: "≥98%", label: "Metal recovery" },
          { value: "1/4", label: "Konsumsi bahan bakar" },
          { value: "300–1.000 kg/jam", label: "Kapasitas melting" },
        ] },
    ],
  },
  {
    n: "3", icon: "heat", title: "ALUMINIUM", accent: "HEAT TREATMENT FURNACE",
    menu: "Aluminium Heat Treatment Furnace",
    photo: "assets/company/2.jpg",
    desc: "Furnace untuk proses solution, aging (T4/T5/T6/T7) dengan kontrol temperatur presisi dan hasil yang konsisten.",
    products: [
      {
        name: "T6 Batch Heat Treatment Furnace", short: "T6 Batch", metrics: SKOR(90, 85, 90),
        desc: "Roller Hearth Type — heat treatment kontinu untuk komponen compressor. Re-circulated hot air memanfaatkan panas buangan exhaust untuk pre-heating, mengoptimalkan efisiensi energi. Combustion system mengacu pada JIS B 8415.",
        modelFile: "models/BATCH_TYPE.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Operating Temp (max 300°C)", value: "240°C" },
          { label: "Hot Air Circulation", value: "331 m³/min" },
          { label: "Gas Burner Capacity", value: "116 kW" },
          { label: "Total Process Cycle", value: "60 min" },
        ],
      },
      {
        name: "T6 Rotary Heat Treatment Furnace", short: "T6 Rotary", metrics: SKOR(80, 80, 80),
        desc: "T6 merupakan proses perlakuan panas (heat treatment) pada aluminium yang bertujuan meningkatkan kekuatan, kekerasan, dan sifat mekanis material. Proses ini terdiri dari pemanasan (solution heat treatment), pendinginan cepat (quenching), dan pemanasan kembali (artificial aging). Melalui proses ini, komponen aluminium dapat memiliki ketahanan dan kualitas yang lebih baik. T6 banyak digunakan pada industri otomotif dan manufaktur yang membutuhkan komponen aluminium berkekuatan tinggi.",
        modelFile: "models/ROTARY_HT.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Solution Furnace", value: "505±10°C" },
          { label: "Quenching Tank", value: "85±5°C" },
          { label: "Aging Furnace", value: "210±10°C" },
          { label: "Gas Burner Capacity", value: "350 kW" },
        ],
      },
      {
        name: "Annealing Furnace", short: "Annealing", metrics: SKOR(80, 80, 80),
        desc: "Annealing Furnace merupakan peralatan perlakuan panas (heat treatment) yang berfungsi memanaskan material logam pada temperatur dan waktu penahanan (holding time) tertentu, diikuti proses pendinginan terkontrol. Proses ini bertujuan mengurangi tegangan sisa (residual stress), meningkatkan keuletan (ductility), serta mengoptimalkan struktur mikro material. Pengendalian temperatur dan laju pendinginan dilakukan untuk memperoleh sifat mekanis sesuai spesifikasi teknis. Annealing Furnace banyak diaplikasikan pada industri pengecoran, otomotif, dan manufaktur komponen logam.",
        modelFile: "models/ANNEALING.glb", image: "",
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
    n: "4", icon: "gear", title: "OTHER", accent: "FURNACE & EQUIPMENT",
    menu: "Other Furnace & Equipment",
    photo: "assets/company/7.jpg",
    desc: "Berbagai furnace non-aluminium dan peralatan pendukung sesuai kebutuhan proses industri Anda.",
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
      { name: "Molten Transfer Device", short: "Molten Transfer", metrics: SKOR(80, 80, 80),
        desc: "Molten Transfer merupakan proses pemindahan logam cair dari furnace peleburan menuju holding furnace atau mesin pengecoran (casting machine) dengan menggunakan sistem transfer khusus. Proses ini dirancang untuk menjaga kestabilan temperatur, meminimalkan kehilangan panas, serta mengurangi risiko oksidasi dan kontaminasi selama pemindahan. Pengendalian aliran dan temperatur logam cair menjadi faktor penting dalam menjaga kualitas material dan konsistensi produksi. Sistem Molten Transfer banyak diaplikasikan pada industri pengecoran aluminium dan manufaktur komponen logam.",
        modelFile: "models/MOLTEN.glb", image: "", specs: [
          { label: "Kapasitas", value: "Up to 500 kg" },
          { label: "Efisiensi", value: "Up to 85%" },
          { label: "Suhu", value: "350-750°C" },
        ] },
      { name: "Kamogawa 2.0 Molten Metal Pump", short: "Kamogawa 2.0", metrics: SKOR(80, 80, 80),
        desc: "Pompa tipe pengeluaran molten metal untuk mentransfer aluminium cair dari furnace peleburan ke ladle, sebagai alternatif tapping konvensional yang lebih aman. Pengeluaran molten cukup dengan satu tombol dan berhenti otomatis saat pemadaman listrik, gempa, atau emergency stop.",
        modelFile: "", image: "", specs: [
          { value: "≈429 kg/menit", label: "400 kg / 56 detik" },
          { value: "Impeller", label: "Tipe pompa" },
          { value: "±500 mm", label: "Kedalaman aluminium maks." },
        ] },
      { name: "Ladle Pre-Heat", short: "Ladle Pre-Heat", metrics: SKOR(80, 80, 80),
        desc: "Ladle Transfer merupakan proses pemindahan logam cair menggunakan wadah khusus (ladle) yang dirancang untuk menahan temperatur tinggi dan menjaga keamanan operasional. Sistem ini digunakan untuk mentransfer logam cair dari melting furnace menuju holding furnace atau mesin pengecoran (casting machine). Proses transfer dikendalikan untuk meminimalkan kehilangan panas, mencegah tumpahan, serta mengurangi risiko oksidasi dan kontaminasi logam cair. Ladle Transfer banyak diaplikasikan pada industri pengecoran aluminium dan manufaktur komponen logam.",
        modelFile: "models/LADDLE.glb", image: "", specs: [
          { label: "Kapasitas", value: "Up to 2000 kg" },
          { label: "Program", value: "PLC/HMI" },
          { label: "Transfer Speed", value: "Up to 50 m/min" },
        ] },
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
