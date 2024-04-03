import { BoardPosition, PieceAnimal, PieceType } from "@/types/game";

function isInBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < 7 && y < 9;
}

export default function getPosibleMoves(
    pieces: PieceType[],
    piece: PieceType | undefined,
    activeCell: BoardPosition
): BoardPosition[] {
    if (piece == undefined)
        return [];

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
        
        if (piece.animal == PieceAnimal.TIGER || piece.animal == PieceAnimal.LION) {
            while (newPosition.x >= 1 && newPosition.x <= 5 && newPosition.x !== 3 && newPosition.y >= 3 && newPosition.y <= 5) {
                newPosition.x += direction[0];
                newPosition.y += direction[1];
            }
        }
        
        if (piece.animal != PieceAnimal.RAT) {
            if (newPosition.x >= 1 && newPosition.x <= 5 && newPosition.x !== 3 && newPosition.y >= 3 && newPosition.y <= 5) {
                continue;
            }
        }

        if (isInBounds(newPosition.x, newPosition.y)) {
            positions.push(newPosition);
        }
    }

    return positions;
}