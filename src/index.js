import './styles.scss'
import { Game } from './Game'
import { View } from './View'

const game = new Game()
game.init()
const view = new View()
view.init('#canvas')
window.game = game


view.render(game.field)
document.addEventListener('keydown', event => {
  let activePiece = game.activePiece
  view.clearActivePiece(activePiece)
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
})