import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'titulo' })
  readonly title: string;

  @ApiProperty({ example: 'contenido' })
  readonly body: string;

  @ApiProperty({ example: 1 })
  readonly userId: number;
}
