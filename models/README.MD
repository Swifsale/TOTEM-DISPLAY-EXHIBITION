# Folder model 3D

Taruh file `.glb` (disarankan) atau `.gltf` di folder ini, dengan nama persis seperti berikut agar otomatis terhubung ke kartu produk di `data.js`:

| File yang diharapkan                      | Produk                                        |
|--------------------------------------------|------------------------------------------------|
| `tower-melting-furnace.glb`                | Tower Melting Furnace                          |
| `crucible-melting-furnace.glb`             | Crucible Melting Furnace                       |
| `csmf.glb`                                  | Chip Smelter Melting Furnace                   |
| `hybrid-melter.glb`                         | Hybrid Melter                                  |
| `al-holding-furnace.glb`                    | Aluminium Holding Furnace                      |
| `rotary-ht.glb`                             | Rotary Heat Treatment Furnace                  |
| `t5-heat-treatment.glb`                     | Roller Heat Treatment Furnace (T5)             |
| `t6-heat-treatment.glb`                     | Roller Heat Treatment Furnace (T6)             |
| `drying-oven.glb`                           | Drying Oven Furnace                            |
| `heating-furnace-boggie.glb`                | Heating Furnace (Batch – Boggie Type)          |
| `ladle-device.glb`                          | Ladle Device                                   |
| `porter.glb`                                | Porter Metal Transfer                          |
| `dust-collector.glb`                        | Dust Collector                                 |
| `immersion-heater-atherm.glb`               | Immersion Heater Atherm                        |
| `maintenance-service.glb`                   | Other Maintenance Service                      |
| `fabrication-service.glb`                   | Fabrication Service                            |
| `control-panel-service.glb`                 | Control Panel Renewal / Modification Works     |
| `refractory-repair-service.glb`             | Refractory Repair / Modification Works         |
| `mechanical-repair-service.glb`             | Mechanical Repair / Modification Works         |

Sebelum file diletakkan di sini, layar 3D akan menampilkan model placeholder (bentuk geometris berputar) sebagai penanda bahwa slot sudah siap tapi belum diisi.

Tips:
- Gunakan format **.glb** (binary, satu file) supaya tidak perlu upload file `.bin`/texture terpisah.
- Kompres model (Draco atau `gltf-transform`) agar ukuran file kecil — penting untuk totem yang mungkin berjalan di jaringan lokal.
- Path model diatur lewat field `model` di `data.js`, bukan atribut HTML — jadi cukup ubah `data.js` kalau nama file berubah.
