import { X, Minus, Plus, Trash2, MapPin, Loader2, MessageCircle } from 'lucide-react';
import type { CartItem } from '../../types';

interface CartModalProps {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartItems: CartItem[];
  updateCartQuantity: (id: string, delta: number) => void;
  removeCartItem: (id: string) => void;
  cartTotal: number;
  shippingPrice: number;
  totalWithShipping: number;
  distance: string;
  address: any;
  setAddress: (addr: any) => void;
  fetchCep: (cep: string) => void;
  isFetchingCep: boolean;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  changeFor: string;
  setChangeFor: (change: string) => void;
  generateWhatsAppLink: () => string;
}

export function CartModal({
  isCartOpen,
  setIsCartOpen,
  cartItems,
  updateCartQuantity,
  removeCartItem,
  cartTotal,
  shippingPrice,
  totalWithShipping,
  distance,
  address,
  setAddress,
  fetchCep,
  isFetchingCep,
  paymentMethod,
  setPaymentMethod,
  changeFor,
  setChangeFor,
  generateWhatsAppLink
}: CartModalProps) {
  if (!isCartOpen) return null;

  const formatPrice = (priceNum: number) => `R$ ${priceNum.toFixed(2).replace('.', ',')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.2s' }} onClick={() => setIsCartOpen(false)}></div>
      <div className="bg-dark-surface w-full max-w-md h-full relative z-10 animate-slide-in-right flex flex-col shadow-2xl border-l border-white/5">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark-bg/50 backdrop-blur-md">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            Sua Sacola
            <span className="bg-pizza-red text-white text-sm px-2 py-0.5 rounded-full">{cartItems.length}</span>
          </h3>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
              <div className="w-24 h-24 bg-dark-bg rounded-full flex items-center justify-center border border-white/5">
                <MapPin size={48} className="text-pizza-yellow opacity-50" />
              </div>
              <p className="text-xl font-medium text-white">Sua sacola está vazia</p>
              <p>Adicione algumas pizzas deliciosas para continuar.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 bg-pizza-red/10 text-pizza-red px-6 py-2 rounded-lg font-bold hover:bg-pizza-red hover:text-white transition-colors"
              >
                Voltar ao Cardápio
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-dark-bg p-4 rounded-xl border border-white/5 flex gap-4 animate-fade-in-up">
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white leading-tight">
                        {item.quantity}x {item.secondFlavor ? `1/2 ${item.name}, 1/2 ${item.secondFlavor.name}` : item.name}
                      </h4>
                      <button onClick={() => removeCartItem(item.id)} className="text-gray-500 hover:text-red-400 p-1">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    {item.size && <p className="text-sm text-pizza-yellow font-medium">{item.size}</p>}
                    {item.border && <p className="text-sm text-gray-400">+ Borda de {item.border.name}</p>}
                    {item.observation && <p className="text-sm text-gray-500 italic mt-1 text-wrap line-clamp-2">Obs: {item.observation}</p>}

                    <div className="flex justify-between items-center mt-3">
                      <div className="font-bold text-white">{formatPrice(item.totalPrice)}</div>
                      <div className="flex items-center gap-3 bg-dark-surface rounded-lg p-1 border border-white/10">
                        <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 text-gray-400 hover:text-white"><Minus size={16} /></button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 text-gray-400 hover:text-white"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-white/5 space-y-6">
                <div>
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin size={20} className="text-pizza-red" />
                    Endereço de Entrega
                  </h4>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="CEP (Somente números)"
                        className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow pl-4"
                        value={address.cep}
                        onChange={(e) => fetchCep(e.target.value)}
                        maxLength={9}
                      />
                      {isFetchingCep && (
                        <div className="absolute right-3 top-3 text-pizza-yellow">
                          <Loader2 size={20} className="animate-spin" />
                        </div>
                      )}
                    </div>

                    {address.street && (
                      <div className="grid grid-cols-3 gap-3 animate-fade-in-up">
                        <input
                          type="text"
                          placeholder="Rua"
                          className="col-span-3 bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Número"
                          className="col-span-1 bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                          value={address.number}
                          onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Complemento"
                          className="col-span-2 bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                          value={address.complement}
                          onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Bairro"
                          className="col-span-3 bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                          value={address.neighborhood}
                          onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-3">Forma de Pagamento (Na entrega)</h4>
                  <select
                    className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="" disabled>Selecione...</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="PIX">PIX</option>
                  </select>

                  {paymentMethod === 'Dinheiro' && (
                    <input
                      type="text"
                      placeholder="Troco para quanto? (Ex: 100)"
                      className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow mt-3 animate-fade-in-up"
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-dark-bg border-t border-white/5 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400 items-center">
              <span>Frete <span className="text-xs text-pizza-yellow ml-1">({distance})</span></span>
              <span>{shippingPrice === 0 ? (address.street ? 'Grátis' : 'A calcular') : formatPrice(shippingPrice)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
              <span>Total</span>
              <span className="text-pizza-yellow">{formatPrice(totalWithShipping)}</span>
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (cartItems.length === 0) e.preventDefault();
                if (address.cep && (!address.street || !address.number)) {
                  e.preventDefault();
                  alert("Por favor, preencha o endereço completo para entrega.");
                }
                if (!paymentMethod) {
                  e.preventDefault();
                  alert("Por favor, selecione a forma de pagamento.");
                }
              }}
              className="w-full bg-[#25D366] hover:bg-[#1ebd57] text-white py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:-translate-y-1"
            >
              <MessageCircle size={24} className="animate-pulse" />
              Enviar Pedido no WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
