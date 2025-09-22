import { Module } from '@nestjs/common';
import { MovesModule } from './moves/moves.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MovesModule,
    AuthModule,
    UsersModule,
    GamesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'archon',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
