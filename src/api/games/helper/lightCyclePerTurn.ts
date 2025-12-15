import {
  colorDirection,
  ColorEnum,
  GameSetupInterface,
  TileInterface,
} from '../interface/gameSetupInterface';

const cycleColorAscending = (cell: TileInterface) => {
  switch (cell.color.color) {
    case ColorEnum.dark:
      cell.color.color = ColorEnum.dark2;
      break;
    case ColorEnum.dark2:
      cell.color.color = ColorEnum.dark1;
      break;
    case ColorEnum.dark1:
      cell.color.color = ColorEnum.light1;
      break;
    case ColorEnum.light1:
      cell.color.color = ColorEnum.light2;
      break;
    case ColorEnum.light2:
      cell.color.color = ColorEnum.light;
      cell.color.direction = colorDirection.descending;
      break;
  }
};

const cycleColorDescending = (cell: TileInterface) => {
  switch (cell.color.color) {
    case ColorEnum.light:
      cell.color.color = ColorEnum.light2;
      break;
    case ColorEnum.light2:
      cell.color.color = ColorEnum.light1;
      break;
    case ColorEnum.light1:
      cell.color.color = ColorEnum.dark1;
      break;
    case ColorEnum.dark1:
      cell.color.color = ColorEnum.dark2;
      break;
    case ColorEnum.dark2:
      cell.color.color = ColorEnum.dark;
      cell.color.direction = colorDirection.ascending;
      break;
  }
};

export const lightCyclePerTurn = (
  gameState: GameSetupInterface,
): GameSetupInterface => {
  const cycledBoard: GameSetupInterface = gameState.map((row) => {
    row.map((cell) => {
      if (cell.cycling) {
        if (cell.color.direction === colorDirection.ascending) {
          cycleColorAscending(cell);
        } else if (cell.color.direction === colorDirection.descending) {
          cycleColorDescending(cell);
        }
      }
      return cell;
    });
    return row;
  });
  return cycledBoard;
};
