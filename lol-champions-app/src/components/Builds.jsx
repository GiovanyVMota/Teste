export default function Builds({ builds }) {
  if (!builds || builds.length === 0) return <p>Nenhuma build encontrada.</p>;

  return (
    <div>
      <h2>Builds</h2>
      {builds.builds.map((b, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p>Região: {b.region}</p>
          <p>Win: {b.win ? "Vitória" : "Derrota"}</p>
          <p>Itens: {b.items.join(", ")}</p>
          <p>Runas: {JSON.stringify(b.runes)}</p>
        </div>
      ))}
    </div>
  );
}
