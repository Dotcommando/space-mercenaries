import Phaser from 'phaser';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
class Sandbox extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private text: Phaser.GameObjects.Text;
  private gridContainer: Phaser.GameObjects.Container;

  constructor() {
    super({});
  }

  preload() {
    this.load.image('bg', 'img/background/main/fantasy-purple-2048/purple-4.jpg');
    this.load.image('grid', './img/background/grid.png');
    this.load.image('whiteRex', './img/ships/white/rex.png');
  }

  create() {
    // const bg = this.add.image(-Math.abs(3 * 1024 - 2048), -Math.abs(3 * 1024 - 2048), 'bg').setOrigin(0);
    const bg = this.add.image(720 - Math.abs(3 * 1024 - 2048), 100 - Math.abs(3 * 1024 - 2048), 'bg').setOrigin(0).setScrollFactor(0.2);
    const tiles = this.add.tileSprite(0, 0, 1024 * 3, 1024 * 3, 'grid').setName('grid');

    this.gridContainer = this.add.container(0, 0, [ bg, tiles ]).setName('gridContainer');
    this.input.keyboard.createCombo([
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      Phaser.Input.Keyboard.KeyCodes.DOWN,
    ], {
      resetOnMatch: true,
    });
    this.input.keyboard.on('keycombomatch', function(event) {
      console.log(event);
    });
    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(-1024 * 1.5, -1024 * 1.5, 1024 * 3, 1024 * 3);
    this.physics.world.setBounds(-1024 * 1.5, -1024 * 1.5, 1024 * 3, 1024 * 3);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.image(0, 0, 'whiteRex');

    this.player.setCollideWorldBounds(true);
    this.player.setScale(.25);
    this.player.setDamping(true);
    this.player.setDrag(0.99);
    this.player.setMaxVelocity(500);
    this.player.setAcceleration(2);

    this.cameras.main.startFollow(this.player, true);

    if (this.cameras.main.deadzone) {
      const graphics = this.add.graphics().setScrollFactor(0);
      graphics.lineStyle(2, 0x00ff00, 1);
      graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
    }

    this.text = this.add.text(32, 32, '').setScrollFactor(0).setFontSize(24).setColor('#00ff00');
  }

  update() {
    const cam: Phaser.Cameras.Scene2D.Camera = this.cameras.main;

    if (cam.deadzone) {
      this.text.setText([
        'Speed: ' + Math.round(this.player.body.speed * 100) / 100,
        'ScrollX: ' + cam.scrollX,
        'ScrollY: ' + cam.scrollY,
        'MidX: ' + cam.midPoint.x,
        'MidY: ' + cam.midPoint.y,
        'deadzone left: ' + cam.deadzone.left,
        'deadzone right: ' + cam.deadzone.right,
        'deadzone top: ' + cam.deadzone.top,
        'deadzone bottom: ' + cam.deadzone.bottom,
      ]);
    } else {
      this.text.setText([
        'Speed: ' + Math.round(this.player.body.speed * 100) / 100,
        'ScrollX: ' + cam.scrollX,
        'ScrollY: ' + cam.scrollY,
        'MidX: ' + cam.midPoint.x,
        'MidY: ' + cam.midPoint.y,
      ]);
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, 200, this.player.body.acceleration);
    } else {
      this.player.setAcceleration(0);
    }

    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(300);
    } else {
      this.player.setAngularVelocity(0);
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: '.game-container',
  width: windowWidth,
  height: windowHeight,
  physics: {
    default: 'arcade',
    arcade: {
      fps: 60,
      gravity: { y: 0 },
    },
  },
  scene: [Sandbox],
};

const game = new Phaser.Game(config);

console.log(process.env.SOME_VAR);
