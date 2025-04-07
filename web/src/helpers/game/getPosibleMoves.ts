import { Board, BoardPosition, PieceAnimal, PieceType } from "@/types/game";

function isInBounds(board: Board, x: number, y: number) {
    return x >= 0 && y >= 0 && x < board.width && y < board.height;
}

function positionHasWater(board: Board, x: number, y: number) {
    return board.objects.water.some(e => e.position.x == x && e.position.y == y);
}

function positionHasATrap(board: Board, x: number, y: number) {
    return board.objects.traps.some(e => e.position.x == x && e.position.y == y);
}

export function getEndInPosition(board: Board, x: number, y: number) {
    const end = board.objects.ends.find(e => e.position.x == x && e.position.y == y);
    return end ? end : null;
}

function getActivePiece(pieces: PieceType[], activeCell: BoardPosition): PieceType | null {
    let activePiece: PieceType | null = null;

    for (let piece of pieces)
        if (piece.position.x == activeCell.x && piece.position.y == activeCell.y)
            activePiece = piece;

    return activePiece;
}

function getRatPositions(pieces: PieceType[]): BoardPosition[] {
    const ratPositions: BoardPosition[] = [];

    for (let p of pieces)
        if (p.animal == PieceAnimal.RAT)
            ratPositions.push(p.position);

    return ratPositions;
}

function isRatBlockingWaterJump(ratPositions: BoardPosition[], position: BoardPosition): boolean {
    for (let ratPosition of ratPositions)
        if (ratPosition.x == position.x && ratPosition.y == position.y)
            return true;
    return false;
}

function getPieceAboutToEat(pieces: PieceType[], position: BoardPosition) {
    const pieceAboutToEat = pieces.filter(piece => piece.position.x == position.x && piece.position.y == position.y);
    return pieceAboutToEat.length == 0 ? null : pieceAboutToEat[0];
}

export default function getPosibleMoves(
    board: Board,
    pieces: PieceType[],
    piece: PieceType | undefined,
    activeCell: BoardPosition
): BoardPosition[] {
    if (piece == undefined || pieces == undefined) return [];

    const positions: BoardPosition[] = [];
    let activePiece: PieceType | null = getActivePiece(pieces, activeCell);
    if (activePiece == null) return [];

    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    for (let direction of directions) {
        const newPosition = {
            x: activePiece.position.x + direction[0],
            y: activePiece.position.y + direction[1]
        };

        if (piece.animal == PieceAnimal.TIGER || piece.animal == PieceAnimal.LION) {
            const ratPositions: BoardPosition[] = getRatPositions(pieces);

            while (positionHasWater(board, newPosition.x, newPosition.y)) {
                if (isRatBlockingWaterJump(ratPositions, newPosition))
                    break;

                newPosition.x += direction[0];
                newPosition.y += direction[1];
            }
        }

        if (piece.animal != PieceAnimal.RAT)
            if (positionHasWater(board, newPosition.x, newPosition.y))
                continue;

        const pieceAboutToEat = getPieceAboutToEat(pieces, newPosition);
        const otherIsVulnerable = positionHasATrap(board, newPosition.x, newPosition.y);
        if (pieceAboutToEat && !otherIsVulnerable) {
            if (piece.color == pieceAboutToEat.color)
                continue;

            const elephantToRat = piece.animal == PieceAnimal.ELEPHANT && pieceAboutToEat.animal == PieceAnimal.RAT;
            if (elephantToRat)
                continue;

            const ratToElephant = piece.animal == PieceAnimal.RAT && pieceAboutToEat.animal == PieceAnimal.ELEPHANT;
            const hasLessValue = piece.animal < pieceAboutToEat.animal;
            if (!ratToElephant && hasLessValue)
                continue;

            const pieceIsRat = piece.animal == PieceAnimal.RAT;
            const isInWater = positionHasWater(board, piece.position.x, piece.position.y);
            const otherPieceIsInWater = positionHasWater(board, newPosition.x, newPosition.y);
            if (pieceIsRat && isInWater && !otherPieceIsInWater)
                continue;
        }

        const end = getEndInPosition(board, newPosition.x, newPosition.y);
        if (end && end.color === piece.color)
            continue;

        if (isInBounds(board, newPosition.x, newPosition.y))
            positions.push(newPosition);
    }

    return positions;
}
