import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/api/users/decorators/get-user.decorator';
import { User } from 'src/api/users/entities/users.entity';
import { Game } from './entities/games.entity';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { JwtGuard } from 'src/api/auth/guards/jwt.guard';

@Controller('game')
@UseGuards(JwtGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('create')
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

  @Patch('join')
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
