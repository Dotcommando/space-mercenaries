import Phaser from 'phaser';

import { IProps, IShield, IShip } from '../types';

export abstract class AbstractShip implements IShip {
  public alive: boolean;
  protected ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  protected scene: Phaser.Scene;

  constructor(data: {
    values: IProps;
    // ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    scene: Phaser.Scene;
    coords?: {
      x: number;
      y: number;
    };
  }) {
    const { values, scene, coords } = data;

    this.scene = scene;
    this.defaultValues = { ...values };

    Object.freeze(this.defaultValues);

    this.currentValues = { ...values };
    this.createShip(coords);
  }

  defaultValues: {
    acceleration: number;
    maxSpeed: number;
    // speed: number;
    angularVelocity: number;
    // damageAbsorption: number;
    // damageReducing: number;
    health: number;
    shield: IShield;
  };

  protected currentValues: {
    acceleration: number;
    maxSpeed: number;
    // speed: number;
    angularVelocity: number;
    // damageAbsorption: number;
    // damageReducing: number;
    health: number;
    shield: IShield;
  };

  public createShip(
    coords?: {
      x: number;
      y: number;
    },
  ): void {
    this.ship = this.scene.physics.add.image(coords?.x ?? 0, coords?.y ?? 0, 'whiteRex');

    this.ship.setCollideWorldBounds(true);
    this.ship.setScale(.25);
    this.ship.setDamping(true);
    this.ship.setDrag(0.99);
    this.ship.setMaxVelocity(this.defaultValues.maxSpeed);
    this.ship.setAcceleration(this.defaultValues.acceleration);

    this.alive = true;
  }

  public getShip(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this.ship;
  }
}
