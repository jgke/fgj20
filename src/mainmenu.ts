import {Input, Scene} from "excalibur";
import {Game} from "./index";
import CircleType from 'circletype';
import {mapOrder, maps} from "./maps";

export class Mainmenu extends Scene {
  menu: [string, () => void][] = [
    ["Start game", this.startGame],
    ["Level select", this.levelSelect],
  ];

  buttons: HTMLButtonElement[] = [];
  focused: number = 0;

  game: Game;
  circle: any;
  containerId = "ui_container";

  constructor(engine: Game) {
    super(engine);
    this.game = engine;

    this.menu = this.menu.map(([s, cb]) => [s, cb.bind(this)]);
  }

  public toMain() {
    this.buttons = [];
    this.focused = 0;
    document.getElementById(this.containerId)?.remove();

    const container = document.createElement("div");
    container.id = this.containerId;
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
      setTimeout(() => {
        subsubcontainer.className = "";
        this.circle = new CircleType(elem);
        subsubcontainer.className = "rotate";
      }, 10);
    }
  }

  public onActivate(_oldScene: Scene, _newScene: Scene): void {
    super.onActivate(_oldScene, _newScene);

    this.toMain();

    document.getElementById('ui').hidden = false;
  }

  public onDeactivate(_oldScene: Scene, _newScene: Scene): void {
    super.onDeactivate(_oldScene, _newScene);
    this.circle.destroy();
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
    this.game.initMaps();
    this.game.postInit();
  }

  private levelSelect() {
    document.getElementById(this.containerId)?.remove();
    this.buttons = [];
    this.focused = 0;

    const container = document.createElement("div");
    container.id = this.containerId;
    document.getElementById('ui').appendChild(container);

    const subcontainer = document.createElement('div');
    subcontainer.className = "maplist";
    // Buttons
    [...mapOrder].reverse().forEach((id, index) => {
      if(!maps[id][1]) {
        return;
      }
      const elem = document.createElement("button");
      elem.textContent = `${id} ${maps[id][1]}`;
      elem.onclick = () => {
        this.game.mapList = [id];
        this.game.postInit();
      };
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
}
