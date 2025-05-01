import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations"; 
import GameOver from "./components/GameOver";
import { use } from "react";

const   INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}
function deriveActivePlayer(turns) {
  let activePlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    activePlayer = 'O';
  }
  return activePlayer;
}
function deriveWinner(gameBoard, players) {
  let winner = '';
  for (const winningCombination of WINNING_COMBINATIONS) {
    const [a, b, c] = winningCombination;
    const aValue = gameBoard[a.row][a.column];
    const bValue = gameBoard[b.row][b.column];
    const cValue = gameBoard[c.row][c.column];
    if (aValue && aValue === bValue && aValue === cValue) {
      winner = `${players[aValue]}`;
      break;
    } 
  }
  return winner;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerGameBoard => [...innerGameBoard])];
  for (const turn of gameTurns) {
    const { row, col } = turn.square;
    const playerSymbol = turn.player;
    gameBoard[row][col] = playerSymbol;
  } 
  return gameBoard;
}
function App() {
  const[players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDrawn = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns];
      return updatedTurns;
    })
  }

  function handleResetGame() {
    setGameTurns([]);
  }

  function handleEditPlayerName(symbol, newPlayerName) {  
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newPlayerName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onEdit={handleEditPlayerName}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onEdit={handleEditPlayerName}/>
        </ol>
        {(winner || hasDrawn) && <GameOver winner={winner} onRestart={handleResetGame}/> }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
