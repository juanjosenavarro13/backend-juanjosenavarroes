import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDTO } from './DTOS/register.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Errores de validacion',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario registrado',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() data: RegisterDTO) {
    return this.AuthService.register(data);
  }
}
