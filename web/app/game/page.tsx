"use client";
import getCellColor, { getActiveCellColor } from "@/helpers/game/getCellColor";
import getPieceSource from "@/helpers/game/getPieceSource";
import getPosibleMoves from "@/helpers/game/getPosibleMoves";
import loadPieces from "@/helpers/game/loadPieces";
import { BoardPosition, PieceType } from "@/types/game";
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
  position: BoardPosition;
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

function checkIfPieceWillMove(
  x: number,
  y: number,
  pieces: PieceType[],
  piece: PieceType,
  activeCell?: BoardPosition
) {
  let willMove = false;
  if (activeCell) {
    const possibleMoves = getPosibleMoves(pieces, piece, activeCell);

    for (let possibleMove of possibleMoves) {
      if (possibleMove.x == x && possibleMove.y == y) {
        willMove = true;
      }
    }
  }

  return willMove
}

function getPieceByPosition(
  pieces: PieceType[],
  activeCell: BoardPosition
): {
  piece: PieceType,
  pieceIndex: number
} {
  const pieceIndex = pieces.findIndex(piece => piece.position.x == activeCell.x && piece.position.y == activeCell.y);
  const piece = pieces[pieceIndex];
  return { piece, pieceIndex };
}

export default function Page() {
  const [pieces, setPieces] = useState<PieceType[] | undefined>(loadPieces());
  const [activeCell, setActiveCell] = useState<BoardPosition | undefined>();
  const boardRef = useRef<any>();

  const handleClick = (event: any) => {
    if (!pieces) return;
    const board = boardRef.current?.getBoundingClientRect();
    const x = Math.floor((event.clientX - board.left) / 48);
    const y = Math.floor((event.clientY - board.top) / 48);

    if (x != -1 && y != -1) {
      let hasMoved = false;
      // The piece that is in the cell that will be eaten
      const currentPiece = getPieceByPosition(pieces, { x, y }).piece;

      if (activeCell) {
        // The piece that will move
        const activeCellPiece = getPieceByPosition(pieces, activeCell).piece;
        if (checkIfPieceWillMove(x, y, pieces, activeCellPiece, activeCell)) {
          const { piece, pieceIndex } = getPieceByPosition(pieces, activeCell);

          // move a piece
          setPieces(prev => prev 
            ? [
              ...prev.slice(0, pieceIndex),
              {
                ...piece,
                position: { x, y }
              },
              ...prev.slice(pieceIndex + 1)
            ]
            : []);
          setActiveCell(undefined);
          hasMoved = true;
        }
      }
      
      if (!hasMoved && getPosibleMoves(pieces, currentPiece, { x, y }).length != 0) {
        // select a piece
        setActiveCell({ x, y });
      } else {
        // unselect a piece
        setActiveCell(undefined);
      }
    }
    /*
      Hacer una interfaz con la data del tablero
      Agregar lógica en los movimientos
        - Hacer que el Leon y el Tigre salten el agua HECHO
        - Hacer que solo la rata pueda pasar por el agua HECHO
          - Hacer que el Leon y Tigre no salten sobre la Rata HECHO
        - Manejar bien las trampas y el agua
        - Hacer que las piezas se coman entre sí
          - Acordarse que la rata come al elefante
          - La rata no puede comer al elefante desde el agua
        - Manejar los turnos
        - Lógica de trampas
        - Detectar si alguien gana
    */
  }

  return (
    <div className="m-auto my-8 w-fit grid grid-cols-7" onMouseDown={handleClick} ref={boardRef}>
      {new Array(9).fill(null).map((_, y) => (
        new Array(7).fill(null).map((_, x) => (
          <div key={x + y} className={`w-12 h-12 ${getCellColor(x, y)}`}></div>
        ))
      ))}
      {activeCell &&
        <div
          className={`absolute w-12 h-12 ${getActiveCellColor(activeCell.x, activeCell.y)}`}
          style={{ transform: `translate(${activeCell.x * 48}px, ${activeCell.y * 48}px)` }}
        ></div>}

      {pieces && activeCell && 
        getPosibleMoves(
          pieces,
          getPieceByPosition(pieces, activeCell).piece,
          activeCell
        ).map(position => (
        <div
          key={`${position.x} ${position.y}`}
          className={`absolute w-12 h-12 grid place-content-center z-20`}
          style={{ transform: `translate(${position.x * 48}px, ${position.y * 48}px)` }}
        >
          <div className="w-3 h-3 rounded-full bg-[rgba(0,0,0,0.5)]"></div>
        </div>
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