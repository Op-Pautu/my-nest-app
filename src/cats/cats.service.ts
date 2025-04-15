import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private cats: CreateCatDto[] = [];

  create(cat: CreateCatDto): string {
    this.cats.push(cat);
    return `Cat ${cat.name} added!`;
  }

  findAll(): string {
    return JSON.stringify(this.cats);
  }
}
