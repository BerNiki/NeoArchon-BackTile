import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerRolesEnum } from 'src/api/games/enums/playerRoles.enum';
import { User } from 'src/api/users/entities/users.entity';
import { Game } from './entities/games.entity';
import { Repository } from 'typeorm';
import { GamePlayer } from './entities/gamePlayers.entity';
import { GAME_NOT_FOUND_ERROR_MESSAGE } from 'src/api/games/consts/gameErrorMessage';
import { BaseBoardLayout } from './consts/baseGameSetup';
import { GameStatusEnum } from './enums/gameStatus.enum';
import { CreateGameDto } from './dto/create-game.dto';

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

  async createGame(player: User, createGameDto: CreateGameDto): Promise<Game> {
    const { name, password, playerRole } = createGameDto;
    const newGame = this.gamesRepo.create({
      moves: [],
      board_state: BaseBoardLayout,
      name,
      password,
    });

    await this.gamesRepo.save(newGame);

    const gamePlayer = this.gamePlayerRepo.create({
      user: player,
      role: playerRole,
      game: newGame,
    });

    await this.gamePlayerRepo.save(gamePlayer);

    newGame.players = [gamePlayer];

    return newGame;
  }

  async gameList(): Promise<Game[]> {
    return this.gamesRepo.find({
      where: { status: GameStatusEnum.waitingForPlayers },
    });
  }

  async joinGame(player: User, gameId: string, playerRole: PlayerRolesEnum) {
    const game = await this.gamesRepo.findOne({
      where: { id: gameId },
      relations: ['players', 'players.user'],
    });

    if (!game) {
      throw new NotFoundException(GAME_NOT_FOUND_ERROR_MESSAGE);
    }

    const existingPlayer = game.players.find((p) => p.user.id === player.id);
    if (existingPlayer) {
      return game;
    }

    const gamePlayer = this.gamePlayerRepo.create({
      game,
      user: player,
      role: playerRole,
    });

    await this.gamePlayerRepo.save(gamePlayer);

    game.players.push(gamePlayer);

    return game;
  }
}
