import {Actor, CollisionType, Engine, EventTypes, Input, Sound, SpriteSheet, Texture, Vector} from 'excalibur';

import {Game} from './.';
import {offsetBoundingBox} from './bbox_functions';
import {Direction, Direction2Vec} from './Direction';
import {tileSize} from "./const";

export class Rock extends Actor {
  texture: Texture;
  previousDirection: Vector;
  position = new Vector(0, 0);

  constructor(
    initPos: Vector,
    texture: Texture,
  ) {
    super(initPos.x * tileSize + tileSize/2, initPos.y * tileSize + tileSize/2, tileSize, tileSize);

    this.previousDirection = Vector.Right;
    this.texture = texture;
    this.body.collider.type = CollisionType.Active;
  }

  onInitialize(game: Engine) {
    this.addDrawing(this.texture);
  }

  update(engine: Game, delta: number) {
    super.update(engine, delta);
  }
}
