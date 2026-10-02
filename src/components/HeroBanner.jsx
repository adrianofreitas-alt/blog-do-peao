import React, { useState, useEffect } from 'react';
import { Coffee, Flame, Sparkles, Clock, AlertTriangle } from 'lucide-react';

const OFFICE_QUOTES = [
  "\"Não deixe para amanhã a reunião inútil que você pode cancelar hoje.\"",
  "\"Na dúvida, responda 'vou alinhar com o time e te retorno' e ganhe 48h de paz.\"",
  "\"Todo chamado urgente de sexta-feira às 17h50 pode ser resolvido na segunda-feira sem prejuízo à humanidade.\"",
  "\"Trabalhe duro até que você não precise mais se esconder no banheiro para chorar em paz.\"",
  "\"O café da firma não é bom, mas é de graça e estimula a sobrevivência.\""
];

export default function HeroBanner({ selectedCategory, setSelectedCategory, categories }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % OFFICE_QUOTES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-8 pb-6 border-b border-stone-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main headline banner */}
        <div className="relative rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white p-6 sm:p-10 overflow-hidden shadow-xl">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-amber-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O portal da resistência CLT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Crônicas de quem bate o ponto e <span className="text-amber-400">ri pra não chorar</span>.
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              Histórias verídicas e dramatizadas sobre as loucuras do mundo corporativo: reuniões que duram eras, café com gosto de ferrugem, dramas de RH e a eterna espera pelo 5º dia útil.
            </p>

            {/* Satirical Quote Carousel */}
            <div className="bg-black/30 border border-white/10 rounded-xl p-3.5 flex items-start gap-3 backdrop-blur-sm text-xs sm:text-sm text-amber-200/90 italic">
              <span className="text-lg leading-none">💡</span>
              <div>
                <span className="font-semibold text-white not-italic text-[11px] uppercase tracking-wider block mb-0.5">
                  Sabedoria do Peão do Dia:
                </span>
                {OFFICE_QUOTES[quoteIndex]}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider pr-2 whitespace-nowrap">
            Filtros:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30 scale-105'
                    : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
