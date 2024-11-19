import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AlbumTrackService } from './album-track.service';
import { CreateAlbumTrackDto } from './dto/create-albumTrack.dto';
import { UpdateAlbumTrackDto } from './dto/update-albumTrack.dto';

@Controller('album_track')
export class AlbumTrackController {
  constructor(private albumTrackService: AlbumTrackService) {}

  @Post()
  create(@Body() dto: CreateAlbumTrackDto) {
    return this.albumTrackService.create(dto);
  }

  @Delete('delete/:albumId/:trackId')
  async delete(
    @Param('albumId') albumId: number,
    @Param('trackId') trackId: number,
  ) {
    await this.albumTrackService.delete(albumId, trackId);
  }

  @Patch('change')
  change(@Body() updateData: UpdateAlbumTrackDto) {
    return this.albumTrackService.change(updateData);
  }
}
