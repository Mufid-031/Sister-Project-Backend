import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Day } from 'src/common/enums';

export class UpdateScheduleDto {
  @IsEnum(Day)
  day: Day;

  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsString()
  room: string;
}
