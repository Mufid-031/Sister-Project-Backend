import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Absence } from './absence.entity';
import { AbsenceStatus } from 'src/common/enums';
import { Student } from './student.entity';

@Entity({ name: 'absence_details' })
export class AbsenceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  absenceId: number;

  @Column()
  studentId: number;

  @Column({ type: 'enum', enum: AbsenceStatus })
  absenceStatus: AbsenceStatus;

  @Column({ type: 'datetime', nullable: true })
  attendanceAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Absence, (absence) => absence.details)
  absence: Absence;

  @ManyToOne(() => Student, (student) => student.absences)
  student: Student;
}
