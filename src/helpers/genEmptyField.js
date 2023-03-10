export const genEmptyField = (rows, cols) => {
  return new Array(rows).fill(0).map(() => new Array(cols).fill(0))
}