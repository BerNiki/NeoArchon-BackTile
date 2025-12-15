import { Game } from 'src/api/games/entities/games.entity';
import { TileInterface } from 'src/api/games/interface/gameSetupInterface';
import { Unit } from 'src/api/games/interface/unitInterface';

interface FilteredTileInterface extends TileInterface {
  unit: Unit;
}

export const isGameConcluded = (game: Game) => {
  const cells = game.board_state.flat();
  const pops = cells.filter((cell) => cell.isPointOfPower);

  const occupiedCells = cells.filter(
    (cell): cell is FilteredTileInterface => cell.unit !== 'EMPTY',
  );

  const isEliminated = !occupiedCells.some(
    (cell) => cell.unit.team === game.turnUser,
  );

  const isVictoryByPointsOfPower = pops.every(
    (pop) => pop.unit !== 'EMPTY' && pop.unit.team !== game.turnUser,
  );

  return isEliminated || isVictoryByPointsOfPower;
};
