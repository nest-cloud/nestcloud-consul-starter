import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IsValid, IsNotEmpty } from '@nestcloud/validations';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { UserService } from '../services';

@Controller('users')
export class UserController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
  ) {
  }

  @Get()
  async getUsers(@Query('remote') isRemote: boolean) {
    if (isRemote) {
      return await this.userService.getRemoteUsers();
    }
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body('user', new IsValid()) user: User) {
    await this.userRepo.save(user);
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body('name', new IsNotEmpty()) name: string) {
    await this.userRepo.update(userId, { name });
  }
}
