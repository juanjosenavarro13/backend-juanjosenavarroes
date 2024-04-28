import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { forkJoin, map } from 'rxjs';
import { PortfolioService } from './portfolio.service';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  findAll() {
    return forkJoin([
      this.portfolioService.prueba1(),
      this.portfolioService.prueba2(),
    ]).pipe(map(([data1, data2]) => ({ data1, data2 })));
  }
}
