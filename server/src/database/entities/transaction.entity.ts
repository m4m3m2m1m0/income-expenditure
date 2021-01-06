import { TransactionCategory } from './transaction-category.entity';
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
    nullable: true,
  })
  description?: string;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  typeId: number;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => TransactionType)
  @JoinColumn()
  type: TransactionType;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => TransactionCategory)
  @JoinColumn()
  category: TransactionCategory;
}
