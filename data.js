/* ==========================================================
   SWIF ASIA — Product & case-study data
   Struktur kategori & katalog produk disamakan dengan
   www.swifasia.com (menu "Product & Services"): Melting
   Furnace, Heat Treatment, Holding Furnace, Other Equipment,
   Spare Parts, Service.
   Spesifikasi teknis detail (kapasitas, suhu, standar
   combustion) tetap mengacu ke brosur/technical data sheet
   internal SWIF Asia untuk unit yang datanya tersedia.
   Harga sengaja tidak ditampilkan di totem publik.
   Tambah/ubah produk cukup di sini, index.html & script.js
   tidak perlu disentuh.
   ========================================================== */

export const CATEGORIES = [
  { id: 'melting',     label: 'Melting Furnace' },
  { id: 'heat',        label: 'Heat Treatment' },
  { id: 'holding',     label: 'Holding Furnace' },
  { id: 'other',       label: 'Other Equipment' },
  { id: 'spareparts',  label: 'Spare Parts' },
  { id: 'service',     label: 'Service' },
];

/* Perusahaan yang sudah menggunakan produk SWIF Asia — ditampilkan
   sebagai strip "Trusted by" di section statistik. */
export const TRUSTED_BY = ['TOYOTA', 'DAIHATSU', 'YAMAHA', 'SUZUKI', 'ASTRA'];

/* Industri yang dilayani — ditampilkan sebagai tag "Field of Business". */
export const FIELDS_OF_BUSINESS = ['ALUMINIUM', 'GOLD', 'GLASS', 'DUST COLLECTOR', 'STEEL', 'GALVANIZE'];

