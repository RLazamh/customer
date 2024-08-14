import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '.../../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('createCustomer', async () => {
    const customerId = 'e9a4a697-a47c-4ddf-9d46-7527161e74be';
    const customerResponse = await request(app.getHttpServer())
      .get(`/customer/${customerId}`)
      .expect(200);
    console.log(customerResponse.body);
  });
});
