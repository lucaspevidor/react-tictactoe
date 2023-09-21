import {
  BoardController,
  BoardItem,
  GameStatus,
} from "../../controllers/BoardController";
import { X, Circle } from "lucide-react";

import "./style.css";
import { useEffect, useState } from "react";
import BoardTitle from "./BoardTitle/board-title";
import BoardDescription from "./BoardDescription/board-description";

const bc = new BoardController(3, 3);

const Board = () => {
  const [board, setBoard] = useState(bc.Board);
  const [gameStatus, setGameStatus] = useState(bc.status);

  function handleClick({ rIndex, cIndex }: { rIndex: number; cIndex: number }) {
    bc.Place(rIndex, cIndex);
    setBoard({ ...bc.Board });
    setGameStatus(bc.status);
  }

  function playAgainClicked() {
    const elements = document.getElementsByClassName("boardItem");

    for (let i = 0; i < elements.length; i++) {
      elements.item(i)?.classList.add("despawn");
    }

    setTimeout(() => {
      bc.ClearBoard();
      setBoard({ ...bc.Board });
      setGameStatus(bc.status);
    }, 250);
  }

  useEffect(() => {
    if (gameStatus !== GameStatus.X_TURN && gameStatus !== GameStatus.O_TURN) {
      const elements = document.getElementsByClassName("selectable");
      console.log("Length", elements.length);
      for (let i = 0; i < elements.length; i++) {
        elements.item(i)?.classList.remove("selectable");
      }
    }

    console.log("ran");
  }, [gameStatus]);

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
      {gameStatus !== GameStatus.O_TURN && gameStatus !== GameStatus.X_TURN && (
        <button className="playAgainBtn" onClick={() => playAgainClicked()}>
          Play again!
        </button>
      )}
    </>
  );
};

export default Board;
