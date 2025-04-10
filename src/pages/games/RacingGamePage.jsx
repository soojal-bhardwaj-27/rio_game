import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { CarFront, Trophy, CloudSun } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Title = styled(Typography)`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  text-shadow: 0 0 10px #00ffea;
  margin-bottom: 2rem;
`;

const IconRow = styled(Box)`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const NeonButton = styled(Button)`
  background: #00ff95;
  color: #000;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 25px;
  text-transform: none;
  font-weight: bold;
  box-shadow: 0 0 20px #00ffea;
  transition: all 0.3s ease;
  &:hover {
    background: #00ffea;
    box-shadow: 0 0 30px #00ffea;
  }
`;

const EnvironmentBox = styled(Box)`
  width: 90%;
  max-width: 1000px;
  height: 400px;
  background: url('https://images.unsplash.com/photo-1597007355970-683b12c6b0b3') center/cover;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 255, 234, 0.5);
  position: relative;
  overflow: hidden;
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 255, 234, 0.2);
  color: #fff;
  &:hover {
    background: rgba(0, 255, 234, 0.4);
  }
`;

const GameCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ScoreText = styled(Typography)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #00ff95;
  font-size: 1.5rem;
  font-family: 'Orbitron', sans-serif;
`;

const RacingGamePage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);
  const carRef = useRef({ x: 200, y: 300, speed: 0 });
  const obstaclesRef = useRef([]);
  const animationFrameRef = useRef(null);

  const createObstacle = () => ({
    x: Math.random() * (canvasRef.current.width - 50),
    y: -50,
    width: 50,
    height: 50,
    speed: 5 + Math.random() * 3
  });

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const handleKeyPress = (e) => {
      const car = carRef.current;
      const moveSpeed = 10;

      switch(e.key) {
        case 'ArrowLeft':
          car.x = Math.max(0, car.x - moveSpeed);
          break;
        case 'ArrowRight':
          car.x = Math.min(canvas.width - 60, car.x + moveSpeed);
          break;
        case 'ArrowUp':
          car.speed = Math.min(car.speed + 0.5, 15);
          break;
        case 'ArrowDown':
          car.speed = Math.max(car.speed - 0.5, 0);
          break;
      }
    };

    const drawCar = () => {
      ctx.fillStyle = '#00ff95';
      ctx.beginPath();
      ctx.roundRect(carRef.current.x, carRef.current.y, 60, 100, 10);
      ctx.fill();
    };

    const updateObstacles = () => {
      if (Math.random() < 0.02) {
        obstaclesRef.current.push(createObstacle());
      }

      obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
        obstacle.y += obstacle.speed;
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Check collision
        if (
          carRef.current.x < obstacle.x + obstacle.width &&
          carRef.current.x + 60 > obstacle.x &&
          carRef.current.y < obstacle.y + obstacle.height &&
          carRef.current.y + 100 > obstacle.y
        ) {
          setGameStarted(false);
          return false;
        }

        return obstacle.y < canvas.height;
      });
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update score
      setScore(prev => prev + Math.floor(carRef.current.speed));
      
      // Draw game elements
      drawCar();
      updateObstacles();
      
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    window.addEventListener('keydown', handleKeyPress);
    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameStarted]);

  const startGame = () => {
    carRef.current = { x: 200, y: 300, speed: 0 };
    obstaclesRef.current = [];
    setScore(0);
    setGameStarted(true);
  };

  return (
    <PageContainer>
      <BackButton component={Link} to="/">
        ← Back to Home
      </BackButton>
      
      <Title>🏁 Neon Racing Arena</Title>

      <EnvironmentBox>
        <GameCanvas ref={canvasRef} />
        {gameStarted && <ScoreText>Score: {score}</ScoreText>}
      </EnvironmentBox>

      <IconRow>
        <CarFront size={48} color="#00ff95" />
        <Trophy size={48} color="#FFD700" />
        <CloudSun size={48} color="#00ccff" />
      </IconRow>

      <NeonButton onClick={startGame}>
        {gameStarted ? 'Restart Race' : 'Start Race'}
      </NeonButton>
    </PageContainer>
  );
};

export default RacingGamePage;
