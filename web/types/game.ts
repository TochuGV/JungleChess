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
  
export interface PieceType {
    animal: PieceAnimal;
    position: { x: number, y: number };
    color: PieceColor;
}
