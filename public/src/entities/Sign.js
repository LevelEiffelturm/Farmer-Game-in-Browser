import { MultiImgObject } from "./MultiImgObject.js";

import { createGameObject } from "../systems/objectFactory.js";

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

    this.name = data.name ?? "Unbekannt";
    this.nextLevel = data.nextLevel ?? false;
    this.build = data.build ?? false;
    this.requested = data.requested ?? {};
  }

  draw(renderer) {
    super.draw(renderer);

    const signWidth = this.tiles[0]?.length ?? this.cols;

    const requiredWood = this.requested.wood ?? 0;
    const requiredStone = this.requested.stone ?? 0;

    const textX = this.x + signWidth / 2;

    renderer.drawText(this.name, textX, this.y + 0.45, {
      color: "#fff1b8",
      font: "bold 11px monospace",
      align: "center",
      strokeColor: "#3a211b",
      lineWidth: 3,
    });

    renderer.drawText(`Holz: ${requiredWood}`, textX, this.y + 1.5, {
      color: "#fff1b8",
      font: "bold 15px monospace",
      align: "center",
      strokeColor: "#3a211b",
      lineWidth: 2,
    });

    renderer.drawText(`Stein: ${requiredStone}`, textX, this.y + 2.5, {
      color: "#fff1b8",
      font: "bold 15px monospace",
      align: "center",
      strokeColor: "#3a211b",
      lineWidth: 2,
    });
  }

  interact(actor, levelManager) {
    const requiredWood = this.requested.wood ?? 0;
    const requiredStone = this.requested.stone ?? 0;

    if (!levelManager) {
      console.error("Sign interaction requires a LevelManager.");
      return;
    }

    if (actor.wood < requiredWood || actor.stone < requiredStone) {
      return;
    }

    actor.wood -= requiredWood;
    actor.stone -= requiredStone;

    const nextLevel = levelManager.getLevelIndex() + 1;

    if (this.nextLevel !== false) {
      if (levelManager.getLevel(nextLevel)) {
        levelManager.load(nextLevel);
      }

      return;
    }

    if (this.build !== false) {
      createGameObject(this.build, {
        world: this.world,
        assets: this.assets,
        levelManager,
        place: this.world.getPlace(),
      });

      this.destroyed = true;
    }
  }
}
