import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './features/features.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    FeaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
