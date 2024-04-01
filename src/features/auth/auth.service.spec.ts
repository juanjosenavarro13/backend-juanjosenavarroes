import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDTO } from './DTOS/register.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
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
        new HttpException('Invalid passwords', HttpStatus.BAD_REQUEST),
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
});
