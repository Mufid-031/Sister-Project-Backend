import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterScheduleDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'], { message: 'sort must be ASC or DESC' })
  sort?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsString()
  orderBy?: string = 'id';
}
