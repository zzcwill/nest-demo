import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import * as util from 'util';
import * as _ from 'lodash';
import { User } from '../entity/user.entity';
import { ConfigService } from '../config/config.service';

class CacheKeys {
    readonly user: string = 'user:%d';
    readonly signupCode: string = 'signupcode:%s';
    readonly userToken: string = 'usertoken:%d';
    readonly publishArticle: string = 'publisharticle:%d';
    readonly categories: string = 'categories';
}

@Injectable()
export class RedisService {
    readonly client: Redis.Redis;
    readonly cacheKeys: CacheKeys;

    constructor(private readonly configService: ConfigService) {
        this.client = new Redis(this.configService.redis);
        this.cacheKeys = new CacheKeys();
    }

    async getUser(userID): Promise<User> {
        const cacheKey = util.format(this.cacheKeys.user, userID);
        const userStr = await this.client.get(cacheKey);
        if (!userStr) {
            return null;
        }
        const user = JSON.parse(userStr);
        return user;
    }

    async setUser(user: User) {
        const cacheKey = util.format(this.cacheKeys.user, user.uid);
        return await this.client.set(cacheKey, JSON.stringify(user), 'EX', 24 * 60 * 60);
    }

    async setCache(key: string, value: string, expire: number) {
        return await this.client.set(key, value, 'EX', expire);
    }

    async getCache(key: string) {
        return await this.client.get(key);
    }

    async delCache(key: string) {
        return await this.client.del(key);
    }
}