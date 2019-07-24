import { All, Controller, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Proxy, InjectProxy, AddRequestHeaderFilter, AddResponseHeaderFilter } from '@nestcloud/proxy';

@Controller('/proxy/:service')
export class ProxyController {
  constructor(
    @InjectProxy() private readonly proxy: Proxy,
  ) {
    this.proxy.registerFilter(new AddRequestHeaderFilter());
    this.proxy.registerFilter(new AddResponseHeaderFilter());
  }

  @All()
  do(@Req() req: Request, @Res() res: Response, @Param('service') id) {
    this.proxy.forward(req, res, id);
  }
}
