import { Injectable } from '@nestjs/common';
import { UseFilters } from '@nestcloud/proxy';
import { CustomProxyFilter } from './CustomProxyFilter';
import { Choose } from '@nestcloud/loadbalance';

@Injectable()
@UseFilters(CustomProxyFilter)
export class ProxyFilterRegister {
  @Choose('yrcloudfile-user-service')
  private readonly userServiceNode;

  constructor() {
    // setInterval(() => console.log(this.userServiceNode), 1000);
  }
}
