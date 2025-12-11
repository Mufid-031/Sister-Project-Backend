/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/entity/session.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
    private readonly usersRepo: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ user: User | null; accessToken: string; refreshToken: string }> {
    const user = await this.usersRepo.findByEmail(email);

    const isMatch = await compare(pass, user!.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const token = await this.generateTokens(
      user!.id,
      user!.name,
      user!.email,
      user!.role,
    );

    const session = this.sessionRepo.create(token);
    session.userId = user!.id;
    await this.sessionRepo.save(session);

    return {
      user,
      ...token,
    };
  }

  async generateTokens(
    userId: number,
    name: string,
    email: string,
    role: string,
  ) {
    const payload = {
      id: userId,
      name,
      email,
      role,
    };
    const accessToken = await this.jwtService.signAsync({
      ...payload,
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync({
      ...payload,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refresh(token: string) {
    const session = await this.sessionRepo.findOneBy({
      refreshToken: token,
      user: true,
    });

    if (!session) throw new UnauthorizedException('Invalid refresh token');

    const newTokens = await this.generateTokens(
      session.userId,
      session.user.name,
      session.user.email,
      session.user.role,
    );

    return newTokens;
  }
}
