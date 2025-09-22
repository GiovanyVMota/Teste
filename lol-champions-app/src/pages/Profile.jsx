// src/pages/Profile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redireciona para a tela de login após o logout
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil do Usuário</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={handleLogout} className="logout-button">
        Sair (Logout)
      </button>
    </div>
  );
};

export default ProfilePage;