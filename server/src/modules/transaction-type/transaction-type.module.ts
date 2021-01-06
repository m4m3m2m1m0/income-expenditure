import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionType } from 'src/database/entities/transaction-type.entity';
import { TransactionTypeController } from './transaction-type.controller';
import { TransactionTypeService } from './transaction-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType])],
  controllers: [TransactionTypeController],
  providers: [TransactionTypeService],
})
export class TransactionTypeModule {}
