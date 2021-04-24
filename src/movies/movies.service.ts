import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  byId(id: string): Movie {
    // +id evaluates string as number
    return this.movies.find((movie) => movie.id === +id);
  }

  delete(id: string): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== +id);

    return true;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
