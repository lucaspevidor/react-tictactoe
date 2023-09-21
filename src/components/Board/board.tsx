import {
  BoardController,
  BoardItem,
  Direction,
  GameStatus,
} from "../../controllers/BoardController";
import { X, Circle } from "lucide-react";

import "./style.css";
import { useState } from "react";
import BoardTitle from "./BoardTitle/board-title";
import BoardDescription from "./BoardDescription/board-description";

const bc = new BoardController(3, 3);

function defineWinDirection(dir: Direction) {
  const [x, y] = dir;
  if (x === 1 && y === 0) return "horizontal";
  if (x === 0 && y === 1) return "vertical";
  if (x === 1 && y === 1) return "diagonalRight";
  if (x === -1 && y === 1) return "diagonalLeft";

  return "";
}

const Board = () => {
  const [board, setBoard] = useState(bc.Board);
  const [gameStatus, setGameStatus] = useState(bc.status);
  const [winPosition, setWinPosition] = useState(bc.winnerPosition);

  function handleClick({ rIndex, cIndex }: { rIndex: number; cIndex: number }) {
    bc.Place(rIndex, cIndex);
    setBoard({ ...bc.Board });
    setGameStatus(bc.status);
    setWinPosition(bc.winnerPosition);
  }

  function playAgainClicked() {
    const elements = document.getElementsByClassName("boardItem");

    for (let i = 0; i < elements.length; i++) {
      elements.item(i)?.classList.add("despawn");
    }

    document
      .getElementsByClassName("winLine")
      .item(0)
      ?.classList.add("despawn");

    document
      .getElementsByClassName("playAgainBtn")
      .item(0)
      ?.classList.add("despawn");

    setTimeout(() => {
      bc.ClearBoard();
      setBoard({ ...bc.Board });
      setGameStatus(bc.status);
      setWinPosition(bc.winnerPosition);
    }, 250);
  }

  return (
    <>
      <BoardTitle />
      <BoardDescription gameStatus={gameStatus} />
      <table>
        <tbody>
          {board.cells.map((row, rIndex) => (
            <tr key={rIndex} style={{ display: "flex" }}>
              {row.map((cell, cIndex) => (
                <td key={rIndex * 10 + cIndex}>
                  {winPosition &&
                    winPosition.row === rIndex &&
                    winPosition.col === cIndex && (
                      <div
                        className={
                          "winLine " + defineWinDirection(winPosition.direction)
                        }
                      ></div>
                    )}

                  <button onClick={() => handleClick({ rIndex, cIndex })}>
                    {cell !== BoardItem.NONE ? (
                      cell === BoardItem.CIRCLE ? (
                        <Circle
                          className="boardItem"
                          size={50}
                          strokeWidth={1}
                        />
                      ) : (
                        <X className="boardItem" size={60} strokeWidth={1} />
                      )
                    ) : (
                      (gameStatus === GameStatus.O_TURN ||
                        gameStatus === GameStatus.X_TURN) && (
                        <div className="selectable"></div>
                      )
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="playAgainDiv">
        {gameStatus !== GameStatus.O_TURN &&
          gameStatus !== GameStatus.X_TURN && (
            <button className="playAgainBtn" onClick={() => playAgainClicked()}>
              Play again!
            </button>
          )}
      </div>
    </>
  );
};

export default Board;
