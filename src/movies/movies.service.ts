import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  byId(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);

    return movie;
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.byId(id);
    this.delete(id);
    this.movies.push({ ...movie, ...updateData });
  }

  delete(id: number) {
    this.byId(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
}
