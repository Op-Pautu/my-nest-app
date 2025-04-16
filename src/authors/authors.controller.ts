import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorResponseDto } from 'src/authors/dto/author-response-dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<AuthorResponseDto[]> {
    const authors = await this.authorsService.findAll();

    return authors.map((author) => ({
      id: author.id,
      name: author.name,
      age: author.age,
      books:
        author.books?.map((book) => ({
          id: book.id,
          title: book.title,
          publishedYear: book.publishedYear,
        })) || [],
    }));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AuthorResponseDto> {
    const author = await this.authorsService.findOne(id);

    return {
      id: author.id,
      name: author.name,
      age: author.age,
      books:
        author.books?.map((book) => ({
          id: book.id,
          title: book.title,
          publishedYear: book.publishedYear,
        })) || [],
    };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.remove(id);
  }
}
