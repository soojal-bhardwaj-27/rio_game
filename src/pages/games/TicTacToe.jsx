import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, Container, Typography } from '@mui/material';

const PageWrapper = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  padding: 3rem 1rem;
  color: white;
`;

const Title = styled(Typography)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #00ffe7, #ff00c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  margin-bottom: 2rem;
`;

const Cell = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 100px;
  height: 100px;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ResultText = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const RestartButton = styled(Button)`
  padding: 0.6rem 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 10px;
  background: linear-gradient(to right, #00ffe7, #ff00c8);
  color: black;
`;

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState(null); // 'single' | 'multi'

  const checkWinner = (newBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6], // diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }

    if (newBoard.every(cell => cell !== null)) return 'Draw';
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  // AI move (simple random)
  useEffect(() => {
    if (mode === 'single' && !isXTurn && !winner) {
      const emptyIndices = board.map((v, i) => (v === null ? i : null)).filter(v => v !== null);
      const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

      setTimeout(() => {
        if (randomMove !== undefined) {
          handleClick(randomMove);
        }
      }, 600);
    }
  }, [board, isXTurn, mode, winner]);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <PageWrapper maxWidth={false}>
      <Title variant="h1">Tic Tac Toe</Title>

      {!mode && (
        <ModeSelector>
          <RestartButton onClick={() => setMode('single')}>Single Player</RestartButton>
          <RestartButton onClick={() => setMode('multi')}>Multiplayer</RestartButton>
        </ModeSelector>
      )}

      {mode && (
        <>
          <ResultText>
            {winner
              ? winner === 'Draw'
                ? "It's a Draw!"
                : `${winner} Wins!`
              : `${isXTurn ? 'X' : 'O'}'s Turn`}
          </ResultText>

          <GameBoard>
            {board.map((cell, index) => (
              <Cell key={index} onClick={() => handleClick(index)} disabled={!!cell || winner}>
                {cell}
              </Cell>
            ))}
          </GameBoard>

          <RestartButton onClick={restartGame}>
            {winner ? 'Play Again' : 'Restart'}
          </RestartButton>
        </>
      )}
    </PageWrapper>
  );
};

export default TicTacToe;
