
// ---------------------------------------------------------------------------
// Identitas di header & footer totem
// ---------------------------------------------------------------------------
const TOTEM_HEADER = {
  logoText: "SWIF",
  logoImage: "assets/logo-swifasia.png",
  company: "PT SWIF ASIA",
  companySub: "Industrial Furnace & Heat Treatment",
  eventLine1: "TOTEM DISPLAY",
  eventLine2: "EXHIBITION 2026",
};

const TOTEM_FOOTER = {
  sloganPlain: "Heartful ",
  sloganEmphasis: "Thermal Technology.",
  cta: "Sentuh model untuk memutar  •  No.1 Furnace Manufacturer di ASEAN",
};

// ---------------------------------------------------------------------------
// Slide 1 — Tentang Kami
// ---------------------------------------------------------------------------
const INTRO_SLIDE = {
  badge: "TENTANG KAMI",
  title: "Heartful Thermal Technology",
  tag: '"75+ tahun keahlian Jepang, sejak 1949."',
  stageLabel: "Warisan Sanken Sangyo",
  stageSub: "Sejak 1949, Jepang",
  timeline: [
    { year: "1949", title: "Sanken Sangyo didirikan", text: "Berdiri di Jepang, memulai spesialisasi furnace industri." },
    { year: "2011", title: "PT SWIF Asia berdiri", text: "Melayani pasar Indonesia & ASEAN sebagai bagian dari SANKEN Group." },
    { year: "Kini", title: "Berbasis di Cikarang", text: "Kawasan GIIC, Kota Delta Mas, Cikarang Pusat — Bekasi." },
  ],
  stats: [
    { value: "75+", label: "Tahun warisan" },
    { value: "ISO", label: "Standar mutu" },
    { value: "JIS B8514", label: "Standar keamanan combustion" },
    { value: "24/7", label: "Dukungan" },
  ],
  backgroundImage: "assets/background-hero.jpg",
  trustedClients: ["Suzuki Indomobil Motor", "Astra Otoparts Nusa Metal", "Astra Daihatsu Motor", "Progress Die Cast"],
};

// ---------------------------------------------------------------------------
// Slide 2 — Why SWIF Asia (keunggulan & rekam jejak)
// Tipe "info": sama seperti slide intro (daftar statis + panel angka),
// tanpa viewer 3D.
// ---------------------------------------------------------------------------
const INFO_SLIDES = [
  {
    badge: "KEUNGGULAN",
    title: "Why SWIF Asia",
    tag: '"0 kali repair sejak unit pertama terpasang."',
    stageLabel: "Rekam Jejak",
    stageSub: "Tercatat sejak unit dipasang",
    // Sementara pakai foto pabrik yang sama seperti slide Tentang Kami.
    // Ganti dengan foto/video rekam jejak sendiri kapan saja:
    backgroundImage: "assets/background-hero.jpg",
    // Atau pakai video (hapus/kosongkan backgroundImage di atas kalau pakai ini,
    // backgroundVideo selalu diprioritaskan kalau dua-duanya diisi):
    // backgroundVideo: "assets/rekam-jejak.mp4",
    timeline: [
      { year: "01", title: "Trusted by Leading OEMs", text: "Dipercaya Suzuki Indomobil Motor, Astra Otoparts Nusa Metal, Astra Daihatsu Motor, & Progress Die Cast." },
      { year: "02", title: "Zero-Repair Track Record", text: "Seluruh unit terpasang belum pernah tercatat mengalami kerusakan/perbaikan sejak instalasi." },
      { year: "03", title: "Certified Safety Standard", text: "Sistem combustion produk heat treatment memenuhi standar keselamatan JIS B8514." },
      { year: "04", title: "Custom-Engineered Design", text: "Fleksibel merancang kapasitas pemanas & dimensi furnace sesuai kebutuhan spesifik customer." },
    ],
    stats: [
      { value: "11+", label: "Unit furnace terkirim ke OEM" },
      { value: "0", label: "Kali repair tercatat" },
      { value: "5", label: "Unit Astra Daihatsu Motor (2021)" },
      { value: "4", label: "OEM otomotif besar" },
    ],
    trustedClients: ["Suzuki Indomobil Motor", "Astra Otoparts Nusa Metal", "Astra Daihatsu Motor", "Progress Die Cast"],
  },
];

