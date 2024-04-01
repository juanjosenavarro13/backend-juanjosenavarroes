import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './features/features.module';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), FeaturesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
