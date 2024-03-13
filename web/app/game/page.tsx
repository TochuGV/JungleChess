import Image from "next/image";

function getCellColor(x: number, y: number) {
  let color = "primary";
  if (x >= 1 && x <= 5 && x !== 3 && y >= 3 && y <= 5)
    color = "secondary";
  if (y % 2 == 0)
    return x % 2 == 0 ? `bg-${color}-500` : `bg-${color}-700`;
  else
    return x % 2 != 0 ? `bg-${color}-500` : `bg-${color}-700`;
}

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
}

function Piece(props: PieceProps) {
  return (
    <Image
      className="absolute translate-x-72 translate-y-72"
      src={`/assets/pieces/${props.piece}.svg`}
      alt="piece"
      draggable={false}
      width={48}
      height={48}
    />
  );
}

export default function Page() {
  return (
    <div className="m-auto my-8 w-fit grid grid-cols-7">
      {new Array(9).fill(null).map((_, y) => (
        new Array(7).fill(null).map((_, x) => (
          <div className={`w-12 h-12 ${getCellColor(x, y)}`}></div>
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
      <Piece piece="BR" />
    </div>
  );
}

// "bg-primary-500" "bg-primary-700" "bg-secondary-500" "bg-secondary-700"
