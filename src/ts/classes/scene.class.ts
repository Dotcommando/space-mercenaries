import Phaser from 'phaser';

import { ICreatable, IPreloadable } from '../types';

export class Scene extends Phaser.Scene {
  private gameObjects: Array<IPreloadable | ICreatable>;

  constructor() {
    super({});
  }

  preload(gameObjects: Array<IPreloadable | ICreatable>) {
    this.gameObjects = gameObjects?.length ? [...gameObjects] : [];

    for (const gameObj of this.gameObjects) {
      if ('preload' in gameObj) {
        gameObj.preload();
      }
    }
  }

  create() {
    for (const gameObj of this.gameObjects) {
      if ('create' in gameObj) {
        gameObj.create();
      }
    }
  }
}
