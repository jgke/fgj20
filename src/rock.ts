import {Actor, CollisionType, Engine, EventTypes, Input, Sound, SpriteSheet, Texture, Vector} from 'excalibur';

import {Game} from './.';
import {offsetBoundingBox} from './bbox_functions';
import {Direction, Direction2Vec} from './Direction';
import {tileSize} from "./const";

export class Rock extends Actor {
  texture: Texture;
  previousDirection: Vector;
  movingTo?: Vector;

  constructor(
    initPos: Vector,
    texture: Texture,
  ) {
    super(initPos.x * tileSize + tileSize/2, initPos.y * tileSize + tileSize/2, tileSize, tileSize);

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
    }
  }

  move(to: Direction) {
    if (to === "Up") {
      this.movingTo = this.pos.add(new Vector(0, -tileSize));
    } else if (to === "Down") {
      this.movingTo = this.pos.add(new Vector(0, tileSize));
    } else if (to === "Left") {
      this.movingTo = this.pos.add(new Vector(-tileSize, 0));
    } else if (to === "Right") {
      this.movingTo = this.pos.add(new Vector(tileSize, 0));
    }
  }
}
