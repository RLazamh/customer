import { Test, TestingModule } from '@nestjs/testing';
import {
  handleResponse,
  SUCCESSFUL_STATUS_CODE,
} from '../../../../src/application/utils';
import { CustomerController } from '../../../../src/presentation/customer/customer.controller';
import { CustomerHandlerAppService } from '../../../../src/application/customer';
import { factoryGenerateCustomer } from '../../../mocks/customer.mock';

jest.mock('uuid', () => ({ v4: () => 'mock-uuid-v4-634aaaffd9c6' }));
const mockUUIDV4 = 'mock-uuid-v4-634aaaffd9c6';

describe('AppController (e2e)', () => {
  let controller: CustomerController;
  let serviceCustomerHandler: CustomerHandlerAppService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerHandlerAppService,
          useFactory: () => ({
            getCustomerById: jest.fn(),
            createCustomer: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = moduleFixture.get(CustomerController);
    serviceCustomerHandler = moduleFixture.get(CustomerHandlerAppService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(serviceCustomerHandler).toBeDefined();
  });

  describe('CustomerController', () => {
    it('should create customer', async () => {
      const mockCustomer = factoryGenerateCustomer();
      const result = await controller.createCustomer(mockCustomer);
      expect(serviceCustomerHandler.createCustomer).toHaveBeenCalledTimes(1);
      expect(serviceCustomerHandler.createCustomer).toHaveBeenCalledWith(
        mockCustomer,
        mockUUIDV4,
      );
      const expectedResult = handleResponse(
        SUCCESSFUL_STATUS_CODE.SUCCESS_REQUEST,
        mockUUIDV4,
      );
      expect(expectedResult).toEqual(result);
    });
  });
});
