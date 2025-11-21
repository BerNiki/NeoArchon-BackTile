import { Exclude } from 'class-transformer';
import { GamePlayer } from 'src/api/games/entities/gamePlayers.entity';
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

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column({ nullable: true, type: 'text' })
  @Exclude()
  jti: string | null;

  @Column({ nullable: true, type: 'text' })
  @Exclude()
  currentHashedRefreshToken?: string | null;

  @Column({ nullable: true, type: 'bigint' })
  currentHashedRefreshTokenExpiresAt?: number | null;

  @Column({ default: 1000 })
  elo: number;

  @OneToMany(() => GamePlayer, (gp) => gp.user)
  games: GamePlayer[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
