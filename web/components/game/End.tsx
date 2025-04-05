import React, { useContext } from "react";
import Image from "next/image";
import { Board, BoardPosition, PieceColor } from "@/types/game";
import { CellSizeContext } from "@/helpers/context";

interface EndProps {
  position: BoardPosition;
  color: PieceColor | null;
}

function End(props: EndProps) {
  const cellSize = useContext(CellSizeContext);
  
  return (
    <div
      className={`absolute bg-endBackground-${props.color == PieceColor.BLUE ? 0 : 1}`}
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

interface EndsProps {
  board: Board;
}

export default function Ends({ board }: EndsProps) {
  return <>
        {board.objects.ends.map(end =>
          <End
            position={end.position}
            color={end.color}
            key={`${end.position.x}-${end.position.y}`}
          />
        )}
  </>
}

// bg-endBackground-0 bg-endBackground-1
