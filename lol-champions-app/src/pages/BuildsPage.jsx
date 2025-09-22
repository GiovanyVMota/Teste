import { useState } from "react";
import ChampionSelector from "../components/ChampionSelector";
import Builds from "../components/Builds";
import { getBuilds } from "../api";

export default function BuildsPage() {
  const [builds, setBuilds] = useState(null);

  const handleChampionChange = async (championId, region) => {
    const data = await getBuilds(championId, region);
    setBuilds(data);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Champion Builds</h1>
      <ChampionSelector onChange={handleChampionChange} />
      {builds && <Builds builds={builds} />}
    </div>
  );
}
