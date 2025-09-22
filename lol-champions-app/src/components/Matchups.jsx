// src/components/Matchups.jsx
import React from 'react';
import './Matchups.css';

const Matchups = ({ matchups }) => {
  // VERIFICAÇÃO PRINCIPAL: Se não houver dados, não renderiza nada.
  if (!matchups || !matchups.goodMatchups || !matchups.badMatchups) {
      return (
        <div className="matchups-container">
            <h3>Matchups</h3>
            <p>Carregando dados de matchup...</p>
        </div>
      );
  }

  return (
    <div className="matchups-container">
      <h3>Matchups</h3>
      <div className="matchup-columns">
        <div className="matchup-column">
          <h4>Vantagem Contra</h4>
          <ul>
            {matchups.goodMatchups.map(m => (
              <li key={m.champion} className="good">
                <span>{m.champion}</span>
                <span>{m.winrate}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="matchup-column">
          <h4>Desvantagem Contra</h4>
          <ul>
            {matchups.badMatchups.map(m => (
              <li key={m.champion} className="bad">
                <span>{m.champion}</span>
                <span>{m.winrate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Matchups;