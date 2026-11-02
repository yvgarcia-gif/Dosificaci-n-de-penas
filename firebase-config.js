/**
 * IURISDOSIS COLOMBIA — CONFIGURACIÓN DE GOOGLE FIREBASE FIRESTORE
 * Base de Datos en Tiempo Real (100% Client-Side sin servidor)
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA3epXJ2N0BJfajdvrO4fp_oDRA3FKiWnQ",
  authDomain: "dosificacion--penas.firebaseapp.com",
  projectId: "dosificacion--penas",
  storageBucket: "dosificacion--penas.firebasestorage.app",
  messagingSenderId: "517407652751",
  appId: "1:517407652751:web:9e09fe13acb8110ea9e9fa"
};

// Conexión activa a Firestore
window.ElectivaFirebase = {
  isConfigured: true,
  config: FIREBASE_CONFIG
};
