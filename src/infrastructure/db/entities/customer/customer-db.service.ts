import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class CustomerDBService implements OnModuleInit {
  // private customerRepository: Repository<Customer>;
  // constructor(private dbService: DatabaseService) {}
  async onModuleInit() {
    // await this.dbService.init(configMigrate, process.env.POSTGRES_DB);
    // this.customerRepository = this.dbService.getRepository(Customer);
  }
  // async findCustomerById(id: string): Promise<Customer> {
  //   return this.customerRepository.findOne({ id });
  // }
}
