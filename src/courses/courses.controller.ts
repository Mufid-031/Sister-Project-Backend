import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { updateCourseDto } from './dto/update-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Public()
  @Get()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() data: CreateCourseDto) {
    return await this.coursesService.create(data);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.coursesService.findOne(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateCourseDto,
  ) {
    return await this.coursesService.update(id, data);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.coursesService.remove(id);
  }

  @Public()
  @Get('active')
  async findActiveCourse() {
    return await this.coursesService.findActiveCourse();
  }

  @Roles('ADMIN')
  @Get('inactive')
  async findInactiveCourse() {
    return await this.coursesService.findInactiveCourse();
  }

  @Public()
  @Get('filter')
  async findWithFilter(@Query() filter: FilterCourseDto) {
    return await this.coursesService.findWithFilter(filter);
  }
}
