import {Engine, Scene, SpriteSheet, Texture, TileMap, TileSprite, Vector} from 'excalibur';
import {Splash} from "./loader";
import {Player} from "./player";
import {Rock} from "./rock";
import {tileSize} from "./const";
import {Direction, Direction2Vec} from "./Direction";

type Tile = "empty" | "object" | "hole";

interface Level {
  width: number;
  height: number;
  tiles: Tile[][];
}

function tilePosition(pos: Vector) {
  return new Vector(
    Math.round((pos.x - tileSize / 2) / tileSize),
    Math.round((pos.y - tileSize / 2) / tileSize)
  )
}

export class Game extends Engine {
  static width = 800;
  static height = 600;
  player: Player = undefined as any;
  rocks: Rock[] = []
  tileMap: TileMap;

  assets = {
    player: new Texture('/assets/img/player.png'),
    rock: new Texture('/assets/img/rock.png'),
    map: new Texture('/assets/img/map.png'),
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

    this.tileMap = new TileMap(0, 0, tileSize, tileSize, 20, 20);
    this.tileMap.registerSpriteSheet('base',
      new SpriteSheet(this.assets.map, 4, 1, tileSize, tileSize));

    const map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        const ts = new TileSprite('base', map[y][x]);
        // add to cell
        this.tileMap.getCell(x, y).pushSprite(ts);
        this.tileMap.getCell(x, y).solid = map[y][x] === 2;
      }
    }
    gameScene.add(this.tileMap);

    this.player = new Player(new Vector(4, 4), this.assets.player);
    for (let i = 0; i < 5; i++) {
      const rock = new Rock(new Vector(i + 3, 10), this.assets.rock);
      this.rocks.push(rock);
      gameScene.add(rock);
    }
    gameScene.add(this.player);
    this.goToScene('game');
  }

  public getRockAt(pos: Vector): Rock | undefined {
    for (let rock of this.rocks) {
      if (pos.equals(tilePosition(rock.pos))) {
        return rock;
      }
    }
    return undefined;
  }

  public playerMoves(from: Vector, to: Direction) {
    const cur = tilePosition(from);
    let destination: Vector = cur.add(Direction2Vec(to));

    if (this.tileMap.getCell(destination.x, destination.y).solid) {
      return undefined;
    }

    const destRock = this.getRockAt(destination);
    const behind = destination.add(Direction2Vec(to));
    const behindClear = !(this.getRockAt(behind) || this.tileMap.getCell(behind.x, behind.y).solid);

    if(destRock && behindClear) {
      destRock.move(to);
    } else if(destRock) {
      return undefined;
    }

    return destination.scale(tileSize).add(new Vector(tileSize / 2, tileSize / 2));
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
