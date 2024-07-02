import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './article/article.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, BlogModule],
})
export class FeaturesModule {}
