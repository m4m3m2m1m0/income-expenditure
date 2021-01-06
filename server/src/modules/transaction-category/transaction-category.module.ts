import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionCategory } from 'src/database/entities/transaction-category.entity';
import { TransactionCategoryController } from './transaction-category.controller';
import { TransactionCategoryService } from './transaction-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCategory])],
  controllers: [TransactionCategoryController],
  providers: [TransactionCategoryService],
})
export class TransactionCategoryModule {}
