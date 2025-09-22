export async function getBuilds(championId, region) {
  const url = `/api/champion/${championId}/builds${region ? `?region=${region}` : ""}`;
  const res = await fetch(url);
  return res.json();
}

export async function getCounters(championId, region) {
  const url = `/api/champion/${championId}/counters${region ? `?region=${region}` : ""}`;
  const res = await fetch(url);
  return res.json();
}
