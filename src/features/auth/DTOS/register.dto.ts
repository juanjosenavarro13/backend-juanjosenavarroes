import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ example: 'user@user.es' })
  @IsEmail({}, { message: 'El campo email debe ser de tipo email' })
  readonly email: string;

  @ApiProperty({ example: '123123' })
  @MinLength(6, {
    message: 'El campo contraseña debe tener al menos 6 caracteres',
  })
  @MaxLength(25, {
    message: 'El campo contraseña debe ser inferior a 25 caracteres',
  })
  readonly password: string;

  @ApiProperty({ example: '123123' })
  @MinLength(6, {
    message: 'El campo contraseña debe tener al menos 6 caracteres',
  })
  @MaxLength(25, {
    message: 'El campo contraseña debe ser inferior a 25 caracteres',
  })
  readonly password_confirmation: string;
}
