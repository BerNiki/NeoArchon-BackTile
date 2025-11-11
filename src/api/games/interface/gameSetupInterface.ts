export type GameSetupInterface = TileInterface[][];

export interface TileInterface {
  unit: LightUnitsEnum | DarkUnitsEnum | 'EMPTY';
  color: ColorEnum;
  isPointOfPower: boolean;
  cycling: boolean;
}

export enum LightUnitsEnum {
  valkyrie = 'VALKYRIE',
  golem = 'GOLEM',
  unicorn = 'UNICORN',
  djinni = 'DJINNI',
  phoenix = 'PHOENIX',
  wizard = 'WIZARD',
  archer = 'ARCHER',
  knight = 'KNIGHT',
}

export enum DarkUnitsEnum {
  banshee = 'BANSHEE',
  troll = 'TROLL',
  basilisk = 'BASILISK',
  shapeshifter = 'SHAPESHIFTER',
  dragon = 'DRAGON',
  sorceress = 'SORCERESS',
  goblin = 'GOBLIN',
  manticore = 'MANTICORE',
}

export enum ColorEnum {
  light = 'LIGHT',
  light1 = 'L1',
  light2 = 'L2',
  dark = 'DARK',
  dark1 = 'D1',
  dark2 = 'D2',
  neutral = 'NEUTRAL',
}
