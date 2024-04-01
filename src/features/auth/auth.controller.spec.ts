import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../services/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(() => ({})),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    jest.spyOn(prismaService.user, 'create').mockResolvedValue({
      id: 1,
      email: 'email@email.es',
      password: '123123',
    });
    expect(controller).toBeDefined();
  });

  it('endpoint register should call authService.register', () => {
    const data = {
      email: 'email@email.es',
      password: '123123',
      password_confirmation: '123123',
    };
    const authServiceRegisterSpy = jest.spyOn(authService, 'register');

    controller.register(data);

    expect(authServiceRegisterSpy).toHaveBeenCalledWith(data);
  });
});
