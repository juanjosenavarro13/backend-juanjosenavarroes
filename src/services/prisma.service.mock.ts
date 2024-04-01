export const mockPrismaService = {
  $disconnect: jest.fn(),
  user: {
    create: jest.fn(),
  },
  $connect: jest.fn(),
};
