import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { forkJoin, map } from 'rxjs';
import { PortfolioService } from './portfolio.service';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Devuelve información de portfolio',
  })
  @Get()
  findAll() {
    return forkJoin([
      this.portfolioService.prueba1(),
      this.portfolioService.prueba2(),
    ]).pipe(map(([data1, data2]) => ({ data1, data2 })));
  }
}