export const PRODUCTS = [

  /* ---------------- MELTING FURNACE ---------------- */

  {
    id: 'tower-melting-furnace',
    category: 'melting',
    code: 'TWM',
    name: 'Tower Melting Furnace',
    model: 'models/tower-melting-furnace.glb',
    desc: 'Furnace peleburan tipe tower untuk lini produksi aluminium dengan kebutuhan throughput tinggi dan efisiensi ruang lantai produksi.',
    specs: [
      { label: 'Tipe', value: 'Tower melting' },
      { label: 'Material', value: 'Ingot & scrap aluminium' },
    ],
    cases: [],
  },

  {
    id: 'crucible-melting-furnace',
    category: 'melting',
    code: 'CMF',
    name: 'Crucible Melting Furnace',
    model: 'models/crucible-melting-furnace.glb',
    desc: 'Furnace untuk melebur sekaligus menahan (holding) logam cair di sisi sel casting. Kapasitas dapat disesuaikan permintaan pelanggan, dengan standar keamanan combustion sesuai JIS B8415:2008 untuk opsi teknologi combustion terbaru dengan tingkat keselamatan tertinggi.',
    specs: [
      { label: 'Fungsi', value: 'Melting + holding di sisi casting cell' },
      { label: 'Standar combustion', value: 'JIS B8415:2008' },
      { label: 'Kapasitas', value: 'Disesuaikan permintaan pelanggan' },
    ],
    cases: [],
  },

  {
    id: 'csmf',
    category: 'melting',
    code: 'CSMF',
    name: 'Chip Smelter Melting Furnace',
    model: 'models/csmf.glb',
    desc: 'Melebur chip & scrap aluminium menjadi molten metal berkualitas tinggi dengan konsumsi energi yang efisien.',
    specs: [
      { label: 'Kapasitas', value: '100 kg/jam – 4 ton/jam' },
      { label: 'Material', value: 'Chip & scrap aluminium' },
    ],
    cases: [],
  },

  {
    id: 'hybrid-melter',
    category: 'melting',
    code: 'HybM',
    name: 'Hybrid Melter',
    model: 'models/hybrid-melter.glb',
    isNew: true,
    desc: 'Pilihan hybrid hari ini — melting furnace yang memadukan gas burner dan electric heater sebagai sumber panas, untuk emisi karbon lebih rendah dan kualitas molten lebih tinggi.',
    specs: [
      { label: 'Sumber panas', value: 'Gas burner + electric heater' },
      { label: 'Keunggulan', value: 'Emisi karbon lebih rendah' },
    ],
    cases: [],
  },

  /* ---------------- HOLDING FURNACE ---------------- */

  {
    id: 'al-holding-furnace',
    category: 'holding',
    code: 'AL-HF',
    name: 'Aluminium Holding Furnace',
    model: 'models/al-holding-furnace.glb',
    desc: 'Menjaga aluminium cair pada suhu stabil sebelum proses casting, tersedia dengan pilihan under heater, roof heater, atau side (SA) heater sesuai kapasitas line produksi.',
    specs: [
      { label: 'Kapasitas', value: '700 kg – 2.500 kg' },
      { label: 'Tipe heater', value: 'Under / Roof / Side (SA)' },
      { label: 'Daya heater', value: '16 kW – 45 kW' },
    ],
    cases: [
      { year: '2016', capacity: '1.000 kg — Under Heater · 16 kW', customer: 'PT Suzuki Indomobil Motor', note: 'Belum pernah repair hingga saat ini' },
      { year: '2018', capacity: '1.000 kg — Under Heater · 16 kW', customer: 'PT Astra Otoparts Nusa Metal', note: 'Desain sama dengan unit Suzuki Indomobil Motor' },
      { year: '2020', capacity: '700 kg — Roof Heater · 18 kW', customer: 'PT Progress Die Cast', note: 'Belum pernah repair hingga saat ini' },
      { year: '2021', capacity: '1.500 kg — Side (SA) Heater · 30 kW, 2 unit', customer: 'PT Astra Daihatsu Motor', note: 'Belum pernah repair hingga saat ini' },
      { year: '2021', capacity: '2.500 kg — Side (SA) Heater · 45 kW, 3 unit', customer: 'PT Astra Daihatsu Motor', note: 'Belum pernah repair hingga saat ini' },
    ],
  },

  /* ---------------- HEAT TREATMENT ---------------- */

  {
    id: 'rotary-ht',
    category: 'heat',
    code: 'ROTARY HT',
    name: 'Rotary Heat Treatment Furnace',
    model: 'models/rotary-ht.glb',
    desc: 'Flow material tersusun pada rack yang terhubung mekanisme rotary, dengan pilihan sumber pemanas — combustion burner, hybrid, atau electric heater — sesuai kebutuhan proses.',
    specs: [
      { label: 'Sumber panas', value: 'Combustion burner / Hybrid / Electric heater' },
      { label: 'Mekanisme', value: 'Rack berputar (rotary)' },
    ],
    cases: [],
  },

  {
    id: 't5-heat-treatment',
    category: 'heat',
    code: 'ROLLER HT — T5',
    name: 'Roller Heat Treatment Furnace (T5)',
    model: 'models/t5-heat-treatment.glb',
    desc: 'Furnace kontinu tipe roller hearth untuk heat treatment komponen compressor, memanfaatkan panas buang furnace & cooling chamber untuk pre-heating.',
    specs: [
      { label: 'Tipe', value: 'Roller hearth, continuous' },
      { label: 'Kegunaan', value: 'Heat treatment compressor parts' },
      { label: 'Sirkulasi udara', value: '331 m³/menit · 11 kW' },
      { label: 'Sumber panas', value: 'Gas burner 116 kW' },
      { label: 'Alur furnace', value: 'Loading → pre-heating → heating → cooling' },
      { label: 'Suhu operasi', value: '240°C (maks. 300°C)' },
      { label: 'Waktu proses', value: "Heating 30' · Soaking 30' · Cooling 30'" },
      { label: 'Standar combustion', value: 'JIS B8514' },
    ],
    cases: [],
  },

  {
    id: 't6-heat-treatment',
    category: 'heat',
    code: 'ROLLER HT — T6',
    name: 'Roller Heat Treatment Furnace (T6)',
    model: 'models/t6-heat-treatment.glb',
    desc: 'Furnace roller hearth untuk cylinder head dengan alur solution–quenching–aging lengkap, memanfaatkan sisa panas solution furnace untuk efisiensi aging furnace.',
    specs: [
      { label: 'Tipe', value: 'Roller hearth' },
      { label: 'Kegunaan', value: 'Heat treatment cylinder head' },
      { label: 'Sirkulasi udara', value: '600 m³/menit · 7,5 kW' },
      { label: 'Sumber panas', value: 'Gas burner 350 kW' },
      { label: 'Suhu — Solution', value: '505°C ± 10°C' },
      { label: 'Suhu — Quenching', value: '85°C ± 5°C' },
      { label: 'Suhu — Aging', value: '210°C ± 10°C' },
      { label: 'Standar combustion', value: 'JIS B8514' },
    ],
    cases: [],
  },

  {
    id: 'drying-oven',
    category: 'heat',
    code: 'DRY-OVEN',
    name: 'Drying Oven Furnace',
    model: 'models/drying-oven.glb',
    desc: 'Oven pengering untuk proses curing cat pada komponen (core paint), dengan sirkulasi udara panas merata di seluruh ruang pemanasan.',
    specs: [
      { label: 'Kegunaan', value: 'Drying core paint' },
      { label: 'Sirkulasi udara', value: '400 m³/menit · 11 kW' },
      { label: 'Sumber panas', value: 'Gas burner 233 kW' },
      { label: 'Suhu operasi', value: '220°C (maks. 250°C)' },
      { label: 'Waktu proses', value: "Heating 20' · Soaking 40'" },
      { label: 'Standar combustion', value: 'JIS B8514' },
    ],
    cases: [],
  },

  {
    id: 'heating-furnace-boggie',
    category: 'heat',
    code: 'BATCH-BOGGIE',
    name: 'Heating Furnace (Batch – Boggie Type)',
    model: 'models/heating-furnace-boggie.glb',
    desc: 'Furnace batch tipe boggie untuk coating hardening setelah proses pelapisan — material dimuat di atas boggie yang bergerak masuk ke ruang furnace.',
    specs: [
      { label: 'Tipe', value: 'Batch — boggie' },
      { label: 'Kegunaan', value: 'Coating hardening' },
      { label: 'Sirkulasi udara', value: '250 m³/menit · 7,5 kW' },
      { label: 'Sumber panas', value: 'Gas burner 233 kW' },
      { label: 'Suhu operasi', value: '500°C ± 10°C' },
      { label: 'Waktu proses', value: "Heating 90' · Soaking 90'" },
      { label: 'Standar combustion', value: 'JIS B8514' },
    ],
    cases: [],
  },

  /* ---------------- OTHER EQUIPMENT ---------------- */

  {
    id: 'ladle-device',
    category: 'other',
    code: 'LADLE',
    name: 'Ladle Device',
    model: 'models/ladle-device.glb',
    desc: 'Perangkat penuang (ladle) untuk memindahkan logam cair secara terkendali dari furnace ke titik proses berikutnya.',
    specs: [
      { label: 'Fungsi', value: 'Penuangan molten metal terkendali' },
    ],
    cases: [],
  },

  {
    id: 'porter',
    category: 'other',
    code: 'PORTER',
    name: 'Porter Metal Transfer',
    model: 'models/porter.glb',
    desc: 'Memindahkan logam cair dari furnace ke titik tuang secara otomatis, menjaga suhu dan keamanan sepanjang proses.',
    specs: [
      { label: 'Fungsi', value: 'Transfer molten metal otomatis' },
      { label: 'Fokus desain', value: 'Kestabilan suhu & keamanan operator' },
    ],
    cases: [],
  },

  {
    id: 'dust-collector',
    category: 'other',
    code: 'DC',
    name: 'Dust Collector',
    model: 'models/dust-collector.glb',
    desc: 'Sistem penangkap debu & partikel hasil proses thermal, menjaga kualitas udara area produksi sesuai standar lingkungan kerja.',
    specs: [
      { label: 'Fungsi', value: 'Filtrasi debu & partikel proses' },
    ],
    cases: [],
  },

  /* ---------------- SPARE PARTS ---------------- */

  {
    id: 'immersion-heater-atherm',
    category: 'spareparts',
    code: 'HEATER',
    name: 'Immersion Heater Atherm',
    model: 'models/immersion-heater-atherm.glb',
    desc: 'Spare part heater tipe immersion untuk kebutuhan penggantian & perawatan berkala unit holding/melting furnace.',
    specs: [
      { label: 'Tipe', value: 'Immersion heater' },
      { label: 'Kegunaan', value: 'Spare part perawatan furnace' },
    ],
    cases: [],
  },

  /* ---------------- SERVICE ---------------- */

  {
    id: 'maintenance-service',
    category: 'service',
    code: 'SERVICE',
    name: 'Other Maintenance Service',
    model: 'models/maintenance-service.glb',
    desc: 'Layanan perawatan berkala untuk menjaga performa dan usia pakai unit furnace serta peralatan pendukungnya.',
    specs: [],
    cases: [],
  },

  {
    id: 'fabrication-service',
    category: 'service',
    code: 'FABRICATION',
    name: 'Fabrication Service',
    model: 'models/fabrication-service.glb',
    desc: 'Layanan fabrikasi komponen & struktur logam sesuai kebutuhan khusus pelanggan.',
    specs: [],
    cases: [],
  },

  {
    id: 'control-panel-service',
    category: 'service',
    code: 'CONTROL PANEL',
    name: 'Control Panel Renewal / Modification Works',
    model: 'models/control-panel-service.glb',
    desc: 'Peremajaan atau modifikasi panel kontrol furnace untuk mengikuti kebutuhan proses atau standar terbaru.',
    specs: [],
    cases: [],
  },

  {
    id: 'refractory-repair-service',
    category: 'service',
    code: 'REFRACTORY',
    name: 'Refractory Repair / Modification Works',
    model: 'models/refractory-repair-service.glb',
    desc: 'Perbaikan atau modifikasi lapisan refractory pada ruang bakar furnace untuk menjaga efisiensi panas dan keamanan operasi.',
    specs: [],
    cases: [],
  },

  {
    id: 'mechanical-repair-service',
    category: 'service',
    code: 'MECHANICAL',
    name: 'Mechanical Repair / Modification Works',
    model: 'models/mechanical-repair-service.glb',
    desc: 'Perbaikan atau modifikasi komponen mekanikal furnace dan peralatan pendukung produksi.',
    specs: [],
    cases: [],
  },

];
