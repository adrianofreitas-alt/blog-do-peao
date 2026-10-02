import React from 'react';
import { Clock, Calendar, Bookmark, MessageSquare, Coffee, Laugh, Frown } from 'lucide-react';

export default function StoryCard({ story, onSelectStory, isBookmarked, onToggleBookmark }) {
  const totalReactions = (story.reactions?.coffee || 0) + 
                         (story.reactions?.clown || 0) + 
                         (story.reactions?.facepalm || 0);

  return (
    <article 
      onClick={() => onSelectStory(story)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-amber-400/60 dark:hover:border-amber-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top meta & category */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/30">
            {story.coverEmoji && <span>{story.coverEmoji}</span>}
            <span>{story.category}</span>
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {story.readTime}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(story.id);
              }}
              className={`p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition ${
                isBookmarked ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400 hover:text-stone-600'
              }`}
              title={isBookmarked ? "Remover dos salvos" : "Salvar para ler depois"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-xl sm:text-2xl text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug mb-2.5">
          {story.title}
        </h3>

        {/* Summary */}
        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-3 mb-6 font-normal">
          {story.summary}
        </p>
      </div>

      {/* Footer info: Author Badge & Reactions */}
      <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
        
        {/* Author badge */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-base shrink-0 border border-stone-200 dark:border-slate-700">
            {story.author?.avatar || "👔"}
          </div>
          <div className="truncate">
            <p className="font-semibold text-stone-800 dark:text-stone-200 truncate">
              {story.author?.name || "Peão Anônimo"}
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-500 truncate">
              {story.author?.role || "CLT Padrão"}
            </p>
          </div>
        </div>

        {/* Reaction badge pill */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-300 font-medium">
            <span>☕</span>
            <span>{totalReactions}</span>
          </span>
          {story.comments?.length > 0 && (
            <span className="flex items-center gap-1 text-stone-400">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{story.comments.length}</span>
            </span>
          )}
        </div>

      </div>
    </article>
  );
}
