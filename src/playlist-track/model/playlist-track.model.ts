import { ApiProperty } from '@nestjs/swagger';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { PlaylistModel } from 'src/playlist/model/playlist.model';
import { TrackModel } from 'src/track/model/track.model';

@Table({ tableName: 'playlist_tracks', timestamps: false })
export class PlaylistTrackModel extends Model {
  @ApiProperty({
    example: 1,
    description: 'id плейлиста',
  })
  @ForeignKey(() => PlaylistModel)
  @Column
  playlistId: number;

  @ApiProperty({
    example: 1,
    description: 'id трека',
  })
  @ForeignKey(() => TrackModel)
  @Column
  trackId: number;
}
