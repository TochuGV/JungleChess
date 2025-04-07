import { Board, BoardPosition } from "@/types/game";
import Image from "next/image";
import getPieceSource from "@/helpers/game/getPieceSource";

interface PieceProps {
  piece: string;
  // x : [0, 6], y: [0, 8]
  position: BoardPosition;
  cellSize: number;
}

function Piece(props: PieceProps) {
  return (
    <Image
      className={`absolute select-none`}
      style={{ transform: `translate(${props.position.x * props.cellSize}px, ${props.position.y * props.cellSize}px)` }}
      src={`/assets/pieces/${props.piece}.svg`}
      alt="piece"
      draggable={false}
      width={props.cellSize}
      height={props.cellSize}
    />
  );
}

interface PiecesProps {
  board: Board;
  cellSize: number;
}

export default function Pieces({ board, cellSize }: PiecesProps) {
  return <>
    {board.pieces.map(piece => 
      <Piece 
        key={getPieceSource(piece)} 
        piece={getPieceSource(piece)} 
        position={piece.position} 
        cellSize={cellSize} 
      />
    )}
  </>;
}
