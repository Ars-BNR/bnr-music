import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { CollectionModel } from 'src/collection/model/collection.model';
import { TokenModel } from 'src/token/model/token.model';

@Table({ tableName: 'users', timestamps: false })
export class UserModel extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный инкрементный идентификатор',
  })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'Misha@mail.ru', description: 'Логин пользователя' })
  @Unique
  @Column(DataType.STRING)
  login: string;

  @ApiProperty({ example: 'Miha6318', description: 'Пароль пользователя' })
  @Column(DataType.STRING)
  password: string;

  @ApiProperty({ example: 'user', description: 'Роль пользователя' })
  @Default('user')
  @Column(DataType.STRING)
  role: string;

  @HasMany(() => TokenModel)
  tokens: TokenModel[];

  @HasOne(() => CollectionModel)
  collection: CollectionModel;
}
