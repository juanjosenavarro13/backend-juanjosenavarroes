import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [AuthModule, PrismaModule, PortfolioModule],
})
export class FeaturesModule {}
