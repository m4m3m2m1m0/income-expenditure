import { Transaction } from './../../database/entities/transaction.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async get(id: number, userId: number): Promise<Transaction> {
    return this.transactionRepository.findOne({ where: { id, userId } });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { userId } });
  }

  async add(transaction: Transaction): Promise<number> {
    try {
      const res = await this.transactionRepository.save(transaction);

      return res.id;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
