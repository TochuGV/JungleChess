import { BoardPosition } from "@/types/game";
import getCellColor from "@/helpers/game/getCellColor";

export default function Water(props: { position: BoardPosition }) {
  return (
    <div
      key={`${props.position.x}-${props.position.y}`}
      className={`absolute w-12 h-12
                  translate-x-[${props.position.x * 48}px]
                  translate-y-[${props.position.y * 48}px]
                  bg-secondary-${getCellColor(props.position.x, props.position.y)}`}
    ></div>
  )
}
