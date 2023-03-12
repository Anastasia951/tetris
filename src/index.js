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
console.log(game.activePiece)
game.movePieceDown()
game.movePieceDown()
game.movePieceDown()
game.insertPiece()
console.log(game.playfield)
view.render(game.field)