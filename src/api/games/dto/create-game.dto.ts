import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PlayerRolesEnum } from 'src/api/games/enums/playerRoles.enum';

export class CreateGameDto {
  @IsEnum(PlayerRolesEnum, {
    message:
      'playerRole must be a valid enum value (WHITE, BLACK, or SPECTATOR)',
  })
  @IsNotEmpty({ message: 'playerRole should not be empty' })
  playerRole: PlayerRolesEnum;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  password?: string;
}
