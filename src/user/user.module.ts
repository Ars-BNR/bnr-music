import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenModule } from 'src/token/token.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';

@Module({
  imports: [TokenModule, SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
