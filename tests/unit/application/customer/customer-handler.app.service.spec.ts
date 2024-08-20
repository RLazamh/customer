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
import { ERROR_STATUS_CODE } from '../../../../src/application/utils';

jest.mock('uuid', () => ({ v4: () => 'mock-uuid-v4-634aaaffd9c6' }));
const mockTrackingId = 'mock-uuid-v4-634aaaffd9c6';

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
    it('GIVE new customer WHEN customer is a new THEN it should call respository of DB', async () => {
      const mockNewCustomer = factoryGenerateCustomer();
      await service.createCustomer(mockNewCustomer, mockUUIDV4);
      expect(
        serviceCustomerRulesDomService.validatePhoneNumber,
      ).toHaveBeenCalledTimes(1);
      expect(
        serviceCustomerDBRepository.getCustomerByEmail,
      ).toHaveBeenCalledTimes(1);
      expect(serviceCustomerDBRepository.createCustomer).toHaveBeenCalledTimes(
        1,
      );
    });

    it('GIVE data of a new customer WHEN customer is already exists THEN should return a error', async () => {
      const mockNewCustomer: any = factoryGenerateCustomer();
      (
        serviceCustomerDBRepository.getCustomerByEmail as jest.Mock
      ).mockResolvedValue(mockNewCustomer);
      try {
        await service.createCustomer(mockNewCustomer, mockTrackingId);
      } catch (error) {
        expect(error.response.businessCode).toEqual(
          ERROR_STATUS_CODE.CUSTOMER_ALREADY_EXISTS,
        );
      }
    });
  });

  describe('getCustomerById', () => {
    it('GIVE went to information of customer WHEN get customer for Id THEN it should call respository of DB', async () => {
      const mockCustomerId = mockUUIDV4;
      await service.getCustomerById(mockCustomerId, mockCustomerId);
      expect(serviceCustomerDBRepository.getCustomerById).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
