export class GameUI {
  constructor() {
    this.woodContainer = document.getElementById("wood-container");

    this.wood = document.getElementById("wood");

    this.stoneContainer = document.getElementById("stone-container");

    this.stone = document.getElementById("stone");

    this.gameAssets = document.getElementById("game-assets");

    this.assets = [];
    this.player = null;
  }

  init(player) {
    this.player = player;

    this.loadAssets();
    this.initAssetSelection();
  }

  loadAssets() {
    this.gameAssets.replaceChildren();

    this.assets = [];

    this.player.availableAssets.forEach((asset) => {
      const img = document.createElement("img");

      img.src = `../assets/img/assets/tile_${asset.name}.png`;

      img.id = asset.name;

      this.gameAssets.appendChild(img);

      this.assets.push(img);
    });
  }

  initAssetSelection() {
    this.assets.forEach((asset) => {
      asset.addEventListener("click", () => {
        this.player.asset = asset.id;
      });
    });
  }

  update() {
    this.updateResource(this.woodContainer, this.wood, this.player.wood);

    this.updateResource(this.stoneContainer, this.stone, this.player.stone);

    this.updateSelectedAsset();
  }

  updateResource(container, element, amount) {
    if (amount > 0) {
      container.style.display = "";
      element.textContent = amount;
    } else {
      container.style.display = "none";
    }
  }

  updateSelectedAsset() {
    if (!this.player.asset) {
      return;
    }

    this.assets.forEach((asset) => {
      asset.style.borderColor = "#0f0f0f";
    });

    const selected = document.getElementById(this.player.asset);

    if (selected) {
      selected.style.borderColor = "#5fd615";
    }
  }
}
