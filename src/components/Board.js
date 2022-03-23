import React, { useState } from "react";
import './styles/Board.css';
import Square from "./Square";

function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerX, nextPlayer] = useState(true);
    var status = 'Next player: X';

    function handleClick(i) {
      const curr = board.slice();
      if (calculateWinner(curr) || curr[i]) {
        return;
      }
      curr[i] = playerX ? 'X' : 'O';
      setBoard(curr);
      nextPlayer(!playerX);
    };

    function calculateWinner(board) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }

    const winner = calculateWinner(board);
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (playerX ? 'X' : 'O');
    }

    

    function renderSquare(i) {
        return (
          <Square
          value = {board[i]}
          onClick = {() => handleClick(i)}/>
        );
    }

    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
        </div>
    )
}

export default Board;