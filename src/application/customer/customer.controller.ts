import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CustomerService } from '../../domain/customer/customer.service';
import { handleResponse } from '../utils';
import { CustomerDto, GenericResponse } from './dtos/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly _customerService: CustomerService) {}

  @Get(':customerId')
  async getCustomerByID(@Param('customerId') customerId: string) {
    const trackingID = uuidv4();
    return this._customerService.getCustomerById(customerId, trackingID);
  }

  @Post()
  async createCustomer(
    @Body() customer: CustomerDto,
  ): Promise<GenericResponse> {
    const trackingID = uuidv4();
    const code = await this._customerService.createCustomer(
      customer,
      trackingID,
    );
    return handleResponse(code, trackingID);
  }
}
