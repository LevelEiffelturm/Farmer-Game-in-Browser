import { MultiImgObject } from "./MultiImgObject.js";

export class Sign extends MultiImgObject {
  constructor(data) {
    super({
      tiles: data.tiles,
      x: data.x,
      y: data.y,
      cols: data.cols,
      rows: data.rows,
      z: data.z,
      solid: data.solid,
      type: data.type,
      place: data.place,
      world: data.world,
      assets: data.assets,
    });

    this.requested = data.requested ?? {};
  }
  interact(actor, levelManager) {
    if (
      actor.wood < this.requested.wood ||
      actor.stone < this.requested.stone
    ) {
      return;
    }

    actor.wood -= this.requested.wood ?? 0;
    actor.stone -= this.requested.stone ?? 0;

    const nextLevel = levelManager.getLevelIndex() + 1;

    if (levelManager.getLevel(nextLevel)) {
      levelManager.load(nextLevel);
    }
  }
}
