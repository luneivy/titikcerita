/**
 * Default Catalog Data for Toko / Kasir App
 */

const DEFAULT_CATEGORIES = [
  { id: 'semua', name: 'Semua Produk', icon: 'fa-layer-group' },
  { id: 'makanan', name: 'Makanan', icon: 'fa-utensils' },
  { id: 'minuman', name: 'Minuman', icon: 'fa-mug-hot' },
  { id: 'snack', name: 'Snack & Camilan', icon: 'fa-cookie-bite' },
  { id: 'paket', name: 'Paket Hemat', icon: 'fa-box-open' }
];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    category: "makanan",
    price: 25000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=80",
    emoji: "🍳",
    desc: "Nasi goreng lezat dengan telur mata sapi, suwiran ayam & kerupuk"
  },
  {
    id: 2,
    name: "Ayam Bakar Madu + Nasi",
    category: "makanan",
    price: 32000,
    stock: 35,
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&auto=format&fit=crop&q=80",
    emoji: "🍗",
    desc: "Ayam bakar bumbu madu gurih manis disajikan dengan nasi hangat dan sambal terasi"
  },
  {
    id: 3,
    name: "Mie Goreng Jawa",
    category: "makanan",
    price: 22000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=80",
    emoji: "🍜",
    desc: "Mie telur kenyal dimasak rempah khas Jawa dengan sayuran segar dan bakso"
  },
  {
    id: 4,
    name: "Beef Burger Deluxe",
    category: "makanan",
    price: 35000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
    emoji: "🍔",
    desc: "Patty sapi asli 100% dengan keju leleh, selada segar & saus spesial"
  },
  {
    id: 5,
    name: "Kopi Susu Gula Aren",
    category: "minuman",
    price: 18000,
    stock: 60,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&auto=format&fit=crop&q=80",
    emoji: "☕",
    desc: "Espresso arabika blend dipadukan susu creamy dan gula aren murni"
  },
  {
    id: 6,
    name: "Es Teh Manis Segar",
    category: "minuman",
    price: 6000,
    stock: 120,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop&q=80",
    emoji: "🧊",
    desc: "Teh melati seduh segar dengan gula tebu dan es batu melimpah"
  },
  {
    id: 7,
    name: "Matcha Latte Creamy",
    category: "minuman",
    price: 24000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80",
    emoji: "🍵",
    desc: "Bubuk matcha Jepang premium dipadu susu segar gurih creamy"
  },
  {
    id: 8,
    name: "Jus Alpukat Kocok",
    category: "minuman",
    price: 20000,
    stock: 20,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&auto=format&fit=crop&q=80",
    emoji: "🥑",
    desc: "Alpukat mentega asli kental dengan siraman coklat kental manis"
  },
  {
    id: 9,
    name: "French Fries Gurih",
    category: "snack",
    price: 16000,
    stock: 45,
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&auto=format&fit=crop&q=80",
    emoji: "🍟",
    desc: "Kentang goreng renyah bumbu gurih disajikan dengan saus tomat & mayo"
  },
  {
    id: 10,
    name: "Roti Bakar Coklat Keju",
    category: "snack",
    price: 18000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&auto=format&fit=crop&q=80",
    emoji: "🍞",
    desc: "Roti gandum bakar isi meses coklat tebal dan taburan keju cheddar melimpah"
  },
  {
    id: 11,
    name: "Pisang Goreng Crispy",
    category: "snack",
    price: 15000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=400&auto=format&fit=crop&q=80",
    emoji: "🍌",
    desc: "Pisang kepok manis berbalut tepung krispi dengan gula palem & kayu manis"
  },
  {
    id: 12,
    name: "Paket Kenyang Siang",
    category: "paket",
    price: 36000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80",
    emoji: "🍱",
    desc: "Nasi Goreng Spesial + Ayam Krispi + Es Teh Manis Segar (Hemat Rp 7.000)"
  },
  {
    id: 13,
    name: "Paket Nongkrong Asik",
    category: "paket",
    price: 30000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&auto=format&fit=crop&q=80",
    emoji: "✨",
    desc: "Kopi Susu Gula Aren + Roti Bakar Coklat Keju (Hemat Rp 6.000)"
  }
];
