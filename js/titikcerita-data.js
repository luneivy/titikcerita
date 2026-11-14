/**
 * TitikCerita - Data Configuration & Constants
 */

const TITIKCERITA_CONFIG = {
  brandName: "TitikCerita",
  tagline: "Wujudkan Tugas, Desain, Video & Dokumentasi Wisuda Terbaikmu",
  whatsappNumber: "6283126066621", // Nomor WhatsApp resmi TitikCerita
  logo: "images/logo.jpg",
  instagram: "@titikcerita_22",
  email: "halo@titikcerita.id",
  address: "Yogyakarta & Jakarta, Indonesia (Melayani Seluruh Indonesia)",
  operationalHours: "Senin - Minggu: 24 Jam (Fast Response)",
  guarantees: [
    { icon: "fa-shield-halved", title: "100% Rahasia Terjamin", desc: "Identitas klien, nama instansi/kampus, dan materi tugas aman terlindungi rahasia." },
    { icon: "fa-clock", title: "Tepat Waktu & Deadline Kilat", desc: "Pengerjaan sesuai deadline yang disepakati, tersedia opsi kilat untuk kebutuhan mendesak." },
    { icon: "fa-rotate-left", title: "Garansi Gratis Revisi", desc: "Revisi gratis sampai sesuai instruksi guru/dosen atau brief awal projek." },
    { icon: "fa-award", title: "Kualitas Original & Profesional", desc: "Hasil pengerjaan orisinil berstandar tinggi, file master lengkap siap pakai." }
  ]
};

