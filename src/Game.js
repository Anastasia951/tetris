import { genEmptyField } from "./helpers/genEmptyField"
const ROWS = 20
const COLS = 10
export class Game {
  score = 0
  lines = 0
  level = 0
  rows = ROWS
  cols = COLS

  playfield = genEmptyField(ROWS, COLS)

  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ]
  }
  movePieceLeft() {
    this.activePiece.x--

    if (this.isOutOfBounds()) {
      this.activePiece.x++
    }
  }
  movePieceRight() {
    this.activePiece.x++
    if (this.isOutOfBounds()) {
      this.activePiece.x--
    }
  }
  movePieceDown() {
    this.activePiece.y++

    if (this.isOutOfBounds()) {
      this.activePiece.y++
    }
  }

  isOutOfBounds() {
    let { x, y, blocks } = this.activePiece
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].length; j++) {
        if (blocks[i][j] !== 0 && (this.playfield[i + y] === undefined || this.playfield[i + y][j + x] === undefined) || this.playfield[i + y][x + j]) return true
      }
    }
    return false
  }

  insertPiece() {
    let { blocks, x, y } = this.activePiece

    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].length; j++) {
        if (blocks[i][j]) {
          this.playfield[i + y][j + x] = blocks[i][j]
        }
      }
    }
  }
}