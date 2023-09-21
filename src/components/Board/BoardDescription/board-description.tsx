import { GameStatus } from "../../../controllers/BoardController";
import { X, Circle } from "lucide-react";

import "./style.css";

interface BoardDescriptionProps {
  gameStatus?: GameStatus;
}

const BoardDescription = ({ gameStatus }: BoardDescriptionProps) => {
  return (
    <p className="descriptionText">
      {gameStatus !== null && (
        <>
          {(() => {
            switch (gameStatus) {
              case GameStatus.X_TURN:
                return (
                  <span>
                    It's <X size={12} /> turn.
                  </span>
                );
              case GameStatus.O_TURN:
                return (
                  <span>
                    It's <Circle size={12} /> turn.
                  </span>
                );
              case GameStatus.X_WINS:
                return (
                  <span>
                    Congratulations! <X size={12} /> won the game!
                  </span>
                );
              case GameStatus.O_WINS:
                return (
                  <span>
                    Congratulations! <Circle size={12} /> won the game!
                  </span>
                );
              case GameStatus.NOBODY_WINS:
                return <span>Oh no! Nobody won :(</span>;
            }
          })()}
        </>
      )}
    </p>
  );
};

export default BoardDescription;
