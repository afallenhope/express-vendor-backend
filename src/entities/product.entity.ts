import { Column } from 'typeorm';
import { BaseEntity } from '../database/entities/base.entity';

export class Product extends BaseEntity {
  @Column({ length: 50 })
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true, default: () => false })
  bloggable: boolean;

  @Column({
    nullable: true,
    default: () => {
      ('');
    },
  })
  image: string;

  @Column({ nullable: true, default: () => true })
  active: boolean;
}