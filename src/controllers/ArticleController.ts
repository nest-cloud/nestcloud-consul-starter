import { Controller, Get } from "@nestjs/common";
import { ArticleClient } from "../clients";

@Controller('articles')
export class ArticleController {
    constructor(
        private readonly articleClient: ArticleClient,
    ) {
    }

    @Get()
    getArticles() {
        return this.articleClient.getArticles();
    }
}
