import {
  AttackTypeEnum,
  DarkUnitsEnum,
  MoveType,
  TeamsEnum,
} from '../interface/unitInterface';
import { LightUnitsEnum, Unit } from '../interface/unitInterface';

const valkyrie: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.valkyrie,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 3,
    range: 30,
    interval: 5,
    damage: 5,
  },
  unit_move: {
    type: MoveType.fly,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 10,
};

const golem: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.golem,
  attack: {
    attackType: AttackTypeEnum.melee,
    speed: 2,
    range: 15,
    damage: 8,
    interval: 8,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 3,
    battleSpeed: 3,
  },
  hp: 17,
};

const unicorn: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.unicorn,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 8,
    range: 30,
    damage: 6,
    interval: 3,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 4,
    battleSpeed: 6,
  },
  hp: 12,
};

const djinni: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.djinni,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 5,
    range: 30,
    damage: 5,
    interval: 5,
  },
  unit_move: {
    type: MoveType.fly,
    boardRange: 4,
    battleSpeed: 5,
  },
  hp: 18,
};

const phoenix: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.phoenix,
  attack: {
    attackType: AttackTypeEnum.area,
    speed: 3,
    range: 3,
    damage: 10,
    interval: 7,
  },
  unit_move: {
    type: MoveType.fly,
    boardRange: 5,
    battleSpeed: 6,
  },
  hp: 22,
};

const wizard: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.wizard,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 6,
    range: 50,
    damage: 15,
    interval: 5,
  },
  unit_move: {
    type: MoveType.teleport,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 15,
};

const archer: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.archer,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 5,
    range: 30,
    damage: 3,
    interval: 4,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 6,
};

const knight: Unit = {
  team: TeamsEnum.light,
  name: LightUnitsEnum.knight,
  attack: {
    attackType: AttackTypeEnum.melee,
    speed: 100,
    range: 1,
    damage: 4,
    interval: 1,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 7,
};

const banshee: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.banshee,
  attack: {
    attackType: AttackTypeEnum.area,
    speed: 2,
    range: 5,
    damage: 6,
    interval: 8,
  },
  unit_move: {
    type: MoveType.fly,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 10,
};

const troll: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.troll,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 4,
    range: 15,
    damage: 10,
    interval: 8,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 3,
    battleSpeed: 3,
  },
  hp: 18,
};

const basilisk: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.basilisk,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 8,
    range: 30,
    damage: 7,
    interval: 3,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 8,
};

const shapeshifter: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.shapeshifter,
  attack: {
    attackType: AttackTypeEnum.melee,
    speed: 0,
    range: 0,
    damage: 0,
    interval: 0,
  },
  unit_move: {
    type: MoveType.fly,
    boardRange: 5,
    battleSpeed: 0,
  },
  hp: 0,
};

const dragon: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.dragon,
  attack: {
    attackType: AttackTypeEnum.melee,
    speed: 0,
    range: 0,
    damage: 0,
    interval: 0,
  },
  unit_move: {
    type: MoveType.fly,
    boardRange: 4,
    battleSpeed: 5,
  },
  hp: 25,
};

const sorceress: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.sorceress,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 9,
    range: 40,
    damage: 8,
    interval: 5,
  },
  unit_move: {
    type: MoveType.teleport,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 13,
};

const goblin: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.goblin,
  attack: {
    attackType: AttackTypeEnum.melee,
    speed: 100,
    range: 1,
    damage: 4,
    interval: 1,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 7,
};

const manticore: Unit = {
  team: TeamsEnum.dark,
  name: DarkUnitsEnum.manticore,
  attack: {
    attackType: AttackTypeEnum.ranged,
    speed: 4,
    range: 30,
    damage: 5,
    interval: 5,
  },
  unit_move: {
    type: MoveType.walk,
    boardRange: 3,
    battleSpeed: 5,
  },
  hp: 10,
};

export const UNITS: Record<LightUnitsEnum | DarkUnitsEnum, Unit> = {
  [DarkUnitsEnum.banshee]: banshee,
  [DarkUnitsEnum.troll]: troll,
  [DarkUnitsEnum.basilisk]: basilisk,
  [DarkUnitsEnum.shapeshifter]: shapeshifter,
  [DarkUnitsEnum.dragon]: dragon,
  [DarkUnitsEnum.sorceress]: sorceress,
  [DarkUnitsEnum.goblin]: goblin,
  [DarkUnitsEnum.manticore]: manticore,
  [LightUnitsEnum.valkyrie]: valkyrie,
  [LightUnitsEnum.golem]: golem,
  [LightUnitsEnum.unicorn]: unicorn,
  [LightUnitsEnum.djinni]: djinni,
  [LightUnitsEnum.phoenix]: phoenix,
  [LightUnitsEnum.wizard]: wizard,
  [LightUnitsEnum.archer]: archer,
  [LightUnitsEnum.knight]: knight,
};
