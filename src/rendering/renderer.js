import { BackgroundRenderer } from "./backgroundRenderer.js";

export class Renderer {
  constructor(canvas, ctx, world, assets) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.world = world;
    this.assets = assets;

    this.background = new BackgroundRenderer(canvas, ctx, assets);

    this.cellWidth = 0;
    this.cellHeight = 0;
  }

  updateCellSize(rows, cols) {
    this.cellWidth = this.canvas.width / cols;

    this.cellHeight = this.canvas.height / rows;
  }

  draw(player, level) {
    this.updateCellSize(level.rows, level.cols);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.draw(
      level,
      this.world.place,
      this.cellWidth,
      this.cellHeight,
    );

    this.drawGameObjects();

    player.draw(this);
  }

  drawGameObjects() {
    const objects = this.world
      .getObjects()
      .filter((object) => !object.destroyed)
      .sort((a, b) => a.z - b.z);

    objects.forEach((object) => {
      object.draw(this);
    });
  }

  drawImage(image, x, y, cols = 1, rows = 1) {
    this.ctx.drawImage(
      image,
      x * this.cellWidth,
      y * this.cellHeight,
      cols * this.cellWidth,
      rows * this.cellHeight,
    );
  }

  drawTile(image, x, y) {
    this.drawImage(image, x, y, 1, 1);
  }

  drawText(
    text,
    x,
    y,
    {
      color = "#ffffff",
      font = "12px monospace",
      align = "left",
      strokeColor = null,
      lineWidth = 1,
    } = {},
  ) {
    this.ctx.save();

    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = "middle";

    if (strokeColor) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeText(text, x * this.cellWidth, y * this.cellHeight);
    }

    this.ctx.fillText(text, x * this.cellWidth, y * this.cellHeight);

    this.ctx.restore();
  }
}
