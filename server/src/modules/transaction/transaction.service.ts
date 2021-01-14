import { Transaction } from './../../database/entities/transaction.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTransactionParams } from './models/get-transaction.params';
import { TransactionPageModel } from './models/transaction-page.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async get(id: number, userId: number): Promise<Transaction> {
    return this.transactionRepository.findOne({ where: { id, userId } });
  }

  async getTransactions(
    { skip, take, orderBy, orderDir, typeId }: GetTransactionParams,
    userId: number,
  ): Promise<TransactionPageModel> {
    const transactionList = new TransactionPageModel();

    const order = {};
    if (orderBy) {
      order[orderBy] = orderDir ? orderDir : 'ASC';
    }
    transactionList.skiped = skip;
    transactionList.transactions = await this.transactionRepository.find({
      // relations: ['type'],
      order,
      where: { userId, type: { id: typeId } },
      take,
      skip,
    });

    const transactionCount = await this.transactionRepository.count({
      where: { userId },
    });

    transactionList.totalCount = transactionCount;
    transactionList.hasMore = skip + take < transactionCount;
    transactionList.toSkip = skip + transactionList.transactions.length;
    transactionList.orderBy = orderBy;
    transactionList.orderDir = orderDir;

    return transactionList;
  }

  async add(transaction: Transaction): Promise<Transaction> {
    try {
      return this.transactionRepository.save(transaction);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
