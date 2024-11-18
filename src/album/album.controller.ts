import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    const album = this.albumService.create(dto);
    return album;
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.albumService.getOne(id);
  }
}
