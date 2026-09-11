import { GameObject } from "./GameObject.js";

export class Chest extends GameObject {
  constructor({ src, x, y, world, assets, place }) {
    super({
      src,
      x,
      y,
      cols: 1,
      rows: 1,
      z: 10,
      solid: true,
      type: "chest",
      place,
      world,
      assets,
    });

    this.inventory = {
      wood: 18,
      stone: 18,
    };
  }

  interact(actor) {
    const hasResources = actor.wood > 0 || actor.stone > 0;

    if (hasResources) {
      this.deposit(actor);
    } else {
      this.withdraw(actor);
    }

    console.log("Truhe:", this.inventory);
  }

  deposit(actor) {
    for (let i = 0; i <= actor.wood && this.inventory.wood < 20; i++) {
      actor.wood--;
      this.inventory.wood++;
    }
    for (let i = 0; i <= actor.stone && this.inventory.stone < 20; i++) {
      actor.stone--;
      this.inventory.stone++;
    }
    if (this.inventory.wood >= 20 || this.inventory.stone >= 20) {
      console.log(
        "Die Truhe ist voll mit " +
          this.inventory.wood +
          " Holz und " +
          this.inventory.stone +
          " Stein.",
      );
      return;
    }
  }

  withdraw(actor) {
    actor.wood += this.inventory.wood;
    actor.stone += this.inventory.stone;

    this.inventory.wood = 0;
    this.inventory.stone = 0;
  }
}
