import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  semester: string;

  @IsNotEmpty()
  @IsNumber()
  sks: number;

  @IsNotEmpty()
  @IsString()
  major: string;

  @IsNotEmpty()
  @IsString()
  faculty: string;
}
