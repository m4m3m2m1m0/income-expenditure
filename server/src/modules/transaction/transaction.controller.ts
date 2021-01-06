import { TransactionService } from './transaction.service';
import { Transaction } from './../../database/entities/transaction.entity';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';
import { Get } from '@nestjs/common/decorators/http';
import { Query } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}

  @Get()
  async getTransactions(
    @Query('id') id: number,
    @CurrentUser() user: ICurrentUser,
  ): Promise<Transaction | Transaction[]> {
    if (id) {
      return this.transactionService.get(id, user.id);
    }

    return this.transactionService.getTransactions(user.id);
  }

  @Post()
  async addTransaction(
    @Body() transaction: Transaction,
    @CurrentUser() user: ICurrentUser,
  ): Promise<number> {
    transaction.date = new Date();
    transaction.userId = user.id;

    return await this.transactionService.add(transaction);
  }
}
