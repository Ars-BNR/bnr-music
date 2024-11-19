import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AlbumTrackModel } from './model/album-track.model';
import { CreateAlbumTrackDto } from './dto/create-albumTrack.dto';
import { UpdateAlbumTrackDto } from './dto/update-albumTrack.dto';

@Injectable()
export class AlbumTrackService {
  constructor(
    @InjectModel(AlbumTrackModel)
    private albumTrackRepository: typeof AlbumTrackModel,
  ) {}

  async create(dto: CreateAlbumTrackDto) {
    const candidate = await this.albumTrackRepository.findOne({
      where: {
        trackId: dto.trackId,
        albumId: dto.albumId,
      },
    });
    if (candidate) {
      throw new HttpException(
        'Данный трек уже привязан к альбому',
        HttpStatus.BAD_REQUEST,
      );
    }
    const albumTrack = await this.albumTrackRepository.create({ ...dto });
    return albumTrack;
  }

  async delete(albumId: number, trackId: number) {
    const album = await this.albumTrackRepository.destroy({
      where: {
        albumId,
        trackId,
      },
    });

    if (album === 0) {
      throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async change(dto: UpdateAlbumTrackDto) {
    const albumTrack = await this.albumTrackRepository.findOne({
      where: {
        trackId: dto.trackId,
      },
    });

    if (!albumTrack) {
      throw new Error('Связь между альбомом и треком не найдена');
    }

    albumTrack.albumId = dto.albumId;

    await albumTrack.save();

    return albumTrack;
  }
}
