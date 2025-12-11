import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Absence } from 'src/entity/absence.entity';
import { Enrollment } from 'src/entity/enrollment.entity';
import { Student } from 'src/entity/student.entity';
import { Teacher } from 'src/entity/teacher.entity';
import { SchedulesRepository } from 'src/schedules/schedules.repository';
import { Repository } from 'typeorm';
import { CreateNewAbsenceDto } from './dto/create-new-absence.dto';
import { AbsenceDetail } from 'src/entity/absence-detail.entity';
import { inputAbsenceDto } from './dto/input-absence.dto';

@Injectable()
export class TeacherService {
  constructor(
    private readonly scheduleRepo: SchedulesRepository,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Absence)
    private readonly absenceRepo: Repository<Absence>,
    @InjectRepository(AbsenceDetail)
    private readonly absenceDetailRepo: Repository<AbsenceDetail>,
  ) {}

  async schedules(userId: number) {
    const teacher = await this.teacherRepo.findOneBy({ id: userId });
    if (!teacher) throw new NotFoundException('Teacher not found');

    return await this.scheduleRepo.find({ where: { teacherId: teacher.id } });
  }

  async students(userId: number) {
    const teacher = await this.teacherRepo.findOneBy({ id: userId });
    if (!teacher) throw new NotFoundException('Teacher not found');

    return await this.studentRepo.find({ where: { teacherId: teacher.id } });
  }

  async enrollmentValidation(enrollmentId: number, userId: number) {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id: enrollmentId },
    });

    if (!enrollment) throw new NotFoundException('Enrollment not found');

    const teacher = await this.teacherRepo.findOne({
      where: { userId },
    });

    if (!teacher) throw new NotFoundException('Teacher not found');

    enrollment.isValidated = true;
    enrollment.validatedAt = new Date();
    enrollment.validatedBy = teacher;

    await this.enrollmentRepo.save(enrollment);
  }

  async inputGrade(enrollmentId: number, grade: string) {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id: enrollmentId },
    });

    if (!enrollment) throw new NotFoundException('Enrollment not found');

    enrollment.grade = grade;
    await this.enrollmentRepo.save(enrollment);
  }

  async createAbsence(scheduleId: number, data: CreateNewAbsenceDto) {
    const schedule = await this.scheduleRepo.findOneBy({ id: scheduleId });
    if (!schedule) throw new NotFoundException('Schedule not found');

    return this.absenceRepo.create(data);
  }

  async inputAbsence(absenceId: number, data: inputAbsenceDto) {
    const absence = await this.absenceRepo.findOneBy({ id: absenceId });
    if (!absence) throw new NotFoundException('Absence not found');

    return this.absenceDetailRepo.create(data);
  }
}
