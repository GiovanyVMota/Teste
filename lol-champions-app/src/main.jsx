// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { BackgroundProvider } from './context/BackgroundContext';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styles/GlobalStyle'; // Importa os estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle /> {/* Adiciona os estilos globais à aplicação */}
    <BrowserRouter>
      <AuthProvider>
        <BackgroundProvider>
          <App />
        </BackgroundProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);