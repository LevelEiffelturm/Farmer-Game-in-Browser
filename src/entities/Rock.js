import { GameObject } from "./GameObject.js";

export class Rock extends GameObject {
  constructor(options) {
    super(options);

    this.tool = "hoe";
    this.stage = 0;
  }

  interact(actor) {
    if (actor.asset !== this.tool) {
      return;
    }

    this.stage++;
    actor.stone++;

    if (this.stage === 1) {
      this.src = "../assets/img/kenney_tiny-farm/Tiles/tile_0077.png";

      this.img = this.assets.load(this.src);
    }

    if (this.stage >= 2) {
      this.destroy();
    }
  }
}
