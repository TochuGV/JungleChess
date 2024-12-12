"use client";
import End from "@/components/game/End";
import Modal from "@/components/game/Modal";
import Trap from "@/components/game/Trap";
import Water from "@/components/game/Water";
import { CellSizeContext } from "@/helpers/context";
import getCellColor, { getActiveCellColor } from "@/helpers/game/getCellColor";
import getPieceSource from "@/helpers/game/getPieceSource";
import getPosibleMoves, { getEndInPosition } from "@/helpers/game/getPosibleMoves";
import loadBoard from "@/helpers/game/loadBoard";
import whoWon from "@/helpers/game/whoWon";
import useCellSize from "@/hooks/useCellSize";
import { Board, BoardPosition, PieceType } from "@/types/game";
import Image from "next/image";
import { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";

interface PieceProps {
  piece: string;
  // x : [0, 6], y: [0, 8]
  position: BoardPosition;
  cellSize: number;
}

function Piece(props: PieceProps) {
  return (
    <Image
      className={`absolute`}
      style={{ transform: `translate(${props.position.x * props.cellSize}px, ${props.position.y * props.cellSize}px)` }}
      src={`/assets/pieces/${props.piece}.svg`}
      alt="piece"
      draggable={false}
      width={props.cellSize}
      height={props.cellSize}
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
  const { cellSize, margin } = useCellSize(board, 100);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);

  const handleClick = (event: any) => {
    if (!board.pieces || board.game_ended) return;
    const boardElement = boardRef.current?.getBoundingClientRect();
    const x = Math.floor((event.clientX - boardElement.left) / cellSize);
    const y = Math.floor((event.clientY - boardElement.top) / cellSize);

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
            setShowEndModal(true);
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

  const resetGame = () => {
    setBoard(loadBoard());
    setActiveCell(undefined);
    setShowEndModal(false);
  }

  return (
    <CellSizeContext.Provider value={cellSize}>
      <div
        className="m-auto w-fit grid grid-cols-7"
        onMouseDown={handleClick}
        ref={boardRef}
        style={{
          width: cellSize * board.width,
          height: cellSize * board.height,
          marginTop: margin.y / 2,
          marginBottom: margin.y / 2,
        }}>
        {new Array(board.height).fill(null).map((_, y) => (
          new Array(board.width).fill(null).map((_, x) => (
            <div
              key={x + y}
              className={`bg-primary-${getCellColor(x, y)}`}
            ></div>
          ))
        ))}

        {board.objects.traps.map(trap =>
          <Trap
            position={trap.position}
            color={trap.color}
            key={`${trap.position.x}-${trap.position.y}`}
          />
        )}

        {board.objects.ends.map(end =>
          <End
            position={end.position}
            color={end.color}
            key={`${end.position.x}-${end.position.y}`}
          />
        )}

        {board.objects.water.map(water =>
          <Water
            position={water.position}
            key={`${water.position.x}-${water.position.y}`}
          />
        )}

        {board.pieces.map(piece => <Piece key={getPieceSource(piece)} piece={getPieceSource(piece)} position={piece.position} cellSize={cellSize} />)}

        {activeCell &&
          <div
            className={`absolute ${getActiveCellColor(activeCell.x, activeCell.y)}`}
            style={{
              transform: `translate(${activeCell.x * cellSize}px, ${activeCell.y * cellSize}px)`,
              width: cellSize,
              height: cellSize
            }}
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
              className={`absolute grid place-content-center z-20`}
              style={{
                transform: `translate(${position.x * cellSize}px, ${position.y * cellSize}px)`,
                width: cellSize,
                height: cellSize
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[rgba(0,0,0,0.5)]"></div>
            </div>
          ))}
      </div>

      <Modal show={showEndModal} hide={() => setShowEndModal(false)} className="px-8 py-4 rounded-sm">
          <p className="text-xl mb-2">{whoWon(board)} won!</p>
          <button onClick={resetGame} className="bg-primary-500 text-black px-6 py-2 rounded-sm">Play Again</button>
      </Modal>
    </CellSizeContext.Provider>
  );
}
