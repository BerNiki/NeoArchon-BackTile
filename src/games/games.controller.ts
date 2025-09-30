import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { PlayerRolesEnum } from 'src/enums/playerRoles.enum';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/users.entity';
import { Game } from './games.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.authGuards';
import { GamesService } from './games.service';

@Controller('games')
@UseGuards(JwtAuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('game')
  createGame(
    @GetUser() player: User,
    @Body() gameSetup: any,
    @Body() playerRole: PlayerRolesEnum,
  ): Promise<Game> {
    return this.gamesService.createGame(player, gameSetup, playerRole);
  }

  @Patch('game')
  joinGame(
    @GetUser() player: User,
    @Body() gameId: string,
    @Body() playerRole: PlayerRolesEnum,
  ): Promise<Game> {
    return this.gamesService.joinGame(player, gameId, playerRole);
  }
}
