import { Board } from "@/types/game";
import { useEffect, useState } from "react";

interface Margin {
  x: number;
  y: number;
}

interface ResType {
  cellSize: number;
  margin: Margin;
}

const MARGIN_X: number = 20;
const MARGIN_Y: number = 64;

const INITIAL_MARGIN: Margin = {
  x: MARGIN_X,
  y: MARGIN_Y
};

export default function useCellSize(board: Board, ms: number): ResType {
  const [cellSize, setCellSize] = useState<number>(0);
  const [margin, setMargin] = useState<Margin>(INITIAL_MARGIN);

  useEffect(() => {
    let timeout: any = null;
    function updateCellSize() {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        let mx = (MARGIN_X * 10 > window.innerWidth) ? 0 : MARGIN_X;
        let my = (MARGIN_Y * 5 > window.innerHeight) ? 0 : MARGIN_Y;

        let size = (window.innerHeight - my) / board.height;

        if (size > (window.innerWidth - mx * 2) / board.width)
          size = (window.innerWidth - mx) / board.width

        setMargin({ x: mx, y: my });
        setCellSize(size);
      }, ms);
    }

    window.addEventListener("resize", updateCellSize);
    updateCellSize();

    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  return { cellSize, margin };
}
