export default function isSquareLight(i: number, j: number) {
  if (i % 2 === 0) {
    if (j % 2 === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (j % 2 === 0) {
      return false;
    } else {
      return true;
    }
  }
}