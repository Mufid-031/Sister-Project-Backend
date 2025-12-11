import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async create(data: CreateUserDto) {
    const existingUser = await this.userRepo.findByEmail(data.email);

    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await hash(data.password, 10);

    return await this.userRepo.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.userRepo.update(id, data);
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }

  async findWithFilter(filter: FilterUserDto) {
    return await this.userRepo.findWithFilter(filter);
  }
}
