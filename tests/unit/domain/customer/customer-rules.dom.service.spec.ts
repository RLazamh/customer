import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_STATUS_CODE } from '../../../../src/application/utils';
import { CustomerRulesDomService } from '../../../../src/domain';
import { factoryNumberNoValidate } from '../../../mocks/customer.mock';

describe('CustomerRulesDomService (unit test)', () => {
  let service: CustomerRulesDomService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [CustomerRulesDomService],
    }).compile();

    service = moduleFixture.get(CustomerRulesDomService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CustomerController', () => {
    it('GIVE a phone number WHEN it does not start 09 THEN throw an error with number ERROR 5400', async () => {
      const fakeNumber = factoryNumberNoValidate();
      try {
        service.validatePhoneNumber(fakeNumber);
      } catch (error) {
        expect(error).toEqual(ERROR_STATUS_CODE.INVALIDATE_PHONE_NUMER);
      }
    });
  });
});
