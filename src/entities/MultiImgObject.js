import { GameObject } from "./GameObject.js";

export class MultiImgObject extends GameObject {
  constructor({
    tiles,
    x,
    y,
    cols,
    rows,
    z = 0,
    solid = false,
    type = "",
    place = null,
    world,
    assets,
  }) {
    super({
      src: null,
      x,
      y,
      cols,
      rows,
      z,
      solid,
      type,
      place,
      world,
      assets,
    });

    this.tiles = tiles.map((row) => row.map((src) => assets.load(src)));
  }

  draw(renderer) {
    this.tiles.forEach((row, rowIndex) => {
      row.forEach((image, colIndex) => {
        if (!this.assets.isLoaded(image)) {
          return;
        }

        renderer.drawTile(image, this.x + colIndex, this.y + rowIndex);
      });
    });
  }
}
