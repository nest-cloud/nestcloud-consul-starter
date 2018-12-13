import { Injectable } from "@nestjs/common";
import { Get } from "nest-feign";
import { Loadbalanced } from "nest-feign";
import { User } from "../entities";

@Injectable()
@Loadbalanced('nestcloud-user-service')
export class UserClient {
    @Get('/users')
    async getUsers(): Promise<User[] | any> {
    }
}
