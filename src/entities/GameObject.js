export class GameObject {
  constructor({
    src = null,
    x,
    y,
    cols = 1,
    rows = 1,
    z = 0,
    solid = false,
    type = "",
    place = null,
    world,
    assets,
  }) {
    this.src = src;

    this.x = x;
    this.y = y;

    this.cols = cols;
    this.rows = rows;

    this.z = z;
    this.solid = solid;
    this.type = type;

    this.destroyed = false;

    this.world = world;
    this.assets = assets;

    this.img = src ? assets.load(src) : null;

    this.place = place;

    if (place !== null) {
      world.add(this, place);
    }
  }

  draw(renderer) {
    if (!this.img) {
      return;
    }

    if (!this.assets.isLoaded(this.img)) {
      return;
    }

    renderer.drawImage(this.img, this.x, this.y, this.cols, this.rows);
  }

  occupies(x, y) {
    return (
      x >= this.x &&
      x < this.x + this.cols &&
      y >= this.y &&
      y < this.y + this.rows
    );
  }

  destroy() {
    this.destroyed = true;
  }
}
