import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Gender } from '../../entities/customer/customer.entity';

export class CreateCustomerTable1674485526914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            default: `'${uuidv4()}'`,
          },
          {
            name: 'user_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: false,
            enum: [Gender.FEMALE, Gender.MALE, Gender.OTHER],
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer');
  }
}
