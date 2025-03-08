import React, { useState } from 'react';
import './App.css';

// Square component
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${value} ${highlight ? 'winner' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

// Board component
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], squares: [a, b, c] };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (squares[i] || winner) return; // Ignore if square is already filled or game is won
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    const result = calculateWinner(newSquares);
    if (result) {
      setWinner(result);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winner ? winner.squares.includes(i) : false;
    return <Square value={squares[i]} onClick={() => handleClick(i)} highlight={isWinningSquare} />;
  };

  return (
    <div className="board">
      {squares.map((_, i) => renderSquare(i))}
      {winner && (
        <div className="winner-message">
          <p>Winner: {winner.winner}</p>
          <button onClick={resetGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

// App component
function App() {
  return (
    <div className="app">
      <h1>Welcome to Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}

export default App;
