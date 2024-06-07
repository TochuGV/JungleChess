import React from "react";
import Image from "next/image";
import { PieceColor } from "@/types/game";

interface TrapProps {
  position: string;
  color: PieceColor | null;
}

export default function Trap(props: TrapProps) {
  return (
    <div className={`absolute ${props.position} bg-trapBackground w-12 h-12`}>
      <Image
        src={`/assets/board/${props.color == PieceColor.BLUE ? "B" : "R"}T.svg`}
        alt="Trap"
        width={48}
        height={48}
        className={`scale-75 select-none`}
        draggable="false"
      />
    </div>
  );
}
