"use client";
import Ends from "@/components/game/End";
import Modal from "@/components/game/Modal";
import Traps from "@/components/game/Trap";
import Waters from "@/components/game/Water";
import Pieces from "@/components/game/Piece";
import MoveListTable from "@/components/game/MoveListTable";
import { CellSizeContext } from "@/helpers/context";
import { getActiveCellColor } from "@/helpers/game/getCellColor";
import getPieceSource from "@/helpers/game/getPieceSource";
import getPosibleMoves, { getEndInPosition } from "@/helpers/game/getPosibleMoves";
import loadBoard from "@/helpers/game/loadBoard";
import whoWon from "@/helpers/game/whoWon";
import useCellSize from "@/hooks/useCellSize";
import { Board, BoardPosition } from "@/types/game";
import { useState, useRef } from "react";
import checkIfPieceWillMove from "@/helpers/game/checkIfPieceWillMove";
import getPieceByPosition from "@/helpers/game/getPieceByPosition";
import CellTags from "@/components/game/CellTags";
import isThereWater from "@/helpers/game/isThereWater";

export default function Page() {
  const [board, setBoard] = useState<Board>(loadBoard());
  const [activeCell, setActiveCell] = useState<BoardPosition | undefined>();
  const boardRef = useRef<any>();
  const { cellSize, margin } = useCellSize(board, 100);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);
  const [moveList, setMoveList] = useState<string[][]>([]);

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
            gameEnded = true;
            setShowEndModal(true);
          }

          // update move list
          const formattedMove = getPieceSource(piece)[1] + (pieceToEatIndex != -1 ? "x" : "") + String.fromCharCode(x + 97) + (board.height - y).toString() + (gameEnded ? "#" : "");
          if (moveList.length == 0 || moveList[moveList.length - 1].length == 2) {
            setMoveList([...moveList, [formattedMove]])
          } else {
            setMoveList([
              ...moveList.slice(0, moveList.length - 1),
              [moveList[moveList.length - 1][0], formattedMove]
            ]);
          }

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
    setMoveList([]);
  }

  return (
    <CellSizeContext.Provider value={cellSize}>
    <div className="flex m-auto w-fit">
      <div
        className="grid grid-cols-7"
        onMouseDown={handleClick}
        ref={boardRef}
        style={{
          width: cellSize * board.width,
          height: cellSize * board.height,
          marginTop: margin.y / 2,
          marginBottom: margin.y / 2,
        }}>

        <CellTags board={board} cellSize={cellSize} />
        <Traps board={board} />
        <Ends board={board} />
        <Waters board={board} />

        {activeCell &&
          <div
            className={`absolute bg-${isThereWater(board, activeCell.x, activeCell.y) ? "secondary" : "primary"}-${getActiveCellColor(activeCell.x, activeCell.y)}`}
            style={{
              transform: `translate(${activeCell.x * cellSize}px, ${activeCell.y * cellSize}px)`,
              width: cellSize,
              height: cellSize
            }}
          ></div>}

        <Pieces board={board} cellSize={cellSize} />

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
      <MoveListTable {...{board, moveList}} />
    </div>
    <Modal show={showEndModal} hide={() => setShowEndModal(false)} className="px-8 py-4 rounded-sm">
      <p className="text-xl mb-2">{whoWon(board)} won!</p>
      <button onClick={resetGame} className="bg-primary-500 text-black px-6 py-2 rounded-sm">Play Again</button>
    </Modal>
    </CellSizeContext.Provider>
  );
}
