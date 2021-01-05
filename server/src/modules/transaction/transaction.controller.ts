import { TransactionService } from './transaction.service';
import { Transaction } from './../../database/entities/transaction.entity';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from 'src/database/entities/user.entity';

@Controller('transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  async addTransaction(@Body() transaction: Transaction): Promise<void> {
    return this.transactionService.add(transaction);
  }
}
