import { JWT_SECRET, JWT_TIME_EXPIRED } from './../../constants/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.jwtsecret ?? JWT_SECRET,
      signOptions: { expiresIn: JWT_TIME_EXPIRED },
    }),
  ],
})
export class AuthModule {}
