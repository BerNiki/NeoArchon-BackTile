import { PlayerRolesEnum } from 'src/enums/playerRoles.enum';

export class CreateGameDto {
  gameSetup: any;
  playerRole: PlayerRolesEnum;
}
