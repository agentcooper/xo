import XOGame from './XOGame';
import XOGameView from './XOGameView';

const game = new XOGame(3);

const view = new XOGameView({
  game,
  canvas: document.querySelector('#canvas'),
  cellSize: 100
});
