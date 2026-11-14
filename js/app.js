/**
 * KasirPintar - Logic & State Management
 */

// --- App State ---
const AppState = {
  products: [],
  categories: DEFAULT_CATEGORIES,
  cart: [],
  selectedCategory: 'semua',
  searchQuery: '',
  taxEnabled: true,
  taxRate: 11, // 11% PPN
  discount: { type: 'none', value: 0, code: '' },
  transactions: [],
  storeSettings: {
    name: 'Toko Berkah Sejahtera',
    address: 'Jl. Merdeka Raya No. 45, Jakarta',
    phone: '0812-3456-7890',
    footerNote: 'Terima kasih atas kunjungan Anda! Semoga harimu menyenangkan.'
  },
  currentPayment: {
    method: 'tunai',
    cashReceived: 0,
    change: 0
  },
  lastTransaction: null
};

// --- Sound Effects using Web Audio API (No external assets required) ---
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playBeep() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {
      console.warn('Audio not allowed yet:', e);
    }
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.07, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch (e) {
      console.warn('Audio not allowed yet:', e);
    }
  }
}

const soundManager = new SoundManager();

// --- Storage Utilities ---
function loadData() {
  try {
    const savedProducts = localStorage.getItem('kasirpintar_products');
    AppState.products = savedProducts ? JSON.parse(savedProducts) : [...DEFAULT_PRODUCTS];

    const savedTransactions = localStorage.getItem('kasirpintar_transactions');
    AppState.transactions = savedTransactions ? JSON.parse(savedTransactions) : [];

    const savedSettings = localStorage.getItem('kasirpintar_settings');
    if (savedSettings) {
      AppState.storeSettings = { ...AppState.storeSettings, ...JSON.parse(savedSettings) };
    }

    const savedTaxSetting = localStorage.getItem('kasirpintar_tax');
    if (savedTaxSetting !== null) {
      AppState.taxEnabled = savedTaxSetting === 'true';
    }
  } catch (err) {
    console.error('Failed to load storage:', err);
    AppState.products = [...DEFAULT_PRODUCTS];
  }
}

function saveProducts() {
  localStorage.setItem('kasirpintar_products', JSON.stringify(AppState.products));
}

function saveTransactions() {
  localStorage.setItem('kasirpintar_transactions', JSON.stringify(AppState.transactions));
}

function saveSettings() {
  localStorage.setItem('kasirpintar_settings', JSON.stringify(AppState.storeSettings));
  localStorage.setItem('kasirpintar_tax', AppState.taxEnabled.toString());
}

// --- Number & Date Formatters ---
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number || 0);
}

function formatNumber(number) {
  return new Intl.NumberFormat('id-ID').format(number || 0);
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// --- Cart Calculations ---
function getCartTotals() {
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  let discountAmount = 0;
  if (AppState.discount.type === 'percent') {
    discountAmount = Math.round((subtotal * AppState.discount.value) / 100);
  } else if (AppState.discount.type === 'fixed') {
    discountAmount = Math.min(AppState.discount.value, subtotal);
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = AppState.taxEnabled ? Math.round((taxableAmount * AppState.taxRate) / 100) : 0;
  const grandTotal = taxableAmount + taxAmount;
  const totalItemCount = AppState.cart.reduce((sum, item) => sum + item.qty, 0);

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    grandTotal,
    totalItemCount
  };
}

// --- Product Actions ---
function addToCart(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Stok Habis',
      text: `Produk ${product.name} sedang tidak tersedia!`,
      timer: 1500,
      showConfirmButton: false
    });
    return;
  }

  const existing = AppState.cart.find(item => item.id === productId);
  if (existing) {
    if (existing.qty >= product.stock) {
      Swal.fire({
        icon: 'warning',
        title: 'Batas Stok Tercapai',
        text: `Hanya tersedia ${product.stock} item untuk ${product.name}`,
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }
    existing.qty += 1;
  } else {
    AppState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
      category: product.category,
      qty: 1,
      notes: ''
    });
  }

  soundManager.playBeep();
  renderCart();
  renderProducts(); // to update badge counter on card
}

