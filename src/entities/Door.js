import { GameObject } from "./GameObject.js";

export class Door extends GameObject {
  constructor({ x, y, world, assets, place }) {
    super({
      src: null,
      x,
      y,
      cols: 1,
      rows: 1,
      solid: true,
      type: "door",
      place,
      world,
      assets,
    });
  }

  interact(actor, levelManager, targetX = actor.x, targetY = actor.y) {
    if (targetX !== this.x || targetY !== this.y) {
      return;
    }

    levelManager.loadPlace("outdoor");
    actor.x = 9;
    actor.y = 7;
  }
}
