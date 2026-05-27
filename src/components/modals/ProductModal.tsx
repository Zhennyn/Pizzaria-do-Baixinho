import { X, Minus, Plus } from 'lucide-react';
import { fullMenuData, bordersData } from '../../data/menu';
import type { PizzaSize } from '../../types';

interface ProductModalProps {
  selectedProduct: any;
  setSelectedProduct: (product: any) => void;
  modalSize: PizzaSize;
  setModalSize: (size: PizzaSize) => void;
  modalBorder: any;
  setModalBorder: (border: any) => void;
  modalQuantity: number;
  setModalQuantity: (qty: number) => void;
  isHalfAndHalf: boolean;
  setIsHalfAndHalf: (val: boolean) => void;
  secondFlavor: any;
  setSecondFlavor: (flavor: any) => void;
  observation: string;
  setObservation: (obs: string) => void;
  addToCart: () => void;
}

export function ProductModal({
  selectedProduct,
  setSelectedProduct,
  modalSize,
  setModalSize,
  modalBorder,
  setModalBorder,
  modalQuantity,
  setModalQuantity,
  isHalfAndHalf,
  setIsHalfAndHalf,
  secondFlavor,
  setSecondFlavor,
  observation,
  setObservation,
  addToCart
}: ProductModalProps) {
  if (!selectedProduct) return null;

  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace('R$ ', '').replace(',', '.'));
  const formatPrice = (priceNum: number) => `R$ ${priceNum.toFixed(2).replace('.', ',')}`;

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

  return (
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
                        .map((p: any, i) => (
                          <option key={i} value={p.name}>{p.name}</option>
                        ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-bold text-white mb-3">Tamanho</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setModalSize('Broto')}
                    className={`p-3 rounded-xl border flex flex-col items-center ${modalSize === 'Broto' ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-dark-surface text-gray-400 hover:bg-white/5'} transition-colors`}
                  >
                    <span className="font-bold">Broto (25cm)</span>
                    <span className="text-sm opacity-80">{selectedProduct.prices.broto}</span>
                  </button>
                  <button
                    onClick={() => setModalSize('Grande')}
                    className={`p-3 rounded-xl border flex flex-col items-center ${modalSize === 'Grande' ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-dark-surface text-gray-400 hover:bg-white/5'} transition-colors`}
                  >
                    <span className="font-bold">Grande (35cm)</span>
                    <span className="text-sm opacity-80">{selectedProduct.prices.grande}</span>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-3">Borda Recheada (Opcional)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setModalBorder(null)}
                    className={`p-3 rounded-xl border text-sm ${!modalBorder ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-dark-surface text-gray-400 hover:bg-white/5'} transition-colors font-medium`}
                  >
                    Sem Borda
                  </button>
                  {bordersData.map((b, i) => (
                    <button
                      key={i}
                      onClick={() => setModalBorder(b)}
                      className={`p-3 rounded-xl border text-sm flex flex-col items-center ${modalBorder?.name === b.name ? 'border-pizza-yellow bg-pizza-yellow/10 text-white' : 'border-white/10 bg-dark-surface text-gray-400 hover:bg-white/5'} transition-colors`}
                    >
                      <span className="font-medium">{b.name}</span>
                      <span className="opacity-80 text-xs">+{b.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <h4 className="font-bold text-white mb-3">Observações</h4>
            <textarea
              className="w-full bg-dark-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-pizza-yellow resize-none"
              rows={2}
              placeholder="Ex: Tirar cebola, ponto da carne, etc..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-dark-bg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Quantidade</span>
            <div className="flex items-center gap-4 bg-dark-surface rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                className="p-2 text-white hover:text-pizza-yellow transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="font-bold text-lg w-6 text-center text-white">{modalQuantity}</span>
              <button
                onClick={() => setModalQuantity(modalQuantity + 1)}
                className="p-2 text-white hover:text-pizza-yellow transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            disabled={isHalfAndHalf && !secondFlavor}
            className="w-full bg-pizza-red hover:bg-pizza-red-dark disabled:bg-gray-700 disabled:text-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-all flex justify-between items-center px-6 shadow-lg"
          >
            <span>Adicionar</span>
            <span>{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
