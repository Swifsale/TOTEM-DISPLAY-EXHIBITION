
// ---------------------------------------------------------------------------
// Identitas di header & footer totem
// ---------------------------------------------------------------------------
const TOTEM_HEADER = {
  logoText: "SWIF",                 // teks singkat di kotak logo (dipakai jika logo image gagal dimuat)
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
// Slide pembuka (intro perusahaan) — tampil sebagai slide pertama
// ---------------------------------------------------------------------------
const INTRO_SLIDE = {
  badge: "TENTANG KAMI",
  title: "Heartful Thermal Technology",
  tag: '"75+ tahun keahlian Jepang, sejak 1949."',
  timeline: [
    { year: "1949", title: "Sanken Sangyo didirikan", text: "Berdiri di Jepang, memulai spesialisasi furnace industri." },
    { year: "2011", title: "PT SWIF Asia berdiri", text: "Melayani pasar Indonesia & ASEAN sebagai bagian dari SANKEN Group." },
    { year: "Kini", title: "No.1 Furnace Manufacturer ASEAN", text: "50+ perusahaan dilayani, kontrol mutu mengikuti standar Sanken Sangyo." },
  ],
  stats: [
    { value: "75+", label: "Tahun warisan" },
    { value: "50+", label: "Perusahaan dilayani" },
    { value: "ISO", label: "Manajemen mutu" },
    { value: "24/7", label: "Dukungan" },
  ],
  backgroundImage: "assets/background-hero.jpg",
  trustedClients: ["Toyota", "Daihatsu", "Yamaha", "Suzuki", "Astra", "Komatsu"],
};

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
        modelFile: "", // -- lengkapi path .glb/.stl/.obj bila sudah ada --
      },
      {
        name: "Crucible Melting Furnace", short: "Crucible", code: "CMF",
        desc: "Melt & holding logam cair di sisi sel pengecoran, opsi standar JIS B8415:2008.",
        modelFile: "",
      },
      {
        name: "Chip Smelter Melting Furnace", short: "Chip Smelter", code: "CSMF",
        desc: "Furnace peleburan khusus untuk material berbentuk chip/serpihan logam.",
        modelFile: "models/csmf.stl", // contoh: sudah terisi (masih placeholder kubus)
      },
      {
        name: "Hybrid Melter", short: "Hybrid Melter", code: "HybM",
        desc: "Gabungan gas burner & elektrik heater sebagai sumber panas — produk terbaru.",
        modelFile: "MF_HYBRID.stl",
      },
    ],
  },
  {
    badge: "LINI PRODUK",
    title: "Heat Treatment",
    tag: '"Emisi lebih rendah, kualitas hasil lebih konsisten."',
    products: [
      {
        name: "Roller Heat Treatment", short: "Roller HT", code: "RHT",
        desc: "Heat treatment furnace dengan alur material menggunakan sistem roller.",
        modelFile: "",
      },
      {
        name: "Rotary Heat Treatment Furnace", short: "Rotary HT", code: "ROTARY HT",
        desc: "Alur material pada rack rotary. Opsi panas: burner, hybrid, atau elektrik.",
        modelFile: "",
      },
    ],
  },
  {
    badge: "LINI PRODUK",
    title: "Holding Furnace",
    tag: '"Menjaga suhu logam cair siap tuang."',
    products: [
      {
        name: "Holding Furnace", short: "Holding", code: "HF",
        desc: "-- lengkapi deskripsi teknis --",
        modelFile: "",
      },
    ],
  },
  {
    badge: "PERALATAN PENDUKUNG",
    title: "Peralatan Pendukung",
    tag: '"Kelengkapan lini produksi furnace."',
    products: [
      { name: "Ladle Device", short: "Ladle", code: "LD", desc: "Perangkat bantu penuangan/pemindahan logam cair.", modelFile: "" },
      { name: "Porter Metal Transfer", short: "Porter", code: "PMT", desc: "Sistem transfer logam antar-stasiun produksi.", modelFile: "" },
      { name: "Dust Collector", short: "Dust Collector", code: "DC", desc: "Sistem penangkap debu untuk menjaga kualitas udara area produksi.", modelFile: "" },
    ],
  },
  {
    badge: "SPARE PARTS & LAYANAN",
    title: "Spare Parts & Layanan",
    tag: '"Dukungan purna jual 24/7."',
    products: [
      { name: "Immersion Heater Atherm", short: "Heater", code: "HEATER", desc: "-- lengkapi deskripsi teknis --", modelFile: "" },
      { name: "Perawatan Berkala", short: "Perawatan", code: "SVC-01", desc: "-- lengkapi cakupan layanan --", modelFile: "" },
      { name: "Jasa Fabrikasi", short: "Fabrikasi", code: "SVC-02", desc: "-- lengkapi cakupan layanan --", modelFile: "" },
      { name: "Modifikasi Panel Kontrol", short: "Panel Kontrol", code: "SVC-03", desc: "-- lengkapi cakupan layanan --", modelFile: "" },
    ],
  },
];
