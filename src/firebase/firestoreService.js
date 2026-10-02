import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  increment, 
  arrayUnion, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { DEFAULT_STORIES, DEFAULT_ANONYMOUS_POSTS } from '../data/defaultStories';
import { 
  getStoredStories, 
  saveStoredStories, 
  getStoredAnonymousPosts, 
  saveStoredAnonymousPosts 
} from '../utils/storage';

const STORIES_COLLECTION = 'stories';
const MURAL_COLLECTION = 'mural';

// ========================
// CONTOS (STORIES)
// ========================

export async function fetchStoriesFromDb() {
  if (!isFirebaseConfigured() || !db) {
    return getStoredStories();
  }

  try {
    const storiesCol = collection(db, STORIES_COLLECTION);
    const snapshot = await getDocs(storiesCol);

    if (snapshot.empty) {
      // Semeia o Firestore com os contos padrão da firma
      console.log("🌱 Semeando contos padrão no Firebase Firestore...");
      for (const story of DEFAULT_STORIES) {
        await setDoc(doc(db, STORIES_COLLECTION, story.id), story);
      }
      return DEFAULT_STORIES;
    }

    const stories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    saveStoredStories(stories); // sincroniza cache local
    return stories;
  } catch (error) {
    console.warn("Aviso ao buscar contos do Firebase, usando dados locais:", error);
    return getStoredStories();
  }
}

export async function saveStoryToDb(story) {
  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, STORIES_COLLECTION, story.id), story);
      console.log("✅ Conto salvo no Firebase!");
    } catch (error) {
      console.error("Erro ao salvar no Firebase:", error);
    }
  }
}

export async function reactToStoryInDb(storyId, reactionType) {
  if (isFirebaseConfigured() && db) {
    try {
      const storyRef = doc(db, STORIES_COLLECTION, storyId);
      await updateDoc(storyRef, {
        [`reactions.${reactionType}`]: increment(1)
      });
    } catch (error) {
      console.error("Erro ao registrar reação no Firebase:", error);
    }
  }
}

export async function addCommentToStoryInDb(storyId, comment) {
  if (isFirebaseConfigured() && db) {
    try {
      const storyRef = doc(db, STORIES_COLLECTION, storyId);
      await updateDoc(storyRef, {
        comments: arrayUnion(comment)
      });
    } catch (error) {
      console.error("Erro ao adicionar comentário no Firebase:", error);
    }
  }
}

export async function updateStoryStatusInDb(storyId, status) {
  if (isFirebaseConfigured() && db) {
    try {
      const storyRef = doc(db, STORIES_COLLECTION, storyId);
      await updateDoc(storyRef, { status });
      console.log(`✅ Status do conto ${storyId} atualizado para ${status} no Firebase!`);
    } catch (error) {
      console.error("Erro ao atualizar status no Firebase:", error);
    }
  }
}

export async function deleteStoryFromDb(storyId) {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, STORIES_COLLECTION, storyId));
      console.log(`🗑️ Conto ${storyId} deletado do Firebase!`);
    } catch (error) {
      console.error("Erro ao deletar conto no Firebase:", error);
    }
  }
}

// ========================
// MURAL DA COPA (MICRO-CAUSOS)
// ========================

export async function fetchMuralFromDb() {
  if (!isFirebaseConfigured() || !db) {
    return getStoredAnonymousPosts();
  }

  try {
    const muralCol = collection(db, MURAL_COLLECTION);
    const snapshot = await getDocs(muralCol);

    if (snapshot.empty) {
      for (const post of DEFAULT_ANONYMOUS_POSTS) {
        await setDoc(doc(db, MURAL_COLLECTION, post.id), post);
      }
      return DEFAULT_ANONYMOUS_POSTS;
    }

    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    saveStoredAnonymousPosts(posts);
    return posts;
  } catch (error) {
    console.warn("Aviso ao buscar mural do Firebase:", error);
    return getStoredAnonymousPosts();
  }
}

export async function saveMuralPostToDb(post) {
  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, MURAL_COLLECTION, post.id), post);
    } catch (error) {
      console.error("Erro ao salvar no mural do Firebase:", error);
    }
  }
}

export async function likeMuralPostInDb(postId) {
  if (isFirebaseConfigured() && db) {
    try {
      const postRef = doc(db, MURAL_COLLECTION, postId);
      await updateDoc(postRef, {
        reactions: increment(1)
      });
    } catch (error) {
      console.error("Erro ao curtir post no Firebase:", error);
    }
  }
}
