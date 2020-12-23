import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    length: 255,
  })
  UserName: string;

  @Column({
    length: 255,
  })
  Email: string;

  @Column({
    length: 255,
  })
  @Exclude()
  Password: string;

  @Column({
    length: 255,
  })
  @Exclude()
  Hash: string;
}
