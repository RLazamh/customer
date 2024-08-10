import { CustomerDto } from '../dtos/customer.dto';

export const DB_CUSTOMER_SERVICE = 'DB_CUSTOMER_SERVICE';

export interface dbCustomerService {
  getCustomerById(id: string, trackingId: string): Promise<CustomerDto>;
  createCustomer(customer: CustomerDto, trackingId: string): Promise<any>;
}
