import Phaser from 'phaser';

import { Scene, Ship } from './classes';
import { ShieldDirection, SHIP_MODEL } from './constants';
import ImageWithDynamicBody = Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class Sandbox extends Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerShip: Ship;
  private player: ImageWithDynamicBody;
  private text: Phaser.GameObjects.Text;
  private gridContainer: Phaser.GameObjects.Container;

  constructor() {
    super();
  }

  preload() {
    this.playerShip = new Ship({
      values: {
        acceleration: 2,
        maxSpeed: 500,
        angularVelocity: 300,
        damageAbsorption: 0,
        damageReducing: 0,
        health: 80,
        shield: {
          axisX: {
            maxStacks: 2,
            stackDiff: 0,
            maxPower: 50,
            power: 100,
          },
          axisY: {
            maxStacks: 2,
            stackDiff: 0,
            maxPower: 50,
            power: 100,
          },
          [ShieldDirection.NORTH]: {
            direction: ShieldDirection.NORTH,
            disabled: false,
            punched: false,
            stack: 2,
            power: 50,
            regeneration: .25,
            redirected: 0,
          },
          [ShieldDirection.EAST]: {
            direction: ShieldDirection.NORTH,
            disabled: false,
            punched: false,
            stack: 2,
            power: 50,
            regeneration: .25,
            redirected: 0,
          },
          [ShieldDirection.SOUTH]: {
            direction: ShieldDirection.NORTH,
            disabled: false,
            punched: false,
            stack: 2,
            power: 50,
            regeneration: .25,
            redirected: 0,
          },
          [ShieldDirection.WEST]: {
            direction: ShieldDirection.NORTH,
            disabled: false,
            punched: false,
            stack: 2,
            power: 50,
            regeneration: .25,
            redirected: 0,
          },
        },
      },
      scene: this,
      model: {
        type: SHIP_MODEL.ALPHA_RED,
      },
    });

    super.preload([
      this.playerShip,
    ]);
    this.load.image('bg', 'img/background/main/fantasy-purple-2048/purple-4.jpg');
    this.load.image('grid', './img/background/grid.png');
  }

  create() {
    super.create();
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


    this.player = this.physics.add.image(...this.playerShip.getDataForCreatingShip());
    this.playerShip.setShip(this.player);

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
