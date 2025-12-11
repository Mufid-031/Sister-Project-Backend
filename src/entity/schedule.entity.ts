import { Day } from 'src/common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Teacher } from './teacher.entity';
import { Enrollment } from './enrollment.entity';
import { Absence } from './absence.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Day })
  day: Day;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  room: string;

  @Column({ default: 0 })
  enrolledCount: number;

  @Column({ default: 30 })
  capacity: number;

  @Column()
  courseId: number;

  @Column()
  teacherId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Course, (course) => course.schedules)
  course: Course;

  @ManyToOne(() => Teacher, (teacher) => teacher.schedules)
  teacher: Teacher;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.schedule)
  enrollments: Enrollment[];

  @OneToMany(() => Absence, (absence) => absence.schedule)
  absences: Absence[];
}
