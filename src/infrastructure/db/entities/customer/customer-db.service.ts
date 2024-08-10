import { Injectable, OnModuleInit } from '@nestjs/common';
import { configMigrate } from '../../config/db.orm';
import { DatabaseService } from '../../db.service';

@Injectable()
export class CustomerDBService implements OnModuleInit {
  constructor(private dbService: DatabaseService) {}
  async onModuleInit() {
    await this.dbService.init(configMigrate);
  }
}
