import { Pizza, Plus } from 'lucide-react';

interface PromotionsProps {
  handleTabChange: (tab: 'home' | 'menu') => void;
  openProductModal: (item: any, category: string) => void;
}

export function Promotions({ handleTabChange, openProductModal }: PromotionsProps) {
  return (
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
                <button
                  onClick={() => openProductModal({ name: "Combo Casal", price: "R$ 69,90", desc: "1 Pizza Grande (Tradicional) + 1 Refrigerante 2L" }, "Promoção")}
                  className="bg-white text-pizza-red hover:bg-gray-100 p-2 rounded-full transition-all hover:scale-110"
                >
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
              <button
                onClick={() => openProductModal({ name: "Kit Festa", price: "R$ 159,90", desc: "3 Pizzas Grandes + 2 Refrigerantes 2L" }, "Promoção")}
                className="bg-pizza-red text-white hover:bg-pizza-red-dark px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
