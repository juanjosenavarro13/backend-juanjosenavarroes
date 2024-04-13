import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './DTOS';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Las contraseñas no coinciden',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario registrado',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.AuthService.register(registerDTO);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Inicio sesión incorrecto',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Inicio sesión correcto',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.AuthService.login(loginDTO);
  }

  @ApiBearerAuth('APIKey-auth')
  @UseGuards(AuthGuard)
  @Get('prueba')
  prueba() {
    return 'ok';
  }
}
