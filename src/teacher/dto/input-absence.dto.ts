import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AbsenceStatus } from 'src/common/enums';

export class inputAbsenceDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsEnum(AbsenceStatus)
  absenceStatus: AbsenceStatus;
}
