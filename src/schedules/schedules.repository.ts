import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/entity/schedule.entity';
import { DataSource, Repository } from 'typeorm';
import { createScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { FilterScheduleDto } from './dto/filter-schedule.dto';

@Injectable()
export class SchedulesRepository extends Repository<Schedule> {
  constructor(private dataSource: DataSource) {
    super(Schedule, dataSource.createEntityManager());
  }

  async createSchedule(data: createScheduleDto) {
    const schedule = this.create(data);
    return await this.save(schedule);
  }

  async updateSchedule(id: number, data: UpdateScheduleDto) {
    return await this.update(id, data);
  }

  async deleteSchedule(id: number) {
    return await this.delete(id);
  }

  async findScheduleById(id: number) {
    return await this.findOne({ where: { id } });
  }

  async findWithFilter(filter: FilterScheduleDto) {
    const { search, sort = 'ASC', orderBy = 'id' } = filter;

    const query = this.createQueryBuilder('schedule');

    if (search) {
      query.andWhere(
        '(schedule.day LIKE :search OR schedule.room LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    query.orderBy(`schedule.${orderBy}`, sort);

    return await query.getMany();
  }
}
