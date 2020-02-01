import {Actor, Engine, Texture, Vector} from 'excalibur';

import {Game} from './.';
import {Direction} from './Direction';
import {tileSize} from "./const";

export class Rock extends Actor {
  texture: Texture;
  previousDirection: Vector;
  moveSpeed?: Vector;
  movingTo?: Vector;
  movingFrom?: Vector;
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
      const distance = this.movingTo.sub(this.pos);
      const speed = distance.scale(0.25).add(this.moveSpeed.scale(0.001 * delta));
      const dOrigin = this.pos.sub(this.movingFrom).magnitude();
      this.pos = this.pos.add(speed);
      if (distance.magnitude() < 5 || dOrigin >= 2 * tileSize) {
        this.pos = this.movingTo;
        this.movingTo = undefined;
      }
    }
  }

  move(to: Direction) {
    this.movingFrom = this.pos.clone();
    this.pos = this.actualPos;
    switch (to) {
      case "Up":
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Up;
        this.movingTo = this.pos.add(new Vector(0, 2 * -tileSize));
        break;
      case "Down":
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Down;
        this.movingTo = this.pos.add(new Vector(0, 2 * tileSize));
        break;
      case "Left":
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Left;
        this.movingTo = this.pos.add(new Vector(2 * -tileSize, 0));
        break;
      case "Right":
        this.movingFrom = this.pos.clone();
        this.moveSpeed = Vector.Right;
        this.movingTo = this.pos.add(new Vector(2 * tileSize, 0));
        break;
    }
    this.actualPos = this.movingTo;
  }
}
