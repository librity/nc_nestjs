import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  describe('/movies (METHOD)', () => {
    it('should return something', () => {});
    it.todo('scenario');
  });

  describe('/movies (GET)', () => {
    it('should return an empty array', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
  });

  describe('/movies (POST)', () => {
    it('should create a movie', () => {
      const body = {
        title: 'Tenet',
        director: 'Christopher Nolan',
        year: 2021,
        genres: ['action', 'time travel'],
      };

      return request(app.getHttpServer())
        .post('/movies')
        .send(body)
        .expect(201);
    });

    it('should return bad request', () => {
      const body = {
        title: 'Tenet',
        director: 'Christopher Nolan',
        year: 2021,
        genres: ['action', 'time travel'],
        bad: 'BAD',
      };

      return request(app.getHttpServer())
        .post('/movies')
        .send(body)
        .expect(400);
    });
  });

  describe('/movies/:id (GET)', () => {
    it('should return the movie', () => {
      const expected = {
        id: 1,
        title: 'Tenet',
        director: 'Christopher Nolan',
        year: 2021,
        genres: ['action', 'time travel'],
      };

      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
        .expect(expected);
    });

    it('should return not found', () => {
      return request(app.getHttpServer()).get('/movies/10').expect(404);
    });
  });

  describe('/movies/:id (PATCH)', () => {
    it('should update the movie', () => {
      const body = {
        title: 'UPDATED',
        year: 3000,
      };

      return request(app.getHttpServer())
        .patch('/movies/1')
        .send(body)
        .expect(200);
    });

    it('should return not found', () => {
      return request(app.getHttpServer()).patch('/movies/10').expect(404);
    });
  });

  describe('/movies/:id (DELETE)', () => {
    it('should delete the movie', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('should return not found', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(404);
    });
  });
});
