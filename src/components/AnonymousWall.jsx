import React, { useState } from 'react';
import { MessageSquareQuote, Send, Flame, Coffee, Sparkles } from 'lucide-react';

export default function AnonymousWall({ posts, onAddPost, onLikePost }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= 280) {
      setText(val);
      setCharacterCount(val.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newPost = {
      id: 'm_' + Date.now(),
      author: author.trim() || 'Colega de Baia',
      date: 'Agora pouco',
      text: text.trim(),
      reactions: 1
    };

    onAddPost(newPost);
    setText('');
    setAuthor('');
    setCharacterCount(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-3">
          <MessageSquareQuote className="w-4 h-4 text-amber-600" />
          <span>Rádio Peão Oficial</span>
        </div>
        <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white mb-2">
          Mural da Copa
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Aquele micro-causo rápido de até 280 caracteres que você só contaria na fila do micro-ondas ou descendo a escada de emergência. 100% sigiloso.
        </p>
      </div>

      {/* Post Submission Box */}
      <form onSubmit={handleSubmit} className="mb-10 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Seu codinome da firma (ex: Peão da Baia 8, Estagiário do Almoxarifado)..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 mb-2.5"
          />
          <textarea
            rows={3}
            placeholder="O que rolou na sua firma hoje? Solta o verbo sem medo do RH..."
            value={text}
            onChange={handleTextChange}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs font-mono ${characterCount > 250 ? 'text-amber-600 font-bold' : 'text-stone-400'}`}>
            {characterCount}/280 caracteres
          </span>
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Colar no Mural</span>
          </button>
        </div>
      </form>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-400/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <span>📌</span>
                  <span>{post.author}</span>
                </span>
                <span className="text-stone-400">{post.date}</span>
              </div>
              <p className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed mb-4">
                "{post.text}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-stone-400 italic">
                Causo verídico de repartição
              </span>
              <button
                onClick={() => onLikePost(post.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-stone-600 dark:text-stone-300 hover:text-amber-600 transition text-xs font-medium"
                title="Concordo plenamente"
              >
                <span>☕</span>
                <span>{post.reactions || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
