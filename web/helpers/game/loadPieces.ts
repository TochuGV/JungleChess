import { PieceAnimal, PieceColor, PieceType } from "@/types/game";

export default function loadPieces(): PieceType[] {
    return [
       { animal: PieceAnimal.RAT, color: PieceColor.RED, position: { x: 0, y: 2 } },
       { animal: PieceAnimal.CAT, color: PieceColor.RED, position: { x: 5, y: 1 } },
       { animal: PieceAnimal.DOG, color: PieceColor.RED, position: { x: 1, y: 1 } },
       { animal: PieceAnimal.WOLF, color: PieceColor.RED, position: { x: 4, y: 2 } },
       { animal: PieceAnimal.CHEETAH, color: PieceColor.RED, position: { x: 2, y: 2 } },
       { animal: PieceAnimal.TIGER, color: PieceColor.RED, position: { x: 6, y: 0 } },
       { animal: PieceAnimal.LION, color: PieceColor.RED, position: { x: 0, y: 0 } },
       { animal: PieceAnimal.ELEPHANT, color: PieceColor.RED, position: { x: 6, y: 2 } },
       { animal: PieceAnimal.RAT, color: PieceColor.BLUE, position: { x: 6, y: 6 } },
       { animal: PieceAnimal.CAT, color: PieceColor.BLUE, position: { x: 1, y: 7 } },
       { animal: PieceAnimal.DOG, color: PieceColor.BLUE, position: { x: 5, y: 7 } },
       { animal: PieceAnimal.WOLF, color: PieceColor.BLUE, position: { x: 2, y: 6 } },
       { animal: PieceAnimal.CHEETAH, color: PieceColor.BLUE, position: { x: 4, y: 6 } },
       { animal: PieceAnimal.TIGER, color: PieceColor.BLUE, position: { x: 0, y: 8 } },
       { animal: PieceAnimal.LION, color: PieceColor.BLUE, position: { x: 6, y: 8 } },
       { animal: PieceAnimal.ELEPHANT, color: PieceColor.BLUE, position: { x: 0, y: 6 } },
    ];
}