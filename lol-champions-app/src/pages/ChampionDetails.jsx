// src/pages/ChampionDetails.jsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ChampionDetails.css';

const ChampionDetails = () => {
  const { championId } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiVersion = '14.1.1';
  const apiUrl = `https://ddragon.leagueoflegends.com/cdn/${apiVersion}/data/pt_BR/champion/${championId}.json`;

  useEffect(() => {
    const fetchChampionDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        const championData = Object.values(response.data.data)[0];
        setChampion(championData);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os detalhes do campeão.");
        setChampion(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChampionDetails();
  }, [championId]);

  if (loading) {
    return <div className="details-container"><p>Carregando detalhes...</p></div>;
  }

  if (error) {
    return <div className="details-container"><p className="error-message">{error}</p></div>;
  }

  if (!champion) {
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
                <p>{spell.description}</p>
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