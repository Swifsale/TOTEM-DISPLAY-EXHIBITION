const COMPANY_STATS = [
  { value: 75, suffix: "+", label: "Tahun warisan Sanken Sangyo, Jepang" },
  { value: 50, suffix: "+", label: "Perusahaan besar dilayani (Toyota, Daihatsu, Yamaha, Suzuki, Astra, Komatsu, dll)" },
  { value: 100, suffix: "%", label: "Kontrol mutu manufaktur mengikuti standar Sanken Sangyo" },
  { value: 24, suffix: "/7", label: "Dukungan & perawatan purna jual" },
];

// ---------------------------------------------------------------------------
// Linimasa perusahaan (section "Perjalanan Kami")
// ---------------------------------------------------------------------------
const COMPANY_TIMELINE = [
  { year: "1949", title: "Sanken Sangyo didirikan", text: "Berdiri di Jepang, memulai spesialisasi di bidang furnace industri." },
  { year: "2011", title: "PT SWIF Asia berdiri", text: "Didirikan di Indonesia untuk melayani pasar Indonesia & ASEAN sebagai bagian dari SANKEN Group." },
  { year: "Kini", title: "No. 1 Furnace Manufacturer di ASEAN", text: "50+ perusahaan telah dilayani, dengan kontrol mutu manufaktur mengikuti standar ketat Sanken Sangyo." },
];

// ---------------------------------------------------------------------------
// Klien / mitra yang pernah dilayani (nama sesuai halaman resmi swifasia.com)
// Logo asli belum disertakan — tampil sebagai wordmark sementara.
// Ganti PLACEHOLDER_LOGO di bawah dengan path logo asli saat sudah tersedia.
// ---------------------------------------------------------------------------
const TRUSTED_CLIENTS = [
  { name: "Toyota" },
  { name: "Daihatsu" },
  { name: "Yamaha" },
  { name: "Suzuki" },
  { name: "Astra" },
  { name: "Komatsu" },
];

