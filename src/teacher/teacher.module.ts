import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entity/teacher.entity';
import { Enrollment } from 'src/entity/enrollment.entity';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { Student } from 'src/entity/student.entity';
import { Absence } from 'src/entity/absence.entity';
import { AbsenceDetail } from 'src/entity/absence-detail.entity';

@Module({
  imports: [
    SchedulesModule,
    TypeOrmModule.forFeature([
      Student,
      Teacher,
      Enrollment,
      Absence,
      AbsenceDetail,
    ]),
  ],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
