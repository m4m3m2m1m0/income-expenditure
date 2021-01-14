import { Transaction } from 'src/database/entities/transaction.entity';

export class TransactionPageModel {
  orderBy: string;
  orderDir: string;
  hasMore: boolean;
  totalCount: number;
  skiped: number;
  toSkip: number;
  transactions: Transaction[];
}
