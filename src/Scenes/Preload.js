import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("trex", "assets/trex.png");
    this.load.image("tree", "assets/tree.png");
    this.load.image("back", "assets/back.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("tree-red", "assets/tree-red.png");
  }

  create() {
    this.scene.start("GameScene");
  }
}

export default PreloadScene;
