import { Injectable } from '@nestjs/common';
import { Course } from 'src/entity/course.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { updateCourseDto } from './dto/update-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';

@Injectable()
export class CoursesRepository extends Repository<Course> {
  constructor(private dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());
  }

  async createCourse(data: CreateCourseDto) {
    const course = this.create(data);
    return await this.save(course);
  }

  async updateCourse(id: number, data: updateCourseDto) {
    return await this.update(id, data);
  }

  async deleteCourse(id: number) {
    return await this.delete(id);
  }

  async findCourseById(id: number) {
    return await this.findOne({ where: { id } });
  }

  async findCourseByCode(code: string) {
    return await this.findOne({ where: { code } });
  }

  async findCourseByMajor(major: string) {
    return await this.find({ where: { major } });
  }

  async findCourseByFaculty(faculty: string) {
    return await this.find({ where: { faculty } });
  }

  async findCourseBySemester(semester: string) {
    return await this.find({ where: { semester } });
  }

  async findActiveCourse() {
    return await this.find({ where: { isActive: true } });
  }

  async findInactiveCourse() {
    return await this.find({ where: { isActive: false } });
  }

  async findWithFilter(filter: FilterCourseDto) {
    const { search, sort = 'ASC', orderBy = 'id' } = filter;

    const query = this.createQueryBuilder('course');

    if (search) {
      query.andWhere('(course.name LIKE :search OR course.code LIKE :search)', {
        search: `%${search}%`,
      });
    }

    query.orderBy(`course.${orderBy}`, sort);

    return await query.getMany();
  }
}
