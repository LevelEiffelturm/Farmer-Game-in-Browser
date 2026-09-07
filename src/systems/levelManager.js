import { allLevel } from "../data/levels.js";

import { Actor } from "../entities/Actor.js";

import { createGameObject } from "./objectFactory.js";

export class LevelManager {
  constructor(world, assets) {
    this.world = world;
    this.assets = assets;

    this.level = 0;
    this.currentLevel = null;
    this.loadedPlaces = new Set();
  }

  load(index) {
    if (!allLevel[index]) {
      console.error(`Level ${index} does not exist.`);
      return;
    }

    this.level = index;
    this.world.clear();
    this.loadedPlaces.clear();
    this.loadPlace("outdoor");
  }

  createLevelObjects() {
    this.currentLevel.gameObjects.forEach((gameObject) => {
      createGameObject(gameObject, {
        world: this.world,
        assets: this.assets,
        levelManager: this,
        place: this.world.getPlace(),
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
      levelManager: this,
    });

    player.availableAssets = this.currentLevel.assets;

    return player;
  }

  loadPlace(place) {
    const level = allLevel[this.level]?.[place];

    if (!level) {
      console.error(
        `Place "${place}" für Level ${this.level} existiert nicht.`,
      );
      return;
    }

    this.world.setPlace(place);

    if (this.loadedPlaces.has(place)) {
      this.currentLevel = level;
      return;
    }

    this.world.objects[place].length = 0;

    level.gameObjects.forEach((gameObject) => {
      createGameObject(gameObject, {
        world: this.world,
        assets: this.assets,
        levelManager: this,
        place,
      });
    });

    this.currentLevel = level;
    this.loadedPlaces.add(place);
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

  getLevel(index) {
    return allLevel[index] ?? null;
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
