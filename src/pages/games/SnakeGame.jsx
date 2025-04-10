import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Container, Typography, Button, Box } from '@mui/material';

const GameContainer = styled(Container)`
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f0f2d 0%, #000 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Orbitron', sans-serif;
`;

const GameBoard = styled.canvas`
  border: 4px solid #00ffea;
  border-radius: 20px;
  background: linear-gradient(145deg, #0a0a1a, #1a1a2e);
  box-shadow: 0 0 25px #00ffea, 0 0 50px #00ffea33, inset 0 0 20px #00ffea55;
  margin: 2rem 0;
  transition: all 0.3s ease-in-out;
`;

const ScoreBoard = styled(Box)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid #00ffea44;
  margin-bottom: 2rem;
  display: flex;
  gap: 3rem;
  box-shadow: 0 0 20px rgba(0, 255, 234, 0.2);
`;

const ScoreText = styled(Typography)`
  color: #00ffea;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 0 15px #00ffea88;
`;

const GameButton = styled(Button)`
  background: transparent;
  color: #00ffea;
  font-size: 1.2rem;
  font-weight: bold;
  border: 2px solid #00ffea;
  border-radius: 30px;
  padding: 12px 35px;
  transition: all 0.3s ease;
  text-transform: none;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    background: linear-gradient(90deg, #00ffea, #008cff);
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: 0.4s ease;
    z-index: -1;
  }

  &:hover:before {
    left: 0;
  }

  &:hover {
    box-shadow: 0 0 20px #00ffea88;
    color: #000;
  }
`;

function SnakeGame() {
  const canvasRef = useRef(null);
  const directionRef = useRef('right');
  const snakeRef = useRef([]);
  const foodRef = useRef({ x: 5, y: 5 });

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 20;
  const canvasWidth = 600;
  const canvasHeight = 400;
  const gridWidth = canvasWidth / gridSize;
  const gridHeight = canvasHeight / gridSize;

  const resetGame = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    directionRef.current = 'right';
    foodRef.current = getRandomFoodPosition();
    setScore(0);
    setGameOver(false);
  };

  const getRandomFoodPosition = () => {
    let newPos;
    do {
      newPos = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
      };
    } while (snakeRef.current.some(seg => seg.x === newPos.x && seg.y === newPos.y));
    return newPos;
  };

  const moveSnake = () => {
    const newSnake = [...snakeRef.current];
    const head = { ...newSnake[0] };

    switch (directionRef.current) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    // Collision check
    if (
      head.x < 0 || head.x >= gridWidth ||
      head.y < 0 || head.y >= gridHeight ||
      newSnake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      setGameOver(true);
      setGameStarted(false);
      if (score > highScore) setHighScore(score);
      return;
    }

    newSnake.unshift(head);

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore(prev => prev + 10);
      foodRef.current = getRandomFoodPosition();
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
  };

  const drawGame = (ctx) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Snake with glow
    snakeRef.current.forEach((seg, index) => {
      ctx.fillStyle = `hsl(${120 + index * 5}, 100%, 60%)`;
      ctx.shadowColor = "#00ffea";
      ctx.shadowBlur = 10;
      ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Food with glow
    ctx.fillStyle = '#ff00c8';
    ctx.shadowColor = '#ff00c8';
    ctx.shadowBlur = 20;
    ctx.fillRect(
      foodRef.current.x * gridSize,
      foodRef.current.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  };

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const gameLoop = () => {
      moveSnake();
      drawGame(ctx);
      if (gameStarted) {
        animationId = setTimeout(gameLoop, 120);
      }
    };

    gameLoop();

    const handleKeyPress = (e) => {
      const newDir = e.key.replace('Arrow', '').toLowerCase();
      const opposite = { up: 'down', down: 'up', left: 'right', right: 'left' };
      if (['up', 'down', 'left', 'right'].includes(newDir) && newDir !== opposite[directionRef.current]) {
        directionRef.current = newDir;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearTimeout(animationId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameStarted]);

  const startGame = () => {
    resetGame();
    setGameStarted(true);
  };

  return (
    <GameContainer maxWidth={false}>
      <Typography
        variant="h2"
        sx={{
          color: '#00ffea',
          mb: 3,
          fontWeight: 'bold',
          textShadow: '0 0 20px #00ffea',
          fontFamily: 'Orbitron'
        }}
      >
        🐍 NEON SNAKE
      </Typography>

      <ScoreBoard>
        <ScoreText>Score: {score}</ScoreText>
        <ScoreText>High Score: {highScore}</ScoreText>
      </ScoreBoard>

      <GameBoard ref={canvasRef} width={canvasWidth} height={canvasHeight} />

      <Box sx={{ mt: 3 }}>
        {!gameStarted && (
          <GameButton onClick={startGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </GameButton>
        )}
      </Box>

      {!gameStarted && !gameOver && (
        <Typography sx={{ color: '#ccc', mt: 2 }}>
          Use arrow keys to control the snake
        </Typography>
      )}
    </GameContainer>
  );
}

export default SnakeGame;
