import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/users.entity';
import { Game } from './games.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.authGuards';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JoinGameDto } from './dto/join-game.dto';

@Controller('games')
@UseGuards(JwtAuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('game')
  createGame(
    @GetUser() player: User,
    @Body() createGameDto: CreateGameDto,
  ): Promise<Game> {
    return this.gamesService.createGame(
      player,
      createGameDto.gameSetup,
      createGameDto.playerRole,
    );
  }

  @Patch('game')
  joinGame(
    @GetUser() player: User,
    @Body() joinGameDto: JoinGameDto,
  ): Promise<Game> {
    return this.gamesService.joinGame(
      player,
      joinGameDto.gameId,
      joinGameDto.playerRole,
    );
  }
}
