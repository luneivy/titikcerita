# TitikCerita — Web Dinamis & Portal Admin (Creative & Academic Agency)

Aplikasi web dinamis modern untuk **TitikCerita** yang kini dilengkapi dengan **Database Backend (SQLite + PHP)** dan **Portal Admin Khusus (`/admin`)** untuk pengelolaan berita, promo, konfigurasi nomor WhatsApp, media sosial, status toko, dan manajemen pesanan pelanggan secara realtime.

---

## 🌟 Pilar Layanan TitikCerita

1. **Jasa Joki Tugas (Akademik):** PPT presentasi, laporan (praktikum & magang), makalah, artikel (ilmiah & populer), olah data SPSS.
2. **Jasa Desain Grafis:** Poster, pamflet, brosur, banner, spanduk, typography.
3. **Jasa Video Editing & Videografer:** Video promosi, teaser, video profil, vlog kegiatan, tugas sekolah dan kuliah, after movie, video edukasi, video cinematic, serta jasa videografer shooting langsung di lokasi.
4. **Jasa Fotografer Wisuda:** Foto wisuda outdoor per orang (solo), bareng sahabat (per orang), dan bersama keluarga.

---

## 🚀 Akses Cepat Web & Portal Admin

Buka melalui server lokal Laragon (Pastikan Apache aktif):

| Halaman | URL Akses | Keterangan |
| :--- | :--- | :--- |
| **Website Utama (Frontend)** | `http://localhost/my-project/index.php` | Halaman landing dinamis dengan banner pengumuman & berita terkini |
| **Portal Berita & Promo** | `http://localhost/my-project/berita.php` | Pembaca artikel, filter kategori & tips akademik |
| **Portal Login Admin** | `http://localhost/my-project/admin/login.php` | Halaman login otentikasi admin |
| **Dashboard Admin** | `http://localhost/my-project/admin/index.php` | Ringkasan statistik, pesanan terbaru, & berita |
| **Kelola Berita & Promo** | `http://localhost/my-project/admin/berita.php` | Tambah, edit, upload gambar cover, dan hapus artikel |
| **Konfigurasi Web** | `http://localhost/my-project/admin/konfigurasi.php` | Ubah nomor WhatsApp, Instagram, status toko, & banner promo |
| **Kelola Pesanan** | `http://localhost/my-project/admin/pesanan.php` | Daftar pesanan masuk, update status & 1-klik balas WhatsApp |
| **Ganti Password Admin** | `http://localhost/my-project/admin/password.php` | Form ganti password & profil nama admin |

### 🔐 Kredensial Default Login Admin
- **Username:** `admin`
- **Password:** `admin123`
*(Password dapat langsung diganti melalui menu **Ganti Password Admin** pada portal admin)*

---

## 🛠️ Fitur Sistem Dinamis TitikCerita

### 1. Portal Admin Terpadu (`/admin`)
- **Dashboard Overview:** Stat card total artikel, total pesanan masuk, status toko, nomor WhatsApp yang aktif, dan tabel ringkasan terbaru.
- **Manajemen Berita (CRUD Lengkap):**
  - Buat artikel promo atau tips akademik baru.
  - Upload gambar cover langsung ke server (`uploads/`) atau gunakan link URL eksternal (Unsplash, dsb).
  - Generator slug otomatis (SEO friendly).
  - Format status: *Published* atau *Draft*.
  - Hitung jumlah pembaca (views) otomatis setiap kali artikel dibuka.
- **Konfigurasi Web Instan:**
  - **Nomor WhatsApp:** Ganti nomor tujuan (misal: `083126066621`) — seluruh tombol konsultasi dan pemesanan di frontend langsung mengarah ke nomor baru secara realtime!
  - **Instagram:** Ubah akun Instagram (misal: `@titikcerita_22`).
  - **Status Operasional Toko:** Buka / Tutup Sementara (otomatis menampilkan badge status hijau/merah di header web).
  - **Banner Pengumuman (Promo Bar):** Tampilkan atau sembunyikan promo diskon yang berjalan di paling atas website.
  - **Jam Operasional & Alamat:** Atur jam buka dan wilayah layanan.
