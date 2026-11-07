# Network Security Visualizer

Media pembelajaran interaktif keamanan jaringan (Informatika SMA). Situs statis: tidak perlu server atau proses build.

## Menjalankan
Buka `index.html` langsung di browser (klik dua kali), atau jalankan server lokal:

    python3 -m http.server 8000   # lalu buka http://localhost:8000

Font Plus Jakarta Sans dimuat dari Google Fonts (perlu internet; tanpa internet dipakai font sistem).

## Struktur
| Berkas | Isi |
|---|---|
| `index.html` | Landing page |
| `dashboard.html` | Pilih kasus + pintasan fitur |
| `cases.html` | Ringkasan enam kasus |
| `network-explorer.html` | Diagram jaringan interaktif per kasus |
| `threat-explorer.html` | Enam ancaman, kondisi aman vs berisiko |
| `risk-visualizer.html` | Empat tahap risiko per kasus |
| `security-principles.html` | CIA dan enam Security Controls |
| `lkpd.html` | Panduan media dan LKPD |
| `developer.html` | Tentang pengembang (isi placeholder) |
| `assets/css/style.css` | Seluruh tampilan dan responsivitas |
| `assets/js/main.js` | Menu mobile, pemilih kasus (`#kasus-N`) |
| `assets/js/network.js` | Klik perangkat/koneksi, lapisan info, penanda, simulasi hak akses, zoom |
| `assets/js/interaction.js` | Tab, filter ancaman, panel tampil/sembunyi |

## Prinsip
Semua teks, judul, kasus, dan diagram (SVG) tertulis langsung di HTML. JavaScript hanya menampilkan/menyembunyikan dan menandai elemen; tidak ada `innerHTML` atau `document.write`.

## Yang perlu kamu isi
Di `developer.html`: nama lengkap, kontak, cerita pengembangan, dan foto (taruh di `assets/images/`, lalu ganti kotak placeholder foto dengan `<img>`).
