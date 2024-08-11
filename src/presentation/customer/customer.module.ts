import { Module } from '@nestjs/common';
import { CUSTOMER_DB_REPOSITORY } from '../../application/customer/repositories/db.repository';
import { CustomerServiceCrud } from '../../domain/customer';
import { CustomerServiceDB } from '../../infrastructure/db/services/customer/customer-db.service';
import { DatabaseModule } from '../../infrastructure/db/db.module';
import { CustomerController } from './customer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    CustomerServiceCrud,
    {
      provide: CUSTOMER_DB_REPOSITORY,
      useClass: CustomerServiceDB,
    },
  ],
})
export class CustomerModule {}
