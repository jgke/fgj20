import {Actor, Cell, Color, Engine, Input, Scene, SpriteSheet, Texture, TileMap, TileSprite, Vector} from 'excalibur';
import {Splash} from "./loader";
import {Player} from "./player";
import {Rock} from "./rock";
import {tileSize} from "./const";
import {Direction, Direction2Vec} from "./Direction";
import {mapOrder, maps} from "./maps";

import "./styles.scss"
import {getTiles} from "./tilebuilder";
import {MyCamera} from "./camera";
import {Mainmenu} from "./mainmenu";

type Tile = "empty" | "object" | "hole";

interface Level {
  width: number;
  height: number;
  tiles: Tile[][];
}

function tilePosition(pos: Vector) {
  return new Vector(
    Math.round((pos.x - tileSize) / (2 * tileSize)),
    Math.round((pos.y - tileSize) / (2 * tileSize))
  )
}

function addBorder(map: number[][]): number[][] {
  const result = [];
  for (let y = 0; y < map.length; y++) {
    result.push([]);
    result[y].push(2);
    for (let x = 0; x < map[y].length; x++) {
      result[y].push(map[y][x])
    }
    result[y].push(2);
  }
  return [Array(map[0].length + 2).fill(2)]
    .concat(result)
    .concat([Array(map[0].length + 2).fill(2)]);
}

export class Game extends Engine {
  static width = 800;
  static height = 600;
  player: Player = undefined as any;
  rocks: Rock[] = [];
  rockTargets: Vector[] = [];
  cables: TileMap;
  tileMap: TileMap;
  mapList = mapOrder;

  currentColors = {};
  targetColors = [];
  currentMap = undefined;

  assets = {
    player: new Texture('/assets/img/player.png'),
    rock: new Texture('/assets/img/chair.png'),
    crate: new Texture('/assets/img/wood_box.png'),
    box: new Texture('/assets/img/hard_box.png'),
    map: new Texture('/assets/img/map.png'),
    tileMap: new Texture('/assets/img/walls.png'),
    cables: new Texture('/assets/img/cables.png'),
    cross: new Texture('/assets/img/cross.png'),
  };

  constructor() {
    super({
      backgroundColor: Color.fromHex("55555500"),
      width: Game.width,
      height: Game.height
    });

    this.setAntialiasing(false);
  }

  public initMaps() {
    this.mapList = [...mapOrder];
  }

