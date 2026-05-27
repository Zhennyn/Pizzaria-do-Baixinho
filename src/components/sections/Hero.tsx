import { ShoppingBag, Star } from 'lucide-react';

interface HeroProps {
  handleTabChange: (tab: 'home' | 'menu') => void;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
}

export function Hero({ handleTabChange, setIsCartOpen, cartCount }: HeroProps) {
  return (
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
  );
}
