import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TeacherService } from './teacher.service';
import { ReqUser } from 'src/common/decorators/req-user.decorator';
import { CreateNewAbsenceDto } from './dto/create-new-absence.dto';
import { inputAbsenceDto } from './dto/input-absence.dto';

@Roles('TEACHER')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('schedules')
  async schedules(@ReqUser() { id: userId }) {
    return this.teacherService.schedules(userId as number);
  }

  @Get('students')
  async students(@ReqUser() { id: userId }) {
    return this.teacherService.students(userId as number);
  }

  @Patch('enrollments/:enrollmentId/validate')
  async enrollmentValidation(
    @Param('enrollmentId', ParseIntPipe) enrollmentId: number,
    @ReqUser() { id: userId },
  ) {
    return this.teacherService.enrollmentValidation(
      enrollmentId,
      userId as number,
    );
  }

  @Post('enrollments/:enrollmentId/grade')
  async inputGrade(
    @Param('enrollmentId', ParseIntPipe) enrollmentId: number,
    @Body() data: { grade: string },
  ) {
    return this.teacherService.inputGrade(enrollmentId, data.grade);
  }

  @Post('schedules/:scheduleId/absences')
  async createAbsence(
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Body() data: CreateNewAbsenceDto,
  ) {
    return this.teacherService.createAbsence(scheduleId, data);
  }

  @Post('absences/:absenceId/details')
  async inputAbsence(
    @Param('absenceId', ParseIntPipe) absenceId: number,
    @Body() data: inputAbsenceDto,
  ) {
    return this.teacherService.inputAbsence(absenceId, data);
  }
}
