import { Injectable } from "@nestjs/common";
import { Get, Interceptor } from "nest-feign";
import { AddHeaderInterceptor } from "./interceptors/AddHeaderInterceptor";

@Injectable()
@Interceptor(AddHeaderInterceptor)
export class ArticleClient {
    @Get('https://api.apiopen.top/recommendPoetry')
    getArticles() {
    }
}
