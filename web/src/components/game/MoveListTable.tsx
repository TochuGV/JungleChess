import useCellSize from "@/hooks/useCellSize";
import { Board } from "@/types/game";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface MoveProps {
  piece?: string;
  square?: string;
}

function Move(props: MoveProps) {
  return (
    <div className="flex">
      {props.piece && 
        <Image
          className={`select-none fill-transparent scale-110`}
          src={`/assets/pieces/${props.piece}.svg`}
          alt="piece"
          draggable={false}
          width={40}
          height={40}
        />}
      {props.square &&
        <span className="-translate-x-[4px] translate-y-[6px]">{props.square}</span>}
    </div>
  );
}

interface MoveListTableProps {
  board: Board,
  moveList: string[][]
}

function MoveListTable({ board, moveList }: MoveListTableProps) {
  const { cellSize } = useCellSize(board, 100);
  const moveListDummy = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    setTimeout(() => moveListDummy.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 0);
  }, [moveList]);

  return (
      <div
        className="my-auto ml-4 text-xl"
        style={{ height: cellSize * 9 }}
      >
        <div
          className="bg-neutral-700 overflow-y-scroll"
          style={{ width: cellSize * 6, height: cellSize * 6.6, marginTop: cellSize * 1.2 }}
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-1 pl-4"></th>
                <th className="p-1 text-left text-secondary-500">Blue</th>
                <th className="p-1 text-left text-error-500">Red</th>
              </tr>
            </thead>
            <tbody>
              {moveList
                .map((row, i) => <tr key={i} className="w-fit odd:bg-neutral-800">
                  <td className="pl-4">{i + 1}.</td>
                  <td>
                    <Move piece={"N" + row[0][0]} square={row[0].slice(1)}></Move>
                  </td>
                  <td>
                    <Move piece={row[1] ? "N" + row[1][0] : undefined} square={row[1] ? row[1].slice(1) : undefined}></Move>
                  </td>
                </tr>)}
              <tr ref={moveListDummy} tabIndex={-1}></tr>
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default MoveListTable;
