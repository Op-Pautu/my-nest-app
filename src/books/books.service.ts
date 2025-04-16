import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { CreateBookDto } from 'src/books/dto/create-book-dto';
import { UpdateBookDto } from 'src/books/dto/update-book-dto';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepo.findOneBy({
      id: createBookDto.authorId,
    });

    if (!author) throw new NotFoundException('Author not found');

    const newBook = this.bookRepo.create({
      title: createBookDto.title,
      author: author,
      publishedYear: createBookDto.publishedYear,
    });

    return this.bookRepo.save(newBook);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepo.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const author = await this.authorRepo.findOneBy({
      id: dto.authorId,
    });

    if (!author) throw new NotFoundException('Author not found');

    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    const updated = Object.assign(book, dto);
    return this.bookRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepo.delete(id);
  }
}
