import { SHIP_MODEL } from '../constants';

export interface IModelProps {
  type: SHIP_MODEL;
  drag?: number;
  scale?: number;
}
