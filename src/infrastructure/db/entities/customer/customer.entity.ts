import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryColumn({ name: 'id' })
  id?: string;

  @Column({ name: 'user_name', nullable: false })
  userName: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'gender', nullable: false, type: 'varchar' })
  gender: Gender;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'email_verified', nullable: false, default: false })
  emailVerified: boolean;

  @Column({ name: 'phone_number', nullable: false })
  phoneNumber: string;

  @Column({ name: 'address', nullable: true, type: 'jsonb' })
  address?: object;

  @Column({ name: 'metadata', nullable: true, type: 'jsonb' })
  metadata?: object;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;
}