function updateCartQty(productId, delta) {
  const itemIndex = AppState.cart.findIndex(i => i.id === productId);
  if (itemIndex === -1) return;

  const item = AppState.cart[itemIndex];
  const product = AppState.products.find(p => p.id === productId);
  const newQty = item.qty + delta;

  if (newQty <= 0) {
    removeCartItem(productId);
    return;
  }

  if (product && newQty > product.stock) {
    Swal.fire({
      icon: 'warning',
      title: 'Stok Terbatas',
      text: `Maksimal pembelian untuk ${item.name} adalah ${product.stock} pcs`,
      timer: 1500,
      showConfirmButton: false
    });
    return;
  }

  item.qty = newQty;
  soundManager.playBeep();
  renderCart();
  renderProducts();
}

function removeCartItem(productId) {
  AppState.cart = AppState.cart.filter(i => i.id !== productId);
  renderCart();
  renderProducts();
}

function clearCart() {
  if (AppState.cart.length === 0) return;
  Swal.fire({
    title: 'Kosongkan Keranjang?',
    text: 'Semua item yang telah dipilih akan dihapus.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, Kosongkan',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      AppState.cart = [];
      AppState.discount = { type: 'none', value: 0, code: '' };
      renderCart();
      renderProducts();
    }
  });
}

function setItemNotes(productId) {
  const item = AppState.cart.find(i => i.id === productId);
  if (!item) return;

  Swal.fire({
    title: `Catatan Pesanan: ${item.name}`,
    input: 'text',
    inputPlaceholder: 'Contoh: Pedas sedang, tanpa daun bawang, es terpisah...',
    inputValue: item.notes || '',
    showCancelButton: true,
    confirmButtonText: 'Simpan Catatan',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#4f46e5'
  }).then((result) => {
    if (result.isConfirmed) {
      item.notes = result.value.trim();
      renderCart();
    }
  });
}

// --- Render UI Functions ---

