import {Engine} from 'excalibur';

export class Game extends Engine {
  static width = 800;
  static height = 600;

  constructor() {
    super({
      width: Game.width,
      height: Game.height
    });

    this.setAntialiasing(false);
  }
}

// Start the engine to begin the game.
const game = new Game();
game.start();
