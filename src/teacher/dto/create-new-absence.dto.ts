import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNewAbsenceDto {
  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;

  @IsNotEmpty()
  @IsNumber()
  meet: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  materi: string;
}
