// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a home após o logout
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="main-title">Explorador de Campeões de LoL</h1>
        <div className="auth-section">
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="auth-button">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="auth-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
