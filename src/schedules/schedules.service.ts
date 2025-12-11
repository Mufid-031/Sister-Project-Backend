import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from './schedules.repository';
import { createScheduleDto } from './dto/create-schedule.dto';
import { FilterScheduleDto } from './dto/filter-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly scheduleRepo: SchedulesRepository) {}

  async create(data: createScheduleDto) {
    return await this.scheduleRepo.createSchedule(data);
  }

  async findAll() {
    return await this.scheduleRepo.find();
  }

  async findOne(id: number) {
    return await this.scheduleRepo.findScheduleById(id);
  }

  async update(id: number, data: UpdateScheduleDto) {
    return await this.scheduleRepo.updateSchedule(id, data);
  }

  async remove(id: number) {
    return await this.scheduleRepo.deleteSchedule(id);
  }

  async findWithFilter(filter: FilterScheduleDto) {
    return await this.scheduleRepo.findWithFilter(filter);
  }
}