function renderCategories() {
  const categoryContainer = document.getElementById('category-filter-list');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = AppState.categories.map(cat => {
    const isActive = AppState.selectedCategory === cat.id;
    return `
      <button 
        onclick="selectCategory('${cat.id}')"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
        }"
      >
        <i class="fa-solid ${cat.icon} ${isActive ? 'text-white' : 'text-indigo-500'}"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

function selectCategory(catId) {
  AppState.selectedCategory = catId;
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const countBadge = document.getElementById('product-count-badge');
  if (!grid) return;

  let filtered = AppState.products;

  // Filter by category
  if (AppState.selectedCategory !== 'semua') {
    filtered = filtered.filter(p => p.category === AppState.selectedCategory);
  }

  // Filter by search query
  if (AppState.searchQuery.trim()) {
    const q = AppState.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.desc && p.desc.toLowerCase().includes(q))
    );
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Produk`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 flex flex-col items-center justify-center text-center text-slate-400">
        <div class="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-4 text-slate-400">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h4 class="text-lg font-semibold text-slate-700">Tidak ada produk ditemukan</h4>
        <p class="text-sm max-w-sm text-slate-500 mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const cartItem = AppState.cart.find(i => i.id === product.id);
    const inCartQty = cartItem ? cartItem.qty : 0;
    const isOutOfStock = product.stock <= 0;

    return `
      <div class="product-card bg-white rounded-2xl p-3 border border-slate-200/80 flex flex-col justify-between relative group overflow-hidden ${
        isOutOfStock ? 'opacity-60 grayscale-[40%]' : ''
      }">
        ${inCartQty > 0 ? `
          <div class="absolute top-3 right-3 bg-indigo-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md z-10 flex items-center gap-1 pulse-badge">
            <i class="fa-solid fa-check"></i> ${inCartQty} di Keranjang
          </div>
        ` : ''}

        <div>
          <!-- Image Container with fallback -->
          <div class="w-full h-36 rounded-xl overflow-hidden bg-slate-100 relative mb-3">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center text-5xl bg-indigo-50\\'>${product.emoji || '🛍️'}</div>';"
            />
            <span class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-md capitalize">
              ${product.category}
            </span>
          </div>

          <!-- Product Details -->
          <h3 class="font-bold text-slate-800 text-sm md:text-base leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors" title="${product.name}">
            ${product.name}
          </h3>
          <p class="text-xs text-slate-400 line-clamp-2 mt-1 mb-2">
            ${product.desc || 'Pilihan terbaik untuk melengkapi harimu.'}
          </p>
        </div>

        <div class="pt-2 border-t border-slate-100">
          <div class="flex items-center justify-between mb-2.5">
            <div>
              <span class="text-xs text-slate-400 block font-normal">Harga</span>
              <span class="font-extrabold text-indigo-700 text-sm md:text-base">
                ${formatRupiah(product.price)}
              </span>
            </div>
            <div class="text-right">
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-full ${
                product.stock > 10 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                  : product.stock > 0 
                  ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                  : 'bg-rose-50 text-rose-600 border border-rose-200'
              }">
                ${product.stock > 0 ? `Sisa: ${product.stock}` : 'Habis'}
              </span>
            </div>
          </div>

          <!-- Add Button -->
          <button 
            onclick="addToCart(${product.id})"
            ${isOutOfStock ? 'disabled' : ''}
            class="w-full py-2.5 px-3 rounded-xl font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              isOutOfStock 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white active:scale-95'
            }"
          >
            <i class="fa-solid fa-cart-plus"></i>
            <span>${isOutOfStock ? 'Habis' : 'Pilih / Tambah'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const footerSection = document.getElementById('cart-footer-section');
  const cartBadge = document.getElementById('cart-header-count');
  const mobileCartBadge = document.getElementById('mobile-cart-badge');
  const mobileCartTotal = document.getElementById('mobile-cart-total');

  const { subtotal, discountAmount, taxAmount, grandTotal, totalItemCount } = getCartTotals();

  // Update header badges
  if (cartBadge) cartBadge.textContent = `${totalItemCount} Item`;
  if (mobileCartBadge) mobileCartBadge.textContent = totalItemCount;
  if (mobileCartTotal) mobileCartTotal.textContent = formatRupiah(grandTotal);

  if (AppState.cart.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (container) container.innerHTML = '';
    if (footerSection) footerSection.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (footerSection) footerSection.classList.remove('hidden');

  if (container) {
    container.innerHTML = AppState.cart.map(item => {
      const itemSubtotal = item.price * item.qty;
      return `
        <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-sm flex flex-col gap-2 transition-all hover:border-slate-300">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5 overflow-hidden">
              <div class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center text-lg">
                ${item.emoji || '🍽️'}
              </div>
              <div class="overflow-hidden">
                <h4 class="font-bold text-slate-800 text-sm truncate" title="${item.name}">
                  ${item.name}
                </h4>
                <p class="text-xs text-indigo-600 font-semibold">
                  ${formatRupiah(item.price)}
                </p>
              </div>
            </div>

            <!-- Remove Button -->
            <button 
              onclick="removeCartItem(${item.id})"
              class="text-slate-300 hover:text-rose-500 p-1 transition-colors"
              title="Hapus dari keranjang"
            >
              <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
          </div>

          <!-- Note indicator if exists -->
          ${item.notes ? `
            <div class="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-lg flex items-center justify-between border border-amber-200/60">
              <span class="truncate"><i class="fa-regular fa-comment-dots mr-1"></i> "${item.notes}"</span>
              <button onclick="setItemNotes(${item.id})" class="text-amber-600 hover:underline text-[11px] font-medium ml-2">Ubah</button>
            </div>
          ` : ''}

          <!-- Controls & Row Total -->
          <div class="flex items-center justify-between pt-1">
            <button 
              onclick="setItemNotes(${item.id})"
              class="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
            >
              <i class="fa-solid fa-pen text-[10px]"></i>
              <span>${item.notes ? 'Edit Catatan' : '+ Catatan'}</span>
            </button>

            <div class="flex items-center gap-3">
              <!-- Quantity Selector -->
              <div class="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button 
                  onclick="updateCartQty(${item.id}, -1)"
                  class="w-6 h-6 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-colors shadow-sm"
                >
                  <i class="fa-solid fa-minus text-[10px]"></i>
                </button>
                <span class="w-8 text-center font-bold text-xs text-slate-800">
                  ${item.qty}
                </span>
                <button 
                  onclick="updateCartQty(${item.id}, 1)"
                  class="w-6 h-6 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-colors shadow-sm"
                >
                  <i class="fa-solid fa-plus text-[10px]"></i>
                </button>
              </div>

              <span class="font-extrabold text-slate-800 text-sm w-20 text-right">
                ${formatRupiah(itemSubtotal)}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update summary fields
  const subtotalEl = document.getElementById('summary-subtotal');
  const discountRow = document.getElementById('summary-discount-row');
  const discountEl = document.getElementById('summary-discount');
  const taxRow = document.getElementById('summary-tax-row');
  const taxEl = document.getElementById('summary-tax');
  const grandTotalEl = document.getElementById('summary-grand-total');

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  
  if (discountRow && discountEl) {
    if (discountAmount > 0) {
      discountRow.classList.remove('hidden');
      discountEl.textContent = `-${formatRupiah(discountAmount)}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  if (taxRow && taxEl) {
    if (AppState.taxEnabled && taxAmount > 0) {
      taxRow.classList.remove('hidden');
      taxEl.textContent = formatRupiah(taxAmount);
    } else {
      taxRow.classList.add('hidden');
    }
  }

  if (grandTotalEl) grandTotalEl.textContent = formatRupiah(grandTotal);
}

// --- Discount Modal / Voucher ---
function applyDiscountModal() {
  const { subtotal } = getCartTotals();
  if (subtotal <= 0) return;

  Swal.fire({
    title: 'Pemberian Diskon / Promo',
    html: `
      <div class="text-left space-y-3 pt-2 text-sm">
        <label class="block font-semibold text-slate-700">Pilih Jenis Potongan:</label>
        <div class="grid grid-cols-2 gap-2">
          <label class="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
            <input type="radio" name="discount_type" value="percent" id="disc_pct" checked>
            <span>Persentase (%)</span>
          </label>
          <label class="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
            <input type="radio" name="discount_type" value="fixed" id="disc_fix">
            <span>Nominal (Rp)</span>
          </label>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mt-2 mb-1">Nilai Diskon:</label>
          <input 
            type="number" 
            id="discount_val" 
            placeholder="Contoh: 10 untuk 10%, atau 10000 untuk Rp 10.000" 
            class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value="${AppState.discount.value || ''}"
          />
        </div>

        <div class="pt-2">
          <p class="text-xs text-slate-400 mb-1">Kode Voucher Cepat:</p>
          <div class="flex gap-2">
            <button type="button" onclick="document.getElementById('discount_val').value=10; document.getElementById('disc_pct').checked=true;" class="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-200">Diskon 10%</button>
            <button type="button" onclick="document.getElementById('discount_val').value=20; document.getElementById('disc_pct').checked=true;" class="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-200">Diskon 20%</button>
            <button type="button" onclick="document.getElementById('discount_val').value=5000; document.getElementById('disc_fix').checked=true;" class="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-200">Potongan Rp 5.000</button>
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Terapkan Diskon',
    cancelButtonText: 'Hapus Diskon',
    cancelButtonColor: '#ef4444',
    confirmButtonColor: '#4f46e5',
    preConfirm: () => {
      const type = document.getElementById('disc_pct').checked ? 'percent' : 'fixed';
      const val = parseFloat(document.getElementById('discount_val').value) || 0;
      return { type, val };
    }
  }).then((res) => {
    if (res.isConfirmed) {
      if (res.value.val <= 0) {
        AppState.discount = { type: 'none', value: 0, code: '' };
      } else {
        AppState.discount = { type: res.value.type, value: res.value.val, code: 'MANUAL' };
      }
      renderCart();
    } else if (res.dismiss === Swal.DismissReason.cancel) {
      AppState.discount = { type: 'none', value: 0, code: '' };
      renderCart();
    }
  });
}

// --- Checkout & Payment Flow ---
function openCheckoutModal() {
  const { grandTotal, totalItemCount } = getCartTotals();
  if (totalItemCount === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Keranjang Kosong',
      text: 'Silakan pilih produk yang ingin dibeli terlebih dahulu!',
      confirmButtonColor: '#4f46e5'
    });
    return;
  }

  AppState.currentPayment = {
    method: 'tunai',
    cashReceived: grandTotal, // default to exact amount
    change: 0
  };

  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  // Set amounts in modal
  document.getElementById('modal-checkout-total').textContent = formatRupiah(grandTotal);
  document.getElementById('input-cash-amount').value = grandTotal;
  
  selectPaymentMethod('tunai');
  recalculateCashChange();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function selectPaymentMethod(method) {
  AppState.currentPayment.method = method;

  const buttons = document.querySelectorAll('.payment-method-btn');
  buttons.forEach(btn => {
    const isSelected = btn.dataset.method === method;
    if (isSelected) {
      btn.classList.add('border-indigo-600', 'bg-indigo-50/60', 'text-indigo-700', 'shadow-sm');
      btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-600');
    } else {
      btn.classList.remove('border-indigo-600', 'bg-indigo-50/60', 'text-indigo-700', 'shadow-sm');
      btn.classList.add('border-slate-200', 'bg-white', 'text-slate-600');
    }
  });

  const cashSection = document.getElementById('cash-calculator-section');
  const qrisSection = document.getElementById('qris-display-section');
  const transferSection = document.getElementById('transfer-display-section');

  if (cashSection) cashSection.classList.add('hidden');
  if (qrisSection) qrisSection.classList.add('hidden');
  if (transferSection) transferSection.classList.add('hidden');

  if (method === 'tunai' && cashSection) {
    cashSection.classList.remove('hidden');
    recalculateCashChange();
  } else if (method === 'qris' && qrisSection) {
    qrisSection.classList.remove('hidden');
  } else if ((method === 'transfer' || method === 'ewallet') && transferSection) {
    transferSection.classList.remove('hidden');
  }
}

function setQuickCash(amount) {
  const { grandTotal } = getCartTotals();
  let finalAmount = amount;
  if (amount === 'pas') {
    finalAmount = grandTotal;
  }
  document.getElementById('input-cash-amount').value = finalAmount;
  recalculateCashChange();
}

function recalculateCashChange() {
  const { grandTotal } = getCartTotals();
  const inputEl = document.getElementById('input-cash-amount');
  const cashVal = parseFloat(inputEl.value) || 0;
  AppState.currentPayment.cashReceived = cashVal;

  const change = cashVal - grandTotal;
  AppState.currentPayment.change = change;

  const changeEl = document.getElementById('display-cash-change');
  const changeLabel = document.getElementById('display-change-label');
  const submitBtn = document.getElementById('btn-confirm-payment');

  if (change < 0) {
    changeLabel.textContent = 'Uang Kurang';
    changeLabel.classList.add('text-rose-500');
    changeLabel.classList.remove('text-slate-500', 'text-emerald-600');

    changeEl.textContent = formatRupiah(Math.abs(change));
    changeEl.classList.add('text-rose-600');
    changeEl.classList.remove('text-emerald-600', 'text-slate-800');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  } else {
    changeLabel.textContent = change === 0 ? 'Uang Pas' : 'Kembalian';
    changeLabel.classList.remove('text-rose-500');
    changeLabel.classList.add(change === 0 ? 'text-slate-500' : 'text-emerald-600');

    changeEl.textContent = formatRupiah(change);
    changeEl.classList.remove('text-rose-600');
    changeEl.classList.add('text-emerald-600');

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}

// --- Process Payment Completion ---
function completeTransaction() {
  const { subtotal, discountAmount, taxAmount, grandTotal, totalItemCount } = getCartTotals();
  const payment = AppState.currentPayment;

  if (payment.method === 'tunai' && payment.cashReceived < grandTotal) {
    Swal.fire({
      icon: 'error',
      title: 'Uang Kurang',
      text: 'Jumlah uang tunai yang diterima kurang dari total belanja.',
      confirmButtonColor: '#4f46e5'
    });
    return;
  }

  // Create transaction object
  const transaction = {
    id: 'TRX-' + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 100).toString().padStart(2, '0'),
    date: new Date().toISOString(),
    items: JSON.parse(JSON.stringify(AppState.cart)),
    subtotal,
    discountAmount,
    taxAmount,
    grandTotal,
    totalItemCount,
    paymentMethod: payment.method,
    cashReceived: payment.method === 'tunai' ? payment.cashReceived : grandTotal,
    change: payment.method === 'tunai' ? payment.change : 0,
    storeInfo: { ...AppState.storeSettings }
  };

  // Reduce product stocks
  transaction.items.forEach(cartItem => {
    const prod = AppState.products.find(p => p.id === cartItem.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - cartItem.qty);
    }
  });

  // Save transaction
  AppState.transactions.unshift(transaction);
  AppState.lastTransaction = transaction;

  saveProducts();
  saveTransactions();

  // Play audio & Confetti celebration
  soundManager.playSuccess();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Close checkout modal
  closeCheckoutModal();

  // Clear cart
  AppState.cart = [];
  AppState.discount = { type: 'none', value: 0, code: '' };
  renderCart();
  renderProducts();

  // Show receipt modal
  showReceiptModal(transaction);
}

