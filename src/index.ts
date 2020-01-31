import {Engine, Scene, Texture, Vector} from 'excalibur';
import {Splash} from "./loader";
import {Player} from "./player";

type Tile = "empty" | "object" | "hole";

interface Level {
  width: number;
  height: number;
  tiles: Tile[][];
}

export class Game extends Engine {
  static width = 800;
  static height = 600;
  player: Player = undefined as any;

  assets = {
    player: new Texture('/assets/img/player.png')
  };

  constructor() {
    super({
      width: Game.width,
      height: Game.height
    });

    this.setAntialiasing(false);
  }

  public postInit() {
    const gameScene = new Scene(this);
    this.addScene('game', gameScene);

    this.player = new Player(
      new Vector(0, 0),
      this.assets.player
    );
    gameScene.add(this.player);
    this.goToScene('game');
  }

  public start() {
    const loader = new Splash([
      ...Object.keys(this.assets).map(textureName => this.assets[textureName])
    ]);

    return super.start(loader).then(() => this.postInit());
  }
}

// Start the engine to begin the game.
const game = new Game();
game.start();
