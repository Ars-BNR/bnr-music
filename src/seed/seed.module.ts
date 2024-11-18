import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackModel } from 'src/track/model/track.model';
import { AlbumModel } from 'src/album/model/album.model';
import { AlbumTrackModel } from 'src/album-track/model/album-track.model';

@Module({
  imports: [
    SequelizeModule.forFeature([TrackModel, AlbumModel, AlbumTrackModel]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
