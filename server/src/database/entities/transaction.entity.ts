import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionType } from './transaction-type.entity';
import { User } from './user.entity';

@Entity('Transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column()
  date: Date;

  @Column()
  amount: number;

  @ManyToOne(() => TransactionType, (type) => type.id)
  type: TransactionType;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
