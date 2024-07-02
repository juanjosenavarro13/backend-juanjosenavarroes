import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@ApiBearerAuth('APIKey-auth')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'listado de usuarios',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Req() request: Request,
    @Query('take') take: number = 10,
    @Query('skip') skip: number = 0,
  ) {
    if (isNaN(take) || isNaN(skip))
      throw new HttpException('invalid params', HttpStatus.BAD_REQUEST);

    const user = request['user'];

    return this.userService.findAll(
      Number(user.id),
      Number(take),
      Number(skip),
    );
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
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    const validId = Number(id);
    if (isNaN(validId))
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    return this.userService.deleteUserById(validId);
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
    description: 'usuario {{id}} reinicio de password',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  resetPasswordById(@Param('id') id: string) {
    const validId = Number(id);
    if (isNaN(validId))
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    return this.userService.resetPasswordById(validId);
  }
}
