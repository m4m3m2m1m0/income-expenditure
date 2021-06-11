import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TransactionCategory')
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentCategoryId: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
    nullable: true,
  })
  description?: string;
}
