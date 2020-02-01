import {Actor, Color, Input, Label, Scene, UIActor} from "excalibur";
import {Game} from "./index";
import {Direction} from "./Direction";

class Button extends Label {
  private callback: () => void;
  text: string;

  constructor(x: number, y: number,
              text: string, func: () => void) {
    super(text, x, y, '10px Arial');
    this.text = text;
    this.callback = func;
    this.color = Color.White
  }

  public focus() {
  }

  public blur() {
  }

  public click() {
    this.callback();
  }
}

export class Mainmenu extends Scene {
  menu: [string, () => void][] = [
    ["Start game", this.startGame],
    ["Level select", this.levelSelect],
    ["Credits", this.credits]
  ];

  buttons: Button[] = [];
  focused: number = 0;

  game: Game;

  constructor(engine: Game) {
    super(engine);
    this.game = engine;

    this.menu = this.menu.map(([s, cb]) => [s, cb.bind(this)]);
  }

  public onActivate(_oldScene: Scene, _newScene: Scene): void {
    super.onActivate(_oldScene, _newScene);

    this.menu.forEach(([str, cb], index) => {
      const elem = document.createElement("p");
      elem.textContent = str;
      elem.onclick = () => cb();
      document.getElementById('ui').appendChild(elem);
    });
    document.getElementById('ui').hidden = false;
  }

  public onDeactivate(_oldScene: Scene, _newScene: Scene): void {
    super.onDeactivate(_oldScene, _newScene);
    document.getElementById('ui').hidden = true;
  }

  update(engine: Game, delta: number): void {
    super.update(engine, delta);
    if (engine.input.keyboard.wasPressed(Input.Keys.Up)) {
      if(this.focused > 0) {
        this.buttons[this.focused].blur();
        this.buttons[--this.focused].focus();
      }
    } else if (engine.input.keyboard.wasPressed(Input.Keys.Down)) {
      if(this.focused < this.buttons.length - 1) {
        this.buttons[this.focused].blur();
        this.buttons[++this.focused].focus();
      }
    }
  }

  private startGame() {
    this.game.postInit();
  }

  private levelSelect() {
    console.log("Not implemented");
  }

  private credits() {
    console.log("Not implemented");
  }
}
