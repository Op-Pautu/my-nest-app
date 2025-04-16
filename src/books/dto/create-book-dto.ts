import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1000)
  publishedYear: number;
}
