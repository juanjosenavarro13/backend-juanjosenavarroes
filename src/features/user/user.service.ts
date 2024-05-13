import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger('USER');
  }

  async findAll(take: number = 10, skip: number = 0) {
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
      }),
      this.prismaService.user.count(),
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

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    this.logger.log(`find user id ${id}`, user);
    return user;
  }
}
