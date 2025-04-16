import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepo.create(createAuthorDto);
    return this.authorRepo.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepo.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepo.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) throw new NotFoundException(`Author with id ${id} not found`);
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepo.findOne({ where: { id } });
    if (!author) throw new NotFoundException(`Author with id ${id} not found`);

    const updated = Object.assign(author, updateAuthorDto);
    return this.authorRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.authorRepo.delete(id);
  }
}
