import { IsNotEmpty, IsEmail } from 'class-validator';

// type notation
export class createUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  age: number;
}
