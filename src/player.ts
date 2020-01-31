import {Actor, CollisionType, Engine, EventTypes, Input, Sound, SpriteSheet, Texture, Vector} from 'excalibur';

import {Game} from './.';
import {offsetBoundingBox} from './bbox_functions';
import {Direction, Direction2Vec} from './Direction';
import {tileSize} from "./const";

export class Player extends Actor {
  texture: Texture;
  spriteSheet: SpriteSheet;
  lastDirectionPressed?: Direction;
  previousDirection: Vector;
  position = new Vector(0, 0);

  constructor(
    initPos: Vector,
    texture: Texture,
  ) {
    super(initPos.x * tileSize, initPos.y * tileSize, 40, 40);

    this.previousDirection = Vector.Right;
    this.texture = texture;
    this.collisionType = CollisionType.Active;
  }

  onInitialize(game: Engine) {
    this.spriteSheet = new SpriteSheet(this.texture, 1, 1, 32, 32);
    this.scale = new Vector(2, 2);
  }

  draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta);
  }

  update(engine: Game, delta: number) {
    super.update(engine, delta);

    if (engine.input.keyboard.wasPressed(Input.Keys.Up)) {
      this.position.y -= 1;
    } else if (engine.input.keyboard.wasPressed(Input.Keys.Down)) {
      this.position.y += 1;
    } else if (engine.input.keyboard.wasPressed(Input.Keys.Left)) {
      this.position.x -= 1;
    } else if (engine.input.keyboard.wasPressed(Input.Keys.Right)) {
      this.position.x += 1;
    }
  }
}
