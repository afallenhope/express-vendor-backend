import { BaseEntity } from '../database/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('botusers')
export class BotUser extends BaseEntity {
  @Column({ length: 32 })
  firstName: string;

  @Column({ length: 32 })
  lastName: string;

  @Column()
  password: string;

  @Column({ enum: ['free', 'premium'], default: 'free' })
  type: string;

  @Column({ default: false })
  online: boolean;

  @ManyToMany(() => User, (user) => user?.bots)
  users?: User[];
}
