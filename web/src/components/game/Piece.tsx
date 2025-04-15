import { Board, BoardPosition } from "@/types/game";
import Image from "next/image";
import getPieceSource from "@/helpers/game/getPieceSource";
import { animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";

interface PieceProps {
  piece: string;
  // x : [0, 6], y: [0, 8]
  position: BoardPosition;
  cellSize: number;
  isActive: boolean;
}

function Piece(props: PieceProps) {
  const [[dx, dy], setDiff] = useState<[number,number]>([0,0]);
  
  const bind = useDrag(({ down, movement }) => {
    setDiff((down && props.isActive) ? movement : [0, 0]);
  })

  return (
    <animated.div
      {...bind()}
      className={`absolute select-none ${props.isActive ? "z-50" : ""}`}
      style={{ transform: `translate(${dx}px, ${dy}px)` }}
    >
      <Image
        src={`/assets/pieces/${props.piece}.svg`}
        style={{ transform: `translate(${props.position.x * props.cellSize}px, ${props.position.y * props.cellSize}px)` }}
        alt="piece"
        draggable={false}
        width={props.cellSize}
        height={props.cellSize}
      />
    </animated.div>
  );
}

interface PiecesProps {
  board: Board;
  cellSize: number;
  activeCell: BoardPosition | undefined;
}

export default function Pieces({ board, cellSize, activeCell }: PiecesProps) {
  return <>
    {board.pieces.map(piece => 
      <Piece 
        key={getPieceSource(piece)} 
        piece={getPieceSource(piece)} 
        position={piece.position} 
        cellSize={cellSize} 
        isActive={activeCell != undefined && piece.position.x == activeCell.x && piece.position.y == activeCell.y}
      />
    )}
  </>;
}
