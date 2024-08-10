import { Module } from '@nestjs/common';
import { CustomerServiceDB } from './services/customer/customer-db.service';
import { DatabaseService } from './db.service';

@Module({
  providers: [CustomerServiceDB, DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
