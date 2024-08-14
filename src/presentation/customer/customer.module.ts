import { Module } from '@nestjs/common';
import { CustomerHandlerAppService } from '../../application/customer';
import { DatabaseModule } from '../../infrastructure/db/db.module';
import { CustomerDBInfService } from '../../infrastructure/db/services';
import { CUSTOMER_DB_REPOSITORY, CustomerRulesDomService } from '../../domain';
import { CustomerController } from './customer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    CustomerHandlerAppService,
    CustomerRulesDomService,
    {
      provide: CUSTOMER_DB_REPOSITORY,
      useClass: CustomerDBInfService,
    },
  ],
})
export class CustomerModule {}
