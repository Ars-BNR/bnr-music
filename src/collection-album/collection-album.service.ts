import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionAlbumModel } from './model/collection-album.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCollectionAlbumDto } from './dto/create-collectionAlbum.dto';
import { UpdateCollectionAlbumDto } from './dto/update-collectionAlbum.dto';

@Injectable()
export class CollectionAlbumService {
  constructor(
    @InjectModel(CollectionAlbumModel)
    private collectionAlbumRepository: typeof CollectionAlbumModel,
  ) {}

  async create(dto: CreateCollectionAlbumDto) {
    try {
      if (!dto) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
      const candidate = await this.collectionAlbumRepository.findOne({
        where: {
          collectionId: dto.collectionId,
          albumId: dto.albumId,
        },
      });
      if (candidate) {
        throw new HttpException(
          'Данный плейлист  уже привязан к коллекции',
          HttpStatus.BAD_REQUEST,
        );
      }
      const collectionPlaylist = await this.collectionAlbumRepository.create({
        ...dto,
      });
      return collectionPlaylist;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      if (!id) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }
      const collectionPlaylist = await this.collectionAlbumRepository.destroy({
        where: {
          id,
        },
      });

      if (collectionPlaylist === 0) {
        throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
      }

      return collectionPlaylist;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async change(id: number, updatedData: UpdateCollectionAlbumDto) {
    try {
      if (!id) {
        throw new HttpException(
          'Не указаны все данные',
          HttpStatus.BAD_REQUEST,
        );
      }

      const idExists = await this.collectionAlbumRepository.findByPk(id);
      if (!idExists) {
        throw new HttpException(
          'Нет такого альбома в коллекции',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newData = await this.collectionAlbumRepository.update(updatedData, {
        where: {
          id: id,
        },
      });
      return newData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
