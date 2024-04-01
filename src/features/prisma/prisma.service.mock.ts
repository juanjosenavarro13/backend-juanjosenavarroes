import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPrismaService {
  async onModuleInit() {
    console.log('Conexión a la base de datos simulada');
  }
}