const SERVICES_DATA = [
  {
    id: "tugas-kuliah",
    categoryName: "Jasa Joki & Pengerjaan Tugas (Akademik)",
    shortName: "Joki Tugas",
    icon: "fa-graduation-cap",
    badge: "Akademik & Cepat",
    tagline: "Bantu selesaikan PPT presentasi, laporan, makalah, artikel ilmiah, dan olah data SPSS dengan rapi, terstruktur, dan tepat waktu.",
    color: "from-blue-500 to-indigo-600",
    startingPrice: 35000,
    unit: "mulai dari / tugas",
    items: [
      {
        name: "Joki PPT Presentasi",
        price: "Mulai Rp 35.000",
        desc: "Pembuatan slide PPT presentasi sidang, tugas kuliah, dan sekolah dengan desain modern, visual estetik, dan materi padat jelas.",
        features: ["Desain modern & eye-catching", "Rangkuman poin materi padat", "Animasi & transisi halus", "Format PPTX & PDF siap tampil"]
      },
      {
        name: "Joki Laporan (Praktikum & Magang)",
        price: "Mulai Rp 45.000",
        desc: "Penyusunan laporan praktikum, laporan magang/PKL, laporan kegiatan, dan laporan observasi sesuai format baku panduan.",
        features: ["Struktur format rapi & baku", "Tabel & grafik terorganisir", "Lampiran & dokumentasi tersusun", "Gratis revisi panduan"]
      },
      {
        name: "Joki Makalah",
        price: "Mulai Rp 50.000",
        desc: "Penulisan makalah lengkap (Cover, Kata Pengantar, Bab 1-3, Daftar Pustaka) dengan sumber literatur terpercaya dan format rapi.",
        features: ["Format Word rapi (Margin, Font, Spasi)", "Referensi jurnal 5 tahun terakhir", "Bebas plagiasi", "Pengerjaan kilat tersedia"]
      },
      {
        name: "Joki Artikel (Ilmiah & Populer)",
        price: "Mulai Rp 55.000",
        desc: "Penulisan artikel ilmiah untuk tugas kuliah/publikasi atau artikel populer/opini dengan argumen tajam dan gaya bahasa akademis.",
        features: ["Struktur IMRAD / format jurnal", "Sitasi & kutipan standar baku", "Gaya bahasa ilmiah & persuasif", "Kesesuaian topik spesifik"]
      },
      {
        name: "Jasa Olah Data SPSS",
        price: "Mulai Rp 100.000",
        desc: "Pengolahan data statistik kuantitatif lengkap: Uji Validitas, Reliabilitas, Asumsi Klasik, Regresi, Korelasi, T-Test, F-Test, hingga ANOVA.",
        features: ["Output file SPSS (.spv / .sav)", "Interpretasi narasi bab 4 siap pakai", "Tabel ringkasan hasil uji", "Bimbingan cara baca data"]
      }
    ]
  },
  {
    id: "desain-grafis",
    categoryName: "Jasa Desain Grafis & Visual",
    shortName: "Desain Grafis",
    icon: "fa-palette",
    badge: "Kreatif & Estetik",
    tagline: "Desain visual memukau untuk poster, pamflet, brosur, banner, spanduk hingga typography siap cetak dan publikasi digital.",
    color: "from-purple-500 to-pink-600",
    startingPrice: 35000,
    unit: "mulai dari / karya",
    items: [
      {
        name: "Desain Poster",
        price: "Mulai Rp 45.000",
        desc: "Desain poster lomba, poster seminar, webinar, konser, festival, dan pengumuman dengan komposisi warna dan tata letak memikat.",
        features: ["Format PNG/JPG Resolusi Tinggi", "Ukuran siap cetak (A3, A4, Custom)", "Revisi tata letak gratis", "File siap cetak 300 DPI"]
      },
      {
        name: "Desain Pamflet",
        price: "Mulai Rp 40.000",
        desc: "Pamflet informasi kegiatan, open recruitment panitia/organisasi, edukasi sosial, atau promosi event kampus & sekolah.",
        features: ["Hierarki informasi mudah dibaca", "Warna & visual harmonis", "Format digital & cetak", "Pengerjaan express"]
      },
      {
        name: "Desain Brosur",
        price: "Mulai Rp 60.000",
        desc: "Desain brosur lipat (2 lipatan / 3 lipatan trifold) untuk promosi produk, profil usaha UMKM, atau promosi pendaftaran siswa/mahasiswa baru.",
        features: ["Desain bolak-balik (2 sisi)", "Tata letak katalog informatif", "Format PDF Print Ready (CMYK)", "File sumber disertakan"]
      },
      {
        name: "Desain Banner (X-Banner & Roll Banner)",
        price: "Mulai Rp 50.000",
        desc: "Desain banner vertikal untuk display stan bazar, pameran, expo kampus, background panggung, atau banner website/aplikasi.",
        features: ["Ukuran standar 60x160cm / custom", "Kerapatan visual tajam tidak pecah", "Komposisi jelas dari kejauhan", "Format cetak & digital"]
      },
      {
        name: "Desain Spanduk Outdoor",
        price: "Mulai Rp 60.000",
        desc: "Desain spanduk horizontal ukuran besar (3x1m, 4x1m, 5x2m) untuk gapura, jalan, background acara panggung dan kepanitiaan.",
        features: ["Ukuran skala presisi siap cetak", "Warna CMYK akurat di mesin cetak", "Font tebal dan jelas terbaca", "Ekspor TIFF / PDF High Res"]
      },
      {
        name: "Desain Typography & Lettering",
        price: "Mulai Rp 45.000",
        desc: "Karya tipografi artistik, custom lettering, quote visual estetik untuk konten media sosial, merchandise kaos, totebag, dan stiker.",
        features: ["Kombinasi font unik & estetik", "Format transparan (PNG Alpha)", "File vektor (SVG/AI/EPS)", "Desain orisinil & berkarakter"]
      }
    ]
  },
  {
    id: "video-editing",
    categoryName: "Jasa Editing Video",
    shortName: "Video Editing",
    icon: "fa-video",
    badge: "Sinematik & Dinamis",
    tagline: "Editing video promosi, teaser, video profil, vlog, tugas sekolah/kuliah, after movie, video edukasi, hingga sinematik (tersedia opsi videografer jika butuh shooting di lokasi).",
    color: "from-cyan-500 to-blue-600",
    startingPrice: 50000,
    unit: "mulai dari / video",
    items: [
      {
        name: "Video Promosi (Iklan Produk & Jasa)",
        price: "Mulai Rp 75.000",
        desc: "Editing video iklan produk/jasa berirama cepat, eye-catching, dengan hook memikat untuk postingan TikTok Ads, Reels, & Story.",
        features: ["Hook 3 detik pertama memikat", "Efek transisi & sound effect dinamis", "Teks harga & promo mencolok", "Format 9:16 vertikal / 16:9"]
      },
      {
        name: "Video Teaser (Event & Acara)",
        price: "Mulai Rp 65.000",
        desc: "Video cuplikan pendek yang memicu rasa penasaran untuk perilisan acara kampus, konser, lomba, film pendek, atau peluncuran produk.",
        features: ["Pacing dramatis & beat-sync musik", "Glitches, light leaks & sound FX", "Title card / tanggal event menarik", "Durasi ringkas 15 - 45 detik"]
      },
      {
        name: "Video Profil (Company & Organisasi)",
        price: "Mulai Rp 120.000",
        desc: "Video representasi profil perusahaan, profil UKM/organisasi mahasiswa, instansi sekolah, atau personal branding secara profesional.",
        features: ["Narasi visual terstruktur & formal", "Lower third nama & jabatan", "Background music elegan tanpa copyright", "Color grading bersih profesional"]
      },
      {
        name: "Vlog Kegiatan & Perjalanan",
        price: "Mulai Rp 60.000",
        desc: "Mengubah rekaman mentah HP atau kamera saat liburan, KKN, study tour, atau daily activity menjadi vlog yang asyik ditonton.",
        features: ["Pemilihan momen menarik (cut dead air)", "Stabilisasi guncangan video", "Subtitle santai & stiker lucu", "Warna cerah natural"]
      },
      {
        name: "Video Tugas Sekolah & Kuliah",
        price: "Mulai Rp 50.000",
        desc: "Editing video presentasi kelompok, video drama, roleplay bahasa, video praktikum, atau dokumenter mini tugas mata pelajaran/kuliah.",
        features: ["Penggabungan rekaman anggota", "Nama & NIM/nomor absen anggota", "Pembersihan suara kresek (denoise)", "Format Full HD 1080p"]
      },
      {
        name: "Video After Movie (Dokumentasi Acara)",
        price: "Mulai Rp 150.000",
        desc: "Video rangkuman pesta keseruan acara festival, inaugurasi, dies natalis, pensi sekolah, seminar, atau malam keakraban.",
        features: ["Pilihan musik anthemic & emosional", "Transisi sinematik speed ramp", "Highlight momen terbaik penonton & panggung", "Format horizontal / vertical"]
      },
      {
        name: "Video Edukasi & Pembelajaran",
        price: "Mulai Rp 70.000",
        desc: "Editing video tutorial, micro-learning, infografis video, atau presentasi materi pembelajaran dengan ilustrasi pendukung.",
        features: ["Subtitle penjelasan otomatis rapi", "Visual popup & pan-zoom materi", "Kejelasan audio suara narator", "Struktur materi bertahap"]
      },
      {
        name: "Video Cinematic",
        price: "Mulai Rp 90.000",
        desc: "Polesan tingkat tinggi ala layar lebar dengan teknik sinematografi, rasio widescreen, color grading LUTs film, dan ambient sound design.",
        features: ["Color grading teal & orange / vintage", "Sound design & foley effects tebal", "Slow motion mulus 60/120 fps", "Kesan visual mendalam & dramatis"]
      }
    ]
  },
  {
    id: "fotografi",
    categoryName: "Jasa Fotografer Wisuda",
    shortName: "Foto Wisuda",
    icon: "fa-camera",
    badge: "Momen Spesial",
    tagline: "Abadikan momen wisuda kelulusanmu dengan fotografer profesional di spot outdoor kampus, dihitung praktis per orang.",
    color: "from-amber-500 to-rose-600",
    startingPrice: 150000,
    unit: "mulai dari / orang",
    items: [
      {
        name: "Foto Wisuda Per Orang (Solo / Individu)",
        price: "Mulai Rp 150.000 / Orang",
        desc: "Sesi foto wisuda personal khusus per wisudawan di spot ikonik kampus outdoor dengan pencahayaan alami dan arahan pose terbaik.",
        features: ["Khusus per orang / wisudawan", "Unlimited shots kamera profesional", "15 Foto edit tone warna terbaik", "Semua file mentah (RAW/JPEG) dikirim"]
      },
      {
        name: "Foto Wisuda Bareng Sahabat (Per Orang)",
        price: "Mulai Rp 100.000 / Orang",
        desc: "Abadikan momen kelulusan bareng teman-teman seperjuangan dengan tarif dihitung per orang lebih hemat dan fleksibel.",
        features: ["Tarif per orang bersahabat", "Foto grup kompak & foto solo masing-masing", "Spot outdoor kampus favorit", "Google Drive link kilat"]
      },
      {
        name: "Foto Wisuda Bersama Keluarga",
        price: "Mulai Rp 250.000 / Sesi",
        desc: "Potret penuh kehangatan dan rasa bangga bersama orang tua dan keluarga tercinta di hari wisuda.",
        features: ["Foto wisudawan + keluarga inti", "Panduan pose untuk orang tua", "Retouching kulit wajah natural", "Resolusi tinggi siap cetak bingkai"]
      }
    ]
  }
];

