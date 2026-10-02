import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Bookmark, 
  Download, 
  Share2, 
  Send, 
  MessageSquare, 
  Check, 
  Coffee,
  Heart,
  Type
} from 'lucide-react';
import { marked } from 'marked';
import { exportStoryToMarkdown } from '../utils/storage';

export default function StoryReader({ 
  story, 
  onBack, 
  onReact, 
  onAddComment, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0: sm, 1: base, 2: lg
  const [copiedShare, setCopiedShare] = useState(false);

  // Comment input state
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [story.id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: 'c_' + Date.now(),
      author: commentName.trim() || 'Colega de Baia',
      role: commentRole.trim() || 'Sobrevivente da Firma',
      text: commentText.trim(),
      date: 'Hoje'
    };

    onAddComment(story.id, newComment);
    setCommentText('');
    setCommentName('');
    setCommentRole('');
  };

  const fontSizeClasses = [
    'text-base leading-relaxed',
    'text-lg leading-8',
    'text-xl leading-9'
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Top sticky reading progress bar */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Reader Control Header */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 py-3 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos contos</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font size toggle */}
            <button
              onClick={() => setFontSizeLevel((prev) => (prev + 1) % 3)}
              className="flex items-center gap-1 p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 text-xs font-mono transition"
              title="Ajustar tamanho da fonte"
            >
              <Type className="w-4 h-4" />
              <span>{fontSizeLevel === 0 ? 'P' : fontSizeLevel === 1 ? 'M' : 'G'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(story.id)}
              className={`p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-slate-800 transition ${
                isBookmarked ? 'text-amber-600 dark:text-amber-400' : 'text-stone-600 dark:text-stone-300'
              }`}
              title={isBookmarked ? "Remover dos salvos" : "Salvar conto"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Download as Markdown */}
            <button
              onClick={() => exportStoryToMarkdown(story)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
              title="Baixar conto em Markdown (.md)"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-slate-700 text-xs font-medium transition"
              title="Copiar link"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Story Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        
        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
            {story.coverEmoji && <span className="mr-1">{story.coverEmoji}</span>}
            {story.category}
          </span>
          <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {story.readTime} de leitura
          </span>
        </div>

        {/* Title */}
        <h1 className="font-sans font-black text-3xl sm:text-5xl text-stone-900 dark:text-white leading-[1.2] tracking-tight mb-6">
          {story.title}
        </h1>

        {/* Author "Crachá" Card */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-stone-100/80 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-700/60 mb-8 backdrop-blur-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl">
              {story.author?.avatar || "☕"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
                  {story.author?.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-stone-200 dark:bg-slate-700 text-stone-600 dark:text-stone-300">
                  Autor
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {story.author?.role}
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-stone-400 dark:text-stone-500">
            <div className="flex items-center gap-1 justify-end font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{story.date}</span>
            </div>
            <span className="text-[11px] block mt-0.5">Ponto registrado</span>
          </div>
        </div>

        {/* Executive Summary / Sinopse */}
        <div className="border-l-4 border-amber-500 pl-4 py-1 mb-10 text-stone-600 dark:text-stone-300 italic text-base sm:text-lg bg-amber-50/50 dark:bg-slate-800/30 rounded-r-lg">
          {story.summary}
        </div>

        {/* Story Body with Markdown Parser */}
        <div 
          className={`prose-peao ${fontSizeClasses[fontSizeLevel]}`}
          dangerouslySetInnerHTML={{ __html: marked.parse(story.content || '') }}
        />

        {/* Reactions Section */}
        <div className="mt-14 pt-8 border-t border-stone-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-2 uppercase tracking-wider">
            Reações do expediente:
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Como você reagiria se esse causo acontecesse na sua firma?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => onReact(story.id, 'coffee')}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">☕</span>
              <div className="text-left">
                <span className="block text-xs font-semibold text-stone-800 dark:text-stone-200">Pede Café</span>
                <span className="text-[11px] text-stone-500 font-mono">{story.reactions?.coffee || 0}</span>
              </div>
            </button>

            <button
              onClick={() => onReact(story.id, 'clown')}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">🤡</span>
              <div className="text-left">
                <span className="block text-xs font-semibold text-stone-800 dark:text-stone-200">Rir de Nervoso</span>
                <span className="text-[11px] text-stone-500 font-mono">{story.reactions?.clown || 0}</span>
              </div>
            </button>

            <button
              onClick={() => onReact(story.id, 'facepalm')}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">🤦‍♂️</span>
              <div className="text-left">
                <span className="block text-xs font-semibold text-stone-800 dark:text-stone-200">Vergonha Alheia</span>
                <span className="text-[11px] text-stone-500 font-mono">{story.reactions?.facepalm || 0}</span>
              </div>
            </button>

            <button
              onClick={() => onReact(story.id, 'heart')}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">❤️</span>
              <div className="text-left">
                <span className="block text-xs font-semibold text-stone-800 dark:text-stone-200">Solidariedade</span>
                <span className="text-[11px] text-stone-500 font-mono">{story.reactions?.heart || 0}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <section className="mt-14 pt-8 border-t border-stone-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                Comentários da Rádio Peão ({story.comments?.length || 0})
              </h3>
            </div>
            <span className="text-xs text-stone-400">Totalmente anônimo</span>
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 p-4 rounded-xl bg-stone-100/70 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Seu codinome (ex: Analista da Baia 3)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Seu setor (ex: Contabilidade do Pânico)"
                value={commentRole}
                onChange={(e) => setCommentRole(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Deixe seu comentário ou compartilhe o que aconteceu na sua firma..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none mb-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Soltar o Verbo</span>
              </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-4">
            {story.comments && story.comments.length > 0 ? (
              story.comments.map((c) => (
                <div 
                  key={c.id} 
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white">
                        {c.author}
                      </span>
                      {c.role && (
                        <span className="text-[11px] text-stone-400">
                          • {c.role}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-400">{c.date}</span>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                    {c.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-400 italic text-center py-6">
                Nenhum peão se manifestou ainda. Seja o primeiro a soltar o verbo!
              </p>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
