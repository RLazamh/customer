import { Module } from '@nestjs/common';
import {
  CUSTOMER_DB_REPOSITORY,
  CustomerHandlerAppService,
} from '../../application/customer';
import { DatabaseModule } from '../../infrastructure/db/db.module';
import { CustomerDBInfService } from '../../infrastructure/db/services';
import { CustomerController } from './customer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    CustomerHandlerAppService,
    {
      provide: CUSTOMER_DB_REPOSITORY,
      useClass: CustomerDBInfService,
    },
  ],
})
export class CustomerModule {}
