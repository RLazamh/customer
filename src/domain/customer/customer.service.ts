import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/application/customer';
import { SUCCESSFUL_STATUS_CODE } from 'src/application/utils/status';

@Injectable()
export class CustomerService {
  async createCustomer(customer: CustomerDto): Promise<number> {
    console.log('create customer', customer);
    return SUCCESSFUL_STATUS_CODE.CUSTOMER_CREATED;
  }
}
