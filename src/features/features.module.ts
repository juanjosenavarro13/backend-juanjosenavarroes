import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [AuthModule, PrismaModule, LogModule],
})
export class FeaturesModule {}
