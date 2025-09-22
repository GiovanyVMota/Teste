// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/AuthContext';

// --- Styled Components (reutilizados e adaptados) ---
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
`;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

const FormContainer = styled.div`
  z-index: 3;
  text-align: center;
  background-color: rgba(10, 10, 10, 0.7);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  input {
    display: block;
    width: 300px;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #222;
    color: #eee;
    font-size: 1em;
  }
  button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #c8aa6e;
    color: #111;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover { background-color: #f0e6d2; }
  }
`;

const BottomLink = styled.p`
  margin-top: 20px;
  color: #aaa;
  a {
    color: #c8aa6e;
    text-decoration: none;
    font-weight: bold;
    &:hover { text-decoration: underline; }
  }
`;

// --- Componente ---
const RegisterPage = ({ champions, loading }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    if (!loading && champions.length > 0) {
      const timer = setInterval(() => {
        setCurrentBgIndex(prev => (prev + 1) % champions.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [champions, loading]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password);
      navigate('/champions');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError("Este e-mail já está em uso.");
      else if (err.code === 'auth/weak-password') setError("A senha deve ter no mínimo 6 caracteres.");
      else setError("Falha ao criar a conta.");
    }
  };

  if (loading) {
    return <PageContainer><FormContainer><h1>Carregando Campeões...</h1></FormContainer></PageContainer>;
  }

  const backgroundUrl = champions.length > 0 ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[currentBgIndex].id}_0.jpg` : '';

  return (
    <PageContainer>
      <Background key={backgroundUrl} style={{ backgroundImage: `url(${backgroundUrl})` }} />
      <Overlay />
      <FormContainer>
        <h1>Criar Conta</h1>
        <p>Junte-se ao Explorador de Campeões</p>
        <Form onSubmit={handleRegister}>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha (mínimo 6 caracteres)" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Registrar</button>
        </Form>
        <BottomLink>
          Já tem uma conta? <Link to="/">Faça o login</Link>
        </BottomLink>
      </FormContainer>
    </PageContainer>
  );
};

export default RegisterPage;