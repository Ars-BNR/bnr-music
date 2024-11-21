import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PlaylistTrackService } from './playlist-track.service';
import { CreatePlaylistTrackDto } from './dto/create-playlistTrack.dto';
import { UpdatePlaylistTrackDto } from './dto/update-playlistTrack.dto';

@Controller('playlist_track')
export class PlaylistTrackController {
  constructor(private playlistTrackService: PlaylistTrackService) {}

  @Post()
  create(@Body() dto: CreatePlaylistTrackDto) {
    return this.playlistTrackService.create(dto);
  }

  @Delete('delete/:playlistId/:trackId')
  delete(
    @Param('playlistId') albumId: number,
    @Param('trackId') trackId: number,
  ) {
    return this.playlistTrackService.delete(albumId, trackId);
  }

  @Patch('change/:playlistId/:trackId')
  change(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
    @Body() updateData: UpdatePlaylistTrackDto,
  ) {
    return this.playlistTrackService.change(playlistId, trackId, updateData);
  }
}
