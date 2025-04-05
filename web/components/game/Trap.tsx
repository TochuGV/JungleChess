import React, { useContext } from "react";
import Image from "next/image";
import { Board, BoardPosition, PieceColor } from "@/types/game";
import { CellSizeContext } from "@/helpers/context";

interface TrapProps {
  position: BoardPosition;
  color: PieceColor | null;
}

function Trap(props: TrapProps) {
  const cellSize = useContext(CellSizeContext);

  return (
    <div
      className={`absolute ${props.position} bg-trapBackground`}
      style={{
        transform: `translate(${props.position.x * cellSize}px, ${props.position.y * cellSize}px)`,
        width: cellSize,
        height: cellSize
      }}
    >
      <Image
        src={`/assets/board/${props.color == PieceColor.BLUE ? "B" : "R"}T.svg`}
        alt="Trap"
        width={cellSize}
        height={cellSize}
        className={`scale-75 select-none`}
        draggable="false"
      />
    </div>
  );
}

interface TrapsProps {
  board: Board;
}

export default function Traps({ board }: TrapsProps) {
  return <>
    {board.objects.traps.map(trap =>
      <Trap
        position={trap.position}
        color={trap.color}
        key={`${trap.position.x}-${trap.position.y}`}
      />
    )}
  </>
}

