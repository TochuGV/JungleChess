"use client";
import getCellColor from "@/helpers/game/getCellColor";
import getPieceSource from "@/helpers/game/getPieceSource";
import loadPieces from "@/helpers/game/loadPieces";
import { PieceType } from "@/types/game";
import Image from "next/image";
import { MouseEventHandler, useRef, useState } from "react";

interface TrapProps {
  position: string;
}

function Trap(props: TrapProps) {
  return (
    <Image
      src="/assets/board/trap.png"
      alt="Trap"
      width={48}
      height={48}
      className={`absolute ${props.position} scale-75 select-none`}
      draggable="false"
    />
  );
}

interface EndProps {
  position: string;
}

function End(props: EndProps) {
  return (
    <Image
      src="/assets/board/end.png"
      alt="Trap"
      width={48}
      height={48}
      className={`absolute ${props.position} scale-75 select-none`}
      draggable="false"
    />
  );
}

interface PieceProps {
  piece: string;
  // x : [0, 6], y: [0, 8]
  position: { x: number, y: number };
}

function Piece(props: PieceProps) {
  return (
    <Image
      className={`absolute`}
      style={{ transform: `translate(${props.position.x * 48}px, ${props.position.y * 48}px)` }}
      src={`/assets/pieces/${props.piece}.svg`}
      alt="piece"
      draggable={false}
      width={48}
      height={48}
    />
  );
}

export default function Page() {
  const [pieces, setPieces] = useState<PieceType[] | undefined>(loadPieces());
  const boardRef = useRef<any>();

  const handleClick = (event: any) => {
    const board = boardRef.current?.getBoundingClientRect();
    const x = Math.floor((event.clientX - board.left) / 48);
    const y = Math.floor((event.clientY - board.top) / 48);
    if (x != -1 && y != -1) {
      console.log(x, y);
    }
    /*
      Hacer que la pieza aparezca como activa
      Hacer que la pieza ya no aparezca como activa cuando haces click en otro lugar
      Mover la pieza
      Agregar lógica en los movimientos
    */
  }

  return (
    <div className="m-auto my-8 w-fit grid grid-cols-7" onMouseDown={handleClick} ref={boardRef}>
      {new Array(9).fill(null).map((_, y) => (
        new Array(7).fill(null).map((_, x) => (
          <div key={x + y} className={`w-12 h-12 ${getCellColor(x, y)}`}></div>
        ))
      ))}
      <Trap position="translate-x-24" />
      <Trap position="translate-x-36 translate-y-12" />
      <Trap position="translate-x-48" />
      <Trap position="translate-x-24 translate-y-96" />
      <Trap position="translate-x-36 translate-y-84" />
      <Trap position="translate-x-48 translate-y-96" />
      <End position="translate-x-36" />
      <End position="translate-x-36 translate-y-96" />
      {pieces?.map(piece => <Piece key={getPieceSource(piece)} piece={getPieceSource(piece)} position={piece.position} />)}
    </div>
  );
}

//  translate-x-[0px] translate-x-[48px] translate-x-[96px] translate-x-[144px] translate-x-[192px] translate-x-[240px] translate-x-[288px] translate-x-[336px] translate-x-[384px] translate-x-[432px] translate-y-[0px] translate-y-[48px] translate-y-[96px] translate-y-[144px] translate-y-[192px] translate-y-[240px] translate-y-[288px] translate-y-[336px] translate-y-[384px] translate-y-[432px]