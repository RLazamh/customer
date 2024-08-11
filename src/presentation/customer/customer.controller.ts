import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CustomerDto, GenericResponse } from '../../application/customer';
import { handleResponse } from '../../application/utils';
import { CustomerServiceCrud } from '../../domain/customer';

@Controller('customer')
export class CustomerController {
  constructor(private readonly _customerService: CustomerServiceCrud) {}

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
