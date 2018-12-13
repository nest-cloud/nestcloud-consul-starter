import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { User } from "../entities";
import { UserRepository } from "../repositories";
import { UserService } from "../services";

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
    async createUser(@Body('user') user: User) {
        await this.userRepo.save(user);
    }
}