const PORTFOLIO_DATA = [
  {
    id: 1,
    title: "Foto Wisuda Outdoor Kampus UGM",
    category: "fotografi",
    categoryLabel: "Fotografer Wisuda",
    client: "Sarah F., S.Farm",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    desc: "Sesi pemotretan wisuda outdoor di Balairung dan spot ikonik kampus dengan nuansa warm golden hour bersama keluarga."
  },
  {
    id: 2,
    title: "Desain Poster & Pamflet Seminar Nasional",
    category: "desain-grafis",
    categoryLabel: "Desain Grafis",
    client: "BEM Fakultas Teknik",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    desc: "Desain poster dan pamflet digital bertema teknologi modern dengan komposisi warna kontras dan tipografi yang kuat."
  },
  {
    id: 3,
    title: "Video Promosi Produk & Teaser Event",
    category: "video-editing",
    categoryLabel: "Video Editing",
    client: "Brand Fashion Mahasiswa",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
    desc: "Editing video promosi 30 detik berformat vertikal dengan ritme musik cepat, animated text promo, dan efek sound design dinamis."
  },
  {
    id: 4,
    title: "Jasa Joki PPT Presentasi & Makalah Ilmiah",
    category: "tugas-kuliah",
    categoryLabel: "PPT & Makalah",
    client: "Mahasiswa Manajemen Bisnis",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    desc: "Pembuatan slide PPT 20 halaman dengan animasi transisi rapi, visual diagram estetik, serta berkas makalah pendukung berformat baku."
  },
  {
    id: 5,
    title: "Desain Spanduk & Banner Pameran Expo",
    category: "desain-grafis",
    categoryLabel: "Banner & Spanduk",
    client: "Panitia Expo Wirausaha",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
    desc: "Desain spanduk 4x1.5 meter dan X-Banner display dengan resolusi 300 DPI warna CMYK tajam siap cetak tanpa pecah."
  },
  {
    id: 6,
    title: "Video After Movie & Vlog Kegiatan Pensi",
    category: "video-editing",
    categoryLabel: "After Movie & Vlog",
    client: "OSIS & BEM Universitas",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    desc: "Editing video recap festival pensi 2.5 menit dengan transisi sinematik, beat matching lagu populer, dan highlight panggung seru."
  },
  {
    id: 7,
    title: "Olah Data Statistik SPSS & Laporan Bab 4",
    category: "tugas-kuliah",
    categoryLabel: "Olah Data SPSS",
    client: "Mahasiswi Psikologi S1",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    desc: "Penyelesaian uji regresi linier berganda, uji F, uji t, koefisien determinasi R2, dan narasi interpretasi laporan lengkap."
  },
  {
    id: 8,
    title: "Karya Typography Art & Desain Brosur",
    category: "desain-grafis",
    categoryLabel: "Typography & Brosur",
    client: "Komunitas Kreatif Kampus",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80",
    desc: "Desain typography estetik berkarakter untuk merchandise serta brosur 3 lipat informasi kegiatan organisasi."
  }
];

