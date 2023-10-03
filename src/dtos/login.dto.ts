import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
