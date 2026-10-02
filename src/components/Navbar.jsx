import React from 'react';
import { 
  Coffee, 
  PenTool, 
  Moon, 
  Sun, 
  Search, 
  Bookmark, 
  MessageSquareQuote, 
  Download
} from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  searchQuery, 
  setSearchQuery, 
  isDarkMode, 
  setIsDarkMode, 
  bookmarksCount,
  onExportAll
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo & Branding - Limpo e sempre visível no celular */}
          <div 
            onClick={() => setCurrentView('feed')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform shrink-0">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-lg sm:text-2xl tracking-tight text-stone-900 dark:text-white whitespace-nowrap leading-tight">
                Blog do <span className="text-amber-600 dark:text-amber-400">Peão</span>
              </span>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden md:block leading-none mt-0.5">
                Causos, cafezinho frio e o folclore da firma
              </p>
            </div>
          </div>

          {/* Search bar (desktop) */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar causo, reunião, chefe, café..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100 dark:bg-slate-800/80 rounded-full border border-stone-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation & Actions - Otimizado e sem espremer o título no celular */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Mural da Copa Button */}
            <button
              onClick={() => setCurrentView('wall')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                currentView === 'wall'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
              }`}
              title="Mural de micro-causos da copa"
            >
              <MessageSquareQuote className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="hidden lg:inline">Mural da Copa</span>
            </button>

            {/* Saved bookmarks */}
            <button
              onClick={() => setCurrentView('saved')}
              className={`relative p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition ${
                currentView === 'saved' ? 'bg-stone-200 dark:bg-slate-700' : ''
              }`}
              title="Contos salvos para ler depois"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
              title={isDarkMode ? "Turno do Dia (Claro)" : "Turno da Noite (Escuro)"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />}
            </button>

            {/* Export backup */}
            <button
              onClick={onExportAll}
              className="hidden lg:flex items-center gap-1 p-2 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition"
              title="Exportar todos os contos (Backup JSON)"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Write Story CTA */}
            <button
              onClick={() => setCurrentView('editor')}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs sm:text-sm font-bold shadow-sm transition hover:shadow group shrink-0"
            >
              <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:rotate-12" />
              <span>Bater Ponto</span>
            </button>

          </div>

        </div>

        {/* Search bar (mobile) */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar causos da firma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
