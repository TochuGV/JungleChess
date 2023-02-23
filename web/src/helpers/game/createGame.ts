import { GameObject, Piece, PieceData, Turn } from "@/interfaces/game";
import data from "@/boardLayouts/main";

function generateBoard(): GameObject[][] {
  const boardStr = data.split("~~~")[0];
  const pieces = boardStr.split("\n").filter(t => t !== "");
  return pieces.map(r => r.split("") as GameObject[]);
}

function generatePieces(): PieceData[] {
  const piecesStr = data.split("~~~")[1];
  const piecesMatrix = piecesStr.split("\n")
    .filter(t => t !== "")
    .map(str => str.split(" "));

  const pieces = [];
  let currId = 0;
  for (let y = 0; y < piecesMatrix.length; y++) {
    for (let x = 0; x < piecesMatrix[0].length; x++) {
      const piece = piecesMatrix[y][x];
      if (piece === "--") continue;
      const pieceData: PieceData = { name: Piece.Rat, position: [-1, -1], team: "B", id: -1 };
      pieceData.team = piece[0] as Turn;
      pieceData.name = piece[1] as Piece;
      pieceData.position = [x, y];
      pieceData.id = currId;
      currId++;
      pieces.push(pieceData);
    }
  }

  return pieces;
}

export default function createGame(): {
  board: GameObject[][];
  pieces: PieceData[];
} {
  return { board: generateBoard(), pieces: generatePieces() }
}
