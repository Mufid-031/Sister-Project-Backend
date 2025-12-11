/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional } from 'class-validator';
import { Role } from 'src/common/enums';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  role?: Role;
}
