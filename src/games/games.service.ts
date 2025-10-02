import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerRolesEnum } from 'src/enums/playerRoles.enum';
import { User } from 'src/users/users.entity';
import { Game } from './games.entity';
import { Repository } from 'typeorm';
import { GamePlayer } from './gamePlayers.entity';
import { GAME_NOT_FOUND_ERROR_MESSAGE } from 'src/CONSTS/gameErrorMessage';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepo: Repository<Game>,
    @InjectRepository(GamePlayer)
    private readonly gamePlayerRepo: Repository<GamePlayer>,
  ) {}

  async findGameById(gameId: string) {
    return this.gamesRepo.findOneBy({ id: gameId });
  }

  async createGame(
    player: User,
    gameSetup: any,
    playerRole: PlayerRolesEnum,
  ): Promise<Game> {
    const newGame = this.gamesRepo.create({
      gameSetup,
      moves: [],
    });
    const gamePlayer = this.gamePlayerRepo.create({
      user: player,
      role: playerRole,
      game: newGame,
    });

    newGame.players = [gamePlayer];

    await this.gamesRepo.save(newGame);

    return newGame;
  }

  async joinGame(player: User, gameId: string, playerRole: PlayerRolesEnum) {
    const game = await this.findGameById(gameId);

    if (!game) {
      throw new NotFoundException(GAME_NOT_FOUND_ERROR_MESSAGE);
    }
    const gamePlayer = this.gamePlayerRepo.create({
      game: game,
      user: player,
      role: playerRole,
    });

    game.players.push(gamePlayer);

    await this.gamesRepo.save(game);

    return game;
  }
}
