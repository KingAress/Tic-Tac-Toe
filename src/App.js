import { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

const Btn = ({ setSquares, setXIsNext }) => {
  const resetBuild = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };
  return(
    <button className='btn' onClick={resetBuild}>Reset Build</button>
  )
};

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isTie, setIsTie] = useState(false);

  // Handles the clicks on the board and places the Xs and Os into the array.  
  function handleClick(i) { 
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    if(squares.every(square =>  square !== null)){
      return isTie = true;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }


  // Reset the score of the scoreboard 
  const resetScore = () => {
    setScore({ X: 0, O: 0 });
    return(
      <button className="btn" onClick={resetScore}>ResetSecore</button>
    )
  };

  useEffect(() => {
    if (winner) {
      const winner = calculateWinner(squares);
      if(winner){
      updateScore(winner); // Update the score when there's a winner
    }
  }
  }, [squares]);

  // Updates the score on the scoreboard. 
  const updateScore = (winner) => {
    setScore((prevScore) => ({
      ...prevScore,
      [winner]: prevScore[winner] + 1,
    }));
  };

  // Decleares the winner of the tic tok game. 
  const winner = calculateWinner(squares);
  let status;
  if (winner === "tie") {
    status = 'ITS A TIE';
  }else if(winner){
    status = 'Winner: ' + winner;
  }
   else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
     {/*This is the status */}
      <div className="status">{status}</div>
      <Btn setSquares={setSquares} setXIsNext={setXIsNext} />

      <button className="btn-1" onClick={resetScore}>
          Reset Score
        </button>
      {/*This is the score board*/}
      <div className="scoreboard">
        <div>Player X: {score.X}</div>
        <div>Player O: {score.O}</div>
      </div>

      {/* The board, which using a array with 9 sqaures */}
    <div className="Board">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      </div>
    </>
  );
}

//See whos the winner of the game is/ 
const calculateWinner = (squares) => {
  const lines = [ // Calculates every possiable way to win by using the indexes of the array.
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
      return squares[a];
    }
    if(!squares.includes(null)){
      return "tie"; // Returns tie 
  }
  }
  return null; // no winner yet
}



