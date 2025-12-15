import {
  GameSetupInterface,
  ColorEnum,
  colorDirection,
} from '../interface/gameSetupInterface';
import { UNITS } from './units';

export const BaseBoardLayout: GameSetupInterface = [
  [
    {
      unit: UNITS.VALKYRIE,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.ARCHER,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: true,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.MANTICORE,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.BANSHEE,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
  ],
  [
    {
      unit: UNITS.GOLEM,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.KNIGHT,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.GOBLIN,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.TROLL,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
  ],
  [
    {
      unit: UNITS.UNICORN,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.KNIGHT,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.GOBLIN,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.BASILISK,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
  ],
  [
    {
      unit: UNITS.DJINNI,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.KNIGHT,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.GOBLIN,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.SHAPESHIFTER,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
  ],
  [
    {
      unit: UNITS.WIZARD,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: true,
      cycling: false,
    },
    {
      unit: UNITS.KNIGHT,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: true,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.GOBLIN,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.SORCERESS,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: true,
      cycling: false,
    },
  ],
  [
    {
      unit: UNITS.PHOENIX,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.KNIGHT,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.GOBLIN,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.DRAGON,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
  ],
  [
    {
      unit: UNITS.UNICORN,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.KNIGHT,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.GOBLIN,
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.BASILISK,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
  ],
  [
    {
      unit: UNITS.GOLEM,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.KNIGHT,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: UNITS.GOBLIN,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.TROLL,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
  ],
  [
    {
      unit: UNITS.VALKYRIE,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.ARCHER,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: true,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.dark1,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: true,
    },
    {
      unit: 'EMPTY',
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.MANTICORE,
      color: {
        color: ColorEnum.dark,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
    {
      unit: UNITS.BANSHEE,
      color: {
        color: ColorEnum.light,
        direction: colorDirection.ascending,
      },
      isPointOfPower: false,
      cycling: false,
    },
  ],
];
