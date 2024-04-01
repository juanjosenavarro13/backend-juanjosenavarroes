import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [ConfigModule.forRoot(), FeaturesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
