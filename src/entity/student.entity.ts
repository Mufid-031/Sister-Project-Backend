import { Gender } from 'src/common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Teacher } from './teacher.entity';
import { Enrollment } from './enrollment.entity';
import { AbsenceDetail } from './absence-detail.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @Column()
  teacherId: number;

  @Column({ unique: true })
  nim: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  major: string;

  @Column()
  faculty: string;

  @Column()
  semester: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.student)
  user: User;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  teacher: Teacher;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => AbsenceDetail, (absenceDetail) => absenceDetail.student)
  absences: AbsenceDetail[];
}
