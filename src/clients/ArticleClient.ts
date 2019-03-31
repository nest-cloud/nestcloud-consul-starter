import { Injectable } from '@nestjs/common';
import { Get, UseInterceptor } from '@nestcloud/feign';
import { AddHeaderInterceptor } from './interceptors/AddHeaderInterceptor';

@Injectable()
@UseInterceptor(AddHeaderInterceptor)
export class ArticleClient {
  @Get('https://api.apiopen.top/recommendPoetry')
  getArticles() {
  }
}
