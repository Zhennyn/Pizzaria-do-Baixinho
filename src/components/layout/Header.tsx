import { useState } from 'react';
import { Pizza, ShoppingBag, MessageCircle, Menu as MenuIcon, X } from 'lucide-react';
import type { CartItem } from '../../types';

interface HeaderProps {
  activeTab: 'home' | 'menu';
  handleTabChange: (tab: 'home' | 'menu') => void;
  scrollToSection: (id: string) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppLink: () => string;
  cartItems: CartItem[];
}

export function Header({
  activeTab,
  handleTabChange,
  scrollToSection,
  cartCount,
  setIsCartOpen,
  generateWhatsAppLink,
  cartItems
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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

      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface border-t border-white/5 absolute w-full left-0 p-4 flex flex-col gap-4 shadow-xl animate-fade-in-up">
          <button onClick={() => { handleTabChange('home'); setIsMenuOpen(false); }} className={`text-left py-2 text-lg font-medium ${activeTab === 'home' ? 'text-pizza-yellow' : 'hover:text-pizza-yellow text-gray-300'}`}>Início</button>
          <button onClick={() => { handleTabChange('menu'); setIsMenuOpen(false); }} className={`text-left py-2 text-lg font-medium ${activeTab === 'menu' ? 'text-pizza-yellow' : 'hover:text-pizza-yellow text-gray-300'}`}>Cardápio Completo</button>
          <button onClick={() => { scrollToSection('promocoes'); setIsMenuOpen(false); }} className="text-left py-2 text-lg font-medium hover:text-pizza-yellow text-gray-300">Promoções</button>
          <button onClick={() => { scrollToSection('sobre'); setIsMenuOpen(false); }} className="text-left py-2 text-lg font-medium hover:text-pizza-yellow text-gray-300">Sobre</button>
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
  );
}
