import {Input, Scene} from "excalibur";
import {Game} from "./index";
import CircleType from 'circletype';

export class Mainmenu extends Scene {
  menu: [string, () => void][] = [
    ["Start game", this.startGame],
    ["Level select", this.levelSelect],
  ];

  buttons: HTMLButtonElement[] = [];
  focused: number = 0;

  game: Game;

  constructor(engine: Game) {
    super(engine);
    this.game = engine;

    this.menu = this.menu.map(([s, cb]) => [s, cb.bind(this)]);
  }

  public swap(to: string) {
    this.buttons = [];
    document.getElementById("ui_container")?.remove();

    const container = document.createElement("div");
    container.id = "ui_container";
    document.getElementById('ui').appendChild(container);

    {
      const subcontainer = document.createElement('div');
      // Buttons
      this.menu.forEach(([str, cb], index) => {
        const elem = document.createElement("button");
        elem.textContent = str;
        elem.onclick = () => cb();
        elem.onmouseover = () => {
          this.focused = index;
          elem.focus();
        };
        this.buttons.push(elem);
        subcontainer.appendChild(elem);
      });
      this.buttons[0].focus();
      container.appendChild(subcontainer);
    }

    {
      // Credits
      const title = document.createElement("h2");
      title.textContent = "Credits";

      const subcontainer = document.createElement('div');
      subcontainer.appendChild(title);
      subcontainer.className = "subcontainer";
      const subsubcontainer = document.createElement('div');
      const creators = [
        'enrik Hillner',
        'Jaakko Hannikainen',
        'Jani Suutarinen',
        'Susanna Rantakylä H'];
      const text = ' ' + creators.join(' ') + ' ';
      const elem = document.createElement("h2");
      subsubcontainer.className = "rotate";
      elem.textContent = text;
      subsubcontainer.appendChild(elem);
      subcontainer.appendChild(subsubcontainer);
      container.appendChild(subcontainer);
      new CircleType(elem);
    }
  }

  public onActivate(_oldScene: Scene, _newScene: Scene): void {
    super.onActivate(_oldScene, _newScene);

    this.swap("main");

    document.getElementById('ui').hidden = false;
  }

  public onDeactivate(_oldScene: Scene, _newScene: Scene): void {
    super.onDeactivate(_oldScene, _newScene);
    document.getElementById("ui_container").remove();
    document.getElementById('ui').hidden = true;
  }

  update(engine: Game, delta: number): void {
    super.update(engine, delta);
    if (engine.input.keyboard.wasPressed(Input.Keys.Up)) {
      if (this.focused > 0) {
        this.buttons[this.focused].blur();
        this.buttons[--this.focused].focus();
      }
    } else if (engine.input.keyboard.wasPressed(Input.Keys.Down)) {
      if (this.focused < this.buttons.length - 1) {
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
}
