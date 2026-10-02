import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import StoryCard from './components/StoryCard';
import StoryReader from './components/StoryReader';
import StoryEditor from './components/StoryEditor';
import AnonymousWall from './components/AnonymousWall';
import Footer from './components/Footer';
import { CATEGORIES, DEFAULT_STORIES } from './data/defaultStories';
import { 
  getStoredStories, 
  saveStoredStories, 
  getStoredAnonymousPosts, 
  saveStoredAnonymousPosts, 
  getBookmarks, 
  toggleBookmarkStorage,
  exportStoriesToJson
} from './utils/storage';
import { Coffee, Bookmark, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentView, setCurrentView] = useState('feed'); // 'feed' | 'reader' | 'editor' | 'wall' | 'saved'
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [anonymousPosts, setAnonymousPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    setStories(getStoredStories());
    setBookmarks(getBookmarks());
    setAnonymousPosts(getStoredAnonymousPosts());
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Story click handler
  const handleSelectStory = (story) => {
    setSelectedStory(story);
    setCurrentView('reader');
  };

  // Toggle Bookmark
  const handleToggleBookmark = (storyId) => {
    const updated = toggleBookmarkStorage(storyId);
    setBookmarks(updated);
    if (updated.includes(storyId)) {
      showToast("Conto salvo na sua pasta particular!");
    } else {
      showToast("Conto removido dos salvos.");
    }
  };

  // Add Reaction
  const handleReact = (storyId, reactionType) => {
    const updated = stories.map((s) => {
      if (s.id === storyId) {
        const reactions = s.reactions || { coffee: 0, clown: 0, facepalm: 0, heart: 0 };
        return {
          ...s,
          reactions: {
            ...reactions,
            [reactionType]: (reactions[reactionType] || 0) + 1
          }
        };
      }
      return s;
    });
    setStories(updated);
    saveStoredStories(updated);
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory(updated.find(s => s.id === storyId));
    }
    showToast("Reação corporativa computada!");
  };

  // Add Comment
  const handleAddComment = (storyId, comment) => {
    const updated = stories.map((s) => {
      if (s.id === storyId) {
        return {
          ...s,
          comments: [comment, ...(s.comments || [])]
        };
      }
      return s;
    });
    setStories(updated);
    saveStoredStories(updated);
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory(updated.find(s => s.id === storyId));
    }
    showToast("Seu causo/comentário foi publicado com sucesso!");
  };

  // Save new Story from Editor
  const handleSaveStory = (newStory) => {
    const updated = [newStory, ...stories];
    setStories(updated);
    saveStoredStories(updated);
    setSelectedStory(newStory);
    setCurrentView('reader');
    showToast("🎉 Ponto batido! Seu novo conto foi publicado com louvor.");
  };

  // Add anonymous wall post
  const handleAddAnonymousPost = (post) => {
    const updated = [post, ...anonymousPosts];
    setAnonymousPosts(updated);
    saveStoredAnonymousPosts(updated);
    showToast("📌 Micro-causo fixado no Mural da Copa!");
  };

  // Like anonymous wall post
  const handleLikeAnonymousPost = (postId) => {
    const updated = anonymousPosts.map(p => {
      if (p.id === postId) {
        return { ...p, reactions: (p.reactions || 0) + 1 };
      }
      return p;
    });
    setAnonymousPosts(updated);
    saveStoredAnonymousPosts(updated);
  };

  // Reset default stories
  const handleResetDefaultStories = () => {
    if (window.confirm("Deseja restaurar as histórias originais do Blog do Peão?")) {
      setStories(DEFAULT_STORIES);
      saveStoredStories(DEFAULT_STORIES);
      setSelectedStory(null);
      setCurrentView('feed');
      showToast("Contos originais restaurados!");
    }
  };

  // Export all stories
  const handleExportAll = () => {
    exportStoriesToJson(stories);
    showToast("Backup baixado com sucesso!");
  };

  // Filtered stories logic
  const filteredStories = stories.filter((story) => {
    // Category match
    const matchesCategory = selectedCategory === 'Todos' || story.category === selectedCategory;
    
    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      story.title.toLowerCase().includes(query) ||
      story.summary.toLowerCase().includes(query) ||
      story.content.toLowerCase().includes(query) ||
      story.author?.name.toLowerCase().includes(query) ||
      story.category.toLowerCase().includes(query);

    // Bookmarked filter if in saved view
    const matchesSaved = currentView !== 'saved' || bookmarks.includes(story.id);

    return matchesCategory && matchesSearch && matchesSaved;
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-stone-900 text-white dark:bg-amber-600 shadow-2xl animate-bounce text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-amber-400 dark:text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view === 'feed') setSelectedStory(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        bookmarksCount={bookmarks.length}
        onExportAll={handleExportAll}
      />

      {/* Content depending on current view */}
      <div className="flex-1">
        {currentView === 'reader' && selectedStory ? (
          <StoryReader
            story={selectedStory}
            onBack={() => {
              setSelectedStory(null);
              setCurrentView('feed');
            }}
            onReact={handleReact}
            onAddComment={handleAddComment}
            isBookmarked={bookmarks.includes(selectedStory.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : currentView === 'editor' ? (
          <StoryEditor
            onSaveStory={handleSaveStory}
            onCancel={() => setCurrentView('feed')}
          />
        ) : currentView === 'wall' ? (
          <AnonymousWall
            posts={anonymousPosts}
            onAddPost={handleAddAnonymousPost}
            onLikePost={handleLikeAnonymousPost}
          />
        ) : (
          /* Feed View & Saved View */
          <div>
            {currentView === 'saved' ? (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-4">
                <div className="flex items-center gap-2 mb-2 text-amber-600">
                  <Bookmark className="w-5 h-5 fill-current" />
                  <span className="text-xs font-bold uppercase tracking-wider">Pasta Secreta</span>
                </div>
                <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
                  Contos Salvos ({filteredStories.length})
                </h1>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Os causos que você marcou para ler no horário do almoço ou no transporte público.
                </p>
              </div>
            ) : (
              <HeroBanner
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={CATEGORIES}
              />
            )}

            {/* Stories Grid */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
              {filteredStories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onSelectStory={handleSelectStory}
                      isBookmarked={bookmarks.includes(story.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-slate-800 flex items-center justify-center text-3xl mx-auto mb-4">
                    🔍
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                    Nenhum causo encontrado
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">
                    {searchQuery
                      ? `Não encontramos nenhum resultado para "${searchQuery}". Tente buscar por outros termos como café, reunião ou TI.`
                      : currentView === 'saved'
                      ? "Você ainda não salvou nenhum causo. Clique no ícone de marcador nos contos para ler mais tarde!"
                      : "Nenhum conto cadastrado nesta categoria ainda. Que tal ser o pioneiro?"}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Todos');
                      setCurrentView('feed');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition"
                  >
                    Ver todos os causos
                  </button>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view === 'feed') setSelectedStory(null);
        }}
        onResetDefaultStories={handleResetDefaultStories}
      />

    </div>
  );
}
