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
  Password: string;

  @Column({
    length: 255,
  })
  Hash: string;
}
