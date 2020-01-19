import { All, Controller, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Proxy, InjectProxy } from '@nestcloud/proxy';

@Controller('/proxy/:service')
export class ProxyController {
  constructor(
    @InjectProxy() private readonly proxy: Proxy,
  ) {
  }

  @All()
  async do(@Req() req: Request, @Res() res: Response, @Param('service') id) {
    return await this.proxy.forward(req, res, id);
  }
}
