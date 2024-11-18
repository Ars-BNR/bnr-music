import { ApiProperty } from '@nestjs/swagger';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CollectionModel } from 'src/collection/model/collection.model';
import { PlaylistModel } from 'src/playlist/model/playlist.model';

@Table({ tableName: 'collection_playlists', timestamps: false })
export class CollectionPlaylistModel extends Model {
  @ApiProperty({
    example: 1,
    description: 'id коллекции',
  })
  @ForeignKey(() => CollectionModel)
  @Column
  collectionId: number;

  @ApiProperty({
    example: 1,
    description: 'id плейлиста',
  })
  @ForeignKey(() => PlaylistModel)
  @Column
  playlistId: number;
}
