import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(data: CreateUserDto) {
    const user = this.create(data);
    return await this.save(user);
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return await this.update(id, data);
  }

  async deleteUser(id: number) {
    return await this.delete(id);
  }

  async findById(id: number) {
    return await this.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }

  async findWithFilter(filter: FilterUserDto) {
    const { search, sort = 'ASC', orderBy = 'id' } = filter;

    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere('(user.name LIKE :search OR user.email LIKE :search)', {
        search: `%${search}%`,
      });
    }

    query.orderBy(`user.${orderBy}`, sort);

    return await query.getMany();
  }

  async paginate(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return await this.createQueryBuilder('user')
      .take(limit)
      .skip(offset)
      .getMany();
  }
}
