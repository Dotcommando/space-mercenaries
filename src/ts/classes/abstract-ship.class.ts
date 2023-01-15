import Phaser from 'phaser';

import { ICreatable, IModelProps, IPreloadable, IShip, IShipProps } from '../types';
import ImageWithDynamicBody = Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
import Container = Phaser.GameObjects.Container;
import Physics = Phaser.Physics.Arcade.ArcadePhysics;

import { SHIP_MODEL } from '../constants';
import { getRandomInteger } from '../helpers';

export abstract class AbstractShip implements IShip, IPreloadable, ICreatable {
  public alive: boolean;
  protected ship: ImageWithDynamicBody;
  protected shipContainer: Container;
  protected scene: Phaser.Scene;
  protected physics: Physics;
  protected startCoords: { x: number; y: number } = { x: 0, y: 0 };
  protected modelProps: IModelProps;
  protected shipImageSlug: string;

  constructor(data: {
    values: IShipProps;
    scene: Phaser.Scene;
    model: IModelProps;
    coords?: {
      x: number;
      y: number;
    };
  }) {
    const { values, scene, model, coords } = data;

    this.scene = scene;
    this.physics = this.scene.physics;
    this.defaultValues = { ...values };
    this.startCoords = coords ? { ...coords } : { x: 0, y: 0 } ;
    this.modelProps = { drag: .99, scale: .25, ...model };

    Object.freeze(this.defaultValues);
    Object.freeze(this.modelProps);

    this.currentValues = { ...values };
  }

  defaultValues: IShipProps;

  protected currentValues: IShipProps;

  // public createShip(
  //   texture: string,
  //   coords?: {
  //     x: number;
  //     y: number;
  //   },
  // ): void {
  // // It doesn't work. It doesn't too: this.physics.add.image.call(this.scene, coords.x, coords.y, texture);
  //   this.ship = this.physics.add.image(coords.x, coords.y, texture);
  //
  //   console.log(texture);
  //   console.log('this.ship.displayWidth', this.ship.displayWidth);
  //   console.log('this.ship.displayHeight', this.ship.displayHeight);
  //   // this.shipContainer = new Container(this.scene, coords?.x ?? 0, coords?.y ?? 0, [this.ship]);
  //
  //   this.ship.setCollideWorldBounds(true);
  //   this.ship.setScale(this.modelProps.scale);
  //   this.ship.setDamping(true);
  //   this.ship.setDrag(this.modelProps.drag);
  //   this.ship.setMaxVelocity(this.defaultValues.maxSpeed);
  //   this.ship.setAcceleration(this.defaultValues.acceleration);
  //
  //   this.alive = true;
  // }

  public setShip(ship: ImageWithDynamicBody): void {
    this.ship = ship;

    this.ship.setCollideWorldBounds(true);
    this.ship.setScale(this.modelProps.scale);
    this.ship.setDamping(true);
    this.ship.setDrag(this.modelProps.drag);
    this.ship.setMaxVelocity(this.defaultValues.maxSpeed);
    this.ship.setAcceleration(this.defaultValues.acceleration);

    this.alive = true;
  }

  public getShip(): ImageWithDynamicBody {
    return this.ship;
  }

  public getShipSlug(): string {
    return this.shipImageSlug;
  }

  public getDataForCreatingShip(): [ number, number, string ] {
    return [ this.startCoords.x, this.startCoords.y, this.getShipSlug() ];
  }

  public parseShipModelTypeToImageURL(modelType: SHIP_MODEL): string {
    const matches = modelType.match(/([^_]+)/g);

    if (!matches?.length) return '';

    return `./img/ships/${matches[1]?.toLowerCase()}/${matches[0]?.toLowerCase()}.png`;
  }

  public preload() {
    this.shipImageSlug = this.modelProps.type + `_${getRandomInteger(0, 999999999)}`;
    this.scene.load.image(this.shipImageSlug, this.parseShipModelTypeToImageURL(this.modelProps.type));
  }

  public create() {
  }
}
