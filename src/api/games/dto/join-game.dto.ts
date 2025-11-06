import { PlayerRolesEnum } from 'src/api/games/enums/playerRoles.enum';

export class JoinGameDto {
  gameId: string;
  playerRole: PlayerRolesEnum;
}
