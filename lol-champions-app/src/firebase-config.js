// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Substitua o objeto abaixo pelas credenciais do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOG0u112X8VNRSK8NiEEKy8QdsvM2kwNs",
  authDomain: "lol-champions-app.firebaseapp.com",
  projectId: "lol-champions-app",
  storageBucket: "lol-champions-app.firebasestorage.app",
  messagingSenderId: "157404210561",
  appId: "1:157404210561:web:d56c49646cbdd3658ef480",
  measurementId: "G-Q7HP6ZF7QT"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância de autenticação para ser usada em outros lugares
export const auth = getAuth(app);