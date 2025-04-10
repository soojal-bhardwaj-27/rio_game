import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Typography, Button, Container } from '@mui/material';

const PageWrapper = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #1f1c2c, #928dab);
  padding: 4rem 2rem;
  color: white;
`;

const Title = styled(Typography)`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #00ffe7, #ff00c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StartButton = styled(Button)`
  margin-bottom: 3rem;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 12px;
  background: linear-gradient(to right, #00ffe7, #ff00c8);
  color: black;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 12px #00ffe7aa;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns */
  gap: 1rem;
  max-width: 600px;
  width: 100%;
`;

const Card = styled(motion.div)`
  background: ${({ isMatched }) =>
    isMatched ? 'rgba(0,255,150,0.3)' : 'rgba(255, 255, 255, 0.05)'};
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
`;

const emojiList = ['🐶', '🐱', '🐵', '🦊', '🐸', '🐼', '🐷', '🐨', '🦁', '🐰'];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffled = shuffleArray([...emojiList, ...emojiList]).map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false
    }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [i1, i2] = newFlipped;
      if (cards[i1].emoji === cards[i2].emoji) {
        setMatched((prev) => [...prev, i1, i2]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  return (
    <PageWrapper maxWidth={false}>
      <Title variant="h1">Memory Game</Title>
      <StartButton variant="contained" onClick={startGame}>
        {gameWon ? 'Play Again 🎉' : 'Restart Game'}
      </StartButton>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Moves: {moves}
      </Typography>

      <CardGrid>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(index)}
            isMatched={matched.includes(index)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            {flipped.includes(index) || matched.includes(index) ? card.emoji : '❓'}
          </Card>
        ))}
      </CardGrid>
    </PageWrapper>
  );
}

export default MemoryGame;
