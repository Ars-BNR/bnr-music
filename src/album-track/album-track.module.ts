import { Module } from '@nestjs/common';
import { AlbumTrackController } from './album-track.controller';
import { AlbumTrackService } from './album-track.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlbumTrackModel } from './model/album-track.model';

@Module({
  imports: [SequelizeModule.forFeature([AlbumTrackModel])],
  controllers: [AlbumTrackController],
  providers: [AlbumTrackService],
})
export class AlbumTrackModule {}
