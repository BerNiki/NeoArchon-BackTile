import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../games/entities/games.entity';
import { TeamsEnum } from '../games/interface/unitInterface';
import { Repository } from 'typeorm';
import { MoveDto } from './dto/move.dto';
import { Move } from './entities/moves.entity';
import { User } from '../users/entities/users.entity';
import { GetMovesDto } from './dto/move.dto';
import { lightCyclePerTurn } from '../games/helper/lightCyclePerTurn';
import { GameStatusEnum } from '../games/enums/gameStatus.enum';
import { isGameConcluded } from './helpers/isGameConcluded';
import { isMoveValid } from './helpers/isMoveValid';

@Injectable()
export class MovesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    @InjectRepository(Move) private readonly moveRepo: Repository<Move>,
  ) {}

  async getMoves(getMovesDto: GetMovesDto) {
    const { gameId } = getMovesDto;

    const game = await this.gameRepo.findOne({
      where: { id: gameId },
      relations: ['moves'],
    });

    if (!game) throw new NotFoundException();

    return game.moves;
  }

  async move(user: User, moveDto: MoveDto) {
    const { moveData, gameId } = moveDto;

    const game = await this.gameRepo.findOneBy({ id: gameId });

    if (!game) throw new NotFoundException();

    const unit = game.board_state[moveData.from.a][moveData.from.b].unit;

    if (unit === 'EMPTY') throw Error('Invalid Move!');

    const possibleMoves = isMoveValid(
      game.board_state,
      moveData.from,
      game.turnUser,
    );

    // check if destination is valid

    if (
      possibleMoves.some(
        (possibleMove) =>
          possibleMove.a === moveData.to.a && possibleMove.b === moveData.to.b,
      )
    ) {
      // move unit
      game.board_state[moveData.to.a][moveData.to.b].unit =
        game.board_state[moveData.from.a][moveData.from.b].unit;

      // clear cell
      game.board_state[moveData.from.a][moveData.from.b].unit = 'EMPTY';

      // prepare new turn

      const updatedTurnUser =
        game.turnUser === TeamsEnum.light ? TeamsEnum.dark : TeamsEnum.light;
      game.turnUser = updatedTurnUser;

      if (game.turnUser === TeamsEnum.light) {
        const lightCycledBoard = lightCyclePerTurn(game.board_state);
        game.board_state = lightCycledBoard;
      }

      //check winCondition
      if (isGameConcluded(game)) {
        game.status =
          game.turnUser === TeamsEnum.light
            ? GameStatusEnum.black_won
            : GameStatusEnum.white_won;
      }

      await this.gameRepo.save(game);

      await this.moveRepo.save({
        game: game,
        user,
        move_data: moveData,
      });
    }
    return game;
  }
}
