export default function getCellColor(x: number, y: number) {
    let color = "primary";
    if (x >= 1 && x <= 5 && x !== 3 && y >= 3 && y <= 5)
      color = "secondary";
    if (y % 2 == 0)
      return x % 2 == 0 ? `bg-${color}-500` : `bg-${color}-700`;
    else
      return x % 2 != 0 ? `bg-${color}-500` : `bg-${color}-700`;
}

export function getActiveCellColor(x: number, y: number) {
  let color = "primary";
  if (x >= 1 && x <= 5 && x !== 3 && y >= 3 && y <= 5)
    color = "secondary";
  if (y % 2 == 0)
    return x % 2 == 0 ? `bg-${color}-400` : `bg-${color}-600`;
  else
    return x % 2 != 0 ? `bg-${color}-400` : `bg-${color}-600`;
}

// "bg-primary-500" "bg-primary-700" "bg-secondary-500" "bg-secondary-700"
// "bg-primary-400" "bg-primary-600" "bg-secondary-400" "bg-secondary-600"
