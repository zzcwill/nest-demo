import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

import { RedisService } from '../redis/redis.service';


import * as _ from 'lodash';
import * as dayjs from 'dayjs'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly redisService: RedisService
  ) {}

  async findAll(): Promise<User[]> {
    let user = await this.usersRepository.find()
    let firstUser = _.pick(user[0], ['uid', 'username', 'level', 'isOnDuty', 'register_time'])

    let register_time = dayjs(firstUser.register_time).format('YYYY-MM-DD HH:mm:ss.SSS');
    firstUser.register_time = register_time;
    return firstUser;
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(id: string): Promise<User> {
    let uid = id;
    let user = await this.usersRepository.findOne(uid);
    await this.redisService.setUser(user);
    return user;
  }
}