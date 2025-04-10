import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Outer Container
const GameContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #0f0f0f, #1c1c1c);
  padding: 3rem 2rem;
`;

// Title Text
const WelcomeText = styled(Typography)`
  font-size: 3.8rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(45deg, #00ffc6, #ff00c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 3rem;
  text-shadow: 0 0 15px rgba(0, 255, 198, 0.2);
`;

// Game Grid
const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1300px;
`;

// Individual Game Card
const GameCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 255, 200, 0.2);
    transform: translateY(-5px);
  }
`;

// Game Icon
const GameIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 1rem;
`;

// Game Title
const GameTitle = styled(Typography)`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
`;

function Home() {
  const games = [
    { id: 1, title: 'Snake Game', image: '/images/snake.png', link: '/games/snake' },
    { id: 2, title: 'Racing Car', image: '/images/car.png', link: '/games/racing' },
    { id: 3, title: 'Bike Racing', image: '/images/bike.png', link: '/games/bike' },
    { id: 4, title: 'Flappy Bird', image: '/images/flappy.png', link: '/games/flappybird' },
    { id: 5, title: 'Ludo King', image: '/images/ludo.png', link: '/games/ludo' },
    { id: 6, title: 'Quiz Master', image: '/images/quiz.png', link: '/games/quiz' },
    { id: 7, title: 'Chess Pro', image: '/images/chess.png', link: '/games/chess' },
    { id: 8, title: 'Puzzle Quest', image: '/images/puzzle.png', link: '/games/puzzle' },
    { id: 9, title: 'Tic Tac Toe', image: '/images/tictactoe.png', link: '/games/tictactoe' },
    { id: 10, title: 'Memory Game', image: '/images/memory.png', link: '/games/memory' },
   
  ];

  return (
    <GameContainer maxWidth={false}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WelcomeText variant="h1">
          Welcome to RIO WORLD
        </WelcomeText>
      </motion.div>

      <GamesGrid>
        {games.map((game) => (
          <Link key={game.id} to={game.link} style={{ textDecoration: 'none' }}>
            <GameCard
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <GameIcon src={game.image} alt={game.title} loading="lazy" />
              <GameTitle>{game.title}</GameTitle>
            </GameCard>
          </Link>
        ))}
      </GamesGrid>
    </GameContainer>
  );
}

export default Home;
