export enum BoardItem {
  CROSS,
  NONE,
  CIRCLE,
}

export interface Board {
  nRows: number;
  nCols: number;
  cells: Array<Array<BoardItem>>;
}

export enum GameStatus {
  X_TURN,
  O_TURN,
  X_WINS,
  O_WINS,
  NOBODY_WINS,
}

export interface WinnerPosition {
  row: number;
  col: number;
  direction: Direction;
  side: BoardItem;
}

type Direction = [number, number];

export class BoardController {
  public Board: Board;
  public status = GameStatus.X_TURN;
  public winnerPosition: WinnerPosition | null = null;

  constructor(rows: number, cols: number) {
    if (rows <= 2) throw new Error("Invalid number of rows");
    if (cols <= 2) throw new Error("Invalid number of cols");

    const bRows: BoardItem[][] = [];
    for (let i = 0; i < rows; i++) {
      const bCols: BoardItem[] = [];
      for (let k = 0; k < cols; k++) {
        bCols.push(BoardItem.NONE);
      }
      bRows.push(bCols);
    }

    this.Board = {
      nRows: rows,
      nCols: cols,
      cells: bRows,
    };
  }

  private SetCell(row: number, col: number, value: BoardItem): boolean {
    if (row < 0 || row >= this.Board.nRows) {
      throw new Error("Invalid row");
    }
    if (col < 0 || col >= this.Board.nCols) {
      throw new Error("Invalid column");
    }

    if (this.Board.cells[row][col] !== BoardItem.NONE) return false;

    this.Board.cells[row][col] = value;
    return true;
  }

  public Place(row: number, col: number) {
    if (this.status !== 0 && this.status !== 1) return;

    if (this.status === GameStatus.X_TURN) {
      this.SetCell(row, col, BoardItem.CROSS);
    } else if (this.status === GameStatus.O_TURN) {
      this.SetCell(row, col, BoardItem.CIRCLE);
    }

    this.VerifyBoard();
  }

  public ClearBoard() {
    this.Board.cells.forEach((col) => {
      col.fill(BoardItem.NONE, 0, col.length);
    });

    this.status = GameStatus.X_TURN;
    this.winnerPosition = null;
  }

  private VerifyBoard() {
    const directions: Direction[] = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
    ];

    let res = null;
    let clearPosition = false;
    for (let i = 0; i < this.Board.nRows && !res; i++) {
      for (let k = 0; k < this.Board.nCols && !res; k++) {
        if (this.Board.cells[i][k] === BoardItem.NONE) {
          clearPosition = true;
          continue;
        }

        for (let l = 0; l < directions.length && !res; l++) {
          res = this.CheckForWin(i, k, directions[l]);
        }
      }
    }

    if (res !== null) {
      this.winnerPosition = res;
      if (res.side === BoardItem.CIRCLE) {
        this.status = GameStatus.O_WINS;
      } else if (res.side === BoardItem.CROSS) {
        this.status = GameStatus.X_WINS;
      }
      return;
    }

    if (!clearPosition) {
      this.status = GameStatus.NOBODY_WINS;
      return;
    }

    if (clearPosition) {
      this.status = this.status === 0 ? 1 : 0;
    }
  }

  private CheckForWin(
    row: number,
    col: number,
    direction: Direction
  ): WinnerPosition | null {
    const side = this.Board.cells[row][col];
    console.log("rc", row, col);

    let newRow = row;
    let newCol = col;

    for (let i = 0; i < 3; i++) {
      newCol = newCol + direction[0];
      newRow = newRow + direction[1];

      if (i === 2) return { row, col, direction, side };

      if (
        newRow < 0 ||
        newRow >= this.Board.nRows ||
        newCol < 0 ||
        newCol >= this.Board.nCols ||
        this.Board.cells[newRow][newCol] !== side
      ) {
        return null;
      }
    }

    return null;
  }
}
