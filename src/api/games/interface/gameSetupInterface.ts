import { Unit } from './unitInterface';

export type GameSetupInterface = TileInterface[][];

export enum colorDirection {
  ascending = 'ASCENDING',
  descending = 'DESCENDING',
}
export interface TileInterface {
  unit: Unit | 'EMPTY';
  color: {
    color: ColorEnum;
    direction: colorDirection;
  };
  isPointOfPower: boolean;
  cycling: boolean;
}

export enum ColorEnum {
  light = 'LIGHT',
  light2 = 'L2',
  light1 = 'L1',
  dark1 = 'D1',
  dark2 = 'D2',
  dark = 'DARK',
}
