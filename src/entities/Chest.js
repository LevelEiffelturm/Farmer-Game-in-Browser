import { GameObject } from "./GameObject.js";

export class Chest extends GameObject {
  constructor({ src, x, y, world, assets }) {
    super({
      src,
      x,
      y,
      cols: 1,
      rows: 1,
      z: 10,
      solid: true,
      type: "chest",
      place: "outdoor",
      world,
      assets,
    });

    this.inventory = {
      wood: 0,
      stone: 0,
    };
  }

  interact(actor) {
    this.inventory.wood += actor.wood;
    this.inventory.stone += actor.stone;

    actor.wood = 0;
    actor.stone = 0;

    console.log("Truhe:", this.inventory);
  }
}
