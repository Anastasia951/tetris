import './styles.scss'
import { Game } from './Game'
import { View } from './View'

const game = new Game()
game.init()
const view = new View()
view.init('#canvas')
window.game = game
let activePiece = null
view.render(game.field)
document.addEventListener('keydown', event => {
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


setInterval(() => {
  activePiece = game.activePiece
  view.clearActivePiece(activePiece)
  game.movePieceDown()
  view.render(game.field)
  view.renderActivePiece(game.field, activePiece)
}, 500)