import { Injectable } from '@nestjs/common';
import { CustomerRequest } from 'src/application/customer';

@Injectable()
export class CustomerService {
  async createCustomer(customer: CustomerRequest) {
    console.log('create customer', customer);
  }
}
