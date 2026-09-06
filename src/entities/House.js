import { MultiImgObject } from "./MultiImgObject.js";

export class House extends MultiImgObject {
  constructor(options) {
    super(options);

    this.levelManager = options.levelManager;
    this.doorX = 1;
    this.doorY = this.rows - 1;
  }

  occupies(x, y) {
    return super.occupies(x, y);
  }

  interact(actor, levelManager, targetX = actor.x, targetY = actor.y) {
    const doorX = this.x + this.doorX;
    const doorY = this.y + this.doorY;

    if (targetX !== doorX || targetY !== doorY) {
      return;
    }

    (levelManager ?? this.levelManager).loadPlace("indoor");
    actor.x = 2;
    actor.y = 2;
  }
}
