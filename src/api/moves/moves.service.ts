import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../games/entities/games.entity';
import { Repository } from 'typeorm';
import { MoveDto } from './dto/move.dto';
import { Move } from './entities/moves.entity';

@Injectable()
export class MovesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    @InjectRepository(Move) private readonly moveRepo: Repository<Move>,
  ) {}

  async move(moveDto: MoveDto) {
    const { user, moveData, game } = moveDto;

    await this.moveRepo.save({ game, user, move_data: moveData });
  }
}
