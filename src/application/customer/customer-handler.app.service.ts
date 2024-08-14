import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_DB_REPOSITORY,
  CustomerDBRepository,
  CustomerRulesDomService,
} from '../../domain';
import { CustomerDto } from './dtos/customer.dto';
import { handleErrorResponse } from '../utils/error.responses';

@Injectable()
export class CustomerHandlerAppService {
  constructor(
    @Inject(CUSTOMER_DB_REPOSITORY)
    private readonly _customerDBRepository: CustomerDBRepository,
    private readonly _customerRules: CustomerRulesDomService,
  ) {}

  async createCustomer(
    newCustomer: CustomerDto,
    trackingId: string,
  ): Promise<number> {
    try {
      this._customerRules.validatePhoneNumber(newCustomer.phoneNumber);
      const customer = await this._customerDBRepository.getCustomerByEmail(
        newCustomer.email,
      );
      // you can better this one
      if (customer) {
        throw Error('Customer already exists');
      }
      return this._customerDBRepository.createCustomer(newCustomer);
    } catch (errorNumber) {
      handleErrorResponse(errorNumber, trackingId);
    }
  }

  async getCustomerById(id: string, trackingId: string): Promise<CustomerDto> {
    console.log(`get customer ${trackingId}`);
    return this._customerDBRepository.getCustomerById(id);
  }
}
