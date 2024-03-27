export enum PieceColor {
    BLUE, RED
}
  
export enum PieceAnimal {
    RAT,
    CAT,
    DOG,
    WOLF,
    CHEETAH,
    TIGER,
    LION,
    ELEPHANT,
}

export interface BoardPosition {
    x: number;
    y: number;
}
  
export interface PieceType {
    animal: PieceAnimal;
    position: BoardPosition;
    color: PieceColor;
}
