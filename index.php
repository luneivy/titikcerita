<?php
require_once __DIR__ . '/config/helper.php';
$db = get_db_connection();

// Settings from SQLite DB
$brandName = get_setting('brand_name', 'TitikCerita');
$siteTagline = get_setting('site_tagline', 'Creative & Academic Agency');
$whatsappNumber = get_setting('whatsapp_number', '083126066621');
$whatsappClean = preg_replace('/[^0-9]/', '', $whatsappNumber);
if (substr($whatsappClean, 0, 1) === '0') {
    $whatsappClean = '62' . substr($whatsappClean, 1);
}
$instagramHandle = get_setting('instagram', '@titikcerita_22');
$instagramClean = ltrim($instagramHandle, '@');
$location = get_setting('location', 'Samarinda dan sekitarnya (Online Seluruh Indonesia)');
$operationalHours = get_setting('operational_hours', 'Layanan Online: 24 Jam Non-Stop');
$storeStatus = get_setting('store_status', 'open');
$announcementActive = get_setting('announcement_active', '1');
$announcementText = get_setting('announcement_text', '🔥 PROMO SPESIAL WISUDA: Booking Sesi Foto Wisuda sekarang & dapatkan Free Cetak 10R! Hubungi kami via WhatsApp.');
$metaDescription = get_setting('meta_description', 'TitikCerita melayani: Jasa Fotografer Wisuda profesional, sesi foto wisuda per orang (solo), sahabat, dan keluarga dengan hasil tone estetik & bergaransi di Samarinda dan sekitarnya.');

// Editable Hero Texts & Homepage Cards
$heroBadge = get_setting('hero_badge', '📸 Jasa Fotografer Wisuda #1 Terpercaya');
$heroHeadline = get_setting('hero_headline', 'Abadikan Momen Wisuda, Wujudkan <span class="text-gradient">Foto Kelulusan</span> Impianmu.');
$heroSubheadline = get_setting('hero_subheadline', 'Jasa fotografer wisuda outdoor profesional bergaransi di Samarinda dan sekitarnya: Sesi Foto Solo (Per Orang), Bareng Sahabat (Per Orang), dan Bersama Keluarga dengan arahan pose ramah dan tone warna estetik.');

// Editable Order+Calculator Section
$pricePhotoEditing     = (int)get_setting('price_photo_editing', 75000);
$pricePhotoNonEditing  = (int)get_setting('price_photo_non_editing', 50000);
$orderSectionBadge     = get_setting('order_section_badge', '📋 Transparan & Mudah');
$orderSectionTitle     = get_setting('order_section_title', 'Pesan & Estimasi Biaya Sekarang');
$orderSectionSubtitle  = get_setting('order_section_subtitle', 'Pilih paket, isi data diri, dan estimasi harga langsung dihitung otomatis. Satu klik kirim ke WhatsApp Admin.');
$orderLabelPackage     = get_setting('order_label_package', 'Jenis Spesifikasi Paket');
$orderLabelQty         = get_setting('order_label_qty', 'Jumlah Paket');
$orderLabelName        = get_setting('order_label_name', 'Nama Lengkap / Panggilan');
$orderLabelPhone       = get_setting('order_label_phone', 'Nomor WhatsApp Aktif');
$orderLabelSchedule    = get_setting('order_label_schedule', 'Target Tanggal & Jam Pemotretan');
$orderLabelNotes       = get_setting('order_label_notes', 'Deskripsi Kebutuhan & Konsep Foto');
$orderPlaceholderName  = get_setting('order_placeholder_name', 'Contoh: Dimas Aditya');
$orderPlaceholderPhone = get_setting('order_placeholder_phone', 'Contoh: 081234567890');
$orderPlaceholderSchedule = get_setting('order_placeholder_schedule', 'Contoh: Sabtu, 28 Nov 2026 - Pukul 09:00 WITA');
$orderPlaceholderNotes = get_setting('order_placeholder_notes', 'Tuliskan lokasi/spot, jumlah orang, konsep warna, atau permintaan khusus...');
$orderBtnText          = get_setting('order_btn_text', 'Kirim & Lanjutkan ke WhatsApp Admin');
$orderEstimateNote     = get_setting('order_estimate_note', '*Harga estimasi, bisa disesuaikan berdasarkan detail kebutuhan Anda.');

$cardsGuarantees = get_json_setting('cards_guarantees');
$cardsServices = get_json_setting('cards_services');
$cardsSteps = get_json_setting('cards_steps');
$cardsTestimonials = get_json_setting('cards_testimonials');
$cardsFaqs = get_json_setting('cards_faqs');

