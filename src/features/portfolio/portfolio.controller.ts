import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { forkJoin } from 'rxjs';
import { PortfolioService } from './portfolio.service';
import { VALID_LANG } from '../../constants/valid-lang';

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
    if (!VALID_LANG.includes(lang))
      throw new HttpException('idioma invalido', HttpStatus.BAD_REQUEST);
    return forkJoin({
      hero: this.portfolioService.hero(lang),
      links: this.portfolioService.links(),
      info: this.portfolioService.info(),
      experience: this.portfolioService.experience(lang),
    });
  }
}
