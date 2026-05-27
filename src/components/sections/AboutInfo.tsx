import { Clock, MapPin, Phone } from 'lucide-react';

const InstagramIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface AboutInfoProps {
  whatsappNumber: string;
}

export function AboutInfo({ whatsappNumber }: AboutInfoProps) {
  return (
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
  );
}
