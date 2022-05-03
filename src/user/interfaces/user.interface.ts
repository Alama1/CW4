import { UserRoleEnum } from '../../enums/users/roles';

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRoleEnum;
  testPassed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
