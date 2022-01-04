import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Santa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  user_id: number;
  @Column()
  santa: string;
}
