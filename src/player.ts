import {Actor, CollisionType, Engine, Input, Texture, TileMap, Vector} from 'excalibur';

import {Game} from './.';
import {tileSize} from "./const";

export class Player extends Actor {
  texture: Texture;
  previousDirection: Vector;
  movingFrom?: Vector = undefined;
  movingTo?: Vector = undefined;
  moveSpeed?: Vector;
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
      const distance = this.movingTo.sub(this.pos).scale(0.5);
      const speed = distance.scale(0.5).add(this.moveSpeed.scale(0.001 * delta));
      const dOrigin = this.pos.sub(this.movingFrom).magnitude();
      this.pos = this.pos.add(speed);
      if (distance.magnitude() < 1 || dOrigin >= tileSize) {
        this.pos = this.movingTo;
        this.movingTo = undefined;
      }
    } else {
      if (engine.input.keyboard.wasPressed(Input.Keys.Up)) {
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Up;
        this.movingTo = engine.playerMoves(this.pos, "Up");
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Down)) {
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Down;
        this.movingTo = engine.playerMoves(this.pos, "Down");
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Left)) {
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Left;
        this.movingTo = engine.playerMoves(this.pos, "Left");
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Right)) {
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Right;
        this.movingTo = engine.playerMoves(this.pos, "Right");
      }
    }
  }
}
