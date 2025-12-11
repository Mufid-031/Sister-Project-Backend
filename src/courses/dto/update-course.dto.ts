/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional } from 'class-validator';

export class updateCourseDto {
  @IsOptional()
  name: string;

  @IsOptional()
  code: string;

  @IsOptional()
  semester: string;

  @IsOptional()
  sks: number;

  @IsOptional()
  major: string;

  @IsOptional()
  faculty: string;
}
