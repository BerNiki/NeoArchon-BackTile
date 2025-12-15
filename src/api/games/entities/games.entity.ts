import { GameStatusEnum } from 'src/api/games/enums/gameStatus.enum';
import { Move } from 'src/api/moves/entities/moves.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { GamePlayer } from './gamePlayers.entity';
import type { GameSetupInterface } from '../interface/gameSetupInterface';
import { TeamsEnum } from '../interface/unitInterface';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: GameStatusEnum.waitingForPlayers, enum: GameStatusEnum })
  status: GameStatusEnum;

  @Column('jsonb')
  board_state: GameSetupInterface;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: TeamsEnum,
    default: TeamsEnum.light,
    nullable: true,
  })
  turnUser: TeamsEnum;

  @OneToMany(() => Move, (move: Move) => move.game)
  moves: Move[];

  @OneToMany(() => GamePlayer, (gp) => gp.game, { cascade: true })
  players: GamePlayer[];

  @Column('jsonb', { nullable: true })
  gameSetup: any;

  @CreateDateColumn()
  created_at: Date;
}
