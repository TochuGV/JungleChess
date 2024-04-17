export enum PieceColor {
    BLUE,
    RED
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
    position: BoardPosition;
    color: PieceColor;
}


// export enum GameModeEnum { // para mas adelante
//     CLASSIC,
// }

export interface Board {
    width: number;
    height: number;
    // turns: PieceColor[], // por si hay mas de dos jugadores y definir el orden en el que juegan
    // turn: PieceColor,
    // clock_time: number, // para mas adelante
    // game_mode: GameModeEnum, // para mas adelante
    game_ended: boolean;
    objects: {
        traps: BoardObject[];
        ends: BoardObject[];
        water: BoardObject[];
    },
    pieces: PieceType[];
}

export interface BoardPosition {
    x: number;
    y: number;
}

export enum BoardObjectType {
    END,
    TRAP,
    WATER,
}

export interface BoardObject {
    type: BoardObjectType;
    position: BoardPosition;
    color: PieceColor | null; // por ahora para el final
}

