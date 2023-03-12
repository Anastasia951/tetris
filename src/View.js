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

  clear() {
    this.ctx.clearRect(0, 0, 400, 800)
  }
}