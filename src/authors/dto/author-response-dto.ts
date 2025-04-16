export class AuthorResponseDto {
  id: number;
  name: string;
  age: number;
  books: {
    id: number;
    title: string;
    publishedYear: number;
  }[];
}
