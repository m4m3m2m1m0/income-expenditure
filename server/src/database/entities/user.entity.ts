import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  userName: string;

  @Column({
    length: 255,
  })
  email: string;

  @Column({
    length: 255,
  })
  // @Exclude()
  password: string;
}
