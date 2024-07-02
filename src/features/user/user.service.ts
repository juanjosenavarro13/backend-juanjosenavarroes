import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SALT_CRYPTO } from 'src/constants/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger('USER');
  }

  async findAll(userid: number, take: number = 10, skip: number = 0) {
    const [users, totalUsers] = await Promise.all([
      this.prismaService.user.findMany({
        take,
        skip,
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          id: { not: userid },
        },
      }),
      this.prismaService.user.count({
        where: {
          id: { not: userid },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalUsers / take);
    this.logger.log('find all users', users);
    return { totalPages, users };
  }

  async findUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      this.logger.log(`user not found id ${id}`);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.logger.log(`find user id ${id}`, user);
    return user;
  }
  async deleteUserById(id: number) {
    await this.prismaService.user
      .delete({ where: { id } })
      .then((user) => {
        this.logger.log(`find user id ${id} and delete`, user);
      })
      .catch((err) => {
        this.logger.log(`error user id ${id} and delete`, err);
      });
  }

  async resetPasswordById(id: number) {
    const password = await bcrypt.hash('123123', SALT_CRYPTO);

    await this.prismaService.user
      .update({ where: { id }, data: { password } })
      .then((res) => {
        this.logger.log(`reset password user ${id}`, res);
      })
      .catch((err) => {
        this.logger.error(`reset password user ${id} ERROR`, err);
      });
  }
}
