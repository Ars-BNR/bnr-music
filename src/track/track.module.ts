import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackModel } from './model/track.model';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [SequelizeModule.forFeature([TrackModel])],
  providers: [TrackService, FileService],
  controllers: [TrackController],
})
export class TrackModule {}
