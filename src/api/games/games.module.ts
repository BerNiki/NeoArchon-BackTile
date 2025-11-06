import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePlayer } from './entities/gamePlayers.entity';
import { Game } from './entities/games.entity';
import { UsersModule } from 'src/api/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GamePlayer]), UsersModule],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
