import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { TransactionTypeModule } from './modules/transaction-type/transaction-type.module';
import { TransactionCategoryModule } from './modules/transaction-category/transaction-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.1.167',
      port: 1433,
      username: 'sa',
      password: 'Password1',
      database: 'income-expenditure',
      entities: ['dist/**/*.entity{ .ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TransactionModule,
    TransactionTypeModule,
    TransactionCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
