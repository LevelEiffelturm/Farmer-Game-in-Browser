export class BackgroundRenderer {
  constructor(canvas, ctx, assets) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.assets = assets;

    this.grassImages = {};

    this.loadGrassImages();
  }

  loadGrassImages() {
    ["0000", "0001", "0002", "0003", "0004"].forEach((id) => {
      this.grassImages[id] = this.assets.load(
        `../assets/img/background/normal_grass/tile_${id}.png`,
      );
    });
  }

  draw(level, place, cellWidth, cellHeight) {
    if (place === "outdoor") {
      this.drawOutdoor(level, cellWidth, cellHeight);

      return;
    }

    if (place === "indoor") {
      this.drawIndoor(level, cellWidth, cellHeight);
    }
  }

  drawOutdoor(level, cellWidth, cellHeight) {
    let counter = 0;

    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        const id = level.background[counter++];

        const image = this.grassImages[id];

        if (!this.assets.isLoaded(image)) {
          continue;
        }

        this.ctx.drawImage(
          image,
          col * cellWidth,
          row * cellHeight,
          cellWidth,
          cellHeight,
        );
      }
    }
  }

  drawIndoor(level, cellWidth, cellHeight) {
    const image = this.assets.load(
      "../assets/img/kenney_ui-pack-pixel-adventure/Tiles/Large tiles/Thick outline/tile_0001.png",
    );

    if (!this.assets.isLoaded(image)) {
      return;
    }

    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        this.ctx.drawImage(
          image,
          col * cellWidth,
          row * cellHeight,
          cellWidth,
          cellHeight,
        );
      }
    }
  }
}