- **Pusat Pesanan Masuk (Order Manager):**
  - Setiap kali pengunjung mengisi formulir di website, order otomatis tersimpan ke database SQLite dengan kode unik (contoh: `TC-XXXXX`).
  - Tombol **1-Klik Balas WhatsApp**: Admin langsung membuka WhatsApp chat ke nomor pelanggan dengan template pesan balasan resmi.
  - Status pemesanan: *Menunggu Konfirmasi*, *Diproses*, *Selesai*, atau *Batal*.

### 2. Website Utama Dinamis (`index.php` & `berita.php`)
- **Dynamic Promo Announcement Bar:** Muncul di bagian atas layar jika diaktifkan dari admin.
- **Live Store Status:** Indikator hijau online di sebelah logo TitikCerita.
- **Bagian Berita & Promo Terbaru:** Menampilkan 3 artikel berita atau promo teranyar langsung dari database SQLite.
- **Halaman Berita Lengkap (`berita.php`):**
  - Filter kategori (*Promo, Akademik, Desain, Video, Tips*).
  - Fitur pencarian artikel berdasarkan kata kunci.
  - Tampilan artikel lengkap dengan format rapi, tombol share WhatsApp/Telegram, dan kartu CTA konsultasi tugas.

---

## 📂 Struktur Direktori Proyek

```
my-project/
├── admin/                         # Portal Admin TitikCerita
│   ├── layout/
│   │   ├── header.php             # Navigasi sidebar, status toko, & profil admin
│   │   └── footer.php             # Footer template admin
│   ├── index.php                  # Dashboard ringkasan & statistik
│   ├── login.php                  # Halaman otentikasi masuk admin
│   ├── logout.php                 # Terminasi sesi admin
│   ├── berita.php                 # Daftar & kelola artikel berita
│   ├── berita-form.php            # Form tambah & edit berita (+ upload gambar)
│   ├── konfigurasi.php            # Pengaturan nomor WA, IG, banner, status toko
│   ├── pesanan.php                # Rekap formulir pemesanan pelanggan
│   └── password.php               # Ganti password & nama admin
├── api/                           # Endpoint API JSON
│   ├── get_config.php             # Fetch pengaturan website
│   ├── get_berita.php             # Fetch artikel berita published
│   └── submit_order.php           # Simpan order form ke database SQLite
├── config/
│   ├── database.php               # Koneksi PDO SQLite & auto-migrasi tabel
│   └── helper.php                 # Auth guard, fungsi helper setting & date
├── database/
│   └── titikcerita.db             # File database SQLite (Zero-config)
├── uploads/                       # Folder penyimpanan upload gambar berita
├── css/
│   ├── titikcerita.css            # Desain gelap mewah, aksen gold, glassmorphism
│   └── style.css                  # Style bawaan
├── js/
│   ├── titikcerita-data.js        # Konfigurasi data layanan & portofolio
│   └── titikcerita.js             # Kalkulator biaya & sync submission ke SQLite
├── images/
│   ├── logo.png                   # Logo resmi TitikCerita (Transparan / No background)
│   └── logo.jpg                   # Logo kotak original
├── index.php                      # Halaman depan dinamis (Utama)
├── berita.php                     # Halaman portal baca berita & promo publik
└── README.md                      # Dokumentasi lengkap
```

---

## 💡 Informasi Kontak Resmi
- **WhatsApp:** `0831-2606-6621` ([wa.me/6283126066621](https://wa.me/6283126066621))
- **Instagram:** [@titikcerita_22](https://instagram.com/titikcerita_22)
- **Wilayah Operasional:** Samarinda dan sekitarnya (Online Seluruh Indonesia)