  public postInit() {
    this.currentMap = this.mapList.pop();
    if (!this.currentMap) {
      // your winner
      this.goToScene('mainmenu');
      return;
    }
    const key = `game-${this.currentMap}`;
    const gameScene = new Scene(this);
    this.addScene(key, gameScene);
    document.getElementById('levelname').textContent = `${this.currentMap} ${maps[this.currentMap][1]}`;

    this.currentColors = {};
    this.targetColors = [];
    this.rocks = [];
    this.rockTargets = [];

    const map = addBorder(maps[this.currentMap][0]);

    this.cables = new TileMap(0, 0, 2 * tileSize, 2 * tileSize, map.length, map[0].length);
    this.cables.registerSpriteSheet('base',
      new SpriteSheet(this.assets.map, 4, 3, 2 * tileSize, 2 * tileSize));

    let playerPos = undefined;

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] < 0) {
          if (map[y][x] === -2) {
            playerPos = new Vector(x, y);
          }
          if (map[y][x] === -3) {
            this.rockTargets.push(new Vector(x, y));
            map[y][x] = 0;
          } else {
            continue;
          }
        }
        const ts = new TileSprite('base', map[y][x] == 2 ? 0 : map[y][x]);
        // add to cell
        this.getCell(x, y).pushSprite(ts);
        this.getCell(x, y).solid = map[y][x] === 2;
        this.getCell(x, y).cable = undefined;
        if (map[y][x] >= 4 && map[y][x] < 8) {
          this.targetColors.push(map[y][x]);
          this.getCell(x, y).cableOrigin = map[y][x];
        }
      }
    }

    const tileMap = getTiles(map.map(row => row.map(cell => cell == 2)));
    this.tileMap = new TileMap(0, 0, tileSize, tileSize, tileMap.length, tileMap[0].length);
    this.tileMap.registerSpriteSheet('base',
      new SpriteSheet(this.assets.tileMap, 5, 3, tileSize, tileSize));
    for (let y = 0; y < tileMap.length; y++) {
      for (let x = 0; x < tileMap[0].length; x++) {
        const ts = new TileSprite('base', tileMap[y][x]);
        // add to cell
        this.tileMap.getCell(x, y).pushSprite(ts);
      }
    }

    gameScene.add(this.tileMap);
    gameScene.add(this.cables);

    this.player = new Player(new Vector(playerPos.x, playerPos.y), this.assets.player);
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === -1) {
          const rock = new Rock(new Vector(x, y), this.assets[maps[this.currentMap][4] || "rock"]);
          this.rocks.push(rock);
          gameScene.add(rock);
        }
      }
    }

    for (const crossPosition of this.rockTargets) {
      const cross = new Actor(2 * crossPosition.x * tileSize + tileSize, 2 * crossPosition.y * tileSize + tileSize, 2 * tileSize, 2 * tileSize)
      cross.addDrawing(this.assets.cross);
      gameScene.add(cross);
    }

    gameScene.add(this.player);
    //gameScene.camera.strategy.lockToActor(this.player);
    gameScene.camera.addStrategy(new MyCamera(this.player, map[0].length, map.length));
    this.goToScene(key);
  }

  public getCell(x, y): Cell & { cable?: number, cableOrigin?: number } {
    return this.cables.getCell(x, y)
  }

  public getRockAt(pos: Vector): Rock | undefined {
    for (let rock of this.rocks) {
      if (pos.equals(tilePosition(rock.actualPos))) {
        return rock;
      }
    }
    return undefined;
  }

  public clearCabling(color: number) {
    this.currentColors[color] = undefined;
    for (let y = 0; y < this.cables.rows; y++) {
      for (let x = 0; x < this.cables.cols; x++) {
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

  public isComplete() {
    return this.targetColors.every(color => this.currentColors[color])
      && this.rockTargets.every(target => this.rocks.some(rock => tilePosition(rock.actualPos).equals(target)));
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
      if (this.isComplete()) {
        this.levelComplete();
        return undefined;
      }
    } else if (destRock) {
      return undefined;
    }

    if (cabling && !this.getCell(dx, dy).cableOrigin && !this.getCell(dx, dy).cable) {
      this.setCabling(dx, dy, cabling);
    } else if (cabling && this.getCell(dx, dy).cableOrigin === cabling && !cableOrigin.equals(destination)) {
      this.player.cabling = undefined;
      this.currentColors[cabling] = true;
      if (this.isComplete()) {
        this.levelComplete();
      }
    } else if (cabling && this.getCell(dx, dy).cable) {
      this.clearCabling(cabling);
      this.player.cabling = undefined;
    } else if (this.getCell(dx, dy).cableOrigin) {
      if (cabling) {
        this.clearCabling(cabling);
      }
      this.clearCabling(this.getCell(dx, dy).cableOrigin);
      this.player.cabling = this.getCell(dx, dy).cableOrigin;
      this.player.cableOrigin = new Vector(dx, dy);
    }

    return destination.scale(2 * tileSize).add(new Vector(tileSize, tileSize));
  }

  public levelStart() {
    this.postInit();
    if (!this.currentMap) {
      return;
    }

    const ui = document.getElementById('ui');
    ui.innerHTML = "";
    ui.hidden = false;

    const subcontainer = document.createElement("div");
    subcontainer.className = "levelcomplete";

    const title = document.createElement("h2");
    title.textContent = maps[this.currentMap][1];

    const body = document.createElement("p");
    body.textContent = maps[this.currentMap][2];

    const button = document.createElement("button");
    button.textContent = "Start";

    button.onclick = () => {
      ui.innerHTML = "";
      ui.hidden = true;
    };

    subcontainer.appendChild(title);
    subcontainer.appendChild(body);
    subcontainer.appendChild(button);
    ui.appendChild(subcontainer);
  }

  public levelComplete() {
    const ui = document.getElementById('ui');
    ui.innerHTML = "";
    ui.hidden = false;

    const subcontainer = document.createElement("div");
    subcontainer.className = "levelcomplete";

    const winner = document.createElement("h2");
    winner.textContent = "You're winner";

    const body = document.createElement("p");
    body.textContent = maps[this.currentMap][3];

    const button = document.createElement("button");
    button.textContent = "Continue";

    button.onclick = () => {
      ui.innerHTML = "";
      ui.hidden = true;
      this.levelStart();
    };

    subcontainer.appendChild(winner);
    subcontainer.appendChild(body);
    subcontainer.appendChild(button);
    ui.appendChild(subcontainer);
  }

  public start() {
    const loader = new Splash([
      ...Object.keys(this.assets).map(textureName => this.assets[textureName])
    ]);

    this.addScene('mainmenu', new Mainmenu(this));

    return super.start(loader)
      .then(() => this.goToScene('mainmenu'));
  }

  onPreUpdate(engine: Game, delta: number) {
    super.onPreUpdate(engine, delta);

    if (!(this.currentScene instanceof Mainmenu)) {
      if (engine.input.keyboard.wasPressed(Input.Keys.R)) {
        this.mapList.push(this.currentMap);
        this.levelStart();
      } else if (engine.input.keyboard.wasPressed(Input.Keys.N)) {
        this.levelStart();
      }
    }
  }
}

// Start the engine to begin the game.
const game = new Game();
game.start();
