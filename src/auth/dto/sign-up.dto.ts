import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;

  @ApiProperty({
    description: 'Repeat password for confirmation',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  repeatPassword: string;

  @ApiProperty({
    description: 'User Client Code (optional)',
    example: 'UCC12345',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^UCC[A-Z0-9]{5}$/, {
    message: 'UCC must start with UCC followed by 5 alphanumeric characters',
  })
  ucc?: string;
}
