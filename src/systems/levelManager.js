import { allLevel } from "../data/levels.js";

import { Actor } from "../entities/Actor.js";

import { createGameObject } from "./objectFactory.js";

export class LevelManager {
  constructor(world, assets) {
    this.world = world;
    this.assets = assets;

    this.level = 0;
    this.currentLevel = null;
  }

  load(index) {
    this.level = index;
    this.currentLevel = allLevel[index].outdoor;

    console.log(this.level);

    if (!this.currentLevel) {
      console.error(`Level ${index} does not exist.`);

      return;
    }

    this.world.clear();

    this.createLevelObjects();
  }

  createLevelObjects() {
    console.log("Level:", this.currentLevel);
    console.log("GameObjects:", this.currentLevel.gameObjects);

    this.currentLevel.gameObjects.forEach((gameObject) => {
      createGameObject(gameObject, {
        world: this.world,
        assets: this.assets,
        levelManager: this,
      });
    });
  }

  createPlayer() {
    const player = new Actor({
      src: "../assets/img/kenney_tiny-farm/Tiles/tile_0109.png",

      x: 5,
      y: 5,

      world: this.world,
      assets: this.assets,
    });

    player.availableAssets = this.currentLevel.assets;

    return player;
  }

  getCurrentLevel() {
    return this.currentLevel;
  }

  getBounds() {
    return {
      rows: this.currentLevel.rows,
      cols: this.currentLevel.cols,
    };
  }

  getLevelIndex() {
    return this.level;
  }

  updatePlace(place) {
    this.currentLevel = allLevel[this.level][place];

    if (!this.currentLevel) {
      console.error(
        `Place "${place}" für Level ${this.level} existiert nicht.`,
      );
    }
  }
}
