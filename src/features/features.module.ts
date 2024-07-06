import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './article/article.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, BlogModule, HealthModule],
})
export class FeaturesModule {}
