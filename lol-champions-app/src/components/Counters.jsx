// src/components/Counters.jsx
import React from 'react';
import './Counters.css';

const Counters = ({ counters }) => {
    // VERIFICAÇÃO PRINCIPAL
  if (!counters || counters.length === 0) {
      return (
        <div className="counters-container">
            <h3>Dicas de Counter</h3>
            <p>Nenhuma dica de counter encontrada.</p>
        </div>
      );
  }

  return (
    <div className="counters-container">
      <h3>Dicas de Counter</h3>
      {counters.map(c => (
        <div key={c.champion} className="counter-item">
          <h4>{c.champion}</h4>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Counters;