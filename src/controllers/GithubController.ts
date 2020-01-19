import { Controller, Get } from '@nestjs/common';
import { GithubClient } from '../clients';

@Controller('/github')
export class GithubController {
  constructor(
    private readonly githubClient: GithubClient,
  ) {
  }

  @Get()
  async getGithubAPI() {
    return this.githubClient.getGithubAPI();
  }
}
