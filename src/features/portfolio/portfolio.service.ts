import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class PortfolioService {
  public prueba1() {
    return of('1111');
  }
  public prueba2() {
    return of('2222');
  }
}
