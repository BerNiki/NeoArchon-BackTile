import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_ERROR_MESSAGE } from 'src/CONSTS/authErrorMessages';

// TODO: Put these into seperate DTO files
export class SignUpDto {
  @IsString()
  @MaxLength(18)
  @MinLength(3)
  @Transform(({ value }: { value: string }) => value.trim())
  username: string;

  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: PASSWORD_ERROR_MESSAGE,
  })
  @Transform(({ value }: { value: string }) => value.trim())
  password: string;
}

export class SignInDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  password: string;
}
