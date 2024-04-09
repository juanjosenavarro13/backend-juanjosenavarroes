import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddProps } from './types/addProperties';

@Injectable()
export class LogService {
  constructor(private readonly prismaService: PrismaService) {}

  async add({ logInfo, userid, type = 'no Scope' }: AddProps) {
    if (userid) {
      await this.prismaService.user
        .findFirst({
          where: { id: userid },
        })
        .catch(() => {
          throw new HttpException(
            'Error service log',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    }

    return this.prismaService.log
      .create({
        data: {
          logInfo,
          userid,
          type,
        },
      })
      .then(() => true)
      .catch(() => false);
  }
}
