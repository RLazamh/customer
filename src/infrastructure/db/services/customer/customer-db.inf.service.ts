import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerDto } from '../../../../application/customer';
import { SUCCESSFUL_STATUS_CODE } from '../../../../application/utils';
import { CustomerDBRepository } from '../../../../domain';
import { configMigrate } from '../../config/db.orm';
import { DatabaseService } from '../../db.service';
import { CustomerEntity } from '../../entities/customer/customer.entity';

@Injectable()
export class CustomerDBInfService
  implements OnModuleInit, CustomerDBRepository
{
  private customerRepository: Repository<CustomerEntity>;
  constructor(private _dbService: DatabaseService) {}

  async onModuleInit() {
    await this._dbService.init(configMigrate);
    this.customerRepository = this._dbService.getRepository(CustomerEntity);
  }

  async getCustomerById(id: string): Promise<CustomerDto> {
    return this.customerRepository.findOne({
      where: { id },
    });
  }

  getCustomerByEmail(email: string): Promise<CustomerDto> {
    return this.customerRepository.findOne({
      where: { email },
    });
  }

  async createCustomer(customer: CustomerDto): Promise<number> {
    await this.customerRepository.save(customer);
    return SUCCESSFUL_STATUS_CODE.CUSTOMER_CREATED;
  }
}
