import { GameObject } from "./GameObject.js";

export class Tree extends GameObject {
  constructor(options) {
    super(options);

    this.tool = "axe";
  }

  interact(actor) {
    if (actor.asset !== this.tool || actor.wood >= 10) {
      return;
    }

    this.destroy();

    actor.wood++;
  }
}
