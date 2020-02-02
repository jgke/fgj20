import {Actor, CollisionType, Engine, Input, Texture, TileMap, Vector} from 'excalibur';

import {Game} from './.';
import {tileSize} from "./const";
import {Direction} from "./Direction";

export class Player extends Actor {
  texture: Texture;
  previousDirection: Vector;
  movingFrom?: Vector = undefined;
  movingTo?: Vector = undefined;
  moveSpeed?: Vector;
  cabling?: number;
  cableOrigin?: Vector;
  queuedMovement?: Direction;

  constructor(
    initPos: Vector,
    texture: Texture,
  ) {
    super(2 * initPos.x * tileSize + tileSize, 2 * initPos.y * tileSize + tileSize, tileSize, tileSize);
    this.scale = new Vector(2, 2);

    this.previousDirection = Vector.Right;
    this.texture = texture;
  }

  onInitialize(game: Engine) {
    this.addDrawing(this.texture);
  }

  update(engine: Game, delta: number) {
    super.update(engine, delta);

    if (document.getElementById('ui').hidden) {
      if (engine.input.keyboard.wasPressed(Input.Keys.Up)) {
        this.queuedMovement = "Up";
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Down)) {
        this.queuedMovement = "Down";
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Left)) {
        this.queuedMovement = "Left";
      } else if (engine.input.keyboard.wasPressed(Input.Keys.Right)) {
        this.queuedMovement = "Right";
      }
    }

    if (this.movingTo) {
      if(this.queuedMovement) {
        this.pos = this.movingTo;
        this.movingTo = undefined;
      } else {
        const distance = this.movingTo.sub(this.pos);
        const speed = distance.scale(0.25).add(this.moveSpeed.scale(0.001 * delta));
        const dOrigin = this.pos.sub(this.movingFrom).magnitude();
        this.pos = this.pos.add(speed);
        if (distance.magnitude() < 1 || dOrigin >= 2 * tileSize) {
          this.pos = this.movingTo;
          this.movingTo = undefined;
        }
      }
    } else {
      switch (this.queuedMovement) {
        case "Up":
          this.movingFrom = this.pos.clone();
          this.moveSpeed = Vector.Up;
          this.movingTo = engine.playerMoves(this.pos, "Up");
          break;
        case "Down":
          this.movingFrom = this.pos.clone();
          this.moveSpeed = Vector.Down;
          this.movingTo = engine.playerMoves(this.pos, "Down");
          break;
        case "Left":
          this.movingFrom = this.pos.clone();
          this.moveSpeed = Vector.Left;
          this.movingTo = engine.playerMoves(this.pos, "Left");
          break;
        case "Right":
          this.movingFrom = this.pos.clone();
          this.moveSpeed = Vector.Right;
          this.movingTo = engine.playerMoves(this.pos, "Right");
          break;
      }
      this.queuedMovement = undefined;
    }
  }
}
