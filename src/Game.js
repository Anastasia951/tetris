import { figures } from "./figures"
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
  tetraminos = figures
  names = Object.keys(figures)

  get field() {
    return this.playfield
  }
  activePiece = null

  set activePiece(figure) {
    this.activePiece = figure
  }
  getNextTetramino() {
    let rndIndex = Math.floor(Math.random() * this.names.length)

    let name = this.names[rndIndex]
    let blocks = this.tetraminos[name]

    return {
      blocks,
      color: this.rndIndex,
      y: -1,
      x: Math.floor(Math.random() * (this.cols - 2))
    }
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
      this.activePiece.y--
    }
  }

  isOutOfBounds() {
    let { x, y, blocks } = this.activePiece
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].length; j++) {
        if (blocks[i][j] === 0) continue
        if ((this.playfield[i + y] === undefined || this.playfield[i + y][j + x] === undefined) || this.playfield[i + y][x + j]) return true
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

  rotate() {
    const { blocks } = this.activePiece
    const N = blocks.length - 1;
    let newBlocks = blocks.map((row, i) =>
      row.map((_, j) => blocks[N - j][i])
    )

    this.activePiece.blocks = newBlocks
    if (this.isOutOfBounds()) {
      this.activePiece.blocks = blocks
    }
  }
}