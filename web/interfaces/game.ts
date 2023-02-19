export type Turn = "B" | "R";

export enum GameObject {
	Land = "L",
	Water = "W",
	End = "E",
	Trap = "T",
}

export enum Piece {
	Rat = "R",
	Cat = "C",
	Dog = "D",
	Wolf = "W",
	Cheetah = "H",
	Tiger = "T",
	Lion = "L",
	Elephant = "E",
	Empty = "-",
}

export interface PieceData {
	name: Piece;
	position: [number, number];
	team: Turn;
}

export enum MoveDirection {
	Up = "U",
	Down = "D",
	Left = "L",
	Right = "R",
}

export interface GameUser {
	username: string;
	picture: string;
	turn: Turn;
	elo?: number;
}
