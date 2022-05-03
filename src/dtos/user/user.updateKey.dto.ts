import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserUpdateKeyDto {
  @IsString()
  @IsNotEmpty()
  readonly key: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 64, { message: 'email must be between 5 and 64 characters' })
  readonly email: string;
}
