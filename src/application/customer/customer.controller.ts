import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../../domain/customer';
import { handleResponse } from '../utils/success.responses';
import { CustomerDto, GenericResponse } from './dtos/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly _customerService: CustomerService) {}

  @Get(':customerId')
  async getCustomerByID(@Param('customerId') customerId: string) {
    console.log('Customer ID', customerId);
  }

  @Post()
  async createCustomer(
    @Body() customer: CustomerDto,
  ): Promise<GenericResponse> {
    const code = await this._customerService.createCustomer(customer);
    return handleResponse(code, 'any-trackingID');
  }
}
