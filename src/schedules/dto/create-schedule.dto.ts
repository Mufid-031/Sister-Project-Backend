import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Day } from 'src/common/enums';

export class createScheduleDto {
  @IsNotEmpty()
  @IsEnum(Day)
  day: Day;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  teacherId: number;
}
