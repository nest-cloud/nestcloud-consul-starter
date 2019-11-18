import { Injectable } from '@nestjs/common';
import { UserClient } from '../clients';
import { User } from '../models';

@Injectable()
export class UserService {
  constructor(
    private readonly userClient: UserClient,
  ) {
  }

  async getUsers(): Promise<User[]> {
    return [{ id: '1', name: 'test' }];
  }

  async getRemoteUsers(): Promise<User[]> {
    return await this.userClient.getUsers();
  }
}
