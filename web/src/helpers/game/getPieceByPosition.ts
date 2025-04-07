import { BoardPosition, PieceType } from "@/types/game";

function getPieceByPosition(
  pieces: PieceType[],
  activeCell: BoardPosition
): {
  piece: PieceType,
  pieceIndex: number
} {
  const pieceIndex = pieces.findIndex(piece => piece.position.x == activeCell.x && piece.position.y == activeCell.y);
  const piece = pieces[pieceIndex];
  return { piece, pieceIndex };
}

export default getPieceByPosition;
