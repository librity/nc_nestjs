import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  afterAll(async () => {
    // CLEANUP
  });

  describe('function', () => {
    it('should do something', () => {});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('byYear', () => {
    it('should return movies by year', () => {
      service.create({
        title: 'Test movie',
        director: 'test lynch',
        year: 2000,
        genres: ['test'],
      });
      service.create({
        title: 'Test movie 2',
        director: 'test lynch 2',
        year: 3000,
        genres: ['test 2'],
      });

      const result = service.byYear(3000);
      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual('Test movie 2');
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test movie',
        director: 'test lynch',
        year: 2000,
        genres: ['test'],
      });

      const movie = service.byId(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('Test movie');
    });

    it('should throw a not found error', () => {
      try {
        service.byId(9000);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with id 9000 not found');
      }
    });
  });

  describe('delete', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test movie',
        director: 'test lynch',
        year: 2000,
        genres: ['test'],
      });

      const before = service.getAll().length;
      service.delete(1);
      const after = service.getAll().length;

      expect(after).toEqual(before - 1);
    });

    it('should throw a not found error', () => {
      try {
        service.delete(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with id 1 not found');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const before = service.getAll().length;
      service.create({
        title: 'Test movie',
        director: 'test lynch',
        year: 2000,
        genres: ['test'],
      });
      const after = service.getAll().length;

      expect(after).toBeGreaterThan(before);
    });
  });

  describe('update', () => {
    it('should do something', () => {
      service.create({
        title: 'Test movie',
        director: 'test lynch',
        year: 2000,
        genres: ['test'],
      });

      service.update(1, {
        title: 'UPDATED',
      });
      const movie = service.byId(1);
      expect(movie.title).toEqual('UPDATED');
    });

    it('should throw a not found error', () => {
      try {
        service.update(1, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with id 1 not found');
      }
    });
  });
});
