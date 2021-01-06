import { Inject } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { TransactionCategory } from 'src/database/entities/transaction-category.entity';
import { TransactionCategoryService } from './transaction-category.service';

@Controller('transaction-category')
export class TransactionCategoryController {
  constructor(
    @Inject(TransactionCategoryService)
    private readonly transactionCategoryService: TransactionCategoryService,
  ) {}

  @Get()
  async getCategories(): Promise<TransactionCategory[]> {
    return this.transactionCategoryService.getCategories();
  }
}
