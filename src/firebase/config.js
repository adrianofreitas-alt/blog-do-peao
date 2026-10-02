import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configurações do Firebase do Blog do Peão
export const firebaseConfig = {
  apiKey: "AIzaSyAQ3lwX7Lo_gjYzRy2WvpGQ0j32sXWcj-U",
  authDomain: "blog-do-peao.firebaseapp.com",
  projectId: "blog-do-peao",
  storageBucket: "blog-do-peao.firebasestorage.app",
  messagingSenderId: "321010242466",
  appId: "1:321010242466:web:9c1c82e9a2e885e79a98fb",
  measurementId: "G-71Q4L4DP2C"
};

// Verifica se as chaves foram preenchidas
export const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== "SUA_API_KEY_AQUI");
};

let app = null;
let db = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🔥 Firebase conectado com sucesso ao projeto blog-do-peao!");
  } catch (error) {
    console.error("Erro ao inicializar o Firebase:", error);
  }
}

export { db };
