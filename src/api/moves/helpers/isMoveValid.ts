import {
  GameSetupInterface,
  TileInterface,
} from 'src/api/games/interface/gameSetupInterface';
import {
  TeamsEnum,
  Unit,
  MoveType,
} from 'src/api/games/interface/unitInterface';
import { LocationDto } from '../dto/move.dto';

const groundReachableTiles = (
  board: TileInterface[][],
  start: LocationDto,
  maxRange: number,
  currentTeam: TeamsEnum,
): LocationDto[] => {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const queue: LocationDto[] = [start];
  const visited = new Set([`${start.a},${start.b}`]);
  const reachable: LocationDto[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const dist = Math.abs(current.a - start.a) + Math.abs(current.b - start.b);

    if (dist > 0 && dist <= maxRange) {
      reachable.push({ a: current.a, b: current.b });
    }

    if (dist === maxRange) continue;

    for (const [da, db] of directions) {
      const na = current.a + da;
      const nb = current.b + db;

      if (na < 0 || nb < 0 || na >= 9 || nb >= 9) continue;

      const key = `${na},${nb}`;
      if (visited.has(key)) continue;

      const tile = board[na][nb].unit;
      const isEmpty = tile === 'EMPTY';
      const isEnemy = !isEmpty && tile.team !== currentTeam;
      const isAlly = !isEmpty && tile.team === currentTeam;
      // ALLY: completely blocks
      if (isAlly) continue;

      // ENEMY: add tile, but DO NOT expand further
      if (isEnemy) {
        reachable.push({ a: na, b: nb });
        visited.add(key);
        continue;
      }
      // EMPTY: normal BFS expansion
      visited.add(key);
      queue.push({ a: na, b: nb });
    }
  }

  return reachable;
};

const nonGroundReachableTiles = (
  board: GameSetupInterface,
  start: LocationDto,
  currentTeam: TeamsEnum,
) => {
  const possiblePositions: LocationDto[] = [];
  const startA = start.a;
  const startB = start.b;

  const selectedUnitOnBoard = board[startA][startB].unit as Unit;
  const boardRange = selectedUnitOnBoard.unit_move.boardRange;

  for (let a = startA - boardRange; a <= startA + boardRange; a++) {
    for (let b = startB - boardRange; b <= startB + boardRange; b++) {
      const distA = Math.abs(a - startA);
      const distB = Math.abs(b - startB);
      const manhattanDistance = distA + distB;

      if (manhattanDistance <= boardRange && manhattanDistance > 0) {
        possiblePositions.push({ a, b });
      }
    }
  }

  const verifiedPositions = possiblePositions.filter((position) => {
    if (
      position.a >= 0 &&
      position.b >= 0 &&
      position.a < 9 &&
      position.b < 9
    ) {
      const possibleUnit = board[position.a][position.b];

      return (
        possibleUnit.unit === 'EMPTY' || possibleUnit.unit.team !== currentTeam
      );
    }
    return false;
  });

  return verifiedPositions;
};

export const isMoveValid = (
  board: GameSetupInterface,
  start: LocationDto,
  currentTeam: TeamsEnum,
) => {
  const inspectedUnit = board[start.a][start.b].unit as Unit;
  const maxRange = inspectedUnit.unit_move.boardRange;
  const moveType = inspectedUnit.unit_move.type;
  return moveType !== MoveType.walk
    ? nonGroundReachableTiles(board, start, currentTeam)
    : groundReachableTiles(board, start, maxRange, currentTeam);
};
