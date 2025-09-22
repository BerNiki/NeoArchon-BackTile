import { GamePlayer } from 'src/games/gamePlayers.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 1000 })
  elo: number;

  @OneToMany(() => GamePlayer, (gp) => gp.user)
  games: GamePlayer[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
