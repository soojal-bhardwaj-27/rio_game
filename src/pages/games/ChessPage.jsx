import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import styled from '@emotion/styled';
import { Container, Typography, Button } from '@mui/material';

const GameContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to right, #141e30, #243b55);
  color: white;
`;

const Title = styled(Typography)`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(to right, #00c9ff, #92fe9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
`;

// Change from function to const to match the export
const ChessPage = () => {
  const [chess] = useState(new Chess()); // Move chess instance to state
  const [fen, setFen] = useState(chess.fen());
  const [gameOver, setGameOver] = useState(false);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;

    setFen(chess.fen());
    checkGameOver();
  };

  const checkGameOver = () => {
    if (chess.game_over()) {
      setGameOver(true);
      alert('Game Over!');
    }
  };

  const resetGame = () => {
    chess.reset();
    setFen(chess.fen());
    setGameOver(false);
  };

  return (
    <GameContainer maxWidth={false}>
      <Title variant="h1">Chess Game</Title>
      <Chessboard
        width={400}
        position={fen}
        onDrop={onDrop}
        boardStyle={{
          borderRadius: '10px',
          boxShadow: '0 5px 25px rgba(0, 0, 0, 0.5)',
        }}
        lightSquareStyle={{ backgroundColor: '#f0d9b5' }}
        darkSquareStyle={{ backgroundColor: '#b58863' }}
      />
      <Button
        variant="contained"
        sx={{ mt: 3, background: '#00c9ff', color: 'black' }}
        onClick={resetGame}
      >
        Restart Game
      </Button>
    </GameContainer>
  );
};

// Make sure the export matches the component name
export default ChessPage;
