import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { StudentService } from './student.service';
import { CreateEnrollScheduleDto } from './dto/create-enroll-schedule.dto';
import { ReqUser } from 'src/common/decorators/req-user.decorator';

@Roles('STUDENT')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('schedules/available')
  async availableSchedules() {
    return this.studentService.availableSchedules();
  }

  @Post('schedules/enrollments')
  async enrolledSchedules(@Body() data: CreateEnrollScheduleDto) {
    return this.studentService.enrolledSchedules(data);
  }

  @Delete('schedules/enrollments/:enrollmentId')
  async unenrollSchedule(
    @Param('enrollmentId', ParseIntPipe) enrollmentId: number,
  ) {
    return this.studentService.unenrollSchedule(enrollmentId);
  }

  @Get('enrollments')
  async enrollments(@ReqUser() { id: userId }) {
    return this.studentService.enrollments(userId as number);
  }

  @Get('absences')
  async absences(@ReqUser() { id: userId }) {
    return this.studentService.absences(userId as number);
  }
}
