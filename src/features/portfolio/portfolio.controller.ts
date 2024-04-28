import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { forkJoin } from 'rxjs';
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
  findAll(@Query() query) {
    const lang = query?.lang?.toLowerCase() || 'es';
    console.log(lang);
    return forkJoin({
      hero: this.portfolioService.hero(lang),
      links: this.portfolioService.links(),
    });
  }
}
