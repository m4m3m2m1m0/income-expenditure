import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionType } from 'src/database/entities/transaction-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionTypeService {
  constructor(
    @InjectRepository(TransactionType)
    private transactionTypesRepository: Repository<TransactionType>,
  ) {}

  async getTypes(): Promise<TransactionType[]> {
    throw new NotFoundException('test');
    return this.transactionTypesRepository.find();
  }
}
