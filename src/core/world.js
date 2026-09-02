export class World {
  constructor() {
    this.place = "outdoor";

    this.objects = {
      outdoor: [],
      indoor: [],
    };
  }

  add(object, place = this.place) {
    if (!this.objects[place]) {
      console.warn(`Unknown world place: ${place}`);
      return;
    }

    this.objects[place].push(object);
  }

  clear() {
    this.objects.outdoor.length = 0;
    this.objects.indoor.length = 0;
  }

  getObjects(place = this.place) {
    return this.objects[place] ?? [];
  }

  getAt(x, y) {
    return this.getObjects().find(
      (object) => !object.destroyed && object.occupies(x, y),
    );
  }

  setPlace(place) {
    if (!this.objects[place]) {
      console.warn(`Unknown world place: ${place}`);
      return;
    }

    this.place = place;
  }

  getPlace() {
    return this.place;
  }
}