const TESTIMONIALS_DATA = [
  {
    name: "Dimas Pratama",
    campus: "Universitas Indonesia (UI)",
    service: "PPT Presentasi & Olah Data SPSS",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    text: "Penyelamat banget waktu deadline presentasi mepet! Slide PPT-nya keren dan gak ngebosenin, olah data SPSS-nya juga jelas banget ada narasi penjelasannya. Dosen pembimbing langsung approve!"
  },
  {
    name: "Clara Amanda",
    campus: "Institut Teknologi Bandung (ITB)",
    service: "Desain Poster, Pamflet & Spanduk",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    text: "Order paket desain poster dan spanduk buat acara festival kampus. Hasilnya luar biasa estetik, waktu dicetak ukuran 4 meter warnanya tajem gak ada pecah sama sekali. Makasih TitikCerita!"
  },
  {
    name: "Rizky Ramadhan",
    campus: "Universitas Gadjah Mada (UGM)",
    service: "Jasa Fotografer Wisuda Outdoor",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    text: "Kak fotografernya sabar banget ngarahin pose wisuda buat aku dan orang tua. Hasil fotonya jernih, tone warnanya warm estetik, dan file preview udah bisa dilihat malemnya. Momen wisuda jadi berkesan!"
  },
  {
    name: "Nabila Putri",
    campus: "Universitas Brawijaya (UB)",
    service: "Video Tugas Kuliah & Video Promosi",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    text: "Bikin video tugas kelompok dan promosi produk. Diedit sama tim TitikCerita jadi rapi banget, suaranya jernih, subtitle-nya dinamis mirip konten kreator viral. Dapet nilai tertinggi di kelas!"
  },
  {
    name: "Fajar Wicaksono",
    campus: "Universitas Diponegoro (Undip)",
    service: "Makalah, Artikel & Laporan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    text: "Makalah dan laporannya tersusun rapi banget sesuai pedoman format kampus, daftar pustakanya juga lengkap pakai jurnal terbaru. Pengerjaan cepat dan privasi benar-benar dijaga aman."
  }
];

