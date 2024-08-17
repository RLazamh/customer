import { faker } from '@faker-js/faker';
import { CustomerDto, Gender } from '../../src/application/customer';

export const mockUUIDV4 = 'mock-uuid-v4-634aaaffd9c6';

export const factoryGenerateCustomer = (): CustomerDto => {
  faker.seed(Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER));

  return {
    userName: faker.word.words(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.helpers.enumValue(Gender),
    email: faker.internet.email(),
    emailVerified: faker.datatype.boolean(),
    phoneNumber: faker.phone.number(),
  };
};
