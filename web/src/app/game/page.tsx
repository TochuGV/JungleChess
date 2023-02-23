"use client"
import BoardCell from "@/components/Game/boardCell";
import generateBoard from "@/helpers/game/generateBoard";
import { useRef } from "react";

export default function Page() {
  const board = generateBoard();
  const ref = useRef<HTMLDivElement>(null);
  const boardWidth = 500;

  return (
    <div ref={ref} className="board-container">
      <div className="board" style={{ width: boardWidth }}>
        {board.map((row, x) => row.map((square, y) => <BoardCell {...{ x, y, square }} />))}
      </div>
    </div>
  )
}

