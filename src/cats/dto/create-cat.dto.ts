import { IsString, IsInt, MinLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCatDto {
  @IsString()
  @MinLength(2)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  breed: string;
}
