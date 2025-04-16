import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserRoleAssignment } from './user-role-assignment.entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  role_name: string;

  // Relations
  @OneToMany(() => UserRoleAssignment, (assignment) => assignment.role)
  assignments: UserRoleAssignment[];
}
