export function getCellPos(event: any, boardRef: any, cellSize: number) {
  const boardElement = boardRef.current?.getBoundingClientRect();
  const x = Math.floor((event.clientX - boardElement.left) / cellSize);
  const y = Math.floor((event.clientY - boardElement.top) / cellSize);
  return { x, y };
}

export function validCellPos(x: number, y: number) {
  return x != -1 && y != -1;
}
