// A função agora espera um 'championName'
export async function getBuilds(championName) {
  const url = `/api/champion/${championName}/builds`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar builds');
  return res.json();
}

// NOVA função para buscar matchups
export async function getMatchups(championName) {
  const url = `/api/champion/${championName}/matchups`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar matchups');
  return res.json();
}

// NOVA função para buscar counters
export async function getCounters(championName) {
  const url = `/api/champion/${championName}/counters`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar counters');
  return res.json();
}