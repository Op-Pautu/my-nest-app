import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsString,
  Length,
} from 'class-validator';
import { UserRoleAssignment } from './user-role-assignment.entity';
import { FamilyGroupMembership } from './family-group-membership.entity';
import { UserDocument } from './user-document.entity';
import { AddressDetail } from './address-detail.entity';
import { BankDetail } from './bank-detail.entity';
import { PersonalDetail } from './personal-detail.entity';
import { DepositAccount } from './deposit-account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @IsString()
  ucc: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  password: string;

  @Column({ name: 'two_factor_secret', nullable: true })
  @IsString()
  twoFactorSecret: string;

  @Column({ default: false })
  @IsBoolean()
  is_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  @IsBoolean()
  is_form_completed: boolean;

  @Column({ default: true })
  @IsBoolean()
  is_active: boolean;

  @Column({ default: false })
  @IsBoolean()
  is_approved: boolean;

  @Column({ name: 'is_user_signup', default: false })
  @IsBoolean()
  isUserSignup: boolean;

  @Column({ nullable: true })
  closed_at: Date;

  // Relations
  @OneToMany(() => UserRoleAssignment, (assignment) => assignment.user)
  roleAssignments: UserRoleAssignment[];

  @OneToMany(() => FamilyGroupMembership, (membership) => membership.user)
  familyGroupMemberships: FamilyGroupMembership[];

  @OneToMany(() => UserDocument, (document) => document.user)
  documents: UserDocument[];

  @OneToMany(() => AddressDetail, (address) => address.user)
  addresses: AddressDetail[];

  @OneToMany(() => BankDetail, (bank) => bank.user)
  bankDetails: BankDetail[];

  @OneToMany(() => PersonalDetail, (personal) => personal.user)
  personalDetails: PersonalDetail[];

  @OneToMany(() => DepositAccount, (deposit) => deposit.user)
  depositAccounts: DepositAccount[];
}
