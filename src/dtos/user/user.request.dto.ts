import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UsersRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 64, { message: 'name must be between 1 and 64 characters' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(3, 64, { message: 'email must be between 3 and 64 characters' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 64, { message: 'password must be between 5 and 64 characters' })
  readonly password_hash;
}
