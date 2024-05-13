import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findUserById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
