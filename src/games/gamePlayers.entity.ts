import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Game } from './games.entity';
import { User } from 'src/users/users.entity';
import { PlayerRolesEnum } from 'src/enums/playerRoles.enum';

@Entity('game_players')
@Unique(['game', 'user'])
export class GamePlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game, (game) => game.players, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => User, (user) => user.games, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: PlayerRolesEnum })
  role: PlayerRolesEnum;
}
