<?php
require_once __DIR__ . '/config/helper.php';

$db = get_db_connection();

// Settings
$brandName = get_setting('brand_name', 'TitikCerita');
$whatsappNumber = get_setting('whatsapp_number', '083126066621');
$whatsappClean = preg_replace('/[^0-9]/', '', $whatsappNumber);
if (substr($whatsappClean, 0, 1) === '0') {
    $whatsappClean = '62' . substr($whatsappClean, 1);
}
$instagramHandle = get_setting('instagram', '@titikcerita_22');
$location = get_setting('location', 'Samarinda & Online Seluruh Indonesia');
$operationalHours = get_setting('operational_hours', 'Senin - Minggu: 08.00 - 23.00 WITA');

$slug = trim($_GET['slug'] ?? '');
$categoryFilter = trim($_GET['kategori'] ?? '');
$searchKeyword = trim($_GET['q'] ?? '');

$article = null;
$relatedArticles = [];

if (!empty($slug)) {
    // Detail view
    $stmt = $db->prepare("SELECT * FROM berita WHERE slug = :slug AND status = 'published' LIMIT 1");
    $stmt->execute([':slug' => $slug]);
    $article = $stmt->fetch();

    if ($article) {
        // Increment views count
        $updateViews = $db->prepare("UPDATE berita SET views = views + 1 WHERE id = :id");
        $updateViews->execute([':id' => $article['id']]);

        // Get related articles
        $relStmt = $db->prepare("SELECT * FROM berita WHERE id != :id AND status = 'published' ORDER BY created_at DESC LIMIT 4");
        $relStmt->execute([':id' => $article['id']]);
        $relatedArticles = $relStmt->fetchAll();
    }
} else {
    // List view
    $sql = "SELECT * FROM berita WHERE status = 'published'";
    $params = [];

    if (!empty($categoryFilter) && $categoryFilter !== 'semua') {
        $sql .= " AND category = :cat";
        $params[':cat'] = $categoryFilter;
    }

    if (!empty($searchKeyword)) {
        $sql .= " AND (title LIKE :q OR summary LIKE :q OR content LIKE :q)";
        $params[':q'] = '%' . $searchKeyword . '%';
    }

    $sql .= " ORDER BY created_at DESC";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $articlesList = $stmt->fetchAll();
}
?>
<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $article ? htmlspecialchars($article['title']) . ' - ' : ($searchKeyword ? 'Pencarian: ' . htmlspecialchars($searchKeyword) . ' - ' : '') ?>Berita & Info <?= htmlspecialchars($brandName) ?></title>
  <meta name="description" content="<?= $article ? htmlspecialchars($article['summary']) : 'Kumpulan berita, info promo diskon sesi fotografi, tips foto estetik, dan portofolio TitikCerita.' ?>">
  <link rel="icon" type="image/png" href="images/logo.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- FontAwesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link rel="stylesheet" href="css/titikcerita.css">

  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #090d16; }
    .font-heading { font-family: 'Space Grotesk', sans-serif; }
    .article-body p { margin-bottom: 1.25rem; line-height: 1.8; color: #cbd5e1; }
    .article-body h2 { font-size: 1.5rem; font-weight: 700; color: #f8fafc; margin-top: 2rem; margin-bottom: 1rem; font-family: 'Space Grotesk', sans-serif; }
    .article-body h3 { font-size: 1.25rem; font-weight: 600; color: #fbbf24; margin-top: 1.5rem; margin-bottom: 0.75rem; }
    .article-body ul, .article-body ol { margin-bottom: 1.25rem; padding-left: 1.5rem; color: #cbd5e1; }
    .article-body ul { list-style-type: disc; }
    .article-body ol { list-style-type: decimal; }
    .article-body li { margin-bottom: 0.5rem; }
    .article-body blockquote { border-left: 4px solid #f59e0b; padding-left: 1rem; font-style: italic; color: #94a3b8; margin: 1.5rem 0; }
  </style>
</head>
<body class="text-slate-100 selection:bg-amber-500 selection:text-slate-950">

  <!-- BACKGROUND GLOW -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div class="glow-primary w-[550px] h-[550px] bg-indigo-600 top-[-100px] left-[-100px]"></div>
    <div class="glow-primary w-[500px] h-[500px] bg-amber-600 top-[30%] right-[-150px] opacity-15"></div>
  </div>

  <!-- NAVIGATION BAR -->
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
              <span class="pulse-online w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p class="text-[10px] text-amber-200/80 tracking-wider uppercase font-semibold">Creative & Academic Agency</p>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-300">
          <a href="index.php#layanan" class="hover:text-amber-400 transition-colors">Layanan Kami</a>
          <a href="index.php#kalkulator" class="hover:text-amber-400 transition-colors">Estimasi Harga</a>
          <a href="index.php#portofolio" class="hover:text-amber-400 transition-colors">Portofolio</a>
          <a href="berita.php" class="text-amber-400 font-bold flex items-center gap-1.5">
            <i class="fa-solid fa-newspaper text-xs"></i>
            <span>Berita & Promo</span>
          </a>
          <a href="index.php#faq" class="hover:text-amber-400 transition-colors">FAQ</a>
          <a href="admin/index.php" class="hover:text-amber-400 text-amber-300 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all shadow-sm">
            <i class="fa-solid fa-shield-halved text-xs text-amber-400"></i>
            <span>Portal Admin</span>
          </a>
        </div>

        <!-- Right CTA Button -->
        <div class="flex items-center gap-3">
          <a 
            href="https://wa.me/<?= $whatsappClean ?>?text=Halo%20Admin%20TitikCerita,%20saya%20ingin%20konsultasi%20layanan" 
            target="_blank"
            class="btn-shimmer px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs md:text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span class="hidden sm:inline">Chat Admin (24 Jam)</span>
            <span class="sm:hidden">Chat</span>
          </a>
        </div>

      </div>
    </div>
  </nav>

  <!-- CONTENT -->
  <main class="py-10 md:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <?php if (!empty($slug)): ?>
        <?php if ($article): ?>
          <!-- DETAIL ARTICLE VIEW -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            <!-- Main Article Column (2 Cols) -->
            <article class="lg:col-span-2">
              
              <!-- Breadcrumb -->
              <div class="flex items-center gap-2 text-xs text-slate-400 mb-5">
                <a href="index.php" class="hover:text-amber-400">Beranda</a>
                <i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i>
                <a href="berita.php" class="hover:text-amber-400">Berita & Promo</a>
                <i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i>
                <span class="text-slate-200 truncate max-w-[200px]"><?= htmlspecialchars($article['title']) ?></span>
              </div>

              <!-- Category & Date Meta -->
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <?= htmlspecialchars($article['category'] ?? 'Info') ?>
                </span>
                <span class="text-xs text-slate-400 flex items-center gap-1.5">
                  <i class="fa-regular fa-calendar text-slate-500"></i>
                  <?= format_date_id($article['created_at']) ?>
                </span>
                <span class="text-xs text-slate-400 flex items-center gap-1.5">
                  <i class="fa-regular fa-eye text-slate-500"></i>
                  <?= (int)$article['views'] ?> views
                </span>
                <span class="text-xs text-slate-400 flex items-center gap-1.5">
                  <i class="fa-regular fa-user text-slate-500"></i>
                  <?= htmlspecialchars($article['author'] ?? 'Admin TitikCerita') ?>
                </span>
              </div>

              <!-- Title -->
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading leading-tight mb-6">
                <?= htmlspecialchars($article['title']) ?>
              </h1>

              <!-- Excerpt / Summary Box -->
              <?php if (!empty($article['summary'])): ?>
                <div class="p-4 rounded-xl bg-slate-900/80 border-l-4 border-amber-500 text-slate-300 text-sm italic mb-6">
                  <?= htmlspecialchars($article['summary']) ?>
                </div>
              <?php endif; ?>

              <!-- Cover Image -->
              <?php if (!empty($article['cover_image'])): ?>
                <div class="rounded-2xl overflow-hidden border border-white/10 mb-8 bg-slate-900">
                  <img 
                    src="<?= htmlspecialchars($article['cover_image']) ?>" 
                    alt="<?= htmlspecialchars($article['title']) ?>" 
                    class="w-full max-h-[460px] object-cover"
                  >
                </div>
              <?php endif; ?>

              <!-- Article Body Content -->
              <div class="article-body text-slate-200 text-base leading-relaxed">
                <?= nl2br(htmlspecialchars($article['content'])) ?>
              </div>

              <!-- Share Buttons -->
              <div class="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Bagikan:</span>
                  <a 
                    href="https://wa.me/?text=<?= urlencode($article['title'] . ' ' . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>" 
                    target="_blank"
                    class="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 flex items-center justify-center transition"
                    title="Bagikan ke WhatsApp"
                  >
                    <i class="fa-brands fa-whatsapp"></i>
                  </a>
                  <a 
                    href="https://t.me/share/url?url=<?= urlencode((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>&text=<?= urlencode($article['title']) ?>" 
                    target="_blank"
                    class="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 flex items-center justify-center transition"
                    title="Bagikan ke Telegram"
                  >
                    <i class="fa-brands fa-telegram"></i>
                  </a>
                  <button 
                    onclick="navigator.clipboard.writeText(window.location.href); alert('Link artikel berhasil disalin!');"
                    class="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition"
                    title="Salin Link"
                  >
                    <i class="fa-solid fa-link text-xs"></i>
                  </button>
                </div>

                <a href="berita.php" class="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5">
                  <i class="fa-solid fa-arrow-left"></i>
                  <span>Kembali ke Semua Berita</span>
                </a>
              </div>

            </article>

            <!-- Sidebar (1 Col) -->
            <aside class="space-y-6">
              
              <!-- WhatsApp Quick CTA Card -->
              <div class="glass-card p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent">
                <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mb-4">
                  <i class="fa-solid fa-headset"></i>
                </div>
                <h3 class="text-lg font-bold text-white font-heading mb-2">Butuh Sesi Fotografi & Dokumentasi Momen?</h3>
                <p class="text-xs text-slate-300 leading-relaxed mb-5">
                  Tim fotografer TitikCerita siap abadikan momen wisuda, event, dan foto portrait kamu dengan hasil estetik bergaransi!
                </p>
                <a 
                  href="https://wa.me/<?= $whatsappClean ?>?text=Halo%20Admin%20TitikCerita,%20saya%20baca%20artikel:%20<?= urlencode($article['title']) ?>%20dan%20ingin%20konsultasi%20layanan." 
                  target="_blank"
                  class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                >
                  <i class="fa-brands fa-whatsapp text-base"></i>
                  <span>Konsultasi Cepat (WhatsApp)</span>
                </a>
              </div>

              <!-- Related Articles -->
              <?php if (!empty($relatedArticles)): ?>
                <div class="glass-card p-6 rounded-2xl">
                  <h3 class="text-sm font-bold text-white font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-bolt text-amber-400"></i>
                    <span>Berita & Promo Terkini</span>
                  </h3>
                  <div class="space-y-4">
                    <?php foreach ($relatedArticles as $rel): ?>
                      <a href="berita.php?slug=<?= urlencode($rel['slug']) ?>" class="group block border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                        <span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                          <?= htmlspecialchars($rel['category']) ?>
                        </span>
                        <h4 class="text-xs font-semibold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-2 mt-0.5">
                          <?= htmlspecialchars($rel['title']) ?>
                        </h4>
                        <span class="text-[10px] text-slate-500 mt-1 block">
                          <?= format_date_id($rel['created_at']) ?>
                        </span>
                      </a>
                    <?php endforeach; ?>
                  </div>
                </div>
              <?php endif; ?>

            </aside>

          </div>
        <?php else: ?>
          <!-- NOT FOUND -->
          <div class="text-center py-20">
            <div class="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl mx-auto mb-4">
              <i class="fa-solid fa-circle-question"></i>
            </div>
            <h2 class="text-xl font-bold text-white font-heading">Artikel Tidak Ditemukan</h2>
            <p class="text-xs text-slate-400 mt-2 max-w-md mx-auto">
              Artikel yang Anda cari mungkin telah dipindahkan, dinonaktifkan, atau slug URL tidak sesuai.
            </p>
            <div class="mt-6">
              <a href="berita.php" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition">
                <i class="fa-solid fa-arrow-left"></i>
                <span>Kembali ke Berita TitikCerita</span>
              </a>
            </div>
          </div>
        <?php endif; ?>

      <?php else: ?>
        <!-- ARCHIVE / LIST VIEW -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <i class="fa-regular fa-newspaper"></i>
            <span>Pusat Berita, Promo & Tips Akademik</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
            Kabar Terkini & Info Promo <span class="text-gradient-gold">TitikCerita</span>
          </h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
            Dapatkan diskon tugas kuliah, informasi promo musiman, tips presentasi dan skripsi, serta portofolio karya terbaru kami.
          </p>
        </div>

        <!-- Filter & Search Bar -->
        <div class="glass-card p-4 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <!-- Category Pills -->
          <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <?php
            $cats = ['semua' => 'Semua', 'Promo' => 'Promo', 'Akademik' => 'Akademik', 'Desain' => 'Desain', 'Video' => 'Video', 'Tips' => 'Tips'];
            foreach ($cats as $key => $label):
              $isActive = ($categoryFilter === $key) || (empty($categoryFilter) && $key === 'semua');
            ?>
              <a 
                href="berita.php?kategori=<?= urlencode($key) ?><?= !empty($searchKeyword) ? '&q=' . urlencode($searchKeyword) : '' ?>" 
                class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition <?= $isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'bg-white/5 text-slate-300 hover:bg-white/10' ?>"
              >
                <?= $label ?>
              </a>
            <?php endforeach; ?>
          </div>

          <!-- Search Input -->
          <form method="GET" action="berita.php" class="relative w-full sm:w-72">
            <?php if (!empty($categoryFilter)): ?>
              <input type="hidden" name="kategori" value="<?= htmlspecialchars($categoryFilter) ?>">
            <?php endif; ?>
            <input 
              type="text" 
              name="q" 
              value="<?= htmlspecialchars($searchKeyword) ?>" 
              placeholder="Cari artikel atau promo..."
              class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
            >
            <button type="submit" class="absolute right-3 top-2.5 text-slate-400 hover:text-amber-400">
              <i class="fa-solid fa-magnifying-glass text-xs"></i>
            </button>
          </form>

        </div>

        <!-- Article Grid -->
        <?php if (!empty($articlesList)): ?>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($articlesList as $art): ?>
              <article class="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-1">
                
                <!-- Card Image -->
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

                  <!-- Category Badge -->
                  <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur border border-amber-500/30 text-amber-400">
                    <?= htmlspecialchars($art['category'] ?? 'Info') ?>
                  </span>
                </div>

                <!-- Card Content -->
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 text-[10px] text-slate-400 mb-2">
                      <span><i class="fa-regular fa-calendar mr-1"></i> <?= format_date_id($art['created_at']) ?></span>
                      <span><i class="fa-regular fa-eye mr-1"></i> <?= (int)$art['views'] ?> views</span>
                    </div>
                    <h3 class="text-base font-bold text-white font-heading group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      <a href="berita.php?slug=<?= urlencode($art['slug']) ?>">
                        <?= htmlspecialchars($art['title']) ?>
                      </a>
                    </h3>
                    <p class="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      <?= htmlspecialchars($art['summary']) ?>
                    </p>
                  </div>

                  <div class="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span class="text-[11px] text-slate-500 font-medium">
                      Oleh: <?= htmlspecialchars($art['author'] ?? 'Admin') ?>
                    </span>
                    <a 
                      href="berita.php?slug=<?= urlencode($art['slug']) ?>" 
                      class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Baca</span>
                      <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>
                </div>

              </article>
            <?php endforeach; ?>
          </div>
        <?php else: ?>
          <div class="text-center py-16 glass-card rounded-2xl p-8">
            <div class="w-14 h-14 rounded-full bg-white/5 text-slate-500 flex items-center justify-center text-xl mx-auto mb-3">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <h3 class="text-base font-bold text-white font-heading">Tidak Ada Artikel Ditemukan</h3>
            <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Tidak ada artikel yang cocok dengan filter atau kata kunci pencarian Anda.
            </p>
            <div class="mt-4">
              <a href="berita.php" class="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-2">
                <span>Reset Filter</span>
              </a>
            </div>
          </div>
        <?php endif; ?>

      <?php endif; ?>

    </div>
  </main>

  <!-- FOOTER -->
  <footer class="border-t border-white/10 bg-slate-950/80 py-12 mt-12 text-xs text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <img src="images/logo.png" alt="Logo" class="w-8 h-8 object-contain">
        <span class="font-bold text-white">Titik<span class="text-amber-400">Cerita</span></span>
        <span class="text-slate-600">|</span>
        <span><?= htmlspecialchars($location) ?></span>
      </div>
      <div>
        <span>Instagram: <a href="https://instagram.com/<?= ltrim($instagramHandle, '@') ?>" target="_blank" class="text-amber-400 hover:underline"><?= htmlspecialchars($instagramHandle) ?></a></span>
        <span class="mx-3 text-slate-700">&bull;</span>
        <span>WhatsApp: <a href="https://wa.me/<?= $whatsappClean ?>" class="text-emerald-400 hover:underline"><?= htmlspecialchars($whatsappNumber) ?></a></span>
      </div>
      <p>&copy; <?= date('Y') ?> TitikCerita. All rights reserved.</p>
    </div>
  </footer>

</body>
</html>
