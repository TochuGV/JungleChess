"use client";
import getCellColor, { getActiveCellColor } from "@/helpers/game/getCellColor";
import getPieceSource from "@/helpers/game/getPieceSource";
import getPosibleMoves, { getEndInPosition } from "@/helpers/game/getPosibleMoves";
import loadBoard from "@/helpers/game/loadBoard";
import { Board, BoardPosition, PieceType } from "@/types/game";
import Image from "next/image";
import { useRef, useState } from "react";

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
  board: Board,
  pieces: PieceType[],
  piece: PieceType,
  activeCell?: BoardPosition
) {
  let willMove = false;
  if (activeCell) {
    const possibleMoves = getPosibleMoves(board, pieces, piece, activeCell);

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
  const [board, setBoard] = useState<Board>(loadBoard());
  const [activeCell, setActiveCell] = useState<BoardPosition | undefined>();
  const boardRef = useRef<any>();

  const handleClick = (event: any) => {
    if (!board.pieces || board.game_ended) return;
    const boardElement = boardRef.current?.getBoundingClientRect();
    const x = Math.floor((event.clientX - boardElement.left) / 48);
    const y = Math.floor((event.clientY - boardElement.top) / 48);

    if (x != -1 && y != -1) {
      let hasMoved = false;
      // The piece that is in the cell that will be eaten
      const currentPiece = getPieceByPosition(board.pieces, { x, y }).piece;
      
      if (activeCell) {
        // The piece that will move
        const activeCellPiece = getPieceByPosition(board.pieces, activeCell).piece;
        if (checkIfPieceWillMove(x, y, board, board.pieces, activeCellPiece, activeCell)) {
          const { piece, pieceIndex } = getPieceByPosition(board.pieces, activeCell);
          const { pieceIndex: pieceToEatIndex } = getPieceByPosition(board.pieces, { x, y });

          const end = getEndInPosition(board, x, y);
          let gameEnded = false;
          if (end && end.color != piece.color) {
            console.log("Me parece que alguien gano");
            gameEnded = true;
          }

          // move a piece
          setBoard(prev => ({
            ...prev,
            pieces: prev.pieces.map((p, idx) => idx == pieceIndex ? { ...piece, position: { x, y } } : p)
              .filter((_, idx) => idx != pieceToEatIndex),
            game_ended: gameEnded,
            turn: board.turn < board.turns.length - 1 ? board.turn + 1 : 0
          }));

          setActiveCell(undefined);
          hasMoved = true;
        }
      }

      const hasNoMoves = getPosibleMoves(board, board.pieces, currentPiece, { x, y }).length != 0;
      
      let pieceSelected = false;
      if (currentPiece != undefined) {
        const isPiecesTurn = currentPiece.color == board.turns[board.turn];

        if (!hasMoved && hasNoMoves && isPiecesTurn) {
          // select a piece
          setActiveCell({ x, y });
          pieceSelected = true;
        }
      }

      if (!pieceSelected) {
        // unselect a piece
        setActiveCell(undefined);
      }
    }
  }
    
  return (
    <div className="m-auto my-8 w-fit grid grid-cols-7" onMouseDown={handleClick} ref={boardRef}>
      {new Array(board.height).fill(null).map((_, y) => (
        new Array(board.width).fill(null).map((_, x) => (
          <div key={x + y} className={`w-12 h-12 bg-primary-${getCellColor(x, y)}`}></div>
        ))
      ))}

      {board.objects.traps.map(trap =>
        <Trap
          position={`translate-x-[${trap.position.x * 48}px] translate-y-[${trap.position.y * 48}px]`}
          key={`${trap.position.x}-${trap.position.y}`}
        />
      )}

      {board.objects.ends.map(end =>
        <End
          position={`translate-x-[${end.position.x * 48}px] translate-y-[${end.position.y * 48}px]`}
          key={`${end.position.x}-${end.position.y}`}
        />
      )}

      {board.objects.water.map(water =>
        <div
          key={`${water.position.x}-${water.position.y}`}
          className={`absolute w-12 h-12
                      translate-x-[${water.position.x * 48}px]
                      translate-y-[${water.position.y * 48}px]
                      bg-secondary-${getCellColor(water.position.x, water.position.y)}`}
        ></div>
      )}

      {board.pieces.map(piece => <Piece key={getPieceSource(piece)} piece={getPieceSource(piece)} position={piece.position} />)}

      {activeCell &&
        <div
          className={`absolute w-12 h-12 ${getActiveCellColor(activeCell.x, activeCell.y)}`}
          style={{ transform: `translate(${activeCell.x * 48}px, ${activeCell.y * 48}px)` }}
        ></div>}

      {board.pieces && activeCell &&
        getPosibleMoves(
          board,
          board.pieces,
          getPieceByPosition(board.pieces, activeCell).piece,
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
    </div>
  );
}

//  translate-x-[0px] translate-x-[48px] translate-x-[96px] translate-x-[144px] translate-x-[192px] translate-x-[240px] translate-x-[288px] translate-x-[336px] translate-x-[384px] translate-x-[432px] translate-y-[0px] translate-y-[48px] translate-y-[96px] translate-y-[144px] translate-y-[192px] translate-y-[240px] translate-y-[288px] translate-y-[336px] translate-y-[384px] translate-y-[432px]
