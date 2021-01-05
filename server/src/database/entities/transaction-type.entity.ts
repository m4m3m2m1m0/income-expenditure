import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TransactionType')
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  name: string;
}
