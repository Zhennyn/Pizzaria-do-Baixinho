import { ArrowLeft, Plus } from 'lucide-react';
import { fullMenuData } from '../../data/menu';

interface FullMenuProps {
  handleTabChange: (tab: 'home' | 'menu') => void;
  openProductModal: (item: any, category: string) => void;
}

export function FullMenu({ handleTabChange, openProductModal }: FullMenuProps) {
  return (
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
                        className="w-full bg-pizza-red/10 text-pizza-red hover:bg-pizza-red hover:text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors group/btn"
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
  );
}
