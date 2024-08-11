import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_DB_REPOSITORY,
  CustomerDBRepository,
  CustomerDto,
} from '../../application/customer';

@Injectable()
export class CustomerServiceCrud {
  constructor(
    @Inject(CUSTOMER_DB_REPOSITORY)
    private readonly _customerDBRepository: CustomerDBRepository,
  ) {}

  async createCustomer(
    customer: CustomerDto,
    trackingId: string,
  ): Promise<number> {
    console.log(`create customer ${trackingId}`, customer);
    return this._customerDBRepository.createCustomer(customer);
  }

  async getCustomerById(id: string, trackingId: string): Promise<CustomerDto> {
    console.log(`get customer ${trackingId}`);
    return this._customerDBRepository.getCustomerById(id);
  }
}
