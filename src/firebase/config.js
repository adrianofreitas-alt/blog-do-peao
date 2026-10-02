import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configurações do Firebase
// Substitua pelos valores do seu console do Firebase
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "SUA_API_KEY_AQUI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "blog-do-peao.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blog-do-peao",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blog-do-peao.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef"
};

// Verifica se as chaves foram preenchidas
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && firebaseConfig.apiKey !== "SUA_API_KEY_AQUI";
};

let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🔥 Firebase conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o Firebase:", error);
  }
}

export { db };
