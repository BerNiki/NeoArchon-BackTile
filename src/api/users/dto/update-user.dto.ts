import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(18)
  @MinLength(3)
  @Transform(({ value }: { value: string | undefined }) =>
    value ? value.trim() : value,
  )
  username?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }: { value: string | undefined }) =>
    value ? value.toLowerCase().trim() : value,
  )
  email?: string;

  @IsOptional()
  @IsString()
  @Exclude()
  currentHashedRefreshToken?: string | null;

  @IsOptional()
  @IsNumber()
  @Exclude()
  currentHashedRefreshTokenExpiresAt?: number;

  @IsOptional()
  @IsString()
  @Exclude()
  jti?: string | null;
}
