import { PlayerRolesEnum } from 'src/enums/playerRoles.enum';

export class JoinGameDto {
  gameId: string;
  playerRole: PlayerRolesEnum;
}