// ---------------------------------------------------------------------------
// Lini produk lengkap — 7 kategori resmi SWIF Asia
// image: "PLACEHOLDER:<nama-slot>" → ganti dengan path file asli di /models
//        atau /assets saat tersedia. Selama masih placeholder, totem akan
//        menampilkan panel bertekstur dengan label nama slot (bukan gambar
//        rusak) supaya tetap enak dilihat di pameran.
// ---------------------------------------------------------------------------
const PRODUCT_CATEGORIES = [
  {
    id: "melting",
    name: "Melting Furnace",
    tagline: "Kapasitas 100 kg/jam – 4 ton/jam",
    intro: "Furnace peleburan logam dengan pilihan sumber panas gas burner, hybrid, atau elektrik, disesuaikan kebutuhan lini produksi pelanggan.",
    items: [
      {
        code: "TWM",
        name: "Tower Melting Furnace",
        desc: "Furnace peleburan tipe menara (tower) untuk lini produksi dengan alur vertikal.",
        image: "assets/tower_melting.jpg",
        specs: ["Kapasitas: -- lengkapi --", "Sumber panas: -- lengkapi --", "Standar keselamatan: -- lengkapi --"],
        hasModel: false,
      },
      {
        code: "CMF",
        name: "Crucible Melting Furnace",
        desc: "Untuk melebur dan/atau menahan (holding) logam cair di sisi sel pengecoran. Kapasitas dapat disesuaikan permintaan pelanggan, dengan opsi kepatuhan standar keselamatan pembakaran JIS B8415:2008.",
        image: "PLACEHOLDER:produk-crucible-melting-furnace",
        specs: ["Kapasitas: menyesuaikan permintaan", "Standar: JIS B8415:2008 (opsional)", "Fungsi: melting & holding"],
        hasModel: false,
      },
      {
        code: "CSMF",
        name: "Chip Smelter Melting Furnace",
        desc: "Furnace peleburan khusus untuk material berbentuk chip/serpihan logam.",
        image: "PLACEHOLDER:produk-chip-smelter-melting-furnace",
        specs: ["Kapasitas: -- lengkapi --", "Material input: chip logam", "Sumber panas: -- lengkapi --"],
        hasModel: true,
        modelFile: "models/csmf.stl",
      },
      {
        code: "HybM",
        name: "Hybrid Melter",
        desc: "Melting furnace yang menggabungkan gas burner dan pemanas elektrik sebagai sumber panasnya, untuk efisiensi energi lebih tinggi.",
        image: "PLACEHOLDER:produk-hybrid-melter",
        specs: ["Sumber panas: Gas Burner + Elektrik Heater", "Status: Produk terbaru", "Kapasitas: -- lengkapi --"],
        hasModel: false,
      },
    ],
  },
  {
    id: "heat-treatment",
    name: "Heat Treatment",
    tagline: "Emisi karbon lebih rendah, kualitas hasil lebih tinggi",
    intro: "Furnace perlakuan panas dengan mekanisme alur material yang dapat disesuaikan lini produksi.",
    items: [
      {
        code: "RHT",
        name: "Roller Heat Treatment",
        desc: "Heat treatment furnace dengan alur material menggunakan sistem roller.",
        image: "PLACEHOLDER:produk-roller-heat-treatment",
        specs: ["Sistem alur: roller", "Sumber panas: -- lengkapi --", "Kapasitas: -- lengkapi --"],
        hasModel: false,
      },
      {
        code: "ROTARY HT",
        name: "Rotary Heat Treatment Furnace",
        desc: "Heat treatment furnace dengan alur material yang disusun pada rack terhubung mekanisme rotary. Opsi sumber panas: combustion burner, hybrid (burner + elektrik), atau elektrik heater.",
        image: "assets/ROTARY_HT.jpg",
        specs: ["Sumber panas: Burner / Hybrid / Elektrik", "Sistem alur: rack rotary", "Kapasitas: -- lengkapi --"],
        hasModel: false,
      },
    ],
  },
  {
    id: "holding",
    name: "Holding Furnace",
    tagline: "Menjaga suhu logam cair siap tuang",
    intro: "Furnace untuk menahan logam cair pada suhu kerja sebelum proses penuangan/pengecoran.",
    items: [
      {
        code: "HF",
        name: "Holding Furnace",
        desc: "-- lengkapi deskripsi teknis --",
        image: "PLACEHOLDER:produk-holding-furnace",
        specs: ["Kapasitas: -- lengkapi --", "Sumber panas: -- lengkapi --"],
        hasModel: false,
      },
    ],
  },
  {
    id: "other-equipment",
    name: "Peralatan Pendukung",
    tagline: "Kelengkapan lini produksi furnace",
    intro: "Perangkat pendukung operasional furnace, dari penanganan logam cair hingga kualitas udara area kerja.",
    items: [
      {
        code: "LD",
        name: "Ladle Device",
        desc: "Perangkat bantu penuangan/pemindahan logam cair.",
        image: "PLACEHOLDER:produk-ladle-device",
        specs: ["Kapasitas: -- lengkapi --"],
        hasModel: false,
      },
      {
        code: "PMT",
        name: "Porter Metal Transfer",
        desc: "Sistem transfer logam antar-stasiun produksi.",
        image: "PLACEHOLDER:produk-porter-metal-transfer",
        specs: ["Kapasitas: -- lengkapi --"],
        hasModel: false,
      },
      {
        code: "DC",
        name: "Dust Collector",
        desc: "Sistem penangkap debu untuk menjaga kualitas udara area produksi.",
        image: "PLACEHOLDER:produk-dust-collector",
        specs: ["Kapasitas hisap: -- lengkapi --"],
        hasModel: false,
      },
    ],
  },
  {
    id: "spare-parts",
    name: "Spare Parts",
    tagline: "Komponen pengganti orisinal",
    intro: "Suku cadang untuk menjaga performa furnace tetap optimal.",
    items: [
      {
        code: "HEATER",
        name: "Immersion Heater Atherm",
        desc: "-- lengkapi deskripsi teknis --",
        image: "PLACEHOLDER:produk-immersion-heater",
        specs: ["Daya: -- lengkapi --"],
        hasModel: false,
      },
    ],
  },
  {
    id: "service",
    name: "Layanan & Perawatan",
    tagline: "Dukungan purna jual 24/7",
    intro: "Layanan perawatan, perbaikan, dan modifikasi untuk memastikan umur pakai furnace tetap panjang.",
    items: [
      { code: "SVC-01", name: "Perawatan Berkala", desc: "-- lengkapi cakupan layanan --", image: "PLACEHOLDER:layanan-perawatan", specs: [], hasModel: false },
      { code: "SVC-02", name: "Jasa Fabrikasi", desc: "-- lengkapi cakupan layanan --", image: "PLACEHOLDER:layanan-fabrikasi", specs: [], hasModel: false },
      { code: "SVC-03", name: "Perbaikan/Modifikasi Panel Kontrol", desc: "-- lengkapi cakupan layanan --", image: "PLACEHOLDER:layanan-panel-kontrol", specs: [], hasModel: false },
      { code: "SVC-04", name: "Perbaikan/Modifikasi Refraktori", desc: "-- lengkapi cakupan layanan --", image: "PLACEHOLDER:layanan-refraktori", specs: [], hasModel: false },
      { code: "SVC-05", name: "Perbaikan/Modifikasi Mekanikal", desc: "-- lengkapi cakupan layanan --", image: "PLACEHOLDER:layanan-mekanikal", specs: [], hasModel: false },
    ],
  },
];

// ---------------------------------------------------------------------------
// Produk unggulan yang ditampilkan di viewer 3D utama.
// Tambahkan produk lain ke array ini (dengan modelFile .stl masing-masing)
// agar muncul sebagai pilihan tab di section "Rasakan Mesinnya dalam 3D".
// ---------------------------------------------------------------------------
const FEATURED_3D_PRODUCTS = [
  {
    code: "CSMF",
    name: "Chip Smelter Melting Furnace",
    modelFile: "models/csmf.stl", // ganti dengan file .stl asli di folder /models
    specs: [
      { label: "Kategori", value: "Melting Furnace" },
      { label: "Material input", value: "Chip / serpihan logam" },
      { label: "Kapasitas", value: "-- lengkapi --" },
      { label: "Sumber panas", value: "-- lengkapi --" },
      { label: "Standar keselamatan", value: "-- lengkapi --" },
    ],
  },
   {
    code: "HybM",
    name: "Hybrid Melter",
    modelFile: "models/MF_HYBRID.stl", 
    specs: [
      { label: "Kategori", value: "Melting Furnace" },
      { label: "Material input", value: "Chip / serpihan logam" },
      { label: "Kapasitas", value: "150-1 TON" },
      { label: "Sumber panas", value: "GAS DAN LISTRIK" },
      { label: "Standar keselamatan", value: "JIS,ISO,SNI" },
    ],
  },
  // Contoh menambah produk kedua ke viewer:
  // {
  //   code: "ROTARY HT",
  //   name: "Rotary Heat Treatment Furnace",
  //   modelFile: "models/rotary-ht.stl",
  //   specs: [
  //     { label: "Kategori", value: "Heat Treatment" },
  //     { label: "Sumber panas", value: "Burner / Hybrid / Elektrik" },
  //   ],
  // },
];