const FAQS_DATA = [
  {
    q: "Layanan apa saja yang bisa dipesan di TitikCerita?",
    a: "TitikCerita melayani 4 bidang utama: 1) Joki Tugas: PPT presentasi, laporan, makalah, artikel, dan olah data SPSS. 2) Desain Grafis: poster, pamflet, brosur, banner, spanduk, typography. 3) Video Editing: video promosi, teaser, video profil, vlog kegiatan, tugas sekolah & kuliah, after movie, video edukasi, video cinematic. 4) Jasa Fotografer Wisuda."
  },
  {
    q: "Apakah kerahasiaan data dan identitas saya terjamin?",
    a: "Sangat aman 100%! Kerahasiaan klien adalah komitmen utama kami. Seluruh identitas (nama, sekolah/kampus, materi tugas) terlindungi aman dan tidak akan pernah disebarluaskan."
  },
  {
    q: "Bisa pengerjaan kilat / ekspres?",
    a: "Bisa! Kami menyediakan opsi pengerjaan kilat (ekspres 6 jam, 12 jam, hingga 24 jam) untuk membantu Anda yang menghadapi deadline mendesak."
  },
  {
    q: "Apakah ada garansi revisi?",
    a: "Ya, kami memberikan Garansi Gratis Revisi jika ada penyesuaian yang masih sesuai dengan brief atau instruksi awal tugas Anda."
  },
  {
    q: "Bagaimana cara order dan pembayarannya?",
    a: "Cukup klik tombol WhatsApp atau isi form pemesanan di web ini. Anda bisa membayar DP 50% terlebih dahulu via QRIS, Transfer Bank, atau E-Wallet (GoPay, OVO, Dana), dan pelunasan dilakukan setelah melihat preview hasil pengerjaan."
  }
];

