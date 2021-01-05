import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [AuthModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
