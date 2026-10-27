/* ---------------------------------------------------------------------------
   PENGATURAN (waktu dalam milidetik)
   --------------------------------------------------------------------------- */
const CONFIG = {
  PAGE_MS: 15000,        // 1 halaman home = 15 detik
  HOLD_MS: 60000,        // setelah disentuh, loop berhenti 60 detik (masa penjelasan)
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
const CLIENT_LOGOS = [ "KYB.png", "TMMIN.png", "kyowa.png", "Astemo_logo.jpg", "aisin.jpg", "antam.png", "cmwiho.png", "artpiston.png","toyoda.jpg", "akebono-logi.jpg","logo-lg 1.png","logo-suzuki-indomobil 1.png","logoright 1.png"
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
    letter: "A", color: "blue", title: "HEAT TREATMENT", sub: "T5 Rotary Heat treatment · T6 Rotary Heat treatment",
    tag: "Dari proses kontinu compressor hingga cylinder head skala besar.",
    products: [
      {
        name: "T6 Batch Heat Treatment Furnace", short: "T6 Batch Rotary Heat treament", metrics: SKOR(90, 85, 90),
        desc: "Roller Hearth Type — heat treatment kontinu untuk komponen compressor. Re-circulated hot air memanfaatkan panas buangan exhaust untuk pre-heating, mengoptimalkan efisiensi energi. Combustion system sesuai JIS B8514.",
        modelFile: "models/BATCH_TYPE.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Operating Temp (max 300°C)", value: "240°C" },
          { label: "Hot Air Circulation", value: "331 m³/min" },
          { label: "Gas Burner Capacity", value: "116 kW" },
          { label: "Total Process Cycle", value: "60 min" },
        ],
      },
      {
        name: "Crucible Furnace", short: "Crucible Furnace", metrics: SKOR(90, 95, 87),
        desc: "Crucible Melting Furnace adalah tungku industri yang digunakan untuk melebur logam menjadi cair atau mempertahankan logam agar tetap cair sebelum proses pengecoran (casting).Secara sederhana, bayangkan ada sebuah wadah khusus yang tahan terhadap suhu sangat tinggi di dalam tungku. Logam dimasukkan ke wadah tersebut, kemudian dipanaskan sampai mencair. Setelah itu, logam cair dapat digunakan untuk proses produksi atau dijaga suhunya sampai dibutuhkan.Crucible furnace berguna ketika pabrik membutuhkan proses peleburan logam dengan kapasitas yang sesuai kebutuhan produksi, atau membutuhkan logam cair di dekat mesin pengecoran (casting cell)",
        modelFile: "models/CRUCIBLE.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Daya Pemanas", value: "25-125 kW" },
          { label: "Suhu Maksimal", value: "±950°C" },
          { label: "Kapasitas", value: "Up to 1000Kg" },
          { label: "Heating System", value: "Electric/Gas Burner" },
        ],
      },
   ],
},
    {
        name: "T6 Rotary Heat Treatment Furnace", short: "T6 Rotary Heat Treatment Furnace", metrics: SKOR(80, 80, 80),
        desc: "T6 merupakan proses perlakuan panas (heat treatment) pada aluminium yang bertujuan meningkatkan kekuatan, kekerasan, dan sifat mekanis material. Proses ini terdiri dari pemanasan (solution heat treatment), pendinginan cepat (quenching), dan pemanasan kembali (artificial aging). Melalui proses ini, komponen aluminium dapat memiliki ketahanan dan kualitas yang lebih baik. T6 banyak digunakan pada industri otomotif dan manufaktur yang membutuhkan komponen aluminium berkekuatan tinggi.",
        modelFile: "models/ROTARY_HT.glb", modelRotation: { x: 0, y: 0, z: 0 }, image: "",
        specs: [
          { label: "Solution Furnace", value: "505±10°C" },
          { label: "Quenching Tank", value: "85±5°C" },
          { label: "Aging Furnace", value: "210±10°C" },
          { label: "Gas Burner Capacity", value: "350 kW" },
        ],
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
        name: "Annealing Furnace", short: "Annealing furnace", metrics: SKOR(80, 80, 80),
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
    letter: "C", color: "red", title: "MELTING", sub: "Tower · Crucible · Chip Smelter · Hybrid Melter",
    tag: "Kapasitas 100 kg/jam – 4 ton/jam.",
    products: [
      { name: "Tower Melting Furnace", short: "Tower Melting", metrics: SKOR(80, 80, 80),
        desc: "Furnace peleburan tipe menara untuk lini produksi dengan alur vertikal.", modelFile: "", image: "", specs: [] },
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
    letter: "D", color: "blue", title: "HOLDING", sub: "Holding Furnace 700 – 2500 kg",
    tag: "Kapasitas 700 – 2500 kg, siap tuang tanpa pernah direpair.",
    products: [
      { name: "Under Heater — 1000 kg", short: "Under 1000kg", metrics: SKOR(80, 80, 80),
        desc: "Holding Furnace merupakan peralatan termal industri yang berfungsi mempertahankan logam cair pada temperatur operasional yang stabil sebelum proses pengecoran (casting). Sistem ini dilengkapi pengendalian temperatur untuk meminimalkan kehilangan panas, menjaga homogenitas suhu, serta mengurangi risiko pembentukan oksida pada permukaan logam cair. Pengaturan temperatur yang presisi membantu menjaga kualitas material dan kestabilan proses produksi. Holding Furnace banyak digunakan pada industri pengecoran aluminium dan manufaktur komponen logam.",
        modelFile: "models/HOLDING.glb", image: "",
        specs: [
          { label: "Kapasitas", value: "Up to 1000 kg" },
          { label: "Heater Capacity", value: "2×8 kW = 16 kW" },
          { label: "Efisiensi", value: "Up to 75%" },
          { label: "Suhu", value: "700-1050°C" },
        ] },
       ],
  },
  {
    letter: "E", color: "dark", wide: true, title: "AUXILIARY",
    sub: "Molten transfer device · Molten metal pump · Ladle pre-heat · Degassing · Conveyor · Heat exchanger · Automatic damper",
    tag: "Kelengkapan lini produksi furnace.",
    products: [
      { name: "Molten Transfer Device", short: "Molten Transfer", metrics: SKOR(80, 80, 80),
        desc: "Molten Transfer merupakan proses pemindahan logam cair dari furnace peleburan menuju holding furnace atau mesin pengecoran (casting machine) dengan menggunakan sistem transfer khusus. Proses ini dirancang untuk menjaga kestabilan temperatur, meminimalkan kehilangan panas, serta mengurangi risiko oksidasi dan kontaminasi selama pemindahan. Pengendalian aliran dan temperatur logam cair menjadi faktor penting dalam menjaga kualitas material dan konsistensi produksi. Sistem Molten Transfer banyak diaplikasikan pada industri pengecoran aluminium dan manufaktur komponen logam.", modelFile: "models/MOLTEN.glb", image: "", specs: [
           { label: "kapasitas", value : "up to 500Kg" },
           { label: "Efisinesi", value : "up to 85%"}, 
           { label: "Suhu", value : "350-750°C"},
        ] },
      { name: "Molten Metal Pump", short: "Metal Pump", metrics: SKOR(80, 80, 80),
        desc: "Pompa untuk memindahkan logam cair antar-stasiun produksi.", modelFile: "", image: "", specs: [] },
      { name: "Ladle Pre-Heat", short: "Ladle Pre-Heat", metrics: SKOR(80, 80, 80),
        desc: "Ladle Transfer merupakan proses pemindahan logam cair menggunakan wadah khusus (ladle) yang dirancang untuk menahan temperatur tinggi dan menjaga keamanan operasional. Sistem ini digunakan untuk mentransfer logam cair dari melting furnace menuju holding furnace atau mesin pengecoran (casting machine). Proses transfer dikendalikan untuk meminimalkan kehilangan panas, mencegah tumpahan, serta mengurangi risiko oksidasi dan kontaminasi logam cair. Ladle Transfer banyak diaplikasikan pada industri pengecoran aluminium dan manufaktur komponen logam.", 
modelFile: "models/LADDLE.glb", image: "", specs: [
   { label : "Kapasitas", value :"Up to 2000 kg" },
   { label : "Program", value : "PLC/HMI"},
   { label : "transfer speed", value : "Up to 50m/min"},
] },
      { name: "Degassing", short: "Degassing", metrics: SKOR(80, 80, 80),
        desc: "Sistem penghilang gas pada logam cair.", modelFile: "", image: "", specs: [] },
      { name: "Conveyor", short: "Conveyor", metrics: SKOR(80, 80, 80),
        desc: "Sistem konveyor untuk mengalirkan material antar-proses.", modelFile: "", image: "", specs: [] },
      { name: "Heat Exchanger", short: "Heat Exchanger", metrics: SKOR(80, 80, 80),
        desc: "Penukar panas yang memanfaatkan panas dari gas buang.", modelFile: "", image: "", specs: [] },
      { name: "Automatic Damper", short: "Auto Damper", metrics: SKOR(80, 80, 80),
        desc: "Damper otomatis untuk mengatur aliran udara/gas pada furnace.", modelFile: "", image: "", specs: [] },
    ],
  },
];
