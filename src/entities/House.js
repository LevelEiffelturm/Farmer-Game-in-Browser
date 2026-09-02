import { MultiImgObject } from "./MultiImgObject.js";

import { update } from "../core/game.js";

export class House extends MultiImgObject {
  constructor(options) {
    super(options);

    this.doorX = 1;
    this.doorY = this.rows - 1;
  }

  occupies(x, y) {
    const isDoor = this.x + this.doorX === x && this.y + this.doorY === y;

    return !isDoor && super.occupies(x, y);
  }

  interact(actor) {
    const doorX = this.x + this.doorX;
    const doorY = this.y + this.doorY;

    if (actor.x === doorX && actor.y === doorY) {
      let world = update();

      world.setPlace("indoor"); // !!!!! nicht neues level !!!!!

      actor.x = 2;
      actor.y = 2;
    }
  }
}
