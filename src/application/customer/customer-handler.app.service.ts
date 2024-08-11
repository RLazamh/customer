import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_DB_REPOSITORY,
  CustomerDBRepository,
} from './repositories/db.repository';
import { CustomerDto } from './dtos/customer.dto';

@Injectable()
export class CustomerHandlerAppService {
  constructor(
    @Inject(CUSTOMER_DB_REPOSITORY)
    private readonly _customerDBRepository: CustomerDBRepository,
  ) {}

  async createCustomer(
    newCustomer: CustomerDto,
    trackingId: string,
  ): Promise<number> {
    const customer = await this._customerDBRepository.getCustomerByEmail(
      newCustomer.email,
    );
    if (customer) {
      throw Error('Customer already exists');
    }
    console.log(`create customer ${trackingId}`, newCustomer);
    return this._customerDBRepository.createCustomer(newCustomer);
  }

  async getCustomerById(id: string, trackingId: string): Promise<CustomerDto> {
    console.log(`get customer ${trackingId}`);
    return this._customerDBRepository.getCustomerById(id);
  }
}
