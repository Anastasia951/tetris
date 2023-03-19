import { figures } from "./figures"
import { genEmptyField } from "./helpers/genEmptyField"
const ROWS = 20
const COLS = 10


export class Game {
  score = 0
  rows = ROWS
  cols = COLS
  playfield = genEmptyField(ROWS, COLS)
  tetraminos = figures
  names = Object.keys(figures)
  activePiece = null
  isGameOver = false
  timer = null
  get field() {
    return this.playfield
  }
  init() {
    this.activePiece = this.getNextTetramino()
  }

  set activePiece(figure) {
    this.activePiece = figure
  }
  getNextTetramino() {
    let rndIndex = Math.floor(Math.random() * this.names.length)

    let name = this.names[rndIndex]
    let blocks = this.tetraminos[name]

    return {
      blocks,
      y: -1,
      x: Math.floor(Math.random() * (this.cols - blocks.length))
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
      this.insertPiece()
      this.activePiece = this.getNextTetramino()
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
          if (i + y < 0) {
            this.isGameOver = true
            return
          }
          this.playfield[i + y][j + x] = blocks[i][j]
        }
      }
    }

    this.removeFullLines()
  }

  removeFullLines() {
    let { blocks, x, y } = this.activePiece
    const blocksCopy = [...blocks]
    this.activePiece.blocks = blocksCopy
    for (let i = 0; i < this.field.length; i++) {
      let row = this.field[i]
      if (row.every(el => !!el)) {
        this.field.splice(i, 1)
        if (i - y < blocks.length) {
          blocksCopy.splice(i - y, 1)
          blocksCopy.unshift(new Array(blocks.length).fill(0))
        }
        i--
      }
    }

    let diff = this.rows - this.field.length
    this.score += diff
    for (let i = 0; i < diff; i++) {
      this.field.unshift(new Array(this.cols).fill(0))
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

  endGame() {
    this.score = 0
    this.rows = ROWS
    this.cols = COLS
    this.playfield = genEmptyField(ROWS, COLS)
    this.activePiece = null
  }
  clearTimer() {
    clearInterval(this.timer)
  }

  startGame(cb) {
    this.activePiece = this.getNextTetramino()
    this.timer = setInterval(() => {
      cb()
    }, 500)
  }
}