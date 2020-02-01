import {Actor, Camera, Engine, LockCameraToActorStrategy, Vector} from "excalibur";
import {tileSize} from "./const";

export class MyCamera extends LockCameraToActorStrategy {
  _action: (target: Actor, cam: Camera, eng: Engine, delta: number) => Vector;
  constructor(actor: Actor, width: number, height: number) {
    super(actor);
    this._action = this.action;
    this.action = (target, cam, eng, delta) => {
      const res = this._action(target, cam, eng, delta);
      res.x = Math.min(res.x, 2 * width * tileSize - eng.drawWidth / 2);
      res.y = Math.min(res.y, 2 * height * tileSize - eng.drawHeight / 2);
      res.x = Math.max(res.x, eng.drawWidth / 2);
      res.y = Math.max(res.y, eng.drawHeight / 2);

      if(eng.drawWidth > 2 * width * tileSize) {
        res.x = width * tileSize;
      }
      if(eng.drawHeight > 2 * height * tileSize) {
        res.y = height * tileSize;
      }

      return res;
    }
  }

}