// Price Calculator Matrices updated to match user's exact services
const CALCULATOR_DATA = {
  services: {
    "tugas": {
      name: "Joki Tugas & Akademik",
      basePrice: 40000,
      subtypes: [
        { id: "ppt", name: "Joki PPT Presentasi (per 10 slide)", multiplier: 0.9 },
        { id: "laporan", name: "Joki Laporan Praktikum / Magang (per 10 hal)", multiplier: 1.1 },
        { id: "makalah", name: "Joki Makalah Lengkap (per 10 hal)", multiplier: 1.2 },
        { id: "artikel", name: "Joki Artikel Ilmiah / Populer", multiplier: 1.3 },
        { id: "spss", name: "Jasa Olah Data SPSS (Paket Lengkap)", multiplier: 2.5 }
      ]
    },
    "desain": {
      name: "Jasa Desain Grafis",
      basePrice: 40000,
      subtypes: [
        { id: "poster", name: "Desain Poster (Event / Lomba / Seminar)", multiplier: 1.1 },
        { id: "pamflet", name: "Desain Pamflet Informasi", multiplier: 1.0 },
        { id: "brosur", name: "Desain Brosur (Brosur Lipat / Trifold)", multiplier: 1.5 },
        { id: "banner", name: "Desain Banner (X-Banner / Roll Banner)", multiplier: 1.25 },
        { id: "spanduk", name: "Desain Spanduk Outdoor (Ukuran Besar)", multiplier: 1.5 },
        { id: "typography", name: "Desain Typography & Lettering Art", multiplier: 1.1 }
      ]
    },
    "video": {
      name: "Jasa Editing Video",
      basePrice: 50000,
      subtypes: [
        { id: "promosi", name: "Video Promosi (Iklan Produk / Jasa)", multiplier: 1.4 },
        { id: "teaser", name: "Video Teaser (Event / Acara)", multiplier: 1.2 },
        { id: "profil", name: "Video Profil (Company / Organisasi)", multiplier: 2.2 },
        { id: "vlog", name: "Vlog Kegiatan & Perjalanan", multiplier: 1.2 },
        { id: "tugas-sekolah-kuliah", name: "Video Tugas Sekolah & Kuliah", multiplier: 1.0 },
        { id: "aftermovie", name: "Video After Movie (Dokumentasi Acara)", multiplier: 2.8 },
        { id: "edukasi", name: "Video Edukasi & Pembelajaran", multiplier: 1.3 },
        { id: "cinematic", name: "Video Cinematic & Color Grading", multiplier: 1.7 }
      ]
    },
    "foto": {
      name: "Jasa Fotografer Wisuda",
      basePrice: 150000,
      subtypes: [
        { id: "wisuda-solo", name: "Foto Wisuda Per Orang (Solo / Individu)", multiplier: 1.0 },
        { id: "wisuda-sahabat", name: "Foto Wisuda Bareng Sahabat (Per Orang)", multiplier: 0.75 },
        { id: "wisuda-keluarga", name: "Foto Wisuda Bersama Keluarga", multiplier: 1.5 }
      ]
    }
  },
  deadlines: [
    { id: "santai", name: "Santai (4 - 7 Hari)", multiplier: 1.0, badge: "Harga Standar" },
    { id: "reguler", name: "Reguler (2 - 3 Hari)", multiplier: 1.15, badge: "Direkomendasikan" },
    { id: "kilat", name: "Ekspres Kilat (24 Jam)", multiplier: 1.45, badge: "Cepat" },
    { id: "superkilat", name: "Super Kilat (6 - 12 Jam)", multiplier: 1.85, badge: "Prioritas VIP" }
  ]
};
