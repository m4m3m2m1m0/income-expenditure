import {
  Body,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ClassSerializerInterceptor, Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { TransactionCategory } from 'src/database/entities/transaction-category.entity';
import { TransactionCategoryService } from './transaction-category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transaction-category')
// @UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionCategoryController {
  constructor(
    @Inject(TransactionCategoryService)
    private readonly transactionCategoryService: TransactionCategoryService,
  ) {}

  @Get()
  async getCategories(): Promise<TransactionCategory[]> {
    return this.transactionCategoryService.getCategories();
  }

  @Post()
  async addCategory(
    @Body() category: TransactionCategory,
  ): Promise<TransactionCategory> {
    return this.transactionCategoryService.addCategory(category);
  }
}
