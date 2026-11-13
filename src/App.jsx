import { useState } from "react";
import "./App.css";

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winner, setWinner] = useState(""); // "X" | "O" | "Draw" | ""
  const [winningCells, setWinningCells] = useState([]);

  const handleCellClick = (index) => {
    if (board[index] !== "" || winner !== "") return;

    const newBoard = [...board];
    const current = isXTurn ? "X" : "O";
    newBoard[index] = current;
    setBoard(newBoard);

    // Check winner
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (newBoard[a] !== "" && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        setWinningCells(combo);
        if (newBoard[a] === "X") setXScore(xScore + 1);
        else setOScore(oScore + 1);
        return;
      }
    }

    // Check draw
    if (newBoard.every((cell) => cell !== "")) {
      setWinner("Draw");
      setDraws(draws + 1);
      return;
    }

    setIsXTurn(!isXTurn);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setWinner("");
    setWinningCells([]);
  };

  const handleResetAll = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setWinner("");
    setWinningCells([]);
    setXScore(0);
    setOScore(0);
    setDraws(0);
  };

  const getStatus = () => {
    if (winner === "X") return "X Wins!";
    if (winner === "O") return "O Wins!";
    if (winner === "Draw") return "It's a Draw!";
    return isXTurn ? "Player X's Turn" : "Player O's Turn";
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Tic-Tac-Toe</h1>

        <div className="scores">
          <div className="score-card x-card">
            <span>X</span>
            <strong>X: {xScore}</strong>
          </div>
          <div className="score-card draw-card">
            <span>Draws</span>
            <strong>Draws: {draws}</strong>
          </div>
          <div className="score-card o-card">
            <span>O</span>
            <strong>O: {oScore}</strong>
          </div>
        </div>

        <p className="status">{getStatus()}</p>

        <div className="board">
          {board.map((value, index) => (
            <button
              key={index}
              type="button"
              className={`cell ${value === "X" ? "x" : value === "O" ? "o" : ""} ${winningCells.includes(index) ? "win-cell" : ""}`}
              onClick={() => handleCellClick(index)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="btn-row">
          <button type="button" className="restart-btn" onClick={handleRestart}>
            {winner !== "" ? "Play Again" : "Restart Round"}
          </button>
          <button type="button" className="reset-btn" onClick={handleResetAll}>
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;