import { PlayerRolesEnum } from 'src/api/games/enums/playerRoles.enum';

export class CreateGameDto {
  gameSetup: any;
  playerRole: PlayerRolesEnum;
}
