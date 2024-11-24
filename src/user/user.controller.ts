import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { ActivateDto } from './dto/check-link.dto';
import { RateLimit } from 'nestjs-rate-limiter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { UserResponse } from './response/user-response';
import { UserModel } from './model/user.model';

@ApiTags('Пользователи')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserResponse })
  @Post('registration')
  async registartion(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.userService.registration(userDto);
    await this.userService.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @ApiOperation({ summary: 'Вход в учетную запись пользователя' })
  @ApiResponse({ status: 200, type: UserResponse })
  @Post('login')
  @RateLimit({
    points: 5,
    duration: 60,
    errorMessage: 'Слишком много попыток входа. Попробуйте через минуту.',
  })
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.userService.login(userDto);
    await this.userService.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @ApiOperation({ summary: 'Выход из учетной записи пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Успешный выход',
    schema: {
      type: 'number',
      example: 1,
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Number> {
    const { refreshToken } = req.cookies;
    const token = this.userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return token;
  }

  @Get('activate/:link')
  async activate(@Param() params: ActivateDto, @Res() res: Response) {
    console.log('activationLink', params);
    await this.userService.activate(params.link);
    return res.redirect(process.env.CLIENT_URL);
  }

  @ApiOperation({ summary: 'Обновление токенов пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Токены успешно обновлены',
    type: UserResponse,
  })
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const userData = await this.userService.refresh(refreshToken);
    await this.userService.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  getAll() {
    return this.userService.getAllUsers();
  }
}
