import { IAxisState } from './axis-state.inteface';
import { IShieldDirection } from './shield-direction.interface';

import { ShieldDirection } from '../constants';

export interface IShield {
  axisX: IAxisState;
  axisY: IAxisState;
  [ShieldDirection.NORTH]: IShieldDirection;
  [ShieldDirection.EAST]: IShieldDirection;
  [ShieldDirection.SOUTH]: IShieldDirection;
  [ShieldDirection.WEST]: IShieldDirection;
}
