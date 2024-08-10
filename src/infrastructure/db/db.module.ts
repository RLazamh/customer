import { Module } from '@nestjs/common';
import { CustomerDBService } from './entities/customer/customer-db.service';

@Module({
  providers: [CustomerDBService],
})
export class DatabaseModule {}
