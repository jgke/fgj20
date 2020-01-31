import {Actor, CollisionType, Engine, Input, Texture, Vector} from 'excalibur';

import {Game} from './.';
import {tileSize} from "./const";

export class Player extends Actor {
  texture: Texture;
  previousDirection: Vector;
  movingTo?: Vector = undefined;

  constructor(
    initPos: Vector,
    texture: Texture,
  ) {
    super(initPos.x * tileSize + tileSize / 2, initPos.y * tileSize + tileSize / 2, tileSize, tileSize);

    this.previousDirection = Vector.Right;
    this.texture = texture;
    this.body.collider.type = CollisionType.Active;
  }

  onInitialize(game: Engine) {
    this.addDrawing(this.texture);
  }

  update(engine: Game, delta: number) {
    super.update(engine, delta);

    if (this.movingTo) {
      this.movingTo = this.movingTo.scale(0.5);
      this.pos = this.pos.add(this.movingTo);
      if (this.movingTo.magnitude() < 0.01) {
        this.pos = this.pos.add(this.movingTo);
        this.movingTo = undefined;
      }
    } else {
      if (engine.input.keyboard.wasPressed(Input.Keys.Up)) {
        this.movingTo = new Vector(0, -tileSize);
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Down)) {
        this.movingTo = new Vector(0, tileSize);
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Left)) {
        this.movingTo = new Vector(-tileSize, 0);
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Right)) {
        this.movingTo = new Vector(tileSize, 0);
      }
    }
  }
}
