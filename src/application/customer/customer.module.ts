import { Module } from '@nestjs/common';
import { CustomerServiceDB } from '../../infrastructure/db/services/customer/customer-db.service';
import { CustomerController } from './customer.controller';
import { CUSTOMER_DB_REPOSITORY } from './repositories/db.repository';
import { DatabaseModule } from '../../infrastructure/db/db.module';
import { CustomerService } from '../../domain/customer/customer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: CUSTOMER_DB_REPOSITORY,
      useClass: CustomerServiceDB,
    },
  ],
})
export class CustomerModule {}
