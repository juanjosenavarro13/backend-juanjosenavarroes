import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [LogService],
  imports: [PrismaModule],
})
export class LogModule {}