// Fetch latest 3 published articles
$latestArticlesStmt = $db->query("SELECT * FROM berita WHERE status = 'published' ORDER BY created_at DESC LIMIT 3");
$latestArticles = $latestArticlesStmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($brandName) ?> - Jasa Fotografer Wisuda & Dokumentasi Kelulusan</title>
  <meta name="description" content="<?= htmlspecialchars($metaDescription) ?>">
  <link rel="icon" type="image/png" href="images/logo.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eef2ff',
              100: '#e0e7ff',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
            }
          }
        }
      }
    }
  </script>

  <!-- FontAwesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <!-- SweetAlert2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <!-- Canvas Confetti -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

  <!-- Custom Styles -->
  <link rel="stylesheet" href="css/titikcerita.css">

  <!-- Global Dynamic Config for JS -->
  <script>
    window.TC_DYNAMIC_CONFIG = {
      whatsapp: <?= json_encode($whatsappClean) ?>,
      whatsappFormatted: <?= json_encode($whatsappNumber) ?>,
      instagram: <?= json_encode($instagramHandle) ?>,
      brandName: <?= json_encode($brandName) ?>,
      prices: {
        editing: <?= (int)$pricePhotoEditing ?>,
        nonEditing: <?= (int)$pricePhotoNonEditing ?>
      },
      storeStatus: <?= json_encode($storeStatus) ?>,
      guarantees: <?= json_encode($cardsGuarantees) ?>,
      services: <?= json_encode($cardsServices) ?>,
      steps: <?= json_encode($cardsSteps) ?>,
      testimonials: <?= json_encode($cardsTestimonials) ?>,
      faqs: <?= json_encode($cardsFaqs) ?>
    };
  </script>
