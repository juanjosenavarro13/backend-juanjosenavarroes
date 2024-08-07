import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { SALT_CRYPTO } from '../../constants/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './DTOS';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger('AUTH');
  }

  async register(registerDTO: RegisterDTO) {
    if (registerDTO.password !== registerDTO.password_confirmation) {
      this.logger.warn('passwords no match', registerDTO);
      throw new HttpException(
        'Las contraseñas no coinciden',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await this.hashPassword(registerDTO.password);
    const data = { email: registerDTO.email, password: hashPassword };

    return this.prismaService.user
      .create({ data, select: { id: true, email: true } })
      .then((data) => {
        this.logger.log('user create', data);
        return data;
      })
      .catch((error: PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
          const model = String(error.meta.modelName);
          const key = String(error.meta.target);
          throw new HttpException(
            `Unique constraint failed on the model ${model} and key ${key}`,
            HttpStatus.CONFLICT,
          );
        }
        this.logger.error('error', error);
        throw error;
      });
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDTO.email },
    });

    if (!user) {
      this.logger.warn('user no found', loginDTO);
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
      this.logger.warn('password no match', loginDTO);
      throw new HttpException(
        'Contraseña o email inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { id: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    this.logger.log('user login', { payload, access_token });
    return {
      access_token,
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
