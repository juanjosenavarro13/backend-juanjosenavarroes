import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { JWT_TIME_EXPIRED } from './../../constants/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.jwtsecret,
      signOptions: { expiresIn: JWT_TIME_EXPIRED },
    }),
  ],
})
export class AuthModule {}
