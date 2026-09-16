import { GameObject } from "./GameObject.js";

export class Actor extends GameObject {
  constructor({ src, x, y, world, assets, levelManager }) {
    super({
      src,
      x,
      y,
      cols: 1,
      rows: 1,
      z: 1000,
      solid: false,
      type: "actor",
      place: null,
      world,
      assets,
    });

    this.wood = 0;
    this.stone = 0;

    this.levelManager = levelManager;

    this.asset = null;
  }

  update(input, world, bounds) {
    this.updateMovement(input, world, bounds);

    this.updateSelectedAsset(input);
  }

  updateSelectedAsset(input) {
    // Wird später vom LevelManager / Asset-System gesetzt.
    if (!this.availableAssets) {
      return;
    }

    this.availableAssets.forEach((asset) => {
      if (input.isPressed(asset.key)) {
        this.asset = asset.name;
      }
    });
  }

  updateMovement(input, world, bounds) {
    if (!input.canPerformAction()) {
      return;
    }

    const movement = input.getMovement();

    if (!movement) {
      return;
    }

    const [dx, dy] = movement;

    if (input.isAttackPressed()) {
      this.attack(dx, dy, world);
    } else {
      this.move(dx, dy, world, bounds);
    }

    input.lockAction();
  }

  move(dx, dy, world, bounds) {
    const nx = this.x + dx;
    const ny = this.y + dy;

    if (nx < 0 || ny < 0 || nx >= bounds.cols || ny >= bounds.rows) {
      return;
    }

    const object = world.getAt(nx, ny);

    if (object?.solid) {
      object.interact?.(this, this.levelManager, nx, ny);
      return;
    }

    this.x = nx;
    this.y = ny;

    object?.interact?.(this, this.levelManager);
  }

  attack(dx, dy, world) {
    const target = world.getAt(this.x + dx, this.y + dy);

    if (!target?.interact) {
      return;
    }

    target.interact(this, this.levelManager);
  }
}
