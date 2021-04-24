import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'Matrix, Harry Potter, Fight Club';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `${id}: Matrix Reloaded`;
  }

  @Post()
  create(@Body() movieData) {
    return `Successfully created Matrix Revolutions`;
  }

  @Patch('/:id')
  update(@Param('id') id: string) {
    return `${id} Animatrix updated to Enter the Matrix`;
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return `Successfully deleted ${id}, Animatrix`;
  }
}
