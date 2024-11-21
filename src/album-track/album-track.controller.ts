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
   delete(
    @Param('albumId') albumId: number,
    @Param('trackId') trackId: number,
  ) {
    return this.albumTrackService.delete(albumId, trackId);
  }

  @Patch('change/:albumId/:trackId')
  change(
    @Param('albumId') albumId: number,
    @Param('trackId') trackId: number,
    @Body() updateData: UpdateAlbumTrackDto,
  ) {
    return this.albumTrackService.change(albumId, trackId, updateData);
  }
}
