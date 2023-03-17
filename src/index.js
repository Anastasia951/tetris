import './styles.scss'
import { Game } from './Game'
import { View } from './View'

const game = new Game()
game.init()
const view = new View()
view.init('#canvas')
let activePiece = null
view.render(game.field)


document.addEventListener('keydown', event => {
  if (game.isGameOver && event.key === ' ') {
    game.isGameOver = false
    game.startGame(play)
  }
  if (activePiece) {
    if (event.key === 'ArrowUp') {
      game.rotate()
    } else if (event.key === 'ArrowDown') {
      game.movePieceDown()
    } else if (event.key === 'ArrowLeft') {
      game.movePieceLeft()
    } else if (event.key === 'ArrowRight') {
      game.movePieceRight()
    }
    view.render(game.field)
    view.renderActivePiece(game.field, activePiece)
  }
})

function play() {
  if (game.isGameOver) {
    view.showResult()
    game.endGame()
    game.clearTimer()
  } else {
    activePiece = game.activePiece
    view.clearActivePiece(activePiece)
    game.movePieceDown()
    view.renderScore(game.score)
    view.render(game.field)
    view.renderActivePiece(game.field, activePiece)
  }
}

game.startGame(play)