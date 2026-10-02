import React from 'react';
import { Coffee, ShieldCheck, Heart, RotateCcw, Lock } from 'lucide-react';

export default function Footer({ setCurrentView, onResetDefaultStories }) {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-slate-800 bg-stone-100/60 dark:bg-slate-900/60 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand & Manifesto */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-stone-900 dark:text-white">
                Blog do <span className="text-amber-600 dark:text-amber-400">Peão</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              O repositório das dores, glórias e insanidades do trabalhador brasileiro. De reuniões intermináveis a sumiço de marmitas, aqui seu causo tem voz.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nenhum RH foi ferido na criação deste blog</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-3">
              Navegação do Peão
            </h5>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button onClick={() => setCurrentView('feed')} className="hover:text-amber-600 transition">
                  ☕ Todos os Contos & Crônicas
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('editor')} className="hover:text-amber-600 transition">
                  ✍️ Bater Ponto (Publicar Novo Causo)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('wall')} className="hover:text-amber-600 transition">
                  📌 Mural da Copa (Micro-causos)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('saved')} className="hover:text-amber-600 transition">
                  🔖 Meus Contos Salvos
                </button>
              </li>
            </ul>
          </div>

          {/* Maintenance & Reset */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white mb-3">
              Departamento Pessoal
            </h5>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
              Os dados e contos que você publicar ficam guardados em segurança no armazenamento do seu próprio navegador.
            </p>
            <button
              onClick={onResetDefaultStories}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-400 transition"
              title="Restaurar histórias originais do blog"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar contos originais</span>
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} Blog do Peão. Todos os direitos reservados.</p>
            <button
              onClick={() => setCurrentView('admin')}
              className="opacity-40 hover:opacity-100 hover:text-amber-600 transition flex items-center gap-1 text-[11px]"
              title="Sala da Chefia (Administração)"
            >
              <Lock className="w-3 h-3" />
              <span>Chefia</span>
            </button>
          </div>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-red-500 fill-current" /> e muito café coado na firma.
          </p>
        </div>
      </div>
    </footer>
  );
}
