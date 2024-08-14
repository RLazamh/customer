import { CustomerDto } from '../../application/customer';

export const CUSTOMER_DB_REPOSITORY = 'CUSTOMER_DB_REPOSITORY';

export interface CustomerDBRepository {
  getCustomerById(id: string): Promise<CustomerDto>;
  getCustomerByEmail(email: string): Promise<CustomerDto>;
  /**
   * @returns {number} The number response is the code bussiness.
   */
  createCustomer(customer: CustomerDto): Promise<void>;
}
