import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsOptional()
  @IsInt()
  totalGuests?: number;

  @IsString()
  @IsNotEmpty()
  userId: string; //  associate with a user ID
}
