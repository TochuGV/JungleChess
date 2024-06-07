import React from "react";
import Image from "next/image";
import { BoardPosition, PieceColor } from "@/types/game";

interface TrapProps {
  position: BoardPosition;
  cellSize: number;
  color: PieceColor | null;
}

export default function Trap(props: TrapProps) {
  return (
    <div
      className={`absolute ${props.position} bg-trapBackground`}
      style={{
        transform: `translate(${props.position.x * props.cellSize}px, ${props.position.y * props.cellSize}px)`,
        width: props.cellSize,
        height: props.cellSize
      }}
    >
      <Image
        src={`/assets/board/${props.color == PieceColor.BLUE ? "B" : "R"}T.svg`}
        alt="Trap"
        width={props.cellSize}
        height={props.cellSize}
        className={`scale-75 select-none`}
        draggable="false"
      />
    </div>
  );
}
