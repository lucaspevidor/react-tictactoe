import { BoardController, BoardItem } from "../../controllers/BoardController";
import { X, Circle } from "lucide-react";

import "./style.css";
import { useState } from "react";

const bc = new BoardController(3, 3);

const Board = () => {
  const [board, setBoard] = useState(bc.Board);
  const [gameStatus, setGameStatus] = useState(bc.status);

  function handleClick({ rIndex, cIndex }: { rIndex: number; cIndex: number }) {
    bc.Place(rIndex, cIndex);
    setBoard({ ...bc.Board });
    setGameStatus(bc.status);
  }

  return (
    <>
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
                      <div className="selectable"></div>
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>Game status: {gameStatus}</div>
    </>
  );
};

export default Board;
