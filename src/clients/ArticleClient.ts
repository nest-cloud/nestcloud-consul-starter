import { Injectable } from "@nestjs/common";
import { Get } from "nest-feign";

@Injectable()
export class ArticleClient {
    @Get('https://api.apiopen.top/recommendPoetry')
    getArticles() {
    }
}
