import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../services/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
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
