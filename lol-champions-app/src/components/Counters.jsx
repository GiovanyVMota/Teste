export default function Counters({ counters }) {
  if (!counters || counters.length === 0) return <p>Nenhum counter encontrado.</p>;

  return (
    <div>
      <h2>Counters</h2>
      {counters.counters.map((c, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p>Campeão ID: {c.championId}</p>
          <p>Região: {c.region}</p>
          <p>Winrate contra: {c.winrate}%</p>
        </div>
      ))}
    </div>
  );
}
