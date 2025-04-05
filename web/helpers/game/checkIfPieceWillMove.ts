import { Board, BoardPosition, PieceType } from "@/types/game";
import getPosibleMoves from "./getPosibleMoves";

function checkIfPieceWillMove(
  x: number,
  y: number,
  board: Board,
  pieces: PieceType[],
  piece: PieceType,
  activeCell?: BoardPosition
) {
  let willMove = false;
  if (activeCell) {
    const possibleMoves = getPosibleMoves(board, pieces, piece, activeCell);

    for (let possibleMove of possibleMoves) {
      if (possibleMove.x == x && possibleMove.y == y) {
        willMove = true;
      }
    }
  }

  return willMove
}

export default checkIfPieceWillMove;

