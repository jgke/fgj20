import {Actor, Engine, Texture, Vector} from 'excalibur';

import {Game} from './.';
import {Direction} from './Direction';
import {tileSize} from "./const";

export class Rock extends Actor {
  texture: Texture;
  previousDirection: Vector;
  movingTo?: Vector;
  actualPos: Vector;

  constructor(
    initPos: Vector,
    texture: Texture,
  ) {
    super(2 * initPos.x * tileSize + tileSize, 2 * initPos.y * tileSize + tileSize, tileSize, tileSize);
    this.scale = new Vector(2, 2);

    this.previousDirection = Vector.Right;
    this.texture = texture;
    this.actualPos = this.pos;
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
    }
  }

  move(to: Direction) {
    if (to === "Up") {
      this.movingTo = this.pos.add(new Vector(0, 2 * -tileSize));
    } else if (to === "Down") {
      this.movingTo = this.pos.add(new Vector(0, 2 * tileSize));
    } else if (to === "Left") {
      this.movingTo = this.pos.add(new Vector(2 * -tileSize, 0));
    } else if (to === "Right") {
      this.movingTo = this.pos.add(new Vector(2 * tileSize, 0));
    }
    this.actualPos = this.movingTo;
  }
}
