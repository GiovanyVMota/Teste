import { useState, useEffect } from "react";
import { getBuilds, getMatchups, getCounters } from "../api";
import Builds from "./Builds";
import Matchups from "./Matchups";
import Counters from "./Counters";

export default function ChampionDashboard({ championName }) {
  const [builds, setBuilds] = useState(null);
  const [matchups, setMatchups] = useState(null);
  const [counters, setCounters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar todos os dados em paralelo
    const fetchChampionData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [buildsData, matchupsData, countersData] = await Promise.all([
          getBuilds(championName),
          getMatchups(championName),
          getCounters(championName)
        ]);
        setBuilds(buildsData);
        setMatchups(matchupsData);
        setCounters(countersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (championName) {
      fetchChampionData();
    }
  }, [championName]); // A busca acontece toda vez que o nome do campeão mudar

  if (loading) return <p>Buscando dados de {championName}...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard do {championName}</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <Builds builds={builds} />
        </div>
        <div style={{ flex: 1 }}>
          <Matchups matchups={matchups} />
          <hr />
          <Counters counters={counters} />
        </div>
      </div>
    </div>
  );
}