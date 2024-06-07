import { BoardPosition } from "@/types/game";
import getCellColor from "@/helpers/game/getCellColor";

export default function Water(props: { position: BoardPosition, cellSize: number }) {
  return (
    <div
      key={`${props.position.x}-${props.position.y}`}
      style={{
        width: props.cellSize,
        height: props.cellSize,
        transform: `translate(${props.position.x * props.cellSize}px, ${props.position.y * props.cellSize}px)`
      }}
      className={`absolute bg-secondary-${getCellColor(props.position.x, props.position.y)}`}
    ></div>
  )
}
