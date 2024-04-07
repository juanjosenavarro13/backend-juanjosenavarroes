import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './DTOS';
import { SALT_CRYPTO } from '../../constants/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw an error if passwords do not match', async () => {
      const registerDTO: RegisterDTO = {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'differentpassword',
      };

      await expect(service.register(registerDTO)).rejects.toThrow(
        new HttpException(
          'Las contraseñas no coinciden',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should register a new user', async () => {
      const registerDTO: RegisterDTO = {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
      };
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await service.register(registerDTO);

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user already exists', async () => {
      const registerDTO: RegisterDTO = {
        email: 'existing@example.com',
        password: 'password',
        password_confirmation: 'password',
      };

      jest.spyOn(prismaService.user, 'create').mockRejectedValue({
        code: 'P2002',
        meta: { modelName: 'User', target: 'email' },
      });

      await expect(service.register(registerDTO)).rejects.toThrow(
        new HttpException(
          'Unique constraint failed on the model User and key email',
          HttpStatus.CONFLICT,
        ),
      );
    });

    it('should throw an error for any other error', async () => {
      const registerDTO: RegisterDTO = {
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValue(new Error('Some other error'));

      await expect(service.register(registerDTO)).rejects.toThrow(
        'Some other error',
      );
    });
  });

  describe('login', () => {
    it('should throw an error if email is not found', async () => {
      const loginDTO: LoginDTO = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.login(loginDTO)).rejects.toThrow(
        new HttpException(
          'Contraseña o email inválidos',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    });

    it('should throw an error if password does not match', async () => {
      const loginDTO: LoginDTO = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', SALT_CRYPTO),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      await expect(service.login(loginDTO)).rejects.toThrow(
        new HttpException(
          'Contraseña o email inválidos',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    });

    it('should return user data if email and password match', async () => {
      const loginDTO: LoginDTO = {
        email: 'test@example.com',
        password: 'password',
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', SALT_CRYPTO),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      const result = await service.login(loginDTO);

      expect(result).toEqual({
        access_token: 'token',
        user: { id: mockUser.id, email: mockUser.email },
      });
    });
  });
});
