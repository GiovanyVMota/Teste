import { useState } from "react";

export default function ChampionSelector({ onChange }) {
  // Mudado de championId para championName
  const [championName, setChampionName] = useState("");
  const [region, setRegion] = useState("");

  const regions = ["BR1","NA1","EUW1","EUN1","KR","JP1","LA1","LA2","TR1","RU","OC1"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envia o nome do campeão
    if (championName) onChange(championName, region);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        // Mudado type para "text" e placeholder
        type="text"
        placeholder="Nome do Campeão"
        value={championName}
        onChange={(e) => setChampionName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ marginRight: "10px" }}>
        <option value="">All Regions</option>
        {regions.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <button type="submit">Buscar</button>
    </form>
  );
}