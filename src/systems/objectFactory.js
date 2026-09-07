import { Tree } from "../entities/Tree.js";
import { Rock } from "../entities/Rock.js";
import { House } from "../entities/House.js";
import { Sign } from "../entities/Sign.js";
import { MultiImgObject } from "../entities/MultiImgObject.js";
import { Chest } from "../entities/Chest.js";
import { Door } from "../entities/Door.js";

const OBJECT_TYPES = {
  tree: Tree,
  rock: Rock,
  house: House,
  sign: Sign,
  multiImgObject: MultiImgObject,
  chest: Chest,
  door: Door,
};

export function createGameObject(data, dependencies) {
  const ObjectClass = OBJECT_TYPES[data.type];

  if (!ObjectClass) {
    console.warn(`Unknown object type: ${data.type}`);
    return null;
  }

  const object = new ObjectClass({
    ...data,
    ...dependencies,
    place: dependencies.place,
  });

  return object;
}
