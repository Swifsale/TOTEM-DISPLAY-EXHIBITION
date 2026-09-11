/* ==========================================================
   SWIF ASIA — Product & case-study data
   Sumber: brosur produk (swifasia.com), SWIFA_Al_Holding_Furnace
   Rev1.pdf, dan Technical_data_sheet_SWIF_Asia_product.doc.
   Harga sengaja tidak ditampilkan di totem publik — lihat
   catatan di README.
   Tambah/ubah produk cukup di sini, index.html & script.js
   tidak perlu disentuh.
   ========================================================== */

export const CATEGORIES = [
  { id: 'melting',   label: 'Melting & Holding' },
  { id: 'heat',      label: 'Heat Treatment' },
  { id: 'drying',    label: 'Drying & Curing' },
  { id: 'handling',  label: 'Material Handling' },
];

export const PRODUCTS = [

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
    code: 'HYBRID',
    name: 'Hybrid Melting Furnace',
    model: 'models/hybrid-melter.glb',
    desc: 'Pilihan hybrid hari ini — memadukan combustion burner dan pemanas listrik untuk emisi karbon lebih rendah dan kualitas molten lebih tinggi.',
    specs: [
      { label: 'Sumber panas', value: 'Combustion burner + electric heater' },
      { label: 'Keunggulan', value: 'Emisi karbon lebih rendah' },
    ],
    cases: [],
  },

  {
    id: 'al-holding-furnace',
    category: 'melting',
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

  {
    id: 'rotary-ht',
    category: 'heat',
    code: 'ROTARY HT',
    name: 'Rotary Heat Treatment Furnace',
    model: 'models/rotary-ht.glb',
    desc: 'Flow material tersusun pada rack yang terhubung mekanisme rotary, dengan pilihan sumber pemanas sesuai kebutuhan proses.',
    specs: [
      { label: 'Sumber panas', value: 'Combustion burner / Hybrid / Electric heater' },
      { label: 'Mekanisme', value: 'Rack berputar (rotary)' },
    ],
    cases: [],
  },

  {
    id: 't5-heat-treatment',
    category: 'heat',
    code: 'T5-HT',
    name: 'T5 Heat Treatment Furnace',
    model: 'models/t5-heat-treatment.glb',
    desc: 'Furnace kontinu tipe roller hearth untuk heat treatment komponen compressor, memanfaatkan panas buang furnace & cooling chamber untuk pre-heating.',
    specs: [
      { label: 'Tipe', value: 'Roller hearth, continuous' },
      { label: 'Kegunaan', value: 'Heat treatment compressor parts' },
      { label: 'Sirkulasi udara', value: '331 m³/menit · 11 kW' },
      { label: 'Sumber panas', value: 'Gas burner 116 kW' },
      { label: 'Alur furnace', value: 'Loading → pre-heating → heating → cooling' },
      { label: 'Suhu operasi', value: '240°C (maks. 300°C)' },
      { label: 'Waktu proses', value: 'Heating 30\' · Soaking 30\' · Cooling 30\'' },
      { label: 'Standar combustion', value: 'JIS B8514' },
    ],
    cases: [],
  },

  {
    id: 't6-heat-treatment',
    category: 'heat',
    code: 'T6-HT',
    name: 'T6 Heat Treatment Furnace',
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
    category: 'drying',
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
    category: 'drying',
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

  {
    id: 'porter',
    category: 'handling',
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

];
