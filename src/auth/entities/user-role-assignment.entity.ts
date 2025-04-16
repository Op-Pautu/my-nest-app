import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from './user-role.entity';

@Entity('user_role_assignments')
export class UserRoleAssignment {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  role_id: number;

  @ManyToOne(() => User, (user) => user.roleAssignments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UserRole, (role) => role.assignments)
  @JoinColumn({ name: 'role_id' })
  role: UserRole;
}
