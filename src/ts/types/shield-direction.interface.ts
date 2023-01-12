import { ShieldDirection } from '../constants';

export interface IShieldDirection {
  direction: ShieldDirection;
  disabled: boolean;
  punched: boolean;
  stack: number;
  power: number;
  regeneration: number;
  redirected: number;
}
