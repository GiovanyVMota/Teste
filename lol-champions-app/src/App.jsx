// src/App.jsx
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Componentes e Páginas
import ChampionCard from './components/ChampionCard';
import ChampionDetails from './pages/ChampionDetails';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/Profile';

// Novas páginas
import BuildsPage from './pages/BuildsPage';
import CountersPage from './pages/CountersPage';

// Contextos
import { BackgroundContext } from './context/BackgroundContext';
import { useAuth } from './context/AuthContext';

// --- Styled Components ---
const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const MainContent = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #f0e6d2;
`;

const ProfileNav = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  background-color: #c8aa6e;
  color: #111;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover { background-color: #f0e6d2; }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  font-size: 1em;
  border-radius: 25px;
  border: 1px solid #444;
  background-color: #222;
  color: #eee;
  outline: none;
`;

const ChampionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  align-items: stretch;
  &:hover a { opacity: 0.1; }
`;

const NavBar = styled.nav`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #f0e6d2;
  font-weight: bold;
  &:hover { color: #c8aa6e; }
`;

// --- HomePage Componente ---
const HomePage = ({ champions, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const filteredChampions = champions.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Header>
        <HeaderContent>
          <Title>Explorador de Campeões</Title>
          {user && <ProfileNav><ProfileLink to="/profile">Ver Perfil</ProfileLink></ProfileNav>}
        </HeaderContent>
      </Header>
      <SearchContainer>
        <SearchInput
          placeholder="Buscar por nome do campeão..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ChampionsGrid>
          {filteredChampions.map(champion => <ChampionCard champion={champion} key={champion.id} />)}
        </ChampionsGrid>
      )}
    </>
  );
};

// --- App Componente ---
function App() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backgroundImage } = useContext(BackgroundContext);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.1.1/data/pt_BR/champion.json`);
        setChampions(Object.values(response.data.data));
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os campeões.");
      } finally {
        setLoading(false);
      }
    };
    fetchChampions();
  }, []);

  return (
    <>
      <BackgroundContainer style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }} />
      <AppContainer>
        <MainContent>

          {/* Navegação para novas páginas */}
          <NavBar>
            <NavLink to="/builds">Builds</NavLink>
            <NavLink to="/counters">Counters</NavLink>
          </NavBar>

          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<LoginPage champions={champions} loading={loading} />} />
            <Route path="/register" element={<RegisterPage champions={champions} loading={loading} />} />
            
            {/* Rotas Protegidas */}
            <Route path="/champions" element={<ProtectedRoute><HomePage champions={champions} loading={loading} error={error} /></ProtectedRoute>} />
            <Route path="/champion/:championId" element={<ProtectedRoute><ChampionDetails /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* Novas Páginas */}
            <Route path="/builds" element={<ProtectedRoute><BuildsPage /></ProtectedRoute>} />
            <Route path="/counters" element={<ProtectedRoute><CountersPage /></ProtectedRoute>} />
          </Routes>
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;
