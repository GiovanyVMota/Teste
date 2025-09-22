// src/components/ChampionCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BackgroundContext } from '../context/BackgroundContext';

// --- Styled Components ---
const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    opacity: 1 !important;
    transform: scale(1.05);
  }
`;

const CardWrapper = styled.div`
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ChampionImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  object-fit: cover;
`;

const ChampionInfo = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
`;

const ChampionName = styled.h3`
  font-size: 1.2em;
  color: #f0e6d2;
  margin: 0;
  width: 100%;
  font-weight: bold;
  line-height: 1.2;
  min-height: 2.4em;
  word-wrap: break-word;
  white-space: normal;
`;

const ChampionTitle = styled.p`
  font-size: 0.8em;
  color: #aaa;
  margin-top: 5px;
  width: 100%;
  line-height: 1.4;
  height: 2.8em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

// --- Component ---
const ChampionCard = ({ champion }) => {
  const { changeBackground } = useContext(BackgroundContext);
  const apiVersion = '14.1.1';
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${apiVersion}/img/champion/${champion.image.full}`;
  const backgroundImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

  return (
    <CardLink to={`/champion/${champion.id}`}>
      <CardWrapper
        onMouseEnter={() => changeBackground(backgroundImageUrl)}
        onMouseLeave={() => changeBackground('')}
      >
        <ChampionImage src={imageUrl} alt={champion.name} />
        <ChampionInfo>
          <ChampionName>{champion.name}</ChampionName>
          <ChampionTitle>{champion.title}</ChampionTitle>
        </ChampionInfo>
      </CardWrapper>
    </CardLink>
  );
};

export default ChampionCard;