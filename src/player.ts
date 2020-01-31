import {Actor, CollisionType, Engine, Input, Texture, TileMap, Vector} from 'excalibur';

import {Game} from './.';
import {tileSize} from "./const";

export class Player extends Actor {
  texture: Texture;
  previousDirection: Vector;
  movingTo?: Vector = undefined;
  cabling?: number;
  cableOrigin?: Vector;

  constructor(
    initPos: Vector,
    texture: Texture,
  ) {
    super(initPos.x * tileSize + tileSize / 2, initPos.y * tileSize + tileSize / 2, tileSize, tileSize);

    this.previousDirection = Vector.Right;
    this.texture = texture;
  }

  onInitialize(game: Engine) {
    this.addDrawing(this.texture);
  }

  update(engine: Game, delta: number) {
    super.update(engine, delta);

    if (this.movingTo) {
      const speed = this.pos.sub(this.movingTo).negate().scale(0.5);
      this.pos = this.pos.add(speed);
      if (speed.magnitude() < 0.05) {
        this.pos = this.pos.add(speed);
        this.movingTo = undefined;
      }
    } else {
      if (engine.input.keyboard.wasPressed(Input.Keys.Up)) {
        this.movingTo = engine.playerMoves(this.pos, "Up");
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Down)) {
        this.movingTo = engine.playerMoves(this.pos, "Down");
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Left)) {
        this.movingTo = engine.playerMoves(this.pos, "Left");
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Right)) {
        this.movingTo = engine.playerMoves(this.pos, "Right");
      }
    }
  }
}
