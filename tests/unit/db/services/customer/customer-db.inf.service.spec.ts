import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDBInfService } from '../../../../../src/infrastructure/db/services';
import { DatabaseService } from '../../../../../src/infrastructure/db/db.service';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../../../../src/infrastructure/db/entities/customer/customer.entity';
import { CustomerDto } from '../../../../../src/application/customer';

describe('CustomerDBInfService (unit test)', () => {
  let service: CustomerDBInfService;
  let mockRepository: jest.Mocked<Repository<CustomerEntity>>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerDBInfService,
        {
          provide: DatabaseService,
          useValue: {
            getRepository: jest.fn(),
            init: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleFixture.get<CustomerDBInfService>(CustomerDBInfService);
    const dbService = moduleFixture.get<DatabaseService>(DatabaseService);

    // Crear un mock explícito del repositorio
    mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<CustomerEntity>>;

    // Configurar el mock para que `getRepository` devuelva nuestro `mockRepository`
    (dbService.getRepository as jest.Mock).mockReturnValue(mockRepository);

    // Asignar el mockRepository a la propiedad customerRepository
    service['customerRepository'] = mockRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCustomerById', () => {
    it('should return a customer by id', async () => {
      const mockCustomer: CustomerDto = {
        id: '1',
        email: 'test@example.com',
      } as CustomerDto;
      mockRepository.findOne.mockResolvedValue(mockCustomer);

      const result = await service.getCustomerById('1');

      expect(result).toEqual(mockCustomer);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('getCustomerByEmail', () => {
    it('should return a customer by email', async () => {
      const mockCustomer: CustomerDto = {
        id: '1',
        email: 'test@example.com',
      } as CustomerDto;
      mockRepository.findOne.mockResolvedValue(mockCustomer);

      const result = await service.getCustomerByEmail('test@example.com');

      expect(result).toEqual(mockCustomer);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('createCustomer', () => {
    it('should save a customer', async () => {
      const mockCustomer: CustomerDto = {
        id: '1',
        email: 'test@example.com',
      } as CustomerDto;
      mockRepository.save.mockResolvedValue(undefined);

      await service.createCustomer(mockCustomer);

      expect(mockRepository.save).toHaveBeenCalledWith(mockCustomer);
    });
  });
});
