import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity('email_verifications')
export class EmailVerification {
  @PrimaryColumn()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  token: string;

  @CreateDateColumn()
  timestamp: Date;
}