</head>
<body class="bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white">

  <!-- BACKGROUND GLOW EFFECTS -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div class="glow-primary w-[550px] h-[550px] bg-indigo-600 top-[-100px] left-[-100px]"></div>
    <div class="glow-primary w-[500px] h-[500px] bg-cyan-600 top-[30%] right-[-150px] opacity-20"></div>
    <div class="glow-primary w-[600px] h-[600px] bg-purple-700 bottom-[-150px] left-[20%] opacity-25"></div>
  </div>

  <!-- DYNAMIC PROMO ANNOUNCEMENT BANNER -->
  <?php if ($announcementActive === '1' && !empty($announcementText)): ?>
    <div class="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold py-2 px-4 text-xs shadow-md relative z-50">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 overflow-hidden">
          <span class="bg-slate-950 text-amber-400 text-[10px] uppercase font-black px-2 py-0.5 rounded flex-shrink-0 animate-pulse">PENGUMUMAN</span>
          <span class="truncate"><?= htmlspecialchars($announcementText) ?></span>
        </div>
        <a 
          href="https://wa.me/<?= $whatsappClean ?>?text=Halo%20Admin%20TitikCerita,%20saya%20tertarik%20dengan%20promo%20yang%20ada%20di%20website" 
          target="_blank" 
          class="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-slate-950/80 hover:bg-slate-950 text-white px-3.5 py-1 rounded-full whitespace-nowrap transition"
        >
          <span>Klaim Promo</span>
          <i class="fa-solid fa-arrow-right text-[9px]"></i>
        </a>
      </div>
    </div>
  <?php endif; ?>

  <!-- NAVIGATION HEADER -->
  <nav class="sticky top-0 z-40 glass-header">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Brand Logo -->
        <a href="index.php" class="flex items-center gap-3 group">
          <div class="w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <img src="images/logo.png" alt="Logo TitikCerita" class="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]">
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-extrabold tracking-tight text-white font-heading">
                Titik<span class="text-gradient-gold">Cerita</span>
              </span>
              <?php if ($storeStatus === 'open'): ?>
                <span class="pulse-online w-2 h-2 rounded-full bg-emerald-400" title="Layanan Buka (Menerima Order)"></span>
              <?php else: ?>
                <span class="w-2 h-2 rounded-full bg-rose-500" title="Toko Sementara Tutup"></span>
              <?php endif; ?>
            </div>
            <p class="text-[10px] text-amber-200/80 tracking-wider uppercase font-semibold">
              <?= htmlspecialchars($siteTagline) ?>
              <?php if ($storeStatus !== 'open'): ?>
                <span class="ml-1 text-[9px] text-rose-400 font-bold">(Tutup Sementara)</span>
              <?php endif; ?>
            </p>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-300">
          <a href="#layanan" class="hover:text-amber-400 transition-colors">Layanan Kami</a>
          <a href="#kalkulator" class="hover:text-amber-400 transition-colors">Estimasi Harga</a>
          <a href="#portofolio" class="hover:text-amber-400 transition-colors">Portofolio</a>
          <a href="berita.php" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors">
            <i class="fa-solid fa-newspaper text-xs"></i>
            <span>Berita & Promo</span>
          </a>
          <a href="#testimoni" class="hover:text-amber-400 transition-colors">Testimoni</a>
          <a href="#kritik-saran" class="hover:text-amber-400 transition-colors">Kritik & Saran</a>
          <a href="#faq" class="hover:text-amber-400 transition-colors">FAQ</a>
          <a href="admin/index.php" class="hover:text-amber-400 text-amber-300 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all shadow-sm">
            <i class="fa-solid fa-shield-halved text-xs text-amber-400"></i>
            <span>Portal Admin</span>
          </a>
        </div>

        <!-- Right Action Button -->
        <div class="hidden sm:flex items-center gap-3">
          <button 
            onclick="openWhatsAppChat()" 
            class="btn-shimmer px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs md:text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>Chat Admin (24 Jam)</span>
          </button>
        </div>

        <!-- Mobile Menu Trigger -->
        <button 
          onclick="toggleMobileMenu()" 
          class="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl focus:outline-none"
        >
          <i class="fa-solid fa-bars text-xl"></i>
        </button>

      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobile-nav-menu" class="hidden lg:hidden glass-panel border-t border-white/5 px-4 pt-3 pb-6 space-y-3">
      <a href="#layanan" onclick="toggleMobileMenu()" class="block py-2 text-sm font-semibold text-slate-200">Layanan Kami</a>
      <a href="#kalkulator" onclick="toggleMobileMenu()" class="block py-2 text-sm font-semibold text-slate-200">Estimasi Harga</a>
      <a href="#portofolio" onclick="toggleMobileMenu()" class="block py-2 text-sm font-semibold text-slate-200">Portofolio</a>
      <a href="berita.php" onclick="toggleMobileMenu()" class="block py-2 text-sm font-bold text-amber-400 flex items-center gap-2">
        <i class="fa-solid fa-newspaper"></i>
        <span>Berita & Promo Terbaru</span>
      </a>
      <a href="#testimoni" onclick="toggleMobileMenu()" class="block py-2 text-sm font-semibold text-slate-200">Testimoni</a>
      <a href="#kritik-saran" onclick="toggleMobileMenu()" class="block py-2 text-sm font-semibold text-slate-200">Kritik & Saran</a>
      <a href="#faq" onclick="toggleMobileMenu()" class="block py-2 text-sm font-semibold text-slate-200">FAQ</a>
      <a href="admin/index.php" onclick="toggleMobileMenu()" class="block py-2 text-sm font-bold text-amber-400 flex items-center gap-2">
        <i class="fa-solid fa-shield-halved text-xs"></i>
        <span>Portal Admin</span>
      </a>
      <div class="pt-2">
        <button 
          onclick="openWhatsAppChat(); toggleMobileMenu();" 
          class="w-full py-3 bg-emerald-500 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2"
        >
          <i class="fa-brands fa-whatsapp text-lg"></i>
          <span>Chat WhatsApp Sekarang</span>
        </button>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <header class="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      
      <!-- Official Brand Logo in Hero (Centered, Clean, No Background) -->
      <div class="flex justify-center items-center mb-5">
        <div class="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center group">
          <div class="absolute inset-0 bg-amber-500/15 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
          <img 
            src="images/logo.png" 
            alt="Logo TitikCerita" 
            class="relative w-full h-full object-contain filter drop-shadow-[0_8px_25px_rgba(245,158,11,0.35)] hover:scale-105 transition-transform duration-300 select-none"
          />
        </div>
      </div>

      <!-- Top Pill Badge (Centered Directly Below Logo) -->
      <div class="flex justify-center mb-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-lg shadow-indigo-500/10">
          <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
          <span><?= htmlspecialchars($heroBadge) ?></span>
        </div>
      </div>

      <!-- Main Headline -->
      <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-heading max-w-5xl mx-auto leading-[1.15]">
        <?= $heroHeadline ?>
      </h1>

      <!-- Subheadline -->
      <p class="mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
        <?= $heroSubheadline ?>
      </p>

      <!-- CTA Action Buttons -->
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <button 
          onclick="openWhatsAppChat()" 
          class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm md:text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-95"
        >
          <i class="fa-brands fa-whatsapp text-xl"></i>
          <span>Konsultasi Cepat (Gratis)</span>
        </button>

        <a 
          href="#kalkulator" 
          class="w-full sm:w-auto px-7 py-4 glass-panel hover:bg-white/10 text-white font-bold text-sm md:text-base rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-calculator text-indigo-400"></i>
          <span>Hitung Estimasi Biaya</span>
        </a>
      </div>

      <!-- Key Guarantees Row -->
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left" id="guarantees-container">
        <!-- Rendered via JavaScript -->
      </div>

    </div>
  </header>

  <!-- 4 SERVICES SECTION (LAYANAN UNGGULAN) -->
  <section id="layanan" class="py-20 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">Layanan Fotografi Unggulan</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white font-heading">
          Pilihan Paket Sesi Foto Wisuda
        </h2>
        <p class="text-sm md:text-base text-slate-400 mt-3">
          Sesi pemotretan outdoor kampus profesional dengan arahan pose ramah, unlimited shots, dan tone warna estetik.
        </p>
      </div>

      <!-- Services Category Tab Navigation -->
      <div class="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8" id="service-tabs-nav">
        <!-- Tabs rendered via JavaScript -->
      </div>

      <!-- Active Service Content -->
      <div id="service-tab-content">
        <!-- Service content rendered via JavaScript -->
      </div>

    </div>
  </section>

  <!-- MERGED: ESTIMASI BIAYA + FORMULIR PEMESANAN -->
  <section id="kalkulator" class="py-20 bg-slate-950/60 relative border-y border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2"><?= htmlspecialchars($orderSectionBadge) ?></span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white font-heading">
          <?= htmlspecialchars($orderSectionTitle) ?>
        </h2>
        <p class="text-sm text-slate-400 mt-2">
          <?= htmlspecialchars($orderSectionSubtitle) ?>
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- LEFT: Calculator Inputs + Order Form (7 cols) -->
        <div class="lg:col-span-7 space-y-5">
          <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">

            <p class="text-xs font-bold uppercase tracking-wider text-indigo-400">📦 Pilih Paket Fotografi</p>

            <!-- Jenis Spesifikasi Paket -->
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"><?= htmlspecialchars($orderLabelPackage) ?>:</label>
              <select id="calc-subtype" class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="foto-editing">Per 5 Foto + Editing (Rp <?= number_format($pricePhotoEditing, 0, ',', '.') ?>)</option>
                <option value="foto-non-editing">Per 5 Foto Non-Editing (Rp <?= number_format($pricePhotoNonEditing, 0, ',', '.') ?>)</option>
              </select>
            </div>

            <!-- Jumlah Paket -->
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"><?= htmlspecialchars($orderLabelQty) ?>:</label>
              <input
                type="number"
                id="calc-qty"
                min="1"
                value="1"
                class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span class="text-[11px] text-slate-500 mt-1 block">Contoh: 1 paket (5 foto), 2 paket (10 foto)</span>
            </div>

          </div>

          <!-- Order Form Card -->
          <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">

            <p class="text-xs font-bold uppercase tracking-wider text-emerald-400">📝 Data Pemesanan</p>

            <form id="order-form" class="space-y-4">

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"><?= htmlspecialchars($orderLabelName) ?>:</label>
                  <input
                    type="text"
                    id="form-name"
                    placeholder="<?= htmlspecialchars($orderPlaceholderName) ?>"
                    required
                    class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"><?= htmlspecialchars($orderLabelPhone) ?>:</label>
                  <input
                    type="tel"
                    id="form-phone"
                    placeholder="<?= htmlspecialchars($orderPlaceholderPhone) ?>"
                    required
                    class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"><?= htmlspecialchars($orderLabelSchedule) ?>:</label>
                <input
                  type="text"
                  id="form-deadline"
                  placeholder="<?= htmlspecialchars($orderPlaceholderSchedule) ?>"
                  required
                  class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"><?= htmlspecialchars($orderLabelNotes) ?>:</label>
                <textarea
                  id="form-notes"
                  rows="3"
                  placeholder="<?= htmlspecialchars($orderPlaceholderNotes) ?>"
                  required
                  class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <!-- Hidden: will be filled from calculator state -->
              <input type="hidden" id="form-service-hidden" value="">
              <input type="hidden" id="form-estimate-hidden" value="">

            </form>
          </div>
        </div>

        <!-- RIGHT: Realtime Estimate Summary + Submit (5 cols) -->
        <div class="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl shadow-indigo-600/10 flex flex-col justify-between sticky top-24">

          <div>
            <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Rangkuman Pesanan</span>
              </div>
              <span id="summary-status-badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Menunggu Input
              </span>
            </div>

            <!-- Detail Rangkuman Sinkron Otomatis Realtime -->
            <div class="space-y-3 mb-6 text-xs">
              
              <!-- Paket & Jumlah -->
              <div class="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <span class="text-slate-400 text-[11px]">Paket Dipilih:</span>
                  <span id="calc-result-service" class="font-bold text-white text-right">-</span>
                </div>
                <div class="flex items-center justify-between gap-2 pt-1.5 border-t border-white/5">
                  <span class="text-slate-400 text-[11px]">Jumlah:</span>
                  <span id="calc-result-qty" class="font-semibold text-amber-400 text-right">-</span>
                </div>
              </div>

              <!-- Data Pelanggan Sinkron Realtime -->
              <div class="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-slate-400 text-[11px] flex items-center gap-1.5">
                    <i class="fa-solid fa-user text-slate-500 text-[10px]"></i> Nama:
                  </span>
                  <span id="summary-name" class="font-semibold text-slate-400 italic text-right truncate max-w-[190px]">Belum diisi</span>
                </div>
                <div class="flex items-center justify-between gap-2 pt-1.5 border-t border-white/5">
                  <span class="text-slate-400 text-[11px] flex items-center gap-1.5">
                    <i class="fa-brands fa-whatsapp text-emerald-500 text-[10px]"></i> WhatsApp:
                  </span>
                  <span id="summary-phone" class="font-mono text-slate-400 italic font-semibold text-right truncate max-w-[190px]">Belum diisi</span>
                </div>
                <div class="flex items-center justify-between gap-2 pt-1.5 border-t border-white/5">
                  <span class="text-slate-400 text-[11px] flex items-center gap-1.5">
                    <i class="fa-regular fa-calendar-check text-amber-400 text-[10px]"></i> Jadwal:
                  </span>
                  <span id="summary-deadline" class="font-semibold text-slate-400 italic text-right truncate max-w-[190px]">Belum diisi</span>
                </div>
                <div class="pt-1.5 border-t border-white/5">
                  <span class="text-slate-400 text-[11px] block mb-0.5">
                    <i class="fa-regular fa-comment-dots text-slate-500 text-[10px] mr-1"></i> Catatan:
                  </span>
                  <p id="summary-notes" class="text-[11px] text-slate-400 italic line-clamp-2 pl-2.5 border-l-2 border-amber-500/40">Belum ada catatan</p>
                </div>
              </div>

              <!-- Total Estimasi Biaya -->
              <div class="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/40 shadow-inner">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Estimasi Total Biaya</span>
                  <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">Bisa Nego</span>
                </div>
                <span id="calc-result-total" class="text-3xl font-black text-gradient block mt-1">Rp 0</span>
                <p class="text-[10px] text-slate-400 mt-1.5"><?= htmlspecialchars($orderEstimateNote) ?></p>
              </div>

            </div>
          </div>

          <!-- Single Submit Button -->
          <div class="space-y-2.5">
            <button
              type="button"
              id="btn-submit-order"
              onclick="submitMergedOrder()"
              class="btn-shimmer w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm md:text-base rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <i id="btn-submit-icon" class="fa-brands fa-whatsapp text-xl group-hover:scale-110 transition-transform"></i>
              <span id="btn-submit-text"><?= htmlspecialchars($orderBtnText) ?></span>
            </button>

            <p class="text-center text-[11px] text-slate-400">
              <i class="fa-solid fa-cloud-arrow-up text-emerald-400 mr-1"></i>Tersimpan di <b>Pesanan Masuk (Admin)</b> & lanjut ke WhatsApp.
            </p>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!-- PORTFOLIO SECTION (GALERI KARYA) -->
  <section id="portofolio" class="py-20 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">Galeri Hasil Jepretan</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white font-heading">
          Portofolio Hasil Fotografi
        </h2>
        <p class="text-sm text-slate-400 mt-2">
          Kumpulan hasil karya fotografi profesional dengan komposisi menarik, ketajaman optimal, dan tone warna estetik.
        </p>
      </div>

      <!-- Portfolio Grid -->
      <div id="portfolio-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Injected via JavaScript -->
      </div>

    </div>
  </section>

  <!-- DYNAMIC SECTION: BERITA, PROMO & TIPS TERBARU -->
  <section id="berita-section" class="py-20 bg-slate-950/70 border-t border-white/5 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">Update & Penawaran Khusus</span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-white font-heading">
            Kabar, Tips & Promo Terbaru
          </h2>
          <p class="text-sm text-slate-400 mt-2">
            Ikuti informasi promo diskon, tips sukses presentasi dan skripsi, serta kabar terbaru dari TitikCerita.
          </p>
        </div>

        <a 
          href="berita.php" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition duration-300 self-start md:self-auto"
        >
          <span>Lihat Semua Berita</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <?php if (!empty($latestArticles)): ?>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <?php foreach ($latestArticles as $art): ?>
            <div class="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-1">
              
              <div class="relative h-48 bg-slate-900 overflow-hidden">
                <?php if (!empty($art['cover_image'])): ?>
                  <img 
                    src="<?= htmlspecialchars($art['cover_image']) ?>" 
                    alt="<?= htmlspecialchars($art['title']) ?>" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                <?php else: ?>
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-700">
                    <i class="fa-regular fa-newspaper text-4xl"></i>
                  </div>
                <?php endif; ?>

                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur border border-amber-500/30 text-amber-400">
                  <?= htmlspecialchars($art['category'] ?? 'Info') ?>
                </span>
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                    <i class="fa-regular fa-calendar text-slate-500"></i>
                    <span><?= format_date_id($art['created_at']) ?></span>
                  </div>
                  <h3 class="text-base font-bold text-white font-heading group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    <a href="berita.php?slug=<?= urlencode($art['slug']) ?>">
                      <?= htmlspecialchars($art['title']) ?>
                    </a>
                  </h3>
                  <p class="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                    <?= htmlspecialchars($art['summary']) ?>
                  </p>
                </div>

                <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span class="text-[10px] text-slate-500">
                    <?= (int)$art['views'] ?> views
                  </span>
                  <a 
                    href="berita.php?slug=<?= urlencode($art['slug']) ?>" 
                    class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Baca Detail</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </div>

            </div>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <div class="text-center py-12 glass-panel rounded-3xl p-8 border border-white/5">
          <p class="text-sm text-slate-400">Belum ada artikel atau promo yang diterbitkan.</p>
        </div>
      <?php endif; ?>

    </div>
  </section>



  <!-- TESTIMONIALS SECTION -->
  <section id="testimoni" class="py-20 bg-slate-950/60 relative border-y border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">Suara Pelanggan Kami</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white font-heading">
          Cerita Mereka Yang Telah Terbantu
        </h2>
        <p class="text-sm text-slate-400 mt-2">
          Ratusan mahasiswa dari berbagai perguruan tinggi negeri maupun swasta telah mempercayakan tugas dan momen mereka pada TitikCerita.
        </p>
      </div>

      <!-- Testimonial Grid -->
      <div id="testimonials-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Injected via JavaScript -->
      </div>

    </div>
  </section>

  <!-- KRITIK & SARAN SECTION -->
  <section id="kritik-saran" class="py-20 relative bg-slate-950/50 border-t border-white/5">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-2">Suara Pelanggan</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white font-heading">
          Kritik & Saran Pelanggan
        </h2>
        <p class="text-sm text-slate-400 mt-2">
          Pendapatmu sangat berarti bagi kami. Silakan isi formulir di bawah untuk memberikan masukan, kritik, atau saran membangun.
        </p>
      </div>

      <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
        <form id="kritik-saran-form" class="space-y-5">

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Nama (Opsional):</label>
              <input
                type="text"
                id="ks-nama"
                placeholder="Nama kamu / Anonim"
                class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Kategori Masukan:</label>
              <select id="ks-kategori" class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500">
                <option value="Saran">💡 Saran</option>
                <option value="Kritik">⚠️ Kritik</option>
                <option value="Apresiasi">⭐ Apresiasi</option>
                <option value="Pertanyaan">❓ Pertanyaan</option>
              </select>
            </div>
          </div>

          <!-- Star Rating -->
          <div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Rating Layanan:</label>
            <div class="flex items-center gap-2" id="star-rating-container">
              <?php for ($s = 1; $s <= 5; $s++): ?>
                <button type="button" onclick="setRating(<?= $s ?>)" id="star-<?= $s ?>"
                  class="text-3xl text-slate-600 hover:text-amber-400 transition-colors focus:outline-none star-btn" data-value="<?= $s ?>">
                  ★
                </button>
              <?php endfor; ?>
              <span id="rating-label" class="text-xs text-slate-400 ml-2">Belum dipilih</span>
            </div>
            <input type="hidden" id="ks-rating" value="0">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Pesan / Masukan: <span class="text-rose-400">*</span></label>
            <textarea
              id="ks-pesan"
              rows="4"
              placeholder="Tuliskan kritik, saran, atau apresiasi kamu untuk layanan kami..."
              required
              class="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            ></textarea>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-90 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <i class="fa-solid fa-paper-plane"></i>
              <span>Kirim Kritik & Saran</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  </section>

  <!-- FAQS ACCORDION -->
  <section id="faq" class="py-20 relative bg-slate-950/40 border-t border-white/5">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-14">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">Pertanyaan Populer</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white font-heading">
          Sering Ditanyakan (FAQ)
        </h2>
        <p class="text-sm text-slate-400 mt-2">
          Jawaban seputar kerahasiaan data, proses pembayaran, garansi revisi, dan ketentuan pengerjaan.
        </p>
      </div>

      <div class="space-y-3" id="faqs-container">
        <!-- Injected via JavaScript -->
      </div>

    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-slate-950 border-t border-white/5 pt-16 pb-12 text-slate-400 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        <!-- Col 1: Brand Info -->
        <div class="space-y-4 md:col-span-1">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 flex items-center justify-center flex-shrink-0">
              <img src="images/logo.png" alt="Logo TitikCerita" class="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
            </div>
            <span class="text-xl font-extrabold text-white font-heading">Titik<span class="text-gradient-gold">Cerita</span></span>
          </div>
          <p class="leading-relaxed">
            Jasa fotografer wisuda profesional & dokumentasi momen kelulusan berharga di Samarinda dan sekitarnya. Unlimited shots, arahan pose ramah, dan tone warna estetik bergaransi.
          </p>
          <div class="flex items-center gap-3 text-slate-300 text-base">
            <a href="https://instagram.com/<?= $instagramClean ?>" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-600 hover:text-white transition-all" title="Instagram <?= htmlspecialchars($instagramHandle) ?>"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/<?= $whatsappClean ?>" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors" title="WhatsApp <?= htmlspecialchars($whatsappNumber) ?>"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://instagram.com/<?= $instagramClean ?>" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors" title="<?= htmlspecialchars($instagramHandle) ?>"><i class="fa-brands fa-tiktok"></i></a>
          </div>
        </div>

        <!-- Col 2: Layanan -->
        <div class="space-y-2">
          <h4 class="font-bold text-white text-sm mb-3">Paket Fotografi Wisuda</h4>
          <p><a href="#layanan" class="hover:text-amber-400 transition-colors">Foto Wisuda Per Orang (Solo / Individu)</a></p>
          <p><a href="#layanan" class="hover:text-amber-400 transition-colors">Foto Wisuda Bareng Sahabat (Per Orang)</a></p>
          <p><a href="#layanan" class="hover:text-amber-400 transition-colors">Foto Wisuda Bersama Keluarga</a></p>
          <p><a href="#layanan" class="hover:text-amber-400 transition-colors">Dokumentasi Sesi Wisuda Outdoor Kampus</a></p>
          <p><a href="#layanan" class="hover:text-amber-400 transition-colors">Retouching & Color Grading Estetik</a></p>
          <p><a href="#layanan" class="hover:text-amber-400 transition-colors">Cetak Foto Bingkai 10R Premium</a></p>
        </div>

        <!-- Col 3: Navigasi -->
        <div class="space-y-2">
          <h4 class="font-bold text-white text-sm mb-3">Pintasan</h4>
          <p><a href="berita.php" class="text-amber-400 hover:underline font-semibold flex items-center gap-1.5"><i class="fa-solid fa-newspaper text-xs"></i> Portal Berita & Promo</a></p>
          <p><a href="#kalkulator" class="hover:text-indigo-400 transition-colors">Kalkulator Estimasi Biaya</a></p>
          <p><a href="#portofolio" class="hover:text-indigo-400 transition-colors">Galeri Portofolio</a></p>
          <p><a href="#kritik-saran" class="hover:text-indigo-400 transition-colors">Kritik & Saran</a></p>
          <p><a href="#faq" class="hover:text-indigo-400 transition-colors">Tanya Jawab (FAQ)</a></p>
          <p><a href="admin/index.php" class="text-amber-400 hover:underline font-semibold flex items-center gap-1.5"><i class="fa-solid fa-gauge-high text-xs"></i> Portal Admin TitikCerita</a></p>
          <p><a href="pos/index.html" class="text-indigo-400 hover:underline">Buka Aplikasi Kasir (POS)</a></p>
        </div>

        <!-- Col 4: Kontak & Jam Operasional -->
        <div class="space-y-3">
          <h4 class="font-bold text-white text-sm mb-2">Hubungi Kami</h4>
          <p class="flex items-center gap-2">
            <i class="fa-solid fa-location-dot text-amber-400"></i>
            <span><?= htmlspecialchars($location) ?></span>
          </p>
          <p class="flex items-center gap-2">
            <i class="fa-solid fa-clock text-emerald-400"></i>
            <span><?= htmlspecialchars($operationalHours) ?></span>
          </p>
          <p class="flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-emerald-400"></i>
            <a href="https://wa.me/<?= $whatsappClean ?>" target="_blank" class="hover:text-emerald-400 transition-colors"><?= htmlspecialchars($whatsappNumber) ?> (WhatsApp)</a>
          </p>
          <p class="flex items-center gap-2">
            <i class="fa-brands fa-instagram text-pink-400"></i>
            <a href="https://instagram.com/<?= $instagramClean ?>" target="_blank" class="hover:text-pink-400 transition-colors font-semibold"><?= htmlspecialchars($instagramHandle) ?></a>
          </p>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; <?= date('Y') ?> TitikCerita. All Rights Reserved. Jasa Fotografer Wisuda & Dokumentasi Kelulusan.</p>
        <div class="flex items-center gap-4 text-xs">
          <a href="admin/index.php" class="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-semibold">
            <i class="fa-solid fa-shield-halved text-xs"></i>
            <span>Portal Admin (Login)</span>
          </a>
          <span class="text-slate-700">|</span>
          <button 
            onclick="openAdminOrdersModal()" 
            class="text-xs text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1.5"
          >
            <i class="fa-solid fa-lock text-[10px]"></i>
            <span>Rekap Pesanan (Lokal)</span>
          </button>
        </div>
      </div>

    </div>
  </footer>

  <!-- FLOATING WHATSAPP BUTTON (Always Accessible) -->
  <div class="fixed bottom-6 right-6 z-50">
    <button 
      onclick="openWhatsAppChat()" 
      class="group flex items-center gap-3 p-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-full shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105"
      title="Konsultasi WhatsApp Sekarang"
    >
      <i class="fa-brands fa-whatsapp text-2xl text-slate-950"></i>
      <span class="hidden md:inline text-xs font-bold pr-2 text-slate-950">Chat Admin (Fast Response)</span>
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-950 animate-pulse"></span>
    </button>
  </div>

  <!-- ==================== MODALS ==================== -->

  <!-- 1. PORTFOLIO LIGHTBOX MODAL -->
  <div id="portfolio-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4">
    <div class="glass-panel rounded-3xl max-w-2xl w-full overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
      
      <div class="p-4 bg-slate-900 border-b border-white/5 flex items-center justify-between">
        <span id="modal-port-category" class="text-xs font-bold text-indigo-400 uppercase tracking-wider">Kategori</span>
        <button onclick="closePortfolioModal()" class="text-slate-400 hover:text-white p-1">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div class="overflow-y-auto p-6 space-y-4">
        <div class="w-full h-72 rounded-2xl overflow-hidden bg-slate-900">
          <img id="modal-port-img" src="" alt="" class="w-full h-full object-cover">
        </div>

        <div>
          <h3 id="modal-port-title" class="text-xl font-bold text-white font-heading">-</h3>
          <p class="text-xs text-slate-400 mt-1">Klien: <span id="modal-port-client" class="text-slate-300 font-semibold">-</span></p>
        </div>

        <p id="modal-port-desc" class="text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
          -
        </p>

        <div class="pt-2">
          <button 
            onclick="openWhatsAppChat('Karya Portofolio Serupa'); closePortfolioModal();" 
            class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>Pesan Projek Serupa Seperti Ini</span>
          </button>
        </div>
      </div>

    </div>
  </div>

  <!-- 2. ADMIN ORDERS TRACKER & CONFIG MODAL (LOCAL CACHE) -->
  <div id="admin-orders-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md hidden items-center justify-center p-4">
    <div class="glass-panel rounded-3xl max-w-4xl w-full overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
      
      <div class="p-5 bg-slate-900 border-b border-white/5 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">
            <i class="fa-solid fa-list-check"></i>
          </div>
          <div>
            <h3 class="font-bold text-white text-base">Dashboard Pesanan Masuk (Internal)</h3>
            <p class="text-[11px] text-slate-400">Rekap submission form pemesanan pelanggan</p>
          </div>
        </div>
        <button onclick="closeAdminOrdersModal()" class="text-slate-400 hover:text-white p-2">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <!-- Quick Config: Set WhatsApp Number -->
      <div class="p-4 bg-slate-900/60 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <span class="text-slate-400 whitespace-nowrap">Nomor WhatsApp Admin:</span>
          <input 
            type="text" 
            id="admin-wa-input" 
            value="<?= htmlspecialchars($whatsappClean) ?>" 
            placeholder="6283126066621" 
            class="px-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-white font-mono"
          />
          <button 
            onclick="saveAdminWhatsApp()" 
            class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
          >
            Simpan
          </button>
        </div>

        <button 
          onclick="clearAllOrders()" 
          class="text-xs text-rose-400 hover:text-rose-300 font-semibold"
        >
          <i class="fa-solid fa-trash mr-1"></i> Bersihkan Riwayat
        </button>
      </div>

      <!-- Orders Table -->
      <div class="p-5 overflow-y-auto flex-1">
        <div class="overflow-x-auto border border-white/5 rounded-2xl">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-900 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th class="py-3 px-3">ID</th>
                <th class="py-3 px-3">Pelanggan</th>
                <th class="py-3 px-3">Layanan</th>
                <th class="py-3 px-3">Deadline</th>
                <th class="py-3 px-3">Catatan</th>
                <th class="py-3 px-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody id="admin-orders-table-body">
              <!-- Injected via JavaScript -->
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>

  <!-- SCRIPT INCLUDES -->
  <script src="js/titikcerita-data.js"></script>
  <script src="js/titikcerita.js"></script>

  <!-- Kritik & Saran Form Script -->
  <script>
    let currentRating = 0;
    const ratingLabels = {0:'Belum dipilih',1:'😞 Sangat Buruk',2:'😐 Buruk',3:'🙂 Cukup',4:'😊 Baik',5:'🤩 Sangat Baik'};

    function setRating(val) {
      currentRating = val;
      document.getElementById('ks-rating').value = val;
      document.querySelectorAll('.star-btn').forEach(btn => {
        btn.style.color = parseInt(btn.dataset.value) <= val ? '#f59e0b' : '#475569';
      });
      document.getElementById('rating-label').textContent = ratingLabels[val] || '';
    }

    document.getElementById('kritik-saran-form')?.addEventListener('submit', function(e) {
      e.preventDefault();
      const nama   = document.getElementById('ks-nama').value.trim() || 'Anonim';
      const kategori = document.getElementById('ks-kategori').value;
      const rating = parseInt(document.getElementById('ks-rating').value) || 0;
      const pesan  = document.getElementById('ks-pesan').value.trim();

      if (!pesan) {
        Swal.fire({ icon: 'warning', title: 'Pesan kosong', text: 'Mohon isi pesan masukan Anda.', confirmButtonColor: '#e11d48' });
        return;
      }

      fetch('api/submit_feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, kategori, rating, pesan })
      })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Terima Kasih! 🙏',
            text: 'Masukan kamu sudah kami terima. Kami akan terus meningkatkan layanan berdasarkan masukan berharga dari pelanggan.',
            confirmButtonColor: '#e11d48'
          });
          document.getElementById('kritik-saran-form').reset();
          setRating(0);
        } else {
          Swal.fire({ icon: 'error', title: 'Gagal Mengirim', text: data.message || 'Terjadi kesalahan. Coba lagi.', confirmButtonColor: '#e11d48' });
        }
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Koneksi Gagal', text: 'Tidak dapat menghubungi server. Coba beberapa saat lagi.', confirmButtonColor: '#e11d48' });
      });
    });
  </script>
</body>
</html>
