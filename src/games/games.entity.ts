import { GameStatusEnum } from 'src/enums/gameStatus.enum';
import { Move } from 'src/moves/moves.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { GamePlayer } from './gamePlayers.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: GameStatusEnum;

  @Column('jsonb')
  board_state: any;

  @Column({ default: GameStatusEnum.ongoing, enum: GameStatusEnum })
  resolution: GameStatusEnum;

  @ManyToOne(() => User, { nullable: true })
  turnUser: User;

  @OneToMany(() => Move, (move: Move) => move.game)
  moves: Move[];

  @OneToMany(() => GamePlayer, (gp) => gp.game)
  players: GamePlayer[];

  @CreateDateColumn()
  created_at: Date;
}
