import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRoleEnum } from '../../enums/users/roles';

export class UserUpdateRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRoleEnum, { message: 'Role is not valid' })
  readonly role: UserRoleEnum;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 64, { message: 'Email must be between 5 and 64 characters' })
  readonly email: string;
}
