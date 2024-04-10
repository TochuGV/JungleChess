export default function getCellColor(x: number, y: number) {
    if (y % 2 == 0)
      return x % 2 == 0 ? '500' : '700';
    else
      return x % 2 != 0 ? '500' : '700';
}

export function getActiveCellColor(x: number, y: number) {
  if (y % 2 == 0)
    return x % 2 == 0 ? '400' : '600';
  else
    return x % 2 != 0 ? '400' : '600';
}

// "bg-primary-500" "bg-primary-700" "bg-secondary-500" "bg-secondary-700"
// "bg-primary-400" "bg-primary-600" "bg-secondary-400" "bg-secondary-600"
