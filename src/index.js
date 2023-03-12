import './styles.scss'
import { Game } from './Game'
import { View } from './View'

const game = new Game()
const view = new View()
window.game = game


view.init('#canvas')
view.render(game.field)
let figure = game.getNextTetramino()
game.activePiece = figure
let activePiece = game.activePiece
document.addEventListener('keydown', event => {
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
  view.renderActivePiece(activePiece)
})