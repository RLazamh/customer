import { Test, TestingModule } from '@nestjs/testing';
import { CustomerHandlerAppService } from '../../../../src/application/customer';
import {
  CUSTOMER_DB_REPOSITORY,
  CustomerDBRepository,
  CustomerRulesDomService,
} from '../../../../src/domain';
import {
  factoryGenerateCustomer,
  mockUUIDV4,
} from '../../../mocks/customer.mock';

describe('CustomerHandlerAppService (unit test)', () => {
  let service: CustomerHandlerAppService;
  let serviceCustomerDBRepository: CustomerDBRepository;
  let serviceCustomerRulesDomService: CustomerRulesDomService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerHandlerAppService,
        {
          provide: CUSTOMER_DB_REPOSITORY,
          useFactory: () => ({
            createCustomer: jest.fn(),
            getCustomerByEmail: jest.fn(),
            getCustomerById: jest.fn(),
          }),
        },
        {
          provide: CustomerRulesDomService,
          useFactory: () => ({
            validatePhoneNumber: jest.fn(),
          }),
        },
      ],
    }).compile();
    service = moduleFixture.get(CustomerHandlerAppService);
    serviceCustomerDBRepository = moduleFixture.get(CUSTOMER_DB_REPOSITORY);
    serviceCustomerRulesDomService = moduleFixture.get(CustomerRulesDomService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(serviceCustomerDBRepository).toBeDefined();
    expect(serviceCustomerRulesDomService).toBeDefined();
  });
  describe('createCustomer', () => {
    it('GIVE new customer WHEN it have any error THEN it should call respository of DB', () => {
      const mockNewCustomer = factoryGenerateCustomer();
      service.createCustomer(mockNewCustomer, mockUUIDV4);
      expect(
        serviceCustomerRulesDomService.validatePhoneNumber,
      ).toHaveBeenCalledTimes(1);
      expect(
        serviceCustomerDBRepository.getCustomerByEmail,
      ).toHaveBeenCalledTimes(1);
    });
  });
});
