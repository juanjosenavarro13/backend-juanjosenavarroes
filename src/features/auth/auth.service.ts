import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './DTOS/register.dto';

@Injectable()
export class AuthService {
  register(data: RegisterDTO) {
    return data;
  }
}
