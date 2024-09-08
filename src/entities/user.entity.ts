import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../database/entities/base.entity';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BotUser } from './botuser.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 32 })
  firstName: string;

  @Column({ length: 32 })
  lastName: string;

  @Column({ length: 64 })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => BotUser)
  @JoinTable()
  bots?: BotUser[];

  verifyPassword = (password: string): boolean => {
    return bcrypt.compareSync(password, this.password);
  };

  hashPassword = (password: string): void => {
    const salt = bcrypt.genSaltSync(13);
    this.password = bcrypt.hashSync(password, salt);
  };

  generateJWT = (): string => {
    return jwt.sign(
      {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
  };
}
