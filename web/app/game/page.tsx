import generateBoard from "@/helpers/game/generateBoard";
import isSquareLight from "@/helpers/game/isSquareLight";

export default function Page() {
  const board = generateBoard();

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="board w-[800px]">
        {board.map((row, x) => row.map((square, y) => (
          <div
            className={`game-square w-full game-square-${square}-${isSquareLight(x, y) ? "light" : "dark"}`}
            data-number-after={x === 0 ? y + 1 : ""}
            data-number-before={y === 8 ? String.fromCharCode(x + 65) : ""}
          ></div>
        )))}
      </div>
    </div>
  )
}

// game-square-L-light game-square-W-light game-square-T-light game-square-E-light game-square-L-dark game-square-W-dark game-square-T-dark game-square-E-dark
