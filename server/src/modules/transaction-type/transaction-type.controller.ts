import { TransactionTypeService } from './transaction-type.service';
import { TransactionType } from './../../database/entities/transaction-type.entity';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Controller('transaction-type')
export class TransactionTypeController {
  constructor(
    @Inject(TransactionTypeService)
    private readonly transactionTypeService: TransactionTypeService,
  ) {}

  @Get()
  async getTypes(): Promise<TransactionType[]> {
    return this.transactionTypeService.getTypes();
  }
}
