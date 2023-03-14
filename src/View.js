export class View {
  canvas = null
  ctx = null
  cellSize = 40
  colors = ['darkgray', 'aqua', 'blue', 'orange', 'yellow', 'green', 'violet', 'red']

  init(selector) {
    this.canvas = document.querySelector(selector)
    this.canvas.style.width = 200 + 'px'
    this.canvas.style.height = 400 + 'px'
    this.canvas.width = 400
    this.canvas.height = 800
    this.ctx = this.canvas.getContext('2d')
    this.ctx.strokeStyle = 'white'

    this.scoreElem = document.querySelector(`[data-score]`)
  }

  render(field) {
    if (this.ctx) {
      for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[row].length; col++) {
          this.ctx.fillStyle = this.colors[field[row][col]]
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize)
          this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize)
        }
      }
    }
  }

  renderScore(score) {
    this.scoreElem.innerHTML = score
  }

  clearActivePiece({ x, y, blocks }) {
    this.ctx.fillStyle = this.colors[0]
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].length; j++) {
        if (blocks[i][j]) {
          let col = x + j
          let row = y + i
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize)
          this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize)
        }
      }
    }
  }

  renderActivePiece(field, { blocks, x, y }) {
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].length; j++) {
        let col = x + j
        let row = y + i
        let color = 0
        if (field[row] && field[row][col]) {
          color = field[row][col]
        }
        if (blocks[i][j]) {
          color = blocks[i][j]
        }
        this.ctx.fillStyle = this.colors[color]
        this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize)
        this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize)
      }
    }
  }
}