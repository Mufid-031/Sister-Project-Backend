import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEnrollScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;
}
