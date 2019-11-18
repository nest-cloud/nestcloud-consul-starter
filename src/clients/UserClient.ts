import { Injectable } from '@nestjs/common';
import { Get, Loadbalanced } from '@nestcloud/feign';
import { User } from '../models';

@Injectable()
@Loadbalanced('nestcloud-starter-service')
export class UserClient {
  @Get('/users')
  async getUsers(): Promise<User[] | any> {
  }
}
