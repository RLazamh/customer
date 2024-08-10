import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CustomerDBRepository,
  CustomerDto,
} from '../../../../application/customer';
import { SUCCESSFUL_STATUS_CODE } from '../../../../application/utils';
import { configMigrate } from '../../config/db.orm';
import { DatabaseService } from '../../db.service';
import { CustomerEntity } from '../../entities/customer/customer.entity';

@Injectable()
export class CustomerServiceDB implements OnModuleInit, CustomerDBRepository {
  private customerRepository: Repository<CustomerEntity>;
  constructor(private _dbService: DatabaseService) {}

  async onModuleInit() {
    await this._dbService.init(configMigrate);
    this.customerRepository = this._dbService.getRepository(CustomerEntity);
  }

  getCustomerById(id: string): Promise<CustomerDto> {
    return this.customerRepository.findOne({
      where: { id },
    });
  }

  async createCustomer(customer: CustomerDto): Promise<number> {
    await this.customerRepository.save(customer);
    return SUCCESSFUL_STATUS_CODE.CUSTOMER_CREATED;
  }
}
