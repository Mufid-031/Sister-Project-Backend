import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { updateCourseDto } from './dto/update-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepo: CoursesRepository) {}

  async create(data: CreateCourseDto) {
    return await this.courseRepo.createCourse(data);
  }

  async findAll() {
    return await this.courseRepo.find();
  }

  async findOne(id: number) {
    return await this.courseRepo.findCourseById(id);
  }

  async update(id: number, data: updateCourseDto) {
    return await this.courseRepo.updateCourse(id, data);
  }

  async remove(id: number) {
    return await this.courseRepo.deleteCourse(id);
  }

  async findWithFilter(filter: FilterCourseDto) {
    return await this.courseRepo.findWithFilter(filter);
  }

  async findActiveCourse() {
    return await this.courseRepo.findActiveCourse();
  }

  async findInactiveCourse() {
    return await this.courseRepo.findInactiveCourse();
  }

  async findCourseByCode(code: string) {
    return await this.courseRepo.findCourseByCode(code);
  }

  async findCourseByMajor(major: string) {
    return await this.courseRepo.findCourseByMajor(major);
  }

  async findCourseByFaculty(faculty: string) {
    return await this.courseRepo.findCourseByFaculty(faculty);
  }
}
