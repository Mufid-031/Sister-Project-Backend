import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';

@Module({
  providers: [CoursesService, CoursesRepository],
  controllers: [CoursesController],
})
export class CoursesModule {}
