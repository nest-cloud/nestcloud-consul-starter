import { Controller, Get } from "@nestjs/common";
import { ArticleClient } from "../clients";

@Controller('articles')
export class ArticleController {
    constructor(
        private readonly articleClient: ArticleClient,
    ) {
    }

    @Get()
    async getArticles() {
        console.log('test')
        return await this.articleClient.getArticles();
    }
}
