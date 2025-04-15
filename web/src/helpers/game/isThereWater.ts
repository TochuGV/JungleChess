import { Board } from "@/types/game";

export default function isThereWater(board: Board, x: number, y: number) {
  return board.objects.water.some(w => w.position.x == x && w.position.y == y);
}
