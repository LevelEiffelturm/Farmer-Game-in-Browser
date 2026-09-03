import { World } from "./world.js";
import { Input } from "./input.js";
import { AssetManager } from "./assets.js";

import { LevelManager } from "../systems/levelManager.js";
import { cleanupGameObjects } from "../systems/cleanup.js";

import { Renderer } from "../rendering/renderer.js";
import { GameUI } from "../ui/gameUI.js";

let world;

export class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.world = new World();
    this.input = new Input();
    this.assets = new AssetManager();

    this.renderer = new Renderer(
      this.canvas,
      this.ctx,
      this.world,
      this.assets,
    );

    this.ui = new GameUI();

    this.levelManager = new LevelManager(this.world, this.assets);

    this.player = null;
    this.gameOver = false;
  }

  start() {
    this.setupPage();

    this.levelManager.load(0);

    this.player = this.levelManager.createPlayer();

    this.ui.init(this.player);

    this.gameLoop();
  }

  setupPage() {
    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
  }

  update() {
    this.player.update(this.input, this.world, this.levelManager.getBounds());

    cleanupGameObjects(this.world);

    this.ui.update();

    const place = this.world.getPlace();

    console.log("Place:", place);
    console.log("Current Level vorher:", this.levelManager.getCurrentLevel());

    this.levelManager.updatePlace(place);

    console.log("Current Level nachher:", this.levelManager.getCurrentLevel());
  }

  draw() {
    this.renderer.draw(this.player, this.levelManager.getCurrentLevel());
  }

  gameLoop() {
    if (this.gameOver) {
      return;
    }

    this.update();
    this.draw();

    world = this.world;

    requestAnimationFrame(() => {
      this.gameLoop();
    });
  }
}

export function update() {
  return world;
}
