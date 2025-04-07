import getCellColor from "@/helpers/game/getCellColor";
import { Board } from "@/types/game";

interface Props {
  board: Board;
  cellSize: number;
}

export default function CellTags({ board, cellSize }: Props) {
  return <>
    {new Array(board.height).fill(null).map((_, y) => (
      new Array(board.width).fill(null).map((_, x) => {
        const isFirstRow = y === board.height - 1;
        const isFirstColumn = x === 0;
        return (
          <div
            key={`${x} - ${y}`}
            className={`bg-primary-${getCellColor(x, y)}`}
          >
            {isFirstRow && (
              <span
                className="absolute text-white font-semibold z-10"
                style={{ transform: `translate(${cellSize - 16}px, ${cellSize - 20}px)` }}
              >
                {String.fromCharCode(65 + x)}
              </span>
            )}
            {isFirstColumn && (
              <span
                className="absolute text-white font-semibold z-10"
                style={{ transform: `translate(4px, 2px)` }}
              >
                {board.height - y}
              </span>
            )}
          </div>)
      })
    ))
    }
  </>;
}
