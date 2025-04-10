import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Replace Navbar with Header
import Home from './pages/Home';
import About from './pages/About.jsx';
import SnakeGame from './pages/games/SnakeGame';
import RacingGamePage from './pages/games/RacingGamePage';
import MemoryGame from './pages/games/MemoryGame';
import TicTacToe from './pages/games/TicTacToe';
import ChessPage from './pages/games/ChessPage';
import FlappyBird from './pages/games/FlappyBird.jsx'; // Update import with .jsx extension
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Replace Navbar with Header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/games/snake" element={<SnakeGame />} />
          <Route path="/games/racing" element={<RacingGamePage />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/tictactoe" element={<TicTacToe />} />
          <Route path="/games/chess" element={<ChessPage />} />
          <Route path="/games/flappybird" element={<FlappyBird />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
