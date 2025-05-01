// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ]
export default function GameBoard({ onSelectSquare, board }) {
  // let gameBoard = initialGameBoard;
  // for (const turn of turns) {
  //   const { row, col } = turn.square;
  //   const playerSymbol = turn.player;
  //   gameBoard[row][col] = playerSymbol;
  // } 
  // const[gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedGameBooard = [...prevGameBoard.map(innerGameBoard => [...innerGameBoard])]
  //     updatedGameBooard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedGameBooard
  //   });
  //   onSelectSquare();
  // }
  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => (
        <li key={rowIndex} className="game-row">
          <ol>
            {row.map((rowColSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex, colIndex)} disabled={rowColSymbol !== null}>
                  {rowColSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}