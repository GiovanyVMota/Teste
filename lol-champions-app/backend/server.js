import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
const PORT = 3000;
const RIOT_KEY = process.env.RIOT_API_KEY;

// Helper para chamadas
async function riotFetch(url) {
  const res = await fetch(`${url}&api_key=${RIOT_KEY}`);
  return res.json();
}

// Endpoint: builds de um campeão
app.get("/api/champion/:championId/builds", async (req, res) => {
  const { championId } = req.params;
  let builds = [];

  try {
    // 1) Buscar jogadores Challenger no BR1
    const leaderboard = await riotFetch(
      "https://br1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?"
    );

    // Pegar só alguns invocadores para exemplo
    const players = leaderboard.entries.slice(0, 5);

    for (let player of players) {
      // 2) Buscar PUUID do jogador
      const summoner = await riotFetch(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${player.summonerName}?`
      );

      // 3) Buscar últimas 5 partidas
      const matches = await riotFetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=5?`
      );

      // 4) Buscar detalhes de cada partida
      for (let matchId of matches) {
        const match = await riotFetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?`
        );

        const participant = match.info.participants.find(
          (p) => p.championId == championId
        );

        if (participant) {
          builds.push({
            items: [
              participant.item0,
              participant.item1,
              participant.item2,
              participant.item3,
              participant.item4,
              participant.item5,
            ],
            runes: participant.perks,
            win: participant.win,
          });
        }
      }
    }

    // 5) Agregar itens
    const itemFrequency = {};
    builds.forEach((b) => {
      b.items.forEach((item) => {
        if (!itemFrequency[item]) itemFrequency[item] = 0;
        itemFrequency[item]++;
      });
    });

    res.json({ totalMatches: builds.length, itemFrequency, builds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar builds" });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
