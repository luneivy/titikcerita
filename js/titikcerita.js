/**
 * TitikCerita - Frontend Application Logic & Interactions
 */

// --- Global State ---
const TitikCeritaApp = {
  activeServiceTab: 'tugas-kuliah',
  activePortfolioFilter: 'all',
  calculatorState: {
    service: 'tugas',
    subtype: 'makalah',
    quantity: 1,
    deadline: 'reguler',
    addons: []
  },
  storedOrders: [],
  customWhatsApp: null
};

// --- Currency Formatter ---
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount || 0);
}

// --- WhatsApp Link Generator ---
function getWhatsAppUrl(message) {
  const phone = TitikCeritaApp.customWhatsApp || TITIKCERITA_CONFIG.whatsappNumber;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// --- Direct Quick WhatsApp Consultation ---
function openWhatsAppChat(serviceName = '') {
  let text = `Halo Admin TitikCerita! 👋\nSaya ingin konsultasi dan tanya-tanya mengenai layanan`;
  if (serviceName) {
    text += ` *${serviceName}*.`;
  } else {
    text += ` di TitikCerita.`;
  }
  text += `\nApakah saat ini tim TitikCerita sedang online dan menerima pesanan? Terima kasih!`;
  window.open(getWhatsAppUrl(text), '_blank');
}

// --- Render Guarantees & Trust Badges ---
function renderGuarantees() {
  const container = document.getElementById('guarantees-container');
  if (!container) return;

  container.innerHTML = TITIKCERITA_CONFIG.guarantees.map(item => `
    <div class="glass-panel p-5 rounded-2xl flex items-start gap-4 border border-white/5 hover:border-indigo-500/40 transition-colors">
      <div class="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl flex-shrink-0 border border-indigo-500/30">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <div>
        <h4 class="font-bold text-white text-base mb-1">${item.title}</h4>
        <p class="text-xs text-slate-400 leading-relaxed">${item.desc}</p>
      </div>
    </div>
  `).join('');
}

// --- Render Services Section ---
function renderServicesTabs() {
  const tabsContainer = document.getElementById('service-tabs-nav');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = SERVICES_DATA.map(service => {
    const isActive = TitikCeritaApp.activeServiceTab === service.id;
    return `
      <button 
        onclick="switchServiceTab('${service.id}')"
        class="flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
          isActive 
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500' 
            : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
        }"
      >
        <i class="fa-solid ${service.icon} ${isActive ? 'text-white' : 'text-indigo-400'}"></i>
        <span>${service.shortName}</span>
      </button>
    `;
  }).join('');

  renderActiveServiceContent();
}

function switchServiceTab(serviceId) {
  TitikCeritaApp.activeServiceTab = serviceId;
  renderServicesTabs();
}

function renderActiveServiceContent() {
  const contentContainer = document.getElementById('service-tab-content');
  if (!contentContainer) return;

  const currentService = SERVICES_DATA.find(s => s.id === TitikCeritaApp.activeServiceTab);
  if (!currentService) return;

  contentContainer.innerHTML = `
    <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-panel rounded-3xl border border-white/10">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            ${currentService.badge}
          </span>
          <span class="text-xs text-slate-400">${currentService.unit}</span>
        </div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-white font-heading">${currentService.categoryName}</h3>
        <p class="text-sm text-slate-300 mt-2 max-w-2xl">${currentService.tagline}</p>
      </div>

      <div class="flex-shrink-0">
        <button 
          onclick="openWhatsAppChat('${currentService.categoryName}')" 
          class="w-full md:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
        >
          <i class="fa-brands fa-whatsapp text-lg"></i>
          <span>Konsultasi ${currentService.shortName}</span>
        </button>
      </div>
    </div>

    <!-- Sub-services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${currentService.items.map(item => `
        <div class="service-card glass-panel p-6 rounded-3xl flex flex-col justify-between border border-white/5 relative group">
          <div>
            <div class="flex items-start justify-between gap-3 mb-3">
              <h4 class="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">
                ${item.name}
              </h4>
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 whitespace-nowrap">
                ${item.price}
              </span>
            </div>

            <p class="text-xs text-slate-400 mb-5 leading-relaxed">
              ${item.desc}
            </p>

            <div class="space-y-2 mb-6">
              ${item.features.map(feat => `
                <div class="flex items-center gap-2 text-xs text-slate-300">
                  <i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
                  <span>${feat}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <button 
            onclick="orderSpecificItem('${currentService.categoryName}', '${item.name}', '${item.price}')"
            class="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/5 hover:bg-indigo-600 text-white transition-all border border-white/10 hover:border-indigo-500 flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-paper-plane text-[11px]"></i>
            <span>Pesan Sekarang</span>
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function orderSpecificItem(category, itemName, price) {
  // Pre-fill calculator or form and scroll
  const formServiceSelect = document.getElementById('form-service');
  if (formServiceSelect) {
    let matched = false;
    for (let opt of formServiceSelect.options) {
      if (opt.value && (itemName.toLowerCase().includes(opt.value.toLowerCase()) || opt.value.toLowerCase().includes(itemName.toLowerCase()))) {
        formServiceSelect.value = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched) {
      if (category.includes('Tugas') || category.includes('Joki')) formServiceSelect.value = 'Joki PPT Presentasi';
      else if (category.includes('Desain')) formServiceSelect.value = 'Desain Poster';
      else if (category.includes('Video')) formServiceSelect.value = 'Video Promosi';
      else if (category.includes('Foto')) formServiceSelect.value = 'Fotografer Wisuda Outdoor';
    }
  }

  const formNotes = document.getElementById('form-notes');
  if (formNotes) {
    formNotes.value = `Saya berminat memesan layanan "${itemName}" (${price}). Mohon info estimasi pengerjaan dan detail kelanjutannya kak.`;
  }

  const orderFormSection = document.getElementById('section-order-form');
  if (orderFormSection) {
    orderFormSection.scrollIntoView({ behavior: 'smooth' });
    // Highlight form input
    document.getElementById('form-name')?.focus();
  }
}

// --- Interactive Price Estimator (Kalkulator Biaya) ---
function initPriceCalculator() {
  const serviceSelect = document.getElementById('calc-service');
  const subtypeSelect = document.getElementById('calc-subtype');
  const deadlineSelect = document.getElementById('calc-deadline');
  const qtyInput = document.getElementById('calc-qty');

  if (!serviceSelect || !subtypeSelect) return;

  // Populate services
  serviceSelect.innerHTML = Object.keys(CALCULATOR_DATA.services).map(key => {
    const s = CALCULATOR_DATA.services[key];
    return `<option value="${key}">${s.name}</option>`;
  }).join('');

  // Populate deadlines
  if (deadlineSelect) {
    deadlineSelect.innerHTML = CALCULATOR_DATA.deadlines.map(d => {
      return `<option value="${d.id}">${d.name} (${d.badge})</option>`;
    }).join('');
  }

  // Handle service change
  serviceSelect.addEventListener('change', (e) => {
    TitikCeritaApp.calculatorState.service = e.target.value;
    updateCalculatorSubtypes();
    calculatePriceEstimate();
  });

  subtypeSelect.addEventListener('change', (e) => {
    TitikCeritaApp.calculatorState.subtype = e.target.value;
    calculatePriceEstimate();
  });

  if (deadlineSelect) {
    deadlineSelect.addEventListener('change', (e) => {
      TitikCeritaApp.calculatorState.deadline = e.target.value;
      calculatePriceEstimate();
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener('input', (e) => {
      TitikCeritaApp.calculatorState.quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
      calculatePriceEstimate();
    });
  }

  // Addon checkboxes
  const addonCheckboxes = document.querySelectorAll('.calc-addon-check');
  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      calculatePriceEstimate();
    });
  });

  // Initial populate
  updateCalculatorSubtypes();
  calculatePriceEstimate();
}

function updateCalculatorSubtypes() {
  const subtypeSelect = document.getElementById('calc-subtype');
  if (!subtypeSelect) return;

  const currentServiceKey = TitikCeritaApp.calculatorState.service;
  const currentServiceData = CALCULATOR_DATA.services[currentServiceKey];
  if (!currentServiceData) return;

  subtypeSelect.innerHTML = currentServiceData.subtypes.map(sub => {
    return `<option value="${sub.id}">${sub.name}</option>`;
  }).join('');

  TitikCeritaApp.calculatorState.subtype = currentServiceData.subtypes[0]?.id || '';
}

function calculatePriceEstimate() {
  const serviceKey = TitikCeritaApp.calculatorState.service;
  const serviceData = CALCULATOR_DATA.services[serviceKey];
  if (!serviceData) return;

  const subtypeKey = TitikCeritaApp.calculatorState.subtype;
  const subtype = serviceData.subtypes.find(st => st.id === subtypeKey) || serviceData.subtypes[0];
  const qty = Math.max(1, parseInt(document.getElementById('calc-qty')?.value, 10) || 1);
  
  const deadlineKey = document.getElementById('calc-deadline')?.value || 'reguler';
  const deadline = CALCULATOR_DATA.deadlines.find(d => d.id === deadlineKey) || CALCULATOR_DATA.deadlines[0];

  // Base calculation
  let base = serviceData.basePrice * (subtype ? subtype.multiplier : 1) * qty;
  let withDeadline = base * (deadline ? deadline.multiplier : 1);

  // Addons calculation
  let addonCost = 0;
  const checkedAddons = document.querySelectorAll('.calc-addon-check:checked');
  checkedAddons.forEach(chk => {
    addonCost += parseInt(chk.dataset.cost, 10) || 0;
  });

  const totalEstimate = Math.round(withDeadline + addonCost);

  // Display elements
  const displayTotal = document.getElementById('calc-result-total');
  const displayService = document.getElementById('calc-result-service');
  const displayDeadline = document.getElementById('calc-result-deadline');

  if (displayTotal) displayTotal.textContent = formatRupiah(totalEstimate);
  if (displayService) displayService.textContent = `${serviceData.name} - ${subtype?.name} (${qty}x)`;
  if (displayDeadline) displayDeadline.textContent = `${deadline?.name}`;

  return {
    serviceName: serviceData.name,
    subtypeName: subtype?.name,
    quantity: qty,
    deadlineName: deadline?.name,
    totalEstimate
  };
}

function sendCalculatedWhatsApp() {
  const calc = calculatePriceEstimate();
  if (!calc) return;

  const msg = `Halo Admin TitikCerita! 🌟\nSaya ingin memesan layanan dengan rincian estimasi kalkulator sebagai berikut:\n\n` +
    `📌 *Layanan:* ${calc.serviceName}\n` +
    `📂 *Jenis/Paket:* ${calc.subtypeName}\n` +
    `🔢 *Jumlah:* ${calc.quantity}\n` +
    `⏰ *Target Deadline:* ${calc.deadlineName}\n` +
    `💰 *Estimasi Biaya:* ${formatRupiah(calc.totalEstimate)}\n\n` +
    `Mohon info ketersediaan slot pengerjaan dan langkah selanjutnya kak. Terima kasih!`;

  window.open(getWhatsAppUrl(msg), '_blank');
}

// --- Portfolio Filter & Lightbox ---
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  let items = PORTFOLIO_DATA;
  if (TitikCeritaApp.activePortfolioFilter !== 'all') {
    items = items.filter(item => item.category === TitikCeritaApp.activePortfolioFilter);
  }

  grid.innerHTML = items.map(item => `
    <div 
      onclick="openPortfolioModal(${item.id})"
      class="portfolio-card glass-panel rounded-3xl overflow-hidden cursor-pointer border border-white/5 group relative"
    >
      <div class="relative h-60 w-full overflow-hidden bg-slate-900">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500" 
        />
        
        <div class="portfolio-overlay absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 flex flex-col justify-end p-5">
          <span class="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            ${item.categoryLabel}
          </span>
          <h4 class="text-white font-bold text-base leading-snug mb-1">
            ${item.title}
          </h4>
          <span class="text-xs text-slate-300 flex items-center gap-1">
            <i class="fa-solid fa-user-check text-emerald-400 text-[11px]"></i> ${item.client}
          </span>
        </div>
      </div>

      <div class="p-4 bg-slate-900/40 flex items-center justify-between">
        <span class="text-xs font-semibold text-slate-300 truncate max-w-[200px]">${item.title}</span>
        <span class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </span>
      </div>
    </div>
  `).join('');
}

function filterPortfolio(category) {
  TitikCeritaApp.activePortfolioFilter = category;

  const buttons = document.querySelectorAll('.portfolio-filter-btn');
  buttons.forEach(btn => {
    const isTarget = btn.dataset.filter === category;
    if (isTarget) {
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-600/30');
      btn.classList.remove('bg-white/5', 'text-slate-400');
    } else {
      btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-600/30');
      btn.classList.add('bg-white/5', 'text-slate-400');
    }
  });

  renderPortfolio();
}

function openPortfolioModal(id) {
  const item = PORTFOLIO_DATA.find(p => p.id === id);
  if (!item) return;

  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  document.getElementById('modal-port-img').src = item.image;
  document.getElementById('modal-port-title').textContent = item.title;
  document.getElementById('modal-port-client').textContent = item.client;
  document.getElementById('modal-port-category').textContent = item.categoryLabel;
  document.getElementById('modal-port-desc').textContent = item.desc;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closePortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// --- Render Testimonials ---
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = TESTIMONIALS_DATA.map(testi => `
    <div class="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all">
      <div>
        <!-- Rating Stars -->
        <div class="flex items-center gap-1 text-amber-400 text-xs mb-3">
          ${Array(testi.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
        </div>

        <p class="text-xs md:text-sm text-slate-300 italic mb-5 leading-relaxed">
          "${testi.text}"
        </p>
      </div>

      <div class="flex items-center gap-3 pt-3 border-t border-white/5">
        <img 
          src="${testi.avatar}" 
          alt="${testi.name}" 
          class="w-10 h-10 rounded-full object-cover border border-indigo-500/40" 
        />
        <div class="overflow-hidden">
          <h5 class="font-bold text-white text-sm truncate">${testi.name}</h5>
          <p class="text-[11px] text-indigo-400 truncate">${testi.campus}</p>
          <span class="text-[10px] text-slate-400 block">${testi.service}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Render FAQs with Accordion Logic ---
function renderFAQs() {
  const container = document.getElementById('faqs-container');
  if (!container) return;

  container.innerHTML = FAQS_DATA.map((faq, idx) => `
    <div class="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-colors">
      <button 
        type="button" 
        onclick="toggleFAQ(${idx})" 
        class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-white hover:text-indigo-400 transition-colors"
      >
        <span>${faq.q}</span>
        <i id="faq-icon-${idx}" class="fa-solid fa-chevron-down text-xs text-indigo-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-body-${idx}" class="faq-content max-h-0 overflow-hidden px-5 text-xs md:text-sm text-slate-400 leading-relaxed">
        <div class="pb-5 pt-1 border-t border-white/5">
          ${faq.a}
        </div>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(idx) {
  const body = document.getElementById(`faq-body-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);
  if (!body) return;

  const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';
  if (isOpen) {
    body.style.maxHeight = '0px';
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    body.style.maxHeight = body.scrollHeight + 'px';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

// --- Order Form Submission & WhatsApp Sync ---
function handleOrderFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('form-name')?.value.trim();
  const phone = document.getElementById('form-phone')?.value.trim();
  const campus = document.getElementById('form-campus')?.value.trim() || '-';
  const service = document.getElementById('form-service')?.value;
  const deadline = document.getElementById('form-deadline')?.value;
  const notes = document.getElementById('form-notes')?.value.trim();
  const driveLink = document.getElementById('form-link')?.value.trim() || '-';

  if (!name || !phone || !notes) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Belum Lengkap',
      text: 'Mohon isi nama, nomor WhatsApp, dan deskripsi kebutuhan Anda.',
      confirmButtonColor: '#6366f1'
    });
    return;
  }

  // Create order record for local dashboard
  const orderRecord = {
    id: 'TC-' + Date.now().toString(36).toUpperCase(),
    date: new Date().toISOString(),
    name,
    phone,
    campus,
    service,
    deadline,
    notes,
    driveLink,
    status: 'Menunggu Konfirmasi'
  };

  saveOrderLocally(orderRecord);

  // Trigger celebration
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Generate WhatsApp message
  const waMessage = `Halo Admin TitikCerita! 🚀\nSaya baru saja mengisi form order di website:\n\n` +
    `👤 *Nama:* ${name}\n` +
    `📱 *WhatsApp:* ${phone}\n` +
    `🏛️ *Universitas/Instansi:* ${campus}\n` +
    `📂 *Layanan:* ${service}\n` +
    `⏰ *Target Deadline:* ${deadline}\n` +
    `📝 *Detail Kebutuhan:* ${notes}\n` +
    `🔗 *Link Berkas/Materi:* ${driveLink}\n\n` +
    `Mohon konfirmasi dan info tagihan serta langkah pembayarannya ya kak. Terima kasih!`;

  Swal.fire({
    icon: 'success',
    title: 'Pesanan Diteruskan!',
    html: `
      <p class="text-sm text-slate-300">Formulir Anda berhasil dicatat dengan ID <b>${orderRecord.id}</b>.</p>
      <p class="text-xs text-slate-400 mt-2">Anda akan dialihkan langsung ke WhatsApp Admin TitikCerita untuk memulai pengerjaan.</p>
    `,
    showCancelButton: true,
    confirmButtonText: '<i class="fa-brands fa-whatsapp mr-1"></i> Buka WhatsApp Sekarang',
    cancelButtonText: 'Tutup',
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#334155'
  }).then((res) => {
    if (res.isConfirmed) {
      window.open(getWhatsAppUrl(waMessage), '_blank');
    }
  });

  // Reset form
  document.getElementById('order-form')?.reset();
}

function saveOrderLocally(order) {
  try {
    const list = JSON.parse(localStorage.getItem('titikcerita_orders') || '[]');
    list.unshift(order);
    localStorage.setItem('titikcerita_orders', JSON.stringify(list));
    TitikCeritaApp.storedOrders = list;
  } catch (err) {
    console.error('Storage error:', err);
  }
}

function loadStoredOrders() {
  try {
    const list = JSON.parse(localStorage.getItem('titikcerita_orders') || '[]');
    TitikCeritaApp.storedOrders = list;

    const savedWa = localStorage.getItem('titikcerita_wa');
    if (savedWa && savedWa !== '6281234567890') {
      TitikCeritaApp.customWhatsApp = savedWa;
    } else {
      TitikCeritaApp.customWhatsApp = TITIKCERITA_CONFIG.whatsappNumber;
    }
  } catch (e) {
    TitikCeritaApp.storedOrders = [];
  }
}

// --- Admin Order Tracker Modal ---
function openAdminOrdersModal() {
  const modal = document.getElementById('admin-orders-modal');
  if (!modal) return;

  renderAdminOrdersTable();

  // Show current WA
  const waInput = document.getElementById('admin-wa-input');
  if (waInput) {
    waInput.value = TitikCeritaApp.customWhatsApp || TITIKCERITA_CONFIG.whatsappNumber;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAdminOrdersModal() {
  const modal = document.getElementById('admin-orders-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderAdminOrdersTable() {
  const tbody = document.getElementById('admin-orders-table-body');
  if (!tbody) return;

  const orders = TitikCeritaApp.storedOrders;
  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-10 text-slate-500">
          Belum ada riwayat pesanan form yang tersimpan.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders.map((ord, idx) => `
    <tr class="border-b border-white/5 text-xs hover:bg-white/5">
      <td class="py-3 px-3 font-mono text-indigo-400 font-bold">${ord.id}</td>
      <td class="py-3 px-3">
        <span class="font-bold text-white block">${ord.name}</span>
        <span class="text-slate-400">${ord.phone}</span>
      </td>
      <td class="py-3 px-3 text-slate-300">${ord.service}</td>
      <td class="py-3 px-3 text-amber-400">${ord.deadline}</td>
      <td class="py-3 px-3 text-slate-400 truncate max-w-xs" title="${ord.notes}">${ord.notes}</td>
      <td class="py-3 px-3 text-center">
        <a 
          href="https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}" 
          target="_blank" 
          class="px-2.5 py-1 bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
        >
          <i class="fa-brands fa-whatsapp"></i> Chat
        </a>
      </td>
    </tr>
  `).join('');
}

function saveAdminWhatsApp() {
  const input = document.getElementById('admin-wa-input');
  if (!input) return;

  const cleanNum = input.value.replace(/[^0-9]/g, '');
  if (!cleanNum || cleanNum.length < 10) {
    Swal.fire({
      icon: 'error',
      title: 'Nomor Tidak Valid',
      text: 'Format nomor WhatsApp harus berupa angka (contoh: 6281234567890).'
    });
    return;
  }

  TitikCeritaApp.customWhatsApp = cleanNum;
  localStorage.setItem('titikcerita_wa', cleanNum);

  Swal.fire({
    icon: 'success',
    title: 'Nomor WhatsApp Diperbarui',
    text: `Nomor tujuan pemesanan berhasil diubah menjadi +${cleanNum}.`,
    timer: 1500,
    showConfirmButton: false
  });
}

function clearAllOrders() {
  Swal.fire({
    title: 'Hapus Semua Data Pesanan?',
    text: 'Data order lokal akan dibersihkan.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Ya, Bersihkan'
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.removeItem('titikcerita_orders');
      TitikCeritaApp.storedOrders = [];
      renderAdminOrdersTable();
    }
  });
}

// --- Mobile Navigation Menu Toggle ---
function toggleMobileMenu() {
  const nav = document.getElementById('mobile-nav-menu');
  if (nav) {
    nav.classList.toggle('hidden');
  }
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
  loadStoredOrders();
  renderGuarantees();
  renderServicesTabs();
  initPriceCalculator();
  renderPortfolio();
  renderTestimonials();
  renderFAQs();

  // Attach order form listener
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', handleOrderFormSubmit);
  }
});
