import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  CustomerDto,
  CustomerHandlerAppService,
  GenericResponse,
} from '../../application/customer';
import {
  handleResponse,
  SUCCESSFUL_STATUS_CODE,
} from '../../application/utils';

@Controller('customer')
export class CustomerController {
  constructor(private readonly _customerHandler: CustomerHandlerAppService) {}

  @Get(':customerId')
  async getCustomerByID(@Param('customerId') customerId: string) {
    const trackingID = uuidv4();
    return this._customerHandler.getCustomerById(customerId, trackingID);
  }

  @Post()
  async createCustomer(
    @Body() customer: CustomerDto,
  ): Promise<GenericResponse> {
    const trackingID = uuidv4();
    await this._customerHandler.createCustomer(customer, trackingID);
    return handleResponse(SUCCESSFUL_STATUS_CODE.SUCCESS_REQUEST, trackingID);
  }
}
