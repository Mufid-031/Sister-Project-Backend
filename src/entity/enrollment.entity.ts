import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Schedule } from './schedule.entity';
import { Teacher } from './teacher.entity';

@Entity({ name: 'enrollments' })
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  scheduleId: number;

  @Column({ nullable: true })
  grade?: string;

  @Column({ default: false })
  isValidated: boolean;

  @Column({ nullable: true })
  validatedAt?: Date;

  @Column({ nullable: true })
  validatedById?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @ManyToOne(() => Schedule, (schedule) => schedule.enrollments)
  schedule: Schedule;

  @ManyToOne(() => Teacher, (teacher) => teacher.enrollments, {
    nullable: true,
  })
  validatedBy: Teacher;
}
