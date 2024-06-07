import React from "react";
import Image from "next/image";
import { BoardPosition, PieceColor } from "@/types/game";

interface EndProps {
  position: BoardPosition;
  cellSize: number;
  color: PieceColor | null;
}

export default function End(props: EndProps) {
  return (
    <div
      className={`absolute ${props.position} bg-endBackground`}
      style={{
        transform: `translate(${props.position.x * props.cellSize}px, ${props.position.y * props.cellSize}px)`,
        width: props.cellSize,
        height: props.cellSize
      }}
    >
      <Image
        src={`/assets/board/${props.color == PieceColor.BLUE ? "B" : "R"}E.svg`}
        alt="Trap"
        width={props.cellSize}
        height={props.cellSize}
        className={`scale-75 select-none`}
        draggable="false"
      />
    </div>
  );
}
