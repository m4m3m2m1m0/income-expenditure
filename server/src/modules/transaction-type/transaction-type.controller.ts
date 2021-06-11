import { TransactionTypeService } from './transaction-type.service';
import { TransactionType } from './../../database/entities/transaction-type.entity';
import {
  ClassSerializerInterceptor,
  Controller,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transaction-type')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
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
