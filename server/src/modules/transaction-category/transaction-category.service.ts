import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionCategory } from 'src/database/entities/transaction-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionCategoryService {
  constructor(
    @InjectRepository(TransactionCategory)
    private transactionCategoryRepository: Repository<TransactionCategory>,
  ) {}

  async getCategories(): Promise<TransactionCategory[]> {
    return this.transactionCategoryRepository.find();
  }
}
