import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should disconnect from the database', async () => {
    await expect(prismaService.$disconnect()).resolves.not.toThrow();
  });

  it('should handle errors when connecting to the database on module initialization', async () => {
    jest
      .spyOn(prismaService, '$connect')
      .mockRejectedValueOnce(new Error('Connection failed'));

    await expect(prismaService.onModuleInit()).rejects.toThrow(
      'Connection failed',
    );

    expect(prismaService.$connect).toHaveBeenCalledTimes(1);
  });
});
