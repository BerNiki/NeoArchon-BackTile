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

export enum TeamsEnum {
  light = 'LIGHT',
  dark = 'DARK',
}

export enum AttackTypeEnum {
  melee = 'MELEE',
  ranged = 'RANGED',
  area = 'AREA',
}

export enum MoveType {
  fly = 'FLY',
  walk = 'WALK',
  teleport = 'TELEPORT',
}

export interface Attack {
  attackType: AttackTypeEnum;
  speed: number;
  range: number;
  interval: number;
  damage: number;
}

export interface UnitMove {
  type: MoveType;
  boardRange: number;
  battleSpeed: number;
}

export interface Unit {
  team: TeamsEnum;
  name: LightUnitsEnum | DarkUnitsEnum;
  attack: Attack;
  unit_move: UnitMove;
  hp: number;
}
