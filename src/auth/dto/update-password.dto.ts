import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { PASSWORD_ERROR_MESSAGE } from 'src/CONSTS/authErrorMessages';
import { Transform } from 'class-transformer';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: PASSWORD_ERROR_MESSAGE,
  })
  @Transform(({ value }: { value: string }) => value.trim())
  newPassword: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  oldPassword: string;
}
