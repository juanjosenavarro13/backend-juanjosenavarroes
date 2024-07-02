import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly blogService: ArticleService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'articulo creado',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth('APIKey-auth')
  @Post()
  create(@Body() createBlogDto: CreateArticleDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll(@Query('take') take: number = 10, @Query('skip') skip: number = 0) {
    return this.blogService.findAll(Number(take), Number(skip));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('APIKey-auth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateArticleDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('APIKey-auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
