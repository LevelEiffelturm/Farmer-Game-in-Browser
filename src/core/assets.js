export class AssetManager {
  constructor() {
    this.imageCache = new Map();
  }

  load(src) {
    if (!src) {
      return null;
    }

    if (!this.imageCache.has(src)) {
      const image = new Image();

      image.src = src;

      this.imageCache.set(src, image);
    }

    return this.imageCache.get(src);
  }

  loadMultiple(sources) {
    return sources.map((src) => this.load(src));
  }

  isLoaded(image) {
    return image && image.complete && image.naturalWidth > 0;
  }
}
