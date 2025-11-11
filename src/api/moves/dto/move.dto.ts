import { Game } from 'src/api/games/entities/games.entity';
import { User } from 'src/api/users/entities/users.entity';
import { MoveDataInterface } from '../interface/move.interface';

export class MoveDto {
  user: User;
  moveData: MoveDataInterface;
  game: Game;
}
