import Board from './Board';

import getImages from './getImages';
import scaleImages from './scaleImages';

import {
  X,
  O,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from './constants';

class XOGameView {
  constructor(params) {
    this.game = params.game;

    this.canvas = params.canvas;
    this.context = params.canvas.getContext('2d');

    this.cellSize = params.cellSize;

    this.setupEvents();

    this.renderGameToCanvas();
  }

  setupEvents() {
    const { canvas, game } = this;

    canvas.addEventListener('click', event => {
      const x = event.pageX - canvas.offsetLeft;
      const y = event.pageY - canvas.offsetTop;

      if (game.winner || !game.isWinPossible()) {
        game.reset();
        this.renderGameToCanvas();
        return;
      }

      if (!this.isCoordOnBoard(x, y)) {
        return;
      }

      const indeces = this.XYtoIndeces(x, y);

      game.move(indeces.row, indeces.column);

      this.renderGameToCanvas();
    });
  }

  drawGrid() {
    const { game, cellSize, context } = this;

    const size = game.board.getSize();

    for (let i = 1; i <= size; i++) {
      context.beginPath();
      context.moveTo(i * cellSize, 0);
      context.lineTo(i * cellSize, size * cellSize);
      context.stroke();

      context.beginPath();
      context.moveTo(0, i * cellSize);
      context.lineTo(size * cellSize, i * cellSize);
      context.stroke();
    }
  }

  showMessages(messages) {
    const { game, cellSize, context } = this;

    context.font = '24px serif';

    messages.forEach((message, index) => {
      message && context.fillText(
        message,
        game.board.getSize() * cellSize + 40,
        50 + index * 50
      );
    });
  }

  renderGameToCanvas() {
    const { game, context, cellSize } = this;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.drawGrid();

    this.showMessages([
      game.winner ?
        `${game.turn} has won the game!`
        :
        !game.isWinPossible() ?
          'No possible winning combinations left.'
          :
          `Current turn ${game.turn}`,

      game.winner ?
        'Click anywhere to start new game.'
        :
        ''
    ]);

    getImages([
      'resources/x.jpg',
      'resources/o.jpg'
    ]).then(images => {
      const [ imageX, imageO ] = scaleImages(images, cellSize);

      const shapeToImage = {
        [X]: imageX,
        [O]: imageO,
      };

      game.board.rows.forEach((row, j) => {
        row.forEach((value, i) => {
          if (!value) {
            return;
          }

          const scaledImage = shapeToImage[value];

          context.drawImage(
            scaledImage.original,
            (i * cellSize) + ((cellSize - scaledImage.width) / 2),
            (j * cellSize) + ((cellSize - scaledImage.height) / 2),
            scaledImage.width,
            scaledImage.height
          );
        });
      });
    });
  }

  isCoordOnBoard(x, y) {
    const pixelSize = this.game.board.getSize() * this.cellSize;

    return x < pixelSize && y < pixelSize;
  }

  XYtoIndeces(x, y) {
    const getIndex = coord => Math.floor(coord / this.cellSize);

    return {
      row: getIndex(y),
      column: getIndex(x),
    };
  }
}

export default XOGameView;
