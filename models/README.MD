# Folder model 3D

Taruh file `.glb` (disarankan) atau `.gltf` di folder ini, dengan nama persis seperti berikut agar otomatis terhubung ke kartu produk di `index.html`:

| File yang diharapkan     | Produk                          |
|---------------------------|----------------------------------|
| `csmf.glb`                | Chip Smelter Melting Furnace     |
| `hybrid-melter.glb`       | Hybrid Melting Furnace           |
| `rotary-ht.glb`           | Rotary Heat Treatment Furnace    |
| `porter.glb`              | Porter Metal Transfer            |

Sebelum file diletakkan di sini, layar 3D akan menampilkan model placeholder (bentuk geometris berputar) sebagai penanda bahwa slot sudah siap tapi belum diisi.

Tips:
- Gunakan format **.glb** (binary, satu file) supaya tidak perlu upload file `.bin`/texture terpisah.
- Kompres model (Draco atau `gltf-transform`) agar ukuran file kecil — penting untuk totem yang mungkin berjalan di jaringan lokal.
- Jika nama produk berubah, sesuaikan atribut `data-model` pada elemen `.product-card` di `index.html`.
