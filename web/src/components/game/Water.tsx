import { Board, BoardPosition } from "@/types/game";
import getCellColor from "@/helpers/game/getCellColor";
import { useContext } from "react";
import { CellSizeContext } from "@/helpers/context";

function Water(props: { position: BoardPosition }) {
  const cellSize = useContext(CellSizeContext);

  return (
    <div
      key={`${props.position.x}-${props.position.y}`}
      style={{
        width: cellSize,
        height: cellSize,
        transform: `translate(${props.position.x * cellSize}px, ${props.position.y * cellSize}px)`
      }}
      className={`absolute bg-secondary-${getCellColor(props.position.x, props.position.y)}`}
    ></div>
  )
}

export default function Waters({ board }: { board: Board }) {
  return <>
    {board.objects.water.map(water =>
      <Water
        position={water.position}
        key={`${water.position.x}-${water.position.y}`}
      />
    )}
  </>;
}

