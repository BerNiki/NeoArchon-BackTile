import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../games/entities/games.entity';
import { User } from '../users/entities/users.entity';
import { Move } from './entities/moves.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User, Move]), UsersModule],
  providers: [MovesService],
  controllers: [MovesController],
})
export class MovesModule {}
