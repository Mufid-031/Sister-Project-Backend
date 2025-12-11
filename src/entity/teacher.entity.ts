import { Gender } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Student } from './student.entity';
import { Schedule } from './schedule.entity';
import { Enrollment } from './enrollment.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @Column({ unique: true })
  nip: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  major: string;

  @Column()
  faculty: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.teacher)
  user: User;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  @OneToMany(() => Schedule, (schedule) => schedule.teacher)
  schedules: Schedule[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.validatedBy)
  enrollments: Enrollment[];
}
