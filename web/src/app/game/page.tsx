"use client"
import generateBoard from "@/helpers/game/generateBoard";
import { useRef } from "react";
import isSquareLight from "@/helpers/game/isSquareLight";
import { GameObject } from "@/interfaces/game";
import Image from "next/image";
import trap from "../../../public/images/trap.png";
import end from "../../../public/images/end.png";

export default function Page() {
  const board = generateBoard();
  const ref = useRef<HTMLDivElement>(null);
  const boardWidth = 500;

  return (
    <div ref={ref} className="board-container">
      <div className="board" style={{ width: boardWidth }}>
        {board.map((row, x) => row.map((square, y) => (
          <div
            key={`${x}-${y}`}
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
        )))}
      </div>
    </div >
  )
}

// game-square-L-light game-square-W-light game-square-T-light game-square-E-light game-square-L-dark game-square-W-dark game-square-T-dark game-square-E-dark
