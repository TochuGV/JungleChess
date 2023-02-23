"use client"
import createGame from "@/helpers/game/createGame";
import BoardCell from "@/components/Game/boardCell";
import { useRef } from "react";
import { PieceData } from "@/interfaces/game";

function GamePiece({ data, cellSize }: { data: PieceData, cellSize: number; }) {
  return (
    <div
      style={{
        color: data.team === "R" ? "red" : "blue",
        width: cellSize,
        height: cellSize,
        left: data.position[1] * cellSize,
        top: data.position[0] * cellSize,
      }}
      className="game-piece text-4xl font-bold"
    >
      {data.name}
    </div>
  );
}

export default function Page() {
  const { board, pieces } = createGame();
  const ref = useRef<HTMLDivElement>(null);
  const boardWidth = 400;

  console.log(board);

  return (
    <div ref={ref} className="board-container">
      <div className="board" style={{ width: boardWidth }}>
        <>{board.map((row, y) => row.map((square, x) => <BoardCell {...{ x, y, square }} key={`${x}-${y}`} />))}</>
        <>{pieces.map((data) => <GamePiece data={data} cellSize={boardWidth / 9} key={data.id.toString()} />)}</>
      </div>
    </div>
  )
}

