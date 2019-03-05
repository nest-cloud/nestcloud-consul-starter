import { Injectable } from "@nestjs/common";
import { Get, Interceptor } from "@nestcloud/feign";
import { AddHeaderInterceptor } from "./interceptors/AddHeaderInterceptor";

@Injectable()
@Interceptor(AddHeaderInterceptor)
export class ArticleClient {
    @Get('https://api.apiopen.top/recommendPoetry')
    getArticles() {
    }
}
