import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
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

  @Column({ type: 'float' })
  amount: number;

  @Column()
  userId: number;

  @ManyToOne(() => TransactionType, (type) => type.id)
  type: TransactionType;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
