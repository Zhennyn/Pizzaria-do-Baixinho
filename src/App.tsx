import { useState, useEffect } from 'react';
import { useStoreStatus } from './hooks/useStoreStatus';
import type { CartItem, PizzaSize } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Promotions } from './components/sections/Promotions';
import { MenuHighlights } from './components/sections/MenuHighlights';
import { AboutInfo } from './components/sections/AboutInfo';
import { FullMenu } from './components/sections/FullMenu';
import { ProductModal } from './components/modals/ProductModal';
import { CartModal } from './components/modals/CartModal';

function App() {
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

  // Checkout State
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

          try {
            const addressQuery = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brasil`;
            const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}`);
            const geoData = await geoResponse.json();

            if (geoData && geoData.length > 0) {
              const lat = parseFloat(geoData[0].lat);
              const lon = parseFloat(geoData[0].lon);

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
      <Header
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        scrollToSection={scrollToSection}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        generateWhatsAppLink={generateWhatsAppLink}
        cartItems={cartItems}
      />

      <main className="flex-grow pt-24">
        {activeTab === 'home' ? (
          <>
            <Hero handleTabChange={handleTabChange} setIsCartOpen={setIsCartOpen} cartCount={cartCount} />
            <Promotions handleTabChange={handleTabChange} openProductModal={openProductModal} />
            <MenuHighlights handleTabChange={handleTabChange} openProductModal={openProductModal} />
            <AboutInfo whatsappNumber={whatsappNumber} />
          </>
        ) : (
          <FullMenu handleTabChange={handleTabChange} openProductModal={openProductModal} />
        )}
      </main>

      <Footer />

      <ProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        modalSize={modalSize}
        setModalSize={setModalSize}
        modalBorder={modalBorder}
        setModalBorder={setModalBorder}
        modalQuantity={modalQuantity}
        setModalQuantity={setModalQuantity}
        isHalfAndHalf={isHalfAndHalf}
        setIsHalfAndHalf={setIsHalfAndHalf}
        secondFlavor={secondFlavor}
        setSecondFlavor={setSecondFlavor}
        observation={observation}
        setObservation={setObservation}
        addToCart={addToCart}
      />

      <CartModal
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        updateCartQuantity={updateCartQuantity}
        removeCartItem={removeCartItem}
        cartTotal={cartTotal}
        shippingPrice={shippingPrice}
        totalWithShipping={totalWithShipping}
        distance={distance}
        address={address}
        setAddress={setAddress}
        fetchCep={fetchCep}
        isFetchingCep={isFetchingCep}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        changeFor={changeFor}
        setChangeFor={setChangeFor}
        generateWhatsAppLink={generateWhatsAppLink}
      />
    </div>
  );
}

export default App;
