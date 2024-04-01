import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../services/prisma.service';
import { RegisterDTO } from './DTOS/register.dto';
import { SALT_CRYPTO } from '../../constants/config';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async register(registerDTO: RegisterDTO) {
    if (registerDTO.password !== registerDTO.password_confirmation) {
      throw new HttpException('Invalid passwords', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(registerDTO.password, SALT_CRYPTO);
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
}
