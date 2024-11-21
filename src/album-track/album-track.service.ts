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
    try {
      if (!dto) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(albumId: number, trackId: number) {
    try {
      if (!albumId || !trackId) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async change(
    albumId: number,
    trackId: number,
    updatedData: UpdateAlbumTrackDto,
  ) {
    try {
      if (!albumId || !trackId) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
      const albumTrack = await this.albumTrackRepository.findOne({
        where: { albumId, trackId },
      });

      if (!albumTrack) {
        throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
      }

      Object.assign(albumTrack, updatedData);

      await albumTrack.save();
      return albumTrack;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
