import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsInt()
  authorId: number;

  @IsInt()
  @Min(1000)
  publishedYear: number;
}
