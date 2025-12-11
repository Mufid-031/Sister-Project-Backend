import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entity/student.entity';
import { Enrollment } from 'src/entity/enrollment.entity';
import { AbsenceDetail } from 'src/entity/absence-detail.entity';

@Module({
  imports: [
    SchedulesModule,
    TypeOrmModule.forFeature([Student, Enrollment, AbsenceDetail]),
  ],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
