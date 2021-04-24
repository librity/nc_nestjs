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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'Matrix, Harry Potter, Fight Club';
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `Searching for a movie released after ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `${id}: Matrix Reloaded`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateData) {
    return {
      id: id,
      ...updateData,
    };
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return `Successfully deleted ${id}, Animatrix`;
  }
}
