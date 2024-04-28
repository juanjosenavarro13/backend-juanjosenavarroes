import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { of } from 'rxjs';

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
