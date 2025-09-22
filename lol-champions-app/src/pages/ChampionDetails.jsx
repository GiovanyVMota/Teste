// src/pages/ChampionDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ChampionDetails.css';

// Importe os novos componentes
import Builds from '../components/Builds';
import Matchups from '../components/Matchups';
import Counters from '../components/Counters';
// NOTA: Removi o import do BackgroundContext, pois seu código original não o usava aqui.
// Se você precisar dele, pode adicionar novamente.

const ChampionDetails = () => {
  const { championId } = useParams();
  const [champion, setChampion] = useState(null);
  
  // Estados para os novos dados
  const [builds, setBuilds] = useState(null);
  const [matchups, setMatchups] = useState(null);
  const [counters, setCounters] = useState(null);

  // Um único estado de loading para todos os dados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiVersion = '14.1.1';

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Todas as chamadas de API são disparadas em paralelo
        const ddragonUrl = `https://ddragon.leagueoflegends.com/cdn/${apiVersion}/data/pt_BR/champion/${championId}.json`;
        
        const championDetailsPromise = axios.get(ddragonUrl);
        const buildsPromise = axios.get(`/api/champion/${championId}/builds`);
        const matchupsPromise = axios.get(`/api/champion/${championId}/matchups`);
        const countersPromise = axios.get(`/api/champion/${championId}/counters`);

        const [
            ddragonResponse,
            buildsResponse,
            matchupsResponse,
            countersResponse
        ] = await Promise.all([
            ddragonPromise,
            buildsPromise,
            matchupsPromise,
            countersPromise
        ]);

        // Atualiza todos os estados com os dados recebidos
        setChampion(Object.values(ddragonResponse.data.data)[0]);
        setBuilds(buildsResponse.data);
        setMatchups(matchupsResponse.data);
        setCounters(countersResponse.data);

      } catch (err) {
        console.error("Erro ao buscar dados do campeão:", err);
        setError(`Não foi possível carregar os dados para ${championId}. Verifique se o backend está rodando.`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [championId]); // A busca é refeita sempre que o championId mudar na URL

  if (loading) {
    return <div className="details-container"><p>Carregando dashboard do {championId}...</p></div>;
  }

  if (error) {
    return <div className="details-container"><p className="error-message">{error}</p></div>;
  }

  if (!champion) {
    // Se, mesmo após o loading, não houver dados do campeão, não renderiza nada
    return null;
  }

  return (
    <div className="details-container">
      <Link to="/champions" className="back-button">← Voltar para a lista</Link>
      
      <div className="champion-header">
        <h1 className="champion-name">{champion.name}</h1>
        <h2 className="champion-title">{champion.title}</h2>
        <img 
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} 
          alt={champion.name} 
          className="champion-splash"
        />
      </div>

      {/* NOVA SEÇÃO DE DASHBOARD */}
      <div className="champion-info-section">
          <h3>Dashboard de Estratégia</h3>
          <div className="dashboard-grid">
              <div className="dashboard-column">
                  <Builds builds={builds} />
              </div>
              <div className="dashboard-column">
                  <Matchups matchups={matchups} />
                  <Counters counters={counters} />
              </div>
          </div>
      </div>
      
      {/* SEÇÕES ORIGINAIS QUE VOCÊ JÁ TINHA */}
      <div className="champion-info-section">
        <h3>História</h3>
        <p className="champion-lore">{champion.lore}</p>
      </div>

      <div className="champion-info-section">
        <h3>Habilidades</h3>
        <div className="abilities-grid">
          {champion.spells.map(spell => (
            <div key={spell.id} className="ability-card">
              <img 
                src={`https://ddragon.leagueoflegends.com/cdn/${apiVersion}/img/spell/${spell.image.full}`} 
                alt={spell.name} 
              />
              <div className="ability-text">
                <h4>{spell.name}</h4>
                {/* Usar dangerouslySetInnerHTML é ok aqui, pois a API é confiável */}
                <p dangerouslySetInnerHTML={{ __html: spell.description }}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="champion-info-section">
        <h3>Estatísticas Base</h3>
        <ul className="stats-list">
          <li>Ataque: {champion.info.attack}</li>
          <li>Defesa: {champion.info.defense}</li>
          <li>Magia: {champion.info.magic}</li>
          <li>Dificuldade: {champion.info.difficulty}</li>
        </ul>
      </div>
    </div>
  );
};

export default ChampionDetails;