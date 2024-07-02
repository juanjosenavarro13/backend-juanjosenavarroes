import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  private logger: Logger;
  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger('ARTICLE');
  }
  create(createArticleDto: CreateArticleDto) {
    return this.prismaService.article.create({
      data: {
        title: createArticleDto.title,
        body: createArticleDto.body,
        userId: createArticleDto.userId,
      },
    });
  }

  async findAll(take: number, skip: number) {
    const [articles, totalArticles] = await Promise.all([
      this.prismaService.article.findMany({
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.user.count({}),
    ]);

    const totalPages = Math.ceil(totalArticles / take);
    this.logger.log('find all users', articles);
    return { totalPages, articles };
  }

  findOne(id: number) {
    return this.prismaService.article.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prismaService.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prismaService.article.delete({ where: { id } });
  }
}
