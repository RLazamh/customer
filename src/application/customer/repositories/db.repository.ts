export const DB_CUSTOMER_SERVICE = 'DB_CUSTOMER_SERVICE';

export interface dbCustomerService {
  getCustomerById(data: any, trackingId: string): Promise<any>;
  createCustomer(data: any, trackingId: string): Promise<any>;
}
