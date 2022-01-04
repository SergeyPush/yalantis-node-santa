import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wish } from './wish.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @OneToMany(() => Wish, (wish) => wish.user)
  wishes: Wish[];
}
