import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'listado de usuarios',
  })
  @ApiBearerAuth('APIKey-auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query) {
    const take = Number(query.take ?? 10);
    const skip = Number(query.skip ?? 0);
    if (isNaN(take) || isNaN(skip))
      throw new HttpException('invalid params', HttpStatus.BAD_REQUEST);

    return this.userService.findAll(take, skip);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '{{id}} invalida',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '{{id}} no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'datos del usuario {{id}}',
  })
  @ApiBearerAuth('APIKey-auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    const validId = Number(id);
    if (isNaN(validId))
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    return this.userService.findUserById(validId);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '{{id}} invalida',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '{{id}} no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'usuario {{id}} eliminado',
  })
  @ApiBearerAuth('APIKey-auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    const validId = Number(id);
    if (isNaN(validId))
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    return this.userService.deleteUserById(validId);
  }
}
