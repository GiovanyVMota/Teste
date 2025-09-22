import { useState } from "react";

export default function ChampionSelector({ onChange }) {
  const [championId, setChampionId] = useState("");
  const [region, setRegion] = useState("");

  const regions = ["BR1","NA1","EUW1","EUN1","KR","JP1","LA1","LA2","TR1","RU","OC1"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (championId) onChange(championId, region);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="number"
        placeholder="Champion ID"
        value={championId}
        onChange={(e) => setChampionId(e.target.value)}
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
