import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  ArrowLeft, 
  LogOut, 
  Clock, 
  AlertTriangle,
  FileText,
  User,
  X,
  Coffee
} from 'lucide-react';
import { marked } from 'marked';

export default function AdminPanel({ 
  stories, 
  onApproveStory, 
  onDeleteStory, 
  onUnpublishStory,
  onBackToBlog 
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'published'
  const [previewStory, setPreviewStory] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'expressofiao' && password.trim() === '171') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Login ou senha da Chefia inválidos. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setUsername('');
    setPassword('');
  };

  // Filter stories by status
  const pendingStories = stories.filter(s => s.status === 'pending');
  const publishedStories = stories.filter(s => s.status === 'published' || !s.status);

  // If not authenticated, show discreet login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl">
          
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBackToBlog}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Blog</span>
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-800 text-stone-500">
              Acesso Restrito
            </span>
          </div>

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-stone-900 dark:bg-amber-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-white">
              Sala da Chefia
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Controle de moderação e aprovação dos causos da firma.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuário da chefia"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-bold text-sm shadow-md transition"
            >
              Entrar na Sala da Chefia
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                Painel da Chefia
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Logado
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Revise, leia, aprove ou delete contos enviados pelos peões.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToBlog}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Blog</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-semibold transition"
            title="Sair da sessão administrativa"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 my-6 border-b border-stone-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-bold border-b-2 transition ${
            activeTab === 'pending'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <span>⏳ Pendentes para Aprovação</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            pendingStories.length > 0
              ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
              : 'bg-stone-100 text-stone-500 dark:bg-slate-800'
          }`}>
            {pendingStories.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('published')}
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-bold border-b-2 transition ${
            activeTab === 'published'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <span>✅ Já Publicados (No Ar)</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-500 dark:bg-slate-800">
            {publishedStories.length}
          </span>
        </button>
      </div>

      {/* Stories List according to tab */}
      {activeTab === 'pending' ? (
        <div>
          {pendingStories.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                Nenhum causo pendente no momento!
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mt-1">
                Todos os contos enviados já foram revisados e aprovados pela Chefia.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingStories.map((story) => (
                <div 
                  key={story.id}
                  className="p-5 rounded-2xl bg-amber-50/50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase bg-amber-200 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
                        {story.category}
                      </span>
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {story.date}
                      </span>
                      <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                        • Autor: {story.author?.name} ({story.author?.role})
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-1">
                      {story.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {story.summary}
                    </p>
                  </div>

                  {/* Actions for Pending Story */}
                  <div className="flex items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-stone-200 dark:border-slate-800">
                    <button
                      onClick={() => setPreviewStory(story)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition"
                      title="Ler conto na íntegra"
                    >
                      <Eye className="w-4 h-4 text-amber-600" />
                      <span>Ler Conto</span>
                    </button>

                    <button
                      onClick={() => onApproveStory(story.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition hover:scale-105 active:scale-95"
                      title="Aprovar e publicar conto no blog"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Publicar</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Tem certeza que deseja deletar o conto "${story.title}"?`)) {
                          onDeleteStory(story.id);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-950/50 dark:hover:bg-red-900 text-red-700 dark:text-red-300 text-xs font-semibold transition"
                      title="Deletar causo"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Deletar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Published Stories Tab */
        <div className="space-y-4">
          {publishedStories.map((story) => (
            <div 
              key={story.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300">
                    {story.category}
                  </span>
                  <span className="text-xs text-stone-400">
                    Por {story.author?.name} em {story.date}
                  </span>
                </div>
                <h3 className="font-bold text-base text-stone-900 dark:text-white">
                  {story.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPreviewStory(story)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver</span>
                </button>

                <button
                  onClick={() => onUnpublishStory(story.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-medium transition"
                  title="Voltar para pendente (oculta do público)"
                >
                  <span>Ocultar</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Tem certeza que deseja deletar "${story.title}"?`)) {
                      onDeleteStory(story.id);
                    }
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-medium transition"
                  title="Deletar definitivamente"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Leitura Completa da Chefia */}
      {previewStory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-1 inline-block">
                  {previewStory.category} • Avaliação da Chefia
                </span>
                <h3 className="font-bold text-lg text-stone-900 dark:text-white leading-snug">
                  {previewStory.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewStory(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 hover:text-stone-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 font-serif text-sm leading-relaxed text-stone-800 dark:text-stone-200">
              <div className="mb-4 p-3 rounded-xl bg-stone-100 dark:bg-slate-800/60 text-xs font-sans text-stone-600 dark:text-stone-400">
                <strong>Autor:</strong> {previewStory.author?.name} ({previewStory.author?.role}) • <strong>Data:</strong> {previewStory.date}
              </div>
              <div 
                className="prose-peao text-sm"
                dangerouslySetInnerHTML={{ __html: marked.parse(previewStory.content || '') }}
              />
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setPreviewStory(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-800 transition"
              >
                Fechar
              </button>

              {previewStory.status === 'pending' && (
                <button
                  onClick={() => {
                    onApproveStory(previewStory.id);
                    setPreviewStory(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aprovar e Publicar</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (window.confirm(`Deletar este conto permanentemente?`)) {
                    onDeleteStory(previewStory.id);
                    setPreviewStory(null);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Deletar</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
