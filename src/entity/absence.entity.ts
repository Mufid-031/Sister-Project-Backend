import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { AbsenceDetail } from './absence-detail.entity';

@Entity({ name: 'absences' })
export class Absence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduleId: number;

  @Column()
  meet: number;

  @Column({ type: 'datetime', nullable: true })
  date?: Date;

  @Column({ nullable: true })
  materi?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Schedule, (schedule) => schedule.absences)
  schedule: Schedule;

  @OneToMany(() => AbsenceDetail, (detail) => detail.absence)
  details: AbsenceDetail[];
}
