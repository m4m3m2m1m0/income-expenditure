import { Transaction } from './../../database/entities/transaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  async add(transaction: Transaction): Promise<void> {}
}
