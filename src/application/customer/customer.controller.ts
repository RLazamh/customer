import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../../domain/customer';
import { CustomerRequest } from './dtos/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly _customerService: CustomerService) {}

  @Get(':customerId')
  async getCustomerByID(@Param('customerId') customerId: string) {
    console.log('Customer ID', customerId);
  }

  @Post()
  async createCustomer(@Body() customer: CustomerRequest) {
    this._customerService.createCustomer(customer);
  }
}
