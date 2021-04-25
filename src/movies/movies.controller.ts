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
  getOne(@Param('id') id: string): Movie {
    return this.moviesService.byId(id);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateData) {
    return this.moviesService.update(id, updateData)
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
