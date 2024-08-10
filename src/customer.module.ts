import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/db/db.module';
import { CustomerController } from './application/customer';
import { CustomerService } from './domain/customer';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class AppModule {}
