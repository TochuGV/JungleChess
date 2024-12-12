import { Board, PieceColor } from "@/types/game";

export default function whoWon(board: Board): string {
    let index: number = board.turns.findIndex(t => t == board.turn) - 1;
    switch(index % board.turns.length) {
        case PieceColor.BLUE:
            return "Blue";
        case PieceColor.RED:
            return "Red"
        default:
            return ""
    }
}