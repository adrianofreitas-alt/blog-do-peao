import { DEFAULT_STORIES, DEFAULT_ANONYMOUS_POSTS } from '../data/defaultStories';

const STORAGE_KEY = 'blog_do_peao_stories';
const ANONYMOUS_KEY = 'blog_do_peao_anonymous';
const BOOKMARKS_KEY = 'blog_do_peao_bookmarks';

export function getStoredStories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STORIES));
      return DEFAULT_STORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_STORIES;
  } catch (e) {
    console.error("Erro ao carregar histórias do LocalStorage", e);
    return DEFAULT_STORIES;
  }
}

export function saveStoredStories(stories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  } catch (e) {
    console.error("Erro ao salvar histórias no LocalStorage", e);
  }
}

export function getStoredAnonymousPosts() {
  try {
    const raw = localStorage.getItem(ANONYMOUS_KEY);
    if (!raw) {
      localStorage.setItem(ANONYMOUS_KEY, JSON.stringify(DEFAULT_ANONYMOUS_POSTS));
      return DEFAULT_ANONYMOUS_POSTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_ANONYMOUS_POSTS;
  }
}

export function saveStoredAnonymousPosts(posts) {
  try {
    localStorage.setItem(ANONYMOUS_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error("Erro ao salvar mural anônimo", e);
  }
}

export function getBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleBookmarkStorage(storyId) {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(storyId);
  let newBookmarks;
  if (index >= 0) {
    newBookmarks = bookmarks.filter(id => id !== storyId);
  } else {
    newBookmarks = [...bookmarks, storyId];
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  return newBookmarks;
}

export function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const words = (text || '').trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

export function exportStoriesToJson(stories) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stories, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `blog-do-peao-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportStoryToMarkdown(story) {
  const mdContent = `---
title: "${story.title}"
category: "${story.category}"
author: "${story.author.name}"
role: "${story.author.role}"
date: "${story.date}"
summary: "${story.summary}"
readTime: "${story.readTime}"
---

# ${story.title}

*Por ${story.author.name} (${story.author.role}) em ${story.date} • ${story.readTime} de leitura*

> ${story.summary}

---

${story.content}
`;

  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", url);
  downloadAnchor.setAttribute("download", `${story.slug || 'conto-peao'}.md`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(url);
}
