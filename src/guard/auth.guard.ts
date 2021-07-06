import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

		let user: any= {
			uid: 2,
			username: 'root'
		}
		this.redisService.setUser(user)
		request.user = user

		// if(!request.body.token) {
		// 	throw new ForbiddenException();
		// }
    // const user = request.user;
    // if (user.role > this.role) {
    //   throw new ForbiddenException('对不起，您无权操作');
    // }		

		return true;
  }
}