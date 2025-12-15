import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class LocationDto {
  @IsNumber()
  a: number;

  @IsNumber()
  b: number;
}

export class MoveDataDto {
  @ValidateNested()
  @Type(() => LocationDto)
  from: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  to: LocationDto;
}

export class MoveDto {
  @IsString()
  gameId: string;

  @ValidateNested()
  @Type(() => MoveDataDto)
  moveData: MoveDataDto;
}

export class GetMovesDto {
  @IsString()
  gameId: string;
}
