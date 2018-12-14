import { Injectable } from "@nestjs/common";
import { Get, Middleware } from "nest-feign";
import { AddHeaderMiddleware } from "./middlewares/AddHeaderMiddleware";

@Injectable()
@Middleware(AddHeaderMiddleware)
export class ArticleClient {
    @Get('https://api.apiopen.top/recommendPoetry')
    getArticles() {
    }
}
