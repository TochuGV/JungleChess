import isSquareLight from "@/helpers/game/isSquareLight";
import { GameObject } from "@/interfaces/game";
import Image from "next/image";
import trap from "@/../public/images/board/trap.png";
import end from "@/../public/images/board/end.png";

export default function BoardCell({ square, x, y }: { square: GameObject; x: number; y: number; }) {
  return (
    <div
      className={`game-square p-2 game-square-${square}-${isSquareLight(x, y) ? "light" : "dark"}`}
      data-number-after={x === 0 ? y + 1 : ""}
      data-number-before={y === 8 ? String.fromCharCode(x + 65) : ""}
    >
      <div className="relative w-full h-full board-image-container">
        {square === GameObject.Trap && <Image
          src={trap}
          alt="Trap Game Object"
          fill={true}
          className="select-none"
          draggable={false}
        />}
        {square === GameObject.End && <Image
          src={end}
          alt="End Game Object"
          fill={true}
          className="select-none"
          draggable={false}
        />}
      </div>
    </div>
  )
}

// game-square-L-light game-square-W-light game-square-T-light game-square-E-light game-square-L-dark game-square-W-dark game-square-T-dark game-square-E-dark
