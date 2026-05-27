import { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Pizza,
  MessageCircle,
  Menu as MenuIcon,
  X,
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Loader2
} from 'lucide-react';
import { useStoreStatus } from './hooks/useStoreStatus';

const InstagramIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const fullMenuData = [
  {
    category: "Pizzas Salgadas",
    items: [
      { name: "Mussarela", desc: "Molho de tomate e queijo mussarela.", prices: { broto: "R$ 29,99", grande: "R$ 39,99" } },
      { name: "Marguerita", desc: "Molho de tomate, queijo, tomate e manjericão.", prices: { broto: "R$ 35,99", grande: "R$ 44,99" } },
      { name: "Frango Cremoso", desc: "Molho de tomate, frango desfiado e requeijão cremoso.", prices: { broto: "R$ 39,99", grande: "R$ 49,99" } },
      { name: "Portuguesa", desc: "Molho de tomate, presunto, cebola, mussarela, ovo, milho e ervilha.", prices: { broto: "R$ 39,99", grande: "R$ 49,99" } },
      { name: "Calabresa", desc: "Molho de tomate, calabresa e cebola.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
      { name: "Toscana", desc: "Molho de tomate, calabresa e mussarela.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
      { name: "Palmito", desc: "Molho de tomate, palmito e mussarela.", prices: { broto: "R$ 44,99", grande: "R$ 54,99" } },
      { name: "Escarola", desc: "Molho de tomate, escarola e mussarela.", prices: { broto: "R$ 49,99", grande: "R$ 49,99" } },
      { name: "Bacon", desc: "Molho de tomate, bacon e mussarela.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
      { name: "Pepperoni", desc: "Molho de tomate, pepperoni e mussarela.", prices: { broto: "R$ 39,99", grande: "R$ 49,99" } },
      { name: "Quatro Queijos", desc: "Molho de tomate, mussarela, requeijão cremoso, provolone e parmesão.", prices: { broto: "R$ 44,99", grande: "R$ 54,99" } },
      { name: "Carne Seca Cremosa", desc: "Molho de tomate, mussarela, carne seca e requeijão cremoso.", prices: { broto: "R$ 44,99", grande: "R$ 54,99" } },
      { name: "Carne Seca", desc: "Molho de tomate, mussarela e carne seca.", prices: { broto: "R$ 44,99", grande: "R$ 54,99" } },
      { name: "Frangole", desc: "Molho de tomate, frango desfiado e mussarela.", prices: { broto: "R$ 39,99", grande: "R$ 49,99" } },
      { name: "Caipirinha", desc: "Molho de tomate, frango desfiado, requeijão cremoso e milho.", prices: { broto: "R$ 39,99", grande: "R$ 49,99" } },
      { name: "Brócolis", desc: "Molho de tomate, mussarela e brócolis.", prices: { broto: "R$ 39,99", grande: "R$ 49,99" } },
      { name: "Calabresa Cremosa", desc: "Molho de tomate, calabresa e requeijão cremoso.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
      { name: "Pepperoni Supreme", desc: "Molho de tomate, mussarela, pepperoni e requeijão cremoso.", prices: { broto: "R$ 39,99", grande: "R$ 49,99" } },
      { name: "Bauru", desc: "Molho de tomate, mussarela, presunto e tomate.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
      { name: "Atum", desc: "Molho de tomate, atum e cebola.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
      { name: "Alho", desc: "Molho de tomate, mussarela, alho frito e parmesão.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
    ]
  },
  {
    category: "Pizzas Doces",
    items: [
      { name: "Brigadeiro", desc: "Chocolate ao leite e granulado.", prices: { broto: "R$ 29,99", grande: "R$ 39,99" } },
      { name: "Prestígio", desc: "Chocolate ao leite e coco ralado.", prices: { broto: "R$ 29,99", grande: "R$ 39,99" } },
      { name: "Bananoca", desc: "Chocolate ao leite e banana.", prices: { broto: "R$ 32,99", grande: "R$ 42,99" } },
      { name: "Bananinha", desc: "Banana, doce de leite, açúcar e canela.", prices: { broto: "R$ 34,99", grande: "R$ 44,99" } },
      { name: "Cartola", desc: "Mussarela, banana, doce de leite e canela.", prices: { broto: "R$ 37,99", grande: "R$ 47,99" } },
      { name: "Romeu e Julieta", desc: "Mussarela e goiabada.", prices: { broto: "R$ 37,99", grande: "R$ 47,99" } },
    ]
  },
  {
    category: "Bebidas",
    items: [
      { name: "Refrigerante 600ml", price: "R$ 10,00" },
      { name: "Refrigerante 2 Litros", price: "R$ 14,00" },
      { name: "Água sem gás 500ml", price: "R$ 5,99" },
      { name: "Água com gás 500ml", price: "R$ 6,99" },
    ]
  }
];

const bordersData = [
  { name: "Requeijão Cremoso", price: "R$ 5,99" },
  { name: "Cheddar", price: "R$ 9,99" },
  { name: "Doce de Leite", price: "R$ 9,99" },
  { name: "Chocolate", price: "R$ 9,99" },
];

type PizzaSize = 'Broto' | 'Grande';

type CartItem = {
  id: string;
  name: string;
  category: string;
  size?: PizzaSize;
  secondFlavor?: any;
  observation?: string;
  border?: { name: string; price: number };
  quantity: number;
  basePrice: number;
  totalPrice: number;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'menu'>('home');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('pizzaria_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Store Status and Shipping
  const { shippingPrice, distance, calculateShipping } = useStoreStatus();

  // O cálculo do frete agora ocorrerá exclusivamente quando o cliente preencher o CEP no fetchCep.

  useEffect(() => {
    localStorage.setItem('pizzaria_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalSize, setModalSize] = useState<PizzaSize>('Grande');
  const [modalBorder, setModalBorder] = useState<any>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isHalfAndHalf, setIsHalfAndHalf] = useState(false);
  const [secondFlavor, setSecondFlavor] = useState<any>(null);
  const [observation, setObservation] = useState('');
  const [upsellDrinkName, setUpsellDrinkName] = useState('');
  const [address, setAddress] = useState({ cep: '', street: '', number: '', complement: '', neighborhood: '' });
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [changeFor, setChangeFor] = useState('');

  const whatsappNumber = "5511962900705";

  const fetchCep = async (cepStr: string) => {
    const cleanCep = cepStr.replace(/\D/g, '');
    setAddress(prev => ({ ...prev, cep: cepStr }));

    if (cleanCep.length === 8) {
      setIsFetchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setAddress(prev => ({
            ...prev,
            street: data.logradouro || prev.street,
            neighborhood: data.bairro || prev.neighborhood
          }));

          // Busca as coordenadas do endereço retornado pelo ViaCEP usando a API gratuita do OpenStreetMap
          try {
            const addressQuery = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brasil`;
            const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}`);
            const geoData = await geoResponse.json();

            if (geoData && geoData.length > 0) {
              const lat = parseFloat(geoData[0].lat);
              const lon = parseFloat(geoData[0].lon);

              // Dispara o Hook para recalcular o frete com as coordenadas do CEP digitado!
              await calculateShipping({ latitude: lat, longitude: lon });
            } else {
              console.warn("Endereço não encontrado no mapa para calcular o frete.");
            }
          } catch (geoError) {
            console.error("Erro ao buscar coordenadas do mapa:", geoError);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setIsFetchingCep(false);
      }
    }
  };

  // Helpers
  const cartTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWithShipping = cartTotal + shippingPrice;

  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace('R$ ', '').replace(',', '.'));
  const formatPrice = (priceNum: number) => `R$ ${priceNum.toFixed(2).replace('.', ',')}`;

  const generateWhatsAppLink = () => {
    let msg = `*NOVO PEDIDO* 🍕\n\n`;
    cartItems.forEach((item) => {
      if (item.secondFlavor) {
        msg += `*${item.quantity}x 1/2 ${item.name}, 1/2 ${item.secondFlavor.name}*`;
      } else {
        msg += `*${item.quantity}x ${item.name}*`;
      }
      if (item.size) msg += ` (${item.size})`;
      msg += `\n`;
      if (item.border) {
        msg += `   + Borda de ${item.border.name}\n`;
      }
      if (item.observation) {
        msg += `   Obs: ${item.observation}\n`;
      }
      msg += `   ${formatPrice(item.totalPrice)}\n\n`;
    });
    msg += `*Subtotal: ${formatPrice(cartTotal)}*\n`;
    msg += `*Frete: ${formatPrice(shippingPrice)}*\n`;
    msg += `*Distância: ${distance}*\n\n`;
    msg += `*Total com Frete: ${formatPrice(totalWithShipping)}*\n\n`;

    if (address.street) {
      msg += `*Endereço de Entrega:*\n`;
      msg += `${address.street}, ${address.number}`;
      if (address.complement) msg += ` - ${address.complement}`;
      if (address.neighborhood) msg += `\nBairro: ${address.neighborhood}`;
    } else {
      msg += `*Retirada no Balcão*`;
    }

    if (paymentMethod) {
      msg += `\n\n*Forma de Pagamento:* ${paymentMethod}`;
      if (paymentMethod === 'Dinheiro' && changeFor) {
        msg += ` (Troco para R$ ${changeFor})`;
      }
    }

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTabChange = (tab: 'home' | 'menu') => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const openProductModal = (item: any, category: string) => {
    setSelectedProduct({ ...item, category });
    setModalSize('Grande');
    setModalBorder(null);
    setModalQuantity(1);
    setIsHalfAndHalf(false);
    setSecondFlavor(null);
    setObservation('');
  };

  const addToCart = () => {
    if (!selectedProduct) return;

    let basePrice = 0;
    const isPizza = !!selectedProduct.prices;

    if (isPizza) {
      const p1Price = parsePrice(modalSize === 'Broto' ? selectedProduct.prices.broto : selectedProduct.prices.grande);

      if (isHalfAndHalf && secondFlavor) {
        const p2Price = parsePrice(modalSize === 'Broto' ? secondFlavor.prices.broto : secondFlavor.prices.grande);
        basePrice = Math.max(p1Price, p2Price);
      } else {
        basePrice = p1Price;
      }
    } else {
      basePrice = parsePrice(selectedProduct.price);
    }

    const borderPrice = modalBorder ? parsePrice(modalBorder.price) : 0;

    const unitPrice = basePrice + borderPrice;
    const totalPrice = unitPrice * modalQuantity;

    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedProduct.name,
      category: selectedProduct.category,
      size: isPizza ? modalSize : undefined,
      secondFlavor: (isHalfAndHalf && secondFlavor) ? secondFlavor : undefined,
      observation: observation.trim(),
      border: modalBorder ? { name: modalBorder.name, price: borderPrice } : undefined,
      quantity: modalQuantity,
      basePrice: unitPrice,
      totalPrice: totalPrice,
    };

    setCartItems(prev => [...prev, newItem]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        if (newQ < 1) return item;
        return { ...item, quantity: newQ, totalPrice: newQ * item.basePrice };
      }
      return item;
    }));
  };

  const removeCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 font-sans selection:bg-pizza-red selection:text-white flex flex-col overflow-x-hidden">
      {/* Header / Navbar */}
      <header className="fixed w-full z-40 bg-dark-surface/90 backdrop-blur-md border-b border-white/5 animate-fade-in-up">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => handleTabChange('home')} className="flex items-center gap-2 text-left group">
            <Pizza className="text-pizza-red h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pizza-red to-pizza-orange bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Do Baixinho
            </span>
          </button>

          <nav className="hidden md:flex gap-8 font-medium items-center">
            <button
              onClick={() => handleTabChange('home')}
              className={`${activeTab === 'home' ? 'text-white' : 'text-gray-400'} hover:text-pizza-yellow hover:-translate-y-0.5 transition-all`}
            >
              Início
            </button>
            <button
              onClick={() => handleTabChange('menu')}
              className={`${activeTab === 'menu' ? 'text-pizza-yellow font-bold' : 'text-gray-400'} hover:text-pizza-yellow hover:-translate-y-0.5 transition-all`}
            >
              Cardápio Completo
            </button>
            <button onClick={() => scrollToSection('promocoes')} className="text-gray-400 hover:text-pizza-yellow hover:-translate-y-0.5 transition-all">Promoções</button>
            <button onClick={() => scrollToSection('sobre')} className="text-gray-400 hover:text-pizza-yellow hover:-translate-y-0.5 transition-all">Sobre</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-pizza-yellow transition-colors hover:scale-110"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pizza-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (cartItems.length === 0) {
                  e.preventDefault();
                  alert("Adicione itens ao carrinho primeiro!");
                }
              }}
              className="bg-green-500 hover:bg-green-400 text-white px-5 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            >
              <MessageCircle size={20} className="animate-pulse" />
              Finalizar
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-surface border-t border-white/5 absolute w-full left-0 p-4 flex flex-col gap-4 shadow-xl animate-fade-in-up">
            <button onClick={() => handleTabChange('home')} className={`text-left py-2 text-lg font-medium ${activeTab === 'home' ? 'text-pizza-yellow' : 'hover:text-pizza-yellow'}`}>Início</button>
            <button onClick={() => handleTabChange('menu')} className={`text-left py-2 text-lg font-medium ${activeTab === 'menu' ? 'text-pizza-yellow' : 'hover:text-pizza-yellow'}`}>Cardápio Completo</button>
            <button onClick={() => scrollToSection('promocoes')} className="text-left py-2 text-lg font-medium hover:text-pizza-yellow text-gray-300">Promoções</button>
            <button onClick={() => scrollToSection('sobre')} className="text-left py-2 text-lg font-medium hover:text-pizza-yellow text-gray-300">Sobre</button>
            <button
              onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }}
              className="bg-dark-bg text-white text-center py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Ver Carrinho ({cartCount})
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-24">
        {activeTab === 'home' ? (
          <>
            {/* Hero Section */}
            <section className="pt-8 pb-20 md:pt-16 md:pb-32 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pizza-red/20 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
              <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="flex flex-col gap-6 text-center md:text-left">
                  <div className="inline-block px-4 py-1.5 bg-pizza-red/10 border border-pizza-red/20 text-pizza-yellow rounded-full w-fit mx-auto md:mx-0 font-medium text-sm animate-fade-in-up delay-100">
                    🍕 Massa Artesanal & Ingredientes Premium
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white tracking-tight animate-fade-in-up delay-200">
                    A melhor pizza da região <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pizza-yellow to-pizza-orange">
                      entregue quentinha!
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0 animate-fade-in-up delay-300">
                    Sabor inesquecível, borda recheada perfeita e entrega mais rápida que você já viu. Monte seu pedido agora!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start animate-fade-in-up delay-400">
                    <button
                      onClick={() => handleTabChange('menu')}
                      className="bg-pizza-red hover:bg-pizza-red-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(229,57,53,0.3)] flex items-center justify-center gap-2"
                    >
                      Ver Cardápio
                    </button>
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="bg-dark-surface border border-white/10 hover:border-pizza-yellow hover:text-pizza-yellow text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group hover:shadow-[0_10px_20px_rgba(255,183,77,0.2)] hover:-translate-y-1"
                    >
                      <ShoppingBag size={22} className="text-pizza-yellow group-hover:rotate-12 transition-transform" />
                      Ver Sacola ({cartCount})
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-6 justify-center md:justify-start animate-fade-in-up delay-400">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-dark-bg flex items-center justify-center text-xs font-bold hover:-translate-y-2 transition-transform cursor-pointer">A</div>
                      <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-dark-bg flex items-center justify-center text-xs font-bold hover:-translate-y-2 transition-transform cursor-pointer">M</div>
                      <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-dark-bg flex items-center justify-center text-xs font-bold hover:-translate-y-2 transition-transform cursor-pointer">J</div>
                    </div>
                    <div className="text-sm">
                      <div className="flex text-pizza-yellow">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                      <span className="text-gray-400">Mais de 200 clientes satisfeitos</span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 md:mt-0 animate-pop-in">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent z-10 hidden md:block h-20 bottom-0 mt-auto"></div>
                  <div className="animate-float">
                    <img
                      src="/hero_pizza.png"
                      alt="Pizza deliciosa"
                      className="w-full h-auto object-cover rounded-3xl shadow-2xl relative z-0 md:scale-110 md:-right-8 animate-[spin_60s_linear_infinite]"
                      style={{ filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.6))' }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Promos Section */}
            <section id="promocoes" className="py-20 bg-dark-surface relative border-y border-white/5">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12 animate-fade-in-up">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Promoções Imperdíveis</h2>
                  <p className="text-pizza-yellow font-medium">Aproveite enquanto durar o estoque!</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Promo 1 */}
                  <div className="bg-gradient-to-br from-pizza-red to-pizza-orange rounded-2xl p-1 shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(229,57,53,0.3)] animate-fade-in-up delay-100">
                    <div className="bg-dark-bg rounded-xl p-6 h-full flex flex-col relative overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-pizza-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">SÓ HOJE</div>
                      <h3 className="text-2xl font-bold text-white mb-2 relative z-10 group-hover:text-pizza-yellow transition-colors">Combo Casal</h3>
                      <p className="text-gray-300 mb-6 flex-grow relative z-10">1 Pizza Grande (Tradicional) + 1 Refrigerante 2L</p>
                      <div className="flex justify-between items-end relative z-10">
                        <div>
                          <span className="text-sm text-gray-400 line-through">De R$ 85,00</span>
                          <div className="text-3xl font-extrabold text-pizza-yellow">R$ 69,90</div>
                        </div>
                        <button onClick={() => openProductModal({ name: "Combo Casal", price: "R$ 69,90", desc: "1 Pizza Grande (Tradicional) + 1 Refrigerante 2L" }, "Promoção")} className="bg-white text-pizza-red hover:bg-gray-100 p-2 rounded-full transition-all hover:scale-110">
                          <Plus size={24} />
                        </button>
                      </div>
                      <Pizza className="absolute -bottom-6 -right-6 h-32 w-32 text-white/5 opacity-50 rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>

                  {/* Promo 2 */}
                  <div className="bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col relative hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-pizza-red/50 animate-fade-in-up delay-200">
                    <h3 className="text-2xl font-bold text-white mb-2">Terça em Dobro</h3>
                    <p className="text-gray-400 mb-6 flex-grow">Na compra de 1 Pizza Grande Especial, a 2ª (Tradicional) sai com 50% OFF!</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-white">50% de Desconto</div>
                      <button onClick={() => handleTabChange('menu')} className="bg-pizza-red text-white hover:bg-pizza-red-dark px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105">
                        Ver Menu
                      </button>
                    </div>
                  </div>

                  {/* Promo 3 */}
                  <div className="bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col relative hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-pizza-yellow/50 animate-fade-in-up delay-300 md:col-span-2 lg:col-span-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Kit Festa</h3>
                    <p className="text-gray-400 mb-6 flex-grow">3 Pizzas Grandes + 2 Refrigerantes 2L. Ideal para dividir com a galera!</p>
                    <div className="flex justify-between items-end">
                      <div className="text-3xl font-extrabold text-pizza-yellow">R$ 159,90</div>
                      <button onClick={() => openProductModal({ name: "Kit Festa", price: "R$ 159,90", desc: "3 Pizzas Grandes + 2 Refrigerantes 2L" }, "Promoção")} className="bg-pizza-red text-white hover:bg-pizza-red-dark px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105">
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Menu Highlights Section */}
            <section id="cardapio" className="py-24 relative">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Destaques do Cardápio</h2>
                  <p className="text-gray-400 text-lg">Pizzas com massa de longa fermentação, molho de tomate pelati e ingredientes selecionados a dedo.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {fullMenuData[0].items.slice(0, 3).map((item: any, i) => (
                    <div key={i} className={`group bg-dark-surface rounded-2xl overflow-hidden border border-white/5 hover:border-pizza-red/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(229,57,53,0.15)] flex flex-col animate-fade-in-up delay-${(i + 1) * 100}`}>
                      <div className="h-56 overflow-hidden relative">
                        <img src={i === 0 ? "/menu_margherita.png" : i === 1 ? "/hero_pizza.png" : "/menu_sweet.png"} alt={item.name} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${i === 1 ? 'scale-125' : ''}`} />
                        {i === 0 && (
                          <div className="absolute top-3 right-3 bg-dark-bg/80 backdrop-blur-sm text-pizza-yellow px-3 py-1 rounded-full text-sm font-bold border border-pizza-yellow/30">
                            Mais Vendida
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-bold text-white group-hover:text-pizza-yellow transition-colors">{item.name}</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 flex-grow">{item.desc}</p>
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase font-bold">Broto</span>
                            <span className="text-pizza-yellow font-extrabold">{item.prices.broto}</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-500 uppercase font-bold">Grande</span>
                            <span className="text-pizza-yellow font-extrabold">{item.prices.grande}</span>
                          </div>
                        </div>
                        <button onClick={() => openProductModal(item, "Pizzas Salgadas")} className="w-full bg-white/5 hover:bg-pizza-red text-white text-center py-3 rounded-xl font-medium transition-colors border border-white/10 hover:border-pizza-red mt-auto flex items-center justify-center gap-2">
                          <Plus size={20} /> Adicionar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center animate-fade-in-up delay-400">
                  <button
                    onClick={() => handleTabChange('menu')}
                    className="inline-flex items-center gap-2 bg-pizza-red hover:bg-pizza-red-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(229,57,53,0.3)]"
                  >
                    Ver Cardápio Completo
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </section>

            {/* About & Info Section */}
            <section id="sobre" className="py-20 bg-dark-surface border-t border-white/5">
              <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-up">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sobre a Pizzaria do Baixinho</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Tudo começou com uma paixão por criar momentos felizes ao redor da mesa. A Pizzaria do Baixinho é um negócio local, nascido do desejo de oferecer uma pizza de qualidade superior.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="bg-pizza-red/20 p-3 rounded-lg text-pizza-red">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Horário de Funcionamento</h4>
                        <p className="text-sm">Quarta a Domingo: 18h às 23h30</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="bg-pizza-orange/20 p-3 rounded-lg text-pizza-orange">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Área de Entrega</h4>
                        <p className="text-sm">Consulte as taxas de entrega para o seu bairro no carrinho.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative animate-fade-in-up delay-200">
                  <div className="bg-gradient-to-tr from-dark-surface to-dark-bg p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(255,183,77,0.15)] transition-shadow">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Ficou com alguma dúvida?</h3>
                    <p className="text-center text-gray-400 mb-8">Nossa equipe está pronta para te atender rapidamente no WhatsApp.</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#1ebd57] text-white text-xl py-4 rounded-xl font-bold transition-all shadow-[0_10px_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3 hover:-translate-y-1"
                    >
                      <Phone fill="currentColor" size={24} className="animate-pulse" />
                      Falar com Atendente
                    </a>

                    <div className="mt-8 pt-8 border-t border-white/10 text-center">
                      <p className="text-gray-400 mb-4">Siga-nos nas redes sociais</p>
                      <a href="https://www.instagram.com/apizzariadobaixinho" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white hover:scale-110 hover:rotate-12 transition-transform">
                        <InstagramIcon size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="py-12 bg-dark-bg min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <button
                  onClick={() => handleTabChange('home')}
                  className="p-2 bg-dark-surface hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-all hover:-translate-x-1 border border-white/10"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-4xl md:text-5xl font-bold text-white">Cardápio Completo</h2>
              </div>

              <div className="space-y-16">
                {fullMenuData.map((section, idx) => (
                  <div key={idx} className={`animate-fade-in-up delay-${(idx + 1) * 100}`}>
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="text-3xl font-bold text-white">{section.category}</h3>
                      <div className="h-px bg-gradient-to-r from-pizza-red/50 to-transparent flex-grow"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {section.items.map((item: any, itemIdx) => (
                        <div key={itemIdx} className="group bg-dark-surface p-5 rounded-xl border border-white/5 hover:border-pizza-yellow/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,183,77,0.1)] flex flex-col">
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-pizza-yellow transition-colors">{item.name}</h4>
                          {item.desc && <p className="text-gray-400 text-sm mb-4 flex-grow">{item.desc}</p>}

                          <div className="mt-auto pt-4 border-t border-white/5">
                            {item.prices ? (
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500 uppercase font-bold">Broto</span>
                                  <span className="text-pizza-yellow font-extrabold">{item.prices.broto}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                  <span className="text-xs text-gray-500 uppercase font-bold">Grande</span>
                                  <span className="text-pizza-yellow font-extrabold">{item.prices.grande}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="mb-4">
                                <span className="text-pizza-yellow font-extrabold">{item.price}</span>
                              </div>
                            )}

                            <button
                              onClick={() => openProductModal(item, section.category)}
                              className="w-full bg-pizza-red/10 text-pizza-red hover:bg-pizza-red hover:text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors w-full group/btn"
                            >
                              <Plus size={20} className="group-hover/btn:rotate-90 transition-transform" /> Adicionar à Sacola
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-white/10 py-8 mt-auto z-10 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 group">
            <Pizza className="text-gray-400 h-6 w-6 group-hover:text-pizza-red transition-colors group-hover:rotate-12" />
            <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">Pizzaria do Baixinho</span>
          </div>
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Pizzaria do Baixinho. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-pizza-red text-white p-4 px-6 rounded-full shadow-[0_0_20px_rgba(229,57,53,0.4)] hover:scale-105 hover:-translate-y-2 transition-all z-40 flex items-center justify-center gap-3 group animate-pop-in delay-300"
        aria-label="Ver Sacola"
      >
        <ShoppingBag size={28} />
        {cartCount > 0 ? (
          <div className="flex flex-col text-left">
            <span className="text-xs font-medium opacity-80">{cartCount} {cartCount === 1 ? 'item' : 'itens'}</span>
            <span className="text-sm font-bold">{formatPrice(cartTotal)}</span>
          </div>
        ) : (
          <span className="font-bold">Sacola</span>
        )}
      </button>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.2s' }} onClick={() => setSelectedProduct(null)}></div>
          <div className="bg-dark-surface border border-white/10 rounded-2xl w-full max-w-md relative z-10 animate-pop-in overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/5 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedProduct.name}</h3>
                <span className="text-pizza-yellow text-sm">{selectedProduct.category}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-white p-1">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              {selectedProduct.desc && (
                <p className="text-gray-400">{selectedProduct.desc}</p>
              )}

              {/* Pizza Options */}
              {selectedProduct.prices && (
                <>
                  <div>
                    <h4 className="font-bold text-white mb-3">Como você quer sua pizza?</h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={() => { setIsHalfAndHalf(false); setSecondFlavor(null); }}
                        className={`p-3 rounded-xl border ${!isHalfAndHalf ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-dark-surface text-gray-400 hover:bg-white/5'} transition-colors font-bold`}
                      >
                        Inteira
                      </button>
                      <button
                        onClick={() => setIsHalfAndHalf(true)}
                        className={`p-3 rounded-xl border ${isHalfAndHalf ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-dark-surface text-gray-400 hover:bg-white/5'} transition-colors font-bold`}
                      >
                        Meio a Meio
                      </button>
                    </div>

                    {isHalfAndHalf && (
                      <div className="mb-4 animate-fade-in-up">
                        <label className="block text-sm text-gray-400 mb-2">Escolha a 2ª Metade (Metade mais cara prevalece)</label>
                        <select
                          className="w-full bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                          onChange={(e) => {
                            const categoryItems = fullMenuData.find(cat => cat.category === selectedProduct.category)?.items || [];
                            const flavor = categoryItems.find((p: any) => p.name === e.target.value);
                            setSecondFlavor(flavor || null);
                          }}
                          value={secondFlavor?.name || ""}
                        >
                          <option value="" disabled>Selecione o sabor...</option>
                          {fullMenuData.find(cat => cat.category === selectedProduct.category)?.items
                            .filter((p: any) => p.name !== selectedProduct.name)
                            .map((p: any, i: number) => (
                              <option key={i} value={p.name}>{p.name}</option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-3">Escolha o Tamanho</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setModalSize('Broto')}
                        className={`p-3 rounded-xl border ${modalSize === 'Broto' ? 'border-pizza-yellow bg-pizza-yellow/10' : 'border-white/10 bg-white/5'} transition-colors flex flex-col items-center justify-center gap-1`}
                      >
                        <span className="font-bold text-white">Broto</span>
                        <span className="text-pizza-yellow text-sm">{selectedProduct.prices.broto}</span>
                      </button>
                      <button
                        onClick={() => setModalSize('Grande')}
                        className={`p-3 rounded-xl border ${modalSize === 'Grande' ? 'border-pizza-yellow bg-pizza-yellow/10' : 'border-white/10 bg-white/5'} transition-colors flex flex-col items-center justify-center gap-1`}
                      >
                        <span className="font-bold text-white">Grande</span>
                        <span className="text-pizza-yellow text-sm">{selectedProduct.prices.grande}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-3">Borda Recheada (Opcional)</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setModalBorder(null)}
                        className={`w-full p-3 rounded-xl border text-left flex justify-between items-center ${modalBorder === null ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}
                      >
                        <span>Sem Borda</span>
                      </button>
                      {bordersData.map((b, i) => (
                        <button
                          key={i}
                          onClick={() => setModalBorder(b)}
                          className={`w-full p-3 rounded-xl border text-left flex justify-between items-center ${modalBorder?.name === b.name ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`}
                        >
                          <span>{b.name}</span>
                          <span className="text-pizza-yellow text-sm">+ {b.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between bg-dark-bg p-4 rounded-xl border border-white/5 mb-4">
                <span className="font-bold text-white">Quantidade</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white">
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg w-6 text-center">{modalQuantity}</span>
                  <button onClick={() => setModalQuantity(modalQuantity + 1)} className="w-8 h-8 rounded-full bg-pizza-red flex items-center justify-center hover:bg-pizza-red-dark text-white">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Observation */}
              <div>
                <h4 className="font-bold text-white mb-3">Observações (Opcional)</h4>
                <textarea
                  placeholder="Ex: tirar cebola, ponto da carne..."
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  rows={2}
                  className="w-full bg-dark-surface border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-pizza-yellow resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-dark-bg">
              <button
                onClick={addToCart}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-lg"
              >
                Adicionar à Sacola
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.2s' }} onClick={() => setIsCartOpen(false)}></div>
          <div className="bg-dark-surface border-l border-white/10 w-full max-w-md relative z-10 h-full flex flex-col shadow-2xl animate-pop-in" style={{ transformOrigin: 'right center' }}>
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark-bg">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-pizza-yellow" size={24} />
                <h2 className="text-2xl font-bold text-white">Sua Sacola</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <Pizza size={64} className="opacity-20" />
                  <p className="text-lg">Sua sacola está vazia.</p>
                  <button onClick={() => { setIsCartOpen(false); handleTabChange('menu'); }} className="text-pizza-yellow font-bold mt-4 border border-pizza-yellow px-6 py-2 rounded-full hover:bg-pizza-yellow hover:text-dark-bg transition-colors">
                    Ver Cardápio
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-white/5 pb-6">
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white">
                            {item.secondFlavor ? `1/2 ${item.name}, 1/2 ${item.secondFlavor.name}` : item.name}
                          </h4>
                          <button onClick={() => removeCartItem(item.id)} className="text-gray-500 hover:text-pizza-red">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        {item.size && <p className="text-sm text-gray-400">Tamanho: {item.size}</p>}
                        {item.border && <p className="text-sm text-pizza-yellow/80">+ Borda de {item.border.name}</p>}
                        {item.observation && <p className="text-sm text-gray-400 italic mt-1">Obs: {item.observation}</p>}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-3 bg-dark-bg rounded-lg border border-white/5 p-1">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-white">
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-white">
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-white">{formatPrice(item.totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && !cartItems.some(i => i.category === 'Bebidas') && (
                <div className="p-4 mt-6 bg-dark-surface border border-pizza-yellow/30 rounded-xl flex flex-col gap-3 animate-pop-in relative overflow-hidden flex-shrink-0">
                  <div className="absolute top-0 left-0 w-1 h-full bg-pizza-yellow"></div>
                  <div>
                    <span className="block font-bold text-pizza-yellow text-lg mb-1">Faltou a bebida? 🥤</span>
                    <span className="text-sm text-gray-400">Complete seu pedido escolhendo uma opção abaixo:</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <select
                      className="flex-grow w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow text-sm appearance-none"
                      value={upsellDrinkName}
                      onChange={(e) => setUpsellDrinkName(e.target.value)}
                    >
                      <option value="" disabled>Escolha uma bebida...</option>
                      {fullMenuData.find(cat => cat.category === "Bebidas")?.items.map((d: any, i) => (
                        <option key={i} value={d.name}>{d.name} - {d.price}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        if (upsellDrinkName) {
                          const drink = fullMenuData.find(cat => cat.category === "Bebidas")?.items.find((d: any) => d.name === upsellDrinkName) as any;
                          if (drink) {
                            const unitPrice = parsePrice(drink.price);
                            const newItem: CartItem = {
                              id: Math.random().toString(36).substr(2, 9),
                              name: drink.name,
                              category: "Bebidas",
                              quantity: 1,
                              basePrice: unitPrice,
                              totalPrice: unitPrice,
                            };
                            setCartItems(prev => [...prev, newItem]);
                            setUpsellDrinkName(""); // reset after adding
                          }
                        }
                      }}
                      disabled={!upsellDrinkName}
                      className="bg-pizza-yellow text-dark-bg font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors text-sm disabled:opacity-50 sm:w-auto w-full flex-shrink-0"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="mt-8 border-t border-white/5 pt-6">
                  <div className="mb-6 space-y-3">
                    <h4 className="font-bold text-white mb-2">Endereço de Entrega (Opcional)</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1 relative">
                        {isFetchingCep && <Loader2 size={16} className="absolute right-3 top-4 animate-spin text-pizza-yellow" />}
                        <input
                          type="text"
                          placeholder="CEP"
                          value={address.cep}
                          onChange={(e) => fetchCep(e.target.value)}
                          maxLength={9}
                          className="w-full bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Rua / Avenida"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="col-span-2 bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <input
                        type="text"
                        placeholder="Nº"
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        className="col-span-1 bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                      />
                      <input
                        type="text"
                        placeholder="Complemento"
                        value={address.complement}
                        onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                        className="col-span-1 bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                      />
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={address.neighborhood}
                        onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                        className="col-span-2 bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                      />
                    </div>
                  </div>

                  <div className="mb-6 space-y-3">
                    <h4 className="font-bold text-white mb-2">Forma de Pagamento</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['Pix', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'].map(method => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`p-3 rounded-xl border text-sm font-bold transition-colors ${paymentMethod === method ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-dark-surface text-gray-400 hover:bg-white/5'}`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                    {paymentMethod === 'Dinheiro' && (
                      <input
                        type="text"
                        placeholder="Troco para quanto? (Ex: 50)"
                        value={changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        className="w-full mt-2 bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-dark-bg flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-xl font-bold text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Frete</span>
                  <span className="text-xl font-bold text-pizza-yellow">{formatPrice(shippingPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Distância</span>
                  <span className="text-xl font-bold text-white">{distance}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Total com Frete</span>
                  <span className="text-2xl font-extrabold text-white">{formatPrice(totalWithShipping)}</span>
                </div>
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setTimeout(() => {
                      setCartItems([]);
                      setIsCartOpen(false);
                      setAddress({ cep: '', street: '', number: '', complement: '', neighborhood: '' });
                      setPaymentMethod('');
                    }, 500);
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#1ebd57] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors text-lg shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:-translate-y-1"
                >
                  <MessageCircle size={24} />
                  Enviar Pedido
                </a>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
