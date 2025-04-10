import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const GameWrapper = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, #87ceeb, #f0f8ff);
  overflow: hidden;
  position: relative;
`;

const Bird = styled(motion.div)`
  width: 40px;
  height: 40px;
  background: yellow;
  border-radius: 50%;
  position: absolute;
  left: 20%;
`;

const Pipe = styled.div`
  width: 60px;
  background: green;
  position: absolute;
`;

const ScoreBoard = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px #000;
`;

const FlappyBird = () => {
  const [birdPosition, setBirdPosition] = useState(250);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);  // Add this state
  const gravity = 2;

  // Add collision detection
  const checkCollision = () => {
    const birdRect = {
      top: birdPosition,
      bottom: birdPosition + 40,
      left: window.innerWidth * 0.2,
      right: window.innerWidth * 0.2 + 40
    };

    for (const pipe of pipes) {
      if (
        birdRect.right > pipe.left &&
        birdRect.left < pipe.left + 60 &&
        (birdRect.top < pipe.topHeight || birdRect.bottom > window.innerHeight - pipe.bottomHeight)
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setVelocity((v) => v + gravity);
        setBirdPosition((bp) => {
          const newPosition = bp + velocity;
          if (newPosition > window.innerHeight - 40 || newPosition < 0) {
            setGameOver(true);
            return bp;
          }
          return newPosition;
        });
        
        if (checkCollision()) {
          setGameOver(true);
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [velocity, gameOver, pipes]);

  const handleFlap = () => {
    if (!gameOver) {
      setVelocity(-10);
    } else {
      // Reset game
      setBirdPosition(250);
      setVelocity(0);
      setPipes([]);
      setScore(0);
      setGameOver(false);
    }
  };

  useEffect(() => {
    const pipeInterval = setInterval(() => {
      const topHeight = Math.floor(Math.random() * 200) + 50;
      const bottomHeight = window.innerHeight - topHeight - 150;
      const newPipe = {
        left: window.innerWidth,
        topHeight,
        bottomHeight,
      };
      setPipes((prev) => [...prev.filter((p) => p.left > -60), newPipe]);
    }, 2000);

    const moveInterval = setInterval(() => {
      setPipes((prev) => {
        const updated = prev.map((p) => ({ ...p, left: p.left - 5 }));
        updated.forEach((pipe) => {
          if (pipe.left === 100) setScore((s) => s + 1);
        });
        return updated;
      });
    }, 60);

    return () => {
      clearInterval(pipeInterval);
      clearInterval(moveInterval);
    };
  }, []);

  return (
    <GameWrapper onClick={handleFlap}>
      <ScoreBoard>
        {gameOver ? "Game Over! Click to restart" : `Score: ${score}`}
      </ScoreBoard>
      <Bird
        animate={{ top: birdPosition }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <Pipe style={{ height: pipe.topHeight, top: 0, left: pipe.left }} />
          <Pipe
            style={{
              height: pipe.bottomHeight,
              bottom: 0,
              top: 'unset',
              left: pipe.left,
            }}
          />
        </React.Fragment>
      ))}
    </GameWrapper>
  );
};

export default FlappyBird;