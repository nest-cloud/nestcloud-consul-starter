import { Filter, ProxyErrorException, Request, Response } from '@nestcloud/proxy';
import { ClientRequest, IncomingMessage } from 'http';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomProxyFilter implements Filter {
  before(request: Request, response: Response): boolean | Promise<boolean> {
    return true;
  }

  error(error: ProxyErrorException, request: Request, response: Response): any {
  }

  request(proxyReq: ClientRequest, request: Request, response: Response): any {
  }

  response(proxyRes: IncomingMessage, request: Request, response: Response): any {
  }
}
