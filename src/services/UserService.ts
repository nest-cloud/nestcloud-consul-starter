import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories";
import { UserClient } from "../clients";
import { User } from "../entities";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly userClient: UserClient,
    ) {
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async getRemoteUsers(): Promise<User[]> {
        return await this.userClient.getUsers();
    }
}
