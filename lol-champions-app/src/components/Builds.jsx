// src/components/Builds.jsx
import React from 'react';
import './Builds.css';

// A props foi renomeada para 'builds' para consistência.
const Builds = ({ builds }) => {
  // Verificação robusta: só continua se 'builds' e 'builds.builds' existirem e não estiverem vazios.
  if (!builds || !builds.builds || builds.builds.length === 0) {
    return (
      <div className="builds-container">
        <h3>Builds Populares</h3>
        <p>Nenhuma build encontrada nas partidas recentes de jogadores de elo alto.</p>
      </div>
    );
  }

  return (
    <div className="builds-container">
      <h3>Builds Populares</h3>
      {builds.builds.slice(0, 3).map((build, index) => (
        <div key={index} className={`build-card ${build.win ? 'win' : 'loss'}`}>
          <p className="build-result">{build.win ? 'Vitória' : 'Derrota'}</p>
          {/* Adicionamos uma verificação aqui também por segurança */}
          <p><strong>Itens:</strong> {build.items ? build.items.join(', ') : 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default Builds;