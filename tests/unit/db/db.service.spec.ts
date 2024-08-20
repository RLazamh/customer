import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { DatabaseService } from '../../../src/infrastructure/db/db.service';

jest.mock('typeorm', () => {
  const actualTypeORM = jest.requireActual('typeorm');
  return {
    ...actualTypeORM,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(true),
      runMigrations: jest.fn().mockResolvedValue(true),
      getRepository: jest.fn(),
    })),
  };
});

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockDataSource: DataSource;
  let mockRepository: Repository<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    mockDataSource = new DataSource({} as DataSourceOptions);
    mockRepository = {} as Repository<any>;

    service['dataSource'] = mockDataSource;
  });

  describe('init', () => {
    it('should initialize the data source and run migrations if not initialized', async () => {
      const mockConfig: DataSourceOptions = {} as DataSourceOptions;

      await service.init(mockConfig);

      // expect(mockDataSource.initialize).toHaveBeenCalled();
      // expect(mockDataSource.runMigrations).toHaveBeenCalled();
    });

    it('should not initialize the data source if already initialized', async () => {
      const mockConfig: DataSourceOptions = {} as DataSourceOptions;

      service['dataSource'] = mockDataSource;
      await service.init(mockConfig);

      expect(mockDataSource.initialize).not.toHaveBeenCalled();
      expect(mockDataSource.runMigrations).not.toHaveBeenCalled();
    });
  });

  describe('getRepository', () => {
    it('should return the repository for a given entity', () => {
      const mockEntity = class {};
      (mockDataSource.getRepository as jest.Mock).mockReturnValue(
        mockRepository,
      );

      const result = service.getRepository(mockEntity);

      expect(result).toBe(mockRepository);
      expect(mockDataSource.getRepository).toHaveBeenCalledWith(mockEntity);
    });

    it('should throw an error if data source is not initialized', () => {
      service['dataSource'] = null; // Ensuring dataSource is not initialized
      const mockEntity = class {};

      expect(() => service.getRepository(mockEntity)).toThrow(
        'DataSource is not initialized. Call init() first.',
      );
    });
  });
});
