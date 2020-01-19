import { Rule } from '@nestcloud/loadbalance';
import { ILoadbalancer, IServer } from '@nestcloud/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoadbalanceRule implements Rule {
  private loadbalancer: ILoadbalancer;

  choose(): IServer {
    return this.loadbalancer.servers[0];
  }

  init(loadbalancer: ILoadbalancer): any {
    this.loadbalancer = loadbalancer;
  }
}
