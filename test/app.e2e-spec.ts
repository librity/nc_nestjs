import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const expected = {
      message: 'Welcome to Nest Movies 1.0!',
      method: 'GET',
      hostname: '127.0.0.1',
      ip: '::ffff:127.0.0.1',
      url: '/',
    };

    return request(app.getHttpServer()).get('/').expect(200).expect(expected);
  });
});
