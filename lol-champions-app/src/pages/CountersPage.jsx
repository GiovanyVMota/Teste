import { useState } from "react";
import ChampionSelector from "../components/ChampionSelector";
import Counters from "../components/Counters";
import { getCounters } from "../api";

export default function CountersPage() {
  const [counters, setCounters] = useState(null);

  const handleChampionChange = async (championId, region) => {
    const data = await getCounters(championId, region);
    setCounters(data);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Champion Counters</h1>
      <ChampionSelector onChange={handleChampionChange} />
      {counters && <Counters counters={counters} />}
    </div>
  );
}
