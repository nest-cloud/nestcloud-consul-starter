import { Injectable } from "@nestjs/common";
import { Get, Loadbalanced } from "@nestcloud/feign";
import { User } from "../entities";

@Injectable()
@Loadbalanced('nestcloud-user-service')
export class UserClient {
    @Get('/users')
    async getUsers(): Promise<User[] | any> {
    }
}
