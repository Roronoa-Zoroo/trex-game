import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor(config) {
    super("GameScene");
    this.config = config;
  }

  init() {
    console.log(this.scoreText);
    this.playerGravity = 2200;
    this.obstacleSpeed = -800;
    this.rate = 1;
    this.spawnDelay = 1500;
    this.gameOver = false;
    this.scoreRate = 0.2;
    this.score = 0;
  }

  create() {
    this.cursor = this.input.keyboard.createCursorKeys();

    this.trex = this.physics.add.image(100, 0, "trex").setScale(0.1);
    this.trex = this.trex.setCircle(this.trex.width / 2 - 20);
    this.trex.setGravityY(this.playerGravity);

    this.platform = this.physics.add
      .staticImage(0, this.config.height / 1.5, "platform")
      .setOrigin(0, 0);
    this.platform.scaleX = 5;
    this.platform.body.updateFromGameObject();

    this.physics.add.collider(this.trex, this.platform);

    this.scoreText = this.add
      .text(this.config.width - 150, 20, "Score: ", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setOrigin(0, 0);

    this.addObstacles();
    this.spawnObstacle();

    if (this.config.highScore) {
      this.add.text(
        this.config.width - 350,
        20,
        "High Score: " + Math.floor(this.config.highScore),
        {
          fontSize: "20px",
          fill: "#fff",
        }
      );
    }

    this.retryBtn = this.add
      .image(this.config.width / 2, this.config.height / 2, "back")
      .setScale(3)
      .setInteractive();

    this.retryBtn.setVisible(false);

    this.retryBtn.on("pointerdown", () => {
      this.config.highScore =
        this.config.highScore > this.score ? this.config.highScore : this.score;
      this.scene.restart();
    });

    this.input.on("pointerdown", () => {
      this.trex.setVelocityY(-900 * (this.rate * 0.7));
    });
  }

  addObstacles() {
    let obstacle1 = this.physics.add.image(
      this.config.width + 200,
      100,
      "tree"
    );
    obstacle1 = obstacle1
      .setCircle(obstacle1.width / 2 - 30, 30, 35)
      .setScale(0.2)
      .setImmovable(true);
    obstacle1.setImmovable(true);
    obstacle1.y = this.platform.y - obstacle1.displayHeight / 2 + 10;

    //
    let obstacle2 = this.physics.add.image(
      this.config.width + 200,
      100,
      "tree-red"
    );
    obstacle2 = obstacle2
      .setCircle(obstacle2.width / 2 - 30, 40, 40)
      .setScale(0.09)
      .setImmovable(true);
    obstacle2.setImmovable(true);
    obstacle2.y = this.platform.y - obstacle2.displayHeight / 2 + 5;

    this.obstacles = this.physics.add.group(this.obstacle);

    this.physics.add.collider(this.trex, this.obstacles, () => {
      this.physics.pause();
      this.retryBtn.setVisible(true);
      this.gameOver = true;
    });
    this.obstacles.add(obstacle1);
    this.obstacles.add(obstacle2);

    this.obstacles.kill(obstacle1);
    this.obstacles.kill(obstacle2);
  }

  spawnObstacle() {
    const obstacle = this.obstacles.getFirstDead();
    if (obstacle) {
      obstacle.setActive(true);
      obstacle.setVelocityX(this.obstacleSpeed * this.rate);
    }
  }

  update() {
    if (this.gameOver) {
      return;
    }

    this.score += this.scoreRate * this.rate;
    this.scoreText.setText("Score: " + Math.floor(this.score));

    if (this.rate < 2) {
      this.rate += 0.0008;
    }
    const { space } = this.cursor;
    if (Phaser.Input.Keyboard.JustDown(space) && this.trex.body.onFloor()) {
      this.trex.setVelocityY(-900 * (this.rate * 0.7));
    }

    this.obstacles.getChildren().forEach((obstacle) => {
      if (obstacle.x <= -100) {
        obstacle.x = this.config.width + 200;
        obstacle.setVelocityX(0);
        this.obstacles.kill(obstacle);
        this.spawnObstacle();
      }
    });
    if (this.rate >= 1.5) {
      this.obstacles.shuffle();
    }
    this.trex.setGravityY(this.playerGravity * this.rate);
  }
}

export default GameScene;
