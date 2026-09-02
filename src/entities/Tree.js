import { GameObject } from "./GameObject.js";

export class Tree extends GameObject {
  constructor(options) {
    super(options);

    this.tool = "axe";
  }

  interact(actor) {
    if (actor.asset !== this.tool) {
      return;
    }

    this.destroy();

    actor.wood++;
  }
}