// --- Receipt Modal & Thermal Printing ---
function showReceiptModal(transaction) {
  const modal = document.getElementById('receipt-modal');
  if (!modal) return;

  const trx = transaction || AppState.lastTransaction;
  if (!trx) return;

  // Fill receipt fields
  document.getElementById('receipt-store-name').textContent = trx.storeInfo?.name || AppState.storeSettings.name;
  document.getElementById('receipt-store-address').textContent = trx.storeInfo?.address || AppState.storeSettings.address;
  document.getElementById('receipt-store-phone').textContent = 'Telp: ' + (trx.storeInfo?.phone || AppState.storeSettings.phone);
  
  document.getElementById('receipt-id').textContent = trx.id;
  document.getElementById('receipt-date').textContent = formatDate(trx.date);
  document.getElementById('receipt-cashier').textContent = 'Kasir 01';

  // Receipt items list
  const itemsContainer = document.getElementById('receipt-items-list');
  itemsContainer.innerHTML = trx.items.map(item => `
    <div class="py-1 border-b border-dashed border-slate-200">
      <div class="flex justify-between font-semibold">
        <span class="truncate pr-2">${item.name}</span>
        <span>${formatRupiah(item.price * item.qty)}</span>
      </div>
      <div class="flex justify-between text-[11px] text-slate-500">
        <span>${item.qty} x ${formatRupiah(item.price)}</span>
        ${item.notes ? `<span class="italic">(${item.notes})</span>` : ''}
      </div>
    </div>
  `).join('');

  // Summary
  document.getElementById('receipt-subtotal').textContent = formatRupiah(trx.subtotal);

  const discRow = document.getElementById('receipt-discount-row');
  if (trx.discountAmount > 0) {
    discRow.classList.remove('hidden');
    document.getElementById('receipt-discount').textContent = `-${formatRupiah(trx.discountAmount)}`;
  } else {
    discRow.classList.add('hidden');
  }

  const taxRow = document.getElementById('receipt-tax-row');
  if (trx.taxAmount > 0) {
    taxRow.classList.remove('hidden');
    document.getElementById('receipt-tax').textContent = formatRupiah(trx.taxAmount);
  } else {
    taxRow.classList.add('hidden');
  }

  document.getElementById('receipt-grand-total').textContent = formatRupiah(trx.grandTotal);
  
  const methodMap = {
    'tunai': 'TUNAI (CASH)',
    'qris': 'QRIS DIGITAL',
    'transfer': 'TRANSFER BANK',
    'ewallet': 'E-WALLET'
  };
  document.getElementById('receipt-payment-method').textContent = methodMap[trx.paymentMethod] || trx.paymentMethod.toUpperCase();
  document.getElementById('receipt-cash-received').textContent = formatRupiah(trx.cashReceived);
  document.getElementById('receipt-change').textContent = formatRupiah(trx.change);
  document.getElementById('receipt-footer-note').textContent = trx.storeInfo?.footerNote || AppState.storeSettings.footerNote;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeReceiptModal() {
  const modal = document.getElementById('receipt-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function printReceipt() {
  window.print();
}

// --- Sales History & Reports ---
function openHistoryModal() {
  const modal = document.getElementById('history-modal');
  if (!modal) return;

  renderHistoryStats();
  renderHistoryTable();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeHistoryModal() {
  const modal = document.getElementById('history-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderHistoryStats() {
  const totalOmzet = AppState.transactions.reduce((sum, t) => sum + t.grandTotal, 0);
  const totalTrx = AppState.transactions.length;
  const totalItemsSold = AppState.transactions.reduce((sum, t) => sum + t.totalItemCount, 0);

  document.getElementById('stat-total-omzet').textContent = formatRupiah(totalOmzet);
  document.getElementById('stat-total-trx').textContent = `${formatNumber(totalTrx)} Transaksi`;
  document.getElementById('stat-total-items').textContent = `${formatNumber(totalItemsSold)} Produk`;
}

function renderHistoryTable() {
  const container = document.getElementById('history-table-body');
  if (!container) return;

  if (AppState.transactions.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-12 text-slate-400">
          <i class="fa-solid fa-receipt text-3xl mb-2 block text-slate-300"></i>
          Belum ada riwayat transaksi penjualan.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = AppState.transactions.map((trx, idx) => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 text-sm">
      <td class="py-3 px-4 font-mono font-bold text-indigo-600">${trx.id}</td>
      <td class="py-3 px-4 text-slate-600">${formatDate(trx.date)}</td>
      <td class="py-3 px-4 text-slate-700">
        <span class="font-semibold">${trx.totalItemCount} item</span>
        <span class="text-xs text-slate-400 block truncate max-w-xs">
          ${trx.items.map(i => `${i.name} (${i.qty})`).join(', ')}
        </span>
      </td>
      <td class="py-3 px-4 uppercase text-xs font-semibold">
        <span class="px-2 py-0.5 rounded-full ${
          trx.paymentMethod === 'tunai' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
        }">
          ${trx.paymentMethod}
        </span>
      </td>
      <td class="py-3 px-4 font-bold text-slate-800 text-right">${formatRupiah(trx.grandTotal)}</td>
      <td class="py-3 px-4 text-center">
        <button 
          onclick="viewOldReceipt('${trx.id}')"
          class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Cetak Ulang Struk"
        >
          <i class="fa-solid fa-print"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function viewOldReceipt(trxId) {
  const trx = AppState.transactions.find(t => t.id === trxId);
  if (trx) {
    showReceiptModal(trx);
  }
}

function clearAllHistory() {
  if (AppState.transactions.length === 0) return;

  Swal.fire({
    title: 'Hapus Semua Riwayat?',
    text: 'Data transaksi penjualan akan dihapus permanen!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, Hapus Semua',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      AppState.transactions = [];
      saveTransactions();
      renderHistoryStats();
      renderHistoryTable();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Dihapus',
        text: 'Semua riwayat penjualan telah dibersihkan.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

// --- Product Management (Add/Edit/Delete/Reset) ---
function openProductManagerModal() {
  const modal = document.getElementById('product-manager-modal');
  if (!modal) return;

  renderProductManagerTable();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductManagerModal() {
  const modal = document.getElementById('product-manager-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderProductManagerTable() {
  const container = document.getElementById('manage-product-table-body');
  if (!container) return;

  container.innerHTML = AppState.products.map(p => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 text-sm">
      <td class="py-3 px-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">${p.emoji || '📦'}</span>
          <div>
            <span class="font-bold text-slate-800 block">${p.name}</span>
            <span class="text-xs text-slate-400 capitalize">${p.category}</span>
          </div>
        </div>
      </td>
      <td class="py-3 px-3 font-semibold text-slate-700">${formatRupiah(p.price)}</td>
      <td class="py-3 px-3">
        <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${
          p.stock > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
        }">${p.stock} pcs</span>
      </td>
      <td class="py-3 px-3 text-right space-x-1">
        <button 
          onclick="promptEditStock(${p.id})"
          class="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          title="Ubah Stok"
        >
          <i class="fa-solid fa-boxes-stacked mr-1"></i> Stok
        </button>
        <button 
          onclick="deleteProduct(${p.id})"
          class="p-1.5 text-xs text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          title="Hapus Produk"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function promptEditStock(productId) {
  const prod = AppState.products.find(p => p.id === productId);
  if (!prod) return;

  Swal.fire({
    title: `Ubah Stok: ${prod.name}`,
    input: 'number',
    inputValue: prod.stock,
    inputLabel: 'Jumlah stok baru:',
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#4f46e5'
  }).then((res) => {
    if (res.isConfirmed && res.value !== '') {
      prod.stock = Math.max(0, parseInt(res.value, 10) || 0);
      saveProducts();
      renderProductManagerTable();
      renderProducts();
    }
  });
}

function promptAddNewProduct() {
  Swal.fire({
    title: 'Tambah Produk Baru',
    html: `
      <div class="text-left space-y-3 pt-2 text-sm">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Nama Produk:</label>
          <input id="swal-prod-name" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Contoh: Es Kopi Pandan" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Kategori:</label>
            <select id="swal-prod-cat" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <option value="makanan">Makanan</option>
              <option value="minuman" selected>Minuman</option>
              <option value="snack">Snack & Camilan</option>
              <option value="paket">Paket Hemat</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Emoji Icon:</label>
            <input id="swal-prod-emoji" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="🍹 atau 🥪" value="✨" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Harga (Rp):</label>
            <input type="number" id="swal-prod-price" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="15000" />
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Stok Awal:</label>
            <input type="number" id="swal-prod-stock" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="50" value="50" />
          </div>
        </div>
        <div>
          <label class="block font-semibold text-slate-700 mb-1">URL Foto (Opsional):</label>
          <input id="swal-prod-img" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="https://..." />
        </div>
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Deskripsi Singkat:</label>
          <input id="swal-prod-desc" class="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Deskripsi menu..." />
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Simpan Produk',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#4f46e5',
    preConfirm: () => {
      const name = document.getElementById('swal-prod-name').value.trim();
      const price = parseFloat(document.getElementById('swal-prod-price').value) || 0;
      const stock = parseInt(document.getElementById('swal-prod-stock').value, 10) || 0;
      const category = document.getElementById('swal-prod-cat').value;
      const emoji = document.getElementById('swal-prod-emoji').value.trim() || '🛍️';
      const image = document.getElementById('swal-prod-img').value.trim();
      const desc = document.getElementById('swal-prod-desc').value.trim();

      if (!name || price <= 0) {
        Swal.showValidationMessage('Nama produk dan harga wajib diisi!');
        return false;
      }

      return {
        id: Date.now(),
        name,
        category,
        price,
        stock,
        emoji,
        image: image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80`,
        desc
      };
    }
  }).then((res) => {
    if (res.isConfirmed && res.value) {
      AppState.products.unshift(res.value);
      saveProducts();
      renderProductManagerTable();
      renderProducts();
      Swal.fire({
        icon: 'success',
        title: 'Produk Ditambahkan',
        timer: 1200,
        showConfirmButton: false
      });
    }
  });
}

function deleteProduct(productId) {
  const prod = AppState.products.find(p => p.id === productId);
  if (!prod) return;

  Swal.fire({
    title: `Hapus ${prod.name}?`,
    text: 'Produk ini akan dihapus dari katalog.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal'
  }).then((res) => {
    if (res.isConfirmed) {
      AppState.products = AppState.products.filter(p => p.id !== productId);
      removeCartItem(productId);
      saveProducts();
      renderProductManagerTable();
      renderProducts();
    }
  });
}

function resetDefaultCatalog() {
  Swal.fire({
    title: 'Reset ke Katalog Bawaan?',
    text: 'Semua perubahan produk kustom akan dikembalikan ke data awal demo.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, Reset',
    cancelButtonText: 'Batal'
  }).then((res) => {
    if (res.isConfirmed) {
      AppState.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
      saveProducts();
      renderProductManagerTable();
      renderProducts();
      renderCart();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Reset',
        timer: 1200,
        showConfirmButton: false
      });
    }
  });
}

// --- Store Settings Modal ---
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;

  document.getElementById('setting-store-name').value = AppState.storeSettings.name;
  document.getElementById('setting-store-address').value = AppState.storeSettings.address;
  document.getElementById('setting-store-phone').value = AppState.storeSettings.phone;
  document.getElementById('setting-store-footer').value = AppState.storeSettings.footerNote;
  document.getElementById('setting-tax-toggle').checked = AppState.taxEnabled;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function saveStoreSettings() {
  AppState.storeSettings.name = document.getElementById('setting-store-name').value.trim() || 'Toko Berkah';
  AppState.storeSettings.address = document.getElementById('setting-store-address').value.trim() || 'Indonesia';
  AppState.storeSettings.phone = document.getElementById('setting-store-phone').value.trim() || '-';
  AppState.storeSettings.footerNote = document.getElementById('setting-store-footer').value.trim() || 'Terima kasih!';
  AppState.taxEnabled = document.getElementById('setting-tax-toggle').checked;

  saveSettings();
  updateStoreHeader();
  renderCart();
  closeSettingsModal();

  Swal.fire({
    icon: 'success',
    title: 'Pengaturan Disimpan',
    timer: 1200,
    showConfirmButton: false
  });
}

function updateStoreHeader() {
  const storeNameEl = document.getElementById('header-store-name');
  if (storeNameEl) storeNameEl.textContent = AppState.storeSettings.name;
}

// --- Mobile Bottom Drawer Cart Toggle ---
function toggleMobileCart() {
  const cartDrawer = document.getElementById('cart-sidebar-panel');
  if (!cartDrawer) return;

  cartDrawer.classList.toggle('translate-y-full');
  cartDrawer.classList.toggle('translate-y-0');
}

// --- Search Bar Handler ---
function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderProducts();
    });
  }

  const cashInput = document.getElementById('input-cash-amount');
  if (cashInput) {
    cashInput.addEventListener('input', () => {
      recalculateCashChange();
    });
  }

  // Keyboard shortcuts (e.g. F2 to search, F8 to open checkout)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F2') {
      e.preventDefault();
      document.getElementById('search-input')?.focus();
    } else if (e.key === 'F8') {
      e.preventDefault();
      openCheckoutModal();
    } else if (e.key === 'Escape') {
      closeCheckoutModal();
      closeReceiptModal();
      closeHistoryModal();
      closeProductManagerModal();
      closeSettingsModal();
    }
  });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  updateStoreHeader();
  renderCategories();
  renderProducts();
  renderCart();
  setupEventListeners();
});
