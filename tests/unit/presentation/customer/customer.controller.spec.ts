import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../../../../src/presentation/customer/customer.controller';
import { CustomerHandlerAppService } from '../../../../src/application/customer';

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

  it('should create customer', () => {
    const a: any = { a: 20 };
    controller.createCustomer(a);
    expect(serviceCustomerHandler.createCustomer).toHaveBeenCalledTimes(1);
  });
});
