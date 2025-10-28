import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePlayer } from './gamePlayers.entity';
import { Game } from './games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GamePlayer])],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