// ---------------------------------------------------------------------------
// Slide produk — tiap kategori jadi satu slide, tiap item jadi satu "feat"
// yang bisa disentuh untuk mengganti model 3D di panel kanan/stage.
// ---------------------------------------------------------------------------
const PRODUCT_SLIDES = [
  {
    badge: "LINI PRODUK",
    title: "Melting Furnace",
    tag: '"Kapasitas 100 kg/jam – 4 ton/jam."',
    products: [
      {
        name: "Tower Melting Furnace", short: "Tower Melting", code: "TWM",
        desc: "Furnace peleburan tipe menara untuk lini produksi dengan alur vertikal.",
        modelFile: "", specs: [],
      },
      {
        name: "Crucible Melting Furnace", short: "Crucible", code: "CMF",
        desc: "Melt & holding logam cair di sisi sel pengecoran, opsi standar JIS B8415:2008.",
        modelFile: "", specs: [],
      },
      {
        name: "Chip Smelter Melting Furnace", short: "Chip Smelter", code: "CSMF",
        desc: "Furnace peleburan khusus untuk material berbentuk chip/serpihan logam.",
        modelFile: "", specs: [],
      },
      {
        name: "Hybrid Melter", short: "Hybrid Melter", code: "HybM",
        desc: "Gabungan gas burner & elektrik heater sebagai sumber panas — produk terbaru.",
        modelFile: "models/MF_HYBRID.glb",
        modelRotation: { x: 0, y: 0, z: 0 },
        specs: [],
      },
    ],
  },
  {
    badge: "LINI PRODUK",
    title: "Heat Treatment Furnace",
    tag: '"Dari proses kontinu compressor hingga cylinder head skala besar."',
    products: [
      {
        name: "T5 Heat Treatment Furnace", short: "T5 Roller Hearth", code: "T5",
        desc: "Roller Hearth Type — heat treatment kontinu untuk komponen compressor. Re-circulated hot air memanfaatkan panas buangan exhaust untuk pre-heating, mengoptimalkan efisiensi energi. Combustion system sesuai JIS B8514.",
        modelFile: "", modelRotation: { x: 0, y: 0, z: 0 },
        specs: [
          { label: "Operating Temp (max 300°C)", value: "240°C" },
          { label: "Hot Air Circulation", value: "331 m³/min" },
          { label: "Gas Burner Capacity", value: "116 kW" },
          { label: "Total Process Cycle", value: "60 min" },
        ],
      },
      {
        name: "T6 Heat Treatment Furnace", short: "T6 Roller Hearth", code: "T6",
        desc: "Roller Hearth Type — untuk processing cylinder head, alur proses 15 zona (solution heating & soaking, quenching, aging heating & soaking), dikendalikan otomatis via damper berbasis thermocouple. Sistem terlengkap di jajaran produk SWIF Asia.",
        modelFile: "", modelRotation: { x: 0, y: 0, z: 0 },
        specs: [
          { label: "Solution Furnace", value: "505±10°C" },
          { label: "Quenching Tank", value: "85±5°C" },
          { label: "Aging Furnace", value: "210±10°C" },
          { label: "Gas Burner Capacity", value: "350 kW" },
        ],
      },
      {
        name: "Rotary Heat Treatment Furnace", short: "Rotary HT", code: "ROTARY HT",
        desc: "Alur material pada rack rotary. Opsi panas: burner, hybrid, atau elektrik.",
        modelFile: "models/ROTARY_HT.glb",
        modelRotation: { x: 0, y: 0, z: 0 },
        specs: [],
      },
    ],
  },
  {
    badge: "LINI PRODUK",
    title: "Aluminium Holding Furnace",
    tag: '"Kapasitas 700 – 2500 kg, siap tuang tanpa pernah direpair."',
    products: [
      {
        name: "Under Heater — 1000 kg", short: "Under 1000kg", code: "UH-1000",
        desc: "Dipercaya PT. Suzuki Indomobil Motor (2016) & PT. Astra Otoparts Nusa Metal (2018) dengan desain identik. 0 kali repair/kerusakan sejak dipasang.",
        modelFile: "", specs: [
          { label: "Kapasitas", value: "1000 kg" },
          { label: "Heater Capacity", value: "2×8 kW = 16 kW" },
          { label: "Klien", value: "Suzuki (2016), Astra Otoparts (2018)" },
          { label: "Repair Tercatat", value: "0 kali" },
        ],
      },
      {
        name: "Roof Heater — 700 kg", short: "Roof 700kg", code: "RH-700",
        desc: "Untuk kebutuhan kapasitas lebih kecil — pemanas diposisikan di bagian atas tungku. Dipercaya PT. Progress Die Cast sejak 2020, 0 kali repair.",
        modelFile: "", specs: [
          { label: "Kapasitas", value: "700 kg" },
          { label: "Heater Capacity", value: "6×3 kW = 18 kW" },
          { label: "Klien", value: "Progress Die Cast (2020)" },
          { label: "Repair Tercatat", value: "0 kali" },
        ],
      },
      {
        name: "Side (SA) Heater — 1500 kg", short: "Side 1500kg", code: "SA-1500",
        desc: "Bagian dari proyek 5 unit untuk PT. Astra Daihatsu Motor (2021), 2 unit kapasitas ini. Beroperasi tanpa kerusakan hingga kini.",
        modelFile: "", specs: [
          { label: "Kapasitas", value: "1500 kg" },
          { label: "Heater Capacity", value: "2×15 kW = 30 kW/unit" },
          { label: "Klien", value: "Astra Daihatsu Motor (2021) — 2 unit" },
          { label: "Repair Tercatat", value: "0 kali" },
        ],
      },
      {
        name: "Side (SA) Heater — 2500 kg", short: "Side 2500kg", code: "SA-2500",
        desc: "Varian kapasitas terbesar dari proyek 5 unit PT. Astra Daihatsu Motor (2021), 3 unit kapasitas ini. Beroperasi tanpa kerusakan hingga kini.",
        modelFile: "", specs: [
          { label: "Kapasitas", value: "2500 kg" },
          { label: "Heater Capacity", value: "3×15 kW = 45 kW/unit" },
          { label: "Klien", value: "Astra Daihatsu Motor (2021) — 3 unit" },
          { label: "Repair Tercatat", value: "0 kali" },
        ],
      },
    ],
  },
  {
    badge: "LINI PRODUK",
    title: "Auxiliary Furnace",
    tag: '"Melengkapi tahap akhir proses coating & finishing."',
    products: [
      {
        name: "Drying Oven Furnace", short: "Drying Oven", code: "DRY",
        desc: "Untuk drying core paint — material dimasukkan langsung ke ruang heating.",
        modelFile: "", specs: [
          { label: "Operating Temp", value: "220°C" },
          { label: "Hot Air Circulation", value: "400 m³/min" },
          { label: "Gas Burner", value: "233 kW" },
          { label: "Process Cycle", value: "60 min" },
        ],
      },
      {
        name: "Heating Furnace (Batch-Boggie)", short: "Batch-Boggie", code: "HFB",
        desc: "Untuk coating hardening — material diletakkan pada boggie yang masuk ke ruang furnace.",
        modelFile: "", specs: [
          { label: "Operating Temp", value: "500°C" },
          { label: "Hot Air Circulation", value: "250 m³/min" },
          { label: "Gas Burner", value: "233 kW" },
          { label: "Process Cycle", value: "180 min" },
        ],
      },
    ],
  },
  {
    badge: "PERALATAN PENDUKUNG",
    title: "Peralatan Pendukung",
    tag: '"Kelengkapan lini produksi furnace."',
    products: [
      { name: "Ladle Device", short: "Ladle", code: "LD", desc: "Perangkat bantu penuangan/pemindahan logam cair.", modelFile: "", specs: [] },
      { name: "Porter Metal Transfer", short: "Porter", code: "PMT", desc: "Sistem transfer logam antar-stasiun produksi.", modelFile: "", specs: [] },
      { name: "Dust Collector", short: "Dust Collector", code: "DC", desc: "Sistem penangkap debu untuk menjaga kualitas udara area produksi.", modelFile: "", specs: [] },
    ],
  },
  {
    badge: "SPARE PARTS & LAYANAN",
    title: "Spare Parts & Layanan",
    tag: '"Dukungan purna jual 24/7."',
    products: [
      { name: "Spare Parts Furnace", short: "Spare Parts", code: "PARTS", desc: "Komponen pengganti orisinal, termasuk immersion heater Atherm — menjaga performa furnace tetap optimal.", modelFile: "", specs: [] },
      { name: "Layanan Purna Jual", short: "Layanan", code: "SVC", desc: "Perawatan berkala, fabrikasi, serta perbaikan/modifikasi panel kontrol, refraktori, dan mekanikal.", modelFile: "", specs: [] },
    ],
  },
];
