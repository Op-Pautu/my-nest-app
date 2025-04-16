import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/books/dto/create-book-dto';
import { UpdateBookDto } from 'src/books/dto/update-book-dto';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepo.create(createBookDto);
    return this.bookRepo.save(book);
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
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    const updated = Object.assign(book, dto);
    return this.bookRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepo.delete(id);
  }
}
