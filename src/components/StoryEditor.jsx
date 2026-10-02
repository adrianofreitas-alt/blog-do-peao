import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit3, 
  Sparkles, 
  Bold, 
  Italic, 
  Heading, 
  Quote, 
  List, 
  Download,
  AlertCircle
} from 'lucide-react';
import { marked } from 'marked';
import { calculateReadTime } from '../utils/storage';

const RANDOM_NICKNAMES = [
  { name: "Peão CLT Nível 5", role: "Especialista em Café Quente", avatar: "☕" },
  { name: "Estagiário da Ansiedade", role: "Sobrevivente do Suporte", avatar: "💻" },
  { name: "Fiscal de Tupperware", role: "Auditor da Geladeira da Copa", avatar: "🍲" },
  { name: "Analista do Desespero", role: "Mestre do PROCV sem Mouse", avatar: "📊" },
  { name: "Peão Gourmet", role: "Arquiteto de Desculpas no Teams", avatar: "👔" },
  { name: "Operador de Fofoca", role: "Correspondente Oficial da Escada", avatar: "🤫" }
];

export default function StoryEditor({ onSaveStory, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Copa & Café');
  const [coverEmoji, setCoverEmoji] = useState('☕');
  const [authorName, setAuthorName] = useState('Peão Anônimo');
  const [authorRole, setAuthorRole] = useState('Analista de Sobrevivência');
  const [authorAvatar, setAuthorAvatar] = useState('☕');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  
  // Editor mode: 'split', 'write', 'preview'
  const [editorMode, setEditorMode] = useState('split');
  const [errorMessage, setErrorMessage] = useState('');

  const generateRandomAuthor = () => {
    const random = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
    setAuthorName(random.name);
    setAuthorRole(random.role);
    setAuthorAvatar(random.avatar);
  };

  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.getElementById('story-content-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = prefix + (selected || 'texto') + suffix;
    
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || 'texto').length);
    }, 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Por favor, informe o título do seu conto.');
      return;
    }
    if (!content.trim()) {
      setErrorMessage('Escreva o conteúdo do conto para poder publicar.');
      return;
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newStory = {
      id: 'story_' + Date.now(),
      title: title.trim(),
      slug: slug || `conto-${Date.now()}`,
      category,
      coverEmoji,
      date: new Date().toLocaleDateString('pt-BR'),
      readTime: calculateReadTime(content),
      author: {
        name: authorName.trim() || 'Peão Anônimo',
        role: authorRole.trim() || 'CLT Padrão',
        avatar: authorAvatar || '☕'
      },
      summary: summary.trim() || title.trim(),
      content: content.trim(),
      status: 'pending',
      reactions: { coffee: 1, clown: 0, facepalm: 0, heart: 1 },
      comments: []
    };

    onSaveStory(newStory);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-slate-800 gap-4">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancelar</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-600/30 transition hover:scale-[1.02] active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Publicar</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-4 p-3 rounded-lg bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        
        {/* Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-stone-100/70 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700">
          
          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="Copa & Café">🍲 Copa & Café</option>
              <option value="Reuniões Intermináveis">⏳ Reuniões Intermináveis</option>
              <option value="Gambiarras de TI">💻 Gambiarras de TI</option>
              <option value="RH & Dinâmicas">🎭 RH & Dinâmicas</option>
              <option value="Hora Extra">🌙 Hora Extra</option>
              <option value="Diretoria & Ideias">👔 Diretoria & Ideias</option>
            </select>
          </div>

          {/* Emoji Cover */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Ícone / Emoji
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={2}
                value={coverEmoji}
                onChange={(e) => setCoverEmoji(e.target.value)}
                className="w-14 text-center text-xl py-1 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <div className="flex items-center gap-1 text-base">
                {['☕', '🧊', '⏳', '🚨', '🤡', '📉', '💼'].map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setCoverEmoji(emoji)}
                    className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Author Pseudonym */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Crachá do Autor
              </label>
              <button
                type="button"
                onClick={generateRandomAuthor}
                className="text-[11px] text-amber-600 hover:text-amber-500 dark:text-amber-400 font-semibold flex items-center gap-1"
                title="Sortear codinome engraçado"
              >
                <Sparkles className="w-3 h-3" />
                <span>Sortear</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Codinome"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:ring-1 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Cargo da Firma"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

        </div>

        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Título impactante do causo... (ex: O Dia em que o Ar-condicionado Pingou no Teclado do Diretor)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-xl sm:text-2xl font-bold rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-white placeholder:text-stone-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Executive Summary */}
        <div>
          <textarea
            rows={2}
            placeholder="Resumo executivo / Sinopse rápida do conto (aparece no feed)..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-stone-200 placeholder:text-stone-400 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
          />
        </div>

        {/* Content Toolbar & Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-stone-100 dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition"
              title="Negrito"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition"
              title="Itálico"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('### ')}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition"
              title="Título de seção"
            >
              <Heading className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ')}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition"
              title="Citação corporativa"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('- ')}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition"
              title="Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              {calculateReadTime(content)} de leitura ({content.trim().split(/\s+/).filter(Boolean).length} palavras)
            </span>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-200 dark:bg-slate-700 p-0.5 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setEditorMode('write')}
                className={`px-2.5 py-1 rounded-md transition ${editorMode === 'write' ? 'bg-white dark:bg-slate-900 shadow-sm text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-600 dark:text-stone-300'}`}
              >
                Escrever
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('split')}
                className={`hidden md:block px-2.5 py-1 rounded-md transition ${editorMode === 'split' ? 'bg-white dark:bg-slate-900 shadow-sm text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-600 dark:text-stone-300'}`}
              >
                Lado a Lado
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('preview')}
                className={`px-2.5 py-1 rounded-md transition ${editorMode === 'preview' ? 'bg-white dark:bg-slate-900 shadow-sm text-amber-600 dark:text-amber-400 font-bold' : 'text-stone-600 dark:text-stone-300'}`}
              >
                Prévia
              </button>
            </div>
          </div>
        </div>

        {/* Content Writing Area & Split Preview */}
        <div className={`grid gap-4 ${editorMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          
          {/* Write Textarea */}
          {(editorMode === 'write' || editorMode === 'split') && (
            <div>
              <textarea
                id="story-content-area"
                rows={18}
                placeholder="Escreva seu conto aqui usando Markdown. Use parágrafos, diálogos, > citações da chefia..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[520px] p-4 text-sm font-mono rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-white placeholder:text-stone-400 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none leading-relaxed"
              />
            </div>
          )}

          {/* Realtime Live Preview */}
          {(editorMode === 'preview' || editorMode === 'split') && (
            <div className="h-[520px] overflow-y-auto p-6 rounded-xl bg-stone-50/70 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-3">
                Pré-visualização do Conto:
              </span>
              {content.trim() ? (
                <div 
                  className="prose-peao text-sm"
                  dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-stone-400 italic">
                  A prévia do seu texto aparecerá aqui conforme você digita...
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-3 mt-6 pt-6 border-t border-stone-200 dark:border-slate-800">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold shadow-md shadow-amber-600/30 transition hover:scale-[1.02] active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span>Publicar</span>
          </button>
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center max-w-md">
            O texto só será publicado mediante revisão da chefia. Esta medida serve para evitar textos ofensivos e impróprios.
          </p>
        </div>

      </form>
    </div>
  );
}
