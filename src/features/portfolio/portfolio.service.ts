import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prismaService: PrismaService) {}
  public hero(lang: string) {
    return this.prismaService.portfolio_hero.findFirst({
      where: { language: { equals: lang } },
    });
  }
  public links() {
    return of({
      linkedin: 'https://www.linkedin.com/in/juan-jose-navarro-perea/',
      email: 'juanjosenavarroperea@gmail.com',
    });
  }
}
