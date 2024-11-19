import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AlbumModel } from './model/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { TrackModel } from 'src/track/model/track.model';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(AlbumModel) private albumRepository: typeof AlbumModel,
  ) {}

  async create(dto: CreateAlbumDto) {
    const album = await this.albumRepository.create({
      ...dto,
    });
    return album;
  }

  async getAll(count = 10, offset = 0) {
    const album = await this.albumRepository.findAll({
      limit: Number(count),
      offset: Number(offset),
    });
    return album;
  }

  async getOne(id: number) {
    const album = await this.albumRepository.findByPk(id, {
      include: [
        {
          model: TrackModel,
          through: { attributes: [] }, // Исключаем промежуточную таблицу из результата
        },
      ],
    });
    return album;
  }

  async delete(id: number) {
    const album = await this.albumRepository.destroy({ where: { id } });
    return album;
  }

  async change(id: number, updateData: CreateAlbumDto) {
    const album = await this.albumRepository.findByPk(id);

    Object.assign(album, updateData);

    await album.save();

    return album;
  }
}
