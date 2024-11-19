import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateAlbumTrackDto {
  @ApiProperty({
    example: 1,
    description: 'id альбома',
  })
  @IsOptional()
  @IsInt({ message: 'Должен быть целым числом' })
  albumId: number;

  @ApiProperty({
    example: 1,
    description: 'id трека',
  })
  @IsOptional()
  @IsInt({ message: 'Должен быть целым числом' })
  trackId: number;
}
