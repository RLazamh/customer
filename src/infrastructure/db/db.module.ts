import { Module } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { CustomerDBInfService } from './services';

@Module({
  providers: [CustomerDBInfService, DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
