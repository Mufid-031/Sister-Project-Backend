import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entity/student.entity';
import { SchedulesRepository } from 'src/schedules/schedules.repository';
import { Repository } from 'typeorm';
import { CreateEnrollScheduleDto } from './dto/create-enroll-schedule.dto';
import { Enrollment } from 'src/entity/enrollment.entity';
import { AbsenceDetail } from 'src/entity/absence-detail.entity';

@Injectable()
export class StudentService {
  constructor(
    private readonly shceduleRepo: SchedulesRepository,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(AbsenceDetail)
    private readonly absenceDetailRepo: Repository<AbsenceDetail>,
  ) {}

  async availableSchedules() {
    return this.shceduleRepo.find({
      where: { enrolledCount: 0, course: { isActive: true } },
    });
  }

  async enrolledSchedules(data: CreateEnrollScheduleDto) {
    const enrollment = this.enrollmentRepo.create(data);

    if (enrollment.schedule.capacity > enrollment.schedule.enrolledCount) {
      enrollment.schedule.enrolledCount += 1;
    }

    return await this.enrollmentRepo.save(enrollment);
  }

  async unenrollSchedule(enrollmentId: number) {
    const enrollment = await this.enrollmentRepo.findOneBy({
      id: enrollmentId,
    });

    if (!enrollment) throw new NotFoundException('Enrollment not found');

    enrollment.schedule.enrolledCount -= 1;
    await this.enrollmentRepo.remove(enrollment);
  }

  async enrollments(userId: number) {
    const student = await this.studentRepo.findOneBy({ userId });

    if (!student) throw new NotFoundException('Student not found');

    return await this.enrollmentRepo.find({
      where: { studentId: student.id },
    });
  }

  async absences(userId: number) {
    const student = await this.studentRepo.findOneBy({ userId });

    if (!student) throw new NotFoundException('Student not found');

    return await this.absenceDetailRepo.find({
      where: { studentId: student.id, absence: true },
    });
  }
}
