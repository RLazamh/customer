import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerDto } from '../../../../application/customer';
import { ERROR_STATUS_CODE } from '../../../../application/utils';
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
    try {
      return this.customerRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw ERROR_STATUS_CODE.ERROR_DB;
    }
  }

  getCustomerByEmail(email: string): Promise<CustomerDto> {
    try {
      return this.customerRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw ERROR_STATUS_CODE.ERROR_DB;
    }
  }

  async createCustomer(customer: CustomerDto): Promise<void> {
    try {
      await this.customerRepository.save(customer);
    } catch (error) {
      throw ERROR_STATUS_CODE.ERROR_DB;
    }
  }
}
