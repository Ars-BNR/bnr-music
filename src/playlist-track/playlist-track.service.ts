import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlaylistTrackModel } from './model/playlist-track.model';
import { CreatePlaylistTrackDto } from './dto/create-playlistTrack.dto';
import { UpdatePlaylistTrackDto } from './dto/update-playlistTrack.dto';

@Injectable()
export class PlaylistTrackService {
  constructor(
    @InjectModel(PlaylistTrackModel)
    private playlistTrackRepository: typeof PlaylistTrackModel,
  ) {}

  async create(dto: CreatePlaylistTrackDto) {
    try {
      if (!dto) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
      const candidate = await this.playlistTrackRepository.findOne({
        where: {
          playlistId: dto.playlistId,
          trackId: dto.trackId,
        },
      });
      if (candidate) {
        throw new HttpException(
          'Данный трек уже привязан к альбому',
          HttpStatus.BAD_REQUEST,
        );
      }
      const playlistTrack = await this.playlistTrackRepository.create({
        ...dto,
      });
      return playlistTrack;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(playlistId: number, trackId: number) {
    try {
      if (!playlistId || !trackId) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }

      const playlistTrack = await this.playlistTrackRepository.destroy({
        where: {
          playlistId,
          trackId,
        },
      });
      if (playlistTrack === 0) {
        throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
      }

      return playlistTrack;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async change(
    playlistId: number,
    trackId: number,
    updatedData: UpdatePlaylistTrackDto,
  ) {
    try {
      console.log('playlistId || trackId', playlistId, trackId);
      console.log('updatedData', updatedData);
      if (!playlistId || !trackId) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
      const playlistTrack = await this.playlistTrackRepository.findOne({
        where: {
          playlistId,
          trackId,
        },
      });
      if (!playlistTrack) {
        throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
      }

      if (updatedData.playlistId !== undefined) {
        playlistTrack.playlistId = updatedData.playlistId;
      }
      if (updatedData.trackId !== undefined) {
        playlistTrack.trackId = updatedData.trackId;
      }

      // Object.assign(playlistTrack, updatedData);

      await playlistTrack.save();

      return playlistTrack;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
