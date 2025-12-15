import { IsEnum, IsUUID } from 'class-validator';
import { PlayerRolesEnum } from 'src/api/games/enums/playerRoles.enum';

export class JoinGameDto {
  @IsUUID()
  gameId: string;

  @IsEnum(PlayerRolesEnum)
  playerRole: PlayerRolesEnum;
}
