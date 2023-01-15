import { IShield } from './shield.interface';

export interface IShipProps {
  acceleration: number;
  maxSpeed: number;
  angularVelocity: number;
  damageAbsorption: number;
  damageReducing: number;
  health: number;
  shield: IShield;
}
