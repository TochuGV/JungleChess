import React, { useContext } from "react";
import Image from "next/image";
import { BoardPosition, PieceColor } from "@/types/game";
import { CellSizeContext } from "@/helpers/context";

interface EndProps {
  position: BoardPosition;
  color: PieceColor | null;
}

export default function End(props: EndProps) {
  const cellSize = useContext(CellSizeContext);

  return (
    <div
      className={`absolute ${props.position} bg-endBackground`}
      style={{
        transform: `translate(${props.position.x * cellSize}px, ${props.position.y * cellSize}px)`,
        width: cellSize,
        height: cellSize
      }}
    >
      <Image
        src={`/assets/board/${props.color == PieceColor.BLUE ? "B" : "R"}E.svg`}
        alt="Trap"
        width={cellSize}
        height={cellSize}
        className={`scale-75 select-none`}
        draggable="false"
      />
    </div>
  );
}
function UseContext(CellSizeContext: React.Context<number>) {
  throw new Error("Function not implemented.");
}

