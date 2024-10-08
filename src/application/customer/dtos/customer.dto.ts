import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CustomerDto {
  @ApiProperty({
    description: 'Customer ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Customer username',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Customer first name',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Customer last name',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Customer gender',
    enum: Gender,
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Customer email',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Email verified',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({
    description: 'Customer phone number',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Customer address',
    required: false,
  })
  @IsOptional()
  address?: object;

  @ApiProperty({
    description: 'Customer metadata',
    required: false,
  })
  @IsOptional()
  metadata?: object;
}

export class GenericResponse {
  @ApiProperty({
    description: 'Status code',
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'Bussiness code',
  })
  @IsNumber()
  bussinessCode: number;

  @ApiProperty({
    description: 'Message response',
    required: false,
  })
  @IsString()
  @IsOptional()
  message?: string;
}
