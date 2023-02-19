import { GameObject } from "@/interfaces/game";

export default function generateBoard() {
  const board: GameObject[][] = [];

  for (let i = 0; i < 7; i++) {
    const row: GameObject[] = [];

    for (let j = 0; j < 9; j++) {
      row.push(GameObject.Land);
    }

    board.push(row);
  }

  board[2][0] = GameObject.Trap;
  board[3][0] = GameObject.End;
  board[4][0] = GameObject.Trap;
  board[3][1] = GameObject.Trap;

  board[1][3] = GameObject.Water;
  board[2][3] = GameObject.Water;
  board[1][4] = GameObject.Water;
  board[2][4] = GameObject.Water;
  board[1][5] = GameObject.Water;
  board[2][5] = GameObject.Water;

  board[4][3] = GameObject.Water;
  board[5][3] = GameObject.Water;
  board[4][4] = GameObject.Water;
  board[5][4] = GameObject.Water;
  board[4][5] = GameObject.Water;
  board[5][5] = GameObject.Water;
  
  board[3][7] = GameObject.Trap;
  board[2][8] = GameObject.Trap;
  board[3][8] = GameObject.End;
  board[4][8] = GameObject.Trap;

  return board;
}