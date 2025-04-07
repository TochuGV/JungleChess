import { PieceAnimal, PieceColor, PieceType } from "@/types/game";

export default function getPieceSource(piece: PieceType): string {
    let color = "", animal = "", res;
  
    switch (piece.color) {
      case PieceColor.BLUE:
        color = "B";
        break;
      case PieceColor.RED:
        color = "R";
        break;
    }
  
    switch (piece.animal) {
      case PieceAnimal.RAT:
        animal = "R";
        break;
      case PieceAnimal.CAT:
        animal = "C";
        break;
      case PieceAnimal.DOG:
        animal = "D";
        break;
      case PieceAnimal.WOLF:
        animal = "W";
        break;
      case PieceAnimal.CHEETAH:
        animal = "H";
        break;
      case PieceAnimal.TIGER:
        animal = "T";
        break;
      case PieceAnimal.LION:
        animal = "L";
        break;
      case PieceAnimal.ELEPHANT:
        animal = "E";
        break;
    }
  
    res = color + animal;
  
    return res;
  }