import { ChevronRight, Plus } from 'lucide-react';
import { fullMenuData } from '../../data/menu';

interface MenuHighlightsProps {
  handleTabChange: (tab: 'home' | 'menu') => void;
  openProductModal: (item: any, category: string) => void;
}

export function MenuHighlights({ handleTabChange, openProductModal }: MenuHighlightsProps) {
  return (
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
                <img
                  src={i === 0 ? "/menu_margherita.png" : i === 1 ? "/hero_pizza.png" : "/menu_sweet.png"}
                  alt={item.name}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${i === 1 ? 'scale-125' : ''}`}
                />
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
                <button
                  onClick={() => openProductModal(item, "Pizzas Salgadas")}
                  className="w-full bg-white/5 hover:bg-pizza-red text-white text-center py-3 rounded-xl font-medium transition-colors border border-white/10 hover:border-pizza-red mt-auto flex items-center justify-center gap-2"
                >
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
  );
}
