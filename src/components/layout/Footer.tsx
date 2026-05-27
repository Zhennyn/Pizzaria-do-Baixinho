import { Pizza } from 'lucide-react';

export function Footer() {
  return (
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
  );
}
