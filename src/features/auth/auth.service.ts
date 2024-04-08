import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { SALT_CRYPTO } from '../../constants/config';
import { LogService } from '../log/log.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './DTOS';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly logService: LogService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    if (registerDTO.password !== registerDTO.password_confirmation) {
      throw new HttpException(
        'Las contraseñas no coinciden',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await this.hashPassword(registerDTO.password);
    const data = { email: registerDTO.email, password: hashPassword };

    return this.prismaService.user
      .create({ data, select: { id: true, email: true } })
      .catch((error: PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
          const model = String(error.meta.modelName);
          const key = String(error.meta.target);
          throw new HttpException(
            `Unique constraint failed on the model ${model} and key ${key}`,
            HttpStatus.CONFLICT,
          );
        }
        throw error;
      });
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDTO.email },
    });

    if (!user) {
      await this.logService.add({
        logInfo: `Un usuario intentó iniciar sesión con el email ${loginDTO.email} pero el usuario no existe`,
        type: 'Auth',
      });
      throw new HttpException(
        'Contraseña o email inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatch = await this.comparePasswords(
      loginDTO.password,
      user.password,
    );

    if (!passwordMatch) {
      await this.logService.add({
        logInfo: `El usuario con el email ${user.email} intentó iniciar sesión pero la contraseñas no coinciden`,
        userid: user.id,
        type: 'Auth',
      });
      throw new HttpException(
        'Contraseña o email inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { id: user.id, email: user.email };
    await this.logService.add({
      logInfo: `El usuario con el email ${user.email} inició sesión`,
      userid: user.id,
      type: 'Auth',
    });
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        ...payload,
      },
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_CRYPTO);
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
