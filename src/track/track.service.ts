import { FileService, FileType } from './../file/file.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrackModel } from './model/track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { Op } from 'sequelize';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(TrackModel) private trackRepository: typeof TrackModel,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateTrackDto,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<TrackModel> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackRepository.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<TrackModel[]> {
    const tracks = await TrackModel.findAll({
      limit: Number(count),
      offset: Number(offset),
    });
    return tracks;
  }

  async getOne(id: number): Promise<TrackModel> {
    const track = await this.trackRepository.findByPk(id);
    return track;
  }

  async listen(id: number) {
    const track = await this.trackRepository.findByPk(id);
    track.listens += 1;
    track.save();
    return '+1 listen';
  }

  async search(query: string): Promise<TrackModel[]> {
    const tracks = await this.trackRepository.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    return tracks;
  }

  async delete(id: number) {
    const track = await this.trackRepository.destroy({ where: { id } });
    return track;
  }

  async change(id: number, updateData: UpdateTrackDto) {
    const track = await this.trackRepository.findByPk(id);

    Object.assign(track, updateData);

    await track.save();

    return track;
  }
}
