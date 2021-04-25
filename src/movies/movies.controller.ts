import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `Searching for a movie released after ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.byId(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(id, updateData);
  }

  @Delete('/:id')
  destroy(@Param('id') id: number) {
    return this.moviesService.delete(id);
  }
}
