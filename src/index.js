import './styles.scss'
import { Game } from './Game'
import { View } from './View'

const CONTROLS = {
  ArrowUp: 'ArrowUp',
  ArrowLeft: 'ArrowLeft',
  ArrowDown: 'ArrowDown',
  ArrowRight: 'ArrowRight',
}

const controlsButtons = document.querySelector('[data-controls]')


controlsButtons.addEventListener('click', event => {
  let { direction } = event.target.dataset
  if (!direction) return

  switch (direction) {
    case 'left': {
      return immediateRender({ key: CONTROLS.ArrowLeft })
    }
    case 'up': {
      return immediateRender({ key: CONTROLS.ArrowUp })
    }
    case 'right': {
      return immediateRender({ key: CONTROLS.ArrowRight })
    }
    case 'down': {
      return immediateRender({ key: CONTROLS.ArrowDown })
    }
  }
})


const game = new Game()
game.init()
const view = new View()
view.init('#canvas')
let activePiece = null
view.render(game.field)


function immediateRender(event) {
  if (game.isGameOver && event.key === ' ') {
    game.isGameOver = false
    game.startGame(play)
  }
  if (activePiece) {
    if (event.key === CONTROLS.ArrowUp) {
      game.rotate()
    } else if (event.key === CONTROLS.ArrowDown) {
      game.movePieceDown()
    } else if (event.key === CONTROLS.ArrowLeft) {
      game.movePieceLeft()
    } else if (event.key === CONTROLS.ArrowRight) {
      game.movePieceRight()
    }
    view.render(game.field)
    view.renderActivePiece(game.field, activePiece)
  }
}

document.addEventListener('keydown', immediateRender)

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