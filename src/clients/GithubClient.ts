import { Injectable } from '@nestjs/common';
import { Get } from '@nestcloud/http';

@Injectable()
export class GithubClient {
  @Get('https://api.github.com')
  getGithubAPI() {
  }
}
