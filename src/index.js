import Phaser from "phaser";
import PreloadScene from "./Scenes/Preload";
import GameScene from "./Scenes/GameScene";

const WIDTH = 1000;
const HEIGHT = 600;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  highScore: 0,
};

const config = {
  type: Phaser.AUTO,
  width: SHARED_CONFIG.width,
  height: SHARED_CONFIG.height,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      //   debug: true,
      //   gravity: { y: 2200 },
    },
  },
  scene: [new PreloadScene(), new GameScene(SHARED_CONFIG)],
};

new Phaser.Game(config);
