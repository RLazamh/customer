import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_DB_REPOSITORY,
  CustomerDBRepository,
  CustomerDto,
} from '../../application/customer';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_DB_REPOSITORY)
    private readonly _customerDBRepository: CustomerDBRepository,
  ) {}

  async createCustomer(
    customer: CustomerDto,
    trackingId: string,
  ): Promise<number> {
    console.log('create customer', customer);
    return this._customerDBRepository.createCustomer(customer, trackingId);
  }
}
