import { Module } from '@nestjs/common';
import { CustomerDBService } from './entities/customer/customer-db.service';
import { DatabaseService } from './db.service';

@Module({
  providers: [CustomerDBService, DatabaseService],
})
export class DatabaseModule {}
