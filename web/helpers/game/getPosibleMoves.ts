import { BoardPosition, PieceType } from "@/types/game";

function isInBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < 7 && y < 9;
}

export default function getPosibleMoves(
    pieces: PieceType[],
    activeCell: BoardPosition
): BoardPosition[] {
    const positions: BoardPosition[] = [];
    let activePiece: PieceType | null = null;

    for (let piece of pieces) {
        if (piece.position.x == activeCell.x && piece.position.y == activeCell.y)
            activePiece = piece;
    }

    if (activePiece == null)
        return [];

    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (let direction of directions) {
        const newPosition = {
            x: activePiece.position.x + direction[0],
            y: activePiece.position.y + direction[1]
        };

        if (isInBounds(newPosition.x, newPosition.y)) {
            positions.push(newPosition);
        }
    }

    return positions;
}