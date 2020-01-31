import {Cell, Engine, Scene, SpriteSheet, Texture, TileMap, TileSprite, Vector} from 'excalibur';
import {Splash} from "./loader";
import {Player} from "./player";
import {Rock} from "./rock";
import {tileSize} from "./const";
import {Direction, Direction2Vec} from "./Direction";
import {maps} from "./maps";

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
  rocks: Rock[] = [];
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

    const map = maps[0];

    console.log(map[0].length, map.length);

    this.tileMap = new TileMap(0, 0, tileSize, tileSize, map.length, map[0].length);
    this.tileMap.registerSpriteSheet('base',
      new SpriteSheet(this.assets.map, 4, 3, tileSize, tileSize));

    let playerPos = undefined;

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if(map[y][x] < 0) {
          if(map[y][x] === -2) {
            playerPos = new Vector(x, y);
          }
          continue;
        }
        const ts = new TileSprite('base', map[y][x]);
        // add to cell
        this.getCell(x, y).pushSprite(ts);
        this.getCell(x, y).solid = map[y][x] === 2;
        this.getCell(x, y).cable = undefined;
        if (map[y][x] >= 4 && map[y][x] < 8) {
          this.getCell(x, y).cableOrigin = map[y][x];
        }
      }
    }
    gameScene.add(this.tileMap);

    this.player = new Player(new Vector(playerPos.x, playerPos.y), this.assets.player);
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === -1) {
          const rock = new Rock(new Vector(x, y), this.assets.rock);
          this.rocks.push(rock);
          gameScene.add(rock);
        }
      }
    }

    gameScene.add(this.player);
    this.goToScene('game');
  }

  public getCell(x, y): Cell & { cable?: number, cableOrigin?: number } {
    return this.tileMap.getCell(x, y)
  }

  public getRockAt(pos: Vector): Rock | undefined {
    for (let rock of this.rocks) {
      if (pos.equals(tilePosition(rock.pos))) {
        return rock;
      }
    }
    return undefined;
  }

  public clearCabling(color: number) {
    for (let y = 0; y < this.tileMap.rows; y++) {
      for (let x = 0; x < this.tileMap.cols; x++) {
        if (this.getCell(x, y).cable === color) {
          this.setCabling(x, y, undefined);
        }
      }
    }
  }

  public setCabling(x: number, y: number, cabling?: number) {
    this.getCell(x, y).clearSprites();
    if (cabling) {
      this.getCell(x, y).cable = cabling;
      this.getCell(x, y).pushSprite(new TileSprite('base', cabling + 4));
    } else {
      this.getCell(x, y).cable = undefined;
      this.getCell(x, y).pushSprite(new TileSprite('base', 0));
    }
  }

  public playerMoves(from: Vector, to: Direction) {
    const cabling = this.player.cabling;
    const cableOrigin = this.player.cableOrigin;

    const cur = tilePosition(from);
    let destination: Vector = cur.add(Direction2Vec(to));
    const dx = destination.x;
    const dy = destination.y;

    if (this.getCell(dx, dy).solid) {
      return undefined;
    }

    const destRock = this.getRockAt(destination);
    const behind = destination.add(Direction2Vec(to));
    const behindClear = !(this.getRockAt(behind) || this.getCell(behind.x, behind.y).solid);

    if (destRock && behindClear) {
      destRock.move(to);
    } else if (destRock) {
      return undefined;
    }

    if (cabling && !this.getCell(dx, dy).cableOrigin && !this.getCell(dx, dy).cable) {
      this.setCabling(dx, dy, cabling);
    } else if (cabling && this.getCell(dx, dy).cableOrigin === cabling && !cableOrigin.equals(destination)) {
      this.player.cabling = undefined;
    } else if (cabling && this.getCell(dx, dy).cable) {
      this.clearCabling(cabling);
      this.player.cabling = undefined;
    } else if (this.getCell(dx, dy).cableOrigin) {
      if(cabling) {
        this.clearCabling(cabling);
      }
      this.clearCabling(this.getCell(dx, dy).cableOrigin);
      this.player.cabling = this.getCell(dx, dy).cableOrigin;
      this.player.cableOrigin = new Vector(dx, dy);
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
